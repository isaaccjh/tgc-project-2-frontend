import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

export default function CocktailCard(props) {

    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(true);
    const toggleClose = () => setShow(false); 


    return <div>
        <Card border="primary" style={{"width": "18rem"}}>
            <Card.Img variant="top" src="https://www.thespruceeats.com/thmb/r6dINFq3-aq1IX15bubkUWuA-ek=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-mint-julep-recipe-759323-hero-01-ea60587d78c44f7f8e1c5cc16f6c3934.jpg"></Card.Img>
            <Card.Body>
                <Card.Title>Mint Julep</Card.Title>
                <Card.Text className="text-muted">
                    By: Isaac Chan
                </Card.Text>
            <Button variant="danger">View Recipe!</Button>
            </Card.Body>
        </Card>
    </div>
}