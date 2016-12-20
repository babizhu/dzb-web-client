var path = require('path');
var express = require('express');
var webpack = require('webpack');

/**
 * 如果设置为发布模式（./webpack.config.prod），在.babelrc中，需要删除如下字样
 * "presets": ["react-hmre"]
 * 否则，js会报错
 *
 * 相反如果设置为调试模式（./webpack.config.dev），在.babelrc中，需要在dev节中加入如下字样
 * "presets": ["react-hmre"]
 * 否则，自动热加载不会起作用
 *
 *
 * 打包请调用
 * npm run build:webpack
 * 同样记得在.babelrc中，需要删除如下字样
 * "presets": ["react-hmre"]
 * 还要把index.html中引用js目录从static修改为dist，也可以自行根据情况设定
 * 修改config.js里面的host变量为生产环境的变量
 */
var config = require('./webpack.config.dev');


var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    //console.log(req.params[0]);
    if (req.params[0].indexOf('.') != -1) {
        res.sendFile(path.join(__dirname, req.params[0]));
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(3000, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
