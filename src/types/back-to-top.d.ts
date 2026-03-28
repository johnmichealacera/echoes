declare module '@jmacera/back-to-top-component' {
  import { ReactNode } from 'react';

  export interface BackToTopOptions {
    threshold?: number;
    smooth?: boolean;
    className?: string;
    icon?: ReactNode;
    text?: string;
    bottom?: number;
    right?: number;
    ariaLabel?: string;
    onClick?: () => void;
  }

  export function BackToTop(options?: BackToTopOptions): JSX.Element | null;
  export default BackToTop;
}
