type ToolItemProps = {
    children: React.ReactNode
    count: number
    onClick: (event: MouseEvent) => void
}

const ToolItem = ({ children, count, onClick }: ToolItemProps) => {
    return (
        <div className="flex items-center justify-around w-full h-8 transition-colors bg-white rounded-md shadow-md hover:bg-orange-500 group" onClick={onClick}>
            <span className="text-xl">{children}</span>
            <span className="rounded-full border border-gray-300 text-black bg-white shadow-[0_4px_6px rgba(255,165,0,0.5)] min-w-5 text-center">
                {count}
            </span>
        </div>
    )
}

export default ToolItem