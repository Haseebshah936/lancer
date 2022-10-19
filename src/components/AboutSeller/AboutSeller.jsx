import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import SkillInfoComponent from "../SkillInfoComponent";

function AboutSeller({
  skills = ["PWA", "MERN", "ReactNative", "Firebase", "WebRTC"],
  educationalBackground = [
    {
      degree: "BSCS",
      institute: "FAST",
      starting: "Dec, 2018",
      ending: "Feb, 2022",
    },
    {
      degree: "FSC",
      institute: "Govt. High School",
      starting: "Nov, 2016",
      ending: "Sep, 2018",
    },
    {
      degree: "Matric",
      institute: "Govt. High School",
      starting: "Sep, 2014",
      ending: "Oct, 2016",
    },
  ],
  experence = [
    {
      title: "MERN Developer",
      company: "Freelancer",
      starting: "2021",
      ending: "Present",
    },
    {
      title: "React Native Developer",
      company: "Freelancer",
      starting: "2020",
      ending: "2021",
    },
    {
      title: "WebRTC Developer",
      company: "Freelancer",
      starting: "2019",
      ending: "2020",
    },
  ],
  achievements = [
    {
      title: "Top 10% of the world",
      description: "I am in top 10% of the world in MERN stack development.",
      starting: "Dec, 2021",
      ending: "Present",
    },
    {
      title: "Won 1st prize in SOFTEC",
      description: "I won 1st prize in SOFTEC 2022 in mobile development.",
      starting: "Mar, 2022",
    },
  ],
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
      {experence.map((exp, index) => (
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
