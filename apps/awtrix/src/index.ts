import Command from './command'
import Matrix from './matrix'

type Config<T> = { [t: string]: any }

export default abstract class AwtrixApp {
  constructor (protected matrix: Matrix, protected config: Config<any>) { }

  public setup () {

  }

  public enteredForeground () {

  }

  public enteredBackground () {

  }

  abstract frameRequested(delta: number): Command[]
}

export { default as Command } from './command'
export { default as Colors } from './utils/colors'
export { default as calculateTextLength } from './utils/text'
