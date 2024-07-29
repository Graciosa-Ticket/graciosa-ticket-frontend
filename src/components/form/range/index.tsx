import {
  RangeRoot,
  RangeTrack,
  RangeRange,
  RangeThumb,
  Container,
} from "./styles";

interface SelectProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  onChange?(value: number[]): void;
  value?: number[];
}

const RangeComponent = ({
  min = 0,
  max = 3,
  step = 0.001,
  defaultValue,
  value,
  onChange,
}: SelectProps) => {
  return (
    <Container>
      <RangeRoot
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        style={{ zIndex: 2 }}
        onValueChange={onChange}
      >
        <RangeTrack>
          <RangeRange />
        </RangeTrack>
        <RangeThumb />
      </RangeRoot>
    </Container>
  );
};

export default RangeComponent;
