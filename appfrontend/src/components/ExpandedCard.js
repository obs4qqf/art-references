const ExpandedCard = ({clickedImage, minimizeImage, addTag}) => {
    const keyDownEvent = (e) => {
        if (e.key === 'Enter') {
            addTag(clickedImage.id, e.target.value)
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
            <img src={clickedImage.image} alt="Expanded Image" />
            <i className="fas fa-times fa-3x" onClick={minimizeImage}></i>
            <input type="text" onKeyDown={keyDownEvent} />
            <p>{displayTags()}</p>
        </div>
    )
}

export default ExpandedCard
