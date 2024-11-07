import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-darkText text-2xl 2xl:text-4xl font-bold underline decoration-orangeText underline-offset-8'>{text1} <span className='text-darkText font-bold underline decoration-orangeText'>{text2}</span></p>
    </div>
  )
}

export default Title
