class Player {
    constructor() {
        this.index = null
        this.name = null
        this.distance = 0
        this.rank = 0
    }

    getCount() {
        database.ref('playerCount').on("value", function(a) {
            playerCount = a.val()
        })
    }

    updateCount(b) {
        database.ref('/').update({
            playerCount: b
        })
    }

    update() {
        var playerinfo = "players/player" + this.index
        database.ref(playerinfo).update({
            name: this.name,
            distance: this.distance,
            rank: this.rank
        })
    }

    getFinishedPlayers() {
        database.ref('finishedPlayers').on("value", (p)=> {
            finishedPlayers = p.val()
        })
    }

    static updateFinishedPlayers() {
        database.ref('/').update({
            finishedPlayers: finishedPlayers + 1
        })

        this.rank += 1;
    }

    static getPlayersInfo() {
        database.ref('players').on("value", (c)=> {
            allplayers = c.val()
        })
    }
}