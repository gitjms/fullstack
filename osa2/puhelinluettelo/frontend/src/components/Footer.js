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
      <hr />
      <center>
      <em>Phonebook app, Full Stack Web Development</em>
      <br />
      <em>University of Helsinki 2020</em>
      <br />
      <a href='https://icons8.com/icon/aggz2cCtJYrP/phone-contact'>Phone Contact icon by Icons8</a>
      </center>
    </div>
  )
}

export default Footer