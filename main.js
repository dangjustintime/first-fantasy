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
    // set charactar hp and mp equal to max
    newCharacter.health_points = newCharacter.max_health_points;
    player.party.push(newCharacter);
    $characterInfo = $("<div>").addClass("character-info")
        .attr("id", "character" + (player.party.length - 1));
    $characterInfo.append($("<h1>")
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

// function - generates random enemies
const generateEnemies = () => {
    let numEnemies = Math.floor(Math.random() * 4);
    for (let i = 0; i < numEnemies; i++) {
        let randomEnemy = Math.floor(Math.random() * 8);
        switch (randomEnemy) {
            case 0:
                addEnemyToParty(Goblin);
                break;
            case 1:
                addEnemyToParty(Wolf);
                break;
            case 2:
                addEnemyToParty(Snake);
                break;
            case 3:
                addEnemyToParty(Reaper);
                break;
            case 4:
                addEnemyToParty(Golem);
                break;
            case 5:
                addEnemyToParty(Vampire);
                break;
            case 6:
                addEnemyToParty(Skeleton);
                break;
            case 7:
                addEnemyToParty(Spider);
                break;
        }
    }
}

// function - generate random background
const generateBackground = () => {
    const backgrounds = [
        "img/desert-background.png",
        "img/grass-background.png",
        "img/ship-background.png",
        "img/woods-background.png",
    ];
    let index = Math.floor(Math.random() * backgrounds.length);
    $("#canvas").css("background-image", "url(" + backgrounds[index]);
}


// function - updates values on game screen
const render = () => {
    // remove animations from elements
    $(".character-img").removeClass("alive");
    $(".character-img").removeClass("damaged");
    $(".character-img").removeClass("dead");
    $(".enemy-img").removeClass("alive");
    $(".enemy-img").removeClass("damaged");
    $(".enemy-img").removeClass("dead");
    
    // update characters' HP, MP, sprites, and animations
    for (let i = 0; i < player.party.length; i++) {
        $("#character-hp" + i).text("HP " + player.party[i].health_points + "/"
            + player.party[i].max_health_points);
        $("#character-mp" + i).text("MP " + player.party[i].magic_points + "/"
            + player.party[i].max_magic_points);
        // change sprite according to HP
        if (player.party[i].health_points == 0) {
            $("#character-img" + i).attr("src", player.party[i].src_dead);
            $("#character-img" + i).addClass("dead");
            $("#character-img" + i).css("filter", "none");
        } else if (player.party[i].health_points <
            (player.party[i].max_health_points / 2)) {
            $("#character-img" + i).attr("src", player.party[i].src_damaged);
            $("#character-img" + i).addClass("damaged");
            
        } else {
            $("#character-img" + i).attr("src", player.party[i].src_standing);
            $("#character-img" + i).addClass("alive");
        }
    }
    // update enemy sprites and animations
    for (let i = 0; i < enemy.party.length; i++) {
        if (enemy.party[i].health_points == 0) {
            $("#enemy-img" + i).addClass("dead");
        } else if (enemy.party[i].health_points <
            (enemy.party[i].max_health_points / 2)) {
            $("#enemy-img" + i).addClass("damaged");
        } else {
            $("#enemy-img" + i).addClass("alive");
        }
    }
    // update selected character
    $(".character-img").removeClass("selected-character");
    $("#character-img" + player.current_index).addClass("selected-character");
    $("#description").text(
        player.party[player.current_index].name + "\'s turn");
    // remove target class from element
    $(".character-img").removeClass("target");
    $(".enemy-img").removeClass("target");
}
