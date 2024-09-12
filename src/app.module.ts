import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/entities/cliente.entity';
import { Conta } from './domain/entities/conta.entity';
import { ContaCorrente } from './domain/entities/contaCorrente.entity';
import { ContaPoupanca } from './domain/entities/contaPoupanca.entity';
import { Gerente } from './domain/entities/gerente.entity';
import { ClientesService } from './domain/services/cliente.service';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'users',
      username: 'rafaela',
      password: 'User123',
      entities: [Cliente, Conta, ContaCorrente, ContaPoupanca, Gerente],
      synchronize: true,
    }),
    DomainModule, ApplicationModule],
  controllers: [],
  providers: [ClientesService]
})
export class AppModule { }
