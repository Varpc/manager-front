import React from 'react';
import ProblemTable from './components/ProblemsTable';
import './Problems.scss';


export default class Problems extends React.Component {
  render() {
    return (
      <div className="problems-container">
        <ProblemTable />
      </div>
    );
  }
}
