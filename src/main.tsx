import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { carregarDados } from './services/dadosService.ts'
import { contasDoCliente, agenciaDoCliente, verificarReferencias } from './utils/relacionamentos.ts'

carregarDados().then(dados => {
  console.log("Avisos de referência:", verificarReferencias(dados));
  const primeiro = dados.clientes[0];
  console.log(contasDoCliente(dados.contas, primeiro.cpfCnpj));
  console.log(agenciaDoCliente(dados.agencias, primeiro.codigoAgencia));
});