import { Express } from "express"
import { ProductController } from "./mvc/controllers/product.controllers.js"
import { CouponController } from "./mvc/controllers/coupon.controllers.js"
const app = express()
// 1. 클래스랑 폴더구조 연습하기.
//  1) 상품 API (상품 구매, 환불)
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct) // 상품 구매
app.post("/products/refund", productController.refundProduct) // 상품 환불

// 2) 쿠폰 API
const couponController = new CouponController()
app.post("coupons/buy", couponController.buyCoupon)

app.listen(3000)
