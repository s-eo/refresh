import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <article className="App-content">
        <header>
            <h1>To-Do list</h1>
        </header>
        <img src={logo} className="App-logo" alt="logo"/>
        <div>
          <Home/>
        </div>
      </article>
    </div>
  );
}

export default App;
