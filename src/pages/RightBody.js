import React from 'react';
import SelectComponent from '../components/SelecReact';
import EditableTable from './Table';

function RightBody(props) {
    return (
        <div>
            <SelectComponent/>
            <EditableTable/>
        </div>
    );
}

export default RightBody;