

const getCards = async () => {
    const response = await axios.get("https://api.clashroyale.com/v1/cards?limit=12&after=12&before=12")
    console.log(response.data);
}

getCards();