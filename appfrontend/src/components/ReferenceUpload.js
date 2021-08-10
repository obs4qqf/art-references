import React from 'react'
import {useState} from 'react'
import {storage, firestore, currentTime} from '../firebase/firebase'

const ReferenceUpload = ({retrieveRefs}) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    const onChangeFile = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }


    const uploadHandler = (e) => {
        e.preventDefault()
        console.log(file)
        const storageRef = storage.ref();
        const collectionRef = firestore.collection('images')
        const fileRef = storageRef.child(`images/${file.name}`)
        const uploadTask = fileRef.put(file)
        uploadTask.on('state_changed', 
            snapshot => {
                console.log('Upload is occuring')
            }, error => {
                console.log(error.code)
                setError(error.code)
            }, async () => {
                const newUrl = await uploadTask.snapshot.ref.getDownloadURL()
                setUrl(newUrl)
                const time = currentTime();
                collectionRef.add({url: newUrl, uploadedTime: time})
                setFileName(null)
                setError(null)
                retrieveRefs()
            })
    }

    return (
        <>
            <form onSubmit={uploadHandler} >
                <input type='file' name="file" onChange={onChangeFile}/>
                <input type='submit' name="submit" value='Submit'/>
            </form>
            {error && <div>{error}</div>}
            {fileName && <div>{fileName}</div>}
        </>
    )
}

export default ReferenceUpload
