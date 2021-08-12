import TagsList from "./TagsList"
import CardDescription from "./CardDescription"

const ExpandedCard = ({clickedImage, minimizeImage, addTag, deleteTag, retrieveRefs}) => {
    const enterTag = (e) => {
        if (e.key === 'Enter') {
            addTag(clickedImage.id, e.target.value)
            e.target.value = ''
          }
    }

    return (
        <div id="expanded-card-background">
            <div id="expanded-card">
                <div className="tag-input-area">
                    <input type="text" onKeyDown={enterTag} />
                    <TagsList tags={clickedImage.tags} deleteTag={deleteTag} id={clickedImage.id}/>
                </div>
                <div>
                    <img src={clickedImage.url} alt="Expanded Image" />
                    <i className="fas fa-times fa-3x" onClick={minimizeImage}></i>
                </div>
                <CardDescription retrieveRefs={retrieveRefs} id={clickedImage.id}/>
            </div>
        </div>
    )
}

export default ExpandedCard
