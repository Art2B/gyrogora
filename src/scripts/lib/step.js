import paper from 'paper'

export default class Step {
  constructor (view) {
    this.center = new Point(window.innerWidth/2, window.innerHeight/2)
    this.view = view
    this.mouse = new Point(0, 0)
  }

  reset () {}

  updateMouse (mouse) {
    this.mouse = mouse
  }

  onFrame () {}

  onMouseDown () {}

  onResize () {}

  draw () {}
}