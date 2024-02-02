$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {
    let d = new Date();
    let fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    $('input[name="txt-tungay"]').val(fullDate);
    $('input[name="txt-denngay"]').val(fullDate);
    LoadBaoCaoLichSuBanHang().then(function (e) {
        $("#sl-kh").empty();
        $("#sl-kh").append(e.data[0].ListKH);
        $("#sl-chinhanh").empty();
        $("#sl-chinhanh").append(e.data[0].ListCN);
    });

    $("#sl-kh").select2({
        width: 'resolve'
    });
    $('#xuat tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('#xuat').find('tr').removeClass('selected');
        $(this).closest('#xuat').find('tr').css({ "background-color": "" });
        $(this).closest('#xuat').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    $('#nhap tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('#nhap').find('tr').removeClass('selected');
        $(this).closest('#nhap').find('tr').css({ "background-color": "" });
        $(this).closest('#nhap').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });
    //#Region dbl Bao Cao Xuat
    $('#table-baocao-xuat tbody').on('dblclick', 'tr', function () {
        var BHDCODE = tbl_BC_XUAT.row(this).data().BHDCODE;
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckChuyenBHHDTuBaoCaoBanHang",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    link = "/BanHang/HoaDonBanHang?BHDCODE=" + BHDCODE;
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
    //end

    //#Region dbl Bao Cao Xuat Tra
    $('#table-baocao-xuat-tra tbody').on('dblclick', 'tr', function () {
        var mhtcode = tbl_BC_XUATTRA.row(this).data().MHTID;
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckChuyenMuaHangTraTuBaoCaoXuatTra",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    link = "/HangMuaTraLai?id=" + mhtcode;
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
    //end

    //#Region dbl Bao Cao  Nhap
    $('#table-baocao-nhap tbody').on('dblclick', 'tr', function () {
        var mhdcode = tbl_BC_NHAP.row(this).data().MHDID;
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckChuyenPhieuNhapKhoTuBaoCaoXuatTra",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    link = "/PhieuNhapKho?id=" + mhdcode;
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
    //end

    //#Region dbl Bao Cao Nhap Tra
    $('#table-baocao-nhap-tra tbody').on('dblclick', 'tr', function () {
        var BHTCODE = tbl_BC_NHAPTRA.row(this).data().BHTCODE;
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckChuyenBHTHDTuBaoCaoBanHang",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    link = "/BanHang/BanHangTra?BHTCODE=" + BHTCODE;
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
    //end

    //Search Header Báo Cáo Chi
    $('#table-baocao-chi thead tr').clone(true).appendTo('#table-baocao-chi thead');
    $('#table-baocao-chi thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 4 && i != 6) {
            $(this).html('<input type="text"  id="txt-baocao-chi-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_CHI.column(i).search() !== this.value) {
                tbl_BC_CHI
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    //#Region Báo cáo chi
    let filter_BC_CHI = {};
    filter_BC_CHI.statusDraw = 0;
    var tbl_BC_CHI = $('#table-baocao-chi').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_CHI.statusDraw > 0) {
                filter_BC_CHI.statusDraw;
                filter_BC_CHI.draw = data.draw;
                filter_BC_CHI.start = data.start;
                filter_BC_CHI.length = data.length;
                filter_BC_CHI.search = data.search["value"];
                filter_BC_CHI.order = data.order[0].column;
                filter_BC_CHI.dir = data.order[0].dir;
                filter_BC_CHI.sophieu = $('#txt-baocao-chi-header-2').val();
                filter_BC_CHI.tenkhachhang = $('#txt-baocao-chi-header-3').val();
                filter_BC_CHI.ghichu = $('#txt-baocao-chi-header-5').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoChi',
                    data: filter_BC_CHI,
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
                            if (filter_BC_CHI.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: 'NgayTTString' },
            { data: 'MPTTCODE' },
            { data: 'KH' },
            {
                data: 'TONGTIENTT',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'DIENGIAI' },
            {
                data: 'PaidByCash',
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                }
            }
        ],
        columnDefs: [
            {
                "targets": [0,6],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        select: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(4).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(4).footer()).html(0);
            }
        }
    });
    //end

    //#Region set draw cho table bao cao chi
    //var SHOWCHi = false
    //$('#bc-chi').click(function () {
    //    if (SHOWCHi == true) {
    //        filter_BC_CHI.statusDraw++;
    //        tbl_BC_CHI.columns.adjust().draw();
    //        SHOWCHi = false;
    //    }
    //});
    //end

    //#Region set draw cho table bao cao chi
    //var SHOWXUAT = false
    //$('#bc-xuat').click(function () {
    //    if (SHOWXUAT == true) {
    //        filter_BC_XUAT.statusDraw++;
    //        tbl_BC_XUAT.columns.adjust().draw();
    //        SHOWXUAT = false;
    //    }
    //});
    //end

    //Search Header Báo Cáo Xuất
    $('#table-baocao-xuat thead tr').clone(true).appendTo('#table-baocao-xuat thead');
    $('#table-baocao-xuat thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 2 && i != 3 && i != 5 && i != 9 && i != 10 && i != 11 && i != 12 && i != 13 && i != 14 && i != 17 && i != 18) {
            $(this).html('<input type="text"  id="txt-baocao-xuat-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_XUAT.column(i).search() !== this.value) {
                tbl_BC_XUAT
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end

    //#Region Báo Cáo Xuất
    let filter_BC_XUAT = {};
    filter_BC_XUAT.statusDraw = 0;
    var tbl_BC_XUAT = $('#table-baocao-xuat').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_XUAT.statusDraw > 0) {
                filter_BC_XUAT.statusDraw;
                filter_BC_XUAT.draw = data.draw;
                filter_BC_XUAT.start = data.start;
                filter_BC_XUAT.length = data.length;
                filter_BC_XUAT.search = data.search["value"];
                filter_BC_XUAT.order = data.order[0].column;
                filter_BC_XUAT.dir = data.order[0].dir;
                filter_BC_XUAT.sophieu = $('#txt-baocao-xuat-header-4').val();
                filter_BC_XUAT.tenkhachhang = $('#txt-baocao-xuat-header-6').val();
                filter_BC_XUAT.mahang = $('#txt-baocao-xuat-header-7').val();
                filter_BC_XUAT.tenhang = $('#txt-baocao-xuat-header-8').val();
                filter_BC_XUAT.ghichu = $('#txt-baocao-xuat-header-15').val();
                filter_BC_XUAT.lydo = $('#txt-baocao-xuat-header-16').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoXuat',
                    data: filter_BC_XUAT,
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
                            if (filter_BC_XUAT.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        "createdRow": function (row, data, dataIndex) {
            if (data.ISTHANHTIEN == 'R') {
                $(row).addClass('custom-selected');
            }
            $(row).attr('data-dt-row', dataIndex);
        },
        columns: [
            { data: null },
            { data: 'NGAYHDString' },
            { data: 'HANTHANHTOANString' },
            { data: 'QUAHANString' },
            { data: 'BHDCODE' },
            { data: 'BHDSO' },
            { data: 'KH' },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            {
                data: 'SOLUONG',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'DONGIA',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'CHIETKHAU',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'ISTHANHTIEN' },
            { data: 'DIENGIAI' },
            { data: 'CODE' },
            { data: 'TILETHUE' },
            { data: 'KIEU' }
        ],
        columnDefs: [
            {
                "targets": [0,3,5,14,18],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(3).footer()).html(data[0].TONGQH.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(9).footer()).html(data[0].TONGSL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(10).footer()).html(data[0].TONGDG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(11).footer()).html(Math.round(data[0].TONGT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(12).footer()).html(Math.round(data[0].TONGCK).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(13).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(17).footer()).html(data[0].TONGTILETHUE.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(3).footer()).html(0);
                $(api.column(9).footer()).html(0);
                $(api.column(10).footer()).html(0);
                $(api.column(11).footer()).html(0);
                $(api.column(12).footer()).html(0);
                $(api.column(13).footer()).html(0);
                $(api.column(17).footer()).html(0);
            }

        }
    });
    //end


    //Search Header Báo Cáo Xuất Trả
    $('#table-baocao-xuat-tra thead tr').clone(true).appendTo('#table-baocao-xuat-tra thead');
    $('#table-baocao-xuat-tra thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 6 && i != 7 && i != 8 && i != 9 && i != 10 && i != 13) {
            $(this).html('<input type="text"  id="txt-baocao-xuat-tra-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_XUATTRA.column(i).search() !== this.value) {
                tbl_BC_XUATTRA
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    //#Region Báo Cáo Xuất Trả
    let filter_BC_XUATTRA = {};
    filter_BC_XUATTRA.statusDraw = 0;
    var tbl_BC_XUATTRA = $('#table-baocao-xuat-tra').DataTable({
        serverSide: true,
        orderCellsTop: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_BC_XUATTRA.statusDraw > 0) {
                filter_BC_XUATTRA.statusDraw;
                filter_BC_XUATTRA.draw = data.draw;
                filter_BC_XUATTRA.start = data.start;
                filter_BC_XUATTRA.length = data.length;
                filter_BC_XUATTRA.search = data.search["value"];
                filter_BC_XUATTRA.order = data.order[0].column;
                filter_BC_XUATTRA.dir = data.order[0].dir;
                filter_BC_XUATTRA.sophieu = $('#txt-baocao-xuat-tra-header-2').val();
                filter_BC_XUATTRA.tenkhachhang = $('#txt-baocao-xuat-tra-header-3').val();
                filter_BC_XUATTRA.mahang = $('#txt-baocao-xuat-tra-header-4').val();
                filter_BC_XUATTRA.tenhang = $('#txt-baocao-xuat-tra-header-5').val();
                filter_BC_XUATTRA.ghichu = $('#txt-baocao-xuat-tra-header-11').val();
                filter_BC_XUATTRA.lydo = $('#txt-baocao-xuat-tra-header-12').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoXuatTra',
                    data: filter_BC_XUATTRA,
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
                            if (filter_BC_XUATTRA.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: 'NGAYHTString' },
            { data: 'MHTCODE' },
            { data: 'KH' },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            {
                data: 'SOLUONG',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'DONGIA',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'CHIETKHAU',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'GHICHU' },
            { data: 'CODE' },
            { data: 'TILETHUE' }
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        select: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(6).footer()).html(data[0].TONGSL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(7).footer()).html(data[0].TONGDG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(8).footer()).html(Math.round(data[0].TONGT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(9).footer()).html(Math.round(data[0].TONGCK).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(10).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(13).footer()).html(data[0].TONGTILETHUE.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(6).footer()).html(0);
                $(api.column(7).footer()).html(0);
                $(api.column(8).footer()).html(0);
                $(api.column(9).footer()).html(0);
                $(api.column(10).footer()).html(0);
                $(api.column(13).footer()).html(0);
            }
        }
    });
    //end

    //Search Header Báo Cáo Thu
    $('#table-baocao-thu thead tr').clone(true).appendTo('#table-baocao-thu thead');
    $('#table-baocao-thu thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 4 && i != 6) {
            $(this).html('<input type="text"  id="txt-baocao-thu-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_THU.column(i).search() !== this.value) {
                tbl_BC_THU
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    //#Region Báo Cáo Thu
    let filter_BC_THU = {};
    filter_BC_THU.statusDraw = 0;
    var tbl_BC_THU = $('#table-baocao-thu').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_THU.statusDraw > 0) {
                filter_BC_THU.statusDraw;
                filter_BC_THU.draw = data.draw;
                filter_BC_THU.start = data.start;
                filter_BC_THU.length = data.length;
                filter_BC_THU.search = data.search["value"];
                filter_BC_THU.order = data.order[0].column;
                filter_BC_THU.dir = data.order[0].dir;
                filter_BC_THU.sophieu = $('#txt-baocao-thu-header-2').val();
                filter_BC_THU.tenkhachhang = $('#txt-baocao-thu-header-3').val();
                filter_BC_THU.ghichu = $('#txt-baocao-thu-header-5').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoThu',
                    data: filter_BC_THU,
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
                            if (filter_BC_THU.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: 'NgayTTString' },
            { data: 'BPTTCODE' },
            { data: 'KH' },
            {
                data: 'TONGTIENTT',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'DIENGIAI' },
            {
                data: 'PaidByCash',
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                }
            }
        ],
        columnDefs: [
            {
                "targets": [0, 6],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        select: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(4).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(4).footer()).html(0);
            }
        }
    });

    //Search Header Báo Cáo Nhập
    $('#table-baocao-nhap thead tr').clone(true).appendTo('#table-baocao-nhap thead');
    $('#table-baocao-nhap thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 2 && i != 3 && i != 5 && i != 9 && i != 10 && i != 11 && i != 12 && i != 13 && i != 14 && i != 17 && i != 18) {
            $(this).html('<input type="text"  id="txt-baocao-nhap-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_NHAP.column(i).search() !== this.value) {
                tbl_BC_NHAP
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end
    //#Region Báo Cáo Nhập
    let filter_BC_NHAP = {};
    filter_BC_NHAP.statusDraw = 0;
    var tbl_BC_NHAP = $('#table-baocao-nhap').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_NHAP.statusDraw > 0) {
                filter_BC_NHAP.statusDraw;
                filter_BC_NHAP.draw = data.draw;
                filter_BC_NHAP.start = data.start;
                filter_BC_NHAP.length = data.length;
                filter_BC_NHAP.search = data.search["value"];
                filter_BC_NHAP.order = data.order[0].column;
                filter_BC_NHAP.dir = data.order[0].dir;
                filter_BC_NHAP.sophieu = $('#txt-baocao-nhap-header-4').val();
                filter_BC_NHAP.tenkhachhang = $('#txt-baocao-nhap-header-6').val();
                filter_BC_NHAP.mahang = $('#txt-baocao-nhap-header-7').val();
                filter_BC_NHAP.tenhang = $('#txt-baocao-nhap-header-8').val();
                filter_BC_NHAP.ghichu = $('#txt-baocao-nhap-header-15').val();
                filter_BC_NHAP.lydo = $('#txt-baocao-nhap-header-16').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoNhap',
                    data: filter_BC_NHAP,
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
                            if (filter_BC_NHAP.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        "createdRow": function (row, data, dataIndex) {
            if (data.ISTHANHTIEN == 'R') {
                $(row).addClass('custom-selected');
            }
            $(row).attr('data-dt-row', dataIndex);
        },
        columns: [
            { data: null },
            { data: 'NGAYHDString' },
            { data: 'HANTHANHTOANString' },
            { data: 'QUAHANString' },
            { data: 'MHDCODE' },
            { data: 'MHDSO' },
            { data: 'KH' },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            {
                data: 'SOLUONG',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'DONGIA',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'CHIETKHAU',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'ISTHANHTIEN' },
            { data: 'DIENGIAI' },
            { data: 'CODE' },
            { data: 'TILETHUE' }
        ],
        columnDefs: [
            {
                "targets": [0,3, 5, 14],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(3).footer()).html(data[0].TONGQH.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(9).footer()).html(data[0].TONGSL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(10).footer()).html(data[0].TONGDG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(11).footer()).html(Math.round(data[0].TONGT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(12).footer()).html(Math.round(data[0].TONGCK).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(13).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(17).footer()).html(data[0].TONGTILETHUE.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(3).footer()).html(0);
                $(api.column(9).footer()).html(0);
                $(api.column(10).footer()).html(0);
                $(api.column(11).footer()).html(0);
                $(api.column(12).footer()).html(0);
                $(api.column(13).footer()).html(0);
                $(api.column(17).footer()).html(0);
            }

        }
    });
    //end


    //$('#table-baocao-nhap-tra thead tr').clone(true).appendTo('#table-baocao-nhap-tra thead');
    //$('#table-baocao-nhap-tra thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    $(this).html('<input type="text" placeholder="Search ' + title + '" />');

    //    $('input', this).on('keyup change', function () {
    //        if (tbl_BC_NHAPTRA.column(i).search() !== this.value) {
    //            console.log(tbl_BC_NHAPTRA.column(i).index());

    //            tbl_BC_NHAPTRA
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
    //Search Header Báo Cáo Nhập
    $('#table-baocao-nhap-tra thead tr').clone(true).appendTo('#table-baocao-nhap-tra thead');
    $('#table-baocao-nhap-tra thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 6 && i != 7 && i != 8 && i != 9 && i != 10 && i != 13) {
            $(this).html('<input type="text"  id="txt-baocao-nhap-tra-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_NHAPTRA.column(i).search() !== this.value) {
                tbl_BC_NHAPTRA
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end
    //#Region Báo Cáo Nhập Trả
    let filter_BC_NHAPTRA = {};
    filter_BC_NHAPTRA.statusDraw = 0;
    var tbl_BC_NHAPTRA = $('#table-baocao-nhap-tra').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_NHAPTRA.statusDraw > 0) {
                filter_BC_NHAPTRA.statusDraw;
                filter_BC_NHAPTRA.draw = data.draw;
                filter_BC_NHAPTRA.start = data.start;
                filter_BC_NHAPTRA.length = data.length;
                filter_BC_NHAPTRA.search = data.search["value"];
                filter_BC_NHAPTRA.order = data.order[0].column;
                filter_BC_NHAPTRA.dir = data.order[0].dir;
                filter_BC_NHAPTRA.sophieu = $('#txt-baocao-nhap-tra-header-2').val();
                filter_BC_NHAPTRA.tenkhachhang = $('#txt-baocao-nhap-tra-header-3').val();
                filter_BC_NHAPTRA.mahang = $('#txt-baocao-nhap-tra-header-4').val();
                filter_BC_NHAPTRA.tenhang = $('#txt-baocao-nhap-tra-header-5').val();
                filter_BC_NHAPTRA.ghichu = $('#txt-baocao-nhap-tra-header-11').val();
                filter_BC_NHAPTRA.lydo = $('#txt-baocao-nhap-tra-header-12').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoNhapTra',
                    data: filter_BC_NHAPTRA,
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
                            if (filter_BC_NHAPTRA.draw != 1) {
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
                    },
                }).done(callback, () => {
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: 'NGAYHTString' },
            { data: 'BHTCODE' },
            { data: 'KH' },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            {
                data: 'SOLUONG',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'DONGIA',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'CHIETKHAU',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'GHICHU' },
            { data: 'CODE' },
            { data: 'TILETHUE' }
        ],
        columnDefs: [
            {
                "targets": [0],
                "orderable": false
            }
        ],
        "order": [[1, "desc"]],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        select: true,
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(6).footer()).html(data[0].TONGSL.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(7).footer()).html(data[0].TONGDG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(8).footer()).html(Math.round(data[0].TONGT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(9).footer()).html(Math.round(data[0].TONGCK).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(10).footer()).html(Math.round(data[0].TongtienAll).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(13).footer()).html(data[0].TONGTILETHUE.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(6).footer()).html(0);
                $(api.column(7).footer()).html(0);
                $(api.column(8).footer()).html(0);
                $(api.column(9).footer()).html(0);
                $(api.column(10).footer()).html(0);
                $(api.column(13).footer()).html(0);
            }
        }
    });
    //end
    $("#btn-baocao-xuat").addClass('disabled-dia-chi');
    $("#btn-baocao-in").addClass('disabled-dia-chi');
    $("#btn-search-baocao").click(function () {

        let FromDate = $('input[name="txt-tungay"]').val();
        let ToDate = $('input[name="txt-denngay"]').val();
        let SRID = $('#sl-chinhanh').val();
        let KHID = $('#sl-kh').val();
        $("#btn-baocao-xuat").removeClass('disabled-dia-chi');
        $("#btn-baocao-in").removeClass('disabled-dia-chi');
        $.ajax({
            type: "GET",
            url: '/BanHang/LoadBaoCaoLSBHTIEN',
            dataType: 'json',
            data: { SRID: SRID, ToDate: ToDate, FromDate: FromDate, KHID: KHID }
        }).done(function (data) {
            if (data.status == 1) {
                $("#baocao-header").html(data.data[0].title);
                if (data.data[0].data[0].TONDAU == null) {
                    $('#bc-tondau').text("Tồn đầu: 0");
                }
                else {
                    $('#bc-tondau').html("Tồn đầu: " + '<br>' + data.data[0].data[0].TONDAU.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].XUAT == null) {
                    $('#bc-xuat').text("1. Xuất: 0");
                }
                else {
                    $('#bc-xuat').html("1. Xuất: " + '<br>' + data.data[0].data[0].XUAT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].XUATTRA == null) {
                    $('#bc-xuattra').text("Xuất trả: 0");
                }
                else {
                    $('#bc-xuattra').html("2. Xuất trả: " + '<br>' + data.data[0].data[0].XUATTRA.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].THU == null) {
                    $('#bc-thu').text("3. Thu: 0");
                }
                else {
                    $('#bc-thu').html("3. Thu: " + '<br>' + data.data[0].data[0].THU.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].NHAP == null) {
                    $('#bc-nhap').text("4. Nhập: 0");
                }
                else {
                    $('#bc-nhap').html("4. Nhập: " + '<br>' + data.data[0].data[0].NHAP.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].NHAPTRA == null) {
                    $('#bc-nhaptra').text("5. Nhập trả: 0")
                }
                else {
                    $('#bc-nhaptra').html("5. Nhập trả: " + '<br>' + data.data[0].data[0].NHAPTRA.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].CHI == null) {
                    $('#bc-chi').text("6. Chi: 0");
                }
                else {
                    $('#bc-chi').html("6. Chi: " + '<br>' + data.data[0].data[0].CHI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
                if (data.data[0].data[0].TONCUOI == null) {
                    $('#bc-toncuoi').text("Tồn cuối: 0");
                }
                else {
                    $('#bc-toncuoi').html("Tồn cuối: " + '<br>' + data.data[0].data[0].TONCUOI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        });
        //table xuat
        filter_BC_XUAT.statusDraw++;
        filter_BC_XUAT.FromDate = FromDate;
        filter_BC_XUAT.ToDate = ToDate;
        filter_BC_XUAT.SRID = SRID;
        filter_BC_XUAT.KHID = KHID;
        tbl_BC_XUAT.columns.adjust().draw();
        SHOWXUAT = true;

        //table xuat tra
        filter_BC_XUATTRA.statusDraw++;
        filter_BC_XUATTRA.FromDate = FromDate;
        filter_BC_XUATTRA.ToDate = ToDate;
        filter_BC_XUATTRA.SRID = SRID;
        filter_BC_XUATTRA.KHID = KHID;
        tbl_BC_XUATTRA.columns.adjust().draw();
        SHOWXUATTRA = true;

        //table thu
        filter_BC_THU.statusDraw++;
        filter_BC_THU.FromDate = FromDate;
        filter_BC_THU.ToDate = ToDate;
        filter_BC_THU.SRID = SRID;
        filter_BC_THU.KHID = KHID;
        tbl_BC_THU.columns.adjust().draw();
        SHOWTHU = true;

        //table nhap
        filter_BC_NHAP.statusDraw++;
        filter_BC_NHAP.FromDate = FromDate;
        filter_BC_NHAP.ToDate = ToDate;
        filter_BC_NHAP.SRID = SRID;
        filter_BC_NHAP.KHID = KHID;
        tbl_BC_NHAP.columns.adjust().draw();
        SHOWNHAP = true;

        //table nhap tra
        filter_BC_NHAPTRA.statusDraw++;
        filter_BC_NHAPTRA.FromDate = FromDate;
        filter_BC_NHAPTRA.ToDate = ToDate;
        filter_BC_NHAPTRA.SRID = SRID;
        filter_BC_NHAPTRA.KHID = KHID;
        tbl_BC_NHAPTRA.columns.adjust().draw();
        SHOWNHAPTRA = true;

        //table chi
        filter_BC_CHI.statusDraw++;
        filter_BC_CHI.FromDate = FromDate;
        filter_BC_CHI.ToDate = ToDate;
        filter_BC_CHI.SRID = SRID;
        filter_BC_CHI.KHID = KHID;
        tbl_BC_CHI.columns.adjust().draw();
        SHOWCHi = true;
    })
    $("#btn-baocao-xuat").click(function () {
        var tabs = $('.list-btn-tab .box-shape').find('.active').attr('data-tabs');
        console.log(tabs);
        if (tabs == 'xuat') {
            ExcelBaoCaoXuat(filter_BC_XUAT);
        }
        else if (tabs == 'xuat-tra') {
            ExcelBaoCaoXuatTra(filter_BC_XUATTRA);
        }
        else if (tabs == 'thu') {
            ExcelBaoCaoThu(filter_BC_THU);
        }
        else if (tabs == 'nhap') {
            ExcelBaoCaoNhap(filter_BC_NHAP);
        }
        else if (tabs == 'nhap-tra') {
            ExcelBaoCaoNhapTra(filter_BC_NHAPTRA);
        }
        else if (tabs == 'chi') {
            ExcelBaoCaoChi(filter_BC_CHI);
        }
        else {
            toast.create({
                title: 'Notification!',
                text: 'Hãy chọn tabs',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    })
    $("#btn-baocao-in").click(function () {
        var tabs = $('.list-btn-tab .box-shape').find('.active').attr('data-tabs');
        if (tabs == 'xuat') {
            InBaoCaoXuat(filter_BC_XUAT);
        }
        else if (tabs == 'xuat-tra') {
            InBaoCaoXuatTra(filter_BC_XUATTRA);
        }
        else if (tabs == 'thu') {
            InBaoCaoThu(filter_BC_THU);
        }
        else if (tabs == 'nhap') {
            InBaoCaoNhap(filter_BC_NHAP);
        }
        else if (tabs == 'nhap-tra') {
            InBaoCaoNhapTra(filter_BC_NHAPTRA);
        }
        else if (tabs == 'chi') {
            InBaoCaoChi(filter_BC_CHI);
        }
        else {
            toast.create({
                title: 'Notification!',
                text: 'Hãy chọn tabs',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    })
})

var SHOWCHi = false;
var SHOWXUAT = false;
var SHOWXUATTRA = false;
var SHOWTHU = false;
var SHOWNHAP = false;
var SHOWNHAPTRA = false;
$(document).on('click', '.list-btn-tab .box-shape .tab-shape', function () {
    $('.list-btn-tab .box-shape .tab-shape').removeClass('active');

    $(this).addClass('active');
    var data_tab = $(this).attr('data-tabs');
    console.log(data_tab);
    $('.content-tab .item').hide();
    $('html')
        .find('.content-tab .item#' + data_tab)
        .show();
    if (data_tab == 'xuat') {
        if (SHOWXUAT == true) {
            $('#table-baocao-xuat').DataTable().columns.adjust().draw();
            SHOWXUAT = false;
        }
    }
    if (data_tab == 'xuat-tra') {
        if (SHOWXUAT == true) {
            $('#table-baocao-xuat-tra').DataTable().columns.adjust().draw();
            SHOWXUATTRA = false;
        }
    }
    if (data_tab == 'thu') {
        if (SHOWTHU == true) {
            $('#table-baocao-thu').DataTable().columns.adjust().draw();
            SHOWTHU = false;
        }
    }
    if (data_tab == 'nhap') {
        if (SHOWNHAP == true) {
            $('#table-baocao-nhap').DataTable().columns.adjust().draw();
            SHOWNHAP = false;
        }
    }
    if (data_tab == 'nhap-tra') {
        if (SHOWNHAPTRA == true) {
            $('#table-baocao-nhap-tra').DataTable().columns.adjust().draw();
            SHOWNHAPTRA = false;
        }
    }
    if (data_tab == 'chi') {
        if (SHOWCHi == true) {
            $('#table-baocao-chi').DataTable().columns.adjust().draw();
            SHOWCHi = false;
        }
    }
});

function ExcelBaoCaoXuat(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoXuat?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function ExcelBaoCaoChi(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoChi?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&ghichu=` + e.ghichu + ``;
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
}

function ExcelBaoCaoXuatTra(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoXuatTra?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function ExcelBaoCaoThu(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoThu?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&tenkhachhang=` + e.tenkhachhang + `&ghichu=` + e.ghichu + ``;
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
}

function ExcelBaoCaoNhap(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoNhap?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function ExcelBaoCaoNhapTra(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoNhapTra?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function InBaoCaoXuat(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoXuat?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function InBaoCaoChi(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoChi?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&ghichu=` + e.ghichu + ``;
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
}

function InBaoCaoXuatTra(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoXuatTra?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function InBaoCaoThu(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoThu?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&ghichu=` + e.ghichu + ``;
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
}

function InBaoCaoNhap(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoNhap?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function InBaoCaoNhapTra(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLichSuMuaBan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoNhapTra?order=` + e.order + `&dir=` + e.dir + `&KHID=` + e.KHID + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&sophieu=` + e.sophieu + `&tenkhachhang=` + e.tenkhachhang + `&mahang=` + e.mahang + `&tenhang=` + e.tenhang + `&ghichu=` + e.ghichu + `&lydo=` + e.lydo + ``;
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
}

function LoadBaoCaoLichSuBanHang() {
    return $.ajax({
        type: 'POST',
        url: '/BanHang/LoadBaoCaoLichSuBanHang',
        success: function (res) {
            return res;
        }
    });
}
function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}
