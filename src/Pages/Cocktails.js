import React from "react";
import CocktailCard from "../Components/CocktailCard";
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";
import NewCocktail from "../Components/NewCocktail";
import { validateName, validateGlass, validateAlcoholic, validateURL, validatePreparation } from "../Components/validations"



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
        filter: "Name",
        searchBarText: "Search for a cocktail",
        search: "",

        // FOR VALIDATION
        nameError: "",
        glassTypeError: "",
        alcoholicError: "",
        distinctionError: "",
        preparationError: "",
        imageUrlError: "",
        validated: false
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


    searchPosts = async () => {
        const filter = this.state.filter.toLowerCase();
        const query = this.state.search;

        let finalQuery;
        switch (filter) {
            case "name":
                finalQuery = `name=${query}`
                break;
            case "glass type":
                finalQuery = `glassType=${query}`
                break;
            case "flavour profiles":
                finalQuery = `distinction=${query}`
                break;
            case "drink type":
                finalQuery = `alcoholic=${query}`
                break;
            default:
                finalQuery = null
        }

        const response = await axios.get(`${BASE_API}cocktails?${finalQuery}`);
        this.setState({
            posts: response.data,
            search: ""
        })
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
            }, () => this.loadPosts());

            console.log("Response:", response.data)

        } catch (e) {
            console.log("Error sending data:", e.message)
        };

        this.loadPosts()
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
        }, () => this.loadPosts())

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
        })
    }

    searchFilter = (filterItem) => {
        let text;
        switch (filterItem) {
            case "Name":
                text = "Search for a cocktail";
                break;
            case "Ingredients":
                text = "Search for an ingredient";
                break;
            case "Glass Type":
                text = "Search for a Cocktail Glass";
                break;
            case "Flavour Profiles":
                text = "Search for a flavour profile";
                break;
            case "Drink Type":
                text = "Search for either alcoholic or non-alcoholic";
                break;
            default:
                text = "";
                break;

        }



        this.setState({
            filter: filterItem,
            searchBarText: text
        })
    }

    clearFilter = () => {
        this.loadPosts();
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

    onChooseIngredient = (e) => {
        this.setState({
            selectedIngredient: e.value
        })

        console.log(this.state.ingredientId)
    }

    // NEED TO DISPLAY INGREDIENT USING LIST RENDERING, CREATE FUNCTIONS HERE


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
        console.log("displayIngredient:", displayIngredient)

        this.setState({
            ingredients: [...this.state.ingredients, ingredientToAdd],
            displayIngredients: [...this.state.displayIngredients, displayIngredient]
        }, () => {
            console.log(this.state.ingredients)
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




    render() {
        return (<div>


            <div className="container">
                <SearchBar searchFilter={this.searchFilter}
                    filter={this.state.filter}
                    placeholder={this.state.searchBarText}
                    onUpdateField={this.onUpdateField}
                    search={this.state.search}
                    submitSearch={this.searchPosts}
                    clearFilter={this.clearFilter} />

                <div className="row">
                    <button className="mt-3 btn btn-primary d-inline-block ms-2 w-25 " onClick={this.toggleCocktailForm}>Add New Cocktail</button>
                    <NewCocktail formStatus={this.state.cocktailFormStatus}
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