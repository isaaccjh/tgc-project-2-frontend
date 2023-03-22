import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from "react-bootstrap";



export default class NewCocktail extends React.Component {


    render() {
        return (<div>
            <Modal show={this.props.formStatus} centered="true" animation={true} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add a new cocktail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control name="name" placeholder="Name of cocktail (e.g. Mint Julep)" onChange={this.props.onUpdateField} />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Select name="glassType" onChange={this.props.onUpdateField}>
                                    <option>Glass Type</option>
                                    <option value="Highball Glass">Highball</option>
                                    <option value="Lowball Glass">Lowball</option>
                                    <option value="Collins Glass">Collins</option>
                                    <option value="Zombie Glass">Zombie</option>
                                    <option value="Rocks Glass">Rocks</option>
                                    <option value="Coupe Glass">Coupe</option>
                                    <option value="Martini Glass">Martini</option>
                                    <option value="Copper Glass">Copper</option>
                                    <option value="Margarita Glass">Margarita</option>
                                    <option value="Hurricane Glass">Hurricane</option>
                                    <option value="Shot Glass">Shot</option>
                                    <option value="Punch Cup">Punch Cup</option>
                                    <option value="Julep Cup">Julep Cup</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select name="alcoholic" onChange={this.props.onUpdateField}>
                                    <option>Drink Type</option>
                                    <option value="alcoholic">Cocktail</option>
                                    <option value="non-alcoholic">Mocktail</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Flavour Profiles: </Form.Label>
                                {this.props.distinctions.map((flavour, index, array) => (
                                    <div key={index}>
                                        <InputGroup className="mb-1">
                                            <InputGroup.Text>Flavour</InputGroup.Text>
                                            <Form.Control
                                                defaultValue={array[index + 1]}
                                                name="addDistinction"
                                                onChange={this.props.onUpdateField}
                                                placeholder="All flavours (e.g. Sour)"
                                            />
                                        </InputGroup>
                                    </div>
                                ))}
                                <Button className="mt-2" size="sm" onClick={this.props.addDistinction}>Add Flavour</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Preparation Instructions:</Form.Label>
                                <InputGroup>
                                    <Form.Control as="textarea" name="preparation" onChange={this.props.onUpdateField} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup className="mt-2">
                                    <InputGroup.Text>
                                        Image URL
                                    </InputGroup.Text>
                                    <Form.Control name="imageUrl" onChange={this.props.onUpdateField} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                    <Button className="mt-4 me-2" variant="danger" onClick={this.props.closeForm}>Cancel</Button>
                    <Button className="mt-4" variant="primary" onClick={this.props.submitForm}>Submit</Button>
                </Modal.Body>
            </Modal>
        </div>)
    }
}