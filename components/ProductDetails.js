import { useState, useEffect } from 'react'
import {
  Center, SimpleGrid
} from "@chakra-ui/react"
import ProductCarousel from '@components/ProductCarousel'
import ProductVariantsForm from '@components/ProductVariantsForm'

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants, posts } = props
  const sizeGuide = posts.find(p => p.slug === "size-guide")

  if (productVariants.length === 0) {
    return (
      <Center>
        Coming soon
      </Center>
    )
  }

  return (
    <Center p={2}>
      <SimpleGrid w={{base: "full", lg: "60%"}} columns={{sm: 1, md: 2}} spacing="2">
        <ProductCarousel images={images} slideIndex={slideIndex} />
        <ProductVariantsForm productVariants={productVariants} product={product} sizeGuide={sizeGuide}/>
      </SimpleGrid>
    </Center>
  )
}
