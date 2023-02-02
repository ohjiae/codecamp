import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

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
    fetchBoard: [BoardReturn] # 배열 안에 객체 1개 이상을 의미
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    createBoard2(createBoardInput: CreateBoardInput): String
    createTokenOfPhone(myphone: String): String
  }
`;

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
    createTokenOfPhone: (_, args) => {
      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(args.myphone);

      if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken();

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(args.myphone, mytoken);
        return "인증완료!";
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
