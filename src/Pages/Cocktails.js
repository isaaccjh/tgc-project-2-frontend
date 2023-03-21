import React from "react";
import CocktailCard from "../Components/CocktailCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";

export default class Cocktails extends React.Component {
    state = {
        posts: []

    }

    loadPosts = async () => {
        const response = await axios.get(`${BASE_API}cocktails`);
        this.setState({
            posts: response.data
        }, () => console.log(this.state.posts));
    }

    componentDidMount = () => {
        try {
            this.loadPosts();
        } catch (e) {
            console.log("Error fetching data:", e.message)
        }
    }

    render() {
        return (<div>
            <CocktailCard />
        </div>)
    }
}