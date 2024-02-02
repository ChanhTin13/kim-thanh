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
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree-showroom').jstree({
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
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []
    var status_datetime = true
    $('.bctk-tonkho').find('.tonkho-denngay').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy'))
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 0
    var tbl_showroom = $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').DataTable({
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
        columnDefs: [
            {
                "targets": [1],
                "orderable": false
            },],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID)
        },
        scrollResize: false,
        scrollY: 150,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
        paging: false
    })

    function tbl_showroom_setTimeout() {
        setTimeout(function () {
            filter_showroom.statusDraw++;
            tbl_showroom.draw();
        },200)
    }
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 0
    var dataTemp = []
    var tbl_kho = $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho').DataTable({

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
        paging: false
    })


    function tbl_kho_setTimeout() {
        setTimeout(function () {
            filter_kho.statusDraw++;
            tbl_kho.draw();
        },200)
    }
    $('.bctk-tonkho').find('#profile-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        if ((filter_kho.draw < 2 && filter_showroom.draw < 2) || (filter_kho.statusDraw < 1 && filter_showroom.statusDraw < 1)) {
            tbl_kho_setTimeout()
            tbl_showroom_setTimeout()
        }
    })
   
    // Choose All
    $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
        /*var checked = $(this).is(':checked');
        if (checked) {
            $(".checkbox").each(function () {
                $(this).prop("checked", true);
            });
        } else {
            $(".checkbox").each(function () {
                $(this).prop("checked", false);
            });
        }*/
        if (this.checked) {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-tonkho').find('.tonkho-denngay').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })



    var table_content_filter = {}
    table_content_filter.statusDraw = 0
    var tbl_contentFilter = $('.bctk-tonkho').find('.tonkho-denngay').find('.table-content').DataTable({
        serverSide: true,
        bFilter: true,
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

                table_content_filter.Type = $('.bctk-tonkho').find('.tonkho-denngay').find('select[name="giavon"]').val()
                table_content_filter.to = $('.bctk-tonkho').find('.tonkho-denngay').find('input[name="to"]').val()

                $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadContentByDate',
                    data: table_content_filter,
                    dataType: "json",
                    success: function (res) {

                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-tonkho').find('.tonkho-denngay').find('#btn-xuat').removeClass('disabled-nhap-kho')
                    $('.bctk-tonkho').find('.tonkho-denngay').find('#btn-in').removeClass('disabled-nhap-kho') 
                   
                })
            }
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
                "width": "4%",

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": 'KHOCODE',
                "width": "7%",
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHCODE",
                "width": "10%"

            },
            {
                "targets": 3,
                "className": "text-left",
                "data": 'MHTEN',
                "width": "25%",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MATCHCODE",
                "width": "10%",
                "render": function (data) {
                    return data == null ? '' : '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": 'SOLUONG',
                "width": "7%",
                "render": function (data) {

                    return data == null || data == 0 ? '' :'<a class="font-weight-bold" style="color: red">' +   Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')  + '</a>'
                }

            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "GIABINHQUAN",
                "visible": false,
                "width": "12%",
                "render": function (data) {
                    return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }

            },
            {
                "targets": 7,
                "className": "text-right",
                "data": "Thanhtien",
                "visible": false,
                "width": "15%",
                "render": function (data) {
                    return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }
            },
            {
                "targets": 8,
                "className": "text-left",
                "data": "DONVI",
                "width": "7%",
                "render": function (data) {
                    return data
                }
            },

        ],
        columnDefs: [
            {
                targets: 8,
                visible: false
            }
        ],
        initComplete: function () {
         
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {

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

            console.log(data)

            $(api.column(2).footer()).html((data.length == 0 ? '' : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(5).footer()).html((data.length == 0 ? '' :data[0].TongSoLuong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(6).footer()).html((data.length == 0 ? '' :data[0].TongDongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(7).footer()).html((data.length == 0 ? '' :data[0].TongThanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');

        },
        scrollX: true,
        //scrollResize: true,
        scrollY: 550,
        //scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: false,
        pageLength: 5,
        lengthChange: true

    })

  
    //  filter by datetime 
  
    $('.bctk-tonkho').find('.tonkho-denngay').find('input[name = "to"]').on('change', function () {
        if (this.value.length == 0) {
            this.value = moment(moment(new Date()).format('DD/MM/yyyy HH:mm'))
        }

    }) 
    //
    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-tonkho').find('.tonkho-denngay').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-tonkho').find('.tonkho-denngay').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = []
        var checked_ids = [];
        var selectedNodes = $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });
        });
        if (status) {

            var datas = $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () {
                data.push({ KHOID: this.id })
            });

        } else {
            await $('.bctk-tonkho').find('.tonkho-denngay').find('.table-kho ').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })
                    console.log(data)
                }
            })
        }
        
        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.ListMHL = JSON.stringify(checked_ids)
        console.log(table_content_filter)
        table_content_filter.statusDraw++

    }

    // Button Search
    $('.bctk-tonkho').find('.tonkho-denngay').find('#btn-search').on('click', async function () {
        table_content_filter.statusMHL = $('#checkAlls').is(':checked')
        await SearchWithContent(statusTree);
        if (table_content_filter.listKho.length > 2) {
            tbl_contentFilter.draw()
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
    $('.bctk-tonkho').find('.tonkho-denngay').find('#btn-xuat').on('click', async function () {
        table_content_filter.statusMHL = $('#checkAlls').is(':checked')
        await SearchWithContent(statusTree);
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TonkhoBCTK/LoadContentByDate?` + stringParamater + ``
        window.open(link)

    })

    // Button In
    $('.bctk-tonkho').find('.tonkho-denngay').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/TonkhoBCTK/InTonKhoBCTKByDate?` + stringParamater + ``
        window.open(link)

    })

    //#region Event
    $('.bctk-tonkho').find('.tonkho-denngay').find('.table-content tbody').on('click', 'tr', function () {
        $(this).closest('.tonkho-denngay').find('tr').removeClass('selected');
        tbl_contentFilter.row($(this).index()).select();
    })
    $('.bctk-tonkho').find('.tonkho-denngay').find('.table-content tbody ').on('dblclick', 'tr', async function () {

        var data = tbl_contentFilter.row($(this).index()).data();
        console.log(data)
        var listKho = table_content_filter.listKho
        var listSR = []
        $('.bctk-tonkho').find('.tonkho-denngay').find('.table-showroom').find('tr input').each(function () {

            if ($(this).prop("checked") == true) {
                var data = tbl_showroom.row($(this).index()).data();
                listSR.push({ SRID: data.SRID })

            }

        })
        console.log(listSR)
        var link = `/TheKhoChiTietBCTK/Index?listKhoid=` + listKho + `&listSrid=` + JSON.stringify(listSR) + `&mhcode=` + data.MHCODE + `&mhid=` + data.MHID + ``
        window.open(link)
    })
    //#endregion 
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
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree').jstree({
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
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-tonkho').find('.tonkho-denngay').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });




    $('.bctk-tonkho').find('.tonkho-denngay').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-tonkho').find('.tonkho-denngay').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion
})