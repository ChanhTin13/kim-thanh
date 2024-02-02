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
        $('#jstree-showroom').jstree({
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
        $('#jstree-showroom').jstree(true).settings.core.data = { 'url': '/KhoHang/Tree' };;
        $('#jstree-showroom').jstree(true).refresh();
    };
    //#endregion

    var listkho= []
    var status_datetime = true
    $('.bctk-tonkho').find('input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy HH:mm'))
    //Table SHOWROOM
    var filter_showroom = {}
    filter_showroom.statusDraw = 1
    var tbl_showroom = $('.bctk-tonkho').find('.table-showroom').DataTable({
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
                "className": "text-left ",
                "data": "SRTEN",

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": null,
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
        scrollResize: false,
        scrollY: 150,
        scrollCollapse: true,
        scrollX: false,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,

    })
    // 
    var filter_kho = {}
    filter_kho.statusDraw = 1
    var dataTemp = []  
    var tbl_kho = $('.bctk-tonkho').find('.table-kho').DataTable({

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
                "className": "text-left",
                "data": "KHOTEN",

            },
            {
                "targets": 1,
                "className": "text-center",
                "data": null,
                "render": function (data) {
                    return '<input  type="checkbox">'
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
    $('.bctk-tonkho').find('.table-showroom thead tr').find('input[name="checkbox-sr-all"]').on('click', function () {
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
            $('.bctk-tonkho').find('.table-showroom').find('tr input').each(function (index, e) {  
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.table-kho').find('tr').each(function (index, e) {
                $(this).css("display", "");  
            })
        } else {
            $('.bctk-tonkho').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.table-kho').find('tr').each(function (index, e) {
                $(this).css("display", "none");
                $(this).find('input').removeAttr('checked', 'checked')
            })
            
        }
    })

    // Click Only Showroom
    $('.bctk-tonkho').find('.table-showroom tbody').on('click', 'tr', function (event) {
        var target = $(event.target);
        if (target.is('input')) {
            let idcn = $(this).attr('data-id');
            if (target.is(':checked')) {
                $(this).find('input').prop('checked', true)
                $('.bctk-tonkho').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "");
                   
                    }
                })
            }
            else {
                $(this).find('input').prop("checked", false);
                $('.bctk-tonkho').find('.table-kho').find('tr').each(function (index, e) {
                    var idkho = ($(e).attr('data-id'));
                    if (idcn == idkho) {
                        $(this).css("display", "none");
                    }
                })
            }
        }
    })

    // click all chọn tất
    $('.bctk-tonkho').find('input[name="chontat"]').on('click', function () {
        if (this.checked) { 
            $('.bctk-tonkho').find('.table-kho ').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
            $('.bctk-tonkho').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", true);
            })
        } else {  
            $('.bctk-tonkho').find('.table-kho').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
            $('.bctk-tonkho').find('.table-showroom').find('tr input').each(function (index, e) {
                $(this).prop("checked", false);
            })
        }
    })

  

    var table_content_filter = {}
    table_content_filter.statusDraw = 0
    var tbl_contentFilter = $('.bctk-tonkho').find('.table-content').DataTable({ 
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

                if (status_datetime == true) {
                    table_content_filter.from = $('.bctk-tonkho').find('input[name="from"]').val()
                    table_content_filter.to = $('.bctk-tonkho').find('input[name="to"]').val()
                } else {
                    table_content_filter.from = ''
                    table_content_filter.to =  ''
                }
 
                $.ajax({
                    type: 'GET',
                    url: '/TonKhoBCTK/LoadContents',
                    data: table_content_filter, 
                    dataType: "json",
                    success: function (res) {
                        
                    }
                }).done(callback, () => {
                    html: true;
                    $('.bctk-tonkho').find('#btn-xuat').removeClass('disabled-nhap-kho')
                    $('.bctk-tonkho').find('#btn-in').removeClass('disabled-nhap-kho')
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
                "data": 'KHOCODE',
                 
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHCODE",

            },
            {
                "targets": 3,
                "className": "text-left",
                "data": 'MHTEN',
                
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MATCHCODE",

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": 'SOLUONG',
                "render": function (data) {
                   
                    return  '<a class="font-weight-bold" style="color: red">'+data+'</a>'
                }
                
            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "GIABINHQUAN",
                "render": function (data) {
                    if (data > 0) {
                        return Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }
                    return ''
                }

            },
            {
                "targets": 7,
                "className": "text-right",
                "data": "Thanhtien",
                "render": function (data) {
                    if (data != 0) {
                        return Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }
                    return ''
                }
            },
            {
                "targets": 8,
                "className": "text-left",
                "data": "DONVI",
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
            
            $(api.column(2).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(5).footer()).html(data[0].TongSoLuong.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(6).footer()).html(data[0].TongDongia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(7).footer()).html(data[0].TongThanhtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');

        }, 
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100
        },
        autoWidth: false,
        pageLength: 15,
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

     
    // Enable / Disable filter by datetime
    var ckdisable =  $('.bctk-tonkho').find('input[name="checkbox-disable"]').on('change', function () {

        if (this.checked) {
            status_datetime = true
            $('input[name="to"]').removeAttr('disabled')
            tbl_contentFilter.column(8).visible(false)
            
        } else { 
            status_datetime = false
            $('input[name="to"]').attr('disabled', true)
            tbl_contentFilter.column(8).visible(true) 
        } 
    })
    $('.bctk-tonkho').find('input[name = "to"]').on('change', function () {
        if (this.value.length == 0) {
            this.value = moment(moment(new Date()).format('DD/MM/yyyy HH:mm'))
        }

    })
    //

    async function SearchWithContent() {
        var data = []
        var checked_ids = [];
        var selectedNodes = $('#jstree').jstree("get_selected", true);

        await $.each(selectedNodes, function () {
             checked_ids.push({ MHLID: this.id });
        });

        await $('.bctk-tonkho').find('.table-kho ').find('tr input').each(function (index, e) {
            if (this.checked) {
                 
                var datas = tbl_kho.row($(this).parents('tr')).data();
                data.push({ KHOID: datas.KHOID})
                console.log(data)
            } 
        })
        table_content_filter.listKho = JSON.stringify(data)
        table_content_filter.ListMHL = JSON.stringify(checked_ids)
        console.log(table_content_filter)
        table_content_filter.statusDraw++
       
    }

    // Button Search
    $('.bctk-tonkho').find('#btn-search').on('click',async function () {
        await SearchWithContent();
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
        var checked_ids = [];
        var selectedNodes = $('#jstree-showroom').jstree("get_checked", true);
        $.each(selectedNodes, function () {
            checked_ids.push(this.id);
        });

        console.log(checked_ids);
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
    $('.bctk-tonkho').find('#btn-xuat').on('click', async function () {
        
        await SearchWithContent();
        table_content_filter.export = 1
        var stringParamater = serialize(table_content_filter)
        var link = `/TonkhoBCTK/LoadContents?` + stringParamater+``
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