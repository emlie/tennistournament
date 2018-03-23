// get HTML elements
var main = document.getElementById("main");
var playersMainContent = document.getElementById("playersMainContent");
var playersGallery = document.getElementById("playersGallery");

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

  playersGallery.innerHTML += `
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
playersDB.on("child_added", getPlayers);
