// 객체 타입 명시
interface IProfile {
    name: string
    age: number | string
    school: string
    hobby?: string //변수명 뒤에 ? 붙으면 Optional 변수
}
// 만약 IProfile로 객체타입 명시하지 않았더라면
// 타입 추론으로 객체가 만들어져 그냥 name: string, age: number, school: string으로 타입 설정됨.
// 그래서 아래의 age를 string으로 바꾸거나 hobby를 추가할 수 없음.
let profile: IProfile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
}
profile.age = "8살"
profile.hobby = "수영" //hobby를 여기서 추가할수있는이유 = 앞에 타입 명시할때 ?로 선택적 변수로 만들어서.

// 함수 타입
// 1) 함수타입은 타입이 추론되지 않는다
const add = (money1, money2, unit) => {
    return money1 + money2 + unit
}
const result = add(1000, 2000, "원")
// 이상황에서 인자 (money1, money2, unit)에 마우스 올려보면 타입이 any임.
// result에 숫자, 숫자, 문자를 넣었지만 그렇게 추론될수는 없다
// 아래에서 문자, 숫자, 숫자로 새로 넣을수도 있기때문 (const result2 = add('1000', 1000, '원'))
// 매번 이 함수를 새로운 인자를 넣어 실행할때마다 타입이 새로 추론되는건 말이 안되므로, any 즉 아무거나 받을수 있도록 설정됨

// 그러므로 함수 타입은 미리 명시해야 한다.
// 함수명 = (인자 이름: 인자 타입) : return 값 타입 => {}
const add2 = (money1: number, money2: number, unit: string): string => {
    return money1 + money2 + unit
}
const result2 = add2(1000, 2000, "원")
