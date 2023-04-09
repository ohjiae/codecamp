import { CashService } from "./services/cash.service.js"
export class CouponController {
    buyCoupon = (req, res) => {
        const cashService = new CashService()
        const hasMoney = CashService.checkValue() // true or false
        if (hasMoney) {
            res.send("쿠폰 구매 완료")
        }
    }
}
