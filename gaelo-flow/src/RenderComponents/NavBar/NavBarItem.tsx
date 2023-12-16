type NavBarItemProps = {
    children?: React.ReactNode
    [key: string]: any
}

export const NavBarItem = ({children, ...props}:NavBarItemProps) => {
    return (
        <li className="text-gray-700 text-center mb-8" {...props}>
            {children}
        </li>
    )
}

export default NavBarItem;
