import React from 'react'
import {useState} from 'react'
import {storage} from '../firebase/firebase'

const ReferenceUpload = () => {
    const [file, setFile] = useState(null)

    const onChangeFile = (e) => {
        setFile(e.target.files[0])
    }


    const uploadHandler = (e) => {
        e.preventDefault()
        console.log(file)
        const storageRef = storage.ref(file.name);
        storageRef.put(file)
    }

    return (
        <form onSubmit={uploadHandler} >
           <input type='file' name="file" onChange={onChangeFile}/>
           <input type='submit' name="submit" value='Submit'/>
        </form>
    )
}

export default ReferenceUpload
