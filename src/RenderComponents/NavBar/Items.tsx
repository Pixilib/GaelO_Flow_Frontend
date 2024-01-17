
interface ItemsProps {
    items: string[];
}

const Items = ({ items }:ItemsProps) => {
    return (
        <ul>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    );
};

export default Items;
