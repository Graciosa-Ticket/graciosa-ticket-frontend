import { AiOutlinePlus } from "react-icons/ai";
import {
  PagesHeaderButtonContainer,
  PagesHeaderContainer,
  PagesHeaderTitle,
} from "./styles";
import { ButtonProps } from "../buttons";

const PageHeaderButton = ({
  children = <AiOutlinePlus fontSize="2em" />,
  ...props
}: ButtonProps) => {
  return (
    <PagesHeaderButtonContainer
      {...{ ...props, children, buttonStyles: "text" }}
    />
  );
};

const PageHeaderComponent = {
  container: PagesHeaderContainer,
  title: PagesHeaderTitle,
  button: PageHeaderButton,
};

export default PageHeaderComponent;
