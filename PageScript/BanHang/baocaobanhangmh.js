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
    LoadDataBaoCaoBHMH().then(function (e) {
        $("#chinhanh").empty();
        $("#chinhanh").append(e.data[0].ListCN);
        $("#kho").empty();
        $("#kho").append(e.data[0].ListKho);
        createJSTree(e.data[0].ListLMH);
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
                    console.log(idcn);
                    $('#kho').find('tr').each(function (index, e) {
                        var idkho = ($(e).attr('data-id'));
                        console.log(idkho);
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

    //#Region chon bao cao mh
    $('.baocao-bhmh tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.baocao-bhmh').find('tr').removeClass('selected');
        $(this).closest('.baocao-bhmh').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });
    // end

    let filter_BC = {};
    filter_BC.statusDraw = 0;
    var tbl_BC = $('#table-baocao-bhmh').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_BC.statusDraw > 0) {
                filter_BC.statusDraw;
                filter_BC.draw = data.draw;
                filter_BC.start = data.start;
                filter_BC.length = data.length;
                filter_BC.search = data.search["value"];
                filter_BC.order = data.order[0].column;
                filter_BC.dir = data.order[0].dir;
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadBanMHChiTietBaoCao',
                    data: filter_BC,
                    success: function (msg) {
                        if (msg.data.length > 0) {
                            $("#btn-baocao-xuat").removeClass('disabled-dia-chi');
                            $("#btn-baocao-in").removeClass('disabled-dia-chi');
                        }
                        else {
                            $("#btn-baocao-xuat").addClass('disabled-dia-chi');
                            $("#btn-baocao-in").addClass('disabled-dia-chi');
                        }
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
        columns: [
            { data: null },
            { data: 'MHCODE' },
            { data: 'MHTEN' },
            {
                data: 'TONGSLBAN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TONGDGBAN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TONGDGMUA',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'TONGLOINHUAN',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: 'LOINHUANDONVI',
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: 'TILELOINHUAN' }
        ],
        columnDefs: [
            {
                "targets": [0, 2],
                "orderable": false
            }
        ],
        "order": [[6, "desc"]],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-dt-row', iDataIndex);

        },
        scrollResize: false,
        scrollY: 550,
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
                $(api.column(3).footer()).html(Math.round(data[0].TongTienSLBan).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(4).footer()).html(Math.round(data[0].TongTienDGBan).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(5).footer()).html(Math.round(data[0].TongTienDGMua).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(6).footer()).html(Math.round(data[0].TongTienLoiNhuan).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(3).footer()).html(0);
                $(api.column(4).footer()).html(0);
                $(api.column(5).footer()).html(0);
                $(api.column(6).footer()).html(0);
            }
        }
    });
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
        if (listKho.length > 0) {
            filter_BC.KHOIDLIST = listKho.join();
            filter_BC.FromDate = $('input[name="txt-tungay"]').val();
            filter_BC.ToDate = $('input[name="txt-denngay"]').val();
            filter_BC.HoaHong = $('input[name="txt-hoahong"]').val();
            filter_BC.MHLIDLIST = listMH.join();
            filter_BC.statusDraw++;
            console.log(filter_BC);
            tbl_BC.columns.adjust().draw();
        }
        else {
            alert("Hãy chọn chi nhánh và kho");
        }
    })

    $("#btn-baocao-xuat").click(function () {
        ExcelBaoCaoLoiNhuanMatHang(filter_BC);
    })
    $("#btn-baocao-in").click(function () {
        InBaoCaoLoiNhuanMatHang(filter_BC);
    })
})

function ExcelBaoCaoLoiNhuanMatHang(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleXuatBaoCaoLoiNhuanBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/ExcelBanHangBaoCaoLoiNhuan?draw=` + e.draw + `&start=` + e.start + `&length=` + e.length + `&order=` + e.order + `&dir=` + e.dir + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&HoaHong=` + e.HoaHong + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
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
function InBaoCaoLoiNhuanMatHang(e) {
    $.ajax({
        method: "GET",
        url: "/BanHang/CheckRoleInBaoCaoLoiNhuanBanHang",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.status == 1) {
                var link = `/BanHang/InBanHangBaoCaoLoiNhuan?order=` + e.order + `&dir=` + e.dir + `&MHLIDLIST=` + e.MHLIDLIST + `&KHOIDLIST=` + e.KHOIDLIST + `&HoaHong=` + e.HoaHong + `&SRID=` + e.SRID + `&search=` + e.search + `&FromDate=` + e.FromDate + `&ToDate=` + e.ToDate + ``;
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

$(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
});

function LoadDataBaoCaoBHMH() {
    return $.ajax({
        type: 'POST',
        url: '/BanHang/LoadBaoCaoMH',
        success: function (res) {
            return res;
        }
    });
}