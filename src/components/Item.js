import React, { Component } from 'react';

class Item extends Component{
	constructor(props){
		super(props);
		this.state = {clicked: false};
	}
	handleClick = () => {
		this.setState((prevState) => ({clicked: true}));
		const obj ={checked: this.props.checked, id: this.props.id, artist: this.props.artist, name: this.props.name, album: this.props.album, image: this.props.image};
		this.props.onClick(obj);
	};
	render(){
		const style = {
			display: "block",
			icon: {
				color: "#6C6C6C"
			},
			iconChecked: {
				color: "#80C1C8"
			}
		}
		const checked = this.props.checked;
		return(
			  <button style={style} onClick={this.handleClick} className="list-group-item list-group-item-action">
			    <strong>{this.props.artist}</strong> - {this.props.name}
			    {!checked && <span><i style={style.icon} className="fa fa-plus fa-pull-right" title="Add to Playlist"></i></span>}
			    {checked && <span><i style={style.iconChecked} className="fa fa-check fa-pull-right" title="Add to Playlist"></i></span>}
			  </button>
		)
	}
}

export default Item;