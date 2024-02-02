$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {

    //#region Cây thư mục ShowRoom
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
        $('.bctk-hethang').find('.hethang').find('.jstree-showroom').jstree({
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
        $('.bctk-hethang').find('.hethang').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-hethang').find('.hethang').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion


    var listkho = []
   
    $('.bctk-hethang').find('.hethang').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy HH:mm'))
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 1
    var tbl_showroom = $('.bctk-hethang').find('.hethang').find('.table-showroom').DataTable({
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
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 1
    var dataTemp = []
    var tbl_kho = $('.bctk-hethang').find('.hethang').find('.table-kho').DataTable({

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
    $('.bctk-hethang').find('.hethang').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () { 
        if (this.checked) {
            $('.bctk-hethang').find('.hethang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-hethang').find('.hethang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-hethang').find('.hethang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-hethang').find('.hethang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-hethang').find('.hethang').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-hethang').find('.hethang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-hethang').find('.hethang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-hethang').find('.hethang').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-hethang').find('.hethang').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-hethang').find('.hethang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-hethang').find('.hethang').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-hethang').find('.hethang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })

     
    var table_content_filter = {}
    table_content_filter.statusDraw = 0
    var  tbl_contentFilter_tabHetHang = $('.bctk-hethang').find('.hethang').find('.table-content').DataTable({
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
                    url: '/HetHangBCTK/LoadContentHetHang',
                    data: table_content_filter,
                    dataType: "json",
                    success: function (res) {

                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-hethang').find('.hethang').find('#btn-xuat').removeClass('disabled-hethang');
                    $('.bctk-hethang').find('.hethang').find('#btn-in').removeClass('disabled-hethang');

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
                "data": 'MHTEN',
                "render": function (data) {
                    return '<span >'+data+'</span>'
                },
                 


            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "NGAYHETHANG",
                "render": function (data) {
                    return moment(data).format('DD/MM/YYYY')
                }

            },
            
        ], 
        
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
            $(api.column(1).footer()).html((data.length == 0 ? 0 : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold'); 

        },
        scrollX: true,
        scrollResize: true,
        scrollY: 550,
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
            table_content_filter.statusMHL = true;
        } else {
            table_content_filter.statusMHL = false;
        }
    })
    allMHL.click();



     
    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-hethang').find('.hethang').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-hethang').find('.hethang').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = [] 
        if (status) {

            var datas = $('.bctk-hethang').find('.hethang').find('.jstree-showroom').jstree("get_selected", true);
            await $.each(datas, function () {
                data.push({ KHOID: this.id })
            });

        } else {
            await $('.bctk-hethang').find('.hethang').find('.table-kho ').find('tr input').each(function (index, e) {
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })

                }
            })
        }

        table_content_filter.listKho = JSON.stringify(data) 
        console.log(table_content_filter)
        table_content_filter.statusDraw++

    } 

    // Button Search
    $('.bctk-hethang').find('.hethang').find('#btn-search').on('click', async function () {
        await SearchWithContent(statusTree);
        if (table_content_filter.listKho.length > 2) {
            tbl_contentFilter_tabHetHang.draw()
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
   var btnXuat =  $('.bctk-hethang').find('.hethang').find('#btn-xuat').on('click', async function () {
       await SearchWithContent(statusTree);
       table_content_filter.export = 1
       var stringParamater = serialize(table_content_filter)
       var link = `/HetHangBCTK/LoadContentHetHang?` + stringParamater + ``
       window.open(link) 
   })

   //Button In
    $('.bctk-hethang').find('.hethang').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/HetHangBCTK/InHetHangBCTK?` + stringParamater + ``
        window.open(link)
    })
     

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

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('#jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('#jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
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
    //#endregion
})