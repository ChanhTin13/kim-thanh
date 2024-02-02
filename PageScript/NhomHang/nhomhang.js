$(document).ready(function () {
    //#region Nhóm hàng
    //DataTable Nhóm hàng
    let tbNhomHang_filterValues = {};
    $('#table-nhom-hang thead tr').clone(true).appendTo('#table-nhom-hang thead');
    $('#table-nhom-hang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 8) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nhom-hang="' + i + '" /> ');
        }
        else if (i == 9) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nhom-hang="' + i + '" /> ');
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nhom-hang="' + i + '"/>');
        }
    });
    var tbNhomHang = $('#table-nhom-hang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbNhomHang_filterValues.draw = data.draw;
            tbNhomHang_filterValues.search = data.search["value"];
            tbNhomHang_filterValues.start = data.start;
            tbNhomHang_filterValues.length = data.length;
            tbNhomHang_filterValues.order = data.order[0].column;
            tbNhomHang_filterValues.dir = data.order[0].dir;

            tbNhomHang_filterValues.search1 = $('input[data-search-nhom-hang=1]').val();
            tbNhomHang_filterValues.search2 = $('input[data-search-nhom-hang=2]').val();
            tbNhomHang_filterValues.search3 = $('input[data-search-nhom-hang=3]').val();
            tbNhomHang_filterValues.search4 = $('input[data-search-nhom-hang=4]').val();
            tbNhomHang_filterValues.search5 = $('input[data-search-nhom-hang=5]').val();
            tbNhomHang_filterValues.search6 = $('input[data-search-nhom-hang=6]').val();
            tbNhomHang_filterValues.search7 = $('input[data-search-nhom-hang=7]').val();
            tbNhomHang_filterValues.search8 = $('input[data-search-nhom-hang=8]').val();
            tbNhomHang_filterValues.search9 = $('input[data-search-nhom-hang=9]').val();
            tbNhomHang_filterValues.search10 = $('input[data-search-nhom-hang=10]').val();

            $.ajax({
                url: '/NhomHang/LoadNhomHang',
                method: 'GET',
                data: tbNhomHang_filterValues,
                success: function (rs) {
                    if (rs.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: rs.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    } else if (rs.status == 3) {
                        if (tbNhomHang_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: rs.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            location.reload();
                            return false;
                        }
                    }
                },
            }).done(callback, (e) => {
                if (e.status == 1) {
                    tbNhomHang.columns.adjust();
                }
            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "MHLCODE" },
            { "data": "MATCHCODE" },
            { "data": "ALIAS" },
            { "data": "MHLTEN" },
            { "data": "PATH" },
            { "data": "MOTA" },
            { "data": "GHICHU" },
            { "data": "NgayTao" },
            { "data": "NgayCapNhat" },
            { "data": "USERID" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
            if (iDataIndex === 0) {
                $(nRow).addClass('selected');
            };
            let created = data.NgayTao;
            let updated = data.NgayCapNhat;
            $($(nRow).children()[8]).html(moment(created).format('DD/MM/yyyy') == 'Invalid date' ? '' : moment(created).format('DD/MM/yyyy'));
            $($(nRow).children()[9]).html(moment(updated).format('DD/MM/yyyy') == 'Invalid date' ? '' : moment(updated).format('DD/MM/yyyy'));
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        searching: false,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },

        orderCellsTop: true
    });

    $(tbNhomHang.table().container()).on('keyup change', 'thead input', function (e) {
        tbNhomHang.draw();
    });

    //Click
    $('#table-nhom-hang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-nhom-hang tbody tr').not(this).removeClass('selected');
        //$('#jstree').jstree('select_node', $(this).attr('data-id'));
        $('#form-table-nhom-kh input[name = "id"]').val("");
        $('#form-table-nhom-kh input[name = "parentID"]').val(1);
    });

    //DoubleClick
    $('#table-nhom-hang tbody').on('dblclick', 'tr', async function () {
        $(this).addClass('selected');
        $('#table-nhom-hang tbody tr').not(this).removeClass('selected');
        LoadNhomHangInfo($(this).attr('data-id')).then((rs) => {
            $('#form-table-nhom-kh input[name = "id"]').val(rs.data.ID);
            $('#form-table-nhom-kh input[name = "parentID"]').val(rs.data.PARENTID);
            $('#form-table-nhom-kh input[name = "code"]').val(rs.data.MHLCODE);
            $('#form-table-nhom-kh input[name = "matchcode"]').val(rs.data.MATCHCODE);
            $('#form-table-nhom-kh input[name = "name"]').val(rs.data.MHLTEN);
            $('#form-table-nhom-kh input[name = "alias"]').val(rs.data.ALIAS);
            $('#form-table-nhom-kh textarea[name = "describe"]').val(rs.data.MOTA);
            $('#form-table-nhom-kh textarea[name = "note"]').val(rs.data.GHICHU);
            $('#form-table-nhom-kh input[name = "path"]').val(rs.data.PATH);
            $('#title').text(rs.data.PATH);

            $('#them-nhom-hang').removeClass('was-validated');
        });
        //$('#jstree').jstree('select_node', $(this).attr('data-id'));
    });

    //Xem
    $('.xem-nhom-hang .dropdown-item').on('click', function () {
        tbNhomHang_filterValues.level = $(this).attr('data-id');
        tbNhomHang_filterValues.parentID = 0;
        tbNhomHang.draw();
    });

    //Thêm
    $('#btn-insert').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhomHang/CheckInsert',
            success: function (res) {
                if (res.rs) {
                    $('#btn-insert').addClass('disabled');
                    $('#btn-update').addClass('disabled');
                    $('#btn-delete').addClass('disabled');
                    $('#btn-save').removeClass('disabled');

                    $('#jstree').addClass('disabled-nhom-hang');
                    $('#table-nhom-hang_wrapper').addClass('disabled-nhom-hang');

                    $('#title').text('Nhóm hàng');

                    $('#form-table-nhom-kh input[name = "parentID"]').val($('#form-table-nhom-kh input[name = "id"]').val());
                    if ($('#form-table-nhom-kh input[name = "parentID"]').val() =="") {
                        $('#form-table-nhom-kh input[name = "parentID"]').val(1);
                    };

                    $('#form-table-nhom-kh input').not('#form-table-nhom-kh input[name = "parentID"]').each(function (index, e) {
                        $(e).val('');
                        $(e).removeAttr('disabled');
                    });
                    $('#form-table-nhom-kh textarea').each(function (index, e) {
                        $(e).val('');
                        $(e).removeAttr('disabled');
                    });
                    $('#form-table-nhom-kh').removeClass('was-validated');

                    if ($('#form-table-nhom-kh input[name = "parentID"]').val() != 1) {
                        LoadNhomHangInfo($('#table-nhom-hang tbody tr.selected').attr('data-id')).then((rs) => {
                            $('#form-table-nhom-kh input[name = "code"]').val('Child of '+(rs.data.MHLCODE));
                            $('#form-table-nhom-kh input[name = "name"]').val(rs.data.MHLTEN);
                        });
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

    //Cập nhật
    $('#btn-update').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhomHang/CheckUpdate',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-nhom-hang tbody tr.selected').attr('data-id') != undefined) {
                        $('#btn-insert').addClass('disabled');
                        $('#btn-update').addClass('disabled');
                        $('#btn-delete').addClass('disabled');
                        $('#btn-save').removeClass('disabled');

                        $('#form-table-nhom-kh input').not('#form-table-nhom-kh input[name = "path"]').not('#form-table-nhom-kh input[name = "parentID"]').not('#form-table-nhom-kh input[name = "id"]').each(function (index, e) {
                            $(e).val('');
                            $(e).removeAttr('disabled');
                        });
                        $('#form-table-nhom-kh textarea').each(function (index, e) {
                            $(e).val('');
                            $(e).removeAttr('disabled');
                        });

                        LoadNhomHangInfo($('#table-nhom-hang tbody tr.selected').attr('data-id')).then((rs) => {
                            $('#form-table-nhom-kh input[name = "id"]').val(rs.data.ID);
                            $('#form-table-nhom-kh input[name = "code"]').val(rs.data.MHLCODE);
                            $('#form-table-nhom-kh input[name = "matchcode"]').val(rs.data.MATCHCODE);
                            $('#form-table-nhom-kh input[name = "name"]').val(rs.data.MHLTEN);
                            $('#form-table-nhom-kh input[name = "alias"]').val(rs.data.ALIAS);
                            $('#form-table-nhom-kh textarea[name = "describe"]').val(rs.data.MOTA);
                            $('#form-table-nhom-kh textarea[name = "note"]').val(rs.data.GHICHU);
                            $('#form-table-nhom-kh input[name = "path"]').val(rs.data.PATH);
                            $('#title').text(rs.data.PATH);

                            $('#them-nhom-hang').removeClass('was-validated');
                        });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn nhóm hàng',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
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

    //Xóa
    $('#btn-delete').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhomHang/CheckDelete',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-nhom-hang tbody tr.selected').attr('data-id') != undefined) {
                        let idNhomHang = $('#table-nhom-hang tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa nhóm hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/NhomHang/DeleteNhomHang?id=' + idNhomHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbNhomHang.ajax.reload();
                                        toast.create({
                                            title: 'Notification!',
                                            text: 'Thành công',
                                            icon: 'check',
                                            classBackground: 'noti-success',
                                            timeout: 3000
                                        });
                                        resfreshJSTree();
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
                            text: 'Vui lòng chọn nhóm hàng',
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
    $('#btn-reset').on('click', function () {
        tbNhomHang.draw();
        LoadData();
        resfreshJSTree();
    });

    //Hoãn
    $('#btn-back').on('click', function () {
        LoadData();
    });

    //Xuất (Excel)
    $('#btn-export').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhomHang/CheckExcel',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbNhomHang_filterValues.draw;
                    filterReport.search = tbNhomHang_filterValues.search;
                    filterReport.start = tbNhomHang_filterValues.start;
                    filterReport.length = tbNhomHang_filterValues.length;
                    filterReport.order = tbNhomHang_filterValues.order;
                    filterReport.parentID = tbNhomHang_filterValues.parentID;
                    filterReport.level = tbNhomHang_filterValues.level;

                    filterReport.search1 = tbNhomHang_filterValues.search1;
                    filterReport.search2 = tbNhomHang_filterValues.search2;
                    filterReport.search3 = tbNhomHang_filterValues.search3;
                    filterReport.search4 = tbNhomHang_filterValues.search4;
                    filterReport.search5 = tbNhomHang_filterValues.search5;
                    filterReport.search6 = tbNhomHang_filterValues.search6;
                    filterReport.search7 = tbNhomHang_filterValues.search7;
                    filterReport.search8 = tbNhomHang_filterValues.search8;
                    filterReport.search9 = tbNhomHang_filterValues.search9;
                    filterReport.search10 = tbNhomHang_filterValues.search10;

                    filterReport.export = 1;
                    var link = `/NhomHang/LoadNhomHang?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&parentID=` + filterReport.parentID +
                        `&level=` + filterReport.level +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        `&search8=` + filterReport.search8 +
                        `&search9=` + filterReport.search9 +
                        `&search10=` + filterReport.search10 +
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

    //In (Print)
    $('#btn-print').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhomHang/CheckPrint',
            success: function (res) {
                if (res.rs) {
                    //tbNhomHang.buttons('.buttons-print').trigger();
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
    $('#btn-save').on('click', function () {
        let $currentForm = $('#form-table-nhom-kh');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        let id = $('#form-table-nhom-kh input[name = "id"]').val();
        let parentID = $('#form-table-nhom-kh input[name = "parentID"]').val();
        let code = $('#form-table-nhom-kh input[name = "code"]').val();
        let matchcode = $('#form-table-nhom-kh input[name = "matchcode"]').val();
        let name = $('#form-table-nhom-kh input[name = "name"]').val();
        let alias = $('#form-table-nhom-kh input[name = "alias"]').val();
        let describe = $('#form-table-nhom-kh textarea[name = "describe"]').val();
        let note = $('#form-table-nhom-kh textarea[name = "note"]').val();
        let path = $('#form-table-nhom-kh input[name = "path"]').val();

        let data = new FormData();
        data.append("id", id);
        data.append("parentID", parentID);
        data.append("code", code);
        data.append("matchcode", matchcode);
        data.append("name", name);
        data.append("alias", alias);
        data.append("describe", describe);
        data.append("note", note);
        data.append("path", path);

        let url = '';
        if (id != "") {
            url = '/NhomHang/UpdateNhomHang';
        }
        else {
            url = '/NhomHang/InsertNhomHang';
        }

        $.ajax({
            async: false,
            type: 'POST',
            url: url,
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbNhomHang.ajax.reload();
                    toast.create({
                        title: 'Notification',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                    resfreshJSTree();
                    LoadData();
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

    //Function Load chi tiết nhóm hàng
    async function LoadNhomHangInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/NhomHang/LoadNhomHangInfo?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        });
    };
    //#endregion

    $('#form-table-nhom-kh input[name = "path"]').val("Nhóm hàng");

    //Keyup cho Mã nhóm hàng - Tên nhóm hàng
    $('#form-table-nhom-kh input[name = "code"]').on('keyup', function () {
        if ($('#form-table-nhom-kh input[name = "parentID"]').val() == 1) {
            var vl = $(this).val();
            $('#form-table-nhom-kh input[name = "name"]').val(vl);
        }
    });

    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục
    $(function () {
        $.ajax({
            async: true,
            type: "GET",
            url: "/NhomHang/Tree",
            dataType: "json",
            success: function (json) {
                createJSTree(json);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    function createJSTree(jsondata) {
        $('#jstree').jstree({
            'core': {
                'data': jsondata
            }
        }).bind("loaded.jstree", function (event, data) {
            $(this).jstree("open_all");
            $(this).jstree(true).select_node(1);
        });
    };

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('#jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('#jstree').jstree(true).refresh();
    };

    //Event click nodes
    $('#jstree').on('activate_node.jstree', function (e, data) {
        var path = data.instance.get_path(data.node, '\\');
        $('#title').text(path);
        var parentid = (data.instance.get_node(data.node.parent).id) == "#" ? 0 : data.instance.get_node(data.node.parent).id
        $('#form-table-nhom-kh input[name = "parentID"]').val(parentid);
        $('#form-table-nhom-kh input[name = "id"]').val($('#jstree').jstree('get_selected')[0]);
        tbNhomHang_filterValues.parentID = $('#jstree').jstree('get_selected')[0];
        tbNhomHang_filterValues.level = 0;
        tbNhomHang.draw();
        //let idNodes = $('#jstree').jstree('get_selected')[0];
        //$('#table-nhom-hang tbody').find('tr').removeClass('selected');
        //$('#table-nhom-hang tbody').find('tr[data-id = "' + idNodes + '"]').addClass('selected');
    });
    //#endregion

    //Function Load lại trang
    function LoadData() {
        $('#btn-insert').removeClass('disabled');
        $('#btn-update').removeClass('disabled');
        $('#btn-delete').removeClass('disabled');
        $('#btn-save').addClass('disabled');

        $('#jstree').removeClass('disabled-nhom-hang');
        $('#table-nhom-hang_wrapper').removeClass('disabled-nhom-hang');

        $('#title').text('Nhóm hàng');

        $('#form-table-nhom-kh input').each(function (index, e) {
            $(e).val('');
            $(e).attr('disabled', 'disabled');
        });
        $('#form-table-nhom-kh textarea').each(function (index, e) {
            $(e).val('');
            $(e).attr('disabled', 'disabled');
        });
    };

    $('#danh-sach-nhom-hang').on('shown.bs.modal', function () {
        tbNhomHang.draw();
    });

    //#region Nhập excel
    var dataNew_NhomHang = new Array();
    var tbNew_NhomHang = $('#table-nhom-hang-chua-co').DataTable({
        bInfo: false,
        data: dataNew_NhomHang,
        columns: [
            { "data": null },
            { "data": "MHLCODE" },
            { "data": "MATCHCODE" },
            { "data": "ALIAS" },
            { "data": "MHLTEN" },
            { "data": "PATH" },
            { "data": "MOTA" },
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
    var dataOld_NhomHang = new Array();
    var tbOld_NhomHang = $('#table-nhom-hang-da-co').DataTable({
        bInfo: false,
        data: dataOld_NhomHang,
        columns: [
            { "data": null },
            { "data": "MHLCODE" },
            { "data": "MATCHCODE" },
            { "data": "ALIAS" },
            { "data": "MHLTEN" },
            { "data": "PATH" },
            { "data": "MOTA" },
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
    $("#btn-import-nhom-hang").on('click', function () {
        $('input[type="file"][name="excelNhomHang"]').click();
    });
    $('input[type="file"][name="excelNhomHang"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import_NhomHang(files[0], "", "");
        $(this).val('');
    });
    var dataOpt_NhomHang = [];
    //Function Import Excel
    async function Import_NhomHang(file, sheetName, url) {
        var slExcel = $('select[name="slExcel-nhomhang"]');
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/NhomHang/Import',
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
                                dataOpt_NhomHang.push(lstSheetName[i].Name);
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
                        dataNew_NhomHang = [];
                        for (var i = 0; i < lstNew.length; i++) {
                            dataNew_NhomHang.push(lstNew[i]);
                        }
                        tbNew_NhomHang.clear().columns.adjust().draw();
                        tbNew_NhomHang.rows.add(dataNew_NhomHang);
                        tbNew_NhomHang.columns.adjust().draw();

                        dataOld_NhomHang = [];
                        for (var i = 0; i < lstOld.length; i++) {
                            dataOld_NhomHang.push(lstOld[i]);
                        }
                        tbOld_NhomHang.clear().columns.adjust().draw();
                        tbOld_NhomHang.rows.add(dataOld_NhomHang);
                        tbOld_NhomHang.columns.adjust().draw();

                        if (dataNew_NhomHang.length > 0 || dataOld_NhomHang.length > 0) {
                            document.getElementsByClassName('count-new-nhom-hang')[0].innerHTML = dataNew_NhomHang.length;
                            document.getElementsByClassName('count-old-nhom-hang')[0].innerHTML = dataOld_NhomHang.length;
                            if (dataNew_NhomHang.length > 0 && dataOld_NhomHang.length > 0) {
                                $('.btn-save-nhom-hang-excel').removeAttr('disabled', 'disabled');
                            }
                            else if (dataNew_NhomHang.length > 0) {
                                $('.btn-save-nhom-hang-excel[value="0"]').removeAttr('disabled', 'disabled');
                            }
                            else if (dataOld_NhomHang.length > 0) {
                                $('.btn-save-nhom-hang-excel[value="1"]').removeAttr('disabled', 'disabled');
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
                        dataNew_NhomHang = [];
                        tbNew_NhomHang.clear().columns.adjust().draw();
                        tbNew_NhomHang.rows.add(dataNew_NhomHang);
                        tbNew_NhomHang.columns.adjust().draw();

                        dataOld_NhomHang = [];
                        tbOld_NhomHang.clear().columns.adjust().draw();
                        tbOld_NhomHang.rows.add(dataOld_NhomHang);
                        tbOld_NhomHang.columns.adjust().draw();

                        document.getElementsByClassName('count-new-nhom-hang')[0].innerHTML = 0;
                        document.getElementsByClassName('count-old-nhom-hang')[0].innerHTML = 0;

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
    $('select[name="slExcel-nhomhang"]').on('change', async function () {
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
            await Import_NhomHang("", name, url);
        }
        //console.log(name, url);
    });
    //Reset
    $('#btn-reset-nhom-hang-excel').on('click', function () {
        $('input[type="file"][name="excelNhomHang"]').click();
    });
    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-nhom-hang-excel').on('click', function () {
        var link = `/NhomHang/Create`;
        window.open(link)
    });
    //Modal Show
    $('#excel-nhomhang').on('shown.bs.modal', function () {
        $('select[name="slExcel-nhomhang"]').children().remove().end();

        dataNew_NhomHang = [];
        tbNew_NhomHang.clear().columns.adjust().draw();
        tbNew_NhomHang.rows.add(dataNew_NhomHang);
        tbNew_NhomHang.columns.adjust().draw();

        dataOld_NhomHang = [];
        tbOld_NhomHang.clear().columns.adjust().draw();
        tbOld_NhomHang.rows.add(dataOld_NhomHang);
        tbOld_NhomHang.columns.adjust().draw();

        document.getElementsByClassName('count-new-nhom-hang')[0].innerHTML = 0;
        document.getElementsByClassName('count-old-nhom-hang')[0].innerHTML = 0;

        $('.btn-save-nhom-hang-excel').attr('disabled', 'disabled');
    });
    //Save
    $('button.btn-save-nhom-hang-excel').on('click', function () {
        let value = $(this).val();
        var data = null;
        if (value == 0) {
            $.ajax({
                async: false,
                type: 'GET',
                url: '/NhomHang/CheckInsert',
                success: function (res) {
                    if (res.rs) {
                        data = JSON.stringify({ "data": dataNew_NhomHang });
                    }
                    else {
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
                type: 'GET',
                url: '/NhomHang/CheckUpdate',
                success: function (res) {
                    if (res.rs) {
                        data = JSON.stringify({ "data": dataOld_NhomHang });
                    }
                    else {
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
        if (confirm('Bạn chắc chắn muốn thêm/sửa các nhóm hàng hay không?')) {
            $.ajax({
                type: 'POST',
                url: '/NhomHang/Save',
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.rs) {
                        tbNhomHang.draw();
                        $('#excel-nhomhang').modal('hide');
                        resfreshJSTree();
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

    $('.search-date').datetimepicker({
        timepicker: false,
        format: 'd/m/Y',
        mask: true,
    });
    //#endregion
});