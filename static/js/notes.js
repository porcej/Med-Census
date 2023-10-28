$(document).ready(function () {
$.fn.dataTable.ext.buttons.refresh = {
    text: 'Refresh'
  , action: function ( e, dt, node, config ) {
      dt.clear().draw();
      dt.ajax.reload();
    }
};

const editor = new DataTable.Editor({
    ajax: './api/notes',
    fields: [
        {
            label: 'Aid Station',
            name: 'aid_station',
            type: 'select', 
            options: [
                { label:'Aid Station 1', value: 'AS1' },
                { label:'Aid Station 2', value: 'AS2' },
                { label:'Aid Station 3', value: 'AS3' },
                { label:'Aid Station 4/6', value: 'AS46' },
                { label:'Aid Station 5', value: 'AS5' },
                { label:'Aid Station 7', value: 'AS7' },
                { label:'Aid Station 8', value: 'AS8' },
                { label:'Aid Station 9', value: 'AS9' },
                { label:'Aid Station 10', value: 'AS10' },
                { label:'Med Alpha', value: 'mA' },
                { label:'Med Bravo', value: 'mB' },
                { label:'Med Charlie', value: 'mC' },
                { label:'Med Delta', value: 'mD' },
                { label:'Med Echo', value: 'mE' }
            ]
        }, {
            label: 'Notes',
            name: 'note'
        }, {
            label: 'Census Time',
            name: 'report_time'
        }
    ],
    idSrc: 'id',
    table: '#notes-table'
});
 
const table = new DataTable('#notes-table', {
    ajax: './api/notes',
    buttons: [
        { extend: 'create', editor },
        { extend: 'edit', editor },
        { extend: 'remove', editor },
        { extend: 'refresh' },
        {
            extend: 'collection',
            text: 'Export',
            buttons: [
                {
                    extend: 'copy',
                    exportOptions: {
                        orthogonal: 'export'
                    }
                },
                {
                    extend: 'csv',
                    exportOptions: {
                        orthogonal: 'export'
                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        orthogonal: 'export'
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                        orthogonal: 'export'
                    }
                }
            ]
        }
    ],
    columns: [
        { data: 'aid_station' },
        { data: 'note' },
        { data: 'report_time' }
    ],
    dom: 'Bfrtip',
    select: {
        style: 'os',
        selector: 'td:not(:last-child)' // no row selection on last column
    }
});
});