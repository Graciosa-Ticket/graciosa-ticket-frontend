import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { TableContainer } from "./styles";
import { CSSProperties } from "react";
import { TypeCellProps } from "@inovua/reactdatagrid-community/types";

interface tableProps {
  columns: any[];
  dataSource: any[];
  style?: CSSProperties | any;
  idProperty?: string;
  onCellDoubleClick?: (event: MouseEvent, rowProps: TypeCellProps) => void;
}
export const TableComponent = ({ ...props }: tableProps) => {
  return (
    <TableContainer>
      <ReactDataGrid
        showZebraRows={false}
        showColumnMenuTool={false}
        rowHeight={40}
        headerHeight={30}
        style={{
          height: props.dataSource.length * 40 + 40,
          maxHeight: "100%",
        }}
        {...props}
      />
    </TableContainer>
  );
};

export default TableComponent;
