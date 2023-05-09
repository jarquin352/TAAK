import React from 'react';
import axios from 'axios';

class AboutUs extends React.Component {
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
        if (response.status === 200) {
          this.setState({ current_user: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = '#/login';
        }
      });
  }

  render() {
    const { theme } = this.props;
    return (
      <div style={{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: 'url("./public/js/ABOUT_US_BACKGROUND-03.png")',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        ...theme,
        flexDirection: 'column', // add this to make the container a column
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style = {{color:"#95c8ed"}}>About Us</h1>
          <h2>Start doing work that matters.</h2>
          <p style={{ maxWidth: '600px' }}>At TAKK, our goal is to offer users a simple ticket management program that will help small teams stay on track,
            improve collaboration, and deliver value fast by helping users focus on the work that matters most.</p>
            <p2 style={{ maxWidth: '600px' }}>When using TAAK, teams will be able to strategize better, efficently plan, improve team process and time management. By using TAAK,
              small companies will be able to save on valuable resources such as staff, time and money. By saving on such sources, small businesses that 
              use TAAK will be able to keep up with competitors and grow their business.
            </p2>
        </div>
      </div>
    );
  }
}

export default AboutUs;
