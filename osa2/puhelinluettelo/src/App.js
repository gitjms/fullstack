import React, {useState, useEffect} from 'react'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import personService from './services/persons'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Footer from './components/Footer'


const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ nameToFind, setShowNameToFind ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                console.log(initialPersons)
                setPersons(initialPersons)
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

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(nameToFind.toLowerCase()))

    const rows = () => personsToShow.map(values =>
        <Person
            key={values.name}
            values={values}
            deletePerson={() => deletePersonOf(values.id)}
            replaceNumber={() => replaceNumberOf(values.name,values.number)}
        />
    )

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber,
        }
    
        const mapNames = persons.map(person => person.name.toLowerCase())
        
        // if (mapNames.includes(nameObject.name.toLowerCase())) {
        //     replaceNumberOf(nameObject)
        // } else {
        if (!mapNames.includes(nameObject.name.toLowerCase())) {
            personService
            .create(nameObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
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
                    `Something went wrong...`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 4000)
            })
        }
    }

    const replaceNumberOf = (personNumber) => {
        const person = persons.find(n => n.name === personNumber.name)
        const changedPerson = { ...person, number: personNumber.number }
        const askConfirm = `${person.name} is already added to
            phonebook, replace the old number with a new one?`

         if (window.confirm(askConfirm)) {
            personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(
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
                setPersons(persons.filter(n => n.id !== person.id))
            })
         }
    }

    const deletePersonOf = id => {
        const person = persons.find(n => n.id === id)
        
         if (window.confirm(`Delete ${person.name}?`)) {
            personService
            .remove(id, person)
            .then(returnedPerson => {
                setPersons(persons.filter(n => n.id !== id))
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
        <div>
            <h1 >Phonebook</h1>
            <div class="col-auto">
                <Filter 
                    setNameToFind={setNameToFind}
                    nameToFind={nameToFind}
                    handleFindNameChange={handleFindNameChange}
                />
            </div>
                <Message message={message} />
                <ErrorMessage message={errorMessage} />
            <br />
            <div class="col-auto">
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
            <div class="col-auto">
                <b>Contacts</b>
                <Persons rows={rows()}/>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default App
