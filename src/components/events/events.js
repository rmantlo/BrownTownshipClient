import React from 'react';
import './events.css';
import APIURL from '../../helpers/environment';
import EventEdit from './eventEdit';
import { Button, Card, CardText, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';



export default class Events extends React.Component {
    state = {
        activeTab: '1',
        eventModal: false,
        editModal: false,
        data: []
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/posts/alleventposts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res });
                console.log(this.state.data)
            })
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    toggleEventCreate = (e) => {
        e.preventDefault();
        this.setState({ eventModal: !this.state.eventModal })
    }
    toggleEdit = (event) => {
        this.setState({
            editModal: !this.state.editModal,
            editData: event
        })
    }
    deleteFile = (e) => {
        fetch(`${APIURL}/admin/deletepost/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
    }
    render() {
        return (
            <div className='events secondaryContainer'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }} >Upcoming Meetings and Events</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Past Meetings and Events</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div className='myDeck'>
                                    {(this.state.data.length > 0) ?
                                        (this.state.data.map(event => {
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
                                                <Card className='myCard' key={event.id}>
                                                    <CardBody>
                                                        <p id='eventType'>{event.type}</p>
                                                        <h2>{event.title}</h2>
                                                        <p className='eventDateTime'>{timeValue}, {event.dateOfEvent}</p>
                                                        <p className='eventDateTime'>Location: {event.streetAddress}, {event.city}, {event.state} {event.zipcode}</p>
                                                        <CardText className="message">{event.forumMessage}</CardText>
                                                    </CardBody>
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.toggleEdit(event) }}>Edit</Button>
                                                            <Button name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                        </div> : null
                                                    }
                                                </Card>)
                                        }))
                                        : <div className='myCard noEvents'>
                                            <h3>No events coming up!</h3>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <div className='myDeck'>
                                    {(this.state.data.length > 0) ?
                                        (this.state.data.map(event => {
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
                                                <Card className='myCard' key={event.id}>
                                                    <CardBody>
                                                        <p id='eventType'>{event.type}</p>
                                                        <h2>{event.title}</h2>
                                                        <p className='eventDateTime'>{timeValue}, {event.dateOfEvent}</p>
                                                        <p className='eventDateTime'>Location: {event.streetAddress}, {event.city}, {event.state} {event.zipcode}</p>
                                                        <CardText className="message">{event.forumMessage}</CardText>
                                                    </CardBody>
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.toggleEdit(event) }}>Edit</Button>
                                                            <Button name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                        </div> : null
                                                    }
                                                </Card>)
                                        }))
                                        : <div className='myCard noEvents'>
                                            <h3>No events from the past!</h3>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                {(this.state.editModal) ?
                    <EventEdit exit={this.toggleEdit} data={this.state.editData}></EventEdit> : null
                }
            </div>
        )
    }
}