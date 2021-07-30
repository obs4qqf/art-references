import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'

function App() {
  const [references, setReferences] = useState([])

  useEffect(() => {
    const getReferences = async () => {
      const res = await fetch("/references")
      const loadedData = await res.json()
      console.log(loadedData)
      setReferences(loadedData)
    }
    
    getReferences()
  }, []);

  return (
    <div className="App">
      <SearchBar />
      <Cards references={references} />
    </div>
  );
}

export default App;
