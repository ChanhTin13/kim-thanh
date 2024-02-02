$(document).ready(function () {
    //#region Báo cáo chuyển kho
    let searchFromDate_BaoCao = $('#search-bao-cao input[name="fromBCChuyenKho"]');
    searchFromDate_BaoCao.val(moment(new Date()).format('DD/MM/yyyy'));
    let searchToDate_BaoCao = $('#search-bao-cao input[name="toBCChuyenKho"]');
    searchToDate_BaoCao.val(moment(new Date()).format('DD/MM/yyyy'));
    let searchSR_BaoCao  = $('#search-bao-cao select[name="slShowRoom"]');
    let searchStatus_BaoCao = $('#search-bao-cao select[name="slStatusBCChuyenKho"]');

    let fdate_BaoCao = null;
    let tdate_BaoCao = null;
    let srid_BaoCao = null;
    let status_BaoCao = null;
    let indexDraw = 0;

    var objKHOMH = [];
    var objDeleteCTPhieu = [];
    var dsNV = [];
    var dsNV2 = [];

    let tbBaoCaoChuyenKho_filterValues = {};
    $('#table-bao-cao-chuyen-kho thead tr').clone(true).appendTo('#table-bao-cao-chuyen-kho thead');
    $('#table-bao-cao-chuyen-kho thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 1) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-bao-cao-chuyen-kho', i);
            var data1 = [{ key: '--Đã xác nhận--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data1.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 3 || i == 19 || i == 20) {
            $(this).html('<input class="datetimepicker date-only" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-bao-cao-chuyen-kho="' + i + '" /> ');
            InitDatetime();
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-bao-cao-chuyen-kho="' + i + '"/>');
        }

        $('input', this).on('keyup change', delay(function () {
            if (tbBaoCaoChuyenKho.column(i).search() !== this.value) {
                tbBaoCaoChuyenKho
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });

    //DataTable báo cáo chuyển kho
    var tbBaoCaoChuyenKho = $('#table-bao-cao-chuyen-kho').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (indexDraw > 0) {
                tbBaoCaoChuyenKho_filterValues.draw = data.draw;
                tbBaoCaoChuyenKho_filterValues.fdate = fdate_BaoCao;
                tbBaoCaoChuyenKho_filterValues.tdate = tdate_BaoCao;
                tbBaoCaoChuyenKho_filterValues.srid = srid_BaoCao;
                tbBaoCaoChuyenKho_filterValues.status = status_BaoCao;
                tbBaoCaoChuyenKho_filterValues.start = data.start;
                tbBaoCaoChuyenKho_filterValues.length = data.length;
                tbBaoCaoChuyenKho_filterValues.order = data.order[0].column;
                tbBaoCaoChuyenKho_filterValues.dir = data.order[0].dir;
                tbBaoCaoChuyenKho_filterValues.export = 0;

                tbBaoCaoChuyenKho_filterValues.search1 = $('select[data-search-bao-cao-chuyen-kho=1]').val();
                tbBaoCaoChuyenKho_filterValues.search2 = $('input[data-search-bao-cao-chuyen-kho=2]').val();
                tbBaoCaoChuyenKho_filterValues.search3 = $('input[data-search-bao-cao-chuyen-kho=3]').val();
                tbBaoCaoChuyenKho_filterValues.search4 = $('input[data-search-bao-cao-chuyen-kho=4]').val();
                tbBaoCaoChuyenKho_filterValues.search5 = $('input[data-search-bao-cao-chuyen-kho=5]').val();
                tbBaoCaoChuyenKho_filterValues.search6 = $('input[data-search-bao-cao-chuyen-kho=6]').val();
                tbBaoCaoChuyenKho_filterValues.search7 = $('input[data-search-bao-cao-chuyen-kho=7]').val();
                tbBaoCaoChuyenKho_filterValues.search8 = $('input[data-search-bao-cao-chuyen-kho=8]').val();
                tbBaoCaoChuyenKho_filterValues.search9 = $('input[data-search-bao-cao-chuyen-kho=9]').val();
                tbBaoCaoChuyenKho_filterValues.search10 = $('input[data-search-bao-cao-chuyen-kho=10]').val();
                tbBaoCaoChuyenKho_filterValues.search11 = $('input[data-search-bao-cao-chuyen-kho=11]').val();
                tbBaoCaoChuyenKho_filterValues.search12 = $('input[data-search-bao-cao-chuyen-kho=12]').val();
                tbBaoCaoChuyenKho_filterValues.search13 = $('input[data-search-bao-cao-chuyen-kho=13]').val();
                tbBaoCaoChuyenKho_filterValues.search14 = $('input[data-search-bao-cao-chuyen-kho=14]').val();
                tbBaoCaoChuyenKho_filterValues.search15 = $('input[data-search-bao-cao-chuyen-kho=15]').val();
                tbBaoCaoChuyenKho_filterValues.search16 = $('input[data-search-bao-cao-chuyen-kho=16]').val();
                tbBaoCaoChuyenKho_filterValues.search17 = $('input[data-search-bao-cao-chuyen-kho=17]').val();
                tbBaoCaoChuyenKho_filterValues.search18 = $('input[data-search-bao-cao-chuyen-kho=18]').val();
                tbBaoCaoChuyenKho_filterValues.search19 = $('input[data-search-bao-cao-chuyen-kho=19]').val();
                tbBaoCaoChuyenKho_filterValues.search20 = $('input[data-search-bao-cao-chuyen-kho=20]').val();

                $.ajax({
                    url: '/ChuyenKho/LoadBaoCaoChuyenKho',
                    method: 'GET',
                    data: tbBaoCaoChuyenKho_filterValues,
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
                            if (tbBaoCaoChuyenKho_filterValues.draw != 1) {
                                toast.create({
                                    title: 'Notification',
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
                }).done(callback, () => { });
            }
        },
        columns: [
            { "data": "RowIndex" },
            {
                "data": "APPROVED",
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
            { "data": "PCKCODE" },
            { "data": "Ngay" },
            { "data": "SRXUAT" },
            { "data": "SRNHAP" },
            { "data": "KHOXUATCODE" },
            { "data": "KHONHAPCODE" },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            { "data": "SLXUAT", "className" : "text-right" },
            { "data": "SLNHAP", "className": "text-right" },
            { "data": "DONGIA", "className": "text-right" },
            { "data": "THANHTIEN", "className": "text-right" },
            { "data": "DIENGIAI" },
            { "data": "USERID" },
            { "data": "APPROVEDBY" },
            { "data": "THUKHONHAP" },
            { "data": "THUKHOXUAT" },
            { "data": "SubmitedDate" },
            { "data": "ApprovedDate" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.PCKID);
            $(nRow).attr('data-dt-row', iDataIndex);
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
                var tongGiaNhap = Math.round(data[0].TONGTHANHTIEN);
                $(api.column(2).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(10).footer()).html(data[0].TONGSLXUAT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(11).footer()).html(data[0].TONGSLNHAP.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(13).footer()).html(tongGiaNhap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(2).footer()).html(0).addClass('text-right');
                $(api.column(10).footer()).html(0).addClass('text-right');
                $(api.column(11).footer()).html(0).addClass('text-right');
                $(api.column(13).footer()).html(0).addClass('text-right');
            }
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: true,
        pageLength: 10,
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 50
        },

        //fixedColumns: {
        //    leftColumns: 4,
        //},

        "dom": 'lrtip',
        orderCellsTop: true
    });

    //$(tbBaoCaoChuyenKho.table().container()).on('keyup change', 'thead input', function (e) {
    //    tbBaoCaoChuyenKho.draw();
    //});

    $(tbBaoCaoChuyenKho.table().container()).on('change', 'thead select', function () {
        tbBaoCaoChuyenKho.draw();
    });

    //Button search báo cáo
    $('#btn-search-bao-cao').on('click', function () {
        fdate_BaoCao = searchFromDate_BaoCao.val();
        tdate_BaoCao = searchToDate_BaoCao.val();
        srid_BaoCao = searchSR_BaoCao.val();
        status_BaoCao = searchStatus_BaoCao.val();

        indexDraw = 1;

        tbBaoCaoChuyenKho.clear().columns.adjust();
        tbBaoCaoChuyenKho.columns.adjust().draw();
    });

    $('#btn-export-bao-cao').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckExcelBaoCaoChuyenKho',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbBaoCaoChuyenKho_filterValues.draw;
                    filterReport.start = tbBaoCaoChuyenKho_filterValues.start;
                    filterReport.length = tbBaoCaoChuyenKho_filterValues.length;
                    filterReport.order = tbBaoCaoChuyenKho_filterValues.order;
                    filterReport.dir = tbBaoCaoChuyenKho_filterValues.dir;
                    filterReport.fdate = tbBaoCaoChuyenKho_filterValues.fdate;
                    filterReport.tdate = tbBaoCaoChuyenKho_filterValues.tdate;
                    filterReport.srid = tbBaoCaoChuyenKho_filterValues.srid;
                    filterReport.status = tbBaoCaoChuyenKho_filterValues.status;

                    filterReport.search1 = tbBaoCaoChuyenKho_filterValues.search1;
                    filterReport.search2 = tbBaoCaoChuyenKho_filterValues.search2;
                    filterReport.search3 = tbBaoCaoChuyenKho_filterValues.search3;
                    filterReport.search4 = tbBaoCaoChuyenKho_filterValues.search4;
                    filterReport.search5 = tbBaoCaoChuyenKho_filterValues.search5;
                    filterReport.search6 = tbBaoCaoChuyenKho_filterValues.search6;
                    filterReport.search7 = tbBaoCaoChuyenKho_filterValues.search7;
                    filterReport.search8 = tbBaoCaoChuyenKho_filterValues.search8;
                    filterReport.search9 = tbBaoCaoChuyenKho_filterValues.search9;
                    filterReport.search10 = tbBaoCaoChuyenKho_filterValues.search10;
                    filterReport.search11 = tbBaoCaoChuyenKho_filterValues.search11;
                    filterReport.search12 = tbBaoCaoChuyenKho_filterValues.search12;
                    filterReport.search13 = tbBaoCaoChuyenKho_filterValues.search13;
                    filterReport.search14 = tbBaoCaoChuyenKho_filterValues.search14;
                    filterReport.search15 = tbBaoCaoChuyenKho_filterValues.search15;
                    filterReport.search16 = tbBaoCaoChuyenKho_filterValues.search16;
                    filterReport.search17 = tbBaoCaoChuyenKho_filterValues.search17;
                    filterReport.search18 = tbBaoCaoChuyenKho_filterValues.search18;
                    filterReport.search19 = tbBaoCaoChuyenKho_filterValues.search19;
                    filterReport.search20 = tbBaoCaoChuyenKho_filterValues.search20;

                    filterReport.export = 1;

                    var link = `/ChuyenKho/LoadBaoCaoChuyenKho?draw=` + filterReport.draw + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir +
                        `&fdate=` + filterReport.fdate +
                        `&tdate=` + filterReport.tdate +
                        `&srid=` + filterReport.srid +
                        `&status=` + filterReport.status +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        `&search8=` + filterReport.search8 +
                        `&search9=` + filterReport.search9 +
                        `&search10=` + filterReport.search10 +
                        `&search11=` + filterReport.search11 +
                        `&search12=` + filterReport.search12 +
                        `&search13=` + filterReport.search13 +
                        `&search14=` + filterReport.search14 +
                        `&search15=` + filterReport.search15 +
                        `&search16=` + filterReport.search16 +
                        `&search17=` + filterReport.search17 +
                        `&search18=` + filterReport.search18 +
                        `&search19=` + filterReport.search19 +
                        `&search20=` + filterReport.search20 +
                        `&export=` + filterReport.export;
                    window.open(link);
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

    //#region Chuyển kho
    let idPhieuChuyenKho = $('#them-phieu-chuyen-kho input[name="idPhieuChuyenKho"]');

    let slNguoiDeNghi = $('#them-phieu-chuyen-kho select[name="slNguoiDeNghi"]');
    let slNguoiDuyet = $('#them-phieu-chuyen-kho select[name="slNguoiDuyet"]');

    let thuKhoXuatPhieuChuyenKho = $('#them-phieu-chuyen-kho input[name="thuKhoXuatPhieuChuyenKho"]');
    let thuKhoNhapPhieuChuyenKho = $('#them-phieu-chuyen-kho input[name="thuKhoNhapPhieuChuyenKho"]');

    let slSRXuat = $('#them-phieu-chuyen-kho select[name="slSRXuat"]');
    let slKhoXuat = $('#them-phieu-chuyen-kho select[name="slKhoXuat"]');

    let slSRNhap = $('#them-phieu-chuyen-kho select[name="slSRNhap"]');
    let slKhoNhap = $('#them-phieu-chuyen-kho select[name="slKhoNhap"]');

    let dienGiaiPhieuChuyenKho = $('#them-phieu-chuyen-kho textarea[name="dienGiaiPhieuChuyenKho"]');

    let slLyDoNhapChuyenKho = $('#them-phieu-chuyen-kho select[name="slLyDoNhapChuyenKho"]');
    let slLyDoXuatChuyenKho = $('#them-phieu-chuyen-kho select[name="slLyDoXuatChuyenKho"]');

    let soPhieuChuyenKho = $('#them-phieu-chuyen-kho input[name="soPhieuChuyenKho"]');
    let ngayChuyenKho = $('#them-phieu-chuyen-kho input[name="ngayChuyenKho"]');
    let slCaLamViecChuyenKho = $('#them-phieu-chuyen-kho select[name="slCaLamViecChuyenKho"]');

    let checkApprovedChuyenKho = $('#them-phieu-chuyen-kho input[name="checkApprovedChuyenKho"]');

    let userIDDuyetChuyenKho = $('#popup-duyet-chuyen-kho input[name="userIDDuyetChuyenKho"]');
    let passwordDuyetChuyenKho = $('#popup-duyet-chuyen-kho input[name="passwordDuyetChuyenKho"]');

    //Click
    $('#bc-chuyenkho-1 tbody').on('click', 'tr', function () {
        let datarow = $(this).attr('data-dt-row');
        $(this).closest('#bc-chuyenkho-1').find('tr').removeClass('selected');
        $(this).closest('#bc-chuyenkho-1').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
    });

    //Double click
    $('#table-bao-cao-chuyen-kho tbody').on('dblclick', 'tr', function () {
        //CheckApprovedChuyenKho();
        //CheckUpdateChuyenKho();
        //LoadChuyenKho();
        let id = $('#table-bao-cao-chuyen-kho tbody tr.selected').attr('data-id');
        let link = `/chuyenkho?id=` + id + ``
        window.open(link);
    });

    //Xác nhận chuyển kho
    checkApprovedChuyenKho.on('click', function () {
        $('#popup-duyet-chuyen-kho').modal();
        $.get("/ChuyenKho/GetUserID", function (res) {
            userIDDuyetChuyenKho.val(res.userid);
        });
    });

    $('#popup-duyet-chuyen-kho button[data-dismiss="modal"]').on('click', function () {
        if (checkApprovedChuyenKho.prop('checked') == true) {
            checkApprovedChuyenKho.prop('checked', false);
        }
    });

    //Function ShowRoom cho phiểu chuyển kho
    let dsSR = [];
    let dsKhoXuat = [];
    let dsKhoNhap = [];

    function LoadSRXuat() {
        return $.get("/ChuyenKho/GetSessionShowRoomId", function (rs) {
            $('#search-chuyenkho select[name="slShowRoomChuyenKho"]').val(rs.srid).trigger('change.select2');
            searchSR_BaoCao.val(rs.srid).trigger('change.select2');
            slSRXuat.val(rs.srid).trigger('change.select2');
            slSRNhap.val(rs.srid).trigger('change.select2');
            $.get("/ChuyenKho/LoadKho?id=" + rs.srid, function (msg) {
                dsKhoXuat = $.map(msg.data, function (obj) {
                    obj.id = obj.KHOID;
                    obj.text = obj.KHOCODE;
                    return obj
                });

                slKhoXuat.select2({
                    data: dsKhoXuat,
                    dropdownParent: $('#them-phieu-chuyen-kho')
                });
            });
        });
    }

    function LoadSRNhap() {
        return $.get("/ChuyenKho/LoadKhoNhap?id=" + slSRNhap.find('option:selected').val(), function (msg) {
            dsKhoNhap = [];
            dsKhoNhap = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            let idKhoXuat = slKhoXuat.find('option:selected').val();
            var khm = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat })
            test = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat });
            slKhoNhap.select2({
                data: khm,
                dropdownParent: $('#them-phieu-chuyen-kho')
            });
        });
    }

    function asyncall() {
        return ShowRoom().then(async () => {
            await LoadSRXuat().then(async () => {
                await LoadSRNhap();
            });
        })
    }
    function ShowRoom() {
        let tbChiNhanh_filterValues = {};
        tbChiNhanh_filterValues.draw = 1;
        tbChiNhanh_filterValues.search = "";
        tbChiNhanh_filterValues.start = 0;
        tbChiNhanh_filterValues.length = 2000;
        tbChiNhanh_filterValues.order = 0;
        tbChiNhanh_filterValues.dir = 0;
        return $.ajax({
            url: '/ChiNhanh/LoadChiNhanh',
            method: 'GET',
            data: tbChiNhanh_filterValues,
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
                } else if (msg.status == 3) {
                    if (tbChiNhanh_filterValues.draw != 1) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        location.reload();
                        return false;
                    }
                } else {
                    dsSR = $.map(msg.data, function (obj) {
                        obj.id = obj.SRID;
                        obj.text = obj.TEN;
                        return obj
                    });

                    $('#search-chuyenkho select[name="slShowRoomChuyenKho"]').select2({
                        data: dsSR
                    });

                    slSRXuat.select2({
                        data: dsSR,
                        dropdownParent: $('#them-phieu-chuyen-kho')
                    });

                    slSRXuat.attr('disabled', 'disabled');

                    slSRNhap.select2({
                        data: dsSR,
                        dropdownParent: $('#them-phieu-chuyen-kho')
                    });

                    searchSR_BaoCao.select2({
                        data: dsSR,
                        //dropdownParent: $('#search-bao-cao')
                    });

                    slSRNhap_BaoCao.select2({
                        data: dsSR,
                        //dropdownParent: $('#them-phieu-chuyen-kho')
                    });

                    slSRXuat_BaoCao.select2({
                        data: dsSR,
                        //dropdownParent: $('#them-phieu-chuyen-kho')
                    });
                }
            },
        });
    };

    slSRNhap.on('change', function () {
        slKhoNhap.empty();
        $.get("/ChuyenKho/LoadKhoNhap?id=" + $(this).val(), function (msg) {
            dsKhoNhap = [];
            dsKhoNhap = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            let idKhoXuat = slKhoXuat.find('option:selected').val();
            var khm = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat })
            test = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat });
            slKhoNhap.select2({
                data: khm,
                dropdownParent: $('#them-phieu-chuyen-kho')
            });
            if (dsKhoNhap.length != 0) {
                tbChiTietMatHang.clear().columns.adjust().draw();
                tbChiTietMatHang.rows.add(dataTempChuyenKho);
                tbChiTietMatHang.columns.adjust().draw();
            }
        });
    });

    slKhoXuat.on('change', function () {
        let id = $(this).val();
        var khm = dsKhoNhap.filter(function (e) { return e.id !== id })
        slKhoNhap.empty();
        slKhoNhap.select2({
            data: khm,
            dropdownParent: $('#them-phieu-chuyen-kho')
        });
    });

    LyDoNhap();
    function LyDoNhap() {
        dsLyDoNhap = [];
        $.ajax({
            async: false,
            method: 'GET',
            url: '/ChuyenKho/LoadLyDoNhap',
            success: function (msg) {
                dsLyDoNhap = $.map(msg.data, function (obj) {
                    obj.id = obj.ID;
                    obj.text = obj.CODE + " - " + obj.TEN;
                    return obj
                });

                slLyDoNhapChuyenKho.select2({
                    data: dsLyDoNhap,
                    dropdownParent: $('#them-phieu-chuyen-kho')
                });
            }
        })
    }

    LyDoXuat();
    function LyDoXuat() {
        dsLyDoXuat = [];
        $.ajax({
            async: false,
            method: 'GET',
            url: '/ChuyenKho/LoadLyDoXuat',
            success: function (msg) {
                dsLyDoXuat = $.map(msg.data, function (obj) {
                    obj.id = obj.ID;
                    obj.text = obj.CODE + " - " + obj.TEN;
                    return obj
                });

                slLyDoXuatChuyenKho.select2({
                    data: dsLyDoXuat,
                    dropdownParent: $('#them-phieu-chuyen-kho')
                });
            }
        })
    }

    //Function tạo code tự động
    async function CreateCode() {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/ChuyenKho/CreateCodeChuyenKho',
            success: function (msg) {
                return msg;
            },
        });
    };

    LoadListCaLamViec(); //Load ca làm việc
    function LoadListCaLamViec() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/ChuyenKho/LoadCaLamViec',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].TEN, d[i].CAID);
                        slCaLamViecChuyenKho.append(o);
                    }
                }
            }
        })
    }

    //Function load chuyển kho
    function LoadChuyenKho() {
        let id = $('#table-bao-cao-chuyen-kho tbody tr.selected').attr('data-id');
        if (id != undefined) {
            $('#btn-print-ct-chuyen-kho').removeClass('disabled');
            LoadChiTietChuyenKho(id).then((rs) => {
                console.log(rs.CheckApprovedBy);
                idPhieuChuyenKho.val(rs.data.PCKID);

                slNguoiDeNghi.val(rs.data.NVID).trigger('change');

                slNguoiDuyet.val(rs.data.APPROVEDBY).trigger('change');

                thuKhoXuatPhieuChuyenKho.val(rs.data.THUKHOXUAT);
                thuKhoNhapPhieuChuyenKho.val(rs.data.THUKHONHAP);

                slSRXuat.val(rs.data.SRXUATID).trigger('change');
                //slKhoXuat.trigger('change');

                slSRNhap.val(rs.data.SRNHAPID).trigger('change.select2');
                //slKhoNhap.val().trigger('change');
                LoadSRXuatDetail();
                LoadSRNhapDetail();
                $.get("/ChuyenKho/GetSessionShowRoomId", function (res) {
                    var lstKho = new Array;
                    lstKho = res.kho;
                    console.log(lstKho);
                    console.log(rs.data.SRNHAPID);
                    var i = lstKho.filter(x => x.KHOID == rs.data.SRNHAPID);
                    console.log(i);
                    if (rs.data.SRXUATID == res.srid) {
                        $('#btn-save-ct-chuyen-kho').removeClass('disabled-chuyen-kho');
                    }
                    else {
                        $('#btn-save-ct-chuyen-kho').addClass('disabled-chuyen-kho');
                    }
                    // nếu là cùng chi nhánh nhập và đúng là người kiểm duyệt chỉ định thì cho nhập
                    if (rs.data.SRNHAPID == res.srid && rs.data.APPROVED == false
                        && role == 1 && i.length == 0 && rs.CheckApprovedBy == true) {
                        $('#form-check-chuyen-kho').removeClass('disabled-chuyen-kho');
                    }
                    else {
                        $('#form-check-chuyen-kho').addClass('disabled-chuyen-kho');
                    }
                });

                dienGiaiPhieuChuyenKho.val(rs.data.DIENGIAI)

                //slLyDoNhapChuyenKho.val().trigger('change');
                //slLyDoXuatChuyenKho.val().trigger('change');

                soPhieuChuyenKho.val(rs.data.PCKCODE);
                ngayChuyenKho.val(moment(rs.data.Ngay).format('DD/MM/yyyy'));
                slCaLamViecChuyenKho.val(rs.data.CAID);

                checkApprovedChuyenKho.prop('checked', rs.data.APPROVED);

                dataTempChuyenKho = new Array();

                for (var i = 0; i < rs.detail.length; i++) {
                    var obj = {
                        //STT: null,
                        PCKID: rs.detail[i].PCKID,
                        PCTCKID: rs.detail[i].PCTCKID,
                        MHID: rs.detail[i].MHID,
                        MHCODE: rs.detail[i].MHCODE,
                        MHTEN: rs.detail[i].MHTEN,
                        KHOXUATID: rs.detail[i].KHOXUATID,
                        KHONHAPID: rs.detail[i].KHONHAPID,
                        DONVI: rs.detail[i].DONVI,
                        SOLUONG: rs.detail[i].SOLUONG,
                        //DONGIA: rs.detail[i].DONGIA == undefined ? '' : rs.detail[i].DONGIA,
                        GHICHU: rs.detail[i].GHICHU == undefined ? '' : rs.detail[i].GHICHU,
                        LINKIMAGE: rs.detail[i].LINKIMAGE,
                        status: rs.detail[i].statusManager,
                        SoLuongTon: rs.detail[i].SoLuongTon
                    };
                    dataTempChuyenKho.push(obj)
                }
                tbChiTietMatHang.clear().columns.adjust().draw();
                tbChiTietMatHang.rows.add(dataTempChuyenKho);
                tbChiTietMatHang.columns.adjust().draw();

                $('#them-phieu-chuyen-kho').modal();
                $("#form-check-chuyen-kho").removeClass('d-none');
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn phiếu chuyển kho',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }

    //Function load chitiet
    function LoadSRXuatDetail() {
        slKhoXuat.empty();
        let srid = slSRXuat.find('option:selected').val();
        $.get("/ChuyenKho/LoadKho?id=" + srid, function (msg) {
            dsKhoXuat = [];
            dsKhoXuat = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            console.log(dsKhoXuat);
            slKhoXuat.select2({
                data: dsKhoXuat,
                dropdownParent: $('#them-phieu-chuyen-kho')
            });
        });
    }

    function LoadSRNhapDetail() {
        slKhoNhap.empty();
        let srid = slSRNhap.find('option:selected').val();
        $.get("/ChuyenKho/LoadKhoNhap?id=" + srid, function (msg) {
            dsKhoNhap = [];
            dsKhoNhap = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            slKhoNhap.select2({
                data: dsKhoNhap,
                dropdownParent: $('#them-phieu-chuyen-kho')
            });
        });
    }

    //Function load chi tiết cho phiếu chuyển kho
    async function LoadChiTietChuyenKho(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/ChuyenKho/LoadChiTietChuyenKho?id=' + id,
            success: function (msg) {
                if (msg.status == 1) {
                    return [msg.data, msg.detail];
                }
            },
        });
    }

    //Function kiểm tra update
    function CheckUpdateChuyenKho() {
        return $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckUpdateChuyenKho',
            success: function (msg) {
                if (msg.status == 1) {
                    $('#btn-save-ct-chuyen-kho').removeClass('disabled-chuyen-kho');
                }
                else if (msg.status == 2) {
                    $('#btn-save-ct-chuyen-kho').addClass('disabled-chuyen-kho');
                }
            }
        });
    }

    //Function kiểm tra duyệt chuyển kho
    let role = 1
    function CheckApprovedChuyenKho() {
        return $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckApprovedChuyenKho',
            success: function (msg) {
                if (msg.status == 1) {
                    $('#form-check-chuyen-kho').removeClass('disabled-chuyen-kho');
                }
                else if (msg.status == 2) {
                    role = 2;
                    $('#form-check-chuyen-kho').addClass('disabled-chuyen-kho');
                }
                else if (msg.status == 3) {
                    toast.create({
                        title: 'Notification',
                        text: msg.message,
                        icon: 'error-outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();

                }
            }
        });
    }
    //#endregion

    //#region Search mặt hàng
    //Search mặt hàng
    let tbSearchMatHang_filterValues = {};
    var tbSearchMatHang = $('#table-search-mahang-chuyen-kho').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbSearchMatHang_filterValues.draw = data.draw;
            tbSearchMatHang_filterValues.search = data.search["value"];
            tbSearchMatHang_filterValues.start = data.start;
            tbSearchMatHang_filterValues.length = data.length;
            tbSearchMatHang_filterValues.order = data.order[0].column;
            tbSearchMatHang_filterValues.dir = data.order[0].dir;
            $.ajax({
                url: '/MatHang/LoadSearchMatHang',
                method: 'GET',
                data: tbSearchMatHang_filterValues,
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
                        if (tbSearchMatHang_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification',
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
            }).done(callback, () => { });
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            { "data": "MATCHCODE" },
            { "data": "CAUHINH" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: true,
        pageLength: 10,
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
    });

    function filterGlobal() {
        var search = $('#global_filter').val()
        var dataSearch = tbSearchMatHang.search()

        if (search != dataSearch) {
            tbSearchMatHang.search(
                $('#global_filter').val(),
            ).draw();
        }

    }
    $('input#global_filter').on('keyup click', function () {
        filterGlobal();

        tbSearchMatHang.draw();
    });

    //Click
    $('#table-search-mahang-chuyen-kho tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang-chuyen-kho tbody tr').not(this).removeClass('selected');
    });

    let dataTempChuyenKho = [];
    //Double Click
    $('#table-search-mahang-chuyen-kho').on('dblclick', 'tr', function () {
        SearchMatHang();
        $(".table-search").hide();
        $('#table-search-mahang-chuyen-kho tbody tr').removeClass('selected');
    });

    //Selected
    $('#btn-selected-search-mat-hang').on('click', function () {
        SearchMatHang();
    });

    //Selected and exit
    $('#btn-selected-and-exit-search-mat-hang').on('click', function () {
        $(".table-search").hide();
        $('#table-search-mahang-chuyen-kho tbody tr').removeClass('selected');
    });

    function SearchMatHang() {
        var id = $('#table-search-mahang-chuyen-kho tbody tr.selected').attr('data-id');
        if (id != undefined) {
            var val = tbSearchMatHang.row($('#table-search-mahang-chuyen-kho tbody tr.selected')).data();
            let check = dataTempChuyenKho.filter(n => n.MHID == val.MHID);
            var obj = {
                //STT: null,
                MHID: val.MHID,
                MHCODE: val.MHCODE,
                MHTEN: val.MHTEN,
                KHOXUATID: slKhoXuat.find('option:selected').val(),
                KHONHAPID: slKhoNhap.find('option:selected').val(),
                DONVI: val.DONVI,
                SOLUONG: 1,
                DONGIA: val.DONGIA == undefined ? '' : val.DONGIA,
                GHICHU: val.GHICHU == undefined ? '' : val.GHICHU,
            };
            if (check.length === 0) {
                dataTempChuyenKho.push(obj);
            }
            else {
                var i = dataTempChuyenKho.findIndex(x => x.MHID == val.MHID);
                dataTempChuyenKho[i].SOLUONG++
            }
            tbChiTietMatHang.clear().columns.adjust().draw();
            tbChiTietMatHang.rows.add(dataTempChuyenKho);
            tbChiTietMatHang.columns.adjust().draw();
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }

    //#endregion

    //#region Insert theo ID (Mua hàng - Bán hàng)
    InsertByID();
    async function InsertByID() {
        $('.chuyen-kho').addClass('active');
        await asyncall();
        //var id = $('#wrapper-nhap-kho').attr('data-id');
        //if (id != null && id != undefined && id != '') {
        //    $('#them-phieu-chuyen-kho').modal()
        //    await LoadDataToInsert(id);

        //}
    }

    //async function LoadDataToInsert(id) {
    //    let dataInsert = {};
    //    //Thông tin của đơn hàng
    //    $.ajax({
    //        type: 'GET',
    //        url: '/MuaHang/LoadMuaDonDetail',
    //        data: { muadonID: id },
    //        success: function (res) {
    //            dataInsert.chitiet = res.data
    //            if (res.data.length > 0) {
    //                dataInsert = res.data
    //                var data = res.data[0];
    //                dienGiaiPhieuChuyenKho.val(data.DIENGIAI)
    //            }
    //        }
    //    })
    //    //Danh sách mặt hàng của đơn hàng
    //    $.ajax({
    //        type: 'GET',
    //        url: '/MuaHang/LoadMuaCTDon',
    //        data: { muadonID: id },
    //        success: function (res) {
    //            dataInsert.list_chitiet = res.data
    //            if (res.data.length > 0) {
    //                dataTempChuyenKho = []
    //                for (var i = 0; i < res.data.length; i++) {
    //                    val = res.data[i]
    //                    var obj = {
    //                        MHID: val.MHID,
    //                        MHCODE: val.MHCODE,
    //                        MHTEN: val.MHTEN,
    //                        KHOXUATID: slKhoXuat.find('option:selected').val(),
    //                        KHONHAPID: slKhoNhap.find('option:selected').val(),
    //                        DONVI: val.DONVI,
    //                        SOLUONG: 1,
    //                        DONGIA: val.DONGIA == undefined ? '' : val.DONGIA,
    //                        GHICHU: val.GHICHU == undefined ? '' : val.GHICHU,
    //                    };
    //                    dataTempChuyenKho.push(obj)
    //                }
    //                tbChiTietMatHang.rows.add(dataTempChuyenKho);
    //                tbChiTietMatHang.columns.adjust().draw();
    //            }
    //        }
    //    })
    //    return dataInsert;
    //}
    //#endregion 

    //#region Chi tiết mặt hàng
    var tbChiTietMatHang = $('#table-ct-chuyen-kho').DataTable({
        bFilter: true,
        bInfo: false,
        data: dataTempChuyenKho,
        columns: [
            {
                "data": null,
                orderable: false,
            },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            {
                "data": "KHOXUATID",
                render: function (data, type, row) {
                    var x = document.createElement("SELECT");
                    x.name = 'khoXuatCTChuyenKho';

                    dsKhoXuat.map((e) => {
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
                "data": "KHONHAPID",
                render: function (data, type, row) {

                    var x = document.createElement("SELECT");
                    x.name = 'khoNhapCTChuyenKho';

                    var khoNhap = dsKhoNhap.filter(function (e) { return e.id !== slKhoXuat.find('option:selected').val(); });

                    khoNhap.map((e) => {
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
                "data": "SOLUONG",
                render: function (data, type, row) {
                    return '<input type="text" class="text-right" name="soLuongChiTietChuyenKho" value="' + data + '"data-type="number"/>';
                }
            },
            { "data": "DONVI" },
            {
                "data": "DONGIA",
                render: function (data, type, row) {
                    return '<input type="text" class="text-right" name="donGiaChiTietChuyenKho" value="' + data + '"data-type="currency"/>';
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    if (type === 'display') {
                        return '<input type="checkbox" class="editor-active">';
                    }
                    return data;
                },
                orderable: false,
                className: "dt-body-center"
            },
            {
                "data": "GHICHU",
                render: function (data, type, row) {
                    return '<input type="text" class="text-right" name="ghiChuChiTietChuyenKho" value="' + data + '">';
                }
            },
            {
                "data": "MHID",
                render: function (data, type, row) {
                    return '<button type="button" class="btn btn-danger" id="btn-delete-ct-chuyen-kho" value="' + data + '">Xóa</button>';
                },
                orderable: false,
                className: "dt-body-center"
            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.PCTCKID);
            $(nRow).attr('data-MHID', data.MHID);
            $($(nRow).children()[0]).html(iDataIndex + 1);
        },

        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: false,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
    });

    //Click
    $('#table-ct-chuyen-kho tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-ct-chuyen-kho tbody tr').not(this).removeClass('selected');
    });

    //Thay đổi các input, select
    $('#table-ct-chuyen-kho tbody').on('change', 'tr.selected', function () {
        var obj = {
            MHID: $(this).attr('data-MHID'),
            KHOXUATID: $(this).find('select[name="khoXuatCTChuyenKho"] option:selected').val(),
            KHONHAPID: $(this).find('select[name="khoNhapCTChuyenKho"] option:selected').val(),
            SOLUONG: $(this).find('input[name="soLuongChiTietChuyenKho"]').val(),
            DONGIA: $(this).find('input[name="donGiaChiTietChuyenKho"]').val(),
            GHICHU: $(this).find('input[name="ghiChuChiTietChuyenKho"]').val()
        }
        var i = dataTempChuyenKho.findIndex(x => x.MHID == obj.MHID);
        if (dataTempChuyenKho[i].MHID == obj.MHID) {
            if (obj.KHOXUATID != undefined) {
                if (obj.KHOXUATID != dataTempChuyenKho[i].KHONHAPID) {
                    dataTempChuyenKho[i].KHOXUATID = obj.KHOXUATID;
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: 'Kho xuất phải khác kho nhập',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }

            if (obj.KHONHAPID != undefined) {
                if (obj.KHONHAPID != dataTempChuyenKho[i].KHOXUATID) {
                    dataTempChuyenKho[i].KHONHAPID = obj.KHONHAPID;
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: 'Kho nhập phải khác kho xuất',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }

            if (obj.SOLUONG != undefined) {
                dataTempChuyenKho[i].SOLUONG = obj.SOLUONG;
            }
            if (obj.DONGIA != undefined) {
                dataTempChuyenKho[i].DONGIA = obj.DONGIA;
            }
            if (obj.GHICHU != undefined) {
                dataTempChuyenKho[i].GHICHU = obj.GHICHU;
            }

            tbChiTietMatHang.clear().columns.adjust().draw();
            tbChiTietMatHang.rows.add(dataTempChuyenKho);
            tbChiTietMatHang.columns.adjust().draw();

            //tbChiTietMatHang.row(i).select();
        }
    });

    //Delete xóa một hàng
    $('#table-ct-chuyen-kho tbody').on('click', 'button', function () {
        if (idPhieuChuyenKho.val() != '') {
            if (confirm('Bạn chắc chắn muốn xóa không?')) {
                var id = $(this).val();
                var removeIndex = dataTempChuyenKho.map(function (item) {
                    return item.MHID
                }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

                dataTempChuyenKho.splice(removeIndex, 1); //Remove
            }
        }
        else {
            var id = $(this).val();
            var removeIndex = dataTempChuyenKho.map(function (item) {
                return item.MHID
            }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

            dataTempChuyenKho.splice(removeIndex, 1); //Remove
        }

        tbChiTietMatHang.clear().columns.adjust().draw();
        tbChiTietMatHang.rows.add(dataTempChuyenKho);
        tbChiTietMatHang.columns.adjust().draw();
    });

    //Áp dụng cho toàn bộ kho xuất phía trước
    $('#btn-all-kho-xuat').on('click', function () {
        let id = slKhoXuat.find('option:selected').val();
        if (dataTempChuyenKho.length > 0) {
            for (var i = 0; i < dataTempChuyenKho.length; i++) {
                if (dataTempChuyenKho[i].KHOXUATID != id) {
                    dataTempChuyenKho[i].KHOXUATID = id;
                }
            }
            tbChiTietMatHang.clear().columns.adjust().draw();
            tbChiTietMatHang.rows.add(dataTempChuyenKho);
            tbChiTietMatHang.columns.adjust().draw();
        }
    });

    //Áp dụng cho toàn bộ kho nhập phía trước
    $('#btn-all-kho-nhap').on('click', function () {
        let id = slKhoNhap.find('option:selected').val();
        if (id != undefined) {
            if (dataTempChuyenKho.length > 0) {
                for (var i = 0; i < dataTempChuyenKho.length; i++) {
                    if (dataTempChuyenKho[i].KHONHAPID != id) {
                        dataTempChuyenKho[i].KHONHAPID = id;
                    }
                }
                tbChiTietMatHang.clear().columns.adjust().draw();
                tbChiTietMatHang.rows.add(dataTempChuyenKho);
                tbChiTietMatHang.columns.adjust().draw();
            }
        }
    });

    //Save
    $('#btn-save-ct-chuyen-kho, #btn-duyet-chuyen-kho').on('click', function () {
        let data = new FormData();
        data.append("PCKID", idPhieuChuyenKho.val());
        data.append("PCKCODE", soPhieuChuyenKho.val());
        data.append("NVID", slNguoiDeNghi.find('option:selected').val());
        if (slNguoiDeNghi.find('option:selected').val() == '0') {
            toast.create({
                title: 'Notification!',
                text: "Vui lòng chọn người đề nghị",
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        data.append("THUKHOXUAT", thuKhoXuatPhieuChuyenKho.val());
        data.append("THUKHONHAP", thuKhoNhapPhieuChuyenKho.val());
        data.append("NGAY", ngayChuyenKho.val());
        data.append("DIENGIAI", dienGiaiPhieuChuyenKho.val());
        data.append("CAID", slCaLamViecChuyenKho.find('option:selected').val());
        data.append("CATEN", slCaLamViecChuyenKho.find('option:selected').text());
        data.append("SRXUATID", slSRXuat.find('option:selected').val());
        data.append("SRNHAPID", slSRNhap.find('option:selected').val());
        data.append("APPROVED", checkApprovedChuyenKho.prop('checked'));
        data.append("DETAIL", JSON.stringify(dataTempChuyenKho));

        data.append("CHECK", check);
        data.append("PWD", passwordDuyetChuyenKho.val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/ChuyenKho/InsertUpdateChuyenKho',
            data: data,
            processData: false,
            contentType: false,
            success: function (msg) {
                if (msg.rs) {
                    tbChuyenKho.ajax.reload();
                    $('#them-phieu-chuyen-kho').modal('hide');
                    $('#popup-duyet-chuyen-kho').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Export
    $('#btn-export-ct-phieu-kho').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckExcelChuyenKho',
            success: function (res) {
                let id = $('#table-bao-cao-chuyen-kho tbody tr.selected').attr('data-id');
                var link = `/ChuyenKho/ExportCTChuyenKho?id=` + id
                window.open(link);

                if (res.rs) {
                    $.ajax({
                        type: 'GET',
                        url: '/ChuyenKho/ExportCTChuyenKho',
                        data: { id: id },

                    });
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

    //#endregion

    //#region Nhân viên
    //Function load Nhóm nhân viên (<select>)
    //NhanVien();
    //function NhanVien() {
    //    let dsNV = [];
    //    let tbStaff_filterValues = {};
    //    tbStaff_filterValues.draw = 1;
    //    tbStaff_filterValues.search = "";
    //    tbStaff_filterValues.start = 0;
    //    tbStaff_filterValues.length = 2000;
    //    tbStaff_filterValues.order = 0;
    //    tbStaff_filterValues.dir = 0;
    //    tbStaff_filterValues.follow = -1;
    //    $.ajax({
    //        url: '/NhanVien/LoadStaff',
    //        method: 'GET',
    //        data: tbStaff_filterValues,
    //        success: function (msg) {
    //            if (msg.status == 2) {
    //                toast.create({
    //                    title: 'Notification!',
    //                    text: msg.message,
    //                    icon: 'error_outline',
    //                    classBackground: 'noti-error',
    //                    timeout: 3000
    //                });
    //                return false;
    //            } else if (msg.status == 3) {
    //                if (tbStaff_filterValues.draw != 1) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                    location.reload();
    //                    return false;
    //                }
    //            } else {
    //                dsNV = $.map(msg.data, function (obj) {
    //                    obj.id = obj.NVID;
    //                    obj.text = obj.NVCODE + ' - ' + obj.NVTEN;
    //                    return obj
    //                });
    //                slNguoiDeNghi.select2({
    //                    data: dsNV,
    //                    dropdownParent: $('#them-phieu-chuyen-kho')
    //                });
    //            }
    //        },
    //    });
    //};

    LoadDataNV().then((e) => {
        // HTML Khach Hang  
        e.dataNV.map((obj) => {
            dsNV.push({ id: obj.NVID, text: obj.NVCODE + ' - ' + obj.NVTEN });
            dsNV2.push({ id: obj.NVCODE, text: obj.NVCODE + ' - ' + obj.NVTEN });
        })
        slNguoiDeNghi.select2({
            data: dsNV,
            dropdownParent: $('#them-phieu-chuyen-kho')
        });
        slNguoiDuyet.select2({
            data: dsNV2,
            dropdownParent: $('#them-phieu-chuyen-kho')
        });
        // trigger Nhan Vien
        LuuIDNV = e.dataUser;
        slNguoiDeNghi.val(e.dataUser);

    }).catch(() => { console.log('error') })

    $('#btn-nhan-vien-ct-chuyen-kho').on('click', function () {
        $('#danh-sach-nv').modal();
    });

    $('#table-nv tbody').unbind('dblclick');
    $('#table-nv tbody').on('dblclick', 'tr', function () {
        $('#danh-sach-nv').modal('hide');
        let idNV = $(this).attr('data-id');
        slNguoiDeNghi.val(idNV).trigger('change');
    });

    $('#danh-sach-nv').on('hidden.bs.modal', function () {
        let idNV = $('#table-nv tbody tr.selected').attr('data-id');
        if (idNV != undefined) {
            slNguoiDeNghi.val(idNV).trigger('change');
        }
    });

    $('#them-nhan-vien').on('hidden.bs.modal', function () {
        slNguoiDeNghi.empty();
        NhanVien();
    });
    //#endregion

    $('#them-phieu-chuyen-kho').on('shown.bs.modal', function () {
        tbChiTietMatHang.draw();
    });

    $('#them-phieu-chuyen-kho').on('hidden.bs.modal', function () {
        if (dataTempChuyenKho.length !== 0) {
            dataTempChuyenKho = [];
            tbChiTietMatHang.clear().columns.adjust().draw();
        }
    });

    let check = 0;
    $('#popup-duyet-chuyen-kho').on('shown.bs.modal', function () {
        check = 1;
    });

    $('#popup-duyet-chuyen-kho').on('hidden.bs.modal', function () {
        check = 0;
    });
    //#endregion

    //#region Báo cáo chuyển kho - mặt hàng
    let slSRXuat_BaoCao = $('#search-bao-cao-mat-hang select[name="slSRXuat"]');
    let slKhoXuat_BaoCao = $('#search-bao-cao-mat-hang select[name="slKhoXuat"]');

    let slSRNhap_BaoCao = $('#search-bao-cao-mat-hang select[name="slSRNhap"]');
    let slKhoNhap_BaoCao = $('#search-bao-cao-mat-hang select[name="slKhoNhap"]');

    let slStatus_BaoCao_ChuyenKho_MatHang = $('#search-bao-cao-mat-hang select[name="slStatus-BaoCao-ChuyenKho-MatHang"]');

    let searchFromDateBCChuyenKho = $('#search-bao-cao-mat-hang input[name="fromBCChuyenKho"]');
    searchFromDateBCChuyenKho.val(moment(new Date()).format('DD/MM/yyyy'));
    let searchToDateBCChuyenKho = $('#search-bao-cao-mat-hang input[name="toBCChuyenKho"]');
    searchToDateBCChuyenKho.val(moment(new Date()).format('DD/MM/yyyy'));

    let checkAll = $('#search-bao-cao-mat-hang input[id="checkAll"]');
    let checkChoose = $('#search-bao-cao-mat-hang input[id="checkChoose"]');

    $('input[name="NhomHang"]').on('click', function () {
        var value = $(this).val();
        if (value == 1) {
            $('#dropdown-tree-mathang').show();
        }
        else {
            $('#dropdown-tree-mathang').hide();
        }
    });

    let fdate_BaoCao_MatHang = null;
    let tdate_BaoCao_MatHang = null;
    let idSRXuat_BaoCao_MatHang = null;
    let idSRNhap_BaoCao_MatHang = null;
    let idKhoXuat_BaoCao_MatHang = null;
    let idKhoNhap_BaoCao_MatHang = null;
    let status_BaoCao_MatHang = null;
    let indexDraw_MatHang = 0;
    let xml = null;

    let tbBaoCaoChuyenKho_MatHang_filterValues = {};

    slSRXuat_BaoCao.on('change', function () {
        LoadKhoXuat_BaoCao();
    });
    slSRNhap_BaoCao.on('change', function () {
        LoadKhoNhap_BaoCao();
    });

    ShowRoom().then(() => {
        LoadKhoXuat_BaoCao();
        LoadKhoNhap_BaoCao();
    })
    function LoadKhoXuat_BaoCao() {
        return $.get("/ChuyenKho/LoadKhoNhap?id=" + slSRXuat_BaoCao.find('option:selected').val(), function (msg) {
            dsKhoXuat = [];
            dsKhoXuat = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            slKhoXuat_BaoCao.empty();
            slKhoXuat_BaoCao.select2({
                data: dsKhoXuat,
                //dropdownParent: $('#them-phieu-chuyen-kho')
            });
        });
    }
    function LoadKhoNhap_BaoCao() {
        return $.get("/ChuyenKho/LoadKhoNhap?id=" + slSRNhap_BaoCao.find('option:selected').val(), function (msg) {
            dsKhoNhap = [];
            dsKhoNhap = $.map(msg.data, function (obj) {
                obj.id = obj.KHOID;
                obj.text = obj.KHOCODE;
                return obj
            });
            slKhoNhap_BaoCao.empty();
            slKhoNhap_BaoCao.select2({
                data: dsKhoNhap,
                //dropdownParent: $('#them-phieu-chuyen-kho')
            });
        });
    }

    $('#table-bao-cao-chuyen-kho-mat-hang thead tr').clone(true).appendTo('#table-bao-cao-chuyen-kho-mat-hang thead');
    $('#table-bao-cao-chuyen-kho-mat-hang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0 || i == 4 || i == 5 || i == 6 || i == 7) {
            return $(this).html('');
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-bao-cao-chuyen-kho-mat-hang="' + i + '"/>');
        }

        $('input', this).on('keyup change', delay(function () {
            if (tbBaoCaoChuyenKho_MatHang.column(i).search() !== this.value) {
                tbBaoCaoChuyenKho_MatHang
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));
    });

    //DataTable báo cáo chuyển kho - mặt hàng
    var tbBaoCaoChuyenKho_MatHang = $('#table-bao-cao-chuyen-kho-mat-hang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (indexDraw_MatHang > 0) {
                tbBaoCaoChuyenKho_MatHang_filterValues.draw = data.draw;

                tbBaoCaoChuyenKho_MatHang_filterValues.fdate = fdate_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.tdate = tdate_BaoCao_MatHang;

                tbBaoCaoChuyenKho_MatHang_filterValues.idSRXuat = idSRXuat_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.idSRNhap = idSRNhap_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.idKhoXuat = idKhoXuat_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.idKhoNhap = idKhoNhap_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.status = status_BaoCao_MatHang;
                tbBaoCaoChuyenKho_MatHang_filterValues.xml = xml;
                tbBaoCaoChuyenKho_MatHang_filterValues.check = $('input[name="NhomHang"]:checked').val();

                tbBaoCaoChuyenKho_MatHang_filterValues.start = data.start;
                tbBaoCaoChuyenKho_MatHang_filterValues.length = data.length;
                tbBaoCaoChuyenKho_MatHang_filterValues.order = data.order[0].column;
                tbBaoCaoChuyenKho_MatHang_filterValues.dir = data.order[0].dir;
                tbBaoCaoChuyenKho_MatHang_filterValues.export = 0;

                tbBaoCaoChuyenKho_MatHang_filterValues.search1 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=1]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search2 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=2]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search3 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=3]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search4 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=4]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search5 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=5]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search6 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=6]').val();
                tbBaoCaoChuyenKho_MatHang_filterValues.search7 = $('input[data-search-bao-cao-chuyen-kho-mat-hang=7]').val();

                $.ajax({
                    url: '/ChuyenKho/LoadBaoCaoMatHangChuyenKho',
                    method: 'GET',
                    data: tbBaoCaoChuyenKho_MatHang_filterValues,
                    success: function (msg) {
                        if (msg.data.length == 0) {
                            toast.create({
                                title: 'Notification',
                                text: 'Không tìm thấy bản ghi nào thỏa mãn điều kiện',
                                icon: 'error-outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            return false;
                        }
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
                            if (tbBaoCaoChuyenKho_filterValues.draw != 1) {
                                toast.create({
                                    title: 'Notification',
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
                }).done(callback, () => { });
            }
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            { "data": "DVT" },
            { "data": "SLXUAT", "className": "text-right" },
            { "data": "SLNHAP", "className": "text-right" },
            { "data": "DONGIA", "className": "text-right" },
            { "data": "THANHTIEN", "className": "text-right" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHCODE);
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
                var tongGiaNhap = Math.round(data[0].TONGTHANHTIEN);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(4).footer()).html(data[0].TONGSLXUAT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(5).footer()).html(data[0].TONGSLNHAP.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(7).footer()).html(tongGiaNhap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(4).footer()).html(0).addClass('text-right');
                $(api.column(5).footer()).html(0).addClass('text-right');
                $(api.column(7).footer()).html(0).addClass('text-right');
            }
        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: true,
        pageLength: 10,
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 50
        },
        "dom": 'lrtip',
        orderCellsTop: true
    });

    //$(tbBaoCaoChuyenKho_MatHang.table().container()).on('keyup change', 'thead input', function (e) {
    //    tbBaoCaoChuyenKho_MatHang.draw();
    //});

    //Click
    $('#table-bao-cao-chuyen-kho-mat-hang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-bao-cao-chuyen-kho-mat-hang tbody tr').not(this).removeClass('selected');
    });

    $('#btn-search-bao-cao-mat-hang').on('click', function () {
        let rendered;
        if ($('input[name="NhomHang"]:checked').val() == 0) {
            rendered = null;
        }
        else {
            var checked_ids = [];
            var selectedNodes = $('#jstree').jstree("get_selected", true);
            $.each(selectedNodes, function () {
                checked_ids.push(this.id);
            });

            if (checked_ids.length == 0) {
                toast.create({
                    title: 'Notification',
                    text: 'Bạn chưa chọn nhóm hàng nào. Nếu muốn chọn toàn bộ, hãy chọn tùy chọn Tất cả',
                    icon: 'error-outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return false;
            }

            var templateMaker = function (object) {
                return function (context) {
                    var replacer = function (key, val) {
                        if (typeof val === 'function') {
                            return context[val()]
                        }
                        return val;
                    }
                    return JSON.parse(JSON.stringify(obj, replacer))
                }
            }
            var obj = {
                DataSetID: {
                    TableID: {
                        ColumnID: function () {
                            return 'ColumnID'
                        }
                    }
                }
            };
            var template = templateMaker(obj);
            var data = {
                ColumnID: checked_ids
            }
            rendered  = template(data);
        }

        fdate_BaoCao_MatHang = searchFromDateBCChuyenKho.val();
        tdate_BaoCao_MatHang = searchToDateBCChuyenKho.val();
        idSRXuat_BaoCao_MatHang = slSRXuat_BaoCao.find('option:selected').val();
        idSRNhap_BaoCao_MatHang = slSRNhap_BaoCao.find('option:selected').val();
        idKhoXuat_BaoCao_MatHang = slKhoXuat_BaoCao.find('option:selected').val();
        idKhoNhap_BaoCao_MatHang = slKhoNhap_BaoCao.find('option:selected').val();
        status_BaoCao_MatHang = slStatus_BaoCao_ChuyenKho_MatHang.find('option:selected').val();
        xml = JSON.stringify(rendered);

        indexDraw_MatHang = 1;

        tbBaoCaoChuyenKho_MatHang.clear().columns.adjust();
        tbBaoCaoChuyenKho_MatHang.columns.adjust().draw();
    });

    $('#btn-export-bao-cao-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckExcelBaoCaoChuyenKho',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbBaoCaoChuyenKho_MatHang_filterValues.draw;
                    filterReport.start = tbBaoCaoChuyenKho_MatHang_filterValues.start;
                    filterReport.length = tbBaoCaoChuyenKho_MatHang_filterValues.length;
                    filterReport.order = tbBaoCaoChuyenKho_MatHang_filterValues.order;
                    filterReport.dir = tbBaoCaoChuyenKho_MatHang_filterValues.dir;
                    filterReport.fdate = tbBaoCaoChuyenKho_MatHang_filterValues.fdate;
                    filterReport.tdate = tbBaoCaoChuyenKho_MatHang_filterValues.tdate;
                    filterReport.status = tbBaoCaoChuyenKho_MatHang_filterValues.status;
                    filterReport.idSRXuat = tbBaoCaoChuyenKho_MatHang_filterValues.idSRXuat;
                    filterReport.idSRNhap = tbBaoCaoChuyenKho_MatHang_filterValues.idSRNhap;
                    filterReport.idKhoXuat = tbBaoCaoChuyenKho_MatHang_filterValues.idKhoXuat;
                    filterReport.idKhoNhap = tbBaoCaoChuyenKho_MatHang_filterValues.idKhoNhap;
                    filterReport.xml = tbBaoCaoChuyenKho_MatHang_filterValues.xml;
                    filterReport.check = tbBaoCaoChuyenKho_MatHang_filterValues.check;

                    filterReport.search1 = tbBaoCaoChuyenKho_MatHang_filterValues.search1;
                    filterReport.search2 = tbBaoCaoChuyenKho_MatHang_filterValues.search2;
                    filterReport.search3 = tbBaoCaoChuyenKho_MatHang_filterValues.search3;
                    filterReport.search4 = tbBaoCaoChuyenKho_MatHang_filterValues.search4;
                    filterReport.search5 = tbBaoCaoChuyenKho_MatHang_filterValues.search5;
                    filterReport.search6 = tbBaoCaoChuyenKho_MatHang_filterValues.search6;
                    filterReport.search7 = tbBaoCaoChuyenKho_MatHang_filterValues.search7;

                    filterReport.export = 1;

                    var link = `/ChuyenKho/LoadBaoCaoMatHangChuyenKho?draw=` + filterReport.draw + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir +
                        `&fdate=` + filterReport.fdate +
                        `&tdate=` + filterReport.tdate +
                        `&srid=` + filterReport.srid +
                        `&status=` + filterReport.status +
                        `&idSRXuat=` + filterReport.idSRXuat +
                        `&idSRNhap=` + filterReport.idSRNhap +
                        `&idKhoXuat=` + filterReport.idKhoXuat +
                        `&idKhoNhap=` + filterReport.idKhoNhap +
                        `&xml=` + filterReport.xml +
                        `&check=` + filterReport.check +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        `&export=` + filterReport.export;
                    window.open(link);
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            }
        });
    });

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
    //#endregion

    //#endregion

    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    //$('.search-date').datetimepicker({
    //    timepicker: false,
    //    format: 'd/m/Y',
    //    mask: true,
    //});
});
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

function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

async function LoadDataNV() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/ChuyenKho/LoadDataNV',
        success: function (res) {
            return res;
        }
    });
}