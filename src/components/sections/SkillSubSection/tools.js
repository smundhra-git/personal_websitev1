import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  h1 {
    font-size: clamp(32px, 6vw, 48px);
    font-weight: bold;
    color: var(--lightest-slate);
    margin-bottom: 50px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    width: 100%;
  }

  .skill {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--light-navy);
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
    }

    .skill-top {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .skill-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--dark-navy);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }

      .skill-name {
        font-size: var(--fz-lg);
        color: var(--lightest-slate);
      }
    }

    .skill-description {
      font-size: var(--fz-sm);
      color: var(--light-slate);
      margin-bottom: 10px;
    }

    .skill-level {
      width: 100%;
      background-color: var(--dark-navy);
      border-radius: var(--border-radius);
      overflow: hidden;
      height: 10px;
      position: relative;

      .level-bar {
        height: 100%;
        background: linear-gradient(to right, var(--green), var(--blue));
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
`;

const Skills = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/content/Skills/tools.md/" }) {
        frontmatter {
          skills {
            skillName
            skillLevel
            logo {
              childImageSharp {
                gatsbyImageData(width: 50, height: 50, layout: FIXED, placeholder: BLURRED)
              }
            }
            description
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = data?.markdownRemark?.frontmatter?.skills || [];

  // Sort skills by skillLevel in descending order
  const sortedSkills = [...skills].sort((a, b) => b.skillLevel - a.skillLevel);

  const getSkillLevelWidth = (level) => `${level * 20}%`;

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2>Tools</h2>
      <div className="skills-grid">
        {sortedSkills.map((skill, i) => (
          <div className="skill" key={i}>
            <div className="skill-top">
              <div className="skill-logo">
                <GatsbyImage image={getImage(skill.logo)} alt={`${skill.skillName} logo`} />
              </div>
              <div className="skill-name">{skill.skillName}</div>
            </div>
            <div className="skill-description">{skill.description}</div>
            <div className="skill-level">
              <div className="level-bar" style={{ width: getSkillLevelWidth(skill.skillLevel) }} />
            </div>
          </div>
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
