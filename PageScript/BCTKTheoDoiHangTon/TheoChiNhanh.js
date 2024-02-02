

$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {
    var listkho = []

    $('.bctk-theodoihangton').find('.theo-chinhanh').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy HH:mm'))
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 1
    var tbl_showroom = $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom').DataTable({
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
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 1
    var dataTemp = []
    var tbl_kho = $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho').DataTable({

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
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
        if (this.checked) {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })


    $('.bctk-theodoihangton').find('.theo-chinhanh').find('#checkAll').click() 
     

    var table_content_filter = {}
    table_content_filter.statusDraw = 0 
    // ListColumn By Month
    var listColumnByMonth = [
        {

            "className": "text-left",
            "data": "RowIndex",

        },
        {

            "className": "text-left",
            "data": "MHCODE",

        },
        {

            "className": "text-left",
            "data": 'MHTEN',
            "render": function (data) {
                return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
            },

        },
        {

            "className": "text-right",
            "data": "SL0130",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #00c853">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>'
            }

        },
        {

            "className": "text-right",
            "data": "SL3160",
            "render": function (data) {

                return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        },
        {

            "className": "text-right",
            "data": "SL6190",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #ffa000">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "SL91120",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #ef6c00">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "SL120N",
            "render": function (data) {

               
                return data == null || data == 0 ? '' : '<a style="color: #ff1744">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "TONGSL",
            "render": function (data) {

                return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }, 
    ]
    // ListColumn By Week
    var listColumnbyWeek = [
        {

            "className": "text-left",
            "data": "RowIndex",

        },
        {

            "className": "text-left",
            "data": "MHCODE",

        },
        {

            "className": "text-left",
            "data": 'MHTEN',
            "render": function (data) {
                return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
            },

        },
        {

            "className": "text-right",
            "data": "SL0107",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #00c853">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>'
            }

        },
        {

            "className": "text-right",
            "data": "SL0814",
            "render": function (data) {

                return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        },
        {

            "className": "text-right",
            "data": "SL1522",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #ffa000">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+'</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "SL2330",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #ef6c00">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "SL30N",
            "render": function (data) {

                return data == null || data == 0 ? '' : '<a style="color: #ff1744">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>' 
            }

        },
        {

            "className": "text-right",
            "data": "TONGSL",
            "render": function (data) {

                return data == null || data == 0 ? '' : Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }, 
    ]
    var tbl_content = InitTB(0)
    function InitTB(statusColumn) {
        return $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-content').DataTable({
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

                    $.ajax({
                        type: 'GET',
                        url: '/TheoDoiHangTonBCTK/LoadContentTheoChinhanh',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                        }
                    }).done(callback, () => {
                        html: true;
                        $('.bctk-theodoihangton').find('.theo-chinhanh').find('#btn-xuat').removeClass('disabled-hethang');
                        $('.bctk-theodoihangton').find('.theo-chinhanh').find('#btn-in').removeClass('disabled-hethang');
                        $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-content tbody').on('dblclick click', 'tr', function () {
                            $(this).closest('.theo-chinhanh').find('tr').removeClass('selected');
                            tbl_content.row($(this).index()).select();
                        })

                    })
                }
            },
            columns: statusColumn == 0 ? listColumnByMonth : listColumnbyWeek , 
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
                if (statusColumn == 1) {
                    $(api.column(1).footer()).html((data.length == 0 ? 0 : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(3).footer()).html((data.length == 0 ? 0 : data[0].SLT0107).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(4).footer()).html((data.length == 0 ? 0 : data[0].SLT0814).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(5).footer()).html((data.length == 0 ? 0 : data[0].SLT1522).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(6).footer()).html((data.length == 0 ? 0 : data[0].SLT2330).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(7).footer()).html((data.length == 0 ? 0 : data[0].SLT30N).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(8).footer()).html((data.length == 0 ? 0 : data[0].SLT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                } else {
                    $(api.column(1).footer()).html((data.length == 0 ? 0 : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(3).footer()).html((data.length == 0 ? 0 : data[0].SLT0130).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(4).footer()).html((data.length == 0 ? 0 : data[0].SLT3160).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(5).footer()).html((data.length == 0 ? 0 : data[0].SLT6190).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(6).footer()).html((data.length == 0 ? 0 : data[0].SLT91120).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(7).footer()).html((data.length == 0 ? 0 : data[0].SLT120N).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                    $(api.column(8).footer()).html((data.length == 0 ? 0 : data[0].SLT).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                }
              

            },
            scrollX: true,
            scrollResize: false,
            scrollY: 450,
            scrollCollapse: false,
            scroller: {
                loadingIndicator: true,
                displayBuffer: 10
            },
            autoWidth: false,
            lengthChange: false
             

        })

    }



    // function show datatable 
    async function SearchWithContent(statusTree) {
        table_content_filter.listKho = ''
        var data = []
        var selectedNodes = $('.bctk-theodoihangton').find('.theo-chinhanh').find('.jstree').jstree("get_selected", true);
        var checked_ids = []
        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });
        });
        if (statusTree) {
            var datas = $('.bctk-sokho').find('.sokho-xemnhanh').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () {
                var a = $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree(true)
                for (var i in this.children) { 
                    var item = a.get_node(this.children[i]).id 
                    data.push({ KHOID: item.toUpperCase() })
                }
            });

        } else {
            await $('.bctk-theodoihangton').find('.theo-chinhanh').find('.table-kho').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })
                  
                }
            })
        }

        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.listMHL = JSON.stringify(checked_ids)
        console.log(table_content_filter)
        table_content_filter.statusDraw++

    }

    // Button Search
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('#btn-search').on('click', async function () {
        $('#table-content').empty()
        table_content_filter.statusMHL = $('#checkAll').is(':checked')
        var status = $('.bctk-theodoihangton').find('.theo-chinhanh').find('select[name="setting"]').val()
        table_content_filter.FilterByMOrW = status ==  0 ? false : true
        await SearchWithContent(statusTree);
        if (table_content_filter.listKho.length > 2) {
            if (status == 0) {
                var html = $('#table-content-theothang').html();
                $('#table-content').append(html);
              
            } else if (status == 1) {
                var html = $('#table-content-theotuan').html();
                $('#table-content').append(html); 
            }
            tbl_content = await InitTB(status)
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
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('#btn-xuat').on('click', async function () {
        await SearchWithContent();
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TheoDoiHangTonBCTK/LoadContentTheoChinhanh?` + stringParamater + ``
        window.open(link)
    })

    // Button Print
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/TheoDoiHangTonBCTK/InTheoDoiHangTonByChinhanh?` + stringParamater + ``
        window.open(link)
    })


    //#region Cây thư mục
    //Ajax tạo cây thư mục, function tạo cây thư mục


    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-theodoihangton').find('.theo-chinhanh').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })

    $(function () {
        $.ajax({
            async: true,
            type: "GET",
            url: "/NhomHang/Tree",
            dataType: "json",
            success: function (json) {
                createJSTree(json, true);
                createJSTree(json, false);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });
    function createJSTree(jsondata) {
        $('.bctk-theodoihangton').find('.theo-chinhanh').find('.jstree').jstree({
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
        $('.bctk-theodoihangton').find('.theo-chinhanh').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-theodoihangton').find('.theo-chinhanh').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-theodoihangton').find('.theo-chinhanh').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-theodoihangton').find('.theo-chinhanh').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion
})