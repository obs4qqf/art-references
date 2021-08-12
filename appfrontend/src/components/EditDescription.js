import {useState, useEffect} from 'react'
import { firestore } from '../firebase/firebase'

const EditDescription = ({retrieveRefs, id, desc, changeEditDesc}) => {
    const [updatedDesc, setUpdatedDesc] = useState(desc.text)

    useEffect(() => {
        setUpdatedDesc(desc.text)
        console.log("useEffect")
    }, [desc.time])

    const onChangeUpdatedDesc = (e) => {
        setUpdatedDesc(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        const dateData = new Date()
        const date = dateData.toLocaleDateString()
        const currentTime = dateData.toLocaleTimeString()
        const dateFull = `${date} at ${currentTime}`
        const imageRef = firestore.collection('images').doc(id)
        imageRef.update({
            description: {
                text: updatedDesc,
                time: dateFull
            }
        }).then(() => retrieveRefs())
        changeEditDesc()
        console.log("update handler")
    }

    return (
        <form onSubmit={updateHandler}>
            <textarea name="card-description" value={updatedDesc} onChange={onChangeUpdatedDesc} />
            <input type="submit" name="submit" value="Save"/>
        </form>
    )
}

export default EditDescription
