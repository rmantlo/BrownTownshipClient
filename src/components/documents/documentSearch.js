import React from 'react';
import { Input, FormGroup, Form } from 'reactstrap';


export default class DocSearch extends React.Component {

    handleChange = (e) => {

    }
    render() {
        return (
            <div className="searchDocs">
                <h6>Browse Documents</h6>
                <Form>
                    <FormGroup>
                        <Input type='select' onChange={(e) => this.props.toggleSearch(e)}>
                            <option>All Documents</option>
                            <option>Budget</option>
                            <option>Minutes</option>
                            <option>Resolutions</option>
                            <option>Reports</option>
                            <option>Other</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type='date' onChange={e => {e.preventDefault(); this.props.toggleDateSearch(e)}}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}