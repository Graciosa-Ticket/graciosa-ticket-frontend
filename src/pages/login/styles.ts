









import styled from "styled-components";


export const LoginContainer = styled.section`


.section-login{
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 200px;
    width: 100%;
    height: 940px;



   
}



.login-left{
    background-image: linear-gradient(#0054A4, #280741 ) ;
    width: 100%;
    max-width: 612px;
    height: 100%;
    max-height: 785px;
    color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 120px 0 0 80px;

    h1{
     font-weight: 700;
     font-size: 35px;
     width: 450px;
    }

    p{
        width: 300px;
        font-weight: 400;
        font-size: 12px;
    }
}



.login-right{
    
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     color: #012648;
     gap: 50px;



     img{
        width: 74px;
     }

     h1{
        font-size: 36px;
        font-weight: 700;
     }


}

.top-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.div-login-ib{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.div-login-ib p{
    font-size: 11px;
}





`













