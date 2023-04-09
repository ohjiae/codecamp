export class CouponController {
    constructor(moneyService) {
        this.moneyService = moneyService
    }
    buyCoupon = (req, res) => {
        //const cashService = new CashService() // 의존성 주입; 느슨한 결합
        const hasMoney = this.moneyService.checkValue() // true or false
        if (hasMoney) {
            res.send("쿠폰 구매 완료")
        }
    }
}
