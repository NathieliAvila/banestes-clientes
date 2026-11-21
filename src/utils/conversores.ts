export function textoOpcional(valor: string | undefined): string | undefined {
    if (valor === undefined || valor.trim() === "" ) return undefined;
    return valor.trim();
}

/* export function paraNumero(valor: string | number): number {
    if (valor === )
} */

export function paraData(valor: string | undefined): Date {
    if (valor === undefined || valor.trim() === "") throw new Error("Valor inválido");
    
    /* const [ano, mes, dia] = valor?.split("-").map(Number); */
    
}