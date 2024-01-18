
type ItemsProps = {
    items: string[];
    isOpen?: boolean;
}

//Create type Object for Items with key for title and value for redirect with useNavigate from react-router-dom

const Items = ({ items, isOpen }:ItemsProps) => {
    return ( 
            <ul>
                {items.map((item, index) => <li key={index} >{item}</li>)}
            </ul>
    )

};

export default Items;
