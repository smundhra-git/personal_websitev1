import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;
    padding-top: var(--nav-height);
    margin-top: 100px;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 768px) {
      align-items: center;
    }

    h1 {
      margin: 0 0 30px 4px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
      font-weight: 400;

      @media (max-width: 480px) {
        margin: 0 0 20px 2px;
      }
    }

    h3 {
      margin-top: 5px;
      color: var(--slate);
      line-height: 0.9;
    }

    p {
      margin: 20px 0 0;
      max-width: 540px;
    }

    .email-links {
      display: flex;
      gap: 20px; /* Adjust the space between the links */
      margin-top: 50px;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px; /* Adjust the space between the links for small screens */
      }
    }

    .email-link {
      ${({ theme }) => theme.mixins.bigButton};
    }
  }

  .image {
    display: flex;
    justify-content: center;
    flex: 0 0 300px;
    margin-left: 30px;

    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 50px;
      flex: 1 0 70%;
    }

    .wrapper {
      ${({ theme }) => theme.mixins.boxShadow};
      position: relative;
      width: 100%;
      border-radius: var(--border-radius);
      background-color: var(--white);

      .img {
        border-radius: var(--border-radius);
      }

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
      }

      &:before {
        top: 0;
        left: 0;
        background-color: var(--navy);
      }

      &:after {
        border: 2px solid var(--green);
        top: 14px;
        left: 14px;
        z-index: -1;
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Shlok Mundhra.</h2>;
  const three = <h3 className="big-heading">I build software.</h3>;
  const four = (
    <p>
      I specialize in building software and web applications, and I am looking for opportunities to
      expand my career. Currently, I have developed an interest in Algorithm Designing,
      spending hours learning and solving on Leetcode.
    </p>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:shlokmundhra1111@gmail.com"
      target="_blank"
      rel="noreferrer">
      Reach out!
    </a>
  );
  const six = (
    <a className="email-link" href="#projects" target="_self" rel="noreferrer">
      Check out my work!
    </a>
  );
  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      <div className="content">
        {prefersReducedMotion ? (
          <>
            {items.slice(0, 4).map((item, i) => (
              <div key={i}>{item}</div>
            ))}
            <div className="email-links">
              {items.slice(4).map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.slice(0, 4).map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
            {isMounted && (
              <div className="email-links">
                {items.slice(4).map((item, i) => (
                  <CSSTransition key={i + 4} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 5}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
              </div>
            )}
          </TransitionGroup>
        )}
      </div>
      <div className="image">
        <div className="wrapper">
          <StaticImage
            className="img"
            src="../../images/me.jpg"
            width={500}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Headshot"
          />
        </div>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
