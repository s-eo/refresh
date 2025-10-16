import React, {useState} from 'react';

import {Filter} from "./types/filter";

import {TodoProvider} from "./components/TodoContext/TodoContext";
import NewTodoItem from "./components/NewTodoItem/NewTodoItem";
import TodoList from "./components/TodoList/TodoList";
import Card from "./components/Card/Card";
import ClearCompleted from "./components/ClearCompleted/ClearCompleted";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import FunctionalityRow from "./components/FunctionalityRow/FunctionalityRow";
import RemainPanel from "./components/RemainPanel/RemainPanel";
import FetchManager from "./components/FetchManager/FetchManager";

import './App.css';
import NotificationManager from "./components/Notification/NotificationManager";


function App() {
    const [filter, setFilter]  = useState<Filter>("all");

    return (
    <div className="App">
      <Card visible className="App-content">
          <header>
              <h1 className='title'>To-Do list</h1>
          </header>
          <NotificationManager>
              <TodoProvider>
                  <Card>
                      <NewTodoItem />
                      <TodoFilter filter={filter} setFilter={setFilter}/>
                      <FunctionalityRow>
                          <RemainPanel />
                      </FunctionalityRow>
                  </Card>
                  <Card className="shrinkable">
                      <FetchManager>
                          <TodoList filter={filter} />
                      </FetchManager>
                  </Card>
                  <Card>
                      <ClearCompleted />
                  </Card>
              </TodoProvider>
          </NotificationManager>
      </Card>
    </div>
  );
}

export default App;
