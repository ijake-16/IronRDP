# IronRDP 기반 웹 VDI 클라이언트 R\&D 프로젝트

## 1\. 프로젝트 개요 (Overview & Goal)

본 프로젝트의 목표는 Rust 기반 RDP 라이브러리인 **IronRDP**를 분석하고, 이를 기반으로 **웹 클라이언트(Web Client)** 를 구축하는 것입니다.

궁극적으로는 기존 저비용 VDI 솔루션들이 가진 다음과 같은 **접근성 및 사용성 문제**를 해결하고자 합니다.

  * 복잡한 초기 설치 및 네트워크 설정 요구
  * 특정 OS에 종속되는 클라이언트 소프트웨어
  * 터미널 명령어 기반의 높은 기술 장벽

본 문서는 IronRDP의 초기 R\&D 과정, 특히 원격 연결을 수립하기까지의 **모든 문제 해결 과정을 재현 가능(Reproducible)하게 기록**하는 것을 1차 목표로 합니다.

## 2\. 개발 아키텍처 (Architecture)

본 R\&D는 실제 기업의 인트라넷(내부망) 환경을 가정합니다. 하지만 개인 개발 환경의 네트워크 한계를 극복하기 위해, **NordVPN Meshnet**을 활용하여 **가상 사설 LAN(Virtual LAN)** 을 구축했습니다.

이 아키텍처는 복잡한 포트 포워딩 설정 없이도 두 장비(Client/Server)가 동일 네트워크에 있는 것처럼 통신할 수 있게 하여, 안정적인 테스트베드를 제공합니다.

  * **클라이언트 (Client):** `macOS` (Apple M3 Pro), IronRDP 소스 코드 빌드 및 실행
  * **서버 (Server):** `Windows 11 Pro`, 원격 데스크톱 호스트
  * **네트워크 (Network):** `NordVPN Meshnet` (서로 다른 물리적 네트워크에 위치한 두 장비를 동일 가상 네트워크로 바인딩)

-----

## 3\. 1단계: 사전 준비 사항 (Prerequisites)

RDP 연결을 시도하기 전, 서버와 클라이언트 양측에 다음과 같은 환경 설정이 반드시 필요합니다.

### 3.1. 서버 측 (Windows PC)

1.  **Windows 버전 확인:**
      * 원격 데스크톱 '호스트' 기능은 **Windows Pro/Enterprise/Education** 에디션에서만 지원됩니다. (Windows Home 에디션 불가)
      * `설정` \> `시스템` \> `정보`에서 확인.
2.  **원격 데스크톱 활성화:**
      * `설정` \> `시스템` \> `원격 데스크톱`으로 이동.
      * "원격 데스크톱 활성화"를 `켬`으로 설정합니다.
3.  **방화벽 설정 확인:**
      * `Windows Defender 방화벽` \> `방화벽에서 앱 허용`.
      * **"원격 데스크톱"** 항목이 `개인` 네트워크에 대해 허용되어 있는지 확인합니다.
4.  **사용자 계정 암호 확인:**
      * 원격 접속에 사용할 Windows 사용자 계정에 **반드시 암호가 설정**되어 있어야 합니다. (PIN 번호가 아닌 계정 암호)

### 3.2. 클라이언트 측 (macOS)

1.  **Xcode 커맨드 라인 도구:**
      * `cmake` 등 빌드 도구의 기반이 됩니다.
    <!-- end list -->
    ```bash
    xcode-select --install
    ```
2.  **Homebrew 및 필수 패키지:**
      * `cmake`는 IronRDP의 특정 의존성(C/C++ 라이브러리)을 빌드하는 데 필수적입니다.
    <!-- end list -->
    ```bash
    # Homebrew 설치 (이미 설치된 경우 생략)
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # cmake 설치
    brew install cmake
    ```
3.  **Rust 개발 환경:**
      * Rust 컴파일러(`rustc`) 및 빌드 도구(`cargo`)를 설치합니다.
    <!-- end list -->
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    # 설치 후 터미널 재시작
    ```

### 3.3. 네트워크 (VPN)
본 셋팅은 개발 환경에서 테스팅을 위한 셋팅입니다. 실제 상용 서비스에서는 VPN이 아닌 내부망 설정을 이용합니다.
1.  **NordVPN 설치:**
      * `Windows PC`와 `macOS` 양쪽 모두에 NordVPN 클라이언트를 설치하고 동일한 계정으로 로그인합니다.
2.  **Meshnet 활성화:**
      * 두 장비에서 NordVPN 앱을 열어 `Meshnet` 기능을 활성화하고, 서로의 장치가 '온라인'으로 연결되었는지 확인합니다.

-----

## 4\. 2단계: 연결 및 실행 절차 (Step-by-Step Execution)

사전 준비가 완료되면, 다음 절차에 따라 IronRDP 클라이언트를 빌드하고 실행합니다.

### 4.1. 네트워크 IP 확인

1.  `Windows PC`의 NordVPN 앱 \> `Meshnet` 탭에서 **Meshnet IP 주소**를 확인합니다. (예: `100.x.x.x`)
2.  `macOS` 터미널에서 `ping <Windows의_Meshnet_IP>` 명령으로 네트워크 연결이 정상적인지 최종 확인합니다.

### 4.2. IronRDP 소스 코드 준비

`macOS` 터미널에서 IronRDP 소스 코드를 클론합니다.

```bash
git clone https://github.com/IronRDP/IronRDP.git
cd IronRDP
```

### 4.3. [핵심] IronRDP 소스 코드 수정 (버그 해결)

  * **문제:** IronRDP의 `ironrdp-client`는 오디오 리다이렉션(`rdpsnd`) 기능이 활성화되어 있으며, 이 모듈이 macOS의 Core Audio와 충돌하여 연결 직후 `Segmentation fault`를 일으키는 버그가 있습니다.
  * **해결:** `cargo run`을 실행하기 전, 해당 오디오 모듈을 소스 코드에서 비활성화합니다.

<!-- end list -->

1.  코드 편집기로 `crates/ironrdp-client/src/lib.rs` 파일을 엽니다.

2.  `rdpsnd` 키워드로 검색하여, `Rdpsnd` 동적 채널(DVC)을 추가하는 라인을 찾습니다.

3.  해당 라인을 찾아 다음과 같이 주석 처리합니다.

    ```rust
    // 원본 코드 (버전마다 다를 수 있음)
    // .with_dvc(Box::new(Rdpsnd::new(Box::new(NativeSound::new()))))

    // 수정된 코드
    // .with_dvc(Box::new(Rdpsnd::new(Box::new(NativeSound::new()))))
    ```

### 4.4. [핵심] 서버 인증 설정 (NLA 비활성화)

  * **문제:** NLA(네트워크 수준 인증)가 활성화된 상태에서 VPN 등 비표준 네트워크를 통해 접속 시, 클라이언트가 CredSSP 보안 핸드셰이크에 실패하여 `Connection reset by peer` 또는 `STATUS_LOGON_FAILURE` 오류가 발생합니다.
  * **해결:** 어차피 Meshnet이라는 암호화된 VPN 터널을 사용하므로, 추가 보안 계층인 NLA를 비활성화하여 RDP 표준 인증을 사용하도록 변경합니다.

<!-- end list -->

1.  `Windows PC`의 `설정` \> `시스템` \> `원격 데스크톱`으로 이동합니다.
2.  "고급 설정"을 클릭합니다.
3.  **"연결을 위해 네트워크 수준 인증을 사용하도록 컴퓨터 요구"** 옵션을 **체크 해제**합니다.

### 4.5. 빌드 및 최종 실행

`macOS` 터미널의 IronRDP 루트 디렉토리에서 다음 명령어를 실행합니다. `cargo`는 코드 변경(`lib.rs` 수정)을 감지하고 자동으로 프로젝트를 다시 빌드합니다.

```bash
# <MESHNET_IP>와 <USERNAME>을 실제 값으로 대체합니다.
# <USERNAME>은 Windows의 `whoami` 명령어로 확인한 값 (예: "DESKTOP-ABC\jake")을 권장합니다.
cargo run --bin ironrdp-client -- <MESHNET_IP> --username "<USERNAME>"
```

빌드가 완료되고 클라이언트가 실행되면, 터미널에서 Windows 계정의 **비밀번호**를 입력하라는 프롬프트가 나타납니다. 비밀번호를 정확히 입력하면 새 창이 열리며 원격 데스크톱 화면이 나타납니다.

-----

## 5\. 3단계: R\&D 및 트러블슈팅 로그 (R\&D Log)

본 R\&D 과정에서 발생한 주요 오류와 해결 과정을 기록합니다. 이 로그는 재현 과정에서 발생하는 문제 해결의 핵심 가이드가 됩니다.

### 5.1. 환경 설정 오류

  * **오류:** `error: could not amend shell profile: ... Permission denied (os error 13)`

      * **원인:** Rust 설치 스크립트가 셸 프로필 파일(`~/.bash_profile`)에 `PATH`를 등록할 권한이 없음.
      * **해결:** `sudo chown`으로 파일 권한을 수정하거나, `source "$HOME/.cargo/env"` 명령어를 수동으로 실행하여 `PATH`를 임시 적용.

  * **오류:** `command not found: cargo`

      * **원인:** `PATH` 환경 변수에 Rust의 바이너리 경로(`~/.cargo/bin`)가 등록되지 않음.
      * **해결:** 터미널을 재시작하거나 `source "$HOME/.cargo/env"`를 실행.

### 5.2. 빌드 오류

  * **오류:** `no example target named simple-client`

      * **원인:** IronRDP 저장소의 예제 이름이 변경됨. (초기 가이드 오류)
      * **해결:** `ls examples/`로 실제 예제 이름을 확인하고, `--bin ironrdp-client` 플래그를 사용하는 것으로 변경.

  * **오류:** `failed to execute command: No such file or directory (os error 2)` / `is 'cmake' not installed?`

      * **원인:** IronRDP가 의존하는 C/C++ 라이브러리 빌드에 `cmake`가 필요하나, 클라이언트에 설치되어 있지 않음.
      * **해결:** `brew install cmake` 명령어로 `cmake` 설치.

### 5.3. 네트워크 오류

  * **오류:** `Connection error: [TCP connect] ... Operation timed out (os error 60)`

      * **원인:** TCP 연결 시도가 있었으나 서버로부터 응답이 없음. (방화벽, 잘못된 IP, 네트워크 단절)
      * **해결:** `ping` 테스트 실행 → `Request timeout` 확인.

  * **오류:** `Request timeout` (Ping)

      * **원인:** 클라이언트와 서버가 서로 다른 네트워크에 있어 라우팅이 불가능함.
      * **해결:** 두 장비를 동일한 Wi-Fi에 연결하거나, **NordVPN Meshnet**을 도입하여 가상 LAN 구성.

  * **오류:** `Connection error: [TCP connect] ... No route to host (os error 65)`

      * **원인:** Meshnet IP 주소는 있으나, OS의 라우팅 테이블에 해당 IP로 가는 경로가 없음. (VPN 연결 문제)
      * **해결:** 양측 NordVPN 클라이언트 재시작 및 Meshnet 연결 상태 재확인.

### 5.4. RDP 핸드셰이크 오류

  * **오류:** `Active session error: [read frame] ... Connection reset by peer (os error 54)`

      * **원인:** TCP 연결은 성공했으나, RDP 보안 핸드셰이크(CredSSP) 과정에서 서버가 연결을 강제 종료함. **NLA(네트워크 수준 인증)** 문제로 추정.
      * **해결:** **[4.4. 서버 인증 설정]** 항목대로 NLA 비활성화 조치.

  * **오류:** `Connection error: [CredSSP] ... STATUS_LOGON_FAILURE [0xc000006d]`

      * **원인:** NLA 문제는 해결되었으나, 서버가 사용자의 **아이디 또는 비밀번호가 틀리다**고 응답함.
      * **해결:** 사용자 이름 형식을 `whoami` 기준으로 정확히 입력하고, 비밀번호(PIN 아님)를 재확인하여 입력.

### 5.5. 애플리케이션 충돌 (연결 성공 직후)

  * **오류:** `ERROR ... ironrdp-rdpsnd-native ... Failed to decode an Opus packet` 및 `zsh: segmentation fault`
      * **원인:** 인증 성공 후, 서버의 오디오 스트림을 처리하는 `rdpsnd` 모듈이 macOS의 Core Audio API와 충돌하여 클라이언트가 강제 종료됨.
      * **해결:** **[4.3. IronRDP 소스 코드 수정]** 항목대로 `rdpsnd` 모듈 자체를 빌드에서 제외(주석 처리)하여 버그를 근본적으로 회피.

