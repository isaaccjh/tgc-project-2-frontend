import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import "../css/Searchbar.css"

export default function FilterBox(props) {
    return (<div>
        <div id="filterContainer" className="p-3 mt-1 border rounded">
            <strong style={{ "textDecoration": "underline", "fontSize": "1.1rem" }}>Filters</strong>
            <div className="mt-2">
                Alcoholic Type:
                <div className="form-check form-check-inline ms-3">
                    <input className="form-check-input" type="radio" name="alcoholicFilter" value="alcoholic" onChange={props.onUpdateField}/>
                    <label className="form-check-label">Cocktail</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="alcoholicFilter" value="non-alcoholic" onChange={props.onUpdateField}/>
                    <label className="form-check-label" >Mocktail</label>
                </div>
            </div>
            <div className="mt-2">
                Glass Types:
                <Select
                    isClearable
                    options={props.glassTypes}
                    defaultValue={props.glassTypeFilter}
                    onChange={props.filterGlassType}
                />
            </div>
            <div className="mt-2">
                Ingredients:
                <Select
                    isMulti
                    options={props.ingredientName}
                    defaultValue={null}
                    onChange={props.filterIngredients}
                />
            </div>
            <div className="mt-2">
                Flavour Profiles:
                <CreatableSelect
                    isMulti
                    options={props.flavourProfiles}
                    onChange={props.filterDistinctions}
                />
            </div>
            <button className="btn btn-secondary mt-2 btn-sm" onClick={props.clearFilter}>Clear</button>
        </div>
    </div>)
}