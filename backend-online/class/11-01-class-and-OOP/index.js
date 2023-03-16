class Monster {
    power = 10;

    constructor(aaa) {
        this.power = aaa;
    }

    attack = () => {
        console.log("공격");
        console.log(`내 공격력 : ${this.power}`);
    };

    run = () => {
        console.log("도망");
    };
}

const mymonster1 = new Monster();
mymonster1.attack();
mymonster1.run();
