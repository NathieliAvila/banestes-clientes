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
buscarCsv('https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet=clientes').then(texto => console.log(parsearCsv(texto)));

import { paraNumero, textoOpcional, paraData } from './utils/conversores.ts'

let teste: string = "abc";
console.log(textoOpcional(teste));

let numero = "123";
console.log(paraNumero(numero));




console.log(paraData("90-05-14"));
