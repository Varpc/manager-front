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
  autoplay: true,
  initialSlide: 1,
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
    <div id="prev" {...props} style={arrowStyle}>
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

  componentDidMount() {
    axios
      .get('/api/admin/home/image')
      .then((r) => {
        const data = r.data.data;
        // 修复当只有一个图片时显示不正常的问题
        if (data.length === 1) {
          data.push(data[0]);
        }
        this.setState({
          images: data,
        });
      })
      .catch();
  }

  componentDidUpdate() {
    /**
     * 此处主要用于解决ice Slider的缺陷，当Slider设置要显示的图片居中并且该图片两边还有分别有半张图片时，
     * 首次渲染居中图片的左侧的留白问题。观察发现，当点击Slide中的左移按钮时，该留白会迅速被图片填充，页
     * 面恢复正常。为了在一开始页面就是正常的，而不是人工点击使其正常，所以在其左侧按钮中添加id，并在此处
     * 获取（此时页面已经渲染完了），模拟鼠标点击时间，使其正常~~
     */
    const prev = document.getElementById('prev');
    if (prev) {
      setTimeout(() => { prev.click(); }, 50);
    }
  }

  render() {
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
                <Img
                  width={1000}
                  height={560}
                  src={url.imgURL}
                  alt={url.name}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
