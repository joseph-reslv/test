import React from 'react';
import { ContainerNodeTypes, CustomNodeData, Providers } from './types';

import ResourceIcon from './ResourceIcon';
import { NodeChildProps } from 'reaflow';
import { ContainerIconColor } from './theme';
import Label from './Label';

interface ContainerProps {
    node: CustomNodeData;
    nodeChild: NodeChildProps;
    provider: Providers;
    type: ContainerNodeTypes;
}

const Container: React.FC<ContainerProps> = ({ node, provider, nodeChild, type }) => {
    const typeIndex = Object.values(ContainerNodeTypes).indexOf(type);
    const typeKey = Object.keys(ContainerNodeTypes)[typeIndex];
    const typeValue = Object.values(ContainerNodeTypes)[typeIndex];
    const iconColors = ContainerIconColor[type] || ContainerIconColor['undefined'];
    const isNoIcon = iconColors.isNoIcon;

    const data = {
        ...node.data,
        ...node.graph_data,
    };

    const nameProps = {
        // textAnchor: isNoIcon ? 'middle' : 'start',
        // x: isNoIcon ? nodeChild.width / 2 : 32,
        textAnchor: 'start',
        x: isNoIcon ? 3 : 32,
        y: 17,
        dominantBaseline: 'middle',
        fontSize: '12',
        fill: iconColors.text,
    };
    const typeProps = {
        x: nodeChild.width - 5,
        y: 17,
        textAnchor: 'end',
        dominantBaseline: 'middle',
        fontSize: '12',
    };
    const descriptionProps: React.SVGProps<SVGTextElement> = {
        y: 38,
        x: 3,
        dominantBaseline: 'middle',
        fontSize: '10',
    };
    return (
        <>
            <rect
                style={{
                    stroke: iconColors?.stroke,
                    fill: 'transparent',
                    strokeWidth: 1,
                    //pointerEvents: 'none',
                    ...(isNoIcon && { strokeDasharray: 5 }),
                }}
                width={nodeChild.width}
                height={nodeChild.height}
            ></rect>
            {!isNoIcon && (
                <>
                    <rect x={0} y={0} width={28} height={28} {...iconColors?.iconBG}></rect>
                    <ResourceIcon x={1} y={1} {...iconColors?.svg} provider={provider} type={typeKey?.toLowerCase()} />
                </>
            )}
            <Label {...nameProps}>
                {/* tag_name > name > id > node.id */}
                {data.tag_name ? data.tag_name : data?.name ? data?.name : data?.id ? data?.id : node.id}
            </Label>
            <Label {...typeProps}>{typeValue}</Label>
            {data?.description && (
                <Label length={50} {...descriptionProps}>
                    {data.description}
                </Label>
            )}
        </>
    );
};

export default Container;
