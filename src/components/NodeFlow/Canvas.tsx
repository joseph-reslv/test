import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CustomNodeData, ContainerNodeTypes, ResourceTypes, Providers, BlockNodeTypes, AlgorithmType } from './types';
import {
    CanvasContainerProps,
    Canvas,
    Node,
    Arrow,
    NodeData,
    NodeChildProps,
    Edge,
    CanvasRef,
    EdgeData,
    ElkRoot,
    ElkCanvasLayoutOptions,
    EdgeProps,
} from 'reaflow';
// import { jsPDF } from 'jspdf';

import Fab from '@mui/material/Fab';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ImageIcon from '@mui/icons-material/Image';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Logo from 'assets/resolve-logo.png';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { addWaterMark, download, svgToBlob, svgToPng } from 'utils/converter';
import Container from './Container';
import Block from './Block';
import { BlockIconColor, ContainerIconColor } from './theme';

type Types = {
    [id: string]: {
        type: string;
        resource: string;
    };
};

const getEdgeColor = (edge: EdgeProps, types: Types) => {
    const resource = types[edge.source].resource;
    const type = types[edge.source].type;
    const edgeColor =
        (resource == ResourceTypes.CONTAINER
            ? ContainerIconColor[type] || ContainerIconColor['undefined']
            : BlockIconColor[type] || BlockIconColor['undefined']
        ).edge ?? '#000';
    return edgeColor;
};

interface CustomCanvasContainerProps extends CanvasContainerProps {
    algorithm?: AlgorithmType;
    provider: Providers;
    nodes: CustomNodeData[] | [];
    edges: EdgeData[] | [];
    onNodeClick?: ((event: React.MouseEvent<SVGGElement, MouseEvent>, data: NodeData) => void) | undefined;
}

const CustomCanvas: React.FC<CustomCanvasContainerProps> = (props) => {
    //const [currentMouseNodeData, setCurrentMouseNodeData] = useState<NodeData>();
    const algorithm = props.algorithm || AlgorithmType.NETWORK;
    const container = useRef<HTMLDivElement>(null);
    const SVGref = useRef<CanvasRef>(null);
    //const [zoom, setZoom] = useState(0.1);
    const [adjustedSize, setAdjustedSize] = useState<{ width: number; height: number }>({ width: 2000, height: 2000 });
    const [direction, setDirection] = useState<'RIGHT' | 'DOWN'>('RIGHT');

    const layoutOptions: ElkCanvasLayoutOptions = {
        'org.eclipse.elk.algorithm': `org.eclipse.elk.${algorithm}`,
        // 'org.eclipse.elk.algorithm': 'sporeCompaction',
        // 'org.eclipse.elk.underlyingLayoutAlgorithm': 'rectpacking',
        'org.eclipse.elk.edgeRouting': 'POLYLINE',
        'org.eclipse.elk.hierarchyHandling': 'INCLUDE_CHILDREN',
        // 'org.eclipse.elk.spacing.nodeNode': '100',

        ...(algorithm === 'rectpacking' && {
            'org.eclipse.elk.rectpacking.rowCompaction': 'false',
            'org.eclipse.elk.expandNodes': 'true',
            'org.eclipse.elk.contentAlignment': 'H_CENTER',
        }),
        // 'org.eclipse.elk.interactive': 'true',
        // 'org.eclipse.elk.interactiveLayout': 'true',
        // 'org.eclipse.elk.hypernode': 'true'

        // 'org.eclipse.elk.processingOrder.spanningTreeCostFunction': 'MINIMUM_ROOT_DISTANCE',
        // 'org.eclipse.elk.processingOrder.preferredRoot': 'CENTER_NODE',

        // 'org.eclipse.elk.separateConnectedComponents': 'TRUE',
        // 'org.eclipse.elk.edge.type': 'DEPENDENCY',

        // layered
        // 'org.eclipse.elk.layered.compaction.connectedComponents': 'false',
        // 'org.eclipse.elk.layered.compaction.postCompaction.strategy': 'LEFT_RIGHT_CONNECTION_LOCKING',
        // 'org.eclipse.elk.layered.compaction.postCompaction.constraints': 'QUADRATIC',

        // 'org.eclipse.elk.layered.considerModelOrder.strategy': 'PREFER_EDGES',
        // 'org.eclipse.elk.layered.considerModelOrder.longEdgeStrategy': 'DUMMY_NODE_UNDER',
        // 'org.eclipse.elk.layered.considerModelOrder.components': 'INSIDE_PORT_SIDE_GROUPS',
        // 'org.eclipse.elk.layered.considerModelOrder.crossingCounterNodeInfluence': '0.1',
        // 'org.eclipse.elk.layered.considerModelOrder.crossingCounterPortInfluence': '0',

        // 'org.eclipse.elk.layered.cycleBreaking.strategy': 'INTERACTIVE',

        // 'org.eclipse.elk.layered.crossingMinimization.strategy': 'INTERACTIVE',
        // 'org.eclipse.elk.layered.crossingMinimization.forceNodeModelOrder': 'false',
        // 'org.eclipse.elk.layered.crossingMinimization.semiInteractive': 'false',
        // 'org.eclipse.elk.layered.crossingMinimization.greedySwitch.type': 'TWO_SIDED',
        // 'org.eclipse.elk.layered.crossingMinimization.greedySwitch.activationThreshold': '400',
        // 'org.eclipse.elk.layered.crossingMinimization.greedySwitchHierarchical.type': 'OFF',
        // 'org.eclipse.elk.layered.crossingMinimization.hierarchicalSweepiness': '20',

        // 'elk.layered.directionCongruency': 'ROTATION',

        // 'org.eclipse.elk.layered.layering.strategy': 'MIN_WIDTH',
        // 'org.eclipse.elk.layered.layering.layerConstraint': 'LAST',
        'org.eclipse.elk.layered.layering.minWidth.upperBoundOnWidth': '2',
        'org.eclipse.elk.layered.layering.minWidth.upperLayerEstimationScalingFactor': '2',

        // 'elk.layered.mergeHierarchyEdges': 'true',

        // 'org.eclipse.elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX', //Edges styles
        // 'org.eclipse.elk.layered.nodePlacement.favorStraightEdges': 'true',
        // 'org.eclipse.elk.layered.nodePlacement.bk.edgeStraightening': 'IMPROVE_STRAIGHTNESS',
        // 'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'RIGHTUP',
        // 'org.eclipse.elk.layered.nodePlacement.networkSimplex.nodeFlexibility.default': 'PORT_POSITION',

        // 'org.eclipse.elk.layered.spacing.edgeNodeBetweenLayers': '10',

        // 'org.eclipse.elk.layered.interactiveReferencePoint': 'TOP_LEFT',

        // 'org.eclipse.elk.layered.unnecessaryBendpoints': 'false',

        // 'org.eclipse.elk.layered.wrapping.strategy': 'MULTI_EDGE',
        // 'org.eclipse.elk.layered.wrapping.additionalEdgeSpacing': '40',
        // 'org.eclipse.elk.layered.wrapping.correctionFactor': '4',
        // 'org.eclipse.elk.layered.wrapping.cutting.strategy': 'MSD',
        // 'org.eclipse.elk.layered.wrapping.cutting.msd.freedom': '5'
        // 'org.eclipse.elk.layered.wrapping.validify.strategy': 'NO',
        // 'org.eclipse.elk.layered.wrapping.multiEdge.improveCuts': 'false',
        // 'org.eclipse.elk.layered.wrapping.multiEdge.distancePenalty': "5",
        // 'org.eclipse.elk.layered.wrapping.multiEdge.improveWrappedEdges': 'false',
    };

    const onHandleNodeClick = (event: React.MouseEvent<SVGGElement, MouseEvent>, data: NodeData) => {
        //if(currentMouseNodeData && props.onNodeClick){
        if (props.onNodeClick) {
            props.onNodeClick(event, data);
        }
    };

    const nodes = useMemo(
        () =>
            props.nodes.map((node) => {
                node.layoutOptions = {
                    'elk.padding': '[left=100, top=70, right=100, bottom=70]',
                    portConstraints: 'UNDEFINED', // it must be free for outgoing edges

                    // 'org.eclipse.elk.insideSelfLoops.activate': 'true',

                    // layered
                    'org.eclipse.elk.layered.considerModelOrder.noModelOrder': 'true',

                    ...(node.resource === ResourceTypes.BLOCK &&
                        {
                            // 'org.eclipse.elk.rectpacking.expandToAspectRatio': 'true',
                            // 'org.eclipse.elk.rectpacking.onlyFirstIteration': 'true',
                            // 'org.eclipse.elk.rectpacking.optimizationGoal': 'AREA_DRIVEN',
                        }),

                    // 'org.eclipse.elk.layered.crossingMinimization.positionId': '',
                    // 'org.eclipse.elk.layered.crossingMinimization.positionChoiceConstraint' : '1',

                    // 'org.eclipse.elk.layered.nodePlacement.networkSimplex.nodeFlexibility': 'PORT_POSITION',
                };
                return {
                    ...node,
                    width: node.width || node.resource === ResourceTypes.CONTAINER ? 250 : 120,
                    height: node.height || node.resource === ResourceTypes.CONTAINER ? 150 : 120,
                    // TODO: Change size
                };
            }),
        [props.nodes, direction, algorithm],
    );

    const types = useMemo(
        () =>
            props.nodes
                .map((node) => {
                    return {
                        id: node.id,
                        type: node.type,
                        resource: node.resource,
                    };
                })
                .reduce((map, node) => {
                    map[node.id] = {
                        type: node.type,
                        resource: node.resource,
                    };
                    return map;
                }, {} as Types),
        [props.nodes],
    );

    // TODO: Remove later
    const edges = useMemo(
        () =>
            props.edges.filter((edge, index, self) => {
                return self.findIndex((e) => e.id === edge.id) === index;
            }),
        [props.edges],
    );

    const switcher = (node: CustomNodeData, event: NodeChildProps) => {
        if (ResourceTypes.CONTAINER === node.resource) {
            return (
                <Container
                    node={node}
                    nodeChild={event}
                    provider={props.provider}
                    type={node.type as ContainerNodeTypes}
                />
            );
        }
        if (ResourceTypes.BLOCK === node.resource) {
            return (
                <Block
                    node={node}
                    nodeChild={event}
                    provider={props.provider}
                    type={node.type as BlockNodeTypes}
                ></Block>
            );
        }
    };

    const exportSVG = async () => {
        if (SVGref.current && SVGref.current?.svgRef.current) {
            const blobObject = svgToBlob(SVGref.current?.svgRef.current);
            download(blobObject.svgUrl, 'export.svg');
        }
    };

    const exportPNG = async () => {
        if (SVGref.current && SVGref.current?.svgRef.current) {
            // Export PNG
            await svgToPng(SVGref.current?.svgRef.current, 20, '#fff').then((url: string) => {
                download(url, 'export.png');
            });
        }
    };

    // const exportPDF = useCallback(async () => {
    //     if (SVGref.current && SVGref.current?.svgRef.current && adjustedSize?.height && adjustedSize?.width) {
    //         // Export PDF
    //         const doc = new jsPDF({ format: 'a4' });
    //         await svgToPng(SVGref.current?.svgRef.current, 20, '#fff').then((url: string) => {
    //             const pdfWidth = doc.internal.pageSize.getWidth();
    //             const pdfHeight = doc.internal.pageSize.getHeight();
    //             const isVertical = adjustedSize.height > adjustedSize.width;
    //             const ratio = isVertical ? pdfWidth / adjustedSize.width : pdfHeight / adjustedSize.height;
    //             const width = isVertical ? pdfWidth : ratio * adjustedSize.width;
    //             const height = isVertical ? ratio * adjustedSize.height : pdfHeight;
    //             const pages = parseInt((isVertical ? height / pdfHeight : width / pdfWidth).toFixed(0)) + 1;
    //             const lastPageHeight = isVertical ? height % pdfHeight : width % pdfWidth;

    //             for (let i = 1; i >= pages; i++) {
    //                 if (isVertical) {
    //                     doc.addPage('a4');
    //                 } else {
    //                 }
    //             }
    //             doc.addImage(url, 'PNG', 0, 0, width, height);
    //             // doc.addImage(url,'PNG',0, 0, width, height);
    //             doc.save('TestSVG.pdf');
    //         });
    //         //doc.save('TestSVG.pdf');
    //     }
    // }, [SVGref.current?.svgRef.current, adjustedSize?.width, adjustedSize?.height]);

    const handleOnLayoutChange = (layout: ElkRoot) => {
        setAdjustedSize({
            height: layout.height && layout.height > 2000 ? layout.height : 2000,
            width: layout.width && layout.width > 2000 ? layout.width : 2000,
        });
    };

    useEffect(() => {
        // Only trigger when SVG init
        if (SVGref.current && SVGref.current?.svgRef.current && adjustedSize?.width && adjustedSize?.height) {
            const svg = SVGref.current?.svgRef.current;
            if (svg) {
                addWaterMark(svg, Logo);
            }
        }
    }, [SVGref.current?.svgRef.current, adjustedSize?.width, adjustedSize?.height]);

    useEffect(() => {
        if (container.current && adjustedSize?.width && adjustedSize?.height) {
            // scroll center of SVG
            const x = adjustedSize.width / 2 - container.current.clientWidth / 2;
            const y = adjustedSize.height / 2 - container.current.clientHeight / 2;
            container.current.scrollTo(x, y);
        }
    }, [container.current, adjustedSize?.width, adjustedSize?.height]);

    return (
        <>
            <div ref={container} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'auto' }}>
                <Canvas
                    {...props}
                    ref={SVGref}
                    nodes={nodes}
                    edges={edges}
                    //zoom={zoom}
                    maxZoom={0}
                    minZoom={-0.9}
                    //onZoomChange={(z)=>setZoom(z)}
                    layoutOptions={layoutOptions}
                    onLayoutChange={handleOnLayoutChange}
                    animated={false}
                    direction={direction}
                    width={adjustedSize?.width || 2000}
                    height={adjustedSize?.height || 2000}
                    maxWidth={adjustedSize?.width || 2000}
                    maxHeight={adjustedSize?.height || 2000}
                    arrow={<Arrow></Arrow>} // comment out for show the default arrow.
                    edge={(edge) => {
                        return (
                            <Edge
                                containerClassName={`${edge.id} edge`}
                                style={{ fill: 'none', strokeWidth: '1px', stroke: getEdgeColor(edge, types) }}
                            />
                        );
                    }}
                    node={(node) => {
                        return (
                            <Node
                                className={`${node.id}`}
                                onClick={onHandleNodeClick}
                                //onEnter={(_,n) => setCurrentMouseNodeData(n)}
                                style={{ strokeWidth: 0, fill: 'none' }}
                            >
                                {(event) => {
                                    const node: CustomNodeData = event.node as CustomNodeData;
                                    return switcher(node, event);
                                }}
                            </Node>
                        );
                    }}
                ></Canvas>
            </div>
            <Fab
                onClick={exportSVG}
                sx={{ position: 'absolute', bottom: 16, left: 16 }}
                size="small"
                aria-label="Export SVG"
                color={'primary'}
            >
                <FileDownloadIcon />
            </Fab>
            <Fab
                onClick={exportPNG}
                sx={{ position: 'absolute', bottom: 16, left: 64 }}
                size="small"
                aria-label="Export PNG"
                color={'primary'}
            >
                <ImageIcon />
            </Fab>
            {/* <Fab
                onClick={exportPDF}
                sx={{ position: 'absolute', bottom: 16, left: 112 }}
                size="small"
                aria-label="Export PNG"
                color={'primary'}
            >
                <PictureAsPdfIcon />
            </Fab> */}
            {/* 
            <Fab
                onClick={() => setAlgorithm(algorithm === 'layered' ? 'rectpacking' : 'layered')}
                sx={{ position: 'absolute', bottom: 16, right: 64 }}
                size="small"
                aria-label="Change Algorithm"
                color={'primary'}
            >
                {algorithm === 'layered' ? <GridViewIcon /> : <AccountTreeIcon />}
            </Fab> */}

            <Fab
                onClick={() => setDirection(direction === 'RIGHT' ? 'DOWN' : 'RIGHT')}
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                size="small"
                aria-label="Change Dirction"
                color={'primary'}
            >
                {direction === 'RIGHT' ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
            </Fab>
        </>
    );
};

export default CustomCanvas;
