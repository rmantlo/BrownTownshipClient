import React from 'react';
import APIURL from '../../helpers/environment';
import './adminportal.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Card } from 'reactstrap';
import classnames from 'classnames';
import EventEdit from '../events/eventEdit';
import AdminCreate from './adminCreate';
import AdminDelete from './adminDelete';
import AdminChangePass from './adminChangePass';
import EventCreate from '../events/eventCreate';
import DocumentCreate from '../documents/documentCreate';
import Documents from '../documents/documents';
import EventDetails from '../events/eventDetails';

export default class AdminPortal extends React.Component {
    state = {
        activeTab: '1',
        //documents: [],
        events: {
            futureEvents: [],
            pastEvents: [],
            tbdEvents: []
        },
        user: [],
        eventModal: false,
        createUserModal: false,
        createBudgetModal: false,
        changePassModal: false,
        deleteUserModal: false,
        eventCreateModal: false,
        documentDetailsModal: false,
        detailDataId: null,
        eventEdit: {}
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        if (localStorage.getItem('token') != null) {
            this.fetchBudgetEvents();
            this.fetchUserInfo();
        }
    }
    fetchBudgetEvents = () => {
        fetch(`${APIURL}/posts/alleventposts`, {
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                let events = {
                    pastEvents: [],
                    futureEvents: [],
                    tbdEvents: [],
                    others: []
                };
                data.forEach(a => {
                    if (a.dateOfEvent == null) {
                        events.tbdEvents.push(a);
                    }
                    else if (new Date(a.dateOfEvent) >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
                        events.futureEvents.push(a);
                    }
                    else if (new Date(a.dateOfEvent) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
                        events.pastEvents.push(a)
                    }
                    else {
                        events.others.push(a)
                    }
                });

                this.setState({events: events});
            })
            .catch(err => console.log(err));
    }
    fetchUserInfo = () => {
        fetch(`${APIURL}/admin/userinfo`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })
            .then(info => info.json())
            .then(infoTwo => {
                this.setState({ user: infoTwo });
            })
            .catch(err => console.log(err));
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    editEventToggle = (event) => {
        this.setState({
            eventEdit: event,
            eventModal: !this.state.eventModal
        });
    }
    userToggle = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] });
    }
    deleteFile = (e) => {
        fetch(`${APIURL}/admin/deletepost/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(res => window.location.reload())
    }


    render() {
        return (
            <div className="secondaryContainer">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }} >Upcoming Event/Meeting</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }} >Past Event/Meeting</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}>
                            Documents</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}>
                            Users</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                {(this.state.token) ?
                                    <Button className='mainBtn' name='eventCreateModal' onClick={this.userToggle}>Create event or meeting</Button> : null
                                }
                                <div className='admin'>
                                    <div className='adminEvents'>
                                        <h2>Upcoming Meetings and Events</h2>
                                        {(this.state.events.tbdEvents.length > 0) ? (this.state.events.tbdEvents.map(event => {
                                            return (
                                                <Card className='myCard adminCard' key={event.id}>
                                                    <EventDetails data={event} />
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.editEventToggle(event) }}>Edit</Button>
                                                            <Button color='danger' name="tbdPost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                        </div> : null
                                                    }
                                                </Card>)
                                        })) : null}
                                        {(this.state.events.futureEvents.length > 0) ?
                                            (this.state.events.futureEvents.map(event => {
                                                return (
                                                    <Card className='myCard adminCard' key={event.id}>
                                                        <EventDetails data={event} />
                                                        {(this.state.token) ?
                                                            <div>
                                                                <Button onClick={e => { e.preventDefault(); this.editEventToggle(event) }}>Edit</Button>
                                                                <Button color='danger' name="futurePost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                            </div> : null
                                                        }
                                                    </Card>)
                                            }))
                                            : <div className='budgetFiller' >
                                                <p>No Upcoming Meetings or Events</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                {(this.state.token) ?
                                    <Button className='mainBtn' name='eventCreateModal' onClick={this.userToggle}>Create event or meeting</Button> : null
                                }
                                <div className='admin'>
                                    <div className='adminEvents'>
                                        <h2>Past Meetings and Events</h2>
                                        {(this.state.events.pastEvents.length > 0) ?
                                            (this.state.events.pastEvents.map(event => {
                                                return (
                                                    <Card className='myCard adminCard' key={event.id}>
                                                        <EventDetails data={event} />
                                                        {(this.state.token) ?
                                                            <div>
                                                                <Button onClick={e => { e.preventDefault(); this.editEventToggle(event) }}>Edit</Button>
                                                                <Button color='danger' name="pastPost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                            </div> : null
                                                        }
                                                    </Card>)
                                            }))
                                            : <div className='budgetFiller'>
                                                <p>No Past Meetings or Events</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                {(this.state.token) ?
                                    <Button className='mainBtn' name='createBudgetModal' onClick={this.userToggle}>Add New File</Button> : null
                                }
                                <Documents />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                                <div className='admin adminSettings'>
                                    <div>
                                        <h2>{this.state.user.username}</h2>
                                        {(this.state.user.id === 1) ? <p>Main Admin Account</p> : <p>Secondary Admin Account</p>}
                                    </div>
                                    <div className='adminDivider'></div>
                                    <div className='adminOptions'>
                                        {(this.state.user.id === 1) ?
                                            <ul>
                                                <li><button name='createUserModal' onClick={e => this.userToggle(e)}>Create Admin Account</button></li>
                                                <li><button name='deleteUserModal' onClick={e => this.userToggle(e)}>Delete Other Admin Account</button></li>
                                            </ul>
                                            : <ul>
                                                <li><button name='changePassModal' onClick={e => this.userToggle(e)}>Change Admin Password</button></li>
                                                <li><button name='deleteUserModal' onClick={e => this.userToggle(e)}>Delete This Admin Account</button></li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                {(this.state.eventModal) ?
                    <EventEdit data={this.state.eventEdit} exit={this.editEventToggle} /> : null
                }
                {(this.state.createUserModal) ? <AdminCreate exit={this.userToggle} /> : null}
                {(this.state.deleteUserModal) ? <AdminDelete data={this.state.user} exit={this.userToggle} /> : null}
                {(this.state.changePassModal) ? <AdminChangePass data={this.state.user} exit={this.userToggle} /> : null}
                {(this.state.eventCreateModal) ?
                    <EventCreate exit={this.userToggle}></EventCreate> : null
                }
                {(this.state.createBudgetModal) ?
                    <DocumentCreate exit={this.userToggle} ></DocumentCreate> : null
                }
            </div>
        )
    }
}