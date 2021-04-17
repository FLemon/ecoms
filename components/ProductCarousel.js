import { useContext, useState, useEffect } from 'react'
import {
  CarouselProvider, CarouselContext, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import {
  Center, Box, Image, FormControl, FormLabel, Select,
  Button, HStack, useNumberInput, Input, useColorModeValue, Link, Text
} from "@chakra-ui/react"

export default function ProductCarousel({images, colour, slideIndex}) {
  const slides = images.length ? images : new Array({url: fallbackImage})

  const Sliders = () => {
    const carouselContext = useContext(CarouselContext)
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);

    useEffect(() => {
      const onChange = () => {
        setCurrentSlide(carouselContext.state.currentSlide)
      }
      carouselContext.subscribe(onChange)
      return () => carouselContext.unsubscribe(onChange)
    }, [carouselContext])

    useEffect(() => {
      carouselContext.setStoreState({ currentSlide: slideIndex[colour] })
    }, [colour])

    const selectSlide = (e) => {
      carouselContext.setStoreState({ currentSlide: e.target.getAttribute("index") })
    }

    return (
      <>
        <Box m={3}>
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index} index={index}>
                <Center h="100%">
                  <Image index={index} src={slide.url} />
                </Center>
              </Slide>
            ))}
          </Slider>
        </Box>
        <CarouselProvider naturalSlideWidth={400} naturalSlideHeight={450} infinite={true}
          visibleSlides={4} totalSlides={slides.length || 1}>
          <Box pos="relative">
            <Slider>
              {slides.map((slide, index) => (
                <Link key={slide.id} href="#">
                  <Slide index={index} onClick={selectSlide}>
                    <Center h="100%"><Image index={index} px="2px" src={slide.url} /></Center>
                  </Slide>
                </Link>
              ))}
            </Slider>
            <ButtonBack>
              <Center z-index={99} pos="absolute" top="0" h="100%" w="20px" left="0" bg="white" opacity="80%" align="middle">
                {`<`}
              </Center>
            </ButtonBack>
            <ButtonNext>
              <Center z-index={99} pos="absolute" top="0" h="100%" w="20px" right="0" bg="white" opacity="80%" align="middle">
                {`>`}
              </Center>
            </ButtonNext>
          </Box>
        </CarouselProvider>
      </>
    )
  }

  return (
    <CarouselProvider naturalSlideWidth={400} naturalSlideHeight={450} infinite={true}
      visibleSlides={1} totalSlides={slides.length || 1}>
      <Sliders />
    </CarouselProvider>
  )
}
