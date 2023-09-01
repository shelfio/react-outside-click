import {useEffect, useRef} from 'react';
import type {ClickOutsideHandler, Options, Ref} from '../types.js';

export const useClickOutside = (
  ref: Ref,
  onOutsideClick: ClickOutsideHandler,
  options?: Options
) => {
  const {mouseEvent = 'mousedown', disabled, listenerOptions = true} = options || {};
  const savedHandler = useRef(onOutsideClick);

  useEffect(() => {
    savedHandler.current = onOutsideClick;
  }, [onOutsideClick]);

  useEffect(() => {
    const handleClickOutside: typeof onOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedHandler.current(event);
      }
    };

    if (!disabled) {
      // `useCapture` for `options` is set to true by default to handle the capture phase of the event.
      // It ensures that the click outside event will be captured before any click events on the descendants,
      // even if `stopPropagation` is used.
      document.addEventListener(mouseEvent, handleClickOutside, listenerOptions);
    }

    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside, listenerOptions);
    };
  }, [mouseEvent, disabled, listenerOptions, ref]);
};
