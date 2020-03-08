import React from 'react'

interface Props {
  success: number
}

const renderMessage = () => {
  // const success = this.props

}

function Popup({ success }: Props) {
  return (
    <div className="pop-up-wrapper">
      <p>Success!</p> 
    </div>
  )
}

export default Popup