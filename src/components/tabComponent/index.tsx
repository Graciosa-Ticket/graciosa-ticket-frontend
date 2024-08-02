import { ReactNode, useEffect, useState } from "react";
import { TabContainer } from "./styles";
import ButtonComponent from "../buttons";

interface TabComponentProps {
  data: {
    title: string;
    value: string;
    content: ReactNode;
  }[];
  defaultValue?: string;
}

const TabComponent = ({ data, defaultValue }: TabComponentProps) => {
  const [tabSelected, setTabSelected] = useState<ReactNode>(data[0]?.content);

  useEffect(() => {
    const defaultTab =
      data.find((e) => e.value === defaultValue)?.content || data[0]?.content;
    setTabSelected(defaultTab);
  }, [defaultValue, data]);

  const handleChangeTab = (content: ReactNode) => {
    setTabSelected(content);
  };

  return (
    <TabContainer>
      <div className="tab-header">
        {data.map((e) => (
          <ButtonComponent
            className="button"
            buttonStyles="text"
            key={e.value}
            onClick={() => handleChangeTab(e.content)}
            title={`Alterar para ${e.title}`}
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
