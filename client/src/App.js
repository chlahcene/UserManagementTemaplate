import React from 'react';
import Axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users : []
    };
    this.generateUsers = this.generateUsers.bind(this);
    console.log(this.state);
  }
  generateUsers() {
    console.log(this.state);
     Axios.get('api/test/data/user/10')
        .then(result => this.setState({
          users: result.data.success[0].users,
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.generateUsers}>
          generate users
        </button>

        <div> 
        <p>list users</p>
        
        <table>
          <tbody>
            {this.state.users.map((user, i) => <TableRow key = {i} 
              data = {user} />)}
          </tbody>
        </table>
        </div>      
     </div>
    );
  };
}
class TableRow extends React.Component {
  render() {
     return (
        <tr>
           <td>{this.props.data.id}</td>
           <td>{this.props.data.name}</td>
           <td>{this.props.data.email}</td>
        </tr>
     );
    }
  }

export default App;
