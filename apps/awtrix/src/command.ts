import colorToBuffer, { Color } from './utils/colors'
import { RandomBitmap } from './types/icon'

enum CommandBit {
  Text = 0,
  Bitmap = 1,
  Circle = 2,
  FilledCircle = 3,
  Pixel = 4,
  FilledRect = 23,
  Line = 6,
  Fill = 7,
  Show = 8,
  Clear = 9,
  PlayMP3 = 18,
  Reboot = 11,
  Reset = 15,
  ForceHostSearch = 20,
  Volume = 17,
  Settings = 14,
  Info = 12,
  Brightness = 13,
  MulticolorText = 21,
}

type Position = [number, number]

export default class Command {
  readonly message: Buffer

  constructor (command: CommandBit, ...parameters: Buffer[]) {
    let commandBuffer = Buffer.from([command])
    this.message = Buffer.concat([commandBuffer, ...parameters])
  }

  static text (text: String, position?: Position, color?: Color): Command {
    let textBuffer = Buffer.from(text)
    position = position || [0, 0]
    color = color || '#ffffff'

    let x = Buffer.alloc(2)
    let y = Buffer.alloc(2)

    x.writeInt16BE(position[0])
    y.writeInt16BE(position[1])

    return new Command(CommandBit.Text, x, y, colorToBuffer(color), textBuffer)
  }

  static bitmap (icon: RandomBitmap, position?: Position, size?: [number, number]): Command {
    let bitmap = Buffer.from(Uint16Array.from(icon))

    position = position || [0, 0]
    size = size || [8, 8]

    let x = Buffer.alloc(2)
    let y = Buffer.alloc(2)

    let width = Buffer.alloc(2)
    let height = Buffer.alloc(2)

    x.writeInt16BE(position[0])
    y.writeInt16BE(position[1])
    width.writeInt16BE(size[0])
    height.writeInt16BE(size[1])

    return new Command(CommandBit.Bitmap, x, y, width, height, bitmap)
  }

  static clear (): Command {
    return new Command(CommandBit.Clear)
  }

  static draw (): Command {
    return new Command(CommandBit.Show)
  }
}
