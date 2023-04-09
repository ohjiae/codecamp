export class ProductController {
    constructor(moneyService, productService) {
        // 강한 의존성을 약하게 하기위해 느슨한 결합 처리. index.js에서 productController 만들때부터 가져옴.
        this.moneyService = moneyService
        this.productService = productService
    }

    buyProduct = (req, res) => {
        // 1. 가진 돈을 검증하는 코드 (10줄 => 2줄)
        // const cashService = new CashService() // 의존성 주입, 느슨한 결합; 위의 constroctor로 처리.
        const hasMoney = this.moneyService.checkValue() // true or false 리턴

        // 2. 판매여부 검증하는 코드 (10줄 => 2줄)
        // const productService = new ProductService() // 의존성 주입,느슨한 결합
        const isSoldOut = this.productService.checkSoldOut() // true or false 리턴
        // 3. 상품 구매하는 코드
        if (hasMoney && !isSoldOut) {
            res.send("상품 구매 완료")
        }
    }

    refundProduct = (req, res) => {
        // 1. 판매 여부 검증하는 코드 (대략 10줄 정도)
        //const productService = new ProductService() // 의존성 주입, 느슨한 결합
        const isSoldOut = this.productService.checkSoldOut() // true or false 리턴

        // 2. 상품 환불하는 코드
        if (isSoldOut) {
            res.send("상품 환불 완료")
        }
    }
}
