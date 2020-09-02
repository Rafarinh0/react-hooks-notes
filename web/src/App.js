import React, { useState, useEffect } from 'react';

function App() {
  const [techs, setTechs] = useState([]);

  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTechs([...techs, newTech]);
  }

  useEffect(() => {
    const storageTech = localStorage.getItem('techs');

    if (storageTech) {
      setTechs(JSON.parse(storageTech));
    }
  }, [])//pega itens do local storage e joga no JSON pra tela

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);//dá um update se houve alteração ou adição de alguma tech entrar no array techs

  return (
    <>
      <ul>
        {techs.map(t => <li key={t}>{t}</li>)}
      </ul>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
