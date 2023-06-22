import React from 'react';
import {fireEvent, render, renderHook, screen} from '@testing-library/react';
import {OutsideClickWrapper, useClickOutside} from './index';

const onOutsideClick = jest.fn();

afterEach(() => jest.clearAllMocks());

describe('useClickOutside', () => {
  it('should call onOutsideClick when clicked outside ref element', () => {
    const ref = {current: document.createElement('div')};
    const event = new MouseEvent('mousedown');

    renderHook(() =>
      useClickOutside({
        ref,
        onOutsideClick,
      })
    );

    fireEvent(document, event);

    expect(onOutsideClick).toHaveBeenCalledWith(event);
  });

  it('should not call onOutsideClick when clicked inside ref element', () => {
    const ref = {current: document.createElement('div')};
    const innerElement = document.createElement('span');
    ref.current.appendChild(innerElement);
    const event = new MouseEvent('mousedown', {bubbles: true});
    renderHook(() =>
      useClickOutside({
        ref,
        onOutsideClick,
      })
    );

    fireEvent(innerElement, event);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should not call onOutsideClick when disabled is true', () => {
    const ref = {current: document.createElement('div')};
    const event = new MouseEvent('mousedown');

    renderHook(() =>
      useClickOutside({
        ref,
        onOutsideClick,
        disabled: true,
      })
    );

    fireEvent(document, event);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should not call onOutsideClick when ref current = null', () => {
    const ref = {current: null};
    const event = new MouseEvent('mousedown');

    renderHook(() =>
      useClickOutside({
        ref,
        onOutsideClick,
      })
    );

    fireEvent(document, event);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});

describe('onClickOutside', () => {
  it('should render children and not call onOutsideClick when clicked inside ref element', () => {
    render(
      <OutsideClickWrapper onOutsideClick={onOutsideClick}>
        <span>child</span>
      </OutsideClickWrapper>
    );

    const child = screen.getByText('child');

    expect(child).toBeInTheDocument();

    fireEvent.mouseDown(child);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should call onOutsideClick when clicked outside ref element', () => {
    render(
      <OutsideClickWrapper onOutsideClick={onOutsideClick}>
        <button>child</button>
      </OutsideClickWrapper>
    );

    fireEvent.mouseDown(document);

    expect(onOutsideClick).toHaveBeenCalled();
  });
});
