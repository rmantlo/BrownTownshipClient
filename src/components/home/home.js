import React from 'react';
import './home.css';
import APIURL from '../../helpers/environment';
import { Card, Container, Jumbotron } from 'reactstrap';
import EventDetails from '../events/eventDetails';

export default class Home extends React.Component {
    state = {}
    componentDidMount() {
        fetch(`${APIURL}/posts/nextevent`, {
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
                        <br />
                        <h3>Contact Us</h3>
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
                    <div className="homeCard">
                        <h2>Township Assistance</h2>
                        <hr />
                        <p>This site was created as a way for people to get up to date township information and access to reliable Township and Community Assistance information.</p>
                        <p>Nagivate to our township assistance page from the navigation bar above, or click <a href="/assistance">here</a>.</p>
                        <br />
                        <br />
                        <div>
                            {(this.state.data) ?
                                <div>
                                    <p>Next upcoming event:</p>
                                    <Card >
                                        <EventDetails data={this.state.data} />
                                    </Card>
                                </div> : null
                            }
                        </div>
                    </div>
                    <div className="homeCard trusteeInfo">
                        <h2>Fire Territory</h2>
                        <hr />
                        <p><strong>Fire Chief</strong></p>
                        <p>Larry Alcorn</p>
                        <p><strong>Brownburg Fire Territory Headquarters & Training Facility</strong></p>
                        <p>470 East Northfield Drive</p>
                        <p>Brownsburg, IN 46112</p>
                        <p><strong>Phone Number</strong></p>
                        <p>(317) 852-1190</p>
                        <p><strong>Hours</strong></p>
                        <p>8:00AM-4:30PM Monday-Friday</p>
                        <p><a href="http://www.brownsburgfire.org/">http://www.brownsburgfire.org/</a></p>
                    </div>
                </section>
            </div>
        )
    }
}