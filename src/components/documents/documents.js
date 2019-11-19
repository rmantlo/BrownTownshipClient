import React from 'react';
import APIURL from '../../helpers/environment';
import './documents.css';
import { Input } from 'reactstrap';
//import classnames from 'classnames';
import DocumentDetails from './documentDetails';

export default class Documents extends React.Component {
    state = {
        documentDetailsModal: false,
        data: [],
        detailDataId: null
    }

    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/budget/alldocuments`, {
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

    documentDetailsToggle = (event) => {
        //console.log(event);
        this.setState({
            documentDetailsModal: !this.state.documentDetailsModal,
            detailDataId: event.id
        })
    }
    render() {
        return (
            <div className='budgets'>
                <div className='secondaryContainer'>
                    <div className="docContainer">
                        <div className="searchDocs">
                            <h6>Browse Documents</h6>
                            <Input type='select'>
                                <option> - </option>
                                <option>Budget</option>
                                <option>Minutes</option>
                                <option>Resolutions</option>
                                <option>Reports</option>
                                <option>Other</option>
                            </Input>
                            <Input />
                        </div>
                        <div className="docAssortment">
                            {(this.state.data.length > 0) ? (this.state.data.map(doc => {
                                return (
                                    <div className="docSquare" key={doc.id} onClick={e => { e.preventDefault(); this.documentDetailsToggle(doc) }}>
                                        <p>{doc.fileDate}</p>
                                        <h4>{doc.fileName}</h4>
                                    </div>)
                            }))
                                : <div className='noDocuments'><h5>No Documents Uploaded</h5></div>}
                        </div>
                    </div>
                </div >
                {(this.state.documentDetailsModal) ? <DocumentDetails exit={this.documentDetailsToggle} data={this.state.detailDataId} /> : null}
            </div>
        )
    }
}