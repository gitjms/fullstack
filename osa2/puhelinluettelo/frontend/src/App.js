import React, {useState, useEffect} from 'react'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import peopleService from './services/people'
import Person from './components/Person'
import People from './components/People'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Footer from './components/Footer'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ nameToFind, setShowNameToFind ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        console.log(initialPeople)
        setPeople(initialPeople)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindNameChange = (event) => {
    setShowNameToFind(event.target.value)
  }

  const setNameToFind = (event) => {
    event.preventDefault()
    if (nameToFind!==''){
      setShowAll(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  let data = []
  const peopleToShow = showAll
    ? data = Array.from(people)
    : people.filter(person => person.name.toLowerCase().includes(nameToFind.toLowerCase()))

  const rows = () => peopleToShow.map(data =>
    <Person
      key={data.name}
      values={data}
      deletePerson={() => deletePersonOf(data.id)}
      replaceNumber={() => replaceNumberOf(data.name,data.number)}
    />
  )

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
  
    const mapNames = people.map(person => person.name.toLowerCase())
      
    if (mapNames.includes(nameObject.name.toLowerCase())) {
      replaceNumberOf(nameObject)
    } else {
      peopleService
      .create(nameObject)
      .then(createdPerson => {
        setPeople(people.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(
          console.log(error.response.data)
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
    }
  }

  const replaceNumberOf = (personNumber) => {
    const person = people.find(n => n.name === personNumber.name)
    const changedPerson = { ...person, number: personNumber.number }
    const askConfirm = `${person.name} is already added to
      phonebook, replace the old number with a new one?`

     if (window.confirm(askConfirm)) {
      peopleService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPeople(people.map(
          oldperson => oldperson.name !== person.name
            ? oldperson
            : returnedPerson
          )
        )
        setMessage(
          `Changed phone number of ${person.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setPeople(people.filter(n => n.id !== person.id))
      })
     }
  }

  const deletePersonOf = id => {
    const person = people.find(n => n.id === id)
    
     if (window.confirm(`Delete ${person.name}?`)) {
      peopleService
      .remove(id, person)
      .then(() => {
        setPeople(people.filter(n => n.id !== id))
        setMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
     }
  }

  return (
  <>
	  <nav id='nav' className='navbar navbar-light bg-light'>
      <img src='/logo.png' width='50' height='35' className='d-inline-block align-top' alt=''/>
      <strong>Phonebook</strong>
      <a role='button' className='btn btn-outline-primary' href='/info'>Info</a>
    </nav>
    <div className='container'>
      <br />
      <div className='col-auto'>
        <Filter 
          setNameToFind={setNameToFind}
          nameToFind={nameToFind}
          handleFindNameChange={handleFindNameChange}
        />
      </div>
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      <br />
      <div className='col-auto'>
        <b>Add new contact</b>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <br />
      <div className='col-auto'>
        <b>Contacts</b>
        <People rows={rows()}/>
      </div>
    <Footer />
    </div>
  </>
  )
}

export default App
