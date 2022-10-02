import { Language } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import colors from '../utils/colors';

function DetailsCard({heading="25 COMSATS LAHORE", subheading="Official Address", Icon=null, backgroundColor={
    background: "rgb(2,173,212)",
    background: "linear-gradient(27deg, rgba(2,173,212,1) 34%, rgba(0,216,216,1) 100%)",
}}) {
    return (
        <Container>
            <Heading>{heading}</Heading>
            <Wrapper>
                <Avatar sx={backgroundColor}>
                    {Icon && Icon}
                </Avatar>
            <SubHeading>{subheading}</SubHeading>
            </Wrapper>
        </Container>
    );
}

export default DetailsCard;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    border-radius: 5%;
    height: 15rem;
    width: 25rem;
    box-shadow: .5px 0.5px 8px 1px rgba(0,0,0,0.1);
    -webkit-box-shadow: .5px 0.5px 8px 1px rgba(0,0,0,0.1);
    margin: 1rem;
    
`
const Heading = styled.h3`
    font-size: 1.5rem;
    color: ${colors.black};
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
`
const SubHeading = styled.h4`
    font-size: 1.2rem;
    margin-left: 1rem;
    color: ${colors.gray};
`