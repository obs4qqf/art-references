import {useState, useEffect} from 'react'
import { firestore } from '../firebase/firebase'

const CardDescription = ({retrieveRefs, id, desc}) => {
    const [description, setDescription] = useState(desc.text)
    const [editTask, setEditTask] = useState(false)

    useEffect(() => {
        setDescription(desc.text)
    }, [desc.time])

    const onChangeDesc = (e) => {
        setDescription(e.target.value)
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
                text: description,
                time: dateFull
            }
        }).then(() => retrieveRefs())
        if (editTask === true) {
            setEditTask(false)
        }
    }

    return (
        <div id="card-desc">
            <h4>Description:</h4>
            {(desc !== null && editTask !== true) &&
                <>
                    <button onClick={() => setEditTask(!editTask)}>'Edit'</button>
                    <p>{desc.text}</p>
                    <p>Edited on {desc.time}</p>
                </>
            }
            {(desc === null || (desc !== null && editTask === true)) && 
                <>
                    <form onSubmit={postHandler}>
                        <textarea name="card-description" value={description} onChange={onChangeDesc} />
                        <input type="submit" name="submit" value={editTask ? "Save ": "Submit"} />
                    </form>
                    {desc !== null && <button onClick={() => setEditTask(!editTask)}>Cancel</button>}
                </>
            }
        </div>
    )
}

export default CardDescription
