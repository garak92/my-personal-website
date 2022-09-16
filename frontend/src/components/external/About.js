function About() {
  return (
    <>
      <div className='dyn-height' style={{ position: 'relative' }}>
        <h2 className='subtitle'>Hi, I am Michael! Thank you for passing by!</h2>
        <div className='paragraphDiv'>
          <p className='paragraph'>
            I am a professional software developer from South America. I am very skilled with the MERN stack,
            and also have plenty of experience with Data Analytics. As a plus, I am very good managing teams
            and projects, and have a bit of experience with DevOps tools such as Docker.
          </p>
          <p className='paragraph'>
            I code mostly in Javascript, Python, and SQL. As a hobby, I like dabbling into the world of
            systems programming, so I also use some C and Rust for my personal experiments.
          </p>
          <p className='paragraph'>
            Before getting into tech, I've got a philosophy major and worked as a professional musician.
          </p>
        </div>
      </div>
    </>
  )
}

export default About