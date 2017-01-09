import React, { Component } from 'react';

class ListItem extends Component {
    render () {
        const style = { padding: "5px"
        };
        const imgStyle = {
            maxWidth: "50px"
        };
        return (
            <li className="panel panel-default">
                <div style={style} className="panel-body">
                    <img alt={this.props.name} className="pull-left albumImage" style={imgStyle} id={this.props.name}
                         src={this.props.image}></img>
                    <strong id={this.props.name}>{this.props.name}</strong><br/>
                    <span id={this.props.artist}>{this.props.artist}</span><br/>
                    <span><i style={style} id={this.props.id} onClick={this.props.onClick} className="pull-right fa fa-trash-o" aria-hidden="true"></i></span></div>
            </li>
        )
    }
}

function CollapsableDiv ( props ) {
    const visible = props.visible;
    if (visible) return (
        <div>
            <div className="collapse.in">
                <ol type="1" id="sortable">
                    {props.children}
                </ol>
            </div>
        </div>
    );
    if (!visible) return (
        <div>
            <div className="collapse">
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
        this.state = { playlistName: "", data: this.props.data};
    }
    

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
        const toggledState = this.props.toggled;
        const fixed = {
            position: "fixed",
            right: "0",
            left: "0",
            zIndex: "1030",
            backgroundColor: "#fff",
            overflowY: "auto",
            paddingTop: "15px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingBottom: "15px",
            maxHeight: "250px",
            marginBottom: "15px"
        };

        return (
            <div>
                <div>
                <div className="form-group">
                    <label htmlFor="playlistName" className="sr-only">Playlist Name</label>
                    <input id="playlistName" placeholder="Playlist Name" className="form-control" value={this.state.playlistName} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <p><strong>{this.state.playlistName}</strong></p>
                    {uiRender.length !== 0 &&  <div><span>{uiRender.length}</span> Song{uiRender.length > 1 && <span>s</span>}
                        <button onClick={this.props.handleToggle} className="pull-right btn btn-link" type="button"
                  data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <span>
                                {toggledState && <span><i title="Show List" className="fa fa-eye"></i></span>}
                                {!toggledState && <span><i title="Hide List" className="fa fa-eye-slash"></i></span>}
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