export const validateName = (x) => {

    if (!x) {
        return "Please enter a name between 4 and 30 characters.";
    }

    if (x.length > 30) {
        return "Please enter a name that is shorter than 30 characters";
    }

    if (x.length < 4) {
        return "Please enter a name that is longer than 4 characters";
    }
    
    return "";
}

export const validateSelect = x => {
    if (!x) {
        return "Please choose one options."
    }
}

export const validateURL = x => {

    if (!x.includes(":")) { 
        return "Please enter a valid image URL."
    }

    
}

export const validateFlavours = x => {

}

