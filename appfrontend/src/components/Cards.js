import Card from './Card'

const Cards = ({references}) => {
    return (
        <div id="cards-grid">
            {references.map(reference => <Card id={reference.id} reference={reference} />)}
        </div>
    )
}

export default Cards
