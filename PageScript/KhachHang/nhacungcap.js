﻿$(document).ready(function () {
    //#region Nhà cung cấp
    let slKieuKH = $('#them-khach-hang select[name = "slKieuKH"]');
    let ngayTaoKH = $('#them-khach-hang input[name = "ngayTaoKH"]');
    ngayTaoKH.prop('disabled', true);
    let slNhomKhachHang = $('#them-khach-hang select[name = "slNhomKhachHang"]');
    let maKH = $('#them-khach-hang input[name = "maKH"]');
    let khachHangTiemNang = $('#them-khach-hang input[name = "khachHangTiemNang"]');
    let ghiChuKH = $('#them-khach-hang textarea[name = "ghiChuKH"]');
    let idKhachHang = $('#them-khach-hang input[name = "idKhachHang"]');
    let tenKhachHang = $('#them-khach-hang input[name = "tenKhachHang"]');
    let diaChiKH = $('#them-khach-hang input[name = "diaChiKH"]');
    let mobileKH = $('#them-khach-hang input[name = "mobileKH"]');
    let telephoneKH = $('#them-khach-hang input[name = "telephoneKH"]');
    let ngaySinhKH = $('#them-khach-hang input[name = "ngaySinhKH"]');
    let slGioiTinhKH = $('#them-khach-hang select[name = "slGioiTinhKH"]');
    let emailKH = $('#them-khach-hang input[name = "emailKH"]');
    let slHangTheKH = $('#them-khach-hang select[name = "slHangTheKH"]');
    let slHinhThucKH = $('#them-khach-hang select[name = "slHinhThucKH"]');
    let idDiaChiKH = $('#them-khach-hang input[name = "idDiaChiKH"]');
    let pathDiaChiKH = $('#them-khach-hang input[name = "pathDiaChiKH"]');

    let tenCongTyKH = $('#them-khach-hang input[name = "tenCongTyKH"]');
    let tenVietTatKH = $('#them-khach-hang input[name = "tenVietTatKH"]');
    let aliasKH = $('#them-khach-hang input[name = "aliasKH"]');
    let diaChiCongTyKH = $('#them-khach-hang input[name = "diaChiCongTyKH"]');
    let maSoThueKH = $('#them-khach-hang input[name = "maSoThueKH"]');
    let faxKH = $('#them-khach-hang input[name = "faxKH"]');
    let websiteKH = $('#them-khach-hang input[name = "websiteKH"]');
    let nguoiDaiDienKH = $('#them-khach-hang input[name = "nguoiDaiDienKH"]');
    let chucVuKH = $('#them-khach-hang input[name = "chucVuKH"]');

    let gioiHanNoKH = $('#them-khach-hang input[name = "gioiHanNoKH"]');
    let slGioiHanNoKH = $('#them-khach-hang select[name = "slGioiHanNoKH"]');
    let slGioiHanPhieuKH = $('#them-khach-hang select[name = "slGioiHanPhieuKH"]');
    let mucChietKhauKH = $('#them-khach-hang input[name = "mucChietKhauKH"]');
    let ngayTinhLaiKH = $('#them-khach-hang input[name = "ngayTinhLaiKH"]');

    let soTKKH = $('#them-khach-hang input[name = "soTKKH"]');
    let chuTKKH = $('#them-khach-hang input[name = "chuTKKH"]');
    let moTaiKH = $('#them-khach-hang input[name = "moTaiKH"]');

    let diaChiHoaDonKH = $('#them-khach-hang input[name = "diaChiHoaDonKH"]');
    let diaChiGiaoHang1KH = $('#them-khach-hang input[name = "diaChiGiaoHang1KH"]');
    let diaChiGiaoHang2KH = $('#them-khach-hang input[name = "diaChiGiaoHang2KH"]');

    let slShowRoomKH = $('#them-khach-hang select[name = "slShowRoomKH"]');
    let slNhanVienKH = $('#them-khach-hang select[name = "slNhanVienKH"]');
    let slKenhKhachHang = $('#them-khach-hang select[name = "slKenhKhachHang"]');
    let theoDoiKH = $('#them-khach-hang input[name = "theoDoiKH"]');


    $('#table-nhacungcap thead tr').clone(true).appendTo('#table-nhacungcap thead');
    $('#table-nhacungcap thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 5) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-nhacungcap', i);
            var data5 = [{ key: '--Theo dõi--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data5.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title + '" data-search-nhacungcap="' + i + '"/>');
        }
    });

    //Datatable Nhà cung cấp
    let tbNhaCungCap_filterValues = {};
    var tbNhaCungCap = $('#table-nhacungcap').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbNhaCungCap_filterValues.draw = data.draw;
            tbNhaCungCap_filterValues.search = data.search["value"];

            tbNhaCungCap_filterValues.search1 = $('input[data-search-nhacungcap=1]').val();
            tbNhaCungCap_filterValues.search2 = $('input[data-search-nhacungcap=2]').val();
            tbNhaCungCap_filterValues.search3 = $('input[data-search-nhacungcap=3]').val();
            tbNhaCungCap_filterValues.search4 = $('input[data-search-nhacungcap=4]').val();
            tbNhaCungCap_filterValues.search5 = $('select[data-search-nhacungcap=5]').val();
            tbNhaCungCap_filterValues.search6 = $('input[data-search-nhacungcap=6]').val();
            tbNhaCungCap_filterValues.search7 = $('input[data-search-nhacungcap=7]').val();
            //tbNhaCungCap_filterValues.search8 = $('input[data-search-nhacungcap=8]').val();
            
            tbNhaCungCap_filterValues.start = data.start;
            tbNhaCungCap_filterValues.length = data.length;
            tbNhaCungCap_filterValues.order = data.order[0].column;
            tbNhaCungCap_filterValues.dir = data.order[0].dir;
            tbNhaCungCap_filterValues.export = 0;
            $.ajax({
                url: '/KhachHang/LoadNhaCungCap',
                method: 'GET',
                data: tbNhaCungCap_filterValues,
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
                        if (tbNhaCungCap_filterValues.draw != 1) {
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
                }
            }).done(callback, () => {

            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
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
            { "data": "NGUOIQUANLY" },
            //{ "data": null, defaultContent: '' }, //Ngày mua cuối cùng //45
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.KHID);
            $(nRow).attr('data-dt-row', iDataIndex);
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
            displayBuffer: 10
        },

        orderCellsTop: true,
    });

    $(tbNhaCungCap.table().container()).on('change', 'thead input', function (e) {
        var stringtr = 'input[data-search-nhacungcap="' + $(this).data('search-nhacungcap') + '"]'
        $(stringtr).val($(this).val())
        if (e.keyCode == 13) {
            tbNhaCungCap.draw();
        }
        tbNhaCungCap.draw();
    });
    $(tbNhaCungCap.table().container()).on('change', 'thead select', function () {
        tbNhaCungCap.draw();
    });

    //Click
    $('.ql-kh tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.ql-kh').find('tr').removeClass('selected');
        $(this).closest('.ql-kh').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    //DoubleClick
    $('#table-nhacungcap tbody').on('dblclick', async function () {
        CheckUpdateKhachHang();
        LoadKhachHang();
    });

    //Thêm
    $('#btn-insert-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckInsertKhachHang',
            success: function (res) {
                if (res.rs) {
                    $('#btn-save-khach-hang').removeAttr('disabled');
                    $('#them-khach-hang input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-khach-hang select').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-khach-hang textarea').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-khach-hang input[type = "checkbox"]').prop('checked', false);

                    slKieuKH.val(1);
                    ngayTaoKH.val(moment(new Date()).format('DD/MM/yyyy'));
                    slNhomKhachHang.find('option[value = CACB42BD-149B-4F28-90D8-3796D0EF837E]').prop('selected', true);
                    slGioiTinhKH.val(1);
                    slHinhThucKH.val(0);
                    slGioiHanNoKH.val(0);
                    slGioiHanPhieuKH.val(0);

                    slShowRoomKH.val(0).trigger('change.select2');
                    slNhanVienKH.val(0).trigger('change.select2');
                    slKenhKhachHang.val(0).trigger('change.select2');

                    $('#them-khach-hang').find('div[id = "createdDateKH"] > p:last-child').text('-');
                    $('#them-khach-hang').find('div[id = "createdByKH"] > p:last-child').text('-');
                    $('#them-khach-hang').find('div[id = "updatedDateKH"] > p:last-child').text('-');
                    $('#them-khach-hang').find('div[id = "updatedByKH"] > p:last-child').text('-');

                    $('#them-khach-hang').modal();
                    $(function () {

                        $.ajax({
                            async: true,
                            type: "GET",
                            url: "/KhachHang/IdentityIDKhachHang",
                            dataType: "json",
                            success: function (msg) {
                                maKH.val(msg.kq);
                            },

                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.status);
                                alert(thrownError);
                            }
                        });
                    });
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
    $('#btn-update-khach-hang').on('click', function () {
        CheckUpdateKhachHang();
        LoadKhachHang();
    });

    //Xóa
    $('#btn-delete-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckDeleteKhachHang',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-nhacungcap tbody tr.selected').attr('data-id') != undefined) {
                        let idKhachHang = $('#table-nhacungcap tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa nhà cung cấp này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/KhachHang/DeleteKhachHang?id=' + idKhachHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbNhaCungCap.ajax.reload();
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
                            text: 'Vui lòng chọn nhà cung cấp',
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
    $('#btn-reset-khach-hang').on('click', function () {
        tbNhaCungCap.draw();
    });

    //Xuất (Excel)
    $('#btn-export-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckExcelKhachHang',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbNhaCungCap_filterValues.draw;
                    filterReport.search = tbNhaCungCap_filterValues.search;
                    filterReport.start = tbNhaCungCap_filterValues.start;
                    filterReport.length = tbNhaCungCap_filterValues.length;
                    filterReport.order = tbNhaCungCap_filterValues.order;
                    filterReport.dir = tbNhaCungCap_filterValues.dir;

                    filterReport.search1 = tbNhaCungCap_filterValues.search1
                    filterReport.search2 = tbNhaCungCap_filterValues.search2
                    filterReport.search3 = tbNhaCungCap_filterValues.search3
                    filterReport.search4 = tbNhaCungCap_filterValues.search4
                    filterReport.search5 = tbNhaCungCap_filterValues.search5
                    filterReport.search6 = tbNhaCungCap_filterValues.search6
                    filterReport.search7 = tbNhaCungCap_filterValues.search7
                    //filterReport.search8 = tbNhaCungCap_filterValues.search8
                    
                    filterReport.export = 1;
                    var link = `/KhachHang/LoadNhaCungCap?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        //`&search8=` + filterReport.search8 +
                       
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
    $('#btn-print-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckPrintKhachHang',
            success: function (res) {
                if (res.rs) {
                    //tbKhachHang.buttons('.buttons-print').trigger();
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
    $('#btn-save-khach-hang').on('click', function () {
        let $currentForm = $('#them-khach-hang');
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
        data.append("slKieu", 1);
        data.append("idKhachHang", idKhachHang.val());
        data.append("ngayTaoKH", ngayTaoKH.val());
        data.append("slNhomKhachHang", $('select[name="slNhomKhachHang"] option:eq(0)').val());
        data.append("maKH", maKH.val());
        data.append("tenKhachHang", tenKhachHang.val());
        data.append("diaChiNR", diaChiKH.val());
        data.append("mobile", mobileKH.val());
        data.append("telephone", telephoneKH.val());
        data.append("ngaySinh", ngaySinhKH.val());
        data.append("slGioiTinh", slGioiTinhKH.find('option:selected').text());
        data.append("email", emailKH.val());
        data.append("slHangThe", slHangTheKH.find('option:selected').val());
        data.append("slHinhThuc", slHinhThucKH.find('option:selected').val());
        data.append("idDiaChi", idDiaChiKH.val());
        data.append("theoDoi", theoDoiKH.prop('checked'));
        data.append("khachHangTiemNang", khachHangTiemNang.prop('checked'));
        data.append("ghiChu", ghiChuKH.val());

        data.append("tenCongTy", tenCongTyKH.val());
        data.append("tenVietTat", tenVietTatKH.val());
        data.append("alias", aliasKH.val());
        data.append("diaChiCongTy", diaChiCongTyKH.val());
        data.append("maSoThue", maSoThueKH.val());
        data.append("fax", faxKH.val());
        data.append("website", websiteKH.val());
        data.append("nguoiDaiDien", nguoiDaiDienKH.val());
        data.append("chucVu", chucVuKH.val());
        data.append("gioiHanNo", gioiHanNoKH.val());
        data.append("slGioiHanNo", slGioiHanNoKH.find('option:selected').val());
        data.append("slGioiHanPhieu", slGioiHanPhieuKH.find('option:selected').val());
        data.append("mucChietKhau", mucChietKhauKH.val());
        data.append("ngayTinhLai", ngayTinhLaiKH.val());

        data.append("soTK", soTKKH.val());
        data.append("chuTK", chuTKKH.val());
        data.append("moTai", moTaiKH.val());

        data.append("diaChiHoaDon", diaChiHoaDonKH.val());
        data.append("diaChiGiaoHang", diaChiGiaoHang1KH.val());
        data.append("diaChiGiaoHang2", diaChiGiaoHang2KH.val());

        data.append("slShowRoom", slShowRoomKH.find('option:selected').val());
        data.append("slNhanVien", slNhanVienKH.find('option:selected').val());
        data.append("slKenhKhachHang", slKenhKhachHang.find('option:selected').val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/KhachHang/InsertUpdateKhachHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbNhaCungCap.ajax.reload();
                    $('#them-khach-hang').modal('hide');
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

    //Funciotn Load chi tiết khách hàng
    async function LoadChiTietKhachHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhachHang/LoadChiTietKhachHang?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };

    //Thiết kế layout
    $('#thiet-ke-layout input[type="checkbox"]').each(function (index, e) {
        $(e).prop('checked', true);
    });
    $('#thiet-ke-layout input[type="checkbox"]').on('click', function (e) {
        // Get the column API object
        var col = tbNhaCungCap.column($(this).attr('data-target'));
        // Toggle the visibility
        col.visible(!col.visible());
    });

    GioiHanNo();
    //Function giới hạn nợ (<select>)
    function GioiHanNo() {
        for (i = 0; i <= 360; i++) {
            slGioiHanNoKH.append($('<option></option>').val(i).html(i))
        }
    }

    GioiHanPhieu();
    //Function giới hạn phiếu (<select>)
    function GioiHanPhieu() {
        for (i = 0; i <= 300; i++) {
            slGioiHanPhieuKH.append($('<option></option>').val(i).html(i))
        }
    }

    ShowRoomKH();
    function ShowRoomKH() {
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
                    slShowRoomKH.select2({
                        data: dsSR,
                        dropdownParent: $('#them-khach-hang')
                    });
                }
            },
        });
    };

    LoadListTheKhachHang();
    //Function load Thẻ khách hàng (<select>)
    function LoadListTheKhachHang() {
        $.ajax({
            type: "GET",
            url: "/KhachHang/LoadListTheKhachHang/",
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                $.each(res.data, function (data, value) {
                    slHangTheKH.append($("<option></option>").val(value.KHCID).html(value.TEN));
                })
            }
        });
    }

    //Function Load khách hàng
    function LoadKhachHang() {
        let id = $('#table-nhacungcap tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadChiTietKhachHang(id).then((rs) => {
                if (rs.data.CLASSID == 0) {
                    slKieuKH.val(2);
                }
                else {
                    slKieuKH.val(rs.data.CLASSID);
                }
                //Thông tin chung
                idKhachHang.val(rs.data.KHID);
                if (moment(rs.data.NGAYTAO).format('DD/MM/yyyy') != 'Invalid date') {
                    ngayTaoKH.val(moment(rs.data.NGAYTAO).format('DD/MM/yyyy'));
                }
                slNhomKhachHang.val(rs.data.KHNID).trigger('change');
                maKH.val(rs.data.KHCODE);
                tenKhachHang.val(rs.data.KHTEN);
                diaChiKH.val(rs.data.DIACHI);
                mobileKH.val(rs.data.DIDONG);
                telephoneKH.val(rs.data.DIENTHOAI);
                if (moment(rs.data.NGAYSINH).format('DD/MM/yyyy') != 'Invalid date') {
                    ngaySinhKH.val(moment(rs.data.NGAYSINH).format('DD/MM/yyyy'));
                }
                slGioiTinhKH.val(rs.data.GIOITINH == 'Nam' ? 1 : 2);
                emailKH.val(rs.data.EMAIL);
                slHangTheKH.val(rs.data.KHCID);
                slHinhThucKH.val(rs.data.PREFEREDCONTACTMODE);
                idDiaChiKH.val(rs.data.DCID);
                if (rs.data.DCID != null) {
                    LoadChiTietDiaChi(rs.data.DCID).then((rs) => {
                        pathDiaChiKH.val(rs.data.PATH);
                    });
                }
                theoDoiKH.prop('checked', rs.data.THEODOI);
                khachHangTiemNang.prop('checked', rs.data.ISKHTIEMNANG);
                ghiChuKH.val(rs.data.GHICHU);

                tenCongTyKH.val(rs.data.CONGTY);
                tenVietTatKH.val(rs.data.KHTENTAT);
                aliasKH.val(rs.data.ALIAS);
                diaChiCongTyKH.val(rs.data.DIACHICONGTY);
                maSoThueKH.val(rs.data.MASOTHUE);
                faxKH.val(rs.data.FAX);
                websiteKH.val(rs.data.WEBSITE);
                nguoiDaiDienKH.val(rs.data.NGUOIDAIDIEN);
                chucVuKH.val(rs.data.CHUCVU);
                //Mua bán hàng
                gioiHanNoKH.val(rs.data.GIOIHANCONGNO);
                slGioiHanNoKH.val(rs.data.GIOIHANNGAYNO);
                slGioiHanPhieuKH.val(rs.data.GIOIHANSOPHIEUNO);
                mucChietKhauKH.val(rs.data.MUCHIETKHAU);
                if (moment(rs.data.TINHLAINOGANNHAT).format('DD/MM/yyyy') != 'Invalid date') {
                    ngayTinhLaiKH.val(moment(rs.data.TINHLAINOGANNHAT).format('DD/MM/yyyy'));
                }
                soTKKH.val(rs.data.TKNHCODE);
                chuTKKH.val(rs.data.TKNHTEN);
                moTaiKH.val(rs.data.TKNHMOTAI);
                diaChiHoaDonKH.val(rs.data.DIACHIGIAOHOADON);
                diaChiGiaoHang1KH.val(rs.data.DIACHIGIAOHANG);
                diaChiGiaoHang2KH.val(rs.data.DIACHIGIAOHANG2);
                //Nội bộ quản lí
                if (rs.data.SRID === '00000000-0000-0000-0000-000000000000' || rs.data.SRID === null || rs.data.SRID === "null") {
                    slShowRoomKH.val(0).trigger('change.select2');
                }
                else {
                    slShowRoomKH.val(rs.data.SRID).trigger('change.select2');
                }

                if (rs.data.NVID === '00000000-0000-0000-0000-000000000000' || rs.data.NVID === null || rs.data.NVID === "null") {
                    slNhanVienKH.val(0).trigger('change.select2');
                }
                else {
                    slNhanVienKH.val(rs.data.NVID).trigger('change.select2');
                }

                if (rs.data.KHTID === '00000000-0000-0000-0000-000000000000' || rs.data.KHTID === null || rs.data.KHTID === "null") {
                    slKenhKhachHang.val(0).trigger('change.select2');
                }
                else {
                    slKenhKhachHang.val(rs.data.KHTID).trigger('change.select2');
                }

                let createdDate = moment(rs.data.CREATEDDATE).format('DD/MM/yyyy');
                if (createdDate != 'Invalid date') {
                    $('#them-khach-hang').find('div[id = "createdDateKH"] > p:last-child').text(createdDate);
                }
                else {
                    $('#them-khach-hang').find('div[id = "createdDateKH"] > p:last-child').text('-');
                }

                let createdBy = rs.data.CREATEDBY;
                if (createdBy != null) {
                    $('#them-khach-hang').find('div[id = "createdByKH"] > p:last-child').text(createdBy);
                }
                else {
                    $('#them-khach-hang').find('div[id = "createdByKH"] > p:last-child').text('-');
                }

                let updatedDate = moment(rs.data.UPDATEDDATE).format('DD/MM/yyyy');
                if (updatedDate != 'Invalid date') {
                    $('#them-khach-hang').find('div[id = "updatedDateKH"] > p:last-child').text(updatedDate);
                }
                else {
                    $('#them-khach-hang').find('div[id = "updatedDateKH"] > p:last-child').text('-');
                }

                let updatedBy = rs.data.UPDATEDBY;
                if (updatedBy != null) {
                    $('#them-khach-hang').find('div[id = "updatedByKH"] > p:last-child').text(updatedBy);
                }
                else {
                    $('#them-khach-hang').find('div[id = "updatedByKH"] > p:last-child').text('-');
                }

                $('#them-khach-hang').removeClass('was-validated');
                $('#them-khach-hang').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhà cung cấp',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }

    //Function check update khách hàng
    function CheckUpdateKhachHang() {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckUpdateKhachHang',
            success: function (msg) {
                if (msg.rs) {
                    $('#btn-save-khach-hang').removeAttr('disabled');
                }
                else {
                    $('#btn-save-khach-hang').attr('disabled', 'disabled');
                }
            }
        });
    }
    //#endregion

    //#region Nhóm khách hàng
    let idNhomKhachHang = $('#them-nhom-khach-hang input[name = "idNhomKhachHang"]');
    let tenNhomKhachHang = $('#them-nhom-khach-hang input[name = "tenNhomKhachHang"]');
    let ghiChuNhomKhachHang = $('#them-nhom-khach-hang textarea[name = "ghiChuNhomKhachHang"]');
    let idPriceGroup = $('#them-nhom-khach-hang select[name = "slPriceGroup"]');

    //Database Nhóm khách hàng
    let tbNhomKhachHang_filterValues = {};

    $('#table-danh-muc-nhom-kh thead tr').clone(true).appendTo('#table-danh-muc-nhom-kh thead');
    $('#table-danh-muc-nhom-kh thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 3) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-danh-muc-nhom-kh', i);
            var data3 = [{ key: '--Nhóm giá--', value: '-1' },
            { key: 'Giá bán 1', value: '0' },
            { key: 'Giá bán 2', value: '1' },
            { key: 'Giá bán 3', value: '2' },
            { key: 'Giá bán 4', value: '3' },
            { key: 'NCC', value: '10' }];
            data3.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-danh-muc-nhom-kh="' + i + '"/>');
        }
    });

    let dsNKH = [];
    var tbNhomKhachHang = $('#table-danh-muc-nhom-kh').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbNhomKhachHang_filterValues.draw = data.draw;
            tbNhomKhachHang_filterValues.search = data.search["value"];
            tbNhomKhachHang_filterValues.start = data.start;
            tbNhomKhachHang_filterValues.length = data.length;
            tbNhomKhachHang_filterValues.order = data.order[0].column;
            tbNhomKhachHang_filterValues.dir = data.order[0].dir;

            tbNhomKhachHang_filterValues.search1 = $('input[data-search-danh-muc-nhom-kh=1]').val();
            tbNhomKhachHang_filterValues.search2 = $('input[data-search-danh-muc-nhom-kh=2]').val();
            tbNhomKhachHang_filterValues.search3 = $('select[data-search-danh-muc-nhom-kh=3]').val();

            $.ajax({
                url: '/KhachHang/LoadNhomKhachHang',
                method: 'GET',
                data: tbNhomKhachHang_filterValues,
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
                        if (tbNhomKhachHang_filterValues.draw != 1) {
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
                        dsNKH = $.map(msg.data, function (obj) {
                            obj.id = obj.KHNID;
                            obj.text = obj.TEN;
                            return obj
                        });
                        slNhomKhachHang.select2({
                            data: dsNKH,
                            dropdownParent: $('#them-khach-hang')
                        });
                        slNhomKhachHang.attr('disabled', 'disabled');
                    }
                }
            }).done(callback, () => {

            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" },
            {
                "data": "PRICEGROUPID",
                render: function (data, type, row) {
                    if (data == 0) {
                        return 'Giá bán 1';
                    } else if (data == 1) {
                        return 'Giá bán 2';
                    } else if (data == 2) {
                        return 'Giá bán 3';
                    } else if (data == 3) {
                        return 'Giá bán 4';
                    } else if (data == 10) {
                        return 'NCC';
                    }
                    return data;
                }
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.KHNID);
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
            displayBuffer: 10
        },

        "dom": 'lrtip',
        orderCellsTop: true
    });

    $(tbNhomKhachHang.table().container()).on('keyup', 'thead input', function (e) {
        tbNhomKhachHang.draw();
    });
    $(tbNhomKhachHang.table().container()).on('change', 'thead select', function () {
        tbNhomKhachHang.draw();
    });

    $('#btn-nhom-khach-hang').on('click', function () {
        $('#danh-muc-nhom-kh').modal();
    });

    //Click
    $('#table-danh-muc-nhom-kh tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-danh-muc-nhom-kh tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-danh-muc-nhom-kh tbody').on('dblclick', 'tr', function () {
        let idNhom = $(this).attr('data-id');
        var idNCC = 'CACB42BD-149B-4F28-90D8-3796D0EF837E';
        if (idNhom == idNCC.toLowerCase()) {
            tbNhomKhachHang.ajax.reload();
            $('#danh-muc-nhom-kh').modal('hide');
            slNhomKhachHang.find('option[value = "' + idNhom + '"]').prop('selected', true);
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Không thể chọn khác nhà cung cấp',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    });

    ////Thêm
    $('#btn-insert-nhom-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckInsertNhomKhachHang',
            success: function (res) {
                if (res.rs) {
                    $('#them-nhom-khach-hang input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-nhom-khach-hang textarea').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-nhom-khach-hang select[name = "slPriceGroup"]').val(0);
                    $('#them-nhom-khach-hang').modal()
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
    $('#btn-update-nhom-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckUpdateNhomKhachHang',
            success: function (res) {
                if (res.rs) {
                    LoadNhomKhachHang();
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

    ////Xóa
    $('#btn-delete-nhom-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckDeleteNhomKhachHang',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-danh-muc-nhom-kh tbody tr.selected').attr('data-id') != undefined) {
                        let idNhomKhachHang = $('#table-danh-muc-nhom-kh tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa nhóm khách hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/KhachHang/DeleteNhomKhachHang?id=' + idNhomKhachHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbNhomKhachHang.ajax.reload();
                                        toast.create({
                                            title: 'Notification!',
                                            text: 'Thành công',
                                            icon: 'check',
                                            classBackground: 'noti-success',
                                            timeout: 3000
                                        });
                                        slNhomKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                                            $(this).remove();
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
                            text: 'Vui lòng chọn nhóm khách hàng',
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

    ////Nạp
    $('#btn-reset-nhom-khach-hang').on('click', function () {
        tbNhomKhachHang.draw();
    });

    ////Xuất (Excel)
    $('#btn-export-nhom-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckExcelNhomKhachHang',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbNhomKhachHang_filterValues.draw;
                    filterReport.search = tbNhomKhachHang_filterValues.search;
                    filterReport.start = tbNhomKhachHang_filterValues.start;
                    filterReport.length = tbNhomKhachHang_filterValues.length;
                    filterReport.order = tbNhomKhachHang_filterValues.order;
                    filterReport.dir = tbNhomKhachHang_filterValues.dir;

                    filterReport.search1 = tbNhomKhachHang_filterValues.search1;
                    filterReport.search2 = tbNhomKhachHang_filterValues.search2;
                    filterReport.search3 = tbNhomKhachHang_filterValues.search3;

                    filterReport.export = 1;
                    var link = `/KhachHang/LoadNhomKhachHang?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
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

    ////Lưu
    $('#btn-save-nhom-khach-hang').on('click', function () {
        let $currentForm = $('#them-nhom-khach-hang');
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
        data.append('idNhomKhachHang', idNhomKhachHang.val());
        data.append('tenNhomKhachHang', tenNhomKhachHang.val());
        data.append('ghiChu', ghiChuNhomKhachHang.val());
        data.append('idPriceGroup', idPriceGroup.find('option:selected').val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/KhachHang/InsertUpdateNhomKhachHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbNhomKhachHang.ajax.reload();
                    $('#them-nhom-khach-hang').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    var vlnhom = [];
                    slNhomKhachHang.find('option').each(function () {
                        vlnhom.push($(this).val());
                    });

                    if (jQuery.isArray(msg.id, vlnhom) > -1) {
                        slNhomKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                            $(this).remove();
                        });
                        slNhomKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
                    }
                    else {
                        slNhomKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Function Load chi tiết nhóm khách hàng
    async function LoadChiTietNhomKhachHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhachHang/LoadChiTietNhomKhachHang?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };

    //Function load nhóm khách hàng
    function LoadNhomKhachHang() {
        let id = $('#table-danh-muc-nhom-kh tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadChiTietNhomKhachHang(id).then((rs) => {
                idNhomKhachHang.val(rs.data.KHNID);
                tenNhomKhachHang.val(rs.data.TEN);
                ghiChuNhomKhachHang.val(rs.data.GHICHU);
                idPriceGroup.val(rs.data.PRICEGROUPID);

                $('#them-nhom-khach-hang').removeClass('was-validated');
                $('#them-nhom-khach-hang').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhóm khách hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }
    //#endregion

    //#region Kênh khách hàng
    let idKenhKhachHang = $('#them-kenh-khach-hang input[name = "idKenhKhachHang"]');
    let tenKenhKhachHang = $('#them-kenh-khach-hang input[name = "tenKenhKhachHang"]');
    let ghiChuKenhKhachHang = $('#them-kenh-khach-hang textarea[name = "ghiChuKenhKhachHang"]');
    //Datatable Kênh khách hàng
    let tbKenhKhachHang_filterValues = {};

    $('#table-danh-muc-kenh-kh thead tr').clone(true).appendTo('#table-danh-muc-kenh-kh thead');
    $('#table-danh-muc-kenh-kh thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-danh-muc-kenh-kh="' + i + '"/>');
        }
    });

    let dsKKH = [];
    var tbKenhKhachHang = $('#table-danh-muc-kenh-kh').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbKenhKhachHang_filterValues.draw = data.draw;
            tbKenhKhachHang_filterValues.search = data.search["value"];
            tbKenhKhachHang_filterValues.start = data.start;
            tbKenhKhachHang_filterValues.length = data.length;
            tbKenhKhachHang_filterValues.order = data.order[0].column;
            tbKenhKhachHang_filterValues.dir = data.order[0].dir;

            tbKenhKhachHang_filterValues.search1 = $('input[data-search-danh-muc-kenh-kh=1]').val();
            tbKenhKhachHang_filterValues.search2 = $('input[data-search-danh-muc-kenh-kh=2]').val();

            $.ajax({
                url: '/KhachHang/LoadKenhKhachHang',
                method: 'GET',
                data: tbKenhKhachHang_filterValues,
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
                        if (tbKenhKhachHang_filterValues.draw != 1) {
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
                        dsKKH = $.map(msg.data, function (obj) {
                            obj.id = obj.ID;
                            obj.text = obj.TEN;
                            return obj
                        });
                        slKenhKhachHang.select2({
                            data: dsKKH,
                            dropdownParent: $('#them-khach-hang')
                        });
                    }
                }
            }).done(callback, () => {

            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: false,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },

        "dom": 'lrtip',
        orderCellsTop: true
    });

    $(tbKenhKhachHang.table().container()).on('keyup', 'thead input', function (e) {
        tbKenhKhachHang.draw();
    });

    $('#btn-kenh-khach-hang').on('click', function () {
        $('#danh-sach-kenh-kh').modal();
    });

    //Click
    $('#table-danh-muc-kenh-kh tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-danh-muc-kenh-kh tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-danh-muc-kenh-kh tbody').on('dblclick', 'tr', function () {
        tbKenhKhachHang.ajax.reload();
        $('#danh-sach-kenh-kh').modal('hide');
        let idKenh = $(this).attr('data-id');
        slKenhKhachHang.find('option[value = "' + idKenh + '"]').prop('selected', true);
    });

    ////Thêm
    $('#btn-insert-kenh-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckInsertKenhKhachHang',
            success: function (res) {
                if (res.rs) {
                    $('#them-kenh-khach-hang input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-kenh-khach-hang textarea').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-kenh-khach-hang').modal()
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
    $('#btn-update-kenh-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckUpdateKenhKhachHang',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-danh-muc-kenh-kh tbody tr.selected').attr('data-id') != undefined) {
                        LoadChiTietKenhKhachHang($('#table-danh-muc-kenh-kh tbody tr.selected').attr('data-id')).then((rs) => {
                            idKenhKhachHang.val(rs.data.ID);
                            tenKenhKhachHang.val(rs.data.TEN);
                            ghiChuKenhKhachHang.val(rs.data.GHICHU);

                            $('#them-kenh-khach-hang').removeClass('was-validated');
                            $('#them-kenh-khach-hang').modal();
                        });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn kênh khách hàng',
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

    ////Xóa
    $('#btn-delete-kenh-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckDeleteKenhKhachHang',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-danh-muc-kenh-kh tbody tr.selected').attr('data-id') != undefined) {
                        let idKenhKhachHang = $('#table-danh-muc-kenh-kh tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa kênh khách hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/KhachHang/DeleteKenhKhachHang?id=' + idKenhKhachHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbKenhKhachHang.ajax.reload();
                                        toast.create({
                                            title: 'Notification!',
                                            text: 'Thành công',
                                            icon: 'check',
                                            classBackground: 'noti-success',
                                            timeout: 3000
                                        });
                                        slKenhKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                                            $(this).remove();
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
                            text: 'Vui lòng chọn kênh khách hàng',
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

    ////Nạp
    $('#btn-reset-kenh-khach-hang').on('click', function () {
        tbKenhKhachHang.draw();
    });

    ////Xuất (Excel)
    $('#btn-export-kenh-khach-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/KhachHang/CheckExcelKenhKhachHang',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbKenhKhachHang_filterValues.draw;
                    filterReport.search = tbKenhKhachHang_filterValues.search;
                    filterReport.start = tbKenhKhachHang_filterValues.start;
                    filterReport.length = tbKenhKhachHang_filterValues.length;
                    filterReport.order = tbKenhKhachHang_filterValues.order;
                    filterReport.dir = tbKenhKhachHang_filterValues.dir;

                    filterReport.search1 = tbKenhKhachHang_filterValues.search1;
                    filterReport.search2 = tbKenhKhachHang_filterValues.search2;

                    filterReport.export = 1;
                    var link = `/KhachHang/LoadKenhKhachHang?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
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

    ////Lưu
    $('#btn-save-kenh-khach-hang').on('click', function () {
        let $currentForm = $('#them-kenh-khach-hang');
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
        data.append('id', idKenhKhachHang.val());
        data.append('ten', tenKenhKhachHang.val());
        data.append('ghiChu', ghiChuKenhKhachHang.val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/KhachHang/InsertUpdateKenhKhachHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbKenhKhachHang.ajax.reload();
                    $('#them-kenh-khach-hang').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    var vlkenh = [];
                    slKenhKhachHang.find('option').each(function () {
                        vlkenh.push($(this).val());
                    });

                    if (jQuery.isArray(msg.id, vlkenh) > -1) {
                        slKenhKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                            $(this).remove();
                        });
                        slKenhKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
                    }
                    else {
                        slKenhKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Funciotn Load chi tiết khách hàng
    async function LoadChiTietKenhKhachHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhachHang/LoadChiTietKenhKhachHang?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };
    //#endregion

    //#region Địa chỉ
    $('#btn-dia-chi').on('click', function () {
        $('#danh-sach-dia-chi').modal();
    });
    $('#table-dia-chi tbody').unbind('dblclick');
    $('#table-dia-chi tbody').on('dblclick', 'tr', async function () {
        $('#danh-sach-dia-chi').modal('hide');
        var diaChi = $(this).find('td').eq(4).html();
        pathDiaChiKH.val(diaChi);
        idDiaChiKH.val($(this).attr('data-id'));
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

    //#region Nhân viên
    //Function load Nhóm nhân viên (<select>)
    NhanVien();
    function NhanVien() {
        let dsNV = [];
        let tbStaff_filterValues = {};
        tbStaff_filterValues.draw = 1;
        tbStaff_filterValues.search = "";
        tbStaff_filterValues.start = 0;
        tbStaff_filterValues.length = 2000;
        tbStaff_filterValues.order = 0;
        tbStaff_filterValues.dir = 0;
        tbStaff_filterValues.follow = -1;
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
                } else if (msg.status == 3) {
                    if (tbStaff_filterValues.draw != 1) {
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
                    dsNV = $.map(msg.data, function (obj) {
                        obj.id = obj.NVID;
                        obj.text = obj.NVCODE + '-' + obj.NVTEN;
                        return obj
                    });
                    slNhanVienKH.select2({
                        data: dsNV,
                        dropdownParent: $('#them-khach-hang')
                    });
                }
            },
        });
    };

    $('#btn-nhan-vien').on('click', function () {
        $('#danh-sach-nv').modal();
    });

    $('#table-nv tbody').unbind('dblclick');
    $('#table-nv tbody').on('dblclick', 'tr', function () {
        $('#danh-sach-nv').modal('hide');
        let idNV = $(this).attr('data-id');
        slNhanVienKH.val(idNV).trigger('change');
    });

    $('#danh-sach-nv').on('hidden.bs.modal', function () {
        let idNV = $('#table-nv tbody tr.selected').attr('data-id');
        if (idNV != undefined) {
            slNhanVienKH.val(idNV).trigger('change');
        }
    });

    $('#them-nhan-vien').on('hidden.bs.modal', function () {
        slNhanVienKH.empty();
        NhanVien();
    });
    //#endregion

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    $('#danh-sach-khach-hang').on('shown.bs.modal', function () {
        tbKhachHang.draw();
    });
    $('#danh-muc-nhom-kh').on('shown.bs.modal', function () {
        tbNhomKhachHang.draw();
    });
    $('#danh-sach-kenh-kh').on('shown.bs.modal', function () {
        tbKenhKhachHang.draw();
    });

    //#region Nhập excel
    var dataNew_NhaCungCap = new Array();
    var tbNew_NhaCungCap = $('#table-nha-cung-cap-chua-co').DataTable({
        bInfo: false,
        data: dataNew_NhaCungCap,
        columns: [
            { "data": null },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
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
            { "data": "NVTEN" },
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
    var dataOld_NhaCungCap = new Array();
    var tbOld_NhaCungCap = $('#table-nha-cung-cap-da-co').DataTable({
        bInfo: false,
        data: dataOld_NhaCungCap,
        columns: [
            { "data": null },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
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
            { "data": "NVTEN" },
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
    $("#btn-import-nha-cung-cap").on('click', function () {
        $('input[type="file"][name="excelNhaCungCap"]').click();
    });
    $('input[type="file"][name="excelNhaCungCap"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import_NhaCungCap(files[0], "", "");
        $(this).val('');
    });
    var dataOpt_NhaCungCap = [];
    //Function Import Excel
    async function Import_NhaCungCap(file, sheetName, url) {
        var slExcel = $('select[name="slExcel-nhacungcap"]');
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/KhachHang/ImportNCC',
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
                                dataOpt_NhaCungCap.push(lstSheetName[i].Name);
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
                        dataNew_NhaCungCap = [];
                        for (var i = 0; i < lstNew.length; i++) {
                            dataNew_NhaCungCap.push(lstNew[i]);
                        }
                        tbNew_NhaCungCap.clear().columns.adjust().draw();
                        tbNew_NhaCungCap.rows.add(dataNew_NhaCungCap);
                        tbNew_NhaCungCap.columns.adjust().draw();

                        dataOld_NhaCungCap = [];
                        for (var i = 0; i < lstOld.length; i++) {
                            dataOld_NhaCungCap.push(lstOld[i]);
                        }
                        tbOld_NhaCungCap.clear().columns.adjust().draw();
                        tbOld_NhaCungCap.rows.add(dataOld_NhaCungCap);
                        tbOld_NhaCungCap.columns.adjust().draw();

                        if (dataNew_NhaCungCap.length > 0 || dataOld_NhaCungCap.length > 0) {
                            document.getElementsByClassName('count-new-nha-cung-cap')[0].innerHTML = dataNew_NhaCungCap.length;
                            document.getElementsByClassName('count-old-nha-cung-cap')[0].innerHTML = dataOld_NhaCungCap.length;
                            if (dataNew_NhaCungCap.length > 0 && dataOld_NhaCungCap.length > 0) {
                                $('.btn-save-nha-cung-cap-excel').removeAttr('disabled', 'disabled');
                            }
                            else if (dataNew_NhaCungCap.length > 0) {
                                $('.btn-save-nha-cung-cap-excel[value="0"]').removeAttr('disabled', 'disabled');
                            }
                            else if (dataOld_NhaCungCap.length > 0) {
                                $('.btn-save-nha-cung-cap-excel[value="1"]').removeAttr('disabled', 'disabled');
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
                        dataNew_NhaCungCap = [];
                        tbNew_NhaCungCap.clear().columns.adjust().draw();
                        tbNew_NhaCungCap.rows.add(dataNew_NhaCungCap);
                        tbNew_NhaCungCap.columns.adjust().draw();

                        dataOld_NhaCungCap = [];
                        tbOld_NhaCungCap.clear().columns.adjust().draw();
                        tbOld_NhaCungCap.rows.add(dataOld_NhaCungCap);
                        tbOld_NhaCungCap.columns.adjust().draw();

                        document.getElementsByClassName('count-new-nha-cung-cap')[0].innerHTML = 0;
                        document.getElementsByClassName('count-old-nha-cung-cap')[0].innerHTML = 0;

                        $('.btn-save-nha-cung-cap-excel').attr('disabled');

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
    $('select[name="slExcel-nhacungcap"]').on('change', async function () {
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
            await Import_NhaCungCap("", name, url);
        }
    });
    //Reset
    $('#btn-reset-nha-cung-cap-excel').on('click', function () {
        $('input[type="file"][name="excelNhaCungCap"]').click();
    });
    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-nha-cung-cap-excel').on('click', function () {
        var link = `/KhachHang/CreateNCC`;
        window.open(link)
    });
    //Modal Show
    $('#excel-nhacungcap').on('shown.bs.modal', function () {
        $('select[name="slExcel-nhacungcap"]').children().remove().end();

        dataNew_NhaCungCap = [];
        tbNew_NhaCungCap.clear().columns.adjust().draw();
        tbNew_NhaCungCap.rows.add(dataNew_NhaCungCap);
        tbNew_NhaCungCap.columns.adjust().draw();

        dataOld_NhaCungCap = [];
        tbOld_NhaCungCap.clear().columns.adjust().draw();
        tbOld_NhaCungCap.rows.add(dataOld_NhaCungCap);
        tbOld_NhaCungCap.columns.adjust().draw();

        document.getElementsByClassName('count-new-nha-cung-cap')[0].innerHTML = 0;
        document.getElementsByClassName('count-old-nha-cung-cap')[0].innerHTML = 0;

        $('.btn-save-nha-cung-cap-excel').attr('disabled',true);
    });
    //Save
    $('button.btn-save-nha-cung-cap-excel').on('click', function () {
        let value = $(this).val();
        var data = null;
        let CheckQuyen = true;
        if (value == 0) {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/KhachHang/CheckInsertKhachHang',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataNew_NhaCungCap });
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
        else if (value == 1) {
            $.ajax({
                async: false,
                method: 'GET',
                url: '/KhachHang/CheckUpdateKhachHang',
                success: function (msg) {
                    if (msg.rs) {
                        data = JSON.stringify({ "data": dataOld_NhaCungCap });
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
                url: '/KhachHang/CheckInsertUpdateKhachHang',
                success: function (msg) {
                    if (msg.rs) {
                        let ConCatData = dataNew_NhaCungCap.concat(dataOld_NhaCungCap);
                        data = JSON.stringify({ "data": ConCatData });
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
            if (confirm('Bạn chắc chắn muốn thêm/sửa các nhà cung cấp hay không?')) {
                $.ajax({
                    type: 'POST',
                    url: '/KhachHang/SaveNCC',
                    data: data,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (msg) {
                        if (msg.rs) {
                            tbNhaCungCap.draw();
                            $('#excel-nhacungcap').modal('hide');
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
    //#endregion
});