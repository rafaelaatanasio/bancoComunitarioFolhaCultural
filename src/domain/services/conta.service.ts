import { Injectable, BadRequestException } from '@nestjs/common';
import { Conta } from 'src/domain/entities/conta.entity';
import { ContaCorrente } from 'src/domain/entities/conta.entity';
import { ContaPoupanca } from 'src/domain/entities/conta.entity';
import { ClientesService } from './cliente.service';

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
        conta.depositar(valor);
    }

    sacar(clienteId: number, contaNumero: number, valor: number): void {
        const conta = this.buscarConta(clienteId, contaNumero);
        conta.sacar(valor);
    }

    transferir(clienteId: number, contaNumero: number, valor: number, contaDestinoId: number, contaDestinoNumero: number): void {
        const conta = this.buscarConta(clienteId, contaNumero);
        const contaDestino = this.buscarConta(contaDestinoId, contaDestinoNumero);
        conta.transferir(valor, contaDestino);
    }

    buscarConta(clienteId: number, contaNumero: number): Conta {
        const cliente = this.clientesService.buscarClientePorId(clienteId);
        if (!cliente) throw new BadRequestException('Cliente não encontrado');

        const conta = cliente.contas.find(conta => conta.numero === contaNumero);
        if (!conta) throw new BadRequestException('Conta não encontrada');

        return conta;
    }
}