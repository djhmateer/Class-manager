import React, { useState } from "react";
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    Form,
    Label,
    Input
} from 'reactstrap';
import { connect } from "react-redux";
import { clearErrors } from "../../actions/error-actions";
import { loadUser } from "../../actions/auth-actions";
import "./student.css";


const AddStudent = (props) => {
    const togglemodalS = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button style={{ marginRight: "2vw", marginTop: "2vw", float: "right" }} onClick={togglemodalS}>Add New Student</Button>
            <div className="add-student-form-wrap">
                <Modal isOpen={modal} toggle={togglemodalS}>
                    <ModalHeader toggle={togglemodalS}>New Student</ModalHeader>
                    <Form className="add-student-form" onSubmit={props.handleFormSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">First name</Label>
                            <Input required onChange={props.handleInputChange} id="firstName" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Last name</Label>
                            <Input required onChange={props.handleInputChange} id="lastName" type="input" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password2">Date of birth</Label>
                            <Input required onChange={props.handleInputChange} id="password2" type="input" placeholder="DD/MM/YYYY" />
                        </FormGroup>
                        <FormGroup>
                            <Button className="register-submit-btn" type="submit" >Submit</Button>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser }
)(AddStudent);