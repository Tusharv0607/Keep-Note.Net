import taskContext from "./taskContext";
import React, { useState } from "react";

const TaskState = (props) => {

    const host = 'https://keep-note-backend.herokuapp.com';
    const Initial = []
    const [tasks, setTasks] = useState(Initial);

    //------------------------------------------------------------------------------------------------------------------------------//
    //Get all Tasks

    const getTasks = async () => {

        const response = await fetch(`${host}/tasks/fetchTasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setTasks(json);
    };

    //------------------------------------------------------------------------------------------------------------------------------//
    //Add task
    const addTask = async (title, description, dueDate, Status, tag) => {

        const response = await fetch(`${host}/tasks/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, dueDate, Status, tag })
        })

        const newTask = await response.json();

        if (response.status === 200) {
            alert("Added Successfully")
            setTasks(tasks.concat(Object.values(newTask)));
        }
        else if (response.status === 400) {
            alert("Enter all the details correctly!")
        }
        else {
            alert("Task wasn't added")
            console.log("Internal Server Error")
        }
    };
    //------------------------------------------------------------------------------------------------------------------------------//
    //Delete note

    const deleteTask = async (id) => {

        const response = await fetch(`${host}/tasks/deleteTask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',        
                'auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            const newTasks = tasks.filter((task) => { return task._id !== id });
            setTasks(newTasks);
            alert("Note Deleted Successfully")
        }
        else if (response.status === 401) {
            alert("Note not found")
        }
        else if (response.status === 404) {
            alert("Access Denied! Unable to delete.")
        }
        else {
           alert("Note not deleted")
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------//
    //Update note

    const updateTask = async (id, title, tag, Status, dueDate, description) => {
        // -----------------------
        const response = await fetch(`${host}/tasks/editTask/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',          
                'auth-token': localStorage.getItem('token')
            }, body: JSON.stringify({ title: title, tag: tag, Status: Status,dueDate: dueDate, description: description })
        });

        if (response.status === 200) {
            alert("Note Updated Successfully", "success")
            const newTask = JSON.parse(JSON.stringify(tasks));
            for (let i = 0; i < tasks.length; i++) {
                const element = tasks[i];

                if (element._id === id) {

                    if (title !== "")
                        newTask[i].title = title;

                    if (description !== "")
                        newTask[i].description = description;

                    if (tag !== "")
                        newTask[i].tag = tag;

                    if (Status !== "")
                        newTask[i].Status = Status;

                    if (dueDate !== "")
                        newTask[i].dueDate = dueDate;

                    break;
                }
            }
            setTasks(newTask);
        }
        else if (response.status === 401) {
            alert("Note not found", "warning")
        }
        else if (response.status === 404) {
            alert("Access Denied! Unable to delete.", "danger")
        }
        else {
            alert("Note not deleted", "danger")
        }

    }

    return (
        <taskContext.Provider value={{ tasks, getTasks, addTask, setTasks ,deleteTask, updateTask}}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;
