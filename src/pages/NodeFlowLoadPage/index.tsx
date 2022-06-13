import React, { useEffect } from 'react';

import { CanvasProps, NodeData } from 'reaflow';
import CustomCanvas from 'components/NodeFlow/Canvas';
import {
    AlgorithmType,
    BlockNodeTypes,
    ContainerNodeTypes,
    CustomNodeData,
    Providers,
    ResourceTypes,
} from 'components/NodeFlow/types';

import output from '../../../public/json/output.json';
//const output = lazy(() => import(''));

const NodeFlowLoadPage: React.FC = () => {
    const { edges, nodes, algorithm } = output.graph.export;
    const la = algorithm.toUpperCase() as keyof typeof AlgorithmType;
    const updatedNodes = nodes
        .map((node) => {
            const { resource, type } = node;
            const r = resource.toUpperCase() as unknown as keyof typeof ResourceTypes;
            const tc = type.toUpperCase() as unknown as keyof typeof ContainerNodeTypes;
            const tb = type.toUpperCase() as unknown as keyof typeof BlockNodeTypes;

            return {
                ...node,
                resource: ResourceTypes[r],
                type: r === 'BLOCK' ? BlockNodeTypes[tb] : ContainerNodeTypes[tc],
            } as CustomNodeData;
        })
        .sort((a, b) => {
            // TODO: REMOVE the sort after develop
            if (a.type > b.type) return 1;
            if (b.type > a.type) return -1;
            return 0;
        });

    const onHandleCanvasClick: CanvasProps['onCanvasClick'] = (event) => {
        console.log(event);
    };

    const onHandleNodeClick = (_event: React.MouseEvent<SVGGElement, MouseEvent>, _data: NodeData) => {
        //console.log(event, data);
    };

    useEffect(() => {
        console.log(updatedNodes);
    }, [updatedNodes]);

    return (
        <div
            style={{
                position: 'relative',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100%',
                overflow: 'auto',
            }}
        >
            <CustomCanvas
                algorithm={AlgorithmType[la]}
                nodes={updatedNodes}
                edges={edges}
                onCanvasClick={onHandleCanvasClick}
                onNodeClick={onHandleNodeClick}
                provider={Providers.AWS}
            />
        </div>
    );
};

export default NodeFlowLoadPage;
