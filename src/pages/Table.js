import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../Styles/table.scss'

const EditableContext = React.createContext(null);



const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }
   menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={(e)=>{ debugger 
            this.handlePromptDropdown(e)}}>hi</a>
      </Menu.Item>
      {/* <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item> */}
    </Menu>
  );
  handlePromptDropdown=(e)=>{
    debugger
}

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handlePromptDropdown=(e)=>{
      debugger
      if(e.currentTarget.innerText == 'hi'){
        this.setState({
            dataSource : [{
                key: 56,
                name: `hi King `,
                age: '32',
                address: `London, Park Lane no. `,
              }]
        })
      }
  }
  handleAdd = () => {
      debugger
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    dataSource.reverse();
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
      debugger
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
          <div className="Table_upperButons">
          <Dropdown overlay={this.menu} trigger={["click"]}>
          <a className='ant-dropdown-link' onClick={(e) => {
              e.preventDefault()
              this.handlePromptDropdown(e)
              }}>
            Click me <DownOutlined />
          </a>
        </Dropdown>
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
          </div>
        
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{
            defaultPageSize: 6,
            showSizeChanger: true,
            pageSizeOptions: ["6"],
          }}
        />
      </div>
    );
  }
}
export default EditableTable