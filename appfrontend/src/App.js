import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import ExpandedCard from './components/ExpandedCard'

function App() {
  const [references, setReferences] = useState([])
  const [clickedImage, setClickedImage] = useState(null)

  useEffect(() => {
    const getReferences = async () => {
      const res = await fetch("/references")
      const loadedData = await res.json()
      console.log(loadedData)
      setReferences(loadedData)
    }
    
    getReferences()
  }, []);

  const enlargeImage = (id) => {
    const image = references.filter(reference => reference.id === id)
    setClickedImage(image[0])
  }

  const minimizeImage = () => {
    setClickedImage(null)
  }

  return (
    <div className="app">
      <SearchBar />
      <Cards references={references} enlargeImage={enlargeImage} />
      {clickedImage !== null && <ExpandedCard clickedImage={clickedImage} minimizeImage={minimizeImage}/>}
    </div>
  );
}

export default App;
