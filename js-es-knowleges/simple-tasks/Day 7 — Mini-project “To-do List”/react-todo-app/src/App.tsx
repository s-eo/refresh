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


function App() {
    const [filter, setFilter]  = useState<Filter>("all");

    return (
    <div className="App">
      <article className="App-content">
          <Card width="column">
              <header>
                  <h1 className='title'>To-Do list</h1>
              </header>
             <TodoProvider>
                 <Card>
                     <NewTodoItem />
                     <TodoFilter filter={filter} setFilter={setFilter}/>
                     <FunctionalityRow>
                         <RemainPanel />
                         <ClearCompleted />
                     </FunctionalityRow>
                 </Card>
                 <Card>
                     <FetchManager>
                         <TodoList filter={filter} />
                     </FetchManager>
                 </Card>
             </TodoProvider>
          </Card>
      </article>
    </div>
  );
}

export default App;
