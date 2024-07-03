import styled from "styled-components";




export const TicketContainer = styled.section`

.ticketCard-div{
    width: 100%;
    max-width: 356px;
    height: 100px;
    background-color: white;
    color: #9E9E9E;
    border-radius: 15px;
    padding: 10px;

    h1{
        font-size: 16px;
        color: #012648;
    }

    p{
    font-size: 10px;

    }
}


.top-ticketCard{
    display: grid;
    grid-template-columns: 1fr 200px 1fr;
    justify-content: center;
    align-items: center;
    gap: 5px;
}


.mockup-teste{
    background-color: #AA0D0D;
    color: #FFFFFF;
    font-size: 10px;
    border-radius: 6px;
    width: 80px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

`