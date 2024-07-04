// src/modules/contas/contas.service.ts
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
            conta = new ContaCorrente(clienteId, cliente);
        } else {
            conta = new ContaPoupanca(clienteId, cliente);
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
        const contaDestino = this.buscarConta(clienteIdDestino, contaNumeroDestino);
        if (!contaOrigem || !contaDestino) throw new BadRequestException('Conta não encontrada');
        contaOrigem.transferir(valor, contaDestino);
    }

    buscarConta(clienteId: number, contaNumero: number): Conta {
        const cliente = this.clientesService.buscarClientePorId(clienteId);
        if (!cliente) throw new BadRequestException('Cliente não encontrado');
        const conta = cliente.contas.find(conta => conta.numero === contaNumero);
        if (!conta) throw new BadRequestException('Conta não encontrada');
        return conta;
    }
}
