import { useState, useEffect } from 'react'
import { useStore } from '../hooks/useStore'
import * as images from '../images/images'
import { useKeyboard } from '../hooks/useKeyboard'

export const TextureSelect = () => {
  const [visible, setVisible] = useState(false)
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])
  const {
    dirt,
    grass,
    glass,
    wood,
    log
  } = useKeyboard()

  useEffect(() => {
    const visibilityTimeOut = setTimeout(() => {
      setVisible(false)
    }, 2000)
    setVisible(true)
    return () => {
      clearTimeout(visibilityTimeOut)
    }
  }, [texture])

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log
    }
    const selectedTexture = Object
      .entries(options)
      .find(([texture, isEnabled]) => isEnabled)
    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, grass, glass, wood, log])

  return (
    <div className='texture-select'>
      {
        Object.entries(images).map(([imgKey, img]) => (
          <img
            key={imgKey}
            src={img}
            alt={imgKey}
            className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
          />
        ))
    }
    </div>
  )
}
