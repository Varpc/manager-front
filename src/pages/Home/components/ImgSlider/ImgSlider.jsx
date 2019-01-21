import React from 'react';
import { Slider, Icon } from '@icedesign/base';
import axios from 'axios';
import Img from '@icedesign/img';
import './ImgSlider.scss';

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
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentWillMount() {
    axios
      .get('/api/admin/home/image')
      .then((r) => {
        this.setState({
          images: r.data.data,
        });
      })
      .catch();
  }

  render() {
    console.log(this.state.images);
    return (
      <div style={{ width: '100%', margin: '0', padding: '0' }}>
        <Slider
          {...config}
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
        >
          {this.state.images.map((url, ind) => {
            return (
              <div key={ind} style={{ width: '1000px' }}>
                <Img width={1000} height={560} src={url.imgURL} alt={url.name} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
