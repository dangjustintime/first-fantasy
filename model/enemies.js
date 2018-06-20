// enemies
// Goblin
class Goblin extends Character {
    constructor() {
        super("Goblin");
        this.job = "goblin";
        this.health_points = 3;
        this.magic_points = 2;
        this.strength = 2;
        this.src = "img/goblin.png";
    }
}
// Orge
class Orge extends Character {
    constructor() {
        super("Orge");
        this.job = "orge";
        this.health_points = 8;
        this.magic_points = 1;
        this.strength = 3;
    }
}
