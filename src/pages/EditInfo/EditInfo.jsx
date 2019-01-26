import React from 'react';
import HeadImage from './components/HeadImage';
import InfoForm from './components/InfoForm';
import './EditInfo.scss';

export default class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="editinfo-container">
        <div className="content">
          <div className="content-header" />
          <div className="content-user">
            <HeadImage />
            <div className="content-user-info" >
              <InfoForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
