// jobs
class Warrior extends Character {
    constructor(name) {
        super(name);
        this.strength+=3;
        this.agility+=3;
        this.vitality+=2;
        this.intelligence+=1;
        this.mind+=1;
    }
}
class Monk extends Character {
    constructor(name) {
        super(name);
        this.strength+=3;
        this.agility+=2;
        this.vitality+=4;
        this.intelligence+=1;
        this.mind+=1;
    }
}
class BlackMage extends Character {
    constructor(name) {
        super(name);
        this.strength+=1;
        this.agility+=1;
        this.vitality+=1;
        this.intelligence+=4;
        this.mind+=2;
    }
    // moves
    magic(target) {
        target.health_points-=this.intelligence;
    }
}
class WhiteMage extends Character {
    constructor(name) {
        super(name);
        this.strength+=1;
        this.agility+=1;
        this.vitality+=1;
        this.intelligence+=2;
        this.mind+=4;
    }
    // moves
    magic(target) {
        target.health_points-=this.mind;
    }
}
