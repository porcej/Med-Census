$(document).ready(function () {
$.fn.dataTable.ext.buttons.refresh = {
    text: 'Refresh'
  , action: function ( e, dt, node, config ) {
      dt.clear().draw();
      dt.ajax.reload();
    }
};

const editor = new DataTable.Editor({
    ajax: './api/encounters',
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
            label: 'Bib #',
            name: 'bib'
        }, {
            label: 'Discharged',
            name: 'discharged',
            type: 'checkbox',
            separator: '|',
            options: [{ label: '', value: 1}]
        }, {
            label: 'Transported',
            name: 'transported',
            type: 'checkbox',
            separator: '|',
            options: [{ label: '', value: 1}]
        }, {
            label: 'Destination Hospital',
            name: 'hospital'
        }, {
            label: 'Census Time',
            name: 'report_time'
        }
    ],
    idSrc: 'id',
    table: '#encounters-table'
});
 
const table = new DataTable('#encounters-table', {
    ajax: './api/encounters',
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
        { data: 'bib' },
        {
            data: 'discharged',
            render: function(data, type, row) { 
                console.log("Type: ", type);
                if (type === 'display') {
                    return '<input type="checkbox" class="editor-discharged">';
                }
                if (type === 'filter') {
                    return data ? 'discharged' : 'active';
                }
                if (type === 'export') {
                    return data ? 'Yes' : '';
                }
                return data;
            }, 
                // type === 'filter' ? 'discharged' : data,
            className: 'dt-body-center'
        }, {
            data: 'transported',
            render: function(data, type, row) { 
                if (type === 'display') {
                    return '<input type="checkbox" class="editor-transported">';
                }
                if (type === 'filter') {
                    return data ? 'transport' : '';
                }
                if (type === 'export') {
                    return data ? 'Yes' : '';
                }
                return data;
            },
            className: 'dt-body-center'
        },
        { 
            data: 'hospital',
            render: (data, type, row) => data == null ? '' : data
        },
        { data: 'report_time' }
    ],
    dom: 'Bfrtip',
    select: {
        style: 'os',
        selector: 'td:not(:last-child)' // no row selection on last column
    },
    rowCallback: function (row, data) {
        // Set the checked state of the checkbox in the table
        row.querySelector('input.editor-discharged').checked = data.discharged == 1;
        row.querySelector('input.editor-transported').checked = data.transported == 1;
    }
});
 
table.on('change', 'input.editor-discharged', function () {
    editor
        .edit(this.closest('tr'), false)
        .set('discharged', this.checked ? 1 : 0)
        .submit();
});

table.on('change', 'input.editor-transported', function () {
    editor
        .edit(this.closest('tr'), false)
        .set('transported', this.checked ? 1 : 0)
        .submit();
});

});