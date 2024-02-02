$(document).ready(function () {

    let tbDonVi_filterValues = {};
    var tbDonVi = $('#table-donvi').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbDonVi_filterValues.draw = data.draw;
            tbDonVi_filterValues.search = data.search["value"];
            tbDonVi_filterValues.start = data.start;
            tbDonVi_filterValues.length = data.length;
            tbDonVi_filterValues.order = data.order[0].column;
            tbDonVi_filterValues.dir = data.order[0].dir;
            $.ajax({
                url: '/DonVi/LoadDonVi',
                method: 'GET',
                data: tbDonVi_filterValues,
                success: function (msg) {
                    console.log(msg);
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
                        if (tbDonVi_filterValues.draw != 1) {
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
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" }
        ],
        //scroller: {
        //    loadingIndicator: true,
        //    displayBuffer: 15
        //},

        buttons: [
            {
                extend: 'excel',
                filename: 'Đơn vị - Kim Thành',
                exportOptions: {
                    orthogonal: 'sort'
                },
                action: ExportDonVi
            },
            {
                extend: 'print',
                filename: 'Đơn vị - Kim Thành',
                exportOptions: {
                    orthogonal: 'sort'
                },
                action: ExportDonVi
            }
        ],

        searching: true,
        paging: true,
        lengthChange: false
    });

    $('#table-donvi tbody').on('click', 'tr', async function () {
        $(this).addClass('selected');
        $('#table-donvi tbody tr').not(this).removeClass('selected');
    });

    //Xử lý nút nạp
    $('#btn-nap-donvi').on('click', function () {
        tbDonVi.columns.adjust().draw();  // Làm mới lại
    });

    //Xử lý nút thêm đơn vị
    $('#btn-them-donvi').click(function () {
        $('#them-dvt input').val('');
        $('#them-dvt').modal();
    });

    //Xử lý nút sửa
    $('#btn-fix-donvi').click(function () {
        LoadDonVi();
    });

    //Double click to update
    $('#table-donvi tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-donvi tbody tr').not(this).removeClass('selected');
        let id = $('#table-donvi tbody tr.selected').attr('data-id');
        LoadSelectDonVi();
        $('#them-mat-hang select[name="unitID"]').val(id);
        $('#don-vi-tinh').modal('hide');
    });

    let dvten = $('#them-dvt input[name="dv-ten"]');  // Tên đơn vị
    let dvghichu = $('#them-dvt input[name="dv-ghichu"]');  // ghichú đơn vị
    //lấy chi tiết mặt hàng
    function LoadDonVi() {
        let id = $('#table-donvi tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadDetail(id).then((rs) => {
                dvten.val(rs.data[0].TEN);  // Tên đơn vị
                dvghichu.val(rs.data[0].GHICHU); //ghichú đơn vị
                $('#them-dvt').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn đơn vị!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    }
    async function LoadDetail(ID) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/DonVi/LoadDetail?ID=' + ID,
            success: function (msg) {
                return msg.data;
            }
        })
    }

    function ckstring(str) { //check null empty
        return (!str || /^\s*$/.test(str));
    }
    //Xử lý nút ghi
    $('#btn-save-donvi').click(function () {
        let id = $('#table-donvi tbody tr.selected').attr('data-id'); //ID để update

        let url = "/DonVi/InsertUpdate";
        if (ckstring(dvten.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập tên đơn vị!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            dvten.focus();
            return;
        }
        if (ckstring(dvghichu.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập ghi chú!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            dvghichu.focus();
            return;
        }

        let data = new FormData();
        data.append("ID", id);
        data.append("TEN", dvten.val());
        data.append("GHICHU", dvghichu.val());

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
                    tbDonVi.ajax.reload();
                    $('#them-dvt').modal('hide');
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
            error: function (error) {
                console.log('e');
            }
        });
    });

    function LoadSelectDonVi() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/DonVi/LoadListUnit',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].TEN, d[i].ID);
                        unitID.append(o);
                    }
                }
            }
        })
    }
    //Xử lý nút delete
    $('#btn-del-donvi').click(function () {
        let id = $('#table-donvi tbody tr.selected').attr('data-id');
        if (id != undefined) {
            if (confirm('Bạn có muốn xóa đơn vị này?')) {
                $.ajax({
                    async: true,
                    method: 'GET',
                    url: '/DonVi/Delete?ID=' + id,
                    success: function (msg) {
                        if (msg.rs) {
                            tbDonVi.ajax.reload();
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
                text: 'Vui lòng chọn đơn vị!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });

    //Xuất (Excel)
    $('#btn-xuat-donvi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/DonVi/CheckExcel',
            success: function (res) {
                if (res.rs) {
                    tbDonVi.buttons('.buttons-excel').trigger();
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

    //Function Export toàn bộ Row cho Datatable
    function ExportDonVi(e, dt, button, config) {
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