import React from 'react';
import { BlockNodeTypes, CustomNodeData, Providers } from './types';
import { NodeChildProps } from 'reaflow';
import ResourceIcon from './ResourceIcon';
import { BlockIconColor } from './theme';
import Label from './Label';

interface BlockProps {
    node: CustomNodeData;
    nodeChild: NodeChildProps;
    provider: Providers;
    type: BlockNodeTypes;
}

const iconSize = 80;

const Block: React.FC<BlockProps> = ({ node, provider, nodeChild, type }) => {
    const typeIndex = Object.values(BlockNodeTypes).indexOf(type);
    const typeKey = Object.keys(BlockNodeTypes)[typeIndex];
    const typeValue = Object.values(BlockNodeTypes)[typeIndex];
    const iconColors = BlockIconColor[type] || BlockIconColor['undefined'];

    const iconX = (nodeChild.width - iconSize) / 2;

    const data = {
        ...node.data,
        ...node.graph_data,
    };

    const nameProps = {
        x: nodeChild.width / 2,
        y: 115,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
    };

    const typeProps = {
        x: nodeChild.width / 2,
        y: 95,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fontSize: '12',
    };

    const badgeProps = {
        circle: {
            cx: iconSize,
            cy: 0,
            r: 10,
            fill: 'red',
        },
        text: {
            x: iconSize,
            y: 2,
            letterSpacing: 0,
            fill: '#fff',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            fontSize: '12',
        },
    };

    return (
        <g opacity={node.temporary ? 0.5 : 1}>
            <g transform={`translate(${iconX},0)`}>
                <rect style={{ strokeWidth: 1 }} width={iconSize} height={iconSize} {...iconColors?.iconBG}></rect>
                <ResourceIcon
                    width={iconSize}
                    height={iconSize}
                    provider={provider}
                    {...iconColors?.svg}
                    type={typeKey?.toLowerCase()}
                />
                {data && data.resource_count && (
                    <>
                        <circle {...badgeProps.circle}></circle>
                        <text {...badgeProps.text}>{data.resource_count}</text>
                    </>
                )}
            </g>
            <Label {...typeProps}>{typeValue}</Label>
            {data.tag_name !== '' && (
                <Label {...nameProps}>
                    {/**
                     * if tag_name === '', the label would not show
                     * else tag_name > name > id > node.id
                     * */}
                    {data.tag_name !== undefined
                        ? data.tag_name
                        : data?.name
                        ? data?.name
                        : data?.id
                        ? data?.id
                        : node.id}
                </Label>
            )}
        </g>
    );
};

export default Block;
