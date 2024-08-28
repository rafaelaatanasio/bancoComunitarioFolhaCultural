import { Cliente } from './cliente.entity';
import { Conta } from './conta.entity';
import { NovaConta } from 'src/domain/interfaces/novaConta.interface';

export class ContaCorrente extends Conta implements NovaConta {
  private limiteChequeEspecial: number;

  constructor(numero: number, cliente: Cliente, limiteChequeEspecial: number = 0) {
    super(numero, cliente);
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  getLimiteChequeEspecial(): number {
    return this.limiteChequeEspecial;
  }

  setLimiteChequeEspecial(limite: number): void {
    this.limiteChequeEspecial = limite;
  }
}
