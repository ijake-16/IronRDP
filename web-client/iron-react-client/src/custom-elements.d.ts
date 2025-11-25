import { IronRemoteDesktopElement } from './types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iron-remote-desktop': React.DetailedHTMLProps<
        React.HTMLAttributes<IronRemoteDesktopElement> & {
          verbose?: string;
          scale?: string;
          flexcenter?: string;
          module?: any;
          ref?: React.Ref<IronRemoteDesktopElement>;
        },
        IronRemoteDesktopElement
      >;
    }
  }
}

