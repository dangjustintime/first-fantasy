// enemies
// Goblin
class Goblin extends Character {
    constructor() {
        super("Goblin");
        this.job = "goblin";
        this.health_points = 6;
        this.strength = 5;
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
// Golem
class Golem extends Character {
    constructor() {
        super("Golem");
        this.job = "golem";
        this.health_points = 11;
        this.strength = 4;
        this.src = "img/golem.png";
    }
}
// Vampire
class Vampire extends Character {
    constructor() {
        super("Vampire");
        this.job = "vampire";
        this.health_points = 8;
        this.strength = 3;
        this.src = "img/vampire.png";
    }
    // vampire drains HP from target
    attack(target) {
        target.health_points-=this.strength;
        if (target.health_points < 0) {
            target.health_points = 0;
        } 
        this.health_points+=this.strength;
    }
}
// Skeleton
class Skeleton extends Character {
    constructor() {
        super("Skeleton");
        this.job = "skeleton";
        this.health_points = 6;
        this.strength = 6;
        this.src = "img/skeleton.png";
    }
}
// Spider
class Spider extends Character {
    constructor() {
        super("Spider");
        this.job = "spider";
        this.health_points = 9;
        this.strength = 5;
        this.src = "img/spider.png";
    }
}

