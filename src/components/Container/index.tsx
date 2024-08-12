import { ReactNode } from "react"

interface ContainerProps{
    children: ReactNode,
    classes?: Array<string> | undefined,
}

const Container = (props: ContainerProps)=>{
    const combinedClasses = ['w-full max-w-7xl px-4 mx-auto', ...props?.classes || []].join(" ")
    return (
        <div className={combinedClasses}>
            {props.children}
        </div>
    )
}

export default Container;