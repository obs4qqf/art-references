import {useState} from 'react'
import { firestore } from '../firebase/firebase'

const AddDescription = ({retrieveRefs, id, changeAddDesc}) => {
    const [newDesc, setNewDesc] = useState('')

    const onChangeNewDesc = (e) => {
        setNewDesc(e.target.value)
    }

    const postHandler = (e) => {
        e.preventDefault()
        const dateData = new Date()
        const date = dateData.toLocaleDateString()
        const currentTime = dateData.toLocaleTimeString()
        const dateFull = `${date} at ${currentTime}`
        const imageRef = firestore.collection('images').doc(id)
        imageRef.update({
            description: {
                text: newDesc,
                time: dateFull
            }
        }).then(() => retrieveRefs())
        changeAddDesc()
        console.log("post handler")
    }

    return (
        <form onSubmit={postHandler}>
            <textarea name="card-description" value={newDesc} onChange={onChangeNewDesc} />
            <input type="submit" name="submit" value="Submit" />
        </form>
    )
}

export default AddDescription
