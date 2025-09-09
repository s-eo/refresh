import React, {useMemo, useState} from 'react';

import type {Todo} from "./types/todo";
import {Filter} from "./types/filter";

import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList";
import Card from "./components/Card/Card";
import TodoFilter, {filterFunction} from "./components/TodoFilter/TodoFilter";

import logo from './logo.svg';
import './App.css';


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

  return (
    <div className="App">
      <article className="App-content">
        <header>
            <h1>To-Do list</h1>
        </header>
        <img src={logo} className="App-logo" alt="logo"/>
        <div>
            <Card>
                <NewTodoItem
                    tasks={tasks}
                    setTasks={setTasks}
                />
            </Card>
            <Card>
                <TodoFilter filter={filter} setFilter={setFilter} />
                <TodoList
                    tasks={visibleTasks}
                    setTasks={setTasks}
                />
            </Card>
        </div>
      </article>
    </div>
  );
}

export default App;
