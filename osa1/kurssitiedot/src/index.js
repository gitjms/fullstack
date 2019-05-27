import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.name} {props.exercise}</p>
        </div>
     )
}

const Content = (props) => {
    console.log(props)
    return (
        <>
            <Part name={props.parts[0].name} exercise={props.parts[0].exercise} />
            <Part name={props.parts[1].name} exercise={props.parts[1].exercise} />
            <Part name={props.parts[2].name} exercise={props.parts[2].exercise} />
        </>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>yhteensä {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise} tehtävää</p>
        </div>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercise: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercise: 7
            },
            {
                name: 'Komponenttien tila',
                exercise: 14
            }
        ]
    }

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
