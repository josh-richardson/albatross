import './Footer.css'
import { VERSION } from '../../constants'
import ArweaveIcon from './ArweaveIcon'
import GithubIcon from './GithubIcon'
import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <hr />
        <div className="left">
          <p>Albatross Version: 0.{VERSION}</p>
        </div>

        <div className="right">
          <a href="https://arweave.org">
            <ArweaveIcon />
          </a>
          <a href="https://github.com/josh-richardson/albatross">
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
export default Footer
