import { BlockIconColorProp, BlockNodeTypes, ContainerIconColorProp, ContainerNodeTypes } from './types';

const label = 'undefined';

const ContainerIconColor: ContainerIconColorProp = {
    [label]: {
        svg: { fill: '#fff' },
        iconBG: { stroke: '#000', fill: '#000' },
        stroke: '#000',
    },
    [ContainerNodeTypes.ACCOUNT]: {
        svg: { fill: '#fff' },
        iconBG: { stroke: '#000', fill: '#242F3E' },
        stroke: '#000',
    },
    [ContainerNodeTypes.APIGATEWAYV2_API]: {
        svg: { fill: 'none', viewBox: '0 0 80 80' },
        iconBG: { stroke: '#000', fill: '#242F3E' },
        stroke: '#000',
        edge: '#242F3E',
    },
    [ContainerNodeTypes.DB_INSTANCE]: {
        svg: { fill: '#fff', viewBox: '0 0 48 48' },
        iconBG: { stroke: '#D45B09', fill: '#D45B09' },
        stroke: '#d86613',
    },
    [ContainerNodeTypes.EKS_CLUSTER]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64' },
        iconBG: { stroke: 'orange', fill: '#fff' },
        stroke: 'orange',
        edge: 'orange',
    },
    [ContainerNodeTypes.INSTANCE]: {
        svg: { fill: '#fff', viewBox: '0 0 80 80' },
        iconBG: { stroke: '#D45B09', fill: '#D45B09' },
        stroke: '#d86613',
        edge: '#d86613',
    },
    [ContainerNodeTypes.IP_ADDRESS]: {
        svg: { fill: '#fff', viewBox: '0 0 24 24' },
        iconBG: { stroke: '#D45B09', fill: '#D45B09' },
        stroke: '#d86613',
        edge: '#d86613',
    },
    [ContainerNodeTypes.LAMBDA_FUNCTION]: {
        svg: { fill: '#fff', viewBox: '0 0 48 48' },
        iconBG: { stroke: '#000', fill: '#fff' },
        stroke: '#000',
    },
    [ContainerNodeTypes.LB]: {
        svg: { fill: '#000', viewBox: '0 0 64 64' },
        iconBG: { stroke: '#000', fill: '#000' },
        stroke: '#000',
        edge: 'purple',
    },
    [ContainerNodeTypes.PUBLIC_SUBNET]: {
        svg: { fill: '#fff' },
        iconBG: { stroke: '#3E8624', fill: '#3E8624' },
        stroke: '#3E8624',
        edge: '#3E8624',
    },
    [ContainerNodeTypes.PRIVATE_SUBNET]: {
        svg: { fill: '#fff' },
        iconBG: { stroke: '#137EBA', fill: '#137EBA' },
        stroke: '#137EBA',
        edge: '#137EBA',
    },
    [ContainerNodeTypes.REGION]: {
        svg: { fill: '#fff' },
        iconBG: { fill: '#137EBA' },
        stroke: '#5b9cd5',
    },
    [ContainerNodeTypes.ROUTE53_ZONE]: {
        svg: { fill: '#000', viewBox: '0 0 80 80' },
        iconBG: { stroke: '#000', fill: '#fff' },
        stroke: '#000',
    },
    [ContainerNodeTypes.ROUTE_TABLE]: {
        svg: { fill: '#000', viewBox: '0 0 48 48' },
        iconBG: { stroke: '#000', fill: '#fff' },
        stroke: '#000',
    },
    [ContainerNodeTypes.S3_BUCKET]: {
        svg: { fill: '#000', viewBox: '0 0 48 48' },
        iconBG: { stroke: '#000', fill: '#fff' },
        stroke: '#000',
    },
    [ContainerNodeTypes.SECURITY_GROUP]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64', x: 2 },
        iconBG: { stroke: '#df3312', fill: '#df3312' },
        stroke: '#df3312',
    },
    [ContainerNodeTypes.SUBNET]: {
        svg: { fill: '#fff' },
        iconBG: { stroke: '#3E8624', fill: '#3E8624' },
        stroke: '#3E8624',
    },
    [ContainerNodeTypes.TGW]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
        stroke: '#000',
    },
    [ContainerNodeTypes.VPC]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64' },
        iconBG: { fill: '#3E8624' },
        stroke: '#1e8900',
    },

    // NO ICONS
    [ContainerNodeTypes.AZ]: {
        isNoIcon: true,
        svg: { fill: 'none' }, // NO ICONS
        iconBG: { stroke: 'none', fill: 'none' }, // NO ICONS
        stroke: '#5b9cd5',
        text: '#5b9cd5',
    },
    [ContainerNodeTypes.ZONE]: {
        isNoIcon: true,
        svg: { fill: 'none' }, // NO ICONS
        iconBG: { stroke: 'none', fill: 'none' }, // NO ICONS
        stroke: '#5b9cd5',
    },
};

const BlockIconColor: BlockIconColorProp = {
    [label]: {
        svg: { fill: '#fff' },
        iconBG: { fill: 'none', stroke: '#000' },
    },
    [BlockNodeTypes.APIGATEWAYV2_API]: {
        svg: { fill: 'none', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.APIGATEWAYV2_INTEGRATION]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.APIGATEWAYV2_STAGE]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.APIGATEWAYV2_ROUTE]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.DB_INSTANCE]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.DB_SUBNET_GROUP]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.EIP]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: '#fff', stroke: 'orange' },
    },
    [BlockNodeTypes.INSTANCE]: {
        svg: { fill: '#fff' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.IGW]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.IP_ADDRESS]: {
        svg: { fill: '#D45B09', viewBox: '0 0 24 24' },
        iconBG: { fill: '#fff' },
    },
    [BlockNodeTypes.LB]: {
        svg: { fill: 'none', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
        edge: 'purple',
    },
    [BlockNodeTypes.LAMBDA_PERMISSION]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.MAIN_ROUTE_TABLE_ASSOCIATION]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.NETWORK_INTERFACE]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.NAT_GATEWAY]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.PUBLIC_SUBNET]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64', x: 10, y: 10 },
        iconBG: { fill: '#3E8624' },
    },
    [BlockNodeTypes.PRIVATE_SUBNET]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64', x: 10, y: 10 },
        iconBG: { fill: '#137EBA' },
    },
    [BlockNodeTypes.ROUTE53]: {
        svg: { fill: '#fff' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.ROUTE53_ZONE_ASSOCIATION]: {
        svg: { fill: '#000', viewBox: '0 0 80 80' },
        iconBG: { stroke: '#000', fill: '#fff' },
        stroke: '#000',
    },
    [BlockNodeTypes.S3_BUCKET]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.S3_BUCKET_ACL]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.S3_OBJECT]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.SECURITY_GROUP]: {
        svg: { fill: '#fff', viewBox: '0 0 80 80', x: 9, y: 9 },
        iconBG: { fill: '#df3312' },
    },
    [BlockNodeTypes.SUBNET]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64', x: 10, y: 10 },
        iconBG: { fill: '#3E8624' },
    },
    [BlockNodeTypes.TGW]: {
        svg: { fill: 'purple', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
        edge: 'purple',
    },
    [BlockNodeTypes.TGW_ROUTE_TABLE]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.TGW_VPC_ATTACHMENT]: {
        svg: { fill: '#fff', viewBox: '0 0 64 64' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.ROUTE_TABLE_ASSOCIATION]: {
        svg: { fill: 'green', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.VPC]: {
        svg: { fill: '#fff', viewBox: '0 0 80 80', x: 8, y: 8 },
        iconBG: { fill: '#3E8624' },
    },
    [BlockNodeTypes.VPC_PEERING]: {
        svg: { fill: 'none', viewBox: '0 0 48 48' },
        iconBG: { fill: 'none' },
    },
    [BlockNodeTypes.WAF]: {
        svg: { fill: '#fff' },
        iconBG: { fill: 'none' },
    },
};

export { ContainerIconColor, BlockIconColor };
