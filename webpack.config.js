const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/main.[contenthash:8].js',
        chunkFilename: 'static/js/chunk.[contenthash:8].js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            pages: path.resolve(__dirname, 'src/pages/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            workers: path.resolve(__dirname, 'src/workers/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            assets: path.resolve(__dirname, 'public/assets/'),
        },
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.worker\.ts$/,
                use: {
                    loader: 'worker-loader',
                },
            },
            // { // For modern browser only
            //     test: /\.(ts)$/,
            //     loader: 'esbuild-loader',
            //     options: {
            //         loader: 'ts',  // Remove this if you're not using JSX
            //         target: 'es2015'  // Syntax to compile to (see options below for possible values)
            //     }
            // },
            // {
            //     test: /\.(tsx)$/,
            //     loader: 'esbuild-loader',
            //     options: {
            //         loader: 'tsx',  // Remove this if you're not using JSX
            //         target: 'es2015'  // Syntax to compile to (see options below for possible values)
            //     }
            // },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(svg)$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|mp4)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new Dotenv({
            path: `./.env.${process.env.NODE_ENV}`, // load this now instead of the ones in '.env'
        }),
        process.env.NODE_ENV === 'production' &&
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            }),
        new ManifestPlugin.WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: path.join(__dirname, 'dist'),
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));
                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'dist'),
                    globOptions: {
                        ignore: ['**/*.html', '**/assets/**'],
                    },
                },
            ],
        }),
        // For jsPDF
        new webpack.ProvidePlugin({
            canvg: 'canvg',
        }),
        //new BundleAnalyzerPlugin() // enable when need to analyze the bundle
    ].filter(Boolean),
    optimization: {
        minimize: process.env.NODE_ENV === 'production',
        splitChunks: {
            chunks: 'all',
            maxSize: 500000,
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    },
    performance: {
        hints: false,
    },
};
