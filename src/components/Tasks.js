import React, { useContext, useState, useRef, useEffect } from 'react'

import taskContext from "../context/taskContext";
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';
import Highlighter from 'react-highlight-words';

import {
    Space,
    Table,
    Form,
    Input,
    Radio,
    DatePicker,
    Modal,
    Button,
    Checkbox
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const Tasks = () => {

    //importing from contexts
    const context = useContext(taskContext);
    const { tasks, getTasks, deleteTask, updateTask } = context;
    let navigate = useNavigate();

    //Set initial task
    let taskInitial = [];
    const [task, setTask] = useState(taskInitial);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setTask(getTasks)
        }
        else {
            navigate('/Login');
        }
        // eslint-disable-next-line
    }, [])


    // -----------------------------------------------------------------------------------//
    //Case Insensitive Table Search

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //-------------------------------------------------------------------------------------//   
    //Defining table columns
    const columns = [
        {
            title: "Created On",
            dataIndex: "createdOn",
            key: "createdOn",
            sorter: (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps('title'),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps('description'),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (_, record) => (
                <Space>
                    {new Date(record.dueDate).toISOString().slice(0, 10)}
                </Space>

            ),
            ...getColumnSearchProps('dueDate'),
            sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
            filters: [
                {
                    text: <span>Open</span>,
                    value: 'Open',
                },
                {
                    text: <span>Working</span>,
                    value: 'Working',
                },
                {
                    text: <span>Over Due</span>,
                    value: 'OverDue',
                },
                {
                    text: <span>Done</span>,
                    value: 'Done',
                },
            ],
            onFilter: (value, record) => record.Status.startsWith(value),
            filterSearch: true
        },
        {
            title: "Tags",
            dataIndex: "tag",
            key: "tag",
            render: (_, record) => (
                <Space>
                    {record.tag}
                </Space>
            ),
            filters: [
                {
                    text: <span>Need Focus</span>,
                    value: 'Need Focus',
                },
                {
                    text: <span>Work</span>,
                    value: 'Work',
                },
                {
                    text: <span>Priority</span>,
                    value: 'Priority',
                },
                {
                    text: <span>Important</span>,
                    value: 'Important',
                },
                {
                    text: <span>Urgent</span>,
                    value: 'Urgent',
                },
            ],
            onFilter: (value, record) => record.tag.includes(value),
            filterSearch: true
        },
        {
            title: "Action",
            key: "_id",
            render: (_, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => showModal(record)}>Edit</a>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => {

                        confirmAlert({
                            title: 'Delete!',
                            message: 'Are you sure to delete this task.',
                            buttons: [
                                {
                                    label: 'Yes',
                                    onClick: () => handleDelete(record._id)
                                },
                                {
                                    label: 'No'
                                }
                            ]
                        });
                    }
                    }>Delete</a>
                </Space >
            )
        }
    ];

    //-------------------------------------------------------------------------------------//   
    //Importing data in table
    const data = [];
    // eslint-disable-next-line
    tasks.map((task) => {
        data.push(task);
    })

    //-------------------------------------------------------------------------------------//   
    //Handaling delete request
    function handleDelete(id) {
        setTask(deleteTask(id));
    }

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    // -----------------------------------------------------------------------------------//
    //Handaling update request
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let tagArr = [];

    const showModal = async (record) => {
        setVisible(true);
        await setTask(record)
    };

    const handleOk = async (e) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        e.preventDefault();
        let givenDueDate = document.getElementById('dueDate').value;
        if (givenDueDate) {
            const x = new Date();
            const y = new Date(givenDueDate);
            if (x > y) {
                alert("Enter a valid date");
            }
            else
                task.dueDate = givenDueDate;
        }
        await updateTask(task._id, task.title, tagArr, task.Status, task.dueDate, task.description);
        setTask({ title: "", description: "", tag: "", Status: "", dueDate: '' });
    };

    const handleCancel = () => {
        setVisible(false);
        setTask({ title: "", description: "", tag: "", Status: "", dueDate: '' });
    };

    const didChange = (e) => {
        if (e.target.name === 'tag') {
            if (!tagArr.includes(e.target.value)) {
                tagArr.push(e.target.value);
            }
            else {
                tagArr = tagArr.filter(item => item !== e.target.value)
            }
        }
        else {
            setTask({ ...task, [e.target.name]: e.target.value })
        }
    }

    // -----------------------------------------------------------------------------------//

    return (
        <>
            <Table
                dataSource={data} columns={columns} onChange={onChange}>
            </Table>

            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form className='inputForm'
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >

                    <Form.Item htmlFor='title' label="Title" required='true'  >
                        <Input name='title' value={task.title} onChange={didChange} />
                    </Form.Item>
                    <Form.Item htmlFor='description' label="Description" required='true'>
                        <TextArea rows={4} name='description' value={task.description} onChange={didChange} />
                    </Form.Item>
                    <Form.Item htmlFor='dueDate' label="Due Date">
                        <DatePicker type="date" id='dueDate' name='dueDate' />
                    </Form.Item>
                    <Form.Item htmlFor='Status' label="Status">
                        <Radio.Group name='Status'>
                            <Radio value="Open" onChange={didChange}> Open </Radio>
                            <Radio value="Working" onChange={didChange}> Working </Radio>
                            <Radio value="Done" onChange={didChange}> Done </Radio>
                            <Radio value="Overdue" onChange={didChange}> Overdue </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item htmlFor='tag' label="tags" name='tag' >
                        <Checkbox.Group name='tag' >
                            <Checkbox value='Personal' onChange={didChange}>Personal</Checkbox>
                            <Checkbox value='Work' onChange={didChange}>Work</Checkbox>
                            <Checkbox value='Priority' onChange={didChange}>Priority</Checkbox>
                            <Checkbox value='Urgent' onChange={didChange}>Urgent</Checkbox>
                            <Checkbox value='Important' onChange={didChange}>Important</Checkbox>
                            <Checkbox value='Need Focus' onChange={didChange}>Need Focus</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>


    );
}

export default Tasks;

