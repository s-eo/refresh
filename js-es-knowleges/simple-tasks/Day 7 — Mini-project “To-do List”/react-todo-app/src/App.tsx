import React, {useMemo, useState} from 'react';
import type {Todo} from "./types/todo";

import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList";

import logo from './logo.svg';
import './App.css';
import Card from "./components/Card/Card";
import TodoFilter, {filterFunction} from "./components/TodoFilter/TodoFilter";
import {Filter} from "./types/filter";


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
export const filters: Array<Filter> = ['all', 'active', 'completed'];


function App() {
    const [tasks, setTasks] = useState<Todo[]>(preDefinedTasks);
    const [filter, setFilter]  = useState<Filter>("all");

    const visibleTasks = useMemo(() => filterFunction(tasks, filter), [tasks, filter]);

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

    const getNextId = () => {
        let maxId = 0;
        tasks.forEach(task => {
            if (task.id > maxId) {
                maxId = task.id;
            }
        })

        return ++maxId;
    }

    const addTask = (newTaskName: string)=> {
        setTasks([...tasks, { completed: false, title: newTaskName, id: getNextId() }]);
    }

  return (
    <div className="App">
      <article className="App-content">
        <header>
            <h1>To-Do list</h1>
        </header>
        <img src={logo} className="App-logo" alt="logo"/>
        <div>
            <Card>
                <NewTodoItem addTask={addTask} />
            </Card>
            <Card>
                <TodoFilter filter={filter} setFilter={setFilter} />
                <TodoList
                    todos={visibleTasks}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            </Card>
        </div>
      </article>
    </div>
  );
}

export default App;
