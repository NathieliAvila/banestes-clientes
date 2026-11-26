import type { Cliente, Agencia, Conta, DadosCarregados } from "../types"

import { cpfCnpjTemTamanhoValido } from "./conversores";

/* Devolve as contas em que o cpfCnpj do cliente são iguais */
export function contasDoCliente(contas: Conta[], cpfCnpj: string): Conta[]{
    return contas.filter((conta) => conta.cpfCnpjCliente === cpfCnpj);
    
}  


export function agenciaDoCliente(agencias: Agencia[], codigoDaAgencia: number): Agencia | undefined {
    return agencias.find((agencia) => agencia.codigo === codigoDaAgencia);
}

/* Verifica se as contas possuem um cpfCnpj associado e se os clientes estão associados a uma agência existente. Se não, retorna um aviso indicando o id */
export function verificarReferencias(dados: DadosCarregados): string[]{
    const avisos: string[] = [];
        
    dados.contas.forEach(conta => {
        const existe = dados.clientes.some(cliente => {
            return conta.cpfCnpjCliente === cliente.cpfCnpj
        });

        if(!existe) {
            avisos.push(`Conta sem cliente / com cpf inexistente: ${conta.id} (CpfCnpj: ${conta.cpfCnpjCliente})`);
        }
    });

    dados.clientes.forEach(cliente => {
        const existe = dados.agencias.some(agencia => {
            return cliente.codigoAgencia === agencia.codigo
        });

        if(!existe) {
            avisos.push(`Cliente com agência inexistente: ${cliente.id} Código: ${cliente.codigoAgencia}`);
        }
    })

    return avisos;
} 

/* Verifica se os clientes possuem cpf/cnpj com tamanhos válidos e retorna aqueles que não tem */
export function verificarDocumentos(clientes: Cliente[]): string[] {
    return clientes.filter(cliente => !cpfCnpjTemTamanhoValido(cliente.cpfCnpj)).map(cliente => `Cliente ${cliente.id}: CPF/CNPJ com ${cliente.cpfCnpj.length} dígitos ${cliente.cpfCnpj}`);
    

}
