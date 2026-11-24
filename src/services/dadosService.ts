import type { Cliente, Conta, Agencia, DadosCarregados} from "../types";
import { normalizarAgencias, normalizarClientes, normalizarContas } from "../utils/normalizacao";
import { buscarCsv, parsearCsv } from "./csvService";

const criarURL = (aba: string): string => {
    return `https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=${aba}`;
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
    const clientesAviso = resultadoClientes.avisos.map(texto => `Clientes - ${texto}`);
    const contasAviso = resultadoContas.avisos.map(texto => `Contas - ${texto}`);
    const agenciasAviso = resultadoAgencias.avisos.map(texto => `Clientes - ${texto}`);

    return{clientes: resultadoClientes.clientes, contas: resultadoContas.contas, agencias: resultadoAgencias.agencias, avisos: [...clientesAviso, ...contasAviso, ...agenciasAviso]};

}

