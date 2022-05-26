import { useState } from "react";

const tipos ={
  artifacs:"artefactos",
  boos:"jefes",
  Characters:"personajes",
  consumables:"consumibles",
  domains:"dominios",
  elements:"elementos",
  enemies:"enemies",
  materials:"materiales",
  natios:"naciones",
  weapons:"armas",
};

function App() {
  
const [genshinState, setGenshinState] = useState({
  types: []
});

const fetchGenshinApi = async (item, url = "https://api.genshin.dev/") => {
  const respJson = await fetch(url);
  if (item === "types"){
    setGenshinState({
      types: respJson.types,
    });
  }
  else{
    setGenshinState({
      [item]: respJson,
    });
  }
};

fetchGenshinApi ("types");

const handleChangeType =({target}) => {
  const url = `https://api.genshin.dev/${target.value}`; 
  fetchGenshinApi(target.value,url);
  console.log(genshinState);

};
  

  return (
    <div className="App container">
      <h3>Genshin Impact Dex</h3>
      <hr/>
      <select name="types" onChange={handleChangeType}>
        <option value="">Seleccione un elemento</option>
        {genshinState.types.map((type) => (
          <option key={type} value={type} >
            {tipos[type]}
            </option>
        ))}
      </select>
 
    </div>
  );
}

export default App;
