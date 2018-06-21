// enemies
// Goblin
class Goblin extends Character {
    constructor() {
        super("Goblin");
        this.job = "goblin";
        this.health_points = 6;
        this.strength = 7;
        this.src = "img/goblin.png";
    }
}
// Wolf
class Wolf extends Character {
    constructor() {
        super("Wolf");
        this.job = "wolf";
        this.health_points = 7;
        this.strength = 7;
        this.src = "img/wolf.png";
    }
}
// Snake
class Snake extends Character {
    constructor() {
        super("Snake");
        this.job = "snake";
        this.health_points = 5;
        this.strength = 7;
        this.src = "img/snake.png";
    }
}
// Reaper
class Reaper extends Character {
    constructor() {
        super("Reaper");
        this.job = "reaper";
        this.health_points = 5;
        this.strength = 8;
        this.src = "img/reaper.png";
    }
}
