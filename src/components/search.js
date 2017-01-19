import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Results from './Results';
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
        }

    handleSubmit = (e) => {
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
        const handleAdd = this.props.handleAdd;
        const results = this.props.results;
        const show = this.state.show;
        const topTen = this.props.topTen;
       
        return(
            <div className="row">
                <div className="col-md-6">
                    <form className="form-group">
                        <div className="form-group">
                            <input className="form-control" id="search" value={this.state.search} onChange={handleChange} placeholder="Enter an Artist, Song or Album Name"/>
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary">Search</button>
                      </form>
                  </div>
                <div className="col-md-6">{show && <Results topTen={topTen} handleAdd={handleAdd} data={results} />}</div>
            </div>
        )
    }
  }

export default SearchForm;