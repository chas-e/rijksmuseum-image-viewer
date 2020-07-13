// API URL w my key: https://www.rijksmuseum.nl/api/nl/collection?key=fk8HjIgd&involvedMaker=Rembrandt+van+Rijn

// Constants
const $usrInputEl = $("#input-junk");
const baseURL = `https://www.rijksmuseum.nl/api/nl/collection?key=${config.RIJKS_API_KEY}&involvedMaker=${$usrInputEl}&p=1`;


// App's State Variables
let artWork, input, artDetails, artist;


// Cached Element References
const $tableEl = $(".collection");
const $artTableEl = $("#art-table");
const $imgEl = $("#image-content");
const $subBtn = $("#submit");



// Event Listeners
$subBtn.on('click', handleClick);

// Functions

function handleClick(event) {
    getArt();
}

// fetch data from Rijksmuseum



getArt();

function getArt() {
    const url = baseURL;
    $.ajax(url)
        .then(function(data) {
                console.log(data);
                artWork = data;
                render();


            },

            function(error) {
                console.log("error:", error);
            });

}

function generateHTML() {
    return artWork.map(function(tr) {
        return `<tr>
        <td>${tr.artObjects[idx].title}</td>
        <td>${tr.artObjects[idx].principalOrFirstMaker}</td>
        <td><img class="responsive.img" src="url(${tr.artObjects[idx].webImage.url})</td>
    </tr>`;
    });
}

function render() {
    const html = generateHTML().join('');
    $tableEl.html(html);
}