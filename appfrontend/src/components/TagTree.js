import {useState, useEffect} from 'react'
import {firestore} from '../firebase/firebase'

const TagTree = () => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        retrieveTags()
    }, [])

    const retrieveTags = () => {
        firestore.collection('tags').get().then(snapshot => {
            let tagsList = []
            snapshot.forEach(tag => {
              tagsList.push({...tag.data(), id: tag.id})
              console.log('loop1tags')
            })
            console.log('loop2tags')
            setTags(tagsList)
            console.log(tagsList)
          })
    }


    return (
        <div>
            <p>Hello World</p>
        </div>
    )
}

export default TagTree
