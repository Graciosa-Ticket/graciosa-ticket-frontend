import { ReactNode, useState } from "react";
import { TabContainer } from "./styles";
import ButtonComponent from "../buttons";

interface tabComponentProps {
  data: {
    title: string;
    value: string;
    content: ReactNode;
  }[];
}

const TabComponent = ({ data }: tabComponentProps) => {
  const [tabSelected, setTabSelected] = useState(data[0].content);

  const handleChangeTab = (value: ReactNode) => {
    setTabSelected(value);
  };

  return (
    <TabContainer>
      <div className="tab-header">
        {data.map((e) => (
          <ButtonComponent
            buttonStyles="text"
            key={e.value}
            onClick={() => handleChangeTab(e.content)}
          >
            {e.title}
          </ButtonComponent>
        ))}
      </div>

      <div className="tab-content">{tabSelected}</div>
    </TabContainer>
  );
};

export default TabComponent;
