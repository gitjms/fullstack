import React from 'react'

const Recommended = (props) => {

  if (!props.show) {
    return null
  }

  const padding = {
    paddingRight: '10px'
  }

  return (
    <div>
      <br />
      <h2>recommendations</h2>
      <br />
      <>books in your favorite genre <b>{props.favoriteGenre}:</b><br /><br /></>
      <table>
        <tbody>
          <tr>
            <th style={padding}></th>
            <th style={padding}>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.favoriteBooks.map((b,v,i) =>
            <tr key={v}>
              <td style={padding}><em>{b.title}</em></td>
              <td style={padding}>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
