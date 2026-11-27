import type { Cliente } from "../types";
import { formatarData, formatarMoeda } from "../utils/formatacao";

interface ListaClientesProps {
    clientes: Cliente[];
    aoSelecionar: (id: string) => void;
} 

function ListaClientes({clientes, aoSelecionar}: ListaClientesProps) {
    return (
        <ul>
            {clientes.map(cliente => (
                <li key={cliente.id}>
                    <button onClick={() => aoSelecionar(cliente.id)}>
                        <strong>{cliente.nome}</strong>
                        <span>{cliente.cpfCnpj}</span>
                        <span>{cliente.email}</span>
                        <span>{formatarData(cliente.dataNascimento)}</span>
                        <span>{formatarMoeda(cliente.rendaAnual)}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ListaClientes;