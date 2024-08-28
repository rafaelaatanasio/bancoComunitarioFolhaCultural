import { Conta } from './conta.entity';
import { NovaConta } from 'src/domain/interfaces/novaConta.interface'; 

export class ContaPoupanca extends Conta implements NovaConta {}