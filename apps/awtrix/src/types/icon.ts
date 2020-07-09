// This helper type just allows us to create a fixed-length array
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength }

type Pixel = number

export type RandomBitmap = Pixel[]

export type StaticIcon = Tuple<Pixel, 64>

export type AnimatedIcon = {
  frames: StaticIcon[],
  tick: number
}
