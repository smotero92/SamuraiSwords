let dice  = require('./dice');

require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
let after = require('./decorators').after;


class model {
  constructor () {
    this.listeners = new Set();
  }

  addListener (listener) {
    this.listeners.add(listener);
  }

  deleteListener (listener) {
    this.listeners.delete(listener);
  }

  notifyAll (message, ...args) {
    for (let listener of this.listeners) {
      listener.notify(this, message, ...args);
    }
  }
}

//@after(notify('set'), 'set first', 'set last')
//@after(notify('get'), 'get first', 'get last')
class army extends model{
    constructor(fortress, castle, landAdvantage) {
        super();
        this.listeners = new Set();

        this.units = {
            shogun: 0,
            swordsman: 0,
            rhonin: 3,
            gunner: 0,
            archer: 0,
            spearman: 0
        };
        if (fortress) {
            this.units.spearman += 3;
        } else if (castle) {
            this.units.spearman += 5;
        }


    };

    recruit() {
        for (let unit in this.units) {
            this.units[unit] = Math.floor(Math.random()*6);
        }
    }
/*
    get shogun() {
        return this._shogun;
    }


    set shogun(value) {
        if (typeof value === 'number' && isFinite(value)) {
            return this._shogun = value;
        } else {
            return null;
        }
    }

    get (property) {
        return this.units[property];
    }

    set (property, value) {
        return this.units[property] = value;
    }*/

    hitChecks(rollNeeded, unitsBattling) {
        let successes = 0;
        for (let unit = 0; unit < unitsBattling; unit++) {
            if (dice(12) <= rollNeeded) {
                successes++;
            }
        }
        return successes;
    }

    rangedBattle() {
        return (this.hitChecks(6, this.units.archer)
                + this.hitChecks(4, this.units.gunner));
    }

    meleeBattle() {
        return(this.hitChecks(6, this.units.shogun)
                + this.hitChecks(5, this.units.swordsman)
                + this.hitChecks(4, this.units.spearman));
    }

    testValues() {
        console.log('swordsman: ' + this.units.swordsman);
        console.log('shogun: ' + this.units.shogun);
        console.log(this.units.swordsman);
        console.log(this.units.spearman);
        console.log(this.units.archer);
        console.log(this.units.rhonin);
    }
    totalUnits () {
        let total = 0;
        for (let unit in this.units) {
            total += this.units[unit];
        };
        return total
    }
}


let attacker = new army();
attacker.recruit();
//attacker.testValues();
console.log(attacker.totalUnits() + "hit thismany time ->" + (attacker.meleeBattle() + attacker.rangedBattle()));
