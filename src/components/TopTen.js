import React, { Component } from 'react';

class ListItem extends Component {
    render () {
        const style = {
            div: { padding: "5px"},
            icon: { color: "#aa0000" }
        };
        const imgStyle = { maxWidth: "50px" };
        return (
            <li className="card">
                <div style={style.div} className="card-block">
                    <img alt={this.props.name} className="pull-left albumImage" style={imgStyle} id={this.props.name}
                         src={this.props.image}></img>
                    <span id={this.props.artist}><strong>{this.props.artist}</strong></span><br/>
                    <span id={this.props.name}>{this.props.name}</span><br/>
                    <span><i style={style.icon} id={this.props.id} onClick={this.props.onClick} className="fa-pull-right align-middle fa fa-trash" aria-hidden="true"></i></span></div>
            </li>
        )
    }
}

function CollapsableDiv ( props ) {
    return (
        <div>
            <ol type="1" id="sortable">
                {props.children}
            </ol>
        </div>
    );
}

class TopTenList extends Component {
    constructor ( props ) {
        super (props);
        this.state = {playlistName: this.props.playlistName, data: this.props.data};
    }
    
    render () {
        const data = this.state.data;
        const uiRender = [];
        const remove = this.props.remove;
        // const handleInput = this.handleInput;
        data.forEach (function ( obj, index ) {
            const props = { onClick: remove, id: obj.id, artist: obj.artist, name: obj.name, album: obj.album, image: obj.image };
            uiRender.push (<ListItem key={obj.id} {...props} />);
        });
        return (
            <div>
                <CollapsableDiv children={uiRender}/>
            </div>
        )
    }
}
export default TopTenList;