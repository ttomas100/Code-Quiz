
var totalScore = 0;
var newQuestions = 0;

var questions = [{title: "Commonly used data types DO NOT include:",choices: ["strings", "booleans", "alerts", "numbers"],answer: "alerts"
    },
    {title: "The condition in an if / else statement is enclosed within ........",choices: ["quotes", "curly brackets", "parentheses", "square brackets"],answer: "parentheses"
    },
    {title: "Arrays in Javascript can be used to store .......",choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],answer: "all of the above"
    },
    {title: "String values must be enclosed within ........ when being assigned to variables.",choices: ["commas", "curly brackets", "quotes", "parenthesis"],answer: "quotes"
    },
    {title: "A very useful tool for used during development and debugging for printing content to the debugger is:",choices: ["Javascript", "terminal / bash", "for loops", "console log"],answer: "console log"
    },

];

var wrapper = document.querySelector("#wrapper");
var thisTimer = document.querySelector("#thisTimer");
var timeStart = document.querySelector("#startQuiz");
var quizQues = document.querySelector("#quizQues");


var timeLeft = 100;
var interval = 0;
var penalty = 10;
var newUl = document.createElement("ul");

timeStart.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            timeLeft--;
            thisTimer.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(interval);
                timesUp();
                thisTimer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(newQuestions);
});

function render(newQuestions) {
    quizQues.innerHTML = "";
    newUl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[newQuestions].title;
        var userChoices = questions[newQuestions].choices;
        quizQues.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQues.appendChild(newUl);
        newUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        if (element.textContent == questions[newQuestions].answer) {
            totalScore++;
            newDiv.textContent = "Correct! The answer is:  " + questions[newQuestions].answer;
        } else {
            timeLeft = timeLeft - penalty;
            newDiv.textContent = "Wrong! The correct answer is:  " + questions[newQuestions].answer;
        }

    }
    newQuestions++;

    if (newQuestions >= questions.length) {
        timesUp();
        newDiv.textContent = "End of quiz!" + " " + "You got  " + totalScore + "/" + questions.length + " Correct!";
    } else {
        render(newQuestions);
    }
    quizQues.appendChild(newDiv);

}
function timesUp() {
    quizQues.innerHTML = "";
    thisTimer.innerHTML = "";

    var newH1= document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "All Done!"

    quizQues.appendChild(newH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizQues.appendChild(createP);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var newP = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizQues.appendChild(newP);
    }

    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials: ";

    quizQues.appendChild(newLabel);

    var newImput = document.createElement("input");
    newImput.setAttribute("type", "text");
    newImput.setAttribute("id", "initials");
    newImput.textContent = "";

    quizQues.appendChild(newImput);

    var newSubmitButton = document.createElement("button");
    newSubmitButton.setAttribute("type", "submit");
    newSubmitButton.setAttribute("id", "Submit");
    newSubmitButton.textContent = "Submit";

    quizQues.appendChild(newSubmitButton);
    newSubmitButton.addEventListener("click", function () {
        var initials = newImput.value;

        if (initials === null) {
            initials = "not value entered"

        } else {
            var finalScore = {
                initials: initials,
                totalScore: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./register.html");
        }
    });

}



