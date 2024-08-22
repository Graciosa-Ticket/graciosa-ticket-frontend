import { useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue as any
  );
  const [sectorDataSource, setSectorDataSource] = useState<
    sectorDataSourceProps[]
  >([]);

  useFetch<SectorCardModel[]>("/sectors", ["sector"], {
    onSuccess: (res) => {
      if (res?.length) {
        setSectorDataSource(() =>
          res.map((e) => ({
            value: e.code as string,
            label: e.name as string,
          }))
        );
      }
    },
  });

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
        <SelectItem value={e.value}>{e.label}</SelectItem>
      ))}
    </Select>
  );
}

export default SectorSelect;
