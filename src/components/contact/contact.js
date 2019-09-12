import React from 'react';
import './contact.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import pic from '../../assets/dadanddixie.jpg';

export default class Contact extends React.Component {
    render() {
        return (
            <section className='contact secondaryContainer'>
                <div className='contactImg'>
                    <h2>Brown Township Trustee</h2>
                    <h4>Nathan Mantlo</h4>
                    <img src={pic} alt='dad and dixie' />
                    <p>About the Trustee and Message Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah </p>
                </div>
                <div className='divider'></div>
                <div className='contactForm'>
                    <div className='trusteeInfo'>
                        <h2>Contact Us</h2>
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
                    <br />
                    <Form action="https://formspree.io/browntownshipin@gmail.com" method="POST" >
                        <FormGroup>
                            <Label >Name:</Label><br />
                            <Input type="text" name="name" /><br />
                        </FormGroup>
                        <FormGroup>
                            <Label >Email:</Label><br />
                            <Input type="text" name="_replyto" /><br />
                        </FormGroup>
                        <FormGroup>
                            <Label >Message:</Label><br />
                            <Input type="textarea" name="message" size="50" /><br /><br />
                        </FormGroup>
                        <Input type="submit" value="Send" />
                    </Form>
                </div>
            </section>
        )
    }
}