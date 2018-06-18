const game = {
    log(str) {
        $("#description").text(str);
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.party = [];
        this.num_turns = 0;
    }
    // method - checks if player has won or lost
    checkState() {
        return this.party.every(x => x.health_points <= 0); 
    }
}

// document ready function
$(() => {
    const player = new Player("Player");
    const enemy = new Player("Enemy");

    player.party.push(new Warrior("Mike"));
    enemy.party.push(new Goblin());

    console.log(player);
    console.log(enemy);

    // eventlisteners
    $("#attack-button").on("click", () => {
        player.party[0].attack(enemy.party[0]);
        game.log(player.party[0].name + " attacked!");
        if (!enemy.checkState()) {
            enemy.party[0].attack(player.party[0]);
            $("#character-hp").text(player.party[0].health_points);
            game.log(enemy.party[0].name + " attacked!");
            if(player.checkState()) {
                game.log("You lost...");
            }
            console.log(player.party[0]);
            console.log(enemy.party[0]);
        } else {
            game.log("You won!");
        }
        
    });
    $("#magic-button").on("click", () => {
        player.party[0].magic(enemy.party[0]);
        game.log(player.party[0].name + " used magic!");
        if (!enemy.checkState()) {
            enemy.party[0].magic(player.party[0]);
            $("#character-hp").text(player.party[0].health_points);
            game.log(enemy.party[0].name + " attacked!");
            if(player.checkState()) {
                game.log("You lost...");
            }
            console.log(player.party[0]);
            console.log(enemy.party[0]);
        } else {
            game.log("You won!");
        }
    });
    $("#run-button").on("click", () => {
        game.log("Mike ran away!");
    });

    

});
