import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs"
import { InputGroup, Form, Button, Dropdown } from "react-bootstrap";
import "../index.css"

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="pt-2">
                <InputGroup>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown">
                            <BsFilter size={22} /> {this.props.filter}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={() => this.props.searchFilter("Name")}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.searchFilter("Drink Type")}>Drink Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.searchFilter("Ingredients")}>Ingredients</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.searchFilter("Glass Type")}>Glass Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.searchFilter("Flavour Profiles")}>Flavour Profiles</Dropdown.Item>
                            <Dropdown.Item onClick={this.props.clearFilter}>Clear</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        placeholder={this.props.placeholder}
                        onChange={this.props.onUpdateField}
                        value={this.props.search}
                        name="search"
                    />
                    <Button variant="dark" onClick={this.props.submitSearch} ><AiOutlineSearch /></Button>
                </InputGroup>
            </div>
        )
    }


}