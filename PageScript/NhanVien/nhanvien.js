$(document).ready(function () {
    //#region Nhân viên
    let idNV = $('#them-nhan-vien input[name="idNV"]');
    let maNV = $('#them-nhan-vien input[name="maNV"]');
    let tenNV = $('#them-nhan-vien input[name="tenNV"]');
    let ngaySinhNV = $('#them-nhan-vien input[name="ngaySinhNV"]');
    let gioiTinhNV = $('#them-nhan-vien select[name="slGioiTinhNV"]');
    let chucVuNV = $('#them-nhan-vien input[name="chucVuNV"]');
    let luongNV = $('#them-nhan-vien input[name="luongNV"]');
    let soCMNDNV = $('#them-nhan-vien input[name="soCMNDNV"]');
    let diaChiNV = $('#them-nhan-vien input[name="diaChiNV"]');
    let dienThoaiNV = $('#them-nhan-vien input[name="dienThoaiNV"]');
    let diDongNV = $('#them-nhan-vien input[name="diDongNV"]');
    let emailNV = $('#them-nhan-vien input[name="emailNV"]');
    let slShowRoom = $('#them-nhan-vien select[name="slShowRoom"]');
    let slNhomNhanVien = $('#them-nhan-vien select[name="slNhomNhanVien"]');
    let queQuanNV = $('#them-nhan-vien input[name="queQuanNV"]');
    let giaDinhNV = $('#them-nhan-vien input[name="giaDinhNV"]');
    let theoDoiNV = $('#them-nhan-vien input[name="theoDoiNV"]');

    $('#table-nv thead tr').clone(true).appendTo('#table-nv thead');
    $('#table-nv thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 5) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nv="' + i + '" /> ');
        }
        else if (i == 6) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-nv', i);
            var data6 = [{ key: '--Giới tính--', value: '' },
            { key: 'Nam', value: 'nam' },
            { key: 'Nữ', value: 'nu' }];
            data6.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 10) {
            var y = document.createElement("SELECT");
            y.setAttribute('data-search-nv', i);
            var data10 = [{ key: '--Theo dõi--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data10.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                y.options.add(op)
            })
            $(this).html(y);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nv="' + i + '"/>');
        }
    });

    //Datatable Nhân Viên
    let tbStaff_filterValues = {};
    var tbStaff = $('#table-nv').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbStaff_filterValues.search1 = $('input[data-search-nv=1]').val();
            tbStaff_filterValues.search2 = $('input[data-search-nv=2]').val();
            tbStaff_filterValues.search3 = $('input[data-search-nv=3]').val();
            tbStaff_filterValues.search4 = $('input[data-search-nv=4]').val();
            tbStaff_filterValues.search5 = $('input[data-search-nv=5]').val();
            tbStaff_filterValues.search6 = $('select[data-search-nv=6]').val();

            tbStaff_filterValues.search7 = $('input[data-search-nv=7]').val();
            tbStaff_filterValues.search8 = $('input[data-search-nv=8]').val();
            tbStaff_filterValues.search9 = $('input[data-search-nv=9]').val();
            tbStaff_filterValues.search10 = $('select[data-search-nv=10]').val();
            tbStaff_filterValues.search11 = $('input[data-search-nv=11]').val();
            tbStaff_filterValues.search12 = $('input[data-search-nv=12]').val();

            tbStaff_filterValues.draw = data.draw;
            tbStaff_filterValues.search = data.search["value"];
            tbStaff_filterValues.start = data.start;
            tbStaff_filterValues.length = data.length;
            tbStaff_filterValues.order = data.order[0].column;
            tbStaff_filterValues.dir = data.order[0].dir;
            tbStaff_filterValues.follow = $('#btn-theo-doi-nhan-vien').val();
            tbStaff_filterValues.export = 0;
            $.ajax({
                url: '/NhanVien/LoadStaff',
                method: 'GET',
                data: tbStaff_filterValues,
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
                    }
                    else if (msg.status == 3) {
                        if (tbStaff_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error-outline',
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
            { "data": "NVCODE" },
            { "data": "NVTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
            { "data": "NgaySinh" },
            { "data": "GIOITINH" },
            { "data": "CHUCVU" },
            { "data": "LUONGCOBAN" },
            { "data": "CMTND" },
            {
                "data": "THEODOI",
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
            { "data": "QLID" },
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.NVID);
            $(nRow).attr('data-dt-row', iDataIndex);
            let ngaySinh = data.NgaySinh;
            let luong = data.LUONGCOBAN;
            
            //$($(nRow).children()[0]).html(iDataIndex+1);
            $($(nRow).children()[5]).html(moment(ngaySinh).format('DD/MM/yyyy'));
            $($(nRow).children()[8]).html(luong == null ? 0 : convertCurrency(luong));
        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 3,
        },

        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 30//10 nhân cho 3 bằng 30
        },
        "dom": '<"pull-left"f><"pull-right"l>tip',
        orderCellsTop: true
    });

    //Search header
    $(tbStaff.table().container()).on('change', 'thead input', function (e) {
        var stringtr = 'input[data-search-nv=' + $(this).data('search-nv') + ']';
        $(stringtr).val($(this).val());
        if (e.keyCode == 13) {
            tbStaff.draw();
        }
        tbStaff.draw();
    });
    $(tbStaff.table().container()).on('change', 'thead select', function () {
        tbStaff.draw();
    });

    //Click
    $('.ql-user tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.ql-user').find('tr').removeClass('selected');
        $(this).closest('.ql-user').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
        //$(this).addClass('selected');
    });

    //DoubleClick
    $('#table-nv tbody').on('dblclick', async function () {
        CheckUpdateStaff();
        LoadStaff();
        $('#them-nhan-vien').removeClass('was-validated');
        $('#them-nhan-vien').modal();
    });

    //Xử lý button "Hiển thị tất cả"/"Hiển thị đang theo dõi"
    var button = $('<button class="btn btn-secondary" tabindex="0" aria-controls="table-nv" type="button" id="btn-theo-doi-nhan-vien" value="-1"><span>Hiển thị đang theo dõi</span></button>');
    $('.pull-right').append(button);
    $('#btn-theo-doi-nhan-vien').click(function () {
        while ('#btn-theo-doi-nhan-vien') {
            if ($('#btn-theo-doi-nhan-vien').val() == '-1') {
                $('#btn-theo-doi-nhan-vien span').text('Hiển thị tất cả');
                $('#btn-theo-doi-nhan-vien').val('1');
                return tbStaff.draw();
            } else if ($('#btn-theo-doi-nhan-vien').val() == '1') {
                $('#btn-theo-doi-nhan-vien span').text('Hiển thị đang theo dõi');
                $('#btn-theo-doi-nhan-vien').val('-1');
                return tbStaff.draw();
            }
        }
    });

    //Update
    $("#btn-update-nhan-vien").click(function () {
        CheckUpdateStaff();
        LoadStaff();
    });

    //Insert
    $('#btn-insert-nhan-vien').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckInsertStaff',
            success: function (msg) {
                if (msg.rs) {
                    $('#btn-save-nhan-vien').removeAttr('disabled');
                    maNV.attr('disabled', false);
                    $('#them-nhan-vien input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-nhan-vien').removeClass('was-validated');
                    $('#them-nhan-vien select').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-nhan-vien input[type = "checkbox"]').prop('checked', true);
                    ngaySinhNV.val(moment(new Date()).format('DD/MM/yyyy'));
                    gioiTinhNV.val(1);
                    slShowRoom.val(0).trigger('change.select2');
                    slNhomNhanVien.val(0).trigger('change.select2');

                    $(function () {
                        $.ajax({
                            async: true,
                            type: "GET",
                            url: "/NhanVien/IdentityIDStaff",
                            dataType: "json",
                            success: function (msg) {
                                maNV.val(msg.kq);
                            },

                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.status);
                                alert(thrownError);
                            }
                        });
                    });

                    $('#them-nhan-vien').modal();
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
        });
    });

    //Save
    $('#btn-save-nhan-vien').click(function () {
        let $currentForm = $('#them-nhan-vien');
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
        data.append("NVID", idNV.val());
        data.append("NVCODE", maNV.val());
        data.append("NVTEN", tenNV.val());
        data.append("NGAYSINH", ngaySinhNV.val());
        data.append("GIOITINH", gioiTinhNV.find('option:selected').text());
        data.append("CHUCVU", chucVuNV.val());
        data.append("LUONGCOBAN", luongNV.val());
        data.append("CMTND", soCMNDNV.val());
        data.append("DIACHI", diaChiNV.val());
        data.append("DIENTHOAI", dienThoaiNV.val());
        data.append("DIDONG", diDongNV.val());
        data.append("EMAIL", emailNV.val());
        data.append("SRID", slShowRoom.find('option:selected').val());
        data.append("NVNID", slNhomNhanVien.find('option:selected').val());
        data.append("QUEQUAN", queQuanNV.val());
        data.append("GIADINH", giaDinhNV.val());
        data.append("THEODOI", theoDoiNV.prop('checked'));
        $.ajax({
            async: false,
            type: 'POST',
            url: '/NhanVien/InsertUpdateStaff',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbStaff.ajax.reload();
                    $('#them-nhan-vien').modal('hide');
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Delete
    $('#btn-delete-nhan-vien').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckDeleteStaff',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-nv tbody tr.selected').attr('data-id') != undefined) {
                        let idStaff = $('#table-nv tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa nhân viên này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/NhanVien/DeleteStaff?id=' + idStaff,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbStaff.ajax.reload();
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
                            text: 'Vui lòng chọn nhân viên',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
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
        });
    });

    //Excel
    $('#btn-export-nhan-vien').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckExcelStaff',
            success: function (msg) {
                if (msg.rs) {
                    var filterReport = {};
                    filterReport.draw = tbStaff_filterValues.draw;
                    filterReport.search = tbStaff_filterValues.search;
                    filterReport.start = tbStaff_filterValues.start;
                    filterReport.length = tbStaff_filterValues.length;
                    filterReport.order = tbStaff_filterValues.order;
                    filterReport.dir = tbStaff_filterValues.dir;
                    filterReport.follow = $('#btn-theo-doi-nhan-vien').val();
                    filterReport.export = 1;

                    filterReport.search1 = tbStaff_filterValues.search1
                    filterReport.search2 = tbStaff_filterValues.search2
                    filterReport.search3 = tbStaff_filterValues.search3
                    filterReport.search4 = tbStaff_filterValues.search4
                    filterReport.search5 = tbStaff_filterValues.search5
                    filterReport.search6 = tbStaff_filterValues.search6

                    filterReport.search7 = tbStaff_filterValues.search7
                    filterReport.search8 = tbStaff_filterValues.search8
                    filterReport.search9 = tbStaff_filterValues.search9
                    filterReport.search10 = tbStaff_filterValues.search10
                    filterReport.search11 = tbStaff_filterValues.search11
                    filterReport.search12 = tbStaff_filterValues.search12
                    var link = `/NhanVien/LoadStaff?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&follow=` + filterReport.follow + `&export=` + filterReport.export +
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
                        `&search11=` + filterReport.search11 +
                        `&search12=` + filterReport.search12;
                    window.open(link);
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
        });

    });

    //Print
    $('#btn-print-nhan-vien').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckPrintStaff',
            success: function (msg) {
                if (msg.rs) {
                    //tbStaff.buttons('.buttons-print').trigger();
                } else {
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

    //Function Load nhân viên
    function LoadStaff() {
        let id = $('#table-nv tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadStaffInfo(id).then((rs) => {
                idNV.val(rs.data.NVID);
                maNV.val(rs.data.NVCODE);
                maNV.attr('disabled', true);
                tenNV.val(rs.data.NVTEN);
                ngaySinhNV.val(moment(rs.data.NGAYSINH).format('DD/MM/yyyy'));
                gioiTinhNV.val(rs.data.GIOITINH == 'Nam' ? 1 : 2);
                chucVuNV.val(rs.data.CHUCVU);
                luongNV.val(rs.data.LUONGCOBAN);
                soCMNDNV.val(rs.data.CMTND);
                diaChiNV.val(rs.data.DIACHI);
                dienThoaiNV.val(rs.data.DIENTHOAI);
                diDongNV.val(rs.data.DIDONG);
                emailNV.val(rs.data.EMAIL);
                if (rs.data.SRID === '00000000-0000-0000-0000-000000000000' || rs.data.SRID === null || rs.data.SRID === "null") {
                    slShowRoom.val(0).trigger('change.select2');
                }
                else {
                    slShowRoom.val(rs.data.SRID).trigger('change.select2');
                }
                if (rs.data.NVNID === '00000000-0000-0000-0000-000000000000' || rs.data.NVNID === null || rs.data.NVNID === "null") {
                    slNhomNhanVien.val(0).trigger('change.select2');
                }
                else {
                    slNhomNhanVien.val(rs.data.NVNID).trigger('change.select2');
                }
                queQuanNV.val(rs.data.QUEQUAN);
                giaDinhNV.val(rs.data.GIADINH);
                theoDoiNV.prop('checked', rs.data.THEODOI);

                $('#them-nhan-vien').removeClass('was-validated');
                $('#them-nhan-vien').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhân viên',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }

    //Funciotn Load chi tiết nhân viên
    async function LoadStaffInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/NhanVien/LoadStaffInfo?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };

    //Function kiểm tra update
    function CheckUpdateStaff() {
        return $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckUpdateStaff',
            success: function (msg) {
                if (msg.rs) {
                    $('#btn-save-nhan-vien').removeAttr('disabled');
                }
                else {
                    $('#btn-save-nhan-vien').attr('disabled', 'disabled');
                }
            }
        });
    }
    //#endregion

    //#region Nhóm nhân viên
    let idNhomNhanVien = $('#form-add-group-user input[name="idNhomNhanVien"]');
    let tenNhomNhanVien = $('#form-add-group-user input[name="tenNhomNhanVien"]');
    let ghiChuNhomNhanVien = $('#form-add-group-user textarea[name="ghiChuNhomNhanVien"]');
    let commissionNhomNhanVien = $('#form-add-group-user input[name="commissionNhomNhanVien"]');
    //Datatable Nhóm nhân viên
    let tbStaffGroup_filterValues = {};

    $('#table-nhom-nv thead tr').clone(true).appendTo('#table-nhom-nv thead');
    $('#table-nhom-nv thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nhom-nv="' + i + '"/>');
        }
    });

    let dsNNV = [];
    var tbStaffGroup = $('#table-nhom-nv').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbStaffGroup_filterValues.draw = data.draw;
            tbStaffGroup_filterValues.search = data.search["value"];
            tbStaffGroup_filterValues.start = data.start;
            tbStaffGroup_filterValues.length = data.length;
            tbStaffGroup_filterValues.order = data.order[0].column;
            tbStaffGroup_filterValues.dir = data.order[0].dir;

            tbStaffGroup_filterValues.search1 = $('input[data-search-nhom-nv=1]').val();
            tbStaffGroup_filterValues.search2 = $('input[data-search-nhom-nv=2]').val();
            tbStaffGroup_filterValues.search3 = $('input[data-search-nhom-nv=3]').val();

            tbStaffGroup_filterValues.export = 0;
            $.ajax({
                url: '/NhanVien/LoadStaffGroup',
                method: 'GET',
                data: tbStaffGroup_filterValues,
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
                    }
                    else if (msg.status == 3) {
                        if (tbStaffGroup_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error-outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            location.reload();
                            return false;
                        }
                    } else {
                        dsNNV = $.map(msg.data, function (obj) {
                            obj.id = obj.NVNID;
                            obj.text = obj.TEN;
                            return obj
                        });
                        slNhomNhanVien.select2({
                            data: dsNNV,
                            dropdownParent: $('#them-nhan-vien')
                        });
                    }
                },
            }).done(callback, () => {
                
            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" },
            { "data": "COMMISSION" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.NVNID);
            let comm = data.COMMISSION;
            $($(nRow).children()[3]).html(convertCurrency(comm));
        },

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
        "dom": 'lrtip',
        orderCellsTop: true
    });

    $(tbStaffGroup.table().container()).on('keyup', 'thead input', function (e) {
        tbStaffGroup.draw();
    });

    $('#btn-nhom-nhan-vien').on('click', function () {
        $('#them-nhom-nv').modal();
    });

    //Click
    $(document).on('click', '#table-nhom-nv tbody tr', function () {
        $(this).addClass('selected');
        $('#table-nhom-nv tbody tr').not(this).removeClass('selected');
    });

    //DoubleClick
    $('#table-nhom-nv tbody').on('dblclick', 'tr', function () {
        tbStaffGroup.ajax.reload();
        $('#them-nhom-nv').modal('hide');
        let idNV = $(this).attr('data-id');
        slNhomNhanVien.find('option[value = "' + idNV + '"]').prop('selected', true);
    });

    //Update
    $("#btn-update-nhom-nhan-vien").click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckUpdateStaffGroup',
            success: function (msg) {
                if (msg.rs) {
                    LoadStaffGroup();
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
        });
    });

    //Insert
    $('#btn-insert-nhom-nhan-vien').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckInsertStaffGroup',
            success: function (msg) {
                if (msg.rs) {
                    $('#form-add-group-user input ').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#form-add-group-user').removeClass('was-validated');
                    $('#form-add-group-user textarea').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#form-add-group-user').modal();
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
        });
    });

    //Save
    $('#btn-save-nhom-nhan-vien').click(function () {
        let $currentForm = $('#form-add-group-user');
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
        data.append("NVNID", idNhomNhanVien.val());
        data.append("TEN", tenNhomNhanVien.val());
        data.append("GHICHU", ghiChuNhomNhanVien.val());
        data.append("COMMISSION", commissionNhomNhanVien.val());
        $.ajax({
            async: false,
            type: 'POST',
            url: '/NhanVien/InsertUpdateStaffGroup',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    slNhomNhanVien.empty();
                    tbStaffGroup.ajax.reload();
                    $('#form-add-group-user').modal('hide');
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Delete
    $('#btn-delete-nhom-nhan-vien').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckDeleteStaffGroup',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-nhom-nv tbody tr.selected').attr('data-id') != undefined) {
                        let id = $('#table-nhom-nv tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa nhóm nhân viên này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/NhanVien/DeleteStaffGroup?id=' + id,
                                success: function (msg) {
                                    if (msg.rs) {
                                        slNhomNhanVien.empty();
                                        tbStaffGroup.ajax.reload();
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
                            text: 'Vui lòng chọn nhóm nhân viên',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
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
        });
    });

    //Xử lý button Xuất(Excel)
    $('#btn-export-nhom-nhan-vien').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/NhanVien/CheckExcelStaffGroup',
            success: function (msg) {
                if (msg.rs) {
                    var filterReport = {};
                    filterReport.draw = tbStaffGroup_filterValues.draw;
                    filterReport.search = tbStaffGroup_filterValues.search;
                    filterReport.start = tbStaffGroup_filterValues.start;
                    filterReport.length = tbStaffGroup_filterValues.length;
                    filterReport.order = tbStaffGroup_filterValues.order;
                    filterReport.dir = tbStaffGroup_filterValues.dir;

                    filterReport.search1 = tbStaffGroup_filterValues.search1;
                    filterReport.search2 = tbStaffGroup_filterValues.search2;
                    filterReport.search3 = tbStaffGroup_filterValues.search3;

                    filterReport.export = 1;
                    var link = `/NhanVien/LoadStaffGroup?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&follow=` + filterReport.follow +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&export=` + filterReport.export;
                    window.open(link);
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
        });
    });

    //Function Load nhóm nhân viên
    function LoadStaffGroup() {
        let id = $('#table-nhom-nv tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadStaffGroupInfo(id).then((rs) => {
                idNhomNhanVien.val(rs.data.NVNID);
                tenNhomNhanVien.val(rs.data.TEN);
                ghiChuNhomNhanVien.val(rs.data.GHICHU);
                commissionNhomNhanVien.val(rs.data.COMMISSION);
                $('#form-add-group-user').removeClass('was-validated');
                $('#form-add-group-user').modal();
            });
        }
        else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhóm nhân viên',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    };

    //Function Load chi tiết nhóm nhân viên
    async function LoadStaffGroupInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/NhanVien/LoadStaffGroupInfo?id=' + id,
            success: function (msg) {
                console.log(msg.data);
                return msg.data;
            },
        });
    };
    //#endregion

    $('#danh-sach-nv').on('shown.bs.modal', function () {
        tbStaff.draw();
    });
    $('#them-nhom-nv').on('shown.bs.modal', function () {
        tbStaffGroup.draw();
    });

    //Function load ShowRoom (<select>)
    ShowRoomNV();
    function ShowRoomNV() {
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
                    slShowRoom.select2({
                        data: dsSR,
                        dropdownParent: $('#them-nhan-vien')
                    });
                }
            },
        });
    };

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    //#region Nhập excel
    var dataNew_NhanVien = new Array();
    var tbNew_NhanVien = $('#table-nhan-vien-chua-co').DataTable({
        bInfo: false,
        data: dataNew_NhanVien,
        columns: [
            { "data": null },
            { "data": "codeStaff" },
            { "data": "nameStaff" },
            { "data": "address" },
            { "data": "phone" },
            { "data": "birthDay" },
            { "data": "gender" },
            { "data": "position" },
            { "data": "salary" },
            { "data": "identityCardNumber" },
            {
                "data": "follow",
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
            { "data": null, defaultContent: '' }, //Chưa hiểu người quản lý ???
            { "data": "note" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $($(nRow).children()[0]).html(iDataIndex + 1);
            $($(nRow).children()[5]).html(moment(data.birthDay).format('DD/MM/yyyy'));
            $($(nRow).children()[8]).html(data.salary == null ? 0 : convertCurrency(data.salary));
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
    var dataOld_NhanVien = new Array();
    var tbOld_NhanVien = $('#table-nhan-vien-da-co').DataTable({
        bInfo: false,
        data: dataOld_NhanVien,
        columns: [
            { "data": null },
            { "data": "codeStaff" },
            { "data": "nameStaff" },
            { "data": "address" },
            { "data": "phone" },
            { "data": "birthDay"},
            { "data": "gender" },
            { "data": "position" },
            { "data": "salary" },
            { "data": "identityCardNumber" },
            {
                "data": "follow",
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
                "data": null, defaultContent: ''
            }, //Chưa hiểu người quản lý ???
            { "data": "note" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $($(nRow).children()[0]).html(iDataIndex + 1);
            $($(nRow).children()[5]).html(moment(data.birthDay).format('DD/MM/yyyy'));
            $($(nRow).children()[8]).html(data.salary == null ? 0 : convertCurrency(data.salary));
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
    $("#btn-import-nhan-vien").on('click', function () {
        $('input[type="file"][name="excelNhanVien"]').click();
    });
    $('input[type="file"][name="excelNhanVien"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import_NhanVien(files[0], "", "");
        $(this).val('');
    });
    var dataOpt_NhanVien = [];
    //Function Import Excel
    async function Import_NhanVien(file, sheetName, url) {
        var slExcel = $('select[name="slExcel-nhanvien"]');
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/NhanVien/Import',
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
                                dataOpt_NhanVien.push(lstSheetName[i].Name);
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
                        dataNew_NhanVien = [];
                        for (var i = 0; i < lstNew.length; i++) {
                            dataNew_NhanVien.push(lstNew[i]);
                        }
                        tbNew_NhanVien.clear().columns.adjust().draw();
                        tbNew_NhanVien.rows.add(dataNew_NhanVien);
                        tbNew_NhanVien.columns.adjust().draw();

                        dataOld_NhanVien = [];
                        for (var i = 0; i < lstOld.length; i++) {
                            dataOld_NhanVien.push(lstOld[i]);
                        }
                        tbOld_NhanVien.clear().columns.adjust().draw();
                        tbOld_NhanVien.rows.add(dataOld_NhanVien);
                        tbOld_NhanVien.columns.adjust().draw();

                        if (dataNew_NhanVien.length > 0 || dataOld_NhanVien.length > 0) {
                            document.getElementsByClassName('count-new-nhan-vien')[0].innerHTML = dataNew_NhanVien.length;
                            document.getElementsByClassName('count-old-nhan-vien')[0].innerHTML = dataOld_NhanVien.length;
                            if (dataNew_NhanVien.length > 0 && dataOld_NhanVien.length > 0) {
                                $('.btn-save-nhan-vien-excel').removeAttr('disabled', 'disabled');
                            }
                            else if (dataNew_NhanVien.length > 0) {
                                $('.btn-save-nhan-vien-excel[value="0"]').removeAttr('disabled', 'disabled');
                            }
                            else if (dataOld_NhanVien.length > 0) {
                                $('.btn-save-nhan-vien-excel[value="1"]').removeAttr('disabled', 'disabled');
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
                        dataNew_NhanVien = [];
                        tbNew_NhanVien.clear().columns.adjust().draw();
                        tbNew_NhanVien.rows.add(dataNew_NhanVien);
                        tbNew_NhanVien.columns.adjust().draw();

                        dataOld_NhanVien = [];
                        tbOld_NhanVien.clear().columns.adjust().draw();
                        tbOld_NhanVien.rows.add(dataOld_NhanVien);
                        tbOld_NhanVien.columns.adjust().draw();

                        document.getElementsByClassName('count-new-nhan-vien')[0].innerHTML = 0;
                        document.getElementsByClassName('count-old-nhan-vien')[0].innerHTML = 0;

                        $('.btn-save-nhan-vien-excel').attr('disabled');

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
    $('select[name="slExcel-nhanvien"]').on('change', async function () {
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
            await Import_NhanVien("", name, url);
        }
    });
    //Reset
    $('#btn-reset-nhan-vien-excel').on('click', function () {
        $('input[type="file"][name="excelNhanVien"]').click();
    });
    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-nhan-vien-excel').on('click', function () {
        var link = `/NhanVien/Create`;
        window.open(link)
    });
    //Modal Show
    $('#excel-nhanvien').on('shown.bs.modal', function () {
        $('select[name="slExcel-nhanvien"]').children().remove().end();

        dataNew_NhanVien = [];
        tbNew_NhanVien.clear().columns.adjust().draw();
        tbNew_NhanVien.rows.add(dataNew_NhanVien);
        tbNew_NhanVien.columns.adjust().draw();

        dataOld_NhanVien = [];
        tbOld_NhanVien.clear().columns.adjust().draw();
        tbOld_NhanVien.rows.add(dataOld_NhanVien);
        tbOld_NhanVien.columns.adjust().draw();

        document.getElementsByClassName('count-new-nhan-vien')[0].innerHTML = 0;
        document.getElementsByClassName('count-old-nhan-vien')[0].innerHTML = 0;

        $('.btn-save-nhan-vien-excel').attr('disabled', 'disabled');
    });
    //Save
    $('button.btn-save-nhan-vien-excel').on('click', function () {
        let value = $(this).val();
        var data = null;
        let CheckQuyen = true;
        if (value == 0) {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/NhanVien/CheckInsertStaff',
                success: function (msg) {
                    if (msg.rs) {
                        for (var i = 0; i < dataNew_NhanVien.length; i++) {
                            if (dataNew_NhanVien[i].birthDay.includes("/Date")) {
                                dataNew_NhanVien[i].birthDay = moment(dataNew_NhanVien[i].birthDay).format('MM/DD/yyyy');
                            }
                        }
                        data = JSON.stringify({ "data": dataNew_NhanVien });
                    } else {
                        CheckQuyen = false;
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
        else {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/NhanVien/CheckUpdateStaff',
                success: function (msg) {

                    if (msg.rs) {
                        for (var i = 0; i < dataOld_NhanVien.length; i++) {
                            if (dataOld_NhanVien[i].birthDay.includes("/Date")) {
                                dataOld_NhanVien[i].birthDay = moment(dataOld_NhanVien[i].birthDay).format('MM/DD/yyyy');
                            }
                        }
                        data = JSON.stringify({ "data": dataOld_NhanVien });
                    } else {
                        CheckQuyen = false;
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

        if (CheckQuyen == true) {
            if (confirm('Bạn chắc chắn muốn thêm/sửa các nhân viên hay không?')) {
                $.ajax({
                    type: 'POST',
                    url: '/NhanVien/Save',
                    data: data,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (msg) {
                        if (msg.rs) {
                            tbStaff.draw();
                            $('#excel-nhanvien').modal('hide');
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
        }
        
    });

    $('.search-date').datetimepicker({
        timepicker: false,
        format: 'd/m/Y',
        mask: true,
    });
    //#endregion
});