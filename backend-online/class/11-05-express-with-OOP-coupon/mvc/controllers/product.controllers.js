export class ProductController {
    buyProduct = (req, res) => {
        // 1. 가진 돈을 검증하는 코드 (10줄 => 2줄)
        const cashService = new CashService()
        const hasMoney = cashService.checkValue() // true or false 리턴

        // 2. 판매여부 검증하는 코드 (10줄 => 2줄)
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldOut() // true or false 리턴
        // 3. 상품 구매하는 코드
        if (hasMoney && !isSoldOut) {
            res.send("상품 구매 완료")
        }
    }

    refundProduct = (req, res) => {
        // 1. 판매 여부 검증하는 코드 (대략 10줄 정도)
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldOut() // true or false 리턴

        // 2. 상품 환불하는 코드
        if (isSoldOut) {
            res.send("상품 환불 완료")
        }
    }
}
