import { EdgeData, NodeData } from 'reaflow/dist/types';

enum AlgorithmType {
    NETWORK = 'layered',
    GRID = 'rectpacking',
}

enum ResourceTypes {
    BLOCK = 'Block',
    CONTAINER = 'Container',
}

enum ContainerNodeTypes {
    ACCOUNT = 'Account',
    APIGATEWAYV2_API = 'API Gateway - API',
    APIGATEWAYV2_INTEGRATION = 'API Gateway - Integration',
    APIGATEWAYV2_STAGE = 'API Gateway - Stage',
    APIGATEWAYV2_ROUTE = 'API Gateway - Route',
    AZ = 'Availability Zone',
    DB_INSTANCE = 'DB Instance',
    EKS_CLUSTER = 'EKS Cluster',
    INSTANCE = 'Instance',
    IP_ADDRESS = 'IP Address',
    LAMBDA_FUNCTION = 'Lambda Function',
    LAMBDA_PERMISSION = 'Lambda Permission',
    LB = 'LB',
    LB_TARGET_GROUP = 'LB_TARGET_GROUP',
    NETWORK_INTERFACE = 'NETWORK_INTERFACE',
    REGION = 'Region',
    ROUTE53_ZONE = 'ROUTE53_ZONE',
    ROUTE_TABLE = 'Route Table',
    S3_BUCKET = 'S3_BUCKET',
    S3_OBJECT = 'S3 Object',
    SECURITY_GROUP = 'SECURITY_GROUP',
    SUBNET = 'Subnet',
    PUBLIC_SUBNET = 'Public Subnet',
    PRIVATE_SUBNET = 'Private Subnet',
    TGW = 'Transit Gateway',
    VPC = 'VPC',
    VPC_DHCP_OPTIONS = 'VPC_DHCP_OPTIONS',
    VPC_PEERING = 'VPC_PEERING',
    ZONE = 'Zone',
}

enum BlockNodeTypes {
    APIGATEWAYV2_API = 'API Gateway - API',
    APIGATEWAYV2_INTEGRATION = 'API Gateway - Integration',
    APIGATEWAYV2_STAGE = 'API Gateway - Stage',
    APIGATEWAYV2_ROUTE = 'API Gateway - Route',
    AWS_SECURITY_GROUP_RULE = 'AWS_SECURITY_GROUP_RULE',
    DB_INSTANCE = 'DB Instance',
    DB_PARAMETER_GROUP = 'DB_PARAMETER_GROUP',
    DB_SUBNET_GROUP = 'DB Subnet Group',
    EIP = 'EIP',
    EKS_CLUSTER_AUTH = 'EKS_CLUSTER_AUTH',
    EKS_NODE_GROUP = 'EKS_NODE_GROUP',
    IGW = 'Internet Gateway',
    INSTANCE = 'Instance',
    IP_ADDRESS = 'IP Address',
    LAMBDA_FUNCTION = 'Lambda Function',
    LAMBDA_PERMISSION = 'Lambda Permission',
    LB = 'LB',
    LB_LISTENER = 'LB_LISTENER',
    LB_TARGET_GROUP = 'LB_TARGET_GROUP',
    LB_TARGET_GROUP_ATTACHMENT = 'LB_TARGET_GROUP_ATTACHMENT',
    NAT_GATEWAY = 'NAT_GATEWAY',
    NETWORK_INTERFACE = 'NETWORK_INTERFACE',
    MAIN_ROUTE_TABLE_ASSOCIATION = 'Main Route Table Association',
    ROUTE53 = 'Route 53',
    ROUTE53_ZONE = 'ROUTE53_ZONE',
    ROUTE53_ZONE_ASSOCIATION = 'ROUTE53_ZONE_ASSOCIATION',
    ROUTE = 'ROUTE',
    ROUTE_TABLE_ASSOCIATION = 'Route Table Association',
    S3_BUCKET = 'S3_Bucket',
    S3_BUCKET_ACL = 'S3 Bucket ACL',
    S3_OBJECT = 'S3 Object',
    SECURITY_GROUP = 'SECURITY_GROUP',
    SUBNET = 'Subnet',
    PUBLIC_SUBNET = 'Public Subnet',
    PRIVATE_SUBNET = 'Private Subnet',
    TGW = 'Transit Gateway',
    TGW_VPC_ATTACHMENT = 'TGW VPC Attachment',
    TGW_ROUTE_TABLE = 'TGW Route Table',
    VPC = 'VPC',
    VPC_DHCP_OPTIONS_ASSOCIATION = 'VPC_DHCP_OPTIONS_ASSOCIATION',
    VPC_ENDPOINT = 'VPC_ENDPOINT',
    VPC_PEERING = 'VPC_PEERING',
    VPC_PEERING_CONNECTION_ACCEPTER = 'VPC_PEERING_CONNECTION_ACCEPTER',
    WAF = 'WAF',
}

enum Providers {
    AWS = 'aws',
    GCP = 'google',
    AZURE = 'azure',
}

type Data = {
    [key: string]: any;
    name?: string;
    description?: string;
    resource_count?: number;
    tag_name?: string;
};

interface CustomNodeData extends NodeData<Data> {
    provider: Providers;
    type: ContainerNodeTypes | BlockNodeTypes;
    resource: ResourceTypes;
    graph_data?: Data;
    temporary?: boolean;
}

interface JSONData {
    graph: Graph;
    output: Output;
    version: number;
}

interface Graph {
    export: Export;
}

interface Export {
    algorithm: AlgorithmType;
    edges: EdgeData[];
    nodes: CustomNodeData[];
}

interface Output {
    components: any;
    connection: Connection[];
    hierarchy: any;
}

interface Connection {
    connect_property: string;
    connect_to: string;
    id: string;
    name: string;
    parent: string;
    type: string;
}

type ContainerIconColorProp = {
    [key: string]: {
        svg: {
            fill?: string;
            viewBox?: string;
            width?: number;
            height?: number;
            x?: number;
            y?: number;
        };
        iconBG: {
            stroke?: string;
            fill?: string;
        };
        stroke: string;
        isNoIcon?: boolean;
        text?: string;
        containerBG?: string;
        edge?: string;
    };
};

type BlockIconColorProp = {
    [key: string]: {
        svg: {
            fill?: string;
            viewBox?: string;
            width?: number;
            height?: number;
            x?: number;
            y?: number;
        };
        iconBG: {
            stroke?: string;
            fill?: string;
        };
        stroke?: string;
        text?: string;
        edge?: string;
    };
};

export { AlgorithmType, ContainerNodeTypes, BlockNodeTypes, Providers, ResourceTypes };
export type { CustomNodeData, JSONData, BlockIconColorProp, ContainerIconColorProp };
