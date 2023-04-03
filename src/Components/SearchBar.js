import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
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

    state = {
        filterBox: this.props.filterBox
    }

    render() {
        return (<div>
            <div className="pt-2 d-flex container" id="search-container">
                <button id="filter" onClick={this.props.toggleFilter}>
                    <BsFilter size={22} /> Filter
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
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="option1"
                        />
                        <label className="form-check-label">Cocktail</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="option2"
                        />
                        <label className="form-check-label">Mocktail</label>
                    </div>
                </div>
                <div>
                    <div>Flavour Profiles:</div>
                    <input type="text" placeholder="" />
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
                        <button>Clear Filter</button>
                    </div>
                    <div>
                        <button onClick={this.props.closeFilter}>Close</button>
                    </div>
                </div>

            </div>
        </div>)
    }


}