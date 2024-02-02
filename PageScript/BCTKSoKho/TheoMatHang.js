$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {
    $('.bctk-sokho').find('.sokho-mathang').find('input[name="from"]').val(moment(new Date()).format('DD/MM/YYYY'))
    $('.bctk-sokho').find('.sokho-mathang').find('input[name="to"]').val(moment(new Date()).format('DD/MM/YYYY'))
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
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree({
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
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []
    var status_datetime = true
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 0
    var tbl_showroom = $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom').DataTable({
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
    tbl_showroom_setTimeout()
    function tbl_showroom_setTimeout() {
        setTimeout(function () {
            filter_showroom.statusDraw++;
            tbl_showroom.draw();
        }, 200)
    }

    // 
    var filter_kho = {}
    filter_kho.statusDraw = 0
    var dataTemp = []
    var tbl_kho = $('.bctk-sokho').find('.sokho-mathang').find('.table-kho').DataTable({

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
                    return '<span class="shorter-text" style="width: 110px" title="' + data + '">' + data + '</span>'
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

    tbl_kho_setTimeout()
    function tbl_kho_setTimeout() {
        setTimeout(function () {
            filter_kho.statusDraw++;
            tbl_kho.draw();
        }, 200)
    }

    // Choose All
    $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {

        if (this.checked) {
            $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-sokho').find('.sokho-mathang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "");
            })
        } else {
            $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-sokho').find('.sokho-mathang').find('.table-kho tbody').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-sokho').find('.sokho-mathang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-sokho').find('.sokho-mathang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-sokho').find('.sokho-mathang').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-sokho').find('.sokho-mathang').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-sokho').find('.sokho-mathang').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-sokho').find('.sokho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
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

    ]
    var listTongSL = []
    table_content_filter.statusDraw = 0
    var tbl_contentFilter = initDtb();
     function initDtb() {
        return   $('.bctk-sokho').find('.sokho-mathang').find('.table-content').DataTable({
            serverSide: true,
            bFilter: true,
            bInfo: false,
            columns: listColumn,
            ajax: function (data, callback, setting) {
                if (table_content_filter.statusDraw > 0) {
                    console.log(data.draw)
                    table_content_filter.draw = data.draw;
                    table_content_filter.start = data.start;
                    table_content_filter.length = data.length;
                    table_content_filter.search = data.search["value"];
                    table_content_filter.order = data.order[0].column;
                    table_content_filter.dir = data.order[0].dir;
                    table_content_filter.export = 0
                    table_content_filter.from = $('.bctk-sokho').find('.sokho-mathang').find('input[name="from"]').val()
                    table_content_filter.to = $('.bctk-sokho').find('.sokho-mathang').find('input[name="to"]').val() 
                    $.ajax({
                        type: 'GET',
                        url: '/SoKhoBCTK/LoadContentbyMatHang',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                        }
                    }).done(callback, () => {
                        html: true;
                        $('.bctk-sokho').find('.sokho-mathang').find('#btn-xuat').removeClass('disabled-nhap-kho')
                        $('.bctk-sokho').find('.sokho-mathang').find('#btn-ins').removeClass('disabled-nhap-kho')
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

                if (table_content_filter.draw == 1 || (true && table_content_filter.search.length != 0)) {
                    $.ajax({
                        type: 'GET',
                        url: '/SoKhoBCTK/LoadFooterContentByMatHang',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                            if (listTongSL.length > 0) {
                                for (var i in listTongSL) {
                                    var item = listTongSL[i]
                                    tongsl = 0
                                    var tongsl = res.data[0] == null ? '' : res.data[0]['' + item.name + ''];

                                    $(api.column(item.index).footer()).html(tongsl == null || tongsl == 0 ? '' : tongsl.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                                    $(api.column(1).footer()).html((data.length == 0 ? '' : data[0].totalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
                                }
                            }
                        }
                    })
                }
                
                
                
            },
            scrollX: true,
            scrollResize: false,
            scrollY: 620,
            scrollCollapse: false,
            scroller: {
                loadingIndicator: true,
                displayBuffer: 10
            },
            autoWidth: false,
            lengthChange: false

        })

    }
    function resetColumn() {
        listColumn = [
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

        ]
        listTongSL = []
        let html = $('#table-content-reset-1').html()
        $('#table-content-1').empty();
        $('#table-content-1').append(html);
        return listColumn
    } 

    //  filter by datetime 

    $('.bctk-sokho').find('.sokho-mathang').find('input[name = "to"]').on('change', function () {
        if (this.value.length == 0) {
            this.value = moment(moment(new Date()).format('DD/MM/yyyy HH:mm'))
        }

    })
    //

    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-sokho').find('.sokho-mathang').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = true
    })
    $('.bctk-sokho').find('.sokho-mathang').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    function clear() {
        boolVisable1s = false
        boolVisable2s = false
        boolVisable3s = false
        boolVisable4s = false
        boolVisable5s = false
        boolVisable6s = false
        boolVisable7s = false
        boolVisable8s = false

        boolVisable1 = false
        boolVisable2 = false
        boolVisable3 = false
        boolVisable4 = false
        boolVisable5 = false
        boolVisable6 = false
        boolVisable7 = false
        boolVisable8 = false
    }

    //
    var boolVisable1 = false // tondau
    var boolVisable2 = false // nhap
    var boolVisable3 = false // nhaplai
    var boolVisable4 = false // nhapnoibo
    var boolVisable5 = false // xuatnoibo
    var boolVisable6 = false // xuatban
    var boolVisable7 = false // xuattra
    var boolVisable8 = false // toncuoi

    var boolVisable1s = false // tong tondau
    var boolVisable2s = false // tong nhap
    var boolVisable3s = false // tong nhaplai
    var boolVisable4s = false // tong nhapnoibo
    var boolVisable5s = false // tong xuatnoibo
    var boolVisable6s = false // tong xuatban
    var boolVisable7s = false // tong xuattra
    var boolVisable8s = false // tong toncuoi
    //

    $('.bctk-sokho').find('.sokho-mathang').find('select[name="kenhhienthi"]').on('change', async function () {
        var VisableStatus = $(this).val()
        console.log(table_content_filter.draw)
        if (table_content_filter.draw > 0) {
            
            var List1 = []
            var List2 = []
            var List3 = []
            var List4 = []
            var List5 = []
            var List6 = []
            var List7 = []
            var List8 = []


            var List1s = []
            var List2s = []
            var List3s = []
            var List4s = []
            var List5s = []
            var List6s = []
            var List7s = []
            var List8s = []

            var target = listTongSL.length / 8
            console.log(listTongSL);
            console.log(target);
            //2
            const getIndex = (i, target) => {
                if (i == target) {
                    console.log(listTongSL[(i - 1) * 8 + 0].index)
                    List1s.push(listTongSL[(i - 1) * 8 + 0].index)
                    List2s.push(listTongSL[(i - 1) * 8 + 1].index)
                    List3s.push(listTongSL[(i - 1) * 8 + 2].index)
                    List4s.push(listTongSL[(i - 1) * 8 + 3].index)
                    List5s.push(listTongSL[(i - 1) * 8 + 4].index)
                    List6s.push(listTongSL[(i - 1) * 8 + 5].index)
                    List7s.push(listTongSL[(i - 1) * 8 + 6].index)
                    List8s.push(listTongSL[(i - 1) * 8 + 7].index)
                } else if (i > 0) {

                    List1.push(listTongSL[(i - 1) * 8 + 0].index)
                    List2.push(listTongSL[(i - 1) * 8 + 1].index)
                    List3.push(listTongSL[(i - 1) * 8 + 2].index)
                    List4.push(listTongSL[(i - 1) * 8 + 3].index)
                    List5.push(listTongSL[(i - 1) * 8 + 4].index)
                    List6.push(listTongSL[(i - 1) * 8 + 5].index)
                    List7.push(listTongSL[(i - 1) * 8 + 6].index)
                    List8.push(listTongSL[(i - 1) * 8 + 7].index)
                } else if (i == 0) {
                    console.log(listTongSL[(i - 1) * 8 + 0])
                    List1.push(listTongSL[0].index)
                    List2.push(listTongSL[1].index)
                    List3.push(listTongSL[2].index)
                    List4.push(listTongSL[3].index)
                    List5.push(listTongSL[4].index)
                    List6.push(listTongSL[5].index)
                    List7.push(listTongSL[6].index)
                    List8.push(listTongSL[7].index)
                }
                return console.log('done')
            }

            for (var i = 0; i <= target; i++) {

                var a = await getIndex(i, target)

            }
            const clearVisible = () => {
                tbl_contentFilter.columns(0,1,2).visible(true); 
                tbl_contentFilter.columns(List1).visible(false);
                tbl_contentFilter.columns(List2).visible(false);
                tbl_contentFilter.columns(List3).visible(false);
                tbl_contentFilter.columns(List4).visible(false);
                tbl_contentFilter.columns(List5).visible(false);
                tbl_contentFilter.columns(List6).visible(false);
                tbl_contentFilter.columns(List7).visible(false);
                tbl_contentFilter.columns(List8).visible(false);

                tbl_contentFilter.columns(List1s).visible(false);
                tbl_contentFilter.columns(List2s).visible(false);
                tbl_contentFilter.columns(List3s).visible(false);
                tbl_contentFilter.columns(List4s).visible(false);
                tbl_contentFilter.columns(List5s).visible(false);
                tbl_contentFilter.columns(List6s).visible(false);
                tbl_contentFilter.columns(List7s).visible(false);
                tbl_contentFilter.columns(List8s).visible(false);
            }
            if (VisableStatus == 0) { // hiển thị tổng
                clearVisible()
                tbl_contentFilter.columns(List1).visible(false);
                tbl_contentFilter.columns(List2).visible(false);
                tbl_contentFilter.columns(List3).visible(false);
                tbl_contentFilter.columns(List4).visible(false);
                tbl_contentFilter.columns(List5).visible(false);
                tbl_contentFilter.columns(List6).visible(false);
                tbl_contentFilter.columns(List7).visible(false);
                tbl_contentFilter.columns(List8).visible(false);

                tbl_contentFilter.columns(List1s).visible(true);
                tbl_contentFilter.columns(List2s).visible(true);
                tbl_contentFilter.columns(List3s).visible(true);
                tbl_contentFilter.columns(List4s).visible(true);
                tbl_contentFilter.columns(List5s).visible(true);
                tbl_contentFilter.columns(List6s).visible(true);
                tbl_contentFilter.columns(List7s).visible(true);
                tbl_contentFilter.columns(List8s).visible(true);

            } else if (VisableStatus == 1) {// hiển thị chi tiết kho
                clearVisible()
                tbl_contentFilter.columns(List1).visible(true);
                tbl_contentFilter.columns(List2).visible(true);
                tbl_contentFilter.columns(List3).visible(true);
                tbl_contentFilter.columns(List4).visible(true);
                tbl_contentFilter.columns(List5).visible(true);
                tbl_contentFilter.columns(List6).visible(true);
                tbl_contentFilter.columns(List7).visible(true);
                tbl_contentFilter.columns(List8).visible(true);

                tbl_contentFilter.columns(List1s).visible(false);
                tbl_contentFilter.columns(List2s).visible(false);
                tbl_contentFilter.columns(List3s).visible(false);
                tbl_contentFilter.columns(List4s).visible(false);
                tbl_contentFilter.columns(List5s).visible(false);
                tbl_contentFilter.columns(List6s).visible(false);
                tbl_contentFilter.columns(List7s).visible(false);
                tbl_contentFilter.columns(List8s).visible(false);

            } else if (VisableStatus == 2) { // hiển thị chi tiết và tổng

                clearVisible()
                tbl_contentFilter.columns(List1).visible(true);
                tbl_contentFilter.columns(List2).visible(true);
                tbl_contentFilter.columns(List3).visible(true);
                tbl_contentFilter.columns(List4).visible(true);
                tbl_contentFilter.columns(List5).visible(true);
                tbl_contentFilter.columns(List6).visible(true);
                tbl_contentFilter.columns(List7).visible(true);
                tbl_contentFilter.columns(List8).visible(true);

                tbl_contentFilter.columns(List1s).visible(true);
                tbl_contentFilter.columns(List2s).visible(true);
                tbl_contentFilter.columns(List3s).visible(true);
                tbl_contentFilter.columns(List4s).visible(true);
                tbl_contentFilter.columns(List5s).visible(true);
                tbl_contentFilter.columns(List6s).visible(true);
                tbl_contentFilter.columns(List7s).visible(true);
                tbl_contentFilter.columns(List8s).visible(true);
            } else if (VisableStatus == 3) { // tồn đầu và xuất bán
                clearVisible()
                tbl_contentFilter.columns(List1).visible(true);
                tbl_contentFilter.columns(List6).visible(true);
                tbl_contentFilter.columns(List1s).visible(true);
                tbl_contentFilter.columns(List6s).visible(true);

            } else if (VisableStatus == 4) { // tồn đầu
                clearVisible()
                tbl_contentFilter.columns(List1).visible(true);
                tbl_contentFilter.columns(List1s).visible(true);

            } else if (VisableStatus == 5) { // nhập
                clearVisible()
                tbl_contentFilter.columns(List2).visible(true);
                tbl_contentFilter.columns(List2s).visible(true);
            } else if (VisableStatus == 6) { // nhập lại
                clearVisible()
                tbl_contentFilter.columns(List3).visible(true);
                tbl_contentFilter.columns(List3s).visible(true);

            } else if (VisableStatus == 7) { // nhập nội bộ
                clearVisible()  
                tbl_contentFilter.columns(List4).visible(true);
                tbl_contentFilter.columns(List4s).visible(true);
            } else if (VisableStatus == 8) { // xuất nội bộ
                clearVisible()  
                tbl_contentFilter.columns(List5).visible(true);
                tbl_contentFilter.columns(List5s).visible(true);
            } else if (VisableStatus == 9) { // bán
                clearVisible()
                tbl_contentFilter.columns(List6).visible(true);
                tbl_contentFilter.columns(List6s).visible(true);
            } else if (VisableStatus == 10) {// xuất trả
                clearVisible()
                tbl_contentFilter.columns(List7).visible(true);
                tbl_contentFilter.columns(List7s).visible(true);
               
            } else if (VisableStatus == 11) { // tồn cuối
                clearVisible()
                tbl_contentFilter.columns(List8).visible(true);
                tbl_contentFilter.columns(List8s).visible(true);
            } else if (VisableStatus == 12) {// xuất trả và tồn cuối 
                clearVisible()
                tbl_contentFilter.columns(List6).visible(true);
                tbl_contentFilter.columns(List6s).visible(true);
                tbl_contentFilter.columns(List8).visible(true);
                tbl_contentFilter.columns(List8s).visible(true);
            }



        }
        //if (table_content_filter.draw > 1) {
        //    var List1 = []
        //    var List2 = []
        //    var List3 = []
        //    var List4 = []
        //    var List5 = []
        //    var List6 = []
        //    var List7 = []
        //    var List8 = []


        //    var List1s = []
        //    var List2s = []
        //    var List3s = []
        //    var List4s = []
        //    var List5s = []
        //    var List6s = []
        //    var List7s = []
        //    var List8s = []

        //    var target = listTongSL.length / 8

        //    const getIndex = (i, target) => {
        //        if (i == target) {
        //            List1s.push(listTongSL[i * 8 + 0])
        //            List2s.push(listTongSL[i * 8 + 1])
        //            List3s.push(listTongSL[i * 8 + 2])
        //            List4s.push(listTongSL[i * 8 + 3])
        //            List5s.push(listTongSL[i * 8 + 4])
        //            List6s.push(listTongSL[i * 8 + 5])
        //            List7s.push(listTongSL[i * 8 + 6])
        //            List8s.push(listTongSL[i * 8 + 7])
        //        } else {
        //            List1.push(listTongSL[(i - 1) * 8 + 0])
        //            List2.push(listTongSL[(i - 1) * 8 + 1])
        //            List3.push(listTongSL[(i - 1) * 8 + 2])
        //            List4.push(listTongSL[(i - 1) * 8 + 3])
        //            List5.push(listTongSL[(i - 1) * 8 + 4])
        //            List6.push(listTongSL[(i - 1) * 8 + 5])
        //            List7.push(listTongSL[(i - 1) * 8 + 6])
        //            List8.push(listTongSL[(i - 1) * 8 + 7])
        //        }
        //        return console.log('done')
        //    }

        //    for (var i = 0; i <= target; i++) {

        //        await getIndex(i, target)
        //    }


        //    if (VisableStatus == 0) {
        //        clear()
        //        tbl_contentFilter.columns(List1).visible(false);
        //        tbl_contentFilter.columns(List2).visible(false);
        //        tbl_contentFilter.columns(List3).visible(false);
        //        tbl_contentFilter.columns(List4).visible(false);
        //        tbl_contentFilter.columns(List5).visible(false);
        //        tbl_contentFilter.columns(List6).visible(false);
        //        tbl_contentFilter.columns(List7).visible(false);
        //        tbl_contentFilter.columns(List8).visible(false);

        //        tbl_contentFilter.columns(List1s).visible(true);
        //        tbl_contentFilter.columns(List2s).visible(true);
        //        tbl_contentFilter.columns(List3s).visible(true);
        //        tbl_contentFilter.columns(List4s).visible(true);
        //        tbl_contentFilter.columns(List5s).visible(true);
        //        tbl_contentFilter.columns(List6s).visible(true);
        //        tbl_contentFilter.columns(List7s).visible(true);
        //        tbl_contentFilter.columns(List8s).visible(true);

        //    } else if (VisableStatus == 1) {
        //        clear()
        //        tbl_contentFilter.columns(List1).visible(true);
        //        tbl_contentFilter.columns(List2).visible(true);
        //        tbl_contentFilter.columns(List3).visible(true);
        //        tbl_contentFilter.columns(List4).visible(true);
        //        tbl_contentFilter.columns(List5).visible(true);
        //        tbl_contentFilter.columns(List6).visible(true);
        //        tbl_contentFilter.columns(List7).visible(true);
        //        tbl_contentFilter.columns(List8).visible(true);

        //        tbl_contentFilter.columns(List1s).visible(false);
        //        tbl_contentFilter.columns(List2s).visible(false);
        //        tbl_contentFilter.columns(List3s).visible(false);
        //        tbl_contentFilter.columns(List4s).visible(false);
        //        tbl_contentFilter.columns(List5s).visible(false);
        //        tbl_contentFilter.columns(List6s).visible(false);
        //        tbl_contentFilter.columns(List7s).visible(false);
        //        tbl_contentFilter.columns(List8s).visible(false);

        //    } else if (VisableStatus == 2) {
        //        clear()
        //        tbl_contentFilter.columns(List1).visible(true);
        //        tbl_contentFilter.columns(List2).visible(true);
        //        tbl_contentFilter.columns(List3).visible(true);
        //        tbl_contentFilter.columns(List4).visible(true);
        //        tbl_contentFilter.columns(List5).visible(true);
        //        tbl_contentFilter.columns(List6).visible(true);
        //        tbl_contentFilter.columns(List7).visible(true);
        //        tbl_contentFilter.columns(List8).visible(true);

        //        tbl_contentFilter.columns(List1s).visible(true);
        //        tbl_contentFilter.columns(List2s).visible(true);
        //        tbl_contentFilter.columns(List3s).visible(true);
        //        tbl_contentFilter.columns(List4s).visible(true);
        //        tbl_contentFilter.columns(List5s).visible(true);
        //        tbl_contentFilter.columns(List6s).visible(true);
        //        tbl_contentFilter.columns(List7s).visible(true);
        //        tbl_contentFilter.columns(List8s).visible(true);
        //    } else if (VisableStatus == 3) {
        //        clear()
        //        tbl_contentFilter.columns(List1).visible(true);
        //        tbl_contentFilter.columns(List6).visible(true);
        //        tbl_contentFilter.columns(List1s).visible(true);
        //        tbl_contentFilter.columns(List6s).visible(true);
        //    } else if (VisableStatus == 4) {
        //        clear()
        //        tbl_contentFilter.columns(List1).visible(true);
        //        tbl_contentFilter.columns(List1s).visible(true);

        //    } else if (VisableStatus == 5) {

        //        clear()
        //        boolVisable1 = true
        //        boolVisable2s = true
        //    } else if (VisableStatus == 6) {
        //        clear()
        //        boolVisable3 = true
        //        boolVisable3s = true

        //    } else if (VisableStatus == 7) {
        //        clear()
        //        boolVisable4 = true
        //        boolVisable4s = true

        //    } else if (VisableStatus == 8) {
        //        clear()
        //        boolVisable5 = true
        //        boolVisable5s = true
        //    } else if (VisableStatus == 9) {
        //        clear()
        //        boolVisable6 = true
        //        boolVisable6s = true
        //    } else if (VisableStatus == 10) {
        //        clear()
        //        boolVisable7 = true
        //        boolVisable7s = true
        //    } else if (VisableStatus == 11) {
        //        clear()
        //        boolVisable8 = true
        //        boolVisable8s = true
        //    } else if (VisableStatus == 12) {
        //        clear()
        //        boolVisable6 = true
        //        boolVisable6s = true
        //        boolVisable8 = true
        //        boolVisable8s = true
        //    }
        //}

    })
    function visibleColumn(VisableStatus, draw) {
        console.log(VisableStatus);
        if (VisableStatus == 0) {
            clear()
            boolVisable1s = true
            boolVisable2s = true
            boolVisable3s = true
            boolVisable4s = true
            boolVisable5s = true
            boolVisable6s = true
            boolVisable7s = true
            boolVisable8s = true

            boolVisable1 = false
            boolVisable2 = false
            boolVisable3 = false
            boolVisable4 = false
            boolVisable5 = false
            boolVisable6 = false
            boolVisable7 = false
            boolVisable8 = false

        } else if (VisableStatus == 1) {
            clear()
            boolVisable1s = false
            boolVisable2s = false
            boolVisable3s = false
            boolVisable4s = false
            boolVisable5s = false
            boolVisable6s = false
            boolVisable7s = false
            boolVisable8s = false

            boolVisable1 = true
            boolVisable2 = true
            boolVisable3 = true
            boolVisable4 = true
            boolVisable5 = true
            boolVisable6 = true
            boolVisable7 = true
            boolVisable8 = true
        } else if (VisableStatus == 2) {
            clear()
            boolVisable1s = true
            boolVisable2s = true
            boolVisable3s = true
            boolVisable4s = true
            boolVisable5s = true
            boolVisable6s = true
            boolVisable7s = true
            boolVisable8s = true

            boolVisable1 = true
            boolVisable2 = true
            boolVisable3 = true
            boolVisable4 = true
            boolVisable5 = true
            boolVisable6 = true
            boolVisable7 = true
            boolVisable8 = true
        } else if (VisableStatus == 3) {
            clear()
            boolVisable1 = true
            boolVisable6 = true
            boolVisable1s = true
            boolVisable6s = true
        } else if (VisableStatus == 4) {
            clear()
            boolVisable1 = true
            boolVisable1s = true

        } else if (VisableStatus == 5) {

            clear()
            boolVisable2 = true
            boolVisable2s = true
        } else if (VisableStatus == 6) {
            clear()
            boolVisable3 = true
            boolVisable3s = true

        } else if (VisableStatus == 7) {
            clear()
            boolVisable4 = true
            boolVisable4s = true

        } else if (VisableStatus == 8) {
            clear()
            boolVisable5 = true
            boolVisable5s = true
        } else if (VisableStatus == 9) {
            clear()
            boolVisable6 = true
            boolVisable6s = true
        } else if (VisableStatus == 10) {
            clear()
            boolVisable7 = true
            boolVisable7s = true
        } else if (VisableStatus == 11) {
            clear()
            boolVisable8 = true
            boolVisable8s = true
        } else if (VisableStatus == 12) {
            clear()
            boolVisable6 = true
            boolVisable6s = true
            boolVisable8 = true
            boolVisable8s = true
        }

    }
    async function SearchWithContent(status) {

        var VisableStatus = $('select[name="kenhhienthi"]').val()
        await visibleColumn(VisableStatus, table_content_filter.draw)


        var data = []
        await resetColumn();
        var count = 3;
        // MHL
        var checked_ids = [];
        var selectedNodes = $('.bctk-sokho').find('.sokho-mathang').find('.jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });

        });
        //
        //KHO
        const a = async ()  => {
            if (status) {
                var parent = $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree("get_selected", true);
                await $.each(parent, async function (index, value) {

                    var a = $('.bctk-sokho').find('.sokho-mathang').find('.jstree-showroom').jstree(true)
                    for (var i in this.children) {

                        var item = a.get_node(this.children[i]).id
                        var khoTen = a.get_node(this.children[i]).text

                        data.push({ KHOID: item.toUpperCase(), KHOTEN: khoTen })

                        var obj = {

                            className: "text-right",
                            data: "SLTONDAU-" + item.toUpperCase() + "",
                            visible: boolVisable1,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj1 = {

                            className: "text-right",
                            data: "SLMUA-" + item.toUpperCase() + "",
                            visible: boolVisable2,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj2 = {

                            className: "text-right",
                            data: "SLBANTRALAI-" + item.toUpperCase() + "",
                            visible: boolVisable3,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }

                        var obj3 = {

                            className: "text-right",
                            data: "SLNHAPNOIBO-" + item.toUpperCase() + "",
                            visible: boolVisable4,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }
                        }
                        var obj4 = {

                            className: "text-right",
                            data: "SLXUATNOIBO-" + item.toUpperCase() + "",
                            visible: boolVisable5,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj5 = {

                            className: "text-right",
                            data: "SLBAN-" + item.toUpperCase() + "",
                            visible: boolVisable6,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj6 = {

                            className: "text-right",
                            data: "SLMUATRALAI-" + item.toUpperCase() + "",
                            visible: boolVisable7,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj7 = {

                            className: "text-right",
                            data: "SLTONCUOI-" + item.toUpperCase() + "",
                            visible: boolVisable8,
                            render: function (data) {
                                return data == null || data == 0 ? '' : `<a style="color:red">` + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + `</a>`
                            }
                        }

                        await listColumn.push(obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7)
                        listTongSL.push(
                            { index: listColumn.findIndex(x => x.data == "SLTONDAU-" + item.toUpperCase() + ""), name: "TongSL-SLTONDAU-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLMUA-" + item.toUpperCase() + ""), name: "TongSL-SLMUA-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLBANTRALAI-" + item.toUpperCase() + ""), name: "TongSL-SLBANTRALAI-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLNHAPNOIBO-" + item.toUpperCase() + ""), name: "TongSL-SLNHAPNOIBO-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLXUATNOIBO-" + item.toUpperCase() + ""), name: "TongSL-SLXUATNOIBO-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLBAN-" + item.toUpperCase() + ""), name: "TongSL-SLBAN-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLMUATRALAI-" + item.toUpperCase() + ""), name: "TongSL-SLMUATRALAI-" + item.toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLTONCUOI-" + item.toUpperCase() + ""), name: "TongSL-SLTONCUOI-" + item.toUpperCase() + "" },

                        )
                        var kho = tbl_kho.rows().data()
                        console.log(kho)

                        $('#table-content-1').find('.table-content thead tr').append(`
    
                         <th style="background-color: #9e9e9e">` + khoTen + ` - Tồn đầu</th>
                         <th style="background-color: #4caf50">` + khoTen + ` - Nhập</th>
                         <th style="background-color: #ffecb3">` + khoTen + ` - Nhập lại</th>
                         <th style="background-color: #ab47bc">` + khoTen + ` - Nhập nội bộ</th>
                         <th style="background-color: #ffcc80"> ` + khoTen + ` - Xuất nội bộ</th>
                         <th style="background-color: #03a9f4">` + khoTen + ` - Xuất bán</th>
                         <th style="background-color: #ffeb3b">` + khoTen + ` - Xuất trả</th>
                         <th style="background-color: #e53935">` + khoTen + ` - Tồn cuối</th>
                    `);
                        $('#table-content-1').find('.table-content tfoot tr').append(`
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `);

                    }



                });

            } else {

                await $('.bctk-sokho').find('.sokho-mathang').find('.table-kho ').find('tr input').each(async function (index, e) {
                    if (this.checked && $(this).parents('tr').attr('style') == '') {
                        var datas = tbl_kho.row($(this).parents('tr')).data();
                        data.push({ KHOID: datas.KHOID, KHOTEN: datas.KHOTEN })

                        var obj = {

                            className: "text-right",
                            data: "SLTONDAU-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable1,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj1 = {

                            className: "text-right",
                            data: "SLMUA-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable2,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj2 = {

                            className: "text-right",
                            data: "SLBANTRALAI-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable3,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }

                        var obj3 = {

                            className: "text-right",
                            data: "SLNHAPNOIBO-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable4,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }
                        }
                        var obj4 = {

                            className: "text-right",
                            data: "SLXUATNOIBO-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable5,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj5 = {

                            className: "text-right",
                            data: "SLBAN-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable6,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj6 = {

                            className: "text-right",
                            data: "SLMUATRALAI-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable7,
                            render: function (data) {
                                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }

                        }
                        var obj7 = {

                            className: "text-right",
                            data: "SLTONCUOI-" + (datas.KHOID).toUpperCase() + "",
                            visible: boolVisable8,
                            render: function (data) {
                                return data == null || data == 0 ? '' : `<a style="color:red">` + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + `</a>`
                            }
                        }

                        await listColumn.push(obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7)
                        console.log(listColumn);
                        listTongSL.push(
                            { index: listColumn.findIndex(x => x.data == "SLTONDAU-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLTONDAU-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLMUA-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLMUA-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLBANTRALAI-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLBANTRALAI-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLNHAPNOIBO-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLNHAPNOIBO-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLXUATNOIBO-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLXUATNOIBO-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLBAN-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLBAN-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLMUATRALAI-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLMUATRALAI-" + (datas.KHOID).toUpperCase() + "" },
                            { index: listColumn.findIndex(x => x.data == "SLTONCUOI-" + (datas.KHOID).toUpperCase() + ""), name: "TongSL-SLTONCUOI-" + (datas.KHOID).toUpperCase() + "" },

                        )

                        $('#table-content-1').find('.table-content thead tr').append(`

                         <th style="background-color: #9e9e9e">` + datas.KHOTEN + ` - Tồn đầu</th>
                         <th style="background-color: #4caf50">` + datas.KHOTEN + ` - Nhập</th>
                         <th style="background-color: #ffecb3">` + datas.KHOTEN + ` - Nhập lại</th>
                         <th style="background-color: #ab47bc">` + datas.KHOTEN + ` - Nhập nội bộ</th>
                         <th style="background-color: #ffcc80"> ` + datas.KHOTEN + ` - Xuất nội bộ</th>
                         <th style="background-color: #03a9f4">` + datas.KHOTEN + ` - Xuất bán</th>
                         <th style="background-color: #ffeb3b">` + datas.KHOTEN + ` - Xuất trả</th>
                         <th style="background-color: #e53935">` + datas.KHOTEN + ` - Tồn cuối</th>
                    `);
                        $('#table-content-1').find('.table-content tfoot tr').append(`
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `);


                    }

                })

            }
        }

        await a();
        console.log(listTongSL);
        //#region Tinh Tong

        var obj = {
            className: "text-right",
            data: "TongSLTONDAU",
            visible: boolVisable1s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        }
        var obj1 = {
            className: "text-right",
            data: "TongSLMUA",
            visible: boolVisable2s,
            render: function (data) {

                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        }
        var obj2 = {

            className: "text-right",
            data: "TongSLBANTRALAI",
            visible: boolVisable3s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }
        var obj3 = {

            className: "text-right",
            data: "TongSLNHAPNOIBO",
            visible: boolVisable4s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        }
        var obj4 = {

            className: "text-right",
            data: "TongSLXUATNOIBO",
            visible: boolVisable5s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }
        var obj5 = {

            className: "text-right",
            data: "TongSLBAN",
            visible: boolVisable6s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }
        var obj6 = {

            className: "text-right",
            data: "TongSLMUATRALAI",
            visible: boolVisable7s,
            render: function (data) {
                return data == null || data == 0 ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }

        }
        var obj7 = {

            className: "text-right",
            data: "TongSLTONCUOI",
            visible: boolVisable8s,
            render: function (data) {
                return data == null || data == 0 ? '' : `<a style="color:red">` + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + `</a>`
            }
        }
        listColumn.push(obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7)


        listTongSL.push(
            { index: listColumn.findIndex(x => x.data == "TongSLTONDAU"), name: "TongSLALLTONDAU" },
            { index: listColumn.findIndex(x => x.data == "TongSLMUA"), name: "TongSLALLMUA" },
            { index: listColumn.findIndex(x => x.data == "TongSLBANTRALAI"), name: "TongSLALLBANTRALAI" },
            { index: listColumn.findIndex(x => x.data == "TongSLNHAPNOIBO"), name: "TongSLALLNHAPNOIBO" },
            { index: listColumn.findIndex(x => x.data == "TongSLXUATNOIBO"), name: "TongSLALLXUATNOIBO" },
            { index: listColumn.findIndex(x => x.data == "TongSLBAN"), name: "TongSLALLBAN" },
            { index: listColumn.findIndex(x => x.data == "TongSLMUATRALAI"), name: "TongSLALLMUATRALAI" },
            { index: listColumn.findIndex(x => x.data == "TongSLTONCUOI"), name: "TongSLALLTONCUOI" }

        )
        $('#table-content-1').find('.table-content thead tr').append(`

                         <th style="background-color: #9e9e9e">`+ ` <span >&#8721;</span> - Tồn đầu</th>
                         <th style="background-color: #4caf50">` + `<span >&#8721;</span> - Nhập</th>
                         <th style="background-color: #ffecb3">` + `<span >&#8721;</span> - Nhập lại</th>
                         <th style="background-color: #ab47bc">` + `<span >&#8721;</span> - Nhập nội bộ</th>
                         <th style="background-color: #ffcc80"> ` + `<span >&#8721;</span> - Xuất nội bộ</th>
                         <th style="background-color: #03a9f4">` + `<span >&#8721;</span> - Xuất bán</th>
                         <th style="background-color: #ffeb3b">` + `<span >&#8721;</span> - Xuất trả</th>
                         <th style="background-color: #e53935">` + `<span >&#8721;</span> - Tồn cuối</th>
                    `);
        $('#table-content-1').find('.table-content tfoot tr').append(`
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    `);
        //#endregion 



        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.listMHL = JSON.stringify(checked_ids)
        table_content_filter.statusDraw++

    }


    // Button Search
    $('.bctk-sokho').find('.sokho-mathang').find('#btn-search').on('click', async function () {
        table_content_filter.statusMHL = $('#checkAll').is(':checked')
        $('#table-content-1').empty();
        await resetColumn();
        await SearchWithContent(statusTree)
        console.log(listColumn)
        console.log(listTongSL);
        if (table_content_filter.listKho.length > 2) {

            tbl_contentFilter.destroy();

            let html = $('#table-content-1').html();
            $('#table-content-mathang').empty();
            $('#table-content-mathang').append(html);
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
    $('.bctk-sokho').find('.sokho-mathang').find('#btn-xuat').on('click', async function () {

        await SearchWithContent(statusTree);
        table_content_filter.export = 1
        table_content_filter.type = $('select[name="kenhhienthi"]').val()
        var stringParamater = serialize(table_content_filter)
        var link = `/SoKhoBCTK/LoadContentbyMatHang?` + stringParamater + ``
        window.open(link)
    })

    // Button Print
    $('.bctk-sokho').find('.sokho-mathang').find('#btn-ins').on('click', async function () {
        await SearchWithContent(statusTree);
        table_content_filter.type = $('select[name="kenhhienthi"]').val();
        table_content_filter.content = $('select[name="kenhhienthi"] option:selected').text();
        var stringParamater = serialize(table_content_filter)
        var link = `/SoKhoBCTK/InKhoBCTK?` + stringParamater + ``;
        window.open(link);
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
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree').jstree({
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
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-sokho').find('.sokho-mathang').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-sokho').find('.sokho-mathang').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-sokho').find('.sokho-mathang').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-sokho').find('.sokho-mathang').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion
})