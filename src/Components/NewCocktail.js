import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";



export default class NewCocktail extends React.Component {

    flavourProfiles = [
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


    render() {
        return (<div>

            <Modal show={this.props.formStatus} centered="true" animation={true} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add a new cocktail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => this.props.submitForm(e)}>
                        <Row>
                            <Col>
                                <Form.Control
                                    tooltip={false}
                                    isInvalid={this.props.nameError}
                                    name="name"
                                    placeholder="Name of cocktail (e.g. Mint Julep)"
                                    onChange={(e) => {
                                        this.props.onUpdateField(e);
                                    }}
                                    required
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.nameError}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mt-2 mb-2">
                            <Col>
                                <Form.Select
                                    name="glassType"
                                    onChange={this.props.onUpdateField}
                                    required
                                    isInvalid={this.props.glassTypeError}
                                    value={this.props.glassType}
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
                                <Form.Select
                                    name="alcoholic"
                                    onChange={this.props.onUpdateField}
                                    required
                                    isInvalid={this.props.alcoholicError}
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
                        {/*INGREDIENTS SECTION HERE */}
                        <Row>
                            <Col>
                                <Form.Label>Ingredients:</Form.Label>
                                <ul>
                                    {this.props.displayIngredients ?
                                        this.props.displayIngredients.map(ingredient => {
                                            return (
                                                <li>
                                                     {ingredient.name}, {ingredient.measurement}
                                                </li>
                                            )
                                        })
                                        : null}
                                </ul>
                                <InputGroup className="mb-2">
                                    <Col xs={3} className="me-4">
                                        <Form.Control
                                            placeholder="Amount"
                                            name="measurements"
                                            onChange={this.props.onUpdateField}
                                            value={this.props.measurements}
                                            isInvalid={this.props.addMeasurementError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {this.props.addMeasurementError}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={8}>
                                        <Select
                                            options={this.props.ingredientName}
                                            placeholder="Select Ingredient"
                                            onChange={this.props.onChooseIngredient}
                                            defaultValue={null}
                                        />

                                    </Col>
                                    <Button
                                        variant="secondary"
                                        className="rounded mt-2 btn btn-sm"
                                        onClick={this.props.addIngredient}
                                    >
                                        Add Ingredient
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Flavour Profiles:</Form.Label>
                                <CreatableSelect
                                    isMulti
                                    options={this.flavourProfiles}
                                    onChange={this.props.createDistinctions}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label className="mt-3">Preparation Instructions:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        name="preparation"
                                        onChange={this.props.onUpdateField}
                                        required
                                        placeholder="Instructions (Min. 10 characters)"
                                        isInvalid={this.props.preparationError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.props.preparationError}
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
                                        name="imageUrl"
                                        onChange={this.props.onUpdateField}
                                        required
                                        isInvalid={this.props.imageUrlError}
                                        validated={this.props.validated}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.props.imageUrlError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Button type="submit" className="mt-4 me-2" variant="primary" >Post</Button>
                        <Button className="mt-4" variant="secondary" onClick={this.props.closeForm}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>)
    }
}