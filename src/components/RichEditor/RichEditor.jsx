import React from 'react';
import BraftEditor from 'braft-editor';
import './RichEditor.scss';

const myValidateFn = (file) => {
  return file.size < 1024 * 1024 * 10; // 规定文件大小小于10M
};

const myUploadFn = (param) => {
  const serverURL = '/api/media';
  const xhr = new XMLHttpRequest();
  const fd = new FormData();

  const successFn = (response) => {
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
    console.log(response);
    param.success({
      url: xhr.responseText,
      meta: {
        id: 'xxx',
        title: 'xxx',
        alt: 'xxx',
        loop: true, // 指定音视频是否循环播放
        autoPlay: true, // 指定音视频是否自动播放
        controls: true, // 指定音视频是否显示控制栏
        poster: '', // 指定视频播放器的封面
      },
    });
  };

  const progressFn = (event) => {
    // 上传进度发生变化时调用param.progress
    param.progress((event.loaded / event.total) * 100);
  };

  const errorFn = () => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.',
    });
  };

  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);

  fd.append('file', param.file);
  xhr.open('POST', serverURL, true);
  xhr.send(fd);
};

/**
 * 富文本编辑器组件
 *@param {string} html 初始数据,父组件通过此获取html值
 */
export default class Editor extends React.Component {
  render() {
    return (
      <BraftEditor
        {...this.props}
        media={{
          uploadFn: myUploadFn,
          validateFn: myValidateFn,
        }}
      />
    );
  }
}
