import React from 'react';

import { CanvasProps, NodeData } from 'reaflow';
import CustomCanvas from 'components/NodeFlow/Canvas';
import { AlgorithmType, BlockNodeTypes, ContainerNodeTypes, Providers, ResourceTypes } from 'components/NodeFlow/types';

const NodeFlowPage: React.FC = () => {
    const onHandleCanvasClick: CanvasProps['onCanvasClick'] = (event) => {
        console.log(event);
    };

    const onHandleNodeClick = (_event: React.MouseEvent<SVGGElement, MouseEvent>, _data: NodeData) => {
        //console.log(event, data);
    };

    return (
        <div style={{ position: 'relative', top: 0, bottom: 0, left: 0, right: 0, width: '100%', overflow: 'auto' }}>
            <CustomCanvas
                algorithm={AlgorithmType.NETWORK}
                nodes={[
                    {
                        id: '1',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '11',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '12',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '13',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '14',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '15',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '16',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '17',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '18',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '19',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '20',
                        type: ContainerNodeTypes.ACCOUNT,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        data: {
                            defaultValue: 50,
                        },
                    },
                    {
                        id: '1.8',
                        type: BlockNodeTypes.WAF,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                        },
                    },
                    {
                        id: '2',
                        type: BlockNodeTypes.ROUTE53,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        data: {
                            defaultValue: 25,
                        },
                    },
                    {
                        id: '1.4',
                        type: BlockNodeTypes.TGW,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                        },
                    },
                    {
                        id: '1.1',
                        type: ContainerNodeTypes.VPC,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                            description: '10.0.0.1/16',
                            name: 'VPC-1',
                        },
                    },
                    {
                        id: '1.2',
                        type: ContainerNodeTypes.VPC,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                            description: '10.1.0.1/16',
                            name: 'VPC-2',
                        },
                    },
                    {
                        id: '1.3',
                        type: ContainerNodeTypes.VPC,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                            description: '10.2.0.1/16',
                            name: 'VPC-3',
                        },
                    },
                    {
                        id: '1.5',
                        type: ContainerNodeTypes.VPC,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1',
                        data: {
                            defaultValue: 25,
                            description: '10.3.0.1/16',
                            name: 'VPC-4',
                        },
                    },
                    // {
                    //     id: '1.6',
                    //     type: ContainerNodeTypes.VPC,provider: Providers.AWS,resource: ResourceTypes.CONTAINER,
                    //     parent: '1',
                    //     data: {
                    //         defaultValue: 25,
                    //         description: "10.0.0.9/16",
                    //         name: 'VPC-5'
                    //     },
                    // },
                    {
                        id: '1.1.1',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.1',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone A',
                        },
                    },
                    {
                        id: '1.1.2',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.1',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone B',
                        },
                    },
                    {
                        id: '1.2.1',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.2',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone A',
                        },
                    },
                    {
                        id: '1.3.1',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.3',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone A',
                        },
                    },
                    {
                        id: '1.5.1',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.5',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone A',
                        },
                    },
                    {
                        id: '1.6.1',
                        type: ContainerNodeTypes.AZ,
                        provider: Providers.AWS,
                        resource: ResourceTypes.CONTAINER,
                        parent: '1.6',
                        data: {
                            defaultValue: 25,
                            name: 'Availability Zone A',
                        },
                    },
                    {
                        id: '1.1.1.1',
                        type: BlockNodeTypes.PUBLIC_SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.1.1',
                        data: {
                            defaultValue: 25,
                            name: 'Public Subnet-1a',
                        },
                    },
                    {
                        id: '1.1.1.2',
                        type: BlockNodeTypes.PRIVATE_SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.1.1',
                        data: {
                            defaultValue: 25,
                            name: 'Private Subnet-1a',
                        },
                    },
                    {
                        id: '1.1.2.1',
                        type: BlockNodeTypes.SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.1.2',
                        data: {
                            defaultValue: 25,
                            name: 'Public Subnet-1b',
                        },
                    },
                    {
                        id: '1.1.2.2',
                        type: BlockNodeTypes.SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.1.2',
                        data: {
                            defaultValue: 25,
                            name: 'Private Subnet-1b',
                        },
                    },
                    {
                        id: '1.2.1.1',
                        type: BlockNodeTypes.SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.2.1',
                        data: {
                            defaultValue: 25,
                            name: 'Subnet-2',
                        },
                    },
                    {
                        id: '1.3.1.1',
                        type: BlockNodeTypes.SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.3.1',
                        data: {
                            defaultValue: 25,
                            name: 'Subnet-3',
                        },
                    },
                    {
                        id: '1.5.1.1',
                        type: BlockNodeTypes.SUBNET,
                        provider: Providers.AWS,
                        resource: ResourceTypes.BLOCK,
                        parent: '1.5.1',
                        data: {
                            defaultValue: 25,
                            name: 'Subnet-4',
                        },
                    },
                ]}
                edges={[
                    {
                        id: '1',
                        from: '1.4',
                        to: '1.2.1.1',
                    },
                    {
                        id: '2',
                        from: '1.4',
                        to: '1.1.1.1',
                    },
                    {
                        id: '3',
                        from: '1.4',
                        to: '1.3.1.1',
                    },
                    {
                        id: '4',
                        from: '1.4',
                        to: '1.5.1.1',
                    },
                    {
                        id: '5',
                        from: '1.4',
                        to: '1.1.2.1',
                    },
                    {
                        id: '6',
                        from: '1.1.2.1',
                        to: '1.1.2.2',
                        parent: '1.1.2',
                    },
                    {
                        id: '7',
                        from: '1.1.1.1',
                        to: '1.1.1.2',
                        parent: '1.1.1',
                    },
                    {
                        id: '8',
                        from: '2',
                        to: '1.4',
                    },
                    {
                        id: '9',
                        from: '1.1',
                        to: '1.3',
                        parent: '1',
                    },
                ]}
                onCanvasClick={onHandleCanvasClick}
                onNodeClick={onHandleNodeClick}
                provider={Providers.AWS}
            />
        </div>
    );
};

export default NodeFlowPage;
