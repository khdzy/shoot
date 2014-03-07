var level = 1;
var pressedK = toFind();
var score = 0;
var errorsAllowed = 5;

var timeLeft = 60;
var timeLeftInterval;



///////////////////////////////////////////////////////////////////////////////////////////////
////// Random generation

function letter () {
	var m = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	return m[Math.round (Math.random()*(m.length-1))];
}

function type () {
	var m = ["Bodini", "Courier", "Dude", "Gothic", "Museo", "Sansita", "Futura", "SignPaint"];
	return m[Math.round (Math.random()*(m.length-1))];
}

function levelArray() {
	var returnArray = [];
	for (var i = 0, length = letterPage(); i < length; i++) {
		returnArray.push(letter());
	}
	returnArray = letterK(returnArray);
	return returnArray;
}

function letterK (letterArray) {
	// find out how big the array is
	var length = letterArray.length;

	// calculate how many K should be replaced
	var numberK = toFind();

	// randomly replace x-amount of Ks in the array
	for (var i = 0; i < numberK; i++) {
		// gets random position to replace K
		var pos = Math.round (Math.random()*(length-1));
		// if the position is already K it will find a new one
		while(letterArray[pos] === "k") {
			pos = Math.round (Math.random()*(length-1));
		}
		// replacing letters with K
		letterArray[pos] = "k";
	}
	// return the finished array
	return letterArray;
}



///////////////////////////////////////////////////////////////////////////////////////////////
////// Page organization

function letterPage () {
	return level * 4;
}

function toFind() {
	return level;
}



///////////////////////////////////////////////////////////////////////////////////////////////
////// Timer functions

function startTimer() {
	stopTimer();

	// Start interval with 1s frequency - store the interval id in timeLeftInterval
	timeLeftInterval = setInterval(updateTime, 1000);
}

function stopTimer() {
	// Clear the interval with the id timeLeftIneterval
	clearInterval(timeLeftInterval);
}

function updateTime() {
	timeLeft = timeLeft - 1;
	if (timeLeft <= 0) {
		gameOver();
		stopTimer();
	}
	renderStatusBar();
}



///////////////////////////////////////////////////////////////////////////////////////////////
////// Building from HTML

function addEventHandlers() {
	var letterElements = document.getElementsByTagName('h1');
	for(var i = 0; i < letterElements.length; i++) {
		letterElements[i].onclick = letterPressed;
	}
}

function updateElement(elementId, value) {
	// Fetch the element from the page
	var element = document.getElementById(elementId);

	// Update the value of the element
	element.innerHTML = value;
}

function renderStatusBar() {
	// update the score
	updateElement("score", score);

	// update the to find value
	updateElement("toFind", pressedK);

	// update the time left
	updateElement("timeLeft", timeLeft);

	//update the number of errors you still have before game over
	updateElement("errorsAllowed", errorsAllowed);

	updateElement("scored", score);
}

function tableForLevel(generatedLevel) {
	// empty string that should contain the new html of the table
	var html = '';
	// create the first <tr> of the letterTable
	html += '<tbody><tr>';
	
	for (var i = 0; i < generatedLevel.length; i++) {
		var letter = generatedLevel[i];
		// create <td><h1>letter</h1></td>
		html += '<td><h1 style="font-family:' + type() + '">';
		html += letter; 
		html += '</h1></td>';

		// append to html string
		if( i === (generatedLevel.length/2)-1) {
			html += '</tr><tr>';
		};
	};
	// update 'letterTable' with 'html' string
	html += '</tr></tbody>';

	return html;
}



///////////////////////////////////////////////////////////////////////////////////////////////
////// Main Game Functions

function pressStart (event) {

	document.getElementById("letterTable").style.setProperty("font-size", "100%");

	var welcomeDiv = document.getElementById('welcome');
	welcomeDiv.style.display = 'none';

	var table = document.getElementById('letterTable');
	table.style.display = 'inline-block';

	startTimer();
	startLevel();
	reStart();
}

function start () {
	var buttonPlay = document.getElementById("buttonPlay");
	buttonPlay.onclick = pressStart;

	var button = document.getElementById("button");
	button.onclick = reStart;
}

function startLevel () {
	pressedK = toFind();
	// generate the letters that we need for this level
	// ..
	var generatedLevel = levelArray();
	// document.getElementById("letterTable").className = "letters level" + level;
	if (level > 2) {
		var size = 1;
		for (var i = (level - 3); i >= 0; i--) {
			size = size * 0.9;
		}
		document.getElementById("letterTable").style.setProperty("font-size", (size * 100) + "%");
	}
	
	updateElement('letterTable', tableForLevel(generatedLevel));
	//the letters will be in place
	addEventHandlers();
}

function gameOver() {
	// Do something nice for gameover
	var gameoverDiv = document.getElementById('game-over');
	gameoverDiv.style.display = 'block';

	var table = document.getElementById('letterTable');
	table.style.visibility = 'hidden';

	return score;
}

function reStart(event) {
	// reset all variables
	level = 1;
	score = 0;
	errorsAllowed = 5;
	timeLeft = 60;

	document.getElementById("letterTable").style.setProperty("font-size", "100%");

	var gameoverDiv = document.getElementById('game-over');
	gameoverDiv.style.display = 'none';

	var table = document.getElementById('letterTable');
	table.style.visibility = 'visible';

	startTimer();
	startLevel();
}



///////////////////////////////////////////////////////////////////////////////////////////////
////// Game Levels and Points

function checkGameState() {
	if (pressedK === 0) {
		level++;
		startLevel();
	}
	if (errorsAllowed == 0) {
		stopTimer();
		gameOver();
	}
}

function letterPressed(event) {
	// store the element in a variable (event.target)
	var element = event.target;
	// get the letter (element.innerHTML)
	var letter = element.innerHTML;
	// check if the letter == "k" ----> increment score, give thumbs up, if it was the last k then go to next level
	if (letter === 'k') {
		score++;
		pressedK--;
		element.className = "correct";
		
	} else { // if it's not "k" --->> give thumbs down, decrease allowed errors. if allowed errors == 0, gameover.
		errorsAllowed--;
		element.className = "wrong";	
	}

	element.innerHTML = "";

	checkGameState();
	renderStatusBar();
}

start();
