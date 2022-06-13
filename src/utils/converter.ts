const imageToBase64 = (url: string) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }),
        );

const getTrueSizes = (g: SVGGElement, margin: number) => {
    const currentStyle = g.style.transform;
    g.style.transform = 'scale(1)';
    const rectSize = g.getBoundingClientRect();
    const trueSize = {
        width: rectSize.width + margin,
        height: rectSize.height + margin,
    };
    g.style.transform = currentStyle;
    return trueSize;
};

const svgToBlob = (svgE: SVGSVGElement) => {
    const adjustedSizes = { width: 2000, height: 2000 };
    const g = svgE.children[1] as SVGGElement;
    const cloneSVG = svgE.cloneNode(true) as SVGSVGElement;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const css = `<defs><style>
        g.edge > path[tabindex="-1"] {
            display: none;
        }
    </style>\r\n`;

    if (g) {
        //ADJUST SIZE
        const adjustedSizes = getTrueSizes(g, 50);

        cloneSVG.setAttribute('width', `${adjustedSizes.width}px`);
        cloneSVG.setAttribute('height', `${adjustedSizes.height}px`);

        const cloneG = cloneSVG.children[1] as SVGGElement;
        cloneG.style.transform = 'scale(1)';
    }

    let svgData = cloneSVG.outerHTML;
    svgData = svgData.replace('<defs>', css);
    const svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    return {
        ...adjustedSizes,
        svgUrl: svgUrl,
    };
};

/**
 * converts an svg string to base64 png using the domUrl
 * @param {SVGSVGElement} svgE the svgtext
 * @param {number} [margin=0] the width of the border - the image size will be height+margin by width+margin
 * @param {string} [fill] optionally backgrund canvas fill
 * @return {Promise} a promise to the bas64 png image
 */
const svgToPng = (svgE: SVGSVGElement, margin: number, fill?: string): Promise<string> => {
    // convert an svg text to png using the browser
    return new Promise<string>((resolve, reject) => {
        try {
            // can use the domUrl function from the browser
            const domUrl = window.URL || window.webkitURL || window;
            if (!domUrl) {
                throw new Error('(browser doesnt support this)');
            }
            let svgText = svgE.outerHTML;

            // figure out the height and width from svg text
            let match = svgText.match(/height=\"(\d+)/m);
            const height = match && match[1] ? parseInt(match[1], 10) : 200;
            match = svgText.match(/width=\"(\d+)/m);
            const width = match && match[1] ? parseInt(match[1], 10) : 200;
            margin = margin || 0;

            // it needs a namespace
            if (!svgText.match(/xmlns=\"/im)) {
                svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
            }

            // make a blob from the svg
            const blobObj = svgToBlob(svgE);

            // create a canvas element to pass through
            let canvas = document.createElement('canvas');
            canvas.width = width + margin * 2;
            canvas.height = height + margin * 2;
            const ctx = canvas.getContext('2d');

            // create a new image to hold it the converted type
            const img = new Image();

            // when the image is loaded we can get it as base64 url
            img.onload = function () {
                // draw it to the canvas
                ctx?.drawImage(this as unknown as CanvasImageSource, margin, margin);

                // if it needs some styling, we need a new canvas
                if (fill) {
                    const styled = document.createElement('canvas');
                    styled.width = canvas.width;
                    styled.height = canvas.height;
                    const styledCtx = styled.getContext('2d');
                    styledCtx?.save();
                    if (styledCtx) styledCtx.fillStyle = fill;
                    styledCtx?.fillRect(0, 0, canvas.width, canvas.height);
                    styledCtx?.strokeRect(0, 0, canvas.width, canvas.height);
                    styledCtx?.restore();
                    styledCtx?.drawImage(canvas, 0, 0);
                    canvas = styled;
                }
                // we don't need the original any more
                domUrl.revokeObjectURL(blobObj.svgUrl);
                // now we can resolve the promise, passing the base64 url
                resolve(canvas.toDataURL());
            };

            // load the image
            img.src = blobObj.svgUrl;
        } catch (err) {
            reject('failed to convert svg to png ' + err);
        }
    });
};

const download = (svgUrl: string, name: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

const addWaterMark = async (svg: SVGElement, logoURL: string) => {
    const logoBlob = (await imageToBase64(logoURL)) as string;
    const defs = svg.children[0] as SVGDefsElement;
    const namespace = 'http://www.w3.org/2000/svg';

    if (defs && defs.getElementsByTagName('pattern').length === 0) {
        const rect: SVGRectElement = document.createElementNS(namespace, 'rect');
        const pattern: SVGPatternElement = document.createElementNS(namespace, 'pattern');
        const image: SVGImageElement = document.createElementNS(namespace, 'image');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', 'url(#watermark)');
        rect.setAttribute('pointer-events', 'none');
        pattern.setAttribute('id', 'watermark');
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        pattern.setAttribute('width', '3900');
        pattern.setAttribute('height', '1100');
        pattern.setAttribute('patternTransform', 'rotate(-35)');
        image.setAttribute('href', logoBlob);
        image.setAttribute('opacity', '0.15');
        image.setAttribute('height', '800');
        image.setAttribute('width', '3200');
        pattern.appendChild(image);
        defs.appendChild(pattern);
        svg.appendChild(rect);

        return {
            rect,
            pattern,
            image,
        };
    }

    return null;
};

export { svgToBlob, svgToPng, download, getTrueSizes, addWaterMark };
