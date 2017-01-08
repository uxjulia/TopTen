import React, { Component } from 'react';

class Item extends Component{
	handleClick = () => {
		const obj ={id: this.props.id, artist: this.props.artist, name: this.props.name, album: this.props.album, image: this.props.image};
		this.props.onClick(obj);
	};
	render(){
		const imgStyle = {
			maxWidth: "75px"
		};
		const padding = {
		    padding: "0px"
        };
		return(
			<div>
				<div onClick={this.handleClick} id={this.props.name} className="itemContainer panel panel-default col-sm-12">
                    <div style={padding} className="panel-body">
                        <img alt={this.props.name} className="pull-left albumImage" style={imgStyle} id={this.props.name} src={this.props.image}></img>
                        <strong id={this.props.name}>{this.props.name}</strong><br/>
                        {this.props.artist}<br/><br/>
                        Album: {this.props.album}<br/>
                        <span className="pull-right"><i className="fa fa-plus"></i></span>
                    </div>
				</div>
			</div>
		)
	}
}

export default Item;