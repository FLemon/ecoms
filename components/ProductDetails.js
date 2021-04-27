import { useState, useEffect } from 'react'
import {
  Center, SimpleGrid
} from "@chakra-ui/react"
import ProductCarousel from '@components/ProductCarousel'
import ProductVariantsForm from '@components/ProductVariantsForm'
import { CarouselProvider } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants, posts } = props
  const sizeGuide = posts.find(p => p.slug === "size-guide")
  const slides = images.length ? images : new Array({url: fallbackImage})

  if (productVariants.length === 0) {
    return (
      <Center>
        Coming soon
      </Center>
    )
  }

  return (
    <CarouselProvider naturalSlideWidth={600} naturalSlideHeight={600} infinite={true}
      visibleSlides={1} totalSlides={slides.length || 1}>
      <Center p={2}>
        <SimpleGrid w={{base: "full", lg: "60%"}} columns={{sm: 1, md: 2}} spacing="2">
          <ProductCarousel slides={slides} slideIndex={slideIndex} />
          <ProductVariantsForm productVariants={productVariants} product={product}
            slideIndex={slideIndex} sizeGuide={sizeGuide}/>
        </SimpleGrid>
      </Center>
    </CarouselProvider>
  )
}
