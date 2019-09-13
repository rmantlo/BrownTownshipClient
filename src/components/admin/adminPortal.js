import React from 'react';
import APIURL from '../../helpers/environment';
import './adminportal.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Card, CardBody, CardText } from 'reactstrap';
import classnames from 'classnames';
import EventEdit from '../events/eventEdit';
import BudgetEdit from '../budget/budgetEdit';
import AdminCreate from './adminCreate';
import AdminDelete from './adminDelete';
import AdminChangePass from './adminChangePass';
import EventCreate from '../events/eventCreate';
import BudgetCreate from '../budget/budgetcreate';

export default class AdminPortal extends React.Component {
    state = {
        activeTab: '1',
        budgets: [],
        events: {
            futureEvents: [],
            pastEvents: []
        },
        user: [],
        eventModal: false,
        budgetModal: false,
        createUserModal: false,
        createBudgetModal: false,
        changePassModal: false,
        deleteUserModal: false,
        eventCreateModal: false,
        eventEdit: {},
        budgetEdit: {},
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
        fetch(`${APIURL}/admin/allbudgetfiles`, {
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    budgets: data,
                });
            })
            .catch(err => console.log(err));
        fetch(`${APIURL}/admin/alleventposts`, {
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    events: data,
                });
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
            .then(info => {
                this.setState({ user: info });
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
    deleteFile = (e) => {
        //console.log(e.target.name + "  " + e.target.id)
        fetch(`http://localhost:3001/admin/${e.target.name}/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(info => window.location.reload())
            .catch(err => console.log(err));
    }
    editEventToggle = (event) => {
        this.setState({
            eventEdit: event,
            eventModal: !this.state.eventModal
        });
    }
    editBudgetToggle = (event) => {
        this.setState({
            budgetEdit: event,
            budgetModal: !this.state.budgetModal
        });
    }
    userToggle = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] });
    }
    render() {
        return (
            <div className="secondaryContainer">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }} >Event/Meeting Posts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Budgets on File</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}>
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
                                        {(this.state.events.futureEvents.length > 0) ?
                                            (this.state.events.futureEvents.map(event => {
                                                let time = (event.timeOfEvent.substring(0, 5)).split(':');
                                                var hours = Number(time[0]);
                                                var minutes = Number(time[1]);
                                                var timeValue;

                                                if (hours > 0 && hours <= 12) {
                                                    timeValue = "" + hours;
                                                } else if (hours > 12) {
                                                    timeValue = "" + (hours - 12);
                                                } else if (hours === 0) {
                                                    timeValue = "12";
                                                }
                                                timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                                                timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
                                                return (
                                                    <Card className='myCard adminCard' key={event.id}>
                                                        <CardBody>
                                                            <p id='eventType'>{event.type}</p>
                                                            <h2>{(event.title).charAt(0).toUpperCase() + (event.title.toLowerCase()).slice(1)}</h2>
                                                            <p className='eventDateTime'>{timeValue}, {event.dateOfEvent}</p>
                                                            <p className='eventDateTime'>Location: {event.streetAddress}, {event.city}, {event.state} {event.zipcode}</p>
                                                            <CardText className='message' >{event.forumMessage}</CardText>
                                                        </CardBody>
                                                        {(this.state.token) ?
                                                            <div>
                                                                <Button onClick={e => { e.preventDefault(); this.editEventToggle(event) }}>Edit</Button>
                                                                <Button color='danger' name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                            </div> : null
                                                        }
                                                    </Card>)
                                            }))
                                            : <div className='budgetFiller' >
                                                <p>No Upcoming Meetings or Events</p>
                                            </div>
                                        }
                                    </div>
                                    <div className='divider'></div>
                                    <div className='adminEvents'>
                                        <h2>Past Meetings and Events</h2>
                                        {(this.state.events.pastEvents.length > 0) ?
                                            (this.state.events.pastEvents.map(event => {
                                                let time = (event.timeOfEvent.substring(0, 5)).split(':');
                                                var hours = Number(time[0]);
                                                var minutes = Number(time[1]);
                                                var timeValue;

                                                if (hours > 0 && hours <= 12) {
                                                    timeValue = "" + hours;
                                                } else if (hours > 12) {
                                                    timeValue = "" + (hours - 12);
                                                } else if (hours === 0) {
                                                    timeValue = "12";
                                                }
                                                timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                                                timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
                                                return (
                                                    <Card className='myCard adminCard' key={event.id}>
                                                        <CardBody>
                                                            <p id='eventType'>{event.type}</p>
                                                            <h2>{(event.title).charAt(0).toUpperCase() + (event.title.toLowerCase()).slice(1)}</h2>
                                                            <p className='eventDateTime'>{timeValue}, {event.dateOfEvent}</p>
                                                            <p className='eventDateTime'>Location: {event.streetAddress}, {event.city}, {event.state} {event.zipcode}</p>
                                                            <CardText className='message' >{event.forumMessage}</CardText>
                                                        </CardBody>
                                                        {(this.state.token) ?
                                                            <div>
                                                                <Button onClick={e => { e.preventDefault(); this.editEventToggle(event) }}>Edit</Button>
                                                                <Button color='danger' name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
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
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                {(this.state.token) ?
                                    <Button className='mainBtn' name='createBudgetModal' onClick={this.userToggle}>Add New File</Button> : null
                                }
                                <div className='admin'>
                                    {(this.state.budgets.length > 0) ?
                                        (this.state.budgets.map(file => {
                                            return (
                                                <div key={file.id} className='adminBudgets'>
                                                    <p>{file.fileYear}</p>
                                                    <h5>{file.fileName}</h5>
                                                    <object className='iframe' data={file.fileBinary} title={file.fileName} >
                                                        <p>Oops! You don't support PDFs!</p>
                                                        <p><a download={file.fileName} href={file.fileBinary}>Download Instead</a></p>
                                                    </object>
                                                    <p><strong>Document Description:</strong> {file.documentDesc}</p>
                                                    <p><strong>Date File Uploaded: </strong>{file.updatedAt.substring(0, 10)}</p>
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.editBudgetToggle(file) }}>Edit</Button>
                                                            <Button color='danger' name="deletebudgetfile" id={file.id} onClick={this.deleteFile}>Delete</Button>
                                                        </div> : null
                                                    }
                                                </div>
                                            )
                                        }))
                                        : <div className='budgetFiller'>
                                            <h2>No budgets found</h2>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
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
                {(this.state.budgetModal) ?
                    <BudgetEdit data={this.state.budgetEdit} exit={this.editBudgetToggle} /> : null
                }
                {(this.state.createUserModal) ? <AdminCreate exit={this.userToggle} /> : null}
                {(this.state.deleteUserModal) ? <AdminDelete data={this.state.user} exit={this.userToggle} /> : null}
                {(this.state.changePassModal) ? <AdminChangePass data={this.state.user} exit={this.userToggle} /> : null}
                {(this.state.eventCreateModal) ?
                    <EventCreate exit={this.userToggle}></EventCreate> : null
                }
                {(this.state.createBudgetModal) ?
                    <BudgetCreate exit={this.userToggle} ></BudgetCreate> : null
                }
            </div>
        )
    }
}