import React from 'react'

const MAX_NUMBER = 100 // TODO: 1000
const MIN_NUMBER = 0 // TODO: -1000
const MAX_COLOR = 0xFFFFFF
const MIN_COLOR = 0x0000EE

export default class CyclicRotation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      k: 0,
      array: [],
      arraySize: 10
    }
  }

  componentDidMount () {
    this.setRandomArray()
  }

  setRandomArray () {
    const array = Array.from(new Array(this.state.arraySize)).map(() => Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER)
    this.setState({array})
  }

  rotateArray (array, k) {
    return Array.from(new Array(array.length))
      .map((_, index) => array[(array.length + index - (k % array.length)) % array.length])
  }

  rotateArray2 (array, k) {
    const ans = Array.from(array) // Simulate in-place mutation
    const gate = 1000 // TODO: fuction of MAX_NUMBER
    ans.forEach((num, i) => {
      ans[i] = ans[i] + gate * (ans[(ans.length + i - (k % ans.length)) % ans.length] % MAX_NUMBER)
    })
    ans.forEach((num, i) => {
      ans[i] = Math.floor(ans[i] / gate)
    })
    return ans
  }

  numberToColor (number) {
    const colorValue = MIN_COLOR + Math.floor((MAX_COLOR - MIN_COLOR) * (number - MIN_NUMBER) / (MAX_NUMBER - MIN_NUMBER))
    const leftPadded = '00000' + colorValue.toString(16)
    return '#' + leftPadded.substring(leftPadded.length - 6)
  }

  setArraySize (arraySize) {
    this.setState({arraySize}, () => this.setRandomArray())
  }

  renderArray (array) {
    return (
      <div className='horizontal-array' style={{display: 'table', margin: 'auto'}}>
        <div style={{display: 'table-row'}}>
          { array.map((item, index) => (
            <div key={`${item}${index}`} style={{display: 'table-cell'}}>
              { index }
            </div>
          ))}
        </div>
        <div style={{display: 'table-row'}}>
          { array.map((item, index) => (
            <div key={`${item}${index}`} style={{ padding: 5, background: 'black', display: 'table-cell', color: this.numberToColor(item) }}>
              { item }
            </div>
          ))}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <h1>Cyclic Rotation</h1>

        <div style={{ padding: 15 }}>
          <label htmlFor='n' >n:</label>
          <input
            style={{marginLeft: 10}}
            id='n'
            name='n'
            type='number'
            min={0}
            max={100}
            value={this.state.arraySize}
            onChange={(e) => this.setArraySize(parseInt(e.target.value, 10))}
          />
        </div>

        <div style={{ padding: 15 }}>
          <label htmlFor='k' >k:</label>
          <input
            style={{marginLeft: 10}}
            id='k'
            name='k'
            type='number'
            value={this.state.k}
            onChange={(e) => this.setState({k: parseInt(e.target.value, 10)})}
          />
        </div>

        <button onClick={this.setRandomArray.bind(this)} >Randomize Again</button>

        <h2>Original</h2>
        { this.renderArray(this.state.array) }

        <h2>Rotated, Method #1 - Copying</h2>
        { this.renderArray(this.rotateArray(this.state.array, this.state.k)) }

        <h2>Rotated, Method #2 - In-Place Mutation</h2>
        { this.renderArray(this.rotateArray2(this.state.array, this.state.k)) }
      </div>
    )
  }
}
