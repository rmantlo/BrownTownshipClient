import React from 'react';
import { CardBody, CardText } from 'reactstrap';


export default class EventDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = props.data
    }


    render() {
        var timeValue;
        if (this.state.dateOfEvent !== null && this.state.timeOfEvent !== null) {
            let time = (this.state.timeOfEvent.substring(0, 5)).split(':');
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
        }
        else {
            timeValue = "Date and Time To Be Determined";
        }

        return (
            <CardBody>
                <p id='eventType'>{this.state.type}</p>
                <h2>{this.state.title}</h2>
                {/* <p className='eventDateTime'>{timeValue} {this.state.dateOfEvent}</p> */}
                <p className='eventDateTime'>Location: {this.state.streetAddress}, {this.state.city}, {this.state.state} {this.state.zipcode}</p>
                <CardText className='message' >{this.state.forumMessage}</CardText>
                {(this.state.fileBinary != null)? 
                <a href={this.state.fileBinary} download >Download Attached Documents</a>
                : null}
            </CardBody>
        )
    }
}