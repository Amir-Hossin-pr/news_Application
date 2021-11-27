module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        name: 'News',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: './src/registerServiceWorker.ts',
            // ...other Workbox options...
        }
    }
}
