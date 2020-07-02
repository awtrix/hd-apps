import AwtrixApp, { Command, calculateTextLength } from '@awtrix/app'
import moment from 'moment'

export default class TimeApp extends AwtrixApp {
  timeFormat () {
    // @see https://momentjs.com/docs/#/parsing/string-format/

    if (this.config['12hourFormat']) {
      return 'hh:mm a'
    }

    if (this.config.showSeconds) {
      return 'HH:mm ss'
    }

    return 'HH:mm'
  }

  frameRequested(delta: number): Command[] {
    let time = moment().format(this.timeFormat())
    let width = calculateTextLength(time)

    let x = Math.floor(this.matrix.width / 2 - width / 2) - 1

    return [Command.text(time, [x, 1])]
  }
}
