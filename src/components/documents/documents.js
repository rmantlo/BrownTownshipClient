import React from 'react';
import APIURL from '../../helpers/environment';
import './documents.css';
//import classnames from 'classnames';
import DocumentDetails from './documentDetails';
import DocSearch from './documentSearch';

export default class Documents extends React.Component {
    state = {
        documentDetailsModal: false,
        data: [],
        detailDataId: null
    }

    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        this.fetchDocuments();
    }
    fetchDocuments = () => {
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
    toggleSearch = (e) => {
        if (e.target.value === "All Documents") {
            this.fetchDocuments();
        }
        else {
            this.fetchSearch(e);
        }
    }
    toggleDateSearch = (e) => {
        console.log(e.target.value)
        if (e.target.value == null || e.target.value === "") {
            this.fetchDocuments();
        }
        else {
            this.fetchDateSearch(e.target.value);
        }
    }
    fetchSearch = (e) => {
        fetch(`${APIURL}/budget/search/${e.target.value}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(search => {
                if (search != null) {
                    this.setState({ data: search })
                }
                else {
                    this.setState({ data: [] })
                }
            });
    }
    fetchDateSearch = (e) => {
        fetch(`${APIURL}/budget/searchdate/${e}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(search => {
                if (search != null) {
                    this.setState({ data: search })
                }
                else {
                    this.setState({ data: [] })
                }
            });
    }
    render() {
        return (
            <div className='budgets'>
                <div className='secondaryContainer'>
                    <div className="docContainer documentBackground">
                        <DocSearch toggleSearch={this.toggleSearch} toggleDateSearch={this.toggleDateSearch} />
                        <div className="docAssortment">
                            {(this.state.data.length > 0) ? (this.state.data.map(doc => {
                                return (
                                    <div className="docSquare" key={doc.id} onClick={e => { e.preventDefault(); this.documentDetailsToggle(doc) }}>
                                        <p>{doc.fileDate}</p>
                                        <p>{doc.documentType}</p>
                                        <h4>{doc.fileName}</h4>
                                        <div id="docHover">Click to see full document.</div>
                                    </div>)
                            }))
                                : <div className='noDocuments'><h3>No Documents Found</h3></div>}
                        </div>
                    </div>
                </div >
                {(this.state.documentDetailsModal) ? <DocumentDetails exit={this.documentDetailsToggle} data={this.state.detailDataId} /> : null}
            </div>
        )
    }
}