import { Injectable, BadRequestException } from '@nestjs/common';
import { Conta } from '../../classes/conta';
import { ContaCorrente } from '../../classes/contaCorrente';
import { ContaPoupanca } from '../../classes/contaPoupanca';
import { ClientesService } from '../cliente/cliente.service';

@Injectable()
export class ContasService {
    constructor(private readonly clientesService: ClientesService) { }

    criarConta(clienteId: number, tipo: 'corrente' | 'poupanca'): Conta {
        const cliente = this.clientesService.buscarClientePorId(clienteId);
        if (!cliente) throw new BadRequestException('Cliente não encontrado');

        let conta: Conta;
        if (tipo === 'corrente') {
            if (cliente.rendaSalarial < 500) throw new BadRequestException('Renda insuficiente para abrir conta corrente');
            conta = new ContaCorrente(this.gerarNumeroConta(), cliente);
        } else {
            conta = new ContaPoupanca(this.gerarNumeroConta(), cliente);
        }

        cliente.contas.push(conta);
        return conta;
    }

    depositar(clienteId: number, contaNumero: number, valor: number): void {
        const conta = this.buscarConta(clienteId, contaNumero);
        if (!conta) throw new BadRequestException('Conta não encontrada');
        conta.depositar(valor);
    }

    sacar(clienteId: number, contaNumero: number, valor: number): void {
        const conta = this.buscarConta(clienteId, contaNumero);
        if (!conta) throw new BadRequestException('Conta não encontrada');
        conta.sacar(valor);
    }

    transferir(clienteIdOrigem: number, contaNumeroOrigem: number, clienteIdDestino: number, contaNumeroDestino: number, valor: number): void {
        const contaOrigem = this.buscarConta(clienteIdOrigem, contaNumeroOrigem);
        if (!contaOrigem) throw new BadRequestException('Conta de origem não encontrada');
        const contaDestino = this.buscarConta(clienteIdDestino, contaNumeroDestino);
        if (!contaDestino) throw new BadRequestException('Conta de destino não encontrada');
        contaOrigem.transferir(valor, contaDestino);
    }

    private buscarConta(clienteId: number, contaNumero: number): Conta {
        const cliente = this.clientesService.buscarClientePorId(clienteId);
        if (!cliente) throw new BadRequestException('Cliente não encontrado');
        return cliente.contas.find(conta => conta.numero === contaNumero);
    }

    private gerarNumeroConta(): number {
        return Math.floor(Math.random() * 1000000);
    }
}
