import { Injectable } from '@nestjs/common';

// criar/definir a classe conta
@Injectable()
export class ContaService {}

export class ContaBancaria{
    constructor(
    public tipo: string,
    public saldo: number,
    public clienteId: string,
    )
}

