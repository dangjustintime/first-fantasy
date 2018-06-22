// document ready function
$(() => {
    // target is set to no index
    let target = -1;

    // add characters and enemies to game
    generateEnemies();

    // set random background
    generateBackground();

    // eventlistners - pick jobs
    $("#pick-warrior").on("click", () => {
        if (player.party.length >= 4) {
            alert("Party can have only 4 characters.");
        } else {
            let name = prompt("Enter Name", "Warrior");
            addCharacterToParty(name, Warrior);
            const $newCharacter = $("<div>").addClass("pick-job");
            $newCharacter.append($("<img>")
                .attr("src", "img/warrior-standing.png"));
            $newCharacter.append($("<p>").text(name));
            $("#player-party").append($newCharacter);
        }
    });
    $("#pick-monk").on("click", () => {
        if (player.party.length >= 4) {
            alert("Party can have only 4 characters.");
        } else {
            let name = prompt("Enter Name", "Monk");
            addCharacterToParty(name, Monk);
            const $newCharacter = $("<div>").addClass("pick-job");
            $newCharacter.append($("<img>")
                .attr("src", "img/monk-standing.png"));
            $newCharacter.append($("<p>").text(name));
            $("#player-party").append($newCharacter);
        }
    });
    $("#pick-black-mage").on("click", () => {
        if (player.party.length >= 4) {
            alert("Party can have only 4 characters.");
        } else {
            let name = prompt("Enter Name", "Black Mage");
            addCharacterToParty(name, BlackMage);
            const $newCharacter = $("<div>").addClass("pick-job");
            $newCharacter.append($("<img>")
                .attr("src", "img/black-mage-standing.png"));
            $newCharacter.append($("<p>").text(name));
            $("#player-party").append($newCharacter);
        } 
    });
    $("#pick-white-mage").on("click", () => {
        if (player.party.length >= 4) {
            alert("Party can have only 4 characters.");
        } else {
            let name = prompt("Enter Name", "White Mage");
            addCharacterToParty(name, WhiteMage);
            const $newCharacter = $("<div>").addClass("pick-job");
            $newCharacter.append($("<img>")
                .attr("src", "img/white-mage-standing.png"));
            $newCharacter.append($("<p>").text(name));
            $("#player-party").append($newCharacter);
        }
    });

    // eventlistener - start over picking party
    $("#start-over-button").on("click", () => {
        player.party = [];
        $("#player-party").empty();
        $("#party-info").empty();
        $("#player-screen").empty();
    });

    // eventlistener - finished picking party, render game
    $("#done-button").on("click", () => {
        if (player.party.length == 0) {
            alert("Party must have at least one character.");
        } else {
            render();
            // eventlistener - character images
            for (let i = 0; i < player.party.length; i++) {
                $("#character-img" + i).on("click", () => {
                    // remove target class from all elements
                    $(".enemy-img").removeClass("target");
                    $(".character-img").removeClass("target");
                    // add target to selected element
                    $("#character-img" + i).addClass("target");
                    $("#character-img" + i).css("border-color", "green");
                    target = i;
                });
            }
            $("#pop-up-container").remove();
        }
    });

    // eventlisteners - enemy images
    for (let i = 0; i < enemy.party.length; i++) {
        $("#enemy-img" + i).on("click", () => {
            // remove target class from all elements
            $(".enemy-img").removeClass("target");
            $(".character-img").removeClass("target");
            // add target to selected element
            $("#enemy-img" + i).addClass("target");
            target = i;
        });
    }

    // eventlistener - attack button
    $("#attack-button").on("click", () => {
        // if target is not selected
        if (target == -1) {
            game.log("Must Select a target");
        } else {
            // character attacks target
            player.party[player.current_index].attack(enemy.party[target]);
            game.log(player.party[player.current_index].name + " attacked!");
            $("#enemy-img" + target).addClass("hit"); 
            if (!enemy.checkState()) {
                // target attacks back
                enemy.attack_one();
                $("#character-img" + player.current_index).addClass("hit");
                game.log(enemy.party[target].name + " attacked!");
                // check if party is dead
                if(player.checkState()) {
                    alert("You lost...");
                }
            } else {
                alert("You won!");
            }
            player.nextCharacter();
            // reset target to -1
            target = -1;
            setTimeout(()=>{}, 3000)
            $("#character-img" + player.current_index).removeClass("hit");
            $("#enemy-img" + target).removeClass("hit"); 
            // update screen
            render();
        }
    });

    // eventlistener - magic button
    $("#magic-button").on("click", () => {
        // if target is not selected
        if (target == -1) {
            game.log("Must Select a target");
        } else {
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
            // reset target to -1
            target = -1;
            // update UI
            render();
        }
    });

    // eventlistener - run button
    $("#run-button").on("click", () => {
        game.log(player.name + " ran away!");
        player.nextCharacter();
        alert("You lost...");
        // reset target to -1
        target = -1;
        // update UI
        render();
    });

});
