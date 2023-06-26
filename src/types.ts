import type {ReactNode, RefObject} from 'react';

export type ClickOutsideHandler = (event: MouseEvent) => void;

export type Ref<T extends HTMLElement = HTMLElement> = RefObject<T>;

export type Options = {
  disabled?: boolean;
  mouseEvent?: 'mousedown' | 'mouseup';
  listenerOptions?: boolean | AddEventListenerOptions;
};

export type ClickOutsideProviderProps = {
  children: ReactNode;
  onOutsideClick: ClickOutsideHandler;
} & Options;
