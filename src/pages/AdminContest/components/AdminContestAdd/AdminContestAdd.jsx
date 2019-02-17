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
} from '@icedesign/base';
import './AdminContestAdd.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;

const getData = [
  {
    id: 1,
    name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
  {
    id: 2,
    name: 'bbb',
  },
  {
    id: 3,
    name: 'ccc',
  },
];

export default class AdminContestAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saiji: [],
    };
    this.field = new Field(this);
  }

  componentWillMount() {
    this.setState({
      saiji: getData,
    });
  }

  handleSubmit = () => {
    console.log('收到表单值：', this.field.getValues());
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
                    getValueFromEvent: (time) => {
                      time =
                        time &&
                        time.toLocaleTimeString('zh-CN', {
                          hour12: false,
                        });

                      return time;
                    },
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
