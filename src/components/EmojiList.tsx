import React, { Component } from 'react'
import Emoji from './Emoji'

import batparrot from '../assets/batparrot.gif'
import bugparrot from '../assets/bugparrot.gif'
import capsparrot from '../assets/capsparrot.gif'
import catparrot from '../assets/catparrot.gif'
import congadoge from '../assets/congadoge.gif'
import cryingjordanparrot from '../assets/cryingjordanparrot.gif'
import cursedparrot from '../assets/cursedparrot.gif'
import dogeparrot from '../assets/dogeparrot.gif'
import nyanparrot from '../assets/nyanparrot.gif'
import oriolesparrot from '../assets/oriolesparrot.gif'
import parrotpoop from '../assets/capsparrot.gif'

interface IEmoji {
  name: string;
  src: string;
}

const emojis: IEmoji[] = [
  {
    name: 'batparrot',
    src: batparrot
  }, 
  {
    name: 'bugparrot',
    src: bugparrot
  },
  {
    name: 'capsparrot', 
    src: capsparrot
  },
  {
    name: 'catparrot', 
    src: catparrot
  },
  {
    name: 'congadoge', 
    src: congadoge
  },
  {
    name: 'cryingjordanparrot',
    src: cryingjordanparrot
  },
  {
    name: 'cursedparrot', 
    src: cursedparrot
  },
  {
    name: 'dogeparrot',
    src: dogeparrot
  },
  {
    name: 'nyanparrot',
    src: nyanparrot
  },
  {
    name: 'oriolesparrot',
    src: oriolesparrot
  },
  {
    name: 'parrotpoop',
    src: parrotpoop
  }
]

class EmojiList extends Component { 
  render() {
    return (
      <main>
        <div className="emojis-list">
          {emojis.map((emoji: IEmoji, i: number) => <Emoji src={emoji.src} name={emoji.name} key={i} />)}
        </div>
      </main>
    )
  }
}

export default EmojiList