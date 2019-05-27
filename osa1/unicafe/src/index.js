import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h2>{props.header}</h2>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            unicafe feedback app created by 
            <a href="https://github.com/gitjms">jms</a>
        </div>
    )
}

const Statistic = ({text,value}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td width="60em">{text}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </table>
    )
}

const Statistics = ({parts,grade}) => {
    if (parts[3].value>0) {
        let goods = parts[0].value
        let neutrals = parts[1].value
        let bads = parts[2].value
        let total = parts[3].value
        let average = grade/total
        let positives = 100*parts[5].value/total

        return (
            <>
                <Statistic text="hyvä" value={goods} />
                <Statistic text="neutraali" value={neutrals} />
                <Statistic text="huono" value={bads} />
                <Statistic text={parts[3].text} value={total} />
                <Statistic text={parts[4].text} value={average} />
                <Statistic text={parts[5].text} value={positives + ' %'} />
            </>
        )
    }

    return (<> Ei yhtään palautetta annettu <br></br></>)
}

const Button = ({handleClick, text}) => {
    return <button onClick={handleClick}> {text} </button>
}

const App = () => {
    const header = 'anna palautetta'
    const [good,setToGood] = useState(0)
    const [neutral,setToNeutral] = useState(0)
    const [bad,setToBad] = useState(0)
    const [total,setToTotal] = useState(0)
    const [grade,setToGrade] = useState(0)
    const [average] = useState(0)
    const [positives,setToPositives] = useState(0)

    const setGood = () => {
        setToGood(good+1)
        setTotal()
        setGrade(1)
        setPositives()
    }
    const setNeutral = () => {
        setToNeutral(neutral+1)
        setTotal()
        setGrade(0)
    }
    const setBad = () => {
        setToBad(bad+1)
        setTotal()
        setGrade(-1)
    }
    const setTotal = () => setToTotal(total+1)
    const setGrade = (props) => setToGrade(grade+props)
    const setPositives = () => setToPositives(positives+1)

    const stats = {
        name: 'statistiikka',
        parts: 
        [
            { text: 'hyvä', value: good },
            { text: 'neutraali', value: neutral },
            { text: 'huono', value: bad },
            { text: 'yhteensä', value: total },
            { text: 'keskiarvo', value: average },
            { text: 'positiivisia', value: positives }

        ]
    }

    return (
        <>
            <Header header={header} />
            <Button handleClick={() => setGood()} text='hyvä' />
            <Button handleClick={() => setNeutral()} text='neutraali' />
            <Button handleClick={() => setBad()} text='huono' />
            <Header header={stats.name} />
            <Statistics parts={stats.parts} grade={grade} />
            <br></br>
            <Footer />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
