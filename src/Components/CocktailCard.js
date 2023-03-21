import React, { useState } from "react";
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
                    By: 
                </Card.Text>
            <Button variant="danger">View Recipe!</Button>
            </Card.Body>
        </Card>
    </div>
}