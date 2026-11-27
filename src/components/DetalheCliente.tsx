import type { Cliente } from "../types";
import { formatarData, formatarMoeda } from "../utils/formatacao";

interface DetalheClienteProps {
    cliente: Cliente;
    aoVoltar: ()=> void;
}

function DetalheCliente({cliente, aoVoltar}: DetalheClienteProps) {
    return (
        <section>
            <button onClick={aoVoltar}>Voltar</button>
            <h2>{cliente.nome}</h2>
            <p>Nome social: {cliente.nomeSocial?? "Não informado"}</p>
            <p>ID: {cliente.id}</p>
            <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
            <p>RG: {cliente.rg ?? "Não informado"}</p>
            <p>Data de nascimento: {formatarData(cliente.dataNascimento)}</p>
            <p>Estado civil: {cliente.estadoCivil}</p>
            <p>Email: {cliente.email}</p>
            <p>Endereço: {cliente.endereco}</p>
            <p>Renda Anual: {formatarMoeda(cliente.rendaAnual)}</p>
            <p>Patrimônio: {formatarMoeda(cliente.patrimonio)}</p>
            <p>Código da agência: {cliente.codigoAgencia}</p>

           
        </section>
    );
    
}

export default DetalheCliente;