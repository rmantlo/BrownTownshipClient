import React from 'react';
import APIURL from '../../helpers/environment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

export default class EventCreate extends React.Component {
    state = {
        type: "Meeting",
        time: "12:00:00"
    }
    format = 'h:mm a';
    now = moment().hour(12).minute(0);
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleTime = (e) => {
        this.setState({ time: e.format(this.format) });
    }
    handleSubmit = (e) => {
        fetch(`${APIURL}/admin/createevent`, {
            method: 'POST',
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
                    <Button id="exitBtn" name='eventCreateModal' onClick={(e) => {this.props.exit(e); }} >X</Button>
                    <div>
                        <h3>Create Post</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type='select' name='type' onChange={this.handleChange}>
                                    <option name='type' value='Meeting'>Meeting</option>
                                    <option name='type' value='Event'>Event</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for='title'>Title: </Label><br />
                                <Input id='li_title' type='text' name='title' placeholder='enter title' onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup id="eventLocation">
                                <Input id='date' type='date' name='date' onChange={this.handleChange} min="2000-01-01" />
                                <TimePicker id="time" type='time' name='time' defaultValue={this.now} showSecond={false} use12Hours format={this.format} inputReadOnly onChange={this.handleTime} />
                            </FormGroup>
                            <FormGroup id="eventLocation">
                                <FormGroup>
                                    <Label for='location'>Street Address: </Label><br />
                                    <Input id='li_location' type='text' name='location' placeholder='enter street address' onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='city'>City: </Label><br />
                                    <Input id='li_city' type='text' name='city' placeholder='enter city' onChange={this.handleChange} />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup id="eventLocation">
                                <FormGroup>
                                    <Label for="state">State: </Label><br />
                                    <Input type="select" name="state" id="state" onChange={this.handleChange}>
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
                                    <Input type='text' name='zipcode' placeholder='enter zipcode' onChange={this.handleChange} />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for='message'>Details:</Label><br />
                                <Input id='li_message' type='textarea' name='message' placeholder='Enter details of this event or meeting!' onChange={this.handleChange} />
                            </FormGroup>
                            <Button type='submit'>Create</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}