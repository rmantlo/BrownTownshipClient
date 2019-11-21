import React from 'react';
import APIURL from '../../helpers/environment';
import './documents.css';
import { Button } from 'reactstrap';
//import classnames from 'classnames';
import DocumentDetails from './documentDetails';
import DocSearch from './documentSearch';

export default class Documents extends React.Component {
    state = {
        documentDetailsModal: false,
        data: [],
        bufferData: [],
        detailDataId: null,
        typeSearch: '',
        dateSearch: '',
        extraDataView: false
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
            this.setState({ typeSearch: '' });
            if (this.state.dateSearch === '') {
                this.fetchDocuments();
            }
            else {
                this.fetchDateSearch(this.state.dateSearch);
            }
        }
        else {
            this.setState({ typeSearch: e.target.value });
            if (this.state.dateSearch === '') {
                this.fetchSearch(e.target.value);
            } else {
                this.searchBoth(this.state.dateSearch, e.target.value);
            }
        }
    }
    toggleDateSearch = (e) => {
        if (e.target.value == null || e.target.value === "") {
            this.setState({ dateSearch: '' });
            if (this.state.typeSearch === '') {
                this.fetchDocuments();
            }
            else {
                this.fetchSearch(this.state.typeSearch)
            }
        }
        else {
            this.setState({ dateSearch: e.target.value });
            if (this.state.typeSearch === '') {
                this.fetchDateSearch(e.target.value);
            }
            else {
                this.searchBoth(e.target.value, this.state.typeSearch);
            }
        }
    }
    fetchSearch = (e) => {
        fetch(`${APIURL}/budget/search/${e}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(search => {
                if (search != null) {
                    this.setState({ data: search, bufferData: [] })
                }
                else {
                    this.setState({ data: [], bufferData: [] })
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
                    this.setState({
                        data: search.docsBeforeDate,
                        bufferData: search.docsAfterDate
                    })
                }
                else {
                    this.setState({ data: [], bufferData: [] })
                }
            });
    }
    searchBoth = (date, type) => {
        fetch(`${APIURL}/budget/searchtypedate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: type,
                date: date
            })
        })
            .then(res => res.json())
            .then(search => {
                if (search != null && search !== undefined) {
                    this.setState({
                        data: search.docsBeforeDate,
                        bufferData: search.docsAfterDate
                    })
                }
                else {
                    this.setState({ data: [], bufferData: [] })
                }
            });
    }
    seeExtras = () => {
        this.setState({ extraDataView: !this.state.extraDataView });
    }
    render() {
        return (
            <div className='budgets'>
                <div className='secondaryContainer'>
                    <div className="docContainer documentBackground">
                        <DocSearch toggleSearch={this.toggleSearch} toggleDateSearch={this.toggleDateSearch} />
                        <div >
                            {(this.state.bufferData.length > 0) ?
                                <div className="docWithinDays">
                                    <Button color='danger' onClick={this.seeExtras}>See Documents Within 7 days</Button>
                                    {(this.state.extraDataView) ? <div className='docWithinFlex'>{this.state.bufferData.map(doc => {
                                        return (
                                            <div className="docSquare" key={doc.id + "a"} onClick={e => { e.preventDefault(); this.documentDetailsToggle(doc) }}>
                                                <p>{doc.fileDate}</p>
                                                <p>{doc.documentType}</p>
                                                <h4>{doc.fileName}</h4>
                                                <div id="docHover">Click to see full document.</div>
                                            </div>
                                        )
                                    })}</div> : null}
                                </div> : null}
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
                    </div>
                </div >
                {(this.state.documentDetailsModal) ? <DocumentDetails exit={this.documentDetailsToggle} data={this.state.detailDataId} /> : null}
            </div>
        )
    }
}