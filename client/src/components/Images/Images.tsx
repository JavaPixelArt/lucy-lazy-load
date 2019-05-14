import axios from 'axios'
import React, { useRef, useReducer, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Image from '../Image'

import { ImageType } from '../types'

import { ImagesWrapper } from './Image.styled'

const START = 1
const NUMBER = 3

const Images = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      images: [],
      isLoading: false,
    },
  )

  const [ref, inView] = useInView({
    threshold: 1,
  })

  useEffect(() => {
    const { images, isLoading } = state

    if (!inView || isLoading) return

    setState({ isLoading: true })

    const fetchData = async () => {
      const { images } = state
      const result = await axios.get(
        `/api/photos?count=${NUMBER}&start=${START + images.length}`,
      )

      setState({
        images: [...images, ...result.data],
        isLoading: false,
        loaded: images.length + result.data.length,
      })
    }

    fetchData()
  }, [inView])

  return (
    <ImagesWrapper>
      {state.images.map((image: ImageType) => (
        <Image
          key={image.id}
          src={image.urls.full}
          placeholderSrc={image.urls.thumb}
          alt={image.description}
        />
      ))}
      <h1 ref={ref}>{state.isLoading ? '. . .' : ''}</h1>
    </ImagesWrapper>
  )
}

export default Images
