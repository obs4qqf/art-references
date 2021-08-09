import React from 'react'
import {useState} from 'react'

const ReferenceUpload = () => {
    const [file, setFile] = useState(null)

    const onChangeFile = (e) => {
        setFile(e.target.files[0])
    }


    const uploadHandler = (e) => {
        e.preventDefault()
        // setFile(e.target[0].files[0])
        // console.log(e.target[0].files[0])
        const form = new FormData()
        console.log(file)
        form.append('file', file)
        fetch('/references', {
            method: 'POST',
            body: form
        })
    }

    return (
        <form onSubmit={uploadHandler} >
           <input type='file' name="file" onChange={onChangeFile} />
           <input type='submit' name="submit" value='Submit'/>
        </form>
    )
}

export default ReferenceUpload
