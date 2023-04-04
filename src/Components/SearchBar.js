import React from "react";
import { AiOutlineSearch, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFilter } from "react-icons/bs"
import { Form } from "react-bootstrap"
import "../index.css"
import "../css/Searchbar.css"
import Select from "react-select"

export default class SearchBar extends React.Component {

    glassTypes = [
        {
            "value": "Highball Glass",
            "label": "Highball"
        },
        {
            "value": "Lowball Glass",
            "label": "Lowball"
        },
        {
            "value": "Collins Glass",
            "label": "Collins"
        },
        {
            "value": "Zombie Glass",
            "label": "Zombie"
        },
        {
            "value": "Rocks Glass",
            "label": "Rocks"
        },
        {
            "value": "Coupe Glass",
            "label": "Coupe"
        },
        {
            "value": "Martini Glass",
            "label": "Martini"
        },
        {
            "value": "Copper Glass",
            "label": "Copper"
        },
        {
            "value": "Margarita Glass",
            "label": "Margarita"
        },
        {
            "value": "Hurricane Glass",
            "label": "Hurricane"
        },
        {
            "value": "Shot Glass",
            "label": "Shot"
        },

        {
            "value": "Punch Cup",
            "label": "Punch Cup"
        },
        {
            "value": "Julep Cup",
            "label": "Julep Cup"
        },

    ]

    render() {
        return (<div>
            <div className="pt-2 d-flex container" id="search-container">
                <button id="filter" onClick={this.props.toggleFilter}>
                    <BsFilter size={22} /> Filter {this.props.filterBox ? <AiFillCaretUp size={17} /> : <AiFillCaretDown size={17} />}
                </button>
                <div id="search">
                    Search
                </div>
            </div>
            <div 
                className={this.props.filterBox ? "container d-block visible" : "container d-block"} 
                id="filter-box" >
                <div>
                   <div>Alcoholic Type:</div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="alcoholicFilter"
                            value="alcoholic"
                            onChange={this.props.onUpdateField}
                        />
                        <label className="form-check-label">Cocktail</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="alcoholicFilter"
                            value="non-alcoholic"
                            onChange={this.props.onUpdateField}
                        />
                        <label className="form-check-label">Mocktail</label>
                    </div>
                </div>
                <div>
                    <div>Flavour Profiles:</div>
                    <input 
                        type="text" 
                        onChange={this.props.onUpdateField}
                        name="distinctionsFilter"
                        value={this.props.distinctionsFilter    }
                    />
                    <p className="text-muted" style={{"fontSize" : "12px"}}>Please only enter one flavour</p>
                </div>
                <div className="mt-2">
                    Glass Type:
                    <Select
                        options={this.glassTypes}
                        placeholder="Glass Type"
                        defaultValue={null}
                    />
                </div>
                <div className="mt-2">
                    Ingredient:
                    <Select
                        options={this.props.ingredientName}
                        placeholder="Select Ingredient"
                        defaultValue={null}
                    />
                </div>
                <div className="mt-4 d-flex">
                    <div className="me-2">
                        <button onClick={this.props.AiFillCaretDownclearFilter}>Clear Filter</button>
                    </div>
                    <div>
                        <button onClick={this.props.closeFilter}>Search</button>
                    </div>
                </div>

            </div>
        </div>)
    }


}