<p align="center">
    <a href="https://reslv.io/" rel="noopener" target="_blank">
        <img width="300" src="https://reslv.io/assets/img/brand/resolve_logo.png" alt="Resolve logo">
    </a>
</p>

<h1 align="center">Reactjs Project Structure</h1>

<div align="center">
    Quickly build beautiful React apps. This is a simple and customizable example project for build React faster, beautiful, and more accessible React applications.
</div>

## Main Tools

-   [MUI](https://mui.com/getting-started/usage/)
-   [TypeScript](https://www.typescriptlang.org/docs/)
-   [Webpack v5](https://webpack.js.org/concepts/)

## Recommend Additional Packages

-   [react-hook-form](https://github.com/react-hook-form/react-hook-form) - Performant, flexible and extensible forms with easy-to-use validation, fully document support for MUI and TypeScript.
-   [i18next](https://react.i18next.com/) - Internationalization framework
-   [react-hook](https://usehooks-typescript.com/) - Simple hook provide for TypeScript React Project, and **preferred to copy the hooks to our project**.
-   [react-router](https://reactrouter.com/) - Handle Routing for SPA

## Webpack vs ESBuild

| Bundler                | Webpack          | ESBuild                                      |
| ---------------------- | ---------------- | -------------------------------------------- |
| Build Performance      | Slower           | Faster around 2X                             |
| Bundle ES5 Support     | Supported        | Not Support                                  |
| Code Splitting         | Supported        | Not fully support, output `esm` format only. |
| Lazy Module Load       | Supported        | Not Support                                  |
| Configuration          | More complicated | Relatively simple                            |
| Hot Module Replacement | Supported        | Not fully support                            |

## Environment

You can create environment files `.env.{environment}` for handing environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
GOOGLE_MAP_API_KEY=LOCAL-ABCDEFG123456789
PUBLIC_URL=http://localhost:3000
```

`process.env` now has the keys and values you defined in your `.env.{environment}` file.

```html
<Typography variant="body1"> <b>Google API:</b> {process.env.GOOGLE_MAP_API_KEY} </Typography>
<Typography variant="body2"> <b>Site Domain:</b> {process.env.PUBLIC_URL} </Typography>
```

##### Setup

```
npm install
```

##### Local Develop

```
npm run dev
```

##### Develop

```
npm run start
```

##### Build Static

```
npm run build
```

## Directory structure

```
/public
  /assets
    /<static-file>.(png|jpg|mp4|svg...)
  /locales
    /<locale>
      /translation.json
/src
  /components
    /<generic-component>
      /index.tsx
      /<sub-component>.tsx
    /Layouts
      /<global-component>.tsx
  /pages
    /<specific-page>
      /<component-related-that-page>.tsx
  /hooks
    /<custom-hook>.ts
  /workers
    /<bg-thread-web-workers>.worker.ts
  /utils
    /<util-functions>.ts
```

### Path Alias

Recommended to use path alias for each folder in `/src` for avoiding long relative paths within the codebase. You can insert the alias in both `tsconfig.json` and `webpack.config.js` to able this feature. Example:

##### tsconfig.json

```json
{
    "compilerOptions": {
        "paths": {
            "utils/*": ["src/utils/*"]
        }
    }
}
```

##### webpack.config.js

```react
module.exports = {
    /* options */
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils/'),
        },
    },
};
```

##### Importing

```react
import theme from 'utils/theme';
```

## Guidelines

### Module Importing

Avoid importing all from a module, since it will cause unnecessarily bloat the project and provide a higher maintenance cost.

```react
// DO NOT DO THIS
import * from '@mui/material';
import lodash from 'lodash';
```

Avoid importing modules that might not make sense in a particular environment.

```react
// DO NOT DO THIS
import fs from 'fs';
```

Top-level imports are not suggested, since it will lead to slower startup times.

```react
// NOT SUGGEST
import { SvgIcon, AppBar, Box, Toolbar } from '@mui/material';
```

Use path imports to avoid pulling in unused modules when startup.

```react
// SUGGESTED
import SvgIcon from '@mui/material/SvgIcon';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
```

### Lazy Module Importing

Recommended to using React.lazy() for importing pages to the React Router. It will lower the loading time when page initialize.

```react
const MainPage = lazy(() => import('pages/MainPage'));
const Camera = lazy(() => import('pages/Camera'));

<Router>
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/camera" component={Camera} />
  </Switch>
</Router>
```

### TypeScript

TypeScript stands in an unusual relationship to JavaScript. TypeScript offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.

Learn the [basic](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) in 5 minutes

##### Component

Define and export `type` or `interface` for the component.
Also recommended wrap the component type by `React.FC` for extending the `children` of the component.

```react
// components/TextContainer/index.tsx
export type ProfileContainerObject = {
    name: string;
    ids: Array<number>;
}
export interface ProfileContainerProps {
    value: number;
    object?: ProfileContainerObject;
}
const ProfileContainer: React.FC<ProfileContainerProps> = ({ value, children, object }) => {
    return <div>
        <div>name: {object?.name}</div>
        <div>ids: {object?.ids.toString()}</div>
        <div>value: {value}</div>
        <div>{children}</div>
    </div>
}
export default ProfileContainer;
```

Recommended using the `type` or `interface` which defined to match the object for pass to the component

```react
// pages/ProfilePage/index.tsx
import ProfileContainer, { ProfileContainerProps } from 'components/Container';
const ProfilePage:React.FC = () => {
    const containerVariables: ProfileContainerProps = {
        value: 2,
        object: {
            name: 'abc',
            ids: [1,2,3,4]
        }
    }
    return (
        <div>
            <Container {...containerVariables}>
                <div>Children Component</div>
            </Container>
        </div>
    );
};
export ProfilePage
```

##### File Module Type

TypeScript required to define types for the files that need to complier when build process.

```typescript
//global.d.ts
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
```

##### Global Type

TypeScript required to define types if some libs only support global call.

```typescript
//global.d.ts
interface Window {
    sdkA: any;
}
```

```javascript
console.log(window.sdkA);
```

##### Legacy Node Module

TypeScript required to define types if the node module have not any types support.

```typescript
//@types/non-ts-module.d.ts
declare module 'non-ts-module' {
    export const functionA: any;
    export const functionB: any;
    export const functionC: any;
}
```

### React Hooks

Following `rules-of-hooks` and `exhaustive-deps` of [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) for avoiding issues like Infinite loop, conditions check,

##### useState()

TypeScript required to define types for each state.

```typescript
type ObjectProps = {
    name: string;
    value: number;
};

const [element, setElement] = React.useState<null | HTMLElement>(null);
const [isShow, setIsShow] = React.useState<boolean>(false);
const [object, setObject] = React.useState<ObjectProps>({ name: 'abc', value: 0 });
```

Recommended not to set any `props` variable to the state for easier control and maintain the component.

```typescript
// NOT SUGGEST
const [value, setValue] = React.useState<number>(props.value);
```

Recommended using `useReducer` and `useContent` if the number of `useState` are 6-10 in a component or page.

```react
// NOT SUGGEST
const [value1, setValue1] = React.useState<number>(0);
const [value2, setValue2] = React.useState<number>(0);
const [value3, setValue3] = React.useState<number>(0);
const [value4, setValue4] = React.useState<number>(0);
const [value5, setValue5] = React.useState<number>(0);
const [value6, setValue6] = React.useState<number>(0);
```

##### useEffect()

Handle components' life cycle.

```react
useEffect(() => {
	console.log("component is mounted");
  console.log(id, props.value);
	return () => {
		console.log("component is unmounted");
	}
}, [id, props.value]); //<-- id
```

Recommended not to use `Object` or `Array` as the conditionally firing to avoid unnecessary rerenders.

```react
// NOT SUGGEST
useEffect(() => {
  // somethink
},[props, object])
```

Recommended using `EventListener` by `react-hook` instead of `useEffect` for the better performance

```react
// NOT SUGGEST
useEffect(() => {
    window.addEventListener("event", eventHandler)
    return () => {
      window.removeEventListener("event", eventHandler)
},[])

// SUGGESTED
import useEventListener from 'hooks/useEventListener';
const components = () => {
  useEventListener(eventName, handler, element);
  return <div>...</div>
}
```

##### useRef()

Suggest to using `useRef` for 2 cases, Mutable Values and Accessing DOM elements.

###### Mutable Values:

Updating the reference value `countRef.current++` doesn’t trigger component re-rendering.

```react
const LogButtonClicks = () => {
  const countRef = useRef<number>(0);
  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };
  console.log('I rendered!');
  return <button onClick={handle}>Click me</button>;
}
```

###### Accessing DOM elements

```react
const AccessingElement = () => {
  const elementRef = useRef<HTMLElement>();
   useEffect(() => {
    const divElement = elementRef?.current;
    console.log(divElement); // logs <div>I'm an element</div>
  }, []);
  return (
    <div ref={elementRef}>
      I'm an element
    </div>
  );
}
```

##### useMemo()

Suggest to using `useMemo` to avoid calculate the same value twice when component rerenders.

```react
const CountingButton = ({a:number, b:number}) => {
  const result = React.useMemo(
    () => calculateResult(a, b), // <-- Complex Calculation
    [a, b],
  )
  return <div>Count: {result}</div>
}
```

##### useCallback()

Suggest to using `useCallback ` for optimising unnecessary rerenders. Also, the component need to wrapped by and `React.memo`.

```react
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})

const DualCounter = () => {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])

  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])

  return (
    <>
      <CountButton count={count1} onClick={increment1} />  // <-- Only rerender when the count1 changed
      <CountButton count={count2} onClick={increment2} />  // <-- Only rerender when the count2 changed
    </>
  )
}
```

##### useReducer()

Suggest to using `useReducer` when the state logic is complex, and that involves multiple sub-values or when the next state depends on the previous one.

Example: https://reactjs.org/docs/hooks-reference.html#usereducer

##### useContext()

Suggest to using `useContext` when the component needed to access some global data and re-render when the global data is changed. Such as User Profile, theme, application config, etc...

Example: https://reactjs.org/docs/hooks-reference.html#usecontext

### Class Component

Mostly, a component should be developed by functional instead of class, except you want the component be like:

-   More clearer of Life Cycle
-   Create or control non-react element
-   Create a [Function as Child Components](https://americanexpress.io/faccs-are-an-antipattern/)

But you also need to consider:

-   Larger size of bundle
-   Longer time when build
-   More complex and longer script
-   No hook accepted

### Web Worker

Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. for more infomation from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

1. Create a worker script in `src/worker/{worker-name}.worker.ts`

```react
// worker/example.worker.ts
const ctx: DedicatedWorkerGlobalScope = self as any;
ctx.addEventListener('message', (event) => {
    const { id, payload } = event.data;
    setTimeout(() => { // <-- This setTimeout using for DEMO! pretending some complex calculation it cause few seconds
        console.log(payload); // <-- Receive from component or page
        ctx.postMessage({
            id: id,
            payload: { foo: 'boo' },
        });
        ctx.close(); // <-- for terminate web worker when finish
    }, 5000);
});
export default null as any; // <-- avoid typescript error
```

2. Use `workerWrapper` for wrapping the worker to become a `promise`.

```react
// pages/OtherPage.tsx
import countWorker from 'workers/example.worker';
import workerWrapper from 'utils/workerWrapper';
const OtherPage = () => {
  const wrappedCountWorker = new workerWrapper(new countWorker());
    useEffect(() => {
        (async () => {
            const msg = await wrappedCountWorker.request('start');
            console.log(msg);
        })();
    }, []);
  return <div>...</div>
}
```

### Styling

Preferred using MUI UI/UX framework to handle the styling of the project. Therefore, this project will follow most of the MUI's recommending guidelines to design our theme and customization.

##### Theme

Following [MUI guide](https://mui.com/customization/default-theme/) to customizate the theme, such as color palettes, typography, spacing, etc...

```react
// utils/theme.ts
import red from '@mui/material/colors/red';
import createTheme from '@mui/material/styles/createTheme';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
```

Using the `theme` by the `ThemeProvider`, and `CssBaseline` for reset the Global styles.

```react
// App.tsx
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'utils/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>...</div>
            <CssBaseline />
        </ThemeProvider>
    );
};
```

##### Global style overrides

Recommended using the theme's `styleOverrides` key to potentially change every single style injected by MUI into the DOM.

```react
// utils/theme.ts
const theme = createTheme({
  // ... other them style
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});
```

##### Styled Component

If the styles of themed component are not matched, MUI recommended to use `styled` to design the project another own component.

```react
// components/CustomizedSlider.tsx
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomizedSlider = styled(Slider)(({ theme }) => ({
  color: '#20b2aa';
  '&:hover': {
    color: '#2e8b57';
  }
}));

export default function StyledComponents() {
  return <CustomizedSlider defaultValue={30} />;
}
```
