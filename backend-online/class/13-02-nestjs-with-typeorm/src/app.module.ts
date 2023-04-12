import { Module } from "@nestjs/common"
import { BoardModule } from "./apis/boards/boards.module"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Board } from "./apis/boards/entities/board.entity"

@Module({
    imports: [
        BoardModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "myproject03",
            entities: [Board],
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
