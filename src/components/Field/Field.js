import React from 'react'
import styled from 'styled-components'

const Field = ({cells, gameover}) => {
    return (
        <FieldTag>
            {gameover && <GameOver>Game Over!</GameOver>}
            <Background>
                {
                    Array
                        .from(new Array(16), (_, i) => i)
                        .map(i =>
                            <BackgroundCell key={i}/>
                        )}
            </Background>
            <Playground>
                {cells.map(({x, y, value, id}) => (
                    <Cell key={id} x={x} y={y} value={value}>
                        {value}
                    </Cell>
                ))}
            </Playground>
        </FieldTag>
    )
}

const FieldTag = styled.div`
  height: 475px;
  position: relative;
  width: 475px;
  color: #776e65;
  line-height: 475px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`

const GameOver = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  top: 0;
  left: 0;
  background: rgba(238, 228, 218, 0.73);
  z-index: 100;
`

const Background = styled.div`
  align-content: space-between;
  background-color: #bbada0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 450px;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  width: 450px;
`

const Playground = styled(Background)`
  background-color: transparent;
`

const BackgroundCell = styled.div`
  margin: 5px;
  background-color: rgba(238, 228, 218, 0.35);
  height: 100px;
  width: 100px;
  border-radius: 5px;
`

const Cell = styled(BackgroundCell)`
  transform: translate(${({x}) => x * 110}px, ${({y}) => y * 110}px);
  text-align: center;
  line-height: 100px;
  background-color: ${({value}) => calculateBackgroundColor(value)};
  position: absolute;
  transition-property: transform;
  transition: 100ms ease-in-out;
  color: #6a4e4e;
  font-weight: 900;
  -ms-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  font-size: ${({value}) =>
    value < 100 ? 66
        : value < 1000 ? 46
        : value < 10000 ? 35
            : 28}px;
`

const calculateBackgroundColor = value => {
    if (value === 0) {
        return 'transparent'
    }
    // from 0 to 16
    const step = Math.min(16, Math.log2(value))
    return `hsl(0, ${calculateSaturation(step)}%, ${calculateLightness(step)}%);`
}
const calculateSaturation = step => Math.floor(100 / 16 * step)
const calculateLightness = step => 100 - Math.floor(50 / 16 * step)

export default Field
