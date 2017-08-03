import React from 'react'

export default class BinaryGap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      number: 1
    }
  }

  findMaxBinaryGapByRecursion (N) {
    function solveRec (maxSoFar, zerosSoFar, oneFound, number) {
      if (number <= 1) {
        return maxSoFar
      }

      if (number % 2 === 0) {
        // zero
        zerosSoFar++
      } else {
        // one
        zerosSoFar = 0
        oneFound = true
      }

      if (zerosSoFar > maxSoFar && oneFound) {
        maxSoFar = zerosSoFar
      }

      return solveRec(maxSoFar, zerosSoFar, oneFound, Math.floor(number / 2))
    }
    return solveRec(0, 0, false, N)
  }

  findMaxBinaryGapByRegexp (N) {
    return N
      .toString(2) // Convert to binary string
      .replace(/0+$/, '') // Remove trailing zeros
      .split(/1+/) // Find all zero-gaps
      .map(x => x.length) // Convert to lengths
      .reduce((max, val) => Math.max(max, val), 0) // Find max length
  }

  setNumber (newValue) {
    let number = parseInt(newValue, 10) || 0
    this.setState({number})
  }

  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Binary Gap</h1>
        <div style={{ marginBottom: 10 }}>
        Max Number: &nbsp;
        <input
          type='number'
          min={0}
          value={this.state.number}
          onChange={(e) => this.setNumber(e.target.value)}
          />
        </div>

        <table style={{
          background: 'whitesmoke'
        }} >
          <thead>
            <th>
              Decimal
            </th>

            <th>
              Binary
            </th>

            <th>
              Gaps by Regexp
            </th>

            <th>
              Gaps by Recursion
            </th>
          </thead>
          <tbody>
            { Array.from(new Array(this.state.number)).map((_, j) => {
              const i = this.state.number - j
              return (
                <tr key={i}>
                  <td>
                    { i }
                  </td>

                  <td>
                    { i.toString(2) }
                  </td>

                  <td>
                    { this.findMaxBinaryGapByRegexp(i) }
                  </td>

                  <td>
                    { this.findMaxBinaryGapByRecursion(i) }
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        <br />
      </div>
    )
  }
}
