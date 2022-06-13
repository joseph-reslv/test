import React from 'react';

const Account: React.FC<{
    handleOnClick?: React.MouseEventHandler<SVGForeignObjectElement> | undefined;
}> = ({ handleOnClick }) => {
    return (
        <>
            <foreignObject onClick={handleOnClick} width="100%" height="100%" x={0} y={0}>
                <text x="20" y="35">
                    Account
                </text>
            </foreignObject>
        </>
    );
};

export default Account;
