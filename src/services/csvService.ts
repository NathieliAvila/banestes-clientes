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