const ExpandedCard = ({clickedImage}) => {
    return (
        <div id="expanded-card">
            <img src={clickedImage.image} alt="Expanded Image" />
        </div>
    )
}

export default ExpandedCard
