import {useState} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import image from './images/placeholder.jpg'

function App() {
  const [references, setReferences] = useState([
    {
      id: 1,
      image: image
    },
    {
      id: 2,
      image: image
    },
    {
      id: 3,
      image: image
    },
    {
      id: 4,
      image: image
    },
    {
      id: 5,
      image: image
    },
    {
      id: 6,
      image: image
    },
    {
      id: 7,
      image: image
    },
    {
      id: 8,
      image: image
    }
  ])

  return (
    <div className="App">
      <SearchBar />
      <Cards references={references} />
    </div>
  );
}

export default App;
