import axios from 'axios'
import React, { useRef, useReducer, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Image from '../Image'

import { ImageType } from '../types'

const START = 1
const NUMBER = 30

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
    <>
      {state.images.map((image: ImageType) => (
        <Image key={image.id} image={image} />
      ))}
      <div ref={ref} />
      {state.isLoading && <h1>loading...</h1>}
    </>
  )
}

export default Images
