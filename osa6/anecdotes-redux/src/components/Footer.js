import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <center>
        <hr />
        <em>Anecdotes Voting app, Redux Version</em>
        <br />
        <em>Full Stack Web Development</em>
        <br />
        <em>University of Helsinki 2020</em>
      </center>
    </div>
  )
}

export default Footer