import AwtrixApp, { Command } from '@awtrix/app'

export default class TemplateApp extends AwtrixApp {
  frameRequested(delta: number): Command[] {
    return [Command.text('Hello, World.')]
  }
}
