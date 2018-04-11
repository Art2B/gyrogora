import paper from 'paper'

export default class Step {
  constructor (project) {
    this.center = new paper.Point(window.innerWidth/2, window.innerHeight/2)
    this.project = project
    this.view = project.view
    this.mouse = new paper.Point(0, 0)
  }

  reset () {}

  onMouseMove (mouse) {
    this.mouse = mouse
  }

  onFrame () {}

  onMouseDown () {}

  onResize () {}

  draw () {}
}