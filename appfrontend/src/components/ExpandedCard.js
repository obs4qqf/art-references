import TagsList from "./TagsList"

const ExpandedCard = ({clickedImage, minimizeImage, addTag, deleteTag}) => {
    const enterTag = (e) => {
        if (e.key === 'Enter') {
            addTag(clickedImage.id, e.target.value)
            e.target.value = ''
          }
    }

    const displayTags = () => {
        let counter = 1
        let tags = ""
        clickedImage.tags.map(tag => {
            if (counter === 1) {
                tags = tag
            } else {
                tags += ", "+tag
            }
            counter += 1
        })
        return tags
    }

    return (
        <div id="expanded-card">
            <img src={clickedImage.url} alt="Expanded Image" />
            <i className="fas fa-times fa-3x" onClick={minimizeImage}></i>
            <div className="tag-input-area">
                <input type="text" onKeyDown={enterTag} />
                <TagsList tags={clickedImage.tags} deleteTag={deleteTag} id={clickedImage.id}/>
            </div>
        </div>
    )
}

export default ExpandedCard
