// API URL w my key: https://www.rijksmuseum.nl/api/nl/collection?key=fk8HjIgd&involvedMaker=Rembrandt+van+Rijn

// Constants
const $usrInputEl = $("#usr-input");


// App's State Variables
let artWork, input;


// Cached Element References
const $tableEl = $("#content");
const $artTableEl = $("#art-table");
const $imgEl = $("#image-content");
const $subBtn = $("#submit");
const $section = $("#small-container");



// Event Listeners
$subBtn.on('click', handleClick);

// Functions

hideEls();

function hideEls() {
    $section.hide();
}

function showEls() {
    $section.show();
}

function clearInput() {
    $usrInputEl.val(null);
}

function handleClick(event) {
    getArt();
    clearInput();
}

// fetch data from Rijksmuseum


function getArt() {

    input = $usrInputEl.val();

    $.ajax(`https://www.rijksmuseum.nl/api/en/collection?key=${config.RIJKS_API_KEY}&title=${input}&p=1&ps=20&imgonly=true`)
        .then(function(data) {
                console.log(data);
                artWork = data;
                checkData();
            },

            function(error) {
                alert(error.responseJSON.message);
            });
}

function generateHTML() {
    return artWork.artObjects.map(function(art) {
        return `<tr>
            <td>${art.title}</td>
            <td>${art.principalOrFirstMaker}</td>
            <td><img class="responsive-img" src="${art.webImage ? art.webImage.url :"#"}"</td>
        </tr>`;
    });
}

function checkData() {
    if (artWork.count === 0) {
        renderError();
    } else {
        render();
    }
}

function render() {
    showEls();
    const html = generateHTML().join('');
    $tableEl.html(html);
}

function renderError() {
    hideEls();
    M.toast({ html: "Sorry nothing matched that search, please try again." });
}