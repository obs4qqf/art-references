import {useState} from 'react'
import { firestore } from '../firebase/firebase'

const CardDescription = ({retrieveRefs, id, desc}) => {
    const [description, setDescription] = useState('')

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
        })
        setDescription('')
        retrieveRefs()
    }

    return (
        <div id="card-desc">
            <h4>Description:</h4>
            {desc !== null && <p>{desc.text}</p>}
            {desc !== null && <p>Edited on {desc.time}</p>}
            <form onSubmit={postHandler}>
                <textarea name="card-description" value={description} onChange={onChangeDesc} />
                <input type="submit" name="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CardDescription
