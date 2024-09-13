import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipoConta.enum';
import { ContaCorrente } from '../entities/contaCorrente.entity';
import { ContaPoupanca } from '../entities/contaPoupanca.entity';
import { Cliente } from '../entities/cliente.entity';

export class ConcreteContaFactory {
  criarConta(tipo: TipoConta, cliente: Cliente): Conta {
    const numero = 123;
    switch (tipo) {
        case TipoConta.Corrente:
          return new ContaCorrente(numero, cliente);
        case TipoConta.Poupanca:
          return new ContaPoupanca(numero, cliente);
        default:
          throw new Error('Tipo de conta inválido');
      }
    }
  }
  
   