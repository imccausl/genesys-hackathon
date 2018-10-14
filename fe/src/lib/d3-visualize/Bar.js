import React, { Component } from 'react'
import * as d3 from 'd3'

const width = 400
const height = 100

class ChartProvider extends Component {
  state = { bars: [] }

  static getDerivedStateFromProps(nextProps) {
    const { data } = nextProps

    if (!data) return {}

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, height])
    const yScale = d3
      .scaleLinear()
      .domain([1, 0])
      .range([width, 0])
    const colorScale = d3.scaleSequential(d3.interpolateSpectral)

    colorScale.domain([0, 1])

    const bars = data.map((d, i) => {
      const y1 = yScale(parseFloat(d.value.toFixed(1))) // something along these lines to control the graph (.tofixed)
      return {
        x: xScale(i),
        y: y1,
        label: d.emotion,
        fill: colorScale(d.value),
      }
    })

    return { bars }
  }

  render() {
    return (
      <div>
        <svg width={width} height={height}>
          {this.state.bars.map((d, i) => (
            <g key={i}>
              <rect y={d.x} width={d.y} height={24} fill={d.fill} />
              <text className="label" y={d.x} dy="20px" fill="rgb(255,255,255)">
                {d.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  }
}

export default ChartProvider
