/* eslint-disable @typescript-eslint/no-explicit-any */
import { map } from "lodash";
import { FieldValues, UseFormGetValues } from "react-hook-form";

const getDirtyFields = <T extends FieldValues>(
  fields: FieldValues,
  getValues: UseFormGetValues<T>
) => {
  const mapFields = map(fields, (v, i: any) => {
    if (v) {
      const value = getValues(i);

      if (!!value || typeof value === "boolean") {
        return {
          [i]: value,
        };
      }
    }
  });

  return Object.assign({}, ...mapFields);
};

export default getDirtyFields;
