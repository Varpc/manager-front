import React from 'react';
import BraftEditor from 'braft-editor';
import './RichEditor.scss';

/**
 * 富文本编辑器组件
 *@param value 使用createEditorState() 创建的BraftEditor对象
 *@param onChange (func) 状态改变时的回调函数
 *
 * 使用时同时引入RichEditor组件和createEditorState函数，例如
 * import { RichEditor, createEditorState } from '根据目录结构填写路径';
 * export default class App extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = {
 *       editorState: createEditorState(''), // 参数为html格式的字符串
 *     }
 *   }
 *
 *   onChange = (editorState) => {
 *     this.setState({
 *       editorState,
 *     });
 *   }
 *
 *   render() {
 *     return (
 *       <RichEditor value={this.state.editorState} onChange={this.onChange} />
 *     );
 *   }
 * }
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
