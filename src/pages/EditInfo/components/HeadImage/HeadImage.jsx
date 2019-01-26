import React from 'react';
import Img from '@icedesign/img';
import { Upload, Dialog, Feedback } from '@icedesign/base';
import { connect } from 'react-redux';
import {
  mapUserStateToProps,
  mapUserReducerToProps,
} from '../../../../utils/userRedux/mapToPrpos';
import './HeadImage.scss';

const { CropUpload } = Upload;

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
export default class HeadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      image: this.props.user.image,
    };
  }

  beforeCrop = (file) => {
    // 返回 `false` 的方式
    if (file.size > 1024 * 1024 * 3) {
      Dialog.alert({
        content: '图片尺寸超过最大限制 3MB，请重新选择！',
        closable: false,
        title: '裁剪提醒',
      });
      return false;
    }

    // 返回 `promise` 的方式
    // 详见ice文档示例
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= 1200 && img.height <= 1200) {
            resolve();
          } else {
            Dialog.alert({
              content: `图片宽度为${img.width}px, 高度为${
                img.height
              }px,超过最大限制 1200px，请重新选择！`,
              closable: false,
              title: '裁剪提醒',
            });
            reject(); // resolve(false) 也能阻断流程
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // onCrop = (dataUrl) => {
  //   console.log('onCrop callback : ', dataUrl);
  // }

  // beforeUpload = (file) => {
  //   console.log('beforeUpload callback : ', file);
  // }

  // onChange = (file) => {
  //   console.log('onChange callback : ', file);
  // }

  onError = (e) => {
    console.log('error', e);
    Feedback.toast.error('上传失败');
  };

  onSuccess = (res) => {
    // console.log('onSuccess callback : ', res);
    Feedback.toast.success('设置成功');
    this.props.actions.updateInfo({ image: res.imgURL });
    this.setState({
      image: res.imgURL,
    });
  };

  render() {
    return (
      <CropUpload
        action={`/api/user/${this.state.userId}/image`}
        name="file"
        preview
        previewList={[80, 60, 40]}
        minCropBoxSize={100}
        beforeCrop={this.beforeCrop}
        // onCrop={this.onCrop}
        // beforeUpload={this.beforeUpload}
        // onChange={this.onChange}
        onSuccess={this.onSuccess}
        onError={this.onError}
      >
        <div className="head-img">
          <Img
            src={this.state.image}
            width={150}
            height={150}
            className="img-item"
          />
          <div className="img-flow" />
          <div className="img-text">
            <svg
              className="Zi Zi--Camera UserAvatarEditor-cameraIcon"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <path
                d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </CropUpload>
    );
  }
}
