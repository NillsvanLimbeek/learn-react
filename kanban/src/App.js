import React from 'react';
import './assets/scss/main.scss';

import Navbar from './components/navbar/Navbar';

function App() {
    let name = 'Nills';

    const setName = (e) => {
        name = e;
    };

    return (
        <div className="App">
            <Navbar name={name} setName={setName} />
        </div>
    );
}

export default App;
