class Game{
    constructor(){

    }

    getGameState() {
        database.ref('gameState').on("value", function(d) {
            gameState = d.val()
        })
    }

    updateGameState(e) {
        database.ref('/').update({
            gameState: e 
        })
    }

    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }
    
        car1 = createSprite(100,200);
        car1.addImage("c1", car1img);
        car2 = createSprite(300,200);
        car2.addImage("c2", car2img);
        car3 = createSprite(500,200);
        car3.addImage("c3", car3img);
        car4 = createSprite(700,200);
        car4.addImage("c4", car4img);
        cars = [car1, car2, car3, car4];
        finish = false;
      }

    play() {
        form.hideDetails();

        Player.getPlayersInfo();
        player.getFinishedPlayers();
        if (allplayers !== undefined) {
            background("gray");
            image(trackimg, 0,-displayHeight*4,displayWidth,displayHeight*5);
            var index = 0;
            var x = 180;
            var y
            for(var i in allplayers) {
                index += 1
                x += 200
                y = displayHeight - allplayers[i].distance  
                cars[index - 1].position.x = x;
                cars[index - 1].position.y = y;

                if (index === player.index) {
                    cars[index - 1].shapeColor = "blue";
                    camera.position.x = displayWidth / 2
                    camera.position.y = cars[index - 1].position.y;
                    fill("black");
                    ellipse(x, y, 80, 80);
                }
                else{
                    cars[index - 1].shapeColor = "yellow";
                }

                textSize(20);
                textAlign(CENTER);
                text(allplayers[i].name, x, y + 75);
                
            }
        }

        if (keyIsDown(UP_ARROW) && player.index !== null && finish === false) {
            player.distance += 50
            player.update();
        }

        if (player.distance > 3700 && finish === false) {
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();
            finish = true;
        }

        drawSprites();
    }

    end() {
        var endGame = createElement('h1');
        endGame.html("Game Over");
        endGame.position(displayWidth / 2 - 100, 100);
        Player.getPlayersInfo();
        camera.position.x = 0;
        camera.position.y = 0;
        image(gold, -50, -200, 200, 200);
        image(silver, 300, 0, 200, 200);
        image(bronze, -400, 0, 200, 200);
        textSize(20);
        textAlign(CENTER);
        fill("white");
        for (var i in allplayers) {
            if (allplayers[i].rank === 1) {
                text("1st: "+ allplayers[i].name, 0, 100);
            }
            else if (allplayers[i].rank === 2) {
                text("2nd: "+ allplayers[i].name, 300, 250);
            }
            else if (allplayers[i].rank === 3) {
                text("3rd: "+ allplayers[i].name, -400, 250);
            }
            else{
                text("Honorable Mention: "+ allplayers[i].name, 0, 300); 
            }
        }

         
    }
}