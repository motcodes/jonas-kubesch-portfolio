import Image from 'next/image'
import { siteUrl } from 'lib'
import { Ref } from 'react'
// import TorusSVG from './torus.svg'
// import IcosahedronSVG from './icosahedron.svg'
// import ConeSVG from './cone.svg'
// import CubeSVG from './cube.svg'
// import PyramidSVG from './pyramid.svg'

export const Torus = ({
  torusRef,
  className,
  style,
}: {
  torusRef?: Ref<HTMLDivElement>
  className?: string
  style?: {}
}) => (
  <div ref={torusRef} style={style} className={className}>
    <Image src="/torus.svg" alt="cone" layout="fill" />
  </div>
)

export const Icosahedron = ({
  icosahedronRef,
  className,
  style,
}: {
  icosahedronRef?: Ref<HTMLDivElement>
  className?: string
  style?: {}
}) => (
  <div ref={icosahedronRef} style={style} className={className}>
    <Image src="/icosahedron.svg" alt="cone" layout="fill" />
  </div>
)

export const Cone = ({
  coneRef,
  className,
  style,
}: {
  coneRef?: Ref<HTMLDivElement>
  className?: string
  style?: {}
}) => (
  <div ref={coneRef} style={style} className={className}>
    <Image src="/cone.svg" alt="cone" layout="fill" />
  </div>
)

export const Pyramid = ({
  pyramidRef,
  className,
  style,
}: {
  pyramidRef?: Ref<HTMLDivElement>
  className?: string
  style?: {}
}) => (
  <div ref={pyramidRef} style={style} className={className}>
    <Image src="/pyramid.svg" alt="pyramid" layout="fill" />
  </div>
)

export const Cube = ({
  cubeRef,
  className,
  style,
}: {
  cubeRef?: Ref<HTMLDivElement>
  className?: string
  style?: {}
}) => (
  <div ref={cubeRef} style={style} className={className}>
    <Image src="/cube.svg" alt="cube" layout="fill" />
  </div>
)
