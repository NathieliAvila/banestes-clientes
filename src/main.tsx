import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { parsearCsv } from './services/csvService.ts'
import { buscarCsv } from './services/csvService.ts'
/* buscarCsv('https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=clientes').then(texto => console.log(parsearCsv(texto))); */

import { paraNumero, textoOpcional, paraData } from './utils/conversores.ts'

import { normalizarCliente } from './utils/normalizacao.ts'

buscarCsv('https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=clientes').then(texto => parsearCsv(texto).map(normalizarCliente)).then(clientes => console.log(clientes.length, clientes[0]));
