import React from 'react';
import axios from 'axios';
class AboutUs extends React.Component{
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
        return(
            <div><h3>TAAK is a Task Ticket Management System aimed at simplifying and demonstrate Agile methedologies to starting teams in tech, or in other fields.</h3>
            <p>It encourages agile through a scrum board, and a product backlog items list.</p></div>
        );
    }

}

export default AboutUs;