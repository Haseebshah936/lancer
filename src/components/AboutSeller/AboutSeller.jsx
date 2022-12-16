import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import SkillInfoComponent from "../SkillInfoComponent";

function AboutSeller({
  skills = [],
  educationalBackground = [],
  experience = [],
  achievements = [],
}) {
  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      justifyContent="center"
    >
      <SubHeading>Skills</SubHeading>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"}>
        {skills.map((skill, index) => (
          <Box
            p={".5rem 1rem"}
            border={`1px solid ${colors.lightGrey}`}
            borderRadius={"8%"}
            fontSize={"0.8rem"}
            color={colors.gray}
            component={"p"}
            key={index}
            maxWidth="50rem"
          >
            {skill}
          </Box>
        ))}
      </Box>
      <SubHeading>Experence</SubHeading>
      {experience.map((exp, index) => (
        <SkillInfoComponent
          key={index}
          title={exp.title}
          description={exp.company}
          starting={exp.starting}
          ending={exp.ending}
        />
      ))}
      <SubHeading>Qualification</SubHeading>
      {educationalBackground.map((education, index) => (
        <SkillInfoComponent
          key={index}
          title={education.degree}
          description={education.institute}
          starting={education.starting}
          ending={education.ending}
        />
      ))}
      <SubHeading>Achievements</SubHeading>
      {achievements.map((achievement, index) => (
        <SkillInfoComponent
          key={index}
          title={achievement.title}
          description={achievement.description}
          starting={achievement?.starting}
          ending={achievement?.ending}
        />
      ))}
    </Box>
  );
}

export default AboutSeller;
const SubHeading = styled.h2`
  font-weight: 600;
  font-size: 1.3rem;
  margin-block: 1rem;
`;
