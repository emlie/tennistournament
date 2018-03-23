// get HTML elements
var main = document.getElementById("main");
var playersMainContent = document.getElementById("playersMainContent");

// get databases from FB
var database = firebase.database();
var playersDB = database.ref("theTournament/players");




// listener function: get data from pre-existing database "players"
function getPlayers(snapshot) {
  console.log("testing getPlayers");

  var playerName = snapshot.key;
  var playerInfo = snapshot.val();
  var playerBday = playerInfo.bday;
  var playerGender = playerInfo.gender;
  var playerClub = playerInfo.club;
  var playerImg = playerInfo.img;

  playersMainContent.innerHTML += `
  <article class="content">
  <img src="images/${playerImg}">
  <h3>${playerName}</h3>
  <p>${playerBday}</p>
  <p>${playerGender}</p>
  <p>${playerClub}</p>
  </article>
  `;
};




// listener functions for sorting
function showInfo() {
  console.log("testing showInfo");
};

function showPlayers() {
  console.log("testing showPlayers");

var x = playersMainContent;
  if (playersMainContent.style.display === "none") {
      playersMainContent.style.display == "block";
  } else {
      playersMainContent.style.display == "none";
  }
};

function showResults() {
  console.log("testing showResults");
};

function showContact() {
  console.log("testing showContact");
};




// register listener functions
playersDB.on("child_added", getPlayers);
