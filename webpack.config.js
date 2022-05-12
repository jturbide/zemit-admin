const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      // 'process.env.NODE_TLS_REJECT_UNAUTHORIZED': 0,
    }),
    // new TypescriptDeclarationPlugin({
    //   out: 'bundle.d.ts',
    //   removeMergedDeclarations: true,
    //   removeComments: true,
    // })
  ],
}
