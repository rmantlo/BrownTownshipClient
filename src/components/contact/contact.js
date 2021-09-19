import React from 'react';
import './contact.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
//import pic from '../../assets/dadanddixie.jpg';

export default class Contact extends React.Component {
    render() {
        return (
            <section className='contact secondaryContainer'>
                <div className='contactImg'>
                    {/* <h2>Brown Township Members</h2> */}
                    <br />
                    <h3>Trustee</h3>
                    <h4>Nathan Mantlo</h4>
                    {/* <img src={pic} alt='dad and dixie' /> */}
                    <p>Having lived in Brownsburg for over 15 years, Nathan decided he wanted to give back to our community. He took office on January 1st, 2019.</p>
                    <br />
                    <br />
                    <h5>Township Assistance Investigator</h5>
                    <h4>Jamie Sharkitt</h4>
                    <br />
                    <br />
                    <h5>Advisory Board Members</h5>
                    <h4>Dottie McIntyre - Chair Person</h4>
                    <p>Member about</p>
                    <br />
                    <h4>Angela Delp - Secretary</h4>
                    <p>Member about</p>
                    <br />
                    <h4>Tom Kmetz</h4>
                    <p>Member about</p>
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
                        <p>(317) 745-9255</p>
                        <p>(317) 374-4903</p>
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