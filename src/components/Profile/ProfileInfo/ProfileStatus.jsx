import { Component } from "react";

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }
  
  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || "-----"}</span>
          </div>
        }

        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} 
                   onBlur={this.deactivateEditMode} 
                   autoFocus={true} 
                   type="text" 
                   value={this.state.status}/>
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;