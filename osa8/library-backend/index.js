const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const JWT_SECRET = config.SECRET
const MONGODB_URI = config.MONGODB_URI


logger.info('connecting to', MONGODB_URI)

mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
// ]
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky',
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//     // birthyear not known
//   },
//   { 
//     name: 'Sandi Metz',
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//     // birthyear not known
//   },
// ]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä
 * tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: {
  //     name: 'Robert Martin',
  //     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  //     born: 1952,
  //   },
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
// ]
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"]
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]! 
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book]!
    bookCount: Int
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    me: User
    favorites: [Book]
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = Book.collection.find({})
      if (args.author && args.genre) {
        author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: author._id }})
          .find({ genres: { $in: [args.genre] }}).populate('author')
      } else if (args.author) {
        author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: author._id }}).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] }}).populate('author')
      } 
      return Book.find({})
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) =>  context.currentUser,
    favorites: async (root, args, context) =>
      await Book.find(
        { genres: { $in: [context.currentUser.favoriteGenre] }})
        .populate('author')
  },
  User: {
    username: (root) => root.username,
    favoriteGenre: (root) => root.favoriteGenre
  },
  Book: {
    title: (root) => root.title,
    author: async (root) => await Author.findOne({ _id: root.author }),
    published: (root) => root.published,
    genres: (root) => root.genres
  },
  Author:  {
    name: (root) => root.name,
    born: (root) => root.born,
    books: async (root) => await Book.find({ author: root._id }),
    bookCount: (root) => root.books.length
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          logger.error('error: ', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (! await Book.exists({ title: args.title })) {
        if (! await Author.exists({ name: args.author })) {
          const author = new Author({
            name: args.author,
            born: null
          })
          try {
            await author.save()
          } catch (error) {
            logger.error('error: ', error)
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }

        const author = await Author.findOne({ name: args.author })
        const book = new Book({
          title: args.title,
          author: author._id,
          published: Number(args.published),
          genres: args.genres
        })
        try {
          const newBook = await book.save()
          author.books = author.books.concat(newBook._id)
          await author.save()
        } catch (error) {
          logger.error('error: ', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: { $in: args.name }})
      if (author) {
        await Author.updateOne(author, { $set: { born: args.setBornTo }})
        return await Author.findOne({ name: { $in: args.name }})
      } else {
        return null
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
