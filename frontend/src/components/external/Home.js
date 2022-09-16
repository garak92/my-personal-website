import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <div>
        <Helmet>
          <title>Michael Pomata's website</title>
          <meta name="description" content="Full stack web developer" />
        </Helmet>
        <h1 className='title'>Michael Pomata</h1>
        <h2 className='subtitle'>Full Stack Web Developer</h2>
      </div>
    </>
  )
}

export default Home
