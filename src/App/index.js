import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid/v4';

class App extends Component {
  state = {
    wishlist: [
      {
        id: uuid(),
        name: "madewell sweater",
        link: "optional",
        size: "small",
        notes: "please!",
      },
    ]
  }

  addItem = (event) => {
    event.preventDefault();
    const { name, link, size, notes } = this._form.elements;
    this.setState({wishlist: [
      ...this.state.wishlist,
      {
        id: uuid(),
        name: name.value,
        link: link.value,
        size: size.value,
        notes: notes.value,
      }
    ]});
    this._form.reset();
    name.focus();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <thead>
            <tr>
              <th>Thing</th>
              <th>Size</th>
              <th>Notes:</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wishlist.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form ref={form => this._form = form} onSubmit={this.addItem}>
          <label>What do you want?<input name="name"/></label>
          <label>Does it have a link?<input name="link"/></label>
          <label>What size?<input name="size"/></label>
          <label>Any notes?<textarea name="notes"/></label>
          <button>Add me!</button>
        </form>
      </div>
    );
  }
}

export default App;
