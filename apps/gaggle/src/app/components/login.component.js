import React, { Component } from "react";
const axios = require('axios').default;
import { Redirect } from "react-router-dom";
export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {email: '',
         password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios({    
          method: 'post',
          url: '/api/signIn',
          data: {
              email: this.state.email,
              password: this.state.password
          },
          // withCredentials: true
        })
        .then(function (response) {
            console.log(response)
            if(response.data.user === 'none') {
                console.log("redirsct")
                return <Redirect to="/sign-up"/>
            }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        event.preventDefault();
  }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange} name="email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange} name="password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={this.handleChange}/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}