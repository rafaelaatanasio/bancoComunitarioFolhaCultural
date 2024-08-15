import { Injectable } from '@nestjs/common';
import { Gerente } from 'src/modules/gerente.module';
import { Cliente } from 'src/modules/cliente.module';
import { Conta } from 'src/modules/conta.module';

@Injectable()
export class GerentesService {
    private gerentes: Gerente[] = [];

    criarGerente(nome: string, id: number): Gerente {
        const gerente = new Gerente(nome, id);
        this.gerentes.push(gerente);
        return gerente;
    }

    buscarGerentePorId(id: number): Gerente {
        return this.gerentes.find(gerente => gerente.id === id);
    }

    private buscarCliente(gerenteId: number, clienteId: number): Cliente {
        /* refatorei para não utilizar tantos 'if's'
        encapsula a lógica de buscar um cliente específico associado a um
        gerente e lançar uma exceção se o cliente não for encontrado. */
        const gerente = this.buscarGerentePorId(gerenteId);
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) throw new Error('Cliente não encontrado');
        return cliente;
    }

    adicionarCliente(gerenteId: number, cliente: Cliente): void {
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.adicionarCliente(cliente);
    }

    removerCliente(gerenteId: number, clienteId: number): void {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.removerCliente(clienteId);
    }

    abrirConta(gerenteId: number, tipo: 'corrente' | 'poupanca', clienteId: number): Conta {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        return gerente.abrirConta(tipo, cliente);
    }

    fecharConta(gerenteId: number, clienteId: number, contaNumero: number): void {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.fecharConta(cliente, contaNumero);
    }

    modificarTipoConta(gerenteId: number, clienteId: number, contaNumero: number, novoTipo: 'corrente' | 'poupanca'): Conta {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        return gerente.modificarTipoConta(cliente, contaNumero, novoTipo);
    }
}

//Refatoração em sugestão da prof
// removerCliente, abrirConta, fecharConta e modificarTipoConta utilizam o método buscarCliente
//para evitar a duplicação de código.