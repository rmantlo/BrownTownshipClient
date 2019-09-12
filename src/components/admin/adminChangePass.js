import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default class AdminChangePass extends React.Component {
    state = {}

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }
    handleSubmit = (e) => {
        //e.preventDefault();
        if (this.handleValidation()) {
            fetch(`http://localhost:3001/admin/updatepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ oldPassword: this.state.oldPassword, newPassword: this.state.newPassword })
            })
                .then(info => info.json())
                .then(info => {
                    if(info === 'old password not correct') {alert('Old password incorrect!')}
                    else alert('User password updated!')
                })
                .catch(err => console.log(err))
        }
        else {
            e.preventDefault();
        }
    }
    handleValidation = () => {
        if (!this.state.oldPassword) {
            alert('Please enter old password.');
            return false;
        }
        if (!this.state.newPassword) {
            alert('Please enter a new password.');
            return false;
        }
        if (!this.state.confirmPassword || this.state.confirmPassword !== this.state.newPassword) {
            alert('Passwords dont match.');
            return false;
        }
        return true;
    }
    render() {
        return (
            <div className='myModal'>
                <div className='modalContent'>
                    <Button id="exitBtn" name='changePassModal' onClick={(e) => { e.preventDefault(); this.props.exit(e); }} >X</Button>
                    <div>
                        <br />
                        <h3>Change Password</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for='oldPassword'>Old Password: </Label><br />
                                <Input id='li_password' type='password' name='oldPassword' placeholder='Enter Old Password' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newPassword'>New Password: </Label><br />
                                <Input id='li_npassword' type='password' name='newPassword' placeholder='Enter New Password' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Cpassword'>Confirm Password: </Label><br />
                                <Input id='li_cPassword' type='password' name='confirmPassword' placeholder='Confirm New Password' onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit'>Create</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}