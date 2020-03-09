import * as React from 'react'
import Popup from './Popup'

type Props = {
  name: string;
  src: string;
  addEmoji: (name: string, imageUrl: string) => Promise<void>;
}

class Emoji extends React.Component<Props> {

  handleEmojiClick = (e: any) => {
    const { addEmoji } = this.props
    const name = e.target.querySelector('p').innerText
    const imageUrl = e.target.querySelector('img').src
  
    addEmoji(name, imageUrl) 
  }

  render() {
    const { name, src } = this.props
    return (
      <div className="emoji" onClick={this.handleEmojiClick}>
        <img src={src} />
        <p>:{name}:</p>
      </div>
    )
  }
}

export default Emoji