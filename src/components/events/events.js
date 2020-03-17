import React from 'react';
import './events.css';
import APIURL from '../../helpers/environment';
import EventEdit from './eventEdit';
import { Button, Card, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import EventDetails from './eventDetails';



export default class Events extends React.Component {
    state = {
        activeTab: '1',
        eventModal: false,
        editModal: false,
        data: {
            futureEvents: [],
            pastEvents: [],
            tbdEvents: []
        }
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        //this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/posts/alleventposts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {console.log(res); return res.json(); })
            .then(resTwo => {
                console.log(resTwo);
                let events = {
                    pastEvents: [],
                    futureEvents: [],
                    tbdEvents: [],
                    others: []
                };
                resTwo.forEach(a => {
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
                //this.setState({ token: localStorage.getItem('token'), data: events });
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
            .then(res => window.location.reload())
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
                                    {(this.state.data.tbdEvents.length > 0) ?
                                        (this.state.data.tbdEvents.map(event => {
                                            return (
                                                <Card className='myCard' key={event.id}>
                                                    <EventDetails data={event} />
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.toggleEdit(event) }}>Edit</Button>
                                                            <Button color='danger' name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
                                                        </div> : null
                                                    }
                                                </Card>)
                                        }))
                                        : null
                                    }
                                    {(this.state.data.futureEvents.length > 0) ?
                                        (this.state.data.futureEvents.map(event => {
                                            return (
                                                <Card className='myCard' key={event.id}>
                                                    <EventDetails data={event} />
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.toggleEdit(event) }}>Edit</Button>
                                                            <Button color='danger' name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
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
                                    {(this.state.data.pastEvents.length > 0) ?
                                        (this.state.data.pastEvents.map(event => {
                                            return (
                                                <Card className='myCard' key={event.id}>
                                                    <EventDetails data={event} />
                                                    {(this.state.token) ?
                                                        <div>
                                                            <Button onClick={e => { e.preventDefault(); this.toggleEdit(event) }}>Edit</Button>
                                                            <Button color='danger' name="deletepost" id={event.id} onClick={this.deleteFile}>Delete</Button>
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