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
				color: "#5F7D8B"
			},
			image: {
				height: "auto",
				width: "auto",
				backgroundColor: "unset",
				marginRight: "10px"
			},
			content: {
				height: "auto"
			}
		};
		const checked = this.props.checked;
		return(
			<li className="mdl-list__item mdl-list__item--three-line searchItem">
				<span style={style.content} className="mdl-list__item-primary-content">
					<i style={style.image} className="mdl-list__item-avatar"><img className="albumImage" src={this.props.image}></img></i>
				  <span className="mdl-list__item-text-body">
				  	<p>{this.props.name}</p>
					  <p><strong>{this.props.artist}</strong></p>
				  </span>
				  
				</span>
					<span className="mdl-list__item-secondary-content">
					  <a onClick={this.handleClick} className="mdl-list__item-secondary-action">
						  {!checked && <span><i style={style.icon} className="fa fa-plus fa-pull-right" title="Add to Playlist"></i></span>}
						  {checked && <span><i style={style.iconChecked} className="fa fa-check fa-pull-right" title="Add to Playlist"></i></span>}
						  </a>
					</span>
			  </li>
		)
	}
}

export default Item;