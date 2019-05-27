import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Footer = () => {
    return (
        <div>
            anecdotes app created by 
            <a href="https://github.com/gitjms">jms</a>
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h2>{props.header}</h2>
        </div>
    )
}

const Display = ({anecdote,votes}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th height="50" align ="left">
                        {anecdote}
                    </th>
                </tr>
                <tr>
                    <td>has {votes} votes</td>
                </tr>
            </tbody>
        </table>
    )
}

const Button = ({handleClick, text}) => {
    return <button onClick={handleClick}> {text} </button>
}

const App = ({anecdotes}) => {
    const max = anecdotes.length

    const [selected, setSelected] = useState(0)
    const [mostVoted,setMostVotedIndex] = useState(0)
    const [points,setVoted] = useState(Array.apply(null, Array(6)).map(Number.prototype.valueOf, 0))

    const voteHandler = (selected) => {
        const copy = {...points}
        copy[selected] += 1
        setVoted(copy)

        for (let i = 0; i < Object.keys(copy).length; i++)
            if (copy[i] > copy[mostVoted])
                setMostVoted(i)
     }

    const setMostVoted = (props) => setMostVotedIndex(props)

    return (
        <>
            <Header header="Anecdote of the day" />
            <Display anecdote={anecdotes[selected]} votes={points[selected]}/>
            <Button handleClick={() => voteHandler(selected)} text='vote' />
            <Button handleClick={() => setSelected(Math.floor(Math.random() * max))} text='next anecdote' />
            <Header header="Anecdote with most votes" />
            <Display anecdote={anecdotes[mostVoted]} votes={points[mostVoted]}/>
            <br></br><br></br>
            <Footer />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
