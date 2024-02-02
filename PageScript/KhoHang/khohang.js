$(document).ready(function () {
    let idKho = $('#them-kho input[name="idKho"]');
    let maKho = $('#them-kho input[name="maKho"]');
    let tenKho = $('#them-kho input[name="tenKho"]');
    let diaChiKho = $('#them-kho input[name="diaChiKho"]');
    let slShowRoomKho = $('#them-kho select[name="slShowRoomKho"]');
    let idDiaChiKho = $('#them-kho input[name="idDiaChiKho"]');
    let pathDiaChiKho = $('#them-kho input[name="pathDiaChiKho"]');
    let ghichuKho = $('#them-kho input[name="ghiChuKho"]');
    let khoMacDinh = $('#them-kho input[name="khoMacDinh"]');
    let theoDoiKho = $('#them-kho input[name="theoDoiKho"]');
    //Datatable Kho
    let tbKhoHang_filterValues = {};

    $('#table-khohang thead tr').clone(true).appendTo('#table-khohang thead');
    $('#table-khohang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 5) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-khohang', i);
            var data5 = [{ key: '--Theo dõi--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data5.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 6) {
            var y = document.createElement("SELECT");
            y.setAttribute('data-search-khohang', i);
            var data6 = [{ key: '--Kho mặt định--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data6.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                y.options.add(op)
            })
            $(this).html(y);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-khohang="' + i + '"/>');
        }
    });

    var tbKhoHang = $('#table-khohang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbKhoHang_filterValues.draw = data.draw;
            tbKhoHang_filterValues.search = data.search["value"];
            tbKhoHang_filterValues.start = data.start;
            tbKhoHang_filterValues.length = data.length;
            tbKhoHang_filterValues.order = data.order[0].column;
            tbKhoHang_filterValues.dir = data.order[0].dir;

            tbKhoHang_filterValues.search1 = $('input[data-search-khohang=1]').val();
            tbKhoHang_filterValues.search2 = $('input[data-search-khohang=2]').val();
            tbKhoHang_filterValues.search3 = $('input[data-search-khohang=3]').val();
            tbKhoHang_filterValues.search4 = $('input[data-search-khohang=4]').val();
            tbKhoHang_filterValues.search5 = $('select[data-search-khohang=5]').val();
            tbKhoHang_filterValues.search6 = $('select[data-search-khohang=6]').val();
            tbKhoHang_filterValues.search7 = $('input[data-search-khohang=7]').val();
            tbKhoHang_filterValues.search8 = $('input[data-search-khohang=8]').val();

            $.ajax({
                url: '/KhoHang/LoadKhoHang',
                method: 'GET',
                data: tbKhoHang_filterValues,
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
                        if (tbKhoHang_filterValues.draw != 1) {
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
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.KHOID);
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "KHOCODE" },
            { "data": "TENSHOWROOM" },
            { "data": "KHOTEN" },
            { "data": "DIACHI" },
            {
                "data": "VISIBLE",
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
                className: "text-center"
            },
            {
                "data": "KHODEFAULT",
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
                className: "text-center"
            },
            { "data": "GHICHU" },
            { "data": "LOCATIONPATH" }
        ],
        columnDefs: [
            { targets: [0], orderable: true }
        ],
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
            displayBuffer: 10
        },
        orderCellsTop: true
    });

    //Search header
    $(tbKhoHang.table().container()).on('keyup change', 'thead input', function (e) {
        tbKhoHang.draw();
    });
    $(tbKhoHang.table().container()).on('change', 'thead select', function () {
        tbKhoHang.draw();
    });

    //Click
    $('#table-khohang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-khohang tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-khohang tbody').on('dblclick', 'tr', async function () {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/KhoHang/CheckUpdateKhoHang',
            success: function (msg) {
                if (msg.rs) {
                    LoadChiTietKhoHang($('#table-khohang tbody tr.selected').attr('data-id')).then((rs) => {
                        idKho.val(rs.data[0].KHOID);
                        maKho.val(rs.data[0].KHOCODE);
                        slShowRoomKho.val(rs.data[0].SRID).trigger('change');
                        tenKho.val(rs.data[0].KHOTEN);
                        diaChiKho.val(rs.data[0].DIACHI);
                        theoDoiKho.prop('checked', rs.data[0].VISIBLE);
                        khoMacDinh.prop('checked', rs.data[0].KHODEFAULT);
                        ghichuKho.val(rs.data[0].GHICHU);
                        idDiaChiKho.val(rs.data[0].LocationId);
                        LoadChiTietDiaChi(rs.data[0].LocationId).then((rs) => {
                            pathDiaChiKho.val(rs.data.PATH);
                        });

                        $('#them-kho').removeClass('was-validated');
                        $('#them-kho').modal();
                    });
                } else {
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

    //Reset
    $('#btn-reset-kho-hang').on('click', function () {
        tbKhoHang.ajax.reload();
    });

    //Insert
    $('#btn-insert-kho-hang').on('click', function () {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/KhoHang/CheckInsertKhoHang',
            success: function (msg) {
                if (msg.rs) {
                    $('#them-kho input ').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-kho input[type = "checkbox"]').prop('checked', false);
                    theoDoiKho.prop('checked', true);
                    slShowRoomKho.prop("selectedIndex", 0);

                    $('#them-kho').removeClass('was-validated');
                    $('#them-kho').modal();
                } else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        })
    });

    //Update
    $('#btn-update-kho-hang').click(function () {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/KhoHang/CheckUpdateKhoHang',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-khohang tbody tr.selected').attr('data-id') != undefined) {
                        LoadChiTietKhoHang($('#table-khohang tbody tr.selected').attr('data-id')).then((rs) => {
                            idKho.val(rs.data[0].KHOID);
                            maKho.val(rs.data[0].KHOCODE);
                            slShowRoomKho.val(rs.data[0].SRID).trigger('change');
                            tenKho.val(rs.data[0].KHOTEN);
                            diaChiKho.val(rs.data[0].DIACHI);
                            theoDoiKho.prop('checked', rs.data[0].VISIBLE);
                            khoMacDinh.prop('checked', rs.data[0].KHODEFAULT);
                            ghichuKho.val(rs.data[0].GHICHU);
                            idDiaChiKho.val(rs.data[0].LocationId);
                            LoadChiTietDiaChi(rs.data[0].LocationId).then((rs) => {
                                pathDiaChiKho.val(rs.data.PATH);
                            });

                            $('#them-kho').removeClass('was-validated');
                            $('#them-kho').modal();
                        });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn kho hàng',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
                } else {
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

    //Save
    $('#btn-save-kho-hang').click(function () {
        let $currentForm = $('#them-kho');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        let data = new FormData();
        data.append("KHOID", idKho.val());
        data.append("KHOCODE", maKho.val());
        data.append("SRID", slShowRoomKho.find('option:selected').val());
        data.append("KHOTEN", tenKho.val());
        data.append("DIACHI", diaChiKho.val());
        data.append("VISIBLE", theoDoiKho.prop('checked'));
        data.append("KHODEFAULT", khoMacDinh.prop('checked'));
        data.append("GHICHU", ghichuKho.val());
        data.append("LocationId", idDiaChiKho.val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/KhoHang/InsertUpdateKhoHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbKhoHang.ajax.reload();
                    $('#them-kho').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                }
            },
        });
    });

    //Delete
    $('#btn-delete-kho-hang').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhoHang/CheckDeleteKhoHang',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-khohang tbody tr.selected').attr('data-id') != undefined) {
                        let idKho = $('#table-khohang tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa kho hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/KhoHang/DeleteKhoHang?id=' + idKho,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbKhoHang.ajax.reload();
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
                            text: 'Vui lòng chọn kho hàng',
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

    //Excel
    $('#btn-export-kho-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhoHang/CheckExcelKhoHang',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbKhoHang_filterValues.draw;
                    filterReport.search = tbKhoHang_filterValues.search;
                    filterReport.start = tbKhoHang_filterValues.start;
                    filterReport.length = tbKhoHang_filterValues.length;
                    filterReport.order = tbKhoHang_filterValues.order;
                    filterReport.dir = tbKhoHang_filterValues.dir;

                    filterReport.search1 = tbKhoHang_filterValues.search1;
                    filterReport.search2 = tbKhoHang_filterValues.search2;
                    filterReport.search3 = tbKhoHang_filterValues.search3;
                    filterReport.search4 = tbKhoHang_filterValues.search4;
                    filterReport.search5 = tbKhoHang_filterValues.search5;
                    filterReport.search6 = tbKhoHang_filterValues.search6;
                    filterReport.search7 = tbKhoHang_filterValues.search7;
                    filterReport.search8 = tbKhoHang_filterValues.search8;

                    filterReport.export = 1;
                    var link = `/KhoHang/LoadKhoHang?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        `&search8=` + filterReport.search8 +
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

    //Print
    $('#btn-print-kho-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhoHang/CheckPrintKhoHang',
            success: function (res) {
                if (res.rs) {
                    //tbKhoHang.buttons('.buttons-print').trigger();
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

    //Function load chi tiết kho hàng
    async function LoadChiTietKhoHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhoHang/LoadChiTietKhoHang?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        })
    }

    ShowRoomKhoHang();
    function ShowRoomKhoHang() {
        let dsSR = [];
        let tbChiNhanh_filterValues = {};
        tbChiNhanh_filterValues.draw = 1;
        tbChiNhanh_filterValues.search = "";
        tbChiNhanh_filterValues.start = 0;
        tbChiNhanh_filterValues.length = 2000;
        tbChiNhanh_filterValues.order = 0;
        tbChiNhanh_filterValues.dir = 0;
        $.ajax({
            url: '/ChiNhanh/LoadChiNhanh',
            method: 'GET',
            data: tbChiNhanh_filterValues,
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
                    if (tbChiNhanh_filterValues.draw != 1) {
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
                } else {
                    dsSR = $.map(msg.data, function (obj) {
                        obj.id = obj.SRID;
                        obj.text = obj.TEN;
                        return obj
                    });
                    slShowRoomKho.select2({
                        data: dsSR,
                        dropdownParent: $('#them-kho')
                    });
                }
            },
        });
    };

    //#region Địa chỉ
    $('#btn-dia-chi').on('click', function () {
        $('#danh-sach-dia-chi').modal();
    });
    $('#table-dia-chi tbody').unbind('dblclick');
    $('#table-dia-chi tbody').on('dblclick', 'tr', async function () {
        $('#danh-sach-dia-chi').modal('hide');
        var diaChi = $(this).find('td').eq(4).html();
        pathDiaChiKho.val(diaChi);
        idDiaChiKho.val($(this).attr('data-id'));
    });
    //Function load chi tiết địa chỉ
    async function LoadChiTietDiaChi(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/DiaChi/LoadDetail?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        })
    }
    //#endregion

    //#region Kho hàng
    ShowRoomKhoHang();
    function ShowRoomKhoHang() {
        let dsSR = [];
        let tbChiNhanh_filterValues = {};
        tbChiNhanh_filterValues.draw = 1;
        tbChiNhanh_filterValues.search = "";
        tbChiNhanh_filterValues.start = 0;
        tbChiNhanh_filterValues.length = 2000;
        tbChiNhanh_filterValues.order = 0;
        tbChiNhanh_filterValues.dir = 0;
        $.ajax({
            url: '/ChiNhanh/LoadChiNhanh',
            method: 'GET',
            data: tbChiNhanh_filterValues,
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
                    if (tbChiNhanh_filterValues.draw != 1) {
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
                } else {
                    dsSR = $.map(msg.data, function (obj) {
                        obj.id = obj.SRID;
                        obj.text = obj.TEN;
                        return obj
                    });
                    slShowRoomKho.select2({
                        data: dsSR,
                        dropdownParent: $('#them-kho')
                    });
                }
            },
        });
    };

    $('#btn-showroom').on('click', function () {
        $('#danh-sach-chi-nhanh').modal();
    });

    $('#table-chinhanh tbody').unbind('dblclick');
    $('#table-chinhanh tbody').on('dblclick', 'tr', function () {
        $('#danh-sach-chi-nhanh').modal('hide');
        let idSR = $(this).attr('data-id');
        slShowRoomKho.val(idSR).trigger('change');
    });

    $('#danh-sach-chi-nhanh').on('hidden.bs.modal', function () {
        slShowRoomKho.html('');
        ShowRoomKhoHang();
        slShowRoomKho.val(slShowRoomKho.find('option:first-child').val()).trigger('change');
    });
    //#endregion

    //#region Nhập kho hàng bằng excel
    var dataNew_KhoHang = new Array();
    var tbNew_KhoHang = $('#table-kho-hang-chua-co').DataTable({
        bInfo: false,
        data: dataNew_KhoHang,
        columns: [
            { "data": null },
            { "data": "KHOCODE" },
            { "data": "SRTEN" },
            { "data": "KHOTEN" },
            { "data": "DIACHI" },
            {
                "data": "VISIBLE",
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
                className: "text-center"
            },
            {
                "data": "KHODEFAULT",
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
                className: "text-center"
            },
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $($(nRow).children()[0]).html(iDataIndex + 1);
        },

        scrollResize: false,
        scrollX: true,
        scrollY: 150,
        scrollCollapse: true,

        paging: false,
        searching: false,
        //pageLength: 10,
        //lengthChange: false,
    });
    var dataOld_KhoHang = new Array();
    var tbOld_KhoHang = $('#table-kho-hang-da-co').DataTable({
        bInfo: false,
        data: dataOld_KhoHang,
        columns: [
            { "data": null },
            { "data": "KHOCODE" },
            { "data": "SRTEN" },
            { "data": "KHOTEN" },
            { "data": "DIACHI" },
            {
                "data": "VISIBLE",
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
                className: "text-center"
            },
            {
                "data": "KHODEFAULT",
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
                className: "text-center"
            },
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $($(nRow).children()[0]).html(iDataIndex + 1);
        },

        scrollResize: false,
        scrollX: true,
        scrollY: 150,
        scrollCollapse: true,

        paging: false,
        searching: false,
        //pageLength: 10,
        //lengthChange: false,
    });
    //Import excel 
    $("#btn-import-kho-hang").on('click', function () {
        $('input[type="file"][name="excelKhoHang"]').click();
    });
    $('input[type="file"][name="excelKhoHang"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import_KhoHang(files[0], "", "");
        $(this).val('');
    });
    var dataOpt_KhoHang = [];
    //Function Import Excel
    async function Import_KhoHang(file, sheetName, url) {
        var slExcel = $('select[name="slExcel-khohang"]');
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/KhoHang/Import',
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.ajaxResult.status == 1) {
                    let lstNew = res.ajaxResult.data[0].New;
                    let lstOld = res.ajaxResult.data[0].Old;
                    let lstSheetName = res.sheetName;
                    if (lstNew.length > 0 || lstOld.length > 0) {
                        if (sheetName === '') {
                            slExcel.children().remove().end();
                            for (var i = 0; i < lstSheetName.length; i++) {
                                var opt = new Option(lstSheetName[i].Name, lstSheetName[i].URL);
                                $(opt).html(lstSheetName[i].Name);
                                slExcel.append(opt);
                                dataOpt_KhoHang.push(lstSheetName[i].Name);
                                if (/\s/.test(lstSheetName[i].Name)) {
                                    toast.create({
                                        title: 'Notification!',
                                        text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
                                        icon: 'error_outline',
                                        classBackground: 'noti-error',
                                        timeout: 3000
                                    });
                                }
                            }
                        }
                        dataNew_KhoHang = [];
                        for (var i = 0; i < lstNew.length; i++) {
                            dataNew_KhoHang.push(lstNew[i]);
                        }
                        tbNew_KhoHang.clear().columns.adjust().draw();
                        tbNew_KhoHang.rows.add(dataNew_KhoHang);
                        tbNew_KhoHang.columns.adjust().draw();

                        dataOld_KhoHang = [];
                        for (var i = 0; i < lstOld.length; i++) {
                            dataOld_KhoHang.push(lstOld[i]);
                        }
                        tbOld_KhoHang.clear().columns.adjust().draw();
                        tbOld_KhoHang.rows.add(dataOld_KhoHang);
                        tbOld_KhoHang.columns.adjust().draw();

                        if (dataNew_KhoHang.length > 0 || dataOld_KhoHang.length > 0) {
                            document.getElementsByClassName('count-new-kho-hang')[0].innerHTML = dataNew_KhoHang.length;
                            document.getElementsByClassName('count-old-kho-hang')[0].innerHTML = dataOld_KhoHang.length;
                            if (dataNew_KhoHang.length > 0 && dataOld_KhoHang.length > 0) {
                                $('.btn-save-kho-hang-excel').removeAttr('disabled', 'disabled');
                            }
                            else if (dataNew_KhoHang.length > 0) {
                                $('.btn-save-kho-hang-excel[value="0"]').removeAttr('disabled', 'disabled');
                            }
                            else if (dataOld_KhoHang.length > 0) {
                                $('.btn-save-kho-hang-excel[value="1"]').removeAttr('disabled', 'disabled');
                            }
                            toast.create({
                                title: 'Notification!',
                                text: 'Thành công',
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            });
                        }
                    }
                    else {
                        dataNew_KhoHang = [];
                        tbNew_KhoHang.clear().columns.adjust().draw();
                        tbNew_KhoHang.rows.add(dataNew_KhoHang);
                        tbNew_KhoHang.columns.adjust().draw();

                        dataOld_KhoHang = [];
                        tbOld_KhoHang.clear().columns.adjust().draw();
                        tbOld_KhoHang.rows.add(dataOld_KhoHang);
                        tbOld_KhoHang.columns.adjust().draw();

                        document.getElementsByClassName('count-new-kho-hang')[0].innerHTML = 0;
                        document.getElementsByClassName('count-old-kho-hang')[0].innerHTML = 0;

                        $('.btn-save-kho-hang-excel').attr('disabled');

                        toast.create({
                            title: 'Notification!',
                            text: res.ajaxResult.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.ajaxResult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    }
    //Change Sheet
    $('select[name="slExcel-khohang"]').on('change', async function () {
        var name = $(this).find('option:selected').text();
        var url = $(this).find('option:selected').val();
        if (/\s/.test(name)) {
            toast.create({
                title: 'Notification!',
                text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
        else {
            await Import_KhoHang("", name, url);
        }
        //console.log(name, url);
    });
    //Reset
    $('#btn-reset-kho-hang-excel').on('click', function () {
        $('input[type="file"][name="excelKhoHang"]').click();
    });
    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-kho-hang-excel').on('click', function () {
        var link = `/KhoHang/Create`;
        window.open(link)
    });
    //Modal Show
    $('#excel-khohang').on('shown.bs.modal', function () {
        $('select[name="slExcel-khohang"]').children().remove().end();

        dataNew_KhoHang = [];
        tbNew_KhoHang.clear().columns.adjust().draw();
        tbNew_KhoHang.rows.add(dataNew_KhoHang);
        tbNew_KhoHang.columns.adjust().draw();

        dataOld_KhoHang = [];
        tbOld_KhoHang.clear().columns.adjust().draw();
        tbOld_KhoHang.rows.add(dataOld_KhoHang);
        tbOld_KhoHang.columns.adjust().draw();

        document.getElementsByClassName('count-new-kho-hang')[0].innerHTML = 0;
        document.getElementsByClassName('count-old-kho-hang')[0].innerHTML = 0;

        $('.btn-save-kho-hang-excel').attr('disabled', 'disabled');
    });
    //Save
    $('button.btn-save-kho-hang-excel').on('click', function () {
        let value = $(this).val();
        var data = null;
        if (value == 0) {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/KhoHang/CheckInsertKhoHang',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataNew_KhoHang });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: res.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    }
                }
            });
        }
        else {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/KhoHang/CheckUpdateKhoHang',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataOld_KhoHang });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: res.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    }
                }
            });
        }
        if (confirm('Bạn chắc chắn muốn thêm/sửa các kho hàng hay không?')) {
            $.ajax({
                type: 'POST',
                url: '/KhoHang/Save',
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.rs) {
                        tbKhoHang.draw();
                        $('#excel-khohang').modal('hide');
                        toast.create({
                            title: 'Notification!',
                            text: 'Thành công',
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        });
                    } else {
                        toast.create({
                            title: 'Notification!',
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
        }
    });
    //#endregion
});