import paper from 'paper'

import Dot from './lib/dot'

import config from './config'

// Install paper scope in window scope
paper.install(window)
window.onload = event => {
  // Init paper in canvas with id 'canvas'
  paper.setup('canvas')
  let tool = new Tool()
  let center = new Point(window.innerWidth/2, window.innerHeight/2)
  let mouse

  // Update mouse paper.Point position when moving the mouse
  tool.onMouseMove = event => {
    mouse = new Point(event.point)
  }

  // Init all dots
  let dots = []
  for (let i=0; i < config.nbDot; i++) {
    dots.push(new Dot(center))
  }

  // Create line from center to mouse
  let path = new Path.Line({x: 0, y: 0}, {x: 0, y: 0})
  path.strokeColor = 'white'

  // On each frames
  view.onFrame = event => {
    // Reset line from center to mouse actual position
    path.removeSegments()
    path.add(center, mouse)
    path.fitBounds(view.bounds)

    // Update dots and draw them
    dots.forEach(dot => {
      dot.update(center, mouse)
      dot.draw()
    })
  }

  // On click, trigger fill animation
  view.onMouseDown = event => {
    dots.forEach(dot => {
      dot.animateFill()
    })
  }

  // On resize, update center and update dots
  view.onResize = event => {
    center = new Point(window.innerWidth/2, window.innerHeight/2)
    dots.forEach(dot => {
      dot.update(center, mouse)
      dot.draw()
    })
  }
}