import React from 'react'
import { SocialIcon } from 'react-social-icons'

export const Footer = () => {
  return (
    <>
      <div className='footer'>
        <SocialIcon className='socials' url='https://github.com/garak92' target='_blank' rel='noopener noreferrer' />
        <SocialIcon className='socials' url='https://www.linkedin.com/in/fabrizio-p-53a117195/' target='_blank' rel='noopener noreferrer' />
      </div>
    </>
  )
}
