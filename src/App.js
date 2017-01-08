import React, { Component } from 'react';
import './App.css';
import '../dist/font-awesome-4.7.0/css/font-awesome.min.css';
import SearchForm from './components/search';
import TopTenList from './components/TopTen';
// import update from './immutability-helper';

 

class App extends Component {
    constructor(props){
        super(props);
        this.state = {topTen: []};
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

  render() {
    const handleAdd = this.handleAdd;
    const handleRemove = this.removeItem;
    const topTen = this.state.topTen;
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Top Ten Playlist
                </a>
            </div>
          </div>
        </nav>
        <div className="col-md-12">
            <div className="col-sm-6 col-md-6 form-group">
                <TopTenList remove={handleRemove} data={topTen} />
            </div>
            <div className="col-md-6 col-sm-6">
                <SearchForm handleAdd={handleAdd} />
            </div>
        </div>
        </div>
    );
  }
}

export default App;
