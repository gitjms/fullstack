import { gql  } from '@apollo/client'

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const FAVORITE_BOOKS = gql`
  query {
    favorites {
      title 
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title 
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
export const FIND_BOOKS_BY_AUTHOR = gql`
  query findBookByGenre($author: String!){
    allBooks(author: $author) { 
      title 
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
export const FIND_BOOKS_BY_GENRE = gql`
  query findBookByGenre($genre: String!){
    allBooks(genre: $genre) { 
      title 
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
export const FIND_BOOKS_BY_AUTHOR_AND_GENRE = gql`
  query findBookByAuthorAndGenre($author: String!, $genre: String!){
    allBooks(author: $author, genre: $genre) { 
      title 
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
export const NEW_BOOK = gql`
  mutation addBook($title: String!, $author:String!, $published:Int!, $genres:[String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title,
      author {
        name
        born
        bookCount
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
