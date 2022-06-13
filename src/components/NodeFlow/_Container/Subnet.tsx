import React from 'react';

const Subnet: React.FC<{
    handleOnClick?: React.MouseEventHandler<SVGForeignObjectElement> | undefined;
}> = ({ handleOnClick }) => {
    return (
        <>
            <foreignObject onClick={handleOnClick} width="100%" height="100%" x={0} y={0}>
                <text x="20" y="35">
                    Subnet
                </text>
            </foreignObject>
        </>
    );
};

export default Subnet;
