import React, { useState } from 'react';

import { CanvasProps, EdgeData, NodeData } from 'reaflow';
import CustomCanvas from 'components/NodeFlow/Canvas';
import {
    AlgorithmType,
    BlockNodeTypes,
    ContainerNodeTypes,
    CustomNodeData,
    JSONData,
    Providers,
    ResourceTypes,
} from 'components/NodeFlow/types';

//import output from '../../../public/json/output.json';
import { FileUploader } from 'react-drag-drop-files';
import Box from '@mui/material/Box';
//const output = lazy(() => import(''));

const DNDLoadPage: React.FC = () => {
    const [nodes, setNodes] = useState<CustomNodeData[]>([]);
    const [edges, setEdges] = useState<EdgeData[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(AlgorithmType.NETWORK);
    const updatedNodes = nodes
        .sort((a, b) => {
            // TODO: REMOVE the sort after develop
            if (a.type > b.type) return 1;
            if (b.type > a.type) return -1;
            return 0;
        })
        .map((node) => {
            const { resource, type } = node;
            const r = resource.toUpperCase() as unknown as keyof typeof ResourceTypes;
            const tc = type.toUpperCase() as unknown as keyof typeof ContainerNodeTypes;
            const tb = type.toUpperCase() as unknown as keyof typeof BlockNodeTypes;

            return {
                ...node,
                resource: ResourceTypes[r],
                type: r === 'BLOCK' ? BlockNodeTypes[tb] : ContainerNodeTypes[tc],
            };
        });

    const handleChange = async (file: File) => {
        const text = await file.text();
        const jsonData = JSON.parse(text) as JSONData;
        if (jsonData.graph) {
            setNodes(jsonData.graph.export.nodes);
            setEdges(jsonData.graph.export.edges);

            if (jsonData.graph.export.algorithm) {
                const la = jsonData.graph.export.algorithm.toUpperCase() as keyof typeof AlgorithmType;
                setAlgorithm(AlgorithmType[la]);
            }
        }
    };

    const onHandleCanvasClick: CanvasProps['onCanvasClick'] = (event) => {
        console.log(event);
    };

    const onHandleNodeClick = (_event: React.MouseEvent<SVGGElement, MouseEvent>, _data: NodeData) => {
        //console.log(event, data);
    };

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
            {nodes.length === 0 ? (
                <Box
                    style={{ height: '100%' }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <FileUploader handleChange={handleChange} name="file" types={['JSON']} />
                </Box>
            ) : (
                <CustomCanvas //TODO: Direct import json
                    algorithm={algorithm}
                    nodes={updatedNodes}
                    edges={edges}
                    onCanvasClick={onHandleCanvasClick}
                    onNodeClick={onHandleNodeClick}
                    provider={Providers.AWS}
                />
            )}
        </div>
    );
};

export default DNDLoadPage;
