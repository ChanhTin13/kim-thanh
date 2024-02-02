$(document).ready(function () {
    let tbDiaChi_filterValues = {};
    $('#table-dia-chi thead tr').clone(true).appendTo('#table-dia-chi thead');
    $('#table-dia-chi thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-dia-chi="' + i + '"/>');
        }
    });
    var tbDiaChi = $('#table-dia-chi').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbDiaChi_filterValues.draw = data.draw;
            tbDiaChi_filterValues.search = data.search["value"];
            tbDiaChi_filterValues.start = data.start;
            tbDiaChi_filterValues.length = data.length;
            tbDiaChi_filterValues.order = data.order[0].column;
            tbDiaChi_filterValues.dir = data.order[0].dir;

            tbDiaChi_filterValues.search1 = $('input[data-search-dia-chi=1]').val();
            tbDiaChi_filterValues.search2 = $('input[data-search-dia-chi=2]').val();
            tbDiaChi_filterValues.search3 = $('input[data-search-dia-chi=3]').val();
            tbDiaChi_filterValues.search4 = $('input[data-search-dia-chi=4]').val();
            $.ajax({
                url: '/DiaChi/LoadDiaChi',
                method: 'GET',
                data: tbDiaChi_filterValues,
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
                        if (tbDiaChi_filterValues.draw != 1) {
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
            $(nRow).attr('data-id', data.ID);
            if (iDataIndex === 0) {
                $(nRow).addClass('selected');
            };
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "CODE" },
            { "data": "NAME" },
            { "data": "MATCHCODE" },
            { "data": "PATH" }
        ],
        columnDefs: [
            { targets: [0], orderable: true }
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollX: true,
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

    $(tbDiaChi.table().container()).on('keyup change', 'thead input', function (e) {
        tbDiaChi.draw();
    });

    let idDiaChi = $('#form-them-diachi input[name="idDiaChi"]');
    let parentIDDiaChi = $('#form-them-diachi input[name="parentIDDiachi"]');
    let maDiaChi = $('#form-them-diachi input[name="maDiaChi"]');
    let tenDiaChi = $('#form-them-diachi input[name="tenDiaChi"]');
    let moTaDiaChi = $('#form-them-diachi textarea[name="moTaDiaChi"]');
    let ghiChuDiaChi = $('#form-them-diachi textarea[name="ghiChuDiaChi"]');
    let maRutGonDiaChi = $('#form-them-diachi input[name="maRutGon"]');
    let aliasDiaChi = $('#form-them-diachi input[name="aliasDiaChi"]');

    $('#table-dia-chi tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-dia-chi tbody tr').not(this).removeClass('selected');
        idDiaChi.val("");
        parentIDDiaChi.val(1);
    });
 
    //Xử lý nút nạp
    $('#btn-reset-dia-chi').on('click', function () {
        tbDiaChi.draw();
        LoadDataDiaChi();
        resfreshJSTree();
    });

    $('#btn-insert-dia-chi').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DiaChi/CheckInsert',
            success: function (res) {
                if (res.rs) {
                    $('#btn-insert-dia-chi').addClass('disabled');
                    $('#btn-update-dia-chi').addClass('disabled');
                    $('#btn-delete-dia-chi').addClass('disabled');
                    $('#btn-save-dia-chi').removeClass('disabled');

                    $('#jstree').addClass('disabled-dia-chi');
                    $('#table-dia-chi_wrapper').addClass('disabled-dia-chi');

                    $('#title-dia-chi').text('Địa chỉ');

                    parentIDDiaChi.val(idDiaChi.val());
                    if (parentIDDiaChi.val() == "") {
                        parentIDDiaChi.val(1);
                    };

                    $('#form-them-diachi input').not(parentIDDiaChi).each(function (index, e) {
                        $(e).val('');
                        $(e).removeAttr('disabled');
                    });
                    $('#form-them-diachi textarea').each(function (index, e) {
                        $(e).val('');
                        $(e).removeAttr('disabled');
                    });

                    $('#form-them-diachi').removeClass('was-validated');

                    if (parentIDDiaChi.val() != 1) {
                        LoadChiTietDiaChi($('#table-dia-chi tbody tr.selected').attr('data-id')).then((rs) => {
                            maDiaChi.val('Child of ' + (rs.data.CODE));
                            tenDiaChi.val(rs.data.NAME);
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

    $('#btn-prev-dia-chi').click(function () {
        LoadDataDiaChi();
    });

    //Xử lý nút ghi
    $('#btn-save-dia-chi').click(function () {
        let $currentForm = $('#form-them-diachi');
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
        data.append("ID", idDiaChi.val());
        data.append("PARENTID", parentIDDiaChi.val());
        data.append("CODE", maDiaChi.val());
        data.append("NAME", tenDiaChi.val());
        data.append("MOTA", moTaDiaChi.val());
        data.append("GHICHU", ghiChuDiaChi.val());
        data.append("MATCHCODE", maRutGonDiaChi.val());
        data.append("ALIAS", aliasDiaChi.val());

        let url = '';
        if (idDiaChi.val() != "") {
            url = "/DiaChi/Update";
        } else {
            url = "/DiaChi/Insert";
        }
        
        $.ajax({
            async: false,
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbDiaChi.ajax.reload();
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                    resfreshJSTree();
                    LoadDataDiaChi();
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
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Double click to update
    $('#table-dia-chi tbody').on('dblclick', 'tr', async function () {
        $(this).addClass('selected');
        $('#table-dia-chi tbody tr').not(this).removeClass('selected');
        LoadChiTietDiaChi($(this).attr('data-id')).then((rs) => {
            idDiaChi.val(rs.data.ID);
            parentIDDiaChi.val(rs.data.PARENTID);
            maDiaChi.val(rs.data.CODE);
            maRutGonDiaChi.val(rs.data.MATCHCODE);
            tenDiaChi.val(rs.data.NAME);
            aliasDiaChi.val(rs.data.ALIAS);
            moTaDiaChi.val(rs.data.MOTA);
            ghiChuDiaChi.val(rs.data.GHICHU);
            //path.val(rs.data.PATH);

            $('#title-dia-chi').text(rs.data.PATH);
            $('#form-them-diachi').removeClass('was-validated');
        });
    });

    //Cập nhật địa chỉ
    $('#btn-update-dia-chi').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DiaChi/CheckUpdate',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-dia-chi tbody tr.selected').attr('data-id') != undefined) {
                        $('#btn-insert-dia-chi').addClass('disabled');
                        $('#btn-update-dia-chi').addClass('disabled');
                        $('#btn-delete-dia-chi').addClass('disabled');
                        $('#btn-save-dia-chi').removeClass('disabled');

                        $('#form-them-diachi input').not($(parentIDDiaChi)).not($(idDiaChi)).each(function (index, e) {
                            $(e).val('');
                            $(e).removeAttr('disabled');
                        });
                        $('#form-them-diachi textarea').each(function (index, e) {
                            $(e).val('');
                            $(e).removeAttr('disabled');
                        });

                        LoadChiTietDiaChi($('#table-dia-chi tbody tr.selected').attr('data-id')).then((rs) => {
                            idDiaChi.val(rs.data.ID);
                            parentIDDiaChi.val(rs.data.PARENTID);
                            maDiaChi.val(rs.data.CODE);
                            maRutGonDiaChi.val(rs.data.MATCHCODE);
                            tenDiaChi.val(rs.data.NAME);
                            aliasDiaChi.val(rs.data.ALIAS);
                            moTaDiaChi.val(rs.data.MOTA);
                            ghiChuDiaChi.val(rs.data.GHICHU);

                            $('#jstree').addClass('disabled-dia-chi');
                            $('#table-dia-chi_wrapper').addClass('disabled-dia-chi');

                            $('#title-dia-chi').text(rs.data.PATH);
                            $('#form-them-diachi').removeClass('was-validated');
                        });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn địa chỉ',
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

    //Xử lý nút delete
    $('#btn-delete-dia-chi').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DiaChi/CheckDelete',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-dia-chi tbody tr.selected').attr('data-id') != undefined) {
                        let idDiaChi = $('#table-dia-chi tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa địa chỉ này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/DiaChi/Delete?id=' + idDiaChi,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbDiaChi.ajax.reload();
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
                            text: 'Vui lòng chọn địa chỉ',
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

    //In (Print)
    $('#btn-print-dia-chi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DiaChi/CheckPrint',
            success: function (res) {
                if (res.rs) {
                    //tbDiaChi.buttons('.buttons-print').trigger();
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
    $('#btn-export-dia-chi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DiaChi/CheckExcel',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbDiaChi_filterValues.draw;
                    filterReport.search = tbDiaChi_filterValues.search;
                    filterReport.start = tbDiaChi_filterValues.start;
                    filterReport.length = tbDiaChi_filterValues.length;
                    filterReport.order = tbDiaChi_filterValues.order;
                    filterReport.dir = tbDiaChi_filterValues.dir;
                    filterReport.parentID = 0;
                    filterReport.export = 1;
                    var link = `/DiaChi/LoadDiaChi?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&parentID=` + filterReport.parentID + `&export=` + filterReport.export;
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

    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục
    $(function () {
        $.ajax({
            async: true,
            type: "GET",
            url: "/DiaChi/Tree",
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
        });
    };

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('#jstree').jstree(true).settings.core.data = { 'url': '/DiaChi/Tree' };;
        $('#jstree').jstree(true).refresh();
    };

    //Event click nodes
    $('#jstree').on('activate_node.jstree', function (e, data) {
        var path = data.instance.get_path(data.node, '\\');
        $('#title').text(path);
        var parentid = (data.instance.get_node(data.node.parent).id) == "#" ? 0 : data.instance.get_node(data.node.parent).id
        parentIDDiaChi.val(parentid);
        idDiaChi.val($('#jstree').jstree('get_selected')[0]);
        tbDiaChi_filterValues.parentID = $('#jstree').jstree('get_selected')[0];
        tbDiaChi.draw();
    });
    //#endregion

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

    //Function load lại trang
    function LoadDataDiaChi() {
        $('#btn-insert-dia-chi').removeClass('disabled');
        $('#btn-update-dia-chi').removeClass('disabled');
        $('#btn-delete-dia-chi').removeClass('disabled');
        $('#btn-save-dia-chi').addClass('disabled');

        $('#jstree').removeClass('disabled-dia-chi');
        $('#table-dia-chi_wrapper').removeClass('disabled-dia-chi');

        $('#title-dia-chi').text('Địa chỉ');

        $('#form-them-diachi input').each(function (index, e) {
            $(e).val('');
            $(e).attr('disabled', 'disabled');
        });
        $('#form-them-diachi textarea').each(function (index, e) {
            $(e).val('');
            $(e).attr('disabled', 'disabled');
        });
    }

    $('#danh-sach-dia-chi').on('shown.bs.modal', function () {
        tbDiaChi.draw();
    });
})