import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SellerProfileInfo from '../../components/SellerProfileInfo';
import { miniTablet } from '../../responsive';
import colors from '../../utils/colors';
import SellerProfileTabs from './SellerProfileTabs';

function index(props) {
    return (
        <>
        <Header />
        <Container>
                <SellerProfileInfo style={{minWidth: "30rem", maxHeight: "30vh", flex: .25}}/>
                <SellerProfileTabs style={{minWidth: "30rem", flex: .7}}/>
        </Container>
        <Footer />
        </>
    );
}

export default index;

const Container = styled.div`
    display: flex;
    padding-inline: 7%;
    margin-top: 3rem;
    justify-content: space-between;
    ${miniTablet({
        flexDirection: "column",
    })}
`