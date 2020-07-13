// API URL w my key: https://www.rijksmuseum.nl/api/nl/collection?key=fk8HjIgd&involvedMaker=Rembrandt+van+Rijn

// Constants
const $usrInputEl = $("#input-junk");
const baseURL = `https://www.rijksmuseum.nl/api/nl/collection?key=${config.RIJKS_API_KEY}&involvedMaker=Rembrandt+van+Rijn&p=1`;


// App's State Variables
let artWork, input, artDetails, artist;


// Cached Element References
const $tableEl = $("#content");
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
    return artWork.artObjects.map(function(art) {
        return `<tr>
        <td>${art.title}</td>
        <td>${art.principalOrFirstMaker}</td>
        <td><img class="responsive-img" src="${art.webImage.url}"</td>
    </tr>`;
    });
}

function render() {
    const html = generateHTML().join('');
    $tableEl.html(html);
    console.log(html);
}