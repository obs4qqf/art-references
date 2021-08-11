import React from 'react'

const TagsList = ({tags, deleteTag, id}) => {
    return (
        <div>
            {tags.map((tag, index) => {
                return <div className="tag">
                    <label key={index}>{tag}</label>
                    <i className="fas fa-times fa-1x" onClick={() => deleteTag(id, tag)}></i>
                </div>
            })}
            
        </div>
    )
}

export default TagsList
