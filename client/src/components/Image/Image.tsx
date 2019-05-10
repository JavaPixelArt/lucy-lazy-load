import * as React from 'react'

import { ImageType } from '../types'

interface Props {
  image: ImageType
}

const Image = ({ image }: Props) => (
  <div>
    {image && image.urls && (
      <img src={image.urls.regular} alt={image.description} width={400} />
    )}
  </div>
)

export default Image
