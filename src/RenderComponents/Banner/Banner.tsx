
//WIP - Banner component
export type BannerProps = {
    children: React.ReactNode;
}

export const Banner = ({children}:BannerProps) => {
    return (
        <div className="flex items-center justify-center w-full">
            {children}
        </div>
    )

}

