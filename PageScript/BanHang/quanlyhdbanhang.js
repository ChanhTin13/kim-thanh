$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });

//#Region Document
$(document).ready(function () {
    $('#search-tungay').val(moment(new Date()).format('DD/MM/yyyy'));
    $('#search-denngay').val(moment(new Date()).format('DD/MM/yyyy'));
    $("#search-sl-lydonhap").select2({ dropdownParent: $('#bhhd-ban'), 'width': '288px' });
    $('select[name="sl-lydoxuat"]').select2();
    var objKHOMH = [];
    var DELETEMATHANGHOADONJSON = null;
    var MATHANGHOADONJSON = null;
    var objMatHangDELETE = [];
    let tongtienhang = 0;
    let tongchietkhau = 0;
    let tongthue = 0;
    var DataRole = [];
    var LuuIDNV = null;
    var DataKH = [];
    //#Region Reset hoa don ban hang
    function Them() {
        $('#qrcode').empty();
        let d = new Date();
        let fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('input[name="txt_ngay-xuat"]').val(fullDate).prop('disabled', true);
        $('input[name="txt_ngay-htt"]').val(fullDate);
        //Region Load Nhan Vien Va Khach Hang
        // trigger KHach hang
        $('select[name="txt-makh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-makh"]').trigger('change.select2');//trigger
        $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
        //$('select[name="txt-tenkh"]').select2();
        //$('select[name="txt-makh"]').select2();

        // trigger Nhan Vien
        $('select[name="txt-manv"]').val(LuuIDNV);
        $('select[name="txt-tennv').val(LuuIDNV);
        $('select[name="txt-tennv"]').trigger('change.select2');//trigger
        $('select[name="txt-manv"]').trigger('change.select2');//trigger
        //$('select[name="txt-tennv"]').select2();
        //$('select[name="txt-manv"]').select2();
        if (LuuIDNV != undefined) {
            $('select[name="txt-tennv"]').prop("disabled", true);
            $('select[name="txt-manv"]').prop("disabled", true);
            $('#button-danh-sach-nv-bhhd').attr('data-target', ' ');
        }
        //end
        $('textarea[name="txt-ghichu"]').val('');
        $('input[name="txt_idbhd"]').val('');
        $('input[name="txt_idmd"]').val('');
        $('input[name="txt_bhdid"]').val('');
        $('#txt-sdt').val('');
        $('#txt-diachi').val('');
        $('#txt-ghichu-kh').val('');
        DataRole = [];
        LoadDataAdd().then((e) => {
            $('select[name="sl-lydoxuat"]').empty();
            $('input[name="txt_so_phieu_bhd"]').empty();
            $('select[name="sl-hinhthuc"]').empty();
            $('input[name="txt_so_hop_dong"]').empty();
            $('select[name="sl-kho"]').empty();
            $('select[name="sl-lydoxuat"]').append(e.listlydo);
            $('select[name="sl-lydoxuat"]').val('0b6f2f2f-514e-44a5-9963-93f21a21f684');
            $('input[name="txt_so_phieu_bhd"]').val(e.bhd);
            $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
            $('input[name="txt_so_hop_dong"]').val(e.md);
            $('select[name="sl-kho"]').append(e.listkho);
            DataRole.push(e.DataRole);
        });
        objmathanghoadon = [];
        objMatHangDELETE = [];
        MATHANGHOADONJSON = null;
        DELETEMATHANGHOADONJSON = null;
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
        $('#form-nv').removeClass('was-validated');
        $('#btn-ghi-bhhd-xephang').removeClass('disabled-dia-chi');
        $('#btn-ghi-bhhd').addClass('hidden');
        $('#modal-ghi-vitri').removeClass('disabled-dia-chi');
        idXepHang = null;
    }
    $("#btn-them-bhhd").click(function () {
        Them();
    });
    //end

    //#Region Load Add Ban Hoa Don
    //Region Load Nhan Vien Va Khach Hang
    LoadDataNvVAKh().then((e) => {
        // HTML Khach Hang
        DataKH = e.dataKH;
        let makhString = '';
        let tenkhString = '';
        e.dataKH.map((value) => {
            //$('select[name="txt-makh"]').append('<option value="' + value.KHID + '" data-sdt="' + value.DIENTHOAI + '" data-diachi="' + value.DIACHI + '" data-ghichu="' + value.GHICHU + '" >' + value.KHCODE + '</option>');
            //$('select[name="txt-tenkh"]').append('<option value="' + value.KHID + '" data-sdt="' + value.DIENTHOAI + '" data-diachi="' + value.DIACHI + '" data-ghichu="' + value.GHICHU + '" >' + value.KHTEN + '</option>');
            makhString += '<option value="' + value.KHID + '" data-sdt="' + value.DIENTHOAI + '" data-diachi="' + value.DIACHI + '" data-ghichu="' + value.GHICHU + '" >' + value.KHCODE + '</option>';
            tenkhString += '<option value="' + value.KHID + '" data-sdt="' + value.DIENTHOAI + '" data-diachi="' + value.DIACHI + '" data-ghichu="' + value.GHICHU + '" >' + value.KHTEN + '</option>';
        });
        $('select[name="txt-makh"]').html(makhString);
        $('select[name="txt-tenkh"]').html(tenkhString);

        // HTML Nhan Vien
        let manvString = '';
        let tennvString = '';
        e.dataNV.map((value) => {
            //$('select[name="txt-manv"]').append('<option value="' + value.NVID + '">' + value.NVCODE + '</option>');
            //$('select[name="txt-tennv"]').append('<option value="' + value.NVID + '">' + value.NVTEN + '</option>');
            manvString += '<option value="' + value.NVID + '">' + value.NVCODE + '</option>';
            tennvString += '<option value="' + value.NVID + '">' + value.NVTEN + '</option>';
        });
        $('select[name="txt-manv"]').html(manvString);
        $('select[name="txt-tennv"]').html(tennvString);

        // trigger KHach hang
        $('select[name="txt-makh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh"]').select2({ width: 'resolve' });
        $('select[name="txt-makh"]').select2({ width: 'resolve' });

        // trigger Nhan Vien
        LuuIDNV = e.dataUser;
        $('select[name="txt-manv"]').val(e.dataUser);
        $('select[name="txt-tennv').val(e.dataUser);
        $('select[name="txt-tennv"]').select2({ width: 'resolve' });
        $('select[name="txt-manv"]').select2({ width: 'resolve' });
        if (e.dataUser != undefined) {
            $('select[name="txt-tennv"]').prop("disabled", true);
            $('select[name="txt-manv"]').prop("disabled", true);
            $('#button-danh-sach-nv-bhhd').attr('data-target', ' ');
        }
    }).catch(() => { console.log('error') })
    //end
    LoadDataAdd().then((e) => {
        DataRole.push(e.DataRole);
        let d = new Date();
        fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('select[name="sl-lydoxuat"]').append(e.listlydo);
        $('select[name="sl-lydoxuat"]').val('0b6f2f2f-514e-44a5-9963-93f21a21f684');
        $('input[name="txt_so_phieu_bhd"]').val(e.bhd);
        $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
        $('input[name="txt_so_hop_dong"]').val(e.md);
        $('select[name="sl-kho"]').append(e.listkho);
        $('input[name="txt_ngay-xuat"]').val(fullDate).prop('disabled', true);;
        $('input[name="txt_ngay-htt"]').val(fullDate);
    }).then((e) => {
        let CheckIDMH = $('input[name="txt_idmd"]').val();
        let CheckBHDID = $('input[name="txt_bhdid"]').val();
        let CheckPhienKiemHangID = $('input[name="txt_phienkiemhangid"]').val();
        if (CheckIDMH != "") {
            PhieuBanHangChiTiet(CheckIDMH);
        }
        if (CheckBHDID != "") {
            BanHangHDChiTiet(CheckBHDID);
        }
        if (CheckPhienKiemHangID != "") {
            ChiTietPhieuKiemHang(CheckPhienKiemHangID);
        }
    });
    //End

    //#Region load mat hang modal nho
    let tbBanHangHoaDonMH_filterValues = {}
    tbBanHangHoaDonMH_filterValues.statusDraw = 0;
    var tbBanHangMHHoaDon = $('#table-search-mahang-bhhd').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (tbBanHangHoaDonMH_filterValues.statusDraw > 0) {
                tbBanHangHoaDonMH_filterValues.draw = data.draw;
                tbBanHangHoaDonMH_filterValues.search = data.search["value"];
                tbBanHangHoaDonMH_filterValues.start = data.start;
                tbBanHangHoaDonMH_filterValues.length = data.length;
                tbBanHangHoaDonMH_filterValues.order = data.order[0].column;
                tbBanHangHoaDonMH_filterValues.dir = data.order[0].dir;
                tbBanHangHoaDonMH_filterValues.statusDraw;
                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: tbBanHangHoaDonMH_filterValues,
                    success: function (msg) {
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        } else if (msg.status == 3) {
                            if (tbBanHangHoaDonMH_filterValues.draw != 1) {
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
                    html: true;
                    $('#table-search-mahang-bhhd tbody tr').eq(0).addClass('selected');
                })
            }
        },
        "order": [[2, "asc"]],
        columnDefs: [
            {
                "targets": [0],
                "orderable": false
            }
        ],
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-stt')
                }
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mahang')
                }
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                }
            },
            {
                "targets": 3,
                "data": "DONVI",
            },
            {
                "targets": 4,
                "className": "text-left short-text",
                "data": "MHALIAS",
                "visible": false,
            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "MHMOTA",
                "visible": false,
            },
            {
                "targets": 6,
                "className": "text-left",
                "data": "GIABANLE",
                render: function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                "targets": 7,
                "className": "text-left",
                "data": "GIABANBUON",
                render: function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                "targets": 8,
                "className": "text-left",
                "data": "GIABAN3",
                render: function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                "targets": 9,
                "className": "text-left",
                "data": "GIABAN4",
                //"visible": false,
                render: function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                "targets": 10,
                "className": "text-left",
                "data": "GIABAN5",
                //"visible": false,
                render: function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        "autoWidth": false,
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100
        }
    })
    //end

    //Search Header Bang Chi Tiet Phieu
    //$('#table-chi-tiet-phieu-bhhd thead tr').clone(true).appendTo('#table-chi-tiet-phieu-bhhd thead');
    //$('#table-chi-tiet-phieu-bhhd thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    //if (i == 3) {
    //    //    var $select = $("<select id='filter-header-khomh'> <option value =\" 1 \">Chọn Kho </option></select>", {
    //    //    });
    //    //    LoadKho().then((e) => {
    //    //        e.data.map((value) => {
    //    //            var $option = $("<option></option>", {
    //    //                "text": value.KHOCODE,
    //    //                "value": value.KHOID
    //    //            });
    //    //            $select.append($option);
    //    //        })
    //    //    })
    //    //    return $(this).html($select);
    //    //}
    //    if (i != 0 && i != 9) {
    //        $(this).html('<input style="width:100%;" type="text" placeholder="Search ' + title + '" />');
    //    }
    //    //$('#filter-header-khomh').on('change', function () {
    //    //    let id = $(this).val();
    //    //    if (id != 1) {
    //    //        var result = objmathanghoadon.filter(word => word.KHOID == id);
    //    //        tbBanhangHoaDonCTP.clear();
    //    //        tbBanhangHoaDonCTP.rows.add(result);
    //    //        tbBanhangHoaDonCTP.columns.adjust().draw();
    //    //    } else {
    //    //        tbBanhangHoaDonCTP.clear();
    //    //        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
    //    //        tbBanhangHoaDonCTP.columns.adjust().draw();
    //    //    }
    //    //});
    //    $('input', this).on('keyup change', function () {
    //        if (tbBanhangHoaDonCTP.column(i).search() !== this.value) {
    //            console.log(tbBanhangHoaDonCTP.column(i).index());
    //            tbBanhangHoaDonCTP
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
    //end

    var objmathanghoadon = [];
    var tbBanhangHoaDonCTP = $('#table-chi-tiet-phieu-bhhd').DataTable({
        orderCellsTop: true,
        bFilter: false,
        bInfo: false,
        data: objmathanghoadon,
        select: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MCTDID);
        },
        "fnRowCallback": function (nRow, data, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);

            $(nRow).attr('data-id', data.MCTDID);
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            tongtienhang = tongtienhang + intVal(data.SOLUONG) * intVal(data.DONGIA);
            var dongiaSl_Index = data.SOLUONG * data.DONGIA
            var chietkhau_Index = dongiaSl_Index * data.TILECHIETKHAU / 100
            var thue_index = (dongiaSl_Index - chietkhau_Index) * data.TILETHUE / 100
            tongthue = tongthue + thue_index * 1
            tongthue = Math.round(tongthue)
            tongchietkhau = tongchietkhau + chietkhau_Index * 1
            tongchietkhau = Math.round(tongchietkhau)
            tongtienhang = Math.round(tongtienhang);
        },
        columns: [
            { data: null },
            {
                "data": "MHCODE",
                render: function (data, type, meta) {
                    if (meta.LINKIMAGE === null || meta.LINKIMAGE === '') {
                        return '<a href ="#">' + data + '</a>';
                    }
                    else {
                        return '<a href =' + meta.LINKIMAGE + ' target="_blank">' + data + '</a>';
                    }
                }
            },
            { data: "MHTEN" },
            //{
            //    data: "KHOID",
            //    render: function (data, type, row) {
            //        var $select = $("<select id='kho-mh'></select>", {
            //        });
            //        if (objKHOMH.length > 1) {
            //            for (var key in objKHOMH) {
            //                var $option = $("<option></option>", {
            //                    "text": objKHOMH[key].KHOCODE,
            //                    "value": objKHOMH[key].KHOID
            //                });
            //                if (objKHOMH[key].KHOID == data) {
            //                    $option.attr("selected", "selected")
            //                }
            //                $select.append($option);
            //            }
            //        }
            //        else {
            //            var $option = $("<option></option>", {
            //                "text": row.KHOCODE,
            //                "value": data
            //            });
            //            $select.append($option);
            //        }
            //        return $select.prop("outerHTML");
            //    }
            //},
            {
                data: "SOLUONG",
                render: function (data, type, full, meta) {
                    return '<input type="text" style="width:100%" name="txt-so-luong" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency" />';
                }
            },
            { data: "DONVI" },
            {
                data: "SoLuongTon",
                render: function (data, type, full, meta) {
                    return '<a type="button" data-toggle="modal" onclick = "CheckKho(\' ' + full.MHID + '\')" href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>';
                }
            },
            {
                data: "GiaSi",
                render: function (data, type, full, meta) {
                    if (data)
                        return '<a type="button" data-toggle="modal" onclick = "ShowGiaSi(\' ' + full.MHID + '\')" href="#">Xem</a>';
                    return '';
                }
            },
            {
                data: "DONGIA",
                render: function (data, type, full, meta) {
                    if (DataRole[0].RoleBH11 == true) {
                        return '<input type="text"  style="width:100%" name="txt-don-gia" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency"/>';
                    }
                    return '<input type="text"  style="width:100%" name="txt-don-gia" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" readonly/>';
                }
            },
            //{
            //    data: "TILETHUE",
            //    render: function (data, type, full, meta) {
            //        if (DataRole[0].RoleBH12 == true) {
            //            return '<input type="text" name="txt-thue" value="' + data + '"  maxlength="2" data-type="currency"/>';
            //        }
            //        return '<input type="text" name="txt-thue" value="' + data + '"  maxlength="2" data-type="currency" readonly />';
            //    }
            //},
            //{
            //    data: "TILECHIETKHAU",
            //    render: function (data, type, row) {
            //        if (CheckIs == true) {
            //            if (DataRole[0].RoleBH13 == true) {
            //                return '<input type="text" name="txt-chiet-khau-tile" value="' + row.TienChietKhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
            //            }
            //            return '<input type="text" name="txt-chiet-khau-tile" value="' + row.TienChietKhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency" readonly/>';
            //        }
            //        else if (CheckIs == false) {
            //            if (DataRole[0].RoleBH13 == true) {
            //                return '<input type="text" name="txt-chiet-khau" value="' + data + '" maxlength="6" data-type="percent" />';
            //            }
            //            return '<input type="text" name="txt-chiet-khau" value="' + data + '" maxlength="6" data-type="percent" readonly/>';
            //        }
            //    }
            //},
            {
                data: "THANHTIEN",
                render: function (data, type, full, meta) {
                    var ConvertData = Math.round(data);
                    return ConvertData.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "GHICHU",
                render: function (data, type, full, meta) {
                    //if (data === "") {
                    //    return '<input type="text" name="txt-ghichu" value="Chưa có"/>';
                    //}
                    return '<input type="text" name="txt-ghichu" value="' + data + '"/>';
                }
            },
            {
                data: null,
                "className": "text-center",
                defaultContent: '<a type="button" id="xoa-ctphieu-bhhd" class="btn btn-danger text-white" >Xóa</a>'
            },
            {
                data: "status",
                visible: false
            },
            {
                data: "TienChietKhau",
                visible: false
            }
        ],
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 200,
        },
        'lengthChange': false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            jQuery.fn.dataTable.Api.register('sum()', function () {
                return this.flatten().reduce(function (a, b) {
                    if (typeof a === 'string') {
                        a = a.replace(/\./g, '') * 1;
                    }
                    if (typeof b === 'string') {
                        b = b.replace(/\./g, '') * 1;
                    }

                    return a + b;
                }, 0);
            });
            //var thanhtien = api
            //    .column(13)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var soluong = api
            //    .column(4)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var dongia = api
            //    .column(10)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var thue = api
            //    .column(11)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var chietkhau = api
            //    .column(12)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var tienchietkhau = api
            //    .column(17)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var soluongton = api
            //    .column(7)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);


            var thanhtien = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            var soluong = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            var dongia = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            var soluongton = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var total = data.length;
            if (total > 0) {
                //    thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                //    ////update footer
                //    $(api.column(0).footer()).html(total);
                //    $(api.column(4).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    $(api.column(7).footer()).html(Math.round(soluongton).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    $(api.column(10).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    $(api.column(11).footer()).html(Math.round(thue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    if (CheckIs == true) {
                //        $(api.column(12).footer()).html(Math.round(tienchietkhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    }
                //    else {
                //        $(api.column(12).footer()).html(chietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    }
                //    $(api.column(13).footer()).html(thanhtien);
                //    $('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    $('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //    $('#tongtien').html(thanhtien);
                //    $('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //}
                //else {
                //    $(api.column(0).footer()).html("0");
                //    $(api.column(4).footer()).html("0");
                //    $(api.column(7).footer()).html("0");
                //    $(api.column(10).footer()).html("0");
                //    $(api.column(11).footer()).html("0");
                //    $(api.column(12).footer()).html("0");
                //    $(api.column(13).footer()).html("0");
                //    $('#thue').html("0");
                //    $('#chietkhau').html("0");
                //    $('#tongtien').html("0");
                //    $('#tienhang').html("0");
                //}
                thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                ////update footer
                $(api.column(0).footer()).html(total);
                $(api.column(3).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(5).footer()).html(Math.round(soluongton).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(7).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(8).footer()).html(thanhtien);
                $('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#tongtien').html(thanhtien);
                $('#tienhang').html(thanhtien);
                //$('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));

            }
            else {
                $(api.column(0).footer()).html("0");
                $(api.column(3).footer()).html("0");
                $(api.column(5).footer()).html("0");
                $(api.column(7).footer()).html("0");
                $(api.column(8).footer()).html("0");
                $('#thue').html("0");
                $('#chietkhau').html("0");
                $('#tongtien').html("0");
                $('#tienhang').html("0");
            }
        }
    });

    //Region chuyển tiền thành tỉ lệ chiết khấu
    var CheckIs = false;
    $('input[name="check-chietkhau-tien-bhhd"]').click(function () {
        CheckIs = $('input[name="check-chietkhau-tien-bhhd"]').is(":checked")
        tongchietkhau = 0;
        tongthue = 0;
        tongtienhang = 0;
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
    });
    //end

    $('#table-search-mahang-bhhd').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang-bhhd tbody tr').not(this).removeClass('selected');
    })
    $(document).keydown(async function (e) {
        let checkSearch = $(".table-search").is(":hidden");
        let checkSearch2 = $("#bhhd-ban").is(":hidden");
        if (!checkSearch) {
            if (e.which == 13) {
                let idmh = $('#table-search-mahang-bhhd tbody').find('.selected').attr('data-id');
                let search = $("#global_filter").val();
                if (search != '') {
                    $("#global_filter").val('');
                }
                LuuMatHang(idmh);
                $(".table-search").hide();
            }
        }
        else if (!checkSearch2) {
            if (e.which == 13) {
                tbBanHangBanHoaDon_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
                tbBanHangBanHoaDon_filterValues.MaKH = $('input[name="search_makh"]').val();
                tbBanHangBanHoaDon_filterValues.TENKH = $('input[name="search_tenkh"]').val();
                tbBanHangBanHoaDon_filterValues.MH = $('input[name="search_mh"]').val();
                tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
                tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
                tbBanHangBanHoaDon_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
                tbBanHangBanHoaDon_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
                tbBanHangBanHoaDon_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
                tbBanHangBanHoaDon_filterValues.NguoiThanhToan = $('input[name="search-txt-nguoithanhtoan"]').val();
                tbBanHangBanHoaDon_filterValues.statusDraw++;
                tbBanHangBanHoaDon.draw();
            }
        }
        else if (e.which == 113) {
            e.preventDefault();
            $('select[name="txt-tenkh"]').get(0).scrollIntoView();
            $('select[name="txt-tenkh"]').select2('open');
        }
        else if (e.which == 114) {
            e.preventDefault();
            var elmnt = document.getElementById("btn-them-bhhd");
            elmnt.scrollIntoView();
            $("#global_filter").click();
            $("#global_filter").focus();
            //if (tbBanHangHoaDonMH_filterValues.statusDraw < 1) {
            //    tbBanHangHoaDonMH_timeout();
            //}
            //$(".table-search").show();
        }
        else if (e.which == 115) {
            e.preventDefault();
            $('#txt-ghichu').focus();
            $('#txt-ghichu').get(0).scrollIntoView();
        }
        else if (e.which == 117) {
            e.preventDefault();
            InHoaDonBanHang();
        }
        else if (e.which == 118) {
            e.preventDefault();
            await InsertOrUpdateBHD(false);
        }
        else if (e.which == 119) {
            e.preventDefault();
            await InsertOrUpdateBHDXepHang(false);
        }
        else if (e.which == 120) {
            e.preventDefault();
            $('#bhhd-ban').modal();
        }
        else if (e.which == 121) {
            e.preventDefault();
            Them();
        }
    })
    //$(document).keypress(function (e) {
    //    let checkSearch = $(".table-search").is(":hidden");
    //    let checkSearch2 = $("#bhhd-ban").is(":hidden");
    //    if (!checkSearch) {
    //        if (e.which == 13) {
    //            let idmh = $('#table-search-mahang-bhhd tbody').find('.selected').attr('data-id');
    //            LuuMatHang(idmh);
    //            $(".table-search").hide();
    //        }
    //    }
    //    else if (!checkSearch2) {
    //        if (e.which == 13) {
    //            tbBanHangBanHoaDon_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
    //            tbBanHangBanHoaDon_filterValues.MaKH = $('input[name="search_makh"]').val();
    //            tbBanHangBanHoaDon_filterValues.TENKH = $('input[name="search_tenkh"]').val();
    //            tbBanHangBanHoaDon_filterValues.MH = $('input[name="search_mh"]').val();
    //            tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
    //            tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
    //            tbBanHangBanHoaDon_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
    //            tbBanHangBanHoaDon_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
    //            tbBanHangBanHoaDon_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
    //            tbBanHangBanHoaDon_filterValues.NguoiThanhToan = $('input[name="search-txt-nguoithanhtoan"]').val();
    //            tbBanHangBanHoaDon_filterValues.statusDraw++;
    //            tbBanHangBanHoaDon.draw();
    //        }
    //    }
    //})
    //dbl
    $("#table-search-mahang-bhhd").on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang-bhhd tbody tr').not(this).removeClass('selected');
        let idmh = $(this).attr('data-id');
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
        }
        LuuMatHang(idmh);
        $(".table-search").hide();
    })
    //end
    //#region chọn mặt hàng ở modal nhỏ
    $("#btn-chon-mh").click(function () {
        let idmh = $('#table-search-mahang-bhhd tbody tr.selected').attr('data-id');
        if (idmh == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            LuuMatHang(idmh);
        }
    });

    $("#btn-chonthoat-mh").click(function () {
        let idmh = $('#table-search-mahang-bhhd tbody tr.selected').attr('data-id');
        if (idmh == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            let search = $("#global_filter").val();
            if (search != '') {
                $("#global_filter").val('');
                //tbBanHangMHHoaDon.ajax.reload();
            }
            LuuMatHang(idmh);
            $(".table-search").hide();
        }
    });
    //end
    $('#btn-thoat-searchmh').click(function () {
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
        }
    })
    //#Region Luu mat hang da chon
    function LuuMatHang(idmh) {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var kho = $("#sl-kho").val();
        let makh = $('select[name="txt-makh"]').select2('data')[0].text;
        let tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        $.ajax({
            type: "GET",
            url: '/BanHang/LoadMatHangByMHID',
            contentType: "application/json; charset=utf-8",
            data: { mathangID: idmh, khoID: kho, makh: makh, tenkh: tenkh },
            dataType: "json",
            success: function (e) {
                if (e.data.length > 0) {
                    let soLuong = 1;
                    if (e.data[0].MHTID == 7) {
                        soLuong = -1
                    }
                    let obj = {
                        MHID: e.data[0].MHID,
                        MHCODE: e.data[0].MHCODE,
                        MHTEN: e.data[0].MHTEN,
                        KHOTEN: e.data[0].KHOTEN,
                        SOLUONG: soLuong,
                        DONVI: e.data[0].DONVI,
                        SoLuongTon: e.data[0].SoLuongTon,
                        DONGIA: e.data[0].GiaBanTheoCap,
                        TILETHUE: 0,
                        TILECHIETKHAU: 0,
                        THANHTIEN: e.data[0].GiaBanTheoCap * soLuong,
                        GHICHU: e.data[0].GHICHU,
                        status: 0,
                        KHOID: e.data[0].KHOID,
                        TienChietKhau: 0,
                        MHTID: e.data[0].MHTID,
                        LINKIMAGE: e.data[0].LINKIMAGE,
                        GiaSi: e.data[0].GiaSi
                    }
                    var exist = false;
                    var index = 0;
                    for (var i = 0; i < objmathanghoadon.length; i++) {
                        if (objmathanghoadon[i].MHID == obj.MHID) {
                            objmathanghoadon[i].SOLUONG = parseInt(objmathanghoadon[i].SOLUONG) + soLuong;
                            exist = true;
                            if (objmathanghoadon[i].status == 1) {
                                objmathanghoadon[i].status = 2;
                            }
                            objmathanghoadon[i].THANHTIEN = objmathanghoadon[i].SOLUONG * objmathanghoadon[i].DONGIA;
                            index = i;
                            break;
                        }
                    }
                    if (exist == false) {
                        objmathanghoadon.push(obj);
                        tbBanhangHoaDonCTP.clear();
                        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        tbBanhangHoaDonCTP.columns.adjust().draw();
                        tbBanhangHoaDonCTP.row(objmathanghoadon.length - 1).select();
                        tbBanhangHoaDonCTP.row(objmathanghoadon.length - 1).scrollTo(false);
                    }
                    else if (exist == true) {
                        tbBanhangHoaDonCTP.clear();
                        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        tbBanhangHoaDonCTP.columns.adjust().draw();
                        tbBanhangHoaDonCTP.row(index).select();
                        tbBanhangHoaDonCTP.row(index).scrollTo(false);
                    }
                }
            }
        });
    };
    //end

    //#Region set draw mat hang trong hoa don ban hang
    function tbBanHangHoaDonMH_timeout() {
        setTimeout(function () {
            tbBanHangHoaDonMH_filterValues.statusDraw++;
            tbBanHangMHHoaDon.columns.adjust().draw();
        }, 500)
    }
    $("#global_filter").on('keyup click', delay(function (e) {
        let checkSearchModal = $(".table-search").is(":hidden");
        if (e.which == 13 || e.which == 113 /*|| e.which == 114*/ || e.which == 115 || e.which == 117 || e.which == 118 || e.which == 119 || e.which == 120 || e.which == 121) {
            return;
        }
        else if (e.which == 27) {
            $(".table-search").hide();
        }
        else {
            if (checkSearchModal) {
                $(".table-search").show();
            }
        }
        let checksearch = $('#global_filter').val();
        if (tbBanHangHoaDonMH_filterValues.statusDraw < 1) {
            tbBanHangHoaDonMH_timeout();
        }
        else if (checksearch != tbBanHangHoaDonMH_filterValues.search) {
            tbBanHangHoaDonMH_filterValues.statusDraw++;
            tbBanHangMHHoaDon.search(checksearch).draw();
        }
    }, 1000))
    //end

    //Thay doi mathang theo kho 
    $('#sl-kho').on('change', function () {
        if (confirm("Bạn có muốn thay đổi mặt hàng theo kho")) {
            let idKho = $('#sl-kho').val();
            let nameKho = $("#sl-kho option:selected").text();
            var MHID = objmathanghoadon.map(({ MHID }) => ({ MHID }))
            var formdata = new FormData();
            formdata.append('MHID', JSON.stringify(MHID));
            formdata.append('KHOID', idKho);
            GetSoluongTon(formdata).then((e) => {
                for (var key in e.data) {
                    for (var key2 in objmathanghoadon) {
                        if (objmathanghoadon[key2].MHID == e.data[key].MHID) {
                            objmathanghoadon[key2].SoLuongTon = e.data[key].soluong;
                            if (objmathanghoadon[key2].status == 1) {
                                objmathanghoadon[key2].status = 2;
                            }
                            objmathanghoadon[key2].KHOID = idKho;
                            break;
                        }
                    }
                }
                tbBanhangHoaDonCTP.clear();
                tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                tbBanhangHoaDonCTP.columns.adjust().draw();
            });
        }
    })
    //end

    //#Region Thay doi du lieu o chi tiet ban hang
    $("#table-chi-tiet-phieu-bhhd").on("change", "tr input[name=txt-don-gia]", async function () {
        let $this = $(this).parents('tr')[0];
        let UpdateObjMH = {};
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var intVal = function (i) {
            return typeof i === 'string' ?
                i.replace(/\./g, '') :
                typeof i === 'number' ?
                    i : 0;
        };

        var tienchietkhau = 0;
        var tilechietkhau = 0;
        var idMH = tbBanhangHoaDonCTP.row($this).data().MHID;
        var soluong = $($this).find('input[name="txt-so-luong"]').val();
        var dongia = $($this).find('input[name="txt-don-gia"]').val();
        var ghichu = $($this).find('input[name="txt-ghichu"]').val();
        //var tilethue = $(this).find('input[name="txt-thue"]').val();
        //var KhoID = $(this).find('#kho-mh').val();
        var CONVERTDONGIA = intVal(dongia);
        var CONVERTSOLUONG = intVal(soluong.replace("-", ""));
        // so sánh số lượng mới xem có đạt số lượng để được giá sỉ không?
        //let giaSi_json = tbBanhangHoaDonCTP.row($this).data().GiaSi?.split('|');
        //console.log('Giá sỉ: ' + giaSi_json);

        //for (let i = 0; i < giaSi_json.length; i++) {
        //    let soLuongTemp = giaSi_json[i]?.split('-');
        //    if (parseInt(CONVERTSOLUONG) >= parseInt(soLuongTemp[1])) {
        //        if (parseInt(soLuongTemp[2]) < parseInt(CONVERTDONGIA)) {
        //            CONVERTDONGIA = intVal(soLuongTemp[2]);
        //        }
        //    } else {
        //        break;
        //    }
        //}

        if (tbBanhangHoaDonCTP.row($this).data().MHTID == 7) {
            CONVERTSOLUONG = - CONVERTSOLUONG;
        }
        var THANHTIEN = CONVERTDONGIA * CONVERTSOLUONG;
        //if (CheckIs == true) {
        //    var chietkhautien = $(this).find('input[name="txt-chiet-khau-tile"]').val();
        //    tienchietkhau = intVal(chietkhautien);
        //    if (parseFloat(tienchietkhau) <= parseFloat(THANHTIEN)) {
        //        tilechietkhau = Math.round(((tienchietkhau / THANHTIEN * 100) * 100) / 100);
        //        THANHTIEN = THANHTIEN - (THANHTIEN * tilechietkhau / 100);
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //    if (parseFloat(tienchietkhau) > parseFloat(THANHTIEN)) {
        //        tienchietkhau = "";
        //        tilechietkhau = "100.00";
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //}
        //else {
        //    var chietkhautile = $(this).find('input[name="txt-chiet-khau"]').val();
        //    tilechietkhau = chietkhautile;
        //    tienchietkhau = THANHTIEN * chietkhautile / 100;
        //    THANHTIEN = THANHTIEN - ((chietkhautile / 100) * THANHTIEN);
        //    THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //}
        UpdateObjMH = {
            MHID: idMH,
            SOLUONG: CONVERTSOLUONG,
            DONGIA: CONVERTDONGIA,
            //TILECHIETKHAU: tilechietkhau,
            //TILETHUE: tilethue,
            THANHTIEN: Math.round(THANHTIEN),
            //TienChietKhau: Math.round(tienchietkhau),
            //KHOID: KhoID
            GHICHU: ghichu
        }
        var i = objmathanghoadon.findIndex(x => x.MHID == idMH);
        //if (objmathanghoadon[i].KHOID != KhoID) {
        //    var formdata = new FormData();
        //    formdata.append("MHID", idMH);
        //    formdata.append("KHOID", KhoID);
        //    await GetSoluongTonChiTiet(formdata).then((e) => {
        //        objmathanghoadon[i].SoLuongTon = e.data[0].soluong;
        //        objmathanghoadon[i].KHOID = e.data[0].KHOID;
        //    })
        //}
        if (objmathanghoadon[i].MHID == UpdateObjMH.MHID) {
            objmathanghoadon[i].SOLUONG = UpdateObjMH.SOLUONG;
            objmathanghoadon[i].DONGIA = UpdateObjMH.DONGIA;
            objmathanghoadon[i].THANHTIEN = UpdateObjMH.THANHTIEN;
            //objmathanghoadon[i].TienChietKhau = UpdateObjMH.TienChietKhau;
            //objmathanghoadon[i].TILECHIETKHAU = UpdateObjMH.TILECHIETKHAU;
            //objmathanghoadon[i].TILETHUE = UpdateObjMH.TILETHUE;
            objmathanghoadon[i].GHICHU = UpdateObjMH.GHICHU;
            if (objmathanghoadon[i].status == 1) {
                objmathanghoadon[i].status = 2;
            }
        }
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
        tbBanhangHoaDonCTP.row(i).select();
        tbBanhangHoaDonCTP.row(i).scrollTo(false);
    });

    $("#table-chi-tiet-phieu-bhhd").on("change", "tr input[name=txt-so-luong]", async function () {
        debugger
        let $this = $(this).parents('tr')[0];
        let UpdateObjMH = {};
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var intVal = function (i) {
            return typeof i === 'string' ?
                i.replace(/\./g, '') :
                typeof i === 'number' ?
                    i : 0;
        };

        var tienchietkhau = 0;
        var tilechietkhau = 0;
        var idMH = tbBanhangHoaDonCTP.row($this).data().MHID;
        var soluong = $($this).find('input[name="txt-so-luong"]').val();
        var dongia = await DoiGia01MHTheoCap(idMH, $('select[name="txt-makh"]').val());
        var ghichu = $($this).find('input[name="txt-ghichu"]').val();
        //var tilethue = $(this).find('input[name="txt-thue"]').val();
        //var KhoID = $(this).find('#kho-mh').val();
        var CONVERTDONGIA = intVal(dongia);
        var CONVERTSOLUONG = intVal(soluong.replace("-", ""));
        // so sánh số lượng mới xem có đạt số lượng để được giá sỉ không?
        let giaSi_json = tbBanhangHoaDonCTP.row($this).data().GiaSi?.split('|');
        console.log('Giá sỉ: ' + giaSi_json);

        for (let i = 0; i < giaSi_json?.length; i++) {
            let soLuongTemp = giaSi_json[i]?.split('-');
            if (parseInt(CONVERTSOLUONG) >= parseInt(soLuongTemp[1])) {
                if (parseInt(soLuongTemp[2]) < parseInt(CONVERTDONGIA)) {
                    CONVERTDONGIA = intVal(soLuongTemp[2]);
                }
            } else {
                break;
            }
        }

        if (tbBanhangHoaDonCTP.row($this).data().MHTID == 7) {
            CONVERTSOLUONG = - CONVERTSOLUONG;
        }
        var THANHTIEN = CONVERTDONGIA * CONVERTSOLUONG;
        //if (CheckIs == true) {
        //    var chietkhautien = $(this).find('input[name="txt-chiet-khau-tile"]').val();
        //    tienchietkhau = intVal(chietkhautien);
        //    if (parseFloat(tienchietkhau) <= parseFloat(THANHTIEN)) {
        //        tilechietkhau = Math.round(((tienchietkhau / THANHTIEN * 100) * 100) / 100);
        //        THANHTIEN = THANHTIEN - (THANHTIEN * tilechietkhau / 100);
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //    if (parseFloat(tienchietkhau) > parseFloat(THANHTIEN)) {
        //        tienchietkhau = "";
        //        tilechietkhau = "100.00";
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //}
        //else {
        //    var chietkhautile = $(this).find('input[name="txt-chiet-khau"]').val();
        //    tilechietkhau = chietkhautile;
        //    tienchietkhau = THANHTIEN * chietkhautile / 100;
        //    THANHTIEN = THANHTIEN - ((chietkhautile / 100) * THANHTIEN);
        //    THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //}
        UpdateObjMH = {
            MHID: idMH,
            SOLUONG: CONVERTSOLUONG,
            DONGIA: CONVERTDONGIA,
            //TILECHIETKHAU: tilechietkhau,
            //TILETHUE: tilethue,
            THANHTIEN: Math.round(THANHTIEN),
            //TienChietKhau: Math.round(tienchietkhau),
            //KHOID: KhoID
            GHICHU: ghichu
        }
        var i = objmathanghoadon.findIndex(x => x.MHID == idMH);
        //if (objmathanghoadon[i].KHOID != KhoID) {
        //    var formdata = new FormData();
        //    formdata.append("MHID", idMH);
        //    formdata.append("KHOID", KhoID);
        //    await GetSoluongTonChiTiet(formdata).then((e) => {
        //        objmathanghoadon[i].SoLuongTon = e.data[0].soluong;
        //        objmathanghoadon[i].KHOID = e.data[0].KHOID;
        //    })
        //}
        if (objmathanghoadon[i].MHID == UpdateObjMH.MHID) {
            objmathanghoadon[i].SOLUONG = UpdateObjMH.SOLUONG;
            objmathanghoadon[i].DONGIA = UpdateObjMH.DONGIA;
            objmathanghoadon[i].THANHTIEN = UpdateObjMH.THANHTIEN;
            //objmathanghoadon[i].TienChietKhau = UpdateObjMH.TienChietKhau;
            //objmathanghoadon[i].TILECHIETKHAU = UpdateObjMH.TILECHIETKHAU;
            //objmathanghoadon[i].TILETHUE = UpdateObjMH.TILETHUE;
            objmathanghoadon[i].GHICHU = UpdateObjMH.GHICHU;
            if (objmathanghoadon[i].status == 1) {
                objmathanghoadon[i].status = 2;
            }
        }
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
        tbBanhangHoaDonCTP.row(i).select();
        tbBanhangHoaDonCTP.row(i).scrollTo(false);
    });

    $("#table-chi-tiet-phieu-bhhd").on("change", "tr input[name=txt-ghichu]", async function () {
        let $this = $(this).parents('tr')[0];
        let UpdateObjMH = {};

        var idMH = tbBanhangHoaDonCTP.row($this).data().MHID;
        var ghichu = $($this).find('input[name="txt-ghichu"]').val();
        UpdateObjMH = {
            MHID: idMH,
            GHICHU: ghichu
        }
        var i = objmathanghoadon.findIndex(x => x.MHID == idMH);
        //if (objmathanghoadon[i].KHOID != KhoID) {
        //    var formdata = new FormData();
        //    formdata.append("MHID", idMH);
        //    formdata.append("KHOID", KhoID);
        //    await GetSoluongTonChiTiet(formdata).then((e) => {
        //        objmathanghoadon[i].SoLuongTon = e.data[0].soluong;
        //        objmathanghoadon[i].KHOID = e.data[0].KHOID;
        //    })
        //}
        if (objmathanghoadon[i].MHID == UpdateObjMH.MHID) {
            objmathanghoadon[i].GHICHU = UpdateObjMH.GHICHU;
            if (objmathanghoadon[i].status == 1) {
                objmathanghoadon[i].status = 2;
            }
        }
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
        tbBanhangHoaDonCTP.row(i).select();
        tbBanhangHoaDonCTP.row(i).scrollTo(false);
    });

    async function DoiGia01MHTheoCap(mhid, makh) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: '/BanHang/DoiGia01MatHangTheoCapKH?mhid=' + mhid + '&makh=' + makh,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (res) {
                    if (res.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: res.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                    else {
                        console.log(res?.data[0]?.GiaBan || 0)
                        resolve(res?.data[0]?.GiaBan || 0);
                    }
                }
            })
        });
    }
    //end

    //Region update va Insert ChiTiet Phieu va Phieu
    let idXepHang;
    $('#btn-ghi-bhhd').click(async function () {
        await InsertOrUpdateBHD(false);
    });
    $('#btn-bhd').click(async function () {
        await InsertOrUpdateBHD(true);
    });
    async function InsertOrUpdateBHD(tieptucghi) {
        let $currentForm = $('#form-nv');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbBanhangHoaDonCTP.data().count();
        if (countdata <= 0) {
            $currentForm.addClass('was-validated');
            alert("Phải chọn ít nhất 1 mặt hàng ")
            return false;
        }
        $currentForm.addClass('was-validated');
        var idmh = $('input[name="txt_idbhd"]').val();
        var idmd = $('input[name="txt_idmd"]').val();
        var lydo = $('select[name="sl-lydoxuat"]').val();
        var sophieu = $('input[name="txt_so_phieu_bhd"]').val();
        var hinhthuc = $('select[name="sl-hinhthuc"]').val();
        var sohopdong = $('input[name="txt_so_hop_dong"]').val();
        var ngayxuat = $('input[name="txt_ngay-xuat"]').val();
        var hanthanhtoan = $('input[name="txt_ngay-htt"]').val();
        var maKH = $('select[name="txt-makh"]').select2('data')[0].text;
        var tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        var manv = $('select[name="txt-manv"]').select2('data')[0].text;
        var tennv = $('select[name="txt-tennv"]').select2('data')[0].text;
        var diengiai = $('textarea[name="txt-ghichu"]').val();
        let objchange = [];
        for (var key in objmathanghoadon) {
            if (objmathanghoadon[key].status == 0 || objmathanghoadon[key].status == 2) {
                objchange.push(objmathanghoadon[key]);
            }
        }
        MATHANGHOADONJSON = JSON.stringify(objchange);
        var objmuadon = MATHANGHOADONJSON;
        DELETEMATHANGHOADONJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGHOADONJSON;
        let data = new FormData();
        data.append("idmh", idmh);
        data.append("idmd", idmd);
        data.append("lydo", lydo);
        data.append("sophieu", sophieu);
        data.append("idhinhthuc", hinhthuc);
        data.append("sohopdong", sohopdong);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("manv", manv);
        data.append("ngayxuat", ngayxuat);
        data.append("tennv", tennv);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        data.append("tieptucghi", tieptucghi);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddBanHangHoaDon',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.ajaxresult.status == 1) {
                    $("#canhbaoxuatkhoam").modal('hide');
                    objMatHangDELETE = [];
                    MATHANGHOADONJSON = null;
                    DELETEMATHANGHOADONJSON = null;
                    CheckNutGhi = true;
                    if (msg.InsertBHHD != undefined && msg.InsertBHHD != "") {
                        let BHDID = msg.InsertBHHD;
                        //idXepHang = BHDID;
                        objmathanghoadon = [];
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        $.ajax({
                            method: "GET",
                            url: "/BanHang/CheckRoleInBHD",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.status == 1) {
                                    let id = BHDID;
                                    let getOrder = tbBanhangHoaDonCTP.order();
                                    let Desc = getOrder[0][1];
                                    let NumberOrder = getOrder[0][0];
                                    var link = '/BanHang/InHoaDonBanHang?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
                                    window.open(link);
                                }
                            }
                        })
                        tbBanhangHoaDonCTP.clear();
                        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        tbBanhangHoaDonCTP.columns.adjust().draw();
                        LoadReset();
                        if (msg.MDID != "" && msg.MDID != undefined) {
                            existMDID = msg.MDID;
                            CapNhatPhieuChuyen();
                        }
                    }
                    else if (msg.UpdateBHHD != "" && msg.UpdateBHHD != undefined) {
                        BanHangHDChiTiet(msg.UpdateBHHD);
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //objmathanghoadon.map(function (x) {
                        //    x.status = 1;
                        //});
                        //tbBanhangHoaDonCTP.clear();
                        //tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        //tbBanhangHoaDonCTP.columns.adjust().draw();
                    }
                }
                else if (msg.ajaxresult.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                }
                else if (msg.ajaxresult.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
                else if (msg.ajaxresult.status == 4)// xuất mặt hàng kho anh
                {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    objmathangxuatkhoam = null;
                    objmathangxuatkhoam = msg.ajaxresult.data;
                    $('#btn-bhd').show();
                    $('#btn-bhd-xephang').hide();
                    $('#btn-bhd-ghiso').hide();
                    $("#canhbaoxuatkhoam").modal();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    }

    async function InsertOrUpdateBHDXepHang(tieptucghi) {
        let $currentForm = $('#form-nv');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbBanhangHoaDonCTP.data().count();
        if (countdata <= 0) {
            $currentForm.addClass('was-validated');
            alert("Phải chọn ít nhất 1 mặt hàng ")
            return false;
        }
        $currentForm.addClass('was-validated');
        var idmh = $('input[name="txt_idbhd"]').val();
        if (idmh != '') {
            alert("Hóa đơn đã thêm không đưa vào xếp hàng");
            return false;
        }
        var idmd = $('input[name="txt_idmd"]').val();
        var lydo = $('select[name="sl-lydoxuat"]').val();
        var sophieu = $('input[name="txt_so_phieu_bhd"]').val();
        var hinhthuc = $('select[name="sl-hinhthuc"]').val();
        var sohopdong = $('input[name="txt_so_hop_dong"]').val();
        var ngayxuat = $('input[name="txt_ngay-xuat"]').val();
        var hanthanhtoan = $('input[name="txt_ngay-htt"]').val();
        var maKH = $('select[name="txt-makh"]').select2('data')[0].text;
        var tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        var manv = $('select[name="txt-manv"]').select2('data')[0].text;
        var tennv = $('select[name="txt-tennv"]').select2('data')[0].text;
        var diengiai = $('textarea[name="txt-ghichu"]').val();
        let objchange = [];
        for (var key in objmathanghoadon) {
            if (objmathanghoadon[key].status == 0 || objmathanghoadon[key].status == 2) {
                objchange.push(objmathanghoadon[key]);
            }
        }
        MATHANGHOADONJSON = JSON.stringify(objchange);
        var objmuadon = MATHANGHOADONJSON;
        DELETEMATHANGHOADONJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGHOADONJSON;
        let data = new FormData();
        data.append("idmh", idmh);
        data.append("idmd", idmd);
        data.append("lydo", lydo);
        data.append("sophieu", sophieu);
        data.append("idhinhthuc", hinhthuc);
        data.append("sohopdong", sohopdong);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("manv", manv);
        data.append("ngayxuat", ngayxuat);
        data.append("tennv", tennv);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        data.append("tieptucghi", tieptucghi);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddBanHangHoaDon',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.ajaxresult.status == 1) {
                    $("#canhbaoxuatkhoam").modal('hide');
                    objMatHangDELETE = [];
                    MATHANGHOADONJSON = null;
                    DELETEMATHANGHOADONJSON = null;
                    CheckNutGhi = true;
                    if (msg.InsertBHHD != undefined && msg.InsertBHHD != "") {
                        //let BHDID = msg.InsertBHHD;
                        //idXepHang = BHDID;
                        objmathanghoadon = [];
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //let data = new FormData();
                        //data.append('BHDID', msg.InsertBHHD);
                        //data.append('type', 'banhang');
                        //$.ajax({
                        //    async: true,
                        //    type: 'POST',
                        //    url: '/BanHang/InsertXepHang',
                        //    data: data,
                        //    contentType: false,
                        //    processData: false,
                        //    success: function (rs) {
                        //        if (rs.status == 1) {
                        //            console.log(rs.message);
                        //        }
                        //        else {
                        //            console.log(rs.message);
                        //        }
                        //    },
                        //    error: function (error) {
                        //        console.log(error);
                        //    }
                        //});

                        tbBanhangHoaDonCTP.clear();
                        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        tbBanhangHoaDonCTP.columns.adjust().draw();
                        LoadReset();
                        if (msg.MDID != "" && msg.MDID != undefined) {
                            existMDID = msg.MDID;
                            CapNhatPhieuChuyen();
                        }
                    }
                    else if (msg.UpdateBHHD != "" && msg.UpdateBHHD != undefined) {
                        BanHangHDChiTiet(msg.UpdateBHHD);
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //objmathanghoadon.map(function (x) {
                        //    x.status = 1;
                        //});
                        //tbBanhangHoaDonCTP.clear();
                        //tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        //tbBanhangHoaDonCTP.columns.adjust().draw();
                    }
                }
                else if (msg.ajaxresult.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                }
                else if (msg.ajaxresult.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
                else if (msg.ajaxresult.status == 4)// xuất mặt hàng kho anh
                {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    objmathangxuatkhoam = null;
                    objmathangxuatkhoam = msg.ajaxresult.data;
                    $('#btn-bhd').hide();
                    $('#btn-bhd-xephang').show();
                    $('#btn-bhd-ghiso').hide();
                    $("#canhbaoxuatkhoam").modal();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    }
    //$('#btn-nap-bhhd').click(function () {
    //    tbXepHang.draw();
    //})
    $('#btn-ghi-bhhd-xephang').on('click', async function () {
        await InsertOrUpdateBHDXepHang(false);
        //var id = $('#them-order input[name="txt-edit-id"]').val();
        //if (idXepHang != null && idXepHang != "") {
        //    let data = new FormData();
        //    data.append('BHDID', idXepHang);
        //    $.ajax({
        //        async: true,
        //        type: 'POST',
        //        url: '/BanHang/InsertXepHang',
        //        data: data,
        //        contentType: false,
        //        processData: false,
        //        success: function (rs) {
        //            if (rs.status == 1) {
        //                console.log(rs.message);
        //                //tbXepHang.columns.adjust().draw();
        //            }
        //            else {
        //                console.log(rs.message);
        //            }
        //        },
        //        error: function (error) {
        //            console.log(error);
        //        }
        //    });
        //}

    });
    $('#btn-bhd-xephang').on('click', async function () {
        await InsertOrUpdateBHDXepHang(true);
    });
    //end

    // Xep hang
    //let iDraw = 0;
    //$('#btn-xep-hang').on('click', function () {
    //    if (iDraw == 0) {
    //        iDraw++;
    //        tbXepHang.draw();
    //    }
    //    $('#modal-xep-hang').modal();
    //});
    //$("#modal-xep-hang").on('shown.bs.modal', function () {
    //    tbXepHang.columns.adjust();
    //})
    //$('#table-xep-hang tbody').on('click', 'a[type="button"]', function () {
    //    var id = $(this).attr('value');
    //    if ($(this).attr('id') == 'delete-xephang-bh') {
    //        if (confirm('Bạn chắc chắn muốn hủy xếp hàng cho đơn này không?')) {
    //            $.ajax({
    //                async: true,
    //                method: 'GET',
    //                url: '/BanHang/DeleteXepHang?id=' + id,
    //                success: function (msg) {
    //                    if (msg.rs) {
    //                        tbXepHang.columns.adjust().draw();
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: 'Thành công',
    //                            icon: 'check',
    //                            classBackground: 'noti-success',
    //                            timeout: 3000
    //                        });
    //                    }
    //                    else {
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: msg.message,
    //                            icon: 'error_outline',
    //                            classBackground: 'noti-error',
    //                            timeout: 3000
    //                        });
    //                    }
    //                }
    //            });
    //        }
    //    }
    //    else if ($(this).attr('id') == 'print-xephang-thanhtoan') {
    //        $.ajax({
    //            method: "GET",
    //            url: "/BanHang/CheckRoleInBHD",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (msg) {
    //                if (msg.status == 1) {
    //                    let getOrder = tbBanhangHoaDonCTP.order();
    //                    let Desc = getOrder[0][1];
    //                    let NumberOrder = getOrder[0][0];
    //                    var link = '/BanHang/InThanhToanXepHangBanHang?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
    //                    window.open(link);
    //                    $.ajax({
    //                        async: true,
    //                        method: 'GET',
    //                        url: '/BanHang/DeleteXepHang?id=' + id,
    //                        success: function (msg) {
    //                            if (msg.rs) {
    //                                tbXepHang.columns.adjust().draw();
    //                            }
    //                        }
    //                    });
    //                }
    //                else if (msg.status == 2) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                }
    //                else if (msg.status == 3) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                    location.reload();
    //                }
    //            }
    //        })
    //    }
    //    else {
    //        $.ajax({
    //            method: "GET",
    //            url: "/BanHang/CheckRoleInBHD",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (msg) {
    //                if (msg.status == 1) {
    //                    let getOrder = tbBanhangHoaDonCTP.order();
    //                    let Desc = getOrder[0][1];
    //                    let NumberOrder = getOrder[0][0];
    //                    var link = '/BanHang/InXepHangBanHang?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
    //                    window.open(link);
    //                    $.ajax({
    //                        async: true,
    //                        method: 'GET',
    //                        url: '/BanHang/DeleteXepHang?id=' + id,
    //                        success: function (msg) {
    //                            if (msg.rs) {
    //                                tbXepHang.columns.adjust().draw();
    //                            }
    //                        }
    //                    });
    //                }
    //                else if (msg.status == 2) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                }
    //                else if (msg.status == 3) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                    location.reload();
    //                }
    //            }
    //        })
    //    }
    //});
    //let tbXepHang_filterValues = {};
    //let tbXepHang = $('#table-xep-hang').DataTable({
    //    serverSide: true,
    //    bFilter: false,
    //    bInfo: false,
    //    ajax: function (data, callback, settings) {
    //        if (iDraw > 0) {
    //            tbXepHang_filterValues.draw = data.draw;
    //            tbXepHang_filterValues.start = data.start;
    //            tbXepHang_filterValues.length = data.length;
    //            tbXepHang_filterValues.order = data.order[0].column;
    //            tbXepHang_filterValues.dir = data.order[0].dir;
    //            tbXepHang_filterValues.search = data.search["value"];
    //            $.ajax({
    //                url: '/BanHang/LoadXepHang',
    //                method: 'GET',
    //                data: tbXepHang_filterValues,
    //                success: function (msg) {
    //                    if (msg.status == 2) {
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: msg.message,
    //                            icon: 'error_outline',
    //                            classBackground: 'noti-error',
    //                            timeout: 3000
    //                        });
    //                        return false;
    //                    }
    //                    else if (msg.status == 3) {
    //                        if (tbXepHang_filterValues.draw != 1) {
    //                            toast.create({
    //                                title: 'Notification',
    //                                text: msg.message,
    //                                icon: 'error-outline',
    //                                classBackground: 'noti-error',
    //                                timeout: 3000
    //                            });
    //                            location.reload();
    //                            return false;
    //                        }
    //                    }
    //                }
    //            }).done(callback, () => { });
    //        }
    //    },
    //    "order": [[1, "desc"]],
    //    columnDefs: [
    //        {
    //            "targets": [0, 7],
    //            "orderable": false
    //        }
    //    ],
    //    columns: [
    //        { "data": null },
    //        { "data": "NGAYHDSTRING" },
    //        { "data": "BHDCODE" },
    //        { "data": "NVTEN" },
    //        { "data": "KHTEN" },
    //        { "data": "DIENGIAI" },
    //        {
    //            "data": "TONGTIEN",
    //            render: function (data) {
    //                return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    //            }
    //            //"className": "text-right"
    //        },
    //        {
    //            "data": "BHDID",
    //            render: function (data, type, row) {
    //                return '<a type="button" id="print-xephang" value="' + data + '" class="btn btn-success text-white mr-1"> In</a><a type="button" id="print-xephang-thanhtoan" value="' + data + '" class="btn btn-success text-white mr-1">Thanh Toán</a><a type="button" id="delete-xephang-bh" value="' + data + '" class="btn btn-danger text-white"> Hủy</a>';
    //            }
    //        },
    //    ],
    //    columnDefs: [
    //        { "width": "5%", "targets": 0 },
    //        { "width": "15%", "targets": 1 },
    //        { "width": "20%", "targets": 2 },
    //        { "width": "10%", "targets": 3 },
    //        { "width": "30%", "targets": 4 },
    //        { "width": "20%", "targets": 5 }
    //    ],
    //    fnCreatedRow: function (nRow, data, iDataIndex) {
    //        $(nRow).attr('data-id', data.BHDID);
    //    },
    //    "fnRowCallback": function (nRow, data, iDisplayIndex) {
    //        var info = $(this).DataTable().page.info();
    //        $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
    //    },
    //    scrollX: true,
    //    scrollResize: true,
    //    scrollY: 100,
    //    scrollCollapse: true,

    //    paging: true,
    //    searching: true,
    //    pageLength: 10,
    //    lengthChange: false,

    //    scroller: {
    //        loadingIndicator: true,
    //        displayBuffer: 50
    //    },
    //});
    //end

    //Cap nhat phieu chuyen sang hoa don
    var existMDID = "";
    function CapNhatPhieuChuyen() {
        if (existMDID != "") {
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckRoleCapNhatBH",
                data: { select: existMDID },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.rs == true) {
                        $('#sl-trangthai-phieu').val(msg.MHIDStatus).trigger('change');
                        $('input[name="check-chuyenphieu"]').prop("checked", msg.MHIDSHIP);
                        $("#click-right").modal();
                    }
                }
            })
        }
    }
    $("#btn-capnhat-BH").click(function () {
        if (existMDID == "") {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
            $("#click-right").modal("hide");
        } else {
            let trangthaiphieu = $("#sl-trangthai-phieu").val()
            let trangthaichuyen = $('input[name="check-chuyenphieu"]').is(":checked")
            $.ajax({
                method: "GET",
                url: "/BanHang/CapNhatBanHang",
                data: { idmh: existMDID, ttcp: trangthaichuyen, ttp: trangthaiphieu },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.status == 1) {

                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        $('#click-right').modal("hide");

                    }
                    else if (msg.status == 3) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        location.reload();
                    }
                }
            })
        }
    })

    $('#table-chi-tiet-phieu-bhhd tbody').on('click', 'td [id="xoa-ctphieu-bhhd"]', function () {
        var Phieu = tbBanhangHoaDonCTP.row($(this).closest('tr')).data();
        console.log(Phieu);
        var it = this;
        if (Phieu.status == 1 || Phieu.status == 2) {
            if (confirm("Bạn chắc chắn muốn xóa không")) {
                for (var i = 0; i < objmathanghoadon.length; i++) {
                    if (objmathanghoadon[i].BCTHDID == Phieu.BCTHDID) {
                        objmathanghoadon.splice(i, 1);
                        tongchietkhau = 0;
                        tongtienhang = 0;
                        tongthue = 0;
                        break;
                    }
                }
                tbBanhangHoaDonCTP.row($(it).closest('tr')).remove().draw();
                objMatHangDELETE.push({ "BCTHDID": Phieu.BCTHDID });
            }
            //$.ajax({
            //    method: "GET",
            //    url: "/BanHang/CheckRoleXoaBanHangHoaDon",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (msg) {
            //        if (msg.status == 1) {
            //            if (confirm("Bạn chắc chắn muốn xóa không")) {
            //                for (var i = 0; i < objmathanghoadon.length; i++) {
            //                    if (objmathanghoadon[i].BCTHDID == Phieu.BCTHDID) {
            //                        objmathanghoadon.splice(i, 1);
            //                        tongchietkhau = 0;
            //                        tongtienhang = 0;
            //                        tongthue = 0;
            //                        break;
            //                    }
            //                }
            //                tbBanhangHoaDonCTP.row($(it).closest('tr')).remove().draw();
            //                objMatHangDELETE.push({ "BCTHDID": Phieu.BCTHDID });
            //            }
            //        } else if (msg.status == 2) {
            //            toast.create({
            //                title: 'Notification!',
            //                text: msg.message,
            //                icon: 'error_outline',
            //                classBackground: 'noti-error',
            //                timeout: 3000
            //            });
            //        }
            //        else if (msg.status == 3) {
            //            toast.create({
            //                title: 'Notification!',
            //                text: msg.message,
            //                icon: 'error_outline',
            //                classBackground: 'noti-error',
            //                timeout: 3000
            //            });
            //            location.reload();
            //        }
            //    }
            //})
        }
        else {
            for (var i = 0; i < objmathanghoadon.length; i++) {
                if (objmathanghoadon[i].MHID == Phieu.MHID) {
                    objmathanghoadon.splice(i, 1);
                    tongchietkhau = 0;
                    tongtienhang = 0;
                    tongthue = 0;
                    break;
                }
            }
            tbBanhangHoaDonCTP.row($(it).closest('tr')).remove().draw();
        }
    });

    //#Region set draw mat hang o ngoai
    //function tbBanHangMHHoaDon_timeout() {
    //    setTimeout(function () {
    //        tbBanHangHoaDonMH_filterValues.statusDraw++;
    //        tbBanHangMHHoaDon.columns.adjust().draw();
    //    }, 500)
    //}
    //$("#global_filter").on('keyup click', function () {
    //    console.log('varo');
    //    var checksearch = $('#global_filter').val();
    //    if (tbBanHangHoaDonMH_filterValues.statusDraw < 1) {
    //        tbBanHangMHHoaDon_timeout();
    //    }
    //    else if (checksearch != tbBanHangHoaDonMH_filterValues.search) {
    //        tbBanHangHoaDonMH_filterValues.statusDraw++;
    //        tbBanHangMHHoaDon.search(checksearch).draw();
    //    }
    //})
    //end


    //keyup dien giai
    $('input[name="search-txt-diengiai"]').on('keyup change', delay(function () {
        if ($('input[name="search-txt-diengiai"]').is(':focus')) {
            tbBanHangBanHoaDon_filterValues.diengiai = $(this).val();
            tbBanHangBanHoaDon.columns.adjust().draw();
        }
    }, 1000));
    //end
    //#Region Load Ban Hoa Don
    let tbBanHangBanHoaDon_filterValues = {};
    tbBanHangBanHoaDon_filterValues.statusDraw = 0;
    var tbBanHangBanHoaDon = $('#tablebh_hoadonban').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        "order": [[2, "desc"]],
        ajax: function (data, callback, settings) {
            if (tbBanHangBanHoaDon_filterValues.statusDraw > 0) {
                tbBanHangBanHoaDon_filterValues.draw = data.draw;
                tbBanHangBanHoaDon_filterValues.start = data.start;
                tbBanHangBanHoaDon_filterValues.length = data.length;
                tbBanHangBanHoaDon_filterValues.order = data.order[0].column;
                tbBanHangBanHoaDon_filterValues.dir = data.order[0].dir;
                tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
                tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
                //if (tbBanHangBanHoaDon_filterValues.statusDraw > 1) {
                //    tbBanHangBanHoaDon_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
                //    tbBanHangBanHoaDon_filterValues.MaKH = $('input[name="search_makh"]').val();
                //    tbBanHangBanHoaDon_filterValues.TENKH = $('input[name="search_tenkh"]').val();
                //    tbBanHangBanHoaDon_filterValues.MH = $('input[name="search_mh"]').val();
                //    tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
                //    tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
                //    tbBanHangBanHoaDon_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
                //}
                $.ajax({
                    url: '/BanHang/LoadBanHD',
                    method: 'GET',
                    data: tbBanHangBanHoaDon_filterValues,
                    success: function (msg) {
                        console.log(msg.data);
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        } else if (msg.status == 3) {
                            if (tbBanHangBanHoaDon_filterValues.draw != 1) {
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
            }
        },
        columns: [
            {
                "data": null,
                defaultContent: "1"
            },
            { "data": "BHDCODE" },
            { "data": "NgayHDString" },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "NVTEN" },
            { data: "DIENGIAI" },
            {
                "data": "TONGTIEN",
                render: function (data, type, full, meta) {
                    var TONGTIEN = Math.round(data);
                    return TONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { "data": "LyDo" },
            { "data": "USERID" },
            { "data": "NguoiThaoTac" },
            {
                "data": "ThaoTac",
                render: function (data, type, full, meta) {
                    if (data == 3) {
                        return "Thanh toán";
                    }
                    else if (data == 4) {
                        return "Hủy";
                    }
                    return "";
                }
            }
        ],
        columnDefs: [
            {
                "targets": [0, 3],
                "orderable": false
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.BHDID);
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        scrollX: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10,
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();
            let totalRow = 0;
            let tongTien = 0;
            if (data.length > 0) {
                totalRow = data[0].TotalRow;
                tongTien = data[0].TongtienAll
            }

            $(api.column(1).footer()).text(totalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
            //$(api.column(7).footer()).text(tongTien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
        }
    });
    //end

    //#Region Excel Ban Hang Ban Hoa Don
    $('#btn-xuat-bhhd').click(function () {
        var tbBanHangBanHoaDon_excel = {};
        tbBanHangBanHoaDon_excel.draw = tbBanHangBanHoaDon_filterValues.draw;
        tbBanHangBanHoaDon_excel.start = tbBanHangBanHoaDon_filterValues.start;
        tbBanHangBanHoaDon_excel.length = tbBanHangBanHoaDon_filterValues.length;
        tbBanHangBanHoaDon_excel.order = tbBanHangBanHoaDon_filterValues.order;
        tbBanHangBanHoaDon_excel.dir = tbBanHangBanHoaDon_filterValues.dir;
        tbBanHangBanHoaDon_excel.FromDate = $("#search-tungay").val();
        tbBanHangBanHoaDon_excel.ToDate = $("#search-denngay").val();
        tbBanHangBanHoaDon_excel.SoPhieu = $('input[name="search_sophieu"]').val();
        tbBanHangBanHoaDon_excel.MaKH = $('input[name="search_makh"]').val();
        tbBanHangBanHoaDon_excel.TENKH = $('input[name="search_tenkh"]').val();
        tbBanHangBanHoaDon_excel.MH = $('input[name="search_mh"]').val();
        tbBanHangBanHoaDon_excel.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
        tbBanHangBanHoaDon_excel.NguoiLap = $('input[name="search-txt-nguoilap').val();
        tbBanHangBanHoaDon_excel.TENNV = $('input[name="search-txt-tennv"]').val();
        tbBanHangBanHoaDon_excel.diengiai = $('input[name="search-txt-diengiai"]').val();
        tbBanHangBanHoaDon_excel.NguoiThanhToan = $('input[name="search-txt-nguoithanhtoan"]').val();
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuatBHHD",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    var link = `/BanHang/ExcelBanHangBHHD?draw=` + tbBanHangBanHoaDon_excel.draw + `&start=` + tbBanHangBanHoaDon_excel.start + `&length=` + tbBanHangBanHoaDon_excel.length + `&order=` + tbBanHangBanHoaDon_excel.order + `&dir=` + tbBanHangBanHoaDon_excel.dir + `&FromDate=` + tbBanHangBanHoaDon_excel.FromDate + `&ToDate=` + tbBanHangBanHoaDon_excel.ToDate + `&SoPhieu=` + tbBanHangBanHoaDon_excel.SoPhieu + `&MaKH=` + tbBanHangBanHoaDon_excel.MaKH + `&TENKH=` + tbBanHangBanHoaDon_excel.TENKH + `&MH=` + tbBanHangBanHoaDon_excel.MH + `&LyDoNhap=` + tbBanHangBanHoaDon_excel.LyDoNhap + `&TENNV=` + tbBanHangBanHoaDon_excel.TENNV + `&NguoiLap=` + tbBanHangBanHoaDon_excel.NguoiLap + `&diengiai=` + tbBanHangBanHoaDon_excel.diengiai + `&NguoiThanhToan=` + tbBanHangBanHoaDon_excel.NguoiThanhToan + ``;
                    window.open(link)
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    });
    //End

    //#Region setTimeout cho table hoa don
    function BHHD_timeout() {
        setTimeout(function () {
            tbBanHangBanHoaDon_filterValues.statusDraw++;
            tbBanHangBanHoaDon.columns.adjust().draw();

        }, 100)
    }
    //end

    //#Region chon hoa don
    $('#tablebh_hoadonban tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#tablebh_hoadonban tbody tr').not(this).removeClass('selected')
    })

    $('#tablebh_hoadonban tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#tablebh_hoadonban tbody tr').not(this).removeClass('selected');
        BanHangHDChiTiet($(this).attr('data-id'));
    });
    //end

    //#region chọn mặt hàng ở modal nhỏ
    $('#table-mh-bhd-1').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-mh-bhd-1 tbody tr').not(this).removeClass('selected');
    })
    //#region chọn mặt hàng ở modal nhỏ
    $("#btn-mh-thoat").click(function () {
        let $this = $('#table-mh-bhd-1 tbody tr.selected');
        let select = tbBanHangMHHoaDon1.row($this).data();
        if (select == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $('input[name="search_mh"]').val(select.MHCODE);
            tbBanHangBanHoaDon_filterValues.statusDraw++;
            $('#tim-kiem-mat-hang-bhhd1').modal('hide');
            tbBanHangBanHoaDon.draw();
        }
    });
    //end

    //#Region tìm kiếm ban hoa don
    //$("#form-banhang-hoadon").on('change', function () {
    //    tbBanHangBanHoaDon_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
    //    tbBanHangBanHoaDon_filterValues.MaKH = $('input[name="search_makh"]').val();
    //    tbBanHangBanHoaDon_filterValues.TENKH = $('input[name="search_tenkh"]').val();
    //    tbBanHangBanHoaDon_filterValues.MH = $('input[name="search_mh"]').val();
    //    tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
    //    tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
    //    tbBanHangBanHoaDon_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
    //    tbBanHangBanHoaDon_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
    //    tbBanHangBanHoaDon_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
    //    tbBanHangBanHoaDon_filterValues.statusDraw++;
    //    tbBanHangBanHoaDon.draw();
    //})

    $('#btn-tim').click(function () {
        tbBanHangBanHoaDon_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
        tbBanHangBanHoaDon_filterValues.MaKH = $('input[name="search_makh"]').val();
        tbBanHangBanHoaDon_filterValues.TENKH = $('input[name="search_tenkh"]').val();
        tbBanHangBanHoaDon_filterValues.MH = $('input[name="search_mh"]').val();
        tbBanHangBanHoaDon_filterValues.FromDate = $("#search-tungay").val();
        tbBanHangBanHoaDon_filterValues.ToDate = $("#search-denngay").val();
        tbBanHangBanHoaDon_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
        tbBanHangBanHoaDon_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
        tbBanHangBanHoaDon_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
        tbBanHangBanHoaDon_filterValues.NguoiThanhToan = $('input[name="search-txt-nguoithanhtoan"]').val();
        tbBanHangBanHoaDon_filterValues.statusDraw++;
        tbBanHangBanHoaDon.draw();
    })
    //end
    var CheckNutGhi = false;
    //#Region set draw banhoa don
    $("#bhhd-ban").on('shown.bs.modal', function () {
        if (tbBanHangBanHoaDon_filterValues.statusDraw < 1) {
            tbBanHangBanHoaDon_filterValues.statusDraw++;
            tbBanHangBanHoaDon.columns.adjust().draw();
            LoadDataLyDo().then((e) => {
                $("#search-sl-lydonhap").append(e.listlydoxuat);
            })
        }
        if (CheckNutGhi) {
            CheckNutGhi = false;
            BHHD_timeout();
        }
        $('input[name="search_sophieu"]').focus();
    });
    //end
    //Region LoadKho dc sử dụng
    LoadKho().then((e) => {
        e.data.map((value) => {
            objKHOMH.push({ KHOID: value.KHOID, KHOCODE: value.KHOCODE });
        })
    })
    //end

    //#Region Load Chi Tiet Ban HangHD
    function BanHangHDChiTiet(hd) {
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        $.ajax({
            type: "POST",
            url: "/BanHang/LoadBanHangHoaDonDetail",
            data: '{hd: "' + hd + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.rs == true) {
                    $('#qrcode').empty();
                    var qrcode = new QRCode("qrcode", {
                        width: 47,
                        height: 47,
                    });
                    qrcode.makeCode(msg.CTBHHD.BHDCODE);
                    $('#btn-ghi-bhhd-xephang').addClass('disabled-dia-chi');
                    $('#btn-ghi-bhhd').removeClass('hidden');
                    $('#modal-ghi-vitri').addClass('disabled-dia-chi');
                    $('input[name="txt_idbhd"]').val(msg.CTBHHD.BHDID);
                    $('select[name="sl-lydoxuat"]').val(msg.CTBHHD.LDXID);
                    $('select[name="sl-lydoxuat"]').trigger('change.select2');
                    $('input[name="txt_so_phieu_bhd"]').val(msg.CTBHHD.BHDCODE);
                    $('select[name="sl-hinhthuc"]').val(msg.CTBHHD.HTTTID);
                    $('input[name="txt_so_hop_dong"]').val(msg.CTBHHD.BDCODE);
                    $('input[name="txt_ngay-xuat"]').val(moment(msg.CTBHHD.NGAYHD).format('DD/MM/yyyy'));
                    $('input[name="txt_ngay-htt"]').val(moment(msg.CTBHHD.HANTHANHTOAN).format('DD/MM/yyyy'));
                    $('select[name="txt-tennv"]').val(msg.CTBHHD.NVID);
                    $('select[name="txt-manv"]').val(msg.CTBHHD.NVID);
                    $('select[name="txt-makh"]').val(msg.CTBHHD.KHID);
                    $('select[name="txt-tenkh"]').val(msg.CTBHHD.KHID);
                    $('select[name="txt-tennv"]').trigger('change.select2');//trigger
                    $('select[name="txt-manv"]').trigger('change.select2');//trigger
                    $('select[name="txt-makh"]').trigger('change.select2');//trigger
                    $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
                    let SDT = $('select[name="txt-makh"]').select2("data")[0].element.attributes[1].nodeValue
                    let DIACHI = $('select[name="txt-makh"]').select2("data")[0].element.attributes[2].nodeValue
                    let GHICHU = $('select[name="txt-makh"]').select2("data")[0].element.attributes[3].nodeValue
                    $('#txt-sdt').val(SDT);
                    $('#txt-diachi').val(DIACHI);
                    $('#txt-ghichu-kh').val(GHICHU);
                    $('textarea[name="txt-ghichu"]').val(msg.CTBHHD.DIENGIAI);
                    objmathanghoadon = msg.CTMHBHHD;
                    tbBanhangHoaDonCTP.clear();
                    tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                    tbBanhangHoaDonCTP.columns.adjust().draw();
                    $('#bhhd-ban').modal('hide');
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    }
    //end

    function PhieuBanHangChiTiet(hd) {
        $.ajax({
            type: "POST",
            url: "/BanHang/ChiTietPhieu",
            data: '{hd: "' + hd + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.rs == true) {
                    $('select[name="sl-lydoxuat"]').val(msg.CTBH.LDNID);
                    $('select[name="sl-lydoxuat"]').trigger('change.select2');
                    $('input[name="txt_so_hop_dong"]').val(msg.CTBH.MDCODE);
                    $('input[name="txt_ngay-htt"]').val(moment(msg.CTBH.HANTHANHTOAN).format('DD/MM/yyyy'));
                    $('select[name="txt-tennv"]').val(msg.CTBH.NVID);
                    $('select[name="txt-manv"]').val(msg.CTBH.NVID);
                    $('select[name="txt-makh"]').val(msg.CTBH.KHID);
                    $('select[name="txt-tenkh"]').val(msg.CTBH.KHID);
                    $('select[name="txt-tennv"]').trigger('change.select2');//trigger
                    $('select[name="txt-manv"]').trigger('change.select2');//trigger
                    $('select[name="txt-makh"]').trigger('change.select2');//trigger
                    $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
                    let SDT = $('select[name="txt-makh"]').select2("data")[0].element.attributes[1].nodeValue
                    let DIACHI = $('select[name="txt-makh"]').select2("data")[0].element.attributes[2].nodeValue
                    let GHICHU = $('select[name="txt-makh"]').select2("data")[0].element.attributes[3].nodeValue
                    $('#txt-sdt').val(SDT);
                    $('#txt-diachi').val(DIACHI);
                    $('#txt-ghichu-kh').val(GHICHU);
                    $('textarea[name="txt-ghichu"]').val(msg.CTBH.DIENGIAI);
                    DataRole.push(msg.DataRole);
                    objmathanghoadon = msg.CTMHBH;
                    console.log(objmathanghoadon)
                    tbBanhangHoaDonCTP.clear();
                    tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                    tbBanhangHoaDonCTP.columns.adjust().draw();
                    $('#bhhd-ban').modal('hide');
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    }

    function ChiTietPhieuKiemHang(phienKiemHangID) {
        $.ajax({
            type: "POST",
            url: "/BanHang/ChiTietPhienKiemHang",
            data: '{phienKiemHangID: "' + phienKiemHangID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    console.log(msg);
                    //$('select[name="sl-lydoxuat"]').val(msg.CTBH.LDNID);
                    //$('input[name="txt_so_hop_dong"]').val(msg.CTBH.MDCODE);
                    //$('input[name="txt_ngay-htt"]').val(moment(msg.CTBH.HANTHANHTOAN).format('DD/MM/yyyy'));
                    //$('select[name="txt-tennv"]').val(msg.CTBH.NVID);
                    //$('select[name="txt-manv"]').val(msg.CTBH.NVID);
                    //$('select[name="txt-makh"]').val(msg.CTBH.KHID);
                    //$('select[name="txt-tenkh"]').val(msg.CTBH.KHID);
                    //$('select[name="txt-tennv"]').trigger('change.select2');//trigger
                    //$('select[name="txt-manv"]').trigger('change.select2');//trigger
                    //$('select[name="txt-makh"]').trigger('change.select2');//trigger
                    //$('select[name="txt-tenkh"]').trigger('change.select2');//trigger
                    //let SDT = $('select[name="txt-makh"]').select2("data")[0].element.attributes[1].nodeValue
                    //let DIACHI = $('select[name="txt-makh"]').select2("data")[0].element.attributes[2].nodeValue
                    //let GHICHU = $('select[name="txt-makh"]').select2("data")[0].element.attributes[3].nodeValue
                    //$('#txt-sdt').val(SDT);
                    //$('#txt-diachi').val(DIACHI);
                    //$('#txt-ghichu-kh').val(GHICHU);
                    //$('textarea[name="txt-ghichu"]').val(msg.CTBH.DIENGIAI);
                    //DataRole.push(msg.DataRole);
                    objmathanghoadon = msg.data;
                    console.log(objmathanghoadon)
                    tbBanhangHoaDonCTP.clear();
                    tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                    tbBanhangHoaDonCTP.columns.adjust().draw();
                    $('#bhhd-ban').modal('hide');
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    }
    //#Region chon khach hang
    $('#table-khachhang tbody').unbind('dblclick');
    $('#table-khachhang tbody').on('dblclick', 'tr', function () {
        if ($('#bhhd-ban').hasClass('show') == true) {
            let MAKH = $(this).find('td').eq(1).html();
            let TENKH = $(this).find('td').eq(2).html();
            $('input[name="search_makh"]').val(MAKH);
            $('input[name="search_tenkh"]').val(TENKH);
            $('#danh-sach-khach-hang').modal('hide');
        }
        else {
            let KHID = $(this).find('td').eq(1).closest('tr').attr('data-id')
            $('select[name="txt-makh"]').val(KHID);
            $('select[name="txt-makh"]').trigger('change.select2');
            $('select[name="txt-tenkh"]').val(KHID);
            $('select[name="txt-tenkh"]').trigger('change.select2');
            $('#danh-sach-khach-hang').modal('hide');
            var countdata = tbBanhangHoaDonCTP.data().count();
            if (countdata > 0) {
                DoiGiaMHTheoCap();
            }
        }
    });
    //end
    //Trigger Change Khach Hang va Doi gia theo cap KH
    $('select[name="txt-makh"]').change(function () {
        var makh = $(this).val();
        $('select[name="txt-tenkh"]').val(makh).trigger('change.select2');
        //console.log($(this).select2("data")[0])
        //let SDT = $(this).select2("data")[0].element.attributes[1].nodeValue
        //let DIACHI = $(this).select2("data")[0].element.attributes[2].nodeValue
        //let GHICHU = $(this).select2("data")[0].element.attributes[3].nodeValue
        let SDT = $(this).attr('data-sdt');
        let DIACHI = $(this).attr('data-diachi');
        let GHICHU = $(this).attr('data-ghichu');

        $('#txt-sdt').val(SDT);
        $('#txt-diachi').val(DIACHI);
        $('#txt-ghichu-kh').val(GHICHU);
        var countdata = tbBanhangHoaDonCTP.data().count();
        if (countdata > 0) {
            DoiGiaMHTheoCap();
        }
        //var makh = $(this).select2('data')[0].id;
    })

    $('select[name="txt-tenkh"]').change(function () {
        var makh = $(this).val();
        //var makh = $(this).select2('data')[0].id;
        $('select[name="txt-makh"]').val(makh).trigger('change.select2');
        //let SDT = $(this).select2("data")[0].element.attributes[1].nodeValue
        //let DIACHI = $(this).select2("data")[0].element.attributes[2].nodeValue
        //let GHICHU = $(this).select2("data")[0].element.attributes[3].nodeValue
        let SDT = $(this).attr('data-sdt');
        let DIACHI = $(this).attr('data-diachi');
        let GHICHU = $(this).attr('data-ghichu');
        $('#txt-sdt').val(SDT);
        $('#txt-diachi').val(DIACHI);
        $('#txt-ghichu-kh').val(GHICHU);
        var countdata = tbBanhangHoaDonCTP.data().count();
        if (countdata > 0) {
            DoiGiaMHTheoCap();
        }
    })
    //end

    //Trigger Change Nhan Vien
    $('select[name="txt-manv"]').change(function () {
        var manv = $(this).select2('data')[0].id;
        $('select[name="txt-tennv"]').val(manv).trigger('change.select2');
    })

    $('select[name="txt-tennv"]').change(function () {
        var manv = $(this).select2('data')[0].id;
        $('select[name="txt-manv"]').val(manv).trigger('change.select2');
    })
    //end

    function DoiGiaMHTheoCap() {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        let makh = $('select[name="txt-makh"]').select2('data')[0].text;
        let tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        let formdata = new FormData();
        formdata.append('makh', makh);
        formdata.append('tenkh', tenkh);
        formdata.append('objmathang', JSON.stringify(objmathanghoadon));
        $.ajax({
            type: 'POST',
            url: '/BanHang/DoiGiaMatHangTheoCapKH',
            data: formdata,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else {
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/\./g, '') :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for (var key in objmathanghoadon) {
                        for (var key2 in res.data) {
                            if (objmathanghoadon[key].MHID == res.data[key2].MHID) {
                                objmathanghoadon[key].DONGIA = res.data[key2].DonGia;
                                var ThanhTien = intVal(objmathanghoadon[key].SOLUONG) * intVal(objmathanghoadon[key].DONGIA);
                                ThanhTien = ThanhTien - (ThanhTien * parseFloat(objmathanghoadon[key].TILECHIETKHAU) / 100);
                                ThanhTien = ThanhTien + (ThanhTien * parseFloat(objmathanghoadon[key].TILETHUE) / 100);
                                objmathanghoadon[key].THANHTIEN = ThanhTien;
                                if (objmathanghoadon[key].status == 1) {
                                    objmathanghoadon[key].status = 2;
                                }
                                break;
                            }
                        }
                    }
                    tbBanhangHoaDonCTP.clear();
                    tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                    tbBanhangHoaDonCTP.columns.adjust().draw();
                }
            }
        })
    }
    //#Region chon nhan vien
    $('#button-danh-sach-nv-bhhd').on('click', function () {
        $('#table-nv tbody').unbind('dblclick');
        $('#table-nv tbody').on('dblclick', 'tr', function () {
            if ($('#them-khach-hang').hasClass('show') == false && $('#danh-sach-nv').hasClass('show') == true) {
                let NVID = $(this).find('td').eq(1).closest('tr').attr('data-id')
                $('select[name="txt-tennv"]').val(NVID);
                $('select[name="txt-tennv"]').trigger('change.select2');
                $('select[name="txt-manv"]').val(NVID);
                $('select[name="txt-manv"]').trigger('change.select2');
            }
            $('#danh-sach-nv').modal('hide');
        });
    });
    //end

    //#Region chon nhan vien tim
    $('#button-danh-sach-nv-bhhd2').on('click', function () {
        $('#table-nv tbody').unbind('dblclick');
        $('#table-nv tbody').on('dblclick', 'tr', function () {
            if ($('#them-khach-hang').hasClass('show') == false && $('#bhhd-ban').hasClass('show') == true) {
                let TENNV = $(this).find('td').eq(2).html();
                $('input[name="search-txt-tennv"]').val(TENNV);
            }
            $('#danh-sach-nv').modal('hide');
        });
    });
    //end

    $("#txt-sdt").keypress(function (e) {
        if (e.which == 13) {
            let sdt = $(this).val().trim();
            if (sdt.length == 0) {
                alert("Nhập số điện thoại");
            }
            else {
                let Data = DataKH.filter(x => x.DIENTHOAI === sdt);
                if (Data.length == 0) {
                    alert("không tìm thấy dữ liệu khách hàng");
                } else {
                    // trigger KHach hang
                    let KHID = Data[0].KHID;
                    let DIACHI = Data[0].DIACHI;
                    let GHICHU = Data[0].GHICHU;
                    $('select[name="txt-makh"]').val(KHID);
                    $('select[name="txt-tenkh').val(KHID);
                    $('select[name="txt-makh"]').trigger('change.select2');//trigger
                    $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
                    $('#txt-diachi').val(DIACHI);
                    $('#txt-ghichu-kh').val(GHICHU);
                }
                console.log(Data);
            }
        }
    });

    $("#btn-xoa-bhhd").click(function () {

        //let id = $('#tablebh_hoadonban tbody tr.selected').attr('data-id');
        let id = $('input[name="txt_idbhd"]').val();
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            //let $this = $('#tablebh_hoadonban tbody tr.selected');
            if (confirm("Bạn có muốn xóa hay không")) {
                $.ajax({
                    method: "GET",
                    url: "/BanHang/XoaBanHangHoaDon",
                    data: { select: id },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        if (msg.status == 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            })
                            $('#qrcode').empty();
                            tbBanHangBanHoaDon.ajax.reload();
                            objmathanghoadon = [];
                            tbBanhangHoaDonCTP.clear();
                            tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                            tbBanhangHoaDonCTP.columns.adjust().draw();
                            LoadReset();
                        } else if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        }
                        else if (msg.status == 3) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            location.reload();
                        }
                    }
                })
            }
        }
    });

    //Xuat excel chi tiet hoa don
    $("#btn-xuat-ctbhhd").click(function () {
        var tbCTBanHangHoaDon_excel = {};
        tbCTBanHangHoaDon_excel.SoPhieu = $('input[name="txt_so_phieu_bhd"]').val();
        let data = new FormData();
        data.append("mathangs", JSON.stringify(objmathanghoadon));
        data.append("sophieu", tbCTBanHangHoaDon_excel.SoPhieu);
        $.ajax({
            method: "POST",
            url: `/BanHang/ExcelChiTietBanHangBHHD`,
            data: data,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.status == 1) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    let result_table = [
                        ["Mã hàng", "Tên hàng", "Kho", "Đơn vị", "Số lượng", "Số lượng tồn", "Đơn giá", "Thành tiền", "Ghi chú"]
                    ];

                    let intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                                i : 0;
                    };

                    let tongsl = 0;
                    let slton = 0;
                    let tongdongia = 0;
                    let thanhtien = 0;
                    msg.data.forEach(function (arrays, index) {
                        tongsl += intVal(arrays.SOLUONG);
                        slton += intVal(arrays.SoLuongTon);
                        tongdongia += intVal(arrays.DONGIA);
                        thanhtien += intVal(arrays.THANHTIEN);
                        let rowdata = [arrays.MHCODE, arrays.MHTEN, arrays.KHOCODE, arrays.DONVI, convertCurrency(arrays.SOLUONG), convertCurrency(arrays.SoLuongTon), convertCurrency(arrays.DONGIA), convertCurrency(arrays.THANHTIEN), arrays.GHICHU];
                        result_table.push(rowdata);
                    });

                    result_table.push(["", "", "", "", convertCurrency(tongsl), convertCurrency(slton), convertCurrency(tongdongia), convertCurrency(thanhtien), ""]);
                    console.log(result_table)
                    /* this line is only needed if you are not adding a script tag reference */
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    /* make the worksheet */
                    let ws = XLSX.utils.json_to_sheet(result_table);

                    /* add to workbook */
                    let wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "People");

                    /* write workbook (use type 'binary') */
                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

                    /* generate a download */
                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }

                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "DanhSachChiTietHDBH.xlsx");
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
                else if (msg.status == 4) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    let result_table = [
                        ["STT", "Mã hàng", "Tên hàng", "Số lượng", "Đơn vị", "Tồn", "Đơn giá", "Thành tiền", "Ghi chú"]
                    ];

                    msg.data.forEach(function (arrays, index) {
                        let rowdata = [(index + 1), arrays.MHCODE, arrays.MHTEN, convertCurrency(arrays.Soluong), arrays.DONVI, convertCurrency(arrays.SoLuongTon), convertCurrency(arrays.DONGIA), convertCurrency(arrays.THANHTIEN), arrays.GhiChu ];
                        result_table.push(rowdata);
                    });

                    /* this line is only needed if you are not adding a script tag reference */
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    /* make the worksheet */
                    let ws = XLSX.utils.json_to_sheet(result_table);

                    /* add to workbook */
                    let wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "People");

                    /* write workbook (use type 'binary') */
                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

                    /* generate a download */
                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }

                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "DanhSachChiTietHDBH.xlsx");
                }
            }
        })
        //$.ajax({
        //    method: "GET",
        //    url: "/BanHang/CheckRoleXuatBHHD",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (msg) {
        //        if (msg.status == 1) {
                    
                    
                    
        //            //var link = `/BanHang/ExcelChiTietBanHangBHHD?sophieu=` + tbCTBanHangHoaDon_excel.SoPhieu + ``;
        //            //window.open(link)
        //        }
        //        else if (msg.status == 2) {
        //            toast.create({
        //                title: 'Notification!',
        //                text: msg.message,
        //                icon: 'error_outline',
        //                classBackground: 'noti-error',
        //                timeout: 3000
        //            });
        //        }
        //        else if (msg.status == 3) {
        //            toast.create({
        //                title: 'Notification!',
        //                text: msg.message,
        //                icon: 'error_outline',
        //                classBackground: 'noti-error',
        //                timeout: 3000
        //            });
        //            location.reload();
        //        }
        //    }
        //})
    })
    //end

    //#Region load mat hang modal nho o ban hang
    let tbBanHangHoaDonMH1_filterValues = {}
    tbBanHangHoaDonMH1_filterValues.statusDraw = 0;
    var tbBanHangMHHoaDon1 = $('#table-mh-bhd-1').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (tbBanHangHoaDonMH1_filterValues.statusDraw > 0) {
                tbBanHangHoaDonMH1_filterValues.draw = data.draw;
                tbBanHangHoaDonMH1_filterValues.search = data.search["value"];
                tbBanHangHoaDonMH1_filterValues.start = data.start;
                tbBanHangHoaDonMH1_filterValues.length = data.length;
                tbBanHangHoaDonMH1_filterValues.order = data.order[0].column;
                tbBanHangHoaDonMH1_filterValues.dir = data.order[0].dir;
                tbBanHangHoaDonMH1_filterValues.statusDraw;
                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: tbBanHangHoaDonMH1_filterValues,
                    success: function (msg) {
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        } else if (msg.status == 3) {
                            if (tbBanHangHoaDonMH1_filterValues.draw != 1) {
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
                    html: true;
                })
            }
        },
        "order": [[2, "asc"]],
        columnDefs: [
            {
                "targets": [0],
                "orderable": false
            }
        ],
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-stt')
                }
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mahang')
                }
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                }
            },
            {
                "targets": 3,
                "className": "",
                "data": "MHALIAS",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-alias')
                }
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHMOTA",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mota')
                }
            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        "autoWidth": false,
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100
        }
    })
    //end

    //#Region set draw mat hang trong hoa don ban hang
    $("#tim-kiem-mat-hang-bhhd1").on('shown.bs.modal', function () {
        if (tbBanHangHoaDonMH1_filterValues.statusDraw < 1) {
            tbBanHangHoaDonMH1_filterValues.statusDraw++;
            tbBanHangMHHoaDon1.columns.adjust().draw();
        }
    });
    //end

    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/BanHang/CreateMatHangHoaDonBanHangExcel`
        window.open(link)
    })
    $("#btnFileUploadBHHD").click(function () {
        $("#FileUploadBHHD").click();
    })
    $("#FileUploadBHHD").change(function (event) {
        let input, files;
        input = event.target;
        files = input.files;
        kho = $('select[name="sl-kho"]').val();
        Array.from(files).map((file, index) => {
            var formdata = new FormData();
            formdata.append('fileupload', file);
            formdata.append('khoid', kho);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/BanHang/ImportBHHD',
                data: formdata,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (msg) {
                    if (msg.status == 1) {
                        if (msg.data.length > 0) {
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };
                            for (let i = 0; i < msg.data.length; i++) {
                                if (!unique[msg.data[i].MHCODE]) {
                                    objmathangimport.push({
                                        "MHCODE": msg.data[i].MHCODE,
                                        "SOLUONG": msg.data[i].SoLuongCusTom,
                                        "SoLo": msg.data[i].SoLo,
                                        "DONGIA": msg.data[i].DonGiaCusTom,
                                        "GHICHU": msg.data[i].GhiChuCusTom,
                                        "MHID": msg.data[i].MHID,
                                        "SoLuongTon": msg.data[i].SoLuongTon,
                                        "KhoID": msg.data[i].KhoID,
                                        "MHTEN": msg.data[i].MHTEN,
                                        "TILETHUE": 0,
                                        "TILECHIETKHAU": msg.data[i].TiLeChietKhau,
                                        "DONVI": msg.data[i].DonVi,
                                        "THANHTIEN": intVal(msg.data[i].DonGiaCusTom) * intVal(msg.data[i].SoLuongCusTom) - ((intVal(msg.data[i].DonGiaCusTom) * intVal(msg.data[i].SoLuongCusTom)) * msg.data[i].TiLeChietKhau / 100),
                                        "TienChietKhau": intVal(msg.data[i].DonGiaCusTom) * intVal(msg.data[i].SoLuongCusTom) * parseFloat(msg.data[i].TiLeChietKhau) / 100,
                                        "status": 0,
                                        "MHTID": msg.data[i].MHTID,
                                        "NgayNhan": moment(msg.data[i].NgayNhan).format('DD/MM/yyyy'),
                                        "LINKIMAGE": msg.data[i].LINKIMAGE,
                                        "GiaSi": msg.data[i].GiaSi
                                    })
                                    unique[msg.data[i].MHCODE] = 1;
                                    console.log(msg.data[i].GiaSi);
                                }
                                else if (unique[msg.data[i].MHCODE] == 1) {
                                    for (var key in objmathangimport) {
                                        if (objmathangimport[key].MHCODE == msg.data[i].MHCODE) {
                                            objmathangimport[key].SOLUONG = parseFloat(objmathangimport[key].SOLUONG) + parseFloat(msg.data[i].SoLuongCusTom);
                                            var THANHTIEN = intVal(objmathangimport[key].SOLUONG) * intVal(objmathangimport[key].DONGIA);
                                            var TienChietKhau = THANHTIEN * objmathangimport[key].TILECHIETKHAU / 100;
                                            THANHTIEN = THANHTIEN - (THANHTIEN * objmathangimport[key].TILECHIETKHAU / 100);
                                            objmathangimport[key].THANHTIEN = Math.round(THANHTIEN);
                                            objmathangimport[key].TienChietKhau = Math.round(TienChietKhau);
                                            objmathangimport[key].GiaSi = msg.data[i].GiaSi;
                                            break;
                                        }
                                    }
                                }
                            }
                            tbBanHangHoaDonImport.clear();
                            tbBanHangHoaDonImport.rows.add(objmathangimport);
                            console.log(objmathangimport)
                            tbBanHangHoaDonImport.columns.adjust().draw();
                            $("#btn-ghi-import-bhhd").prop('disabled', false);
                            $("#FileUploadBHHD").val('');
                            toast.create({
                                title: 'Notification!',
                                text: 'Thành công',
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            });
                        }
                    }
                    else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        $("#FileUploadBHHD").val('');
                    }
                },
                error: function (error) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Không thành công, vui lòng kiểm tra file import và thử lại',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $("#FileUploadBHHD").val('');
                }
            });
        })
    })

    var unique = [];
    var objmathangimport = [];
    var tbBanHangHoaDonImport = $('#table-import-bhhd').DataTable({
        bFilter: false,
        bInfo: false,
        data: objmathangimport,
        select: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: "MHCODE" },
            { data: "MHTEN" },
            { data: "SoLo" },
            { data: "NgayNhan" },
            { data: "SOLUONG" },
            { data: "DONGIA" },
            { data: "TILECHIETKHAU" },
            { data: "GHICHU" }
        ],
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 200,
        },
        'lengthChange': false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            var total = data.length;
            if (total > 0) {
                ////update footer
                $(api.column(0).footer()).html(total);
            }
            else {
                $(api.column(0).footer()).html("0");
            }
        }
    });

    $("#nhap-bhhd").click(function () {
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuatBHHD",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $("#btn-nhap-bhhd").modal();
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $("#btn-nhap-bhhd").modal('hide');
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    })
    $("#btn-nhap-bhhd").on('shown.bs.modal', function () {
        LoadReset();
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        objmathanghoadon = [];
        tbBanhangHoaDonCTP.clear();
        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
        tbBanhangHoaDonCTP.columns.adjust().draw();
        tbBanHangHoaDonImport.columns.adjust().draw();
        var CountData = tbBanHangHoaDonImport.data().count();
        $("#btn-ghi-import-bhhd").prop('disabled', true);
        if (CountData > 0) {
            $("#btn-ghi-import-bhhd").prop('disabled', false);
        }
    })
    $('#btn-nhap-bhhd').on('hidden.bs.modal', function (e) {
        objmathangimport = [];
        unique = [];
        tbBanHangHoaDonImport.clear();
        tbBanHangHoaDonImport.rows.add(objmathangimport);
        tbBanHangHoaDonImport.columns.adjust().draw();
    })
    $("#btn-ghi-import-bhhd").click(function () {
        var CountData = tbBanHangHoaDonImport.data().count();
        if (CountData > 0) {
            objmathanghoadon = objmathangimport;
            tbBanhangHoaDonCTP.clear();
            tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
            tbBanhangHoaDonCTP.columns.adjust().draw();
            $("#btn-nhap-bhhd").modal('hide');
        }
    })
    //CheckRow In
    $('#btn-in-bhd').click(function () {
        InHoaDonBanHang();
    })
    // Function In Bán hàng
    function InHoaDonBanHang() {
        let id = $('input[name="txt_idbhd"]').val();
        if (id.length == 0) {
            toast.create({
                title: 'Notification!',
                text: 'Chưa chọn hóa đơn',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleInBHD",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    let getOrder = tbBanhangHoaDonCTP.order();
                    let Desc = getOrder[0][1];
                    let NumberOrder = getOrder[0][0];
                    var link = '/BanHang/InHoaDonBanHang?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
                    window.open(link);
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    }
    $('#btn-in-bhd-theomau').click(function () {
        let id = $('input[name="txt_idbhd"]').val();
        if (id.length == 0) {
            toast.create({
                title: 'Notification!',
                text: 'Chưa chọn hóa đơn',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleInBHD",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {

                    console.log(id);
                    let getOrder = tbBanhangHoaDonCTP.order();
                    let Desc = getOrder[0][1];
                    let NumberOrder = getOrder[0][0];
                    var link = '/BanHang/InHoaDonDatHangTheoMau?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;;
                    window.open(link);
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    })
    //end

    async function InsertOrUpdateBHDTheoViTri(tieptucghi) {
        let $currentForm = $('#form-nv');
        let ViTriIn = $('input[name="txt-number-print-ghi"]').val();
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbBanhangHoaDonCTP.data().count();
        if (countdata <= 0) {
            $currentForm.addClass('was-validated');
            alert("Phải chọn ít nhất 1 mặt hàng ")
            return false;
        }
        else if (ViTriIn < 1 || ViTriIn > 16) {
            toast.create({
                title: 'Notification!',
                text: 'Vị trí in phải lớn hơn 0 hoặc bé hơn 16',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        $currentForm.addClass('was-validated');
        var idmh = $('input[name="txt_idbhd"]').val();
        var idmd = $('input[name="txt_idmd"]').val();
        var lydo = $('select[name="sl-lydoxuat"]').val();
        var sophieu = $('input[name="txt_so_phieu_bhd"]').val();
        var hinhthuc = $('select[name="sl-hinhthuc"]').val();
        var sohopdong = $('input[name="txt_so_hop_dong"]').val();
        var ngayxuat = $('input[name="txt_ngay-xuat"]').val();
        var hanthanhtoan = $('input[name="txt_ngay-htt"]').val();
        var maKH = $('select[name="txt-makh"]').select2('data')[0].text;
        var tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        var manv = $('select[name="txt-manv"]').select2('data')[0].text;
        var tennv = $('select[name="txt-tennv"]').select2('data')[0].text;
        var diengiai = $('textarea[name="txt-ghichu"]').val();
        let objchange = [];
        for (var key in objmathanghoadon) {
            if (objmathanghoadon[key].status == 0 || objmathanghoadon[key].status == 2) {
                objchange.push(objmathanghoadon[key]);
            }
        }
        MATHANGHOADONJSON = JSON.stringify(objchange);
        var objmuadon = MATHANGHOADONJSON;
        DELETEMATHANGHOADONJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGHOADONJSON;
        let data = new FormData();
        data.append("idmh", idmh);
        data.append("idmd", idmd);
        data.append("lydo", lydo);
        data.append("sophieu", sophieu);
        data.append("idhinhthuc", hinhthuc);
        data.append("sohopdong", sohopdong);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("manv", manv);
        data.append("ngayxuat", ngayxuat);
        data.append("tennv", tennv);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        data.append("tieptucghi", tieptucghi);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddBanHangHoaDon',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.ajaxresult.status == 1) {
                    $("#canhbaoxuatkhoam").modal('hide');
                    objMatHangDELETE = [];
                    MATHANGHOADONJSON = null;
                    DELETEMATHANGHOADONJSON = null;
                    CheckNutGhi = true;
                    if (msg.InsertBHHD != undefined && msg.InsertBHHD != "") {
                        let BHDID = msg.InsertBHHD;
                        //idXepHang = BHDID;
                        objmathanghoadon = [];
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        $.ajax({
                            method: "GET",
                            url: "/BanHang/CheckRoleInBHD",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.status == 1) {
                                    let id = BHDID;
                                    let getOrder = tbBanhangHoaDonCTP.order();
                                    let Desc = getOrder[0][1];
                                    let NumberOrder = getOrder[0][0];
                                    var link = '/BanHang/InHoaDonDatHangTheoViTri?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder + '&index=' + ViTriIn;
                                    window.open(link);
                                    $('#ghi-theo-vi-tri').modal('hide');
                                }
                            }
                        })
                        tbBanhangHoaDonCTP.clear();
                        tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        tbBanhangHoaDonCTP.columns.adjust().draw();
                        LoadReset();
                        if (msg.MDID != "" && msg.MDID != undefined) {
                            existMDID = msg.MDID;
                            CapNhatPhieuChuyen();
                        }
                    }
                    else if (msg.UpdateBHHD != "" && msg.UpdateBHHD != undefined) {
                        BanHangHDChiTiet(msg.UpdateBHHD);
                        toast.create({
                            title: 'Notification!',
                            text: msg.ajaxresult.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //objmathanghoadon.map(function (x) {
                        //    x.status = 1;
                        //});
                        //tbBanhangHoaDonCTP.clear();
                        //tbBanhangHoaDonCTP.rows.add(objmathanghoadon);
                        //tbBanhangHoaDonCTP.columns.adjust().draw();
                    }
                }
                else if (msg.ajaxresult.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                }
                else if (msg.ajaxresult.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
                else if (msg.ajaxresult.status == 4)// xuất mặt hàng kho anh
                {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    objmathangxuatkhoam = null;
                    objmathangxuatkhoam = msg.ajaxresult.data;
                    $('#btn-bhd').hide();
                    $('#btn-bhd-xephang').hide();
                    $('#btn-bhd-ghiso').show();
                    $("#canhbaoxuatkhoam").modal();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    }

    //Region Them hóa đơn và in theo vị trí
    $('#btn-ghi-bhd-theovitri').click(async function () {
        await InsertOrUpdateBHDTheoViTri(false);
    });

    $('#btn-bhd-ghiso').click(async function () {
        await InsertOrUpdateBHDTheoViTri(true);
    });

    //End

    //Region In theo vi tri
    $('#btn-in-bhd-theovitri').click(function () {
        $('#in-theo-vi-tri').modal();
    })
    $('#btn-in-bhd-theovitri').click(function () {
        let id = $('input[name="txt_idbhd"]').val();
        let ViTriIn = $('input[name="txt-number-print"]').val();
        if (id.length == 0) {
            toast.create({
                title: 'Notification!',
                text: 'Chưa chọn hóa đơn',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        else if (ViTriIn < 1 || ViTriIn > 16) {
            toast.create({
                title: 'Notification!',
                text: 'Vị trí in phải lớn hơn 0 hoặc bé hơn 16',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleInBHD",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {

                    console.log(id);
                    let getOrder = tbBanhangHoaDonCTP.order();
                    let Desc = getOrder[0][1];
                    let NumberOrder = getOrder[0][0];
                    var link = '/BanHang/InHoaDonDatHangTheoViTri?bhdid=' + id + '&desc=' + Desc + '&order=' + NumberOrder + '&index=' + ViTriIn;
                    window.open(link);
                    $('#in-theo-vi-tri').modal('hide');
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        })
    })
    //End

    $("#canhbaoxuatkhoam").on('shown.bs.modal', function () {
        tbCanhBaoXuatKhoAm.clear();
        tbCanhBaoXuatKhoAm.rows.add(objmathangxuatkhoam);
        tbCanhBaoXuatKhoAm.columns.adjust().draw();
    })
    //#Region Load cảnh báo xuất kho anh
    var objmathangxuatkhoam = [];
    var tbCanhBaoXuatKhoAm = $('#table-canhbaoxuatkhoam').DataTable({
        orderCellsTop: true,
        bFilter: false,
        bInfo: false,
        data: objmathangxuatkhoam,
        select: true,
        "fnRowCallback": function (nRow, data, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
        },
        columns: [
            { data: null },
            { data: "MHCODE" },
            { data: "MHTEN" },
        ],
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 200,
        },
        'lengthChange': false,
    });
    //end
});
//End Document
async function LoadDataNvVAKh() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadDataNvVAKhChoHDBH',
        success: function (res) {
            return res;
        }
    });
}
async function LoadKho() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadKho',
        success: function (res) {
            return res.data;
        }
    });
}
function LoadDataAdd() {
    return $.ajax({
        type: 'GET',
        url: '/BanHang/LoadDataAddBHHD',
        success: function (res) {
            return res;
        }
    });
}

function LoadDataLyDo() {
    return $.ajax({
        type: 'GET',
        data: { lydoid: 'X' },
        url: '/BanHang/LoadLyDo',
        success: function (res) {
            return res;
        }
    });
}
function GetSoluongTon(formdata) {
    return $.ajax({
        type: 'POST',
        url: '/BanHang/SoluongTon',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (res) {
            if (res.status == 2) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return res.data

            }
            else {
                return res.data
            }
        }
    })
}
async function GetSoluongTonChiTiet(formdata) {
    return $.ajax({
        type: 'POST',
        async: true,
        url: '/BanHang/SoluongTonChiTietMH',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (res) {
            if (res.status == 2) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return res.data

            }
            else {
                return res.data
            }
        }
    })
}
function LoadReset() {
    LoadDataAdd().then((e) => {
        $('#qrcode').empty();
        var d = new Date();
        var fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('select[name="sl-lydoxuat"]').empty();
        $('input[name="txt_so_phieu_bhd"]').empty();
        $('select[name="sl-hinhthuc"]').empty();
        $('input[name="txt_so_hop_dong"]').empty();
        $('select[name="sl-kho"]').empty();
        $('select[name="sl-lydoxuat"]').append(e.listlydo);
        $('select[name="sl-lydoxuat"]').val('0b6f2f2f-514e-44a5-9963-93f21a21f684');
        $('input[name="txt_so_phieu_bhd"]').val(e.bhd);
        $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
        $('input[name="txt_so_hop_dong"]').val(e.md);
        $('select[name="sl-kho"]').append(e.listkho);
        $('input[name="txt_ngay-xuat"]').val(fullDate);
        $('input[name="txt_ngay-htt"]').val(fullDate);
        $('input[name="txt_idbhd"]').val('');
        $('input[name="txt_idmd"]').val('');
        $('textarea[name="txt-ghichu"]').val('');
        $('#txt-sdt').val('');
        $('#txt-diachi').val('');
        $('#txt-ghichu-kh').val('');
        // trigger KHach hang
        $('select[name="txt-makh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-makh"]').trigger('change.select2');//trigger
        $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
    });
}
function CheckKho(e) {
    console.log(filterObj_tonkho_BH);
    filterObj_tonkho_BH.MHID = e;
    filterObj_tonkho_BH.statusDraw++;
    $('#danh-sach-tonkho-bh').modal();
}
//Function Load chi tiết mặt hàng
async function LoadChiTietMatHang(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            async: true,
            method: 'GET',
            url: '/MatHang/LoadChiTietMatHang?id=' + id,
            success: function (msg) {
                resolve(msg.data);
            }
        })
    });
}
async function ShowGiaSi(id) {
    let rs = await LoadChiTietMatHang(id);
    let tbodyString = '';
    let giaSi_json = rs[0]?.GiaSi?.split('|');
    for (let i = 0; i < (giaSi_json?.length - 1); i++) {
        let soLuongTemp = giaSi_json[i]?.split('-');
        let giaBan = 0;
        switch (i) {
            case 1: giaBan = (rs[0]?.GIABANBUON || 0)
                break;
            case 2: giaBan = (rs[0]?.GIABAN3 || 0)
                break;
            case 3: giaBan = (rs[0]?.GIABAN4 || 0)
                break;
            case 4: giaBan = (rs[0]?.GIABAN5 || 0)
                break;
            case 5: giaBan = (rs[0]?.GIABAN6 || 0)
                break;
            case 6: giaBan = (rs[0]?.GIABAN7 || 0)
                break;
            default: giaBan = (rs[0]?.GIABANLE || 0)
                break;
        }
        tbodyString += `<tr>
                            <td>${i + 1}</td>
                            <td>${convertCurrency(soLuongTemp[1])}</td>
                            <td>${convertCurrency(giaBan)}</td>
                        </tr>`;
    }

    $('#tbody-div-gia-si').html(tbodyString);
    $('#div-gia-si').modal();
}
//#region Table Tồn kho
$('#danh-sach-tonkho-bh').on('show.bs.modal', async function () {
    tonkhoBH.columns.adjust().draw()
})
var filterObj_tonkho_BH = {}
filterObj_tonkho_BH.statusDraw = 0
var tonkhoBH = InitDB()
function InitDB() {
    return $('#table-tonkho-bh').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filterObj_tonkho_BH.statusDraw > 0) {
                filterObj_tonkho_BH.draw = data.draw;
                filterObj_tonkho_BH.start = data.start;
                filterObj_tonkho_BH.length = data.length;
                filterObj_tonkho_BH.search = data.search["value"];
                filterObj_tonkho_BH.order = data.order[0].column;
                filterObj_tonkho_BH.dir = data.order[0].dir;

                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadTonKho',
                    data: filterObj_tonkho_BH,
                    success: function (res) {
                        console.log(res)
                    }
                }).done(callback, () => {
                    html: true;

                })
            }
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
                "orderable": false
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "KHOCODE",
                "orderable": false
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHCODE",
                "orderable": false,
                "render": function (data) {
                    return data
                }
            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "MHTEN",
                "orderable": false,
                "render": function (data) {
                    return `<span class="shorter-text" style="width: 200px" title="` + data + `">` + data + `</span>`
                }
            },
            {
                "targets": 4,
                "className": "text-right",
                "data": "SoLuong",
                "orderable": false,
                "render": function (data) {
                    return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }
            },
            {
                "targets": 5,
                "className": "text-right",
                "data": "SoLuongOnApprovedSO",
                "orderable": false,
                "render": function (data) {
                    return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }
            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "SLReady",
                "orderable": false,
                "render": function (data) {
                    return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }
            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            //$(nRow).find('td:eq(0)').text(iDataIndex + 1);
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page

            sl4 = api.column(4).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            sl5 = api.column(5).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            sl6 = api.column(6).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);


            $(api.column(4).footer()).html(sl4 == 0 ? '' : Math.round(sl4).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            $(api.column(5).footer()).html(sl5 == 0 ? '' : Math.round(sl5).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            $(api.column(6).footer()).html(sl6 == 0 ? '' : Math.round(sl6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },

        pageLength: 5,
        lengthChange: false,
    })
}
//#endregion

function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

//Function kiểu tiền
function convertCurrency(value) {
    let regx = /\D+/g;
    let number = value?.toString().replace(regx, "");
    return number?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}