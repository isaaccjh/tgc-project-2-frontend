import React from "react";
import { AiOutlineSearch, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFilter } from "react-icons/bs"
import { Form } from "react-bootstrap"
import "../index.css"
import "../css/Searchbar.css"
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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


    state = {
        toggleFilter: ""
    }

    render() {
        return (<div>
            
        </div>)
    }


}