import styled from "styled-components";


export const SectorComponent = styled.section`

.all-sector{
    width: 100%;
    max-width: 240px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    background-color: white;

    

    p{
        font-size: 10px;
        color: #858585;

    }

    h2{
        font-size: 15px;
    }

    h3{
        font-size: 16px;
        font-weight: 500;
    }

}

.header-sector{
    display: grid;
    grid-template-columns: 1fr 30px;
}

.p-sector{
    display: grid;
    grid-template-columns: 1fr 25px;
}


`