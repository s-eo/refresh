import React, {useState} from "react";

import type {Todo} from "../types/todo";

import TodoList from "../components/TodoList";
import NewTodoItem from "../components/NewTodoItem";

const preDefinedTasks: Array<Todo> = [
    {
        id: 1,
        title: 'Create project',
        completed: true,
    },
    {
        id: 2,
        title: 'Create basic components',
        completed: true,
    },
    {
        id: 3,
        title: 'Make fine vue',
        completed: false,
    }
];

export default function Home() {
    const [tasks, setTasks] = useState(preDefinedTasks);
    const [newTaskName, setNewTaskName] = useState('');

    const toggleTodo = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }

            return task;
        }))
    }

    const deleteTodo = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(event.target.value);
    }


    const handleAddingTask = ()=> {
        let maxId = 0;
        tasks.forEach(task => {
            if (task.id > maxId) {
                maxId = task.id;
            }
        })

        setTasks([...tasks, { completed: false, title: newTaskName, id: ++maxId }]);
        setNewTaskName('');
    }

    return (
        <div>
            <NewTodoItem
                name={newTaskName}
                onNameChange={handleTextChange}
                addTask={handleAddingTask}
            />
            <TodoList
                todos={tasks}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}