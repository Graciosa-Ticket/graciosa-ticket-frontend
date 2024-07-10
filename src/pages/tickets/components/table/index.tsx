import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { TableContainer } from "./styles";
import { CSSProperties } from "react";
import { TypeRowProps } from "@inovua/reactdatagrid-community/types";

interface tableProps {
  columns: any[];
  dataSource: any[];
  style?: CSSProperties | any;
  onRowDoubleClick?: (event: MouseEvent, rowProps: TypeRowProps) => void;
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
          minHeight: props.dataSource.length * 40 + 40,
        }}
        {...props}
      />
    </TableContainer>
  );
};

export default TableComponent;
