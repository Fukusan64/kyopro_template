#!/usr/bin/env zx
import path from 'node:path';
const target = argv._[0];
if (!target) throw new Error('target is not selected');
const cwd = process.cwd();
const targetPath = path.resolve(cwd, target);
const output = path.resolve(cwd, target.replace('.ts', '.js'));
await $`esbuild --bundle --platform=node --format=cjs ${targetPath} > ${output}`;
await $`node ${output}`;
