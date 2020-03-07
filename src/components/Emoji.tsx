import React from 'react'

interface Props {
  name: string;
  src: string;
}

function Emoji({ name, src }: Props) {
  return (
    <div className="emoji">
      <img src={src} />
      <p>:{name}:</p>
    </div>
  )
}

export default Emoji