import type { Agencia, Conta } from "../types"

/* Devolve as contas em que o cpfCnpj do cliente são iguais */
export function contasDoCliente(contas: Conta[], cpfCnpj: string): Conta[]{
    return contas.filter((conta) => conta.cpfCnpjCliente === cpfCnpj);
    
}  

export function agenciaDoCliente(agencias: Agencia[], codigoDaAgencia: number): Agencia | undefined {
    return agencias.find((agencia) => agencia.codigo === codigoDaAgencia);
}

/* export function verificarReferencias(dados): string[]{

} */