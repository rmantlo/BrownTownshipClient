import React from 'react';
import './login.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AdminPortal from './adminPortal';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.handleValidation();
        } else {
            fetch(`http://localhost:3001/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            })
                .then(response => response.json())
                .then(data => {
                    this.setSessionToken(data.sessionToken);
                })
                .catch(err => console.log(err))
        }
    }
    handleValidation = () => {
        if (!this.state.username) {
            alert('Please enter a username.')
        }
        if (!this.state.password) {
            alert('Please enter a password.')
        }
    }
    setSessionToken = (token) => {
        if (!token || token === undefined) {
            alert('incorrect user login')
        } else {
            localStorage.setItem('token', token);
            this.setState({ token: token });
            window.location.reload();
        }
    }
    render() {
        return (<div>

            {(!this.state.token) ?
                <div className='adminLogin secondaryContainer'>
                    <div>
                        <h2>Admin Login</h2>
                        <div>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for='username'>Username</Label><br />
                                    <Input id='li_username' type='text' name='username' placeholder='enter username' onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='password'>Password</Label><br />
                                    <Input id='li_password' type='password' name='password' placeholder='enter password' onChange={this.handleChange} />
                                </FormGroup>
                                <Button type='submit'>Login</Button>
                            </Form>
                        </div>
                    </div>
                </div> :
                <AdminPortal></AdminPortal>
            }
        </div>

        )
    }
}
