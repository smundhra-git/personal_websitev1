import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import bgImage from '../images/bg2.webp';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-size: cover;
  background-attachment: fixed; /* Ensures the image stays fixed */
  background-position: center;
  position: relative;
  z-index: 1;
  // color: white; /* Set the default text color to white */

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bgImage}) no-repeat center center fixed;
    opacity: 0.2; /* Adjust the opacity of the image as needed */
    z-index: -2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Optional: Add a dark overlay to improve readability */
    z-index: -1;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-size: cover;
    background-attachment: fixed; /* Ensures the image stays fixed */
    background-position: center;
    position: relative;
    z-index: 1;
    // color: white; /* Set the default text color to white */
    &:before {
      content: ' ';
      background: url(${bgImage}) no-repeat center center cover;
      opacity: 0.2;
      z-index: -2;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5); /* Optional: Add a dark overlay to improve readability */
      z-index: -1;
    }
  }

  /* Ensure all text elements inherit the white color */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a {
    color: white;
  }
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
