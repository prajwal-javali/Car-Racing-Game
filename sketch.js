var database;
var form, player, game;
var allplayers;
var gameState = 0;
var playerCount = 0;
var car1, car2, car3, car4;
var cars;
var car1img, car2img, car3img, car4img, trackimg, gold, silver, bronze;
var finishedPlayers;
var finish = false;

function preload() {
  car1img = loadImage("Images/car1.png");
  car2img = loadImage("Images/car2.png");
  car3img = loadImage("Images/car3.png");
  car4img = loadImage("Images/car4.png");
  trackimg = loadImage("Images/track.jpg");
  gold = loadImage("Images/gold medal.png");
  silver = loadImage("Images/silver medal.png");
  bronze = loadImage("Images/bronze medal.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(displayWidth, displayHeight);
  game = new Game()
  game.getGameState();
  game.start();

}

function draw(){
  background("blue");
  if (playerCount === 4) {
    game.updateGameState(1);
  }
  
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (finishedPlayers === 4) {
    game.updateGameState(2);
  }

  if (gameState === 2) {
    background("blue");
    game.end();
  }

  
  
}

