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

  // insert players
  playersGallery.innerHTML += `
  <article class="content">
    <img src="images/${playerImg}">
    <h3>${playerName}</h3>
    <p>${playerBday}</p>
    <p>${playerClub}</p>
  </article>
  `;

  // insert players into <option>
  selName.innerHTML += `<option value="${playerName}">${playerName}</option>`;
};


// listener function: get data from submitted form
function regNewResults(event) {
  console.log("testing regResults");
  event.preventDefault();

  var chosenPlayer = selName.value;
  var chosenMatch = selMatch.value;
  var regPoints = points.value;

  var newResult = {
    "player" : chosenPlayer,
    "match" : chosenMatch,
    "score" : regPoints
  };

  resultsDB.push(newResult);

  // reset form
  selMatch.value = "blank match";
  selName.value = "blank name";
  points.value = "";
};


// listener function: get data from resultsDB
function getResults(snapshot) {
  console.log("testing getResults");

  theResult = snapshot.val();
  thePlayer = theResult.player;
  theMatch = theResult.match;
  theScore = theResult.score;

  resultsTable.innerHTML += `
  <tr>
    <td>${theMatch}</td>
    <td>${thePlayer}</td>
    <td>${theScore}</td>
  </tr>
  `;
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
  zenscroll.to(playersMainContent);
};

function showResults() {
  zenscroll.center(resultsMainContent);
};

function showContact() {
  console.log("testing showContact");
  zenscroll.to(contactMainContent);
};


// listener functions for sorting results
function sortAllResults() {
  console.log("testing sortAllResults");
  resultsTable.innerHTML = "";
  resultsDB.on("child_added", getResults);
};

function sortAscResults() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
};

function sortMatch1() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
  resultsDB.orderByChild("match")
           .equalTo("match 1")
           .on("child_added", getResults);
};

function sortMatch2() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
  resultsDB.orderByChild("match")
           .equalTo("match 2")
           .on("child_added", getResults);
};

function sortMatch3() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
  resultsDB.orderByChild("match")
           .equalTo("match 3")
           .on("child_added", getResults);
};

function sortMatch4() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
  resultsDB.orderByChild("match")
           .equalTo("match 4")
           .on("child_added", getResults);
};

function sortMatch5() {
  console.log("testing sortAscResults");
  resultsTable.innerHTML = "";
  resultsDB.orderByChild("match")
           .equalTo("match 5")
           .on("child_added", getResults);
};


// listener functions for sorting players
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
resultsDB.on("child_added", getResults);
