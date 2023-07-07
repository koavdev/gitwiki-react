import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api'


function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    const {data} = await api.get(`/repos/${currentRepo}`);

    if(data.id){

      const isExist = repos.find(repos => repos.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        return
      }

    }
    
    alert('Repositório já foi adicionado!');
  }

  const handleRemoveRepo = (id) => {

    let repo = repos.find(repos => repos.id === id)
    alert(`Repositório ${repo.name} removido.`);

    // utilizar filter()
    setRepos(repos.filter(repo => repo.id !== id));
    console.log(repos);

  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='git logo'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo key={repo} repo={repo} handleRemoveRepo={handleRemoveRepo}/>)}
    </Container>
  );
}

export default App;
