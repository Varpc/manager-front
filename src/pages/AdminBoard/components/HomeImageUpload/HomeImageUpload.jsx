import { Upload } from '@icedesign/base';
import axios from 'axios';
import React from 'react';

const { ImageUpload } = Upload;
// 直接在组件中请求图片的原始数据后无法进行渲染，原因不明
// 现改为由父组件控制渲染，在父组件中中请求完数据后再进行渲染
export default class HomeImageUpload extends React.Component {
  onRemove = (file) => {
    console.log(file.imgURL);
    // axios中delete参数和get put不同,后者第二个参数为data，而delete为config
    // 详见https://blog.csdn.net/qq383366204/article/details/80268007
    axios
      .delete('/api/admin/home/image', {
        data: { imgURL: file.imgURL },
      })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  beforeUpload = (info) => {
    console.log('beforeUpload callback : ', info);
  };

  onChange = (info) => {
    console.log('onChane callback : ', info);
  };

  onSuccess = (res, file) => {
    console.log('onSuccess callback : ', res, file);
  };

  onError = (file) => {
    console.log('onError callback : ', file);
  };

  render() {
    console.log(this.props.defaultFileList);
    return (
      <div>
        <ImageUpload
          listType="picture-card"
          action="/api/admin/home/image"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          locale={{
            image: {
              cancel: '取消上传',
              addPhoto: '上传图片',
            },
          }}
          beforeUpload={this.beforeUpload}
          onChange={this.onChange}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onRemove={this.onRemove}
          defaultFileList={this.props.defaultFileList}
        />
      </div>
    );
  }
}
