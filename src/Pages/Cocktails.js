import React from "react";
import CocktailCard from "../Components/CocktailCard";
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";
import NewCocktail from "../Components/NewCocktail";
import { validateName, validateGlass, validateAlcoholic, validateURL, validatePreparation, validateIngredient, validateAddIngredient, validateAddMeasurement } from "../Components/validations"
import "../index.css"


export default class Cocktails extends React.Component {
    state = {
        posts: [],
        allPosts: [],
        users: [],
        cocktailModal: false,
        activeCocktailModal: "",
        cocktailFormStatus: false,
        deleteConfirmation: false,

        // FOR COCKTAIL CREATION:
        userId: "6411699375602770754977c4",
        alcoholic: "",
        distinctions: [],
        imageUrl: "",
        name: "",
        glassType: "",
        preparation: "",
        ingredients: [],


        // FOR CLEANING UP INGREDIENT
        ingredientId: [],
        ingredientName: [],
        selectedIngredient: "",
        displayIngredients: [],
        measurements: "",
        ingredientsUsed: [],

        // TO READ COCKTAIL POSTS
        viewImageUrl: "",
        viewName: "",
        viewDistinctions: [],
        viewGlassType: "",
        viewAlcoholic: "",
        viewPreparation: "",
        viewIngredients: [],

        // TO EDIT COCKTAIL POSTS
        postBeingEdited: "",
        updatedImageUrl: "",
        updatedDistinctions: [],
        updatedGlassType: "",
        updatedAlcoholic: "",
        updatedPreparation: "",
        updatedName: "",

        // TO DELETE COCKTAIL POST
        postToDelete: "",

        // FOR SEARCH
        glassTypeFilter: "None",
        alcoholicFilter: "",
        distinctionsFilter: "",
        ingredientsFilter: [],
        nameFilter: "",
        filterState: false,
        glassTypeValue: {},

        // FOR VALIDATION
        nameError: "",
        glassTypeError: "",
        alcoholicError: "",
        distinctionError: "",
        preparationError: "",
        imageUrlError: "",
        ingredientError: "",
        addMeasurementError: "",
        validated: false
    }

    // READ FUNCTIONS
    loadPosts = async () => {
        const response = await axios.get(`${BASE_API}cocktails`);
        this.setState({
            posts: response.data,
            allPosts: response.data
        }, () => console.log(this.state.posts));
    }

    loadUsers = async () => {
        const response = await axios.get(`${BASE_API}users`);
        this.setState({
            users: response.data
        });
    }

    loadIngredients = async () => {
        const response = await axios.get(`${BASE_API}cocktails/ingredients`);
        const cleanedIngredientList = response.data.map(i => {
            return { value: i.name, label: i.name }
        })
        this.setState({
            ingredientName: cleanedIngredientList,
            ingredientId: response.data
        })
    }

    loadIngredientsUsed = async () => {
        const response = await axios.get(`${BASE_API}cocktails/ingredients-used`);

        this.setState({
            ingredientsUsed: response.data
        })
    }

    loadAll = () => {
        this.loadIngredientsUsed();
        this.loadPosts();
        this.loadUsers();
    }




    toggleCocktailModal = (postId) => {
        const postToView = this.state.posts.find(post => post._id === postId)

        const postIngredients = this.state.ingredientsUsed.find(post => post.cocktailId === postId)

        const ingredientArr = []
        postIngredients.ingredients.forEach(x => {
            // console.log(x.ingredientId.$oid)
            const ingredientName = this.state.ingredientId.find(ingredient => ingredient._id === x.ingredientId.$oid)
            ingredientArr.push({
                "name": ingredientName.name,
                "measurements": x.measurements
            })
        })

        this.setState({
            activeCocktailModal: postId,
            cocktailModal: true,
            viewImageUrl: postToView.imageUrl,
            viewName: postToView.name,
            viewDistinctions: postToView.distinctions,
            viewGlassType: postToView.glassType,
            viewAlcoholic: postToView.alcoholic,
            viewPreparation: postToView.preparation,
            viewIngredients: ingredientArr
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

    // UPDATE FUNCTIONS 
    beginEdit = (postId) => {
        this.setState({
            postBeingEdited: postId,
            updatedDistinctions: this.state.viewDistinctions.map(x => {
                return {
                    value: x,
                    label: x
                }
            }),
            updatedPreparation: this.state.viewPreparation,
            updatedAlcoholic: this.state.viewAlcoholic,
            updatedName: this.state.viewName,
            updatedGlassType: this.state.viewGlassType,
            updatedImageUrl: this.state.viewImageUrl
        });
    }

    cancelEdit = () => {
        this.setState({
            postBeingEdited: "",
            updatedImageUrl: "",
            updatedDistinctions: [],
            updatedGlassType: "",
            updatedAlcoholic: "",
            updatedPreparation: "",
            updatedName: ""
        })
    }

    confirmEdit = async () => {
        this.updateDistinctionsFormat();

        try {
            const response = await axios.put(`${BASE_API}cocktails/edit/${this.state.activeCocktailModal}`, {
                userId: this.state.userId,
                alcoholic: this.state.updatedAlcoholic,
                distinctions: this.state.updatedDistinctions,
                glassType: this.state.updatedGlassType,
                imageUrl: this.state.updatedImageUrl,
                name: this.state.updatedName,
                preparation: this.state.updatedPreparation,
                dateAdded: new Date(),
                liked: 0,
                saved: 0
            }, () => console.log(this.state.distinctions))

            this.setState({
                activeCocktailModal: "",
                cocktailModal: false,
                postBeingEdited: "",
                updatedImageUrl: "",
                updatedDistinctions: [],
                updatedGlassType: "",
                updatedAlcoholic: "",
                updatedPreparation: "",
                updatedName: "",
            }, () => this.loadAll());

            console.log("Response:", response.data)

        } catch (e) {
            console.log("Error sending data:", e.message)
        };

        this.loadAll()
    };





    //  CREATE FUNCTIONS
    toggleCocktailForm = () => {
        this.setState({
            cocktailFormStatus: true
        });
    }

    closeCocktailForm = () => {
        this.setState({
            cocktailFormStatus: false,
            alcoholic: "",
            distinctions: [""],
            imageUrl: "",
            name: "",
            glassType: "",
            preparation: "",
            addDistinction: "",
        })
    }

    submitCocktailForm = async (e) => {
        e.preventDefault();

        if (this.state.nameError ||
            this.state.glassTypeError ||
            this.state.distinctionError ||
            this.state.imageUrlError ||
            this.state.preparationError ||
            this.state.alcoholicError) {
            return;
        }

        this.updateDistinctionsFormat();

        try {
            const response = await axios.post(`${BASE_API}cocktails/new-post`, {
                userId: this.state.userId,
                alcoholic: this.state.alcoholic,
                distinctions: this.state.distinctions,
                glassType: this.state.glassType,
                imageUrl: this.state.imageUrl,
                name: this.state.name,
                preparation: this.state.preparation,
                ingredients: this.state.ingredients
            })

            console.log("Response:", response.data)

        } catch (e) {
            console.log("Error sending data:", e.message)
        }

        this.setState({
            alcoholic: "",
            distinctions: [],
            imageUrl: "",
            name: "",
            glassType: "",
            preparation: "",
            ingredients: [],
            cocktailFormStatus: false
        }, () => {
            this.loadAll()
        })

    }

    componentDidMount = () => {
        try {
            this.loadPosts();
            this.loadUsers();
            this.loadIngredients();
            this.loadIngredientsUsed();
        } catch (e) {
            console.log("Error fetching data:", e.message)
        }
    }

    onUpdateField = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (e.target.name === "name" || e.target.name === "updatedName") {
                this.validateName(this.state[e.target.name]);
            }

            if (e.target.name === "glassType" || e.target.name === "updatedGlassType") {
                this.validateGlass(this.state[e.target.name]);
            }

            if (e.target.name === "alcoholic" || e.target.name === "updatedAlcoholic") {
                this.validateAlcoholic(this.state[e.target.name]);
            }

            if (e.target.name === "preparation" || e.target.name === "updatedPreparation") {
                this.validatePreparation(this.state[e.target.name]);
            }

            if (e.target.name === "imageUrl" || e.target.name === "updatedImageUrl") {
                this.validateURL(this.state[e.target.name]);
            }

            if (e.target.name === "measurements" || e.target.name === "updatedMeasurements") {
                this.validateAddMeasurement(this.state.measurements);
            }
        })
    }


    createDistinctions = (e) => {
        this.setState({
            distinctions: e.map(x => x.value)
        })
    }

    updateDistinctions = (e) => {
        this.setState({
            updatedDistinctions: e.map(x => x.value)
        })
    }

    filterDistinctions = e => {
        this.setState({
            distinctionsFilter: e.map(x => x.value)
        })
    }

    filterIngredients = e => {
        this.setState({
            ingredientsFilter: e.map(e => e.value)
        })
    }

    filterGlassType = e => {
        if (e) {
            this.setState({
                glassTypeFilter: e.value,
                glassTypeValue: {
                    "value": e.value,
                    "label": e.value
                }
            })
        } else {
            this.setState({
                glassTypeFilter: ""
            })
        }
    }

    onChooseIngredient = (e) => {
        this.setState({
            selectedIngredient: e.value
        })
    }


    // NEED TO DISPLAY INGREDIENT USING LIST RENDERING, CREATE FUNCTIONS HERE

    searchPosts = () => {
        let filteredPost = this.state.allPosts

        if (this.state.nameFilter) {
            const regex = new RegExp(this.state.nameFilter, "i")
            filteredPost = filteredPost.filter(post => regex.test(post.name))
        }

        if (this.state.alcoholicFilter) {
            filteredPost = filteredPost.filter(post => post.alcoholic === this.state.alcoholicFilter)
        }

        if (this.state.glassTypeFilter) {
            filteredPost = filteredPost.filter(post => post.glassType === this.state.glassTypeFilter)
        }

        if (this.state.ingredientsFilter) {
            const searchedIngredientId = this.state.ingredientsFilter.map(filter => {
                return (
                    this.state.ingredientId.find(ingredient => ingredient.name === filter)._id
                )
            })

            console.log(this.state.ingredientsUsed)
            

        }



        this.setState({
            posts: filteredPost
        } )
        console.log("filteredPost:", filteredPost);

    }

    addIngredient = (e) => {

        if (!this.state.selectedIngredient || !this.state.measurements) {
            return;
        }


        const newIngredient = this.state.ingredientId.find(i => i.name === this.state.selectedIngredient)

        const ingredientToAdd = {
            "ingredientId": { "$oid": `${newIngredient._id}` },
            "measurements": `${this.state.measurements}`
        }

        const displayIngredient = {
            name: newIngredient.name,
            measurement: this.state.measurements
        }

        this.setState({
            ingredients: [...this.state.ingredients, ingredientToAdd],
            displayIngredients: [...this.state.displayIngredients, displayIngredient]
        }, () => {
            this.setState({
                selectedIngredient: "",
                measurements: ""
            })
        })
    }

    updateDistinctionsFormat = () => {
        this.setState({
            updatedDistinctions: this.state.updatedDistinctions.map(x => x.value)
        })
    }

    clearFilter = () => {
        this.setState({
            glassTypeFilter: "None",
            distinctionsFilter: "",
            ingredientsFilter: [],
            alcoholicFilter: "",
            nameFilter: "",
            posts: this.state.allPosts
        })
    }

    toggleFilter = () => {
        this.setState({
            filterState: !this.state.filterState,
            alcoholicFilter: "",
            glassTypeFilter: "",
            ingredientsFilter: [],
            distinctionsFilter: ""
        })
    }


    // HANDLE VALIDATION

    validateName = (name) => {
        const e = validateName(name);
        this.setState({
            nameError: e
        })
    }

    validateGlass = (glassType) => {
        const e = validateGlass(glassType);
        this.setState({
            glassTypeError: e
        })
    }

    validateAlcoholic = (alcoholic) => {
        const e = validateAlcoholic(alcoholic);
        this.setState({
            alcoholicError: e
        })
    }

    validatePreparation = (preparation) => {
        const e = validatePreparation(preparation);
        this.setState({
            preparationError: e
        })
    }

    validateURL = (url) => {
        const e = validateURL(url);
        this.setState({
            imageUrlError: e
        })
    }

    validateIngredient = (i) => {
        const e = validateIngredient(i);
        this.setState({
            ingredientError: e
        })
    }


    validateAddMeasurement = m => {
        const e = validateAddMeasurement(m);
        this.setState({
            addMeasurementError: e
        })
    }



    render() {
        return (<div className="main-color">


            <div className="container" >
                <div>
                    <SearchBar
                        searchFilter={this.searchFilter}
                        filter={this.state.filter}
                        placeholder={this.state.searchBarText}
                        onUpdateField={this.onUpdateField}
                        search={this.state.search}
                        clearFilter={this.clearFilter}
                        alcoholicFilter={this.state.alcoholicFilter}
                        glassTypeFilter={this.state.glassTypeFilter}
                        distinctionsFilter={this.state.distinctionsFilter}
                        handleDropdownFilter={this.handleDropdownFilter}
                        ingredientName={this.state.ingredientName}
                        filterDistinctions={this.filterDistinctions}
                        filterIngredients={this.filterIngredients}
                        filterGlassType={this.filterGlassType}
                        filterState={this.state.filterState}
                        toggleFilter={this.toggleFilter}
                        searchPosts={this.searchPosts}
                        nameFilter={this.state.nameFilter}
                    />
                </div>
                <div className="row">
                    <button className="mt-3 btn btn-primary d-inline-block ms-2 w-25 rounded-pill addNew " onClick={this.toggleCocktailForm}>+</button>
                    <NewCocktail
                        glassType={this.state.glassType}
                        formStatus={this.state.cocktailFormStatus}
                        closeForm={this.closeCocktailForm}
                        onUpdateField={this.onUpdateField}
                        submitForm={this.submitCocktailForm}
                        updateFlavour={this.onUpdateFlavour}
                        addDistinction={this.addDistinction}
                        distinctions={this.state.distinctions}
                        deleteFlavour={this.deleteFlavourDistinction}
                        validateSubmit={this.validateSubmit}
                        nameError={this.state.nameError}
                        glassTypeError={this.state.glassTypeError}
                        alcoholicError={this.state.alcoholicError}
                        preparationError={this.state.preparationError}
                        imageUrlError={this.state.imageUrlError}
                        distinctionError={this.state.distinctionError}
                        ingredientError={this.state.ingredientError}
                        addMeasurementError={this.state.addMeasurementError}
                        createDistinctions={this.createDistinctions}
                        ingredientName={this.state.ingredientName}
                        measurements={this.state.measurements}
                        onChooseIngredient={this.onChooseIngredient}
                        addIngredient={this.addIngredient}
                        displayIngredients={this.state.displayIngredients}
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
                                    viewIngredients={this.state.viewIngredients}
                                    //UPDATE COCKTAIL POST
                                    updatedName={this.state.updatedName}
                                    updatedImageUrl={this.state.updatedImageUrl}
                                    updatedAlcoholic={this.state.updatedAlcoholic}
                                    updatedDistinctions={this.state.updatedDistinctions}
                                    updatedGlassType={this.state.updatedGlassType}
                                    updatedPreparation={this.state.updatedPreparation}
                                    updateDistinctions={this.updateDistinctions}
                                    nameError={this.state.nameError}
                                    glassTypeError={this.state.glassTypeError}
                                    alcoholicError={this.state.alcoholicError}
                                    preparationError={this.state.preparationError}
                                    imageUrlError={this.state.imageUrlError}
                                    distinctionError={this.state.distinctionError}
                                    createDistinctions={this.createDistinctions}
                                    // FUNCTIONS
                                    onUpdateField={this.onUpdateField}
                                    deletePost={() => this.deletePost(post._id)}
                                    deleteConfirmation={() => this.confirmDelete(post._id)}
                                    cancelDelete={this.cancelDelete}
                                    delete={this.state.deleteConfirmation}
                                    postBeingEdited={this.state.postBeingEdited}
                                    beginEdit={() => this.beginEdit(post._id)}
                                    cancelEdit={this.cancelEdit}
                                    deleteFlavour={this.deleteViewFlavourDistinction}
                                    addDistinction={this.addToUpdatedDistinction}
                                    updateFlavour={this.updateFlavour}
                                    confirmEdit={this.confirmEdit}
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>)
    }
}