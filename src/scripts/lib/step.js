import paper from 'paper'

import config from './../config'

export default class Step {
  constructor (project) {
    this.center = new paper.Point(window.innerWidth/2, window.innerHeight/2)
    this.project = project
    this.view = project.view
    this.mouse = new paper.Point(0, 0)
    this.renderBackground()
  }

  renderBackground () {
    const bg = new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.view.size.width, this.view.size.height]
    })
    bg.sendToBack()
    bg.fillColor = config.bgColor
  }

  reset () {
    this.renderBackground()
  }

  onMouseMove (mouse) {
    this.mouse = mouse
  }

  onFrame () {}

  onMouseDown () {}

  onResize () {}

  draw () {}
}