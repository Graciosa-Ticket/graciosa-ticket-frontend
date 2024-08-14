import { useState } from "react";
import { Select, SelectItem } from "../../../../../../components/form/select";

interface SectorSelectProps {
  onSelect: (value: string) => void;
  defaultValue?: string;
}

function SectorSelect({ onSelect, defaultValue }: SectorSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };
  return (
    <Select
      label="Setor"
      value={selectedValue}
      selectStyle="secondary"
      onValueChange={handleValueChange}
    >
      <SelectItem value="01 - Caixa do Bar da Sede">
        01 - Caixa do Bar da Sede
      </SelectItem>
      <SelectItem value="04 - Caixa do Vestiário do Tennis">
        04 - Caixa do Vestiário do Tennis
      </SelectItem>
      <SelectItem value="07 - Caixa da Sauna Masculina">
        07 - Caixa da Sauna Masculina
      </SelectItem>
      <SelectItem value="08 - Caixa da Secretaria do Tennis">
        08 - Caixa da Secretaria do Tennis
      </SelectItem>
      <SelectItem value="10 - Caixa da Secretaria do Golfe">
        10 - Caixa da Secretaria do Golfe
      </SelectItem>
      <SelectItem value="11 - Caixa do CPE">11 - Caixa do CPE</SelectItem>
      <SelectItem value="12 - Caixa da Secretaria Social">
        12 - Caixa da Secretaria Social
      </SelectItem>
      <SelectItem value="14 - Caixa da Tesouraria">
        14 - Caixa da Tesouraria
      </SelectItem>
      <SelectItem value="17 - Caixa do Starter">
        17 - Caixa do Starter
      </SelectItem>
      <SelectItem value="19 - Driving Range">19 - Driving Range</SelectItem>
      <SelectItem value="20 - Caixa da Boutique do Golfe">
        20 - Caixa da Boutique do Golfe
      </SelectItem>
      <SelectItem value="28 - Caixa do Clubinho da Crianca">
        28 - Caixa do Clubinho da Crianca
      </SelectItem>
      <SelectItem value="29 - Caixa do Graciosa Store">
        29 - Caixa do Graciosa Store
      </SelectItem>
      <SelectItem value="30 - Caixa do SPA Graciosa">
        30 - Caixa do SPA Graciosa
      </SelectItem>
      <SelectItem value="46 - Caixa do Lava Car">
        46 - Caixa do Lava Car
      </SelectItem>
      <SelectItem value="64 - Restaurante do Golfe Marzia Lorenzetti">
        64 - Restaurante do Golfe Marzia Lorenzetti
      </SelectItem>
      <SelectItem value="65 - Bar da Piscina Tênis Marzia Lorenzetti">
        65 - Bar da Piscina Tênis Marzia Lorenzetti
      </SelectItem>
      <SelectItem value="71 - Caixa Loja Scott Fit">
        71 - Caixa Loja Scott Fit
      </SelectItem>
      <SelectItem value="74 - Caixa Sauna Feminina">
        74 - Caixa Sauna Feminina
      </SelectItem>
      <SelectItem value="75 - Caixa Bar do Ravi">
        75 - Caixa Bar do Ravi
      </SelectItem>
      <SelectItem value="92 - Caixa do Bar do Golfe - 2022 - Marzea Lorenzetti">
        92 - Caixa do Bar do Golfe - 2022 - Marzea Lorenzetti
      </SelectItem>
      <SelectItem value="98 - Caixa Bar da Sede - Edson Vianna">
        98 - Caixa Bar da Sede - Edson Vianna
      </SelectItem>
      <SelectItem value="131 - Caixa da Biblioteca">
        131 - Caixa da Biblioteca
      </SelectItem>
      <SelectItem value="164 - Caixa Bar do Tênis - Hermes">
        164 - Caixa Bar do Tênis - Hermes
      </SelectItem>
      <SelectItem value="230 - Caixa da Biblioteca - Cultural">
        230 - Caixa da Biblioteca - Cultural
      </SelectItem>
      <SelectItem value="263 - Caixa da Lavanderia (5aSec)">
        263 - Caixa da Lavanderia (5aSec)
      </SelectItem>
      <SelectItem value="Administrador">Administrador</SelectItem>
    </Select>
  );
}

export default SectorSelect;
