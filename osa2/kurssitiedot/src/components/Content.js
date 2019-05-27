import React from 'react'
// import Part from './Part'
// import Course from './Course'

const Content = course => {
    console.log('Content_ylä: ok')//,course.content)

    const rows = () => course.content.map(course =>
        <Course
            key={course.id}
            name={course.name}
            exercise={course.exercise}      
        />
    )
    console.log('Content_ala: ',rows())
    return (
        <>
            <Part parts={rows().parts} />
        </>
    )
}

export default Content
