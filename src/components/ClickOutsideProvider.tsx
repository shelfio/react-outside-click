import {useRef} from 'react';
import type {ClickOutsideProviderProps} from '../types';
import {useClickOutside} from './useClickOutside.jsx';

export const ClickOutsideProvider = ({
  children,
  onOutsideClick,
  ...options
}: ClickOutsideProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onOutsideClick, options);

  return <div ref={ref}>{children}</div>;
};
