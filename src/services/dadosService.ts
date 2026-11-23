import type { Cliente, Conta, Agencia } from "../types";
import { normalizarAgencias, normalizarClientes, normalizarContas } from "../utils/normalizacao";
import { buscarCsv, parsearCsv } from "./csvService";

const criarURL = (aba: string): string => {
    return `https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=${aba}`;
}

export async function carregarDados(): Promise<{clientes: Cliente[], contas: Conta[], agencias: Agencia[], avisos: string[]}> {

    const clientesUrl: string = criarURL("clientes");
    const contasUrl: string = criarURL("contas");
    const agenciasUrl: string = criarURL("agencias");

    const [textoCliente, textoConta, textoAgencia] = await Promise.all([buscarCsv(clientesUrl), buscarCsv(contasUrl), buscarCsv(agenciasUrl)]);

    const linhasClientes: Record<string, string>[] = parsearCsv(textoCliente);
    const linhasContas: Record<string, string>[] = parsearCsv(textoConta);
    const linhasAgencias: Record<string, string>[] = parsearCsv(textoAgencia);

    const resultadoClientes = normalizarClientes(linhasClientes);
    const resultadoContas = normalizarContas(linhasContas);
    const resultadoAgencias = normalizarAgencias(linhasAgencias);

    return{clientes: resultadoClientes.clientes, contas: resultadoContas.contas, agencias: resultadoAgencias.agencias, avisos: [...resultadoClientes.avisos, ...resultadoContas.avisos, ...resultadoAgencias.avisos]};

}

