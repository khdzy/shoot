shoot
=====

Practice to build a game

And practice how to had stuff to Github





====


1. define main variables;\
(this way I defined the variables I will need for the beginning of the game: the level will start at 1, the score will start at 0, errors allowed will start at 5 and time left at 60, the number of pressed k depends on the number of k in each level );\
\
2. define functions for random generation of string of the letters\
	2.1. function letter = returns a random array of letters (exempt the letter k);\
	2.2. function type = returns a random font for each letter array;\
	2.3. function levelArray = returns the array of letter with the right length;\
	2.4. function letterK = defines the number of K's per level, replaces that number per K's and return the array;\
\
3. page organization\
	3.1. letterPage = returns the number of letters per level;\
	3.2. toFind = returns the number of K's to find in each level;\
\
4. define the timer\
	4.1. startTimer = start the timer, define that it will change each second;\
	4.2. stopTimer = reset the timer, back to 0;\
	4.3. updateTime = define that the timer will decrease and define that when it arrives to 0 it will call the function gameOver 	and stopTimer;\
\
5. build the html\
	5.1. function addEventHandler = make the letter elements a clickable object;\
	5.2. function updateElement = defiance the elements to update in the status bar;\
	5.3. function renderStatusBar =  render the status bar, update the elements score, to find, time left and errors allowed, make 	all that numbers up to date during the game;
	5.4. function tableForLevel = create a table for each level, with the random font and and letter string, this way the table will 	update itself each time you start a new level;

6. main game functions
	6.1. function start level = define the number of letters in the level, generate the level and insert the array of letters, define the 	size of the letters in each level (the number of letters per level go up and the size of the letters go down)
	6.2. function gameOver = display the game over warning and hide the table, update the score;
	6.3. function reStart = reset the variables, set the font size back to 100%, hide the gameOver warning and turn visible the 	table, call startTimer and startLevel;\
	6.4. function bootstrapGame = restart game on clicking the 'play again' button;

7. game levels and points
	7.1. function checkGameState = increase level when you find all the k's, gameOver when you end up the errors allowed;
	7.2.  function letterPressed = get html element if you press a letter k the score increase, the number to find will decrease 	and appears the thumbs up, if is not k the number of errors allowed will decrease and will appear the thumbs down icon;
