import { BadRequestException, Injectable } from '@nestjs/common';
import { Gerente } from 'src/domain/entities/gerente.entity';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { ConcreteContaFactory, Conta} from 'src/domain/entities/conta.entity';
import { TipoConta } from 'src/domain/enums/tipoConta.enum';

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
        const gerente = this.buscarGerentePorId(gerenteId);
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) throw new BadRequestException('Cliente não encontrado');
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

    abrirConta(gerenteId: number, tipo: TipoConta, clienteId: number): Conta {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const factory = new ConcreteContaFactory(); 
        const novaConta = factory.criarConta(tipo, cliente);
        // Verificação de tipo, para garantir que é uma instância de Conta
        if (!(novaConta instanceof Conta)) {
            throw new Error('Erro: O objeto criado não é uma instância de Conta.');
        }
        cliente.contas.push(novaConta);
        return novaConta;
    }

    fecharConta(gerenteId: number, clienteId: number, contaNumero: number): void {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        gerente.fecharConta(cliente, contaNumero);
    }

    modificarTipoConta(gerenteId: number, clienteId: number, contaNumero: number, novoTipo: TipoConta): Conta {
        const cliente = this.buscarCliente(gerenteId, clienteId);
        const gerente = this.buscarGerentePorId(gerenteId);
        return gerente.modificarTipoConta(cliente, contaNumero, novoTipo);
    }
}