import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input,
    Spinner,
    Alert
} from 'reactstrap';



const AddAssignment = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="success" onClick={togglemodal}>Add Assignment</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>New assignment</ModalHeader>
                <Form style={{padding:20}} onSubmit={props.createCurriculum}>
                    <Label for="Title">Title</Label>
                    <Input onChange={props.handleInputChange} type="title" id="titleAdd" required />
                        <Button style={{ marginTop: 20 }} type="submit" onClick={props.AddAssignment}>Submit</Button>
                </Form>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AddAssignment;