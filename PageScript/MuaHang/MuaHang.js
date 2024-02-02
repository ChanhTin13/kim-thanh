

$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
var nvcode = $('.wrapper').attr('data-user-code')
if (nvcode.length > 0) {
    $('.default-form select[name="nv-username"]').val(nvcode).trigger('change').prop("disabled", true);
    $('.default-form select[name="nv-name"]').val(nvcode).trigger('change').prop("disabled", true);
    $('#button-danh-sach-nv').attr('data-target', ' ');
}
$(document).ready(function () {

    // Actor Thành Anh Thêm search header 23/02/2021
    //Search Header Bang Chi Tiet Phieu
    $('#tbl_ctphieu thead tr').clone(true).appendTo('#tbl_ctphieu thead');
    $('#tbl_ctphieu thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i != 0 && i != 3 && i != 4 && i != 7 && i != 9 && i != 10 && i != 17 && i != 18)
            $(this).html('<input type="text" style="width:100%" id="txt-header-' + i + '" placeholder="Search ' + title + '" />');

        $('input', this).on('keyup change', function () {
            if (tbl_ctphieu.column(i).search() !== this.value) {
                tbl_ctphieu
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });
    });
    //end

    //Search Header Bang Hang
    $('#tbl_donmuahang thead tr').clone(true).appendTo('#tbl_donmuahang thead');
    $('#tbl_donmuahang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 4 || i == 5 || i == 16) {
            $(this).html('<input class="datepicker datetimepicker date-only" id="txt-dsbh-header-' + i + '" placeholder="Search ' + title + '" />');
            InitDatetime();
        }
        else if (i == 2) {
            $(this).html('<select id="txt-dsbh-header-' + i + '"><option value ="2">Tất cả</option> <option value ="1">Đã chuyển</option> <option value ="0">Chưa chuyển</option> </select>');
        }
        else if (i == 14) {
            $(this).html('<select id="txt-dsbh-header-' + i + '"><option value ="2">Tất cả</option> <option value ="1">Đã duyệt</option> <option value ="0">Chưa duyệt</option> </select>');
        }
        else if (i != 0 && i != 1) {
            $(this).html('<input type="text"  id="txt-dsbh-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tbl_donmuahang.column(i).search() !== this.value) {
                tbDonMuahang_filterValues.search2 = $('#txt-dsbh-header-2').val();
                tbDonMuahang_filterValues.search3 = $('#txt-dsbh-header-3').val();
                tbDonMuahang_filterValues.search4 = $('#txt-dsbh-header-4').val();
                tbDonMuahang_filterValues.search5 = $('#txt-dsbh-header-5').val();
                tbDonMuahang_filterValues.search6 = $('#txt-dsbh-header-6').val();
                tbDonMuahang_filterValues.search7 = $('#txt-dsbh-header-7').val();
                tbDonMuahang_filterValues.search8 = $('#txt-dsbh-header-8').val();
                tbDonMuahang_filterValues.search9 = $('#txt-dsbh-header-9').val().replace(/\./g, "");
                tbDonMuahang_filterValues.search11 = $('#txt-dsbh-header-11').val();
                tbDonMuahang_filterValues.search12 = $('#txt-dsbh-header-12').val();
                tbDonMuahang_filterValues.search13 = $('#txt-dsbh-header-13').val();
                tbDonMuahang_filterValues.search14 = $('#txt-dsbh-header-14').val();
                tbDonMuahang_filterValues.search15 = $('#txt-dsbh-header-15').val();
                tbDonMuahang_filterValues.search16 = $('#txt-dsbh-header-16').val();
                tbDonMuahang_filterValues.search17 = $('#txt-dsbh-header-17').val();
                tbDonMuahang_filterValues.search18 = $('#txt-dsbh-header-18').val();
                tbl_donmuahang
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });
    //end

    var KhoList = []
    var Changtab_onshow = 0;


    //#region PAGE ĐƠN MUA HÀNG

    // select Date
    $('select[name="search-by-date"]').on('change', function () {

        var curr = new Date();
        var a = $(this).val()
        if (a === '') {
            $('input[name="chooseDate_Form"]').val(date)
            $('input[name="chooseDate_To"]').val(date)
            pagesearch();
        } else if (a === 'yesterday') {

            var days = curr.getDate() - 1;
            console.log(curr.getDate())
            var yesterday = new Date(curr.setDate(days)).toUTCString()
            var date = moment(yesterday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(date)
            $('input[name="chooseDate_To"]').val(date)
            pagesearch();

        } else if (a === 'now') {

            var date = moment(yesterday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(date)
            $('input[name="chooseDate_To"]').val(date)
            pagesearch();
        } else if (a === 'now-week') {

            var first = curr.getDate() - curr.getDay()
            var last = first + 6
            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
            var dateFirst = moment(firstday).format('DD/MM/yyyy')
            var dateLast = moment(lastday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(dateFirst)
            $('input[name="chooseDate_To"]').val(dateLast)
            pagesearch();
        }
        else if (a === 'last-week') {

            var lastweekday = curr.getDate() - 7
            var first = lastweekday - curr.getDay()
            var last = first + 6
            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
            var dateFirst = moment(firstday).format('DD/MM/yyyy')
            var dateLast = moment(lastday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(dateFirst)
            $('input[name="chooseDate_To"]').val(dateLast)
            pagesearch();
        }
        else if (a === 'now-month') {
            var as = daysInMonth(Number(curr.getMonth() + 1), curr.getFullYear())
            var first = curr.getDate() - curr.getDate() + 1
            var last = as

            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
            var dateFirst = moment(firstday).format('DD/MM/yyyy')
            var dateLast = moment(lastday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(dateFirst)
            $('input[name="chooseDate_To"]').val(dateLast)
            pagesearch();

        } else if (a === 'last-month') {
            var lastmonth = curr.getMonth()
            var as = daysInMonth(lastmonth, curr.getFullYear())
            var last = as
            var first = curr.getDate() - curr.getDate() + 1


            var month = new Date(curr.setMonth(lastmonth)).toUTCString();

            var firstday = new Date(month.setDate(first)).toUTCString();
            var lastday = new Date(month.setDate(last)).toUTCString();

            var dateFirst = moment(firstday).format('DD/MM/yyyy')
            var dateLast = moment(lastday).format('DD/MM/yyyy')
            $('input[name="chooseDate_Form"]').val(dateFirst)
            $('input[name="chooseDate_To"]').val(dateLast)
            pagesearch();

        }
    })
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    //#region  Khởi tạo các Table


    // Tab / Bảng đơn mua hàng
    var selectedId = null;
    var muahang_index = 0;

    var tbDonMuahang_filterValues = {};
    tbDonMuahang_filterValues.statusDraw = 1;
    var tbl_donmuahang = $('#tbl_donmuahang').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        orderCellsTop: true,
        ajax: function (data, callback, setting) {
            if (data.draw > 1) {
                tbDonMuahang_filterValues.draw = data.draw;
                tbDonMuahang_filterValues.start = data.start;
                tbDonMuahang_filterValues.length = data.length;
                tbDonMuahang_filterValues.order = data.order[0].column;
                tbDonMuahang_filterValues.dir = data.order[0].dir;
                tbDonMuahang_filterValues.search = data.search["value"];
                tbDonMuahang_filterValues.export = 0;
            } else {
                tbDonMuahang_filterValues.draw = data.draw;
                tbDonMuahang_filterValues.start = data.start;
                tbDonMuahang_filterValues.length = data.length;
                tbDonMuahang_filterValues.order = data.order[0].column;
                tbDonMuahang_filterValues.dir = data.order[0].dir;
                tbDonMuahang_filterValues.status = $('#status').val();
                tbDonMuahang_filterValues.from = $('input[name="chooseDate_Form"]').val();
                tbDonMuahang_filterValues.to = $('input[name="chooseDate_To"]').val();
                tbDonMuahang_filterValues.search = data.search["value"];
                tbDonMuahang_filterValues.export = 0;
                tbDonMuahang_filterValues.search2 = $('#txt-dsbh-header-2').val();
                tbDonMuahang_filterValues.search3 = $('#txt-dsbh-header-3').val();
                tbDonMuahang_filterValues.search4 = $('#txt-dsbh-header-4').val();
                tbDonMuahang_filterValues.search5 = $('#txt-dsbh-header-5').val();
                tbDonMuahang_filterValues.search6 = $('#txt-dsbh-header-6').val();
                tbDonMuahang_filterValues.search7 = $('#txt-dsbh-header-7').val();
                tbDonMuahang_filterValues.search8 = $('#txt-dsbh-header-8').val();
                tbDonMuahang_filterValues.search9 = $('#txt-dsbh-header-9').val().replace(/\./g, "");
                tbDonMuahang_filterValues.search11 = $('#txt-dsbh-header-11').val();
                tbDonMuahang_filterValues.search12 = $('#txt-dsbh-header-12').val();
                tbDonMuahang_filterValues.search13 = $('#txt-dsbh-header-13').val();
                tbDonMuahang_filterValues.search14 = $('#txt-dsbh-header-14').val();
                tbDonMuahang_filterValues.search15 = $('#txt-dsbh-header-15').val();
                tbDonMuahang_filterValues.search16 = $('#txt-dsbh-header-16').val();
                tbDonMuahang_filterValues.search17 = $('#txt-dsbh-header-17').val();
                tbDonMuahang_filterValues.search18 = $('#txt-dsbh-header-18').val();
            }


            var xhr
            abc()
            function abc() {
                if (xhr && xhr.readyState != 4) {
                    xhr.abort()

                }
                xhr = $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadJsonDonMuaHang',
                    data: tbDonMuahang_filterValues,
                    success: function (res) {

                    },

                }).done(callback, () => {
                    html: true;

                });
            }


        },
        columns: [
            {
                "targets": 0,
                "className": "text-center",
                "data": 'RowIndex',
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

                        $(td).html('Đang thực hiện')

                    } else if ($(td).html() === '1') {

                        $(td).html('Bị hủy')

                    } else if ($(td).html() === '2') {

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
                        $(td).html(d.format("DD/MM/YYYY hh:mm:ss"));
                    }

                }

            },
            {
                "targets": 6,
                "className": "",
                "data": "KHTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-khten')
                },

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
                "className": " ",
                "data": "NVTEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-nvten')
                },

            },
            {
                "targets": 9,
                "className": "text-right",
                "data": "TONGTIEN",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tongtien')
                    var x = Math.floor($(td).html());
                    $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
                }
            },
            {
                "targets": 10,
                "className": "",
                "visible": false,
                "data": "HANTHANHTOANstr",
                "createdCell": function (td) {
                    $(td).css({ "background-color": "red", "color": "white" });
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
                    $(td).attr('title', $(td).find('span').html())
                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text" style="width: 200px" title="' + data + '">' + data + '</span>';
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

            if (data.STATUS === 0) {

                $(nRow).find('td:eq(0)').css({ "background-color": "yellow" });

            } else if (data.STATUS === 1) {
                $(nRow).find('td:eq(0)').css({ "background-color": "red", "color": "white", });

            } else if (data.STATUS === 2) {
                $(nRow).find('td:eq(0)').css({ 'background-color': 'gray', "color": "white", });
            }
            $(nRow).attr('data-id', data.MDID);
            $(nRow).attr('data-kh', data.KHCODE);
            $(nRow).attr('data-index', iDataIndex);


            if (selectedId === data.MDID) {
                muahang_index = iDataIndex

            }

        },
        drawCallback: function () {
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


            if (data.length > 0) {
                var tongtienz = Math.round(data[0].TongtienAll)
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(9).footer()).html(tongtienz.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(9).footer()).html(0).addClass('text-right');
            }

        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: true,
        pageLength: 5,
        lengthChange: false
    }); //tbl1

    $(tbl_donmuahang.table().container()).on('change', 'thead select', function () {
        tbDonMuahang_filterValues.search2 = $('#txt-dsbh-header-2').val();
        tbDonMuahang_filterValues.search14 = $('#txt-dsbh-header-14').val();
        tbl_donmuahang.draw();
    });

    //Search Header Bang Hang
    $('#tbl-dieu-phoi-don-hang-mh thead tr').clone(true).appendTo('#tbl-dieu-phoi-don-hang-mh thead');
    $('#tbl-dieu-phoi-don-hang-mh thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 14) {
            $(this).html('<input class="datepicker datetimepicker date-only" id="txt-dsdp-header-' + i + '" placeholder="Search ' + title + '" />');
            InitDatetime();
        }
        else if (i != 0 && i != 1 && i != 2 && i != 4 && i != 5 && i != 8 && i != 12 && i != 13 && i != 19 && i != 20 && i != 21 && i != 22 && i != 23 && i != 24 && i != 25 && i != 26) {
            $(this).html('<input type="text"  id="txt-dsdp-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        $('input', this).on('keyup change', delay(function () {
            if (tblMuaHangDP.column(i).search() !== this.value) {
                tblMuaHangDP_filterValues.sophieu = $('#txt-dsdp-header-3').val();
                tblMuaHangDP_filterValues.tenkhachhang = $('#txt-dsdp-header-6').val();
                tblMuaHangDP_filterValues.makhachhang = $('#txt-dsdp-header-7').val();
                tblMuaHangDP_filterValues.tennhanvien = $('#txt-dsdp-header-9').val();
                tblMuaHangDP_filterValues.ghichu = $('#txt-dsdp-header-10').val();
                tblMuaHangDP_filterValues.nguoitao = $('#txt-dsdp-header-11').val();
                tblMuaHangDP_filterValues.ngaynhanhang = $('#txt-dsdp-header-14').val();
                tblMuaHangDP_filterValues.guitu = $('#txt-dsdp-header-15').val();
                tblMuaHangDP_filterValues.guiden = $('#txt-dsdp-header-16').val();
                tblMuaHangDP_filterValues.mahang = $('#txt-dsdp-header-17').val();
                tblMuaHangDP_filterValues.tenhang = $('#txt-dsdp-header-18').val();
                tblMuaHangDP
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end


    // Tab / Bảng điều phối hàng hóa 
    let tblMuaHangDP_filterValues = {};
    var dieuphoistatus = 0;
    var tblMuaHangDP = $('#tbl-dieu-phoi-don-hang-mh').DataTable({
        serverSide: true,
        orderCellsTop: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (dieuphoistatus > 0) {
                if (data.draw > 1) {
                    tblMuaHangDP_filterValues.draw = data.draw;
                    tblMuaHangDP_filterValues.search = data.search["value"];
                    tblMuaHangDP_filterValues.start = data.start;
                    tblMuaHangDP_filterValues.length = data.length;
                    tblMuaHangDP_filterValues.order = data.order[0].column;
                    tblMuaHangDP_filterValues.dir = data.order[0].dir;
                    tblMuaHangDP_filterValues.export = 0;
                } else {
                    tblMuaHangDP_filterValues.export = 0;
                    tblMuaHangDP_filterValues.draw = data.draw;
                    tblMuaHangDP_filterValues.search = data.search["value"];
                    tblMuaHangDP_filterValues.start = data.start;
                    tblMuaHangDP_filterValues.length = data.length;
                    tblMuaHangDP_filterValues.order = data.order[0].column;
                    tblMuaHangDP_filterValues.dir = data.order[0].dir;
                    tblMuaHangDP_filterValues.status = $('#status').val();
                    tblMuaHangDP_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
                    tblMuaHangDP_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
                }


                $.ajax({
                    url: '/MuaHang/DieuPhoiDonHang',
                    method: 'GET',
                    data: tblMuaHangDP_filterValues,
                    success: function (msg) {
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        } else if (msg.status == 3) {
                            if (tblMuaHangDP_filterValues.draw != 1) {
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
                    },
                }).done(callback, () => {
                    console.log('done');
                });
                if (dieuphoistatus > 0) {

                }
            }

        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MDID);
            if (data.STATUS === 0) {

                $(nRow).find('td:nth-child(1)').css({ "background": "yellow" });

            } else if (data.STATUS === 1) {
                $(nRow).find('td:nth-child(1)').css({ "background": "red", "color": "white", });

            } else if (data.STATUS === 2) {
                $(nRow).find('td:nth-child(1)').css({ "background": "gray" });
            }
        },
        columns: [
            { data: "RowIndex" },
            { data: "STATUS" },
            {
                data: "SHIPPED", "className": 'text-center',
            },
            { data: "MDCODE" },
            { data: "NGAYHDString" },
            { data: "SUBMITEDDATEString" },
            { data: "KHTEN", },
            { data: "KHCODE" },
            { data: "DIENTHOAI" },
            { data: "NVTEN" },
            { data: "DIENGIAI" },
            { data: "USERID" },
            {
                data: "Duyet", "className": 'text-center',
            },
            { data: "APPROVEDBY" },
            { data: "EXPECTEDDATEString" },
            { data: "TENSR1" },
            { data: "TENSR2" },
            { data: "MHCODE" },
            { data: "MHTEN" },
            {
                data: "SOLUONG",
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "DONGIA",
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "THANHTIEN",
                render: function (data, type, full, meta) {
                    var TONGTIEN = Math.round(data);
                    return TONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: null,
                defaultContent: "Chưa có"
            },
            {
                data: null,
                defaultContent: "Chưa có"
            },
            {
                data: null,
                defaultContent: "Chưa có"
            },
            {
                data: null,
                defaultContent: '<input type="CheckBox"/>'
            },
            {
                data: "LYDOIDString"
            }
        ],
        columnDefs: [
            {
                "targets": [1, 2, 8, 11, 12, 15, 16, 22, 23, 24, 25, 26],
                "orderable": false
            },
            {
                "targets": 1,
                'className': 'text-center',
                render: function (data, type, row) {
                    if (data === 2) {
                        return 'Đã hoàn tất';
                    }
                    else if (data === 1) {
                        return 'Bị hủy';
                    }
                    else {
                        return 'Đang thực hiện';
                    }
                    return data;
                }
            },
            {
                "targets": 2,
                'className': 'text-center',
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input  type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                    return data;
                }
            },
            {
                "targets": 12,
                'className': 'text-center',
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                }
            }
        ],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(3).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(19).footer()).html(data[0].TONGSOLUONG.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(20).footer()).html(Math.round(data[0].TONGDONGIA).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(21).footer()).html(Math.round(data[0].TONGTIENALL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(19).footer()).html(0);
                $(api.column(20).footer()).html(0);
                $(api.column(21).footer()).html(0);
            }

        }
    }); //tbl2


    // Tab Chuyển kho - chia hàng

    // Bảng pivot kho

    var tbl_pivot_theokho_filter = {}
    var ck_ch_status = 0
    var tbl_pivot_theokho = $('#table-pivot-theokho').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (ck_ch_status > 0) {
                if (data.draw > 1) {
                    tbl_pivot_theokho_filter.draw = data.draw;
                    tbl_pivot_theokho_filter.search = data.search["value"];
                    tbl_pivot_theokho_filter.start = data.start;
                    tbl_pivot_theokho_filter.length = data.length;
                    tbl_pivot_theokho_filter.order = data.order[0].column;
                    tbl_pivot_theokho_filter.dir = data.order[0].dir;
                } else {
                    tbl_pivot_theokho_filter.draw = data.draw;
                    tbl_pivot_theokho_filter.search = data.search["value"];
                    tbl_pivot_theokho_filter.start = data.start;
                    tbl_pivot_theokho_filter.length = data.length;
                    tbl_pivot_theokho_filter.order = data.order[0].column;
                    tbl_pivot_theokho_filter.dir = data.order[0].dir;
                    tbl_pivot_theokho_filter.status = $('#status').val();
                    tbl_pivot_theokho_filter.from = $('input[name="chooseDate_From"]').val();
                    tbl_pivot_theokho_filter.to = $('input[name="chooseDate_To"]').val();
                }


                $.ajax({
                    url: '/MuaHang/LoadCK_CH',
                    method: 'GET',
                    data: tbl_pivot_theokho_filter,
                    success: function (msg) {


                    },
                }).done(callback, () => {
                    console.log('done');
                });
            }


        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MDID);

        },
        columns: [
            { data: "RowIndex" },
            { data: "MHCODE" },
            { data: "MHTEN" },
            {
                data: 'MHTEN',


            }
        ],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10,
        },
    });

    // Bảng nguồn dữ liệu
    var tbl_nguon_dulieu_filter = {}
    var tbl_nguon_dulieu_status = 0
    var tbl_nguon_dulieu = $('#table-nguon-dulieu').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (tbl_nguon_dulieu_status > 0) {
                if (data.draw > 1) {
                    tbl_nguon_dulieu_filter.draw = data.draw;
                    tbl_nguon_dulieu_filter.export = 0;
                    tbl_nguon_dulieu_filter.search = data.search["value"];
                    tbl_nguon_dulieu_filter.start = data.start;
                    tbl_nguon_dulieu_filter.length = data.length;
                    tbl_nguon_dulieu_filter.order = data.order[0].column;
                    tbl_nguon_dulieu_filter.dir = data.order[0].dir;
                } else {
                    tbl_nguon_dulieu_filter.export = 0;
                    tbl_nguon_dulieu_filter.draw = data.draw;
                    tbl_nguon_dulieu_filter.search = data.search["value"];
                    tbl_nguon_dulieu_filter.start = data.start;
                    tbl_nguon_dulieu_filter.length = data.length;
                    tbl_nguon_dulieu_filter.order = data.order[0].column;
                    tbl_nguon_dulieu_filter.dir = data.order[0].dir;
                    tbl_nguon_dulieu_filter.status = $('#status').val();
                    tbl_nguon_dulieu_filter.FromDate = $('input[name="chooseDate_From"]').val();
                    tbl_nguon_dulieu_filter.ToDate = $('input[name="chooseDate_To"]').val();
                }


                $.ajax({
                    url: '/MuaHang/DieuPhoiDonHang',
                    method: 'GET',
                    data: tbl_nguon_dulieu_filter,
                    success: function (msg) {
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                        } else if (msg.status == 3) {
                            if (tbl_nguon_dulieu_filter.draw != 1) {
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
                    },
                }).done(callback, () => {
                    console.log('done');
                });
                if (dieuphoistatus > 0) {

                }
            }

        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MDID);
            if (data.STATUS === 0) {

                $(nRow).find('td:nth-child(1)').css({ "background": "yellow" });

            } else if (data.STATUS === 1) {
                $(nRow).find('td:nth-child(1)').css({ "background": "red", "color": "white", });

            } else if (data.STATUS === 2) {
                $(nRow).find('td:nth-child(1)').css({ "background": "gray" });
            }
        },
        columns: [
            { data: "RowIndex" },
            { data: "MDCODE" },
            { data: "NGAYHDString" },
            { data: "MHCODE" },
            { data: "MHTEN" },
            //
            {
                data: "SOLUONG",
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "DONGIA",
                render: function (data, type, full, meta) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "THANHTIEN",
                render: function (data, type, full, meta) {
                    var TONGTIEN = Math.round(data);
                    return TONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            { data: "NVTEN" },
            { data: "KHTEN", },
            //
            { data: "EXPECTEDDATEString" },
            {
                data: "SHIPPED"
            },
            { data: "STATUS" },
            { data: "TENSR1" },
            { data: "TENSR2" },
            //
            { data: "USERID" },
            { data: "SUBMITEDDATEString" },
            { data: "Duyet" },
            { data: "APPROVEDBY" },
            { data: "DIENGIAI" },
            //
            {
                data: '',
                defaultContent: "Chưa có"
            },
            {
                data: '',
                defaultContent: "Chưa có"
            }

        ],
        columnDefs: [
            /* {
                 "targets": [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 22, 23, 24, 25, 26],
                 "orderable": false
             },*/
            {
                "targets": 13,
                render: function (data, type, row) {
                    if (data === 2) {
                        return 'Đã hoàn tất';
                    }
                    else if (data === 1) {
                        return 'Bị hủy';
                    }
                    else {
                        return 'Đang thực hiện';
                    }
                    return data;
                }
            },
            {
                "targets": 12,
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                    return data;
                }
            },
            {
                "targets": 18,
                render: function (data, type, row) {
                    if (data === true) {
                        return '<input type="checkbox" checked>';
                    }
                    else {
                        return '<input type="checkbox">';
                    }
                }
            }
        ],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10,
        },
        "footerCallback": function (row, data, start, end, display) {

        }
    }); //tbl2

    //#endregion


    //#region  Sự kiện khi mở tab
    // timeout for table đơn hàng
    function tbl_donmuahang_timeout() {
        setTimeout(function () {
            tbDonMuahang_filterValues.statusDraw++
            console.log(tbDonMuahang_filterValues.statusDraw)
            tbl_donmuahang.columns.adjust().draw()
        }, 500)
    }


    $('#home-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        Changtab_onshow = 0
    })

    // timeout for table điều phối
    function tblMuaHangDP_timeout() {
        setTimeout(function () {
            dieuphoistatus++;
            tblMuaHangDP.columns.adjust().draw()

        }, 500)
    }
    $('#profile-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        Changtab_onshow = 1
        if (dieuphoistatus < 1 || tblMuaHangDP_filterValues.draw < 2) {
            tblMuaHangDP_timeout()
        }


    })


    // timeount for table chuyển kho -  chia hàng
    function tbl_pivot_theokho_timeout() {
        setTimeout(function () {
            ck_ch_status++;
            tbl_pivot_theokho.columns.adjust().draw()
        }, 500)
    }

    $('#contact-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        Changtab_onshow = 2;
        if (ck_ch_status < 1) {
            tbl_pivot_theokho_timeout()
        }
    })

    $('#a-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        Changtab_onshow = 2;
    })

    function tbl_nguon_dulieu_timeout() {
        setTimeout(function () {
            tbl_nguon_dulieu_status++;
            tbl_nguon_dulieu.columns.adjust().draw()

        }, 500)
    }
    $('#b-tab[data-toggle="tab"]').on('show.bs.tab', function () {
        Changtab_onshow = 3;
        console.log('dsajfdas')
        if (tbl_nguon_dulieu_status < 1 || tbl_nguon_dulieu_filter.draw < 2) {
            tbl_nguon_dulieu_timeout()
        }
    })
    //#endregion


    //#region Filter cho các bảng các tab

    $('#btn-search').on('click', function () {
        pagesearch()
    });

    function pagesearch() {


        if (Changtab_onshow == 0) {
            tbDonMuahang_filterValues.status = $('#status').val();
            tbDonMuahang_filterValues.from = $('input[name="chooseDate_Form"]').val();
            tbDonMuahang_filterValues.to = $('input[name="chooseDate_To"]').val();
            tbl_donmuahang.draw();
        } else if (Changtab_onshow == 1) {
            tblMuaHangDP_filterValues.status = $('#status').val();
            tblMuaHangDP_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
            tblMuaHangDP_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
            tblMuaHangDP.draw()

        }
        else if (Changtab_onshow == 2) {
            tbl_pivot_theokho_filter.status = $('#status').val();
            tbl_pivot_theokho_filter.from = $('input[name="chooseDate_From"]').val();
            tbl_pivot_theokho_filter.to = $('input[name="chooseDate_To"]').val();
            tbl_pivot_theokho.draw()

        }
        else if (Changtab_onshow == 3) {
            tbl_nguon_dulieu_filter.status = $('#status').val();
            tbl_nguon_dulieu_filter.FromDate = $('input[name="chooseDate_From"]').val();
            tbl_nguon_dulieu_filter.ToDate = $('input[name="chooseDate_To"]').val();
            tbl_nguon_dulieu.draw()

        }

    }
    //#endregion


    //#endregion 

    //---------------------------------------

    //#region --------------- Event bảng Đơn Mua Hàng------------------------

    // click vào table mua đơn
    $('#tbl_donmuahang tbody').on('click', 'tr', function () {
        var data = tbl_donmuahang.row($(this).index()).data();
        if (data != null && data != undefined) {
            tbl_donmuahang.row($(this).index()).select()
            $('#tbl_donmuahang tbody tr').not(this).removeClass('selected');
        }

    })
    $('.default-form input[name="han-thanhtoan"]').val(moment(new Date()).format('DD/MM/yyyy'))
    // dbllick vao table mua đơn
    $('#tbl_donmuahang  tbody').on('dblclick', 'tr', function () {
        $('.muahang-status').removeClass('disabled-nhap-kho')
        //RESET ĐỐI TƯỢNG 
        var data = tbl_donmuahang.row($(this).index()).data();
        if (data != null && data != undefined) {
            $('#btn-duyet-phieu').removeAttr('hidden')
            $('#btn-huy-phieu').removeAttr('hidden')
            $('#btn-muactdon-nhap').addClass('disabled-nhap-kho')
            $('#btn-muactdon-print').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-export').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-print').removeClass('disabled-nhap-kho')
            $(this).addClass('selected');
            $('#tbl_donmuahang tbody tr').not(this).removeClass('selected');
            tienhang = 0;
            tongthue = 0;
            tongchietkhau = 0;
            tongtien = 0;

            tbl_ctphieu.clear().columns.adjust().draw();

            $('#them-order').modal();
            loadDataAllMuaDon(data.MDID).then((of) => {
                if (of.chitiet.data.length > 0) {
                    dataMuaDon = of.chitiet.data

                    $('.default-form select[name="kh-code"]').val(of.chitiet.data[0].KHCODE).trigger('change');
                    $('.default-form select[name="kh-name"]').val(of.chitiet.data[0].KHCODE).trigger('change');

                    $('select[name="nv-username"]').val(of.chitiet.data[0].NVCODE).trigger('change');
                    $('select[name="nv-name"]').val(of.chitiet.data[0].NVCODE).trigger('change');

                    $('.default-form input[name="so-hoadon"]').val(of.chitiet.data[0].MDCODE)

                    if (of.chitiet.data[0].SUBMITEDDATE != null) {
                        $('.default-form input[name="ngay-lapphieu"]').val(moment(of.chitiet.data[0].SUBMITEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].EXPECTEDDATE != null) {
                        $('.default-form input[name="ngay-nhanhang"]').val(moment(of.chitiet.data[0].EXPECTEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].HANTHANHTOAN != null) {
                        $('.default-form input[name="han-thanhtoan"]').val(moment(of.chitiet.data[0].HANTHANHTOAN).format('DD/MM/yyyy'))
                    }



                    $('#statusCT').val(of.chitiet.data[0].STATUS)
                    $('#lydo').val(of.chitiet.data[0].LDNID)
                    $('#showroom').val(of.chitiet.data[0].SRIDTO)
                    $('#tiente').val(of.chitiet.data[0].TIENTEID)
                    $('#ca').val(of.chitiet.data[0].CAID)
                    // $('select[name="khos"]').val(of.chitiet.data[0].SRIDFROM)


                    // load ti gia 
                    // checkbox status
                    if (of.chitiet.data[0].STATUS === '0') {
                        $('#statusCT').val('-1')
                    }
                    // check box shipped
                    if (of.chitiet.data[0].SHIPPED) {

                        $('#shipped').attr("checked", "checked");
                    }
                    $('#ghi-chu').val(of.chitiet.data[0].DIENGIAI)
                }

                if (of.list_chitiet.data.length > 0) {

                    dataTemp = of.list_chitiet.data;
                    var b = []
                    var c = 0
                    KhoList.map((e) => {
                        b.push(e.KHOID)
                    })
                    if (dataTemp.length > 0) {
                        dataTemp.map((e) => {

                            var a = b.includes(e.KHOID)
                            if (a === true) {
                                c++
                            }
                        })
                    }
                    if (c < dataTemp.length) {
                        tbl_ctphieu.columns(3).visible(true)
                        tbl_ctphieu.columns(4).visible(false)
                        $('.muahang-status').addClass('disabled-nhap-kho')
                    } else {
                        tbl_ctphieu.columns(4).visible(true)
                        tbl_ctphieu.columns(3).visible(false)
                        $('.muahang-status').removeClass('disabled-nhap-kho')
                    }
                    $('select[name="khos"]').val(of.list_chitiet.data[0].KHOID)
                    if ($('select[name="khos"]').val() == null) {
                        $('select[name="khos"]').val($('select[name="khos"] option:eq(0)').val())
                    }
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();

                }
            })
        }

    });

    // click  table mua chi tiết đơn
    $('#tbl_ctphieu tbody').on('click', 'tr', function () {
        tbl_ctphieu.row($(this).index()).select();
        $('#tbl_ctphieu tbody tr').not(this).removeClass('selected');

    })
    // xử lý nút insert muadon
    $('#btn-muadon-insert').on('click', function () {

        $('#btn-duyet-phieu').attr('hidden', 'hidden')
        $('#btn-huy-phieu').attr('hidden', 'hidden')
        $('.muahang-status').removeClass('disabled-nhap-kho')
        $('#btn-muactdon-nhap').removeClass('disabled-nhap-kho')
        $('#btn-muactdon-export').addClass('disabled-nhap-kho')
        $('#btn-muactdon-print').addClass('disabled-nhap-kho')
        if (statusGetAll === 0) {
            statusGetAll++
            getall(statusGetAll).then((ga) => {
                ga.showroom.data.map((value) => {
                    $('#showroom').append($('<option>', {
                        value: value.SRID,
                        text: value.TEN,
                    }))
                })
                ga.tiente.data.map((value) => {
                    if (value.TTCODE === "USD") {
                        /*  $('#tiente').append($('<option>', {
                              value: value.TTID,
                              text: value.TTCODE,
                          }))*/

                        $('#tiente').append(`<option selected value="` + value.TTID + `">` + value.TTCODE + `</option>`)
                        $('input[name="tigia"]').attr('placeholder', Math.round(value.TIGIA))
                    }

                })


                ga.ca.data.map((value) => {
                    $('#ca').append($('<option>', {
                        value: value.CID,
                        text: value.CTEN,
                    }))

                })

                ga.lydo.data.map((value) => {
                    if (value.CODE === "NNCC") {
                        $('#lydo').append(`<option value="` + value.LDNID + `" selected>` + value.CODE + ` | ` + value.TEN + `</option>`)
                    }
                    else {
                        $('#lydo').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                    }
                })

                ga.lydox.data.map((value) => {
                    $('#lydox').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                })

                ga.kho.data.map((value) => {
                    KhoList.push({ KHOID: value.KHID, KHOCODE: value.KHCODE })
                    $('select[name="khos"]').append(`<option value="` + value.KHID + `">` + value.KHCODE + `</option>`)
                })


                $('.default-form input[name="ngay-lapphieu"]').val(moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="ngay-nhanhang"]').attr('placeholder', moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="han-thanhtoan"]').attr('placeholder', moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="han-thanhtoan"]').val(moment(new Date()).format('DD/MM/yyyy'))
            })

        }
        $('#showroom').val(SRIDPresent);
        $('.default-form input[name="ngay-lapphieu"]').val(moment(new Date()).format('DD/MM/yyyy'))
        $('#statusCT').val(0)
        // nhân viên mặc định
        $('.default-form select[name="nv-username"]').val(nvcode).trigger('change');
        $('.default-form select[name="nv-name"]').val(nvcode).trigger('change');
        //

        CheckMDCode().then((e) => {
            if (e != undefined) {
                $('input[name="so-hoadon"]').val(e.mdcode)
                dataInsert.MDCODE = e.mdcode
            }
        })
    })
    async function CheckMDCode() {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MuaHang/CheckMDCode',
            success: function (msg) {
                if (msg.rs == false) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Phiên đăng nhập đã hết hạn',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
                return msg;
            },
        });
    };

    var SRIDPresent = null;
    ShowRommPresent().then((e) => {
        if (e != undefined) {

            SRIDPresent = e.ShowRoomPresent;
        }
    })
    async function ShowRommPresent() {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MuaHang/ShowRoomPresent',
            success: function (msg) {
                return msg;
            },
        });
    };

    // xử lý nút update muadon + chitiet
    $('#btn-muadon-update').on('click', function () {
        $('.muahang-status').removeClass('disabled-nhap-kho')
        console.log('update')
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index');
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để sửa',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            var dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');
            $('#btn-duyet-phieu').removeAttr('hidden')
            $('#btn-huy-phieu').removeAttr('hidden')
            $('#btn-muactdon-print').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-export').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-nhap').addClass('disabled-nhap-kho')
            $('#them-order').modal();
            loadDataAllMuaDon(dataid).then((of) => {
                if (of.chitiet.data.length > 0) {
                    dataMuaDon = of.chitiet.data
                    $('.default-form select[name="kh-code"]').val(of.chitiet.data[0].KHCODE).trigger('change');
                    $('.default-form select[name="kh-name"]').val(of.chitiet.data[0].KHCODE).trigger('change');

                    $('.default-form select[name="nv-username"]').val(of.chitiet.data[0].NVCODE).trigger('change');
                    $('.default-form select[name="nv-name"]').val(of.chitiet.data[0].NVCODE).trigger('change');

                    $('.default-form input[name="so-hoadon"]').val(of.chitiet.data[0].MDCODE)

                    if (of.chitiet.data[0].SUBMITEDDATE != null) {
                        $('.default-form input[name="ngay-lapphieu"]').val(moment(of.chitiet.data[0].SUBMITEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].EXPECTEDDATE != null) {
                        $('.default-form input[name="ngay-nhanhang"]').val(moment(of.chitiet.data[0].EXPECTEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].HANTHANHTOAN != null) {
                        $('.default-form input[name="han-thanhtoan"]').val(moment(of.chitiet.data[0].HANTHANHTOAN).format('DD/MM/yyyy'))
                    }



                    $('#statusCT').val(of.chitiet.data[0].STATUS)
                    $('#lydo').val(of.chitiet.data[0].LDNID)
                    $('#showroom').val(of.chitiet.data[0].SRIDTO)
                    $('#tiente').val(of.chitiet.data[0].TIENTEID)
                    $('#ca').val(of.chitiet.data[0].CAID)
                    // $('select[name="khos"]').val(of.chitiet.data[0].SRIDFROM)


                    // load ti gia 
                    // checkbox status
                    if (of.chitiet.data[0].STATUS === '0') {
                        $('#statusCT').val('-1')
                    }
                    // check box shipped
                    if (of.chitiet.data[0].SHIPPED) {

                        $('#shipped').attr("checked", "checked");
                    }
                    $('#ghi-chu').val(of.chitiet.data[0].DIENGIAI)
                }

                if (of.list_chitiet.data.length > 0) {

                    dataTemp = of.list_chitiet.data;
                    var b = []
                    var c = 0
                    KhoList.map((e) => {
                        b.push(e.KHOID)
                    })
                    if (dataTemp.length > 0) {
                        dataTemp.map((e) => {

                            var a = b.includes(e.KHOID)
                            if (a === true) {
                                c++
                            }
                        })
                    }
                    if (c < dataTemp.length) {
                        tbl_ctphieu.columns(3).visible(true)
                        tbl_ctphieu.columns(4).visible(false)
                        $('.muahang-status').addClass('disabled-nhap-kho')
                    } else {
                        tbl_ctphieu.columns(4).visible(true)
                        tbl_ctphieu.columns(3).visible(false)
                        $('.muahang-status').removeClass('disabled-nhap-kho')
                    }

                    console.log(dataTemp)
                    $('select[name="khos"]').val(of.list_chitiet.data[0].KHOID)
                    if ($('select[name="khos"]').val() == null) {
                        $('select[name="khos"]').val($('select[name="khos"] option:eq(0)').val())
                    }
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();

                }
            })
        }

    })

    //---------------------------
    // xử lý nút print
    $('#btn-muadon-print').on('click', function () {
        console.log('Print')
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index');
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để in',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            var dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');
            var link = `/muahang/print?mdid= ` + dataid + ``
            window.open(link)
        }

    })

    //---------------------------
    // function get data => UPDATE
    function loadDataAllMuaDon(dataid,ISSO) {
        if (statusGetAll === 0) {
            statusGetAll++
            return getall(statusGetAll).then((ga) => {

                ga.showroom.data.map((value) => {
                    $('#showroom').append($('<option>', {
                        value: value.SRID,
                        text: value.TEN,
                    }))
                })
                ga.tiente.data.map((value) => {
                    if (value.TTCODE === "USD") {
                        $('#tiente').append(`<option selected value="` + value.TTID + `">` + value.TTCODE + `</option>`)
                        $('input[name="tigia"]').attr('placeholder', Math.round(value.TIGIA))
                    }

                })


                ga.ca.data.map((value) => {
                    $('#ca').append($('<option>', {
                        value: value.CID,
                        text: value.CTEN,
                    }))

                })

                ga.lydo.data.map((value) => {
                    $('#lydo').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                })

                ga.lydox.data.map((value) => {
                    $('#lydox').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                })

                ga.kho.data.map((value) => {
                    KhoList.push({ KHOID: value.KHID, KHOCODE: value.KHCODE })
                    $('select[name="khos"]').append(`<option value="` + value.KHID + `">` + value.KHCODE + `</option>`)
                })


                $('.default-form input[name="ngay-lapphieu"]').val(moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="ngay-nhanhang"]').attr('placeholder', moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="han-thanhtoan"]').attr('placeholder', moment(new Date()).format('DD/MM/yyyy'))
                $('.default-form input[name="han-thanhtoan"]').val(moment(new Date()).format('DD/MM/yyyy'))

                //LOAD DỮ LIỆU
                //LoadDataCT(dataid)
                if (ISSO === 1) {
                    return loadMuadonCT_off2(dataid).then((of) => {
                        return of
                    })
                }
                else {
                    return loadMuadonCT_off(dataid).then((of) => {
                        return of
                    })
                }
            })
        } else if (ISSO === 1) {
            return loadMuadonCT_off2(dataid).then((of) => {
                return of
            })
        } else {
            //LOAD DỮ LIỆU
            return loadMuadonCT_off(dataid).then((of) => {
                return of
            })

        }
    }

    //---------------------------
    // xử lý sự kiện xóa  muadon
    $('#btn-muadon-delete').on('click', function () {

        var dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id')

        console.log(dataid)
        var r = confirm('Bạn có chắc muốn xóa không')
        if (r) {
            deleteMuaDonAll(dataid).then((res) => {
                console.log(res)
                if (res.Status === 1 || res.status === 1) {
                    tbl_donmuahang.clear().columns.adjust().draw();
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                } else {
                    toast.create({
                        title: 'Notification!',
                        text: res.Message == null ? res.message : res.Message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            })
        }

    })
    //---------------------------

    // function delete muadon

    function deleteMuaDonAll(dataId) {
        var a = new FormData();
        a.append('mdid', dataId)
        return $.ajax({
            type: 'POST',
            url: '/Muahang/DeleteMuaDonAll',
            data: a,
            contentType: false,
            processData: false,
            // contentType: "application/json; charset=utf-8",
            dataType: "json",
            succes: function (res) {
                return res
            }
        })
    }

    //---------------------------
    // xử lý sự kiện nạp 
    $('#btn-muadon-reload').on('click', function () {
        tbl_donmuahang.search('').order(0).clear().columns.adjust().draw();
    })
    // xử lý sự kiện report

    $('#btn-muadon-report').on('click', async function () {
        var CheckDieuPhoi = $('#profile-tab[data-toggle="tab"]').hasClass('active');
        if (CheckDieuPhoi == true) {
            tblMuaHangDP_filterValues.export = 1;
            var link = `/MuaHang/DieuPhoiDonHang?` + serialize(tblMuaHangDP_filterValues) + ``;
            window.open(link)
        }
        else {
            tbDonMuahang_filterValues.export = 1;
            var link = `/MuaHang/LoadJsonDonMuaHang?` + serialize(tbDonMuahang_filterValues) + ``;
            window.open(link)
        }
    })
    //---------------------------

    // xử lý sự kiện cập nhật trạng thái 
    $('#btn-capnhat-trangthai').on('click', function () {
        var id = $('#tbl_donmuahang tbody tr.selected')
        var data = tbl_donmuahang.row(id).data()
        var dataPost = {}
        if (data != undefined) {

            $('#select-trangthai').val(data.STATUS)

            if (data.SHIPPEDS) {
                $('#cb-capnhat-shipped').attr('checked', 'checked')
            } else {
                $('#cb-capnhat-shipped').removeAttr('checked')
            }
            $('#popup-capnhat-trangthai').modal();


        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu để cập nhật trạng thái',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }


    })

    $('#btnSave-capnhat-trangthai').on('click', function () {
        var id = $('#tbl_donmuahang tbody tr.selected')
        var data = tbl_donmuahang.row(id).data()
        selectedId = data.MDID
        var dataPost = new FormData()
        dataPost.append('MDID', data.MDID)
        dataPost.append('status', $('#select-trangthai').val() == null ? "" : $('#select-trangthai').val())
        if ($('#cb-capnhat-shipped').is(':checked')) {
            dataPost.append('shipped', true)
        } else {
            dataPost.append('shipped', false)
        }

        $.ajax({
            type: 'POST',
            url: '/MuaHang/UpdateStatus',
            data: dataPost,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.status == 1) {
                    $('#cb-capnhat-shipped').removeAttr('checked')
                    $('#popup-capnhat-trangthai').modal('toggle')
                    tbl_donmuahang.columns.adjust().draw()

                } else if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message == null ? res.Message : res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                } else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message == null ? res.Message : res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }

            }
        })
    })

    //#endregion

    //-------------------------------------

    //#region ---------------Event Bảng Điều phối hàng------------------------


    // click vào table mua đơn
    $('#tbl-dieu-phoi-don-hang-mh tbody').on('click', 'tr', function () {

        var data = tblMuaHangDP.row($(this).index()).data();
        if (data != null && data != undefined) {
            tblMuaHangDP.row($(this).index()).select()
            $('#tbl-dieu-phoi-don-hang-mh tbody tr').not(this).removeClass('selected');
        }

    })

    // dbllick vao table mua đơn
    $('#tbl-dieu-phoi-don-hang-mh  tbody').on('dblclick', 'tr', function () {

        //RESET ĐỐI TƯỢNG 
        var data = tblMuaHangDP.row($(this).index()).data();
        if (data != null && data != undefined) {
            $(this).addClass('selected');
            $('#tbl-dieu-phoi-don-hang-mh tbody tr').not(this).removeClass('selected');

            var dataid = $(this).attr('data-id')
            $('#btn-duyet-phieu').removeAttr('hidden')
            $('#btn-huy-phieu').removeAttr('hidden')
            $('#btn-muactdon-print').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-export').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-nhap').addClass('disabled-nhap-kho')
            $('#them-order').modal();
            loadDataAllMuaDon(dataid).then((of) => {
                if (of.chitiet.data.length > 0) {
                    dataMuaDon = of.chitiet.data
                    $('.default-form select[name="kh-code"]').val(of.chitiet.data[0].KHCODE).trigger('change');
                    $('.default-form select[name="kh-name"]').val(of.chitiet.data[0].KHCODE).trigger('change');
                    $('.default-form select[name="nv-username"]').val(of.chitiet.data[0].NVCODE).trigger('change');
                    $('.default-form select[name="nv-name"]').val(of.chitiet.data[0].NVCODE).trigger('change');
                    $('.default-form input[name="so-hoadon"]').val(of.chitiet.data[0].MDCODE)

                    if (of.chitiet.data[0].SUBMITEDDATE != null) {
                        $('.default-form input[name="ngay-lapphieu"]').val(moment(of.chitiet.data[0].SUBMITEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].EXPECTEDDATE != null) {
                        $('.default-form input[name="ngay-nhanhang"]').val(moment(of.chitiet.data[0].EXPECTEDDATE).format('DD/MM/yyyy'))
                    }
                    if (of.chitiet.data[0].HANTHANHTOAN != null) {
                        $('.default-form input[name="han-thanhtoan"]').val(moment(of.chitiet.data[0].HANTHANHTOAN).format('DD/MM/yyyy'))
                    }



                    $('#statusCT').val(of.chitiet.data[0].STATUS)
                    $('#lydo').val(of.chitiet.data[0].LDNID)
                    $('#showroom').val(of.chitiet.data[0].SRIDTO)
                    $('#tiente').val(of.chitiet.data[0].TIENTEID)
                    $('#ca').val(of.chitiet.data[0].CAID)
                    // $('select[name="khos"]').val(of.chitiet.data[0].SRIDFROM)


                    // load ti gia 
                    // checkbox status
                    if (of.chitiet.data[0].STATUS === '0') {
                        $('#statusCT').val('-1')
                    }
                    // check box shipped
                    if (of.chitiet.data[0].SHIPPED) {

                        $('#shipped').attr("checked", "checked");
                    }
                    $('#ghi-chu').val(of.chitiet.data[0].DIENGIAI)
                }

                if (of.list_chitiet.data.length > 0) {

                    dataTemp = of.list_chitiet.data;
                    var b = []
                    var c = 0
                    KhoList.map((e) => {
                        b.push(e.KHOID)
                    })
                    if (dataTemp.length > 0) {
                        dataTemp.map((e) => {

                            var a = b.includes(e.KHOID)
                            if (a === true) {
                                c++
                            }
                        })
                    }
                    if (c < dataTemp.length) {
                        tbl_ctphieu.columns(3).visible(true)
                        tbl_ctphieu.columns(4).visible(false)
                        $('.muahang-status').addClass('disabled-nhap-kho')
                    } else {
                        tbl_ctphieu.columns(4).visible(true)
                        tbl_ctphieu.columns(3).visible(false)
                        $('.muahang-status').removeClass('disabled-nhap-kho')
                    }

                    console.log(dataTemp)
                    $('select[name="khos"]').val(of.list_chitiet.data[0].KHOID)
                    if ($('select[name="khos"]').val() == null) {
                        $('select[name="khos"]').val($('select[name="khos"] option:eq(0)').val())
                    }
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();

                }
            })

        }

    });

    //#endregion  

    //-------------------------------------

    //#region Modal chi tiết thêm order

    let dataTemp = new Array()
    let dataInsert = {}
    let dataDelete = new Array()
    let dataChange = new Array()

    let tienhang = 0;
    let tongthue = 0;
    let tongchietkhau = 0;
    let tongtien = 0;
    let statusGetAll = 0
    let dataMuaDon = [];


    $('#tbl_ctphieu').find('tfoot').append(`<tr>
                                                                <th data-column="col-stt"></th>
                                                                <th data-column="col-mahang"></th>
                                                                <th data-column="col-tenhang"></th>
                                                                <th data-column="col-kho"></th>
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
                                                                <th data-column="col-ck-chuyentien"></th>

                                                                <th data-column="col-thanhtien"></th>
                                                                <th data-column="col-ghichu"></th>
                                                                <th data-column="col-dongia"></th>
                                                                <th data-column="col-btn"></th>
                                                            </tr>`)
    var tbl_ctphieu = $('#tbl_ctphieu').DataTable({
        orderCellsTop: true,
        paging: true,
        data: dataTemp,
        bInfo: false,
        columns: [
            {
                "targets": 0,
                "className": "",
                "data": null,
                "width": "4%",
                "createdCell": function (td) {
                    $(this).attr('data-column', 'col-stt');
                },

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",
                render: function (data, type, meta) {
                    if (meta.LINKIMAGE === null || meta.LINKIMAGE === '') {
                        return '<a href ="#">' + data + '</a>';
                    }
                    else {
                        return '<a href =' + meta.LINKIMAGE + ' target="_blank">' + data + '</a>';
                    }
                },
                "width": "10%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mahang')
                }
            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",
                "width": "25%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                    $(td).attr('title', $(td).find('span').html())
                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text">' + data + '</span>';
                }
            },
            {
                "targets": 3,
                "className": "text-left",
                "data": "KHOCODE",
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-kho')
                },
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "KHOID",
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-kho')
                },
                "render": function (data, type, full, meta) {

                    var x = document.createElement("SELECT");
                    KhoList.map((e) => {
                        var op = document.createElement("option");
                        op.text = e.KHOCODE
                        op.value = e.KHOID


                        if (op.value === data) {

                            op.setAttribute("selected", true);
                        }

                        x.options.add(op)
                    })
                    return '' + x.outerHTML + ''
                }
            },
            {
                "targets": 5,
                "className": "",
                "data": "SOLUONG",
                "width": "7%",
                type: 'string',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluong')

                },
                "render": function (data, type, full, meta) {
                    return '<input class="input-align" style="max-width: 85px" name="soluong" type="text" value="' + data + '"data-type="number"/>';

                }

            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "DONVI",
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-donvi')
                }
            },
            {
                "targets": 7,
                "className": "text-right",
                "data": null,
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongchuaxuat')
                }
            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "SoLuongTon",
                "width": "7%",
                "render": function (data) {

                    return data.lenght == 0 ? '<a  type="button"  data-toggle="modal" data-target="#danh-sach-tonkho"  href="#">' + 0 + '</a>' : '<a  type="button"   data-toggle="modal" data-target="#danh-sach-tonkho"  href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>'
                }
            },
            {
                "targets": 9,
                "className": "text-right",
                "data": null,
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongkhac')
                }
            },
            {
                "targets": 10,
                "className": "text-right",
                "data": null,
                "width": "7%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-soluongban')
                }
            },
            {
                "targets": 11,
                "className": "text-right",
                "data": "DONGIA",
                "width": "10%",
                type: 'string',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dongia')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" style="max-width: 85px"  name="dongia" type="text" value="' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
                }
            },
            {
                "targets": 12,
                "className": "text-right",
                "data": "TILETHUE",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thue')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="tile-thue" value="' + data + '" data-type="percent"/>';
                }
            },
            {
                "targets": 13,
                "className": "text-right",
                "data": "TILECHIETKHAU",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ck')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="tile-chietkhau" type="text" value="' + data + '"data-type="percent"/>';
                }
            },
            {
                "targets": 14,
                "className": "text-right",
                "data": "CHIETKHAU",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ck-chuyentien')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="chietkhau" type="text" value="' + data + '"data-type="currency"/>';
                }
            },
            {
                "targets": 15,
                "className": "text-right",
                "data": "THANHTIEN",
                "width": "12%",
                type: 'string',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thanhtien')

                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" style="max-width: 182px"  name="thanhtien" type="text"  readonly value="' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
                }
            },
            {
                "targets": 16,
                "className": "text-right",
                "data": "GHICHU",
                "width": "15%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ghichu')
                },
                "render": function (data, type, full, meta) {
                    return '<input class="input-align" name="ghichu" type="text" value="' + data + '"/>';
                }
            },
            {
                "targets": 17,
                "className": "text-right",
                "data": null,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dongia');
                },
                "render": function (data, type, full, meta) {
                    return '<input claas="input-align" name="dongia-2" type="number" value="' + data + '"data-type="currency"/>';
                }
            },
            {
                "targets": 18,
                "className": "text-center",
                "data": null,
                "width": "3%",
                type: 'string',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-btn')
                },
                "defaultContent": '<a type="button"  class="btn btn-danger text-white">Xóa</a>'
            },


        ],
        columnDefs: [
            {
                "targets": 3,
                "visible": false
            },
            {
                "targets": 12,
                "visible": false
            },
            {
                "targets": 13,
                "visible": false
            },
            {
                "targets": 14,
                "visible": false
            },
            {
                "targets": 7,
                "visible": false
            },
            {
                "targets": 9,
                "visible": false
            },
            {
                "targets": 10,
                "visible": false
            },
            {
                "targets": 17,
                "visible": false
            }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            //console.log(tbl_ctphieu.settings())
            $(nRow).find('td:eq(0)').text(iDataIndex + 1);
            $(nRow).attr('data-id', data.MHID);


            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            /*let sssa = `td:eq(` + $('#duatren').val() + `)`
            let sssb = `td:eq(` + $('#duatren').val() + `)`
            $(nRow).find(sssa).text() * $(nRow).find(sssa).text() * $(nRow).find('td:eq(4)').text() 
            */


            tienhang = tienhang + data.SOLUONG * data.DONGIA
            var dongiaSl_Index = data.SOLUONG * data.DONGIA
            var chietkhau_Index = dongiaSl_Index * data.TILECHIETKHAU / 100
            var thue_index = (dongiaSl_Index - chietkhau_Index) * data.TILETHUE / 100

            //update lại các column FC
            if (dataMuaDon.length > 0) {
                data.FCDONGIA = data.DONGIA / dataMuaDon[0].TIGIA
                data.FCTHUE = thue_index / dataMuaDon[0].TIGIA
                data.THUE = thue_index
                data.FCCHIETKHAU = chietkhau_Index / dataMuaDon[0].TIGIA
                data.CHIETKHAU = chietkhau_Index
                data.FCTHANHTIEN = (dongiaSl_Index - chietkhau_Index + thue_index) / dataMuaDon[0].TIGIA

            }

            tongthue = Math.round(tongthue + thue_index)
            tongchietkhau = Math.round(tongchietkhau + chietkhau_Index)



        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
        },
        html: true,
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
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            dongia = api
                .column(11)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            thue = api
                .column(12)
                .data()
                .reduce(function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0);

            tlchietkhau = api
                .column(13)
                .data()
                .reduce(function (a, b) {
                    return Number(a) + Number(b);
                }, 0);
            chietkhau = api
                .column(14)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            thanhtien = api
                .column(15)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            //-----------------

            $('#tienhang').html(tienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            $('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
            $('#ck').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
            $('#tongtien').html(Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))

            //-------- update lại thông tin mua đơn 
            if (dataMuaDon.length > 0) {
                dataMuaDon[0].TONGTIEN = thanhtien;
                dataMuaDon[0].FCTONGTIEN = dataMuaDon[0].TONGTIEN / dataMuaDon[0].TIGIA

                dataMuaDon[0].TONGTHUE = tongthue
                dataMuaDon[0].FCTONGTHUE = dataMuaDon[0].TONGTHUE / dataMuaDon[0].TIGIA

                dataMuaDon[0].TONGCHIETKHAU = tongchietkhau
                dataMuaDon[0].FCTONGCHIETKHAU = dataMuaDon[0].TONGCHIETKHAU / dataMuaDon[0].TIGIA


            }
            // Update footer

            $(api.column(1).footer()).html(data.length == 0 ? '' : data.length).addClass('text-right');
            $(api.column(5).footer()).html(sl == 0 ? '' : sl).addClass('text-right');
            $(api.column(11).footer()).html(dongia == 0 ? '' : dongia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            $(api.column(12).footer()).html(thue == 0 ? '' : thue.toFixed(2).toString()).addClass('text-right');
            $(api.column(13).footer()).html(tlchietkhau == 0 ? '' : tlchietkhau.toFixed(2).toString()).addClass('text-right');
            $(api.column(14).footer()).html(chietkhau == 0 ? '' : Math.round(chietkhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            $(api.column(15).footer()).html(thanhtien == 0 ? '' : Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');


        },

    })

    // Checkbox show column Chiết khấu bằng tiền hoặc %
    $('input[name="ck-chuyentien"]').on('click', function () {
        if (this.checked) {
            tbl_ctphieu.columns(13).visible(true)
            tbl_ctphieu.columns(12).visible(false)
        } else {
            tbl_ctphieu.columns(13).visible(false)
            tbl_ctphieu.columns(12).visible(true)
        }
    })







    //#region Table Tồn kho
    $('#danh-sach-tonkho').on('show.bs.modal', async function () {
        console.log('hello tontonkho')
        setTimeOutOfTonKho();

    })
    var filterObj_tonkho = {}
    filterObj_tonkho.statusDraw = 0
    var tonkho = InitDB()
    function InitDB() {
        return $('#table-tonkho').DataTable({
            serverSide: true,
            bFilter: true,
            bInfo: false,
            ajax: function (data, callback, setting) {
                if (filterObj_tonkho.statusDraw > 0) {
                    filterObj_tonkho.draw = data.draw;
                    filterObj_tonkho.start = data.start;
                    filterObj_tonkho.length = data.length;
                    filterObj_tonkho.search = data.search["value"];
                    filterObj_tonkho.order = data.order[0].column;
                    filterObj_tonkho.dir = data.order[0].dir;

                    $.ajax({
                        type: 'GET',
                        url: '/MuaHang/LoadTonKho',
                        data: filterObj_tonkho,
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
                    "className": "text-left",
                    "data": "RowIndex",
                    "orderable": false
                },
                {
                    "targets": 1,
                    "className": "text-left",
                    "data": "KHOCODE",
                    "orderable": false
                },
                {
                    "targets": 2,
                    "className": "text-left",
                    "data": "MHCODE",
                    "orderable": false,
                    "render": function (data) {
                        return data
                    }
                },
                {
                    "targets": 3,
                    "className": "text-left",
                    "data": "MHTEN",
                    "orderable": false,
                    "render": function (data) {
                        return `<span class="shorter-text" style="width: 200px" title="` + data + `">` + data + `</span>`
                    }
                },
                {
                    "targets": 4,
                    "className": "text-right",
                    "data": "SoLuong",
                    "orderable": false,
                    "render": function (data) {
                        return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }
                },
                {
                    "targets": 5,
                    "className": "text-right",
                    "data": "SoLuongOnApprovedSO",
                    "orderable": false,
                    "render": function (data) {
                        return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }
                },
                {
                    "targets": 6,
                    "className": "text-right",
                    "data": "SLReady",
                    "orderable": false,
                    "render": function (data) {
                        return data == 0 || data == null ? '' : data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }
                },

            ],
            fnCreatedRow: function (nRow, data, iDataIndex) {
                $(nRow).attr('data-id', data.MHID);
                //$(nRow).find('td:eq(0)').text(iDataIndex + 1);
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

                // Total over this page

                sl4 = api.column(4).data().reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
                sl5 = api.column(5).data().reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
                sl6 = api.column(6).data().reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);


                $(api.column(4).footer()).html(sl4 == 0 ? '' : Math.round(sl4).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(5).footer()).html(sl5 == 0 ? '' : Math.round(sl5).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(6).footer()).html(sl6 == 0 ? '' : Math.round(sl6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            },
            scrollResize: true,
            scrollY: 100,
            scrollCollapse: true,
            scroller: {
                loadingIndicator: true,
                displayBuffer: 10
            },

            pageLength: 5,
            lengthChange: false,
        })
    }

    function setTimeOutOfTonKho() {
        setTimeout(() => {
            filterObj_tonkho.statusDraw++
            tonkho.columns.adjust().draw()
        }, 300)
    }

    //#endregion 
    //-------------------------------------

    //#region EVENT DBLCLICK MỞ / ĐÓNG MODAL


    $('#them-order').on('shown.bs.modal', function () {
        dataMuaDon = []
        dataTemp = []
        tbl_ctphieu.columns.adjust().draw();
    });
    $('#them-order').on('hidden.bs.modal', function (e) {
        $('select[name="khos"]').val('aefdc5f5-6a4d-4b6e-a655-a589b83eb7b9');
        $('select[name="kh-code-po"]').next(".select2-container").hide();
        $('select[name="kh-name-po"]').next(".select2-container").hide();
        $('select[name="kh-code"]').next(".select2-container").show();
        $('select[name="kh-name"]').next(".select2-container").show();
    })
    // ----
    for (var i = 0; i < 150; i++) {
        $('select[name="selectNumber"]').append(`<option value="` + i + `">` + i + `</option>`)
    }


    // Cộng ngày vào hạn thanh toán
    $('select[name="selectNumber"]').on('change', function () {

        var result = new Date();
        console.log(result)

        var ass = result.getDate() + Number($(this).val())
        var datess = result.setDate(ass)
        console.log(ass)
        var dateformat = moment(datess).format('DD/MM/yyyy')
        console.log(dateformat)
        $('.default-form input[name="han-thanhtoan"]').val(dateformat)

    })


    // Thay đổi kho

    $('select[name="khos"]').on('change', function () {
        var khoId = $(this).val()
        var r = confirm('Bạn có chắc muốn thay đổi kho?')
        if (r) {
            $.ajax({
                type: 'GET',
                url: '/MuaHang/CheckChuyenKho',
                success: async function (res) {
                    if (res.Status === 1 || res.status === 1) {
                        var length = dataTemp.length
                        var khoCode = $('select[name="khos"] option:selected').text();
                        var khoId = $('select[name="khos"] option:selected').val();
                        var ListMHID = []
                        var fliterTemp = dataTemp.filter(x => x.KHOCODE != khoCode && x.KHOID != khoId)
                        console.log(fliterTemp)
                        fliterTemp.map((e) => {
                            ListMHID.push({ MHID: e.MHID })
                        })
                        // khoi tao lai dataTemp
                        dataTemp = dataTemp.filter(x => x.KHOCODE == khoCode && x.KHOID == khoId)
                        //
                        await GetSoluongTon(ListMHID, khoId).then((res) => {
                            if (res.data.length > 0) {
                                var listSlton = res.data

                                for (var i = 0; i < fliterTemp.length; i++) {
                                    var s = fliterTemp[i]
                                    var slton_obj = listSlton.filter(x => x.MHID == s.MHID)
                                    var slton_index = slton_obj[0].soluong
                                    s.SoLuongTon = slton_index

                                    if (s.KHOCODE != khoCode && s.KHOID != khoId) {
                                        s.KHOCODE = khoCode
                                        s.KHOID = khoId
                                        if (s.statusManager === 0) {
                                            s.statusManager = 2
                                        }
                                    }
                                    dataTemp.push(s)
                                }
                                tienhang = 0;
                                tongthue = 0;
                                tongchietkhau = 0;
                                tongtien = 0;
                                console.log(dataTemp)
                                tbl_ctphieu.clear().columns.adjust().draw();
                                tbl_ctphieu.rows.add(dataTemp);
                                tbl_ctphieu.columns.adjust().draw();
                            }
                        })


                    } else if (res.Status === 2 || res.status === 2) {
                        confirm('Bạn không đủ quyển để chuyển kho, vui lòng liên hệ quản trị viên')
                    }
                }
            })

        } else {

        }
    })


    // Clear data -- khi đóng modal

    function clearInModal() {
        dataTemp.splice(0, dataTemp.length)
        dataDelete.splice(0, dataDelete.length)
        dataChange.splice(0, dataChange.length)
        dataMuaDon.splice(0, dataMuaDon.length)
        dataInsert = {}

        tienhang = 0;
        tongthue = 0;
        tongchietkhau = 0;
        tongtien = 0;

        statusSOPO = true

        tbl_ctphieu.clear().draw();

        $('.modal-backdrop').hide()

        $(".table-search").hide();
        $('#tbl_ctphieu tfoot').empty();

        if ($('#shipped').attr('checked')) {

            $('#shipped').removeAttr("checked")
        }
        $('.default-form select[name="selectNumber"]').val(0)
        $('#statusCT').val('')
        // khachhang
        $('.default-form select[name="kh-code"]').val('').trigger('change');
        $('.default-form select[name="kh-name"]').val('').trigger('change');

        $('.default-form input[name="daidien"]').val('')
        $('.default-form input[name="phone"]').val('')
        $('.default-form input[name="mob"]').val('')
        $('.default-form input[name="diachi"]').val('')
        // nv

        $('.default-form select[name="nv-username"]').val('').trigger('change');
        $('.default-form select[name="nv-name"]').val('').trigger('change');

        $('.default-form input[name="so-hoadon"]').val('')
        $('.default-form input[name="ngay-lapphieu"]').val('')
        $('.default-form input[name="han-thanhtoan"]').val('')
        $('.default-form input[name="ngay-nhanhang"]').val('')
        $('select[name="selectNumber"]').remove('option')

        $('.lydo').removeAttr('hidden')
        $('.lydox').attr('hidden', 'hidden')
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

    }

    $('#them-order').on('hide.bs.modal', function () {
        clearInModal();
    });

    //#endregion EVENT DBLCLICK MỞ / ĐÓNG MODAL 

    //-------------------------------------

    //#region CHANGE DATA IN CT TABLE
    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }
    $('#tbl_ctphieu tbody').on('change', 'tr', async function () {

        // var data = tbl_ctphieu.row($(this).parents('tr')).data(); 
        var num = $(this).index();
        var intVal = function (i) {
            return typeof i === 'string' ?
                i.replace(/\./g, '') * 1 :
                typeof i === 'number' ?
                    i : 0;
        };

        var obj = {
            MHID: $(this).attr('data-id'),
            KHOID: $(this).find('select option:selected').val(),
            KHOCODE: $(this).find('select option:selected').text(),
            soluong: $(this).find('input[name="soluong"]').val(),
            dongia: $(this).find('input[name="dongia"]').val(),
            tilethue: $(this).find('input[name="tile-thue"]').val(),
            tilechietkhau: $(this).find('input[name="tile-chietkhau"]').val(),
            chietkhau: $(this).find('input[name="chietkhau"]').val(),
            dongia2: $(this).find('input[name="dongia-2"]').val(),
            ghichu: $(this).find('input[name="ghichu"]').val(),
        }
        console.log(obj);
        var i = dataTemp.findIndex(x => x.MHID == obj.MHID);

        if (dataTemp[i].MHID === obj.MHID) {
            if (dataTemp[i].KHOID != obj.KHOID) {
                // update lại số lượng tồn
                var listSlTon = []
                listSlTon.push({ MHID: obj.MHID })

                await GetSoluongTon(listSlTon, obj.KHOID).then((res) => {
                    dataTemp[i].KHOID = obj.KHOID
                    dataTemp[i].KHOCODE = obj.KHOCODE
                    dataTemp[i].SoLuongTon = res.data[0].soluong
                })
            }
            if (dataTemp[i].MHTID == 7) {
                obj.soluong = -intVal(obj.soluong.replace("-", ""));
            }
            if (obj.soluong != undefined) {
                dataTemp[i].SOLUONG = obj.soluong
            }
            if (obj.dongia != undefined) {
                dataTemp[i].DONGIA = intVal(obj.dongia)
            }
            if (obj.tilethue != undefined) {
                dataTemp[i].TILETHUE = Number(obj.tilethue)
            }
            if (obj.tilechietkhau != undefined) {

                dataTemp[i].TILECHIETKHAU = obj.tilechietkhau
            }
            if (obj.chietkhau != undefined) {
                dataTemp[i].CHIETKHAU = intVal(obj.chietkhau)

            }
            if (obj.dongia != undefined) {
                dataTemp[i].DONGIA = intVal(obj.dongia)
            }
            if (obj.ghichu != undefined) {
                dataTemp[i].GHICHU = obj.ghichu
            }

            if (obj.chietkhau != undefined) {

                dataTemp[i].THANHTIEN = dataTemp[i].SOLUONG * dataTemp[i].DONGIA

                dataTemp[i].TILECHIETKHAU = dataTemp[i].CHIETKHAU / dataTemp[i].THANHTIEN * 100

                if (dataTemp[i].TILECHIETKHAU > 100 || dataTemp[i].CHIETKHAU > dataTemp[i].THANHTIEN) {

                    dataTemp[i].TILECHIETKHAU = 0
                    dataTemp[i].CHIETKHAU = 0
                }

                dataTemp[i].THANHTIEN = dataTemp[i].THANHTIEN - intVal(dataTemp[i].CHIETKHAU)

                dataTemp[i].THANHTIEN = dataTemp[i].THANHTIEN + (dataTemp[i].THANHTIEN * dataTemp[i].TILETHUE) / 100

            } else {
                dataTemp[i].THANHTIEN = (dataTemp[i].SOLUONG * dataTemp[i].DONGIA)

                dataTemp[i].CHIETKHAU = dataTemp[i].THANHTIEN * dataTemp[i].TILECHIETKHAU / 100

                if (dataTemp[i].TILECHIETKHAU > 100 || dataTemp[i].CHIETKHAU > dataTemp[i].THANHTIEN) {

                    dataTemp[i].TILECHIETKHAU = 0
                    dataTemp[i].CHIETKHAU = 0
                }
                dataTemp[i].THANHTIEN = dataTemp[i].THANHTIEN - (dataTemp[i].TILECHIETKHAU * dataTemp[i].THANHTIEN) / 100

                dataTemp[i].THANHTIEN = dataTemp[i].THANHTIEN + (dataTemp[i].THANHTIEN * dataTemp[i].TILETHUE) / 100
            }



            dataTemp[i].TILECHIETKHAU = roundToTwo(dataTemp[i].TILECHIETKHAU)

            if (dataTemp[i].statusManager === 0) {

                dataTemp[i].statusManager = 2

            }

            console.log('change data')
            console.log(dataTemp)
            tienhang = 0;
            tongthue = 0;
            tongchietkhau = 0;
            tongtien = 0;
            console.log(dataTemp)
            tbl_ctphieu.clear().columns.adjust().draw();
            tbl_ctphieu.rows.add(dataTemp);
            tbl_ctphieu.columns.adjust().draw();



            tbl_ctphieu.row(i).select();
            tbl_ctphieu.row(i).scrollTo(false);
        }

    })
    //#endregion

    //-------------------------------------

    //#region Load Nhan Vien Va Khach Hang
    var LuuIDNV = null;
    var ListNCCData = []
    LoadDataNvVANCC().then((e) => {


        // HTML Khach Hang
        e.dataKH.map((value) => {
            ListNCCData.push(value)
            $('select[name="kh-code"]').append('<option value="' + value.KHCODE + '">' + value.KHCODE + '</option>');
            $('select[name="kh-name"]').append('<option value="' + value.KHCODE + '">' + value.KHTEN + '</option>');
        })

        // HTML Nhan Vien
        e.dataNV.map((value) => {
            $('select[name="nv-username"]').append('<option value="' + value.NVCODE + '">' + value.NVCODE + '</option>');
            $('select[name="nv-name"]').append('<option value="' + value.NVCODE + '">' + value.NVTEN + '</option>');
        })

        // trigger khach hang
        $('select[name="kh-code"]').val('');
        $('select[name="kh-name"]').val('');
        $('select[name="kh-code"]').select2({ dropdownParent: $("#them-order"), width: '59%' });
        $('select[name="kh-name"]').select2({ dropdownParent: $("#them-order"), width: '75%' });




        // trigger nhan vien 
        $('select[name="nv-username"]').select2({ dropdownParent: $("#them-order"), width: '59%' });
        $('select[name="nv-name"]').select2({ dropdownParent: $("#them-order"), width: '75%' });




    }).catch(() => { console.log('error') })


    $('select[name="kh-code-po"]').on('select2:select', function (e) {
        $('select[name="kh-name-po"]').val($(this).val()).trigger('change');
    });
    $('select[name="kh-name-po"]').on('select2:select', function (e) {
        $('select[name="kh-code-po"]').val($(this).val()).trigger('change');
    });


    $('select[name="kh-code"]').on('select2:select', function (e) {
        // Do something 
        $('select[name="kh-name"]').val($(this).val()).trigger('change');
        var data = ListNCCData.filter(x => x.KHCODE == $(this).val())
        console.log(data)
        $('input[name="daidien"]').val(data[0].NGUOIDAIDIEN)
        $('input[name="phone"]').val(data[0].DIENTHOAI)
        $('input[name="mob"]').val(data[0].DIDONG)
        $('input[name="diachi"]').val(data[0].DIACHI)
    });
    $('select[name="kh-name"]').on('select2:select', function (e) {
        // Do something
        $('select[name="kh-code"]').val($(this).val()).trigger('change');
        var data = ListNCCData.filter(x => x.KHCODE == $(this).val())
        $('input[name="daidien"]').val(data[0].NGUOIDAIDIEN)
        $('input[name="phone"]').val(data[0].DIENTHOAI)
        $('input[name="mob"]').val(data[0].DIDONG)
        $('input[name="diachi"]').val(data[0].DIACHI)
    });
    $('select[name="nv-username"]').on('select2:select', function (e) {

        $('select[name="nv-name"]').val($(this).val()).trigger('change');

    });
    $('select[name="nv-name"]').on('select2:select', function (e) {

        $('select[name="nv-username"]').val($(this).val()).trigger('change');

    });

    //#endregion

    //-------------------------------------

    //#region AJAX

    async function getall(statusGetAll) {
        if (statusGetAll > 0) {
            var loadLydo = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadLydo',
                data: { LDT_ID: 'N' },
                success: function (res) {

                    return res.data
                }
            });
            var loadLydoX = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadLydo',
                data: { LDT_ID: 'X' },
                success: function (res) {
                    return res.data
                }
            });
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
                    if (res.status == 3) {
                        toast.create({
                            title: 'Notification!',
                            text: res.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        location.reload();
                    }
                    return res.data
                }
            });
            var LoadCA = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadCA',
                success: function (res) {

                    return res.data
                }
            });
            var LoadTienTe = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadTienTe',
                success: function (res) {

                    return res.data
                }
            });

            let dataGetAll = {};
            await $.when(loadLydo, loadLydoX, loadShowRoom, LoadCA, LoadKho, LoadTienTe).done(function (r1, r2, r3, r4, r5, r6) {
                dataGetAll.lydo = r1[0];
                dataGetAll.lydox = r2[0];
                dataGetAll.showroom = r3[0];
                dataGetAll.ca = r4[0];
                dataGetAll.kho = r5[0];
                dataGetAll.tiente = r6[0];
            })


            return dataGetAll;
        }

        return null
    }

    async function loadMuadonCT_off(MDID) {

        var chitiet = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaDonDetail',
            data: { muadonID: MDID },
            success: function (res) {
                return res.data
            }
        })

        var list_chitiet = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaCTDon',
            data: { muadonID: MDID },
            success: function (res) {
                return res.data
            }
        })
        let dataMuadon = {};

        var b = await $.when(chitiet, list_chitiet).done(function (r1, r2) {
            dataMuadon.chitiet = r1[0]
            dataMuadon.list_chitiet = r2[0]
        })
        return dataMuadon;
    }

    async function loadMuadonCT_off2(MDID) {

        var chitiet = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaDonDetail',
            data: { muadonID: MDID },
            success: function (res) {
                return res.data
            }
        })

        var list_chitiet = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaCTDonChuyenKoViTri',
            data: { muadonID: MDID },
            success: function (res) {
                return res.data
            }
        })
        let dataMuadon = {};

        var b = await $.when(chitiet, list_chitiet).done(function (r1, r2) {
            dataMuadon.chitiet = r1[0]
            dataMuadon.list_chitiet = r2[0]
        })
        return dataMuadon;
    }

    async function loadMatHangbyMHID(MHID, khoId) {
        var array = {};
        array.mathangID = MHID;
        array.khoID = khoId
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMatHangByMHID',
            data: array,
            success: function (res) {
                return res.data
            }
        })
    }

    async function LoadDataNvVANCC() {
        return $.ajax({
            async: true,
            type: 'GET',
            url: '/BanHang/LoadDataNvVANCC',
            success: function (res) {
                console.log(res);
                return res;
            }
        });
    }

    async function LoadDataNV() {
        return $.ajax({
            async: true,
            type: 'GET',
            url: '/BanHang/LoadDataNv',
            success: function (res) {
                console.log(res);
                return res;
            }
        });
    }
    //#endregion AJAX

    //-------------------------------------

    //#region Load search Mặt hàng

    let filterObj = {}
    filterObj.statusDraw = 0
    var a = 0;
    var tbl_searchMatHang = $('#table-search-mathang').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (filterObj.statusDraw > 0) {
                filterObj.draw = data.draw;
                filterObj.start = data.start;
                filterObj.length = data.length;
                filterObj.search = data.search["value"];
                filterObj.order = data.order[0].column;
                filterObj.dir = data.order[0].dir;

                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: filterObj,
                    success: function (res) {
                        /* tbl_searchMatHang.columns.adjust()*/

                    }
                }).done(callback, () => {
                    html: true;
                    $('#table-search-mathang tbody tr').eq(0).addClass('selected');
                })
            }
        },
        "order": [[2, "asc"]],
        columnDefs: [
            {
                "targets": [0],
                "orderable": false
            }
        ],
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
            //{
            //    "targets": 2,
            //    "className": "text-left ",
            //    "data": "MHTEN",
            //    "render": function (data) {
            //        return `<span class="shorter-text" style="width: 150px" title="` + data + `">` + data + `</span>`
            //    }
            //},
            //{
            //    "targets": 3,
            //    "className": "text-left",
            //    "data": "MHALIAS",
            //    "render": function (data) {
            //        return `<span class="shorter-text" style="width: 80px" title="` + data + `">` + data + `</span>`
            //    }
            //},
            //{
            //    "targets": 4,
            //    "className": "text-left",
            //    "data": "MHMOTA",
            //    "render": function (data) {
            //        return `<span class="shorter-text" style="width: 80px" title="` + data + `">` + data + `</span>`
            //    }
            //},
            {
                "targets": 2,
                "data": "MHTEN",
            },
            {
                "targets": 3,
                "data": "MHALIAS",
            },
            {
                "targets": 4,
                "data": "MHMOTA",
            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            //$(nRow).find('td:eq(0)').text(iDataIndex + 1);
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        autoWidth: true,
        pageLength: 5,
        lengthChange: false,
    });

    function searchMatHang_timeout() {
        setTimeout(function () {
            filterObj.statusDraw++;
            tbl_searchMatHang.columns.adjust().draw()

        }, 500)
    }

    //$("html").on("click", ".click-to-show-table", function () {
    //    if (filterObj.draw < 2 || filterObj.statusDraw < 1) {

    //        searchMatHang_timeout()
    //    }
    //    $('.table-search').show()
    //});

    //đóng table-search
    //$("html").on("click", ".btn-choose-mh, .btn-out-table-search", function () {
    //    //tbl_searchMatHang.clear().draw(); 
    //    $(".table-search").hide();
    //});


    //function filterGlobal() {
    //    var search = $('#global_filters').val()
    //    var datasearch = tbl_searchMatHang.search()

    //    if (search != datasearch) {
    //        $('#table-search-mathang').DataTable().search(
    //            $('#global_filters').val(),
    //        ).draw();
    //    }
    //}

    $(document).keydown(async function (e) {
        let checkSearch = $(".table-search").is(":hidden");
        let checkThemOrder = $("#them-order").is(":hidden");
        if (!checkSearch) {
            if (e.which == 13) {
                var dataId = $('#table-search-mathang tbody').find('.selected').attr('data-id');
                var khoid = $('select[name="khos"]').val()
                let search = $("#global_filters").val();
                if (search != '') {
                    $("#global_filters").val('');
                }
                load_mathang_byId_fnc(dataId, khoid)
                $(".table-search").hide();
            }
        }
        else if (!checkThemOrder) {
            if (e.which == 113) {
                e.preventDefault();
                $("#them-order").scrollTop(0);
                let CheckSelectKh = $('select[name="kh-name"]').next(".select2-container").is(":hidden");
                if (!CheckSelectKh) {
                    $('select[name="kh-name"]').select2('open');
                }
                else {
                    $('select[name="kh-name-po"]').select2('open');
                }
            }
            else if (e.which == 114) {
                e.preventDefault();
                $("#them-order").scrollTop(120);
                $("#global_filters").click();
                //tbBanHangHoaDonMH_timeout();
                $("#global_filters").focus();
                //$(".table-search").show();
                //if (filterObj.draw < 2 || filterObj.statusDraw < 1) {
                //    searchMatHang_timeout();
                //}
            }
            else if (e.which == 115) {
                e.preventDefault();
                $('#ghi-chu').focus();
                $('#ghi-chu').get(0).scrollIntoView();
            }
            else if (e.which == 117) {
                e.preventDefault();
                InCTMuaHang();
            }
            else if (e.which == 118) {
                e.preventDefault();
                await SavePhieu();
            }
            else if (e.which == 119) {
                e.preventDefault();
                let CheckDuyetDon = $('#btn-duyet-phieu').is(":hidden");
                if (!CheckDuyetDon) {
                    $("#btn-duyet-phieu").click();
                }
            }
            else if (e.which == 121) {
                e.preventDefault();
                let CheckHuyDon = $('#btn-huy-phieu').is(":hidden");
                if (!CheckHuyDon) {
                    $("#btn-huy-phieu").click();
                }
            }
        }
    })
    $('#global_filters').on('keyup click', delay(function (e) {
        let checkSearchModal = $(".table-search").is(":hidden");
        if (e.which == 13 || e.which == 113 || /*e.which == 114 ||*/ e.which == 115 || e.which == 117 || e.which == 118 || e.which == 119 || e.which == 120 || e.which == 121) {
            return;
        }
        else {
            if (checkSearchModal) {
                $(".table-search").show();
            }
        }
        //filterGlobal();
        var search = $('#global_filters').val()
        var datasearch = tbl_searchMatHang.search()
        if (filterObj.draw < 2 || filterObj.statusDraw < 1) {
            searchMatHang_timeout();
        }
        else if (search != datasearch) {
            $('#table-search-mathang').DataTable().search(
                $('#global_filters').val(),
            ).draw();
        }
    }, 1000));

    function delay(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    // ------------------------------------- 
    // click chọn vào table
    var dataIdSearch = null
    $('#table-search-mathang  tbody').on('click', 'tr', function () {
        //var data = tbl_searchMatHang.row($(this).index()).data();
        //if (data != null && data != undefined) {
        //    dataIdSearch = data.MHID
        //    tbl_searchMatHang.row($(this).index()).select()
        //    $('#table-search-mathang tbody tr').not(this).removeClass('selected');
        //}
        $(this).addClass('selected');
        $('#table-search-mathang tbody tr').not(this).removeClass('selected');
    })
    // -------------------------------------
    // chọn sản phẩm bằng dblclick
    $('#table-search-mathang  tbody').on('dblclick', 'tr', function () {

        tbl_searchMatHang.row($(this).index()).select();
        $('#table-search-mathang tbody tr').not(this).removeClass('selected');
        var dataId = $(this).attr('data-id');
        var khoid = $('select[name="khos"]').val()
        let search = $("#global_filters").val();
        if (search != '') {
            $("#global_filters").val('');
        }
        load_mathang_byId_fnc(dataId, khoid)
    });
    // -------------------------------------
    // chọn sản phẩm và thoát

    $('#btn-choose-search-mathang').on('click', function () {
        let idmh = $('#table-search-mathang tbody tr.selected').attr('data-id');
        var khoid = $('select[name="khos"]').val()
        if (idmh != null && idmh != undefined) {
            
            let search = $("#global_filters").val();
            if (search != '') {
                $("#global_filters").val('');
            }
            load_mathang_byId_fnc(idmh, khoid).then(() => {
                $(".table-search").hide()
            })
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng trong bảng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    });
    $('#btn-choose-search-mathang-not-close').on('click', function () {
        let idmh = $('#table-search-mathang tbody tr.selected').attr('data-id');
        var khoid = $('select[name="khos"]').val()
        if (idmh != null && idmh != undefined) {
            load_mathang_byId_fnc(idmh, khoid).then(() => {
            })
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng trong bảng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    })

    $('#btn-thoat-searchmh').click(function () {
        let search = $("#global_filters").val();
        if (search != '') {
            $("#global_filters").val('');
        }
    })
    // -------------------------------------
    // chọn sản phẩm bằng button 

    $('#table-search-mathang  tbody').on('click', 'button', function () {
        tbl_searchMatHang.row($(this).index()).select();
        $('#table-search-mathang tbody tr').not(this).removeClass('selected');
        var dataId = $(this).attr('data-id');
        var khoid = $('select[name="khos"]').val()

        load_mathang_byId_fnc(dataId, khoid).then(() => {
            $(".table-search").show()
        })

    });

    // -------------------------------------
    //$(document).keypress(function (e) {
    //    let checkSelect = $('#table-search-mathang tbody').find('.selected').attr('data-id')
    //    var khoid = $('select[name="khos"]').val()
    //    if (checkSelect != undefined && checkSelect != null) {
    //        if (e.which = 13) {
    //            let idmh = checkSelect;
    //            console.log(idmh);
    //            load_mathang_byId_fnc(idmh, khoid).then(() => {
    //                $(".table-search").hide()
    //            })

    //        }
    //    }
    //})

    // ----------------------------------
    // function lấy dữ liệu mặt hàng 
    function load_mathang_byId_fnc(dataId, khoId) {
        return loadMatHangbyMHID(dataId, khoId).then((e) => {
            if (e.data.length > 0) {

                tbl_ctphieu.clear().columns.adjust().draw();

                let soLuong = 1;
                if (e.data[0].MHTID == 7) {
                    soLuong = -1;
                }
                var obj = {
                    SORTORDER: e.data[0].CAUHINH,
                    MCTDID: null,
                    MDID: null,
                    KHID: null,
                    NPPID: null,
                    MHID: e.data[0].MHID,
                    MHCODE: e.data[0].MHCODE,
                    MHTEN: e.data[0].MHTEN,
                    KHOCODE: e.data[0].MHCODE,
                    SOLUONG: soLuong,
                    DONVI: e.data[0].DONVI,
                    KHOCODE: e.data[0].KHOCODE,
                    KHOID: e.data[0].KHOID,
                    SOLUONGEX: e.data[0].SOLUONG,
                    SoLuongTon: e.data[0].SoLuongTon,
                    DONGIA: e.data[0].DONGIA,
                    TILETHUE: 0,
                    TILECHIETKHAU: 0,
                    CHIETKHAU: 0,
                    THANHTIEN: e.data[0].DONGIA * soLuong,
                    GHICHU: e.data[0].GHICHU,
                    MHTID: e.data[0].MHTID,
                    LINKIMAGE: e.data[0].LINKIMAGE,
                    statusManager: 1
                }
                let target = 0;
                if (dataTemp.length === 0) {
                    dataTemp.push(obj)
                } else {
                    var statusChange = false
                    for (var i = 0; i < dataTemp.length; i++) {
                        if (dataTemp[i].MHID === obj.MHID) {
                            dataTemp[i].SOLUONG = parseInt(dataTemp[i].SOLUONG) + soLuong;
                            dataTemp[i].THANHTIEN = dataTemp[i].SOLUONG * dataTemp[i].DONGIA
                            if (dataTemp[i].statusManager === 0) {
                                dataTemp[i].statusManager = 2
                            }
                            target = i
                            statusChange = true

                        }
                    }
                    if (statusChange == false) {
                        dataTemp.push(obj)
                    }
                }

                tienhang = 0;
                tongthue = 0;
                tongchietkhau = 0;
                tongtien = 0;


                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();

                if (statusChange == false) {
                    tbl_ctphieu.row(dataTemp.length - 1).select();
                    tbl_ctphieu.row(dataTemp.length - 1).scrollTo(false);
                } else {
                    tbl_ctphieu.row(target).select();
                    tbl_ctphieu.row(target).scrollTo(false);
                }
                obj = {}
                return dataTemp
            }
        })
    }

    // -------------------------------------

    //#region function get SoluongTon

    function GetSoluongTon(ListMHID, KhoId) {
        var formdata = new FormData();
        formdata.append('ListMHID', JSON.stringify(ListMHID))
        formdata.append('KHOID', KhoId)
        return $.ajax({
            type: 'POST',
            url: '/PhieuNhapKho/CheckSoluongTon',
            data: formdata,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                return res
            }
        })
    }
    //#endregion

    //#endregion SEARCH MATHANG ADD / DELETE

    // -------------------------------------

    //#region Load Mặt Hàng

    let filter_dsMH = {};
    filter_dsMH.statusDraw = 0
    var tbl_dsMatHang = $('#tbl_dsMatHang').DataTable({
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
                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/loadMatHang',
                    data: filter_dsMH,
                    success: function (res) {

                    }
                }).done(callback, () => {
                    $('[data-toggle="popover"]').tooltip({
                        html: true,
                        hover: true
                    });
                })
            }





        },
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": 'RowIndex',
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
                "data": 'MHTEN',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-tenhang')
                    $(td).attr('title', $(td).find('span').html())
                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text">' + data + '</span>';
                }
            },
            {
                "targets": 3,
                "className": "text-left",
                "data": 'MHALIAS',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-alias')
                    $(td).attr('title', $(td).find('span').html())
                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text">' + data + '</span>';
                }
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": 'MHMOTA',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-mota')
                    $(td).attr('title', $(td).find('span').html())

                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text">' + data + '</span>';
                }
            },
            {
                "targets": 5,
                "className": "text-left",
                "data": 'MHLTEN',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-nhomhang')
                }
            },
            {
                "targets": 6,
                "className": "text-left",
                "data": 'GIANHAP',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-gianhap')

                    var x = Math.floor($(td).html());
                    $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
                }
            },
            {
                "targets": 7,
                "className": "text-left",
                "data": 'GIABANLE',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-giabanle')
                    var x = Math.floor($(td).html());
                    $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
                }
            },
            {
                "targets": 8,
                "className": "text-left",
                "data": 'GIABANBUON',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-giabanbuon')
                    var x = Math.floor($(td).html());
                    $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))

                }
            },
            {
                "targets": 9,
                "className": "text-left",
                "data": 'DONVI',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dvt')
                }
            },
            {
                "targets": 10,
                "className": "text-left",
                "data": 'NCC',
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ncc')
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
            displayBuffer: 10
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
    $('#danh-sach-mat-hang').on('show.bs.modal', function () {
        if (filter_dsMH.draw < 2 || filter_dsMH.statusDraw < 1) {
            dsMatHang_timeout();
        }

    });

    $('#danh-sach-mat-hang').on('hide.bs.modal', function () {

        //$('#list_nhomMatHang').append(`<li>Something - 1</li>`)
        //$('#tbl_dsMatHang').dataTable().fnDestroy(); 
    });
    // Dbclick vào table danh sách mặt hàng
    $('#tbl_dsMatHang  tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#tbl_dsMatHang tbody tr').not(this).removeClass('selected');
        loadMatHangbyMHID($(this).attr('data-id')).then((e) => {
            if (e.data.length > 0) {

                $("#danh-sach-mat-hang").hide();
                tbl_ctphieu.clear().columns.adjust().draw();

                var obj = {
                    SORTORDER: e.data[0].CAUHINH,
                    MCTDID: null,
                    MDID: null,
                    NPPID: null,
                    MHID: e.data[0].MHID,
                    MHCODE: e.data[0].MHCODE,
                    MHTEN: e.data[0].MHTEN,
                    KHOCODE: e.data[0].MHCODE,
                    SOLUONG: 1,
                    DONVI: e.data[0].DONVI,
                    KHOCODE: e.data[0].KHOCODE,
                    KHOID: e.data[0].KHOID,
                    SOLUONGEX: e.data[0].SOLUONG,
                    SoLuongTon: e.data[0].SoLuongTon,
                    DONGIA: e.data[0].DONGIA,
                    TILETHUE: 0,
                    TILECHIETKHAU: 0,
                    CHIETKHAU: 0,
                    THANHTIEN: e.data[0].DONGIA,
                    GHICHU: e.data[0].GHICHU,
                    statusManager: 1
                }
                let target = 0;
                if (dataTemp.length === 0) {
                    dataTemp.push(obj)
                } else {
                    var statusChange = false
                    for (var i = 0; i < dataTemp.length; i++) {
                        if (dataTemp[i].MHID === obj.MHID) {
                            dataTemp[i].SOLUONG++;
                            dataTemp[i].THANHTIEN = dataTemp[i].SOLUONG * dataTemp[i].DONGIA
                            if (dataTemp[i].statusManager === 0) {
                                dataTemp[i].statusManager = 2
                            }
                            target = i
                            statusChange = true

                        }
                    }
                    if (statusChange == false) {
                        dataTemp.push(obj)
                    }
                }

                tienhang = 0;
                tongthue = 0;
                tongchietkhau = 0;
                tongtien = 0;


                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();

                if (statusChange == false) {
                    tbl_ctphieu.row(dataTemp.length - 1).select();
                    tbl_ctphieu.row(dataTemp.length - 1).scrollTo(false);
                } else {
                    tbl_ctphieu.row(target).select();
                    tbl_ctphieu.row(target).scrollTo(false);
                }
                obj = {}

            }
        })
    });

    // Click vào table danh sách mặt hàng


    $('#tbl_dsMatHang  tbody').on('click', 'tr', function () {
        var data = tbl_dsMatHang.row($(this).index()).data();
        if (data != null && data != undefined) {
            tbl_dsMatHang.row($(this).index()).select()
            $('#tbl_dsMatHang tbody tr').not(this).removeClass('selected');
        }
    })

    //#endregion  

    // -------------------------------------

    //#region Load nhóm hàng

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
            }
        });
    };

    //Function Reset Cây thư mục
    function resfreshJSTree() {
        $('#jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('#jstree').jstree(true).refresh();
    };

    //Event click nodes
    $('#jstree').on('activate_node.jstree', function (e, data) {
        var path = data.instance.get_path(data.node, '\\');
        $('#title').text(path);
        var parentid = (data.instance.get_node(data.node.parent).id) == "#" ? 0 : data.instance.get_node(data.node.parent).id
        $('#form-table-nhom-kh input[name = "parentID"]').val(parentid);
        $('#form-table-nhom-kh input[name = "id"]').val($('#jstree').jstree('get_selected')[0]);

        filter_dsMH.MHLID = data.node.id;
        tbl_dsMatHang.columns.adjust().draw();
        /*tbNhomHang_filterValues.parentID = $('#jstree').jstree('get_selected')[0];
        tbNhomHang_filterValues.level = 0;
        tbNhomHang.draw();*/
        //let idNodes = $('#jstree').jstree('get_selected')[0];
        //$('#table-nhom-hang tbody').find('tr').removeClass('selected');
        //$('#table-nhom-hang tbody').find('tr[data-id = "' + idNodes + '"]').addClass('selected');
    });
    //#endregion 

    // ------------------------------------- 

    //#region Load Nhân viên   
    $('#table-nv thead tr').clone(true).appendTo('#table-nv thead');
    $('#table-nv thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 10) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-index', i);
            var data10 = [{ key: '--Theo dõi--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data10.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else {
            $(this).html('<input type="text" placeholder="Search ' + title.trim() + '" data-index="' + i + '"/>');
        }
    });

    //Datatable Nhân Viên
    let tbStaff_filterValues = {};
    tbStaff_filterValues.statusDraw = 0
    var tbStaff = $('#table-nv').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (tbStaff_filterValues.statusDraw > 0) {
                tbStaff_filterValues.search1 = $('input[data-index=1]').val();
                tbStaff_filterValues.search2 = $('input[data-index=2]').val();
                tbStaff_filterValues.search3 = $('input[data-index=3]').val();
                tbStaff_filterValues.search4 = $('input[data-index=4]').val();
                tbStaff_filterValues.search5 = $('input[data-index=5]').val();
                tbStaff_filterValues.search6 = $('input[data-index=6]').val();

                tbStaff_filterValues.search7 = $('input[data-index=7]').val();
                tbStaff_filterValues.search8 = $('input[data-index=8]').val();
                tbStaff_filterValues.search9 = $('input[data-index=9]').val();
                tbStaff_filterValues.search10 = $('select[data-index=10]').val();
                tbStaff_filterValues.search11 = $('input[data-index=11]').val();
                tbStaff_filterValues.search12 = $('input[data-index=12]').val();

                tbStaff_filterValues.draw = data.draw;
                tbStaff_filterValues.search = data.search["value"];
                tbStaff_filterValues.start = data.start;
                tbStaff_filterValues.length = data.length;
                tbStaff_filterValues.order = data.order[0].column;
                tbStaff_filterValues.dir = data.order[0].dir;
                tbStaff_filterValues.follow = $('#btn-theo-doi-nhan-vien').val();
                tbStaff_filterValues.export = 0;
                $.ajax({
                    url: '/NhanVien/LoadStaff',
                    method: 'GET',
                    data: tbStaff_filterValues,
                    success: function (msg) {
                        if (msg.status == 2) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            return false;
                        }
                        else if (msg.status == 3) {
                            if (tbStaff_filterValues.draw != 1) {
                                toast.create({
                                    title: 'Notification!',
                                    text: msg.message,
                                    icon: 'error-outline',
                                    classBackground: 'noti-error',
                                    timeout: 3000
                                });
                                location.reload();
                                return false;
                            }
                        }
                    },
                }).done(callback, () => {


                });
            }
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "NVCODE" },
            { "data": "NVTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
            { "data": "NgaySinh" },
            { "data": "GIOITINH" },
            { "data": "CHUCVU" },
            { "data": "LUONGCOBAN" },
            { "data": "CMTND" },
            {
                "data": "THEODOI",
                render: function (data, type, row) {
                    if (type === 'display') {
                        if (data) {
                            return '<input type="checkbox" class="editor-active" checked onclick="return false;">';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    }
                    return data;
                },
                className: "dt-body-center"
            },
            { "data": "QLID" },
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.NVID);
            $(nRow).attr('data-dt-row', iDataIndex);

        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 3,
        },

        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 30//10 nhân cho 3 bằng 30
        },
        "dom": '<"pull-left"f><"pull-right"l>tip',
        orderCellsTop: true
    });

    //Search header
    $(tbStaff.table().container()).on('change', 'thead input', function (e) {
        var stringtr = 'input[data-index="' + $(this).data('index') + '"]'
        $(stringtr).val($(this).val())
        if (e.keyCode == 13) {
            tbStaff.draw();
        }
        tbStaff.draw();
    });

    $(tbStaff.table().container()).on('change', 'thead select', function () {
        tbStaff.draw();
    });


    function tbStaff_timeout() {
        setTimeout(function () {
            tbStaff_filterValues.statusDraw++;
            tbStaff.columns.adjust().draw();
        }, 500)
    }
    $('#danh-sach-nv').on('show.bs.modal', function () {
        if (tbStaff_filterValues.draw < 2 || tbStaff_filterValues.statusDraw < 1) {

            tbStaff_timeout()


        }

    })
    $('.fixed-to-select tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.fixed-to-select').find('tr').removeClass('selected');
        $(this).closest('.fixed-to-select').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    })

    $('#table-nv tbody').on('dblclick', 'tr', function () {
        console.log(this)
        LoadStaffInfo($(this).attr('data-id')).then((e) => {

            console.log(e)
            if ((e.status != 2 || e.Status != 2) && e.Data != null) {

                console.log(e)
                var obj = {
                    NVID: e.Data.NVID,
                    NVCODE: e.Data.NVCODE,
                    NVTEN: e.Data.NVTEN,
                }


                $('select[name="nv-username"]').val(e.Data.NVCODE).trigger('change');
                $('select[name="nv-name"]').val(e.Data.NVCODE).trigger('change');
                // insert--data
                dataInsert.NVID = e.Data.NVID
                dataInsert.NVCODE = e.Data.NVCODE
                dataInsert.NVTEN = e.Data.NVTEN

                $('#danh-sach-nv').modal('toggle')
            } else {
                confirm('Bạn Không đủ quyền để thay đổi user khác')
            }
        })
    });

    async function LoadStaffInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MuaHang/LoadStaffInfo?id=' + id,
            success: function (msg) {
                console.log(msg)
                return msg;
            },
        });
    };


    //#endregion Load nhân viên

    //--------------------------------------

    //#region Load Khách hàng  
    $('#table-nhacungcap thead tr').clone(true).appendTo('#table-nhacungcap thead');
    $('#table-nhacungcap thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 5) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-index', i);
            var data5 = [{ key: '--Theo dõi--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data5.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" placeholder="Search ' + title + '" data-index="' + i + '"/>');
        }
    });

    //Datatable Nhà cung cấp 
    let tbKhachHang_filterValues = {};
    tbKhachHang_filterValues.statusDraw = 0
    var tbKhachHang = $('#table-nhacungcap').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbKhachHang_filterValues.draw = data.draw;
            tbKhachHang_filterValues.search = data.search["value"];

            tbKhachHang_filterValues.search1 = $('input[data-index=1]').val();
            tbKhachHang_filterValues.search2 = $('input[data-index=2]').val();
            tbKhachHang_filterValues.search3 = $('input[data-index=3]').val();
            tbKhachHang_filterValues.search4 = $('input[data-index=4]').val();
            tbKhachHang_filterValues.search5 = $('select[data-index=5]').val();
            tbKhachHang_filterValues.search6 = $('input[data-index=6]').val();
            tbKhachHang_filterValues.search7 = $('input[data-index=7]').val();
            //tbKhachHang_filterValues.search8 = $('input[data-index=8]').val();

            tbKhachHang_filterValues.start = data.start;
            tbKhachHang_filterValues.length = data.length;
            tbKhachHang_filterValues.order = data.order[0].column;
            tbKhachHang_filterValues.dir = data.order[0].dir;
            tbKhachHang_filterValues.export = 0;
            $.ajax({
                url: '/KhachHang/LoadNhaCungCap',
                method: 'GET',
                data: tbKhachHang_filterValues,
                success: function (msg) {
                    if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    }
                    else if (msg.status == 3) {
                        if (tbKhachHang_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error-outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            location.reload();
                            return false;
                        }
                    }
                }
            }).done(callback, () => {
            });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "DIACHI" },
            { "data": "DIENTHOAI" },
            {
                "data": "THEODOI",
                render: function (data, type, row) {
                    if (type === 'display') {
                        if (data) {
                            return '<input type="checkbox" class="editor-active" checked onclick="return false;">';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    }
                    return data;
                },
                className: "dt-body-center"
            },
            { "data": "NGUOIQUANLY" },
            //{ "data": null, defaultContent: '' }, //Ngày mua cuối cùng //45
            { "data": "GHICHU" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.KHID);
            $(nRow).attr('data-dt-row', iDataIndex);
        },

        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 3,
        },

        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        orderCellsTop: true,
    });

    $(tbKhachHang.table().container()).on('keyup', 'thead input', function () {
        var stringtr = 'input[data-index="' + $(this).data('index') + '"]'

        //.. 
        if ($(this).val() === ' ') {
            $(stringtr).val(null)
        } else {
            $(stringtr).val($(this).val())
            tbKhachHang.draw();
        }

    });
    $(tbKhachHang.table().container()).on('change', 'thead select', function () {
        tbKhachHang.draw();
    });

    //....

    function tbKhachHang_timeout() {
        setTimeout(function () {
            tbKhachHang_filterValues.statusDraw++;
            tbKhachHang.columns.adjust().draw();
        }, 500)
    }
    $('#danh-sach-khach-hang').on('show.bs.modal', function () {

        if (tbKhachHang_filterValues.draw < 2 || tbKhachHang_filterValues.statusDraw < 1) {
            tbKhachHang_timeout()
        }
    })

    //Click
    $('.ql-kh tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('.ql-kh').find('tr').removeClass('selected');
        $(this).closest('.ql-kh').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });
    //...

    $('#table-nhacungcap  tbody').on('dblclick', 'tr', function () {

        let datarow = $(this).attr('data-dt-row');
        $(this).closest('#table-nhacungcap').find('tr').removeClass('selected');
        $(this).closest('#table-nhacungcap').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');

        loadKhachhangByID($(this).attr('data-id')).then((e) => {
            if (e.data != undefined) {

                $('select[name="kh-code"]').val(e.data.KHCODE).trigger('change');
                $('select[name="kh-name"]').val(e.data.KHCODE).trigger('change');

                $('input[name="daidien"]').val(e.data.NGUOIDAIDIEN)
                $('input[name="phone"]').val(e.data.DIENTHOAI)
                $('input[name="mob"]').val(e.data.DIDONG)
                $('input[name="diachi"]').val(e.data.DIACHI)
                // insert--data
                dataInsert.KHID = e.data.KHID
                dataInsert.KHCODE = e.data.KHCODE
                dataInsert.KHTEN = e.data.KHTEN
                $('#danh-sach-khach-hang').modal('toggle')
            }
        })
    });

    async function loadKhachhangByID(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhachHang/LoadChiTietKhachHang?id=' + id,
            success: function (msg) {
                return msg;
            },
        });
    }

    //#endregion Load KhachHang

    //--------------------------------------


    //#endregion MODAL CHI TIẾT 

    //--------------------------------------- 

    //#region Action   

    // nút delete trong bản chi tiết phiếu


    $('#tbl_ctphieu tbody').on('click', 'td', function () {
        var index = $(this).index()
        console.log(index)
        var data = tbl_ctphieu.row($(this).parents('tr')).data();
        if (index == 10) {
            if (data.statusManager == 0 || data.statusManager == 2) {
                var target = 0;
                var r = confirm('có muốn xóa không?')
                if (r) {
                    var a = dataTemp.filter(x => x.MHID == data.MHID);
                    if (a.length > 0) {
                        if (a[0].MCTDID != null) {
                            dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1);
                            var obj = {
                                MCTDID: a[0].MCTDID
                            }
                            dataDelete.push(obj);
                            console.log(dataDelete)
                        }

                    }
                    tienhang = 0;
                    tongthue = 0;
                    tongchietkhau = 0;
                    tongtien = 0;

                    if (target != 0) {
                        tbl_ctphieu.row(target - 1).select();
                        tbl_ctphieu.row(target - 1).scrollTo(false);
                    } else {
                        tbl_ctphieu.row(0).select();
                        tbl_ctphieu.row(0).scrollTo(false);
                    }
                    tbl_ctphieu.clear()
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();
                }
                //$.ajax({
                //    type: 'get',
                //    //url: '/muahang/checkdeletectphieu'
                //    url: '/muahang/CheckdeleteDonMuaHang'
                //}).done(function (res) {
                //    if (res.status === 1 || res.Status === 1) {
                //        var r = confirm('có muốn xóa không?')
                //        if (r) {
                //            var a = dataTemp.filter(x => x.MHID == data.MHID);
                //            if (a.length > 0) {
                //                if (a[0].MCTDID != null) {
                //                    dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1);
                //                    var obj = {
                //                        MCTDID: a[0].MCTDID
                //                    }
                //                    dataDelete.push(obj);
                //                    console.log(dataDelete)
                //                }

                //            }
                //            tienhang = 0;
                //            tongthue = 0;
                //            tongchietkhau = 0;
                //            tongtien = 0;

                //            if (target != 0) {
                //                tbl_ctphieu.row(target - 1).select();
                //                tbl_ctphieu.row(target - 1).scrollTo(false);
                //            } else {
                //                tbl_ctphieu.row(0).select();
                //                tbl_ctphieu.row(0).scrollTo(false);
                //            }
                //            tbl_ctphieu.clear()
                //            tbl_ctphieu.rows.add(dataTemp);
                //            tbl_ctphieu.columns.adjust().draw();
                //        }

                //    } else {
                //        console.log(res);
                //        toast.create({
                //            title: 'Notification!',
                //            text: res.message,
                //            icon: 'error_outline',
                //            classBackground: 'noti-error',
                //            timeout: 3000
                //        });
                //    }
                //})
            }
            else {
                tienhang = 0;
                tongthue = 0;
                tongchietkhau = 0;
                tongtien = 0;
                dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1)
                tbl_ctphieu.clear()
                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();
            }
        }
        else if (index == 7) {
            filterObj_tonkho.MHID = data.MHID
        }
    })

    //nút save/ insert
    $('#btn-muactdon-save').on('click', function () {
        SavePhieu()
    })
    $('#btnSave').on('click', function () {
        SavePhieu()
    })

    async function SavePhieu() {
        let dataSSer = []
        dataTemp.map((e) => {
            if (e.statusManager > 0) {
                var objs = {
                    statusManager: e.statusManager,
                    MCTDID: e.MCTDID,
                    MDID: e.MDID,
                    MHID: e.MHID,
                    MHTEN: e.MHTEN,
                    DONGIA: e.DONGIA,
                    KHOID: e.KHOID,
                    KHOCODE: e.KHOCODE,
                    SOLUONG: e.SOLUONG,
                    TILETHUE: e.TILETHUE,
                    TILECHIETKHAU: e.TILECHIETKHAU,
                    GHICHU: e.GHICHU
                }
                dataSSer.push(objs)
            }
        })

        let checkSelectTenTK = $('select[name="kh-name"]').next(".select2-container").is(":hidden");
        let checkSelectTK = $('select[name="kh-code"]').next(".select2-container").is(":hidden");
        var dataUp = new FormData();
        // trường hợp dành cho update / insert
        if (dataMuaDon.length > 0 && dataMuaDon[0].MDID != null && dataMuaDon[0].MDID != undefined) {

            dataUp.append('MDID', dataMuaDon[0].MDID)
            dataUp.append('MDCODE', dataMuaDon[0].MDCODE == null ? "" : dataMuaDon[0].MDCODE)



            dataUp.append('KHCODE', $('select[name="kh-code"]').val() == null ? '' : $('select[name="kh-code"]').val())


            dataUp.append('NVCODE', $('select[name="nv-username"]').val() == null ? '' : $('select[name="nv-username"]').val())


            dataUp.append('NGAYHD', $('input[name="ngay-lapphieu"]').val())
            dataUp.append('TIENTEID', $('select[name="tientes"]').val())
            dataUp.append('TIENTECODE', dataMuaDon[0].TIENTECODE == null ? "" : dataMuaDon[0].TIENTECODE)
            dataUp.append('TIGIA', dataMuaDon[0].TIGIA == null ? "" : dataMuaDon[0].TIGIA)
            dataUp.append('CAID', $('select[name="cas"]').val())
            dataUp.append('DIEUKHOANTTID', dataMuaDon[0].DIEUKHOANTTID == null ? "" : dataMuaDon[0].DIEUKHOANTTID)

            dataUp.append('HTTTID', dataMuaDon[0].HTTTID == null ? "" : dataMuaDon[0].HTTTID)
            dataUp.append('EXPECTEDDATE', $('input[name="ngay-nhanhang"]').val())
            dataUp.append('HANTHANHTOAN', $('input[name="han-thanhtoan"]').val())

            dataUp.append('STATUS', dataMuaDon[0].STATUS == null ? "" : dataMuaDon[0].STATUS) //chưa biết 
            dataUp.append('DIENGIAI', $('#ghi-chu').val())
            dataUp.append('LDNID', $('select[name="lydos"]').val() == null ? '' : $('select[name="lydos"]').val())

            dataUp.append('USERID', dataMuaDon[0].USERID == null ? "" : dataMuaDon[0].USERID)
            dataUp.append('SUBMITEDBY', dataMuaDon[0].SUBMITEDBY == null ? "" : dataMuaDon[0].SUBMITEDBY)

            dataUp.append('SRIDFROM', dataMuaDon[0].SRIDFROM == null ? '' : dataMuaDon[0].SRIDFROM)
            dataUp.append('SRIDTO', $('select[name="showrooms"]').val() == null ? "" : $('select[name="showrooms"]').val())
            dataUp.append('ISPO', true)
            dataUp.append('SHIPPED', dataMuaDon[0].SHIPPED == null ? "" : dataMuaDon[0].SHIPPED)
            dataUp.append('PRID', dataMuaDon[0].PRID == null ? "" : dataMuaDon[0].PRID)
            dataUp.append('PRCODE', dataMuaDon[0].PRCODE == null ? "" : dataMuaDon[0].PRCODE)
            dataUp.append('dataSSer', JSON.stringify(dataSSer))
            dataUp.append('dataDelete', JSON.stringify(dataDelete))

            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkupdate/'
            }).done(function (res) {
                if (res.status === 1 || res.Status === 1) {

                    var xhr
                    var fn = function () {
                        if (xhr) {
                            xhr.abort();
                        }
                        xhr = $.ajax({
                            type: 'POST',
                            url: '/MuaHang/UpdateMuaDona',
                            data: dataUp,
                            contentType: false,
                            processData: false,
                            // contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (ress) {

                                if (ress.status === 1) {

                                    clearInModal()
                                    var datas = tbl_donmuahang.row($('#tbl_donmuahang tbody tr.selected').index()).data();
                                    selectedId = datas.MDID
                                    tbl_donmuahang.search('').order(0).columns.adjust().draw();
                                    $('#them-order').modal('toggle');

                                    toast.create({
                                        title: 'Notification!',
                                        text: 'Thành công',
                                        icon: 'check',
                                        classBackground: 'noti-success',
                                        timeout: 3000
                                    });
                                } else {
                                    toast.create({
                                        title: 'Notification!',
                                        text: ress.message,
                                        icon: 'error_outline',
                                        classBackground: 'noti-error',
                                        timeout: 3000
                                    });
                                }
                            }
                        })
                    };
                    fn()

                } else {
                    confirm(res.message)
                }

            })



        } else if (dataTemp.length > 0) {

            // insert--data
            dataUp.append('MDID', '') // MuaDon
            dataUp.append('MDCODE', $('input[name="so-hoadon"]').val())
            if (checkSelectTK == false && checkSelectTenTK == false) {
                dataUp.append('KHCODE', $('select[name="kh-code"]').val() == null ? '' : $('select[name="kh-code"]').val())
            }
            else {
                dataUp.append('KHCODE', $('select[name="kh-code-po"]').val() == null ? '' : $('select[name="kh-code-po"]').val())
            }
            dataUp.append('NVCODE', $('select[name="nv-username"]').val() == null ? '' : $('select[name="nv-username"]').val())
            dataUp.append('NGAYHD', $('input[name="ngay-lapphieu"]').val())// can kiem tra
            dataUp.append('EXPECTEDDATE', $('input[name="ngay-nhanhang"]').val())
            dataUp.append('HANTHANHTOAN', $('input[name="han-thanhtoan"]').val())
            dataUp.append('TIENTEID', $('select[name="tientes"]').val())
            dataUp.append('TIENTECODE', '') // 
            dataUp.append('CAID', $('select[name="cas"]').val())

            dataUp.append('DIEUKHOANTTID', '') //
            dataUp.append('HTTTID', '') //

            dataUp.append('STATUS', '') //
            dataUp.append('DIENGIAI', $('#ghi-chu').val()) //
            // dataUp.append('GHICHU', $('#ghi-chu').val()) 

            dataUp.append('LDNID', $('select[name="lydos"]').val() == null ? '' : $('select[name="lydos"]').val())
            dataUp.append('LDNXID', $('#lydox').val() == null ? '' : $('#lydox').val())
            dataUp.append('SRIDFROM', $('select[name="khos"]').val() == null ? '' : $('select[name="khos"]').val())
            dataUp.append('SRIDTO', $('select[name="showrooms"]').val() == null ? '' : $('select[name="showrooms"]').val())
            dataUp.append('ISPO', statusSOPO) // 
            dataUp.append('SHIPPED', '')//
            let ISPO = statusSOPO;
            dataUp.append('USERID', '') // 
            dataUp.append('SUBMITEDBY', '')//

            dataUp.append('PRID', '')
            dataUp.append('PRCODE', '')
            dataUp.append('dataSSer', JSON.stringify(dataSSer))
            dataUp.append('dataDelete', JSON.stringify(dataDelete))

            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkinsert/'
            }).done(function (res) {
                if (res.status === 1 || res.Status === 1) {
                    $.ajax({
                        type: 'POST',
                        url: '/MuaHang/UpdateMuaDona',
                        data: dataUp,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (ress) {
                            if (ress.status === 1) {

                                tbl_donmuahang.search('').order(0).columns.adjust().draw();

                                $('#them-order').modal('toggle');

                                toast.create({
                                    title: 'Notification!',
                                    text: 'Thành công',
                                    icon: 'check',
                                    classBackground: 'noti-success',
                                    timeout: 3000
                                });
                                if (ress.data.length > 0) {
                                    let InsertMD = ress.data[0].InsertMD;
                                    console.log(InsertMD);
                                    console.log(ISPO);
                                    if (InsertMD != undefined) {
                                        if (ISPO == true) {
                                            var getOrder = tbl_ctphieu.order();
                                            var Desc = getOrder[0][1];
                                            var NumberOrder = getOrder[0][0];
                                            var link = '/muahang/print?mdid= ' + InsertMD + '&desc=' + Desc + '&order=' + NumberOrder;
                                            window.open(link)
                                        }
                                        else {
                                            var getOrder = tbl_ctphieu.order();
                                            var Desc = getOrder[0][1];
                                            var NumberOrder = getOrder[0][0];
                                            NumberOrder = parseInt(NumberOrder) + 1;
                                            var link = '/BanHang/InDonHang?mdid=' + InsertMD + '&desc=' + Desc + '&order=' + NumberOrder;
                                            window.open(link);
                                        }
                                    }
                                }
                                clearInModal();
                            } else if (ress.status === 4) {
                                var r = confirm('Số phiếu bị trùng, vui lòng chọn OK để reset số phiếu để có thể tiếp tục')
                                if (r) {
                                    CheckMDCode().then((e) => {
                                        if (e != undefined) {
                                            $('input[name="so-hoadon"]').val(e.mdcode)
                                        }
                                    })
                                    //$.ajax({
                                    //    method: 'GET',
                                    //    url: '/Muahang/CheckMDCode',
                                    //    success: function (res) {
                                    //        if (res.length > 0) {
                                    //            $('input[name="so-hoadon"]').val(res.mdcode)
                                    //        }
                                    //    },
                                    //});
                                }

                            } else {
                                toast.create({
                                    title: 'Notification!',
                                    text: ress.message,
                                    icon: 'error_outline',
                                    classBackground: 'noti-error',
                                    timeout: 3000
                                });
                            }
                        }
                    })
                } else {
                    confirm(res.message)
                }
            })

        } else {
            toast.create({
                title: 'Notification!',
                text: "Bạn phải chọn ít nhất 1 mặt hàng để ghi",
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }


    //nút in phiếu
    $('#btn-muactdon-print').on('click', function () {
        if (dataMuaDon[0].MDID.length > 0) {
            var mdid = dataMuaDon[0].MDID
            var getOrder = tbl_ctphieu.order();
            var Desc = getOrder[0][1];
            var NumberOrder = getOrder[0][0];
            var link = '/muahang/print?mdid= ' + mdid + '&desc=' + Desc + '&order=' + NumberOrder;
            window.open(link)
        }
        //else {
        //    toast.create({
        //        title: 'Thông Báo!',
        //        text: 'Đơn hàng chưa được tạo',
        //        icon: 'error_outline',
        //        classBackground: 'noti-error',
        //        timeout: 3000
        //    })
        //}
    })

    // function In chi tiết đơn mua hàng
    function InCTMuaHang() {
        if (dataMuaDon[0].MDID.length > 0) {
            var mdid = dataMuaDon[0].MDID
            var getOrder = tbl_ctphieu.order();
            var Desc = getOrder[0][1];
            var NumberOrder = getOrder[0][0];
            var link = '/muahang/print?mdid= ' + mdid + '&desc=' + Desc + '&order=' + NumberOrder;
            window.open(link)
        }
        //} else {
        //    toast.create({
        //        title: 'Notification!',
        //        text: "Đơn hàng chưa tạo",
        //        icon: 'error_outline',
        //        classBackground: 'noti-error',
        //        timeout: 3000
        //    });
        //}
    }
    // nút export file excel
    $('#btn-muactdon-export').on('click', function () {
        var dataUp = []
        dataUp.MDID = dataMuaDon[0].MDID == null ? "" : dataMuaDon[0].MDID
        dataUp.MDCODE = dataMuaDon[0].MDCODE == null ? "" : dataMuaDon[0].MDCODE
        dataUp.KHID = dataMuaDon[0].KHID == null ? "" : dataMuaDon[0].KHID
        dataUp.KHCODE = $('select[name="kh-code"]').val()
        dataUp.NVID = dataMuaDon[0].NVID == null ? "" : dataMuaDon[0].NVID
        dataUp.NVCODE = $('select[name="nv-username"]').val()

        dataUp.TIENTEID = $('select[name="tientes"]').val()
        dataUp.CAID = $('select[name="cas"]').val()


        dataUp.LDNID = $('select[name="lydos"]').val()



        dataUp.SRIDFROM = $('select[name="khos"]').val() == null ? "" : $('select[name="khos"]').val()
        dataUp.SRIDTO = $('select[name="showrooms"]').val() == null ? "" : $('select[name="showrooms"]').val()




        $.ajax({
            type: 'GET',
            url: '/MuaHang/checkExport/'
        }).done(function (res) {
            if (res.status === 1 || res.Status === 1) {


                var link = `/MuaHang/ExportCTPhieu?MDID=` + dataUp.MDID + `&MDCODE=` + dataUp.MDCODE + `&KHID=` + dataUp.KHID + `&KHCODE=` + dataUp.KHCODE + `&NVID=` + dataUp.NVID + `&NVCODE=` + dataUp.NVCODE
                    + `&TIENTEID=` + dataUp.TIENTEID + `&CAID=` + dataUp.CAID + `&LDNID=` + dataUp.LDNID + `&SRIDFROM=` + dataUp.SRIDFROM + `&SRIDTO=` + dataUp.SRIDTO + ``
                //var link = `/MuaHang/LoadJsonDonMuaHang?draw=` + filterReport.draw + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&status=` + filterReport.status + `&search=` + filterReport.search + `&from=` + filterReport.from + `&to` + filterReport.to + `&export=` + filterReport.export + ``

                window.open(link)
            } else {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
            }

        })
    })


    //--------------------------------------
    // nút Duyệt / Hủy

    var approved = false;
    $('#btn-duyet-phieu').on('click', function () {

        $('#quare').css('background-color', 'yellow')
        $('#duyet-content').html('Đang thực hiện (pending), cho phép tiếp tục chuyển khai')
        approved = true
    })

    $('#btn-huy-phieu').on('click', function () {
        $('#quare').css('background-color', 'red')
        $('#duyet-content').html('Phiếu chuyển sang trạng thái bị hủy');
        approved = false;
    })

    $('#btn-duyet-ghi').on('click', function () {
        var duyet = new FormData();
        var mdid = dataMuaDon[0].MDID == null ? "" : dataMuaDon[0].MDID
        duyet.append('Approved', approved)
        duyet.append('diengiai', $('#duyet-dien-giai').val())
        duyet.append('MDID', mdid)
        $.ajax({
            type: 'POST',
            url: '/MuaHang/Approve',
            data: duyet,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.status === 1) {
                    $('#duyet-dien-giai').val('')
                    $('#popup-duyet-phieu').modal('toggle')
                    $('#them-order').modal('toggle')
                    tbl_donmuahang.columns.adjust().draw()

                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                } else if (res.status === 2) { // check loi data
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                } else if (res.Status === 2) { // check phan quyen
                    toast.create({
                        title: 'Notification!',
                        text: res.Message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        })

    })




    //#endregion ACTION

    //---------------------------------------

    //#region  Xử lý các nút đặc biệt



    // Sale order to SO
    let statusSOPO = true
    $('#btn-muadon-saleorder').on('click', function () {
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index');
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để sửa',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            $('#btn-duyet-phieu').attr('hidden', 'hidden')
            $('#btn-huy-phieu').attr('hidden', 'hidden')
            $('.muahang-status').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-nhap').removeClass('disabled-nhap-kho')
            $('#btn-muactdon-export').addClass('disabled-nhap-kho')
            $('#btn-muactdon-print').addClass('disabled-nhap-kho')
            getDataNV();
            var dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');

            $('.lydo').attr('hidden', 'hidden')
            $('.lydox').removeAttr('hidden')
            $('#them-order').modal();
            loadDataAllMuaDon(dataid,1).then((of) => {
                //=--------------
                CheckMDCode().then((e) => {
                    if (e != null) {
                        $('input[name="so-hoadon"]').val(e.mdcode)
                    } else {
                        confirm('Lỗi mã hóa đơn')
                    }
                })
                //$.ajax({
                //    type: 'GET',
                //    url: '/MuaHang/CheckMDCode',
                //    success: function (res) {
                //        if (res != null) {
                //            $('input[name="so-hoadon"]').val(res.mdcode)
                //        } else {
                //            confirm('Lỗi mã hóa đơn')
                //        }
                //    }
                //})
                if (of.chitiet.data.length > 0) {

                    var data = of.chitiet.data[0]

                    $('.default-form select[name="kh-code"]').val(data.KHCODE).trigger('change');
                    $('.default-form select[name="kh-name"]').val(data.KHCODE).trigger('change');
                    var nvcode = $('.wrapper').attr('data-user-code')
                    $('select[name="nv-username"]').val(nvcode).trigger('change');
                    $('select[name="nv-name"]').val(nvcode).trigger('change');

                    $('.default-form input[name="so-hoadon"]').val(data.MDCODE)
                    $('.default-form input[name="ngay-lapphieu"]').val(moment(new Date()).format('DD/MM/yyyy'))
                    $('.default-form input[name="ngay-nhanhang"]').val(moment(new Date()).format('DD/MM/yyyy'))
                    $('.default-form input[name="han-thanhtoan"]').val(moment(new Date()).format('DD/MM/yyyy'))


                    $('#statusCT').val(data.STATUS)
                    $('#lydo').val(data.LDNID)
                    $('#showroom').val(data.SRIDTO)
                    $('#tiente').val(data.TIENTEID)
                    $('#ca').val(data.CAID)

                    if (data.STATUS === '0') {
                        $('#statusCT').val('-1')
                    }
                    // check box shipped
                    if (data.SHIPPED) {

                        $('#shipped').attr("checked", "checked");
                    }
                    $('#ghi-chu').val(data.DIENGIAI)
                }

                if (of.list_chitiet.data.length > 0) {

                    var data = of.list_chitiet.data;
                    for (var i = 0; i < data.length; i++) {
                        f = data[i]
                        var obj = {
                            SORTORDER: f.CAUHINH,
                            MCTDID: null,
                            MDID: null,
                            KHID: null,
                            NPPID: null,
                            MHID: f.MHID,
                            MHCODE: f.MHCODE,
                            MHTEN: f.MHTEN,
                            KHOCODE: f.MHCODE,
                            SOLUONG: f.SOLUONG,
                            DONVI: f.DONVI,
                            KHOCODE: f.KHOCODE,
                            KHOID: f.KHOID,
                            SOLUONGEX: f.SOLUONG,
                            SoLuongTon: f.SoLuongTon,
                            DONGIA: f.DONGIA,
                            TILETHUE: f.TILETHUE,
                            TILECHIETKHAU: f.TILECHIETKHAU,
                            CHIETKHAU: f.CHIETKHAU,
                            THANHTIEN: f.THANHTIEN,
                            GHICHU: f.GHICHU,
                            statusManager: 1,
                            MHTID: f.MHTID,
                            LINKIMAGE: f.LINKIMAGE
                        }
                        dataTemp.push(obj);
                        console.log(dataTemp);
                    }
                    $('select[name="khos"]').val(of.list_chitiet.data[0].KHOID);
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();
                }
            })
            statusSOPO = false
        }
    })


    var setCall = 0;
    function getDataNV() {
        if (setCall == 0) {
            LoadDataNV().then((e) => {
                setCall++;
                // HTML Khach Hang
                e.dataNCC.map((value) => {
                    $('select[name="kh-code-po"]').append('<option value="' + value.KHCODE + '">' + value.KHCODE + '</option>');
                    $('select[name="kh-name-po"]').append('<option value="' + value.KHCODE + '">' + value.KHTEN + '</option>');
                    $('select[name="kh-code"]').next(".select2-container").hide();
                    $('select[name="kh-name"]').next(".select2-container").hide();

                    $('select[name="kh-code-po"]').select2({ dropdownParent: $("#them-order"), width: '125px' });
                    $('select[name="kh-name-po"]').select2({ dropdownParent: $("#them-order"), width: '160px' });
                    $('select[name="kh-code-po"]').next(".select2-container").show();
                    $('select[name="kh-name-po"]').next(".select2-container").show();
                })
            }).catch(() => { console.log('error') })
        }
        else {
            $('select[name="kh-code"]').next(".select2-container").hide();
            $('select[name="kh-name"]').next(".select2-container").hide();
            $('select[name="kh-code-po"]').next(".select2-container").show();
            $('select[name="kh-name-po"]').next(".select2-container").show();
        }

    }

    //Phiếu nhập kho - PCK
    $('#btn-muadon-nhapkho').on('click', function () {
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index')
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để sửa',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            let dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');
            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkInsertPhieuNhapKho',
                data: { "mdid": dataid },
                success: function (msg) {
                    if (msg.status == 1) {
                        let link = `/phieunhapkho?id=` + dataid + ``
                        window.open(link)
                    } else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                    else if (msg.status == 4) {
                        alert(msg.message);
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
        }
    })


    // CHuyen kho
    $('#btn-muadon-chuyenkho').on('click', function () {
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index')
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để sửa',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            let dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');
            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkInsertChuyenKho',
                data: { "mdid": dataid },
                success: function (msg) {
                    if (msg.status == 1 || msg.Status == 1) {
                        let link = `/chuyenkho?id=` + dataid + ``
                        window.open(link)
                    } else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                    else if (msg.status == 4) {
                        alert(msg.message);
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
        }
    })



    // Hang Mua Tra Lai
    $('#btn-muadon-hang-tralai').on('click', function () {
        var dataindex = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-index')
        if (dataindex == null || dataindex == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng để sửa',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            let dataid = $('#tbl_donmuahang tbody').find('tr.selected').attr('data-id');
            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkInsertHangMuaTraLai',
                data: { "mdid": dataid },
                success: function (msg) {
                    if (msg.status == 1) {
                        let link = `/HangMuaTraLai?id=` + dataid + ``
                        window.open(link)
                    } else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                    else if (msg.status == 4) {
                        alert(msg.message);
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

        }
    })


    //#region Import Excel
    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/MuaHang/CreateMatHangBanHangExcel`
        window.open(link)
    })
    $("#btnFileUploadBH").click(function () {
        $("#FileUploadBH").click();
    })
    $("#FileUploadBH").change(function (event) {
        let input, files;
        input = event.target;
        files = input.files;
        kho = $('select[name="khos"]').val();
        Array.from(files).map((file, index) => {
            console.log(file);
            var formdata = new FormData();
            formdata.append('fileupload', file);
            formdata.append('khoid', kho);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/MuaHang/ImportBH',
                data: formdata,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (msg) {
                    console.log(msg.data);
                    if (msg.status == 1) {
                        if (msg.data.length > 0) {
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };
                            for (let i = 0; i < msg.data.length; i++) {
                                if (!unique[msg.data[i].MHCODE]) {
                                    console.log(!unique[msg.data[i].MHCODE]);
                                    objmathangimport.push({
                                        "MHCODE": msg.data[i].MHCODE,
                                        "SOLUONG": msg.data[i].SoLuongCusTom,
                                        "DONGIA": msg.data[i].DonGiaCusTom,
                                        "GHICHU": msg.data[i].GhiChuCusTom,
                                        "MHID": msg.data[i].MHID,
                                        "SoLuongTon": msg.data[i].SoLuongTon,
                                        "KhoID": msg.data[i].KhoID,
                                        "MHTEN": msg.data[i].MHTEN,
                                        "TILETHUE": msg.data[i].Thue,
                                        "TILECHIETKHAU": msg.data[i].TiLeChietKhau,
                                        "DONVI": msg.data[i].DonVi,
                                        "THANHTIEN": msg.data[i].ThanhTien,
                                        "TienChietKhau": msg.data[i].TienChietKhau,
                                        "status": 0,
                                        "KHOCODE": msg.data[i].KHOCODE,
                                        "MHTID": msg.data[i].MHTID,
                                        "LINKIMAGE": msg.data[i].LINKIMAGE
                                    })
                                    unique[msg.data[i].MHCODE] = 1;
                                }
                                else if (unique[msg.data[i].MHCODE] == 1) {
                                    for (var key in objmathangimport) {
                                        if (objmathangimport[key].MHCODE == msg.data[i].MHCODE) {
                                            objmathangimport[key].SOLUONG = parseFloat(objmathangimport[key].SOLUONG) + parseFloat(msg.data[i].SoLuongCusTom);
                                            var THANHTIEN = intVal(objmathangimport[key].SOLUONG) * intVal(objmathangimport[key].DONGIA);
                                            var TienChietKhau = THANHTIEN * objmathangimport[key].TILECHIETKHAU / 100;
                                            THANHTIEN = THANHTIEN - (THANHTIEN * parseFloat(objmathangimport[key].TILECHIETKHAU) / 100);
                                            THANHTIEN = THANHTIEN + (THANHTIEN * parseFloat(objmathangimport[key].TILETHUE) / 100);
                                            objmathangimport[key].THANHTIEN = Math.round(THANHTIEN);
                                            objmathangimport[key].TienChietKhau = Math.round(TienChietKhau);
                                            break;
                                        }
                                    }
                                }
                            }
                            tbMuaHangImport.clear();
                            tbMuaHangImport.rows.add(objmathangimport);
                            console.log(objmathangimport);
                            tbMuaHangImport.columns.adjust().draw();
                            $("#btn-ghi-import-bh").prop('disabled', false);
                            $("#FileUploadBH").val('');
                            toast.create({
                                title: 'Notification!',
                                text: 'Thành công',
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            });
                        }
                    }
                    else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        $("#FileUploadBH").val('');
                    }
                },
                error: function (error) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Không thành công, vui lòng kiểm tra file import và thử lại',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $("#FileUploadBH").val('');
                }
            });
        })
    })

    var unique = [];
    var objmathangimport = [];
    var tbMuaHangImport = $('#table-import-bh').DataTable({
        bFilter: false,
        bInfo: false,
        data: objmathangimport,
        select: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            { data: null },
            { data: "MHCODE" },
            { data: "MHTEN" },
            { data: "SOLUONG" },
            { data: "DONVI" },
            { data: "DONGIA" },
            { data: "TILETHUE" },
            { data: "TILECHIETKHAU" },
            { data: "GHICHU" }
        ],
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 200,
        },
        'lengthChange': false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            var total = data.length;
            if (total > 0) {
                ////update footer
                $(api.column(0).footer()).html(total);
            }
            else {
                $(api.column(0).footer()).html("0");
            }
        }
    });

    $("#nhap-bh").click(function () {
        $.ajax({
            method: "GET",
            url: "/MuaHang/CheckRoleXuat",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $('#btn-nhap-bh').modal();
                }
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $('#btn-nhap-bh').modal('hide');
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
    })
    $("#btn-nhap-bh").on('shown.bs.modal', function () {
        tongchietkhau = 0;
        tongtienhang = 0;
        tongthue = 0;
        dataTemp = [];
        tbl_ctphieu.clear();
        tbl_ctphieu.rows.add(dataTemp);
        tbl_ctphieu.columns.adjust().draw();
        tbMuaHangImport.columns.adjust().draw();
        var CountData = tbMuaHangImport.data().count();
        $("#btn-ghi-import-bh").prop('disabled', true);
        if (CountData > 0) {
            $("#btn-ghi-import-bh").prop('disabled', false);
        }
    })
    $('#btn-nhap-bh').on('hidden.bs.modal', function (e) {
        objmathangimport = [];
        unique = [];
        tbMuaHangImport.clear();
        tbMuaHangImport.rows.add(objmathangimport);
        tbMuaHangImport.columns.adjust().draw();
    })
    $("#btn-ghi-import-bh").click(function () {
        var CountData = tbMuaHangImport.data().count();
        if (CountData > 0) {
            console.log(objmathangimport)
            dataTemp = [];
            for (var i in objmathangimport) {
                var s = objmathangimport[i]
                f = objmathangimport[i]
                if (f.SOLUONG === 0) {
                    f.SOLUONG = 1
                }
                var dgsl_index = f.SOLUONG * f.DONGIA
                var chietkhau_index = dgsl_index * f.TILECHIETKHAU / 100
                var thue_index = (dgsl_index - chietkhau_index) * f.TILETHUE / 100
                var thanhtien_index = dgsl_index - chietkhau_index + thue_index
                var obj = {

                    DONGIA: s.DONGIA,
                    DONVI: s.DONVI,
                    GHICHU: s.GHICHU,
                    KHOID: s.KhoID,
                    MHCODE: s.MHCODE,
                    MHID: s.MHID,
                    MHTEN: s.MHTEN,
                    SOLUONG: s.SOLUONG,
                    SoLuongTon: s.SoLuongTon,
                    TILECHIETKHAU: s.TILECHIETKHAU,
                    TILETHUE: s.TILETHUE,
                    THUE: thue_index,
                    CHIETKHAU: chietkhau_index,
                    THANHTIEN: thanhtien_index,
                    KHOCODE: s.KHOCODE,
                    statusManager: 1,
                    MHTID: s.MHTID,
                    LINKIMAGE: s.LINKIMAGE

                }
                dataTemp.push(obj)
            }

            tbl_ctphieu.clear();
            tbl_ctphieu.rows.add(dataTemp);
            tbl_ctphieu.columns.adjust().draw();
            $("#btn-nhap-bh").modal('hide');
        }
    })

    /* $('#btn-muactdon-export').on('click', function () {
         var dataXuat = []
         for (var i in dataTemp) {
             var s = dataTemp[i];
             var obj = {
                 MHCODE: s.MHCODE,
                 MHTEN: s.MHTEN,
                 KHOCODE: s.KHOCODE,
                 SOLUONG: s.SOLUONG,
                 DONVI: s.DONVI,
                 SoLuongTon: s.SoLuongTon,
                 DONGIA: s.DONGIA,
                 TILETHUE: s.TILETHUE,
                 TILECHIETKHAU: s.TILECHIETKHAU,
                 THANHTIEN: s.THANHTIEN,
                 GHICHU: s.GHICHU,
             }
             dataXuat.push(obj)
         }
         if (dataXuat.length > 0) {
             $.ajax({
                 type: 'GET',
                 url: '/MuaHang/CheckRoleXuat',
                 success: function (res) {
                     if (res.status == 1) { 
                         var link = `/MuaHang/ExportCTExcel?dataTemp=` + JSON.stringify(dataXuat)+`` 
                         window.open(link)
                          
                     } else {
                         toast.create({
                             title: 'Notification!',
                             text: res.message == null ? res.Message : res.message ,
                             icon: 'error_outline',
                             classBackground: 'noti-error',
                             timeout: 3000
                         });
                     }
                 }
             })
         }
 
     })
    */
    //#endregion


    //#endregion
})
function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

function InitDatetime() {
    //datepicker
    $.datetimepicker.setLocale('en');
    $('.datetimepicker').each(function () {
        $(this).attr('autocomplete', 'off');
        $(this).datetimepicker({
            format: 'd/m/Y H:i',
            formatDate: 'd/m/Y',
            allowTimes: [
                '06:00',
                '06:15',
                '06:30',
                '06:45',
                '07:00',
                '07:15',
                '07:30',
                '07:45',
                '08:00',
                '08:15',
                '08:30',
                '08:45',
                '09:00',
                '09:15',
                '09:30',
                '09:45',
                '10:00',
                '10:15',
                '10:30',
                '10:45',
                '11:00',
                '11:15',
                '11:30',
                '11:45',
                '12:00',
                '12:15',
                '12:30',
                '12:45',
                '13:00',
                '13:15',
                '13:30',
                '13:45',
                '14:00',
                '14:15',
                '14:30',
                '14:45',
                '15:00',
                '15:15',
                '15:30',
                '15:45',
                '16:00',
                '16:15',
                '16:30',
                '16:45',
                '17:00',
                '17:15',
                '17:30',
                '17:45',
                '18:00',
                '18:15',
                '18:30',
                '18:45',
                '19:00',
                '19:15',
                '19:30',
                '19:45',
                '20:00',
                '20:15',
                '20:30',
                '20:45',
                '21:00',
                '21:15',
                '21:30',
                '21:45',
                '22:00',
                '22:15',
                '22:30',
                '22:45',
                '23:00',
                '23:15',
                '23:30',
                '23:45',
            ],
            // theme:'dark',
            // defaultDate:new Date(),
            onShow: function (ct, element) {
                if ($(element).hasClass('to-date')) {
                    var minDate = $(element).closest('.row').find('.from-date').val();
                    console.log(minDate);
                    this.setOptions({
                        minDate: minDate ? minDate : false,
                    })
                }
                if ($(element).hasClass('date-only')) {
                    this.setOptions({
                        timepicker: false,
                        format: 'd/m/Y',
                        mask: true,
                    })
                }
            }
        });
    });
}
serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
