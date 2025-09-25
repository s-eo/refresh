import React, {useEffect, useMemo, useState} from 'react';

import type {Todo} from "./types/todo";
import {Filter} from "./types/filter";

import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList/TodoList";
import Card from "./components/Card/Card";
import ClearCompleted from "./components/ClearCompleted/ClearCompleted";
import TodoFilter, {filterFunction} from "./components/TodoFilter/TodoFilter";
import {getTodos, storeTodos} from "./components/LocalStorage/LocalStorage-helpers";
import FunctionalityRow from "./components/FunctionalityRow/FunctionalityRow";
import RemainPanel from "./components/RemainPanel/RemainPanel";

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
          <Card width="column">
              <header>
                  <h1>To-Do list</h1>
              </header>
              <div>
                  <Card>
                      <NewTodoItem
                          tasks={tasks}
                          setTasks={setTasks}
                      />
                      <TodoFilter filter={filter} setFilter={setFilter}/>
                      <FunctionalityRow>
                          <RemainPanel tasks={tasks} />
                          <ClearCompleted tasks={tasks} setTasks={setTasks}/>
                      </FunctionalityRow>
                  </Card>
                  <Card>
                      <TodoList
                          tasks={tasks}
                          visibleTasks={visibleTasks}
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
