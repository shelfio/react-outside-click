# @shelf/react-outside-click

React library for handling outside clicks of a specified element.

## Installation

Install the library using npm:

```shell
$ npm install @shelf/react-outside-click
```

Install the library using yarn:

```shell
$ yarn add @shelf/react-outside-click
```

## Usage
### ClickOutsideProvider
`ClickOutsideProvider` is a component that wraps its children and detects clicks outside of its container element.

```js
import { ClickOutsideProvider } from '@shelf/react-outside-click';

const App = () => {
  const onOutsideClick = () => {
    console.log('Clicked outside')
  };

  return (
    <ClickOutsideProvider onOutsideClick={onOutsideClick}>
      <span>Shelf.io</span>
    </ClickOutsideProvider>
  );
};
```

#### Props

**onOutsideClick**

Type: `function  (required)`

A function that will be called when an outside click is detected.

**disabled**

Type: `boolean  (optional)`

If set to true, the outside click detection will be disabled.

**mouseEvent**

Type: `string  (optional)`

The mouse event to listen for. Defaults to 'mousedown'

**listenerOptions**

Type: `boolean | AddEventListenerOptions  (optional)`

Additional options for the event listener. By default, it uses capture phase.This behavior ensures that the click outside event is captured before any click events on the descendants, even if stopPropagation is used.
See https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture



### useClickOutside
`useClickOutside` is a custom hook that attaches an outside click event listener to a specified element.

```js
import { useRef } from 'react'
import { useClickOutside } from '@shelf/react-outside-click';

const Component() {
  const ref = useRef(null)

  const handleClickInside = () => {
    console.log('Clicked outside')
  }

  useOnClickOutside(ref, handleClickOutside, {mouseEvent: 'mouseup'})

  return <span ref={ref}>Shelf.io</span>
}
```

#### Props

**ref**

Type: `RefObject<T>  (required)`

A ref object that points to the target element.

**onOutsideClick**

Type: `function  (required)`

A function that will be called when an outside click is detected.

**options:**

> **disabled**

Type: `boolean  (optional)`

If set to true, the outside click detection will be disabled.

> **mouseEvent**

Type: `string  (optional)`

The mouse event to listen for. Defaults to 'mousedown'

> **listenerOptions**

Type: `boolean | AddEventListenerOptions  (optional)`

Additional options for the event listener. By default, it uses capture phase.This behavior ensures that the click outside event is captured before any click events on the descendants, even if stopPropagation is used.
See https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
