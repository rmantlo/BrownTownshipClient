import React from 'react';
import './events.css';
import EventEdit from './eventEdit';
import { Button, Card, CardText, CardBody } from 'reactstrap';

export default class Events extends React.Component {
    state = {
        eventModal: false,
        editModal: false,
        data: []
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`http://localhost:3001/posts/getupcomingevents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res });
            })
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
        fetch(`http://localhost/3001/admin/deletepost/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
    }
    render() {
        return (
            <div className='events'>
                <div className='boardInfo secondaryContainer'>
                    Board member info
                </div>
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
                                        <h2>{(event.title).charAt(0).toUpperCase() + (event.title.toLowerCase()).slice(1)}</h2>
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
                        : <div className='myCard secondaryContainer'>
                            <h2>No events coming up!</h2>
                        </div>
                    }
                </div>
                {(this.state.editModal) ?
                    <EventEdit exit={this.toggleEdit} data={this.state.editData}></EventEdit> : null
                }
            </div>
        )
    }
}