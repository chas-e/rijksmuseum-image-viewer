// API URL w my key: https://www.rijksmuseum.nl/api/nl/collection?key=fk8HjIgd&involvedMaker=Rembrandt+van+Rijn

// Constants
const baseURL = `https://www.rijksmuseum.nl/api/nl/collection?key=${config.Rijksmuseum_API_Key}&involvedMaker=Rembrandt+van+Rijn`;


// App's State Variables
let artWork, input, artDetails


// Cached Element References
const $ulEl = $


// Event Listeners


// Functions

// fetch data from Rijksmuseum

function getArt() {
    const url = baseURL;
    $.ajax(url)
        .then(function(data) {

        })

}