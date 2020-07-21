const {
  UserInputError,
  AuthenticationError
} = require('apollo-server')

const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const config = require('../utils/config')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const JWT_SECRET = config.SECRET

  const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.author && args.genre) {
          author = await Author.findOne({ name: args.author }).populate('books')
          return await Book.find({ author: { $in: author._id }})
            .find({ genres: { $in: [args.genre] }}).populate('author')
        } else if (args.author) {
          author = await Author.findOne({ name: args.author }).populate('books')
          return await Book.find({ author: { $in: author._id }}).populate('author')
        } else if (args.genre) {
          return await Book.find({ genres: { $in: [args.genre] }}).populate('author')
        } 
        return Book.find({}).populate('author')
      },
      allAuthors: () => Author.find({}).populate('books'),
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
      author: async (root) => await Author.findOne({ _id: root.author }).populate('books'),
      published: (root) => root.published,
      genres: (root) => root.genres
    },
    Author:  {
      name: (root) => root.name,
      born: (root) => root.born,
      books: async (root) => await Book.find({ author: root._id }).populate('books'),
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
  
          const author = await Author.findOne({ name: args.author }).populate('books')
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

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        }
      },
  
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
  
        const author = await Author.findOne({ name: { $in: args.name }}).populate('books')
        if (author) {
          await Author.updateOne(author, { $set: { born: args.setBornTo }})

          pubsub.publish('AUTHOR_EDITED', { authorEdited: author })

          return Author.findOne({ name: { $in: args.name }}).populate('books')
        } else {
          return null
        }
      }
    },

    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      },
      authorEdited: {
        subscribe: () => pubsub.asyncIterator(['AUTHOR_EDITED'])
      },
    }
  }

  module.exports = resolvers