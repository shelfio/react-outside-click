import {useEffect, useRef} from 'react';
import type {UseClickOutsideHandlerProps} from '../types';

export const useClickOutside = ({
  ref,
  onOutsideClick,
  disabled,
  mouseEvent = 'mousedown',
  options,
}: UseClickOutsideHandlerProps) => {
  const savedHandler = useRef(onOutsideClick);

  useEffect(() => {
    savedHandler.current = onOutsideClick;
  }, [onOutsideClick]);

  const handleClickOutside: typeof onOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      savedHandler.current(event);
    }
  };

  useEffect(() => {
    !disabled && document.addEventListener(mouseEvent, handleClickOutside, options);

    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside, options);
    };
  }, [mouseEvent, disabled, options]);
};
