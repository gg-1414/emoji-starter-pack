import React from 'react'
import Popup from './Popup'

interface Props {
  name: string;
  src: string;
}

const handleEmojiClick = (e: any) => {
  const name = e.target.querySelector('p').innerText
  const imageUrl = e.target.querySelector('img').src
  const url = `/add-emoji?name=${name}&url=${imageUrl}`

  const addEmoji = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      return <Popup success={data["status"]}/>
    } catch (err) {
      console.log('error', err)
    }
  }

  addEmoji() 
}

function Emoji({ name, src }: Props) {
  return (
    <div className="emoji" onClick={handleEmojiClick}>
      <img src={src} />
      <p>:{name}:</p>
    </div>
  )
}

export default Emoji