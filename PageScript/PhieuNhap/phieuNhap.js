




$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });

$(document).ready(function () {
    // Actor Thành Anh Thêm search header 23/02/2021
    //Search Header Bang Chi Tiet Phieu
    //$('#tbl_ctphieu thead tr').clone(true).appendTo('#tbl_ctphieu thead');
    //$('#tbl_ctphieu thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    if (i != 0 && i != 3 && i != 4 && i != 11 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16 && i != 21)
    //        $(this).html('<input type="text" style="width:100%" id="txt-header-' + i + '" placeholder="Search ' + title + '" />');

    //    $('input', this).on('keyup change', function () {
    //        if (tbl_ctphieu.column(i).search() !== this.value) {
    //            tbl_ctphieu
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
    //end
    let statusGetAll = 0
    let KhoList = []
    let dataFilter = {}
    let Sophieu = 0;
    let statusChecked_datetime = true
    let statusChecked_input = false
    let tbl_search_ct_phieu_filterValues = {}


    // ------------------------------------- 

    //#region Load Nhan Vien Va Khach Hang
    var LuuIDNV = null;
    var ListNCCData = []
    LoadDataNvVAKh().then((e) => {


        // HTML Khach Hang
        e.dataKH.map((value) => {
            ListNCCData.push(value)
            $('select[name="kh-code"]').append('<option value="' + value.KHCODE + '">' + value.KHCODE + '</option>');
            $('select[name="kh-ten"]').append('<option value="' + value.KHCODE + '">' + value.KHTEN + '</option>');

            $('select[name="ncc-code"]').append('<option value="' + value.KHCODE + '">' + value.KHCODE + '</option>');
            $('select[name="ncc-name"]').append('<option value="' + value.KHCODE + '">' + value.KHTEN + '</option>');
        })

        // HTML Nhan Vien
        e.dataNV.map((value) => {
            $('select[name="nv-code"]').append('<option value="' + value.NVCODE + '">' + value.NVCODE + '</option>');
            $('select[name="nv-ten"]').append('<option value="' + value.NVCODE + '">' + value.NVTEN + '</option>');
        })

        // trigger khach hang
        $('select[name="kh-code"]').val('');
        $('select[name="kh-ten"]').val('');
        $('select[name="kh-code"]').select2({ dropdownParent: $("#them-order"), width: '59%' });
        $('select[name="kh-ten"]').select2({ dropdownParent: $("#them-order"), width: '75%' });


        // trigger nhà cung cấp tìm phiếu
        $('select[name="ncc-code"]').val('');
        $('select[name="ncc-name"]').val('');
        $('select[name="ncc-code"]').select2({ dropdownParent: $("#tim-phieu-nhap-kho"), width: '59%' });
        $('select[name="ncc-name"]').select2({ dropdownParent: $("#tim-phieu-nhap-kho"), width: '81%' });



        // trigger nhan vien 
        $('select[name="nv-code"]').select2({ dropdownParent: $("#them-order"), width: '59%' });
        $('select[name="nv-ten"]').select2({ dropdownParent: $("#them-order"), width: '75%' });

        // trigger lydo
        $('select[name="lydo"]').select2({ dropdownParent: $("#them-order"), width: '59%' });


    }).catch(() => { console.log('error') })

    $('select[name="kh-code"]').on('select2:select', function (e) {
        // Do something 
        $('select[name="kh-ten"]').val($(this).val()).trigger('change');
        var data = ListNCCData.filter(x => x.KHCODE == $(this).val())
        console.log(data)

        $('input[name="kh-daidien"]').val(data[0].NGUOIDAIDIEN)
        $('input[name="kh-dienthoai"]').val(data[0].DIENTHOAI)
        $('input[name="kh-mob"]').val(data[0].DIDONG)
        $('input[name="kh-diachi"]').val(data[0].DIACHI)


    });

    $('select[name="kh-ten"]').on('select2:select', function (e) {
        // Do something
        $('select[name="kh-code"]').val($(this).val()).trigger('change');
        var data = ListNCCData.filter(x => x.KHCODE == $(this).val())
        $('input[name="kh-daidien"]').val(data[0].NGUOIDAIDIEN)
        $('input[name="kh-dienthoai"]').val(data[0].DIENTHOAI)
        $('input[name="kh-mob"]').val(data[0].DIDONG)
        $('input[name="kh-diachi"]').val(data[0].DIACHI)
    });
    $('select[name="nv-code"]').on('select2:select', function (e) {

        $('select[name="nv-ten"]').val($(this).val()).trigger('change');

    });
    $('select[name="nv-ten"]').on('select2:select', function (e) {

        $('select[name="nv-code"]').val($(this).val()).trigger('change');

    });

    // select bảng tìm phiếu nhập kho
    $('select[name="ncc-code"]').on('select2:select', function (e) {

        $('select[name="ncc-name"]').val($(this).val()).trigger('change');

    });
    $('select[name="ncc-name"]').on('select2:select', function (e) {

        $('select[name="ncc-code"]').val($(this).val()).trigger('change');

    });

    //#endregion

    // ------------------------------------- 

    //#region Load Nhân viên
    $('#tbl-nhanvien thead tr').clone(true).appendTo('#tbl-nhanvien thead');
    $('#tbl-nhanvien thead tr:eq(1) th').each(function (i) {
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
    var tbStaff = $('#tbl-nhanvien').DataTable({
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

    var dataIdStaff = null;
    var dataIndexStaff = 0;
    $('#tbl-nhanvien  tbody').on('dblclick', 'tr', function () {

        let datarow = $(this).attr('data-dt-row');
        $(this).closest('#tbl-nhanvien').find('tr').removeClass('selected');
        $(this).closest('#tbl-nhanvien').find('tr[data-dt-row="' + datarow + '"]').addClass('selected');
        console.log('hello')

        data = tbStaff.row($(this).index()).data()
        $('select[name="nv-code"]').val(data.NVCODE).trigger('change');
        dataMuaDon.NVID = data.NVID;
        $('select[name="nv-ten"]').val(data.NVCODE).trigger('change');
        /* // insert--data
         dataInsert.NVID = e.Data.NVID
         dataInsert.NVCODE = e.Data.NVCODE
         dataInsert.NVTEN = e.Data.NVTEN*/
        $('#danh-sach-nv').modal('toggle')

    });

    async function LoadStaffInfo(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MuaHang/LoadStaffInfo?id=' + id,
            success: function (msg) {

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
    let tbKhachHangCTPHIEU_CTPHIEU_filterValues = {};
    tbKhachHangCTPHIEU_CTPHIEU_filterValues.statusDraw = 0
    var tbKhachHangCTPHIEU = $('#table-nhacungcap').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.draw = data.draw;
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search = data.search["value"];

            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search1 = $('input[data-index=1]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search2 = $('input[data-index=2]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search3 = $('input[data-index=3]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search4 = $('input[data-index=4]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search5 = $('select[data-index=5]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search6 = $('input[data-index=6]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search7 = $('input[data-index=7]').val();
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.search8 = $('input[data-index=8]').val();

            tbKhachHangCTPHIEU_CTPHIEU_filterValues.start = data.start;
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.length = data.length;
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.order = data.order[0].column;
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.dir = data.order[0].dir;
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.export = 0;



            $.ajax({
                url: '/KhachHang/LoadNhaCungCap',
                method: 'GET',
                data: tbKhachHangCTPHIEU_CTPHIEU_filterValues,
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
                        if (tbKhachHangCTPHIEU_CTPHIEU_filterValues.draw != 1) {
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

                console.log(this)

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
            { "data": null, defaultContent: '' }, //Ngày mua cuối cùng //45
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
        initComplete: function () {

        }
    });

    $(tbKhachHangCTPHIEU.table().container()).on('keyup', 'thead input', function () {
        var stringtr = 'input[data-index="' + $(this).data('index') + '"]'

        //.. 
        if ($(this).val() === ' ') {
            $(stringtr).val(null)
        } else {
            $(stringtr).val($(this).val())
            tbKhachHangCTPHIEU.draw();
        }

    });
    $(tbKhachHangCTPHIEU.table().container()).on('change', 'thead select', function () {
        tbKhachHangCTPHIEU.draw();
    });

    //....


    function tbKhachHangCTPHIEU_CTPHIEU_timeout() {
        setTimeout(function () {
            tbKhachHangCTPHIEU_CTPHIEU_filterValues.statusDraw++;
            tbKhachHangCTPHIEU.columns.adjust().draw();
        }, 500)
    }
    $('#danh-sach-khach-hang').on('show.bs.modal', function () {
        if (tbKhachHangCTPHIEU_CTPHIEU_filterValues.draw < 2 || tbKhachHangCTPHIEU_CTPHIEU_filterValues.statusDraw < 1) {
            tbKhachHangCTPHIEU_CTPHIEU_timeout()
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

        var data = tbKhachHangCTPHIEU.row($(this).index()).data()

        $('select[name="kh-code"]').val(data.KHCODE).trigger('change');
        dataMuaDon.KHID = data.KHID
        $('select[name="kh-ten"]').val(data.KHCODE).trigger('change');
        $('input[name="kh-daidien"]').val(data.NGUOIDAIDIEN)
        $('input[name="kh-dienthoai"]').val(data.DIENTHOAI)
        $('input[name="kh-mob"]').val(data.DIDONG)
        $('input[name="kh-diachi"]').val(data.DIACHI)
        /*  // insert--data
          dataInsert.KHID = e.data.KHID
          dataInsert.KHCODE = e.data.KHCODE
          dataInsert.KHTEN = e.data.KHTEN*/
        $('#danh-sach-khach-hang').modal('toggle')

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
    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };
    //--------------------------------------

    //#region Modal tìm phiếu nhập kho 

    //#region Chọn nhà cung cấp từ modal con => lấy mã nhà cung cấp 
    $('#table-tim-kiem-nha-cungcap-NK thead tr').clone(true).appendTo('#table-tim-kiem-nha-cungcap-NK thead');
    $('#table-tim-kiem-nha-cungcap-NK thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 46) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-index', i);
            var data = [{ key: '--Thuộc kiểu--', value: '' }, { key: 'Nhà cung cấp', value: '1' }, { key: 'Khách hàng + Nhà cung cấp', value: '2' }];
            data.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else if (i == 18) {
            var y = document.createElement("SELECT");
            y.setAttribute('data-index', i);
            var data18 = [{ key: '--Nhận tin--', value: '' },
            { key: 'Hình thức bất kỳ', value: '0' },
            { key: 'Qua SMS', value: '1' },
            { key: 'Qua Email', value: '2' },
            { key: 'Qua Tel/Mob', value: '3' },
            { key: 'Không muốn liên hệ', value: '4' }];
            data18.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                y.options.add(op)
            })
            $(this).html(y);
        }
        else if (i == 45) {
            var z = document.createElement("SELECT");
            z.setAttribute('data-index', i);
            var data45 = [{ key: '--Khách hàng tiềm năng--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data45.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                z.options.add(op)
            })
            $(this).html(z);
        }
        else if (i == 19) {
            var a = document.createElement("SELECT");
            a.setAttribute('data-index', i);
            var data19 = [{ key: '--Theo dõi--', value: '' },
            { key: 'False', value: '0' },
            { key: 'True', value: '1' }];
            data19.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                a.options.add(op)
            })
            $(this).html(a);
        }
        else if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" placeholder="Search ' + title + '" data-index="' + i + '"/>');
        }
    });

    let tbKhachHangs_filterValues = {};
    tbKhachHangs_filterValues.statusDraw = 0
    var tbKhachHangs = $('#table-tim-kiem-nha-cungcap-NK').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (tbKhachHangs_filterValues.statusDraw > 0) {
                tbKhachHangs_filterValues.draw = data.draw;
                tbKhachHangs_filterValues.search = data.search["value"];

                tbKhachHangs_filterValues.search1 = $('input[data-index=1]').val();
                tbKhachHangs_filterValues.search2 = $('input[data-index=2]').val();
                tbKhachHangs_filterValues.search3 = $('input[data-index=3]').val();
                tbKhachHangs_filterValues.search4 = $('input[data-index=4]').val();
                tbKhachHangs_filterValues.search5 = $('input[data-index=5]').val();
                tbKhachHangs_filterValues.search6 = $('input[data-index=6]').val();
                tbKhachHangs_filterValues.search7 = $('input[data-index=7]').val();
                tbKhachHangs_filterValues.search8 = $('input[data-index=8]').val();

                tbKhachHangs_filterValues.start = data.start;
                tbKhachHangs_filterValues.length = data.length;
                tbKhachHangs_filterValues.order = data.order[0].column;
                tbKhachHangs_filterValues.dir = data.order[0].dir;

                $.ajax({
                    url: '/KhachHang/LoadNhaCungCap',
                    method: 'GET',
                    data: tbKhachHangs_filterValues,
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
                            if (tbKhachHangs_filterValues.draw != 1) {
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
            }

        },
        columns: [
            { "data": "RowIndex" },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            {
                "data": "DIACHI",
                "render": function (data) {
                    return `<span class="shorter-text text-left" style="width: 80px" title="` + data + `"> ` + data + `</span>`
                }
            },
            { "data": "DIENTHOAI" },
            { "data": "DIDONG" },
            { "data": "MASOTHUE" },
            { "data": "ALIAS" },
            { "data": "NHOMKH" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.KHID);
            $(nRow).attr('data-dt-row', iDataIndex);
        },
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 50
        },
        orderCellsTop: true,
    });

    function tbKhachHangs_TimeOut() {
        setTimeout(function () {
            tbKhachHangs_filterValues.statusDraw++;
            tbKhachHangs.draw()
        }, 500)
    }
    $('#tim-kiem-nha-cungcap').on('show.bs.modal', function () {
        if (tbKhachHangs_filterValues.statusDraw < 1 || tbKhachHangs_filterValues.draw < 2) {
            tbKhachHangs_TimeOut()
        }
    })
    $(tbKhachHangs.table().container()).on('keyup', 'thead input', function () {
        var stringtr = 'input[data-index="' + $(this).data('index') + '"]'

        if ($(this).val() === ' ') {
            $(stringtr).val(null)
        } else {
            $(stringtr).val($(this).val())
            tbKhachHangs.draw();
        }

    });

    // Click vào table danh sách khách hàng  

    var dataIdKHSearch = null;
    var dataindex = 0;
    $('.ql-ds-kh tbody').on('click', 'tr', function () {
        dataIdKHSearch = $(this).attr('data-id')
        dataindex = $(this).index()
        $(this).closest('.ql-ds-kh').find('tr').removeClass('selected')
        $(this).closest('.ql-ds-kh').find('tr[data-id="' + dataIdKHSearch + '"]').addClass('selected')
    });
    // Chọn sản phẩm bằng dblclick
    $('#tim-kiem-nha-cungcap tbody').on('dblclick', 'tr', function () {
        tbKhachHangs.row($(this).index()).select();
        $('#table-tim-kiem-nha-cungcap-NK tbody tr').not(this).removeClass('selected');
        var data = tbKhachHangs.row($(this).index()).data();

        $('select[name="ncc-code"]').val(data.KHCODE).trigger('change');
        $('select[name="ncc-name"]').val(data.KHCODE).trigger('change');


        $('#tim-kiem-nha-cungcap').modal('toggle')
    });

    $('#btn-chon-thoat-ncc').on('click', function () {
        if (dataIdKHSearch == null) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn dữ liệu trong bảng',
                icon: 'error-outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else {
            var data = tbKhachHangs.row(dataindex).data();
            $('select[name="ncc-code"]').val(data.KHCODE).trigger('change');
            $('select[name="ncc-name"]').val(data.KHCODE).trigger('change');

            $('#tim-kiem-nha-cungcap').modal('toggle')
        }
    })
    //#endregion

    // -------------------------------------

    //#region Chọn mặt hàng từ modal con => lấy mã mặt hàng

    let filter_dsMH = {};
    filter_dsMH.statusDraw = 0
    var tbl_dsMatHang = $('#table-tim-kiem-mat-hang-NK').DataTable({
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
                filter_dsMH.statusColums = 8

                $.ajax({
                    type: 'GET',
                    url: '/MuaHang/LoadMatHang',
                    data: filter_dsMH,
                    success: function (res) {

                        /* tbl_searchMatHang.columns.adjust()*/
                    }
                }).done(callback, () => {
                    html: true;
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
            {
                "targets": 2,
                "className": "text-left short-text",
                "data": "MHTEN",
                "render": function (data) {
                    return `<span class="shorter-text" style="width: 150px" title="` + data + `">` + data + `</span>`
                }
            },
            {
                "targets": 3,
                "className": "text-left short-text",
                "data": "MHALIAS",
                "render": function (data) {
                    return `<span class="shorter-text" style="width: 80px" title="` + data + `">` + data + `</span>`
                }
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHMOTA",
                "render": function (data) {
                    return `<span class="shorter-text" style="width: 80px" title="` + data + `">` + data + `</span>`
                }
            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        scrollX: true,
        scrollResize: false,
        scrollY: 300,
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
    $('#tim-kiem-mat-hang').on('show.bs.modal', function () {
        if (filter_dsMH.draw < 2 || filter_dsMH.statusDraw < 1) {
            dsMatHang_timeout();
        }

    });
    // -------------------------------------
    // Click vào table danh sách mặt hàng  

    var dataIdMHSearch = null;
    var dataIndexMH = 0
    $('.ql-tk-kh tbody').on('click', 'tr', function () {
        dataIdMHSearch = $(this).attr('data-id');
        dataIndexMH = $(this).index()
        $(this).closest('.ql-tk-kh').find('tr').removeClass('selected');
        $(this).closest('.ql-tk-kh').find('tr[data-id="' + dataIdMHSearch + '"]').addClass('selected');
    });
    // -------------------------------------

    // chọn sản phẩm bằng dblclick
    $('#tim-kiem-mat-hang  tbody').on('dblclick', 'tr', function () {



        var data = tbl_dsMatHang.row($(this).index()).data();
        $('input[name="mathang-code"]').val(data.MHCODE)


        $('#tim-kiem-mat-hang').modal('toggle')

    });
    // -------------------------------------
    // chọn sản phẩm  

    /*   $('#btn-chon-mathang').on('click', function () {
   
           if (dataIdMHSearch != null && dataIdMHSearch != undefined) {
               load_mathang_byId_fnc(dataIdMHSearch)
           } else {
               toast.create({
                   title: 'Notification!',
                   text: 'Vui lòng chọn sản phẩm',
                   icon: 'error_outline',
                   classBackground: 'noti-error',
                   timeout: 3000
               });
           }
       });*/
    // -------------------------------------
    // chọn sản phẩm và thoát

    $('#btn-chon-thoat-mh').on('click', function () {
        if (dataIdMHSearch != null && dataIdMHSearch != undefined) {

            var data = tbl_dsMatHang.row(dataIndexMH).data();
            $('input[name="mathang-code"]').val(data.MHCODE)


            $('#tim-kiem-mat-hang').modal('toggle')

        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn sản phẩm',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    });


    // function lấy dữ liệu mặt hàng  
    async function loadMatHangbyMHID(MHID, Khoid) {
        var array = {};
        array.mathangID = MHID;
        array.khoID = Khoid
        return await $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMatHangByMHID',
            data: array,
            success: function (res) {

                return res.data
            }
        })
    }
    // -------------------------------------





    //#endregion  

    // -------------------------------------

    // Enable / Disable filter by datetime
    $('input[name="checkbox-disable"]').on('change', function () {

        if (this.checked) {
            statusChecked_datetime = true
            $('input[name="to"]').removeAttr('disabled')
            $('input[name="from"]').removeAttr('disabled')
            $('select[name="choose-date-filter"]').removeAttr('disabled')
        } else {
            statusChecked_datetime = false
            $('input[name="to"]').attr('disabled', true)
            $('input[name="from"]').attr('disabled', true)
            $('select[name="choose-date-filter"]').attr('disabled', true)

        }

    })
    // -------------------------------------
    //keyup dien giai
    $('input[name="search-txt-diengiai"]').on('keyup change', delay(function () {
        if ($('input[name="search-txt-diengiai"]').is(':focus')) {
            tbl_search_ct_phieu_filterValues.diengiai = $(this).val();
            tbl_search_ct_phieu_filterValues.statusDraw++;
            tbl_ct_search.columns.adjust().draw();
        }
    }, 1000));
    //end
    //#region Bảng Tìm Phiếu


    tbl_search_ct_phieu_filterValues.statusDraw = 0

    var tbl_ct_search = $('#table-search-nhap-kho').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        ajax: function (data, callback, setting) {
            if (tbl_search_ct_phieu_filterValues.statusDraw > 0) {
                tbl_search_ct_phieu_filterValues.diengiai = $('input[name="search-txt-diengiai"]').val();
                tbl_search_ct_phieu_filterValues.draw = data.draw;
                tbl_search_ct_phieu_filterValues.start = data.start;
                tbl_search_ct_phieu_filterValues.length = data.length;
                tbl_search_ct_phieu_filterValues.order = data.order[0].column;
                tbl_search_ct_phieu_filterValues.dir = data.order[0].dir;

                tbl_search_ct_phieu_filterValues.MHDCODE = $('input[name="sophieu"]').val()
                tbl_search_ct_phieu_filterValues.KHCODE = $('select[name="ncc-code"]').val()

                var kh = ListNCCData.filter(x => x.KHCODE == $('select[name="ncc-code"]').val())

                tbl_search_ct_phieu_filterValues.KHNAME = kh.length > 0 ? kh[0].KHTEN : ''
                tbl_search_ct_phieu_filterValues.IMEI = $('input[name="imei"]').val()

                tbl_search_ct_phieu_filterValues.MHCODE = $('input[name="mathang-code"]').val()
                tbl_search_ct_phieu_filterValues.lydo = $('#tim-phieu-nhap-kho select[name="lydos"]').val()
                tbl_search_ct_phieu_filterValues.KHID = ''
                tbl_search_ct_phieu_filterValues.MHID = ''

                if (statusChecked_datetime) {
                    tbl_search_ct_phieu_filterValues.from = $('input[name="from"]').val()
                    tbl_search_ct_phieu_filterValues.to = $('input[name="to"]').val()

                } else {
                    tbl_search_ct_phieu_filterValues.from = ''
                    tbl_search_ct_phieu_filterValues.to = ''
                }

                $.ajax({
                    url: '/PhieuNhapKho/LoadDanhSachPhieu',
                    method: 'GET',
                    data: tbl_search_ct_phieu_filterValues,
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
                            if (tbl_search_ct_phieu_filterValues.draw != 1) {
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
                    html: true;
                    $('#btn-search-xuat').removeClass('disabled-nhap-kho')
                });
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
                "data": "MHDCODE",
            },
            {
                "targets": 2,
                "className": "text-left short-text",
                "data": "NGAYHD",
            },
            {
                "targets": 3,
                "className": "text-left short-text",
                "data": "KHCODE",
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "KHTEN",
            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "NVTEN",
            },
            {
                "targets": 6,
                "className": "text-left",
                "data": "DIENGIAI",
            },
            {
                "targets": 7,
                "className": "text-right",
                "data": 'TONGTIEN',
                "render": function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }

            },
            {
                "targets": 8,
                "className": "text-left",
                "data": "LDTEN",
                /*"render": function (data) {
                    return `<span class="shorter-text">` + data+`</span>`
                }*/
            },
            {
                "targets": 9,
                "className": "text-left",
                "data": "USERID",
            },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            var date = moment(data.NGAYHDstr).format('DD/MM/YYYY')
            $(nRow).find('td:eq(2)').html(date)
        },
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            $(api.column(1).footer()).html(data.length == 0 ? '' : data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
           // $(api.column(7).footer()).html(data.length == 0 ? '' : data[0].SumofTONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
        },
        scrollX: true,
        scrollResize: false,
        scrollY: 350,
        scrollCollapse: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },

        pageLength: 5,
        lengthChange: false,
    });

    var statusLoadupdate = false
    function tbl_ct_search_timout(number) {
        setTimeout(function () {
            tbl_search_ct_phieu_filterValues.statusDraw++
            tbl_ct_search.columns.adjust().draw()
        }, number)

    }
    //Show bảng tìm phiếu
    $('#tim-phieu-nhap-kho').on('show.bs.modal', function () {
        $('#tim-phieu-nhap-kho select[name="ncc-code"]').val('').trigger('change')
        $('#tim-phieu-nhap-kho select[name="ncc-name"]').val('').trigger('change')
        setTimeout(function () {
            $('input[name="sophieu"]').focus();
        }, 500);
        console.log(statusLoadupdate)
        if (statusLoadupdate) {
            tbl_ct_search_timout(300)
            statusLoadupdate = false
            console.log('vaoerer');

        }
        //ClearModal()

    })
    $('#tim-phieu-nhap-kho').on('hide.bs.modal', function () {
        //  changeToinput(false)

    })
    // click button để filter 
    $('#btn-search-phieu').on('click', function () {
        tbl_ct_search_timout()
    })

    $('#btn-search-xuat').on('click', function () {
        var filterReport = {}
        filterReport.draw = tbl_search_ct_phieu_filterValues.draw
        filterReport.start = 0
        filterReport.length = 10
        filterReport.order = tbl_search_ct_phieu_filterValues.order
        filterReport.dir = tbl_search_ct_phieu_filterValues.dir
        filterReport.status = tbl_search_ct_phieu_filterValues.status
        filterReport.from = tbl_search_ct_phieu_filterValues.from
        filterReport.to = tbl_search_ct_phieu_filterValues.to
        filterReport.search = tbl_search_ct_phieu_filterValues.search

        filterReport.MHID = tbl_search_ct_phieu_filterValues.MHID
        filterReport.MHDCODE = tbl_search_ct_phieu_filterValues.MHDCODE
        filterReport.KHCODE = tbl_search_ct_phieu_filterValues.KHCODE == null ? '' : tbl_search_ct_phieu_filterValues.KHCODE
        filterReport.IMEI = tbl_search_ct_phieu_filterValues.IMEI
        filterReport.KHNAME = tbl_search_ct_phieu_filterValues.KHNAME
        filterReport.MHCODE = tbl_search_ct_phieu_filterValues.MHCODE
        filterReport.lydo = tbl_search_ct_phieu_filterValues.lydo
        filterReport.diengiai = tbl_search_ct_phieu_filterValues.diengiai

        filterReport.export = 1;
        var link = `/PhieuNhapKho/LoadDanhSachPhieu?draw=` + filterReport.draw + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&status=` + filterReport.status + `&search=` + filterReport.search + `&from=` + filterReport.from + `&to` + filterReport.to + `&export=` + filterReport.export + `&MHDCODE=` + filterReport.MHDCODE + `&KHCODE=` + filterReport.KHCODE + `&IMEI=` + filterReport.IMEI + `&KHNAME=` + filterReport.KHNAME + `&MHCODE=` + filterReport.MHCODE + `&lydo=` + filterReport.lydo + `&MHID=` + filterReport.MHID + `&diengiai=` + filterReport.diengiai + ``

        window.open(link)

    })

    // click row trong bảng tìm phiếu
    $('#table-search-nhap-kho tbody').on('click', 'tr', function () {
        tbl_ct_search.row($(this).index()).select();
        $('#table-search-nhap-kho tbody tr').not(this).removeClass('selected');

    })

    // dblclick row trong bảng tìm phiếu => show all chi tiết
    $('#table-search-nhap-kho tbody').on('dblclick', 'tr', function () {

        var data = tbl_ct_search.row($(this).index()).data();
        console.log(data)
        if (dataMuaDon.MHDID != null || dataMuaDon.MHDID != undefined) {

        }
        if (dataMuaDon.MHDID != data.MHDID) {
            $('select[name="kh-code"]').val(data.KHCODE).trigger('change');
            $('select[name="kh-ten"]').val(data.KHCODE).trigger('change');
            $('input[name="kh-maso-thue"]').val(data.MASOTHUE)
            $('input[name="kh-daidien"]').val(data.NGUOIDAIDIEN)
            $('input[name="kh-dienthoai"]').val(data.DIENTHOAI)
            $('input[name="kh-diachi"]').val(data.DIACHI)
            $('select[name="lydo"]').val(data.LDNID).trigger('change');

            $('select[name="nv-code"]').val(data.NVCODE).trigger('change');
            $('select[name="nv-ten"]').val(data.NVCODE).trigger('change');

            $('input[name="so-phieu"]').val(data.MHDCODE)
            $('input[name="so-hoadon"]').val(data.MDCODE)

            $('#ghi-chu').val(data.DIENGIAI)
            var datetr = moment(data.NGAYHD).format('DD/MM/YYYY')
            // lấy dữ liệu để update
            dataMuaDon.MHDID = data.MHDID
            dataMuaDon.MHDCODE = data.MHDCODE
            dataMuaDon.MDCODE = data.MDCODE
            //...
            $('input[name="ngay-hd"]').val(datetr)

            //load chi tiết data
            MuaCTHoaDon(1, data.MHDID)
        }
        changeToinput(false)
        $('#tim-phieu-nhap-kho').modal('toggle')

    })

    function MuaCTHoaDon(number, id) {
        // 0: data trả về rỗng
        // > 0: data trả về bình thường <=> statusManager = 0 (bình thường);

        loadData_phieunhapkho(number, id).then((e) => {
            var statusRead = false
            ClearModal()
            if (e.data.length > 0) {
                dataTemp = e.data
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
                    changeToinput(undefined)
                }

                /*  for (var x in KhoList) {
                      var item = KhoList[x]
                      var a = dataTemp.filter(x => x.KHOID != item.KHOID) 
                      if (a.length > 0) { 
                          b++; 
                      } 
                  }
                  if (b > 0) {
                      changeToinput(undefined)
                  }*/

            } else {
                dataTemp = []
            }
            tbl_ctphieu.rows.add(dataTemp);
            //tbl_ctphieu.columns().search('');
            tbl_ctphieu.columns.adjust().draw();
            dataMuaDon.MHDID = id;
        })
    }


    function MuaHoadDonDetail(MHDID) {
        return $.ajax({
            type: 'GET',
            url: '/PhieuNhapKho/LoadMuaHoaDonDetail',
            data: { MHDID: MHDID },
            success: function (res) {
                console.log(res)
                if (res.data.length > 0) {
                    var data = res.data[0]

                    $('select[name="kh-code"]').val(data.KHCODE).trigger('change');
                    $('select[name="kh-ten"]').val(data.KHCODE).trigger('change');
                    $('input[name="kh-maso-thue"]').val(data.MASOTHUE)
                    $('input[name="kh-daidien"]').val(data.NGUOIDAIDIEN)
                    $('input[name="kh-dienthoai"]').val(data.DIENTHOAI)
                    $('input[name="kh-diachi"]').val(data.DIACHI)
                    $('select[name="lydo"]').val(data.LDNID).trigger('change');

                    $('select[name="nv-code"]').val(data.NVCODE).trigger('change');
                    $('select[name="nv-ten"]').val(data.NVCODE).trigger('change');

                    $('input[name="so-phieu"]').val(data.MHDCODE)
                    $('input[name="so-hoadon"]').val(data.MDCODE)
                    console.log(data.DIENGIAI);
                    console.log(data);
                    $('#ghi-chu').val(data.DIENGIAI)

                    var datetr = moment(data.NGAYHD).format('DD/MM/YYYY')

                    // lấy dữ liệu để update
                    dataMuaDon.MHDID = data.MHDID
                    dataMuaDon.MHDCODE = data.MHDCODE
                    dataMuaDon.MDCODE = data.MDCODE
                    //...
                    $('input[name="ngay-hd"]').val(datetr)

                    //load chi tiết data
                    MuaCTHoaDon(1, data.MHDID)
                }
            }
        })
    }
    function ClearModal() {
        var select = $('#tim-phieu-nhap-kho select[name="lydos"]').find('option:eq(0)').val()
        //$('#tim-phieu-nhap-kho select[name="lydos"]').val('70b7c4e7-2ada-471b-b628-40f423e49e29').trigger('change');
        $('#tim-phieu-nhap-kho select[name="lydos"]').val('').trigger('change');



        dataDelete = []
        dataTemp = []
        dataInsert = {}
        dataDelete = []
        dataChange = []

        statusSua = false
        //statusLoadupdate = false

        tienhang = 0;
        tongthue = 0;
        tongchietkhau = 0;
        tongtien = 0;
        dataMuaDon = {};
        tbl_ctphieu.clear()
    }

    //#endregion

    // -------------------------------------
    //#endregion 





    //#region View Chính thức

    //#region Load data chi tiết bằng nút chuyển nhập kho view: Đơn Mua Hàng
    var a = $('.wrapper').attr('data-id')
    var status = $('.wrapper').attr('data-status')
    var phienKiemHangID = $('.wrapper').attr('data-phienkiemhangid')
    InsertByMuaHang(a, status)
    async function InsertByMuaHang(dataid, status) {
        await getallSync(1)
        if (status == 5) { // Load phiếu nhập kho đã tồn tại

            MuaHoadDonDetail(dataid)
            changeToinput(false)

        } else if (status == 4) { // Load data thêm mới phiếu bằng open tab từ Muahang / BanHang
            await loadMuadonCT_off(dataid);
            $.ajax({
                method: 'GET',
                url: '/PhieuNhapKho/CheckMHDCode',
                success: function (res) {
                    $('input[name="so-phieu"]').val(res.mdcode)
                },
            });
        }
        else {  // Load mặc định kèm thông tin user đăng nhập

            var nvcode = $('.wrapper').attr('data-user-code')
            if (nvcode.length > 0) {
                $('select[name="nv-code"]').val(nvcode).trigger('change').prop("disabled", true);
                $('select[name="nv-ten"]').val(nvcode).trigger('change').prop("disabled", true);
                $('#button-danh-sach-nv').attr('data-target', ' ');
            }
            else {
                $('select[name="nv-code"]').val(nvcode).trigger('change');
                $('select[name="nv-ten"]').val(nvcode).trigger('change');
            }
            $.ajax({
                method: 'GET',
                url: '/PhieuNhapKho/CheckMHDCode',
                success: function (res) {
                    $('input[name="so-phieu"]').val(res.mdcode)
                },
            });
            if (phienKiemHangID != '' && phienKiemHangID != null) {
                ChiTietPhieuKiemHang(phienKiemHangID);
            }
        }
    }

    function loadMuadonCT_off(MDID) {
        let dataMuadon = {};
        var r1 = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaDonDetail',
            data: { muadonID: MDID },
            success: function (res) {
                dataMuadon.chitiet = res.data
                if (res.data.length > 0) {
                    dataMuaDon = res.data
                    var data = res.data[0]
                    //

                    $('select[name="kh-code"]').val(data.KHCODE).trigger('change');
                    $('select[name="kh-ten"]').val(data.KHCODE).trigger('change');
                    $('input[name="kh-maso-thue"]').val(data.MASOTHUE)
                    $('input[name="kh-daidien"]').val(data.NGUOIDAIDIEN)
                    $('input[name="kh-dienthoai"]').val(data.DIENTHOAI)
                    $('input[name="kh-diachi"]').val(data.DIACHI)

                    var lydoid = data.LDNID;
                    $('.nhapkho select[name="lydo"]').val(lydoid).trigger('change');

                    $('select[name="nv-code"]').val(data.NVCODE).trigger('change');
                    $('select[name="nv-ten"]').val(data.NVCODE).trigger('change');
                    $('input[name="so-hoadon"]').val(data.MDCODE)

                    $('#ghi-chu').val(data.DIENGIAI)
                    //

                    var datetr = moment(new Date()).format('DD/MM/YYYY')
                    //...
                    $('input[name="ngay-hd"]').val(datetr)

                    //chuyển đổi các cột để xem hoặc edit
                    changeToinput(true)
                }
            }
        })
        var r2 = $.ajax({
            type: 'GET',
            url: '/MuaHang/LoadMuaCTDonChuyenCoViTri',
            data: { muadonID: MDID },
            success: function (res) {
                dataMuadon.list_chitiet = res.data
                if (res.data.length > 0) {
                    var s = res.data;
                    for (var i = 0; i < s.length; i++) {
                        f = s[i]
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
                            ViTri: f.ViTri,
                            MHTID: f.MHTID,
                            LINKIMAGE: f.LINKIMAGE
                        }
                        dataTemp.push(obj)
                    }

                    $('select[name="khos"]').val(res.data[0].KHOID)
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();

                }
            }
        })
        return $.when(r1, r2)
    }

    //#endregion

    function ChiTietPhieuKiemHang(phienKiemHangID) {
        $.ajax({
            type: "POST",
            url: "/PhieuNhapKho/ChiTietPhienKiemHang",
            data: '{phienKiemHangID: "' + phienKiemHangID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    console.log(msg);
                    dataTemp = msg.data;
                    console.log(dataTemp)
                    tbl_ctphieu.clear()
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();
                    $('#bhhd-ban').modal('hide');
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
            }
        })
    }


    // -------------------------------------

    //#region table search mặt hàng
    let filterObj = {}
    filterObj.statusDraw = 0
    var a = 0;
    var tbl_searchMatHang = $('#tbl_searchMatHang').DataTable({
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
                    $('#tbl_searchMatHang tbody tr').eq(0).addClass('selected');
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
                "className": "text-left short-text",
                "data": "MHTEN",
            },
            {
                "targets": 3,
                "className": "text-left xsssshort-text",
                "data": "MHALIAS",
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "MHMOTA",
            }
            //},
            //{
            //    "targets": 2,
            //    "className": "text-left short-text",
            //    "data": "MHTEN",
            //    "render": function (data) {
            //        return `<span class="shorter-text" style="width: 150px" title="` + data + `">` + data + `</span>`
            //    }
            //},
            //{
            //    "targets": 3,
            //    "className": "text-left xsssshort-text",
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
            displayBuffer: 30
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

    //--------------
    //function filterGlobal() {
    //    var search = $('input[name="search-mathang"]').val()
    //    var datasearch = tbl_searchMatHang.search()

    //    tbl_searchMatHang.search(search).draw();

    //}
    $("#global_filter").on('keyup click', delay(function (e) {
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
        var search = $('input[name="search-mathang"]').val()
        var datasearch = tbl_searchMatHang.search()
        if (filterObj.draw < 2 || filterObj.statusDraw < 1) {
            searchMatHang_timeout()
        }
        else if (search != datasearch) {
            tbl_searchMatHang.search(search).draw();
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
    // click chọn vào table
    var dataIdSearch = null
    $('#tbl_searchMatHang  tbody').on('click', 'tr', function () {
        //var data = tbl_searchMatHang.row($(this).index()).data();
        //if (data != null && data != undefined) {

        //    dataIdSearch = data.MHID
        //    tbl_searchMatHang.row($(this).index()).select()
        //    $('#tbl_searchMatHang tbody tr').not(this).removeClass('selected');
        //}
        $(this).addClass('selected');
        $('#tbl_searchMatHang tbody tr').not(this).removeClass('selected');
    })
    // -------------------------------------
    // chọn sản phẩm bằng dblclick
    $('#tbl_searchMatHang  tbody').on('dblclick', 'tr', function () {

        tbl_searchMatHang.row($(this).index()).select();
        $('#tbl_searchMatHang tbody tr').not(this).removeClass('selected');
        var dataId = $(this).attr('data-id');
        var khoid = $('select[name="khos"]').val()
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
        }
        load_mathang_byId_fnc(dataId, khoid)
        $(".table-search").hide()
    });
    // -------------------------------------
    // chọn sản phẩm và thoát

    $('#btn-choose-search-mathang').on('click', function () {
        let idmh = $('#tbl_searchMatHang tbody tr.selected').attr('data-id');
        var khoid = $('select[name="khos"]').val()
        if (idmh != null && idmh != undefined) {
            let search = $("#global_filter").val();
            if (search != '') {
                $("#global_filter").val('');
            }
            load_mathang_byId_fnc(idmh, khoid).then(() => {
                $(".table-search").hide()
            })
        } else {
            $(".table-search").hide()
        }
    });
    // -------------------------------------
    // chọn sản phẩm bằng button 

    $('#btn-choose-search-mathang-not-close').on('click', function () {
        let idmh = $('#tbl_searchMatHang tbody tr.selected').attr('data-id');
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
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
        }
    })
    //// -------------------------------------
    //$(document).keypress(function (e) {
    //    let checkSearch = $(".table-search").is(":hidden");
    //    let checkSearch2 = $("#tim-phieu-nhap-kho").is(":hidden");
    //    if (!checkSearch) {
    //        if (e.which == 13) {
    //            var khoid = $('select[name="khos"]').val()
    //            let idmh = $('#tbl_searchMatHang tbody').find('.selected').attr('data-id')
    //            load_mathang_byId_fnc(idmh, khoid).then(() => {
    //                $(".table-search").hide()
    //            })
    //        }
    //    }
    //    else if (!checkSearch2) {
    //        if (e.which == 13) {
    //            tbl_ct_search_timout();
    //        }
    //    }
    //})

    $(document).keydown(async function (e) {
        let checkSearch = $(".table-search").is(":hidden");
        let checkSearch2 = $("#tim-phieu-nhap-kho").is(":hidden");
        if (!checkSearch) {
            if (e.which == 13) {
                var khoid = $('select[name="khos"]').val()
                let idmh = $('#tbl_searchMatHang tbody').find('.selected').attr('data-id')
                let search = $("#global_filter").val();
                if (search != '') {
                    $("#global_filter").val('');
                }
                load_mathang_byId_fnc(idmh, khoid).then(() => {
                    $(".table-search").hide()
                })
            }
        }
        else if (!checkSearch2) {
            if (e.which == 13) {
                tbl_ct_search_timout();
            }
        }
        else if (e.which == 113) {
            e.preventDefault();
            $('select[name="kh-ten"]').get(0).scrollIntoView();
            $('select[name="kh-ten"]').select2('open');
        }
        else if (e.which == 114) {
            e.preventDefault();
            var elmnt = document.getElementById("btn-them-nhapkho");
            elmnt.scrollIntoView();
            $("#global_filter").click();
            $("#global_filter").focus();
            //if (filterObj.draw < 2 || filterObj.statusDraw < 1) {
            //    searchMatHang_timeout()
            //}
            //$(".table-search").show();
        }
        else if (e.which == 115) {
            e.preventDefault();
            $('#ghi-chu').focus();
            $('#ghi-chu').get(0).scrollIntoView();
        }
        else if (e.which == 117) {
            e.preventDefault();
            $('#btn-print-nhapkho').click();
        }
        else if (e.which == 118) {
            e.preventDefault();
            $('#btn-ghi-nhapkho').click();
        }
        else if (e.which == 120) {
            e.preventDefault();
            $('#tim-phieu-nhap-kho').modal();
        }
        else if (e.which == 121) {
            e.preventDefault();
            $('#btn-them-nhapkho').click();
        }
    })
    //$(document).keypress(function (e) {
    //    let checkSelect = $('#tbl_searchMatHang tbody').find('.selected').attr('data-id')
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
    // -------------------------------------

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
                    statusManager: 1,
                    ViTri: e.data[0].ViTri,
                    MHTID: e.data[0].MHTID,
                    LINKIMAGE: e.data[0].LINKIMAGE
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
                            if (dataTemp[i].statusManager == 0) {
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
    //#endregion 

    // -------------------------------------


    //#region Loading

    //#enregion 
    //#region table chi tiết phiếu
    let dataTemp = new Array()
    let dataInsert = {}
    let dataDelete = new Array()
    let dataChange = new Array()

    let statusSua = false

    let tienhang = 0;
    let tongthue = 0;
    let tongchietkhau = 0;
    let tongtien = 0;

    let dataMuaDon = {};


    var tbl_ctphieu = $('#tbl_ctphieu').DataTable({
        data: dataTemp,
        //orderCellsTop: true,
        bInfo: false,
        columns: [
            {
                "targets": 0,
                "className": "",
                "data": null,
                "width": "4%"

            },

            {
                "targets": 1,
                "className": "text-left",
                "data": "ViTri",
                "width": "5%"
            },
            {
                "targets": 2,
                "width": "9%",
                "className": "text-left",
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
                "data": "MHTEN",
                "width": "22%",
                "createdCell": function (td) {
                    $(td).attr('title', $(td).find('span').html())
                },
                "render": function (data, type, full, meta) {

                    return '<span class="shorter-text">' + data + '</span>';
                }
            },
            {
                "targets": 4,
                "className": "text-left",
                "data": "KHOCODE",
                "width": "5%",

            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "KHOID",
                "width": "5%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-kho')
                },
                "render": function (data, type, full, meta) {
                    var x = document.createElement("SELECT");

                    //x.className = '';  
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
                "targets": 6,
                "className": "text-right",
                "data": "SOLUONG",
                "width": "5%",
            },
            {
                "targets": 7,
                "className": "",
                "data": "SOLUONG",
                "width": "5%",
                type: "string",
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="soluong" type="text" value="' + data + '"data-type="number"/>';
                }

            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "DONVI",
                "width": "5%",
            },
            {
                "targets": 9,
                "className": "text-right",
                "data": "SoLuongTon",
                "width": "5%",
                "render": function (data, type, full, meta) {
                    return data == null ? '<a  type="button"   data-toggle="modal" data-target="#danh-sach-tonkho"  href="#">' + 0 + '</a>' : '<a  type="button"   data-toggle="modal" data-target="#danh-sach-tonkho"  href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>'
                }
            },
            {
                "targets": 10,
                "className": "text-right",
                "data": "DONGIA",
                "width": "10%",
                "render": function (data, type, full, meta) {

                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

                }
            },
            {
                "targets": 11,
                "className": "text-right",
                "data": "DONGIA",
                "width": "10%",
                type: "string",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-dongia')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="dongia" type="text" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
                }
            },
            {
                "targets": 12,
                "className": "text-right",
                "data": "TILETHUE",
                "visible": false,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thue')
                },
            },
            {
                "targets": 13,
                "className": "text-right",
                "data": "TILETHUE",
                "visible": false,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thue')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="tile-thue" value="' + data + '" data-type="percent"/>';
                }
            },
            {
                "targets": 14,
                "className": "text-right",
                "data": "TILECHIETKHAU",
                "visible": false,
                "render": function (data, type, full, meta) {

                    return data.toFixed(2)
                }

            },
            {
                "targets": 15,
                "className": "text-right",
                "data": "TILECHIETKHAU",
                "visible": false,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ck')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="tile-chietkhau" type="text" value="' + data.toFixed(2) + '"data-type="percent"/>';
                }
            },
            {
                "targets": 16,
                "className": "text-right",
                "data": "CHIETKHAU",
                "visible": false,
                "render": function (data, type, full, meta) {

                    return Math.round(data)
                }
            },
            {
                "targets": 17,
                "className": "text-right",
                "data": "CHIETKHAU",
                "visible": false,
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ck-chuyentien')
                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="chietkhau" type="text" value="' + Math.round(data) + '"data-type="currency"/>';
                }
            },
            {
                "targets": 18,
                "className": "text-right",
                "data": "THANHTIEN",
                "width": "13%",
                "render": function (data, type, full, meta) {

                    return Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                "targets": 19,
                "className": "text-right",
                "data": "THANHTIEN",
                "width": "13%",
                type: "string",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-thanhtien')

                },
                "render": function (data, type, full, meta) {

                    return '<input class="input-align" name="thanhtien" type="text"  readonly value="' + Math.round(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency"/>';
                }
            },
            {
                "targets": 20,
                "className": "text-right",
                "data": "GHICHU",
                "width": "14%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ghichu')
                },
            },
            {
                "targets": 21,
                "className": "text-right",
                "data": "GHICHU",
                "width": "14%",
                type: "string",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-ghichu')
                },
                "render": function (data, type, full, meta) {
                    return '<input class="input-align" name="ghichu" type="text" value="' + data + '"/>';
                }
            },
            {
                "targets": 22,
                "className": "text-center",
                "data": null,
                "width": "3%",
                "createdCell": function (td) {
                    $(td).attr('data-column', 'col-btn')
                },
                "defaultContent": '<a type="button" class="btn btn-danger text-white">Xóa</a>'
            },

        ],
        columnDefs: [
            {
                "targets": 0,
                "orderable": false,
            },
            {
                "targets": 4,
                "visible": true,
                "bSortable": true
            },
            {
                "targets": 5,
                "visible": false,
                "bSortable": true
            },
            //số lượng
            {
                "targets": 6,
                "visible": true,
                "bSortable": true
            },
            {
                "targets": 7,
                "visible": false,
                "bSortable": true
            },
            //đơn giá
            {
                "targets": 10,
                "visible": true,
                "bSortable": true
            },
            {
                "targets": 11,
                "visible": false,
                "bSortable": true
            },
            //tỉ lệ thuế
            {
                "targets": 12,
                "visible": false,
                "bSortable": true
            },
            {
                "targets": 13,
                "visible": false,
                "bSortable": true
            },
            //tỉ lệ chiếu khấu
            {
                "targets": 14,
                "visible": false,
                "bSortable": true
            },
            {
                "targets": 15,
                "visible": false,
                "bSortable": true
            },
            //chiết khấu
            {
                "targets": 16,
                "visible": false,
                "bSortable": true
            },
            {
                "targets": 17,
                "visible": false,
                "bSortable": true
            },
            //thành tiền
            {
                "targets": 18,
                "visible": true,
                "bSortable": true
            },
            {
                "targets": 19,
                "visible": false,
                "bSortable": true
            },
            //ghi chú
            {
                "targets": 20,
                "visible": true
            },
            {
                "targets": 21,
                "visible": false
            },
            // 
            {
                "targets": 22,
                "visible": false
            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {

            $(nRow).find('td:eq(0)').text(iDataIndex + 1);
            $(nRow).attr('data-id', data.MHID);


            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };


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
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: "true",
        paging: true,
        pageLength: 5,
        scroller: true,
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
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            thanhtien = api
                .column(18)
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

            $(api.column(2).footer()).html(data.length == 0 ? '' : data.length).addClass('text-right font-weight-bold');

            /*  $(api.column(3).footer()).html(sl).addClass('text-right');
              $(api.column(4).footer()).html(sl).addClass('text-right');*/

            $(api.column(6).footer()).html(sl == 0 ? '' : sl).addClass('text-right font-weight-bold');
            $(api.column(7).footer()).html(sl == 0 ? '' : sl).addClass('text-right font-weight-bold');


            $(api.column(18).footer()).html(thanhtien == 0 ? '' : Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            $(api.column(19).footer()).html(thanhtien == 0 ? '' : Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');

        },
        initComplete: function () {
            $(".table-content").css("display", '')
        }

    })

    changeToinput(true)

    // click vào row bảng chi tiết phiếu
    var index = 0;
    $('#tbl_ctphieu tbody').on('click', 'tr', function () {
        var index = $(this).index()
        tbl_ctphieu.row(index).select()
        $('#tbl_ctphieu tbody tr').not(this).removeClass('selected')

    })

    //#region table tồn kho
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

    // Thay đổi dữ liệu trong bảng chi tiết phiếu
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
        console.log(obj)
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

            if (dataTemp[i].statusManager == 0) {
                dataTemp[i].statusManager = 2
            }


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
    // ---- 

    function ChangKhoinTable() {
        var khoid = document.createElement('input')
        khoid.setAttribute('hidden')
        khoid.id = 'khoids'
        var khoccode = document.createElement('input')
        khoccode.setAttribute('hidden')
        khoccode.id = 'khoccodes'
        GetSoluongTon(list, khoid).then((res) => {

            khoid.value = res.data[0].KHOID
            khoccode.value = res.data[0].KHOCODE
            document.body.appendChild({ khoid, khoccode });
        })
        return undefined
    }

    //#endregion

    // -------------------------------------

    // Checkbox show column Chiết khấu bằng tiền hoặc %
    $(document).on('click', 'input[name="ck-checked"]', function () {


        if (statusSua == true) {
            tbl_ctphieu.columns(13).visible(false)
            tbl_ctphieu.columns(15).visible(false)
            if (this.checked) {
                statusChecked_input = true
                tbl_ctphieu.columns(14).visible(false)
                tbl_ctphieu.columns(16).visible(true)

            } else {
                statusChecked_input = false
                tbl_ctphieu.columns(14).visible(true)
                tbl_ctphieu.columns(16).visible(false)
            }
        } else {

            tbl_ctphieu.columns(14).visible(false)
            tbl_ctphieu.columns(16).visible(false)
            if (this.checked) {
                statusChecked_input = true
                tbl_ctphieu.columns(13).visible(false)
                tbl_ctphieu.columns(15).visible(true)

            } else {
                statusChecked_input = false
                tbl_ctphieu.columns(13).visible(true)
                tbl_ctphieu.columns(15).visible(false)
            }
        }
    })

    // -------------------------------------
    // Update dữ liệu chi tiết theo kho mới => table chi tiết tự update data

    $('select[name="khos"]').on('change', function () {
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


    // -------------------------------------
    // nút delete trong bản chi tiết phiếu
    $('#tbl_ctphieu tbody').on('click', 'td', function () {
        var index = $(this).index()
        console.log(index)
        var data = tbl_ctphieu.row($(this).parents('tr')).data();
        if (index == 11) {
            if (data.statusManager == 0 || data.statusManager == 2) {
                var target = 0
                var r = confirm('Có muốn xóa không?')
                if (r) {
                    var a = dataTemp.filter(x => x.MHID == data.MHID);

                    if (a.length > 0) {
                        if (a[0].MCTHDID != null) {
                            dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1);
                            var obj = {
                                MCTHDID: a[0].MCTHDID
                            }
                            dataDelete.push(obj);

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
                    console.log(dataDelete)
                    tbl_ctphieu.clear().columns.adjust().draw();
                    tbl_ctphieu.rows.add(dataTemp);
                    tbl_ctphieu.columns.adjust().draw();

                }
                //$.ajax({
                //    type: 'GET',
                //    url: '/PhieuNhapKho/CheckdeleteCTPhieu'
                //}).done(function (res) {
                //    if (res.status === 1 || res.Status === 1) {
                //        var target = 0
                //        var r = confirm('Có muốn xóa không?')
                //        if (r) {
                //            var a = dataTemp.filter(x => x.MHID == data.MHID);

                //            if (a.length > 0) {
                //                if (a[0].MCTHDID != null) {
                //                    dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1);
                //                    var obj = {
                //                        MCTHDID: a[0].MCTHDID
                //                    }
                //                    dataDelete.push(obj);

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
                //            console.log(dataDelete)
                //            tbl_ctphieu.clear().columns.adjust().draw();
                //            tbl_ctphieu.rows.add(dataTemp);
                //            tbl_ctphieu.columns.adjust().draw();

                //        }
                //    } else {
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
                dataTemp.splice(dataTemp.findIndex(x => x.MHID == data.MHID), 1)
                tbl_ctphieu.clear();
                tbl_ctphieu.rows.add(dataTemp);
                tbl_ctphieu.columns.adjust().draw();
            }

        } else if (index == 6) {
            console.log('ádjkakudgasudghasoud')
            console.log(data.MHID)
            filterObj_tonkho.MHID = data.MHID
        }


    })
    // -------------------------------------


    //#endregion
    // -------------------------------------

    //#region Ajax Load


    function getallSync(statusGetAll) {
        if (statusGetAll > 0) {
            let dataGetAll = {};
            var xhr1 = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadLydo',
                data: { LDT_ID: 'N' },
                success: function (res) {
                    statusGetAll.lydo = res.data
                    res.data.map((value) => {
                    $('select[name="lydo"]').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                            $('#tim-phieu-nhap-kho select[name="lydos"]').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                        //if (value.CODE === 'NNCC') {
                        //    $('select[name="lydo"]').append(`<option selected value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                        //    $('#tim-phieu-nhap-kho select[name="lydos"]').append(`<option selected value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)

                        //} else {
                        //    $('select[name="lydo"]').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)
                        //    $('#tim-phieu-nhap-kho select[name="lydos"]').append(`<option value="` + value.LDNID + `">` + value.CODE + ` | ` + value.TEN + `</option>`)

                        //}

                    })
                }
            });
            var xhr2 = $.ajax({
                method: 'GET',
                url: '/PhieuNhapKho/CheckMHDCode',
                success: function (res) {
                    statusGetAll.checkcode = res.data
                    if (res.data != undefined) {
                        Sophieu = res.data
                        $('input[name="so-phieu"]').val(Sophieu)
                    }
                },
            });
            var xhr3 = $.ajax({
                type: 'GET',
                url: '/MuaHang/LoadKho',
                success: function (res) {

                    statusGetAll.Kho = res.data
                    res.data.map((value) => {
                        KhoList.push({ KHOID: value.KHID, KHOCODE: value.KHCODE })
                        $('select[name="khos"]').append(`<option value="` + value.KHID + `">` + value.KHCODE + `</option>`)
                    })

                }
            });

            $('#tim-phieu-nhap-kho input[name="from"]').val(moment(new Date()).format('DD/MM/yyyy'))
            $('#tim-phieu-nhap-kho input[name="to"]').val(moment(new Date()).format('DD/MM/yyyy'))

            $('#tim-phieu-nhap-kho input[name="checkbox-disable"]').attr('checked', 'checked')
            $('input[name="ck-checked"]').attr('checked', 'checked')

            var datetr = moment(new Date()).format('DD/MM/YYYY')
            $('input[name="ngay-hd"]').val(datetr).prop('disabled', true);

            statusChecked_input = true


            return $.when(xhr1, xhr2, xhr3)

        } else {
            return null
        }


    }

    async function loadData_phieunhapkho(status, MHDID) {
        //status: tránh load data lần đầu tiên
        //MHID: truyền id để lấy dữ liệu
        if (status > 0) {
            return $.ajax({
                type: 'GET',
                url: '/PhieuNhapKho/LoadMuaCTHoaDon',
                data: { MHDID: MHDID },
                success: function (res) {
                    return res.data
                }
            })
        }
        return []
    }

    async function LoadDataNvVAKh() {
        var xhr = $.ajax({
            async: true,
            type: 'GET',
            url: '/BanHang/LoadDataNvVANCC',
            success: function (res) {
                console.log(res);
                return res;
            }
        });

        return xhr
    }
    //#endregion

    // -------------------------------------

    //#region Action

    //Nút thêm mới

    $('#btn-them-nhapkho').on('click', function () {
        clearToInsert()
        $('#btn-ghi-nhapkho').removeClass('disabled-nhap-kho')
    })


    //Nút Sửa
    $('#btn-sua-nhapkho').on('click', function () {
        //$('#tbl_ctphieu thead tr th').find('input').each(function (index, b) {
        //    console.log($('#txt-header-' + index + '').val())
        //});
        tbl_ctphieu.search('').columns().search('').draw();
        changeToinput(true)
        $('#btn-ghi-nhapkho').removeClass('disabled-nhap-kho')
        // $('#btn-xuat-nhapkho').removeClass('disabled-nhap-kho')

    })
    //Nút Nạp
    $('#btn-nap-nhapkho').on('click', function () {
        clearToInsert()
        changeToinput(false)
    })

    //function clear data để insert
    function clearToInsert() {
        ClearModal()
        tbl_ctphieu.clear().columns.adjust().draw();
        dataTemp.splice(0, dataTemp.length)
        tbl_ctphieu.rows.add(dataTemp);
        tbl_ctphieu.columns.adjust().draw();
        $('select[name="kh-code"]').val('').trigger('change');
        $('#ghi-chu').val('')
        $('select[name="kh-ten"]').val('').trigger('change');
        $('input[name="kh-maso-thue"]').val('')
        $('input[name="kh-daidien"]').val('')
        $('input[name="kh-dienthoai"]').val('')
        $('input[name="kh-diachi"]').val('')
        $('select[name="lydo"]').val('70b7c4e7-2ada-471b-b628-40f423e49e29').trigger('change');

        var nvcode = $('.wrapper').attr('data-user-code')
        $.ajax({
            method: 'GET',
            url: '/PhieuNhapKho/CheckMHDCode',
            success: function (res) {
                $('input[name="so-phieu"]').val(res.mdcode)
            },
        });
        if (nvcode.length > 0) {
            $('select[name="nv-code"]').val(nvcode).trigger('change').prop("disabled", true);
            $('select[name="nv-ten"]').val(nvcode).trigger('change').prop("disabled", true);
            $('#button-danh-sach-nv').attr('data-target', ' ');
        }
        else {
            $('select[name="nv-code"]').val(nvcode).trigger('change');
            $('select[name="nv-ten"]').val(nvcode).trigger('change');
        }

        //$('input[name="so-phieu"]').val(Sophieu)
        $('input[name="so-hoadon"]').val('')
        var datetr = moment(new Date()).format('DD/MM/YYYY')
        $('input[name="ngay-hd"]').val(datetr)


        changeToinput(true)
        //clear modal import
        Old_dataExcelNK = []
        New_dataExcelNK = []
        tbl_mahthang_new.clear()
        tbl_mahthang_new.rows.add(New_dataExcelNK)
        tbl_mahthang_old.clear()
        tbl_mahthang_old.rows.add(Old_dataExcelNK)

        imporTable_setTimeOut()

    }
    // function ẩn / hiện cột bảng chi tiết phiếu
    function changeToinput(status) { // true là   sửa dữ liệu || false là không được sửa dữ liệu || undefined...// trường hợp  nếu như khocode của 1 trong các mặt hàng chi tiết không nằm trong  select kho dã phân quyền của user => user hk được sửa phiếu 
        console.log('varo');
        if (status == true) {

            console.log('vao true');
            statusSua = true
            //  $(".nhapkho :input").removeAttr("disabled");

            $('.nhapkho ').removeClass('disabled-nhap-kho')

            $('.row-last').removeClass('disabled-nhap-kho')
            $('#btn-sua-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-delete-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-xuat-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-print-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-them-nhapkho').removeClass('disabled-nhap-kho')

            if (dataTemp.length === 0) {
                $('#btn-nhap-nhapkho').removeClass('disabled-nhap-kho')
            }

            tbl_ctphieu.columns(4).visible(false)
            tbl_ctphieu.columns(5).visible(true)
            //
            tbl_ctphieu.columns(6).visible(false)
            tbl_ctphieu.columns(7).visible(true)
            //đơn giá
            tbl_ctphieu.columns(10).visible(false)
            tbl_ctphieu.columns(11).visible(true)

            ////tỉ lệ thuế
            //tbl_ctphieu.columns(11).visible(false)
            //tbl_ctphieu.columns(12).visible(true)
            ////tỉ lệ chiết khấu
            //tbl_ctphieu.columns(13).visible(false)
            //// tbl_ctphieu.columns(14).visible(true)

            ////  chiết khấu
            //tbl_ctphieu.columns(15).visible(false)
            ////tbl_ctphieu.columns(16).visible(false)

            //if (statusChecked_input) {
            //    tbl_ctphieu.columns(14).visible(false)
            //    tbl_ctphieu.columns(16).visible(true)
            //} else {
            //    tbl_ctphieu.columns(14).visible(true)
            //    tbl_ctphieu.columns(16).visible(false)
            //}
            //thành tiền
            tbl_ctphieu.columns(18).visible(false)
            tbl_ctphieu.columns(19).visible(true)
            //ghi chú
            tbl_ctphieu.columns(20).visible(false)
            tbl_ctphieu.columns(21).visible(true)
            // xóa
            tbl_ctphieu.columns(22).visible(true)
        } else if (status == false) {
            statusSua = false
            //$(".nhapkho :input").attr("disabled", true);
            $('.nhapkho ').addClass('disabled-nhap-kho')

            $('.row-last').addClass('disabled-nhap-kho')
            $('#btn-sua-nhapkho').removeClass('disabled-nhap-kho')
            $('#btn-delete-nhapkho').removeClass('disabled-nhap-kho')
            $('#btn-ghi-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-xuat-nhapkho').removeClass('disabled-nhap-kho')
            $('#btn-print-nhapkho').removeClass('disabled-nhap-kho')
            $('#btn-them-nhapkho').removeClass('disabled-nhap-kho')
            $('#btn-nhap-nhapkho').addClass('disabled-nhap-kho')

            tbl_ctphieu.columns(4).visible(true)
            tbl_ctphieu.columns(5).visible(false)
            //
            tbl_ctphieu.columns(6).visible(true)
            tbl_ctphieu.columns(7).visible(false)
            //đơn giá
            tbl_ctphieu.columns(10).visible(true)
            tbl_ctphieu.columns(11).visible(false)
            ////tỉ lệ thuế
            //tbl_ctphieu.columns(11).visible(true)
            //tbl_ctphieu.columns(12).visible(false)


            ////tỉ lệ chiết khấu

            //tbl_ctphieu.columns(14).visible(false)
            ////  chiết khấu

            //tbl_ctphieu.columns(16).visible(false)

            //if (statusChecked_input) {
            //    tbl_ctphieu.columns(13).visible(false)
            //    tbl_ctphieu.columns(15).visible(true)
            //} else {
            //    tbl_ctphieu.columns(13).visible(true)
            //    tbl_ctphieu.columns(15).visible(false)
            //}

            //thành tiền
            tbl_ctphieu.columns(18).visible(true)
            tbl_ctphieu.columns(19).visible(false)
            //ghi chú
            tbl_ctphieu.columns(20).visible(true)
            tbl_ctphieu.columns(21).visible(false)
            // xóa
            tbl_ctphieu.columns(22).visible(false)
        } else if (status == undefined) {
            statusSua = false
            //$(".nhapkho :input").attr("disabled", true);
            $('.nhapkho ').addClass('disabled-nhap-kho')

            $('.row-last').removeClass('disabled-nhap-kho')
            $('#btn-sua-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-delete-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-ghi-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-xuat-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-print-nhapkho').addClass('disabled-nhap-kho')
            $('#btn-them-nhapkho').removeClass('disabled-nhap-kho')

            tbl_ctphieu.columns(4).visible(true)
            tbl_ctphieu.columns(5).visible(false)
            //
            tbl_ctphieu.columns(6).visible(true)
            tbl_ctphieu.columns(7).visible(false)
            //đơn giá
            tbl_ctphieu.columns(10).visible(true)
            tbl_ctphieu.columns(11).visible(false)
            ////tỉ lệ thuế
            //tbl_ctphieu.columns(11).visible(true)
            //tbl_ctphieu.columns(12).visible(false)


            ////tỉ lệ chiết khấu

            //tbl_ctphieu.columns(14).visible(false)
            ////  chiết khấu

            //tbl_ctphieu.columns(16).visible(false)

            //if (statusChecked_input) {
            //    tbl_ctphieu.columns(13).visible(false)
            //    tbl_ctphieu.columns(15).visible(true)
            //} else {
            //    tbl_ctphieu.columns(13).visible(true)
            //    tbl_ctphieu.columns(15).visible(false)
            //}

            //thành tiền
            tbl_ctphieu.columns(18).visible(true)
            tbl_ctphieu.columns(19).visible(false)
            //ghi chú
            tbl_ctphieu.columns(20).visible(true)
            tbl_ctphieu.columns(21).visible(false)
            // xóa
            tbl_ctphieu.columns(22).visible(false)
        }
    }

    // Nút Ghi
    $('#btn-ghi-nhapkho').on('click', function () {
        if (statusSua) {
            SavePhieu();
        } else {
            toast.create({
                title: 'Notification!',
                text: "Vui lòng chọn nút Thêm hoặc Sửa trước khi Ghi",
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }

    })

    function SavePhieu() {
        let dataSSer = []
        dataTemp.map((e) => {
            if (e.statusManager > 0) {
                var objs = {
                    statusManager: e.statusManager,
                    MCTHDID: e.MCTHDID,
                    MHDID: e.MHDID,
                    MHID: e.MHID,
                    MHTEN: e.MHTEN,
                    DONGIA: e.DONGIA,
                    KHOID: e.KHOID,
                    KHOCODE: e.KHOCODE,
                    SOLUONG: e.SOLUONG,
                    TILETHUE: e.TILETHUE,
                    TILECHIETKHAU: e.TILECHIETKHAU,
                    GHICHU: e.GHICHU,
                    SoLuongTon: e.SoLuongTon
                }
                dataSSer.push(objs)
            }
        })

        var dataUp = new FormData();

        // trường hợp dành cho update / insert
        if (dataMuaDon.MHDID != null || dataMuaDon.MHDID != undefined) {

            dataUp.append('MHDID', dataMuaDon.MHDID == null ? "" : dataMuaDon.MHDID)
            dataUp.append('MDCODE', $('input[name="so-hoadon"]').val() == null ? '' : $('input[name="so-hoadon"]').val())
            dataUp.append('MHDCODE', dataMuaDon.MHDCODE == null ? ($('input[name="so-phieu"]').val() == null ? '' : $('input[name="so-phieu"]').val()) : dataMuaDon.MHDCODE)

            dataUp.append('KHCODE', $('select[name="kh-code"]').val() == null ? '' : $('select[name="kh-code"]').val())

            dataUp.append('NVCODE', $('select[name="nv-code"]').val() == null ? '' : $('select[name="nv-code"]').val())

            dataUp.append('NGAYHD', $('input[name="ngay-hd"]').val() == null ? '' : $('input[name="ngay-hd"]').val())

            dataUp.append('DIEUKHOANTTID', dataMuaDon.DIEUKHOANTTID == null ? "" : dataMuaDon.DIEUKHOANTTID)

            dataUp.append('HTTTID', dataMuaDon.HTTTID == null ? "" : dataMuaDon.HTTTID)

            dataUp.append('STATUS', dataMuaDon.STATUS == null ? "" : dataMuaDon.STATUS) //chưa biết 
            dataUp.append('DIENGIAI', $('#ghi-chu').val())
            dataUp.append('LDNID', $('select[name="lydo"]').val() == null ? '' : $('select[name="lydo"]').val())

            dataUp.append('USERID', dataMuaDon.USERID == null ? "" : dataMuaDon.USERID)

            dataUp.append('dataSSer', JSON.stringify(dataSSer))
            dataUp.append('dataDelete', JSON.stringify(dataDelete))

            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkupdate/'
            }).done(function (res) {
                if (res.status === 1 || res.Status === 1) {

                    $.ajax({
                        type: 'POST',
                        url: '/PhieuNhapKho/Save',
                        data: dataUp,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (ress) {
                            console.log(ress);
                            if (ress.status === 1) {
                                MuaCTHoaDon(1, dataMuaDon.MHDID);
                                changeToinput(false)
                                statusLoadupdate = true;
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
                } else {
                    confirm(res.message)
                }

            })



        }
        else if (dataTemp.length > 0) {
            // insert--data
            dataUp.append('MHDID', dataMuaDon.MHDID == null ? "" : dataMuaDon.MHDID)
            dataUp.append('MDCODE', $('input[name="so-hoadon"]').val() == null ? '' : $('input[name="so-hoadon"]').val())
            dataUp.append('MHDCODE', dataMuaDon.MHDCODE == null ? ($('input[name="so-phieu"]').val() == null ? '' : $('input[name="so-phieu"]').val()) : dataMuaDon.MHDCODE)

            //
            dataUp.append('KHCODE', $('select[name="kh-code"]').val() == null ? '' : $('select[name="kh-code"]').val())


            dataUp.append('NVCODE', $('select[name="nv-code"]').val() == null ? '' : $('select[name="nv-code"]').val())


            dataUp.append('NGAYHD', $('input[name="ngay-hd"]').val() == null ? '' : $('input[name="ngay-hd"]').val())
            // 
            dataUp.append('DIEUKHOANTTID', '')
            dataUp.append('HTTTID', '')
            dataUp.append('STATUS', '')
            dataUp.append('DIENGIAI', $('#ghi-chu').val())

            //

            dataUp.append('LDNID', $('select[name="lydo"]').val() == null ? '' : $('select[name="lydo"]').val())
            //
            dataUp.append('dataSSer', JSON.stringify(dataSSer))
            dataUp.append('dataDelete', JSON.stringify(dataDelete))

            $.ajax({
                type: 'GET',
                url: '/MuaHang/checkinsert/'
            }).done(function (res) {
                if (res.status === 1 || res.Status === 1) {
                    $.ajax({
                        type: 'POST',
                        url: '/PhieuNhapKho/Save',
                        data: dataUp,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (ress) {

                            if (ress.status === 1) {

                                changeToinput(true);
                                clearToInsert();
                                statusLoadupdate = true;
                                // MuaCTHoaDon(1, ress.data[0].MHDID)
                                toast.create({
                                    title: 'Notification!',
                                    text: 'Thành công',
                                    icon: 'check',
                                    classBackground: 'noti-success',
                                    timeout: 3000
                                });
                                if (ress.data.length > 0) {
                                    let InsertMHD = ress.data[0].InsertMHD;
                                    if (InsertMHD != undefined) {
                                        let getOrder = tbl_ctphieu.order();
                                        let Desc = getOrder[0][1];
                                        let NumberOrder = getOrder[0][0];

                                        let data = new FormData();
                                        data.append('BHDID', InsertMHD);
                                        data.append('type', 'nhapkho');

                                        $.ajax({
                                            async: true,
                                            type: 'POST',
                                            url: '/BanHang/InsertXepHang',
                                            data: data,
                                            contentType: false,
                                            processData: false,
                                            success: function (rs) {
                                                if (rs.status == 1) {

                                                    var link = '/PhieuNhapKho/Print?mhdid= ' + InsertMHD + '&desc=' + Desc + '&order=' + NumberOrder;
                                                    window.open(link)


                                                }
                                                else {
                                                    console.log(rs.message);
                                                }
                                            },
                                            error: function (error) {
                                                console.log(error);
                                            }
                                        });

                                        
                                    }
                                }

                            } else if (ress.status === 4) {
                                var r = confirm('Số phiếu bị trùng, vui lòng chọn OK để reset số phiếu để có thể tiếp tục')
                                if (r) {
                                    $.ajax({
                                        method: 'GET',
                                        url: '/PhieuNhapKho/CheckMHDCode',
                                        success: function (res) {
                                            $('input[name="so-phieu"]').val(res.mdcode)
                                            SavePhieu()
                                        },
                                    });
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
                text: 'Bạn phải chọn ít nhất 1 mặt hàng để ghi',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
    }


    //Nút Xóa
    $('#btn-delete-nhapkho').on('click', function () {

        if (dataMuaDon.MHDID == null || dataMuaDon.MHDID == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Không tìm thấy phiếu',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });

        } else {
            var id = dataMuaDon.MHDID
            var data = new FormData();
            data.append('mhdid', id)
            var r = confirm('Bạn xóa muốn không')
            if (r) {
                $.ajax({
                    type: 'GET',
                    url: '/PhieuNhapKho/CheckdeleteMuaHoaDon',

                }).done((res) => {
                    if (res.Status === 1) {
                        $.ajax({
                            type: 'POST',
                            url: '/PhieuNhapKho/DeleteMuaHoaDon',
                            data: data,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function (resss) {
                                if (resss.status === 1) {
                                    changeToinput(false)
                                    console.log(statusLoadupdate)
                                    clearToInsert()
                                    //MuaCTHoaDon(1, null)
                                    statusLoadupdate = true;
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
                                        text: resss.message,
                                        icon: 'error_outline',
                                        classBackground: 'noti-error',
                                        timeout: 3000
                                    });
                                }
                            }
                        })
                    }
                    if (res.status === 2) {
                        toast.create({
                            title: 'Notification!',
                            text: res.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });

                    }
                })
            }

        }

    })


    // Nút Xuất
    $('#btn-xuat-nhapkho').on('click', function () {
        var filterReport = {}


        if (dataMuaDon.MHDID != undefined && dataMuaDon.MHDID != null) {
            var r = confirm("Nhấn OK để xuất dữ liệu sang file Excel")
            if (r) {
                filterReport.MHDID = dataMuaDon.MHDID
                filterReport.export = 1;
                var link = `/PhieuNhapKho/ExportCTPhieu?MHDID=` + filterReport.MHDID + ``
                window.open(link)
            }

        } else {
            toast.create({
                title: 'Notification!',
                text: 'Không tìm thấy phiếu',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }


    })

    // Nút Xuất
    $('#btn-print-nhapkho').on('click', function () {

        if (dataMuaDon.MHDID != undefined && dataMuaDon.MHDID != null) {
            var mhdid = dataMuaDon.MHDID;
            let getOrder = tbl_ctphieu.order();
            let Desc = getOrder[0][1];
            let NumberOrder = getOrder[0][0];
            var link = '/PhieuNhapKho/Print?mhdid= ' + mhdid + '&desc=' + Desc + '&order=' + NumberOrder;
            window.open(link)

        } else {
            toast.create({
                title: 'Notification!',
                text: 'Không tìm thấy phiếu',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }


    })

    //#region Nhập data từ excel
    var Old_dataExcelNK = new Array()
    var New_dataExcelNK = new Array()
    var import_table_times = 0
    var tbl_mahthang_old = $('.import-excel-nhapkho').find('.table-mathang-old').DataTable({
        data: Old_dataExcelNK,
        bInfo: false,
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": null,

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",

            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",

            },
            {
                "targets": 3,
                "className": "text-right",
                "data": "SOLUONG",

            },
            {
                "targets": 4,
                "className": "text-right",
                "data": "DONGIA",
                "render": function (data) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": "TILETHUE",

            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "TILECHIETKHAU",

            },
            {
                "targets": 7,
                "className": "text-left",
                "data": "GHICHU",

            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "SOLO",

            },
            {
                "targets": 9,
                "className": "text-left",
                "data": "EXPDATE",

            },
            {
                "targets": 10,
                "className": "text-left",
                "data": "SoluongTon",

            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).find('td:eq(0)').text(iDataIndex + 1);
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            $(api.column(1).footer()).html(data.length).addClass('text-right font-weight-bold');
        },

    })
    var tbl_mahthang_new = $('.import-excel-nhapkho').find('.table-mathang-new').DataTable({
        data: New_dataExcelNK,
        bInfo: false,
        columns: [
            {
                "targets": 0,
                "className": "text-left",
                "data": null,

            },
            {
                "targets": 1,
                "className": "text-left",
                "data": "MHCODE",

            },
            {
                "targets": 2,
                "className": "text-left",
                "data": "MHTEN",

            },
            {
                "targets": 3,
                "className": "text-right",
                "data": "SOLUONG",

            },
            {
                "targets": 4,
                "className": "text-right",
                "data": "DONGIA",
                "render": function (data) {
                    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                }

            },
            {
                "targets": 5,
                "className": "text-right",
                "data": "TILETHUE",

            },
            {
                "targets": 6,
                "className": "text-right",
                "data": "TILECHIETKHAU",

            },
            {
                "targets": 7,
                "className": "text-left",
                "data": "GHICHU",

            },
            {
                "targets": 8,
                "className": "text-right",
                "data": "SOLO",

            },
            {
                "targets": 9,
                "className": "text-left",
                "data": "EXPDATE",

            },
            {
                "targets": 10,
                "className": "text-left",
                "data": "SoluongTon",

            },

        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).find('td:eq(0)').text(iDataIndex + 1);
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
        paging: true,
        pageLength: 5,
        scroller: true,
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;
            $(api.column(1).footer()).html(data.length).addClass('text-right font-weight-bold');
        },

    })

    async function loadImportTable_Select() {
        var data = []
        $.ajax({
            type: 'GET',
            url: '/PhieuNhapKho/LoadKho',
            success: function (res) {
                data.kho = res.data
                if (res.data.length > 0) {
                    res.data.map((value) => {
                        $('.import-excel-nhapkho').find('select[name="kho"]').append(`<option value="` + value.KHOID + `">` + value.KHOCODE + `</option>`)
                    })

                }
            }
        })
        $.ajax({
            type: 'GET',
            url: '/PhieuNhapKho/LoadNpp',
            success: function (res) {
                data.Npp = res.data
                if (res.data.length > 0) {
                    res.data.map((value) => {
                        $('.import-excel-nhapkho').find('select[name="nha-phanphoi"]').append(`<option value="` + value.NPPID + `">` + value.NPPTEN + `</option>`)
                    })
                }
            }
        })
        return data
    }
    function imporTable_setTimeOut() {
        setTimeout(function () {
            tbl_mahthang_old.columns.adjust().draw();
            tbl_mahthang_new.columns.adjust().draw();
        }, 200
        )
    }

    //Modal import exce[l]
    $('#load-file-excel').on('show.bs.modal', async function () {
        fileupload.value = "";
        FileData = new FormData() // file ẩn chứa file
        $('.import-excel-nhapkho').find('select[name="sheetname"]').find('option').remove()
        clearToInsert()
        if (import_table_times === 0) {
            import_table_times++;
            var result = await loadImportTable_Select();
            imporTable_setTimeOut()
        }
    })

    // Nút chọn excel
    var fileupload = document.getElementById("FileUpload1");
    var fileuploadReset = document.getElementById("FileUploadReset");
    var button = document.getElementById("btnFileUpload");
    button.onclick = function () {
        fileupload.click();
    };
    var FileData = new FormData()
    //
    fileupload.onchange = async function (event) {
        var input = event.target
        var files = input.files
        FileData = new FormData()
        FileData.append('File', files[0])
        FileData.append('Path', input.value)
        console.log(FileData.get('File'))
        console.log(input.value)
        if (files[0] != undefined) {
            var result = await GetMutipleDataExcel(files[0], null);
        }

    };

    async function GetMutipleDataExcel(file, sheetname) {

        var data = []
        var lenght = 600;
        var dataUpload = new FormData();
        dataUpload.append('FileUpload1', file)
        dataUpload.append('SheetName', sheetname == null ? '' : sheetname)
        $.ajax({
            type: 'POST',
            url: '/PhieuNhapKho/GetDataExcel',
            data: dataUpload,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.data.length > 0) {
                    data = res
                    console.log(data)

                    Old_dataExcelNK = res.data[0].Old
                    New_dataExcelNK = res.data[0].New

                    if (sheetname == null) {
                        $('.import-excel-nhapkho').find('select[name="sheetname"]').find('option').remove()
                        res.data[0].SheetName.map((value) => {
                            if (value.Name === 'Sheet1') {
                                $('.import-excel-nhapkho').find('select[name="sheetname"]').append(`<option selected value="` + value.Name + `">` + value.Name + `</option>`)
                            } else {
                                $('.import-excel-nhapkho').find('select[name="sheetname"]').append(`<option value="` + value.Name + `">` + value.Name + `</option>`)
                            }

                        })

                        $('.import-excel-nhapkho').find('input[name="sheetname"]').val(res.data[0].SheetName[0].Url)
                    }

                    tbl_mahthang_new.rows.add(New_dataExcelNK)
                    tbl_mahthang_new.columns.adjust().draw();

                    tbl_mahthang_old.rows.add(Old_dataExcelNK)
                    tbl_mahthang_old.columns.adjust().draw();
                }
            }
        })
        return data;
    }
    // Select SheetName
    $('.import-excel-nhapkho').find('select[name="sheetname"]').on('change', function () {
        $('#popup-thongbao').modal('toggle');
    })

    async function getDatafromExcelbySheet(sheetname, path) {

        var data = new FormData();
        data.append('SheetName', sheetname == null ? '' : sheetname)
        data.append('URL', path == null ? '' : path)
        $.ajax({
            type: 'POST',
            url: '/PhieuNhapKho/GetDataExcelBySheetName',
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.data.length > 0) {

                    data = res
                    console.log(data)


                    Old_dataExcelNK = res.data[0].Old
                    New_dataExcelNK = res.data[0].New

                    $('.import-excel-nhapkho').find('select[name="sheetname"]').val(sheetname)

                    tbl_mahthang_new.rows.add(New_dataExcelNK)
                    tbl_mahthang_new.columns.adjust().draw();

                    tbl_mahthang_old.rows.add(Old_dataExcelNK)
                    tbl_mahthang_old.columns.adjust().draw();
                }
            }

        })
    }

    // Nút giữ để cộng thêm dữ liệu
    $('.thong-bao').find('#btn-giu').bind('click', async function () {
        var sheetname = $('.import-excel-nhapkho').find('select[name="sheetname"]').val()
        var path = $('.import-excel-nhapkho').find('select[name="sheetname"]').val()
        var result = await getDatafromExcelbySheet(sheetname, path)
        $('.import-excel-nhapkho select[name="sheetname"]').val(sheetname)
        $('#popup-thongbao').modal('toggle');

    })
    // Nút Thêm mới để reset table và thêm mới
    $('.thong-bao').find('#btn-themmoi').on('click', async function () {
        var sheetname = $('.import-excel-nhapkho').find('select[name="sheetname"]').val()
        var path = $('.import-excel-nhapkho').find('input[name="sheetname"]').val()
        $('#popup-thongbao').modal('toggle');
        clearToInsert()
        $('.import-excel-nhapkho select[name="sheetname"]').val(sheetname)
        var result = await getDatafromExcelbySheet(sheetname, path)
    })

    //Nút Nạp lại dữ liệu
    $('#btn-nap-file-excel').on('click', async function () {
        clearToInsert()
        fileupload.value = "";
        fileupload.click();
    })
    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/PhieuNhapKho/CreateMatHangNhapKhoExcel`
        window.open(link)
    })

    //Nút Đồng ý nhập
    $('.import-excel-nhapkho').find('#btn-import-nhap').on('click', async function () {
        var KhoId = $('.import-excel-nhapkho').find('select[name="kho"]').val()
        var listSlton = [] // GetSoluongTon(Old_dataExcelNK, KhoId)
        status = 0;
        Old_dataExcelNK.map((e) => {
            listSlton.push({ MHID: e.MHID, SOLUONG: e.SOLUONG })
        })

        var result = await CheckforImportData(listSlton)
        if (result != undefined) {
            GetSoluongTon(listSlton, KhoId).then((res) => {
                if (res.data.length > 0) {
                    var ListSLton = res.data
                    var NppId = $('.import-excel-nhapkho').find('select[name="nha-phanphoi"]').val()
                    var s = Old_dataExcelNK

                    if (s.length > 0) {

                        for (var i = 0; i < s.length; i++) {
                            f = s[i]
                            if (f.SOLUONG === 0) {
                                f.SOLUONG = 1
                            }
                            var dgsl_index = f.SOLUONG * f.DONGIA
                            var chietkhau_index = dgsl_index * f.TILECHIETKHAU / 100
                            var thue_index = (dgsl_index - chietkhau_index) * f.TILETHUE / 100
                            var thanhtien_index = dgsl_index - chietkhau_index + thue_index
                            var a = ListSLton.filter(c => c.MHID == f.MHID)
                            var slton = a[0].soluong
                            var obj = {
                                SORTORDER: null,
                                MCTDID: null,
                                MDID: null,
                                KHID: null,
                                NPPID: NppId,
                                MHID: f.MHID,
                                MHCODE: f.MHCODE,
                                MHTEN: f.MHTEN,
                                KHOCODE: null,
                                SOLUONG: f.SOLUONG,
                                DONVI: f.DONVI,
                                KHOCODE: a[0].KHOCODE,
                                KHOID: a[0].KHOID,
                                SOLUONGEX: f.SOLUONG,
                                SoLuongTon: slton,
                                DONGIA: f.DONGIA,
                                TILETHUE: f.TILETHUE,
                                TILECHIETKHAU: f.TILECHIETKHAU,
                                THUE: thue_index,
                                CHIETKHAU: chietkhau_index,
                                THANHTIEN: thanhtien_index,
                                GHICHU: f.GHICHU,
                                statusManager: 1,
                                ViTri: f.ViTri,
                                MHTID: f.MHTID,
                                LINKIMAGE: f.LINKIMAGE
                            }
                            dataTemp.push(obj)
                        }
                        //$('select[name="khos"]').val(of.list_chitiet.data[0].KHOID)

                        tbl_ctphieu.rows.add(dataTemp);
                        tbl_ctphieu.columns.adjust().draw();
                        $('#load-file-excel').modal('toggle')
                    }
                }
            })
        }

    })

    async function CheckforImportData(listSlton) {
        var status = undefined;
        for (var i in listSlton) {
            var item = listSlton[i]
            if (item.SOLUONG === 0) {

                var r = confirm('Tìm thấy dữ liệu có số lượng bằng không, nhấn OK để lấy số lượng mặc định')
                if (r) {
                    status = listSlton
                } else {
                    status = undefined
                    break
                }
            }
            else {
                status = listSlton
            }
        }
        return status;
    }



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


    //Nút hủy
    $('.import-excel-nhapkho').find('#btn-import-huy').on('click', function () {
        clearToInsert();
    })

    //#endregion

    //#endregion


});