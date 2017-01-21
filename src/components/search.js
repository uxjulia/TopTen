import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId : '1dfae8e99ec94e3c93311101b1ace8bc',
    clientSecret : '15f574a1da18417d96359f1a6140bbfd',
    redirectUri : 'http://localhost:3000/callback'
});

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {search: "", show: false};
    }
    
    setResults = (result) => {
        this.props.setResults(result);
        this.setState({show: true});
    };
 
    getSearch = (search, setResults) => {
        setResults = this.setResults;
        spotifyApi.searchTracks(search)
            .then(function(data) {
                console.log('Search results for ' + search, data.body);
                setResults(data.body);
            }, function(err) {
                console.error(err);
            });
        };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("searching");
        e.preventDefault();
        const search = this.state.search;
        this.getSearch(search);
    };

    handleChange = (e) => {
        this.setState({search: e.target.value});
    };

    render(){
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;
        // const handleAdd = this.props.handleAdd;
        // const results = this.props.results;
        // const show = this.state.show;
        // const topTen = this.props.topTen;
        const style = {
            font: {
                color: "inherit" || this.props.fontColor
            },
            width: {
                width: "100%"
            }
        }
       
        return(
            <div>
                {this.props.expandable && 
                    <form onSubmit={handleSubmit}>
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="sample6">
                          <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                          <input className="mdl-textfield__input" type="text" id="sample6" />
                          <label className="mdl-textfield__label" htmlFor="sample-expandable">Search</label>
                        </div>
                      </div>
                    </form>
                  }
           
                {!this.props.expandable && 
                    <form onSubmit={handleSubmit}>
                        <div style={style.width} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input onChange={handleChange} className="mdl-textfield__input" type="text" id="sample3" />
                            <label style={style.font} className="mdl-textfield__label" htmlFor="sample3">Search...</label>
                        </div>
                    </form>
                }
              </div>
                   
        )
    }
  }

export default SearchForm;