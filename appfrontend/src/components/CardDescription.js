import {useState} from 'react'
import AddDescription from './AddDescription'
import EditDescription from './EditDescription'

const CardDescription = ({retrieveRefs, id, desc}) => {
    const [addDesc, setAddDesc] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    
    return (
        <div id="card-desc">
            <h4>Description:</h4>
            <AddDescription retrieveRefs={retrieveRefs} id={id} desc={desc}/>
            <EditDescription retrieveRefs={retrieveRefs} id={id} desc={desc}/>

        </div>
    )
}

export default CardDescription
