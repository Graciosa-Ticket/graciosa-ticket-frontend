import Logo from "../../../assets/graciosa_big_icon_logo.svg";
import { LoadingScreenContainer } from "./styles";

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <img src={Logo} alt="logo loading" />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
