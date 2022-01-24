import React, { useState, useEffect } from 'react';

import styles from './shareButton.module.css'
import Button from '../button'

const URL_COPY_TIMEOUT = 2000

const copyToClipboard = (text) => {
  const elem = document.createElement('textarea')
  elem.value = text
  document.body.appendChild(elem)
  elem.select()
  document.execCommand('copy')
  document.body.removeChild(elem)
}

const ShareButton = ({
  title,
  description,
  url,
}) => {
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false)
      }, URL_COPY_TIMEOUT);
    }
  }, [clicked])

  const handleClick = () => {
    if (!navigator.share) {
      copyToClipboard(url || document.location.href)
      setClicked(true)
      return
    }
    navigator.share({
      title,
      text: description,
      url: url || document.location.href,
    })
  }
  return (
    <Button
      customStyle={styles.shareButton}
      disabled={clicked}
      onClick={handleClick}
      text={!clicked ? 'Share' : 'Link copied!'}
    />
  )
}

export default ShareButton
