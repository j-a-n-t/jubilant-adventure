import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLFormattedError } from 'graphql/error';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true,
      useGlobalPrefix: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      formatError: (formattedError: GraphQLFormattedError) => {
        return {
          message: formattedError.message,
          extensions: { code: formattedError.extensions.code },
        };
      },
    }),
    MongooseModule.forRoot(
      'mongodb://mongo-task:1uyZewMf6jMRgJuGBR6N@localhost:27017/task'
    ),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
