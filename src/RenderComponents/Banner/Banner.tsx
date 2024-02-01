
//WIP - Banner component
export type BannerProps = {
    children: React.ReactNode;
    className?: string;
}

export const Banner = ({children,className}:BannerProps) => {
    return (
        <div className={`flex items-center justify-center w-full ${className}`}>
            {children}
        </div>
    )

}

