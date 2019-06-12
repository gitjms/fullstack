import React from 'react'

const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
     )
}

const Content = ({content}) => {
    const rows = () => content.map(part =>
        <Part
            key={part.id}
            part={part}     
        />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({total}) => {
    let count = 0
    const total_exercises = total.reduce( (s,p) => {
        return count += p.exercises
    },0)
    return (
        <div>
            <p>yhteensä {total_exercises} tehtävää</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content content={course.parts} />
            <Total total={course.parts} />
        </>
    )
}

const Courses = ({courses}) => {
    const rows = () => courses.map(course =>
        <Course
            key={course.id}
            course={course}     
        />
    )
    return (
        <>
            {rows()}
        </>
    )
}

export default Courses
