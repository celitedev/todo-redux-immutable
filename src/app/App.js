import React, { Component } from 'react';

import 'normalize.css';
import styles from './App.css';

import Input from './input/Input.container';
import Todos from './todos/Todos.container';
import Footer from './footer/Footer.container';

class App extends Component {
  render() {
    
   return (
      <div>
        <h1 className={styles.title}>Todo list</h1>
        <div className={styles.list}>
          <Input />
          <Todos />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
