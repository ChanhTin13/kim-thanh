$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {

    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục
    $(function () {
        $.ajax({
            async: true,
            type: "GET",
            url: "/KhoHang/Tree",
            dataType: "json",
            success: function (json) {
                createJSTree_ShowRoom(json);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    function createJSTree_ShowRoom(jsondata) {
        $('.bctk-baocao-muahang').find('.jstree-showroom').jstree({
            "plugins": ["checkbox", "types"],
            'core': {
                'data': jsondata
            },
            "checkbox": {
                "keep_selected_style": false
            },
        });
    };

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('.bctk-baocao-muahang').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-baocao-muahang').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []

    $('.bctk-baocao-muahang').find('input[name="from"]').val(moment(new Date()).format('DD/MM/yyyy'))
    $('.bctk-baocao-muahang').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy'))


    $.ajax({
        type: 'get',
        url: '/BaoCaoMuaHangBCTK/LoadAllNhanvien',
        success: function (res) {
            res.data.map((e) => {
                $('.bctk-baocao-muahang').find('select[name="nhanvien"]').append(`<option value="` + e.NVID + `" >` + e.NVTEN + `</option>`)
            })
        }
    })
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 1
    var tbl_showroom = $('.bctk-baocao-muahang').find('.table-showroom').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_showroom.statusDraw > 0) {
                filter_showroom.draw = data.draw;
                filter_showroom.start = data.start;
                filter_showroom.length = data.length;
                filter_showroom.search = data.search["value"];
                filter_showroom.order = data.order[0].column;
                filter_showroom.dir = data.order[0].dir;

                $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadSR',
                    data: filter_showroom,
                    success: function (res) {

                    }
                }).done(callback, () => {
                    html: true;

                })
            }
        },
        columns: [
            {
                "targets": 0,
                "data": null,
                "bSortable": false,
                "render": function (data) {
                    return '<input   type="checkbox">'

                }
            },
            {
                "targets": 1,
                "data": "SRTEN",
                "bSortable": false,
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
        ], 
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID)
        },
        scrollResize: false,
        scrollY: 150,
        scrollCollapse: true,
        scrollX: true,
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 1
    var dataTemp = []
    var tbl_kho = $('.bctk-baocao-muahang').find('.table-kho').DataTable({

        serverSide: true,

        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_kho.statusDraw > 0) {
                filter_kho.draw = data.draw;
                filter_kho.start = data.start;
                filter_kho.length = data.length;
                filter_kho.search = data.search["value"];
                filter_kho.order = data.order[0].column;
                filter_kho.dir = data.order[0].dir;

                $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadKho',
                    data: filter_kho,
                    success: function (res) {

                    }
                }).done(callback, () => {
                    html: true;

                })
            }
        },

        columns: [
            {
                "targets": 0,
                "data": null,
                "bSortable": false,
                "render": function (data) {
                    return '<input  type="checkbox">'
                }
            },
            {
                "targets": 1,
                "data": "KHOTEN",
                "bSortable": false,
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID)
            $(nRow).css("display", "none");
        },
        scrollResize: false,
        scrollY: 150,
        scrollCollapse: true,
        scrollX: false,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,
    })

    // Choose All
    $('.bctk-baocao-muahang').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
        if (this.checked) {
            $('.bctk-baocao-muahang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-baocao-muahang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-baocao-muahang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-baocao-muahang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-baocao-muahang').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-baocao-muahang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-baocao-muahang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-baocao-muahang').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-baocao-muahang').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-baocao-muahang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-baocao-muahang').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-baocao-muahang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })

    //Search Header 
    $('.table-content-false thead tr').clone(true).appendTo('.table-content-false thead');
    $('.table-content-false thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 1 || i == 2 || i == 5 || i == 6 || i == 15 || i == 17 || i == 18 || i == 19) {
            $(this).html('<input type="text"  id="txt-bhd-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (table_content_false.column(i).search() !== this.value) {
                table_content_false
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    //#region table tralai false
    var table_content_filter_false = {}
    table_content_filter_false.statusDraw = 0
    var table_content_false = InitDt('.table-content-false', 650, 0, table_content_filter_false)

    function InitDt(element, scrollSize, isMuaOrTra, table_content_filter) {
        return $('.bctk-baocao-muahang').find(element).DataTable({
            serverSide: true,
            bFilter: true,
            bInfo: false,
            orderCellsTop: true,
            ajax: function (data, callback, setting) {
                if (table_content_filter.statusDraw > 0) {

                    table_content_filter.BHD_draw = data.draw;
                    table_content_filter.BHD_start = data.start;
                    table_content_filter.BHD_length = data.length;
                    //table_content_filter.BHD_search = data.search["value"];
                    table_content_filter.BHD_order = data.order[0].column;
                    table_content_filter.BHD_dir = data.order[0].dir;
                    table_content_filter.export = 0
                    table_content_filter.BHD_isMuaOrTra = isMuaOrTra
                    table_content_filter.NVID = $('.bctk-baocao-muahang').find('select[name="nhanvien"]').val() == null ? '' : $('.bctk-baocao-muahang').find('select[name="nhanvien"]').val()
                    table_content_filter.from = $('.bctk-baocao-muahang').find('input[name="from"]').val()
                    table_content_filter.to = $('.bctk-baocao-muahang').find('input[name="to"]').val()
                    table_content_filter.searchBHD_MHCODE = $('#txt-bhd-header-1').val();
                    table_content_filter.searchBHD_MHTEN = $('#txt-bhd-header-2').val();
                    table_content_filter.searchBHDCODE = $('#txt-bhd-header-5').val();
                    table_content_filter.searchBHD_LYDO = $('#txt-bhd-header-6').val();
                    table_content_filter.searchBHD_NV = $('#txt-bhd-header-15').val();
                    table_content_filter.searchBHD_KH = $('#txt-bhd-header-17').val();
                    table_content_filter.searchBHD_GHICHU = $('#txt-bhd-header-18').val();
                    table_content_filter.searchBHD_DONVI = $('#txt-bhd-header-19').val();
                    console.log(table_content_filter);
                    $.ajax({
                        type: 'GET',
                        url: '/BaoCaoMuaHangBCTK/LoadContentHetHang',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                        }
                    }).done(callback, () => {
                        html: true;
                        $('.bctk-baocao-muahang').find('#btn-xuat').removeClass('disabled-hethang');
                        $('.bctk-baocao-muahang').find('#btn-in').removeClass('disabled-hethang');

                    })
                }
            },
            columns: [
                {
                    "targets": 0,
                    "className": "text-left",
                    "data": "RowIndex",

                },
                {
                    "targets": 1,
                    "className": "text-left",
                    "data": "MHCODE",

                },
                {
                    "targets": 2,
                    "className": "text-left",
                    "data": "MHTEN",
                    //"render": function (data) {
                    //    return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
                    //}

                },
                {
                    "targets": 3,
                    "className": "text-left",
                    "data": "PATH",

                },
                {
                    "targets": 4,
                    "className": "text-left",
                    "data": "NGAYHD",
                    "render": function (data) {
                        return moment(data).format('DD/MM/YYYY')
                    }

                },
                {
                    "targets": 5,
                    "className": "text-left",
                    "data": "MHDCODE",

                },
                {
                    "targets": 6,
                    "className": "text-left",
                    "data": "CODE",

                },
                {
                    "targets": 7,
                    "className": "text-right",
                    "data": "SOLUONG",

                },
                {
                    "targets": 8,
                    "className": "text-right",
                    "data": "DONGIA",
                    "render": function (data) {
                        return '<a   style="color: red">' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }

                },
                {
                    "targets": 9,
                    "className": "text-center",
                    "data": "ISTRALAI",
                    "render": function (data) {

                        return data == 0 ? '<input type="checkbox" onclick="return false;">' : '<input type="checkbox" onclick="return false;" checked>'
                    }

                },
                {
                    "targets": 10,
                    "className": "text-right",
                    "data": "CHIETKHAU",
                    "render": function (data) {
                        return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }
                },
                {
                    "targets": 11,
                    "className": "text-right",
                    "data": "THUE",
                    "render": function (data) {
                        return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }
                },

                {
                    "targets": 12,
                    "className": "text-right",
                    "data": "DGSAUTHUE",
                    "render": function (data) {
                        return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }
                },
                {
                    "targets": 13,
                    "className": "text-right",
                    "data": "THANHTIEN",
                    "render": function (data) {
                        return '<a   style="color: red">' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }
                },
                {
                    "targets": 14,
                    "className": "text-right",
                    "data": "THANHTIENTRUOCTHUE",
                    "render": function (data) {
                        return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                    }
                },
                {
                    "targets": 15,
                    "className": "text-left",
                    "data": "NVTEN",

                },
                {
                    "targets": 16,
                    "className": "text-left",
                    "data": "KHOCODE",

                },
                {
                    "targets": 17,
                    "className": "text-left",
                    "data": "KHTEN",

                },
                {
                    "targets": 18,
                    "className": "text-left",
                    "data": "GHICHU",
                    //"render": function (data) {
                    //    return '<span class="shorter-text" style="width: 200px; color: red" title="' + data + '">' + data + '</span>'
                    //}
                },
                {
                    "targets": 19,
                    "className": "text-left",
                    "data": "DVT",

                },
                {
                    "targets": 20,
                    "className": "text-left",
                    "data": "SRTEN",

                },
                {
                    "targets": 21,
                    "className": "text-left",
                    "data": "LINETYPECODE",

                },

            ],
            //fixedColumns: {
            //    leftColumns: 3,

            //},
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };


                $(api.column(3).footer()).html((data.length == 0 ? '' : data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(7).footer()).html((data.length == 0 ? '' : data[0].TongSoLuong.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(8).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongDonGia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(10).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongChietKhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(11).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongThue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(12).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongDGSAUTHUE).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(13).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongThanhTien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
                $(api.column(14).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongTHANHTIENTRUOCTHUE).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');

            },
            scrollX: true,
            scrollResize: false,
            scrollY: scrollSize,
            scrollCollapse: true,
            scroller: {
                loadingIndicator: true,
                displayBuffer: 10
            },
            autoWidth: false,
            pageLength: 5,
            lengthChange: true

        })

    }
    //#endregion



    $('.table-content-true thead tr').clone(true).appendTo('.table-content-true thead');
    $('.table-content-true thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 1 || i == 2 || i == 5 || i == 6 || i == 15 || i == 17 || i == 18 || i == 19) {
            $(this).html('<input type="text"  id="txt-bht-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (table_content_true.column(i).search() !== this.value) {
                table_content_true
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });


    //#region table tralai true
    var table_content_filter_true = {}
    
    table_content_filter_true.statusDraw = 0
    var table_content_true = $('.bctk-baocao-muahang').find('.table-content-true').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (table_content_filter_true.statusDraw > 0) {

                table_content_filter_true.BHT_draw = data.draw;
                table_content_filter_true.BHT_start = data.start;
                table_content_filter_true.BHT_length = data.length;
                table_content_filter_true.BHT_search = data.search["value"];
                table_content_filter_true.BHT_order = data.order[0].column;
                table_content_filter_true.BHT_dir = data.order[0].dir;
                table_content_filter_true.export = 0
                table_content_filter_true.isMuaOrTra = 1
                table_content_filter_true.NVID = $('.bctk-baocao-muahang').find('select[name="nhanvien"]').val() == null ? '' : $('.bctk-baocao-muahang').find('select[name="nhanvien"]').val()
                table_content_filter_true.from = $('.bctk-baocao-muahang').find('input[name="from"]').val()
                table_content_filter_true.to = $('.bctk-baocao-muahang').find('input[name="to"]').val()
                table_content_filter_true.searchBHT_MHCODE = $('#txt-bht-header-1').val();
                table_content_filter_true.searchBHT_MHTEN = $('#txt-bht-header-2').val();
                table_content_filter_true.searchBHTCODE = $('#txt-bht-header-5').val();
                table_content_filter_true.searchBHT_LYDO = $('#txt-bht-header-6').val();
                table_content_filter_true.searchBHT_NV = $('#txt-bht-header-15').val();
                table_content_filter_true.searchBHT_KH = $('#txt-bht-header-17').val();
                table_content_filter_true.searchBHT_GHICHU = $('#txt-bht-header-18').val();
                table_content_filter_true.searchBHT_DONVI = $('#txt-bht-header-19').val();
                $.ajax({
                    type: 'GET',
                    url: '/BaoCaoMuaHangBCTK/ExcelBaoCaoMuaHangTraLai',
                    data: table_content_filter_true,
                    dataType: "json",
                    success: function (res) {
                        console.log(res)
                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-baocao-muahang').find('#btn-xuat').removeClass('disabled-hethang');
                    $('.bctk-baocao-muahang').find('#btn-in').removeClass('disabled-hethang');

                })
            }
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",

            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "PATH",

            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "NGAYHD",
                "render": function (data) {
                    return moment(data).format('DD/MM/YYYY')
                }

            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "MHDCODE",

            },
            {
                "targets": 6,
                "className": "text-left",
                "data": "CODE",

            },
            {
                "targets": 7,
                "className": "text-right",
                "data": "SOLUONG",

            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "DONGIA",
                "render": function (data) {
                    return '<a   style="color: red">' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }

            },
            {
                "targets": 9,
                "className": "text-center",
                "data": "ISTRALAI",
                "render": function (data) {

                    return data == 0 ? '<input type="checkbox" onclick="return false;">' : '<input type="checkbox" onclick="return false;" checked>'
                }

            },
            {
                "targets": 10,
                "className": "text-right",
                "data": "CHIETKHAU",
                "render": function (data) {
                    return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },
            {
                "targets": 11,
                "className": "text-right",
                "data": "THUE",
                "render": function (data) {
                    return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },

            {
                "targets": 12,
                "className": "text-right",
                "data": "DGSAUTHUE",
                "render": function (data) {
                    return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },
            {
                "targets": 13,
                "className": "text-right",
                "data": "THANHTIEN",
                "render": function (data) {
                    return '<a   style="color: red">' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },
            {
                "targets": 14,
                "className": "text-right",
                "data": "THANHTIENTRUOCTHUE",
                "render": function (data) {
                    return '<a   >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },
            {
                "targets": 15,
                "className": "text-left",
                "data": "NVTEN",

            },
            {
                "targets": 16,
                "className": "text-left",
                "data": "KHOCODE",

            },
            {
                "targets": 17,
                "className": "text-left",
                "data": "KHTEN",

            },
            {
                "targets": 18,
                "className": "text-left",
                "data": "GHICHU",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 200px; color:red" title="' + data + '">' + data + '</span>'
                }
            },
            {
                "targets": 19,
                "className": "text-left",
                "data": "DVT",

            },
            {
                "targets": 20,
                "className": "text-left",
                "data": "SRTEN",

            },
            {
                "targets": 21,
                "className": "text-left",
                "data": "LINETYPECODE",

            },

        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            $(api.column(3).footer()).html((data.length == 0 ? '' : data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(7).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongSoLuong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(8).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongDonGia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(10).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongChietKhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(11).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongThue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(12).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongDGSAUTHUE).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(13).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongThanhTien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(14).footer()).html((data.length == 0 ? '' : Math.round(data[0].TongTHANHTIENTRUOCTHUE).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');

        },
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: false,
        pageLength: 5,
        lengthChange: true

    })

     

    //Checkbox MHL
    var allMHL = $('#checkAll').on('click', function () {
        if (this.checked) {
            table_content_filter_true.statusMHL = true;
            table_content_filter_false.statusMHL = true;
        } else {
            table_content_filter_true.statusMHL = false;
            table_content_filter_false.statusMHL = false;
        }
    })
    allMHL.click();

    //region Click
    $('.bctk-baocao-muahang').find('.table-content-false tbody').on('click', 'tr', function () {


        $(this).closest('.false').find('tr').removeClass('selected'); 
        table_content_false.row($(this).index()).select();
    })
     
    
    $('.bctk-baocao-muahang').find('.table-content-true tbody').on('click', 'tr', function (e) { 
        $(this).closest('.true').find('tr').removeClass('selected');
        table_content_true.row($(this).index()).select();
         
    })


    //#region DBclick table_content false
    $('.bctk-baocao-muahang').find('.table-content-false tbody').on('dblclick', 'tr', function () {
       

        $(this).closest('.false').find('tr').removeClass('selected'); 
        table_content_false.row($(this).index()).select();
       // $('.bctk-baocao-muahang').find('.table-content-false tbody tr').not(this).removeClass('selected');

        var data = table_content_false.row($(this).index()).data()
        if (data.MHDID != null || data.MHDID != undefined) {
            console.log(data.MHDID)
            var link = `/PhieuNhapKho?id=` + data.MHDID + ``
            window.open(link)
        }
    })

    //#endregion

    //#region DBclick table_content true
    $('.bctk-baocao-muahang').find('.table-content-true tbody').on('dblclick', 'tr', function (e) {
      
        $(this).closest('.true').find('tr').removeClass('selected'); 
        table_content_true.row($(this).index()).select();
       // $('.bctk-baocao-muahang').find('.table-content-true tbody tr').not(this).removeClass('selected');

        var data = table_content_true.row($(this).index()).data()
        
        if (data.MHDID != null || data.MHDID != undefined) {
            console.log(data.MHDID)
            var link = `/HangMuaTraLai?id=` + data.MHDID + ``
            window.open(link)
        }
    })

    //#endregion


    // function show datatable 
    var statusTree = false;
    $('.bctk-baocao-muahang').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-baocao-muahang').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = []

        var checked_ids = [];
        var selectedNodes = $('.bctk-baocao-muahang').find('.jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });

        });
        if (status) {
            var datas = $('.bctk-baocao-muahang').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () {
                data.push({ KHOID: this.id })

            });

        } else {
            await $('.bctk-baocao-muahang').find('.table-kho ').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })

                }
            })
        }

        table_content_filter_false.listKho = JSON.stringify(data)
        table_content_filter_false.listMHL = JSON.stringify(checked_ids)
        table_content_filter_false.statusDraw++

        table_content_filter_true.listKho = JSON.stringify(data)
        table_content_filter_true.listMHL = JSON.stringify(checked_ids)

       
        table_content_filter_true.statusDraw++

    }

    $('.bctk-baocao-muahang').find('select[name="isMuaOrTra"]').on('change', function () {
        if ($(this).val() == 0) {
            $('.false').removeAttr('hidden')
            $('.true').attr('hidden', 'hidden')
        } else if ($(this).val() == 1) {
            $('.false').attr('hidden', 'hidden')
            $('.true').removeAttr('hidden')
        } else if ($(this).val() == 2) {
            $('.false').removeAttr('hidden')
            $('.true').removeAttr('hidden')
        }
    })
    // Button Search
    $('.bctk-baocao-muahang').find('#btn-search').on('click', async function () {
        await SearchWithContent(statusTree);
        if (table_content_filter_false.listKho.length > 2 && table_content_filter_true.listKho.length > 2) {
            var statusload = $('select[name="isMuaOrTra"]').val()
            if (statusload == 0 && statusload != undefined) {
                table_content_false.columns.adjust().draw();
            } else if (statusload == 1 && statusload != undefined) {
                table_content_true.columns.adjust().draw();

            } else if (statusload == 2 && statusload != undefined) {
                table_content_true.columns.adjust().draw();
                table_content_false.columns.adjust().draw();
            }
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn ít nhất 1 kho',
                icon: 'error-outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }

    })

    serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    // Button Export
    var btnXuat = $('.bctk-baocao-muahang').find('#btn-xuat').on('click', async function (e) {
        e.preventDefault();
        await SearchWithContent(statusTree);
        table_content_filter_false.export = 1
        table_content_filter_true.export = 1

        var statusload = $('select[name="isMuaOrTra"]').val()
        if (statusload == 0 && statusload != undefined) {

            var stringParamater = serialize(table_content_filter_false)
            var link = `/BaoCaoMuaHangBCTK/LoadContentHetHang?` + stringParamater + ``
            window.open(link)
        } else if (statusload == 1 && statusload != undefined) {

            var stringParamater = serialize(table_content_filter_true)
            var link = `/BaoCaoMuaHangBCTK/ExcelBaoCaoMuaHangTraLai?` + stringParamater + ``
            window.open(link)

        } else if (statusload == 2 && statusload != undefined) {
            var obj = Object.assign({}, table_content_filter_false, table_content_filter_true);
            var stringParamater = serialize(obj);
            var link = `/BaoCaoMuaHangBCTK/ExcelMuaHangBaoCaoMuaHangVaMuaHangTra?` + stringParamater + ``
            window.open(link)
            //var stringParamater1 = createObj(table_content_filter_false)
            //var stringParamater2 = createObj(table_content_filter_true)
           
            
            //var abc = []
            //abc.push(stringParamater1, stringParamater2)
            //console.log(abc)
            //console.log(table_content_filter_false)
            //var link1 = `/BaoCaoMuaHangBCTK/ExportDouble?exportdouble=` + JSON.stringify(abc) + ``  
            //window.open(link1)

            //var stringParamater1 = serialize(table_content_filter_false)
            //var link1 = `/BaoCaoMuaHangBCTK/LoadContentHetHang?` + stringParamater1 + ``
            //var stringParamater2 = serialize(table_content_filter_true)
            //var link2 = `/BaoCaoMuaHangBCTK/ExcelBaoCaoMuaHangTraLai?` + stringParamater2 + ``
            //var temp = []
            //temp.push({ link: link1 }, {link : link2})

            //await open(temp)
             
        }

    })
    function open(data) {
        var a = 0;
        for (var i in data) {
            window.open(data[i].link)
        }
        return a 
    }
    function createObj(data) {
        var obj = {
            draw: data.draw,
            start: data.start,
            length: data.length,
            order: data.order,

            search: data.search,
            dir: data.dir,
            from: data.from,
            to: data.to,

            NVID: data.NVID,
            statusMHL: data.statusMHL,

            isMuaOrTra: data.isMuaOrTra,
            listKho: data.listKho,
            listMHL: data.listMHL,
        }
        return obj
    }

    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục

    $(function () {
        $.ajax({
            async: true,
            type: "GET",
            url: "/NhomHang/Tree",
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
        $('.bctk-baocao-muahang').find('.jstree').jstree({
            'core': {
                'data': jsondata
            },
            "checkbox": {
                "keep_selected_style": false
            },
            "plugins": ["checkbox"]
        });
    };

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('.bctk-baocao-muahang').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-baocao-muahang').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-baocao-muahang').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-baocao-muahang').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-baocao-muahang').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion

    //#region In
    document.getElementById('btn-in').addEventListener('click', async function (e) {
        $.ajax({
            method: "GET",
            url: "/BaoCaoMuaHangBCTK/CheckRoleInBaoCaoMuaHang",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {

                    e.preventDefault();
                    //await SearchWithContent(statusTree);
                    table_content_filter_false.export = 1
                    table_content_filter_true.export = 1

                    var statusload = $('select[name="isMuaOrTra"]').val()
                    if (statusload == 0 && statusload != undefined) {

                        var stringParamater = serialize(table_content_filter_false)
                        var link = `/BaoCaoMuaHangBCTK/Print?` + stringParamater + `&isStatusLoad=` + 0;
                        window.open(link)
                    } else if (statusload == 1 && statusload != undefined) {

                        var stringParamater = serialize(table_content_filter_true)
                        var link = `/BaoCaoMuaHangBCTK/Print?` + stringParamater + `&isStatusLoad=` + 1;
                        window.open(link)

                    } else if (statusload == 2 && statusload != undefined) {
                        var obj = Object.assign({}, table_content_filter_false, table_content_filter_true);
                        var stringParamater = serialize(obj);
                        var link = `/BaoCaoMuaHangBCTK/Print?` + stringParamater + `&isStatusLoad=` + 2;
                        window.open(link)
                        //var stringParamater1 = createObj(table_content_filter_false)
                        //var stringParamater2 = createObj(table_content_filter_true)

                        //var stringParamater1 = serialize(table_content_filter_false)
                        //var link1 = `/BaoCaoMuaHangBCTK/Print?` + stringParamater1 + ``
                        //var stringParamater2 = serialize(table_content_filter_true)
                        //var link2 = `/BaoCaoMuaHangBCTK/Print?` + stringParamater2 + ``
                        //var temp = []
                        //temp.push({ link: link1 }, { link: link2 })

                        //await open(temp)

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
    });
    //#endregion
})

function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}
