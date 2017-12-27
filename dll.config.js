const {resolve} = require('path');
const webpack = require("webpack");
const node_env = process.env.NODE_ENV; //dev-开发（热加载）;test-测试；product-生产
const distPath = node_env == "develop"? "../webapp/newReact/" + node_env:"./" + node_env;

const vendors= [                                                  //公共资源js打包成一个文件；
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'redux',
    'redux-thunk'
];

module.exports = {
    output:{
        path: resolve(__dirname, distPath),
        filename: 'js/[name].js',
        library: '[name]',
    },
    entry:{
        "vendor":vendors,
    },
    plugins:[
        new webpack.DllPlugin({
            path: resolve(__dirname, distPath,"js","manifest.json"),
            name: '[name]',
            context: __dirname,
        })
    ]
};