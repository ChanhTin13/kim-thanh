$(document).ready(function () {
    let idChiNhanh = $('#them-chi-nhanh input[name="idChiNhanh"]');
    let tenChiNhanh = $('#them-chi-nhanh input[name="tenChiNhanh"]');
    let moTaChiNhanh = $('#them-chi-nhanh textarea[name="moTaChiNhanh"]');
    //Datatable Chi nhánh
    let tbChiNhanh_filterValues = {};

    $('#table-chinhanh thead tr').clone(true).appendTo('#table-chinhanh thead');
    $('#table-chinhanh thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-showroom="' + i + '"/>');
        }
    });

    var tbChiNhanh = $('#table-chinhanh').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbChiNhanh_filterValues.draw = data.draw;
            tbChiNhanh_filterValues.search = data.search["value"];
            tbChiNhanh_filterValues.start = data.start;
            tbChiNhanh_filterValues.length = data.length;
            tbChiNhanh_filterValues.order = data.order[0].column;
            tbChiNhanh_filterValues.dir = data.order[0].dir;

            tbChiNhanh_filterValues.search1 = $('input[data-search-showroom=1]').val();
            tbChiNhanh_filterValues.search2 = $('input[data-search-showroom=2]').val();

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
                    }
                },
            }).done(callback, () => {

            });
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID);
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" }
        ],
        columnDefs: [
            { targets: [0], orderable: true }
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        bInfo: false,
        paging: true,
        searching: true,
        pageLength: 5,
        lengthChange: false,
        orderCellsTop: true
    });

    //Search header
    $(tbChiNhanh.table().container()).on('keyup change', 'thead input', function (e) {
        tbChiNhanh.draw();
    });

    //Click
    $('#table-chinhanh tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-chinhanh tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-chinhanh tbody').on('dblclick', 'tr', async function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckUpdateChiNhanh',
            success: function (msg) {
                if (msg.rs) {
                    LoadChiTietChiNhanh($('#table-chinhanh tbody tr.selected').attr('data-id')).then((rs) => {
                        idChiNhanh.val(rs.data.SRID);
                        tenChiNhanh.val(rs.data.TEN);
                        moTaChiNhanh.val(rs.data.GHICHU);

                        $('#them-chi-nhanh').removeClass('was-validated');
                        $('#them-chi-nhanh').modal();
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
    });

    //Insert
    $('#btn-insert-chi-nhanh').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckInsertChiNhanh',
            success: function (msg) {
                if (msg.rs) {
                    idChiNhanh.val('');
                    tenChiNhanh.val('');
                    moTaChiNhanh.val('');

                    $('#them-chi-nhanh').removeClass('was-validated');
                    $('#them-chi-nhanh').modal();
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
    });

    //Update
    $('#btn-update-chi-nhanh').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckUpdateChiNhanh',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-chinhanh tbody tr.selected').attr('data-id') != undefined) {
                        LoadChiTietChiNhanh($('#table-chinhanh tbody tr.selected').attr('data-id')).then((rs) => {
                            idChiNhanh.val(rs.data.SRID);
                            tenChiNhanh.val(rs.data.TEN);
                            moTaChiNhanh.val(rs.data.GHICHU);

                            $('#them-chi-nhanh').removeClass('was-validated');
                            $('#them-chi-nhanh').modal();
                        });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn chi nhánh',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
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
    });

    //Reset
    $('#btn-reset-chi-nhanh').on('click', function () {
        tbChiNhanh.ajax.reload();
    });

    //Delete
    $('#btn-delete-chi-nhanh').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckDeleteChiNhanh',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-chinhanh tbody tr.selected').attr('data-id') != undefined) {
                        let idSR = $('#table-chinhanh tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa chi nhánh này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/ChiNhanh/DeleteChiNhanh?id=' + idSR,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbChiNhanh.ajax.reload();
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
                            text: 'Vui lòng chọn chi nhánh',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
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
    });

    //Save
    $('#btn-save-chi-nhanh').click(function () {
        let $currentForm = $('#them-chi-nhanh');
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
        data.append("SRID", idChiNhanh.val());
        data.append("TEN", tenChiNhanh.val());
        data.append("GHICHU", moTaChiNhanh.val());
        $.ajax({
            async: false,
            type: 'POST',
            url: 'ChiNhanh/InsertUpdateChiNhanh',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbChiNhanh.ajax.reload();
                    $('#them-chi-nhanh').modal('hide');
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
            }
        });
    });

    //Print
    $('#btn-print-chi-nhanh').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckPrintChiNhanh',
            success: function (res) {
                if (res.rs) {
                    //tbChiNhanh.buttons('.buttons-print').trigger();
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

    //Xuất (Excel)
    $('#btn-export-chi-nhanh').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChiNhanh/CheckExcelChiNhanh',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbChiNhanh_filterValues.draw;
                    filterReport.search = tbChiNhanh_filterValues.search;
                    filterReport.start = tbChiNhanh_filterValues.start;
                    filterReport.length = tbChiNhanh_filterValues.length;
                    filterReport.order = tbChiNhanh_filterValues.order;
                    filterReport.dir = tbChiNhanh_filterValues.dir;
                    filterReport.search1 = tbChiNhanh_filterValues.search1;
                    filterReport.search2 = tbChiNhanh_filterValues.search2;
                    filterReport.export = 1;
                    var link = `/ChiNhanh/LoadChiNhanh?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&search1=` + filterReport.search1 + `&search2=` + filterReport.search2 + `&export=` + filterReport.export;
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

    //Load chi tiết chi nhánh
    async function LoadChiTietChiNhanh(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/ChiNhanh/LoadChiTietChiNhanh?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        })
    }

    $('#danh-sach-chi-nhanh').on('shown.bs.modal', function () {
        tbChiNhanh.draw();
    });

    //#region Nhập chi nhánh bằng excel
    var dataNew_ChiNhanh = new Array();
    var tbNew_ChiNhanh = $('#table-chi-nhanh-chua-co').DataTable({
        bInfo: false,
        data: dataNew_ChiNhanh,
        columns: [
            { "data": null },
            { "data": "Ten" },
            { "data": "GhiChu" }
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
    var dataOld_ChiNhanh = new Array();
    var tbOld_ChiNhanh = $('#table-chi-nhanh-da-co').DataTable({
        bInfo: false,
        data: dataOld_ChiNhanh,
        columns: [
            { "data": null },
            { "data": "Ten" },
            { "data": "GhiChu" }
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
    $("#btn-import-chi-nhanh").on('click', function () {
        $('input[type="file"][name="excelChiNhanh"]').click();
    });
    $('input[type="file"][name="excelChiNhanh"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import_ChiNhanh(files[0], "", "");
        $(this).val('');
    });
    var dataOpt_ChiNhanh = [];
    //Function Import Excel
    async function Import_ChiNhanh(file, sheetName, url) {
        var slExcel = $('select[name="slExcel-chinhanh"]');
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/ChiNhanh/Import',
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
                                dataOpt_ChiNhanh.push(lstSheetName[i].Name);
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
                        dataNew_ChiNhanh = [];
                        for (var i = 0; i < lstNew.length; i++) {
                            dataNew_ChiNhanh.push(lstNew[i]);
                        }
                        tbNew_ChiNhanh.clear().columns.adjust().draw();
                        tbNew_ChiNhanh.rows.add(dataNew_ChiNhanh);
                        tbNew_ChiNhanh.columns.adjust().draw();

                        dataOld_ChiNhanh = [];
                        for (var i = 0; i < lstOld.length; i++) {
                            dataOld_ChiNhanh.push(lstOld[i]);
                        }
                        tbOld_ChiNhanh.clear().columns.adjust().draw();
                        tbOld_ChiNhanh.rows.add(dataOld_ChiNhanh);
                        tbOld_ChiNhanh.columns.adjust().draw();

                        if (dataNew_ChiNhanh.length > 0 || dataOld_ChiNhanh.length > 0) {
                            document.getElementsByClassName('count-new-chi-nhanh')[0].innerHTML = dataNew_ChiNhanh.length;
                            document.getElementsByClassName('count-old-chi-nhanh')[0].innerHTML = dataOld_ChiNhanh.length;
                            if (dataNew_ChiNhanh.length > 0 && dataOld_ChiNhanh.length > 0) {
                                $('.btn-save-chi-nhanh-excel').removeAttr('disabled', 'disabled');
                            }
                            else if (dataNew_ChiNhanh.length > 0) {
                                $('.btn-save-chi-nhanh-excel[value="0"]').removeAttr('disabled', 'disabled');
                            }
                            else if (dataOld_ChiNhanh.length > 0) {
                                $('.btn-save-chi-nhanh-excel[value="1"]').removeAttr('disabled', 'disabled');
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
                        dataNew_ChiNhanh = [];
                        tbNew_ChiNhanh.clear().columns.adjust().draw();
                        tbNew_ChiNhanh.rows.add(dataNew_ChiNhanh);
                        tbNew_ChiNhanh.columns.adjust().draw();

                        dataOld_ChiNhanh = [];
                        tbOld_ChiNhanh.clear().columns.adjust().draw();
                        tbOld_ChiNhanh.rows.add(dataOld_ChiNhanh);
                        tbOld_ChiNhanh.columns.adjust().draw();

                        document.getElementsByClassName('count-new-chi-nhanh')[0].innerHTML = 0;
                        document.getElementsByClassName('count-old-chi-nhanh')[0].innerHTML = 0;

                        $('.btn-save-chi-nhanh-excel').attr('disabled');

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
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                }
            }
        });
    }
    //Change Sheet
    $('select[name="slExcel-chinhanh"]').on('change', async function () {
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
            await Import_ChiNhanh("", name, url);
        }
        //console.log(name, url);
    });
    //Reset
    $('#btn-reset-chi-nhanh-excel').on('click', function () {
        $('input[type="file"][name="excelChiNhanh"]').click();
    });
    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-chi-nhanh-excel').on('click', function () {
        var link = `/ChiNhanh/Create`;
        window.open(link)
    });
    //Modal Show
    $('#excel-chinhanh').on('shown.bs.modal', function () {
        $('select[name="slExcel-chinhanh"]').children().remove().end();

        dataNew_ChiNhanh = [];
        tbNew_ChiNhanh.clear().columns.adjust().draw();
        tbNew_ChiNhanh.rows.add(dataNew_ChiNhanh);
        tbNew_ChiNhanh.columns.adjust().draw();

        dataOld_ChiNhanh = [];
        tbOld_ChiNhanh.clear().columns.adjust().draw();
        tbOld_ChiNhanh.rows.add(dataOld_ChiNhanh);
        tbOld_ChiNhanh.columns.adjust().draw();

        document.getElementsByClassName('count-new-chi-nhanh')[0].innerHTML = 0;
        document.getElementsByClassName('count-old-chi-nhanh')[0].innerHTML = 0;

        $('.btn-save-chi-nhanh-excel').attr('disabled', 'disabled');
    });
    //Save
    $('button.btn-save-chi-nhanh-excel').on('click', function () {
        let value = $(this).val();
        var data = null;
        if (value == 0) {
            $.ajax({
                async: false,
                type: 'GET',
                url: '/ChiNhanh/CheckInsertChiNhanh',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataNew_ChiNhanh });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
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
                type: 'GET',
                url: '/ChiNhanh/CheckUpdateChiNhanh',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataOld_ChiNhanh });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    }
                }
            });
        }
        if (confirm('Bạn chắc chắn muốn thêm/sửa các chi nhánh hay không?')) {
            $.ajax({
                type: 'POST',
                url: '/ChiNhanh/Save',
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.rs) {
                        tbChiNhanh.draw();
                        $('#excel-chinhanh').modal('hide');
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