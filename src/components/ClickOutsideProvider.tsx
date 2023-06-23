import {useRef} from 'react';
import type {ClickOutsideProviderProps} from '../types';
import {useClickOutside} from './useClickOutside';

export const ClickOutsideProvider = ({children, ...props}: ClickOutsideProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside({ref, ...props});

  return <div ref={ref}>{children}</div>;
};
