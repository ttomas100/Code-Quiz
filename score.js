
var score = document.querySelector("#score");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = allScores[i].initials + " " + allScores[i].score;
        score.appendChild(newLi);
    }
}
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});