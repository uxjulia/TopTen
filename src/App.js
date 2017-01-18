import React, { Component } from 'react';
// eslint-disable-next-line
import bootstrap from 'bootstrap';
import './App.css';
import SearchForm from './components/search';
import TopTenList from './components/TopTen';
import Nav from './components/Nav';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {playlistName: "", topTen: [], toggled: true};
    }

  duplicateExists = (id) => {
    const topTen = this.state.topTen;
    const songIds = topTen.map((obj) => obj.id);
    for (var i = songIds.length - 1; i >= 0; i--) {
      if (songIds[i] === id) {
        console.log("Duplicate Found");
         return true
      }
    }
  }

  handleAdd = (obj) =>{
    const topTen = this.state.topTen;
    const id = obj.id;
    let duplicateExists = this.duplicateExists;
    if (topTen.length !== 10 && duplicateExists(id) !== true) topTen.push(obj);
    this.setState({topTen: topTen});
  };

  removeItem = (e) => {
    e.preventDefault();
    console.log('removing item');
    const nTopTen = this.state.topTen;
    const x = e.target.id;
    for (var i = nTopTen.length - 1; i >= 0; i--) {
      if (nTopTen[i].id === x) {
         nTopTen.splice(i, 1);
      }
    }
    this.setState({topTen: nTopTen});
  };


  handleToggle = ( e ) => {
      this.setState (( prevState ) => ({ toggled: !prevState.toggled }));
      e.preventDefault ();
  };

  handleInput = (e) =>{
    this.setState({playlistName: e.target.value});
  }

  render() {
    const handleAdd = this.handleAdd;
    const handleInput = this.handleInput;
    const handleRemove = this.removeItem;
    const topTen = this.state.topTen;
    const handleToggle = this.handleToggle;
    const toggled = this.state.toggled;
    const total = this.state.topTen.length;
    const playlistName = this.state.playlistName;
    return (
      <div>
        <Nav onChange={handleInput} total={total} playlistName={playlistName} content={<TopTenList handleToggle={handleToggle} toggled={toggled} remove={handleRemove} data={topTen} />}/>
        <div className="container content">
          <div>
            <SearchForm handleAdd={handleAdd} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

