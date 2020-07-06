import React from 'react'

const Statistic = ({text,value}) => {
  return (
      <>
        <td width='60em'>{text}</td>
        <td>{value}</td>
    </>
  )
}

export default Statistic