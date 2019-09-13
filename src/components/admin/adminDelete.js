import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, Table } from 'reactstrap';

export default class AdminDelete extends React.Component {
    state = {
        user: this.props.data,
        extraAlert: false
    }

    componentDidMount() {
        if (this.state.user.id === 1) {
            fetch(`${APIURL}/admin/getalluserinfo`, {
                method: 'GET',
                headers: {
                    "Authorization": localStorage.getItem('token'),
                    "Content-Type": 'application/json'
                }
            })
                .then(info => info.json())
                .then(info => {
                    if (info != null) {
                        this.setState({ userList: info })
                    }
                })
                .catch(err => console.log(err));
        }
    }
    extraToggle = (user) => {
        this.setState({
            extraAlert: !this.state.extraAlert,
            userToDelete: user
        })
    }
    deleteUser = (e) => {
        console.log(e.target.name);
        if (this.state.user.id === 1) {
            fetch(`${APIURL}/admin/deleteotheruser/${e.target.name}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem('token'),
                    "Content-Type": 'application/json'
                }
            })
                .then(info => { alert('User account deleted'); window.location.reload(); })
                .catch(err => console.log(err))
        }
        else {
            fetch(`${APIURL}/admin/deleteuser`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem('token'),
                    "Content-Type": 'application/json'
                }
            })
                .then(info => {
                    alert('User account deleted');
                    localStorage.clear();
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }
    render() {
        return (
            <div className='myModal'>
                <div className='modalContent'>
                    <Button id="exitBtn" name='deleteUserModal' onClick={(e) => { this.props.exit(e); }} >X</Button>
                    <br />
                    {(this.state.user.id === 1) ?
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.userList) ?
                                        this.state.userList.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.username}</td>
                                                    <td><Button color='danger' onClick={e => { e.preventDefault(); this.extraToggle(user) }}>Delete</Button></td>
                                                </tr>
                                            )
                                        })
                                        : <tr>
                                            <td>No Users Found</td>
                                            <td></td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : <div>
                            <h2>Are you sure you want to DELETE this account?</h2>
                            <Button className='btnSpacing' color='danger' name={this.state.user.id} onClick={this.deleteUser}>Delete</Button>
                            <Button className='btnSpacing' name='deleteUserModal' onClick={(e) => { e.preventDefault(); this.props.exit(e); }}>Cancel</Button>
                        </div>
                    }
                </div>
                {(this.state.extraAlert) ?
                    <div className='myModal'>
                        <div className='modalContent'>
                            <Button id="exitBtn" name='deleteUserModal' onClick={e => { e.preventDefault(); this.extraToggle() }} >X</Button>
                            <br />
                            <div>
                                <h2>Are you sure you want to DELETE username: {this.state.userToDelete.username}?</h2>
                                <Button className='btnSpacing' color='danger' name={this.state.userToDelete.id} onClick={this.deleteUser}>Delete</Button>
                                <Button className='btnSpacing' onClick={e => { e.preventDefault(); this.extraToggle() }}>Cancel</Button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}