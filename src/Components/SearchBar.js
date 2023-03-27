import React from "react";
import { AiOutlineSearch } from "react-icons/ai"

export default function SearchBar() {
    return (<form className="form-light col-12 col-lg-5 mt-2 d-flex w-100 mx-auto">
        <div className="input-group input-group-inline">
            <span className="input-group-text pe-3">
                <AiOutlineSearch />
            </span>
            <input type="email" className="form-control" placeholder="Search for a cocktail..." aria-label="Search" aria-describedby="" />
        </div>
    </form>)
}