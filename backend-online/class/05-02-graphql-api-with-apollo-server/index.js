import { ApolloServer, gql } from "apollo-server";

// <타입 설명서>
// typeDefs = gql`input newType{}
//                type Query{}
//                type Mutation {}`
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoard: BoardReturn # 객체 1개를 의미
    fetchBoard: [BoardReturn] # 배열 안에 객체 1개 이상을 의미
  }

  type Mutation {
    # createBoard(괄호 안의 내용 = 조건들)을 주면 : String을 Return한다.
    createBoard(writer: String, title: String, contents: String): String
    # CreateBoardInput이라는 타입은 없으므로 typeDefs 안 제일 윗줄에 input CreateBoardInput {}로 설정.
    createBoard2(createBoardInput: CreateBoardInput): String
  }
`;

// <실질적 함수 모음>
// resolvers = {Query : {}, Mutation: {}}
// 1. Query : SQL 의 READ 와 같은 조회 로직
// 2. Mutation : SQL의 CREATE, UPDATE, DELETE 와 같이 데이터 조작 로직

const resolvers = {
  Query: {
    fetchBoard: () => {
      // 1) 데이터를 조회하는 로직 -> DB 접속 후 데이터 꺼내오기
      const result = [
        { number: 1, writer: "철수", title: "제목1", contents: "내용1" },
        { number: 2, writer: "영희", title: "제목2", contents: "내용2" },
        { number: 3, writer: "훈이", title: "제목3", contents: "내용3" },
      ];
      // 2) 꺼내온 결과 응답주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1) 데이터를 조회하는 로직 -> DB 접속 후 데이터 꺼내오기
      console.log(args);
      // 2) 저장결과 알려주기
      return "등록에 성공하였습니다!";
    },
    createBoard2: (_, args) => {
      // 1) 데이터를 조회하는 로직 -> DB 접속 후 데이터 꺼내오기
      console.log(args);
      // 2) 저장결과 알려주기
      return "등록에 성공하였습니다!";
    },
  },
};

// <아폴로 서버 객체>
// new ApolloServer({typeDefs: typeDefs, resolvers: resolvers})
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// <서버 listening>
server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

//
/** [수업 내용 필기] (포스팅용)
 * 서버 안에 내용은 크게 두개로 분류됨. 1. typeDefs, 2. resolvers
 * 1. typeDefs : 기능 관련 설명서.
 *    1) type과 2) input으로 구성. 기본적으로 type Query 와 type Mutation을 넣어주어야함. 아래의 resolvers 안에 그 두 기능이 기본으로 들어갈테니 그 기능에 대한 설명서를 적는것.
 *    1) type
 *    - 코드 예 1
 *    ```type A { a1 : String } ```
 *    => A 쿼리문에서 a1 기능 실행시 반환하는 타입 : String
 *
 *    - 코드 예 2
 *    ```type B { b1(ccc: String, ddd: Int): String,
 *                b2(zzz: yyy ): Int }```
 *    => B 쿼리문에서 b1 실행하면서 ccc와 ddd를 주면 반환 결과물은 String일건데, ccc 타입은 String, ddd 타입은 Int여야 함.
 *    => B 쿼리문에서 b2 실행하면서 zzz를 주면 반환 결과물은 Int일건데, zzz는 yyy 타입이어야함 (yyy는 내가만든 객체야. 따로 input yyy로 설명할게.)
 *    2) input
 *    - 코드 예 1
 *    ```input yyy {
 *         y1 : String!
 *         y2 : Int
 *         y3 : String
 *         }
 *    => 내가 만든 yyy라는 인풋 타입! yyy 조건으로 인풋하라고하면, {y1, y2, y3}가 들어있는 객체를 달라는거야. y1는 String이고 !가 붙은건 필수로 필요하단거. y2는 Int, y3는 String으로 주어져야함.
 *
 * 2. resolvers : 실질적으로 가진 기능. 1) Query, 2) Mutation 등 으로 구성.
 *    1) Query (= READ)
 *    - 구성
 *    Query: {
 *            조회 명령어 1 :  () => {'조회 명령어 1' 실행시 진행할 함수 내용},
 *            조회 명령어 2 :  () => {'조회 명령어 2' 실행시 진행할 함수 내용},
 *            ...
 *    }
 *
 *    2) Mutation (= CREATE, UPDATE, DELETE)
 *    - 구성
 *    Mutation: {
 *            조작 명령어 1 :  (다른 api에서 받아올 값) => {'조작 명령어 1' 실행시 진행할 함수 내용},
 *            조작 명령어 2 :  (frontend에서 받아올 값) => {'조작 명령어 2' 실행시 진행할 함수 내용}
 *    }
 *
 *    - 코드 예
 *    ```Mutation {
 *         createBoard: (parent, args, context, info) => { createBoard 함수 내용 },```
 *         deleteBoard: (parent, args, context, info) => { deleteBoard 함수 내용 },
 *       }```
 *    > 파라미터 설명
 *      - parent : api에서 api 부를때 (Ex: fetchBoard 위 함수 괄호 안에서 createBoard() 함수를 부른다거나 하면 parent에서 그 값을 받음.)
 *      - args : 프론트엔드에서 값을 받는 자리.
 *      => 뒤의 context, info는 여기서 안쓰므로 지우고, parent같은 경우는 안쓰지만 순서때문에 있어야하므로 _  언더바로 표기.
 **/
//
