import type { Cliente } from "../types";
import { paraData, paraNumero, textoOpcional } from "./conversores";

const categorias = ["Solteiro", "Casado", "Viúvo", "Divorciado"] as const;
type estadoCivil = (typeof categorias) [number];

function textoObrigatorio(valor: string | undefined, nomeDoCampo: string): string {
    if (valor === undefined || valor.trim() === "") throw new Error(`Campo obrigatório vazio: ${nomeDoCampo}`);
    return valor.trim();

}

function paraEstadoCivil(valor: string | undefined): estadoCivil {
    const limpo = valor?.trim().toLowerCase();
    const achada = categorias.find(c => c.toLowerCase() === limpo);
    if (achada === undefined) throw new Error(`Estado civil inválido: ${valor}`);
    return achada;
}

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

