import React from 'react';
import './assistance.css';
import TA1Form from  '../../assets/files/TownshipAssistanceApplication.pdf';
import Guidelines from '../../assets/files/2019FEDpovertyguidelines.pdf';
import ImportantDocs from '../../assets/files/Applicationlistofdocuments.pdf';
import Trustees from '../../assets/files/2019HendricksCountyTrustees.pdf';
import Blessings from '../../assets/files/BrownsburgBlessingBoxLocations.pdf';
import OtherHelp from '../../assets/files/OtherCommunityResources.pdf';

export default class Assistance extends React.Component {

    render() {
        return (
            <div className='assistance secondaryContainer'> 
                <div className='assistInfo'>
                    <h1>Township Assistance</h1>
                    <p>Brown Township offers temporary assistance to qualifying individuals, in an attempt to help our citizens get back on their own two feet. Individuals and families who wish to apply can find more instructions on Eligibily and next steps below. Those who do not meet the requirements, the Township will attempt to refer those to other programs and counsels available. Township Assistance is a program that allows those in need of temporary relief the opportunity to apply for assistance for food, clothing, shelter, and other basic necessities. The state requires the completion of an application and thorough investigation, and then assists in the most economical means available.</p>
                    <h4>Eligibility</h4>
                    <p>To be eligible for assistance, applicants must be:</p>
                    <ul>
                        <li>A resident of Brown Township.</li>
                        <li>In dire need of assistance for basic living necessities.</li>
                    </ul>
                    <h4>First Steps</h4>
                    <p>list of things to do</p>
                    <ul>
                        <li>Schedule a meeting with the Trustee at the Trustee Office.</li>
                        <li>Completely fill out the required Township Assistance TA-1 Form. Download from the list, or recieve a copy at the Trustee office to fill out.</li>
                        <li>Please bring:</li>
                        <ul>
                            <li>Photo ID</li>
                            <li>Social Security Cards</li>
                            <li>Consult the List Of Important Documents List in the downloads section.</li>
                        </ul>
                    </ul>
                    <br />
                    <hr />
                    <h3>Other Community Resources</h3>
                    <p>The downloads section has a PDF containing a list of more community resource options.</p>
                    <h5>Hendrick Country Resources</h5>
                    <p>Hendricks County has multiple resources for our community. Visit <a href="https://www.hendrickshealthpartnership.org/resources.html" target="_blank" rel="noopener noreferrer">hendrickshealthpartnership.org/resources</a> to connect to their variety of resources and options ranging from poor relief to</p>
                    <h5>Elderly Care</h5>
                    <p>Multiple resources are available to help your aging family and relatives. Hendrick Country and the state of Indiana, has many resources at <a href="https://www.hendrickshealthpartnership.org/aging-and-senior-services.html" target="_blank" rel="noopener noreferrer">hendrickshealthpartnership.org/resources</a>, including protective services information and care solution options, as well as social and support groups. Cicoa is a not-for-profit agency focused on helping provide solutions and care, they can be found at <a href="https://cicoa.org/" target="_blank" rel="noopener noreferrer">cicoa.org</a>.</p>
                    <h5>Addiction and Mental Health Services</h5>
                    <p>Our Government has resource to help find and start treatment for addiction at <a href="https://findtreatment.gov/" target="_blank" rel="noopener noreferrer">findtreatment.gov</a>. The Willow Center is a local option for in person support, visit their site at <a href="https://thewillowcenter.com/" target="_blank" rel="noopener noreferrer">thewillowcenter.com</a>. The Hendrick County resource website as many other viable options at <a href="https://www.hendrickshealthpartnership.org/addiction-substance-misuse-and-recovery.html" target="_blank" rel="noopener noreferrer">hendrickshealthpartnership.org/addiction-substance-misuse-and-recovery</a>.</p>
                    <p>For support and resources covering mental health, Hendricks County resources can be found at <a href="https://www.hendrickshealthpartnership.org/mental-health-and-counseling.html" target="_blank" rel="noopener noreferrer">www.hendrickshealthpartnership.org/mental-health-and-counseling</a>. Meridian Health Group also has options and resources for mental health and addiction support, found at <a href="https://www.meridianhs.org/" target="_blank" rel="noopener noreferrer">meridianhs.org</a>.</p>
                    {/* <h5>Blessing Boxes</h5>
                    <p>Brownsburg has a few different locations for Blessing Boxes. The downloads list has an attached PDF listing the locations. These boxes contain various foods and personal care items to help those who need it, with the mission to take what you need and give back when you can.</p> */}
                </div>
                <div>
                    <div>
                        <h4>Downloads</h4>
                        <h5>Township Assistance Documents</h5>
                        <ul>
                            <li><a href={TA1Form} download alt='Township Assistance TA-1 Form PDF'>Township assistance TA-1 Form</a></li>
                            <li><a href={Guidelines} download alt="Poverty Guidelines 2019 PDF" >Poverty Guidelines 2019</a></li>
                            <li><a href={ImportantDocs} download alt="List Of Important Documents PDF">List Of Important Documents</a></li>
                        </ul>
                        <h5>Other Documents</h5>
                        <ul>
                            <li><a href={Trustees} download alt="Hendricks County Trustee Information 2019 PDF">Hendricks County Trustee Infomation 2019</a></li>
                            <li><a href={OtherHelp} alt="List of Other Community Resources PDF">List of Other Community Resources</a></li>
                            <li><a href={Blessings} download alt="Blessing Box Location List PDF">Blessing Box Locations in Brownsburg</a></li>
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