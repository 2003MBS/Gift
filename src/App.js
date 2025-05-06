import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Button, Container, IconButton, Grid } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Parallax } from 'react-parallax';
import { useInView } from 'react-intersection-observer';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

// Fix image imports to use relative paths
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image5 from './images/5.jpg';
import image6 from './images/6.jpg';
import image7 from './images/7.jpg';
import image8 from './images/8.jpg';
import image9 from './images/9.jpg';
import image10 from './images/10.jpg';
import image11 from './images/11.jpg';
import image12 from './images/12.webp';
import image13 from './images/13.jpg';
import image14 from './images/14.jpg';
import image15 from './images/15.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4',
      light: '#ff9cc9',
      dark: '#cc5490',
    },
    secondary: {
      main: '#9c27b0',
      light: '#bd4dd1',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #ff69b4, #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    h2: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h3: {
      fontWeight: 600,
      background: 'linear-gradient(45deg, #ff69b4, #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '12px 30px',
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 500,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 7px 14px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
        },
      },
    },
  },
});

// Sample memories data - replace with your actual memories
const memories = [
  {
    image: image1,
    title: "Begining",
    description: "Do you remember where we started? 😊"
  },
  {
    image: image2,
    title: "My tail",
    description: "from the first day, you were my tail, following me everywhere. 🥰"
  },
  {
    image: image3,
    title: "My best friend",
    description: "You are always my best friend. 🫂"
  },
  {
    image: image4,
    title: "Irritation only for me",
    description: "I have never been this much irritated by anyone else, but you. 😤"
  },
  {
    image: image5,
    title: "Combine study",
    description: "Remeber our gmeets, stydies and etc etc.🤣"
  },
  {
    image: image6,
    title: "Times together",
    description: "We spend most of the time together, still feels not enough. 🥺"
  },
  {
    image: image7,
    title: "Miss you doo.",
    description: "I miss you so much. Miss those times together. Our holding hands, laughing, crying, fighting, making up, and etc. 🥺"
  },
  {
    image: image8,
    title: "Our first mandhi",
    description: "We waiting for our first mandhi, it was the best. 😋"
  },
  {
    image: image9,
    title: "We at me sis's wedding",
    description: "How they made as sit both side, and we were so scared. 🤣"
  },
  {
    image: image10,
    title: "Do you remember this?",
    description: "We at LULU. Yeah fun day with little fights. 😄"
  },
  {
    image: image11,
    title: "Our first vandhe bharath trip",
    description: "Remember this? We were so excited to board on that train. we were telling every one that we travelled on that train. 😂"
  },
  {
    image: image12,
    title: "The only night we spend together",
    description: "Remember this night at amal jyothi collage. So memorable. 🙂"
  },
  {
    image: image13,
    title: "You cant forget this journey",
    description: "Uff that night, i cant remember how frightened and tensed i was 😤. But the time we spent at NIT and muttayi theruvu was nice. 🥰"
  },
  {
    image: image14,
    title: "One week at technopark",
    description: "It was one of the very good and quality time we spent together. Your head was always on my shoulder when we sit together. 🥰"
  },
  {
    image: image15,
    title: "And this...",
    description: "A chapter of friendship,love, travelling, exploring, building all ended here. But the memories will always be there. 🙂"
  },
  
  // Add more memories here
];

// Add new custom components
const GlassmorphicCard = ({ children, ...props }) => (
  <Box
    sx={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '2rem',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      ...props.sx,
    }}
  >
    {children}
  </Box>
);

function Section({ children, delay = 0, glassmorphic = false }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {glassmorphic ? (
        <GlassmorphicCard>{children}</GlassmorphicCard>
      ) : (
        children
      )}
    </motion.div>
  );
}

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [bypassKey, setBypassKey] = useState({
    ctrl: false,
    alt: false,
    b: false,
  });
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "heart"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 5,
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    }
  };

  // Bypass key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Control') {
        setBypassKey(prev => ({ ...prev, ctrl: true }));
      } else if (e.key === 'Alt') {
        setBypassKey(prev => ({ ...prev, alt: true }));
      } else if (e.key.toLowerCase() === 'b') {
        setBypassKey(prev => ({ ...prev, b: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Control') {
        setBypassKey(prev => ({ ...prev, ctrl: false }));
      } else if (e.key === 'Alt') {
        setBypassKey(prev => ({ ...prev, alt: false }));
      } else if (e.key.toLowerCase() === 'b') {
        setBypassKey(prev => ({ ...prev, b: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check for bypass combination
  useEffect(() => {
    if (bypassKey.ctrl && bypassKey.alt && bypassKey.b) {
      setIsTimeUp(true);
    }
  }, [bypassKey]);

  useEffect(() => {
    const targetDate = new Date('2025-05-07T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsTimeUp(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  const heartbeat = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.1)' });
        await next({ transform: 'scale(1)' });
      }
    },
    config: { duration: 1000 },
  });

  if (!isTimeUp) {
    return (
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ff69b4 0%, #9c27b0 100%)',
            color: 'white',
            textAlign: 'center',
            padding: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Particles
            init={particlesInit}
            options={{
              ...particlesConfig,
              particles: {
                ...particlesConfig.particles,
                links: {
                  enable: true,
                  distance: 150,
                  color: '#ffffff',
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: 'none',
                  random: true,
                  straight: false,
                  outModes: 'out',
                },
              },
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          />
          <GlassmorphicCard sx={{ zIndex: 1, maxWidth: '800px', width: '100%' }}>
            <Typography variant="h2" gutterBottom className="gradient-text">
              Coming Soon...
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                flexWrap: 'wrap',
                justifyContent: 'center',
                my: 4,
              }}
            >
              {Object.entries(timeLeft).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    textAlign: 'center',
                    minWidth: '120px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '1rem',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {value}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      fontSize: '0.9rem',
                      opacity: 0.8,
                    }}
                  >
                    {key}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                fontWeight: 300,
                letterSpacing: '1px',
                opacity: 0.9,
              }}
            >
              Until the Special Day! 🎉
            </Typography>
          </GlassmorphicCard>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.2}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}

        {/* Hero Section */}
        <Parallax
          blur={0}
          bgImage="https://source.unsplash.com/random/1920x1080?romantic"
          strength={200}
          style={{ height: '100vh' }}
          renderLayer={percentage => (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `rgba(0, 0, 0, ${0.4 + percentage * 0.2})`,
              }}
            />
          )}
        >
          <Container
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              padding: 4,
              position: 'relative',
            }}
          >
            <animated.div style={fadeIn}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Typography variant="h1" component="h1" gutterBottom>
                  🎉 Happy Birthday! 🎉
                </Typography>
              </motion.div>

              <animated.div style={heartbeat}>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  className="float"
                >
                  ❤️
                </Typography>
              </animated.div>
            </animated.div>
          </Container>
        </Parallax>

        {/* Message Section */}
        <Section glassmorphic>
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h3"
              gutterBottom
              align="center"
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  sm: '2.5rem',
                  md: '3rem'
                },
                marginBottom: {
                  xs: 2,
                  sm: 3
                }
              }}
            >
              To My Most Lovely Cutiee Achuu, Maa Boo
            </Typography>
            <Typography
              variant="body1"
              align="center"
              paragraph
              sx={{
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: 1.8,
                color: 'rgba(0, 0, 0, 0.7)',
                fontSize: {
                  xs: '0.95rem',
                  sm: '1.1rem'
                },
                padding: {
                  xs: '0 15px',
                  sm: '0 30px'
                }
              }}
            >
              We spend a long time together defining us. Loved so much. But still all of those times and love are
              feeling like not enough. Feels like it all ended quickly. But i know we will meet again. But this pain,
              emptiness its telling me that i need you with me always, and how important you are in my life.
              <br />
              Hoping our life will be together again. And all goes well.
              <br />
              Am so happy that you be with me always. You choose me. I love you so much. Really LOVE YOUR SO MUCH. And miss you vavee.
              <br />
              Happy Birthday My thakkareee.
            </Typography>
          </Container>
        </Section>

        {/* Photo Gallery */}
        <Section delay={0.2}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(156,39,176,0.1) 100%)',
              py: 8,
            }}
          >
            <Container>
              <Typography variant="h3" gutterBottom align="center">
                Our Memories Together
              </Typography>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 50,
                  modifier: 1,
                  slideShadows: false,
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
                style={{ 
                  padding: '20px 0',
                  height: 'auto',
                  maxWidth: '100%',
                }}
              >
                {memories.map((memory, index) => (
                  <SwiperSlide 
                    key={index} 
                    style={{ 
                      width: '95%',
                      maxWidth: '600px',
                      height: 'auto',
                      paddingBottom: '120px', // Increased padding to accommodate text
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                          aspectRatio: {
                            xs: '1/1',
                            sm: '4/3'
                          },
                          backgroundColor: '#000',
                          marginBottom: '20px', // Added margin below image
                        }}
                      >
                        <img
                          src={memory.image}
                          alt={memory.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          position: 'relative', // Changed from absolute to relative
                          width: {
                            xs: '95%',
                            sm: '90%'
                          },
                          margin: '0 auto', // Center the text box
                          background: 'rgba(255,255,255,0.95)',
                          backdropFilter: 'blur(10px)',
                          color: '#333',
                          padding: {
                            xs: '15px 20px',
                            sm: '20px 30px'
                          },
                          borderRadius: '12px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          textAlign: 'center',
                          zIndex: 2,
                        }}
                      >
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 600,
                            marginBottom: 1,
                            color: '#ff69b4',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            fontSize: {
                              xs: '1.2rem',  // Smaller font on mobile
                              sm: '1.5rem'
                            }
                          }}
                        >
                          {memory.title}
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{
                            lineHeight: 1.6,
                            color: '#666',
                            fontSize: {
                              xs: '0.9rem',  // Smaller font on mobile
                              sm: '1.1rem'
                            },
                            margin: 0,
                          }}
                        >
                          {memory.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Container>
          </Box>
        </Section>

        {/* Features Section
        <Section delay={0.4}>
          <Container sx={{ py: 8 }}>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <FavoriteIcon fontSize="large" />,
                  title: "Endless Love",
                  description: "Every day my love for you grows stronger"
                },
                {
                  icon: <PhotoCameraIcon fontSize="large" />,
                  title: "Beautiful Memories",
                  description: "Capturing our special moments together"
                },
                {
                  icon: <MusicNoteIcon fontSize="large" />,
                  title: "Sweet Melodies",
                  description: "The soundtrack of our love story"
                }
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <GlassmorphicCard
                      sx={{
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <IconButton
                        sx={{
                          background: 'linear-gradient(45deg, #ff69b4, #9c27b0)',
                          color: 'white',
                          p: 2,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #9c27b0, #ff69b4)',
                          },
                        }}
                      >
                        {feature.icon}
                      </IconButton>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #ff69b4, #9c27b0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(0, 0, 0, 0.7)',
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </GlassmorphicCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Section> */}

        {/* Celebration Button */}
        <Section delay={0.6}>
          <Container
            sx={{
              py: 8,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(156,39,176,0.1) 100%)',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => setShowConfetti(true)}
                sx={{
                  fontSize: '1.2rem',
                  padding: '15px 40px',
                  background: 'linear-gradient(45deg, #ff69b4, #9c27b0)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #9c27b0, #ff69b4)',
                  },
                }}
              >
                Celebrate Again! 🎊
              </Button>
            </motion.div>
          </Container>
        </Section>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App; 