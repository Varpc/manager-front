import React from 'react';
import {
  DatePicker,
  Field,
  Form,
  Input,
  Button,
  Grid,
  Feedback,
} from '@icedesign/base';
import {
  RichEditor,
  createEditorState,
} from '../../../../components/RichEditor';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const FormItem = Form.Item;

/**
 * @param data (object) 用于初始化的参数,格式为
 * {
 *    name: 'name', // string
 *    rule: '', // string
 *    time: [Integer, Integer],
 * }
 * @param onSumit (func) 提交数据时的回调函数，参数为提交的数据
 */
export default class AdminContestEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: createEditorState(''),
      field: new Field(this),
    };
  }

  componentWillMount() {
    if (this.props.data) {
      const data = this.props.data;
      const begin = new Date();
      const end = new Date();
      begin.setTime(data.begin_time);
      end.setTime(data.end_time);
      // this.state.field.setValue('name', data.name);
      // this.state.field.setValue('time', [begin, end]);
      this.state.field.setValues({
        name: data.name,
        time: [begin, end],
      });
      this.setState({
        editorValue: createEditorState(data.rule),
      });
    }
  }

  handleEditorChange = (editorValue) => {
    this.setState({
      editorValue,
    });
  };

  handleOnSubmit = () => {
    const fieldData = this.state.field.getValues();
    if (
      fieldData.name === '' ||
      fieldData.time === null ||
      fieldData.time === undefined ||
      fieldData.time.length < 2
    ) {
      Feedback.toast.prompt('赛季名称或起止时间必填');
      return;
    }
    const data = {
      name: fieldData.name,
      beginTime: fieldData.time[0].getTime(),
      endTime: fieldData.time[1].getTime(),
      rule: this.state.editorValue.toHTML(),
    };
    this.props.onSubmit(data);
  };

  render() {
    const init = this.state.field.init;
    return (
      <Form field={this.state.field} style={{ width: '1100px' }}>
        <FormItem label="赛季名称" labelCol={{ span: 2 }} required>
          <Input
            style={{ width: '550px' }}
            placeholder="请输入赛季名称"
            trim
            {...init('name', {
              rules: [
                {
                  required: true,
                  trigger: 'onBlur',
                  message: '赛季名称必填',
                },
              ],
            })}
          />
        </FormItem>
        <FormItem label="起止时间" labelCol={{ span: 2 }} required>
          <RangePicker
            style={{ width: '550px' }}
            {...init('time', {
              rules: [
                {
                  required: true,
                  trigger: 'onBlur',
                  message: '起止时间必填',
                },
              ],
            })}
          />
        </FormItem>
        <FormItem label="比赛规则" labelCol={{ span: 2 }}>
          <RichEditor
            style={{ width: '1000px' }}
            value={this.state.editorValue}
            onChange={this.handleEditorChange}
          />
        </FormItem>
        <hr />
        <Row>
          <Col style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleOnSubmit}>
              提交
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
