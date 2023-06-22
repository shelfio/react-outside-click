import React, {useRef} from 'react';
import type {OutsideClickWrapperProps} from '../types';
import {useClickOutside} from './useClickOutside';

export const OutsideClickWrapper = ({children, ...props}: OutsideClickWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside({ref, ...props});

  return <div ref={ref}>{children}</div>;
};
