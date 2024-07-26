import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Concepts, FrameWork, Lang, Tools } from '@components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledSkillsSection = styled.section`
  flex-direction: column;
  align-items: flex-start; /* Align items to the start */
  padding: 0px 0;
  margin-botton :0;
 

  h1 {
    font-size: clamp(50px, 6vw, 50px);
    font-weight: bold;
    color: var(--lightest-slate);
  }
`;

const Skills = () => {
  const revealTitle = useRef(null);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
  }, []);

  return (
    <>
           <section id="jobs">
      <StyledSkillsSection>
          <h2 className="numbered-heading" ref={revealTitle}>
            Some Skills I’ve Learned
          </h2>
      </StyledSkillsSection>
      <Lang />
      <FrameWork />
      <Tools />
      <Concepts />
      </section>
    </>
  );
};

export default Skills;
