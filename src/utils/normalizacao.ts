import type { Cliente, Agencia, Conta} from "../types";
import { paraData, paraNumero, textoOpcional, normalizarCpfCnpj } from "./conversores";

export const ESTADOS_CIVIS = ["Solteiro", "Casado", "Viúvo", "Divorciado"] as const;
type EstadoCivil = (typeof ESTADOS_CIVIS) [number];

const TIPO_CONTA = ["corrente", "poupanca"] as const;
type TipoConta = (typeof TIPO_CONTA) [number];


function textoObrigatorio(valor: string | undefined, nomeDoCampo: string): string {
    if (valor === undefined || valor.trim() === "") throw new Error(`Campo obrigatório vazio: ${nomeDoCampo}`);
    return valor.trim();
}

//Verifica se estadoCivil está preenchido com opções válidas (definidas em ESTADOS_CIVIS).
function paraEstadoCivil(valor: string | undefined): EstadoCivil {
    const limpo = valor?.trim().toLowerCase();
    const achada = ESTADOS_CIVIS.find(c => c.toLowerCase() === limpo);
    if (achada === undefined) throw new Error(`Estado civil inválido: ${valor}`);
    return achada;
}

/* Funções que normalizam os campos de Cliente, Agencia e Conta */

function normalizarCliente(linha: Record<string, string>): Cliente {
    return {
        id: textoObrigatorio(linha.id, "id"),
        cpfCnpj: normalizarCpfCnpj(textoObrigatorio(linha.cpfCnpj, "cpfCnpj")),
        rg: textoOpcional(linha.rg),
        dataNascimento: paraData(linha.dataNascimento),
        nome: textoObrigatorio(linha.nome, "nome"),
        nomeSocial: textoOpcional(linha.nomeSocial),
        email: textoObrigatorio(linha.email, "email"),
        endereco: textoObrigatorio(linha.endereco, "endereco"),
        rendaAnual: paraNumero(linha.rendaAnual),
        patrimonio: paraNumero(linha.patrimonio),
        estadoCivil: paraEstadoCivil(linha.estadoCivil),
        codigoAgencia: paraNumero(linha.codigoAgencia)
    };
}

export function normalizarClientes(linhas: Record<string, string>[]): {clientes: Cliente[], avisos: string[]} {
    const clientes: Cliente[] = [];
    const avisos: string[] = [];

    //Normaliza todas as linhas. Adiciona linha a 'avisos' caso haja algo errado.
    linhas.forEach((linha, indice) => {
        try {
            clientes.push(normalizarCliente(linha));
        } catch (error) {
            const motivo = error instanceof Error ? error.message: String(error);
            avisos.push(`Linha ${indice + 2}: ${motivo}`);
        }
    });
    return {clientes, avisos};
}


function normalizarAgencia(linha: Record<string, string>): Agencia {
    return{
        id: textoObrigatorio(linha.id, "id"),
        codigo: paraNumero(linha.codigo),
        nome: textoObrigatorio(linha.nome, "nome"),
        endereco: textoObrigatorio(linha.endereco, "endereco")
    };

}

export function normalizarAgencias(linhas: Record<string, string>[]): {agencias: Agencia[], avisos: string[]} {
    const agencias: Agencia[] = [];
    const avisos: string[] = [];
    linhas.forEach((linha, indice) => {
        try {
            agencias.push(normalizarAgencia(linha));
        } catch (error) {
            const motivo = error instanceof Error ? error.message: String(error);
            avisos.push(`Linha ${indice + 2}: ${motivo}`);
        }
        });
    return {agencias, avisos};
}


function paraTipoConta(valor: string | undefined): TipoConta {
    const limpo = valor?.trim().toLowerCase();
    const achada = TIPO_CONTA.find(c => c.toLowerCase() === limpo);
    if (achada === undefined) throw new Error(`Tipo de conta inválido: ${valor}`);
    return achada;
}

function normalizarConta(linha: Record<string, string>): Conta {
    return{
        id: textoObrigatorio(linha.id, "id"),
        cpfCnpjCliente: normalizarCpfCnpj(textoObrigatorio(linha.cpfCnpjCliente, "cpfCnpjCliente")),
        tipo: paraTipoConta(linha.tipo),
        saldo: paraNumero(linha.saldo),
        limiteCredito: paraNumero(linha.limiteCredito),
        creditoDisponivel: paraNumero(linha.creditoDisponivel)
    };
}

export function normalizarContas(linhas: Record<string, string>[]): {contas: Conta[], avisos: string[]} {
    const contas: Conta[] = [];
    const avisos: string[] = [];
    linhas.forEach((linha, indice) => {
        try {
            contas.push(normalizarConta(linha));
        } catch (error) {
            const motivo = error instanceof Error ? error.message: String(error);
            avisos.push(`Linha ${indice + 2}: ${motivo}`);
        }
    });
    return {contas, avisos};
}