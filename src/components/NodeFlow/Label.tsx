import React from "react";

type CustomSVGTextElement = {
    length?: number;
}

const Label: React.FC<React.SVGProps<SVGTextElement> & CustomSVGTextElement> = ({children, length = 30, ...rest}) => {
    const label: string = children?.toString() || "";
    return (
        <text pointerEvents={'none'} {...rest}>
            {`${label.slice(0,length)}${label.length > length ? '...' : ''}`}
        </text>
    )
}

export default Label;