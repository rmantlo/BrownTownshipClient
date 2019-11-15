import React from 'react';
import APIURL from '../../helpers/environment';
import './documents.css';
import { Button } from 'reactstrap';
import PDFViewer from '../pdfviewer/PDFViewer';
import DocumentEdit from './documentEdit';


export default class DocumentDetails extends React.Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/budget/document/${this.props.data}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    this.setState({
                        data: data
                    });
                }
            })
            .catch(err => console.log(err));
    }
    editDocumentToggle = () => {
        this.setState({
            budgetModal: !this.state.budgetModal
        });
    }
    deleteFile = (e) => {
        fetch(`${APIURL}/admin/${e.target.name}/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        })
            .then(info => window.location.reload())
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="myModal">
                <div className='documentModal' >
                    <Button id="exitBtn" name='documentDetailsModal' onClick={(e) => { e.preventDefault(); this.props.exit("close"); }} >X</Button>
                    <div className='documentInner'>
                        <h6>{this.state.data.fileDate} - {this.state.data.documentType}</h6>
                        <h3>{this.state.data.fileName}</h3>
                        {(this.state.data.fileBinary) ?
                            <PDFViewer data={this.state.data.fileBinary} />
                            : null
                        }
                        <p><strong>Document Description:</strong> {this.state.data.description}</p>
                        {/* <p><strong>Date File Uploaded: </strong>{this.state.data.updatedAt}</p> */}
                    </div>
                    {(this.state.token) ?
                        <div>
                            <Button onClick={e => { e.preventDefault(); this.editDocumentToggle() }}>Edit</Button>
                            <Button color='danger' name="deletebudgetfile" id={this.state.data.id} onClick={this.deleteFile}>Delete</Button>
                        </div> : null
                    }
                </div>
                {(this.state.budgetModal) ?
                    <DocumentEdit data={this.state.data} exit={this.editDocumentToggle} /> : null
                }
            </div>
        )
    }
}