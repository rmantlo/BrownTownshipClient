import React from 'react';
import APIURL from '../../helpers/environment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

export default class EventEdit extends React.Component {
    state = this.props.data
    format = 'h:mm a';
    now = moment().hour(parseInt((this.state.timeOfEvent).substring(0, 2))).minute(parseInt((this.state.timeOfEvent).substring(3, 5)));
    componentDidMount() {
        console.log(this.props);
        console.log(this.state);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
        console.log(this.state);
    }
    handleTime = (e) => {
        console.log(e.format(this.format));
        this.setState({ time: e.format(this.format) });
        console.log(this.state)
    }
    handleSubmit = (e) => {
        // console.log(this.state);
        // console.log(e.target.id)
        fetch(`${APIURL}/admin/editevent/${e.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        })
            .then()
    }
    render() {
        return (
            <div className='myModal'>
                <div className='modalContent'>
                    <Button id="exitBtn" onClick={(e) => { e.preventDefault(); this.props.exit(e); }} ><strong>X</strong></Button>
                    <div>
                        <h3>Edit Post</h3>
                        <Form id={this.state.id} onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Posting Type:</Label>
                                <Input type='select' name='type' onChange={this.handleChange}>
                                    <option name='type' value='Meeting'>Meeting</option>
                                    <option name='type' value='Event'>Event</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for='title'>Title: </Label><br />
                                <Input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
                            </FormGroup>
                            <Label>Date and Time:</Label>
                            <FormGroup id="eventLocation">
                                <Input id='date' type='date' name='dateOfEvent' value={this.state.dateOfEvent} onChange={this.handleChange} min="2000-01-01" />
                                <TimePicker id='time' type='time' name='timeOfEvent' value={this.now} showSecond={false} use12Hours format={this.format} inputReadOnly onChange={this.handleTime} />
                            </FormGroup>
                            <FormGroup id="eventLocation">
                                <FormGroup>
                                    <Label for='location'>Street Address: </Label><br />
                                    <Input id='li_location' type='text' name='streetAddress' value={this.state.streetAddress} onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='city'>City: </Label><br />
                                    <Input id='li_city' type='text' name='city' value={this.state.city} onChange={this.handleChange} />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup id='eventLocation'>
                                <FormGroup>
                                    <Label for="state">State: </Label><br />
                                    <Input type="select" name="state" id="state" value={this.state.state} onChange={this.handleChange}>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='zipcode'>Zipcode:</Label><br />
                                    <Input type='text' name='zipcode' value={this.state.zipcode} onChange={this.handleChange} />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for='message'>Post Message:</Label><br />
                                <Input id='li_message' type='textarea' name='forumMessage' value={this.state.forumMessage} onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit' id={this.state.id}>Update</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}