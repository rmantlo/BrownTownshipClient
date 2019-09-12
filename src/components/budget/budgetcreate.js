import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class BudgetCreate extends React.Component {
    state = {
        current: true
    }

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
            //const view = new Int8Array(reader.result);
            console.log(reader.result);
            result = reader.result;
            console.log(result);
            fetch(`http://localhost:3001/admin/uploadbudgetfile`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    data: result,
                    current: this.state.current,
                    documentDesc: this.state.documentDesc,
                    fileName: this.state.fileName,
                    fileType: doc.type,
                    year: this.state.year
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
                    <Button id='exitBtn' name='createBudgetModal' onClick={(e) => { e.preventDefault(); this.props.exit(e); }} ><strong>X</strong></Button>
                    <br />
                    <Form onSubmit={this.handleCreateSubmit}>
                        <FormGroup>
                            <Label>Upload new File. If a File of the same year exists, it will be deleted and replaced with the new File.</Label>
                            <Input type='file' name='file' id='upload' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Title:</Label>
                            <Input type='text' name='fileName' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Year:</Label>
                            <Input type='number' name='year' onChange={this.handleChange} min='1990' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Document Description:</Label>
                            <Input type='textarea' name='documentDesc' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label>Make this document the current document:</Label><br/>
                            <Input type='radio' name='radio1' defaultChecked onChange={(e) => { this.setState({ current: true }) }} />Yes<br/>
                            <Input type='radio' name='radio1' onChange={(e) => { this.setState({ current: false }) }} />No
                        </FormGroup>
                        <Button className='mainBtn' type='submit'>Add File</Button>
                    </Form>
                </div>
            </div>
        )
    }
}