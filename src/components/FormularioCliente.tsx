import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "../schemas/clienteSchema";
import { z } from "zod";
import { ESTADOS_CIVIS } from "../utils/normalizacao";


//Pede ao TS o tipo que o schema descreve. É como se o schema gerasse a interface. 
type DadosFormulario = z.infer<typeof clienteSchema>;

function FormularioCliente () {
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
        <input type="number"  id="rendaAnual" {...register("rendaAnual")} />
        {errors.rendaAnual && <p>{errors.rendaAnual.message}</p>}

        <label htmlFor="estadoCivil">Estado civil: </label>
        <select id="estadoCivil" {...register("estadoCivil")}>
            <option value="">Selecione</option>
            {ESTADOS_CIVIS.map(opcao => (
                <option key={opcao} value={opcao}>{opcao}</option>
            ))}
        </select>
        {errors.estadoCivil && <p>{errors.estadoCivil.message}</p>}

        <button type="submit">Cadastrar</button>
            
    </form>
);
}
export default FormularioCliente;
