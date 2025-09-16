import React, {useEffect, useMemo, useState} from 'react';

import type {Todo} from "./types/todo";
import {Filter} from "./types/filter";

import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList/TodoList";
import Card from "./components/Card/Card";
import ClearCompleted from "./components/ClearCompleted/ClearCompleted";
import TodoFilter, {filterFunction} from "./components/TodoFilter/TodoFilter";
import {getTodos, storeTodos} from "./components/LocalStorage/LocalStorage-helpers";

import logo from './logo.svg';
import './App.css';


function App() {
    const [tasks, setTasks] = useState<Todo[]>(() => getTodos());
    const [filter, setFilter]  = useState<Filter>("all");

    const visibleTasks = useMemo(() => filterFunction(tasks, filter), [tasks, filter]);

    // save all changes to Local Storage
    useEffect(() => {
        storeTodos(tasks);
    }, [tasks]);

  return (
    <div className="App">
      <article className="App-content">
          <Card width="half-window">
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
                      <TodoFilter filter={filter} setFilter={setFilter}/>
                      <ClearCompleted tasks={tasks} setTasks={setTasks}/>
                  </Card>
                  <Card>
                      <TodoList
                          tasks={visibleTasks}
                          setTasks={setTasks}
                      />
                  </Card>
              </div>
          </Card>
      </article>
    </div>
  );
}

export default App;
