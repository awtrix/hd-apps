import AwtrixApp, { Command } from '@awtrix/app'

export default class PeopleInSpace extends AwtrixApp {
  private interval?: NodeJS.Timeout
  private peopleInSpace?: number

  setup () {
    // Create a 10 minute interval that updates the current astronaut count.
    this.interval = setInterval(() => this.update(), 10 * 60 * 1000)
    this.update()
  }

  teardown () {
    // Clear the update interval if the app is tore down.
    if (this.interval) clearInterval(this.interval)
  }

  canEnterForeground () {
    // The app should not become active, before we have fetched the initial count.
    return typeof this.peopleInSpace !== 'undefined'
  }

  async update () {
    const { data } = await this.request.get('https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json')
    this.peopleInSpace = data.number
  }

  frameRequested (delta: number): Command[] {
    let currentFrame = this.icon(155, delta)

    return [Command.bitmap(currentFrame), Command.text(`${this.peopleInSpace}`, [9, 1])]
  }
}
