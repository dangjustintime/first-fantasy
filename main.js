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
        this.current_index = 0;
    }
    // method - checks if player has won or lost
    checkState() {
        return this.party.every(x => x.health_points <= 0); 
    }
    // method - navigates through party array
    nextCharacter() {
        this.current_index++;
        if (this.current_index == this.party.length) {
            this.current_index = 0;
        }
        $("#description").text(
            player.party[player.current_index].name + "\'s turn");
    }

}

const player = new Player("Player");
const enemy = new Player("Enemy");

enemy.attack_one = () => {
    let random1 = Math.floor(Math.random() * enemy.party.length);
    let random2 = Math.floor(Math.random() * player.party.length);
    enemy.party[random1].attack(player.party[random2]);
}

// function - adds character div to DOM
const addCharacterToParty = (name, job) => {
    const newCharacter = new job(name);
    // set charactar hp equal to hp + vitality
    newCharacter.health_points = newCharacter.max_health_points;
    player.party.push(newCharacter);
    $characterInfo = $("<div>").addClass("character-info")
        .attr("id", "character" + (player.party.length - 1));
    $characterInfo.append($("<p>")
        .attr("id", "character-name" + (player.party.length - 1))
        .text(name));
    $characterInfo.append($("<p>")
        .attr("id", "character-hp" + (player.party.length - 1))
        .text("HP " + newCharacter.health_points + "/" 
            + newCharacter.max_health_points));
    $characterInfo.append($("<p>")
        .attr("id", "character-mp" + (player.party.length - 1))
        .text("MP " + newCharacter.magic_points + "/" 
            + newCharacter.magic_points));
    $("#party-info").append($characterInfo);
    $("#player-screen").append($("<img>")
        .addClass("character-img")
        .attr("id", "character-img" + (player.party.length - 1))
        .attr("src", newCharacter.url_standing));
}

// function - adds enemy div to DOM
const addEnemyToParty = (job) => {
    const newEnemy = new job();
    enemy.party.push(newEnemy);
    $enemyImg = $("<div>").addClass("enemy-info");
    $enemyImg.attr("id", "enemy" + (enemy.party.length - 1));
    $enemyImg.append($("<img>").addClass("enemy-img")
        .attr("id", "enemy-img" + (enemy.party.length - 1))
        .attr("src", newEnemy.src));
    $("#enemy-screen").append($enemyImg);
}


// document ready function
$(() => {
    let target;
    addCharacterToParty("Bill", Warrior);
    addEnemyToParty(Goblin);
    addEnemyToParty(Goblin);
    addEnemyToParty(Goblin);

    $("#description").text(player.party[player.current_index].name + "\'s turn");

    // eventlisteners
    // eventlistener - attack button
    $("#attack-button").on("click", () => {
        let target;
        game.log("Select Target");
        // character attacks target
        player.party[player.current_index].attack(enemy.party[0]);
        game.log(player.party[player.current_index].name + " attacked!");
        if (enemy.party[0].health_points == 0) {
            $("#enemy0").css("background", "black");
            $("#enemy0").css("transform", "scaleY(-1)");
        }
        if (!enemy.checkState()) {
            // target attacks back
            enemy.attack_one();
            // update screen
            $("#character-hp" + player.current_index).text(
                "HP " + player.party[player.current_index].health_points + "/" 
                + player.party[player.current_index].max_health_points);
            $("#enemy-health-bar" )
            game.log(enemy.party[0].name + " attacked!");
            if(player.checkState()) {
                alert("You lost...");
            }
            console.log(player.party[player.current_index]);
            console.log(enemy.party[0]);
        } else {
            alert("You won!");
        }
        player.nextCharacter();
        console.log(player);
    });
    // eventlistener - magic button
    $("#magic-button").on("click", () => {
        player.party[0].magic(enemy.party[0]);
        game.log(player.party[0].name + " used magic!");
        if (!enemy.checkState()) {
            // enemy attacks back
            enemy.attack_one();
            $("#character-hp" + player.current_index).text(
                "HP " + player.party[0].health_points + "/"
                + player.party[player.current_index].max_health_points);
            game.log(enemy.party[0].name + " attacked!");
            $("#character-mp" + player.current_index).text(
                "MP " + player.party[0].magic_points + "/"
                + player.party[player.current_index].max_magic_points);
            if(player.checkState()) {
                alert("You lost...");
            }
            console.log(player.party[0]);
            console.log(enemy.party[0]);
        } else {
            alert("You won!");
        }
        player.nextCharacter();
    });
    // eventlistener - run button
    $("#run-button").on("click", () => {
        game.log(player.name + " ran away!");
        alert("You lost...");
    });

});
