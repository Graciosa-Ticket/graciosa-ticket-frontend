import styled from "styled-components";



export const MenuHeaderHome = styled.section`

.menu{
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

}

ul{
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 60px;
    max-width: 710px;
    font-size: 13px;
    list-style: none;
    height: 50px;
    border-radius:15px ;
    background-color: white;

    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);

}

a  {
    text-decoration: none;
    background-color: #0054A4;
    color: white;

    padding: 10px;
    border-radius: 8px;
}

.menu img{
    width: 36px;
}

.new-ticket-btn{
    background-color: #0054A4;
    width: 120px;
    height: 33px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 13px 5.5px -12px rgba(0, 0, 0, 0.08);
    color: white;
    font-size: 13px;
    font-weight: 400;

}

.menu-right-img{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #535353;
}
`