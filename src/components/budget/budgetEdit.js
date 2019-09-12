import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class BudgetEdit extends React.Component {
    state = this.props.data

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
        console.log(this.state);
    }
    handleSubmit = (e) => {
        // console.log(this.state);
        // console.log(e.target.id)
        fetch(`http://localhost:3001/admin/updatebudgetfile/${this.state.id}`, {
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
                        <FormGroup>
                            <Label>Upload new File. If a File of the same year exists, it will be deleted and replaced with the new File.</Label>
                            <Input type='file' name='file' id='upload' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Title:</Label>
                            <Input type='text' name='fileName' value={this.state.fileName} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Year:</Label>
                            <Input type='number' name='year' value={this.state.fileYear} onChange={this.handleChange} min='1990' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Description:</Label>
                            <Input type='textarea' name='documentDesc' value={this.state.documentDesc} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label>Make this document the current document:</Label><br />
                            <Input type='radio' name='radio1' value="true" onChange={(e) => { this.setState({ current: true }) }} />Yes<br />
                            <Input type='radio' name='radio1' value='false' onChange={(e) => { this.setState({ current: false }) }} />No
                        </FormGroup>
                        <Button className='mainBtn' type='submit'>Add File</Button>
                    </Form>
                </div>
            </div>
        )
    }
}