import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import ExpandedCard from './components/ExpandedCard'

function App() {
  const [references, setReferences] = useState([])
  const [clickedImage, setClickedImage] = useState(null)

  useEffect(() => {
    const getReferences = async () => {
      const res = await retrieveRefs()
      setReferences(res)
    }
    console.log('hi')
    getReferences()
  }, []);

  const retrieveRefs = async () => {
    const res = await fetch("/references")
    const loadedData = await res.json()
    console.log(loadedData)
    return loadedData
  }

  const enlargeImage = (id) => {
    const image = references.filter(reference => reference.id === id)
    setClickedImage(image[0])
  }

  const minimizeImage = () => {
    setClickedImage(null)
  }

  const addTag = async (id, tag) => {
    console.log(id, tag)
    const res = await fetch(`/references/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tagName: tag
      })
    })
    const data = await res.json()
    setReferences(data)
  }

  return (
    <div className="app">
      <SearchBar />
      <Cards references={references} enlargeImage={enlargeImage} />
      {clickedImage !== null && <ExpandedCard clickedImage={clickedImage} minimizeImage={minimizeImage} addTag={addTag}/>}
    </div>
  );
}

export default App;
