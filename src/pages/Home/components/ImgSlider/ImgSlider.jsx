import React from 'react';
import { Slider, Icon } from '@icedesign/base';
import Img from '@icedesign/img';
import './ImgSlider.scss';

const image = require('./image/image.jpg');

const config = {
  variableWidth: true,
  centerMode: true,
  infinite: true,
  dots: true,
  adaptiveHeight: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
};

const arrowStyle = {
  display: 'block',
  background: 'red',
  opacity: 1,
  margin: '0 20px',
};

const CustomPrevArrow = (props) => {
  return (
    <div {...props} style={arrowStyle}>
      <Icon type="arrow-double-left" />
    </div>
  );
};

const CustomNextArrow = (props) => {
  return (
    <div {...props} style={arrowStyle}>
      <Icon type="arrow-double-right" />
    </div>
  );
};

export default class ImgSlider extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', margin: '0', padding: '0' }}>
        <Slider
          {...config}
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
        >
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          <div style={{ width: '1000px' }}>
            <Img width={1000} height={560} src={image} />
          </div>
          
        </Slider>
      </div>
    );
  }
}
