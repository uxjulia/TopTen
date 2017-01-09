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
        this.state = {search: "", results:[], show: false};
    }
    setResults = (result) => {
        this.setState({results: result, show: true});
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
        const results = this.state.results;
        const show = this.state.show;
       
        return(
            <div>
                <form className="form-group">
                    <div className="form-group">
                        <label htmlFor="search" className="label-control sr-only">Search</label>
                        <input className="form-control" id="search" value={this.state.search} onChange={handleChange} placeholder="Enter an Artist, Song or Album Name"/>
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="btn btn-primary">Search</button>
                    </div>
                </form>
                {show && <Results handleAdd={handleAdd} data={results} />}
            </div>
        )
    }
  }

export default SearchForm;