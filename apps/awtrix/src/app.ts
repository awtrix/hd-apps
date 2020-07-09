import Command from './command'
import Matrix from './matrix'
import axios from 'axios'
import { StaticIcon } from './types/icon'

type Config<T> = { [t: string]: any }

export default abstract class AwtrixApp {
  protected request = axios

  constructor (protected matrix: Matrix, protected config: Config<any>) { }

  /**
   *
   */
  public setup () {

  }

  /**
   *
   */
  public teardown () {

  }

  // -- Convenience methods for app developers

  /**
   *
   */
  protected requestForeground () {
    // ...
  }

  /**
   *
   */
  protected requestBackground () {
    // ...
  }

  /**
   *
   * @param id
   */
  protected icon (id: number, delta: number): StaticIcon {
    return [4, 36, 36, 4, 4, 4, 4, 4, 4624, 2413, 71, 2, 4, 4, 4, 4, 21691, 19708, 28222, 15483, 137, 4, 4, 4, 15089, 13010, 10996, 15385, 26110, 6804, 37, 37, 14957, 6538, 6539, 10799, 8817, 17497, 17562, 6, 6407, 2148, 6440, 6505, 6539, 8718, 8981, 15385, 34, 34, 34, 2181, 2214, 4392, 6540, 13142, 33, 34, 34, 2147, 67, 100, 4359, 12910]
  }

  // -- Lifecycle methods that can be overridden

  /**
   *
   */
  public canEnterForeground (): boolean {
    return true
  }

  /**
   *
   */
  public hasEnteredForeground () {

  }

  /**
   *
   */
  public canEnterBackground (): boolean {
    return true
  }

  /**
   * @param {boolean} [forced] Whether this app was forced into background.
   */
  public hasEnteredBackground (forced: boolean) {

  }

  /**
   *
   */
  public canDisplay (): boolean {
    return true
  }

  /**
   * @param {number} [delta] The number of milliseconds that passed since the last frame was requested.
   */
  abstract frameRequested(delta: number): Command[]
}
