import { Express } from "express"
import { CashService } from "./cash"
import { ProductService } from "./product"
const app = express()
// 1. 클래스랑 폴더구조 연습하기.
//  1) 상품 구매하기
//
app.post("/products/buy", (req, res) => {
    // 1. 가진 돈을 검증하는 코드 (10줄 => 2줄)
    const cashService = new CashService()
    const hasMoney = CashService.checkValue() // true or false 리턴

    // 2. 판매여부 검증하는 코드 (10줄 => 2줄)
    const productService = new ProductService()
    const isSoldOut = productService.checkSoldOut() // true or false 리턴
    // 3. 상품 구매하는 코드
    // if(돈 있고 && !판매완료){
    // res.send("상품 구매 완료")
    // }
})

//  2) 상품 환불하기
app.post("/products/refund", (req, res) => {
    // 1. 판매 여부 검증하는 코드 (대략 10줄 정도)
    // 2. 상품 환불하는 코드
    // if(판매완료){
    //     res.send("상품 환불 완료")
    // }
})

app.listen(3000)
