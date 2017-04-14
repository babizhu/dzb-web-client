var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [

        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            minimize: true,
            sourceMap: false
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            loaders: ['babel-loader'],//数组就用loaders，否则用loder
            include: path.join(__dirname, 'src')
        },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    }
};
