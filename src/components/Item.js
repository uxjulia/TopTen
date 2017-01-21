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
		};
		const checked = this.props.checked;
		return(
			<li className="mdl-list__item mdl-list__item--three-line">
				<span className="mdl-list__item-primary-content">
					<i className="mdl-list__item-avatar"><img className="albumImage" src={this.props.image}></img></i>
			
				  <span>{this.props.name}</span>
				  <span className="mdl-list__item-text-body">
					  {this.props.artist}
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