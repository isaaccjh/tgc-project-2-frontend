import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Nav, Accordion, Row, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";


export default function CocktailCard(props) {

    return <div>
        <Card border="primary" className="shadow" style={{ "width": "18rem" }}>
            <Card.Img style={{ "maxHeight": "300px", "minHeight": "300px", "objectFit": "cover" }} variant="top" src={props.imageUrl}></Card.Img>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="text-muted">
                    By: {props.user.username}
                </Card.Text>
                <Button variant="primary" size="sm" className="me-2" onClick={props.toggleCocktailModal}>View</Button>
                <Button variant="danger" size="sm" onClick={props.deleteConfirmation}>Delete</Button>
            </Card.Body>
        </Card>
        <Modal show={props.cocktailModalStatus} animation="true" centered="true" backdrop={true}>
            <Modal.Body>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Recipe</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Comments</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{props.viewName}</Card.Title>
                        <Card.Img variant="top" src={props.viewImageUrl} style={{ "maxHeight": "300px", "minHeight": "300px", "objectFit": "cover" }} />
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Details</Accordion.Header>
                                <Accordion.Body>
                                    <strong>{props.viewName}</strong> is a {props.viewAlcoholic ? <strong>Cocktail</strong> : <strong>Mocktail</strong>} best consumed in a <strong>{props.viewGlassType}</strong>.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Ingredients</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
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
                            <Form.Control name="name" placeholder="Name of cocktail (e.g. Mint Julep)" />
                        </Col>
                    </Row>
                </Form>
                <Button variant="secondary" className="mt-2 me-2">
                    Confirm Edit
                </Button>
                <Button variant="danger" onClick={props.cancelEdit} className="mt-2">
                    Cancel Edit
                </Button>

            </Modal.Body>
        </Modal>

    </div>
}