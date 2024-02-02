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
        $('.bctk-sokho').find('.sokho-xemnhanh').find('.jstree-showroom').jstree({
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
        $('.bctk-sokho').find('.sokho-xemnhanh').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-sokho').find('.sokho-xemnhanh').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []
    var status_datetime = true
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 0
    var tbl_showroom = $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom').DataTable({
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
        scrollCollapse: false,
        scrollX: false,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    
    function tbl_showroom_setTimeout() {
        setTimeout(function () {
            filter_showroom.statusDraw++;
            tbl_showroom.draw();
        }, 200 )
    }

    // 
    var filter_kho = {}
    filter_kho.statusDraw = 0
    var dataTemp = []
    var tbl_kho = $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho').DataTable({

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
                    return '<span class="shorter-text" style="width: 110px" title="' + data + '">' + data + '</span>'
                }

            }
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

  
    function tbl_kho_setTimeout() {
        setTimeout(function () {
            filter_kho.statusDraw++;
            tbl_kho.draw();
        }, 200)
    }
    $('.bctk-sokho').find('#profile-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        if ((filter_kho.draw < 2 && filter_showroom.draw < 2) || (filter_kho.statusDraw < 1 && filter_showroom.statusDraw < 1)) {
            tbl_kho_setTimeout()
            tbl_showroom_setTimeout()
        }
    })
   
    // Choose All
    $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {

        if (this.checked) {
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-sokho').find('.sokho-xemnhanh').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })



    var table_content_filter = {}
    var listColumn = [
        {
        
            "className": "text-left",
            "data": "RowIndex",
             

        },
        {
             
            "className": "text-left",
            "data": 'MHCODE',
            

        },
        {
             
            "className": "text-left",
            "data": "MHTEN",
            "render": function (data) {
                return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
            }
        },
        {
            
            "className": "text-left",
            "data": 'PATH',
            "render": function (data) {
                return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
            }
        },
        {
            
            "className": "text-right",
            "data": 'GIABANLE',
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        },
        {
            
            "className": "text-right",
            "data": 'GIABANBUON',
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        },
    ]
    var listTongSL =[]
    table_content_filter.statusDraw = 0
    var tbl_contentFilter = initDtb();
    function initDtb() {
        return $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-content').DataTable({
            serverSide: true,
            bFilter: true,
            bInfo: false,
            columns: listColumn,
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
                        url: '/SoKhoBCTK/LoadContent',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                        }
                    }).done(callback, () => {
                        html: true;
                        $('.bctk-sokho').find('.sokho-xemnhanh').find('#btn-xuat').removeClass('disabled-nhap-kho')
                        $('.bctk-sokho').find('.sokho-xemnhanh').find('#btn-in').removeClass('disabled-nhap-kho')
                    })
                }
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

                $(api.column(1).footer()).html((data.length == 0 ? 0 : data[0].totalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                if (listTongSL.length > 0) {
                    for (var i in listTongSL) {
                        var item = listTongSL[i]
                        console.log(item)
                        var tongsl = data[0] == null ? '' : data[0]['TongSL' + item.name + ''];
                        $(api.column(item.index).footer()).html(tongsl == null || tongsl == 0 ? '' : tongsl.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                        
                    }
                }
                    },
            scrollX: true,
            scrollResize: false,
            scrollY: 550,
            scrollCollapse: false,
            scroller: {
                loadingIndicator: true,
                displayBuffer: 10
            },
            autoWidth: false,
            pageLength: 5,
            lengthChange: true

        })

    }

    function resetColumn() {
        listColumn = [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
             
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": 'MHCODE',

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
                "data": 'PATH',
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 4,
                "className": "text-right",
                "data": 'GIABANLE',

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": 'GIABANBUON',

            },
        ]
        listTongSL=[]
        let html = $('#table-content-reset').html()
        $('#table-content-2').empty();
        $('#table-content-2').append(html);
        return listColumn
    }

    //Checkbox MHL
    var allMHL = $('#checkAll').on('click', function () {
        if (this.checked) {
            table_content_filter.statusMHL = true;
        } else {
            table_content_filter.statusMHL = false;
        }
    })
    allMHL.click();
     

    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-sokho').find('.sokho-xemnhanh').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-sokho').find('.sokho-xemnhanh').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = []
        await resetColumn();
        if (status) { 
            var datas = $('.bctk-sokho').find('.sokho-xemnhanh').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () { 
                var a = $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree(true)
                for (var i in this.children) {

                    var item = a.get_node(this.children[i]).id
                    var khoTen = a.get_node(this.children[i]).text
                    var obj = {
                   
                        "className": "text-right",
                        "data": "" + item.toUpperCase() + "", 
                    }
                    listColumn.push(obj)
                    var index = listColumn.findIndex(x => x.name == item.toUpperCase())
                    listTongSL.push({ index: index, name: item })
                    $('#table-content-2').find('.table-content thead tr').append(`<th>` + khoTen + `</th>`);
                    $('#table-content-2').find('.table-content tfoot tr').append(`<td></td>`);

                    data.push({ KHOID: item.toUpperCase(), KHOTEN: khoTen })
                }
            });

        } else {
            var count = 6
            await $('.bctk-sokho').find('.sokho-xemnhanh').find('.table-kho ').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {
                   
                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID, KHOTEN: datas.KHOTEN})
                   
                    var obj = {
                        "targets": count,
                        "className": "text-right",
                        "data": ""+(datas.KHOID).toUpperCase()+"",
                        "mData": "" + (datas.KHOID).toUpperCase() + "",
                        "sClass": "text-right",

                    }
                    listColumn.push(obj)
                    var index = listColumn.findIndex(x => x.name == (datas.KHOID).toUpperCase()) 
                    listTongSL.push({ index: index, name:  datas.KHOID} )
                    $('#table-content-2').find('.table-content thead tr').append(`<th>` + datas.KHOTEN + `</th>`);
                    $('#table-content-2').find('.table-content tfoot tr').append(`<td></td>`);

                    count++
                } else {
                    //$('.bctk-sokho').find('.sokho-xemnhanh').find('.table-content thead tr').find('th').each(function (index, e) {


                    //})
                    //$('.bctk-sokho').find('.sokho-xemnhanh').find('.table-content tfoot tr').remove(`<td data-name="` + datas.KHOCODE + `"></td>`)
                }
            })
           
        }
        var obj = { 
            "className": "text-right",
            "data": "SLAll",
           
        }
        listColumn.push(obj)
        var index = listColumn.findIndex(x => x.name == "SLAll") 
        listTongSL.push({ index: index, name: 'TongSLAll' })
        $('#table-content-2').find('.table-content thead tr').append(`<th> Tổng SL </th>`);
        $('#table-content-2').find('.table-content tfoot tr').append(`<td></td>`);

        console.log(listColumn)
        table_content_filter.listKho = JSON.stringify(data) 
        table_content_filter.statusDraw++

    }

    // Button Search
    $('.bctk-sokho').find('.sokho-xemnhanh').find('#btn-search').on('click', async function () {
        $('#table-content').empty();
        await SearchWithContent(statusTree)
        if (table_content_filter.listKho.length > 2) {
          
            tbl_contentFilter.destroy();
             
            let html = $('#table-content-2').html();
            $('#table-content').empty();
            $('#table-content').append(html);
            tbl_contentFilter = await initDtb()  
         
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
    $('.bctk-sokho').find('.sokho-xemnhanh').find('#btn-xuat').on('click', async function () {

        await SearchWithContent(statusTree);
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/SoKhoBCTK/LoadContent?` + stringParamater + ``
        window.open(link)

    })

    // Button Print
    $('.bctk-sokho').find('.sokho-xemnhanh').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/SoKhoBCTK/InKhoBCTKNhanh?` + stringParamater + ``
        window.open(link)
    })
 
})