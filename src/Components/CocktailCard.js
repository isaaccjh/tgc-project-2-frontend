import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Nav, Accordion, Row, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";


export default function CocktailCard(props) {
    const flavourProfiles = [
        {
            value: "Boozy",
            label: "Boozy"
        },
        {
            value: "Sweet",
            label: "Sweet"
        },
        {
            value: "Sour",
            label: "Sour"
        },
        {
            value: "Bitter",
            label: "Bitter"
        },
        {
            value: "Umami",
            label: "Umami"
        },
        {
            value: "Salty",
            label: "Salty"
        },
        {
            value: "Astringent",
            label: "Astringent"
        },
        {
            value: "Hot",
            label: "Hot"
        },
        {
            value: "Cold",
            label: "Cold"
        },

    ]

    return <div>
        <Card border="none" className="shadow" style={{ "width": "18rem" }}>
            <Card.Img style={{ "maxHeight": "300px", "minHeight": "300px", "objectFit": "cover" }} variant="top" src={props.imageUrl}></Card.Img>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="text-muted">
                    {/* By: {props.user.username} */}
                </Card.Text>
                <Button variant="primary" size="sm" className="me-2" onClick={props.toggleCocktailModal}>View</Button>
                <Button variant="danger" size="sm" onClick={props.deleteConfirmation}>Delete</Button>
            </Card.Body>
        </Card>
        <Modal show={props.cocktailModalStatus} animation="true" centered="true" backdrop={true}>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Title>{props.viewName}</Card.Title>
                        <Card.Img variant="top" src={props.viewImageUrl} style={{ "maxHeight": "300px", "minHeight": "300px", "objectFit": "cover" }} />
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Details</Accordion.Header>
                                <Accordion.Body>
                                    <strong>{props.viewName}</strong> is a {props.viewAlcoholic === "alcoholic" ? "cocktail" : "mocktail"} best consumed in a <strong>{props.viewGlassType}</strong>.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Ingredients</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {props.viewIngredients ? props.viewIngredients.map((x, index) => {
                                            return (
                                                <li>
                                                    {x.name}, {x.measurements} 
                                                </li>
                                            )
                                        }) : null}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Preparation</Accordion.Header>
                                <Accordion.Body>
                                    {props.viewPreparation}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
                <Button variant="secondary" onClick={props.beginEdit} className="me-2 mt-3">Edit</Button>
                <Button variant="danger" onClick={props.closeCocktailModal} className="mt-3">Close</Button>
            </Modal.Body>
        </Modal>


        {/* DELETE CONFIRMATION  */}
        <Modal show={props.delete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.cancelDelete}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={props.deletePost}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

        {/* UPDATE FORM */}
        <Modal show={props.postBeingEdited} centered size="lg">
            <Modal.Header>
                <Modal.Title>Edit mocktail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                name="updatedName"
                                onChange={props.onUpdateField}
                                value={props.updatedName}
                                isInvalid={props.nameError}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {props.nameError}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form.Select name="updatedGlassType"
                                onChange={props.onUpdateField}
                                value={props.updatedGlassType}
                                required
                                isInvalid={props.glassTypeError}
                            >
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
                            <Form.Control.Feedback type="invalid">
                                Please select a type of glass.
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Select name="updatedAlcoholic"
                                onChange={props.onUpdateField}
                                value={props.updatedAlcoholic}
                                required
                                isInvalid={props.alcoholicError}
                            >
                                <option>Drink Type</option>
                                <option value="alcoholic">Cocktail</option>
                                <option value="non-alcoholic">Mocktail</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select the type of drink.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Form.Label>Flavour Profiles:</Form.Label>
                            <CreatableSelect
                                isMulti
                                options={flavourProfiles}
                                defaultValue={props.updatedDistinctions}
                                onChange={props.updateDistinctions}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label className="mt-3">Preparation Instructions:</Form.Label>
                            <InputGroup>
                                <Form.Control as="textarea"
                                    name="updatedPreparation"
                                    value={props.updatedPreparation}
                                    onChange={props.onUpdateField}
                                    required
                                    isInvalid={props.preparationError}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {props.preparationError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mt-2">
                                <InputGroup.Text>
                                    Image URL
                                </InputGroup.Text>
                                <Form.Control
                                    name="updatedImageUrl"
                                    value={props.updatedImageUrl}
                                    onChange={props.onUpdateField}
                                    required
                                    isInvalid={props.imageUrlError}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {props.imageUrlError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <Button variant="secondary" onClick={props.confirmEdit} className="mt-2 me-2">
                    Confirm Edit
                </Button>
                <Button variant="danger" onClick={props.cancelEdit} className="mt-2">
                    Cancel Edit
                </Button>

            </Modal.Body>
        </Modal>

    </div>
}