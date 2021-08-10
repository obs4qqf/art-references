import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import ExpandedCard from './components/ExpandedCard'
import ReferenceUpload from './components/ReferenceUpload'
import {firestore} from './firebase/firebase'

function App() {
  const [references, setReferences] = useState([])
  const [clickedImage, setClickedImage] = useState(null)

  useEffect(() => {
    retrieveRefs()
  }, []);

  const retrieveRefs = () => {
    // const unsubscribe = firestore.collection('images').onSnapshot((snapshot) => {
    //   let images = []
    //   snapshot.forEach(image => {
    //     images.push({...image.data(), ...image.id})
    //     console.log('loop1')
    //   })
    //   console.log('loop2')
    //   setReferences(images)
    // })

    // unsubscribe()

    firestore.collection('images').orderBy('uploadedTime','desc').get().then(snapshot => {
      let images = []
      snapshot.forEach(image => {
        images.push({...image.data(), id: image.id})
        console.log('loop1')
      })
      console.log('loop2')
      setReferences(images)
    })
  }

  const enlargeImage = (id) => {
    const image = references.filter(reference => reference.id === id)
    console.log('hi')
    setClickedImage(image[0])
  }

  const minimizeImage = () => {
    setClickedImage(null)
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
    const image = data.filter(reference => reference.id === id)
    setClickedImage(image[0])
  }

  const getRefByTag = async (tag) => {
    const res = tag === '' ? await fetch(`/references`) : await fetch(`/references/${tag}`)
    const data = await res.json()
    setReferences(data)
  }

  return (
    <div className="app">
      <SearchBar getRefByTag={getRefByTag}/>
      <ReferenceUpload retrieveRefs={retrieveRefs}/>
      <Cards references={references} enlargeImage={enlargeImage} />
      {clickedImage !== null && <ExpandedCard clickedImage={clickedImage} minimizeImage={minimizeImage} addTag={addTag} references={references} />}
    </div>
  );
}

export default App;
