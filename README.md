# Admin UI
This project is built using VueJS. It is intended to consume [Zemit CMS Core](https://github.com/zemit-cms/core)'s API. Please see the configuration section for more information and refer the the Zemit CMS Core project.

## Project setup
You can run `yarn install` or `npm install` to fetch dependencies and prepare the project for the run and build process.

```
# Using Yarn
yarn install

# Using NPM
npm install
```

## Development configuration
This project is using VueJS, Babel and Webpack. If you want to use the Zemit CMS during the development, you will have to setup a proxy that point to your Zemit CMS Core.
Open `vue.config.js` and add a [proxy](https://cli.vuejs.org/config/#devserver). For more information about the VueJS configuration, please refer to the [Configuration Reference](https://cli.vuejs.org/config/#babel).
Use the example below and replace `<zemit-core-url>` with your own API url.
```
    proxy: {
      '^/api': {
        target: 'https://<zemit-core-url>/',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    }
```

### Development serve
```
# Using Yarn
yarn serve

# Using NPM
npm run serve
```

### Production build
```
# Using Yarn
yarn build

# Using NPM
npm run build
```

### Run lint
```
# Using Yarn
yarn lint

# Using NPM
npm run lint
```
