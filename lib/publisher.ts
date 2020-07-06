import path from 'path'
import fs from 'fs'
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

  const targetPath = path.join('dist', ...mainPath.dir.split('/').slice(1), mainPath.base)
  packageJson.main = targetPath.replace(/\\/, '/')

  console.log({
    ...packageJson,
    npmVersion: `awtrix@${packageJson.version}`
  })
  await libnpm.publish({
    ...packageJson,
    npmVersion: `awtrix@${packageJson.version}`
  }, appPath, {
    access: 'public'
  })

  console.log('Successfully published.')
})()
