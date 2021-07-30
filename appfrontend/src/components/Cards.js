import Card from './Card'

const Cards = ({references, enlargeImage}) => {
    return (
        <div id="cards-grid">
            {references.map(reference => <Card key={reference.id} reference={reference} enlargeImage={enlargeImage}/>)}
        </div>
    )
}

export default Cards
