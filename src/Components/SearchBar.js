import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs"
import { InputGroup, Form, Button, Dropdown } from "react-bootstrap";

export default class SearchBar extends React.Component {
    state = {
        
    }

    render() {
        return (<InputGroup>

            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown" className="ms-4">
                    <BsFilter size={22} /> Filter
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Ingredients</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Glass Type</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Flavour Profiles</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                placeholder="Search for a cocktail"
            />
    
    
            <Button variant="secondary" className="me-4"><AiOutlineSearch /></Button>
        </InputGroup>)
    }
}