import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/search';
import TopTenList from './components/TopTen';
import Nav from './components/Nav';
import Results from './components/Results';

class HighlightedIcon extends Component {
    constructor(props){
        super(props);
        this.state = {active: true};
    }

    componentDidMount(){
        this.iconID = setTimeout(() => this.setState({active: false}), 1500);
    };

    render(){
        const color = {
          color: "unset",
          active: {
            color: "#40C4FF"
          }
        };
        const active = this.state.active;
        return(
            <div>
                {active && <i style={color.active} className="material-icons">playlist_add_check</i> }
                {!active && <i style={color} className="material-icons">queue_music</i> }
            </div>
        )
      }
}

class App extends Component {
    constructor ( props ) {
        super (props);
        this.state = { playlistName: "", searchResults: [], topTen: [], showResults: false, menuIcon: [<i key="normal" className="material-icons">queue_music</i>] };
    };
    
    duplicateExists = ( id ) => {
        const topTen = this.state.topTen;
        const songIds = topTen.map (( obj ) => obj.id);
        for (let i = songIds.length - 1; i >= 0; i--) {
            if (songIds[ i ] === id) {
                return true
            }
        }
    };
    
    setCheckMark = ( results, topTen, duplicateExists ) => {
        duplicateExists = this.duplicateExists;
        if (topTen === undefined) {
            return
        }
        const item = results.tracks.items;
        item.forEach (function ( obj ) {
            obj.checked = duplicateExists (obj.id) === true;
        });
    };
    
    setResults = ( result ) => {
        const topTen = this.state.topTen;
        this.setCheckMark (result, topTen);
        this.setState ({ searchResults: result });
        this.setState ({ showResults: true });
    };
    
    showToast = ( item ) => {
        let data = { message: item + ' was just added to your playlist!' };
        this.toast.MaterialSnackbar.showSnackbar (data);
    };

    handleAdd = ( obj ) => {
        const topTen = this.state.topTen;
        const id = obj.id;
        obj.checked = true;
        let duplicateExists = this.duplicateExists;
        if (topTen.length !== 10 && duplicateExists (id, topTen) !== true) {
            topTen.push (obj);
            this.showToast (obj.name);
            this.setState ({ topTen: topTen });
            this.setCheckMark (this.state.searchResults, this.state.topTen);
            this.setState({menuIcon: <HighlightedIcon key={obj.id}/>});
        }
    };
    
    removeItem = ( e ) => {
        e.preventDefault ();
        const nTopTen = this.state.topTen;
        const x = e.target.id;
        for (let i = nTopTen.length - 1; i >= 0; i--) {
            if (nTopTen[ i ].id === x) {
                nTopTen.splice (i, 1);
            }
        }
        this.setState ({ topTen: nTopTen });
        this.setCheckMark (this.state.searchResults, this.state.topTen);
    };
    
    handleInput = ( e ) => {
        this.setState ({ playlistName: e.target.value });
    };
    
    render () {
        const handleAdd = this.handleAdd;
        const handleInput = this.handleInput;
        const handleRemove = this.removeItem;
        const topTen = this.state.topTen;
        // const handleToggle = this.handleToggle;
        // const toggled = this.state.toggled;
        const total = this.state.topTen.length;
        const playlistName = this.state.playlistName;
        const setResults = this.setResults;
        const results = this.state.searchResults;
        const showResults = this.state.showResults;
        const menuIcon = this.state.menuIcon;

        const style = { card: { minHeight: "50px", width: "100%" }, grid: { maxWidth: "800px" } };
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title"> Top Ten Playlist</span>
                        <div className="mdl-layout-spacer"/>
                    </div>
                    <div aria-expanded="false" role="button" tabIndex="0" className="mdl-layout__drawer-button">
                        {menuIcon}
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Playlist</span>
                    <nav className="mdl-navigation">
                        <TopTenList remove={handleRemove} data={topTen}/>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <div style={style.grid} className="mdl-grid">
                            <div className="mdl-cell mdl-cell--12-col">
                                <section>
                                    <div style={style.card} className="mdl-card mdl-shadow--2dp">
                                        <div className="mdl-card__supporting-text">
                                            <SearchForm setResults={setResults} handleAdd={handleAdd}
                                                        results={results}/>
                                            Search by Artist, Album or Track keyword
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    {showResults && <Results data={results} handleAdd={handleAdd}/>}
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
                <div id="toast" className="mdl-js-snackbar mdl-snackbar" ref={div => this.toast = div}>
                    <div className="mdl-snackbar__text"></div>
                    <button className="mdl-snackbar__action" type="button"></button>
                </div>
            </div>
        );
    }
}

export default App;

