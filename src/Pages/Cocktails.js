import React from "react";
import CocktailCard from "../Components/CocktailCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";
import NewCocktail from "../Components/NewCocktail";

export default class Cocktails extends React.Component {
    state = {
        posts: [],
        users: [],
        cocktailModal: false,
        activeCocktailModal: "",
        cocktailFormStatus: false,

        // FOR COCKTAIL CREATION:
        userId: "6411699375602770754977c4",
        alcoholic: "",
        distinctions: [],
        imageUrl: "",
        name: "",
        glassType: "",
        preparation: "",
    }

    // READ FUNCTIONS
    loadPosts = async () => {
        const response = await axios.get(`${BASE_API}cocktails`);
        this.setState({
            posts: response.data
        }, () => console.log("Posts:", this.state.posts));
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


    //  CREATE FUNCTIONS
    toggleCocktailForm = () => {
        this.setState({
            cocktailFormStatus: true
        });
    }

    closeCocktailForm = () => {
        this.setState({
            cocktailFormStatus: false
        })
    }

    submitCocktailForm = async () => {
        try {
            const response = await axios.post(`${BASE_API}cocktails/new-post`, {
                userId: this.state.userId,
                alcoholic: this.state.alcoholic,
                distinctions: this.state.distinctions,
                glassType: this.state.glassType,
                imageUrl: this.state.imageUrl,
                name: this.state.name,
                preparation: this.state.preparation
            })

            console.log("Response:", response.data)

        } catch (e) {
            console.log("Error sending data:", e.message)
        };

        this.setState({
            alcoholic: "",
            distinctions: [],
            imageUrl: "",
            name: "",
            glassType: "",
            preparation: "",
            cocktailFormStatus: false
        });


        this.loadPosts();
    }

    componentDidMount = () => {
        try {
            this.loadPosts();
            this.loadUsers()
        } catch (e) {
            console.log("Error fetching data:", e.message)
        }
    }

    onUpdateField = e => this.setState({ [e.target.name]: e.target.value});

    render() {
        return (<div>

            <div className="container">
                <div className="row">
                    <button className="mt-3 mx-auto" onClick={this.toggleCocktailForm}>Add New Cocktail</button>
                    <NewCocktail formStatus={this.state.cocktailFormStatus}
                                 closeForm={this.closeCocktailForm}
                                 onUpdateField={this.onUpdateField}
                                 submitForm={this.submitCocktailForm}
                                  />
                    <div className="row">
                        {this.state.posts.map(post => (
                            <div className="col-sm-12 col-md-6 col-lg-4 mt-3" key={post._id}>
                                <CocktailCard name={post.name}
                                    imageUrl={post.imageUrl}
                                    user={this.state.users.find(user => user._id === post.userId)}
                                    cocktailModalStatus={this.state.cocktailModal}
                                    cocktailModalId={this.state.activeCocktailModal}
                                    toggleCocktailModal={() => this.toggleCocktailModal(post._id)}
                                    closeCocktailModal={this.closeCocktailModal}
                                     />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>)
    }
}