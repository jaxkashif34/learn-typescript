abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name()} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return 'Hadoken';
  }
  name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightening Kick';
  }
  name(): string {
    return 'Chun-Li';
  }
}
const ryu = new Ryu();
const chunLi = new ChunLi();

// ryu.fight();
chunLi.fight();
