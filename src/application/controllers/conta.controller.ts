import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContasService } from '../../domain/services/conta.service';
import { PagamentoService } from '../../domain/services/pagamento.service';
import { Conta } from 'src/domain/entities/conta.entity';
import { CreateContaDto } from '../dtos/account/create-conta.dto';
import { DepositarDto } from '../dtos/account/depositar.dto';
import { SacarDto } from '../dtos/account/sacar.dto';
import { TransferirDto } from '../dtos/account/transferir.dto';
import { PagarDto } from '../dtos/account/pagar.dto';

@Controller('contas')
export class ContasController {
  constructor(
    private readonly contasService: ContasService,
    private readonly pagamentoService: PagamentoService
  ) { }

  @Post()
  criarConta(@Body() createContaDto: CreateContaDto): Conta {
    const { clienteId, tipo } = createContaDto;
    return this.contasService.criarConta(clienteId, tipo);
  }

  @Post('depositar')
  depositar(@Body() depositarDto: DepositarDto): void {
    const { clienteId, contaNumero, valor } = depositarDto;
    this.contasService.depositar(clienteId, contaNumero, valor);
  }

  @Post('sacar')
  sacar(@Body() sacarDto: SacarDto): void {
    const { clienteId, contaNumero, valor } = sacarDto;
    this.contasService.sacar(clienteId, contaNumero, valor);
  }

  @Post('transferir')
  transferir(@Body() transferirDto: TransferirDto): void {
    const { clienteId, contaNumero, valor, contaDestinoId, contaDestinoNumero } = transferirDto;
    this.contasService.transferir(clienteId, contaNumero, valor, contaDestinoId, contaDestinoNumero);
  }

  @Post('pagar')
  pagar(@Body() pagarDto: PagarDto): void {
    const { clienteId, contaNumero, valor } = pagarDto;
    this.pagamentoService.realizarPagamento(clienteId, contaNumero, valor);
  }
}
