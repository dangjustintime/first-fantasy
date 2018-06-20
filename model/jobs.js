// jobs
class Warrior extends Character {
    constructor(name) {
        super(name);
        this.job = "warrior";
        this.strength+=3;
        this.agility+=3;
        this.vitality+=2;
        this.intelligence+=1;
        this.mind+=1;
        this.max_health_points = this.health_points + this.vitality;
        this.url_standing="img/warrior-standing.png";
    }
}
class Monk extends Character {
    constructor(name) {
        super(name);
        this.job = "monk";
        this.strength+=3;
        this.agility+=2;
        this.vitality+=4;
        this.intelligence+=1;
        this.mind+=1;
        this.max_health_points = this.health_points + this.vitality;
        this.url_standing="img/monk-standing.png";
    }
}
class BlackMage extends Character {
    constructor(name) {
        super(name);
        this.job = "black mage";
        this.strength+=1;
        this.agility+=1;
        this.vitality+=1;
        this.intelligence+=4;
        this.mind+=2;
        this.max_health_points = this.health_points + this.vitality;
        this.max_magic_points = this.magic_points + this.intelligence;
        this.url_standing="img/black-mage-standing.png";
    }
}
class WhiteMage extends Character {
    constructor(name) {
        super(name);
        this.job = "white mage";
        this.strength+=1;
        this.agility+=1;
        this.vitality+=1;
        this.intelligence+=2;
        this.mind+=4;
        this.max_health_points = this.health_points + this.vitality;
        this.max_magic_points = this.magic_points + this.mind;
        this.url_standing="img/white-mage-standing.png";
    }
    // moves
    magic(target) {
        if (this.magic_points == 0) {
            console.log("Not Enough MP");
        } else {
            this.magic_points--;
            target.health_points+=this.mind;
            if (target.health_points > target.max_health_points) {
                target.health_points = target.max_health_points;
            }
        }
    }
}
