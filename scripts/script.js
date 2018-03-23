// get HTML elements
var main = document.getElementById("main");
var playersMainContent = document.getElementById("playersMainContent");
var playersGallery = document.getElementById("playersGallery");
var resultsTable = document.getElementById("resultsTable");
var regResults = document.getElementById("regResults");
var regResultsInp = document.getElementById("regResultsInp");
var selMatch = document.getElementById("selMatch");
var selName = document.getElementById("selName");

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
    <p>${playerGender}</p>
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



// listener functions for sorting
function showInfo() {
  console.log("testing showInfo");
};

function showPlayers() {
  console.log("testing showPlayers");

/*var x = playersMainContent;
  if (playersMainContent.style.display === "none") {
      playersMainContent.style.display == "block";
  } else {
      playersMainContent.style.display == "none";
  }*/
};

function sortAll() {
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

function showResults() {
  console.log("testing showResults");
};

function showContact() {
  console.log("testing showContact");
};




// register listener functions
regResults.onsubmit = regNewResults;

playersDB.on("child_added", getPlayers);
