import React from 'react'

const ReferenceUpload = () => {
    // const

    // const onChangeFile = (e) => {}


    const uploadHandler = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <form onSubmit={uploadHandler} >
           <input type='file' name="file" />
           <input type='submit' name="submit" value='Submit'/>
        </form>
    )
}

export default ReferenceUpload
