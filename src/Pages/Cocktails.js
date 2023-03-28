import React from "react";
import CocktailCard from "../Components/CocktailCard";
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BASE_API from "../Components/BASE_API";
import NewCocktail from "../Components/NewCocktail";
import { validateName, validateSelect, validateURL } from "../Components/validations"



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
        imageUrlError: ""
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
            default: 
                finalQuery = null
        }
        
        const response = await axios.get(`${BASE_API}cocktails?${finalQuery}`);
        console.log(response.data)
        console.log(filter)
        console.log("query:", query)
        console.log("final query:", finalQuery);

        this.setState({
            posts: response.data
        })
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

    deleteViewFlavourDistinction = i => {
        const arr = this.state.updatedDistinctions.filter(distinction => distinction !== i)
        console.log(`delete view flavour distinction. current arr: ${arr}`)
        this.setState({
            updatedDistinctions: arr
        }, () => console.log("updatedState:", this.state.updatedDistinctions))

        console.log(arr)
        console.log(i);
        console.log("reached end")
    }


    // UPDATE FUNCTIONS 
    beginEdit = (postId) => {
        this.setState({
            postBeingEdited: postId,
            updatedDistinctions: [...this.state.viewDistinctions],
            updatedPreparation: this.state.viewPreparation,
            updatedAlcoholic: this.state.viewAlcoholic,
            updatedName: this.state.viewName,
            updatedGlassType: this.state.viewGlassType,
            updatedImageUrl: this.state.viewImageUrl
        }, () => console.log("begin edit:", this.state.viewDistinctions));


        console.log("begin edit:", this.state.viewDistinctions)
        console.log(postId)
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
        const filteredArray = this.state.updatedDistinctions.filter(distinction => distinction !== "")

        if (this.state.addDistinction !== "") {

            const newArr = [...filteredArray, this.state.addDistinction]
            this.setState({
                updatedDistinctions: newArr
            }, async () => {
                console.log("new modal:", this.state.updatedDistinctions)
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
                    })

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
            })
        } else {
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
                })

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


        }
        console.log("Hello")
        this.loadPosts()
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
            alcoholic: "",
            distinctions: [""],
            imageUrl: "",
            name: "",
            glassType: "",
            preparation: "",
            addDistinction: "",
        })
    }

    submitCocktailForm = async () => {

        

        const filteredArray = this.state.distinctions.filter(distinction => distinction !== "")

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
                }, () => this.loadPosts());



            })
        } else {
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
            }, () => this.loadPosts());
        }
        console.log("Hello")


    }

    componentDidMount = () => {
        try {
            this.loadPosts();
            this.loadUsers();
        } catch (e) {
            console.log("Error fetching data:", e.message)
        }
    }

    onUpdateField = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (e.target.name === "name") {
                this.validateName();
            }
        })
    }

    validateName = () => {
        const e = validateName(this.state.name);
        this.setState({
            nameError: e
        })
    }

    updateFlavour = (e, index) => {
        let arr = [...this.state.updatedDistinctions]
        arr[index] = e.target.value

        this.setState({
            updatedDistinctions: arr
        }
        )
    }

    addDistinction = () => {
        const filteredArray = this.state.distinctions.filter(distinction => distinction !== "")

        if (!this.state.distinctions.includes(this.state.addDistinction)) {
            this.setState({
                distinctions: [...filteredArray, this.state.addDistinction, ""],
                addDistinction: ""
            })
        }
    }

    addToUpdatedDistinction = () => {
        const filteredArray = this.state.updatedDistinctions.filter(x => x !== "")
        console.log("1 step after filter:", filteredArray)

        if (!this.state.updatedDistinctions.includes(this.state.addDistinction) && !(this.state.addDistinction)) {
            this.setState({
                updatedDistinctions: [...filteredArray, this.state.addDistinction],
                addDistinction: ""
            }, () => console.log(this.state.updatedDistinctions))
        } else {
            this.setState({
                updatedDistinctions: [...filteredArray, this.state.addDistinction],
                addDistinction: ""
            }, () => console.log("hello"))
        }
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

    
    // HANDLE VALIDATION
    validateSubmit = e => {
        e.preventDefault();

        const nameError = validateName(this.state.name)
        if (this.state.name) {
            this.setState({
                nameError: nameError
            })
        } else {
            this.setState({
                nameError: ""
            })
        }
        console.log("called here")
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
                       clearFilter={this.clearFilter}/>
                       
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