import { useState, useEffect } from 'react'
import { carregarDados } from './services/dadosService';
import type { DadosCarregados } from './types'

import './App.css'



function App() {

  const [dados, setDados] = useState<DadosCarregados | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarDados()
    .then(resultado => {
      setDados(resultado);
       if (resultado.avisos.length > 0) {
        console.warn("Avisos ao carregar dados:", resultado.avisos)
      };
      })
      .catch(e => {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      })
      .finally(() => {
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

  return <h1>{dados.clientes.length} clientes carregados</h1>

}

export default App
