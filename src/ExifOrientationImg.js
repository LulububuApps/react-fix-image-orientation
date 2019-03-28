import React, { Component } from "react";
import EXIF from "exif-js";
import exif2css from "exif2css";

const snakeToCamelCaseKeys = obj =>
  Object.keys(obj)
    .map(k => ({
      [k.replace(/(-\w)/g, m => m[1].toUpperCase())]: obj[k]
    }))
    .reduce((a, b) => ({ ...a, ...b }), {});

class ExifOrientationImg extends Component {
  props;
  state = {
    orientation: null
  };

  _onImageLoaded(...args) {
    const [event, ...otherArgs] = args;
    const imageElement = event.target;
    const { onLoad } = this.props;

    // Fix for an issue affecting exif-js: see https://github.com/exif-js/exif-js/issues/95
    const windowImage = window.Image;
    window.Image = null;

    // Do the actual EXIF operations
    if (
      !EXIF.getData(imageElement, () => {
        this.setState({
          orientation: EXIF.getTag(imageElement, "Orientation")
        });
        onLoad && onLoad(event, ...otherArgs);
      })
    ) {
      onLoad && onLoad(event, ...otherArgs);
    }

    // Re-establish the reference
    window.Image = windowImage;
  }

  render() {
    const { src, alt, style = {}, onLoad, innerRef, ...imgProps } = this.props;
    const { orientation } = this.state;

    return (
      <img
        onLoad={this._onImageLoaded.bind(this)}
        src={src}
        alt={alt}
        ref={innerRef}
        style={{
          ...(orientation ? snakeToCamelCaseKeys(exif2css(orientation)) : {}),
          ...style
        }}
        {...imgProps}
      />
    );
  }
}

export default ExifOrientationImg;
