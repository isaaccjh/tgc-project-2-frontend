import React from "react";
import CocktailCard from "../Components/CocktailCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default class Cocktails extends React.Component {
    state = {
        posts: [],


    }

    loadPosts = async () => {
        const response = await axios.get()
    }

    render() {
        return (<div>
            <CocktailCard />
        </div>)
    }
}