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
    $('input[name="txt-bcn-tungay"]').val(fullDate);
    $('input[name="txt-bcn-denngay"]').val(fullDate);
    LoadNhanVienBan().then(function (e) {
        $("#sl-nv").empty();
        $("#sl-nv").append(e.data[0].ListNV);
        $("#sl-ql").empty();
        $("#sl-ql").append(e.data[0].ListNV);
        $("#chinhanh").empty();
        $("#chinhanh").append(e.data[0].ListCN);
        $("#kho").empty();
        $("#kho").append(e.data[0].ListKho);
        $("#bcn-chinhanh").empty();
        $("#bcn-chinhanh").append(e.data[0].ListCN);
        $("#bcn-kho").empty();
        $("#bcn-kho").append(e.data[0].ListKho);
        $("#sl-kenh").empty();
        $("#sl-kenh").append(e.data[0].ListKKH);
        $("#sl-nhom").empty();
        $("#sl-nhom").append(e.data[0].ListNKH);
        createJSTree(e.data[0].ListMH);

    });

    $('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('#dropdown-tree-mathang').show();
        }
        else {
            $('#dropdown-tree-mathang').hide();
        }
    });
    //#Region Check Kho Va Chi Nhanh Bao Cao Ban Hang Va Ban Hang Tra
    $("#tbl-chinhanh tbody").on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            $('input[name="check-all-cn"]').prop('checked', false);
            $('input[name="check-all-k"]').prop('checked', false);
            let idcn = ($(this).attr('data-id'));
            if (target.is(':checked')) {
                $('#kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");
                    }
                })
            }
            else {
                $('#kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                        $(this).find('td input').prop("checked", false);
                    }
                })
            }
        }
    })

    $('input[name="check-all-cn"]').click(function () {
        if ($(this).is(':checked')) {
            $('#chinhanh').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", true);
            })
            $('#kho').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        }
        else {
            $('#chinhanh').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", false);
            })
            $('#kho').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('td input').prop("checked", false);
            })
            $('input[name="check-all-k"]').prop('checked', false);
        }
    })

    $('input[name="check-all-k"]').click(function () {
        var CheckCN = $('input[name="check-all-cn"]').is(":checked");
        if ($(this).is(':checked')) {
            $('#chinhanh').find('tr').each(function (index, e) {
                var CheckCN = $(this).find('td input').is(':checked');
                if (CheckCN) {
                    var idcn = ($(e).attr('data-id'));
                    $('#kho').find('tr').each(function (index, e) {
                        var idkho = ($(e).attr('data-id'));
                        if (idcn == idkho) {
                            $(this).find('td input').prop("checked", true);
                        }
                    })
                }
            })
        }
        else {
            $('#kho').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", false);
            })
        }
    })
    //end

    //#Region Check Kho Va Chi Nhanh Bao Cao Nhanh Ban Hang
    $("#tbl-bcn-chinhanh tbody").on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            $('input[name="check-bcn-all-cn"]').prop('checked', false);
            $('input[name="check-bcn-all-k"]').prop('checked', false);
            let idcn = ($(this).attr('data-id'));
            if (target.is(':checked')) {
                $('#bcn-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");
                    }
                })
            }
            else {
                $('#bcn-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                        $(this).find('td input').prop("checked", false);
                    }
                })
            }
        }
    })

    $('input[name="check-bcn-all-cn"]').click(function () {
        if ($(this).is(':checked')) {
            $('#bcn-chinhanh').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", true);
            })
            $('#bcn-kho').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        }
        else {
            $('#bcn-chinhanh').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", false);
            })
            $('#bcn-kho').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('td input').prop("checked", false);
            })
            $('input[name="check-bcn-all-k"]').prop('checked', false);
        }
    })

    $('input[name="check-bcn-all-k"]').click(function () {
        var CheckCN = $('input[name="check-bcn-all-cn"]').is(":checked");
        if ($(this).is(':checked')) {
            $('#bcn-chinhanh').find('tr').each(function (index, e) {
                var CheckCN = $(this).find('td input').is(':checked');
                if (CheckCN) {
                    var idcn = ($(e).attr('data-id'));
                    $('#bcn-kho').find('tr').each(function (index, e) {
                        var idkho = ($(e).attr('data-id'));
                        if (idcn == idkho) {
                            $(this).find('td input').prop("checked", true);
                        }
                    })
                }
            })
        }
        else {
            $('#bcn-kho').find('tr').each(function (index, e) {
                $(this).find('td input').prop("checked", false);
            })
        }
    })
    //end

    //#Region select2
    $("#sl-nv").select2({
        width: 'resolve'
    });

    $("#sl-ql").select2({
        width: 'resolve'
    });
    //end

    //#Region chon bang ban hang
    $('.baocao-bh tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.baocao-bh').find('tr').removeClass('selected');
        $(this).closest('.baocao-bh').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    $('#table-baocao-bh tbody').on('dblclick', 'tr', function () {
        var BHDCODE = tbl_BC.row(this).data().BHDCODE;
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

    //#Region chon bang ban hang nhanh
    $('.baocaonhanh-bh tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.baocaonhanh-bh').find('tr').removeClass('selected');
        $(this).closest('.baocaonhanh-bh').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    $('#table-baocaonhanh-bh tbody').on('dblclick', 'tr', function () {
        var BHDCODE = tbl_BCN.row(this).data().BHDCODE;
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

    //#Region chon bang ban hang tra
    $('.baocao-bht tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.baocao-bht').find('tr').removeClass('selected');
        $(this).closest('.baocao-bht').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    $('#table-baocao-bht tbody').on('dblclick', 'tr', function () {
        var BHTCODE = tbl_BC_BHT.row(this).data().BHTCODE;
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

    //Search Header Bang Hang
    $('#table-baocao-bh thead tr').clone(true).appendTo('#table-baocao-bh thead');
    $('#table-baocao-bh thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 1 || i == 2 || i == 5 || i == 6 || i == 11 || i == 13 || i == 14 || i == 15 || i == 16 || i == 17 || i == 21) {
            $(this).html('<input type="text"  id="txt-bhd-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC.column(i).search() !== this.value) {
                tbl_BC
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    let filter_BC = {};
    filter_BC.statusDraw = 0;
    var tbl_BC = $('#table-baocao-bh').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC.statusDraw > 0) {
                filter_BC.statusDraw;
                filter_BC.BHD_draw = data.draw;
                filter_BC.BHD_start = data.start;
                filter_BC.BHD_length = data.search["value"];
                filter_BC.BHD_length = data.length;
                filter_BC.BHD_order = data.order[0].column;
                filter_BC.BHD_dir = data.order[0].dir;
                filter_BC.searchBHD_MHCODE = $('#txt-bhd-header-1').val();
                filter_BC.searchBHD_MHTEN = $('#txt-bhd-header-2').val();
                filter_BC.searchBHDCODE = $('#txt-bhd-header-5').val();
                filter_BC.searchBHD_LYDO = $('#txt-bhd-header-6').val();
                filter_BC.searchBHD_NV = $('#txt-bhd-header-11').val();
                filter_BC.searchBHD_KHCODE = $('#txt-bhd-header-13').val();
                filter_BC.searchBHD_KH = $('#txt-bhd-header-14').val();
                filter_BC.searchBHD_GHICHU = $('#txt-bhd-header-15').val();
                filter_BC.searchBHD_CHINHANH = $('#txt-bhd-header-16').val();
                filter_BC.searchBHD_DONVI = $('#txt-bhd-header-17').val();
                filter_BC.searchBHD_USER = $('#txt-bhd-header-21').val();
                filter_BC.searchBHD_NCC = '';//$('#txt-bhd-header-27').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCao',
                    data: filter_BC,
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
                            if (filter_BC.draw != 1) {
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
        "fnInitComplete": function () {
            $('div.dataTables_scrollBody').css({ "max-height": "700px" });
        },
        columns: [
            {
                data: null,
                orderable: false
            },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            { data: 'PATH' },
            { data: 'NGAYHDString' },
            { data: 'BHDCODE' },
            { data: 'CODE' },
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
            //{
            //    data: 'CHIETKHAU',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'THUE',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TTTRUOCTHUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            //{
            //    data: 'GIAVON',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'TONGGIAVON',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'TONGLOINHUANGOP',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            { data: 'NVTEN' },
            { data: 'KHOCODE' },
            { data: "KHCODE" },
            { data: 'KHTEN' },
            { data: 'GHICHU' },
            { data: 'SRTEN' },
            { data: 'DVT' },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            { data: 'USERID' }
            //{ data: 'NCCTEN' }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.BHDID);
            $(nRow).attr('data-dt-row', iDataIndex);
        },
        columnDefs: [
            {
                "targets": [0, 3, 17, 21],
                "orderable": false
            }
        ],
        "order": [[4, "desc"]],
        scrollResize: false,
        scrollY: 360,
        scrollCollapse: false,
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
                $(api.column(11).footer()).html(Math.round(data[0].TONGTIENALL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(11).footer()).html(0);
            }

        }
    });

    //Search Header Bang Hang
    $('#table-baocao-bht thead tr').clone(true).appendTo('#table-baocao-bht thead');
    $('#table-baocao-bht thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 1 || i == 2 || i == 5 || i == 6 || i == 11 || i == 13 || i == 14 || i == 15 || i == 16 || i == 17 || i == 21) {
            $(this).html('<input type="text"  id="txt-bht-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_BC_BHT.column(i).search() !== this.value) {
                tbl_BC_BHT
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    let filter_BC_BHT = {};
    filter_BC_BHT.statusDraw = 0;
    var tbl_BC_BHT = $('#table-baocao-bht').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (filter_BC_BHT.statusDraw > 0) {
                filter_BC_BHT.statusDraw;
                filter_BC_BHT.BHT_draw = data.draw;
                filter_BC_BHT.BHT_start = data.start;
                filter_BC_BHT.BHT_length = data.length;
                filter_BC_BHT.BHT_search = data.search["value"];
                filter_BC_BHT.BHT_order = data.order[0].column;
                filter_BC_BHT.BHT_dir = data.order[0].dir;
                filter_BC_BHT.searchBHT_MHCODE = $('#txt-bht-header-1').val();
                filter_BC_BHT.searchBHT_MHTEN = $('#txt-bht-header-2').val();
                filter_BC_BHT.searchBHTCODE = $('#txt-bht-header-5').val();
                filter_BC_BHT.searchBHT_LYDO = $('#txt-bht-header-6').val();
                filter_BC_BHT.searchBHT_NV = $('#txt-bht-header-11').val();
                filter_BC_BHT.searchBHT_KHCODE = $('#txt-bht-header-13').val();
                filter_BC_BHT.searchBHT_KH = $('#txt-bht-header-14').val();
                filter_BC_BHT.searchBHT_GHICHU = $('#txt-bht-header-15').val();
                filter_BC_BHT.searchBHT_CHINHANH = $('#txt-bht-header-16').val();
                filter_BC_BHT.searchBHT_DONVI = $('#txt-bht-header-17').val();
                filter_BC_BHT.searchBHT_USER = $('#txt-bht-header-21').val();
                filter_BC_BHT.searchBHT_NCC = '';// $('#txt-bht-header-22').val();
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoBHT',
                    data: filter_BC_BHT,
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
                            if (filter_BC_BHT.draw != 1) {
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
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            { data: 'PATH' },
            { data: 'NGAYHTString' },
            { data: 'BHTCODE' },
            { data: 'CODE' },
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
            //{
            //    data: 'CHIETKHAU',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'THUE',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            {
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TTTRUOCTHUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            //{
            //    data: 'GIAVON',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'TONGGIAVON',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            //{
            //    data: 'TONGLOINHUANGOP',
            //    render: function (data, type, full, meta) {
            //        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            //    }
            //},
            { data: 'NVTEN' },
            { data: 'KHOCODE' },
            { data: "KHCODE"},
            { data: 'KHTEN' },
            { data: 'GHICHU' },
            { data: 'SRTEN' },
            { data: 'DVT' },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            { data: 'USERID' },
           // { data: 'NCCTEN' }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.BHTID);
            $(nRow).attr('data-dt-row', iDataIndex);
        },
        
        "order": [[4, "desc"]],
        scrollResize: false,
        scrollY: 360,
        scrollCollapse: false,
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
                $(api.column(9).footer()).html(Math.round(data[0].TONGTIENALL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(9).footer()).html(0);
            }

        }
    });

    let filter_BCN = {};
    filter_BCN.statusDraw = 0;
    var tbl_BCN = $('#table-baocaonhanh-bh').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_BCN.statusDraw > 0) {
                filter_BCN.statusDraw;
                filter_BCN.draw = data.draw;
                filter_BCN.start = data.start;
                filter_BCN.length = data.length;
                filter_BCN.search = data.search["value"];
                filter_BCN.order = data.order[0].column;
                filter_BCN.dir = data.order[0].dir;
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanChiTietBaoCaoBanHangNhanh',
                    data: filter_BCN,
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
                            if (filter_BCN.draw != 1) {
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
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            { data: 'PATH' },
            { data: 'NGAYHDString' },
            { data: 'BHDCODE' },
            { data: 'CODE' },
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
                data: 'CHIETKHAU',
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
                data: 'THANHTIEN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TTTRUOCTHUE',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'GIAVON',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TONGGIAVON',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TONGLOINHUANGOP',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'NVTEN' },
            { data: 'KHOCODE' },
            { data: 'KHTEN' },
            { data: 'GHICHU' },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
            {
                data: null,
                defaultContent: ""
            },
        ],
        columnDefs: [
            {
                "targets": [0, 2, 3, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                "orderable": false
            }
        ],
        "order": [[4, "desc"]],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-dt-row', iDataIndex);
        },
        scrollResize: false,
        scrollY: 550,
        scrollCollapse: false,
        scrollX: true,
        paging: true,
        searching: false,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(11).footer()).html(Math.round(data[0].TONGTIENALL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(11).footer()).html(0);
            }

        }
    });
    $("#btn-baocaonhanh-xuat").addClass('disabled-dia-chi');
    $("#btn-baocaonhanh-in").addClass('disabled-dia-chi');
    $("#btn-baocaonhanh-search").click(function () {
        let listKho = [];
        $('#bcn-kho').find('tr').each(function (index, e) {
            if ($(this).find('input').is(':checked')) {
                var idkho = ($(e).attr('data-idkho'));
                listKho.push(idkho);
            }
        })
        $("#btn-baocaonhanh-xuat").removeClass('disabled-dia-chi');
        $("#btn-baocaonhanh-in").removeClass('disabled-dia-chi');
        filter_BCN.KHOIDLIST = listKho.join();

        filter_BCN.FromDate = $('input[name="txt-bcn-tungay"]').val();
        filter_BCN.ToDate = $('input[name="txt-bcn-denngay"]').val();
        filter_BCN.NVID = $('#sl-ql').val();
        filter_BCN.KHTID = $('#sl-kenh').val();
        filter_BCN.KHNID = $('#sl-nhom').val();

        filter_BCN.statusDraw++;
        tbl_BCN.columns.adjust().draw();
    })
    $("#btn-baocaonhanh-xuat").click(function () {
        ExcelBaoCaoBanHangNhanh(filter_BCN);
    })
    $("#btn-baocaonhanh-in").click(function () {
        InBaoCaoBanHangNhanh(filter_BCN);
    })
    $("#btn-baocao-xuat").addClass('disabled-dia-chi');
    $("#btn-baocao-in").addClass('disabled-dia-chi');
    $("#btn-search-baocao").click(function () {
        let listKho = [];
        $('#kho').find('tr').each(function (index, e) {
            if ($(this).find('input').is(':checked')) {
                var idkho = ($(e).attr('data-idkho'));
                listKho.push(idkho);
            }
        })
        let listMH = [];
        if ($('input[name="NhomHang"]:checked').val() == 0) {
            listMH = [];
        }
        else {
            var selectedNodes = $('#jstree').jstree("get_selected", true);
            $.each(selectedNodes, function () {
                listMH.push(this.id);
            });
        }
        $("#btn-baocao-xuat").removeClass('disabled-dia-chi');
        $("#btn-baocao-in").removeClass('disabled-dia-chi');
        filter_BC.BHD_KHOIDLIST = listKho.join();
        filter_BC_BHT.BHT_KHOIDLIST = listKho.join();
        let ISBANORTRA = $('#sl-kieuban').val();
        filter_BC.FromDate = $('input[name="txt-tungay"]').val();
        filter_BC.ToDate = $('input[name="txt-denngay"]').val();
        filter_BC.NVID = $('#sl-nv').val();
        filter_BC.BHD_MHLIDLIST = listMH.join();

        filter_BC_BHT.FromDate = $('input[name="txt-tungay"]').val();
        filter_BC_BHT.ToDate = $('input[name="txt-denngay"]').val();
        filter_BC_BHT.NVID = $('select[name="sl-nv"]').val();
        filter_BC_BHT.BHT_MHLIDLIST = listMH.join();
        if (ISBANORTRA == 0) {
            filter_BC.statusDraw++;
            tbl_BC.columns.adjust().draw();
        }
        else if (ISBANORTRA == 1) {
            filter_BC_BHT.statusDraw++;
            tbl_BC_BHT.columns.adjust().draw();
        }
        else {
            filter_BC.statusDraw++;
            tbl_BC.columns.adjust().draw();

            filter_BC_BHT.statusDraw++;
            tbl_BC_BHT.columns.adjust().draw();
        }
    })
    $("#btn-baocao-xuat").click(function () {
        ExcelBaoCaoBanHang(filter_BC, filter_BC_BHT);
    })
    $("#btn-baocao-in").click(function () {
        InBaoCaoBanHang(filter_BC, filter_BC_BHT);
    })
    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục
    function createJSTree(jsondata) {
        $('#jstree').jstree({
            'core': {
                'data': jsondata
            },
            "checkbox": {
                "keep_selected_style": false
            },
            "plugins": ["checkbox"]
        });
    };
})

function ExcelBaoCaoBanHang(e, e2) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                let ISBANORTRA = $('#sl-kieuban').val();
                if (ISBANORTRA == 0) {
                    var link = `/BanHang/ExcelBanHangBaoCaoBanHang?` + serialize(e) + ``;
                    //let link = `/BanHang/ExcelBanHangBaoCaoBanHang?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
                    window.open(link);
                }
                else if (ISBANORTRA == 1) {
                    var link = `/BanHang/ExcelBanHangBaoCaoBanHangTra?` + serialize(e2) + ``;
                    //let link = `/BanHang/ExcelBanHangBaoCaoBanHangTra?draw=` + e2.draw + `&start=` + e2.start + `&length=` + e2.length + `&order=` + e2.order + `&dir=` + e2.dir + `&NVID=` + e2.NVID + `&MHLIDLIST=` + e2.MHLIDLIST + `&KHOIDLIST=` + e2.KHOIDLIST + `&search=` + e2.search + `&FromDate=` + e2.FromDate + `&ToDate=` + e2.ToDate + ``;
                    window.open(link);
                }
                else {
                    var obj = Object.assign({}, e,e2);
                    var link = `/BanHang/ExcelBanHangBaoCaoBanHangVaBanHangTra?` + serialize(obj) + ``;
                    window.open(link);
                    //let link = `/BanHang/ExcelBanHangBaoCaoBanHangVaBanHangTra?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
                    //window.open(link);
                    //let link = window.location.origin + `/BanHang/ExcelBanHangBaoCaoBanHang?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
                    //let link2 = window.location.origin + `/BanHang/ExcelBanHangBaoCaoBanHangTra?draw=` + e2.draw + `&start=` + e2.start + `&length=` + e2.length + `&order=` + e2.order + `&dir=` + e2.dir + `&NVID=` + e2.NVID + `&MHLIDLIST=` + e2.MHLIDLIST + `&KHOIDLIST=` + e2.KHOIDLIST + `&search=` + e2.search + `&FromDate=` + e2.FromDate + `&ToDate=` + e2.ToDate + ``;
                    //fetch(link)
                    //    .then(resp => resp.blob())
                    //    .then(blob => {
                    //        const url = window.URL.createObjectURL(blob);
                    //        const a = document.createElement('a');
                    //        a.style.display = 'none';
                    //        a.href = url;
                    //        // the filename you want
                    //        a.download = 'BaoCaoBanHang.xls';
                    //        document.body.appendChild(a);
                    //        a.click();
                    //        window.URL.revokeObjectURL(url);

                    //    })
                    //    .catch(() => alert('Đã có lỗi xảy ra!'));

                    //fetch(link2)
                    //    .then(resp => resp.blob())
                    //    .then(blob => {
                    //        const url = window.URL.createObjectURL(blob);
                    //        const a = document.createElement('a');
                    //        a.style.display = 'none';
                    //        a.href = url;
                    //        a.download = 'BaoCaoBanHangTra.xls';
                    //        document.body.appendChild(a);
                    //        a.click();
                    //        window.URL.revokeObjectURL(url);

                    //    })
                    //    .catch(() => alert('Đã có lỗi xảy ra!'));
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

function ExcelBaoCaoBanHangNhanh(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                let link = `/BanHang/ExcelBanHangBaoCaoBanHangNhanh?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&NVID=` + e.NVID + `&KHTID=` + e.KHTID + `&KHNID=` + e.KHNID + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
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

function InBaoCaoBanHang(e,e2) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                let ISBANORTRA = $('#sl-kieuban').val();
                if (ISBANORTRA == 0) {
                    //let link = `/BanHang/InBaoCaoBanHang?&order=` + e.order + `&order2=` + e2.order + `&dir=` + e.dir + `&dir2=` + e2.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&search2=` + e2.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&BANORTRA=` + ISBANORTRA + ``;
                    var link = `/BanHang/InBaoCaoBanHang?` + serialize(e) + `&BANORTRA=` + ISBANORTRA + ``;
                    window.open(link);
                }
                else if (ISBANORTRA == 1) {
                    //let link = `/BanHang/InBaoCaoBanHang?&order=` + e.order + `&order2=` + e2.order + `&dir=` + e.dir + `&dir2=` + e2.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&search2=` + e2.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&BANORTRA=` + ISBANORTRA + ``;
                    var link = `/BanHang/InBaoCaoBanHang?` + serialize(e2) + `&BANORTRA=` + ISBANORTRA +  ``;
                    window.open(link);
                }
                else {
                    var obj = Object.assign({}, e, e2);
                    var link = `/BanHang/InBaoCaoBanHang?` + serialize(obj) + `&BANORTRA=` + ISBANORTRA +  ``;
                    //let link = `/BanHang/InBaoCaoBanHang?&order=` + e.order + `&order2=` + e2.order + `&dir=` + e.dir + `&dir2=` + e2.dir + `&NVID=` + e.NVID + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&search2=` + e2.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + `&BANORTRA=` + ISBANORTRA + ``;
                    window.open(link);
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
function InBaoCaoBanHangNhanh(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                let link = `/BanHang/InBaoCaoBanHangNhanh?order=` + e.order + `&dir=` + e.dir + `&NVID=` + e.NVID + `&KHTID=` + e.KHTID + `&KHNID=` + e.KHNID + `&KHOIDLIST=` + e.KHOIDLIST + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
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
function LoadNhanVienBan() {
    return $.ajax({
        type: 'POST',
        url: '/BanHang/LoadBaoCao',
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

serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
$(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});