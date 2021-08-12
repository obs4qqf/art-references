import {useState} from 'react'
import AddDescription from './AddDescription'
import EditDescription from './EditDescription'

const CardDescription = ({retrieveRefs, id, desc}) => {
    const [addDesc, setAddDesc] = useState(false)
    const [editDesc, setEditDesc] = useState(false)

    const changeAddDesc = () => {
        setAddDesc(!addDesc)
    }
    
    const changeEditDesc = () => {
        setEditDesc(!editDesc)
    }

    return (
        <div id="card-desc">
            <h4>Description:</h4>

            {(desc === null && addDesc !== true) && 
                <button onClick={() => setAddDesc(true)}>Add Description</button>
            }
            {(desc === null && addDesc === true) &&
                <>
                    <AddDescription retrieveRefs={retrieveRefs} id={id} changeAddDesc={changeAddDesc}/>
                    <button onClick={() => setAddDesc(false)}>Cancel</button>
                </>
            }

            {(desc !== null && editDesc !== true) && 
                <>
                    <button onClick={() => setEditDesc(true)}>'Edit'</button>
                    <p>{desc.text}</p>
                    <p>Edited on {desc.time}</p>
                </>
            }
            {(desc !== null && editDesc === true) &&
                <>
                    <EditDescription retrieveRefs={retrieveRefs} id={id} desc={desc} changeEditDesc={changeEditDesc}/>
                    {desc !== null && <button onClick={() => setEditDesc(false)}>Cancel</button>}
                </>
            }
        </div>
    )
}

export default CardDescription
