/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      backgroundImage:{
        'ribbon' : 'linear-gradient(270deg, #6A9A62, #4F7942 50%, #4F7942 51%,  #3B5F31 85%, #3fb648 90%, #003404 100% )',
        'blue-ribbon' : ' linear-gradient(270deg, rgba(96,165,250,1) 0%, rgba(91,160,249,1) 22%, rgba(91,160,249,1) 31%, rgba(83,149,245,1) 54%, rgba(59,117,232,1) 67%, rgba(44,98,224,1) 75%, rgba(44,98,224,1) 83%, rgba(59,130,246,1) 90%, rgba(30,64,175,1) 100%)',
      },
      aspectRatio: {
        'recipe-card': '9/16' 
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
  
        "primary": "#15803d", //like
       
        "secondary": "#453226", //like
       
        "accent": "#fda4af", //like
       
        "neutral": "#10b981", //probably like
       
        "base-100": "#F5E8D6", //like
       
        "info": "#0082d0", //like
       
        "success": "#00d985", //like
       
        "warning": "#ffa800", //like
       
        "error": "#be123c", //like
        }
      },{
        forest: {
          ...require("daisyui/src/theming/themes")["forest"],
          "base-100": "281c14",
          
        }
      },
  
      
  
    ], 
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

};
