class Form {
    constructor() {
        this.input = createInput('Enter Your Name');
        this.button = createButton('Play');
        this.greet = createElement('h2');
        this.reset = createButton('Reset');
    }

    display() {
        var title = createElement('h1');
        title.html("Multiplayer Car Racing Game");
        title.position(displayWidth / 2 - 300, 0);
        title.style('color', 'white');
        title.style('fontSize', '50px');

        this.input.position(displayWidth / 2 - 100, displayHeight / 2 - 50);
        this.input.style('width', '250px');
        this.input.style('height', '20px');

        this.button.position(displayWidth / 2 - 50, displayHeight / 2);
        this.button.style('width', '160px');
        this.button.style('background-color', 'green');
        this.button.style('color', 'white');

        this.button.mousePressed( ()=> {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greet.html("Welcome "+ player.name);
            this.greet.position(displayWidth / 2 - 100, displayHeight / 2 - 100);
        })
        this.reset.position(50, 50);
        this.reset.style('width', '130px');
        this.reset.style('background-color', 'yellow');
        this.reset.style('color', 'blue');
        this.reset.mousePressed( ()=> {
            player.updateCount(0);
            game.updateGameState(0);
            database.ref('/').update({
                players: null,
                finishedPlayers: 0
            })
        })
    }

    hideDetails() {
        this.input.hide();
        this.button.hide();
        this.greet.hide();
    }
}