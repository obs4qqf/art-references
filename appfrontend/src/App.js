import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import ExpandedCard from './components/ExpandedCard'

function App() {
  const [references, setReferences] = useState([])
  const [clickedImageID, setClickedImageID] = useState(null)

  useEffect(() => {
    const getReferences = async () => {
      const res = await retrieveRefs()
      setReferences(res)
    }
    getReferences()
  }, []);

  const retrieveRefs = async () => {
    const res = await fetch("/references")
    const loadedData = await res.json()
    console.log(loadedData)
    return loadedData
  }

  const enlargeImage = (id) => {
    setClickedImageID(id)
  }

  const minimizeImage = () => {
    setClickedImageID(null)
  }

  const addTag = async (id, tag) => {
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

  const getRefByTag = async (tag) => {
    const res = tag === '' ? await fetch(`/references`) : await fetch(`/references/${tag}`)
    const data = await res.json()
    setReferences(data)
  }

  return (
    <div className="app">
      <SearchBar getRefByTag={getRefByTag}/>
      <Cards references={references} enlargeImage={enlargeImage} />
      {clickedImageID !== null && <ExpandedCard clickedImageID={clickedImageID} minimizeImage={minimizeImage} addTag={addTag} references={references} />}
    </div>
  );
}

export default App;
