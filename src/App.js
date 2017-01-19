import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/search';
import TopTenList from './components/TopTen';
import Nav from './components/Nav';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {playlistName: "", searchResults:[], topTen: [], toggled: true};
    };


  duplicateExists = (id) => {
    const topTen = this.state.topTen;
    const songIds = topTen.map((obj) => obj.id);
    for (var i = songIds.length - 1; i >= 0; i--) {
      if (songIds[i] === id) {
         return true
      }
    }
  };

  setCheckMark = (results, topTen, duplicateExists) => {
    duplicateExists = this.duplicateExists;
    if (topTen === undefined) {
      return
    }
    const item = results.tracks.items;
    item.forEach(function(obj) {
      obj.checked = duplicateExists(obj.id) === true ? true : false;
    });
  };

  setResults = (result) => {
    const topTen = this.state.topTen;
    this.setCheckMark(result, topTen);
    this.setState({searchResults: result});
  };

  handleAdd = (obj) =>{
    const topTen = this.state.topTen;
    const id = obj.id;
    obj.checked = true;
    let duplicateExists = this.duplicateExists;
    if (topTen.length !== 10 && duplicateExists(id, topTen) !== true) topTen.push(obj);
    this.setState({topTen: topTen});
    this.setCheckMark(this.state.searchResults, this.state.topTen);
  };

  removeItem = (e) => {
    e.preventDefault();
    const nTopTen = this.state.topTen;
    const x = e.target.id;
    for (var i = nTopTen.length - 1; i >= 0; i--) {
      if (nTopTen[i].id === x) {
         nTopTen.splice(i, 1);
      }
    }
    this.setState({topTen: nTopTen});
    this.setCheckMark(this.state.searchResults, this.state.topTen);
  };


  handleToggle = (e) => {
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
    const setResults = this.setResults;
    const results = this.state.searchResults;
    return (
      <div>
        <Nav onChange={handleInput} total={total} playlistName={playlistName} content={<TopTenList handleToggle={handleToggle} toggled={toggled} remove={handleRemove} data={topTen} />}/>
        <div className="container content">
          <div>
            <SearchForm setResults={setResults} handleAdd={handleAdd} results={results} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

