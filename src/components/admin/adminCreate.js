import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class AdminCreate extends React.Component {
    state = {}

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (e) => {
        if(this.handleValidation()){
            fetch(`http://localhost:3001/admin/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state)
            })
            .then(info => info.json())
            .then(info => alert('User created!'))
            .catch(err => console.log(err))
        }
        else{
            e.preventDefault();
        }
    }
    handleValidation = () => {
        if (!this.state.username) {
            alert('Please enter a username.');
            return false;
        }
        if (!this.state.password) {
            alert('Please enter a password.');
            return false;
        }
        if (!this.state.confirmPassword || this.state.confirmPassword !== this.state.password){
            alert('Passwords dont match.');
            return false;
        }
        return true;
    }
    render() {
        return (
            <div className='myModal'>
                <div className='modalContent' >
                    <Button id="exitBtn" name='createUserModal' onClick={(e) => { e.preventDefault(); this.props.exit(e); }} >X</Button>
                    <div>
                        <br />
                        <h3>Create Post</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for='username'>Username: </Label><br />
                                <Input type='text' name='username' placeholder="Enter Username" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Password: </Label><br />
                                <Input id='li_password' type='password' name='password' placeholder='Enter Password' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Cpassword'>Confirm Password: </Label><br />
                                <Input id='li_cPassword' type='password' name='confirmPassword' placeholder='Confirm Password' onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit'>Create</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}