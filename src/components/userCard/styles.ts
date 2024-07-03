import styled from "styled-components";

export const UserComponent = styled.section`

.all-sector{
    width: 100%;
    max-width: 240px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    background-color: white;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
    

    p {
    font-size: 10px;
    color: #858585;
    text-align: center;
}


    h2{
        font-size: 15px;
        text-align: center;
        color: #0054a4;
    }

    h3{
        font-size: 10px;
        color: #858585;
        text-align: right;
    }

}

.header-sector{
    display: flex;
    justify-content: center;
    align-items: center;
}

.p-sector{
    display: grid;
    grid-template-columns: 1fr 25px;
    justify-content: center; /* Centraliza a imagem horizontalmente */
    align-items: center; /* Centraliza a imagem verticalmente */}

.user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover; 
    border-radius: 50%;
  }
    
`