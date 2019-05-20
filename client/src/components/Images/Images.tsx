import axios from 'axios'
import React, { useReducer, useEffect } from 'react'

import Image from '../Image'

import { ImageType } from '../types'

import { ImagesWrapper } from './Image.styled'

const Images = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      images: [],
      isLoading: false,
      numberViewed: 0,
    },
  )

  const fetchData = async (number: number) => {
    const { images } = state

    setState({ isLoading: true })

    const result = await axios.get(
      `/api/photos?count=${number}&start=${1 + images.length}`,
    )

    setState({
      images: [...images, ...result.data],
      isLoading: false,
    })
  }

  const handleView = (index: number) => {
    setState({ numberViewed: Math.max(index + 1, state.numberViewed) })
  }

  useEffect(() => {
    fetchData(3)
  }, [])

  useEffect(() => {
    if (state.numberViewed && state.numberViewed + 1 === state.images.length) {
      fetchData(1)
    }
  }, [state.numberViewed])

  return (
    <ImagesWrapper>
      {state.images.map((image: ImageType, index: number) => (
        <Image
          key={image.id}
          index={index}
          src={image.urls.full}
          placeholderSrc={image.urls.thumb}
          alt={image.description}
          onView={handleView}
        />
      ))}
    </ImagesWrapper>
  )
}

export default Images
