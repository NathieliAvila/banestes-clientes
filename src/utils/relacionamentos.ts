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
            avisos.push(`Conta sem cliente / com cpf inexistente: ${conta.id}\n CpfCnfj: ${conta.cpfCnpjCliente}`);
        }
    });

    dados.clientes.forEach(cliente => {
        const existe = dados.agencias.some(agencia => {
            return cliente.codigoAgencia === agencia.codigo
        });

        if(!existe) {
            avisos.push(`Cliente com agência inexistente: ${cliente.id}\n Código: ${cliente.codigoAgencia}`);
        }
    })

    return avisos;
} 

