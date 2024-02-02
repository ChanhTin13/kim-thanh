$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });

//#Region document
$(document).ready(function () {
    $('#search-tungay').val(moment(new Date()).format('DD/MM/yyyy'));
    $('#search-denngay').val(moment(new Date()).format('DD/MM/yyyy'));
    $("#search-sl-lydonhap").select2({ dropdownParent: $('#phieu-bht'), 'width': '288px' });
    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
    //#Region chon khach hang
    $('#table-khachhang tbody').unbind('dblclick');
    $('#table-khachhang tbody').on('dblclick', 'tr', function () {
        if ($('#phieu-bht').hasClass('show') == true) {
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
            var countdata = tbBanhangTraCTP.data().count();
            if (countdata > 0) {
                DoiGiaMHTheoCap();
            }
        }
    });
    //end
    //Trigger Change Khach Hang va Doi gia theo cap KH
    $('select[name="txt-makh"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('select[name="txt-tenkh"]').val(makh).trigger('change.select2');
        var countdata = tbBanhangTraCTP.data().count();
        if (countdata > 0) {
            DoiGiaMHTheoCap();
        }
    })

    $('select[name="txt-tenkh"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('select[name="txt-makh"]').val(makh).trigger('change.select2');
        var countdata = tbBanhangTraCTP.data().count();
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
                    tbBanhangTraCTP.clear();
                    tbBanhangTraCTP.rows.add(objmathanghoadon);
                    tbBanhangTraCTP.columns.adjust().draw();
                }
            }
        })
    }

    //#Region chon nhan vien
    $('#button-danh-sach-nv-bht').on('click', function () {
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
            if ($('#them-khach-hang').hasClass('show') == false && $('#phieu-bht').hasClass('show') == true) {
                let TENNV = $(this).find('td').eq(2).html();
                $('input[name="search-txt-tennv"]').val(TENNV);
            }
            $('#danh-sach-nv').modal('hide');
        });
    });
    //end

    var objKHOMH = [];
    var DELETEMATHANGHOADONJSON = null;
    var MATHANGHOADONJSON = null;
    var objMatHangDELETE = [];
    let tongtienhang = 0;
    let tongchietkhau = 0;
    let tongthue = 0;

    //#Region Reset hoa don ban hang
    $("#btn-them-bht").click(function () {
        $('#qrcode').empty();
        let d = new Date();
        let fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('input[name="txt_ngay_tra"]').val(fullDate);
        $('input[name="txt_ngay-htt"]').val(fullDate);
        // trigger KHach hang
        $('select[name="txt-makh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh"]').select2();
        $('select[name="txt-makh"]').select2();

        // trigger Nhan Vien
        $('select[name="txt-manv"]').val(LuuIDNV);
        $('select[name="txt-tennv').val(LuuIDNV);
        $('select[name="txt-tennv"]').select2();
        $('select[name="txt-manv"]').select2();
        //end
        $('textarea[name="txt-ghichu"]').val('');
        $('input[name="txt_idbht"]').val('');
        $('input[name="txt_bhtid').val('');
        LoadDataAdd().then((e) => {
            $('select[name="sl-lydonhap"]').empty();
            $('input[name="txt_so_phieu_bht"]').empty();
            $('select[name="sl-hinhthuc"]').empty();
            $('input[name="txt_so_hop_dong"]').empty();
            $('select[name="sl-kho"]').empty();
            $('select[name="sl-lydonhap"]').append(e.listlydo);
            $('select[name="sl-lydonhap"]').val('db2af8d7-b961-4d51-845d-901ef6be3c8e');
            $('input[name="txt_so_phieu_bht"]').val(e.bhd);
            $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
            $('input[name="txt_so_hop_dong"]').val(e.md);
            $('select[name="sl-kho"]').append(e.listkho);
        });
        objmathanghoadon = [];
        objMatHangDELETE = [];
        MATHANGHOADONJSON = null;
        DELETEMATHANGHOADONJSON = null;
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        tbBanhangTraCTP.clear();
        tbBanhangTraCTP.rows.add(objmathanghoadon);
        tbBanhangTraCTP.columns.adjust().draw();
        $('#form-nv').removeClass('was-validated');
    });
    //end

    //keyup dien giai
    $('input[name="search-txt-diengiai"]').on('keyup change', delay(function () {
        if ($('input[name="search-txt-diengiai"]').is(':focus')) {
            tbBanHangTra_filterValues.diengiai = $(this).val();
            tbBanHangTra.columns.adjust().draw();
        }
    }, 1000));
    //end
    //#Region Load Ban Hang Tra
    let tbBanHangTra_filterValues = {};
    tbBanHangTra_filterValues.statusDraw = 0;
    var tbBanHangTra = $('#table-bht').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (tbBanHangTra_filterValues.statusDraw > 0) {
                tbBanHangTra_filterValues.draw = data.draw;
                tbBanHangTra_filterValues.start = data.start;
                tbBanHangTra_filterValues.length = data.length;
                tbBanHangTra_filterValues.order = data.order[0].column;
                tbBanHangTra_filterValues.dir = data.order[0].dir;
                tbBanHangTra_filterValues.FromDate = $("#search-tungay").val();
                tbBanHangTra_filterValues.ToDate = $("#search-denngay").val();
                //if (tbBanHangTra_filterValues.statusDraw > 1) {
                //    tbBanHangTra_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
                //    tbBanHangTra_filterValues.MaKH = $('input[name="search_makh"]').val();
                //    tbBanHangTra_filterValues.TENKH = $('input[name="search_tenkh"]').val();
                //    tbBanHangTra_filterValues.MH = $('input[name="search_mh"]').val();
                //    tbBanHangTra_filterValues.FromDate = $("#search-tungay").val();
                //    tbBanHangTra_filterValues.ToDate = $("#search-denngay").val();
                //    tbBanHangTra_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
                //}
                $.ajax({
                    url: '/BanHang/LoadBanHangTra',
                    method: 'GET',
                    data: tbBanHangTra_filterValues,
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
                            if (tbBanHangTra_filterValues.draw != 1) {
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
            { "data": "BHTCODE" },
            { "data": "NgayHDString" },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "NVTEN" },
            { "data": "DIENGIAI" },
            {
                "data": "TONGTIEN",
                render: function (data, type, full, meta) {
                    var TONGTIEN = Math.round(data);
                    return TONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { "data": "LyDo" },
            { "data": "USERID" },
        ],
        columnDefs: [
            {
                "targets": [0, 3, 4, 5, 7, 8],
                "orderable": false
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.BHTID);
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
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();
            let totalRow = 0;
            if (data.length > 0) {
                totalRow = data[0].TotalRow;
            }

            $(api.column(1).footer()).text(totalRow)
        }
    });
    //end

    //Xuat excel chi tiet hoa don ban hang tra
    $("#btn-xuat-bhtct").click(function () {
        var tbCTBanHangHoaDon_excel = {};
        tbCTBanHangHoaDon_excel.SoPhieu = $('input[name="txt_so_phieu_bht"]').val();
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuatBHT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    var link = `/BanHang/ExcelChiTietBanHangBHT?sophieu=` + tbCTBanHangHoaDon_excel.SoPhieu + ``;
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
    })
    //end
    //#Region chon hoa don
    $('#table-bht tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-bht tbody tr').not(this).removeClass('selected')
    })

    $('#table-bht tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-bht tbody tr').not(this).removeClass('selected');
        BanHangTraChiTiet($(this).attr('data-id'));
    });
    //end

    //#Region set draw cho table ban hang tra
    function BanHangTra_timeout() {
        setTimeout(function () {
            tbBanHangTra_filterValues.statusDraw++;
            tbBanHangTra.columns.adjust().draw();

        }, 100)
    }
    var CheckNutGhi = false;
    $("#phieu-bht").on('shown.bs.modal', function () {
        if (tbBanHangTra_filterValues.statusDraw < 1) {
            tbBanHangTra_filterValues.statusDraw++;
            tbBanHangTra.columns.adjust().draw();
            LoadDataLyDo().then((e) => {
                $("#search-sl-lydonhap").append(e.listlydoxuat);
            })
        }
        if (CheckNutGhi) {
            CheckNutGhi = false;
            BanHangTra_timeout();
        }
    });
    //end

    //Region update va Insert ChiTiet Phieu va Phieu
    $('#btn-ghi-bht').click(function () {
        let $currentForm = $('#form-nv');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbBanhangTraCTP.data().count();
        if (countdata <= 0) {
            $currentForm.addClass('was-validated');
            alert("Phải chọn ít nhất 1 mặt hàng ")
            return false;
        }
        $currentForm.addClass('was-validated');
        var idbht = $('input[name="txt_idbht"]').val();
        var lydo = $('select[name="sl-lydonhap"]').val();
        var sophieu = $('input[name="txt_so_phieu_bht"]').val();
        var hinhthuc = $('select[name="sl-hinhthuc"]').val();
        var ngaytra = $('input[name="txt_ngay_tra"]').val();
        var hanthanhtoan = $('input[name="txt_ngay-htt"]').val();
        var maKH = $('select[name="txt-makh"]').select2('data')[0].text;
        var tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        var manv = $('select[name="txt-manv"]').select2('data')[0].text;
        var tennv = $('select[name="txt-tennv"]').select2('data')[0].text;
        var diengiai = $('textarea[name="txt-ghichu"]').val();
        var objchange = [];
        for (var key in objmathanghoadon) {
            if (objmathanghoadon[key].status == 0 || objmathanghoadon[key].status == 2) {
                objchange.push(objmathanghoadon[key]);
            }
        }
        console.log(objchange);
        MATHANGHOADONJSON = JSON.stringify(objchange);
        var objmuadon = MATHANGHOADONJSON;
        DELETEMATHANGHOADONJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGHOADONJSON;
        let data = new FormData();
        data.append("idbht", idbht);
        data.append("lydo", lydo);
        data.append("sophieu", sophieu);
        data.append("idhinhthuc", hinhthuc);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("manv", manv);
        data.append("ngaytra", ngaytra);
        data.append("tennv", tennv);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddBanHangTra',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.status == 1) {
                    console.log(msg);
                    CheckNutGhi = true;
                    objMatHangDELETE = [];
                    MATHANGHOADONJSON = null;
                    DELETEMATHANGHOADONJSON = null;
                    if (msg.data[0].UpdateBHTID != "" && msg.data[0].UpdateBHTID != undefined) {
                        BanHangTraChiTiet(msg.data[0].UpdateBHTID)
                        console.log('varo update');
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //objmathanghoadon.map(function (x) {
                        //    x.status = 1;
                        //});
                        //tbBanhangTraCTP.clear();
                        //tbBanhangTraCTP.rows.add(objmathanghoadon);
                        //tbBanhangTraCTP.columns.adjust().draw();
                    }
                    else {
                        console.log('vao insert');
                        objmathanghoadon = [];
                        tbBanhangTraCTP.clear();
                        tbBanhangTraCTP.rows.add(objmathanghoadon);
                        tbBanhangTraCTP.columns.adjust().draw();
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        let InsertBHTID = msg.data[0].InsertBHTID;
                        if (InsertBHTID != undefined && InsertBHTID.BHTID != "") {
                            $.ajax({
                                method: "GET",
                                url: "/BanHang/CheckRoleInBHT",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (msg) {
                                    if (msg.status == 1) {
                                        let getOrder = tbBanhangTraCTP.order();
                                        let Desc = getOrder[0][1];
                                        let NumberOrder = getOrder[0][0];
                                        var link = '/BanHang/InHoaDonBanTra?bhtid=' + InsertBHTID + '&desc=' + Desc + '&order=' + NumberOrder;
                                        window.open(link);
                                    }
                                }
                            })
                        }
                        LoadReset();
                    }
                }
                //if (msg.data.length > 0) {
                //    console.log(msg.data[0]);
                //    BanHangTraChiTiet(msg.data[0]);
                //}
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    });

    //end


    //region lưu chờ xử lý
    $('#btn-ghi-bhhd-xephang').click(function () {
        let $currentForm = $('#form-nv');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbBanhangTraCTP.data().count();
        if (countdata <= 0) {
            $currentForm.addClass('was-validated');
            alert("Phải chọn ít nhất 1 mặt hàng ")
            return false;
        }
        $currentForm.addClass('was-validated');
        var idbht = $('input[name="txt_idbht"]').val();
        var lydo = $('select[name="sl-lydonhap"]').val();
        var sophieu = $('input[name="txt_so_phieu_bht"]').val();
        var hinhthuc = $('select[name="sl-hinhthuc"]').val();
        var ngaytra = $('input[name="txt_ngay_tra"]').val();
        var hanthanhtoan = $('input[name="txt_ngay-htt"]').val();
        var maKH = $('select[name="txt-makh"]').select2('data')[0].text;
        var tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        var manv = $('select[name="txt-manv"]').select2('data')[0].text;
        var tennv = $('select[name="txt-tennv"]').select2('data')[0].text;
        var diengiai = $('textarea[name="txt-ghichu"]').val();
        var objchange = [];
        for (var key in objmathanghoadon) {
            if (objmathanghoadon[key].status == 0 || objmathanghoadon[key].status == 2) {
                objchange.push(objmathanghoadon[key]);
            }
        }
        console.log(objchange);
        MATHANGHOADONJSON = JSON.stringify(objchange);
        var objmuadon = MATHANGHOADONJSON;
        DELETEMATHANGHOADONJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGHOADONJSON;
        let data = new FormData();
        data.append("idbht", idbht);
        data.append("lydo", lydo);
        data.append("sophieu", sophieu);
        data.append("idhinhthuc", hinhthuc);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("manv", manv);
        data.append("ngaytra", ngaytra);
        data.append("tennv", tennv);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddBanHangTra',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.status == 1) {
                    console.log(msg);
                    CheckNutGhi = true;
                    objMatHangDELETE = [];
                    MATHANGHOADONJSON = null;
                    DELETEMATHANGHOADONJSON = null;
                    if (msg.data[0].UpdateBHTID != "" && msg.data[0].UpdateBHTID != undefined) {
                        BanHangTraChiTiet(msg.data[0].UpdateBHTID)
                        console.log('varo update');
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        //objmathanghoadon.map(function (x) {
                        //    x.status = 1;
                        //});
                        //tbBanhangTraCTP.clear();
                        //tbBanhangTraCTP.rows.add(objmathanghoadon);
                        //tbBanhangTraCTP.columns.adjust().draw();
                    }
                    else {
                        console.log('vao insert');
                        objmathanghoadon = [];
                        tbBanhangTraCTP.clear();
                        tbBanhangTraCTP.rows.add(objmathanghoadon);
                        tbBanhangTraCTP.columns.adjust().draw();
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        let InsertBHTID = msg.data[0].InsertBHTID;
                        if (InsertBHTID != undefined && InsertBHTID.BHTID != "") {

                            let data = new FormData();
                            data.append('BHDID', InsertBHTID);
                            data.append('type', 'bantra');
                            $.ajax({
                                async: true,
                                type: 'POST',
                                url: '/BanHang/InsertXepHang',
                                data: data,
                                contentType: false,
                                processData: false,
                                success: function (rs) {
                                    if (rs.status == 1) {


                                        $.ajax({
                                            method: "GET",
                                            url: "/BanHang/CheckRoleInBHT",
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            success: function (msg) {
                                                if (msg.status == 1) {
                                                    let getOrder = tbBanhangTraCTP.order();
                                                    let Desc = getOrder[0][1];
                                                    let NumberOrder = getOrder[0][0];
                                                    var link = '/BanHang/InHoaDonBanTra?bhtid=' + InsertBHTID + '&desc=' + Desc + '&order=' + NumberOrder;
                                                    window.open(link);
                                                }
                                            }
                                        })



                                    }
                                    else {
                                        console.log(rs.message);
                                    }
                                },
                                error: function (error) {
                                    console.log(error);
                                }
                            });

                         
                        }
                        LoadReset();
                    }
                }
                //if (msg.data.length > 0) {
                //    console.log(msg.data[0]);
                //    BanHangTraChiTiet(msg.data[0]);
                //}
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    });
    //end region

    //#Region Load Add Ban Hang Ban Tra Lai
    //Region Load Nhan Vien Va Khach Hang
    LoadDataNvVAKh().then((e) => {
        // HTML Khach Hang
        e.dataKH.map((value) => {
            $('select[name="txt-makh"]').append('<option value="' + value.KHID + '">' + value.KHCODE + '</option>');
            $('select[name="txt-tenkh"]').append('<option value="' + value.KHID + '">' + value.KHTEN + '</option>');
        })

        // HTML Nhan Vien
        e.dataNV.map((value) => {
            $('select[name="txt-manv"]').append('<option value="' + value.NVID + '">' + value.NVCODE + '</option>');
            $('select[name="txt-tennv"]').append('<option value="' + value.NVID + '">' + value.NVTEN + '</option>');
        })

        // trigger KHach hang
        $('select[name="txt-makh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-tenkh"]').select2();
        $('select[name="txt-makh"]').select2();

        // trigger Nhan Vien
        LuuIDNV = e.dataUser;
        $('select[name="txt-manv"]').val(e.dataUser);
        $('select[name="txt-tennv').val(e.dataUser);
        $('select[name="txt-tennv"]').select2();
        $('select[name="txt-manv"]').select2();
        if (e.dataUser != undefined) {
            $('select[name="txt-tennv"]').prop("disabled", true);
            $('select[name="txt-manv"]').prop("disabled", true);
            $('#button-danh-sach-nv-bht').attr('data-target', ' ');
        }
    }).catch(() => { console.log('error') })
    //end
    LoadDataAdd().then((e) => {
        let d = new Date();
        fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('select[name="sl-lydonhap"]').append(e.listlydo);
        $('select[name="sl-lydonhap"]').val('db2af8d7-b961-4d51-845d-901ef6be3c8e');
        $('input[name="txt_so_phieu_bht"]').val(e.bhd);
        $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
        $('select[name="sl-kho"]').append(e.listkho);
        $('input[name="txt_ngay_tra"]').val(fullDate).prop('disabled', true);
        $('input[name="txt_ngay-htt"]').val(fullDate);
        let CheckBHTID = $('input[name="txt_bhtid"]').val();
        if (CheckBHTID != "") {
            BanHangTraChiTiet(CheckBHTID);
        }
    });
    //End

    //Search Header Bang Chi Tiet Phieu
    //$('#table-ctbht thead tr').clone(true).appendTo('#table-ctbht thead');
    //$('#table-ctbht thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    if (i == 3) {
    //        $(this).html('');
    //        //var $select = $("<select id='filter-header-khomh'> <option value =\" 1 \">Chọn Kho </option></select>", {
    //        //});
    //        //LoadKho().then((e) => {
    //        //    e.data.map((value) => {
    //        //        var $option = $("<option></option>", {
    //        //            "text": value.KHOCODE,
    //        //            "value": value.KHOID
    //        //        });
    //        //        $select.append($option);
    //        //    })
    //        //})
    //        //return $(this).html($select);
    //    }
    //    else if (i != 0 && i != 10) {
    //        $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title + '" />');
    //    }
    //    $('#filter-header-khomh').on('change', function () {
    //        let id = $(this).val();
    //        if (id != 1) {
    //            var result = objmathanghoadon.filter(word => word.KHOID == id);
    //            tbBanhangTraCTP.clear();
    //            tbBanhangTraCTP.rows.add(result);
    //            tbBanhangTraCTP.columns.adjust().draw();
    //        } else {
    //            tbBanhangTraCTP.clear();
    //            tbBanhangTraCTP.rows.add(objmathanghoadon);
    //            tbBanhangTraCTP.columns.adjust().draw();
    //        }
    //    });
    //    $('input', this).on('keyup change', function () {
    //        if (tbBanhangTraCTP.column(i).search() !== this.value) {
    //            tbBanhangTraCTP
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
    //end

    var objmathanghoadon = [];
    var tbBanhangTraCTP = $('#table-ctbht').DataTable({
        orderCellsTop: true,
        bFilter: false,
        bInfo: false,
        data: objmathanghoadon,
        select: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.BCTHTID);
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
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            {
                data: null,
                "width": '4%',
            },
            //{
            //    data: "MHCODE",
            //    "width": '10%',
            //},
            {
                "data": "MHCODE",
                "width": '10%',
                render: function (data, type, meta) {
                    if (meta.LINKIMAGE === null || meta.LINKIMAGE === '') {
                        return '<a href ="#">' + data + '</a>';
                    }
                    else {
                        return '<a href =' + meta.LINKIMAGE + ' target="_blank">' + data + '</a>';
                    }
                }
            },
            {
                data: "MHTEN",
                "width": '20%',
            },
            {
                data: "KHOID",
                "width": '5%',
                render: function (data, type, row) {
                    var $select = $("<select id='kho-mh'></select>", {
                    });
                    for (var key in objKHOMH) {
                        var $option = $("<option></option>", {
                            "text": objKHOMH[key].KHOCODE,
                            "value": objKHOMH[key].KHOID
                        });
                        if (objKHOMH[key].KHOID == data) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    }
                    //if (objKHOMH.length > 1) {
                    //    for (var key in objKHOMH) {
                    //        var $option = $("<option></option>", {
                    //            "text": objKHOMH[key].KHOCODE,
                    //            "value": objKHOMH[key].KHOID
                    //        });
                    //        if (objKHOMH[key].KHOID == data) {
                    //            $option.attr("selected", "selected")
                    //        }
                    //        $select.append($option);
                    //    }
                    //}
                    //else {
                    //    var $option = $("<option></option>", {
                    //        "text": row.KHOCODE,
                    //        "value": data
                    //    });
                    //    $select.append($option);
                    //}
                    return $select.prop("outerHTML");
                }
            },
            {
                data: "SOLUONG",
                "width": '5%',
                render: function (data, type, full, meta) {
                    return '<input type="text" name="txt-so-luong" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency" />';
                }
            },
            {
                data: "DONVI",
                "width": '5%',
            },
            {
                data: "SoLuongTon",
                "width": '5%',
                render: function (data, type, full, meta) {
                    return '<a type="button" data-toggle="modal" onclick = "CheckKho(\' ' + full.MHID + '\')" href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>';
                }
            },
            {
                data: "DONGIA",
                "width": '10%',
                render: function (data, type, full, meta) {
                    return '<input type="text" name="txt-don-gia" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency" />';
                }
            },
            //{
            //    data: "TILETHUE",
            //    render: function (data, type, full, meta) {
            //        return '<input type="text" name="txt-thue" value="' + data + '"  maxlength="2" data-type="currency" />';
            //    }
            //},
            //{
            //    data: "TILECHIETKHAU",
            //    render: function (data, type, row) {
            //        if (CheckIs == true) {
            //            return '<input type="text" name="txt-chiet-khau-tile" value="' + row.TienChietKhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
            //        }
            //        else if (CheckIs == false) {
            //            return '<input type="text" name="txt-chiet-khau" value="' + data + '" maxlength="6" data-type="percent"/>';
            //        }
            //    }
            //},
            {
                data: "THANHTIEN",
                "width": '12%',
                render: function (data, type, full, meta) {
                    var ConvertData = Math.round(data);
                    return ConvertData.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "GHICHU",
                "width": '15%',
                render: function (data, type, full, meta) {
                    //if (data === "") {
                    //    return '<input type="text" name="txt-ghichu" value="Chưa có"/>';
                    //}
                    return '<input type="text" name="txt-ghichu" value="' + data + '"/>';
                }
            },
            {
                data: null,
                "width": '3%',
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
            //    .column(10)
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
            //    .column(7)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var thue = api
            //    .column(8)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var chietkhau = api
            //    .column(9)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var tienchietkhau = api
            //    .column(14)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var soluongton = api
            //    .column(6)
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
                .column(4)
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
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            var total = data.length;
            if (total > 0) {
                //thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                //////update footer
                //$(api.column(0).footer()).html(total);
                //$(api.column(4).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$(api.column(6).footer()).html(Math.round(soluongton).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$(api.column(7).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$(api.column(8).footer()).html(Math.round(thue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //if (CheckIs == true) {
                //    $(api.column(14).footer()).html(Math.round(tienchietkhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //}
                //else {
                //    $(api.column(9).footer()).html(chietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //}
                //$(api.column(10).footer()).html(thanhtien);
                //$('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$('#tongtien').html(thanhtien);
                //$('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                ////update footer
                $(api.column(0).footer()).html(total);
                $(api.column(4).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(6).footer()).html(Math.round(soluongton).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(7).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(8).footer()).html(thanhtien);
                $('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#tongtien').html(thanhtien);
                $('#tienhang').html(thanhtien);
                //$('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                //$(api.column(0).footer()).html("0");
                //$(api.column(4).footer()).html("0");
                //$(api.column(6).footer()).html("0");
                //$(api.column(7).footer()).html("0");
                //$(api.column(8).footer()).html("0");
                //$(api.column(9).footer()).html("0");
                //$(api.column(10).footer()).html("0");
                //$('#thue').html("0");
                //$('#chietkhau').html("0");
                //$('#tongtien').html("0");
                //$('#tienhang').html("0");
                $(api.column(0).footer()).html("0");
                $(api.column(4).footer()).html("0");
                $(api.column(6).footer()).html("0");
                $(api.column(7).footer()).html("0");
                $(api.column(8).footer()).html("0");
                $('#thue').html("0");
                $('#chietkhau').html("0");
                $('#tongtien').html("0");
                $('#tienhang').html("0");
            }
        }
    });
    //#Region Thay doi du lieu o chi tiet ban hang
    $("#table-ctbht tbody").on("change", "tr", async function () {
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
        var idMH = tbBanhangTraCTP.row(this).data().MHID;
        var soluong = $(this).find('input[name="txt-so-luong"]').val();
        var dongia = $(this).find('input[name="txt-don-gia"]').val();
        //var tilethue = $(this).find('input[name="txt-thue"]').val();
        var ghichu = $(this).find('input[name="txt-ghichu"]').val();
        var KhoID = $(this).find('#kho-mh').val();
        var CONVERTDONGIA = intVal(dongia);
        var CONVERTSOLUONG = intVal(soluong.replace("-", ""));
        if (tbBanhangTraCTP.row(this).data().MHTID == 7) {
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
            GHICHU: ghichu
        }
        var i = objmathanghoadon.findIndex(x => x.MHID == idMH);
        if (objmathanghoadon[i].KHOID != KhoID) {
            var formdata = new FormData();
            formdata.append("MHID", idMH);
            formdata.append("KHOID", KhoID);
            await GetSoluongTonChiTiet(formdata).then((e) => {
                objmathanghoadon[i].SoLuongTon = e.data[0].soluong;
                objmathanghoadon[i].KHOID = e.data[0].KHOID;
            })
        }

        if (objmathanghoadon[i].MHID == UpdateObjMH.MHID) {
            objmathanghoadon[i].SOLUONG = UpdateObjMH.SOLUONG;
            objmathanghoadon[i].DONGIA = UpdateObjMH.DONGIA;
            objmathanghoadon[i].THANHTIEN = UpdateObjMH.THANHTIEN;
            //objmathanghoadon[i].TienChietKhau = UpdateObjMH.TienChietKhau;
            //objmathanghoadon[i].TILECHIETKHAU = UpdateObjMH.TILECHIETKHAU;
            //objmathanghoadon[i].TILETHUE = UpdateObjMH.TILETHUE;
            if (objmathanghoadon[i].status == 1) {
                objmathanghoadon[i].status = 2;
            }
            objmathanghoadon[i].GHICHU = UpdateObjMH.GHICHU;
        }
        tbBanhangTraCTP.clear();
        tbBanhangTraCTP.rows.add(objmathanghoadon);
        tbBanhangTraCTP.columns.adjust().draw();
        tbBanhangTraCTP.row(i).select();
        tbBanhangTraCTP.row(i).scrollTo(false);
    });
    //end

    //Thay doi mathang theo kho 
    $('#sl-kho').on('change', function () {
        if (confirm("Bạn có muốn thay đôi mặt hàng theo kho")) {
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
                tbBanhangTraCTP.clear();
                tbBanhangTraCTP.rows.add(objmathanghoadon);
                tbBanhangTraCTP.columns.adjust().draw();
            });
        }
    })
    //end
    //Region chuyển tiền thành tỉ lệ chiết khấu
    var CheckIs = false;
    $('input[name="check-chietkhau-tien-bht"]').click(function () {
        CheckIs = $('input[name="check-chietkhau-tien-bht"]').is(":checked")
        tongchietkhau = 0;
        tongthue = 0;
        tongtienhang = 0;
        tbBanhangTraCTP.clear();
        tbBanhangTraCTP.rows.add(objmathanghoadon);
        tbBanhangTraCTP.columns.adjust().draw();
    });
    //end

    //#Region xoa mat hang chi tiet ban hoan tra
    $('#table-ctbht tbody').on('click', 'td [id="xoa-ctphieu-bhhd"]', function () {
        var Phieu = tbBanhangTraCTP.row($(this).closest('tr')).data();
        var it = this;
        if (Phieu.status == 1 || Phieu.status == 2) {
            if (confirm("Bạn chắc chắn muốn xóa không")) {
                for (var i = 0; i < objmathanghoadon.length; i++) {
                    if (objmathanghoadon[i].BCTHTID == Phieu.BCTHTID) {
                        objmathanghoadon.splice(i, 1);
                        break;
                    }
                }
                tbBanhangTraCTP.row($(it).closest('tr')).remove().draw();
                objMatHangDELETE.push({ "BCTHTID": Phieu.BCTHTID });
            }
            //$.ajax({
            //    method: "GET",
            //    url: "/BanHang/CheckRoleXoaBanHangTra",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (msg) {
            //        if (msg.status == 1) {
            //            if (confirm("Bạn chắc chắn muốn xóa không")) {
            //                for (var i = 0; i < objmathanghoadon.length; i++) {
            //                    if (objmathanghoadon[i].BCTHTID == Phieu.BCTHTID) {
            //                        objmathanghoadon.splice(i, 1);
            //                        break;
            //                    }
            //                }
            //                tbBanhangTraCTP.row($(it).closest('tr')).remove().draw();
            //                objMatHangDELETE.push({ "BCTHTID": Phieu.BCTHTID });
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
            console.log('varo');
            for (var i = 0; i < objmathanghoadon.length; i++) {
                if (objmathanghoadon[i].MHID == Phieu.MHID) {
                    console.log(objmathanghoadon);
                    objmathanghoadon.splice(i, 1);
                    break;
                }
            }
            console.log(objmathanghoadon);
            tbBanhangTraCTP.row($(it).closest('tr')).remove().draw();
        }
    });
    //end

    $("#btn-xoa-bht").click(function () {

        let id = $('#table-bht tbody tr.selected').attr('data-id');
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
            if (confirm("Bạn có muốn xóa hay không")) {
                $.ajax({
                    method: "GET",
                    url: "/BanHang/XoaBanHangTra",
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
                            tbBanHangTra.ajax.reload();
                            objmathanghoadon = [];
                            tbBanhangTraCTP.clear();
                            tbBanhangTraCTP.rows.add(objmathanghoadon);
                            tbBanhangTraCTP.columns.adjust().draw();
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

    //#Region tìm kiếm ban hoa don
    //$("#form-banhang-tra").on('change', function () {
    //    tbBanHangTra_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
    //    tbBanHangTra_filterValues.MaKH = $('input[name="search_makh"]').val();
    //    tbBanHangTra_filterValues.TENKH = $('input[name="search_tenkh"]').val();
    //    tbBanHangTra_filterValues.MH = $('input[name="search_mh"]').val();
    //    tbBanHangTra_filterValues.FromDate = $("#search-tungay").val();
    //    tbBanHangTra_filterValues.ToDate = $("#search-denngay").val();
    //    tbBanHangTra_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
    //    tbBanHangTra_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
    //    tbBanHangTra_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
    //    tbBanHangTra_filterValues.statusDraw++;
    //    tbBanHangTra.draw();
    //})
    $('#btn-tim').click(function () {
        tbBanHangTra_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
        tbBanHangTra_filterValues.MaKH = $('input[name="search_makh"]').val();
        tbBanHangTra_filterValues.TENKH = $('input[name="search_tenkh"]').val();
        tbBanHangTra_filterValues.MH = $('input[name="search_mh"]').val();
        tbBanHangTra_filterValues.FromDate = $("#search-tungay").val();
        tbBanHangTra_filterValues.ToDate = $("#search-denngay").val();
        tbBanHangTra_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
        tbBanHangTra_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
        tbBanHangTra_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
        tbBanHangTra_filterValues.statusDraw++;
        tbBanHangTra.draw();
    })
    //end

    //#Region load mat hang modal nho o ban hang
    let tbBanHangHoaDonMH1_filterValues = {}
    tbBanHangHoaDonMH1_filterValues.statusDraw = 0;
    var tbBanHangMHHoaDon1 = $('#table-mh-bht-1').DataTable({
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
    $("#tim-kiem-mat-hang-bht1").on('shown.bs.modal', function () {
        if (tbBanHangHoaDonMH1_filterValues.statusDraw < 1) {
            tbBanHangHoaDonMH1_filterValues.statusDraw++;
            tbBanHangMHHoaDon1.columns.adjust().draw();
        }
    });
    //end

    //#region chọn mặt hàng ở modal nhỏ
    $('#table-mh-bht-1').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-mh-bht-1 tbody tr').not(this).removeClass('selected');
    })
    $("#btn-mh-thoat").click(function () {
        let $this = $('#table-mh-bht-1 tbody tr.selected');
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
            tbBanHangTra_filterValues.statusDraw++;
            $('#tim-kiem-mat-hang-bht1').modal('hide');
            tbBanHangTra.draw();
        }
    });
    //end
    //#Region Load Chi Tiet Ban HangHD
    function BanHangTraChiTiet(hd) {
        $.ajax({
            type: "POST",
            url: "/BanHang/LoadBanHangTraDetail",
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
                    qrcode.makeCode(msg.CTBHT.BHTCODE);
                    $('input[name="txt_idbht"]').val(msg.CTBHT.BHTID);
                    $('select[name="sl-lydonhap"]').val(msg.CTBHT.LDNID);
                    $('input[name="txt_so_phieu_bht"]').val(msg.CTBHT.BHTCODE);
                    $('select[name="sl-hinhthuc"]').val(msg.CTBHT.HTTTID);
                    $('input[name="txt_ngay_tra"]').val(moment(msg.CTBHT.NGAYHD).format('DD/MM/yyyy'));
                    $('input[name="txt_ngay-htt"]').val(moment(msg.CTBHT.HANTHANHTOAN).format('DD/MM/yyyy'));
                    $('select[name="txt-tennv"]').val(msg.CTBHT.NVID);
                    $('select[name="txt-manv"]').val(msg.CTBHT.NVID);
                    $('select[name="txt-makh"]').val(msg.CTBHT.KHID);
                    $('select[name="txt-tenkh"]').val(msg.CTBHT.KHID);
                    $('select[name="txt-tennv"]').trigger('change.select2');//trigger
                    $('select[name="txt-manv"]').trigger('change.select2');//trigger
                    $('select[name="txt-makh"]').trigger('change.select2');//trigger
                    $('select[name="txt-tenkh"]').trigger('change.select2');//trigger
                    $('textarea[name="txt-ghichu"]').val(msg.CTBHT.DIENGIAI);
                    objmathanghoadon = msg.CTMHBHT;
                    tbBanhangTraCTP.clear();
                    tbBanhangTraCTP.rows.add(objmathanghoadon);
                    tbBanhangTraCTP.columns.adjust().draw();
                    $('#phieu-bht').modal('hide');
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

    $('#table-search-mahang-bht').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang-bht tbody tr').not(this).removeClass('selected');
    })
    $(document).keypress(function (e) {
        let checkSearch = $(".table-search").is(":hidden");
        let checkSearch2 = $("#phieu-bht").is(":hidden");
        if (!checkSearch) {
            if (e.which == 13) {
                let idmh = $('#table-search-mahang-bht tbody').find('.selected').attr('data-id');
                LuuMatHang(idmh);
                $(".table-search").hide();
            }
        }
        else if (!checkSearch2) {
            if (e.which == 13) {
                tbBanHangTra_filterValues.SoPhieu = $('input[name="search_sophieu"]').val();
                tbBanHangTra_filterValues.MaKH = $('input[name="search_makh"]').val();
                tbBanHangTra_filterValues.TENKH = $('input[name="search_tenkh"]').val();
                tbBanHangTra_filterValues.MH = $('input[name="search_mh"]').val();
                tbBanHangTra_filterValues.FromDate = $("#search-tungay").val();
                tbBanHangTra_filterValues.ToDate = $("#search-denngay").val();
                tbBanHangTra_filterValues.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
                tbBanHangTra_filterValues.NguoiLap = $('input[name="search-txt-nguoilap').val();
                tbBanHangTra_filterValues.TENNV = $('input[name="search-txt-tennv"]').val();
                tbBanHangTra_filterValues.statusDraw++;
                tbBanHangTra.draw();
            }
        }
    })
    //dbl
    $("#table-search-mahang-bht").on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang-bht tbody tr').not(this).removeClass('selected');
        let idmh = $(this).attr('data-id');
        LuuMatHang(idmh);
        $(".table-search").hide();
    })
    //end
    //#region chọn mặt hàng ở modal nhỏ
    $("#btn-chon-mh").click(function () {
        let idmh = $('#table-search-mahang-bht tbody tr.selected').attr('data-id');
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
        let idmh = $('#table-search-mahang-bht tbody tr.selected').attr('data-id');
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
            $(".table-search").hide();
        }
    });
    //end
    //#Region Luu mat hang da chon
    function LuuMatHang(idmh) {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var kho = $("#sl-kho").val();
        let makh = $('select[name="txt-makh"]').select2('data')[0].text;
        let tenkh = $('select[name="txt-tenkh"]').select2('data')[0].text;
        console.log(kho);
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
                        soLuong = -1;
                    }
                    let obj = {
                        MHID: e.data[0].MHID,
                        MHCODE: e.data[0].MHCODE,
                        MHTEN: e.data[0].MHTEN,
                        //KHOTEN: e.data[0].KHOTEN,
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
                        LINKIMAGE: e.data[0].LINKIMAGE
                    }
                    var exist = false;
                    var index = 0;
                    for (var i = 0; i < objmathanghoadon.length; i++) {
                        if (objmathanghoadon[i].MHID == obj.MHID) {
                            objmathanghoadon[i].SOLUONG = parseInt(objmathanghoadon[i].SOLUONG) + soLuong;
                            objmathanghoadon[i].THANHTIEN = objmathanghoadon[i].SOLUONG * objmathanghoadon[i].DONGIA;
                            exist = true;
                            if (objmathanghoadon[i].status == 1) {
                                objmathanghoadon[i].status = 2;
                            }
                            index = i;
                            break;
                        }
                    }
                    if (exist == false) {
                        objmathanghoadon.push(obj);
                        tbBanhangTraCTP.clear();
                        tbBanhangTraCTP.rows.add(objmathanghoadon);
                        tbBanhangTraCTP.columns.adjust().draw();
                        tbBanhangTraCTP.row(objmathanghoadon.length - 1).select();
                        tbBanhangTraCTP.row(objmathanghoadon.length - 1).scrollTo(false);
                    }
                    else if (exist == true) {
                        tbBanhangTraCTP.clear();
                        tbBanhangTraCTP.rows.add(objmathanghoadon);
                        tbBanhangTraCTP.columns.adjust().draw();
                        tbBanhangTraCTP.row(index).select();
                        tbBanhangTraCTP.row(index).scrollTo(false);
                    }
                }
            }
        });
    };
    //end
    //#Region load mat hang modal nho
    let tbBanHangTraMH_filterValues = {}
    tbBanHangTraMH_filterValues.statusDraw = 0;
    var tbBanHangTraMH = $('#table-search-mahang-bht').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (tbBanHangTraMH_filterValues.statusDraw > 0) {
                tbBanHangTraMH_filterValues.draw = data.draw;
                tbBanHangTraMH_filterValues.search = data.search["value"];
                tbBanHangTraMH_filterValues.start = data.start;
                tbBanHangTraMH_filterValues.length = data.length;
                tbBanHangTraMH_filterValues.order = data.order[0].column;
                tbBanHangTraMH_filterValues.dir = data.order[0].dir;
                tbBanHangTraMH_filterValues.statusDraw;
                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: tbBanHangTraMH_filterValues,
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
                            if (tbBanHangTraMH_filterValues.draw != 1) {
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
                    $('#table-search-mahang-bht tbody tr').eq(0).addClass('selected');
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
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100
        }
    })
    //end

    //#Region set draw mat hang trong hoa don ban hang
    function tbBanHangTraMH_timeout() {
        setTimeout(function () {
            tbBanHangTraMH_filterValues.statusDraw++;
            tbBanHangTraMH.columns.adjust().draw();
        }, 500)
    }
    $("#global_filter").on('keyup click', function () {
        let checkSearchModal = $(".table-search").is(":hidden");
        if (checkSearchModal) {
            $(".table-search").show();
        }
        var checksearch = $('#global_filter').val();
        if (tbBanHangTraMH_filterValues.statusDraw < 1) {
            tbBanHangTraMH_timeout();
        }
        else if (checksearch != tbBanHangTraMH_filterValues.search) {
            tbBanHangTraMH_filterValues.statusDraw++;
            tbBanHangTraMH.search(checksearch).draw();
        }
    })
    //end

    //Region LoadKho dc sử dụng
    LoadKho().then((e) => {
        e.data.map((value) => {
            objKHOMH.push({ KHOID: value.KHOID, KHOCODE: value.KHOCODE });
        })
    })
    //end

    //#Region Excel Ban Hang Ban Hoa Don
    $('#btn-xuat-bht').click(function () {
        //var tbBanHangTra_excel = {};
        //tbBanHangTra_excel.draw = tbBanHangTra_filterValues.draw;
        //tbBanHangTra_excel.start = tbBanHangTra_filterValues.start;
        //tbBanHangTra_excel.length = tbBanHangTra_filterValues.length;
        //tbBanHangTra_excel.order = tbBanHangTra_filterValues.order;
        //tbBanHangTra_excel.dir = tbBanHangTra_filterValues.dir;
        //tbBanHangTra_excel.FromDate = $("#search-tungay").val();
        //tbBanHangTra_excel.ToDate = $("#search-denngay").val();
        //tbBanHangTra_excel.SoPhieu = $('input[name="search_sophieu"]').val();
        //tbBanHangTra_excel.MaKH = $('input[name="search_makh"]').val();
        //tbBanHangTra_excel.TENKH = $('input[name="search_tenkh"]').val();
        //tbBanHangTra_excel.MH = $('input[name="search_mh"]').val();
        //tbBanHangTra_excel.LyDoNhap = $("#search-sl-lydonhap").select2('data')[0].id;
        //tbBanHangTra_excel.NguoiLap = $('input[name="search-txt-nguoilap').val();
        //tbBanHangTra_excel.TENNV = $('input[name="search-txt-tennv"]').val();
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuatBHT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    //var link = `/BanHang/ExcelBanHangBHT?draw=` + tbBanHangTra_excel.draw + `&start=` + tbBanHangTra_excel.start + `&length=` + tbBanHangTra_excel.length + `&order=` + tbBanHangTra_excel.order + `&dir=` + tbBanHangTra_excel.dir + `&FromDate=` + tbBanHangTra_excel.FromDate + `&ToDate=` + tbBanHangTra_excel.ToDate + `&SoPhieu=` + tbBanHangTra_excel.SoPhieu + `&MaKH=` + tbBanHangTra_excel.MaKH + `&TENKH=` + tbBanHangTra_excel.TENKH + `&MH=` + tbBanHangTra_excel.MH + `&LyDoNhap=` + tbBanHangTra_excel.LyDoNhap + `&TENNV=` + tbBanHangTra_excel.TENNV + `&NguoiLap=` + tbBanHangTra_excel.NguoiLap + `&diengiai=` + tbBanHangTra_filterValues.diengiai + ``;
                    var link = `/BanHang/ExcelBanHangBHT?` + serialize(tbBanHangTra_filterValues) + ``;
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

    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/BanHang/CreateMatHangBanHangTraExcel`
        window.open(link)
    })
    //end
    $("#btnFileUploadBHT").click(function () {
        $("#FileUploadBHT").click();
    })
    $("#FileUploadBHT").change(function (event) {
        let input, files;
        input = event.target;
        files = input.files;
        kho = $('select[name="sl-kho"]').val();
        Array.from(files).map((file, index) => {
            console.log(file);
            var formdata = new FormData();
            formdata.append('fileupload', file);
            formdata.append('khoid', kho);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/BanHang/ImportBHT',
                data: formdata,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (msg) {
                    console.log(msg);
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
                                    console.log(!unique[msg.data[i].MHCODE]);
                                    objmathangimport.push({
                                        "MHCODE": msg.data[i].MHCODE,
                                        "SOLUONG": msg.data[i].SoLuongCusTom,
                                        "DONGIA": msg.data[i].DonGiaCusTom,
                                        "GHICHU": msg.data[i].GhiChuCusTom,
                                        "MHID": msg.data[i].MHID,
                                        "SoLuongTon": msg.data[i].SoLuongTon,
                                        "KhoID": msg.data[i].KhoID,
                                        "MHTEN": msg.data[i].MHTEN,
                                        "TILETHUE": 0,
                                        "TILECHIETKHAU": 0,
                                        "DONVI": msg.data[i].DonVi,
                                        "THANHTIEN": intVal(msg.data[i].DonGiaCusTom) * intVal(msg.data[i].SoLuongCusTom),
                                        "TienChietKhau": 0,
                                        "status": 0,
                                        "MHTID": msg.data[i].MHTID,
                                        "MHTEN": msg.data[i].MHTEN,
                                        "LINKIMAGE": msg.data[i].LINKIMAGE
                                    })
                                    unique[msg.data[i].MHCODE] = 1;
                                }
                                else if (unique[msg.data[i].MHCODE] == 1) {
                                    for (var key in objmathangimport) {
                                        if (objmathangimport[key].MHCODE == msg.data[i].MHCODE) {
                                            objmathangimport[key].SOLUONG = parseFloat(objmathangimport[key].SOLUONG) + parseFloat(msg.data[i].SoLuongCusTom);
                                            objmathangimport[key].THANHTIEN = intVal(objmathangimport[key].SOLUONG) * intVal(objmathangimport[key].DONGIA);
                                            break;
                                        }
                                    }
                                }
                            }
                            tbBanHangTraImport.clear();
                            tbBanHangTraImport.rows.add(objmathangimport);
                            tbBanHangTraImport.columns.adjust().draw();
                            $("#btn-ghi-import-bht").prop('disabled', false);
                            $("#FileUploadBHT").val('');
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
                }
            });
        })
    })

    var unique = [];
    var objmathangimport = [];
    var tbBanHangTraImport = $('#table-import-bht').DataTable({
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
            { data: "MHTEN"},
            { data: "SOLUONG" },
            { data: "DONGIA" },
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

    $("#nhap-bht").click(function () {
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuatBHT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $("#btn-nhap-bht").modal();
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $("#btn-nhap-bht").modal('hide');
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

    $("#btn-nhap-bht").on('shown.bs.modal', function () {
        LoadReset();
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        objmathanghoadon = [];
        tbBanhangTraCTP.clear();
        tbBanhangTraCTP.rows.add(objmathanghoadon);
        tbBanhangTraCTP.columns.adjust().draw();
        tbBanHangTraImport.columns.adjust().draw();
        var CountData = tbBanHangTraImport.data().count();
        $("#btn-ghi-import-bht").prop('disabled', true);
        if (CountData > 0) {
            $("#btn-ghi-import-bht").prop('disabled', false);
        }
    })
    $('#btn-nhap-bht').on('hidden.bs.modal', function (e) {
        objmathangimport = [];
        unique = [];
        tbBanHangTraImport.clear();
        tbBanHangTraImport.rows.add(objmathangimport);
        tbBanHangTraImport.columns.adjust().draw();
    })
    $("#btn-ghi-import-bht").click(function () {
        var CountData = tbBanHangTraImport.data().count();
        if (CountData > 0) {
            objmathanghoadon = objmathangimport;
            tbBanhangTraCTP.clear();
            tbBanhangTraCTP.rows.add(objmathanghoadon);
            tbBanhangTraCTP.columns.adjust().draw();
            $("#btn-nhap-bht").modal('hide');
        }
    })
    //CheckRow In
    $('#btn-in-bht').click(function () {
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleInBHT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    let id = $('input[name="txt_idbht"]').val();
                    let getOrder = tbBanhangTraCTP.order();
                    let Desc = getOrder[0][1];
                    let NumberOrder = getOrder[0][0];
                    console.log(id);
                    var link = '/BanHang/InHoaDonBanTra?bhtid=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
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
});
//end document

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
function LoadDataAdd() {
    return $.ajax({
        type: 'GET',
        url: '/BanHang/LoadDataAddBHT',
        success: function (res) {
            return res;
        }
    });
}

function LoadDataLyDo() {
    return $.ajax({
        type: 'GET',
        data: { lydoid: 'N' },
        url: '/BanHang/LoadLyDo',
        success: function (res) {
            return res;
        }
    });
}
function LoadReset() {
    LoadDataAdd().then((e) => {
        $('#qrcode').empty();
        var d = new Date();
        var fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
        $('select[name="sl-lydonhap"]').empty();
        $('input[name="txt_so_phieu_bht"]').empty();
        $('select[name="sl-hinhthuc"]').empty();
        $('select[name="sl-kho"]').empty();
        $('select[name="sl-lydonhap"]').append(e.listlydo);
        $('select[name="sl-lydonhap"]').val('db2af8d7-b961-4d51-845d-901ef6be3c8e');
        $('input[name="txt_so_phieu_bht"]').val(e.bhd);
        $('select[name="sl-hinhthuc"]').append(e.listhinhthuc);
        $('input[name="txt_so_hop_dong"]').val(e.md);
        $('select[name="sl-kho"]').append(e.listkho);
        $('input[name="txt_ngay_tra"]').val(fullDate)
        $('input[name="txt_ngay-htt"]').val(fullDate);
        $('input[name="txt_idbht"]').val('');
    });
}
async function LoadDataNvVAKh() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadDataNvVAKhChoHDBHT',
        success: function (res) {
            console.log(res);
            return res;
        }
    });
}
function CheckKho(e) {
    console.log(filterObj_tonkho_BHT);
    filterObj_tonkho_BHT.MHID = e;
    filterObj_tonkho_BHT.statusDraw++;
    $('#danh-sach-tonkho-bht').modal();
}
//#region Table Tồn kho
$('#danh-sach-tonkho-bht').on('show.bs.modal', async function () {
    tonkhoBHT.columns.adjust().draw()
})
var filterObj_tonkho_BHT = {}
filterObj_tonkho_BHT.statusDraw = 0
var tonkhoBHT = InitDB()
function InitDB() {
    return $('#table-tonkho-bht').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filterObj_tonkho_BHT.statusDraw > 0) {
                filterObj_tonkho_BHT.draw = data.draw;
                filterObj_tonkho_BHT.start = data.start;
                filterObj_tonkho_BHT.length = data.length;
                filterObj_tonkho_BHT.search = data.search["value"];
                filterObj_tonkho_BHT.order = data.order[0].column;
                filterObj_tonkho_BHT.dir = data.order[0].dir;

                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadTonKho',
                    data: filterObj_tonkho_BHT,
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
serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}