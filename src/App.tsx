import React, {lazy, useState, Suspense} from 'react';

import {Filter} from "./types/filter";

import {TodoProvider} from "./components/TodoContext/TodoContext";
import NewItemLoader from "./components/NewTodoItem/Loader";
import TodoList from "./components/TodoList/TodoList";
import Card from "./components/Card/Card";
import ClearCompleted from "./components/ClearCompleted/ClearCompleted";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import FunctionalityRow from "./components/FunctionalityRow/FunctionalityRow";
import RemainPanel from "./components/RemainPanel/RemainPanel";
import NotificationManager from "./components/Notification/NotificationManager";

import './App.css';

const NewTodoItem = lazy(() =>
    import("./components/NewTodoItem/NewTodoItem"));


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
                      <Suspense fallback={<NewItemLoader />}>
                          <NewTodoItem />
                      </Suspense>
                      <TodoFilter filter={filter} setFilter={setFilter}/>
                      <FunctionalityRow>
                          <RemainPanel />
                      </FunctionalityRow>
                  </Card>
                  <Card className="shrinkable" role="main">
                      <TodoList filter={filter} />
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
