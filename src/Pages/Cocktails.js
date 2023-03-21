import React from "react";
import CocktailCard from "../Components/CocktailCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";

export default class Cocktails extends React.Component {
    state = {
        posts: [],
        users: [],
        cocktailModal: false,
        activeCocktailModal: ""

    }
     
    // READ FUNCTIONS
    loadPosts = async () => {
        const response = await axios.get(`${BASE_API}cocktails`);
        this.setState({
            posts: response.data
        }, () => console.log("Posts:",this.state.posts));
    }

    loadUsers = async () => {
        const response = await axios.get(`${BASE_API}users`);
        this.setState({
            users: response.data
        }, () => console.log("Users:", this.state.users));
    }

    toggleCocktailModal = (postId) => {
        this.setState({
            activeCocktailModal: postId,
            cocktailModal: true
        })
    }

    closeCocktailModal = () => {
        this.setState({
            activeCocktailModal: "",
            cocktailModal: false
        })
    }

    componentDidMount = () => {
        try {
            this.loadPosts();
            this.loadUsers()
        } catch (e) {
            console.log("Error fetching data:", e.message)
        }
    }

    render() {
        return (<div>
            <button className="mt-3 mx-auto">Add New Cocktail</button>
            <div className="container">
                <div className="row">
                        {this.state.posts.map(post => (
                            <div className="col-sm-12 col-md-6 col-lg-4 mt-3" key={post._id}>
                                <CocktailCard name={post.name}
                                              imageUrl={post.imageUrl}
                                              user={this.state.users.find(user => user._id === post.userId)}  
                                              cocktailModalStatus={this.state.cocktailModal}
                                              cocktailModalId={this.state.activeCocktailModal}
                                              toggleCocktailModal={() => this.toggleCocktailModal(post._id)}
                                              closeCocktailModal={this.closeCocktailModal}/>
                                            
                            </div>
                        ))}
                </div>
            </div>
            </div>)
    }
}