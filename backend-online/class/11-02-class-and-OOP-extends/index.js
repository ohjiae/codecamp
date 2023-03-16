// 부모 클래스
class Monster {
    power = 10

    constructor(powerFromChild) {
        this.power = powerFromChild
    }

    attack = () => {
        console.log("공격하자")
        console.log("내공격력 = ", this.power)
    }
}

// 자식 클래스
// 자식이 부모한테 값 넘겨줄때는 constructor 함수의 인자 -> super 함수로 넘기기
class SkyMonster extends Monster {
    constructor(skyPower) {
        super(skyPower)
    }
    run = () => {
        console.log("날아서 도망가자!")
    }
}

class GroundMonster extends Monster {
    constructor(groundPower) {
        super(groundPower)
    }
    run = () => {
        console.log("뛰어서 도망가자!")
    }
}
