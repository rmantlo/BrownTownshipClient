import React from 'react';
import { Input, FormGroup, Form } from 'reactstrap';


export default class DocSearch extends React.Component {

    handleChange = (e) => {

    }
    render() {
        return (
            <div className="searchDocs">
                <h5>Browse Documents</h5>
                <Form>
                    <FormGroup>
                        <Input type='select' name='typeSearch' onChange={(e) => this.props.toggleSearch(e)}>
                            <option>All Documents</option>
                            <option>Budget</option>
                            <option>Minutes</option>
                            <option>Resolutions</option>
                            <option>Reports</option>
                            <option>Other</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type='date' name='dateSearch' onChange={e => {e.preventDefault(); this.props.toggleDateSearch(e)}}/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}