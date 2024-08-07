import { ApolloDriverConfig } from './../node_modules/@nestjs/apollo/dist/interfaces/apollo-driver-config.interface.d';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validator';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthorDataLoaderCommand } from './command/author-data-loader.command';
// import { BookDataLoaderCommand } from './command/book-data-loader.command';
import { CommandRunnerModule } from 'nest-commander';
// import { DataLoaderCommand } from './command/load-all.command';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthorModule,
    BookModule,
    UserModule,
    // CommandRunnerModule,
  ],
  providers: [
    // DataLoaderCommand,
    // AuthorDataLoaderCommand,
    // BookDataLoaderCommand,
  ],
})
export class AppModule {}
