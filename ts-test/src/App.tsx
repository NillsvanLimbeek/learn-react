import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";

import { Head } from "./components/Head";
import { BaseInput } from "./components/BaseInput";

function App() {
  const [value, setValue] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
    console.log(e.currentTarget.name);
  };

  return (
    <div className="App">
      <Head title="Hello" />

      <BaseInput onChange={onChange} value={value} />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
