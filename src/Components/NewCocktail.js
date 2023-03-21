import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from "react-bootstrap";



export default function NewCocktail(props) {

    const flavorProfiles = [
        { id: 1, name: 'Strong' },
        { id: 2, name: 'Bitter' },
        { id: 3, name: 'Sour' },
        { id: 4, name: 'Sweet' },
    ];


    return (<div>
        <Modal show={props.formStatus} centered="true" animation="true">
            <Modal.Header>
                <Modal.Title>Add a new cocktail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control name="name" placeholder="Name of cocktail (E.g. Mint Julep)" onChange={props.onUpdateField} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form.Select name="glassType" onChange={props.onUpdateField}>
                                <option>Glass Type</option>
                                <option value="highball">Highball</option>
                                <option value="lowball">Lowball</option>
                                <option value="collins">Collins</option>
                                <option value="zombie">Zombie</option>
                                <option value="rocks">Rocks</option>
                                <option value="coupe">Coupe</option>
                                <option value="martini">Martini</option>
                                <option value="copper">Copper</option>
                                <option value="margarita">Margarita</option>
                                <option value="hurricane">Hurricane</option>
                                <option value="punch">Punch Cup</option>
                                <option value="julep">Julep Cup</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select name="alcoholic" onChange={props.onUpdateField}>
                                <option>Drink Type</option>
                                <option value="alcoholic">Cocktail</option>
                                <option value="non-alcoholic">Mocktail</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Ingredients</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Preparation Instructions:</Form.Label>
                            <InputGroup>
                                <Form.Control as="textarea" name="preparation" onChange={props.onUpdateField}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mt-2">
                                <InputGroup.Text>
                                    Image URL
                                </InputGroup.Text>
                                <Form.Control name="imageUrl" onChange={props.onUpdateField} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <Button className="mt-4 me-2" variant="danger" onClick={props.closeForm}>Cancel</Button>
                <Button className="mt-4" variant="primary" onClick={props.submitForm}>Submit</Button>
            </Modal.Body>
        </Modal>
    </div>)
}