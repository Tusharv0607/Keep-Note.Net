import React, { useState, useContext } from 'react';
import taskContext from '../context/taskContext';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Checkbox
} from 'antd';
const { TextArea } = Input;

const AddTask = () => {
    const [form] = Form.useForm();
    // -----------------------------------------------------------------------------------//
    //Using Contexts

    const context = useContext(taskContext);
    const { addTask } = context;

    const [task, setTask] = useState({ title: "", description: "", tag: "", Status: "", dueDate: "" })

    // -----------------------------------------------------------------------------------//
    //Handaling add request

    let tagArr = [];

    const handleSubmit = async (e) => {
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
        await addTask(task.title, task.description, task.dueDate, task.Status, tagArr);
        form.resetFields();
        setTask({ title: "", description: "", tag: "", Status: "", dueDate: '' });

    }

    const onChange = (e) => {
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
            <div className='head'>
                <h3 className='heading'>Add Task</h3>
            </div>
            <Form className='inputForm' form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >

                <Form.Item htmlFor='title' label="Title" required='true'  >
                    <Input name='title' value={task.title} onChange={onChange} />
                </Form.Item>
                <Form.Item htmlFor='description' label="Description" required='true'>
                    <TextArea rows={4} name='description' value={task.description} onChange={onChange} />
                </Form.Item>
                <Form.Item htmlFor='dueDate' label="Due Date">
                    <DatePicker type="date" id='dueDate' name='dueDate' />
                </Form.Item>
                <Form.Item htmlFor='Status' label="Status">
                    <Radio.Group name='Status' value={task.Status}>
                        <Radio value="Open" onChange={onChange}> Open </Radio>
                        <Radio value="Working" onChange={onChange}> Working </Radio>
                        <Radio value="Done" onChange={onChange}> Done </Radio>
                        <Radio value="Overdue" onChange={onChange}> Overdue </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item htmlFor='tag' label="tags" name='tag' >
                    <Checkbox.Group name='tag' >
                        <Checkbox value='Personal' onChange={onChange}>Personal</Checkbox>
                        <Checkbox value='Work' onChange={onChange}>Work</Checkbox>
                        <Checkbox value='Priority' onChange={onChange}>Priority</Checkbox>
                        <Checkbox value='Urgent' onChange={onChange}>Urgent</Checkbox>
                        <Checkbox value='Important' onChange={onChange}>Important</Checkbox>
                        <Checkbox value='Need Focus' onChange={onChange}>Need Focus</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <div className='sbmtBtnBar'>
                    <Button className='submitBtn' onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </>
    )
};

export default AddTask;
