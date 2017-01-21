import React, {Component} from 'react';
import Item from './Item';

class Results extends Component {
	constructor(props){
		super(props);
		this.state = {track: []};
	}

	render(){
		const uiRender = [];
		const results = this.props.data.tracks.items;
		const handleAdd = this.props.handleAdd;
		results.forEach(function(obj, index){
			const props = {checked: obj.checked, id:obj.id, artist: obj.artists[0].name, name: obj.name, album: obj.album.name, image: obj.album.images[0].url, preview: obj.preview_url};
			uiRender.push(<Item key={obj.id} onClick={handleAdd} {...props} />);
		});
		const style = {
			width: "100%" 
		}
		return(
			<div style={style} className="mdl-card mdl-list">{uiRender}</div>
		)
	}
}

export default Results;