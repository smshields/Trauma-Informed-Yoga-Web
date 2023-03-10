import GameSession from "./core/GameSession.js";
import Skeleton from "./game/Skeleton.js";
import GameState from "./game/states/GameState.js";
import LoadingState from "./game/states/LoadingState.js";
import Mediapipe from "./core/Mediapipe.js";

//audio libary
import * as Tone from "./libs/Tone.js";

/**TODOS:
SETUP should be abstracted to be made easier to use.

*/

//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();

//Define how our P5 sketch will look. Treat this as the "Main".
var TIYW = function (p) {
	//Executed before beginning setup
	p.preload = function () {
		//Load any assets or libraries
	};

	//Executed before draw
	p.setup = function () {
		// Setup Mediapipe
		const MP = Mediapipe.getInstance();

		//Set canvas to browser size
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		//instantiate canvas and indicate parent div
		var canvas = p.createCanvas(window.innerWidth, window.innerHeight);
		canvas.parent("canvas");

		//save canvas reference to gameSession
		gameSession.canvas = canvas;

		//Instantiate all relevant game states and add them to the session.
		let gameState = new GameState();
		gameSession.addStateToGame(gameState);

		//Library loading and camera initialization (TODO: Move to preload?)
		let loadingState = new LoadingState();
		gameSession.addStateToGame(loadingState);

		//Set initial game state as loading, call setup method
		gameSession.setCurrentState(loadingState);

		//Time scale management
		gameSession.timeManager.timeScale = 1;
		gameSession.timeManager.frameRate = 60;
		gameSession.timeManager.start();

		//P5 configurations
		p.frameRate(60);
		p.imageMode(p.CENTER);

		//Tone.js Test
		// const synth = new Tone.Synth().toDestination();
		// synth.triggerAttackRelease("C4", "8n");
	};

	//core update function of the game
	p.draw = function () {
		//Call managers and states to update each frame.
		gameSession.timeManager.update();
		gameSession.currentState.update();

		//Renders last and from back to front. Clear before going.
		p.clear();
		p.angleMode(p.DEGREES);

		//TODO: Move to individual classes and use an image
		p.background(p.color(gameSession.backgroundColor));
		gameSession.particleManager.render();
		gameSession.currentState.render();
	};

	//implement your controls inside of your specific state.
	p.mousePressed = function () {
		//call gameState code here as needed.
	};

	p.keyPressed = function () {
		//call gameState code here as needed.
	};

	p.keyReleased = function () {
		//call gameState code here as needed.
	};

	p.keyTyped = function () {
		//call gameState code here as needed.
	};

	p.keyIsDown = function () {
		//call gameState code here as needed.
	};

	p.mouseMoved = function () {
		//call gameState code here as needed.
	};

	p.mouseDragged = function () {
		//call gameState code here as needed.
	};

	p.mousePressed = function () {
		//call gameState code here as needed.
	};

	p.mouseReleased = function () {
		if (gameSession.currentState.mouseReleased) {
			gameSession.currentState.mouseReleased();
		}
	};

	p.mouseClicked = function () {
		//call gameState code here as needed.
	};

	p.doubleClicked = function () {
		//call gameState code here as needed.
	};

	p.mouseWheel = function () {
		//call gameState code here as needed.
	};

	p.requestPointerLock = function () {
		//call gameState code here as needed.
	};

	p.exitPointerLock = function () {
		//call gameState code here as needed.
	};

	p.getAngle = function (x1, y1, x2, y2) {
		let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
		return angle;
	};

	// Manage game input.
	p.keyPressed = function () {};

	p.windowResized = function () {
		gameSession.canvasWidth = window.innerWidth;
		gameSession.canvasHeight = window.innerHeight;

		p.resizeCanvas(gameSession.canvasWidth, gameSession.canvasHeight);
	};
};

//Instantiate P5 and attach it to our gameSession instance
gameSession.p5 = new p5(TIYW, "canvas");
