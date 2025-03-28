import React, {Fragment, memo } from 'react'

export const Client = memo((props) => {
  return (
    <>
      <img src={props.clientImage} alt="client-details" className="img-fluid client-img" loading="lazy"/>

    </>
  )
})
export default Client