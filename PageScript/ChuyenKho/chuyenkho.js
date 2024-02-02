$(document).ready(function () {
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

    let tbChuyenKho_filterValues = {};
    let fdate = null;
    let tdate = null;
    let srid = null;
    let status = null;
    var objKHOMH = [];
    var objDeleteCTPhieu = [];
    var dsNV = [];
    var dsNV2 = [];
    var LuuIDNV = null;
    $('#table-phieu-chuyen-kho thead tr').clone(true).appendTo('#table-phieu-chuyen-kho thead');
    $('#table-phieu-chuyen-kho thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            $(this).html('');
        }
        else if (i == 1) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-phieu-chuyen-kho', i);
            var data1 = [{ key: '--Theo dõi--', value: '' },
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
        else if (i == 3 || i == 7 || i == 8) {
            $(this).html('<input class="datetimepicker date-only" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phieu-chuyen-kho="' + i + '" /> ');
            InitDatetime();
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phieu-chuyen-kho="' + i + '"/>');
        }
    });

    var tbChuyenKho = $('#table-phieu-chuyen-kho').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbChuyenKho_filterValues.draw = data.draw;
            tbChuyenKho_filterValues.search = data.search["value"];
            tbChuyenKho_filterValues.fdate = fdate;
            tbChuyenKho_filterValues.tdate = tdate;
            tbChuyenKho_filterValues.srid = srid;
            tbChuyenKho_filterValues.status = status;
            tbChuyenKho_filterValues.start = data.start;
            tbChuyenKho_filterValues.length = data.length;
            tbChuyenKho_filterValues.order = data.order[0].column;
            tbChuyenKho_filterValues.dir = data.order[0].dir;

            tbChuyenKho_filterValues.search1 = $('select[data-search-phieu-chuyen-kho=1]').val();
            tbChuyenKho_filterValues.search2 = $('input[data-search-phieu-chuyen-kho=2]').val();
            tbChuyenKho_filterValues.search3 = $('input[data-search-phieu-chuyen-kho=3]').val();
            tbChuyenKho_filterValues.search4 = $('input[data-search-phieu-chuyen-kho=4]').val();
            tbChuyenKho_filterValues.search5 = $('input[data-search-phieu-chuyen-kho=5]').val();
            tbChuyenKho_filterValues.search6 = $('input[data-search-phieu-chuyen-kho=6]').val();
            tbChuyenKho_filterValues.search7 = $('input[data-search-phieu-chuyen-kho=7]').val();
            tbChuyenKho_filterValues.search8 = $('input[data-search-phieu-chuyen-kho=8]').val();
            tbChuyenKho_filterValues.search9 = $('input[data-search-phieu-chuyen-kho=9]').val();
            tbChuyenKho_filterValues.search10 = $('input[data-search-phieu-chuyen-kho=10]').val();
            tbChuyenKho_filterValues.search11 = $('input[data-search-phieu-chuyen-kho=11]').val();
            tbChuyenKho_filterValues.search12 = $('input[data-search-phieu-chuyen-kho=12]').val();

            tbChuyenKho_filterValues.export = 0;

            //if ($('#wrapper-nhap-kho').attr('data-id-exits').length > 0) {
            //    $('#search-chuyenkho select[name="slStatusChuyenKho"]').val(-1);
            //    tbChuyenKho_filterValues.status = $('#search-chuyenkho select[name="slStatusChuyenKho"]').val();
            //}

            $.ajax({
                url: '/ChuyenKho/LoadChuyenKho',
                method: 'GET',
                data: tbChuyenKho_filterValues,
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
                        if (tbChuyenKho_filterValues.draw != 1) {
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
        "order": [[2, "asc"]],
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
            { "data": "DIENGIAI" },
            { "data": "USERID" },
            { "data": "APPROVEDBY" },
            { "data": "SubmitedDate" },
            { "data": "ApprovedDate" },
            { "data": "ChiNhanhXuat" },
            { "data": "ChiNhanhNhap" },
            //{ "data": "APPROVEDBY" },
            //{ "data": "SubmitedDate" },
        ],
        columnDefs: [
            {
                "targets": [0, 1, 9, 10],
                "orderable": false
            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.PCKID);
            if (data.APPROVED) {
                $(nRow).find('td:eq(0)').css('background-color', 'gray');
            } else {
                $(nRow).find('td:eq(0)').css({ "background-color": "yellow" });
            }
        },
        initComplete: function (data, api, settings) {
            var id = $('#wrapper-nhap-kho').attr('data-id-exits')
            //$('#table-phieu-chuyen-kho tbody tr').each(function () {
            //    var pckidSelected = $(this).attr('data-id')
            //    console.log(pckidSelected)
            //    if (id == pckidSelected) {
            //        tbChuyenKho.row($(this).index()).select()
            //        $('#table-phieu-chuyen-kho tbody tr').not(this).removeClass('selected');
            //        CheckApprovedChuyenKho();
            //        CheckUpdateChuyenKho();
            //        LoadChuyenKho();

            //    }

            //})

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
        orderCellsTop: true
    });

    $(tbChuyenKho.table().container()).on('keyup change', 'thead input', function (e) {
        tbChuyenKho.draw();
    });

    $(tbChuyenKho.table().container()).on('change', 'thead select', function () {
        tbChuyenKho.draw();
    });

    //Search ngày -> ngày
    $('#btn-search-chuyenkho').click(function () {
        fdate = $('#search-chuyenkho input[name="fChuyenKho"]').val();
        tdate = $('#search-chuyenkho input[name="tChuyenKho"]').val();
        srid = $('#search-chuyenkho select[name="slShowRoomChuyenKho"]').find('option:selected').val();
        status = $('#search-chuyenkho select[name="slStatusChuyenKho"]').find('option:selected').val();
        tbChuyenKho.columns.adjust().draw();
    });

    //Search theo trạng thái
    $('#search-chuyenkho select[name="slStatusChuyenKho"]').on('change', function () {
        fdate = $('#search-chuyenkho input[name="fChuyenKho"]').val();
        tdate = $('#search-chuyenkho input[name="tChuyenKho"]').val();
        srid = $('#search-chuyenkho select[name="slShowRoomChuyenKho"]').find('option:selected').val();
        status = $(this).find('option:selected').val();
        tbChuyenKho.columns.adjust().draw();
    });

    //Click
    $('#table-phieu-chuyen-kho tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-phieu-chuyen-kho tbody tr').not(this).removeClass('selected');
    });

    //Double click
    $('#table-phieu-chuyen-kho tbody').on('dblclick', 'tr', function () {
        CheckApprovedChuyenKho();
        CheckUpdateChuyenKho();
        LoadChuyenKho();
    });



    //Insert
    $('#btn-insert-chuyen-kho').on('click', async function () {
        $.get("/ChuyenKho/CheckInsertChuyenKho", async function (res) {
            if (res.status == 1) {
                $('#them-phieu-chuyen-kho').modal();
                $('#form-check-chuyen-kho').addClass('d-none');
                CreateCode().then((rs) => {
                    if (rs != undefined) {
                        soPhieuChuyenKho.val(rs.code)
                    }
                });
                $('#btn-save-ct-chuyen-kho').removeClass('disabled-chuyen-kho');
                $('#btn-print-ct-chuyen-kho').addClass('disabled');
                idPhieuChuyenKho.val('');
                dienGiaiPhieuChuyenKho.val('');
                //slSRNhap.val(slSRXuat.val()).trigger('change');
                checkApprovedChuyenKho.prop('checked', false);

                ngayChuyenKho.val(moment(new Date()).format('DD/MM/yyyy'));

                slLyDoNhapChuyenKho.val(0).trigger('change');
                slLyDoXuatChuyenKho.val(0).trigger('change');
                if (LuuIDNV != undefined) {
                    slNguoiDeNghi.val(LuuIDNV).trigger('change.select2');
                }
                else {
                    slNguoiDeNghi.val(0).trigger('change');
                }
                await LoadSRXuat().then(async () => {
                    await LoadSRNhap();
                });
                //if (slKhoXuat.val() == slKhoNhap.val()) {
                //    var khm = dsKhoNhap.filter(function (e) { return e.id !== slKhoXuat.val() })
                //    slKhoNhap.empty();
                //    slKhoNhap.select2({
                //        data: khm,
                //        dropdownParent: $('#them-phieu-chuyen-kho')
                //    });
                //}
            }
            else if (res.status == 2) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
            }
            else if (res.status == 3) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                location.reload();
            }
        });
    });

    //Update
    $('#btn-update-chuyen-kho').on('click', function () {
        CheckApprovedChuyenKho();
        CheckUpdateChuyenKho();
        LoadChuyenKho();
    });

    //Delete
    $('#btn-delete-chuyen-kho').on('click', function () {
        var id = $('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id');
        if (id == undefined) {
            return toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn phiếu chuyển kho',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckDeleteChuyenKho?id=' + $('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id'),
            success: function (res) {
                if (res.status == 1) {
                    if ($('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id') != undefined) {
                        let idChuyenKho = $('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa phiếu chuyển kho này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/ChuyenKho/DeleteChuyenKho?id=' + idChuyenKho,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbChuyenKho.ajax.reload();
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
                                }
                            });
                        }
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn phiếu chuyển kho',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
                }
                else if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
    });

    //Reset
    $('#btn-reset-chuyen-kho').on('click', function () {
        tbChuyenKho.draw();
    });

    //Export
    $('#btn-export-chuyen-kho').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckExcelChuyenKho',
            success: function (res) {
                if (res.status == 1) {
                    tbChuyenKho_filterValues.export = 1;
                    var link = `/ChuyenKho/LoadChuyenKho?` + serialize(tbChuyenKho_filterValues) + ``;
                    window.open(link)
                }
                else if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
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
            slKhoXuat.empty();
            $('#search-chuyenkho select[name="slShowRoomChuyenKho"]').val(rs.srid).trigger('change.select2');
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
            slKhoNhap.empty();
            let idKhoXuat = slKhoXuat.find('option:selected').val();
            var khm = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat })
            //test = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat });
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
            let khm = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat })
            //test = dsKhoNhap.filter(function (e) { return e.id !== idKhoXuat });
            slKhoNhap.select2({
                data: khm,
                dropdownParent: $('#them-phieu-chuyen-kho')
            });
            if (dsKhoNhap.length != 0) {
                if (khm.length != 0) {
                    if (dataTempChuyenKho.length > 0) {
                        for (var i = 0; i < dataTempChuyenKho.length; i++) {
                            if (dataTempChuyenKho[i].KHONHAPID != khm[0].id) {
                                dataTempChuyenKho[i].KHONHAPID = khm[0].id;
                            }
                        }
                    }
                }
                tbChiTietMatHang.clear().columns.adjust().draw();
                tbChiTietMatHang.rows.add(dataTempChuyenKho);
                tbChiTietMatHang.columns.adjust().draw();
            }
        });
    });

    slKhoXuat.on('change', function () {
        slKhoXuat.empty();
        let srid = slSRXuat.find('option:selected').val();
        $.get("/ChuyenKho/LoadKho?id=" + srid, function (msg) {
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
    function LoadChuyenKho(e) {
        console.log(e);
        let id = $('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id');
        if (e != undefined && e != '' && e != null) {
            id = e;
        }
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
                        SoLuongTon: rs.detail[i].SoLuongTon,
                        ViTri: rs.detail[i].ViTri,
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
                    role = 1;
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
            //{ "data": "MATCHCODE" },
            //{ "data": "CAUHINH" }
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
        let Check = slKhoNhap.find('option:selected').val();
        if (Check === undefined || check == null) {
            alert("Hãy chọn chi nhánh nhập");
            return;
        }
        SearchMatHang();
        $(".table-search").hide();
        $('#table-search-mahang-chuyen-kho tbody tr').removeClass('selected');
    });

    //Selected
    $('#btn-selected-search-mat-hang').on('click', function () {
        let Check = slKhoNhap.find('option:selected').val();
        if (Check === undefined || check == null) {
            alert("Hãy chọn chi nhánh nhập");
            return;
        }
        SearchMatHang();
    });

    //Selected and exit
    $('#btn-selected-and-exit-search-mat-hang').on('click', function () {
        let Check = slKhoNhap.find('option:selected').val();
        if (Check === undefined || check == null) {
            alert("Hãy chọn chi nhánh nhập");
            return;
        }
        SearchMatHang();
        $(".table-search").hide();
        $('#table-search-mahang-chuyen-kho tbody tr').removeClass('selected');
    });

    function SearchMatHang() {
        var id = $('#table-search-mahang-chuyen-kho tbody tr.selected').attr('data-id');
        if (id != undefined) {
            var val = tbSearchMatHang.row($('#table-search-mahang-chuyen-kho tbody tr.selected')).data();
            let check = dataTempChuyenKho.filter(n => n.MHID == val.MHID);
            let SRXuat = slSRXuat.find('option:selected').val();
            let SRNhap = slSRNhap.find('option:selected').val();
            let KhoXuat = slKhoXuat.find('option:selected').val();
            let KhoNhap = slKhoNhap.find('option:selected').val();
            if (KhoXuat == KhoNhap) {
                toast.create({
                    title: 'Notification!',
                    text: 'Kho nhập phải khác kho xuất',
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
            }
            $.ajax({
                type: "GET",
                url: '/ChuyenKho/LoadMatHangByMHID',
                contentType: "application/json; charset=utf-8",
                data: { mathangID: id, KHONHAPID: KhoNhap, KHOXUATID: KhoXuat },
                dataType: "json",
                success: function (e) {
                    if (e.data.length > 0) {
                        let obj = {
                            MHID: e.data[0].MHID,
                            MHCODE: e.data[0].MHCODE,
                            MHTEN: e.data[0].MHTEN,
                            SOLUONG: 1,
                            DONVI: e.data[0].DONVI,
                            SoLuongTon: e.data[0].SoLuongTon,
                            GHICHU: e.data[0].GHICHU,
                            KHOXUATID: KhoXuat,
                            KHONHAPID: KhoNhap,
                            LINKIMAGE: e.data[0].LINKIMAGE,
                            status: e.data[0].statusManager,
                            ViTri: e.data[0].ViTri,                            
                        }
                        var exist = false;
                        var index = 0;
                        for (var i = 0; i < dataTempChuyenKho.length; i++) {
                            if (dataTempChuyenKho[i].MHID == obj.MHID) {
                                dataTempChuyenKho[i].SOLUONG = parseInt(dataTempChuyenKho[i].SOLUONG) + 1;
                                exist = true;
                                if (dataTempChuyenKho[i].status == 3) {
                                    dataTempChuyenKho[i].status = 2;
                                }
                                index = i;
                                break;
                            }
                        }
                        if (exist == false) {
                            dataTempChuyenKho.push(obj);
                            tbChiTietMatHang.clear();
                            tbChiTietMatHang.rows.add(dataTempChuyenKho);
                            tbChiTietMatHang.columns.adjust().draw();
                            tbChiTietMatHang.row(dataTempChuyenKho.length - 1).select();
                            tbChiTietMatHang.row(dataTempChuyenKho.length - 1).scrollTo(false);
                        }
                        else if (exist == true) {
                            tbChiTietMatHang.clear();
                            tbChiTietMatHang.rows.add(dataTempChuyenKho);
                            tbChiTietMatHang.columns.adjust().draw();
                            tbChiTietMatHang.row(index).select();
                            tbChiTietMatHang.row(index).scrollTo(false);
                        }
                    }
                }
            });
            //var obj = {
            //    //STT: null,
            //    MHID: val.MHID,
            //    MHCODE: val.MHCODE,
            //    MHTEN: val.MHTEN,
            //    KHOXUATID: slKhoXuat.find('option:selected').val(),
            //    KHONHAPID: slKhoNhap.find('option:selected').val(),
            //    DONVI: val.DONVI,
            //    SOLUONG: 1,
            //    DONGIA: val.DONGIA == undefined ? '' : val.DONGIA,
            //    GHICHU: val.GHICHU == undefined ? '' : val.GHICHU,
            //    LINKIMAGE: val.LINKIMAGE
            //};
            //if (check.length === 0) {
            //    dataTempChuyenKho.push(obj);
            //}
            //else {
            //    var i = dataTempChuyenKho.findIndex(x => x.MHID == val.MHID);
            //    dataTempChuyenKho[i].SOLUONG++
            //}
            //tbChiTietMatHang.clear().columns.adjust().draw();
            //tbChiTietMatHang.rows.add(dataTempChuyenKho);
            //tbChiTietMatHang.columns.adjust().draw();
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
        var id = $('#wrapper-nhap-kho').attr('data-id');// Phiếu từ muadon
        var PCKID = $('#wrapper-nhap-kho').attr('data-id-exits'); //Phiếu đã tạo , phiếu từ báo cáo
        //$('.chuyen-kho').addClass('active');
        await asyncall();
        console.log('vaor');
        if (id != null && id != '' && id != undefined) {
            console.log(id)
            $('#them-phieu-chuyen-kho').modal()
            await LoadDataToInsert(id);
        }
        else if (PCKID != '' && PCKID != null && id != undefined) {
            CheckApprovedChuyenKho();
            CheckUpdateChuyenKho();
            LoadChuyenKho(PCKID);
        }


    }

    async function LoadDataToInsert(id) {
        let dataInsert = {};
        //Thông tin của đơn hàng
        $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaDonDetail',
            data: { muadonID: id },
            success: function (res) {
                //dataInsert.chitiet = res.data
                if (res.data.length > 0) {
                    dataInsert = res.data
                    var data = res.data[0];
                    dienGiaiPhieuChuyenKho.val(data.DIENGIAI)
                    CreateCode().then((rs) => {
                        if (rs != undefined) {
                            soPhieuChuyenKho.val(rs.code)
                        }
                    });
                    ngayChuyenKho.val(moment(new Date()).format('DD/MM/yyyy'));
                }
            }
        })
        //Danh sách mặt hàng của đơn hàng
        $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaCTDon',
            data: { muadonID: id },
            success: function (res) {
                dataInsert.list_chitiet = res.data
                if (res.data.length > 0) {
                    dataTempChuyenKho = []
                    for (var i = 0; i < res.data.length; i++) {
                        val = res.data[i]
                        var obj = {
                            MHID: val.MHID,
                            MHCODE: val.MHCODE,
                            MHTEN: val.MHTEN,
                            KHOXUATID: slKhoXuat.find('option:selected').val(),
                            KHONHAPID: slKhoNhap.find('option:selected').val(),
                            DONVI: val.DONVI,
                            SOLUONG: val.SOLUONG,
                            //DONGIA: val.DONGIA == undefined ? '' : val.DONGIA,
                            GHICHU: val.GHICHU == undefined ? '' : val.GHICHU,
                            LINKIMAGE: val.LINKIMAGE,
                            status: 1,
                            SoLuongTon: val.SoLuongTon,
                            ViTri: val.ViTri,
                        };
                        dataTempChuyenKho.push(obj)
                    }
                    console.log(dataTempChuyenKho);
                    tbChiTietMatHang.rows.add(dataTempChuyenKho);
                    tbChiTietMatHang.columns.adjust().draw();
                    slNguoiDeNghi.val(LuuIDNV).trigger('change.select2');
                }
            }
        })
        return dataInsert;
    }
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
            {
                "data": "ViTri",
            },
            {
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
            { "data": "MHTEN" },
            {
                "data": "KHOXUATID",
                render: function (data, type, row) {
                    //var x = document.createElement("SELECT");
                    //x.name = 'khoXuatCTChuyenKho';

                    //dsKhoXuat.map((e) => {
                    //    var op = document.createElement("option");
                    //    op.text = e.KHOCODE
                    //    op.value = e.KHOID

                    //    if (op.value === data) {
                    //        op.setAttribute("selected", true);
                    //    }
                    //    x.options.add(op)
                    //})
                    //return '' + x.outerHTML + ''
                    var x = document.createElement("SELECT");
                    var op = document.createElement("option");
                    if (objKHOMH.length > 1) {
                        for (var key in objKHOMH) {
                            if (objKHOMH[key].KHOID == data) {
                                op.text = objKHOMH[key].KHOCODE;
                                op.value = objKHOMH[key].KHOID;
                                x.options.add(op);
                                break;
                            }
                        }
                    }
                    return '' + x.outerHTML + ''
                }
            },
            {
                "data": "KHONHAPID",
                render: function (data, type, row) {

                    //var x = document.createElement("SELECT");
                    //x.name = 'khoNhapCTChuyenKho';

                    //var khoNhap = dsKhoNhap.filter(function (e) { return e.id !== slKhoXuat.find('option:selected').val(); });

                    //khoNhap.map((e) => {
                    //    var op = document.createElement("option");
                    //    op.text = e.KHOCODE
                    //    op.value = e.KHOID

                    //    if (op.value === data) {
                    //        op.setAttribute("selected", true);
                    //    }
                    //    x.options.add(op)
                    //})
                    //return '' + x.outerHTML + ''
                    var x = document.createElement("SELECT");
                    var op = document.createElement("option");
                    if (objKHOMH.length > 1) {
                        for (var key in objKHOMH) {
                            if (objKHOMH[key].KHOID == data) {
                                op.text = objKHOMH[key].KHOCODE;
                                op.value = objKHOMH[key].KHOID;
                                x.options.add(op);
                                break;
                            }
                        }
                    }
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
                data: "SoLuongTon",
                render: function (data, type, full, meta) {
                    return '<a type="button" data-toggle="modal" onclick = "CheckKho(\' ' + full.MHID + '\')" href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>';
                }
            },
            //{
            //    "data": "DONGIA",
            //    render: function (data, type, row) {
            //        return '<input type="text" class="text-right" name="donGiaChiTietChuyenKho" value="' + data + '"data-type="currency"/>';
            //    }
            //},
            //{
            //    "data": null,
            //    render: function (data, type, row) {
            //        if (type === 'display') {
            //            return '<input type="checkbox" class="editor-active">';
            //        }
            //        return data;
            //    },
            //    orderable: false,
            //    className: "dt-body-center"
            //},
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

    //Region LoadKho dc sử dụng
    LoadKho().then((e) => {
        e.data.map((value) => {
            objKHOMH.push({ KHOID: value.KHOID, KHOCODE: value.KHOCODE });
        })
    })
    //end
    //Click
    $('#table-ct-chuyen-kho tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-ct-chuyen-kho tbody tr').not(this).removeClass('selected');
    });

    //Thay đổi các input, select
    $('#table-ct-chuyen-kho tbody').on('change', 'tr.selected', function () {
        //var obj = {
        //    MHID: $(this).attr('data-MHID'),
        //    KHOXUATID: $(this).find('select[name="khoXuatCTChuyenKho"] option:selected').val(),
        //    KHONHAPID: $(this).find('select[name="khoNhapCTChuyenKho"] option:selected').val(),
        //    SOLUONG: $(this).find('input[name="soLuongChiTietChuyenKho"]').val(),
        //    DONGIA: $(this).find('input[name="donGiaChiTietChuyenKho"]').val(),
        //    GHICHU: $(this).find('input[name="ghiChuChiTietChuyenKho"]').val()
        //}
        let SOLUONG = $(this).find('input[name="soLuongChiTietChuyenKho"]').val()
        let GHICHU = $(this).find('input[name="ghiChuChiTietChuyenKho"]').val()
        let obj = tbChiTietMatHang.row($(this)).data();
        let i = tbChiTietMatHang.row($(this)).index();
        //var i = dataTempChuyenKho.findIndex(x => x.MHID == obj.MHID);
        if (dataTempChuyenKho[i].MHID == obj.MHID) {
            if (obj.KHOXUATID != undefined) {
                if (obj.KHOXUATID != dataTempChuyenKho[i].KHONHAPID) {
                    //dataTempChuyenKho[i].KHOXUATID = obj.KHOXUATID;
                    if (dataTempChuyenKho[i].status == 3) {
                        dataTempChuyenKho[i].status = 2;
                    }
                    dataTempChuyenKho[i].SOLUONG = SOLUONG;
                    dataTempChuyenKho[i].GHICHU = GHICHU;
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

            //if (obj.KHONHAPID != undefined) {
            //    if (obj.KHONHAPID != dataTempChuyenKho[i].KHOXUATID) {
            //        dataTempChuyenKho[i].KHONHAPID = obj.KHONHAPID;
            //    }
            //    else {
            //        toast.create({
            //            title: 'Notification!',
            //            text: 'Kho nhập phải khác kho xuất',
            //            icon: 'error_outline',
            //            classBackground: 'noti-error',
            //            timeout: 3000
            //        });
            //    }
            //}
            //if (obj.SOLUONG != undefined) {
            //    dataTempChuyenKho[i].SOLUONG = obj.SOLUONG;
            //}
            //if (obj.DONGIA != undefined) {
            //    dataTempChuyenKho[i].DONGIA = obj.DONGIA;
            //}
            //if (obj.GHICHU != undefined) {
            //    dataTempChuyenKho[i].GHICHU = obj.GHICHU;
            //}
            tbChiTietMatHang.clear();
            tbChiTietMatHang.rows.add(dataTempChuyenKho);
            tbChiTietMatHang.columns.adjust().draw();
            tbChiTietMatHang.row(i).select();
            tbChiTietMatHang.row(i).scrollTo(false);

            //tbChiTietMatHang.row(i).select();
        }
    });

    //Delete xóa một hàng
    $('#table-ct-chuyen-kho tbody').on('click', 'button', function () {
        let Phieu = tbChiTietMatHang.row($(this).closest('tr')).data();
        let index = tbChiTietMatHang.row($(this).closest('tr')).index();
        if (Phieu.status == 2 || Phieu.status == 3) {
            if (confirm('Bạn chắc chắn muốn xóa không?')) {
                //var id = $(this).val();
                //var removeIndex = dataTempChuyenKho.map(function (item) {
                //    return item.MHID
                //}).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)
                //let removeIndex = dataTempChuyenKho.findIndex(x => x.MHID === Phieu.MHID);
                dataTempChuyenKho.splice(index, 1); //Remove
                objDeleteCTPhieu.push(Phieu.PCTCKID);
            }
        }
        else {
            //var id = $(this).val();
            //var removeIndex = dataTempChuyenKho.map(function (item) {
            //    return item.MHID
            //}).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)
            //let removeIndex = dataTempChuyenKho.findIndex(x => x.MHID === Phieu.MHID);
            dataTempChuyenKho.splice(index, 1); //Remove
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
        if (dataTempChuyenKho.length <= 0) {
            alert("Hãy chọn 1 mặt hàng trước khi ghi");
            return;
        }
        let CheckKhoNhap = slKhoNhap.find('option:selected').val();
        if (CheckKhoNhap === undefined || CheckKhoNhap == null) {
            alert("Hãy chọn chi nhánh nhập");
            return;
        }
        let CheckKhoXuat = slKhoXuat.find('option:selected').val();
        if (CheckKhoXuat === undefined || CheckKhoXuat == null) {
            alert("Hãy chọn chi nhánh xuất");
            return;
        }


        if (CheckKhoXuat == CheckKhoNhap) {
            alert("Hãy chọn chi nhánh khác nhau");
            return;
        }

        data.append("PCKID", idPhieuChuyenKho.val());
        data.append("PCKCODE", soPhieuChuyenKho.val());
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
        data.append("NVID", slNguoiDeNghi.find('option:selected').val());
        if (slNguoiDuyet.find('option:selected').val() == '0') {
            toast.create({
                title: 'Notification!',
                text: "Vui lòng chọn người duyệt",
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        data.append("APPROVEDBY", slNguoiDuyet.find('option:selected').val());
        data.append("THUKHOXUAT", thuKhoXuatPhieuChuyenKho.val());
        data.append("THUKHONHAP", thuKhoNhapPhieuChuyenKho.val());
        data.append("NGAY", ngayChuyenKho.val());
        data.append("DIENGIAI", dienGiaiPhieuChuyenKho.val());
        data.append("CAID", slCaLamViecChuyenKho.find('option:selected').val());
        data.append("CATEN", slCaLamViecChuyenKho.find('option:selected').text());
        data.append("SRXUATID", slSRXuat.find('option:selected').val());
        data.append("SRNHAPID", slSRNhap.find('option:selected').val());
        data.append("APPROVED", checkApprovedChuyenKho.prop('checked'));
        data.append("CHECK", check);
        data.append("PWD", passwordDuyetChuyenKho.val());

        let objchange = [];
        for (var key in dataTempChuyenKho) {
            if (dataTempChuyenKho[key].status == 1 || dataTempChuyenKho[key].status == 2) {
                objchange.push(dataTempChuyenKho[key]);
            }
        }
        console.log(objDeleteCTPhieu);
        data.append("DETAIL", JSON.stringify(objchange));
        data.append("DETAILDELETE", JSON.stringify(objDeleteCTPhieu));
        $.ajax({
            async: false,
            type: 'POST',
            url: '/ChuyenKho/InsertUpdateChuyenKho',
            data: data,
            processData: false,
            contentType: false,
            success: function (msg) {
                if (msg.status == 1) {
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
                else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
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
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Print
    $('#btn-print-ct-chuyen-kho').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckPrintChuyenKho',
            success: function (res) {
                if (res.status == 1) {
                    let id = idPhieuChuyenKho.val();
                    if (id !== "") {
                        let getOrder = tbChiTietMatHang.order();
                        let Desc = getOrder[0][1];
                        let NumberOrder = getOrder[0][0];
                        var link = '/ChuyenKho/Print?id=' + id + '&desc=' + Desc + '&order=' + NumberOrder;
                        window.open(link);
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Không có dữ liệu để in',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                }
                else if (status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
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
                if (res.status == 1) {
                    let id = $('#table-phieu-chuyen-kho tbody tr.selected').attr('data-id');
                    var link = `/ChuyenKho/ExportCTChuyenKho?id=` + id
                    window.open(link);
                }
                else if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
    });
    //#endregion

    //#region Nhập mặt hàng từ excel

    var dataTempMatHangExcel = new Array();
    var tbMatHangExcel = $('#table-mat-hang-ct-excel').DataTable({
        bInfo: false,
        data: dataTempMatHangExcel,
        columns: [
            { "data": null }, //STT
            { "data": "MHCODE" }, //Nhóm cấp 1
            { "data": "MHTEN" }, //Nhóm cấp 2
            { "data": "SOLUONG" }, //Nhóm cấp 3
            { "data": "SoLuongTon" },
            { "data": "GHICHU" }, //Nhóm cấp 5
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            //let donGia = data.DONGIA;

            $($(nRow).children()[0]).html(iDataIndex + 1);
            //$($(nRow).children()[4]).html(convertCurrency(donGia));
        },

        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: false,
        searching: false,
        //pageLength: 10,
        //lengthChange: false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                let countdata = api.column(0).data().count();
                $(api.column(0).footer()).html(countdata);
            }
            else {
                $(api.column(0).footer()).html(0);
            }

        }
    });

    //Import
    var dataOpt = [];
    $('#btn-import-ct-phieu-kho').on('click', function () {
        let Check = slKhoNhap.find('option:selected').val();
        if (Check === undefined || check == null) {
            alert("Hãy chọn chi nhánh nhập");
            return;
        }
        $.ajax({
            async: false,
            type: 'GET',
            url: '/ChuyenKho/CheckExcelChuyenKho',
            success: function (res) {
                if (res.status == 1) {
                    if (idPhieuChuyenKho.val() === '') {
                        dataTempMatHangExcel = [];
                        tbMatHangExcel.clear().columns.adjust().draw();
                        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                        tbMatHangExcel.columns.adjust().draw();

                        dataTempChuyenKho = [];
                        objDeleteCTPhieu = [];
                        tbChiTietMatHang.clear().columns.adjust().draw();
                        tbChiTietMatHang.rows.add(dataTempChuyenKho);
                        tbChiTietMatHang.columns.adjust().draw();

                        $('#btn-kiem-tra-ton-kho').addClass('disabled-chuyen-kho');
                        $('#btn-dong-y-nhap').addClass('disabled-chuyen-kho');

                        $('#excel-mat-hang-chuyen-kho select[name="slSheetsMatHangCT"]').children().remove().end();
                        $('#excel-mat-hang-chuyen-kho').modal();
                        var khoXuat = slKhoXuat.find('option:selected').text();
                        var khoNhap = slKhoNhap.find('option:selected').text();

                        $('#excel-mat-hang-chuyen-kho').find('div[id = "khoXuat"] > span:last-child').addClass('font-weight-bold').text(khoXuat);
                        $('#excel-mat-hang-chuyen-kho').find('div[id = "khoNhap"] > span:last-child').addClass('font-weight-bold').text(khoNhap);

                        setTimeout(() => { tbMatHangExcel.draw() }, 150)
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Bạn chỉ được phép sử dụng chức năng này khi đang thêm phiếu mới',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    }
                }
                else if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
    });

    $("#btn-import-mat-hang-ct-excel").on('click', function () {
        $('input[type="file"][name="excelMatHangCT"]').click();
    });
    $('input[type="file"][name="excelMatHangCT"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import(files[0], "", "");
        $(this).val('');
    });

    //Change Sheet
    $('#excel-mat-hang-chuyen-kho select[name="slSheetsMatHangCT"]').on('change', async function () {
        var name = $(this).find('option:selected').text();
        var url = $(this).find('option:selected').val();
        if (/\s/.test(name)) {
            toast.create({
                title: 'Notification!',
                text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
        else {
            await Import("", name, url);
        }
        //console.log(name, url);
    });

    //Reset
    $('#btn-reset-mat-hang-ct-excel').on('click', function () {
        $('input[type="file"][name="excelMatHangCT"]').click();
    });

    //Function Import Excel
    async function Import(file, sheetName, url) {
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        data.append("KHOXUAT", slKhoXuat.find('option:selected').val());
        data.append("SRXUAT", slSRXuat.find('option:selected').val());
        data.append("KHONHAP", slKhoNhap.find('option:selected').val());
        return $.ajax({
            type: 'POST',
            url: '/ChuyenKho/Import',
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.dataTable.status == 1) {
                    if (res.dataTable.data.length > 0) {
                        //if (sheetName === '') {
                        //    $('#excel-mat-hang-chuyen-kho select[name="slSheetsMatHangCT"]').children().remove().end();
                        //    for (var i = 0; i < res.sheetName.length; i++) {
                        //        var opt = new Option(res.sheetName[i].Name, res.sheetName[i].URL);
                        //        $(opt).html(res.sheetName[i].Name);
                        //        $('#excel-mat-hang-chuyen-kho select[name="slSheetsMatHangCT"]').append(opt);
                        //        dataOpt.push(res.sheetName[i].Name);
                        //        if (/\s/.test(res.sheetName[i].Name)) {
                        //            toast.create({
                        //                title: 'Notification!',
                        //                text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
                        //                icon: 'error_outline',
                        //                classBackground: 'noti-error',
                        //                timeout: 3000
                        //            });
                        //        }
                        //    }
                        //}
                        dataTempMatHangExcel = [];
                        dataTempChuyenKho = [];
                        console.log(res.dataTable.data);
                        for (var i = 0; i < res.dataTable.data.length; i++) {
                            //if (!validation.isNumber(res.dataTable.data[i].DONGIA)) {
                            //    res.dataTable.data[i].DONGIA = 0;
                            //}
                            if (!validation.isNumber(res.dataTable.data[i].SOLUONG)) {
                                res.dataTable.data[i].SOLUONG = 1;
                            }


                            if (res.dataTable.data[i].MHCODE == "") {
                                continue;
                            }
                            else {
                                val = res.dataTable.data[i];
                                var obj = {
                                    MHID: val.MHID,
                                    MHCODE: val.MHCODE,
                                    MHTEN: val.MHTEN,
                                    KHOXUATID: slKhoXuat.find('option:selected').val(),
                                    KHONHAPID: slKhoNhap.find('option:selected').val(),
                                    DONVI: val.DONVI,
                                    SOLUONG: val.SOLUONG,
                                    //DONGIA: val.DONGIA == undefined ? '' : val.DONGIA,
                                    GHICHU: val.GHICHU == undefined ? '' : val.GHICHU,
                                    SoLuongTon: val.SOLUONGTON,
                                    LINKIMAGE: val.LINKIMAGE,
                                    status: 1,
                                    ViTri: val.ViTri,
                                };
                                dataTempMatHangExcel.push(obj);
                                //dataTempChuyenKho.push(obj)
                                //dataTempMatHangExcel.push(res.dataTable.data[i])
                            }
                            tbMatHangExcel.clear().columns.adjust().draw();
                            tbMatHangExcel.rows.add(dataTempMatHangExcel);
                            tbMatHangExcel.columns.adjust().draw();
                        }


                        if (dataTempMatHangExcel.length > 0) {
                            toast.create({
                                title: 'Notification!',
                                text: 'Thành công',
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            });
                            $('#btn-kiem-tra-ton-kho').removeClass('disabled-chuyen-kho');
                            $('#btn-dong-y-nhap').removeClass('disabled-chuyen-kho');
                        }

                    }
                }
                else if (res.dataTable.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.dataTable.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.dataTable.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.dataTable.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
    }

    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-mat-hang-ct-excel').on('click', function () {
        var link = `/ChuyenKho/Create`;
        window.open(link)
    });

    //Kiểm tra
    var validation = {
        isEmailAddress: function (str) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str);  // returns a boolean
        },
        isNotEmpty: function (str) {
            var pattern = /\S+/;
            return pattern.test(str);  // returns a boolean
        },
        isNumber: function (str) {
            var pattern = /^\d+$/;
            return pattern.test(str);  // returns a boolean
        },
        isSame: function (str1, str2) {
            return str1 === str2;
        }
    };

    //Kiểm tra tồn kho
    $('#btn-kiem-tra-ton-kho').on('click', function () {
        $('#popup-thong-bao-mat-hang').modal();
        //$('#mat-hang-so-luong-thieu').modal();
    });

    //ModalAsk
    $('#popup-thong-bao-mat-hang').on('shown.bs.modal', function () {
        var khoXuat = $('#excel-mat-hang-chuyen-kho').find('div[id = "khoXuat"] > span:last-child').text();
        let html = `<p>Bạn đang lựa chọn kho ${khoXuat.bold()}(Kho xuất) để kiểm tra tồn kho. Bạn có muốn tiếp tục kiểm tra với kho đó không?</p>`;
        $('#popup-thong-bao-mat-hang').find('.mo-ta').html(html);
    });
    $('#btn-mat-hang-so-luong-thieu-yes').on('click', function () {
        $('#popup-thong-bao-mat-hang').modal('hide');
        setTimeout(() => { $('#mat-hang-so-luong-thieu').modal(); }, 500);
    });

    $('#mat-hang-so-luong-thieu').on('shown.bs.modal', function () {
        if (dataTempChuyenKho.length > 0) {
            const filteredItems = dataTempChuyenKho.filter(x => parseInt(x.SOLUONG) - parseInt(x.SOLUONGTON) > 0);
            tbMatHangSL.clear().columns.adjust().draw();
            tbMatHangSL.rows.add(filteredItems);
            tbMatHangSL.columns.adjust().draw();
        }
    });

    //Table kiểm tra tồn kho
    var tbMatHangSL = $('#table-mat-hang-so-luong-thieu').DataTable({
        bInfo: false,
        data: dataTempMatHangExcel,
        columns: [
            { "data": null }, //STT
            { "data": "MHCODE" }, //Nhóm cấp 1
            { "data": "MHTEN" }, //Nhóm cấp 2
            { "data": "SOLUONG" }, //Nhóm cấp 3
            { "data": "SOLUONGTON" }, //Nhóm cấp 4
            { "data": null }, //Nhóm cấp 5
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            let soLuongXuat = parseInt(data.SOLUONG);
            let soLuongTon = parseInt(data.SOLUONGTON);
            $($(nRow).children()[0]).html(iDataIndex + 1);
            $($(nRow).children()[3]).addClass('text-primary');
            $($(nRow).children()[5]).addClass('text-danger').html(soLuongXuat - soLuongTon);
        },

        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: false,
        searching: false,
    });

    //Export
    $('#btn-excel-mat-hang-so-luong-thieu').on('click', function () {
        const filteredItems = dataTempChuyenKho.filter(x => parseInt(x.SOLUONG) - parseInt(x.SOLUONGTON) > 0);
        var data = JSON.stringify(filteredItems);
        var link = `/ChuyenKho/ExportSoLuongMatHang?data=${data}`;
        window.open(link);
    });
    //#endregion

    //#region Nhân viên
    //Function load Nhóm nhân viên (<select>)
    //NhanVien();
    //function NhanVien() {
    //    let dsNV = [];
    //    let dsNV2 = [];
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

    //                dsNV2 = $.map(msg.data, function (obj) {
    //                    obj.id = obj.NVCODE;
    //                    obj.text = obj.NVCODE + ' - ' + obj.NVTEN;
    //                    return obj
    //                });
    //                slNguoiDuyet.select2({
    //                    data: dsNV2,
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
        console.log(dataTempChuyenKho);
        console.log(objDeleteCTPhieu);
        tbChiTietMatHang.draw();
    });

    $('#them-phieu-chuyen-kho').on('hidden.bs.modal', function () {
        //if (dataTempChuyenKho.length !== 0) {
        //    dataTempChuyenKho = [];
        //    objDeleteCTPhieu = [];
        //    tbChiTietMatHang.clear().columns.adjust().draw();
        //}
        dataTempChuyenKho = [];
        objDeleteCTPhieu = [];
        tbChiTietMatHang.clear().columns.adjust().draw();
    });

    let check = 0;
    $('#popup-duyet-chuyen-kho').on('shown.bs.modal', function () {
        check = 1;
    });

    $('#popup-duyet-chuyen-kho').on('hidden.bs.modal', function () {
        check = 0;
    });

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    $('#btn-dong-y-nhap').click(function () {
        dataTempChuyenKho = dataTempMatHangExcel;
        tbChiTietMatHang.clear().columns.adjust().draw();
        tbChiTietMatHang.rows.add(dataTempChuyenKho);
        tbChiTietMatHang.columns.adjust().draw();
    })

    //$('.search-date').datetimepicker({
    //    timepicker: false,
    //    format: 'd/m/Y',
    //    mask: true,
    //});
});

function CheckKho(e) {
    console.log(filterObj_tonkho);
    filterObj_tonkho.MHID = e;
    filterObj_tonkho.statusDraw++;
    $('#danh-sach-tonkho').modal();
}
//#region Table Tồn kho
$('#danh-sach-tonkho').on('show.bs.modal', async function () {
    tonkho.columns.adjust().draw()
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
//#endregion

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

async function LoadKho() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/ChuyenKho/LoadKhoDuocDung',
        success: function (res) {
            return res.data;
        }
    });
}
$("html").on("click", ".click-to-show-table", function () {
    $(".table-search").show();
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

serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}