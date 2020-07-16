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
// hide empty table and header
function hideEls() {
    $section.hide();
}

// show table and header when data is retrieved and rendered
function showEls() {
    $section.show();
}

// clear out input area after running search
function clearInput() {
    $usrInputEl.val(null);
}

// click handler for submit button
function handleClick(event) {
    getArt();
    clearInput();
}

// fetch data from Rijksmuseum
function getArt() {

    input = $usrInputEl.val();

    $.ajax(`https://www.rijksmuseum.nl/api/en/collection?key=${config.RIJKS_API_KEY}&title=${input}&p=1&ps=20&imgonly=true`)
        .then(function(data) {
                artWork = data;
                checkData();
            },

            function(error) {
                alert(error.responseJSON.message);
            });
}

// check to see if any artObjects are present after AJAX promise
function checkData() {
    if (artWork.count === 0) {
        renderError();
    } else {
        render();
    }
}

// Package Data elements into html to ender in the DOM
function generateHTML() {
    return artWork.artObjects.map(function(art) {
        return `<tr>
            <td>${art.title}</td>
            <td>${art.principalOrFirstMaker}</td>
            <td><img class="responsive-img" src="${art.webImage ? art.webImage.url :"#"}"</td>
        </tr>`;
    });
}

// render the html string into the DOM
function render() {
    showEls();
    const html = generateHTML().join('');
    $tableEl.html(html);
}

// render an error message via a toast using materialize functionality - also run hideEls()
function renderError() {
    hideEls();
    M.toast({ html: "Sorry nothing matched that search, please try again." });
}