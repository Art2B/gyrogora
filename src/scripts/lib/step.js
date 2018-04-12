import paper from 'paper'

import config from './../config'

export default class Step {
  /**
   * [Step's constructor]
   * @param  {paper.Project} project [paper Project object]
   */
  constructor (project) {
    this.center = new paper.Point(window.innerWidth/2, window.innerHeight/2)
    this.project = project
    this.view = project.view
    this.mouse = new paper.Point(0, 0)
    this.renderBackground()
  }

  /**
   * [renderBackground Render background of step]
   */
  renderBackground () {
    const bg = new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.view.size.width, this.view.size.height]
    })
    bg.sendToBack()
    bg.fillColor = config.bgColor
  }

  /**
   * [reset Reset the step and clear project]]
   */
  reset () {
    this.project.clear()
    this.renderBackground()
  }

  /**
   * [onMouseMove Callback when user move mouse]
   * @param  {paper.Point} mouse [paper Point with mouse position]
   */
  onMouseMove (mouse) {
    this.mouse = mouse
  }

  /**
   * [onFrame Callback for each frame]
   */
  onFrame () {}

  /**
   * [onMouseDown Callback for mouse click]
   */
  onMouseDown () {}

  /**
   * [onResize Callback for window resize]
   */
  onResize () {}
}