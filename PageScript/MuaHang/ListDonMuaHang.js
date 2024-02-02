  
$(document).ready(function () {
   
    var tbDonMuahang_filterValues = {}; 
    var tbl_donmuahang = $('#tbl_donmuahang').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        
        ajax: function (data, callback, setting) {
           
            if (data.draw  != '1' ) {
                tbDonMuahang_filterValues.draw = data.draw;
                tbDonMuahang_filterValues.start = data.start;
                tbDonMuahang_filterValues.length = 50;
                tbDonMuahang_filterValues.order = data.order[0].column;
                tbDonMuahang_filterValues.dir = data.order[0].dir;
                tbDonMuahang_filterValues.status = $('#status').val();
                tbDonMuahang_filterValues.from = $('input[name="chooseDate_Form"]').val();
                tbDonMuahang_filterValues.to = $('input[name="chooseDate_To"]').val();
                tbDonMuahang_filterValues.search = data.search["value"];

            } else {
               
                tbDonMuahang_filterValues.draw = data.draw;
                tbDonMuahang_filterValues.start = data.start;
                tbDonMuahang_filterValues.length = 50;
                tbDonMuahang_filterValues.order = data.order[0].column;
                tbDonMuahang_filterValues.dir = data.order[0].dir;
                tbDonMuahang_filterValues.status = $('#status').val();
                tbDonMuahang_filterValues.search = data.bFilter;
                tbDonMuahang_filterValues.search = data.search["value"];
            }
          
            $.ajax({
                type: 'GET',
                url: '/muahang/LoadJsonDonMuaHang',
                data: tbDonMuahang_filterValues,
                success: function (res) {
                      
                },

            }).done(callback, () => {
                html: true;
            });
        },
        columns: [
            {
                "targets": 0,
                "className": "text-center",
                "data": "RowIndex",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-rowindex')
                }
            },
            {
                "targets": 1,
                "className": "status",
                "data": "STATUS",
                "createdCell": function (td) {
                    if ($(td).html() === '0') {
                        $(td).css('background-color', 'yellow');
                        $(td).html('Đang thực hiện')  
                    }else if ($(td).html() === '-1') {
                        $(td).css('background-color', 'red');
                        $(td).html('Bị hủy')  
                    }else if ($(td).html() === '1') {
                        $(td).css('background-color', 'gray');
                        $(td).html('Đã hoàn tất')  
                    }
                   
                    $(td).attr('data-column', 'col-status')
                }
            },
            {
                "targets": 2,
                "className": "text-center", 
                "data": "SHIPPED",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-shipped')
                }
            },
            {
                "targets": 3,
                "className": "",
                "data": "MDCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mdcode')
                }
            }, 
            {
                "targets": 4,
                "className": "",
                "data": "NGAYHDstr",
                "createdCell": function (td) { 
                    $(td).attr('data-column', 'col-ngayhd');
                    if ($(td).html() != '') {
                        var d = moment($(td).html());
                        $(td).html(d.format("DD/MM/YYYY"));
                    }
                    
                }

            },
            {
                "targets": 5,
                "className": "",
                "data": "SUBMITEDDATEstr",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-submiteddate');
                    if ($(td).html() != '') {
                        var d = moment($(td).html());
                        $(td).html(d.format("DD/MM/YYYY"));
                    }
                   
                }

            },
            {
                "targets": 6,
                "className": "",
                "data": "KHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-khten')
                }
            },
            {
                "targets": 7,
                "className": "",
                "data": "DIENTHOAI",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dienthoai')
                }
            },
            {
                "targets": 8,
                "className": "",
                "data": "NVTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-nvten')
                }
            },
            {
                "targets": 9,
                "className": "",
                "data": "TONGTIEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tongtien')
                }
            },
            {
                "targets": 10,
                "className": "",
                "data": "HANTHANHTOANstr",
                "createdCell": function (td) {
                    $(td).css('background-color', 'red');
                    $(td).attr('data-column', 'col-hanthanhtoan');
                    if ($(td).html() != '') {
                        var d = moment($(td).html());
                        $(td).html(d.format("DD/MM/YYYY"));
                    }
                }
            },
            {
                "targets": 11,
                "className": "",
                "data": "DIENGIAI",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-diengiai')
                }
            }, 
            {
                "targets": 12,
                "className": "",
                "data": "LYDO",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-lydo')
                }
            },
            {
                "targets": 13,
                "className": "",
                "data": "NGUOILAP",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-nguoilap')
                }
            },
            {
                "targets": 14,
                "className": "text-center",
                "data": "APPROVED",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-approved')
                }
            },
            {
                "targets": 15,
                "className": "",
                "data": "APPROVEDBY",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-approvedby')
                }
            },
            {
                "targets": 16,
                "className": "",
                "data": "EXPECTEDDATEstr",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-expecteddate');
                    if ($(td).html() != '') {
                        var d = moment($(td).html());
                        $(td).html(d.format("DD/MM/YYYY"));
                    }
                   
                }
            },
            {
                "targets": 17,
                "className": "",
                "data": "SRfrom",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-srfrom')
                }
            },
            {
                "targets": 18,
                "className": "",
                "data": "SRto",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-srto')
                }
            },
            
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {  
            $(nRow).attr('data-id', data.MDID); 
            $(nRow).attr('data-kh', data.KHCODE); 
        },
        
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        pageLength: 50,
        scroller: {
            loadingIndicator: true
        },
        
        loadingIndicator: true,
        displayBuffer: 100,
        /*fixedColumns: {
            leftColumns: 3,
        },*/
       
    }); 

    $('#status').on('change', function () {
        pagesearch();
    });

    $('input[name="chooseDate_Form"]').on('change', function () {
        pagesearch();
    })
    $('input[name="chooseDate_To"]').on('change', function () {
        pagesearch();
    })

    function pagesearch() {
        tbDonMuahang_filterValues.status = $('#status').val();
        tbDonMuahang_filterValues.from = $('input[name="chooseDate_Form"]').val();
        tbDonMuahang_filterValues.to = $('input[name="chooseDate_To"]').val();

        tbl_donmuahang.draw();
    }

    // Load table chi tiết = rỗng
    let dataTemp = {}
    let dataAdd = {}
    let dataDelete = {}
    $('#tbl_ctphieu').find('tfoot').append(`<tr>
                                                                <th data-column="col-stt"></th>
                                                                <th data-column="col-mahang"></th>
                                                                <th data-column="col-tenhang"></th>
                                                                <th data-column="col-kho"></th>
                                                                <th data-column="col-soluong"></th>
                                                                <th data-column="col-donvi"></th>
                                                                <th data-column="col-soluongchuaxuat"></th>
                                                                <th data-column="col-soluongton"></th>
                                                                <th data-column="col-soluongkhac"></th>
                                                                <th data-column="col-soluongban"></th>
                                                                <th data-column="col-dongia"></th>
                                                                <th data-column="col-thue"></th>
                                                                <th data-column="col-ck"></th>
                                                                <th data-column="col-thanhtien"></th>
                                                                <th data-column="col-ghichu"></th>
                                                                <th data-column="col-dongia"></th>
                                                            </tr>`)
    var tbl_ctphieu = $('#tbl_ctphieu').DataTable({
        paging: false,
        data: dataTemp, 
        
        columns: [
            {
                "targets": 0,
                "className": "",
                "data": null,
                "createdCell": function (td) {
                    $(this).attr('data-column', 'col-stt'); 
                },
               
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mahang')
                }
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                }
            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "KHOCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-kho')
                }
            },
            {
                "targets": 4,
                "className": "text-right",
                "data": "SOLUONG",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluong')
                }
            },
            {
                "targets": 5,
                "className": "text-right",
                "data": "DONVI",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-donvi')
                }
            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "SOLUONGEX",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongchuaxuat')
                }
            },
            {
                "targets": 7,
                "className": "text-right",
                "data": "SOLUONGEX",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongton')
                }
            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "SOLUONGEX",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongkhac')
                }
            },
            {
                "targets": 9,
                "className": "text-right",
                "data": "SOLUONGEX",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongban')
                }
            },
            {
                "targets": 10,
                "className": "text-right",
                "data": "DONGIA",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dongia')
                }
            },
            {
                "targets": 11,
                "className": "text-right",
                "data": "FCTHUE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thue')
                }
            },
            {
                "targets": 12,
                "className": "text-right",
                "data": "CHIETKHAU",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ck')
                }
            },
            {
                "targets": 13,
                "className": "text-right",
                "data": "THANHTIEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thanhtien')
                }
            },
            {
                "targets": 14,
                "className": "text-right",
                "data": "GHICHU",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ghichu')
                }
            },
            {
                "targets": 15,
                "className": "text-right",
                "data": "DONGIA",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dongia')
                }
            },
            {
                "targets": 16,
                "className": "",
                "data": null,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-btn')
                },
                defaultContent: '<a class="btn btn-danger">Xóa</a>'
            },
            

        ], 
       
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).find('td:eq(0)').text(iDataIndex + 1);
            $(nRow).find('td:eq(16)').attr('data-mhId', data.MHID);
            $(nRow).attr('data-id', data.MHID);
            
        },
    
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        pageLength: 50,
        autoWidth: false,
        responsive: true, 
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over this page



            sl = api
                .column(4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            dongia = api
                .column(10, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            thanhtien = api
                .column(13, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            // Update footer
            $(api.column(1).footer()).html(data.length).addClass('text-right');
            $(api.column(4).footer()).html(sl);
            $(api.column(10).footer()).html(dongia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));
            $(api.column(13).footer()).html(thanhtien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }));

        },
    }); 

  
//Event khi Dblick vào tag tr

    $('#tbl_donmuahang  tbody').on('dblclick', 'tr',function () { 
        
    //RESET ĐỐI TƯỢNG
        $(this).addClass('selected');
        $('#tbl_donmuahang tbody tr').not(this).removeClass('selected');
        tbl_ctphieu.clear().draw();   
      
    //LOAD DỮ LIỆU 
        
        LoadMuaDonDetail($(this).attr('data-id')).then((e) => {


            
            if (e.data.length > 0) {

                $('.default-form input[name="kh-code"]').val(e.data[0].KHCODE)
                $('.default-form input[name="kh-name"]').val(e.data[0].KHTEN)
                $('.default-form input[name="nv-username"]').val(e.data[0].NVCODE)
                $('.default-form input[name="nv-name"]').val(e.data[0].NVTEN)
                $('.default-form input[name="so-hoadon"]').val(e.data[0].MDCODE)
                $('.default-form input[name="ngay-lapphieu"]').val(moment(e.data[0].SUBMITEDDATE).format('DD/MM/yyyy'))
                $('.default-form input[name="han-thanhtoan"]').val(moment(e.data[0].HANTHANHTOAN).format('DD/MM/yyyy'))

                // load showroom from db
                loadShowRoom().then((sr) => {
                    sr.data.map((value) => {
                        if (value.SRID === e.data[0].SRIDTO) {
                            $('#showroom').append(`<option selected value="` + value.SRID + `">` + value.TEN + `</option>`)
                        } else {
                            $('#showroom').append($('<option>', {
                                value: value.SRID,
                                text: value.TEN,
                            }))
                        }
                       
                    })

                }) 
                //load tien te from db 
                LoadTienTe().then((tt) => {
                    tt.data.map((value) => {
                        if (value.TTID === e.data[0].TIENTEID) {
                            $('#tiente').append(`<option selected value="` + value.TTID + `">` + value.TTCODE + `</option>`)
                        } else {
                            $('#tiente').append($('<option>', {
                                value: value.TTID,
                                text: value.TTCODE,
                            }))
                        }

                    })
                  
                })
               
                // load ti gia
                $('input[name="tigia"]').attr( 'placeholder',(e.data[0].TIGIA))
              
                // load ca lam viec from db
                LoadCA().then((ca) => {
                    ca.data.map((value) => {
                        if (value.CID === e.data[0].CAID) {
                            $('#ca').append(`<option selected value="` + value.CID + `">` + value.CTEN + `</option>`)
                        } else {
                            $('#ca').append($('<option>', {
                                value: value.CID,
                                text: value.CTEN,
                            }))
                        }
                      
                    })

                })

                // load lydo from db
                loadLydo().then((e) => {
                    e.data.map((value) => {
                        if (value.LDNID === e.data[0].LDNID) {
                            $('#lydo').append(`<option selected value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                            
                        }  
                        else {
                            $('#lydo').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                        }
                    })

                }) 

                $('input[name="ngay-nhanhang"]').attr('placeholder', moment(new Date()).format('DD/MM/yyyy'))

                // checkbox status
                if (e.data[0].STATUS === '0') {
                    $('#statusCT').val('-1')
                }
                // check box shipped
                if (e.data[0].SHIPPED) { 

                    $('#shipped').attr("checked", "checked"); 
                } 
                //checkbox ck

                //tien hang
                $('#tienhang').html('#####')
                //thue 
                $('#thue').html(e.data[0].TONGTHUE)
                //chiet khau
                $('#ck').html(e.data[0].TONGCHIETKHAU)
                //tongtien
                $('#tongtien').html(e.data[0].TONGTIEN.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
                //ghi chu / diengiai
                $('#ghi-chu').val(e.data[0].DIENGIAI)

            }
        }) 

        // load data cho bang chi tiet
        LoadMuaCTDon($(this).attr('data-id')).then((e) => {

             
            if (e.data.length > 0) {
                dataTemp = e.data;
                tbl_ctphieu.rows.add(dataTemp);  
                tbl_ctphieu.columns.adjust().draw();
                $('#tbl_ctphieu').css('display','block')
            }
        }) 
       
        // show modal 
        $('#them-order').modal();
    }) ; 

    $('#them-order').on('hide.bs.modal', function () {
        
        tbl_ctphieu.clear().draw();  
        
        $('#tbl_searchMatHang').css('display', 'none')
        $(".table-search").hide();
        $('#tbl_ctphieu tfoot').empty(); 

        $('#lydo').find('option').remove().end().append('<option value="">---</option>')
        $('#showroom').find('option').remove().end().append('<option value="">---</option>')
        $('#tiente').find('option').remove().end().append('<option value="">---</option>')
        $('#ca').find('option').remove().end().append('<option value="">---</option>')
        $('#kho').find('option').remove().end().append('<option value="">---</option>')

        if ($('#shipped').attr('checked')) {

            $('#shipped').removeAttr("checked");
        }
      
        $('#statusCT').val('')
        $('.default-form input[name="kh-code"]').val('')
        $('.default-form input[name="kh-name"]').val('')
        $('.default-form input[name="nv-username"]').val('')
        $('.default-form input[name="nv-name"]').val('')
        $('.default-form input[name="so-hoadon"]').val('')
        $('.default-form input[name="ngay-lapphieu"]').val('')
        $('.default-form input[name="han-thanhtoan"]').val('')

        //tien hang
        $('#tienhang').html('')
        //thue 
        $('#thue').html('')
        //chiet khau
        $('#ck').html('')
        //tongtien
        $('#tongtien').html('')
        //ghi chu / diengiai
        $('#ghi-chu').val('')
       
    });
     

    $('#tbl_searchMatHang  tbody').on('dblclick', 'tr', function () {

        $(this).addClass('selected');
        $('#tbl_searchMatHang tbody tr').not(this).removeClass('selected'); 

        loadMatHangbyMHID($(this).attr('data-id')).then((e) => {
            if (e.data.length > 0) {
                console.log(dataTemp)
                console.log(e.data[0])
                $(".table-search").hide();
                tbl_ctphieu.clear().columns.adjust().draw();  

                var obj = {
                    SORTORDER: e.data[0].CAUHINH,
                    MHID: e.data[0].MHID,
                    MHCODE: e.data[0].MHCODE,
                    MHTEN: e.data[0].MHTEN,
                    KHOCODE: e.data[0].MHCODE,
                    SOLUONG: e.data[0].SOLUONG + 1,
                    DONVI: e.data[0].DONVI,
                    SOLUONGEX: e.data[0].SOLUONG,
                    SOLUONGEX: e.data[0].SOLUONG,
                    SOLUONGEX: e.data[0].SOLUONG,
                    SOLUONGEX: e.data[0].SOLUONG,
                    DONGIA: e.data[0].GIABANLE,
                    FCTHUE: e.data[0].THUE,
                    CHIETKHAU: e.data[0].THUE,
                    THANHTIEN: (e.data[0].SOLUONG + 1) * e.data[0].GIABANLE,
                    GHICHU: e.data[0].GHICHU,
                    DONGIA: e.data[0].GIABANLE,
                }

                dataTemp.push(obj) 
                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();
             /*   dataTemp.add(e.data[0])
                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();  */
            }
        })
        //$(".table-search").hide();

    });

    // delete trong table
    $('#tbl_ctphieu tbody').on('click', 'a', function () {
        var data = tbl_ctphieu.row($(this).parents('tr')).data();

        var r =confirm('Có muốn xóa không?')
        if (r) {
            for (var i = 0; i < dataTemp.length; i++) {
                if (dataTemp[i].MHID === data.MHID) {
                    dataTemp.splice(i, 1);

                }
            }

            tbl_ctphieu.clear().columns.adjust().draw();
            tbl_ctphieu.rows.add(dataTemp);
            tbl_ctphieu.columns.adjust().draw();
        }
        

    })



    // FUNCTION SEARCH MATHANG

    let filterObj = {}

    var tbl_searchMatHang = $('#tbl_searchMatHang').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            filterObj.draw = data.draw;
            filterObj.search = data.search["value"];
            filterObj.start = data.start;
            filterObj.length = data.length;
            filterObj.order = data.order[0].column;
            filterObj.dir = data.order[0].dir;

            $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadMatHang',
                data: filterObj,
                success: function (res) {
                    tbl_searchMatHang.columns.adjust()
                    $('#tbl_searchMatHang').css('display','table')
                }
            }).done(callback, () => {
                html: true;

            })
        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": "RowIndex",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-stt')
                }
            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mahang')
                }
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                }
            },
            {
                "targets": 3,
                "className": "",
                "data": "MHALIAS",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-alias')
                }
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHMOTA",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mota')
                }
            },
            {
                "targets": 5,
                "className": "",
                "data": "Btn",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-btn')
                }
            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID); 
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15,
        },
        autoWidth: true, 
        pageLength: 5,
        lengthChange: true, 
    });

    function filterGlobal() {
        $('#tbl_searchMatHang').DataTable().search(
            $('#global_filters').val(),
        ).draw();

    }
    $('input.global_filters').on('keyup click', function () {
        filterGlobal();
    });

 
    // FUNCTION AJAX

    /*async function getall() {
        var loadLydo = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadLydo',
            data: { LDT_ID: 'N' },
            success: function (res) {

                return res.data
            }});
        var loadShowRoom = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadShowRoom',
            success: function (res) {

                return res.data
            }
        });

        var LoadKho = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadKho',
            success: function (res) {

                return res.data
            }}); 
        var LoadCA = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadCA',
            success: function (res) {

                return res.data
            }});
        var LoadTienTe = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadTienTe',
            success: function (res) {

                return res.data
            }
        });

        let dataGetAll = {};
        $.when(loadLydo, loadShowRoom, LoadCA, LoadKho, LoadTienTe).done(function (r1, r2, r3, r4, r5) {
            
             dataGetAll.lydo = r1;
             dataGetAll.showroom = r2;
             dataGetAll.ca = r3;
             dataGetAll.kho = r4;
             dataGetAll.tiente = r5;
         })
        return dataGetAll;

        
    }
     */
     function loadLydo() {
        return  $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadLydo',
            data: { LDT_ID: 'N' },
            success: function (res) {

                return res.data
            }

        })
     } 
     function loadShowRoom() {
         return $.ajax({
             type: 'GET',
            url: '/MuaHang/LoadShowRoom',
            success: function (res) {

                return res.data
            }

        })
    }
     function LoadKho() {
        return  $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadKho',
            success: function (res) {

                return res.data
            }

        })
    }
     function LoadCA() {
        return  $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadCA',
            success: function (res) {

                return res.data
            }

        })
    }
     function LoadTienTe() {
        return  $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadTienTe',
            success: function (res) {

                return res.data
            }

        })
    }

    async function LoadMuaDonDetail(MDID) {
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaDonDetail',
            data: { muadonID: MDID } ,
            success: function (res) { 
                return res.data
            }
        })
    }
    async function LoadMuaCTDon(MDID) {
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaCTDon',
            data: { muadonID: MDID },
            success: function (res) { 
                return res.data
            }
        })
    }


    async function loadMatHangbyMHID(MHID) {
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/loadMatHangbyMHID',
            data: { mathangID: MHID },
            success: function (res) {
             
                return res.data
            }
        })
    }



})


