import type { Cliente } from "../types";
import type { DadosFormulario } from "../schemas/clienteSchema";
import { normalizarCpfCnpj, paraData, paraNumero, textoOpcional } from "./conversores";

export function dadosParaCliente(dados: DadosFormulario): Cliente {
    return {
        id: crypto.randomUUID(),
        cpfCnpj: normalizarCpfCnpj(dados.cpfCnpj),
        rg: textoOpcional(dados.rg),
        dataNascimento: paraData(dados.dataNascimento),
        nome: dados.nome.trim(),
        nomeSocial: textoOpcional(dados.nomeSocial),
        email: dados.email.trim(),
        endereco: dados.endereco.trim(),
        rendaAnual: paraNumero(dados.rendaAnual),
        patrimonio: paraNumero(dados.patrimonio),
        estadoCivil: dados.estadoCivil,
        codigoAgencia: paraNumero(dados.codigoAgencia)


    }
}