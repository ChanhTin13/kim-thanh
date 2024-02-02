var dataChucNangHienCo = [];
var dataChucNangDuocChon = [];

$.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
    return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {

        return $('input', td).prop('checked') ? '1' : '0';
    });
}

$('#table-phan-quyen-chuc-nang-hien-co thead tr').clone(true).appendTo('#table-phan-quyen-chuc-nang-hien-co thead');
$('#table-phan-quyen-chuc-nang-hien-co thead tr:eq(1) th').each(function (i) {
    var title = $(this).text();
    if (i == 0 || i == 4) {
        return;
    }
    else {
        $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phan-quyen-chuc-nang-hien-co="' + i + '"/>');
    }

    $('input[type="text"]', this).on('keyup change', function () {
        if (tb_ChucNangHienCo.column(i).search() !== this.value) {
            tb_ChucNangHienCo
                .column(i)
                .search(this.value)
                .draw();
        }
    });
});

var tb_ChucNangHienCo = $('#table-phan-quyen-chuc-nang-hien-co').DataTable({
    data: dataChucNangHienCo,
    columns: [
        {
            "data": null,
        },
        {
            "data": "FUNCTIONID"
        },
        {
            "data": "FUNCTIONNAME"
        },
        {
            "data": "FUNCTIONNAMEVN"
        },
        {
            "data": "RIGHTCHECK",
            sortable: true,
            orderDataType: "dom-checkbox",
            render: function (data, type, row) {
                return `<input type="checkbox"  data-index=" " name="cb-phanquyen-uncheck"  >`;
            }
        }
    ],
    fnCreatedRow: function (nRow, data, iDataIndex) {
        $(nRow).attr('data-id', data.FUNCTIONID);
        $($(nRow).children()[0]).html(iDataIndex + 1);
    },
    scrollResize: true,
    scrollX: true,
    scrollY: 100,
    bInfo: false,
    paging: false,
    searching: true,
    "dom": 'lrtip',
    orderCellsTop: true
});

$('#table-phan-quyen-chuc-nang-duoc-chon thead tr').clone(true).appendTo('#table-phan-quyen-chuc-nang-duoc-chon thead');
$('#table-phan-quyen-chuc-nang-duoc-chon thead tr:eq(1) th').each(function (i) {
    var title = $(this).text();
    if (i == 0 || i == 4) {
        return;
    }
    else {
        $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phan-quyen-chuc-nang-duoc-chon="' + i + '"/>');
    }

    $('input', this).on('keyup change', function () {
        if (tb_ChucNangDuocChon.column(i).search() !== this.value) {
            tb_ChucNangDuocChon
                .column(i)
                .search(this.value)
                .draw();
        }
    });
});

var tb_ChucNangDuocChon = $('#table-phan-quyen-chuc-nang-duoc-chon').DataTable({
    data: dataChucNangDuocChon,
    columns: [
        {
            "data": null
        },
        {
            "data": "FUNCTIONID"
        },
        {
            "data": "FUNCTIONNAME"
        },
        {
            "data": "FUNCTIONNAMEVN"
        },
        {
            "data": "RIGHTCHECK",
            sortable: true,
            orderDataType: "dom-checkbox",
            render: function (data, type, row) {
                return `<input type="checkbox"  data-index=" " name="cb-phanquyen-checked" >`;
            }
        }
    ],
    fnCreatedRow: function (nRow, data, iDataIndex) {
        $(nRow).attr('data-id', data.FUNCTIONID);
        $($(nRow).children()[0]).html(iDataIndex + 1);
        if (data.IsDisabled != undefined) {
            if (data.IsDisabled == true) {
                $(nRow).addClass('disabled');
            }
        }
    },
    scrollResize: true,
    scrollY: 100, scrollX: true,
    bInfo: false,
    paging: false,
    searching: true,
    "dom": 'lrtip',
    orderCellsTop: true
});
function LoadFunctionAvaiableByUserGroup(userGroupId) {
    $.ajax({
        async: false,
        type: 'GET',
        url: '/HeThong/LoadFunctionAvaiableByUserGroup?userGroupId=' + userGroupId + '',
        dataType: 'json',
        success: function (msg) {
            dataChucNangHienCo = msg.data;
            dataChucNangHienCo = dataChucNangHienCo.filter(({ FUNCTIONID: id1 }) => !dataUserGroupRight.some(({ FUNCTIONID: id2 }) => id2 === id1));
            tb_ChucNangHienCo.clear().draw();
            tb_ChucNangHienCo.rows.add(dataChucNangHienCo);// Add new data
        },
        error: function (error) {
            console.log('e');
        }
    });
}

$('.phan-quyen-them').click(function () {
    LoadFunctionAvaiableByUserGroup($('#ddl-user-group').val());
    dataChucNangDuocChon = [...dataUserGroupRight]; 
    tb_ChucNangDuocChon.clear().draw();
    tb_ChucNangDuocChon.rows.add(dataChucNangDuocChon); // Add new data    
    $('#chuc-nang').modal();
});

$('.modal').on('shown.bs.modal', function () {
    tb_ChucNangHienCo.columns.adjust().draw();
    tb_ChucNangDuocChon.columns.adjust().draw();
});
$(document).on('click', '#table-phan-quyen-chuc-nang-duoc-chon tr', function () {
    $(this).addClass('selected');
    $('#table-phan-quyen-chuc-nang-duoc-chon tr').not(this).removeClass('selected');
});
$(document).on('click', '#table-phan-quyen-chuc-nang-hien-co tr', function () {
    $(this).addClass('selected');
    $('#table-phan-quyen-chuc-nang-hien-co tr').not(this).removeClass('selected');
});
$(document).on('dblclick', '#table-phan-quyen-chuc-nang-duoc-chon tr', function () {
    $(this).addClass('selected');
    $('#table-phan-quyen-chuc-nang-duoc-chon tr').not(this).removeClass('selected');
    $(this).find('input[name="cb-phanquyen-checked"]').click();
});
$(document).on('dblclick', '#table-phan-quyen-chuc-nang-hien-co tr', function () {
    $(this).addClass('selected');
    $('#table-phan-quyen-chuc-nang-hien-co tr').not(this).removeClass('selected');
    $(this).find('input[name="cb-phanquyen-uncheck"]').click();
});
$('.btn-turn-right').click(function () {

    let ok = false;
    $('#table-phan-quyen-chuc-nang-hien-co tr').each(function (index, tr) {
        let $thistr = tr;
        let functionID = $($thistr).attr('data-id');
        if (($($thistr).hasClass('selected') || $($thistr).find('input[name="cb-phanquyen-uncheck"]').prop('checked') == true)) {
            let data = dataChucNangHienCo.find(n => n.FUNCTIONID == functionID);
            if (data != undefined) {
                dataChucNangDuocChon.push(data);
                dataChucNangHienCo = dataChucNangHienCo.filter(n => n.FUNCTIONID != functionID);
            }
        }
    });
    ok = true;
    if (ok == true) {
        tb_ChucNangDuocChon.clear().draw();
        tb_ChucNangDuocChon.rows.add(dataChucNangDuocChon); // Add new data    
        tb_ChucNangDuocChon.columns.adjust().draw();
        tb_ChucNangHienCo.clear().draw();
        tb_ChucNangHienCo.rows.add(dataChucNangHienCo); // Add new data    
        tb_ChucNangHienCo.columns.adjust().draw();

    }

});
$('.btn-turn-right-all').click(function () {
    let ok = false;
    $('#table-phan-quyen-chuc-nang-hien-co tr').each(function (index, tr) {
        let $thistr = tr;
        let functionID = $($thistr).attr('data-id');
        let data = dataChucNangHienCo.find(n => n.FUNCTIONID == functionID);
        if (data != undefined) {
            dataChucNangDuocChon.push(data);
            dataChucNangHienCo = dataChucNangHienCo.filter(n => n.FUNCTIONID != functionID);
        }
    });
    ok = true;
    if (ok == true) {


        tb_ChucNangDuocChon.clear().draw();
        tb_ChucNangDuocChon.rows.add(dataChucNangDuocChon); // Add new data    
        tb_ChucNangDuocChon.columns.adjust().draw();

        tb_ChucNangHienCo.clear().draw();
        tb_ChucNangHienCo.rows.add(dataChucNangHienCo); // Add new data    
        tb_ChucNangHienCo.columns.adjust().draw();

    }

});
$('.btn-turn-left').click(function () {
    let ok = false;
    $('#table-phan-quyen-chuc-nang-duoc-chon tr').each(function (index, tr) {
        let $thistr = tr;
        let functionID = $($thistr).attr('data-id');
        if (($($thistr).hasClass('selected') || $($thistr).find('input[name="cb-phanquyen-checked"]').prop('checked') == true) && $($thistr).hasClass('disabled') != true) {
            let data = dataChucNangDuocChon.find(n => n.FUNCTIONID == functionID);
            if (data != undefined) {
                dataChucNangHienCo.push(data);
                dataChucNangDuocChon = dataChucNangDuocChon.filter(n => n.FUNCTIONID != functionID);
            }
        }
    });
    ok = true;
    if (ok == true) {
        tb_ChucNangHienCo.clear().draw();
        tb_ChucNangHienCo.rows.add(dataChucNangHienCo); // Add new data    
        tb_ChucNangHienCo.columns.adjust().draw();

        tb_ChucNangDuocChon.clear().draw();
        tb_ChucNangDuocChon.rows.add(dataChucNangDuocChon); // Add new data    
        tb_ChucNangDuocChon.columns.adjust().draw();
    }

});
$('.btn-turn-left-all').click(function () {
    let ok = false;

    $('#table-phan-quyen-chuc-nang-duoc-chon tr').each(function (index, tr) {
        let $thistr = tr;
        let functionID = $($thistr).attr('data-id');
        if ($($thistr).hasClass('disabled') != true) {
            let data = dataChucNangDuocChon.find(n => n.FUNCTIONID == functionID);
            if (data != undefined) {
                dataChucNangHienCo.push(data);
                dataChucNangDuocChon = dataChucNangDuocChon.filter(n => n.FUNCTIONID != functionID);
            }
        }
    });
    ok = true;
    if (ok == true) {
        tb_ChucNangHienCo.clear().draw();
        tb_ChucNangHienCo.rows.add(dataChucNangHienCo); // Add new data    
        tb_ChucNangHienCo.columns.adjust().draw();

        tb_ChucNangDuocChon.clear().draw();
        tb_ChucNangDuocChon.rows.add(dataChucNangDuocChon); // Add new data    
        tb_ChucNangDuocChon.columns.adjust().draw();
    }
});

$('.phan-quyen-check-all').click(function () {
    let $this = this;
    $('input[name="cb-search"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTSEARCH = $($this).prop('checked');
    });
    $('input[name="cb-write"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTWRITE = $($this).prop('checked');
    });
    $('input[name="cb-edit"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTEDIT = $($this).prop('checked');
    });
    $('input[name="cb-delete"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTDELETE = $($this).prop('checked');
    });
    $('input[name="cb-print"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTPRINT = $($this).prop('checked');
    });
    $('input[name="cb-export"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTEXPORT = $($this).prop('checked');
    });
});
$(document).on('click', '#table-phan-quyen tr', function () {
    $(this).addClass('selected');
    $('#table-phan-quyen tr').not(this).removeClass('selected');
});

