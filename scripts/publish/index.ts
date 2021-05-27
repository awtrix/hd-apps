import path from 'path'
import fs from 'fs'
import exec from 'child_process'
// @ts-ignore
import libnpm from 'libnpm'

(async () => {
  const appPath = path.resolve(path.join('apps', process.argv[2]))
  if (!fs.existsSync(appPath)) {
    console.log('App does not exist.')
    process.exit(1)
  }

  const packageJson = require(path.join(appPath, 'package.json'))
  const mainPath = path.parse(packageJson.main)

  if (mainPath.ext == '.ts') {
    const fileName = `${mainPath.name}.js`
    const targetPath = path.join('dist', ...mainPath.dir.split('/').slice(1), fileName)
    packageJson.main = targetPath.replace(/\\/, '/')
  }

  // TODO: We need to package the app before uploading ...

  await libnpm.publish({
    ...packageJson,
    name: `@awtrix/${packageJson.name}-app`,
    npmVersion: `awtrix@${packageJson.version}`,
  }, appPath, {
    access: 'public',
    token: fs.readFileSync('./npm_token', 'utf-8').trim(),
  })

  console.log('Successfully published.')
})()
