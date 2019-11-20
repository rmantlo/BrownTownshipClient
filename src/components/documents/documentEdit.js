import React from 'react';
import APIURL from '../../helpers/environment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class DocumentEdit extends React.Component {
    state = this.props.data
    componentDidMount() {
        console.log(this.state)
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
        console.log(this.state);
    }
    handleSubmit = (e) => {
        fetch(`${APIURL}/admin/updatebudgetfile/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        })
            .then()
    }
    render() {
        return (
            <div className='myModal'>
                <div className='modalContent'>
                    <Button id='exitBtn' onClick={(e) => { e.preventDefault(); this.props.exit(e); }} ><strong>X</strong></Button>
                    <br />
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup >
                            <Label>Select document label:</Label><br />
                            <Input type="select" value={this.state.documentType} name="documentType" onChange={this.handleChange}>
                                <option name="documentType" value="Budget">Budget</option>
                                <option name="documentType" value="Minutes">Minutes</option>
                                <option name="documentType" value="Resolutions">Resolutions</option>
                                <option name="documentType" value="Reports">Reports</option>
                                <option name="documentType" value="Other">Other</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Upload new PDF File: </Label>
                            <Input type='file' name='file' id='upload' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Title:</Label>
                            <Input type='text' value={this.state.fileName} name='fileName' onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Date:</Label>
                            <Input type='date' value={this.state.fileDate} name='fileDate' onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Description:</Label>
                            <Input type='textarea' value={this.state.description} name='description' onChange={this.handleChange} required/>
                        </FormGroup>
                        <Button className='mainBtn' type='submit'>Update File</Button>
                    </Form>
                </div>
            </div>
        )
    }
}