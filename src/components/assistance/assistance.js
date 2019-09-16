import React from 'react';
import './assistance.css';
import TA1Form from  '../../assets/files/TownshipAssistanceApplication.pdf';
import Guidelines from '../../assets/files/2019FEDpovertyguidelines.pdf';
import ImportantDocs from '../../assets/files/Applicationlistofdocuments.pdf';
import Trustees from '../../assets/files/2019HENDRICKSCOUNTYTRUSTEES.docx';
import Blessings from '../../assets/files/LocationsforBrownsburgBlessingBoxes.docx';

export default class Assistance extends React.Component {

    render() {
        return (
            <div className='assistance secondaryContainer'> 
                <div className='assistInfo'>
                    <h2>Township Assistance</h2>
                    <p>Brown Township offers temporary assistance to qualifying individuals, in an attempt to help our citizens get back on their own two feet. Individuals and families who wish to apply can find more instructions on Eligibily and next steps below. Those who do not meet the requirements, the Township will attempt to refer those to other programs and counsels available. Township Assistance is a program that allows those in need of temporary relief the opportunity to apply for assistance for food, clothing, shelter, and other basic necessities. The state requires the completion of an application and thorough investigation, and then assists in the most economical means available.</p>
                    <h3>Blessing Boxes</h3>
                    <p>Brownsburg has a few different locations for Blessing Boxes. The downloads list has and attachment listing the locations. These boxes contain various foods and personal care items to help those who need it, with the mission to take what you need and give back when you can.</p>
                    <h4>Eligibility</h4>
                    <p>To be eligible for assistance, applicants must be:</p>
                    <ul>
                        <li>a resident of Brown Township.</li>
                        <li>In dire need of assistance for basic living necessities.</li>
                    </ul>
                    <h4>First Steps</h4>
                    <p>list of things to do</p>
                    <ul>
                        <li>Completely fill out the required Township Assistance TA-1 Form. Download from the list, or at the Trustee office.</li>
                        <li>Schedule a meeting with the Trustee at the Trustee Office.</li>
                        <li>Please bring:</li>
                        <ul>
                            <li>Photo ID</li>
                            <li>Social Security Cards</li>
                            <li>Consult the List Of Important Documents List in the downloads section.</li>
                        </ul>

                    </ul>
                </div>
                <div>
                    <div>
                        <h4>Downloads</h4>
                        <h5>Required Documents</h5>
                        <ul>
                            <li><a href={TA1Form} download alt='Township Assistance TA-1 Form'>Township assistance TA-1 Form</a></li>
                        </ul>
                        <h5>Other Documents</h5>
                        <ul>
                            <li><a href={Guidelines} download alt="Poverty Guidelines 2019" >Poverty Guidelines 2019</a></li>
                            <li><a href={ImportantDocs} download alt="List Of Important Documents">List Of Important Documents</a></li>
                            <li><a href={Trustees} download alt="Hendricks County Trustee Information 2019">Hendricks County Trustee Infomation 2019</a></li>
                            <li><a href={Blessings} download alt="Blessing Box Location List">Blessing Box Locations in Brownsburg</a></li>
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