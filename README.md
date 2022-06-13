# Guide

### Add New Resource

1. Add Enum for `ContainerNodeTypes` and `BlockNodeTypes` in `/src/components/NodeFlow/types.ts`

```typescript
enum ContainerNodeTypes {
  // ... others
	EXAMPLE_RESOURCE: 'Example Resource'
}
```

2. Prepare a SVG and copy it to the below project path:`/public/assets/resources/{provider}/{icon}.svg`

    - The Icon name must be lower case of the enum key.

    - The `{provider}` base on the enum `Providers`.

    - Example:

        - /public/assets/resources/aws/example_resource.svg

        ```typescript
        enum Providers {
            AWS = 'aws',
            GCP = 'google',
            AZURE = 'azure',
        }
        ```

3. Add theme for the new resources in `/src/components/NodeFlow/theme.ts`

    1. Example for Container:

    ```typescript
    const ContainerIconColor: ContainerIconColorProp = {
        [ContainerNodeTypes.EXAMPLE_RESOURCE]: {
            svg: { fill: '#fff', viewBox: '0 0 48 48' },
            iconBG: { stroke: '#000', fill: '#242F3E' },
            stroke: '#000',
            // text: '#5b9cd5',
            // isNoIcon
        },
    };
    ```

    - `svg` is control the SVG attributes, change color, sizes, x, y
    - `iconBG` is control the background rect of SVG
    - `stroke` is control the color of container stroke
    - `text` is control label color
    - `isNoIcon` is using for if no SVG file

    2. Example for Block:

    ```typescript
    const BlockIconColor: BlockIconColorProp = {
        [BlockNodeTypes.S3_OBJECT]: {
            svg: { fill: 'none', viewBox: '0 0 48 48' },
            iconBG: { fill: 'none' },
        },
    };
    ```

    - `svg` is control the SVG attributes, change color, sizes, x, y
    - `iconBG` is control the background rect of SVG

### ELK config

This project base on below libraries:

-   [Reaflow](https://reaflow.dev/)

-   [ELKJS](https://github.com/kieler/elkjs#layout-options)
-   [ELK Layout Options](https://www.eclipse.org/elk/reference.html)

##### Layout Options

Reaflow is base on ELKJS to generate the diagram. The SVG layout can be configured by [ELK Layout options](https://www.eclipse.org/elk/reference.html), like below example:

```typescript
//src/components/NodeFlow/Canvas.tsx

const layoutOptions: ElkCanvasLayoutOptions = {
    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
    'elk.spacing.nodeNode': '160',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX', //Edges styles
};
```

###### Mainly Options:

`edgeRouting` is using for control the style of line.

`hierarchyHandling` is using for accept children in layered design. It must be `INCLUDE_CHILDREN` for our case.

`spacing.nodeNode` is using for set the spacing between node

`layered.nodePlacement.strategy` is using for set the placement for node
