import { Check } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

function PackageOfferings({active=false, text}) {
    return (
       <Offering>
        <Check color={active ? "success" : "disabled"}/>
        &nbsp;&nbsp;{text}
       </Offering>
    );
}

export default PackageOfferings;

const Offering = styled.p`
    font-size: 1.2rem;
`