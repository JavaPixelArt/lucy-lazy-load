import PCancelable from 'cancelable-promise'
import React, { useReducer, useEffect, Ref } from 'react'
import { useInView } from 'react-intersection-observer'

import loadImagePromise from '../utils/loadImage'

import { ImageWrapper } from './Image.styled'

interface Props {
  src: string
  index: number
  alt?: string
  placeholderSrc?: string
  onView(index: number): void
  onError?(): void
  onLoaded?(): void
}

const Image = ({
  src,
  placeholderSrc,
  alt,
  onError,
  onLoaded,
  onView,
  index,
}: Props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      imageLoaded: false,
      imageError: false,
    },
  )

  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  let loadingPromise: PCancelable.CancelablePromise<{
    status: 'Image is loaded' | 'Image load error'
  }>

  useEffect(() => {
    loadImage()
  }, [])

  useEffect(() => {
    if (inView) onView(index)
  }, [inView])

  useEffect(() => {
    setState({
      imageLoaded: false,
      imageError: false,
    })
    loadImage()
  }, [src])

  useEffect(
    () => () => {
      if (loadingPromise) {
        loadingPromise.cancel()
      }
    },
    [],
  )

  const onImageLoaded = () => {
    if (onLoaded) onLoaded()

    setState({
      imageLoaded: true,
      imageError: false,
    })
  }

  const onImageError = () => {
    if (onError) onError()

    setState({
      imageError: true,
    })
  }

  const loadImage = () => {
    loadingPromise = loadImagePromise(src)
    loadingPromise.then(onImageLoaded).catch(onImageError)
  }

  return state.imageError && placeholderSrc ? (
    <ImageWrapper alt={alt} src={placeholderSrc} />
  ) : (
    <ImageWrapper
      ref={ref}
      alt={alt}
      src={state.imageLoaded ? src : placeholderSrc}
    />
  )
}

export default Image
