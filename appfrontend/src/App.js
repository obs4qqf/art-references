import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import Cards from './components/Cards'
import ExpandedCard from './components/ExpandedCard'
import ReferenceUpload from './components/ReferenceUpload'
import {firestore} from './firebase/firebase'
import firebase from "firebase/app";

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
    //     images.push({...image.data(), id: image.id})
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
      if (clickedImage) {
        const image = images.filter(reference => reference.id === clickedImage.id)
        setClickedImage(image[0])
      }
    })
  }

  const enlargeImage = (id) => {
    const image = references.filter(reference => reference.id === id)
    setClickedImage(image[0])
  }

  const minimizeImage = () => {
    setClickedImage(null)
  }

  const addTag = async (id, tag) => {
    const imageRef = firestore.collection('images').doc(id)
    imageRef.update({
      tags: firebase.firestore.FieldValue.arrayUnion(tag)
    }).then(() => retrieveRefs())
  }

  const getRefByTag = async (tag) => {
    if (tag === '') {
      retrieveRefs()
    } else {
      const collectionRef = firestore.collection('images')
      collectionRef.where('tags','array-contains', tag).get()
        .then(snapshot => {
          let images = []
          snapshot.forEach(image => {
            images.push({...image.data(), id: image.id})
            console.log('loop1again')
          })
          console.log('loop2again')
          setReferences(images)
        })
      console.log('done')
    }
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
