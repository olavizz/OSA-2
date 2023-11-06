const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
  }
  
  const Part = (props) => {
      return (
        <div>
            <p>{props.part.name} {props.part.exercises}</p>
        </div>
      )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part =>
        <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    let gg = course.parts.reduce((summa, part)=> summa + part.exercises, 0)
  
    return (
        <div>
           <h3>total of {gg} exercises</h3>
        </div>
  
    )
  
  }

export default Course