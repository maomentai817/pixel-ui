import { each, isFunction } from 'lodash-es'
import shell from 'shelljs'

export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}: {
  rmFiles?: string[]
  beforeBuild?: Function
  afterBuild?: Function
}) {
  return {
    name: 'hooks-plugin',
    buildStart() {
      each(rmFiles, (fileName) => shell.rm('-rf', fileName))
      isFunction(beforeBuild) && beforeBuild()
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild()
    }
  }
}
