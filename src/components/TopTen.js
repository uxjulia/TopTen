import React, { Component } from 'react';

class ListItem extends Component {
    render () {
        const style = { padding: "5px"
        };
        const imgStyle = {
            maxWidth: "50px"
        };
        return (
            <li style={style} className="panel panel-default">
                <div style={style} className="panel-body">
                    <i style={style} className="pull-left fa fa-sort" aria-hidden="true"></i>
                    <img alt={this.props.name} className="pull-left albumImage" style={imgStyle} id={this.props.name}
                         src={this.props.image}></img>
                    <strong className="track" id={this.props.name}>{this.props.name}</strong><br/>
                    <span className="aritst" id={this.props.artist}>{this.props.artist}</span><br/>
                    <i style={style} id={this.props.id} onClick={this.props.onClick} className="pull-right fa fa-trash-o" aria-hidden="true"></i></div>
            </li>
        )
    }
}

function CollapsableDiv ( props ) {
    const style = {
        padding: "10px"
    };
    const visible = props.visible;
    if (visible) return (
        <div className="row">
            <div style={style} className="collapse.in">
                <ol type="1" id="sortable">
                    {props.children}
                </ol>
            </div>
        </div>
    );
    if (!visible) return (
        <div className="row">
            <div style={style} className="collapse">
                <ol type="1" id="sortable">
                    {props.children}
                </ol>
            </div>
        </div>
    );
}

class TopTenList extends Component {
    constructor ( props ) {
        super (props);
        this.state = { playlistName: "", data: this.props.data, toggled: true };
    }
    
    handleClick = ( e ) => {
        this.setState (( prevState ) => ({ toggled: !prevState.toggled }));
        e.preventDefault ();
    };

    handleInput = (e) => {
    	this.setState({playlistName: e.target.value.toUpperCase()});
    }
    
    render () {
        const data = this.state.data;
        const uiRender = [];
        const remove = this.props.remove;
        const handleInput = this.handleInput;
        data.forEach (function ( obj, index ) {
            const props = { onClick: remove, id: obj.id, artist: obj.artist, name: obj.name, album: obj.album, image: obj.image };
            uiRender.push (<ListItem key={obj.id} {...props} />);
        });
        const toggledState = this.state.toggled;
        return (
            <div>
        			<div className="form-group">
          			<label htmlFor="playlistName" className="sr-only">Playlist Name</label>
          			<input id="playlistName" placeholder="Playlist Name" className="form-control" value={this.state.playlistName} onChange={handleInput} />
              </div>
            	<div className="row">
            		<div className="col-sm-12">
            			<p><strong>{this.state.playlistName}</strong></p>
            			{uiRender.length !== 0 &&  <div><span>{uiRender.length}</span> Song{uiRender.length > 1 && <span>s</span>}
            				<button onClick={this.handleClick} className="pull-right btn btn-link" type="button"
                      data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                			<span>
                					{toggledState && <span>Hide <i className="fa fa-eye-slash"></i></span>}
                					{!toggledState && <span>Show <i className="fa fa-eye"></i></span>}
                				</span>
                		</button></div>}
                </div>
              </div>
            <CollapsableDiv visible={toggledState} children={uiRender}/>
            </div>
        )
    }
}
export default TopTenList;