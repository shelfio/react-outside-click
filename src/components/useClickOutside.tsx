import {useEffect, useRef} from 'react';
import type {UseClickOutsideHandlerProps} from '../types';

export const useClickOutside = ({
  ref,
  onOutsideClick,
  disabled,
  mouseEvent = 'mousedown',
  options = true,
}: UseClickOutsideHandlerProps) => {
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
      // `useCapture` is set to true by default to handle the capture phase of the event.
      // It ensures that the click outside event will be captured before any click events on the descendants,
      // even if `stopPropagation` is used.
      document.addEventListener(mouseEvent, handleClickOutside, options);
    }

    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside, options);
    };
  }, [mouseEvent, disabled, options, ref]);
};
