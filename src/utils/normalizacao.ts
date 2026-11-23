import type { Cliente, Agencia } from "../types";
import { paraData, paraNumero, textoOpcional } from "./conversores";

function textoObrigatorio(valor: string | undefined, nomeDoCampo: string): string {
    if (valor === undefined || valor.trim() === "") throw new Error(`Campo obrigatório vazio: ${nomeDoCampo}`);
    return valor.trim();
}

function paraEstadoCivil(valor: string | undefined): EstadoCivil {
    const limpo = valor?.trim().toLowerCase();
    const achada = ESTADOS_CIVIS.find(c => c.toLowerCase() === limpo);
    if (achada === undefined) throw new Error(`Estado civil inválido: ${valor}`);
    return achada;
}

const ESTADOS_CIVIS = ["Solteiro", "Casado", "Viúvo", "Divorciado"] as const;
type EstadoCivil = (typeof ESTADOS_CIVIS) [number];
export function normalizarCliente(linha: Record<string, string>): Cliente {
    return {
        id: textoObrigatorio(linha.id, "id"),
        cpfCnpj: textoObrigatorio(linha.cpfCnpj, "cpfCnpj"),
        rg: textoOpcional(linha.rg),
        dataNascimento: paraData(linha.dataNascimento),
        nome: textoObrigatorio(linha.nome, "nome"),
        nomeSocial: textoOpcional(linha.nomeSocial),
        email: textoObrigatorio(linha.email, "email"),
        endereco: textoObrigatorio(linha.endereco, "endereco"),
        rendaAnual: paraNumero(linha.rendaAnual),
        patrimonio: paraNumero(linha.patrimonio),
        estadoCivil: paraEstadoCivil(linha.estadoCivil),
        codigoAgencia: paraNumero(linha.codigoAgencia),
    };

}

export function normalizarClientes(linhas: Record<string, string>[]): {clientes: Cliente[], avisos: string[]} {
    const clientes: Cliente[] = [];
    const avisos: string[] = [];

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

export function NormalizarAgencia(linha: Record<string, string>): Agencia {
    return{
        id: textoObrigatorio(linha.id, "id"),
        codigo: paraNumero(linha.codigo),
        nome: textoObrigatorio(linha.nome, "nome"),
        endereco: textoObrigatorio(linha.endereco, "endereco"),
    };

}

export function NormalizarAgencias(linhas: Record<string, string>[]): {agencias: Agencia[], avisos: string[]} {
    const agencias: Agencia[] = [];
    const avisos: string[] = [];
    linhas.forEach((linha, indice) => {
        try {
            agencias.push(NormalizarAgencia(linha));
        } catch (error) {
            const motivo = error instanceof Error ? error.message: String(error);
            avisos.push(`Linha ${indice + 2}: ${motivo}`);
        }
        });
    return {agencias, avisos};
}
