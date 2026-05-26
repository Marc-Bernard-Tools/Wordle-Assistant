import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

// Plugin to handle the abap.js text import (replacing brfs functionality)
const abapTextPlugin = {
    name: 'abap-text',
    setup(build) {
        build.onResolve({ filter: /^abap:/ }, args => ({
            path: args.path.slice(5),
            namespace: 'abap-text',
        }));

        build.onLoad({ filter: /.*/, namespace: 'abap-text' }, async (args) => {
            const filePath = path.resolve('abap', args.path);
            const text = await fs.promises.readFile(filePath, 'utf8');
            return {
                contents: `export default ${JSON.stringify(text)};`,
                loader: 'js',
            };
        });
    },
};

await esbuild.build({
    entryPoints: ['main.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    plugins: [abapTextPlugin],
    minify: false,
    sourcemap: false,
});

console.log('Build complete: dist/bundle.js');
