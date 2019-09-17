import React from 'react';
import './home.css';
import APIURL from '../../helpers/environment';
import {Card, CardText, Container, Jumbotron} from 'reactstrap';

export default class Home extends React.Component {
    state = {}
    componentDidMount() {
        fetch(`${APIURL}/posts/nextmeeting`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(info => info.json())
            .then(info => {
                this.setState({ data: info })
            })
    }
    render() {
        var timeValue;
        var title;
        if (this.state.data) {
            let time = (this.state.data.timeOfEvent.substring(0, 5)).split(':');
            var hours = Number(time[0]);
            var minutes = Number(time[1]);

            if (hours > 0 && hours <= 12) {
                timeValue = "" + hours;
            } else if (hours > 12) {
                timeValue = "" + (hours - 12);
            } else if (hours === 0) {
                timeValue = "12";
            }
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
            title = this.state.data.title.charAt(0).substring(0, 1) + (this.state.data.title.toLowerCase()).slice(1)
        }

        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                    </Container>
                </Jumbotron>
                <section className="home">
                    <div className="homeCard">
                        <h2>About Us</h2>
                        <hr />
                        <p>Welcome to Brown Township - One of twelve in Hendricks County.</p>
                        <p>Our current Township Trustee, Nathan Mantlo, took office on January 1st, 2019. A Township Trustee is an elected official for the local government. The Trustee acts as an administration for a township, and works with other board members in adopting annual budgets, managing finance and township contracts. A Trustee, in common with most other state officials, serves a term of four years.</p>
                    </div>
                    <div className="homeCard">
                        <h2>Site</h2>
                        <hr />
                        <p>This site was created as a way for people to get up to date township information. From meetings/events and yearly budgets to Township Assistance, all necessary information is displayed to view. </p>
                        <p>All upcoming meetings and events can be found by following the Meetings and Events link on the navbar above, as are the yearly budgets link. Township Assistance contains instructions to follow to apply to the program to receive temporary relief.</p>
                        <div>
                            {(this.state.data) ?
                                <Card >
                                    <p id='eventType'>Next Upcoming Meeting</p>
                                    <h2 className='homeCardTitle'>{title}</h2>
                                    <p className='eventDateTime'>{timeValue}, {this.state.data.dateOfEvent}</p>
                                    <p className='eventDateTime'>{this.state.data.streetAddress}, {this.state.data.city}, {this.state.data.state} {this.state.data.zipcode}</p>
                                    <CardText className='message'>{this.state.data.forumMessage}</CardText>

                                </Card> : null
                            }
                        </div>
                    </div>
                    <div className="homeCard trusteeInfo">
                        <h2>Contact Us</h2>
                        <hr />
                        <p><strong>Brown Township Office</strong></p>
                        <p>7455 East County Road 1000 North</p>
                        <p>Brownsburg, IN 46112</p>
                        <p><strong>Phone number</strong></p>
                        <p>(317) 852-0899</p>
                        <p><strong>Hours</strong></p>
                        <p>12PM-4PM Tuesdays and Thursdays</p>
                        <p><strong>Email</strong></p>
                        <p>browntownshipin@gmail.com</p>
                    </div>
                </section>
            </div>
        )
    }
}