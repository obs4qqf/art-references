const ExpandedCard = ({clickedImage, minimizeImage}) => {
    return (
        <div id="expanded-card">
            <img src={clickedImage.image} alt="Expanded Image" />
            <i class="fas fa-times fa-3x" onClick={minimizeImage}></i>
        </div>
    )
}

export default ExpandedCard
