import type { Agencia, Cliente, Conta } from "../types";
import { formatarData, formatarMoeda } from "../utils/formatacao";

interface DetalheClienteProps {
    cliente: Cliente;
    aoVoltar: ()=> void;
    contas: Conta[];
    agencia?: Agencia;
}

function DetalheCliente({cliente, aoVoltar, contas, agencia}: DetalheClienteProps) {
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
            <h3>Contas</h3>
                {contas.length === 0 ? (<p>Nenhuma conta</p>) : contas.map(conta => (
                    (<div key={conta.id}>
                        <p>Tipo: {conta.tipo}</p>
                        <p>Saldo: {formatarMoeda(conta.saldo)}</p>
                        <p>Limite de crédito: {formatarMoeda(conta.limiteCredito)}</p>
                        <p>Crédito disponível: {formatarMoeda(conta.creditoDisponivel)}</p>
                    </div>)
                ))}
           
        </section>
    );
    
}

export default DetalheCliente;