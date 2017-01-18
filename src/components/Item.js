import React, { Component } from 'react';

class Item extends Component{
	handleClick = () => {
		const obj ={id: this.props.id, artist: this.props.artist, name: this.props.name, album: this.props.album, image: this.props.image};
		this.props.onClick(obj);
	};
	render(){
		return(
			  <button onClick={this.handleClick} type="button" className="list-group-item list-group-item-action">
			    <strong>{this.props.artist}</strong> - {this.props.name}<span></span>
			  </button>
		)
	}
}

export default Item;