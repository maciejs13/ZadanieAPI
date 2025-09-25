
interface CardProps {
    pokemon: string;
    type: string;
    image?: string;
}

function Card({ pokemon, type, image }: CardProps) {
    return (
        <div className="card" style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <h2>{pokemon}</h2>
            <p>Typ: {type}</p>
            {image && <img src={image} style={{ width: 100, height: 100 }} />}
        </div>
    );
}

export default Card;