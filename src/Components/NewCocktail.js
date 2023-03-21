import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

export default function NewCocktail(props) {
    return (<div>
        <Modal show={props.formStatus}>
            <Modal.Header>
                <Modal.Title>Add a new cocktail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control placeholder="First name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Last name" />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    </div>)
}