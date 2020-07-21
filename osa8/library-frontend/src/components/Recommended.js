import React from 'react'

const Recommended = (props) => {

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <>books in your favorite genre <b>{props.favoriteGenre}</b><br /><br /></>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.favoriteBooks.map((b,v,i) =>
            <tr key={v}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
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
