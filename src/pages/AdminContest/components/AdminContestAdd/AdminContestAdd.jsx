/* eslint-disable no-mixed-operators */
import React from 'react';
import {
  Form,
  Input,
  Button,
  Field,
  Select,
  Grid,
  DatePicker,
  TimePicker,
  Range,
  Feedback,
} from '@icedesign/base';
import axios from 'axios';
import './AdminContestAdd.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const { Row } = Grid;

export default class AdminContestAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saiji: [],
    };
    this.field = new Field(this);
  }

  componentWillMount() {
    axios
      .get('/api/admin/contestseason')
      .then((r) => {
        this.setState({
          saiji: r.data.data,
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  }

  formatData = (data) => {
    const time = data.time;
    const timeSecond = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
    return {
      date: data.date.getTime(),
      length: data.length * 3600,
      name: data.name,
      penalty: data.penalty,
      problem: data.problem,
      data: data.rankdata,
      saiji: data.saiji,
      type: data.type,
      time: timeSecond,
    };
  }

  handleSubmit = () => {
    console.log('收到表单值：', this.field.getValues());
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('error');
        return;
      }
      axios.post('/api/admin/contest', {
        ...this.formatData(values),
      }).then(() => {
        Feedback.toast.success('创建成功');
      }).catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
    });
  };

  render() {
    const init = this.field.init;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="admin-contest-add-container">
        <div className="page-header">
          <div className="page-title">添加比赛</div>
        </div>
        <Form direction="ver" field={this.field}>
          <FormItem label="比赛名称" required {...formItemLayout}>
            <Input
              placeholder="请输入比赛名称"
              {...init('name', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '比赛名称必填',
                  },
                ],
              })}
            />
          </FormItem>

          <FormItem label="所属赛季" {...formItemLayout} required>
            <Select
              style={{ width: '100%' }}
              {...init('saiji', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '所属赛季必选',
                  },
                ],
              })}
            >
              {this.state.saiji.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </FormItem>

          <FormItem label="比赛类型" {...formItemLayout} required>
            <Select
              {...init('type', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '比赛类型必选',
                  },
                ],
              })}
            >
              <Option value={0}>个人赛</Option>
              <Option value={1}>组队赛</Option>
            </Select>
          </FormItem>

          <FormItem label="比赛时间" {...formItemLayout} required>
            <Row>
              <FormItem style={{ marginRight: 10 }}>
                <DatePicker
                  {...init('date', {
                    rules: [
                      {
                        required: true,
                        trigger: 'onBlur',
                        message: '比赛日期必选',
                      },
                    ],
                  })}
                />
              </FormItem>
              <FormItem>
                <TimePicker
                  {...init('time', {
                    rules: [
                      {
                        required: true,
                        trigger: 'onBlur',
                        message: '比赛时间必选',
                      },
                    ],
                  })}
                />
              </FormItem>
            </Row>
          </FormItem>

          <FormItem label="题目数量" {...formItemLayout} required>
            <Range
              defaultValue={10}
              min={3}
              max={15}
              style={{ marginTop: '10px' }}
              marks={12}
              {...init('problem', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '题目数量必选',
                  },
                ],
              })}
            />
          </FormItem>
          <FormItem label="题目罚时" {...formItemLayout} required>
            <Range
              defaultValue={20}
              min={0}
              max={100}
              style={{ marginTop: '10px' }}
              marks={[0, 20, 30, 50, 100]}
              {...init('penalty', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '题目罚时必选',
                  },
                ],
              })}
            />
            分钟
          </FormItem>

          <FormItem label="比赛时长" {...formItemLayout} required>
            <Range
              defaultValue={5}
              min={1}
              max={6}
              style={{ marginTop: '10px' }}
              marks={5}
              {...init('length', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '比赛时长必选',
                  },
                ],
              })}
            />
            小时
          </FormItem>

          <FormItem label="榜单数据" {...formItemLayout}>
            <Input
              multiple
              placeholder="请直接拷贝vj上的榜单数据"
              {...init('rankdata', {
                rules: [
                  {
                    required: true,
                    trigger: 'onBlur',
                    message: '榜单数据必填',
                  },
                ],
              })}
            />
          </FormItem>
          <FormItem label=" " {...formItemLayout}>
            <Button type="primary" onClick={this.handleSubmit}>
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
