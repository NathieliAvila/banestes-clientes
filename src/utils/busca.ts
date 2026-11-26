import type { Cliente } from "../types";


/* Tira acentos e maíusculas, para comparar sem se importar com a grafia*/
function simplificar(texto: string): string {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

export function filtrarClientes(clientes: Cliente[], termo: string): Cliente[] {
    const termoSimples = simplificar(termo);
    const termoDigitos = termo.replace(/\D/g, "");

    if (termo === "") return clientes; //Termo vazio, retorna todos os clientes

    return clientes.filter(cliente => {
        const casaNome = simplificar(cliente.nome).includes(termoSimples);
        const casaDocumento = termoDigitos.length > 0 && cliente.cpfCnpj.includes(termoDigitos);
        return casaNome || casaDocumento;
    });

} 