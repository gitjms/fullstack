import React from 'react'

const Part = (props) => {
    console.log('part: ',props)

    const rows = () => course.content.map(course =>
        //<Course
            <li key={course.id}>
            name={course.name}
            exercise={course.exercise}      
            </li>
        ///>
    )

    return (
        <div>
            <p>{props.name} {props.exercise}</p>
        </div>
     )
}

export default Part