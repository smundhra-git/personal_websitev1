module.exports = {
  email: 'shlokmundhra1111@gmail.com',

  socialMedia: [
    {
      name: 'Email',
      url: 'mailto:shlokmundhra1111@gmail.com'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/smundhra-git',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mundhra_shlok',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/ShlokMundhra2',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/shlok-mundhra/',
    }
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Skills',
      url : '/#skills',
    },
    {
      name: 'Accomplishments',
      url :'/#facts',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
