import { useState, useEffect } from "react";
import { Select, SelectItem } from "../../../../../../components/form/select";
import { useFetch } from "../../../../../../services/hooks/getQuery";
import { SectorCardModel } from "../../../../../../models/sector";

interface SectorSelectProps {
  onSelect: (value: string) => void;
  defaultValue?: string;
}

interface sectorDataSourceProps {
  value: string;
  label: string;
}

function SectorSelect({ onSelect, defaultValue }: SectorSelectProps) {
  const [sectorDataSource, setSectorDataSource] = useState<
    sectorDataSourceProps[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useFetch<SectorCardModel[]>("/sectors", ["sector"], {
    onSuccess: (res) => {
      if (res?.length) {
        const mappedData = res.map((e) => ({
          value: e.code as string,
          label: e.name as string,
        }));

        setSectorDataSource(mappedData);

        if (defaultValue) {
          const matchedSector = mappedData.find(
            (item) => item.label === defaultValue
          );
          if (matchedSector) {
            setSelectedValue(matchedSector.value);
          }
        }
      }
    },
  });

  useEffect(() => {
    if (defaultValue && sectorDataSource.length > 0) {
      const matchedSector = sectorDataSource.find(
        (item) => item.label === defaultValue
      );
      if (matchedSector) {
        setSelectedValue(matchedSector.value);
      }
    }
  }, [defaultValue, sectorDataSource]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Select
      label="Setor"
      value={selectedValue}
      selectStyle="secondary"
      placeholder="Selecione"
      onValueChange={handleValueChange}
    >
      {sectorDataSource.map((e) => (
        <SelectItem key={e.value} value={e.value}>
          {e.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export default SectorSelect;
