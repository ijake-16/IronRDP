import { v4 as uuidv4 } from 'uuid';

export interface DesktopSize {
  width: number;
  height: number;
}

export class Session {
  id: string;
  sessionId?: number;
  name?: string;
  active: boolean;
  desktopSize?: DesktopSize;

  constructor(name?: string) {
    this.id = uuidv4();
    this.name = name;
    this.active = false;
  }
}

