import React from "react";
import { AiOutlineSearch, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFilter } from "react-icons/bs"
import "../index.css"


import FilterBox from "./FilterBox";

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
            <div className="input-group pt-2">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.props.toggleFilter}
                >
                    <BsFilter /> Filter {this.props.filterState ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </button>

                {/* Search Bar */}

                <input
                    type="text"
                    name="nameFilter"
                    onChange={this.props.onUpdateField}
                    className="form-control" 
                    value={this.props.nameFilter}
                    />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.props.searchPosts}
                    ><AiOutlineSearch /></button>
            </div>
            {this.props.filterState ?
                <FilterBox
                    ingredientName={this.props.ingredientName}
                    clearFilter={this.props.clearFilter}
                    glassTypes={this.glassTypes}
                    flavourProfiles={this.flavourProfiles}
                    filterDistinctions={this.props.filterDistinctions}
                    filterIngredients={this.props.filterIngredients}
                    filterGlassType={this.props.filterGlassType}
                    onUpdateField={this.props.onUpdateField}
                    glassTypeFilter={this.props.glassTypeFilter}
                    alcoholicFilter={this.props.alcoholicFilter}
                    handleGlassTypeChange={this.props.handleGlassTypeChange}
                    glassTypeValue={this.props.glassTypeValue}
                /> : null}
        </div>)
    }


}