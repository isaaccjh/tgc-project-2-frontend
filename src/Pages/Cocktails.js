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
        updatedName: "",

        // TO DELETE COCKTAIL POST
        postToDelete: ""

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
        const postToView = this.state.posts.find(post => post._id === postId)

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

    deletePost = async () => {
        try {
            const response = await axios.delete(`${BASE_API}cocktails/delete/${this.state.postToDelete}`);
            console.log("Response:", response)
        } catch (e) {
            console.log("Error", e.message)
        }

        const updatePost = this.state.posts.filter(p => p._id !== this.state.postToDelete);
        this.setState({
            posts: updatePost
        })

        this.setState({
            deleteConfirmation: false
        })

        console.log(this.state.postToDelete);

    }

    confirmDelete = (postId) => {
        this.setState({
            deleteConfirmation: true,
            postToDelete: postId
        })

        console.log(postId);
    }

    cancelDelete = () => {
        this.setState({
            deleteConfirmation: false
        })

    }

    deleteFlavourDistinction = i => {
        const arr = this.state.distinctions.filter(distinction => distinction !== this.state.distinctions[i])
        this.setState({
            distinctions: arr
        })
    }

    // UPDATE FUNCTIONS 
    beginEdit = (postId) => {
        this.setState({
            postBeingEdited: postId,
            viewDistinctions: [...this.state.viewDistinctions, ""]
        }, () => console.log("begin edit:", this.state.viewDistinctions));

        console.log(postId)
    }

    cancelEdit = () => {
        const original = this.state.viewDistinctions.slice(0, -1)

        this.setState({
            postBeingEdited: "",
            viewDistinctions: original
        }, console.log("cancel edit:", original))
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

        const filteredArray = this.state.distinctions.filter(distinction => distinction !== "")
        console.log(filteredArray);
        console.log(this.state.addDistinction);
        console.log([...filteredArray, this.state.addDistinction])
        if (this.state.addDistinction !== "") {
            const newArr = [...filteredArray, this.state.addDistinction]
            this.setState({
                distinctions: newArr
            }, async () => {

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
                    distinctions: [""],
                    imageUrl: "",
                    name: "",
                    glassType: "",
                    preparation: "",
                    cocktailFormStatus: false,
                    addDistinction: ""
                });


                this.loadPosts();
            })
        }



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
        const filteredArray = this.state.distinctions.filter(distinction => distinction !== "")

        if (!this.state.distinctions.includes(this.state.addDistinction)) {
            this.setState({
                distinctions: [...filteredArray, this.state.addDistinction, ""],
                addDistinction: ""
            })
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
                        deleteFlavour={this.deleteFlavourDistinction}
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
                                    deletePost={() => this.deletePost(post._id)}
                                    deleteConfirmation={() => this.confirmDelete(post._id)}
                                    cancelDelete={this.cancelDelete}
                                    delete={this.state.deleteConfirmation}
                                    postBeingEdited={this.state.postBeingEdited}
                                    beginEdit={() => this.beginEdit(post._id)}
                                    cancelEdit={this.cancelEdit}
                                    deleteFlavour={this.deleteFlavourDistinction}
                                    addDistinction={this.addDistinction}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>)
    }
}