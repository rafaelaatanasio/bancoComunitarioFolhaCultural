import { Injectable } from '@nestjs/common';

@Injectable()
export class ContaService { }

export class ContaBancaria {
    constructor(
        public tipo: string,
        public saldo: number,
        public clienteId: string,
    ) { }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): void {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            throw new Error('Saldo insuficiente');
        }
    }

    verificarSaldo(): number {
        return this.saldo;
    }

    transferir(destino: ContaBancaria, valor: number): void {
        this.sacar(valor);
        destino.depositar(valor);
    }
}

export class ContaCorrente extends ContaBancaria {
    constructor(
        saldo: number,
        clienteId: string,
        public chequeEspecial: number,
    ) {
        super('ContaCorrente', saldo, clienteId);
    }
}

export class ContaPoupanca extends ContaBancaria {
    constructor(
        saldo: number,
        clienteId: string,
        public taxaJuros: number,
    ) {
        super('ContaPoupanca', saldo, clienteId);
    }

    calcularTaxa(): number {
        return this.saldo * this.taxaJuros;
    }
}