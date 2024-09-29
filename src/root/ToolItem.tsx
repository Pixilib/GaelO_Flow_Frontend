type ToolItemProps = {
    children: React.ReactNode
    count: number
}

const ToolItem = ({ children, count }: ToolItemProps) => {
    return (
        <div className="flex items-center justify-center w-full transition-colors bg-white rounded-md shadow-md hover:bg-orange-500 group">
            <span className="text-xl ">{children}</span>
            <span className="rounded-full border border-gray-300 text-black bg-white shadow-[0_4px_6px rgba(255,165,0,0.5)]">
                {count}
            </span>
        </div>
    )
}

export default ToolItem