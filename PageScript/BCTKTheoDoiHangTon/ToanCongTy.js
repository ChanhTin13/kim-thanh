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
        $('.bctk-theodoihangton').find('.theo-toan-congty').find('.jstree').jstree({
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
        $('.bctk-theodoihangton').find('.theo-toan-congty').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-theodoihangton').find('.theo-toan-congty').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-theodoihangton').find('.theo-toan-congty').find('input[name="NhomHangs"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-theodoihangton').find('.theo-toan-congty').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-theodoihangton').find('.theo-toan-congty').find('.dropdown-tree-mathang').hide();
        }
    });
    //#endregion

    $('.bctk-theodoihangton').find('.theo-toan-congty').find('#checkAll').click() 

    //#region Table Content
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

                return data == null || data == 0 ? '<span></span>' : '<span style="color: #00c853">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
            }

        },
        {

            "className": "text-right",
            "data": "SL3160",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
            }

        },
        {

            "className": "text-right",
            "data": "SL6190",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ffa000">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
              
            }

        },
        {

            "className": "text-right",
            "data": "SL91120",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ef6c00">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
                
            }

        },
        {

            "className": "text-right",
            "data": "SL120N",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ff1744">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
              
            }

        },
        {

            "className": "text-right",
            "data": "TONGSL",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'  
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
                return data == null || data == 0 ? '<span></span>' : '<span style="color: #00c853">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'
                
            }

        },
        {

            "className": "text-right",
            "data": "SL0814",
            "render": function (data) {


                return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'
              
            }

        },
        {

            "className": "text-right",
            "data": "SL1522",
            "render": function (data) {
                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ffa000">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'
                
            }

        },
        {

            "className": "text-right",
            "data": "SL2330",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ef6c00">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                
            }

        },
        {

            "className": "text-right",
            "data": "SL30N",
            "render": function (data) {
                return data == null || data == 0 ? '<span></span>' : '<span style="color: #ff1744">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'
                 
            }

        },
        {

            "className": "text-right",
            "data": "TONGSL",
            "render": function (data) {

                return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>'

            }

        },
    ]
    var tbl_content = InitTB(0)

    function InitTB(statusColumn) {
        return $('.bctk-theodoihangton').find('.theo-toan-congty').find('.table-content').DataTable({
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
                        url: '/TheoDoiHangTonBCTK/LoadContentTheoToanCongTy',
                        data: table_content_filter,
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                        }
                    }).done(callback, () => {
                        html: true;
                        $('.bctk-theodoihangton').find('.theo-toan-congty').find('#btn-xuat').removeClass('disabled-hethang');
                        $('.bctk-theodoihangton').find('.theo-toan-congty').find('#btn-in').removeClass('disabled-hethang');
                        $('.bctk-theodoihangton').find('.theo-toan-congty').find('.table-content tbody').on('click', 'tr', function () {
                            $(this).closest('.theo-toan-congty').find('tr').removeClass('selected');
                            tbl_content.row($(this).index()).select();
                        })
                        $('.bctk-theodoihangton').find('.theo-toan-congty').find('.table-content tbody tr').on('dblclick', 'td', async function () {
                            var abc = () => {
                                table_detail_filter.statusDraw = 1
                                table_detail_filter.MHID = tbl_content.row($(this).closest('tr').index()).data().MHID;
                                table_detail_filter.FilterbySelect = $('.bctk-theodoihangton').find('.theo-toan-congty').find('select[name="setting"]').val() == 0 ? 30 : 7
                                table_detail_filter.index = $(this).index()
                            }
                             
                            var x = $(this).find('span').text() == '' ? 0 : $(this).find('span').text()
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };
                            if ($(this).index() > 2 && intVal(x) > 0) {
                                $('#xem-chi-tiet').modal('toggle')
                                await abc()
                                setTimeout(() => { tbl_detail.draw() }, 200)

                                
                            }
                        })
                    })
                }
            },
            columns: statusColumn == 0 ? listColumnByMonth : listColumnbyWeek,
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
    async function SearchWithContent() {
        table_content_filter.listKho = ''
        var data = []
        var selectedNodes = $('.bctk-theodoihangton').find('.theo-toan-congty').find('.jstree').jstree("get_selected", true);
        var checked_ids = []
        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });
        });

        table_content_filter.listMHL = JSON.stringify(checked_ids)
        console.log(table_content_filter)
        table_content_filter.statusDraw++

    }

    // Button Search
    $('.bctk-theodoihangton').find('.theo-toan-congty').find('#btn-search').on('click', async function () {
        $('#table-content-by-congty').empty()
        var status = $('.bctk-theodoihangton').find('.theo-toan-congty').find('select[name="setting"]').val()
        table_content_filter.FilterByMOrW = status == 0 ? false : true
        await SearchWithContent();
        if (status == 0) {
            var html = $('#table-content-theothang').html();
            $('#table-content-by-congty').append(html);

        } else if (status == 1) {
            var html = $('#table-content-theotuan').html();
            $('#table-content-by-congty').append(html);
        }
        tbl_content = await InitTB(status)

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
    $('.bctk-theodoihangton').find('.theo-toan-congty').find('#btn-xuat').on('click', async function () {
        await SearchWithContent();
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TheoDoiHangTonBCTK/LoadContentTheoToanCongTy?` + stringParamater + ``
        window.open(link)
    })
    // Button Print
    $('.bctk-theodoihangton').find('.theo-toan-congty').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/TheoDoiHangTonBCTK/InTheoDoiHangTonByToanCongTy?` + stringParamater + ``
        window.open(link)
    })
    //#endregion

    //#region Table Detail
    var table_detail_filter = {}
    table_detail_filter.statusDraw = 0
    var tbl_detail = $('#xem-chi-tiet').find('.table-xem-chitiet').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (table_detail_filter.statusDraw > 0) {
                table_detail_filter.draw = data.draw;
                table_detail_filter.start = data.start;
                table_detail_filter.length = data.length;
                table_detail_filter.search = data.search["value"];
                table_detail_filter.order = data.order[0].column;
                table_detail_filter.dir = data.order[0].dir;
                table_detail_filter.export = 0


                $.ajax({
                    type: 'GET',
                    url: '/TheoDoiHangTonBCTK/LoadDetailByToanCongTy',
                    data: table_detail_filter,
                    dataType: "json",
                    success: function (res) {
                        console.log(res)
                    }
                }).done(callback, () => {
                    html: true;

                    //$('#xem-chi-tiet').find('.table-xem-chitiet tbody').on('click', 'tr', function () {
                    //    $(this).closest('#xem-chi-tiet').find('tr').removeClass('selected');
                    //    tbl_content.row($(this).index()).select();
                    //})

                })
            }
        },
        columns: [
            {

                "className": "text-left",
                "data": "RowIndex",
            },
            {

                "className": "text-left",
                "data": "NGAYHD",
                "render": function (data) {
                    return data == null ? '' : moment(data).format('DD/MM/YYYY')
                },

            },
            {

                "className": "text-left",
                "data": "MHDCODE",

            },
            {

                "className": "text-left",
                "data": "MHCODE",

            },
            {

                "className": "text-left",
                "data": "MHTEN",
                "render": function (data) {
                    return '<span class="shorter-text" style="width: 164px" title="' + data + '">' + data + '</span>'
                },
            },
            {

                "className": "text-left",
                "data": "SOLUONG",
                "render": function (data) {

                    return data == null || data == 0 ? '<span></span>' : '<span>'+ Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                }
            },
            {

                "className": "text-left",
                "data": "DONGIA",
                "render": function (data) {

                    return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                }
            },
            {

                "className": "text-left",
                "data": "CHIETKHAU",
                "render": function (data) {

                    return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                }
            },
            {

                "className": "text-left",
                "data": "TILETHUE",
                "render": function (data) {

                    return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                }
            },
            {

                "className": "text-left",
                "data": "THANHTIEN",
                "render": function (data) {

                    return data == null || data == 0 ? '<span></span>' : '<span>' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</span>' 
                }
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

            console.log(data)
            
            $(api.column(1).footer()).html((data.length == 0 ? '' : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(5).footer()).html((data.length == 0 ? '' : data[0].TONGSOLUONG).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(9).footer()).html((data.length == 0 ? '' : data[0].TONGTHANHTIEN).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');



        },
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: false,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: false,
        lengthChange: false


    })

    // Button Export
    $('#xem-chi-tiet').find('#btn-xuat').on('click', async function () { 
        table_detail_filter.export = 1
        var stringParamater = serialize(table_detail_filter)
        var link = `/TheoDoiHangTonBCTK/LoadDetailByToanCongTy?` + stringParamater + ``
        window.open(link)
    })
    //#endregion
   

})