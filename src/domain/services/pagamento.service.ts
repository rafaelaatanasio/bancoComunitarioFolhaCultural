import { Injectable, BadRequestException } from '@nestjs/common';
import { ContasService } from './conta.service';
import { ContaCorrente } from '../../domain/entities/contaCorrente.entity';

@Injectable()
export class PagamentoService {
  constructor(
    private readonly contasService: ContasService
  ) {}

  async realizarPagamento(clienteId: string, contaNumero: number, valor: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async pagarPorPIX(clienteId: string, contaNumero: number, valor: number, chavePIX: string): Promise<void> {
    const conta = await this.contasService.buscarConta(clienteId, contaNumero);
    if (!conta) throw new BadRequestException('Conta não encontrada');

    let limiteChequeEspecial = 0;
    if (conta instanceof ContaCorrente) {
      limiteChequeEspecial = conta.getLimiteChequeEspecial();
    }

    if (conta.consultarSaldo() + limiteChequeEspecial < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    conta.sacar(valor);
    console.log(`Pagamento de R$${valor} realizado via PIX para a chave ${chavePIX}`);
  }

  async pagarPorBoleto(clienteId: string, contaNumero: number, valor: number, numeroBoleto: string): Promise<void> {
    const conta = await this.contasService.buscarConta(clienteId, contaNumero);
    if (!conta) throw new BadRequestException('Conta não encontrada');

    let limiteChequeEspecial = 0;
    if (conta instanceof ContaCorrente) {
      limiteChequeEspecial = conta.getLimiteChequeEspecial();
    }

    if (conta.consultarSaldo() + limiteChequeEspecial < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    conta.sacar(valor);
    console.log(`Pagamento de R$${valor} realizado via boleto número ${numeroBoleto}`);
  }
}
