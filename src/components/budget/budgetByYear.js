import React from 'react';
import APIURL from '../../helpers/environment';
import './budget.css';

export default class BudgetYear extends React.Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        fetch(`${APIURL}/budget/year/${this.props.year}`, {
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
                    })
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {(this.state.data.fileBinary) ?
                    <div>
                        <h6>{this.state.data.fileYear}</h6>
                        <h3>{this.state.data.fileName}</h3>
                        <object className='iframe' data={this.state.data.fileBinary} title={this.state.data.fileName} >
                            <p>Oops! You don't support PDFs!</p>
                            <p><a href={this.state.data.fileBinary}>Download Instead</a></p>
                        </object>
                        <p><strong>Document Description:</strong> {this.state.data.documentDesc}</p>
                        <p><strong>Date File Uploaded: </strong>{this.state.data.updatedAt.substring(0, 10)}</p>
                    </div>
                    : <div className="budgetFiller">No Available File for this Year</div>
                }
            </div>
        )
    }
}