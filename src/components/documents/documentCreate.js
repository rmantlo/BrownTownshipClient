import React from 'react';
import APIURL from '../../helpers/environment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class DocumentCreate extends React.Component {
    state = { }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
        console.log(this.state[event.target.name]);
        console.log(this.state);
        console.log(document.getElementById('upload').files[0])
    }
    handleCreateSubmit = (e) => {
        let doc = document.getElementById('upload').files[0];
        if(doc.type !== 'application/pdf'){ alert('File upload must be a PDF!')}
        let result = '';
        let blob = new Blob([doc], { type: "application/pdf" });
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = (e) => {
            //const view = new UInt8Array(reader.result);
            console.log(reader.result);
            result = reader.result;
            console.log(result);
            fetch(`${APIURL}/admin/uploaddocument`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    data: result,
                    fileName: this.state.fileName,
                    documentType: this.state.documentType,
                    description: this.state.description,
                    fileDate: this.state.fileDate,
                    fileType: doc.type,
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className='myModal'>
                <div className='modalContent'>
                    <Button id='exitBtn' name='createBudgetModal' onClick={(e) => {this.props.exit(e); }} >X</Button>
                    <br />
                    <Form onSubmit={this.handleCreateSubmit}>
                        <FormGroup >
                            <Label>Select document label:</Label><br/>
                            <Input type="select" name="documentType" onChange={this.handleChange}>
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
                            <Input type='text' name='fileName' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Date:</Label>
                            <Input type='date' name='fileDate' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Description:</Label>
                            <Input type='textarea' name='description' onChange={this.handleChange} />
                        </FormGroup>
                        <Button className='mainBtn' type='submit'>Add File</Button>
                    </Form>
                </div>
            </div>
        )
    }
}