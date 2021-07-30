import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'

function App() {
  const [references, setReferences] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
  });

  return (
    <div className="App">
      <SearchBar />
      <h1>{data}</h1>
      <Cards references={references} />
    </div>
  );
}

export default App;
