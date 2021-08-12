import {useState} from 'react'
import { firestore, currentTime } from '../firebase/firebase'

const CardDescription = ({retrieveRefs, id}) => {
    const [description, setDescription] = useState('')

    const onChangeDesc = (e) => {
        setDescription(e.target.value)
    }

    const postHandler = (e) => {
        e.preventDefault()
        const time = currentTime();
        const imageRef = firestore.collection('images').doc(id)
        imageRef.update({
            description: {
                text: description,
                time: time
            }
        })
        setDescription('')
        console.log('done')
    }

    return (
        <div id="card-desc">
            <h4>Description:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore eos ea cum sunt sint ullam aliquam excepturi officia voluptates voluptatum. Facere a, doloribus molestias omnis ad reprehenderit aperiam voluptates quo!</p>
            <form onSubmit={postHandler}>
                <textarea name="card-description" value={description} onChange={onChangeDesc} />
                <input type="submit" name="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CardDescription
