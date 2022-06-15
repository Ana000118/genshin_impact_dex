import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [genshinState, setGenshinState] = useState({
    types: []
  });

  const tipos ={
    artifacts:"Artefactos",
    boss:"Jefes",
    characters:"Personajes",
    consumables:"Consumibles",
    domains:"Dominios",
    elements:"Elementos",
    enemies:"Enemigos",
    materials:"Materiales",
    nations:"Naciones",
    weapons:"Armas",
  };

  const fetchGenshinApi = async(item, url = "https://api.genshin.dev/")=>
  {
    const respuesta = await fetch(url);
    const respJson = await respuesta.json();
    if (item === "types"){
      setGenshinState({
        ...genshinState,
        types: respJson.types,
      });
    }else{
      setGenshinState({types:[...genshinState.types], [item]: respJson});
     
    }
    console.log(respJson);
  };

  useEffect(() => {
    fetchGenshinApi("types");
  }, []);


  const handleChangeType = ({target}) => {
    const url = `https://api.genshin.dev/${target.value}`
    fetchGenshinApi(target.value, url);
  };

  return (
    <div className='App container'>
    <h1 style={{color: "white"}}>Genshin Impact Dex</h1>
    <hr />
    <select name="types" onChange={handleChangeType}>
    <option value="">Seleccione un elemento</option>
      {genshinState.types.map((type) => (
      <option key={type} value={type}>
        {tipos[type]}
      </option>
      ))}
    </select>
    {
      genshinState.artifacts && <select name="artifacts">
        <option value="">Seleccione un set de artefactos</option>
        {genshinState.artifacts.map((artifact) => (
          <option key={artifact} value={artifact}>
            {artifact}
          </option>
        ))}
      </select>
    }
    </div>
  );
}

export default App;

