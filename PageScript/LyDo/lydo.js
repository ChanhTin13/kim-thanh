$(document).ready(function () {
    //#region Lý Do
    //Datatable Lý do
    let tbLyDo_filterValues = {};
    $('#table-lydo thead tr').clone(true).appendTo('#table-lydo thead');
    $('#table-lydo thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 4) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-lydo', i);
            var data4 = [{ key: '--Kiểu hệ thống--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data4.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 5) {
            var y = document.createElement("SELECT");
            y.setAttribute('data-search-lydo', i);
            var data5 = [{ key: '--Line Type--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data5.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                y.options.add(op)
            })
            $(this).html(y);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-lydo="' + i + '"/>');
        }
    });
    var tbLyDo = $('#table-lydo').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbLyDo_filterValues.draw = data.draw;
            tbLyDo_filterValues.search = data.search["value"];
            tbLyDo_filterValues.start = data.start;
            tbLyDo_filterValues.length = data.length;
            tbLyDo_filterValues.order = data.order[0].column;
            tbLyDo_filterValues.dir = data.order[0].dir;

            tbLyDo_filterValues.search1 = $('input[data-search-lydo=1]').val();
            tbLyDo_filterValues.search2 = $('input[data-search-lydo=2]').val();
            tbLyDo_filterValues.search3 = $('input[data-search-lydo=3]').val();
            tbLyDo_filterValues.search4 = $('select[data-search-lydo=4]').val();
            tbLyDo_filterValues.search5 = $('select[data-search-lydo=5]').val();

            $.ajax({
                url: '/LyDo/LoadLyDo',
                method: 'GET',
                data: tbLyDo_filterValues,
                success: function (msg) {
                    if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    } else if (msg.status == 3) {
                        if (tbLyDo_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            location.reload();
                            return false;
                        }
                    }
                },
            }).done(callback, () => {

            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TENMODULE" },
            { "data": "CODE" },
            { "data": "TEN" },
            {
                "data": "ISSYSTYPE",
                render: function (data, type, row) {
                    if (type === 'display') {
                        if (data) {
                            return '<input type="checkbox" class="editor-active" checked onclick="return false;">';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    }
                    return data;
                },
                className: "dt-body-center"
            },
            {
                "data": "ISLINETYPE",
                render: function (data, type, row) {
                    if (type === 'display') {
                        if (data) {
                            return '<input type="checkbox" class="editor-active" checked onclick="return false;">';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    }
                    return data;
                },
                className: "dt-body-center"
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 30
        },
        orderCellsTop: true
    });

    $(tbLyDo.table().container()).on('keyup change', 'thead input', function (e) {
        tbLyDo.draw();
    });
    $(tbLyDo.table().container()).on('change', 'thead select', function () {
        tbLyDo.draw();
    });

    //Click
    $('#table-lydo tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-lydo tbody tr').not(this).removeClass('selected');
    });

    //DoubleClick
    $('#table-lydo tbody').on('dblclick', 'tr', async function () {
        $(this).addClass('selected');
        $('#table-lydo tbody tr').not(this).removeClass('selected');
        CheckUpdateLyDo();
    });

    //Thêm
    $('#btn-insert-ly-do').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/LyDo/CheckInsert',
            success: function (res) {
                if (res.rs) {
                    $('#them-ly-do input').each(function (index, e) {
                        $(e).val('');
                    })
                    $('#them-ly-do').removeClass('was-validated');
                    $('#them-ly-do select ').each(function (index, e) {
                        $(e).val('');
                    })
                    $('#them-ly-do input[type = "checkbox"]').prop('checked', false);
                    $('#them-ly-do').modal();
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

    //Cập nhật
    $('#btn-update-ly-do').on('click', function () {
        CheckUpdateLyDo();
    });

    //Xóa
    $('#btn-delete-ly-do').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/LyDo/CheckDelete',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-lydo tbody tr.selected').attr('data-id') != undefined) {
                        let idLyDo = $('#table-lydo tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa lý do này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: 'LyDo/DeleteLyDo?id=' + idLyDo,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbLyDo.ajax.reload();
                                        toast.create({
                                            title: 'Notification!',
                                            text: 'Thành công',
                                            icon: 'check',
                                            classBackground: 'noti-success',
                                            timeout: 3000
                                        });
                                    }
                                    else {
                                        toast.create({
                                            title: 'Notification!',
                                            text: msg.message,
                                            icon: 'error_outline',
                                            classBackground: 'noti-error',
                                            timeout: 3000
                                        });
                                    }
                                }
                            });
                        }
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn lý do',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

    //Nạp
    $('#btn-reset-ly-do').on('click', function () {
        tbLyDo.draw();
    });

    //Xuất (Excel)
    $('#btn-export-ly-do').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/LyDo/CheckExcel',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbLyDo_filterValues.draw;
                    filterReport.search = tbLyDo_filterValues.search;
                    filterReport.start = tbLyDo_filterValues.start;
                    filterReport.length = tbLyDo_filterValues.length;
                    filterReport.order = tbLyDo_filterValues.order;
                    filterReport.dir = tbLyDo_filterValues.dir;

                    filterReport.search1 = tbLyDo_filterValues.search1;
                    filterReport.search2 = tbLyDo_filterValues.search2;
                    filterReport.search3 = tbLyDo_filterValues.search3;
                    filterReport.search4 = tbLyDo_filterValues.search4;
                    filterReport.search5 = tbLyDo_filterValues.search5;

                    filterReport.status = 1;
                    filterReport.export = 1;
                    var link = `/LyDo/LoadLyDo?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&status=` + filterReport.status +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&export=` + filterReport.export;
                    window.open(link);
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

    //Lưu
    $('#btn-save-ly-do').on('click', function () {
        let $currentForm = $('#them-ly-do');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        let idLyDo = $('#them-ly-do input[name = "id-lydo"]').val();
        let idLyDoType = $('#them-ly-do select[name = "slModule"]').val();
        let codeLyDo = $('#them-ly-do input[name = "code-lydo"]').val();
        let nameLyDo = $('#them-ly-do input[name = "name-lydo"]').val();
        let isLineType = $('#them-ly-do input[name = "isLineType"]').prop('checked');
        let data = new FormData();
        data.append("id-lydo", idLyDo);
        data.append("slModule", idLyDoType);
        data.append("code-lydo", codeLyDo);
        data.append("name-lydo", nameLyDo);
        data.append("isLineType", isLineType);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/LyDo/InsertUpdateLyDo',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbLyDo.ajax.reload();
                    $('#them-ly-do').modal('hide');
                    toast.create({
                        title: 'Notification',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                }
                else {
                    toast.create({
                        title: 'Notification',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    LoadModuleLyDo().then((msg) => {
        dsLDT = $.map(msg.data, function (obj) {
            obj.id = obj.ID;
            obj.text = obj.TEN;
            return obj
        });
        $('#them-ly-do select[name="slModule"]').select2({
            data: dsLDT,
            dropdownParent: $('#them-ly-do')
        });
    });
    //Function load Module Lý Do (<select>)
    function LoadModuleLyDo() {
        return $.ajax({
            type: 'GET',
            url: '/LyDo/LoadLyDoType',
            dataType: 'json',
            contenttype: 'application/json',
            success: function (msg) {
                return msg.data
            }
        });
    }

    //Function Load Chi tiết Lý Do
    async function LoadLyDoInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/LyDo/LoadLyDoInfo?id=' + id,
            success: function (msg) {
                console.log(msg.data);
                return msg.data;
            }
        });
    };

    //Function Load Lý Do
    function LoadLyDo() {
        let id = $('#table-lydo tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadLyDoInfo(id).then((rs) => {
                $('#them-ly-do input[name = "id-lydo"]').val(rs.data.ID);
                $('#them-ly-do select[name = "slModule"]').val(rs.data.LDTID).trigger('change');
                $('#them-ly-do input[name = "code-lydo"]').val(rs.data.CODE);
                $('#them-ly-do input[name = "name-lydo"]').val(rs.data.TEN);
                $('#them-ly-do input[name = "isLineType"]').prop('checked', rs.data.ISLINETYPE);
            });
            $('#them-ly-do').removeClass('was-validated');
            $('#them-ly-do').modal();
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn lý do',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }

    //Function Check Update
    function CheckUpdateLyDo() {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/LyDo/CheckUpdate',
            success: function (res) {
                if (res.rs) {
                    LoadLyDo();
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    }
    //#endregion

    $('#danh-sach-ly-do').on('shown.bs.modal', function () {
        tbLyDo.draw();
    });
});