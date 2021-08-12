import {useState} from 'react'
import { firestore } from '../firebase/firebase'

const AddDescription = ({retrieveRefs, id, desc}) => {
    const [newDesc, setNewDesc] = useState('')
    const [addDesc, setAddDesc] = useState(false)

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
        if (addDesc === true) {
            setAddDesc(false)
        }
        console.log("post handler")
    }

    return (
        <div>
            {(desc === null && addDesc !== true) && 
                <button onClick={() => setAddDesc(true)}>Add Description</button>
            }
            {(desc === null && addDesc === true) &&
                <>
                    <form onSubmit={postHandler}>
                        <textarea name="card-description" value={newDesc} onChange={onChangeNewDesc} />
                        <input type="submit" name="submit" value="Submit" />
                    </form>
                    <button onClick={() => setAddDesc(false)}>Cancel</button>
                </>
            }
        </div>
    )
}

export default AddDescription
