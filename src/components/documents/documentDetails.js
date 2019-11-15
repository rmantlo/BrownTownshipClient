import React from 'react';
import APIURL from '../../helpers/environment';
import './documents.css';
import { Button } from 'reactstrap';
import PDFViewer from '../pdfviewer/PDFViewer';


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

    render() {
        return (
            <div className="myModal">
                <div className='documentModal' >
                    <Button id="exitBtn" name='documentDetailsModal' onClick={(e) => { e.preventDefault(); this.props.exit("close"); }} >X</Button>
                    <div className='documentInner'>
                        <h6>{this.state.data.fileDate}</h6>
                        <h3>{this.state.data.fileName}</h3>
                        <h6>{this.state.data.documentType}</h6>

                        {(this.state.data.fileBinary) ?
                            <PDFViewer data={this.state.data.fileBinary} />
                            : null
                        }


                        {/* <object className='iframe' data={this.state.data.fileBinary} type={this.state.data.fileType} title={this.state.data.fileName} >
                            <iframe className='iframe' src={this.state.data.fileBinary} />
                                <p>Oops! You don't support PDFs!</p>
                                <p><a href={this.state.data.fileBinary} download>Download Instead</a></p>
                        </object> */}
                        <p><strong>Document Description:</strong> {this.state.data.description}</p>
                        {/* <p><strong>Date File Uploaded: </strong>{this.state.data.updatedAt}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}