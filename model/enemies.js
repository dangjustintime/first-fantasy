// enemies
// Goblin
class Goblin extends Character {
    constructor() {
        super("Goblin");
        this.health_points = 50;
        this.magic_points = 2;
        this.strength = 20;
        this.src = "img/goblin.png";
    }
}
// Orge
class Orge extends Character {
    constructor() {
        super("Orge");
        this.health_points = 8;
        this.magic_points = 1;
        this.strength = 3;
    }
}
