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
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree-showroom').jstree({
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
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho = []
    var status_datetime = true 
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 0
    var tbl_showroom = $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').DataTable({
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
        scrollCollapse: false,
        scrollX: "100%",
        searching: false, 
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
    var tbl_kho = $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho').DataTable({
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
        scrollX: true,
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
    $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
      
        if (this.checked) {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho tbody').find('tr').each(function () {
               
                $(this).css("display", "");
            })
        } else {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho tbody').find('tr').each(function () {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })

        }
    })

    // Click Only Showroom
    $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");

                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-tonkho').find('.tonkho-mathang').find('input[name="chontat"]').on('click', function () {
        if (this.checked) {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho tbody').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho tbody').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })


    //Search Header table-baocao-tonkho-mathang
    $('#table-baocao-tonkho-mathang thead tr').clone(true).appendTo('#table-baocao-tonkho-mathang thead');
    $('#table-baocao-tonkho-mathang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 1 && i != 5 && i != 9) {
            $(this).html('<input type="text"  id="txt-dsbh-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_contentFilter.column(i).search() !== this.value) {
                table_content_filter.searchMHCODE = $('#txt-dsbh-header-2').val();
                table_content_filter.searchMHTEN = $('#txt-dsbh-header-3').val();
                table_content_filter.searchAlias = $('#txt-dsbh-header-4').val();
                table_content_filter.searchDonVi = $('#txt-dsbh-header-8').val();
                tbl_contentFilter
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end

    var table_content_filter = {}
    table_content_filter.statusDraw = 0
    var tbl_contentFilter = $('.bctk-tonkho').find('.tonkho-mathang').find('.table-content').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            
            if (table_content_filter.statusDraw > 0) {

                table_content_filter.draw = data.draw;
                table_content_filter.start = data.start;
                table_content_filter.length = data.length;
                table_content_filter.search = data.search["value"];
                table_content_filter.order = data.order[0].column;
                table_content_filter.dir = data.order[0].dir;
                table_content_filter.export = 0
                table_content_filter.Type = $('.bctk-tonkho').find('.tonkho-mathang').find('select[name="giavon"]').val()
                table_content_filter.searchMHCODE = $('#txt-dsbh-header-2').val();
                table_content_filter.searchMHTEN = $('#txt-dsbh-header-3').val();
                table_content_filter.searchAlias = $('#txt-dsbh-header-4').val();
                table_content_filter.searchDonVi = $('#txt-dsbh-header-8').val();
                $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadContent',
                    data: table_content_filter,
                    dataType: "json",
                    success: function (res) {
                        console.log(res);
                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-tonkho').find('.tonkho-mathang').find('#btn-xuat').removeClass('disabled-nhap-kho')
                    $('.bctk-tonkho').find('.tonkho-mathang').find('#btn-in').removeClass('disabled-nhap-kho')

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
                "width": "10%",
                "data": "MHCODE",
                render: function (data, type, meta) {
                    if (meta.LINKIMAGE === null || meta.LINKIMAGE === '') {
                        return '<a href ="#">' + data + '</a>';
                    }
                    else {
                        return '<a href =' + meta.LINKIMAGE + ' target="_blank">' + data + '</a>';
                    }
                }

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
                    return '<span class="shorter-text" style="width: 100%" title="' + data + '">' + data + '</span>'
                }

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": 'SOLUONG',
                "width": "7%",
                "render": function (data) {

                    return data == null || data == 0 ? '' : '<a class="font-weight-bold" style="color: red">' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')  + '</a>'
                }

            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "GIABINHQUAN",
                "visible": false,
                "render": function (data) {
                    return data == null || data == 0 ? '': Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }

            },
            {
                "targets": 7,
                "className": "text-right",
                "data": "Thanhtien",
                "visible": false,
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
            {
                "targets": 9,
                "className": "text-left",
                "data": "VITRI1",
                "width": "7%",
                "render": function (data, type, full) {
                    if (full.SRID == "0942fd0d-fb55-42a6-badb-25814b3fc85f") {
                        return data
                    }
                    else if (full.SRID == "eda4fb19-5d10-4241-a11c-9778521c5e57") {
                        return full.VITRI2;
                    }
                    else if (full.SRID == "83516967-a0a1-41c2-b47c-13fcbe3a8574") {
                        return full.VITRI3;
                    }
                    return "";
                }
            },
        ],
        columnDefs: [
            {
                "targets": [9],
                "orderable": false
            }
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

            $(api.column(2).footer()).html((data.length == 0 ? 0 : data[0].TotalRow).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(5).footer()).html((data.length == 0 ? 0 : data[0].TongSoLuong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(6).footer()).html((data.length == 0 ? 0 : data[0].TongDongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(7).footer()).html((data.length == 0 ? 0 : data[0].TongThanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');

        },
        scrollX: true,
        scrollResize: true,
        scrollY: true,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 200
        },
        autoWidth: false,
        lengthChange: true

    })


 
    //  filter by datetime 

    $('.bctk-tonkho').find('.tonkho-mathang').find('input[name = "to"]').on('change', function () {
        if (this.value.length == 0) {
            this.value = moment(moment(new Date()).format('DD/MM/yyyy HH:mm'))
        }

    })
    //

    // Search Content function grid vs tree
    var statusTree = false;
    $('.bctk-tonkho').find('.tonkho-mathang').find('.tree-tab[data-toggle="tab"]').on('show.bs.tab', function(){
        statusTree = true 
    })
    $('.bctk-tonkho').find('.tonkho-mathang').find('.grid-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        statusTree = false
    })
    async function SearchWithContent(status) {
        var data = []
        var checked_ids = [];
        var selectedNodes = $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
            checked_ids.push({ MHLID: this.id });
        });
        if (status) { 

            var datas = $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree-showroom').jstree("get_selected", true); 
            await $.each(datas, function () {
                data.push({ KHOID: this.id  })
            });

        } else {
            await $('.bctk-tonkho').find('.tonkho-mathang').find('.table-kho ').find('tr input').each(function (index, e) {
               console.log( $(this).parents('tr').css('display'))
                if (this.checked && $(this).parents('tr').attr('style') == '') {

                    var datas = tbl_kho.row($(this).parents('tr')).data();
                    data.push({ KHOID: datas.KHOID })
                   
                }
            })
        }
      
        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.ListMHL = JSON.stringify(checked_ids)
        console.log(table_content_filter)
        table_content_filter.statusDraw++

    }

    // Button Search
    $('.bctk-tonkho').find('.tonkho-mathang').find('#btn-search').on('click', async function () { 
      
        table_content_filter.statusMHL = $('#checkAll').is(':checked')
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
    $('.bctk-tonkho').find('.tonkho-mathang').find('#btn-xuat').on('click', async function () {
        table_content_filter.statusMHL = $('#checkAll').is(':checked')
        await SearchWithContent(statusTree);
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TonkhoBCTK/LoadContent?` + stringParamater + ``
        window.open(link)

    })
    // Button In
    $('.bctk-tonkho').find('.tonkho-mathang').find('#btn-in').on('click', async function () {
        var stringParamater = serialize(table_content_filter)
        var link = `/TonkhoBCTK/InTonKhoBCT?` + stringParamater + ``
        window.open(link)

    })
    //#region Event
    $('.bctk-tonkho').find('.tonkho-mathang').find('.table-content tbody').on('click', 'tr', function () {
        $(this).closest('.tonkho-mathang').find('tr').removeClass('selected');
        tbl_contentFilter.row($(this).index()).select();
    })
    $('.bctk-tonkho').find('.tonkho-mathang').find('.table-content tbody ').on('dblclick', 'tr', async function () {

        var data = tbl_contentFilter.row($(this).index()).data();
        console.log(data)
        var listKho = table_content_filter.listKho
        var listSR = []
        $('.bctk-tonkho').find('.tonkho-mathang').find('.table-showroom').find('tr input').each(function () {

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
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree').jstree({
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
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('.bctk-tonkho').find('.tonkho-mathang').find('.jstree').jstree(true).refresh();
    };
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('.bctk-tonkho').find('.tonkho-mathang').find('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.dropdown-tree-mathang').show();
        }
        else {
            $('.bctk-tonkho').find('.tonkho-mathang').find('.dropdown-tree-mathang').hide();
        }
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