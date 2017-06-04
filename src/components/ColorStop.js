import React from 'react'
import './ColorStop.css'

class ColorStop extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.state = {
      posStart: 0,
      dragging: false
    }
  }

  startDragging (pointX) {
    this.setState({
      posStart: pointX,
      dragging: true
    })
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentDidMount () {
    // Start dragging right after adding new stop.
    // pointX is the cursor position when new stop has been created.
    const { pointX } = this.props
    if (pointX) this.startDragging(pointX)
  }

  handleMouseDown (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!e.button) this.startDragging(e.clientX)
  }

  handleMouseMove (e) {
    if (!this.state.dragging) return
    const { limits, id, pos, onPosChange } = this.props
    const newPos = pos + e.clientX - this.state.posStart
    if (newPos < limits.min || newPos > limits.max) return
    this.setState({ posStart: e.clientX })
    onPosChange({ id: id, pos: newPos })
  }

  handleMouseUp () {
    this.setState({ dragging: false })
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    const { pos, color } = this.props
    return (
      <div className="cs"
           onMouseDown={ this.handleMouseDown }
           style={{ left: pos, backgroundColor: color }}>
      </div>
    )
  }
}

export default ColorStop
