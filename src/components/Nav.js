import React from 'react';

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {showInput: false, toggled: false};
  }

  handleToggle = () => {
      this.setState (( prevState ) => ({ toggled: !prevState.toggled }));
  };

  toggleInput = (e) =>{
    this.setState (( prevState ) => ({ showInput: !prevState.showInput }));
      // this.setState({ showInput: false});
  }

  render(){
    const style = {
      cursor: "pointer",
      icon: {
        fontSize: ".9rem",
        color: "#6C6C6D"
      }
    }
    const toggled = this.state.toggled;
    const handleToggle = this.handleToggle;
    const showInput = this.state.showInput;
    const playlistName = this.props.playlistName;
    return(
      <div>
      <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
      <a className="navbar-brand"><i className="fa fa-headphones"></i>  Top Ten</a>
        <form className="hidden-md-down form-inline">
            <button onClick={handleToggle} data-toggle="collapse" data-target="#userPlaylist" className="btn btn-sm btn-outline-primary" type="button">
              {toggled && <span><i className="fa fa-toggle-on"></i> Hide Playlist</span>}{!toggled && <span><i className="fa fa-toggle-off"></i> Show Playlist</span>}
            </button>
        </form>
        <span onClick={handleToggle} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <button className="btn btn-sm btn-outline-primary" type="button">
              {toggled && <span><i className="fa fa-toggle-on"></i> Hide Playlist</span>}{!toggled && <span><i className="fa fa-toggle-off"></i> Show Playlist</span>} ({this.props.total})
            </button>
        </span>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
          <div className="hidden-lg-up">{this.props.content}</div>
          </ul>
          <span className="navbar-text">
            Total Songs: {this.props.total}
          </span>
        </div>
      </nav>
          <div className="collapse" id="userPlaylist">
          <div className="p-4">
            {!showInput && <h4 style={style} onClick={this.toggleInput}>{playlistName ||  "Playlist" } <i style={style.icon}className="fa fa-pencil-square-o" aria-hidden="true"></i></h4>}
            {showInput && <input className="form-control" value={playlistName} onChange={this.props.onChange} onBlur={this.toggleInput}/>}
            {this.props.content}
          </div>
        </div>
      </div>
    )
  }
}

export default Nav;