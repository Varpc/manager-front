import React from 'react';
import RichEditor from '../../components/RichEditor';
import './AdminBoard.scss';

export default class AdminBoard extends React.Component {
  render() {
    return (
      <div className="editor-container">
        <div>
          <div className="title">首页公告版内容</div>
          <RichEditor
            url="/api/admin/board"
            default
            style={{ paddingLeft: '20px' }}
          />
        </div>
      </div>
    );
  }
}
