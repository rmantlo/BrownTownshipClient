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
            .then(infoTwo => {
                this.setState({ data: infoTwo })
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
                        <p>Welcome to Brown Township, one of twelve in Hendricks County and is located in the north east portion of Hendricks county, bordered by Marion county to the east, Boone county to the north, Middle Township (Pittsboro and Lizton) to the west, and Lincoln Township to the south. Brown Township is largely rural except for southern 20% that is incorporated into the town of Brownsburg.</p>
                        <p>Cemeteries within the Township are: Ballard, Bethesda/Sambo, Evans, Johnson, Macedonia, Marvel, Smith-Shepherd and Sparks, as well as one park: The NorthWest Community Park.</p>
                        <p>Our current Township Trustee, Nathan Mantlo, took office on January 1st, 2019. A Township Trustee is an elected official for the local government and is the executive for the township. A Trustee, in common with most other state officials, serves a term of four years.</p>
                        {/* <p>Under our new trustee's leadership, beginning in 2020, Brown Township land owner's property tax will eliminated.</p> */}
                    </div>
                    <div className="homeCard">
                        <h2>Township Assistance</h2>
                        <hr />
                        <p>This site provides up to date township information and access to Township and Community Assistance information.</p>
                        <p>Township assistance page is located on the navigation bar above, or click <a href="/assistance">here</a>.</p>
                        <br />
                        <div>
                            {(this.state.data) ?
                                <div>
                                    <p>Next upcoming event:</p>
                                    <Card >
                                        <EventDetails data={this.state.data} />
                                    </Card>
                                </div> : <Card><p>No Upcoming Events</p></Card>
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
                        <p>Closed Holidays</p>
                        <p><strong>Email</strong></p>
                        <p>browntownshipin@gmail.com</p>
                        <br />
                        <h3>Township Fire Protection </h3>
                        <p>Provided for by a entity created between Brown Township, Lincoln Township and the town of Brownsburg. Fire stations #132 and #133 are located in our township. The trustee office is located in fire station #132.</p>
                        <p><a href="http://www.brownsburgfire.org/">www.brownsburgfire.org</a></p>
                    </div>
                </section>
            </div>
        )
    }
}