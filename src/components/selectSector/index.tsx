import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { SectorCardModel } from "../../models/sector";
import ButtonComponent from "../buttons";
import { PopOverRoot } from "../popOver";
import SearchSector from "./searchSector";
import {
  SelectSectorContainer,
  SelectSectorContainerPlaceholder,
} from "./styles";

interface SelectSectorProps {
  label?: string;
  title: string;
  onChange(data: SectorCardModel | undefined): void;
  showRemoveButton?: boolean;
}

const SelectSector = ({
  label,
  title,
  onChange,
  showRemoveButton = true,
}: SelectSectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<
    SectorCardModel | undefined
  >(undefined);

  const handleSelectSector = (data: SectorCardModel) => {
    setSelectedSector(data);
    onChange(data);
    setOpen(false);
  };

  const handleClearSelect = () => {
    setSelectedSector(undefined);
    onChange(undefined);
    setOpen(false);
  };

  return (
    <SelectSectorContainer title={title}>
      {label && <label>{label}</label>}

      <PopOverRoot
        open={open}
        onOpenChange={() => setOpen(!open)}
        contentProps={{
          style: {
            animation: "unset",
            marginBottom: "2em",
          },
        }}
        trigger={
          <div className="add-sector-button-container">
            <button
              type="button"
              className="add-sector-button"
              onClick={() => setOpen(!open)}
            >
              {selectedSector ? (
                <SelectedSectorContainer data={selectedSector} />
              ) : (
                <span>{title}</span>
              )}
            </button>

            {selectedSector && showRemoveButton && (
              <ButtonComponent buttonStyles="text" onClick={handleClearSelect}>
                <FaXmark />
              </ButtonComponent>
            )}
          </div>
        }
      >
        <SearchSector
          onChange={handleSelectSector}
          selectedSector={selectedSector}
        />
      </PopOverRoot>
    </SelectSectorContainer>
  );
};

interface SelectedSectorContainerProps {
  data: SectorCardModel;
}

const SelectedSectorContainer = ({ data }: SelectedSectorContainerProps) => {
  return (
    <SelectSectorContainerPlaceholder>
      <span className="selected-sector-span">{data.name}</span>
    </SelectSectorContainerPlaceholder>
  );
};

export default SelectSector;
