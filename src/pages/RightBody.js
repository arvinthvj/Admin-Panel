import React from 'react';
import SelectComponent from '../components/SelecReact';
import EditableTable from './Table';
import TableNew from './TableNew';

function RightBody(props) {
    return (
        <div>
            <SelectComponent/>
            {/* <EditableTable/> */}
            <TableNew/>
        </div>
    );
}

export default RightBody;