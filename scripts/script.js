// get HTML elements
var main = document.getElementById("main");
var infoMainContent = document.getElementById("infoMainContent");
var resultsMainContent = document.getElementById("resultsMainContent");
var resultsTable = document.getElementById("resultsTable");
var regResults = document.getElementById("regResults");
var regResultsInp = document.getElementById("regResultsInp");
var selMatch = document.getElementById("selMatch");
var selName = document.getElementById("selName");
var playersMainContent = document.getElementById("playersMainContent");
var playersGallery = document.getElementById("playersGallery");
var contactMainContent = document.getElementById("contactMainContent");

// get databases from FB
var database = firebase.database();
var playersDB = database.ref("theTournament/players");
var resultsDB = database.ref("theTournament/results");




// listener function: get data from pre-existing database "players"
function getPlayers(snapshot) {
  console.log("testing getPlayers");

  var playerName = snapshot.key;
  var playerInfo = snapshot.val();
  var playerBday = playerInfo.bday;
  var playerGender = playerInfo.gender;
  var playerClub = playerInfo.club;
  var playerImg = playerInfo.img;

  playersGallery.innerHTML += `
  <article class="content">
    <img src="images/${playerImg}">
    <h3>${playerName}</h3>
    <p>${playerBday}</p>
    <p>${playerClub}</p>
  </article>
  `;

  selName.innerHTML += `<option value="${selName}">${playerName}</option>`;
};

// listener function: get data from registered result
function regNewResults(event) {
  console.log("testing regResults");
  event.preventDefault();

  var regPoints = points.value;
  var theMatch = selMatch.value;
  var thePlayer = selName.value;

  var newResult = {
    "player" : thePlayer,
    "match" : theMatch,
    "score" : points.value
  };

  resultsDB.push(newResult);
  points.value = "";
};



// listener functions for showing elements
function showInfo() {
  console.log("testing showInfo");
  /* the normal JS to scroll to and element:
  playersMainContent.scrollIntoView();
  */
  // use zenscroll to smooth scroll to and element and center it in the view:
  zenscroll.center(infoMainContent);
};

function showPlayers() {
  console.log("testing showPlayers");
  zenscroll.center(playersMainContent);
};

function showResults() {
  zenscroll.center(resultsMainContent);
};

function showContact() {
  console.log("testing showContact");
  zenscroll.to(contactMainContent);
};


// listener functions for sorting
function sortAllPlayers() {
  console.log("testing sortAll");
  playersGallery.innerHTML = "";
  playersDB.on("child_added", getPlayers);
}

function sortFemales() {
  console.log("testing sortFemales");
  playersGallery.innerHTML = "";
  playersDB.orderByChild("gender")
           .equalTo("female")
           .on("child_added", getPlayers);
};

function sortMales() {
  console.log("testing sortMales");
  playersGallery.innerHTML = "";
  playersDB.orderByChild("gender")
           .equalTo("male")
           .on("child_added", getPlayers);
};




// register listener functions
regResults.onsubmit = regNewResults;

playersDB.on("child_added", getPlayers);
