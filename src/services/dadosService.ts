import type { Cliente, Conta, Agencia, DadosCarregados} from "../types";
import { normalizarAgencias, normalizarClientes, normalizarContas } from "../utils/normalizacao";
import { buscarCsv, parsearCsv } from "./csvService";

const criarURL = (aba: string): string => {
    return `https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=${aba}`;
}

 /* Recebe o nome da planilha e a lista de avisos. Devolve a lista com o prefixo.*/
export function comOrigem(origem: string, avisos: string[]): string[] {
    return avisos.map(texto => `${origem} - ${texto}`)
}

export async function carregarDados(): Promise<DadosCarregados> {

    const clientesUrl = criarURL("clientes");
    const contasUrl = criarURL("contas");
    const agenciasUrl = criarURL("agencias");

    const [textoCliente, textoConta, textoAgencia] = await Promise.all([buscarCsv(clientesUrl), buscarCsv(contasUrl), buscarCsv(agenciasUrl)]);

    const linhasClientes: Record<string, string>[] = parsearCsv(textoCliente);
    const linhasContas: Record<string, string>[] = parsearCsv(textoConta);
    const linhasAgencias: Record<string, string>[] = parsearCsv(textoAgencia);

    const resultadoClientes = normalizarClientes(linhasClientes);
    const resultadoContas = normalizarContas(linhasContas);
    const resultadoAgencias = normalizarAgencias(linhasAgencias);
    const clientesAviso = comOrigem("Clientes", resultadoClientes.avisos);
    const contasAviso = comOrigem("Contas", resultadoContas.avisos);
    const agenciasAviso = comOrigem("Agencias", resultadoAgencias.avisos);

    return{clientes: resultadoClientes.clientes, contas: resultadoContas.contas, agencias: resultadoAgencias.agencias, avisos: [...clientesAviso, ...contasAviso, ...agenciasAviso]};

}


