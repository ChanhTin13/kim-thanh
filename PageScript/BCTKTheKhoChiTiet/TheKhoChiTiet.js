
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
        $('.bctk-thekho-chitiet').find('.jstree-showroom').jstree({
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
        $('.bctk-thekho-chitiet').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-thekho-chitiet').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []

    $('.bctk-thekho-chitiet').find('input[name="from"]').val(moment(new Date()).format('DD/MM/yyyy'))
    $('.bctk-thekho-chitiet').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy'))


    $.ajax({
        type: 'get',
        url: '/BaoCaoMuaHangBCTK/LoadAllNhanvien',
        success: function (res) {
            res.data.map((e) => {
                $('.bctk-thekho-chitiet').find('select[name="nhanvien"]').append(`<option value="` + e.NVID + `" >` + e.NVTEN + `</option>`)
            })
        }
    })

    var xhr1
    var xhr2
    function xhrConTrol(xhr1, xhr2) {
        try {
            var listSRFiltter = $('.bctk-thekho-chitiet').attr('data-list-sr-id');
            var listKhoFiltter = $('.bctk-thekho-chitiet').attr('data-list-kho-id');
            var mhcode = $('.bctk-thekho-chitiet').attr('data-mhcode');
            var mhid = $('.bctk-thekho-chitiet').attr('data-mhid');

            if (xhr1.readyState === 4 && xhr2.readyState === 4 && listKhoFiltter.length > 0 && listKhoFiltter.length > 0 && mhcode.length > 0 && mhid.length > 0) {
               

                var date = new Date();
                var dateYear = date.getFullYear() - 1

                var from = new Date(dateYear, date.getMonth(), date.getDay())



                //date filtter
                $('.bctk-thekho-chitiet').find('input[name="from"]').val(moment(from).format('DD/MM/YYYY'))
                $('.bctk-thekho-chitiet').find('input[name="to"]').val(moment(new Date()).format('DD/MM/YYYY'))


                // List Kho and List Showroom
                var arraySr = JSON.parse(listSRFiltter)
                var arrayKh = JSON.parse(listKhoFiltter)


                $('.bctk-thekho-chitiet').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').trigger('click')
                $('.bctk-thekho-chitiet').find('.table-kho').find('tr').each(function () {

                    var idsr = tbl_kho.row($(this).index()).data()
                    var exist = arraySr.filter(x => x.SRID == idsr.SRID)
                    if (exist.length > 0) {
                        $(this).find('input').prop('checked', true)
                        $(this).css("display", "")

                    }
                })
                $('.bctk-thekho-chitiet').find('.table-kho').find('tr').each(function () {
                    var idkho = tbl_kho.row($(this).index()).data()
                    var exist = arrayKh.filter(x => x.KHOID == idkho.KHOID)

                    if (exist.length > 0) {
                        $(this).find('input').prop('checked', true)
                        $(this).css("display", "")


                    }
                })


                // Mặt hàng Filter
                table_content_filter.MHID = mhid
                $('input[name="table-mathang-mini"]').val(mhcode)

                return true
            }

            return false
        }
        catch (err) {
            console.log('error')
            return err
        }


    }
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 1
    var tbl_showroom = $('.bctk-thekho-chitiet').find('.table-showroom').DataTable({
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

                xhr1 = $.ajax({
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
                "className": "text-left col-sm-9",
                "data": "SRTEN",
                "bSortable": false,
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 1,
                "className": "text-left col-sm-3",
                "data": null,
                "bSortable": false,
                "render": function (data) {
                    return '<input   type="checkbox">'

                }
            },

        ],
        columnDefs: [
            {
                "targets": [1],
                "orderable": false
            },],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID)
        },
        initComplete: function (data) {
            var a = xhrConTrol(xhr1, xhr2)
            if (a) {
                btnSearch.click()
            }
           
        },
        scrollResize: false,
        scrollY: 150,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 1
    var dataTemp = []
    var tbl_kho = $('.bctk-thekho-chitiet').find('.table-kho').DataTable({

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


                xhr2 = $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadKho',
                    data: filter_kho,
                    success: function () {

                    },
                }).done(callback, () => {
                    html: true;

                })

                //$.ajax({
                //    type: 'GET',
                //    url: '/TonKhoBCTK/LoadKho',
                //    data: filter_kho,
                //    success: function (res) {

                //    }
                //}).done(callback, () => {
                //    html: true;

                //})
            }
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left col-sm-9",
                "data": "KHOTEN",
                "bSortable": false,
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 1,
                "className": "text-left col-sm-3",
                "data": null,
                "bSortable": false,
                "render": function (data) {
                    return '<input  type="checkbox">'
                }
            },

        ],
        initComplete: function (data) {
            var a = xhrConTrol(xhr1, xhr2)
            if (a) {
                btnSearch.click()
            }
        },
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
    $('.bctk-thekho-chitiet').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
        if (this.checked) {
            $('.bctk-thekho-chitiet').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-thekho-chitiet').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-thekho-chitiet').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-thekho-chitiet').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-thekho-chitiet').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-thekho-chitiet').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-thekho-chitiet').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-thekho-chitiet').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-thekho-chitiet').find('.table-kho tbody').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-thekho-chitiet').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-thekho-chitiet').find('.table-kho tbody').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-thekho-chitiet').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })


    //#region table Content
    var table_content_filter = {}
    table_content_filter.statusDraw = 0
    var table_content = $('.bctk-thekho-chitiet').find('.table-content').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (table_content_filter.statusDraw > 0) {

                table_content_filter.draw = data.draw;
                table_content_filter.start = data.start;
                table_content_filter.length = data.length;
                table_content_filter.search = data.search["value"];
                table_content_filter.order = data.order[0].column;
                table_content_filter.dir = data.order[0].dir;
                table_content_filter.export = 0

                table_content_filter.from = $('.bctk-thekho-chitiet').find('input[name="from"]').val()
                table_content_filter.to = $('.bctk-thekho-chitiet').find('input[name="to"]').val()

                $.ajax({
                    type: 'GET',
                    url: '/TheKhoChiTietBCTK/LoadContent',
                    data: table_content_filter,
                    dataType: "json",
                    success: function (res) {

                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-thekho-chitiet').find('#btn-xuat').removeClass('disabled-hethang');
                    $('.bctk-thekho-chitiet').find('#btn-in').removeClass('disabled-hethang');

                })
            }
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": null,

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "NGAY",
                "render": function (data) {
                    return moment(data).format('DD/MM/yyyy')
                }

            },
            {
                "targets": 2,
                "className": "text-right",
                "data": "KHOCODE",

            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "MHCODE",


            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHTEN",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 150px" title="' + data + '">' + data + '</span>'
                }
            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "PHIEUNHAP",
                "render": function (data) {
                    return `<a type="button" href="#">` + data + `</a>`
                }
            },
            {
                "targets": 6,
                "className": "text-left",
                "data": "PHIEUXUAT",
                "render": function (data) {

                    return `<a type="button" href="#">` + data + `</a>`
                }

            },
            {
                "targets": 7,
                "className": "text-left",
                "data": "DIENGIAI",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "SLNHAP",
                "render": function (data) {
                    return '<a >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }

            },
            {
                "targets": 9,
                "className": "text-center",
                "data": "SLXUAT",
                "render": function (data) {
                    return '<a >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }

            },
            {
                "targets": 10,
                "className": "text-right",
                "data": "DONGIA",
                "render": function (data) {
                    return '<a >' + (data == null ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')) + '</a>'
                }
            },
            {
                "targets": 11,
                "className": "text-right",
                "data": "KYXACNHAN",

            },
        ],
        "order": [[1, "desc"]],
        columnDefs: [
            {
                "targets": [0,10,11],
                "orderable": false
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).find('td:eq(0)').html(iDataIndex + 1)
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


            slnhap = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            slxuat = api
                .column(9)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            $(api.column(1).footer()).html((data.length == 0 ? '' : (data.length).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(8).footer()).html((slnhap == 0 ? '' : slnhap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');
            $(api.column(9).footer()).html((slxuat == 0 ? '' : slxuat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))).addClass('text-right font-weight-bold');

        },
        scrollX: true,
        scrollResize: false,
        scrollY: 550,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: false,
        pageLength: 15,
        lengthChange: true

    })

    //#endregion

    //Checkbox MHL
    var allMHL = $('#checkAll').on('click', function () {
        if (this.checked) {
            table_content_filter.statusMHL = true;
            table_content_filter.statusMHL = true;
        } else {
            table_content_filter.statusMHL = false;
            table_content_filter.statusMHL = false;
        }
    })
    allMHL.click();


    //#region DBclick table_content 
    $('.bctk-thekho-chitiet').find('.table-content tbody').on('dblclick', 'tr', async function () {
        table_content.row($(this).index()).select();
        $('.bctk-thekho-chitiet').find('.table-content tbody tr').not(this).removeClass('selected');
        var data = table_content.row($(this).index()).data()
        var link = `/TheKhoChiTietBCTK/CheckToRedirect/?phieuid=` + data.PHIEUID + ``
        window.open(link)

    })
    $('.bctk-thekho-chitiet').find('.table-content tbody').on('click', 'td', function () {

        var index = $(this).index()
        if (index == 5 || index == 6) {
            table_content.row($(this).parents('tr').index()).select();
            $('.bctk-thekho-chitiet').find('.table-content tbody tr').not($(this).parents('tr')).removeClass('selected');
            var data = table_content.row($(this).parents('tr').index()).data()
            var link = `/TheKhoChiTietBCTK/CheckToRedirect/?phieuid=` + data.PHIEUID + ``
            window.open(link)
        }

    })

    //#endregion


    // function show datatable 
    var statusTree = false;
    $('.bctk-thekho-chitiet').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-thekho-chitiet').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = []

        var checked_ids = [];
        var selectedNodes = $('.bctk-thekho-chitiet').find('.jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });

        });
        if (status) {
            var datas = $('.bctk-thekho-chitiet').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () {
                data.push({ KHOID: this.id })

            });

        } else {
            await $('.bctk-thekho-chitiet').find('.table-kho ').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })

                }
            })
        }

        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.listMHL = JSON.stringify(checked_ids)
        table_content_filter.statusDraw++


    }


    // Button Search
    var btnSearch = $('.bctk-thekho-chitiet').find('#btn-search').on('click', async function () {
        await SearchWithContent(statusTree);
        var mhcode = $('.bctk-thekho-chitiet').find('input[name="table-mathang-mini"]').val()
        if (table_content_filter.listKho.length > 2 && table_content_filter.listKho.length > 2 && (table_content_filter.MHID != null && table_content_filter.MHID != undefined) && mhcode.length > 0) {
            table_content.draw()
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn ít nhất 1 kho và chọn mặt hàng trước khi tìm kiếm',
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
    var btnXuat = $('.bctk-thekho-chitiet').find('#btn-xuat').on('click', async function (e) {
        e.preventDefault();
        await SearchWithContent(statusTree);
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TheKhoChiTietBCTK/LoadContent?` + stringParamater + ``
        window.open(link)

    })

    //#region In
    document.getElementById('btn-in').addEventListener('click', async function (e) {
        $.ajax({
            method: "GET",
            url: "/TheKhoChiTietBCTK/CheckRoleInTheKhoChiTiet",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    e.preventDefault();
                    //await SearchWithContent(statusTree);
                    table_content_filter.export = 1
                    var stringParamater = serialize(table_content_filter)
                    var link = `/TheKhoChiTietBCTK/Print?` + stringParamater + ``
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
    //#endregion


    // -------------------------------------

    //#region Chọn mặt hàng từ modal con => lấy mã mặt hàng

    let filter_dsMH = {};
    filter_dsMH.statusDraw = 0
    var tbl_dsMatHang = $('.bctk-thekho-chitiet').find('#table-tim-kiem-mat-hang-NK').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filter_dsMH.statusDraw > 0) {
                filter_dsMH.draw = data.draw;
                filter_dsMH.start = data.start;
                filter_dsMH.length = data.length;
                filter_dsMH.search = data.search["value"];
                filter_dsMH.order = data.order[0].column;
                filter_dsMH.dir = data.order[0].dir;
                filter_dsMH.statusColums = 8

                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: filter_dsMH,
                    success: function (res) {

                        /* tbl_searchMatHang.columns.adjust()*/
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

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                "render": function (data) {
                    return `<span class="shorter-text" style="width:80px"  title="` + data + `">` + data + `</span>`
                }

            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "render": function (data) {
                    return `<span class="shorter-text" style="width:150px"  title="` + data + `">` + data + `</span>`
                }
            },
            {
                "targets": 3,
                "className": "text-left ",
                "data": "MHALIAS",

                "render": function (data) {
                    return `<span class="shorter-text" style="width:80px" title="` + data + `">` + data + `</span>`
                }

            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHMOTA",
                "render": function (data) {
                    return `<span class="shorter-text"  style="width:100px" title="` + data + `">` + data + `</span>`
                }
            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 5
        },
        autoWidth: true,
        pageLength: 5,
        lengthChange: false,
    });

    function dsMatHang_timeout() {
        setTimeout(function () {
            filter_dsMH.statusDraw++;
            tbl_dsMatHang.columns.adjust().draw();
        }, 500)
    }
    $('.bctk-thekho-chitiet').find('#tim-kiem-mat-hang').on('show.bs.modal', function () {
        if (filter_dsMH.draw < 2 || filter_dsMH.statusDraw < 1) {
            dsMatHang_timeout();
        }

    });
    // -------------------------------------
    // Click vào table danh sách mặt hàng  

    var dataIdMHSearch = null;
    var dataIndexMH = 0
    $('.bctk-thekho-chitiet').find('.ql-tk-kh tbody').on('click', 'tr', function () {
        dataIdMHSearch = $(this).attr('data-id');
        dataIndexMH = $(this).index()
        $(this).closest('.ql-tk-kh').find('tr').removeClass('selected');
        $(this).closest('.ql-tk-kh').find('tr[data-id="' + dataIdMHSearch + '"]').addClass('selected');
    });
    // -------------------------------------

    // chọn sản phẩm bằng dblclick
    $('.bctk-thekho-chitiet').find('#tim-kiem-mat-hang  tbody').on('dblclick', 'tr', function () {

        var data = tbl_dsMatHang.row($(this).index()).data();
        $('.bctk-thekho-chitiet').find('input[name="table-mathang-mini"]').val(data.MHCODE)
        table_content_filter.MHID = data.MHID
        table_content_filter.MHCODE = data.MHCODE
        $('.bctk-thekho-chitiet').find('#tim-kiem-mat-hang').modal('toggle')

    });
    // -------------------------------------
    // chọn sản phẩm  

    /*   $('.bctk-thekho-chitiet').find('#btn-chon-mathang').on('click', function () {
   
           if (dataIdMHSearch != null && dataIdMHSearch != undefined) {
               load_mathang_byId_fnc(dataIdMHSearch)
           } else {
               toast.create({
                   title: 'Notification!',
                   text: 'Vui lòng chọn sản phẩm',
                   icon: 'error_outline',
                   classBackground: 'noti-error',
                   timeout: 3000
               });
           }
       });*/
    // -------------------------------------
    // chọn sản phẩm và thoát

    $('.bctk-thekho-chitiet').find('#btn-chon-thoat-mh').on('click', function () {
        if (dataIdMHSearch != null && dataIdMHSearch != undefined) {

            var data = tbl_dsMatHang.row(dataIndexMH).data();
            $('.bctk-thekho-chitiet').find('input[name="table-mathang-mini"]').val(data.MHCODE)
            table_content_filter.MHID = data.MHID
            table_content_filter.MHCODE = data.MHCODE

            $('.bctk-thekho-chitiet').find('#tim-kiem-mat-hang').modal('toggle')

        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn sản phẩm',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    });


    // function lấy dữ liệu mặt hàng  
    async function loadMatHangbyMHID(MHID, Khoid) {
        var array = {};
        array.mathangID = MHID;
        array.khoID = Khoid
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/loadMatHangbyMHID',
            data: array,
            success: function (res) {

                return res.data
            }
        })
    }
    // -------------------------------------





    //#endregion  

    // -------------------------------------

    function SearchDouble(value) {
        tbl_dsMatHang.search(value).draw();
        $('.bctk-thekho-chitiet').find('#tim-kiem-mat-hang').modal()
    }
    //input picker
    $('.bctk-thekho-chitiet').find('input[name="table-mathang-mini"]').on('keyup click', function () {
        SearchDouble($(this).val())

    })
    //

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
        $('.bctk-thekho-chitiet').find('.jstree').jstree({
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
        $('.bctk-thekho-chitiet').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-thekho-chitiet').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-thekho-chitiet').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-thekho-chitiet').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-thekho-chitiet').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion
})