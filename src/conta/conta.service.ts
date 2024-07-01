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

depositar(valor: number): void {
   
  }

  sacar(valor: number): void {
    
  }

  verificarSaldo(): number {
  
  }

  transferir(destino: ContaBancaria, valor: number): void {
   
}
