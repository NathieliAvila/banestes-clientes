export function textoOpcional(valor: string | undefined): string | undefined {
    if (valor === undefined || valor.trim() === "" ) return undefined;
    return valor.trim();
}

export function paraNumero(valor: string | undefined): number {
    if (valor === undefined || valor.trim() === "") throw new Error("Valor ausente ou vazio");
    const numero = Number(valor);
    if (Number.isNaN(numero)) throw new Error("Valor inválido");
    return numero;
} 

export function paraData(valor: string | undefined): Date {
    if (valor === undefined || valor.trim() === "") throw new Error("Valor ausente");
    const [ano, mes, dia] = valor.split("-").map(Number);

    if (Number.isNaN(ano) || Number.isNaN(mes) || Number.isNaN(dia)) throw new Error(`Valor inválido: ${valor}`);
    const data = new Date(ano, mes - 1, dia);

    if (data.getFullYear() != ano || data.getMonth() != mes - 1 || data.getDate() != dia ) throw new Error(`Data inválida: ${valor}`);

    return data;
} 

