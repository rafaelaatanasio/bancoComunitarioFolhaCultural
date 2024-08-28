import { Injectable, BadRequestException } from '@nestjs/common';
import { ContasService } from './conta.service';
import { ContaCorrente } from 'src/domain/entities/contaCorrente.entity';

@Injectable()
export class PagamentoService {
    realizarPagamento(clienteId: number, contaNumero: number, valor: number) {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly contasService: ContasService) { }

    pagarPorPIX(clienteId: number, contaNumero: number, valor: number, chavePIX: string): void {
        const conta = this.contasService.buscarConta(clienteId, contaNumero);
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

    pagarPorBoleto(clienteId: number, contaNumero: number, valor: number, numeroBoleto: string): void {
        const conta = this.contasService.buscarConta(clienteId, contaNumero);
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