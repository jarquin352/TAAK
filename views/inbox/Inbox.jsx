import React from 'react';
import axios from 'axios';

class Inbox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          current_user: null
        };
      }
    
      componentDidMount() {
        this.checkLogin();
      }
    
      checkLogin() {
        axios.get('/api/currentUser')
          .then((response) => {
            if (response.status===200) {
              this.setState({current_user: response.data});
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status===401) {
              window.location.href = '#/login';
            }
          });
      }

    render(){
        return (
            <div>Inbox Component Implementation Here</div>
        );
    }
}
export default Inbox;