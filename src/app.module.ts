import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'users',
      username: 'rafaela',
      password: 'User123',
      entities: [],
      synchronize: true,
    }),
    DomainModule, ApplicationModule],
  controllers: [],
  providers: []
})
export class AppModule { }
