import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/search';
import TopTenList from './components/TopTen';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {topTen: [], toggled: true};
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

  render() {
    const handleAdd = this.handleAdd;
    const handleRemove = this.removeItem;
    const topTen = this.state.topTen;
    const handleToggle = this.handleToggle;
    const toggled = this.state.toggled;

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
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-12">
              <div className="col-md-6 form-group">
                  <TopTenList handleToggle={handleToggle} toggled={toggled} remove={handleRemove} data={topTen} />
              </div>
              <div className="col-md-6">
                  <SearchForm handleAdd={handleAdd} />
              </div>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default App;

