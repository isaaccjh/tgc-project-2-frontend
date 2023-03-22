import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';

export default function CocktailCard(props) {

    return <div>
        <Card border="primary" style={{ "width": "18rem" }}>
            <Card.Img style={{ "maxHeight": "300px", "minHeight": "300px", "objectFit": "cover" }} variant="top" src={props.imageUrl}></Card.Img>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="text-muted">
                    By: {props.user.username}
                </Card.Text>
                <Button variant="primary" onClick={props.toggleCocktailModal}>View</Button>
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
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Img variant="top" src={props.imageUrl} />
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
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
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
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
                        </Accordion>
                    </Card.Body>
                </Card>
                <Button variant="secondary" className="me-2">Edit</Button>
                <Button variant="danger" onClick={props.closeCocktailModal}>Close</Button>
            </Modal.Body>

        </Modal>
    </div>
}