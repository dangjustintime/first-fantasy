// character class
class Character {
    constructor(name) {
        this.name = name;
        // stats
        this.health_points = 10;
        this.magic_points = 10;
        this.strength = 1;          // use damage done in battle
        this.agility = 1;           // decides who goes first
        this.vitality = 1;          // additional maximum hp
        this.intelligence = 1;      // black magic
        this.mind = 1;              // white magic
        this.max_health_points = this.health_points + this.vitality;
        this.max_magic_points = this.magic_points;
    }
    attack(target) {
        target.health_points-=this.strength;
    }
    magic(target) {
        target.health_points-=this.intelligence;
        this.magic_points--;
    }
    run() {
        console.log(this.name + " ran away.");
    }
}
