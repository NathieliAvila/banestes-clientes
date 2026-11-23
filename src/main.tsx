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
import { NormalizarAgencias, normalizarClientes } from './utils/normalizacao.ts'


const agencias = 'https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=agencias';


