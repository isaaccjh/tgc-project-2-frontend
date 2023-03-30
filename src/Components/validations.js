export const validateName = (x) => {

    if (!x) {
        return "Please enter a name between 4 and 30 characters.";
    }

    if (x.length > 30) {
        return "Please enter a name that is shorter than 30 characters.";
    }

    if (x.length < 4) {
        return "Please enter a name that is longer than 4 characters.";
    }

    return "";
}

export const validateGlass = x => {
    if (!x || x === "Glass Type") {
        return "Please select a type of glass.";
    } else {
        return "";
    }

};

export const validateAlcoholic = x => {
    if (!x || x === "Drink Type") {
        return "Please select the type of drink.";
    } else {
        return "";
    }
}

export const validateURL = x => {
    if (!x) {
        return "Please enter an image URL."
    }

    if (!x.includes(":")) {
        return "Please enter a valid image URL."
    }

    return "";
}

export const validatePreparation = x => {
    if (!x) {
        return "Please provide preparation instructions."
    }

    if (x.length < 10) {
        return "Please provide instructions more than 10 characters."
    }

    return "";
}



