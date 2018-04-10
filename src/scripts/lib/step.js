import paper from 'paper'

export default class Step {
  constructor (view) {
    this.center = new Point(window.innerWidth/2, window.innerHeight/2)
    this.view = view
  }
}