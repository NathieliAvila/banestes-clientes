import type { Cliente } from "../types";

interface ListaClientesProps {
    clientes: Cliente[];
} 
function ListaClientes({clientes}: ListaClientesProps) {
    return (
        <ul>
            {clientes.map(cliente => (
                <li key={cliente.id}>
                    <strong>{cliente.nome}</strong>
                    <span>{cliente.cpfCnpj}</span>
                    <span>{cliente.email}</span>
                </li>
            ))}
        </ul>
    );
}

export default ListaClientes;