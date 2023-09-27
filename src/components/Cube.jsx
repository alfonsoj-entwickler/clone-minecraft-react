import { useState } from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import { useStore } from '../hooks/useStore'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[`${texture}Texture`]
  const [removeCube] = useStore(state => [state.removeCube])

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={e => {
        e.stopPropagation()
        if (e.altKey) {
          removeCube(id)
        }
      }}
    >
      <boxBufferGeometry attach='geometry' />
      <meshBasicMaterial
        color={isHovered ? 'grey' : 'white'}
        transparent={isHovered}
        map={activeTexture}
        attach='material'
      />
    </mesh>
  )
}
