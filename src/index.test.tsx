import {fireEvent, render, renderHook, screen} from '@testing-library/react';
import {ClickOutsideProvider, useClickOutside} from './index';
import { Options, Ref } from "./types";

const onOutsideClick = jest.fn();

afterEach(() => jest.clearAllMocks());

const renderUseClickOutside = (ref: Ref, options?: Options) => renderHook(() =>
  useClickOutside(
    ref,
    onOutsideClick,
    options,
  )
);

const renderClickOutsideProvider = (options?: Options) => render(
  <div>
    <button onMouseDown={e => e.stopPropagation()}>outside</button>
    <ClickOutsideProvider onOutsideClick={onOutsideClick} {...options}>
      <button>child</button>
    </ClickOutsideProvider>
  </div>
);

describe('useClickOutside', () => {
  it('should call onOutsideClick when clicked outside ref element', () => {
    const ref = {current: document.createElement('div')};

    renderUseClickOutside(ref)

    fireEvent.mouseDown(document);

    expect(onOutsideClick).toHaveBeenCalled();
  });

  it('should call onOutsideClick with proper event when clicked outside ref element', () => {
    const ref = {current: document.createElement('div')};
    const mouseUpEvent = new MouseEvent('mouseup');

    renderUseClickOutside(ref,{mouseEvent: 'mouseup'})

    fireEvent.mouseDown(document);

    expect(onOutsideClick).not.toHaveBeenCalled();

    fireEvent(document, mouseUpEvent)

    expect(onOutsideClick).toHaveBeenCalledWith(mouseUpEvent);
  });

  it('should not call onOutsideClick when clicked inside ref element', () => {
    const ref = {current: document.createElement('div')};
    const innerElement = document.createElement('span');
    ref.current.appendChild(innerElement);

    renderUseClickOutside(ref)

    fireEvent.mouseDown(innerElement);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should not call onOutsideClick when disabled is true', () => {
    const ref = {current: document.createElement('div')};

    renderUseClickOutside(ref, {disabled:true})

    fireEvent.mouseDown(document);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should not call onOutsideClick when ref current = null', () => {
    const ref = {current: null};

    renderUseClickOutside(ref)

    fireEvent.mouseDown(document);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});

describe('<ClickOutsideProvider />', () => {
  it('should render children and not call onOutsideClick when clicked inside ref element', () => {
    renderClickOutsideProvider();

    const child = screen.getByText('child');

    expect(child).toBeInTheDocument();

    fireEvent.mouseDown(child);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('should call onOutsideClick when clicked outside ref element even if outside element makes stopPropagation', () => {
    renderClickOutsideProvider();

    fireEvent.mouseDown(screen.getByText('outside'));

    expect(onOutsideClick).toHaveBeenCalled();
  });

  it('should not call onOutsideClick when clicked outside ref element and useCapture is false and outside element makes stopPropagation', () => {
    renderClickOutsideProvider({listenerOptions:false});

    fireEvent.mouseDown(screen.getByText('outside'));

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
