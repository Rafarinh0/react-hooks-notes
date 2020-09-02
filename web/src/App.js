import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTechs] = useState([]);

  const [newTech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);// a função handleAdd sempre é montada novamente sempre que um desses valores alterar
  //para evitar consumo de memória do processamento do JS, usa o useCallback

  //agora, a handleAdd só vai ser recriada da memória do PC quando a variável
  //newTech ou quando a variável techs sofrerem alterações

  useEffect(() => {
    const storageTech = localStorage.getItem('techs');

    if (storageTech) {
      setTechs(JSON.parse(storageTech));
    }
  }, [])//pega itens do local storage e joga no JSON pra tela

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);//dá um update se houve alteração ou adição de alguma techs entrar no array techs

  //mudar o número de tecnologias só quando o array techs mudar
  const techsSize = useMemo(() => techs.length, [techs]);
  //a variável techSize só vai executar o techs.length quando a variavel techs mudar

  //useMemo eh bom pra calculos de uma variavel ou dentro do render baseados em alterações de outras variaveis
  return (
    <>
      <ul>
        {techs.map(t => <li key={t}>{t}</li>)}
      </ul>
      <strong>Você tem {techsSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
