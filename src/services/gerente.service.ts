import { BadRequestException, Injectable } from '@nestjs/common';
import { Gerente } from 'src/modules/gerente.module';
import { Cliente } from 'src/modules/cliente.module';
import { ConcreteContaFactory, Conta, ContaFactory, TipoConta } from 'src/modules/conta.module';

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
        if (!cliente) throw new BadRequestException('Cliente não encontrado');
        return cliente;
    }

    // Usar BadRequestException ao invés de Error proporciona um erro mais informativo e específico
    // dentro do contexto do NestJS

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
        const gerente = this.buscarGerentePorId(gerenteId);
        const factory = new ConcreteContaFactory();  // Criando uma instância da factory
        const novaConta = factory.criarConta(tipo, cliente);  // Criando a conta usando a factory
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

//Refatoração em sugestão da prof
// removerCliente, abrirConta, fecharConta e modificarTipoConta utilizam o método buscarCliente
//para evitar a duplicação de código.