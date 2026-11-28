import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "../schemas/clienteSchema";
import { ESTADOS_CIVIS } from "../utils/normalizacao";
import type { Agencia } from "../types";
import type { DadosFormulario } from "../schemas/clienteSchema";



interface FormularioClienteProps {
    agencias: Agencia[];
}

function FormularioCliente ({agencias}: FormularioClienteProps) {
    const {register, handleSubmit, formState: {errors} } = 
    useForm<DadosFormulario>({resolver: zodResolver(clienteSchema)});

function aoEnviar(dados: DadosFormulario) {
    console.log(dados);
}



return (
    <form onSubmit={handleSubmit(aoEnviar)}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" {...register("nome")} />
        {errors.nome && <p>{errors.nome.message}</p>}

        <label htmlFor="nomeSocial">Nome social: </label>
        <input id="nomeSocial" {...register("nomeSocial")} />

        <label htmlFor="dataNascimento">Data de nascimento: </label>
        <input type="date" id="dataNascimento" {...register("dataNascimento")} />
        {errors.dataNascimento && <p>{errors.dataNascimento.message}</p>}

        <label htmlFor="cpfCnpj">CPF/CNPJ: </label>
        <input id="cpfCnpj" {...register("cpfCnpj")} />
        {errors.cpfCnpj && <p>{errors.cpfCnpj.message}</p>}

        <label htmlFor="rg">RG: </label>
        <input id="rg" {...register("rg")} />

        <label htmlFor="email">E-mail</label>
        <input id="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="endereco">Endereço: </label>
        <input id="endereco" {...register("endereco")} />
        {errors.endereco && <p>{errors.endereco.message}</p>}

        <label htmlFor="rendaAnual">Renda anual: </label>
        <input type="number" step="0.01" id="rendaAnual" {...register("rendaAnual")} />
        {errors.rendaAnual && <p>{errors.rendaAnual.message}</p>}

        <label htmlFor="patrimonio">Patrimônio: </label>
        <input type="number" step="0.01" id="patrimonio" {...register("patrimonio")} />
        {errors.patrimonio && <p>{errors.patrimonio.message}</p>}

        <label htmlFor="estadoCivil">Estado civil: </label>
        <select id="estadoCivil" {...register("estadoCivil")}>
            <option value="">Selecione</option>
            {ESTADOS_CIVIS.map(opcao => (
                <option key={opcao} value={opcao}>{opcao}</option>
            ))}
        </select>
        {errors.estadoCivil && <p>{errors.estadoCivil.message}</p>}

        <label htmlFor="codigoAgencia">Agência: </label>
        <select id="codigoAgencia" {...register("codigoAgencia")}>
            <option value="">Selecione</option>
            {agencias.map(agencia => 
                (<option key={agencia.id} value={agencia.codigo}>{agencia.nome}</option>
            ))}
        </select>
    
        {errors.codigoAgencia && <p>{errors.codigoAgencia.message}</p>}

        <button type="submit">Cadastrar</button>
            
    </form>
);
}
export default FormularioCliente;
