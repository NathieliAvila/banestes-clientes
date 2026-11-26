import Papa from "papaparse";

//faz uma requisição http à planilha.
export async function buscarCsv(url:string) : Promise<string> {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`Erro: HTTP ${resposta.status}`);
        return await resposta.text(); //recebe uma Response e retorna uma Promise string.
    } catch (error) {
        throw error;
    }
}

//Lê, interpreta e converte arquivos CSV
export function parsearCsv(texto: string): Record<string, string>[]{
    const resultado = Papa.parse<Record<string, string>>(texto, {
        header: true,
        skipEmptyLines: true
    });
    return resultado.data;
}

