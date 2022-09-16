import { Helmet } from "react-helmet";
import logo from '../../logo3.png';

function Home() {
  return (
    <>
      <div>
        <Helmet>
          <title>Michael Pomata's website</title>
          <meta name="description" content="Full stack web developer" />
          <meta property="og:image" content={logo} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:image" content={logo} />
        </Helmet>
        <h1 className='title'>Michael Pomata</h1>
        <h2 className='subtitle'>Full Stack Web Developer</h2>
      </div>
    </>
  )
}

export default Home
