import { ReactNode, useEffect, useState } from "react";
import { TabContainer } from "./styles";
import ButtonComponent from "../buttons";

type tabData = {
  title: string;
  value: string;
  content: ReactNode;
};

interface TabComponentProps {
  data: tabData[];
  defaultValue?: string;
}

const TabComponent = ({ data, defaultValue }: TabComponentProps) => {
  const [tabSelected, setTabSelected] = useState<tabData>(data[0]);

  useEffect(() => {
    const defaultTab = data.find((e) => e.value === defaultValue) || data[0];

    setTabSelected(defaultTab);
  }, [defaultValue, data]);

  const handleChangeTab = (data: tabData) => {
    setTabSelected(data);
  };

  return (
    <TabContainer>
      <div className="tab-header">
        {data.map((e) => (
          <ButtonComponent
            className={
              tabSelected.value === e.value
                ? "tab-button active-tab"
                : "tab-button"
            }
            buttonStyles="text"
            key={e.value}
            onClick={() => handleChangeTab(e)}
            title={`Alterar para ${e.title}`}
          >
            {e.title}
          </ButtonComponent>
        ))}
      </div>

      <div className="tab-content">{tabSelected?.content}</div>
    </TabContainer>
  );
};

export default TabComponent;
