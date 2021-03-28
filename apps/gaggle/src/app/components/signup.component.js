import React, { Component } from "react";
const axios = require('axios').default;
export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {firstName: '',
         lastName: '',
         email: '',
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
            url: '/api/signUp',
            // url: 'http://localhost:4000',
            // baseURL: 'http://localhost:4000',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            },
            // withCredentials: true
          })
          .then(function (response) {
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
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.handleChange} name="firstName"/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange} name="lastName"/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} name="email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}