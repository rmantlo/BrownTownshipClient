import React from 'react';
import './navbar.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true
        }
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
    }
    Logout = (e) => {
        localStorage.clear();
        document.location.reload();
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="navbarDiv">
                <div className='navbarTopper'>
                </div>
                <Navbar dark expand="md">
                    <NavbarBrand href="/">Brown Township</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={!this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/assistance">Township Assistance</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/eventsandmeetings">Meetings and Events</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/documents">Documents</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact">Contact Us</NavLink>
                            </NavItem>
                            {(this.state.token) ?
                                <NavItem>
                                    <NavLink href="/adminportal">Admin Portal</NavLink>
                                </NavItem> : null
                            }
                            {(this.state.token) ?
                                <NavItem>
                                    <Button onClick={this.Logout}>Logout</Button>
                                </NavItem> : null
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}