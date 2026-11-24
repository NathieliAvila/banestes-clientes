import type { Agencia, Conta, DadosCarregados } from "../types"

/* Devolve as contas em que o cpfCnpj do cliente são iguais */
export function contasDoCliente(contas: Conta[], cpfCnpj: string): Conta[]{
    return contas.filter((conta) => conta.cpfCnpjCliente === cpfCnpj);
    
}  

export function agenciaDoCliente(agencias: Agencia[], codigoDaAgencia: number): Agencia | undefined {
    return agencias.find((agencia) => agencia.codigo === codigoDaAgencia);
}

export function verificarReferencias(dados: DadosCarregados): string[]{

    const avisos: string[] = [];
        
    dados.contas.forEach(conta => {
        const existe = dados.clientes.some(cliente => {
            return conta.cpfCnpjCliente === cliente.cpfCnpj
        });

        if(!existe) {
            avisos.push(`Conta sem cliente / com cpf inexistente: ${conta.id}`);
        }
    });

    dados.clientes.forEach(cliente => {
        const existe = dados.agencias.some(agencia => {
            return cliente.codigoAgencia === agencia.codigo
        });

        if(!existe) {
            avisos.push(`Cliente com agência inexistente: ${cliente.id}`);
        }
    })

    return avisos;
} 

/* 
Recebe clientes, contas e agências, e devolve uma lista de avisos com:

cada conta cujo cpfCnpjCliente não pertence a nenhum cliente;
cada cliente cujo codigoAgencia não existe nas agências.

*/