import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class BarChart extends Component {
  static displayName = 'BarChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.dataSource;
    // console.log('barchart: ', data);
    const cols = {
      sales: { tickInterval: 20 },
    };
    return (
      <Chart
        height={200}
        width={700}
        data={data}
        scale={cols}
        padding="auto"
      >
        <Axis name="sum" />
        <Axis name="oj" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="oj*sum" />
      </Chart>
    );
  }
}
