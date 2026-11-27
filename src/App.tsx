import { useState, useEffect } from 'react'
import { carregarDados } from './services/dadosService';
import type { DadosCarregados } from './types'

import './App.css'
import ListaClientes from './components/ListaClientes';
import { filtrarClientes } from './utils/busca';

//Define quantos clientes serão mostrados por página. Manter constante evita repetir o número 10 no código.
const POR_PAGINA = 10;


function App() {
  
  const [dados, setDados] = useState<DadosCarregados | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Armazena o texto digitado pelo usuário no campo de busca.
  const [busca, setBusca] = useState("");

   // Controla qual página da lista está sendo exibida.
  const [pagina, setPagina] = useState(1);

  const [clienteSelecionadoId, setClienteSelecionadoId] = useState<string | null>(null);


  // useEffect executa o carregamento dos dados quando o componente é montado. Com [], o efeito roda uma vez.
  useEffect(() => {
    carregarDados().then(resultado => {
      setDados(resultado);
      if (resultado.avisos.length > 0) {
        console.warn("Avisos ao carregar dados:", resultado.avisos)
      }
      }).catch(e => {setErro(e instanceof Error ? e.message : "Erro desconhecido");
      }).finally(() => {
        setCarregando(false);
      });
  }, []);

  //Enquanto dados estão sendo carregados, não exibe clientes.
  if (carregando){
    return <p>Carregando dados..</p>;
  }
  //Se aconteceu algum erro, mostra a mensagem ao usuário.
  if (erro) {
    return <p>{erro}</p>;
  }
  //Se não houver dados disponíveis, interrompe a renderização.
  if (!dados) {
    return null;
  }

  //Mostra clientes de acordo com o que foi digitado pelo usuário.
  const clientesFiltrados = filtrarClientes(dados.clientes, busca);

  const clienteSelecionado = dados.clientes.find(c => c.id === clienteSelecionadoId);

  //Paginação. Define quantidade de páginas e quais clientes mostrar em cada.
  const totalPaginas = Math.max(1, Math.ceil(clientesFiltrados.length/POR_PAGINA)); // max garante que mostre pelo menos uma página na interface.
  const inicio = (pagina - 1) * POR_PAGINA;
  const clientesDaPagina = clientesFiltrados.slice(inicio, inicio + POR_PAGINA );

  //RENDERIZAÇÃO DA INTERFACE
  return (
    <main>
      <h1>Clientes</h1>
      <label htmlFor="busca">Buscar por nome ou CPF/CNPJ</label>
      <input id="busca" type="search" value={busca} onChange={evento => {setBusca(evento.target.value); setPagina(1)}}/> {/* Sempre que o valor da busca mudar, retorna à primeira página. */}

      {/* Se nenhum cliente corresponder a filtragem, retorna uma mensagem. Se corresponder, renderiza o componente */}
      {clientesFiltrados.length === 0 ? (<p>Nenhum cliente encontrado</p>) : (<ListaClientes clientes={clientesDaPagina} aoSelecionar={setClienteSelecionadoId}/>
    )}
    <p>{clientesFiltrados.length} clientes</p>

    <p>{clienteSelecionado?.nome}</p>

    <button disabled={pagina===1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
    <p>Página {pagina} de {totalPaginas}</p>
    <button disabled={pagina===totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima</button>

    </main>
  );
}

export default App
