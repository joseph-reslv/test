import React from 'react';

interface ResourceIconProps extends React.SVGProps<SVGSVGElement> {
    provider: string;
    type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

const ResourceIcon: React.FC<ResourceIconProps> = ({
    provider,
    type,
    width = 26,
    height = 26,
    x = 0,
    y = 0,
    ...rest
}): JSX.Element | null => {
    const ImportedResourceIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = React.useState(false);

    React.useEffect((): void => {
        setLoading(true);
        const importResourceIcon = async (): Promise<void> => {
            try {
                ImportedResourceIconRef.current = (
                    await import(`assets/resources/${provider}/${type}.svg`)
                ).ReactComponent;
            } catch (err) {
                // Your own error handling logic, throwing error for the sake of
                // simplicity
                throw err;
            } finally {
                setLoading(false);
            }
        };
        importResourceIcon();
    }, [provider, type]);

    if (!loading && ImportedResourceIconRef.current) {
        const { current: ImportedResourceIcon } = ImportedResourceIconRef;
        return <ImportedResourceIcon x={x} y={y} width={width} height={height} {...rest} />;
    }

    return null;
};

export default ResourceIcon;
