import paper from 'paper'

import Dot from './lib/dot'

paper.install(window)
window.onload = event => {
  paper.setup('canvas')
  let tool = new Tool()
  let center = new Point(window.innerWidth/2, window.innerHeight/2)
  let mouse

  tool.onMouseMove = event => {
    mouse = new Point(event.point)
  }

  let dots = []
  for (let i=0; i < 200; i++) {
    dots.push(new Dot(center))
  }

  let path = new Path.Line({x: 0, y: 0}, {x: 0, y: 0})
  path.strokeColor = 'white'

  view.onFrame = event => {
    path.removeSegments()
    path.add(center, mouse)
    path.fitBounds(view.bounds)

    dots.forEach(dot => {
      dot.update(center, mouse)
      dot.draw()
    })
  }

  view.onMouseDown = event => {
    dots.forEach(dot => {
      dot.animateFill()
    })
  }

  view.onResize = event => {
    center = new Point(window.innerWidth/2, window.innerHeight/2)
    dots.forEach(dot => {
      dot.update(center, mouse)
      dot.draw()
    })
  }
}