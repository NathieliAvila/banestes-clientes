import Papa from "papaparse";

export async function buscarCsv(url:string) : Promise<string> {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
        return await resposta.text();
    } catch (error) {
        console.error("Erro: ", error);
        throw error;
    }
}

export function parsearCsv(texto: string){
    const resultado = Papa.parse<Record<string, string>>(texto, {
        header: true,
        skipEmptyLines: true
    });
    return resultado.data;
}