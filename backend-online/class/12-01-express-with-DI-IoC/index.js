import { Express } from "express"
import { ProductController } from "./mvc/controllers/product.controllers.js"
import { CouponController } from "./mvc/controllers/coupon.controllers.js"
import { CashService } from "./mvc/controllers/services/cash.service.js"
import { ProductService } from "./mvc/controllers/services/product.service.js"
import { PointService } from "./mvc/controllers/services/point.service.js"

const app = express()

const productService = new ProductService()
const cashService = new CashService() // new 한 번으로 모든 곳에서 재사용 가능(싱글톤패턴 : CashService 만든거 하나로 상품구매, 쿠폰구매에도 사용했으니까)
// 의존성 주입을 해서 느슨한 결합(loose coupling) 을 함. 싱글톤 패턴으로 구성했다.(한 번만 불러오기)
// 그러나 의존성주입 != 싱글톤패턴. 아래에 다른 의존성 주입을 위해 똑같이 new CashService() 하면 싱글톤패턴이 깨지니까.
const pointService = new PointService() // 쿠폰 구매 방식이 포인트 결제로 변경

// 1. 클래스랑 폴더구조 연습하기.
//  1) 상품 API (상품 구매, 환불)
const productController = new ProductController(cashService, productService)
app.post("/products/buy", productController.buyProduct) // 상품 구매
app.post("/products/refund", productController.refundProduct) // 상품 환불

// 2) 쿠폰 API
const couponController = new CouponController(pointService)
app.post("coupons/buy", couponController.buyCoupon)

app.listen(3000)
