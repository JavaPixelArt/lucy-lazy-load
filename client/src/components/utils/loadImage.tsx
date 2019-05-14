import PCancelable from 'cancelable-promise'

export default (
  src: string,
): PCancelable.CancelablePromise<{
  status: 'Image is loaded' | 'Image load error'
}> =>
  new PCancelable((resolve, reject) => {
    const imageElement: HTMLImageElement = new Image()
    imageElement.onload = () => {
      resolve({ status: 'Image is loaded' })
    }
    imageElement.onerror = () => {
      reject({ status: 'Image load error' })
    }
    imageElement.src = src

    if (imageElement.complete) {
      if (imageElement.onload) imageElement.onload(null)
    }
  })
