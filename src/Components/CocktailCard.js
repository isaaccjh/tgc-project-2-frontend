import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

export default function CocktailCard(props) {

    return <div>
        <Card border="primary" style={{"width": "18rem"}}>
            <Card.Img style={{"maxHeight": "300px", "min-height": "300px", "objectFit": "cover"}}variant="top" src={props.imageUrl}></Card.Img>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="text-muted">
                    By: {props.user.username}
                </Card.Text>
            <Button variant="primary" onClick={props.toggleCocktailModal}>View Recipe!</Button>
            </Card.Body>
        </Card>
        <Modal show={props.cocktailModalStatus} animation="true" centered="true">
            <Modal.Body>
                <div>{props.cocktailModalId}</div>
            <Button variant="danger" onClick={props.closeCocktailModal}>Close</Button>
            </Modal.Body>
            
        </Modal>
    </div>
}