import type {ReactNode, RefObject} from 'react';

type CommonProps = {
  onOutsideClick: (event: MouseEvent) => void;
  disabled?: boolean;
  mouseEvent?: 'mousedown' | 'mouseup';
  options?: boolean | AddEventListenerOptions;
};

export type ClickOutsideProviderProps = {children: ReactNode} & CommonProps;

export type UseClickOutsideHandlerProps<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>;
} & CommonProps;
