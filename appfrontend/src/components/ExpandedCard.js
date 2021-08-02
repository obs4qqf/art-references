const ExpandedCard = ({clickedImageID, minimizeImage, addTag, references}) => {
    const keyDownEvent = (e) => {
        if (e.key === 'Enter') {
            addTag(clickedImageID, e.target.value)
          }
    }

    const displayTags = () => {
        let counter = 1
        let tags = ""
        getImage(clickedImageID).tags.map(tag => {
            if (counter === 1) {
                tags = tag
            } else {
                tags += ", "+tag
            }
            counter += 1
        })
        return tags
    }

    const getImage = (id) => {
        const image = references.filter(reference => reference.id === id)
        return image[0]
    }

    return (
        <div id="expanded-card">
            <img src={getImage(clickedImageID).image} alt="Expanded Image" />
            <i className="fas fa-times fa-3x" onClick={minimizeImage}></i>
            <input type="text" onKeyDown={keyDownEvent} />
            <p>{displayTags()}</p>
        </div>
    )
}

export default ExpandedCard
