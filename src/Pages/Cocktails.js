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
        deleteConfirmation: false,

        // FOR COCKTAIL CREATION:
        userId: "6411699375602770754977c4",
        alcoholic: "",
        distinctions: [""],
        imageUrl: "",
        name: "",
        glassType: "",
        preparation: "",
        addDistinction: "",

        // TO READ COCKTAIL POSTS
        viewImageUrl: "",
        viewName: "",
        viewDistinctions: [],
        viewGlassType: "",
        viewAlcoholic: "",
        viewPreparation: "",

        // TO EDIT COCKTAIL POSTS
        postBeingEdited: "",
        updatedImageUrl: "",
        updatedDistinctions: [],
        updatedGlassType: "",
        updatedAlcoholic: "",
        updatedPreparation: "",
        updatedName: ""

    }

    // READ FUNCTIONS
    loadPosts = async () => {
        const response = await axios.get(`${BASE_API}cocktails`);
        this.setState({
            posts: response.data
        });
    }

    loadUsers = async () => {
        const response = await axios.get(`${BASE_API}users`);
        this.setState({
            users: response.data
        });
    }

    toggleCocktailModal = (postId) => {
        const postToView = this.state.posts.find(post => post._id === postId )

        this.setState({
            activeCocktailModal: postId,
            cocktailModal: true,
            viewImageUrl: postToView.imageUrl,
            viewName: postToView.name,
            viewDistinctions: postToView.distinctions,
            viewGlassType: postToView.glassType,
            viewAlcoholic: postToView.alcoholic,
            viewPreparation: postToView.preparation
        });
    }

    closeCocktailModal = () => {
        this.setState({
            activeCocktailModal: "",
            cocktailModal: false,
            viewImageUrl: "",
            viewName: "",
            viewDistinctions: [],
            viewGlassType: "",
            viewAlcoholic: "",
            viewPreparation: ""
        })
    }

    // DELETE FUNCTIONS

    deletePost = async (post) => {
        try {
            const response = await axios.delete(`${BASE_API}cocktails/delete/${post._id}`);
            console.log("Response:", response)
        } catch (e) {
            console.log("Error", e.message)
        }

        const updatePost = this.state.posts.filter(p => p._id !== post._id);
        this.setState({
            posts: updatePost
        })

        this.setState({
            deleteConfirmation: false
        })
    }

    confirmDelete = () => {
        this.setState({
            deleteConfirmation: true
        })
    }

    cancelDelete = () => {
        this.setState({
            deleteConfirmation: false
        })
    }

    // UPDATE FUNCTIONS 
    beginEdit = (postId) => {
        this.setState({
            postBeingEdited: postId
        })
    }

    cancelEdit = () => {
        this.setState({
            postBeingEdited: ""
        })
    }

    confirmEdit = async (post) => {

    }


    //  CREATE FUNCTIONS
    toggleCocktailForm = () => {
        this.setState({
            cocktailFormStatus: true
        });
    }

    closeCocktailForm = () => {
        this.setState({
            cocktailFormStatus: false,
            distinctions: [""]
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

    onUpdateField = e => this.setState({ [e.target.name]: e.target.value });

    addDistinction = (e) => {
        if (this.state.distinctions[0] === "") {
            const arr = this.state.distinctions
            arr[0] = this.state.addDistinction
            this.setState({
                distinctions: [this.state.addDistinction, ""]
            })
        }

        if (!(this.state.distinctions.includes(this.state.addDistinction))) {

            const arr = this.state.distinctions.slice(0, -1);
            const newArr = [...arr, this.state.addDistinction, ""]


            this.setState({
                distinctions: newArr
            }, ()=> console.log("distinctions:", this.state.distinctions))
        }

    }

    render() {
        return (<div>

            <div className="container">
                <div className="row">
                    <button className="mt-3 mx-auto" onClick={this.toggleCocktailForm}>Add New Cocktail</button>
                    <NewCocktail formStatus={this.state.cocktailFormStatus}
                        closeForm={this.closeCocktailForm}
                        onUpdateField={this.onUpdateField}
                        submitForm={this.submitCocktailForm}
                        updateFlavour={this.onUpdateFlavour}
                        addDistinction={this.addDistinction}
                        distinctions={this.state.distinctions}
                    />
                    <div className="row">
                        {this.state.posts.map(post => (
                            <div className="col-sm-12 col-md-6 col-lg-4 mt-3" key={post._id}>
                                <CocktailCard 
                                    // READ ALL COCKTAIL POSTS
                                    name={post.name}
                                    imageUrl={post.imageUrl}
                                    user={this.state.users.find(user => user._id === post.userId)}
                                    cocktailModalStatus={this.state.cocktailModal}
                                    cocktailModalId={this.state.activeCocktailModal}
                                    // READ SINGLE COCKTAIL POST
                                    toggleCocktailModal={() => this.toggleCocktailModal(post._id)}
                                    closeCocktailModal={this.closeCocktailModal}
                                    viewGlassType={this.state.viewGlassType}
                                    viewAlcoholic={this.state.viewAlcoholic}
                                    viewImageUrl={this.state.viewImageUrl}
                                    viewDistinctions={this.state.viewDistinctions}
                                    viewName={this.state.viewName}
                                    viewPreparation={this.state.viewPreparation}
                                    //UPDATE COCKTAIL POST
                                     updatedName={this.state.updatedName}
                                     updatedImageUrl={this.state.updatedImageUrl}
                                     updatedAlcoholic={this.state.updatedAlcoholic}
                                     updatedDistinctions={this.state.updatedDistinctions}
                                     updatedGlassType={this.state.updatedGlassType}
                                     updatedPreparation={this.state.updatedPreparation}
                                    // FUNCTIONS
                                    onUpdateField={this.onUpdateField}
                                    deletePost={() => this.deletePost(post)}
                                    deleteConfirmation={this.confirmDelete}
                                    cancelDelete={this.cancelDelete}
                                    delete={this.state.deleteConfirmation}
                                    postBeingEdited={this.state.postBeingEdited}
                                    beginEdit={()=> this.beginEdit(post._id)}
                                    cancelEdit={this.cancelEdit}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>)
    }
}