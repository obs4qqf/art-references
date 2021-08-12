import {useState, useEffect} from 'react'
import { firestore } from '../firebase/firebase'

const EditDescription = ({retrieveRefs, id, desc}) => {
    const [updatedDesc, setUpdatedDesc] = useState('')
    const [editDesc, setEditDesc] = useState(false)

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
        if (editDesc === true) {
            setEditDesc(false)
        }
        console.log("update handler")
    }

    return (
        <div>
            {(desc !== null && editDesc !== true) && 
                <>
                    <button onClick={() => setEditDesc(true)}>'Edit'</button>
                    <p>{desc.text}</p>
                    <p>Edited on {desc.time}</p>
                </>
            }
            {(desc !== null && editDesc === true) &&
                <>
                    <form onSubmit={updateHandler}>
                        <textarea name="card-description" value={updatedDesc} onChange={onChangeUpdatedDesc} />
                        <input type="submit" name="submit" value="Save"/>
                    </form>
                    {desc !== null && <button onClick={() => setEditDesc(false)}>Cancel</button>}
                </>
            }
        </div>
    )
}

export default EditDescription
