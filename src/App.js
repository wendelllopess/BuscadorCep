import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from './services/api'


function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


async function procurar(){
  //01310930/json/

  if(input === ''){
    alert("Digite um cep!")
    return
  }

  try {
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput("");

  } catch{
    alert("Error ao buscar, o CEP e invalido!");
    setInput("")
  }
}

  return (
    <div className="container">
      <h1 className="titulo">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />

        <button className="botaoProcurar" onClick={procurar}>
          <FiSearch size={30} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep} </h2>

        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf} </span>
      </main>
      )}
      
    </div>
  );
}

export default App;
