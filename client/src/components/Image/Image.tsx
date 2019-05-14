import PCancelable from 'cancelable-promise'
import React, { useReducer, useEffect } from 'react'

import loadImagePromise from '../utils/loadImage'

import { ImageWrapper } from './Image.styled'

interface Props {
  src: string
  placeholderSrc?: string
  alt?: string
  onError?(): void
  onLoaded?(): void
}

const Image = ({ src, placeholderSrc, alt, onError, onLoaded }: Props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      imageLoaded: false,
      imageError: false,
    },
  )

  let loadingPromise: PCancelable.CancelablePromise<{
    status: 'Image is loaded' | 'Image load error'
  }>

  useEffect(() => {
    loadImage()
  }, [])

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
    <ImageWrapper alt={alt} src={state.imageLoaded ? src : placeholderSrc} />
  )
}

export default Image
