const Card = ({reference, enlargeImage}) => {
    return (
        <div className="card">
            <img src={reference.image} alt="Placeholder Image" onClick={() => enlargeImage(reference.id)} />
        </div>
    )
}

export default Card
