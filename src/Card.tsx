interface CardProps {
    pokemon: string;
    type: string;
}

export default function Card({ pokemon, type }: CardProps) {
    return (
        <div className="card" style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2>{pokemon}</h2>
            <p>Typ: {type}</p>
        </div>
    );
}
