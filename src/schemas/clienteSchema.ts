import {z} from "zod";
import { cpfCnpjTemTamanhoValido, normalizarCpfCnpj, paraData } from "../utils/conversores";
import { ESTADOS_CIVIS } from "../utils/normalizacao";

export const clienteSchema = z.object({
    nome: z.string().min(3, "Informe o nome"),
    nomeSocial: z.string().optional(),
    dataNascimento: z.string().refine(valor => {try {
        paraData(valor)
    } catch (error) {

    }}, "Informe uma data nascimento válida."),
    cpfCnpj: z.string().refine(valor => cpfCnpjTemTamanhoValido(normalizarCpfCnpj(valor)), "CPF/CNPJ deve ter 11 ou 14 dígitos."),
    rg: z.string().optional(),
    estadoCivil: z.enum(ESTADOS_CIVIS, "Selecione uma das opções."),
    email: z.email("E-mail inválido"),
    endereco: z.string().min(1, "Preencha o campo de endereço, por favor."),
    rendaAnual: z.string().refine(
        valor => valor.trim() !== "" && !Number.isNaN(Number(valor)) && Number(valor) >= 0, "Informe um valor maior ou igual a zero."
    )
    
});