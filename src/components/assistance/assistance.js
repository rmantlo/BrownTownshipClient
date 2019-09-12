import React from 'react';
import './assistance.css';

export default class Assistance extends React.Component {

    render() {
        return (
            <div className='assistance secondaryContainer'>
                <div className='assistInfo'>
                    <h2>Township Assistance</h2>
                    <p>Brown Township offers temporary assistance to qualifying individuals, in an attempt to help our citizens get back on their own two feet. Individuals and families who wish to apply can find more instructions on Eligibily and next steps below. Those who do not meet the requirements, the Township will attempt to refer those to other programs and counsels available. Township Assistance is a program that allows those in need of temporary relief the opportunity to apply for assistance for food, clothing, shelter, and other basic necessities. The state requires the completion of an application and thorough investigation, and then assists in the most economical means available.</p>
                    <h4>Eligibility</h4>
                    <p>To be eligible for assistance, applicants must be:</p>
                    <ul>
                        <li>a resident of Brown Township.</li>
                        <li>In dire need of assistance for basic living necessities.</li>
                    </ul>
                    <h4>First Steps</h4>
                    <p>list of things to do</p>
                    <ul>
                        <li>Completely fill out the required documents.</li>
                        <li>Schedule a meeting with the Trustee at the Trustee Office.</li>
                        <li>Complete written application at the Trustee's Office.</li>
                        <li>Please bring:</li>
                        <ul>
                            <li>Photo ID</li>
                            <li>Social Security Cards</li>
                        </ul>
                    </ul>
                </div>
                <div>
                    <div>
                        <h5>Required Documents</h5>
                        <ul>
                            <li>downloads</li>
                            <li>downloads</li>
                            <li>downloads</li>
                        </ul>
                    </div>
                    <div className='trusteeInfo'>
                        <p><strong>Township Trustee Email: </strong></p>
                        <p>browntownshipin@gmail.com</p>
                    </div>
                </div>
            </div>
        )
    }
}