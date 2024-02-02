$(document).ready(function () {
 
    //#endregion

    //#region Ngân hàng
    //Datatable Ngân hàng
    let tbNganHang_filterValues = {};
    var tbNganHang = $('#table-nganhang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbNganHang_filterValues.draw = data.draw;
            tbNganHang_filterValues.search = data.search["value"];
            tbNganHang_filterValues.start = data.start;
            tbNganHang_filterValues.length = data.length;
            tbNganHang_filterValues.order = data.order[0].column;
            tbNganHang_filterValues.dir = data.order[0].dir;
            $.ajax({
                url: '/NganHang/LoadNganHang',
                method: 'GET',
                data: tbNganHang_filterValues,
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
                        if (tbNganHang_filterValues.draw != 1) {
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
            { "data": "CODE" },
            { "data": "NAME" },
            { "data": "ADDRESS" },
            { "data": "PHONE" },
            { "data": "ACCOWNER" },
            { "data": "ACCNUMBER" },
            { "data": "CONTACT" },
            { "data": "NOTE" },
            { "data": null, defaultContent: '' }, //chưa tìm thấy TK kế toán trong DB nên để null
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
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

        buttons: [
            {
                extend: 'excel',
                filename: 'Ngân hàng - Kim Thành',
                exportOptions: {
                    orthogonal: 'sort'
                },
                action: ExportAll
            }
        ],
    });

    //Click
    $('#table-nganhang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-nganhang tbody tr').not(this).removeClass('selected');
    });

    //DoubleClick
    $('#table-nganhang tbody').on('dblclick', 'tr', async function () {
        $(this).addClass('selected');
        $('#table-nganhang tbody tr').not(this).removeClass('selected');
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NganHang/CheckUpdate',
            success: function (res) {
                if (res.rs) {
                    LoadNganHang();
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

    //Thêm
    $('#btn-insert').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NganHang/CheckInsert',
            success: function (res) {
                if (res.rs) {
                    $('#them-ngan-hang input').each(function (index, e) {
                        $(e).val('');
                    })
                    $('#them-ngan-hang').removeClass('was-validated');
                    $('#them-ngan-hang').modal();
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
            url: '/NganHang/CheckUpdate',
            success: function (res) {
                if (res.rs) {
                    LoadNganHang();
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
            url: '/NganHang/CheckDelete',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-nganhang tbody tr.selected').attr('data-id') != undefined) {
                        let idNganHang = $('#table-nganhang tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa ngân hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/NganHang/DeleteNganHang?id=' + idNganHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbNganHang.ajax.reload();
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
                            text: 'Vui lòng chọn ngân hàng',
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
        tbNganHang.draw();
    });

    //Xuất (Excel)
    $('#btn-export').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NganHang/CheckExcel',
            success: function (res) {
                if (res.rs) {
                    tbNganHang.buttons('.buttons-excel').trigger();
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
    $('#btn-luu').on('click', function () {
        let $currentForm = $('#them-ngan-hang');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        let id = $('#them-ngan-hang input[name = "idNganHang"]').val();
        let code = $('#them-ngan-hang input[name = "codeNganHang"]').val();
        let name = $('#them-ngan-hang input[name = "nameNganHang"]').val();
        let address = $('#them-ngan-hang input[name = "addressNganHang"]').val();
        let phone = $('#them-ngan-hang input[name = "phoneNganHang"]').val();
        let accNumber = $('#them-ngan-hang input[name = "accNumberNganHang"]').val();
        let accOwner = $('#them-ngan-hang input[name = "accOwnerNganHang"]').val();
        let contact = $('#them-ngan-hang input[name = "contactNganHang"]').val();
        let note = $('#them-ngan-hang textarea[name = "noteNganHang"]').val();

        let data = new FormData();
        data.append("idNganHang", id);
        data.append("codeNganHang", code);
        data.append("nameNganHang", name);
        data.append("addressNganHang", address);
        data.append("phoneNganHang", phone);
        data.append("accNumberNganHang", accNumber);
        data.append("accOwnerNganHang", accOwner);
        data.append("contactNganHang", contact);
        data.append("noteNganHang", note);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/NganHang/InsertUpdateNganHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbNganHang.ajax.reload();
                    $('#them-ngan-hang').modal('hide');
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

    //Function Load chi tiết Ngân hàng
    async function LoadNganHangInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/NganHang/LoadNganHangInfo?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        });
    };

    //Function Load Ngân hàng
    function LoadNganHang() {
        let id = $('#table-nganhang tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadNganHangInfo(id).then((rs) => {
                $('#them-ngan-hang input[name = "idNganHang"]').val(rs.data.ID);
                $('#them-ngan-hang input[name = "codeNganHang"]').val(rs.data.Code);
                $('#them-ngan-hang input[name = "nameNganHang"]').val(rs.data.Name);
                $('#them-ngan-hang input[name = "addressNganHang"]').val(rs.data.Address);
                $('#them-ngan-hang input[name = "phoneNganHang"]').val(rs.data.Phone);
                $('#them-ngan-hang input[name = "accNumberNganHang"]').val(rs.data.AccNumber);
                $('#them-ngan-hang input[name = "accOwnerNganHang"]').val(rs.data.AccOwner);
                $('#them-ngan-hang input[name = "contactNganHang"]').val(rs.data.Contact);
                $('#them-ngan-hang textarea[name = "noteNganHang"]').val(rs.data.Note);

                $('#them-ngan-hang').removeClass('was-validated');
                $('#them-ngan-hang').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn ngân hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }
    //#endregion

    //Function Export toàn bộ Row cho Datatable
    function ExportAll(e, dt, button, config) {
        var self = this;
        var oldStart = dt.settings()[0]._iDisplayStart;
        dt.one('preXhr', function (e, s, data) {
            // Just this once, load all data from the server...
            data.start = 0;
            data.length = 2147483647;
            dt.one('preDraw', function (e, settings) {
                // Call the original action function
                if (button[0].className.indexOf('buttons-copy') >= 0) {
                    $.fn.dataTable.ext.buttons.copyHtml5.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-excel') >= 0) {
                    $.fn.dataTable.ext.buttons.excelHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.excelHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.excelFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-csv') >= 0) {
                    $.fn.dataTable.ext.buttons.csvHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.csvHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.csvFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-pdf') >= 0) {
                    $.fn.dataTable.ext.buttons.pdfHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.pdfHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.pdfFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-print') >= 0) {
                    $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
                }
                dt.one('preXhr', function (e, s, data) {
                    // DataTables thinks the first item displayed is index 0, but we're not drawing that.
                    // Set the property to what it was before exporting.
                    settings._iDisplayStart = oldStart;
                    data.start = oldStart;
                });
                // Reload the grid with the original page. Otherwise, API functions like table.cell(this) don't work properly.
                setTimeout(dt.ajax.reload, 0);
                // Prevent rendering of the full data to the DOM
                return false;
            });
        });
        // Requery the server with the new one-time export settings
        dt.ajax.reload();
    };
});