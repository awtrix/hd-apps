import * as ts from 'typescript'
import path from 'path'
import fs from 'fs'

function compile(fileName: string, options: ts.CompilerOptions): void {
  let program = ts.createProgram([fileName], options)
  let emitResult = program.emit()

  ts.getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)
    .forEach(diagnostic => {
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!)
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
      } else {
        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
      }
    })

    let exitCode = emitResult.emitSkipped ? 1 : 0
    process.exit(exitCode)
}

const appPath = path.resolve(path.join('apps', process.argv[2]))
if (!fs.existsSync(appPath)) {
  console.log('App does not exist.')
  process.exit(1)
}

const packageJson = require(path.join(appPath, 'package.json'))
compile(path.join(appPath, packageJson.main), {
  noEmitOnError: true,
  noImplicitAny: false,
  target: ts.ScriptTarget.ES2018,
  module: ts.ModuleKind.CommonJS,
  outDir: path.join(appPath, 'dist'),
  esModuleInterop: true,
  declaration: process.argv[2] == 'awtrix',
})
