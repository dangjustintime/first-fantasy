// object to log in strings into UI
const game = {
    log(str) {
        $("#description").text(str);
    }
}

// class for both the player and the computer
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
        if (this.current_index >= this.party.length) {
            this.current_index = 0;
        }
        // skip character if dead
        if (this.party[this.current_index].health_points == 0) {
            this.current_index++;
        }
        $(".character-img").removeClass("selected-character");
        $("#character-img" + this.current_index).addClass("selected-character");
        $("#description").text(
            player.party[player.current_index].name + "\'s turn");
    }

}

// intance of players
const player = new Player("Player");
const enemy = new Player("Enemy");

// method - random enemy attacks random character
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
    // add characters and enemies to game
    addCharacterToParty("Bill", Warrior);
    addCharacterToParty("Job", Monk);
    addCharacterToParty("Steve", BlackMage);
    addCharacterToParty("Jessica", WhiteMage);
    addEnemyToParty(Goblin);
    addEnemyToParty(Snake);
    addEnemyToParty(Wolf);
    addEnemyToParty(Wolf);

    // displays first character's turn
    $("#description").text(player.party[player.current_index].name + "\'s turn");
    $("#character-img" + player.current_index).addClass("selected-character");

    // eventlisteners

    // eventlisteners - enemy images
    for (let i = 0; i < enemy.party.length; i++) {
        $("#enemy-img" + i).on("click", () => {
            $(".enemy-img").removeClass("target");
            $(".character-img").removeClass("target");
            $("#enemy-img" + i).addClass("target");
            target = i;
            game.log(i);
        });
    }

    // eventlistener - character images
    for (let i = 0; i < player.party.length; i++) {
        $("#character-img" + i).on("click", () => {
            $(".enemy-img").removeClass("target");
            $(".character-img").removeClass("target");
            $("#character-img" + i).addClass("target");
            $("#character-img" + i).css("border-color", "green");
            target = i;
            game.log(i);
        });
    }

    // eventlistener - attack button
    $("#attack-button").on("click", () => {
        // select target
        let selectedTarget = target;
        // character attacks target
        player.party[player.current_index].attack(enemy.party[selectedTarget]);
        game.log(player.party[player.current_index].name + " attacked!");
        // if enemy is dead
        if (enemy.party[selectedTarget].health_points == 0) {
            $("#enemy" + selectedTarget).addClass("dead");
        }
        if (!enemy.checkState()) {
            // target attacks back
            enemy.attack_one();
            // update screen
            $("#character-hp" + player.current_index).text(
                "HP " + player.party[player.current_index].health_points + "/" 
                + player.party[player.current_index].max_health_points);
            game.log(enemy.party[selectedTarget].name + " attacked!");
            // check if party is dead
            if(player.checkState()) {
                alert("You lost...");
            }
        } else {
            alert("You won!");
        }
        player.nextCharacter();
    });

    // eventlistener - magic button
    $("#magic-button").on("click", () => {
        game.log(player.party[player.current_index].name + " used magic!");
        // if character is a white mage
        if (player.party[player.current_index].job == "white mage") {
            // heal target
            player.party[player.current_index].magic(player.party[target]);
            // update UI
            $("#character-hp" + target).text(
                "HP " + player.party[target].health_points + "/"
                + player.party[target].max_health_points);
        } else {
            // selected character uses magic on target
            player.party[player.current_index].magic(enemy.party[target]);
            // check if target is dead
            if (enemy.party[target].health_points == 0) {
                $("#enemy" + target).addClass("dead");
            }
            if (!enemy.checkState()) {
                // enemy attacks back
                enemy.attack_one();
                // update UI
                $("#character-hp" + player.current_index).text(
                    "HP " + player.party[player.current_index].health_points + "/"
                    + player.party[player.current_index].max_health_points);
                game.log(enemy.party[target].name + " attacked!");
                $("#character-mp" + player.current_index).text(
                    "MP " + player.party[player.current_index].magic_points + "/"
                    + player.party[player.current_index].max_magic_points);
                // check if party is dead
                if(player.checkState()) {
                    alert("You lost...");
                }
            } else {
                alert("You won!");
            }
        }
        player.nextCharacter();
    });
    // eventlistener - run button
    $("#run-button").on("click", () => {
        game.log(player.name + " ran away!");
        alert("You lost...");
    });

});
