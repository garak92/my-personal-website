import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getBlogIdAxios } from '../../axios/blogs';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Helmet } from "react-helmet";
import logo from '../../logo3.png';

const BlogPost = () => {
  const { id } = useParams()
  const [blogPost, setBlogPost] = useState()
  const [currentRecord, setCurrentRecord] = useState()

  const getDataId = async () => {
    try {
      const data = await getBlogIdAxios(id)
      setCurrentRecord(data.record)
      return data.record
    } catch (err) {
      console.error('Error: ', err.message)
    }
  }

  useEffect(() => {
    getDataId()
  }, [])

  useEffect(() => {
    setBlogPost(currentRecord)
  }, [currentRecord])

  // This component parses the markdown and syntax-highlighs all of the markdown codeblocks
  return (
    <>
      <div className='blogPost'>
        <Helmet>
          <title>Michael Pomata's tech blog</title>
          <meta name="description" content={blogPost?.title} />
          <meta property="og:image" content={logo} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:image" content={logo} />
        </Helmet>
        <h1 style={{ marginTop: "5vh", textAlign: 'center' }}>{blogPost?.title}</h1>
        <ReactMarkdown
          children={blogPost ? blogPost.content : null} components={{
            code({ node, inline, className = 'blog-code', children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match
                ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                )
                : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
            }
          }}
        />
      </div>
    </>
  )
}

export default BlogPost
