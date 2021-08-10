const Card = ({reference, enlargeImage}) => {
    return (
        <div className="card">
            <img src={reference.url} alt="Placeholder Image" onClick={() => enlargeImage(reference.id)} />
        </div>
    )
}

export default Card
