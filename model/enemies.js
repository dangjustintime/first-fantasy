// enemies
// Blob
class Blob extends Character {
    constructor() {
        super("Blob");
        this.health_points = 3;
        this.magic_points = 1;
    }
}
// Goblin
class Goblin extends Character {
    constructor() {
        super("Goblin");
        this.health_points = 5;
        this.magic_points = 2;
        this.strength = 2;
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
