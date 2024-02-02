$(document).ready(function () {
    //#region Phiếu chi
    let ID = $('#form-phieu-chi input[name="pt-IDThu"]');
    let TiGia = $('#form-phieu-chi input[name="pt-TiGia"]');
    let SoPhieu = $('#form-phieu-chi input[name="pt-SoPhieu"]');
    SoPhieu.prop('disabled', true);
    let Ngay = $('#form-phieu-chi input[name="pt-Ngay"]');
    let CaID = $('#form-phieu-chi select[name="pt-CaID"]');
    let NguoiThu = $('#form-phieu-chi select[name="slNhanVien"]');
    let LoaiTien = $('#form-phieu-chi select[name="pt-LoaiTien"]');
    let SRID = $('#form-phieu-chi select[name="pt-SRID"]');
    SRID.prop('disabled', true);
    let ValueLoaiTien = $('#form-phieu-chi input[name="pt-ValueLoaiTien"]');

    let SoTien = $('#form-phieu-chi input[name="pt-SoTien"]');
    let SoTienVND = $('#form-phieu-chi input[name="pt-SoTienVND"]');
    let Thue = $('#form-phieu-chi input[name="pt-Thue"]');
    let NHID = $('#form-phieu-chi select[name="pt-NHID"]');

    $('#radio-ngan-hang').css('display', 'none');
    let nop = $('input[name="ngan-hang"][value="1"]');
    let rut = $('input[name="ngan-hang"][value="0"]');

    let LyDo = $('#form-phieu-chi select[name="pt-LyDo"]');

    let IDNguoiNhan = $('#form-phieu-chi input[name="pt-IDNguoiNhan"]');
    let CodeNguoiNhan = $('#form-phieu-chi input[name="pt-CodeNguoiNhan"]');
    let NameNguoiNhan = $('#form-phieu-chi input[name="pt-NameNguoiNhan"]');
    let AddressNguoiNhan = $('#form-phieu-chi input[name="pt-AddressNguoiNhan"]');
    let PhoneNguoiNhan = $('#form-phieu-chi input[name="pt-PhoneNguoiNhan"]');
    let KhoanMuc = $('#form-phieu-chi select[name="pt-KhoanMuc"]');
    let DienGiai = $('#form-phieu-chi textarea[name="pt-DienGiai"]');

    //Datatable Phiếu Chi
    let tbPhieuChi_filterValues = {};

    $('#table_phieu_chi thead tr').clone(true).appendTo('#table_phieu_chi thead');
    $('#table_phieu_chi thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 3) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phieu-chi="' + i + '" /> ');
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phieu-chi="' + i + '"/>');
        }
    });

    let fdate = null;
    let tdate = null;
    var tbPhieuChi = $('#table_phieu_chi').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbPhieuChi_filterValues.draw = data.draw;
            tbPhieuChi_filterValues.search = data.search["value"];
            tbPhieuChi_filterValues.fdate = fdate;
            tbPhieuChi_filterValues.tdate = tdate;
            tbPhieuChi_filterValues.start = data.start;
            tbPhieuChi_filterValues.length = data.length;
            tbPhieuChi_filterValues.order = data.order[0].column;
            tbPhieuChi_filterValues.dir = data.order[0].dir;

            tbPhieuChi_filterValues.search1 = $('input[data-search-phieu-chi=1]').val();
            tbPhieuChi_filterValues.search2 = $('input[data-search-phieu-chi=2]').val();
            tbPhieuChi_filterValues.search3 = $('input[data-search-phieu-chi=3]').val();
            tbPhieuChi_filterValues.search4 = $('input[data-search-phieu-chi=4]').val();
            tbPhieuChi_filterValues.search5 = $('input[data-search-phieu-chi=5]').val();
            tbPhieuChi_filterValues.search6 = $('input[data-search-phieu-chi=6]').val();
            tbPhieuChi_filterValues.search7 = $('input[data-search-phieu-chi=7]').val();

            $.ajax({
                url: '/PhieuChi/LoadPhieuChi',
                method: 'GET',
                data: tbPhieuChi_filterValues,
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
                        if (tbPhieuChi_filterValues.draw != 1) {
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
                    }
                },
            }).done(callback, () => {
            });
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.CHIID);
            $($(nRow).children()[3]).html(moment(data.NGAY).format('DD/MM/yyyy'));
            $($(nRow).children()[5]).html(convertCurrency(parseFloat(data.CHI).toFixed(0)));
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
                var tt = Math.round(data[0].TongTien);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(5).footer()).html(tt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(5).footer()).html(0).addClass('text-right');
            }

        },
        columns: [
            { "data": "RowIndex" },
            { "data": "CHICODE" },
            { "data": "LYDOTEN" },
            { "data": "NGAY" },
            { "data": "NVTEN" },
            {
                "data": "CHI",
                "className": "text-right",
            },
            { "data": "KHTEN" },
            { "data": "DIENGIAI" },
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },

        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        bInfo: false,
        paging: true,
        searching: false,
        pageLength: 5,
        lengthChange: false,
        orderCellsTop: true
    });

    $(tbPhieuChi.table().container()).on('keyup change', 'thead input', function (e) {
        tbPhieuChi.draw();
    });

    //Search ngày -> ngày
    $('#btn-searchdate-phieuchi').click(function () {
        fdate = $('#date-phieuchi input[name="chooseDate_Form"]').val();
        tdate = $('#date-phieuchi input[name="chooseDate_To"]').val();
        tbPhieuChi.columns.adjust().draw();
    });

    //Click
    $('#table_phieu_chi tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table_phieu_chi tbody tr').not(this).removeClass('selected');
    });

    //DoubleClick
    $('#table_phieu_chi tbody').on('dblclick', 'tr', async function () {
        $(this).addClass('selected');
        $('#table_phieu_chi tbody tr').not(this).removeClass('selected');
        LoadPhieuChi();
    });
    var NVID = null;
    User().then((rs) => {
        if (rs != undefined) {
            NVID = rs.data;
        }
    });
    //Insert
    $('#btn-them-phieuchi').click(function () {
        $('#form-phieu-chi input').each(function (index, e) {
            $(e).val('');
            SoTien.prop('disabled', false);
            SoTienVND.prop('disabled', false);
        });
        NHID.val('');
        $('#form-phieu-chi textarea').each(function (index, e) {
            $(e).val('');
        });
        TienTeUSD();
        CreateCode().then((rs) => {
            if (rs != undefined) {
                SoPhieu.val(rs.code)
            }
        });
        NguoiThu.val(NVID).trigger('change.select2');
        if (NVID == null || NVID == undefined) {
            NguoiThu.prop('disabled', false);
        }
        Ngay.val(moment(new Date()).format('DD/MM/yyyy'));
        LoaiTien.val('75a409bd-b215-499f-8955-17ce68b112c0');
        ValueLoaiTien.val(1);
        SoTien.prop('disabled', true);
        $('#radio-ngan-hang').css('display', 'none');
        $('#form-phieu-chi').modal();
    });

    //Update
    $('#btn-edit-phieuchi').click(function () {
        LoadPhieuChi();
    });

    //Xóa
    $('#btn-delete-phieuchi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/PhieuChi/CheckDeletePhieuChi',
            success: function (res) {
                if (res.rs) {
                    if ($('#table_phieu_chi tbody tr.selected').attr('data-id') != undefined) {
                        let idPhieuChi = $('#table_phieu_chi tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa phiếu chi này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/PhieuChi/DeletePhieuChi?id=' + idPhieuChi,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbPhieuChi.ajax.reload();
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
                            text: 'Vui lòng chọn phiếu chi',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
                    }
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

    //Nạp
    $('#btn-nap-phieuchi').on('click', function () {
        tbPhieuChi.draw();
    });

    //Save
    $('#btn-save-phieuchi').click(function () {
        let $currentForm = $('#form-phieu-chi');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        let data = new FormData();
        data.append("ID", ID.val());
        data.append("TiGia", TiGia.val());
        data.append("SoPhieu", SoPhieu.val());
        data.append("Ngay", Ngay.val());
        data.append("CaID", CaID.val());
        data.append("IDNguoiThu", NguoiThu.val());
        data.append("TenNguoiThu", NguoiThu.find('option:selected').text());
        data.append("IDLoaiTien", LoaiTien.val());
        data.append("LoaiTien", LoaiTien.find('option:selected').text());
        data.append("SRID", SRID.val());
        data.append("ValueLoaiTien", ValueLoaiTien.val());
        data.append("SoTien", SoTien.val());
        data.append("SoTienVND", SoTienVND.val());
        data.append("Thue", Thue.val());
        data.append("NHID", NHID.val() == null ? "" : NHID.val());
        data.append("Nop", nop.is(':checked'));
        data.append("Rut", rut.is(':checked'));
        data.append("LyDo", LyDo.val());

        data.append("IDNguoiNhan", IDNguoiNhan.val());
        data.append("CodeNguoiNhan", CodeNguoiNhan.val());
        data.append("NameNguoiNhan", NameNguoiNhan.val());
        data.append("AddressNguoiNhan", AddressNguoiNhan.val());
        data.append("PhoneNguoiNhan", PhoneNguoiNhan.val());
        data.append("KhoanMuc", KhoanMuc.val());
        data.append("DienGiai", DienGiai.val());
        $.ajax({
            async: false,
            type: 'POST',
            url: '/PhieuChi/InsertUpdatePhieuChi',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbPhieuChi.ajax.reload();
                    $('#form-phieu-chi').modal('hide');
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

    //Excel
    $('#btn-export-phieuchi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/PhieuChi/CheckExcelPhieuChi',
            success: function (msg) {
                if (msg.rs) {
                    var filterReport = {};
                    filterReport.draw = tbPhieuChi_filterValues.draw;
                    filterReport.search = tbPhieuChi_filterValues.search;
                    filterReport.start = tbPhieuChi_filterValues.start;
                    filterReport.length = tbPhieuChi_filterValues.length;
                    filterReport.order = tbPhieuChi_filterValues.order;
                    filterReport.dir = tbPhieuChi_filterValues.dir;
                    filterReport.fdate = tbPhieuChi_filterValues.fdate;
                    filterReport.tdate = tbPhieuChi_filterValues.tdate;

                    filterReport.search1 = tbPhieuChi_filterValues.search1;
                    filterReport.search2 = tbPhieuChi_filterValues.search2;
                    filterReport.search3 = tbPhieuChi_filterValues.search3;
                    filterReport.search4 = tbPhieuChi_filterValues.search4;
                    filterReport.search5 = tbPhieuChi_filterValues.search5;
                    filterReport.search6 = tbPhieuChi_filterValues.search6;
                    filterReport.search7 = tbPhieuChi_filterValues.search7;

                    filterReport.export = 1;
                    var link = `/PhieuChi/LoadPhieuChi?draw=` + filterReport.draw +
                        `&search=` + filterReport.search +
                        `&start=` + filterReport.start +
                        `&length=` + filterReport.length +
                        `&order=` + filterReport.order +
                        `&dir=` + filterReport.dir +
                        `&fdate=` + filterReport.fdate +
                        `&tdate=` + filterReport.tdate +
                        `&search1=` + filterReport.search1 +
                        `&search2=` + filterReport.search2 +
                        `&search3=` + filterReport.search3 +
                        `&search4=` + filterReport.search4 +
                        `&search5=` + filterReport.search5 +
                        `&search6=` + filterReport.search6 +
                        `&search7=` + filterReport.search7 +
                        `&export=` + filterReport.export;
                    window.open(link);
                } else {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            },
        });
    });

    //Print
    $('#btn-print-phieuchi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/PhieuChi/CheckPrintPhieuChi',
            success: function (msg) {
                if (msg.rs) {
                    let id = $('#table_phieu_chi tbody tr.selected').attr('data-id');
                    if (id != undefined) {
                        var link = `/PhieuChi/Print?id=` + id;
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
                } else {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
            },
        });
    });
    //$('#form-phieu-chi').on('hidden.bs.modal', function (e) {
    //    NguoiThu.prop('disabled', false);
    //})
   
    //Function Load Phiếu Chi
    function LoadPhieuChi() {
        let id = $('#table_phieu_chi tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadDetail(id).then((rs) => {
                console.log(rs.data[0]);
                ID.val(rs.data[0].CPID); //ID
                TienTeUSD(); //Tỉ giá
                SoPhieu.val(rs.data[0].CPCODE);  // số phiếu
                Ngay.val(moment(rs.data[0].Ngay).format('DD/MM/yyyy'));  //ngày thu
                CaID.val(rs.data[0].CAID); // ca làm việc
                NguoiThu.val(rs.data[0].NVID).trigger('change.select2'); // người thu
                NguoiThu.prop('disabled', true);
                SRID.val(rs.data[0].SRID).trigger('change.select2'); // chi nhánh
                if (rs.data[0].TIENTECODE == "VND") {  // 1: Là tiền VN,ngược lại là tiền các nước khác.
                    SoTien.prop('disabled', true);
                    SoTienVND.prop('disabled', false);
                }
                else {
                    SoTien.prop('disabled', false);
                    SoTienVND.prop('disabled', true);
                }
                LoaiTien.val(rs.data[0].TIENTEID); // loại tiền
                TienTe(rs.data[0].TIENTEID);
                ValueLoaiTien.val(rs.data[0].TIGIA);
                SoTien.val(rs.data[0].FCCHIPHI); //số tiền FC (usd)
                SoTienVND.val(rs.data[0].CHIPHI1); //số tiền vnđ
                Thue.val(rs.data[0].TILETHUE); //tbuế
                NHID.val(rs.data[0].NHID); //ngân hàng

                if (NHID.val() == null) {
                    $('#radio-ngan-hang').css('display', 'none');
                    $('input[name="ngan-hang"][value="0"]').removeAttr('checked');
                    $('input[name="ngan-hang"][value="1"]').removeAttr('checked');
                }
                else {
                    $('#radio-ngan-hang').css('display', 'block');
                    if (rs.data[0].RECEIVEDOUT) {
                        console.log(1);
                        $('input[name="ngan-hang"][value="1"]').attr('checked', 'checked');
                        $('input[name="ngan-hang"][value="0"]').removeAttr('checked');
                    }
                    else {
                        console.log(0);
                        $('input[name="ngan-hang"][value="0"]').attr('checked', 'checked');
                        $('input[name="ngan-hang"][value="1"]').removeAttr('checked');
                    }
                }

                LyDo.val(rs.data[0].LDCID); //lý do

                DienGiai.val(rs.data[0].DIENGIAI); //diễn giải
                CodeNguoiNhan.val(rs.data[0].OBJECTCODE); // mã người nhận
                NameNguoiNhan.val(rs.data[0].OBJECTNAME); // tên người nhận
                AddressNguoiNhan.val(rs.data[0].OBJECTADDRESS); //địa chỉ người nhận
                PhoneNguoiNhan.val(rs.data[0].OBJECTPHONE); // phone người nhận
                $('#form-phieu-chi').removeClass('was-validated');
                $('#form-phieu-chi').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn phiếu chi!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    }

    ////function Load Chi Tiết Phiếu Chi
    async function LoadDetail(CPID) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/PhieuChi/LoadDetail?CPID=' + CPID,
            success: function (msg) {
                return msg.data;
            }
        })
    }

    LoadListCaLamViec(); //Load ca làm việc
    function LoadListCaLamViec() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/LoadCaLamViec',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].TEN, d[i].CAID);
                        CaID.append(o);
                    }
                }
            }
        })
    }
    LoadListLyDo(); //Load danh sách lý do
    function LoadListLyDo() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/LoadLyDo',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].CODE + " - " + d[i].TEN, d[i].ID);
                        LyDo.append(o);
                    }
                }
            }
        })
    }
    LoadListTienTe(); //Load loại tiền
    function LoadListTienTe() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/LoadTienTe',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].TIENTECODE, d[i].TIENTEID);
                        LoaiTien.append(o);
                    }
                }
            }
        })
    }
    LoadListNganHang(); //Load ngân hàng
    function LoadListNganHang() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/LoadNganHang',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].NAME, d[i].ID);
                        NHID.append(o);
                    }
                }
            }
        })
    }

    //Function tạo code tự động
    async function CreateCode() {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/PhieuChi/CreateCodePhieuChi',
            success: function (msg) {
                return msg;
            },
        });
    };

    async function User() {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/PhieuChi/CheckUser',
            success: function (msg) {
                return msg;
            },
        });
    };

    //Function Chuyển thành kiểu tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //Function test rỗng
    function ckstring(str) {
        return (!str || /^\s*$/.test(str));
    }

    //Function Load Tiền tệ USD
    function TienTeUSD() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/TienTeUSD',
            success: function (msg) {
                TiGia.val(msg.data.TIGIA);
                //return msg.data;
            }
        });
    };

    //Function Load Tiền tệ cho input
    function TienTe(id) {
        return $.ajax({
            async: false,
            method: 'GET',
            url: '/PhieuChi/LoadTienTe',
            success: function (msg) {
                let d = msg.data
                for (var i = 0; i < d.length; i++) {
                    if (d[i].TIENTEID == id) {
                        ValueLoaiTien.val(d[i].TIGIA);
                    }
                }
                if (ValueLoaiTien.val() != 1) {
                    ValueLoaiTien.val(TiGia.val());
                }
            }
        });
    }

    $(LoaiTien).on('change', function () {
        var val = $(LoaiTien).find('option:selected').val();
        TienTe(val);
        var index = $(LoaiTien).find('option:selected').index();

        if (index == 0) {
            SoTien.prop('disabled', true);
            SoTienVND.prop('disabled', false);
        }
        else {

            SoTien.prop('disabled', false);
            SoTienVND.prop('disabled', true);
        }
    });

    $(NHID).on('change', function () {
        $('#radio-ngan-hang').css('display', 'block');
        $('input[name="ngan-hang"][value="0"]').attr('checked', 'checked');
    });

    $(TiGia).on('keyup', function () {
        TiGiaChange();
        VND();
    });

    $(SoTienVND).on('keyup', function () { //VND
        VND();
    });

    $(SoTien).on('keyup', function () { //USD
        USD();
    });

    function VND() {
        var tiGia = $(TiGia).val().replace(/\./g, '');
        var vnd = $(SoTienVND).val().replace(/\./g, '');
        if (vnd == "" || tiGia == "" || vnd == 0 || tiGia == 0) {
            return $(SoTien).val(0);
        } else {
            var rs = vnd / tiGia;
            return $(SoTien).val(parseFloat(rs).toFixed(4));
        }
    };

    function USD() {
        var tiGia = $(TiGia).val().replace(/\./g, '');
        var usd = $(SoTien).val().replace(/\./g, '');
        if (usd == "" || tiGia == "" || usd == 0 || tiGia == 0) {
            return $(SoTienVND).val(0);
        } else {
            var rs = tiGia * usd;
            return $(SoTienVND).val(parseFloat(rs).toFixed(4));
        }
    };

    function TiGiaChange() {
        var tiGia = $(TiGia).val();
        var index = $(LoaiTien).find('option:selected').index();
        if (index != 0) {
            return $(ValueLoaiTien).val(tiGia);
        }
    };

    ShowRoomPT();
    function ShowRoomPT() {
        let dsSR = [];
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
                    SRID.select2({
                        data: dsSR,
                        dropdownParent: $('#form-phieu-chi')
                    });
                }
            },
        });
    };

    //#endregion

    //#region Nhân viên
    NhanVien();
    function NhanVien() {
        let dsNV = [];
        let tbStaff_filterValues = {};
        tbStaff_filterValues.draw = 1;
        tbStaff_filterValues.search = "";
        tbStaff_filterValues.start = 0;
        tbStaff_filterValues.length = 2000;
        tbStaff_filterValues.order = 0;
        tbStaff_filterValues.dir = 0;
        tbStaff_filterValues.follow = -1;
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
                } else if (msg.status == 3) {
                    if (tbStaff_filterValues.draw != 1) {
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
                    dsNV = $.map(msg.data, function (obj) {
                        obj.id = obj.NVID;
                        obj.text = obj.NVCODE + '-' + obj.NVTEN;
                        return obj
                    });
                    NguoiThu.select2({
                        data: dsNV,
                        dropdownParent: $('#form-phieu-chi')
                    });
                }
            },
        });
    };

    $('#btn-nhan-vien-phieu-thu').on('click', function () {
        $('#danh-sach-nv').modal();
    });

    $('#table-nv tbody').unbind('dblclick');
    $('#table-nv tbody').on('dblclick', 'tr', function () {
        $('#danh-sach-nv').modal('hide');
        let idNV = $(this).attr('data-id');
        NguoiThu.val(idNV).trigger('change');
    });

    $('#danh-sach-nv').on('hidden.bs.modal', function () {
        let idNV = $('#table-nv tbody tr.selected').attr('data-id');
        if (idNV != undefined) {
            NguoiThu.val(idNV).trigger('change');
        }
    });

    $('#them-nhan-vien').on('hidden.bs.modal', function () {
        NguoiThu.empty();
        NhanVien();
    });
    //#endregion

    //#region Lý Do
    $('#btn-ly-do-phieu-thu').on('click', function () {
        $('#danh-sach-ly-do').modal();
    });
    //#endregion

    //#region Khách hàng
    $('#btn-khach-hang-phieu-thu').on('click', function () {
        $('#danh-sach-khach-hang').modal();
    });
    $('#table-khachhang tbody').unbind('dblclick');
    $('#table-khachhang tbody').on('dblclick', 'tr', async function () {
        $('#danh-sach-khach-hang').modal('hide');
        var idKH = $(this).attr('data-id');
        LoadChiTietKhachHang(idKH).then((rs) => {
            IDNguoiNhan.val(rs.data.KHID);
            CodeNguoiNhan.val(rs.data.KHCODE);
            NameNguoiNhan.val(rs.data.KHTEN);
            AddressNguoiNhan.val(rs.data.DIACHI);
            PhoneNguoiNhan.val(rs.data.DIENTHOAI);
        })
    });
    $('#danh-sach-khach-hang').on('hidden.bs.modal', function () {
        let idKH = $('#table-khachhang tbody tr.selected').attr('data-id');
        if (idKH != undefined) {
            LoadChiTietKhachHang(idKH).then((rs) => {
                IDNguoiNhan.val(rs.data.KHID);
                CodeNguoiNhan.val(rs.data.KHCODE);
                NameNguoiNhan.val(rs.data.KHTEN);
                AddressNguoiNhan.val(rs.data.DIACHI);
                PhoneNguoiNhan.val(rs.data.DIENTHOAI);
            })
        }
    });
    //Funciotn Load chi tiết khách hàng
    async function LoadChiTietKhachHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/KhachHang/LoadChiTietKhachHang?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };
    //#endregion

    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    $('.search-date').datetimepicker({
        timepicker: false,
        format: 'd/m/Y',
        mask: true,
    });
});