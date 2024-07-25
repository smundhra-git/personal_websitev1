import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledFactsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
  }
`;

const StyledFactsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledFact = styled.li`
  background: #4b5a6b; /* Light gray background */
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transform: scale(2.2); /* Increase size on hover */
    box-shadow: var(--box-shadow-hover);
  }

  .fact-image {
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: 20px;
    border: 2px solid #001f3f; /* Navy border */

    .img {
      border-radius: var(--border-radius);
    }
  }

  .fact-title {
    font-size: 1.5rem;
    color: #FFFFFF; /* Navy text color */
    margin-bottom: 10px;
  }

  .fact-description {
    color: #FFFFFF; /* Navy text color */
    font-size: var(--fz-lg);
  }
`;

const Facts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/FunFacts/" } }) {
        edges {
          node {
            frontmatter {
              Funfacts {
                Title
                Desc
                img {
                  childImageSharp {
                    gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                  }
                }
                url
              }
            }
          }
        }
      }
    }
  `);

  const facts = data.allMarkdownRemark.edges.flatMap(({ node }) => node.frontmatter.Funfacts);
  const revealTitle = useRef(null);
  const revealFacts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealFacts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFactsSection id="facts">
      <h2 ref={revealTitle}>Other Accomplishments</h2>

      <StyledFactsGrid>
        {facts &&
          facts.map((fact, i) => {
            const {Title, Desc, img, url } = fact;
            const image = getImage(img.childImageSharp.gatsbyImageData);

            return (
              <StyledFact key={i} ref={el => (revealFacts.current[i] = el)} onClick={() => window.open(url, '_blank')}>
                <div className="fact-image">
                  {image && <GatsbyImage image={image} alt={Title} className="img" />}
                </div>
                <h3 className="fact-title">{Title}</h3>
                <p className="fact-description">{Desc} Read more <a href = {url} target = "_blank"> here </a></p>
              </StyledFact>
            );
          })}
      </StyledFactsGrid>
    </StyledFactsSection>
  );
};

export default Facts;
