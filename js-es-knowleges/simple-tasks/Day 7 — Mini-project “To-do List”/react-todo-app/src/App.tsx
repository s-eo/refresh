import React, {useEffect, useMemo, useState} from 'react';

import type {Todo} from "./types/todo";
import {Filter} from "./types/filter";

import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList";
import Card from "./components/Card/Card";
import TodoFilter, {filterFunction} from "./components/TodoFilter/TodoFilter";
import {getTodos, storeTodos} from "./components/LocalStorage/LocalStorage-helpers";

import logo from './logo.svg';
import './App.css';


function App() {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [filter, setFilter]  = useState<Filter>("all");

    const visibleTasks = useMemo(() => filterFunction(tasks, filter), [tasks, filter]);

    useEffect(() => setTasks(getTodos), []);

    const saveTasks = (tasks: Array<Todo>) => {
        setTasks(tasks);
        storeTodos(tasks);
    };

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
                    setTasks={saveTasks}
                />
            </Card>
            <Card>
                <TodoFilter filter={filter} setFilter={setFilter} />
                <TodoList
                    tasks={visibleTasks}
                    setTasks={saveTasks}
                />
            </Card>
        </div>
      </article>
    </div>
  );
}

export default App;
