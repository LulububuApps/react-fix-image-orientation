# react-fix-image-orientation

`img` element wrapper component for React that understands EXIF orientation information and corrects it using CSS transforms.

![Example](https://github.com/yogakurniawan/react-fix-image-orientation/raw/master/example.png)

## Installation

```sh
npm install --save react-fix-image-orientation
# or
yarn add react-fix-image-orientation
```

## Usage

Instead of using an `img` element, use this component instead:

```js
import React from 'react';
import Img from 'react-fix-image-orientation'

const MyComponent = () =>
  <Img
    src="https://github.com/recurser/exif-orientation-examples/blob/master/Portrait_8.jpg?raw=true"
    alt="A waterfall"
  />
```

All properties will be cleanly passed to the img element including `style` and `onLoad` that this component uses under the hood. However, **keep in mind that you should be aware that width/height and other dimension manipulations may not work as expected**.

## Development

yarn is preferred to work with this project.

### Dev server

Just start a server with `yarn start`.
