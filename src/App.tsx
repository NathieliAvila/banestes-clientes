import { useState, useEffect } from 'react'
import { carregarDados } from './services/dadosService';
import type { DadosCarregados } from './types'

import './App.css'
import ListaClientes from './components/ListaClientes';
import { filtrarClientes } from './utils/busca';



function App() {

  const [dados, setDados] = useState<DadosCarregados | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarDados()
    .then(resultado => {
      setDados(resultado);
       if (resultado.avisos.length > 0) {
        console.warn("Avisos ao carregar dados:", resultado.avisos)
      }
      }).catch(e => {setErro(e instanceof Error ? e.message : "Erro desconhecido");
      }).finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando){
    return <p>Carregando dados..</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  if (!dados) {
    return null;
  }

  const clientesFiltrados = filtrarClientes(dados.clientes, busca)

  return (
    <main>
      <h1>Clientes</h1>

      <label htmlFor="busca">Buscar por nome ou CPF/CNPJ</label>
      <input
        id="busca"
        type="search"
        value={busca}
        onChange={evento => setBusca(evento.target.value)}
      />

      {clientesFiltrados.length === 0 ? (<p>Nenhum cliente encontrado</p>) : (<ListaClientes clientes={clientesFiltrados}/>
    )}
    <p>{clientesFiltrados.length} clientes</p>

      
      

      
    </main>
  );
}

export default App
