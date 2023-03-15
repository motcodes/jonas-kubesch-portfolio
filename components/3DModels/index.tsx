import Image from 'next/legacy/image'
import { siteUrl } from 'lib'
import { Ref } from 'react'

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
    <Image src={`${siteUrl('/torus.svg')}`} alt="cone" layout="fill" />
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
    <Image src={`${siteUrl('/icosahedron.svg')}`} alt="cone" layout="fill" />
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
    <Image src={`${siteUrl('/cone.svg')}`} alt="cone" layout="fill" />
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
    <Image src={`${siteUrl('/pyramid.svg')}`} alt="pyramid" layout="fill" />
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
    <Image src={`${siteUrl('/cube.svg')}`} alt="cube" layout="fill" />
  </div>
)
