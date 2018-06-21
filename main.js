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
    // method - navigates through party array to next character
    nextCharacter() {
        do {
            this.current_index++;
            if (this.current_index == this.party.length) {
                this.current_index = 0;
            }
        } while (this.party[this.current_index].health_points == 0);
    }

}

// intance of players
const player = new Player("Player");
const enemy = new Player("Enemy");

// method - random enemy attacks random character
enemy.attack_one = () => {
    let random1;
    let random2;
    do {
        random1 = Math.floor(Math.random() * enemy.party.length);
        random2 = Math.floor(Math.random() * player.party.length);
    // generate indexes of characters that are still alive
    } while (enemy.party[random1].health_points == 0
        && player.party[random2].health_points == 0);
    // random enemy attacks random target
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
        .attr("src", newCharacter.src_standing));
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

// function - updates values on game screen
const render = () => {
    // update characters' HP and MP
    for (let i = 0; i < player.party.length; i++) {
        $("#character-hp" + i).text("HP " + player.party[i].health_points + "/"
            + player.party[i].max_health_points);
        $("#character-mp" + i).text("MP " + player.party[i].magic_points + "/"
            + player.party[i].max_magic_points);
        // change sprite according to HP
        if (player.party[i].health_points == 0) {
            $("#character-img" + i).attr("src", player.party[i].src_dead);
        } else if (player.party[i].health_points <
            (player.party[i].max_health_points / 2)) {
            $("#character-img" + i).attr("src", player.party[i].src_damaged);
        } else {
            $("#character-img" + i).attr("src", player.party[i].src_standing);
        }
    }
    // update enemy sprites
    for (let i = 0; i < enemy.party.length; i++) {
        if (enemy.party[i].health_points == 0) {
            $("#enemy-img" + i).addClass("dead");
        }
    }

    // update selected character
    $(".character-img").removeClass("selected-character");
    $("#character-img" + player.current_index).addClass("selected-character");
    $("#description").text(
        player.party[player.current_index].name + "\'s turn");
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
    addEnemyToParty(Reaper);

    // displays first character's turn
    render();
    // eventlisteners

    // eventlisteners - enemy images
    for (let i = 0; i < enemy.party.length; i++) {
        $("#enemy-img" + i).on("click", () => {
            $(".enemy-img").removeClass("target");
            $(".character-img").removeClass("target");
            $("#enemy-img" + i).addClass("target");
            target = i;
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
        });
    }

    // eventlistener - attack button
    $("#attack-button").on("click", () => {
        // select target
        // character attacks target
        player.party[player.current_index].attack(enemy.party[target]);
        game.log(player.party[player.current_index].name + " attacked!");
        $("#enemy-img" + target).css("animation", "damaged 0.5s linear 1"); 
        if (!enemy.checkState()) {
            // target attacks back
            enemy.attack_one();
            $("#character-img" + player.current_index).css("animation",
                "damaged 0.5s linear 1"); 
            game.log(enemy.party[target].name + " attacked!");
            // check if party is dead
            if(player.checkState()) {
                alert("You lost...");
            }
        } else {
            alert("You won!");
        }
        player.nextCharacter();
        // update screen
        render();
    });

    // eventlistener - magic button
    $("#magic-button").on("click", () => {
        game.log(player.party[player.current_index].name + " used magic!");
        // if character is a white mage
        if (player.party[player.current_index].job == "white mage") {
            // heal target
            player.party[player.current_index].magic(player.party[target]);
            $("#chacter-img" + target).css("animation", "healed 1s linear 1"); 
        } else {
            // selected character uses magic on target
            player.party[player.current_index].magic(enemy.party[target]);
            $("#enemy-img" + target).css("animation", "damage 1s linear 1"); 
            if (!enemy.checkState()) {
                // enemy attacks back
                enemy.attack_one();
                if(player.checkState()) {
                    alert("You lost...");
                }
            } else {
                alert("You won!");
            }
        }
        player.nextCharacter();
        // update UI
        render();
    });

    // eventlistener - run button
    $("#run-button").on("click", () => {
        game.log(player.name + " ran away!");
        player.nextCharacter();
        alert("You lost...");
        // update UI
        render();
    });

});
