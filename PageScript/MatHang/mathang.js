$(document).ready(function () {
    //#region Mặt hàng
    let idMatHang = $('#them-mat-hang input[name="idMatHang"]');
    let codeMatHang = $('#them-mat-hang input[name="codeMatHang"]');
    let hasDetailMatHang = $('#them-mat-hang input[name="hasDetailMatHang"]');
    let tenMatHang = $('#them-mat-hang input[name="tenMatHang"]');
    let aliasMatHang = $('#them-mat-hang input[name="aliasMatHang"]');
    let slDonViTinh = $('#them-mat-hang select[name="slDonViTinh"]');
    let slBaoHanh = $('#them-mat-hang select[name="slBaoHanh"]');
    let linkMatHang = $('input[name="linkMatHang"]');
    LoadBaoHanh();
    function LoadBaoHanh() {
        let dsBH = [];
        $.ajax({
            url: '/MatHang/LoadMatHangBaoHanh',
            method: 'GET',
            success: function (msg) {
                dsBH = $.map(msg.data, function (obj) {
                    obj.id = obj.ID;
                    obj.text = obj.TEN;
                    return obj
                });
                slBaoHanh.select2({
                    data: dsBH,
                    dropdownParent: $('#them-mat-hang')
                });
            }
        });
    }
    let moTaMatHang = $('#them-mat-hang textarea[name="moTaMatHang"]');
    let ghiChuMatHang = $('#them-mat-hang textarea[name="ghiChuMatHang"]');
    let slLoaiMatHang = $('#them-mat-hang select[name="slLoaiMatHang"]');

    let giaNhapMatHang = $('#them-mat-hang input[name="giaNhapMatHang"]');
    let giaBanLeMatHang = $('#them-mat-hang input[name="giaBanLeMatHang"]');
    let giaBanBuonMatHang = $('#them-mat-hang input[name="giaBanBuonMatHang"]');
    let thueMatHang = $('#them-mat-hang input[name="thueMatHang"]');
    let soLuongMaxMatHang = $('#them-mat-hang input[name="soLuongMaxMatHang"]');
    let soLuongMinMatHang = $('#them-mat-hang input[name="soLuongMinMatHang"]');

    let giaNhap1 = $('#them-mat-hang input[name="giaNhap1MatHang"]');
    let giaNhap2 = $('#them-mat-hang input[name="giaNhap2MatHang"]');
    let giaNhap3 = $('#them-mat-hang input[name="giaNhap3MatHang"]');

    let giaBan1 = $('#them-mat-hang input[name="giaBan1MatHang"]');
    let giaBan2 = $('#them-mat-hang input[name="giaBan2MatHang"]');
    let giaBan3 = $('#them-mat-hang input[name="giaBan3MatHang"]');
    let giaBan4 = $('#them-mat-hang input[name="giaBan4MatHang"]');
    let giaBan5 = $('#them-mat-hang input[name="giaBan5MatHang"]');
    let giaBan6 = $('#them-mat-hang input[name="giaBan6MatHang"]');
    let giaBan7 = $('#them-mat-hang input[name="giaBan7MatHang"]');

    let soLuong1 = $('#them-mat-hang input[name="soLuong1MatHang"]');
    let soLuong2 = $('#them-mat-hang input[name="soLuong2MatHang"]');
    let soLuong3 = $('#them-mat-hang input[name="soLuong3MatHang"]');
    let soLuong4 = $('#them-mat-hang input[name="soLuong4MatHang"]');
    let soLuong5 = $('#them-mat-hang input[name="soLuong5MatHang"]');
    let soLuong6 = $('#them-mat-hang input[name="soLuong6MatHang"]');
    let soLuong7 = $('#them-mat-hang input[name="soLuong7MatHang"]');

    let slNCCMatHang = $('#them-mat-hang select[name="slNCCMatHang"]');
    var NCC1 = $('#them-mat-hang select[name="slNCCMatHang"][id="NCC1"]');
    var NCC2 = $('#them-mat-hang select[name="slNCCMatHang"][id="NCC2"]');
    var NCC3 = $('#them-mat-hang select[name="slNCCMatHang"][id="NCC3"]');

    //#region Function chọn 3 select không trùng nhau
    //function Test3Select(id) {
    //    if (dsNCC[id].hasSelected == true) {
    //        slNCCMatHang.find('option[value=' + dsNCC[id].KHID + ']').attr('disabled', 'disabled');
    //    }
    //    else {
    //        slNCCMatHang.find('option[value=' + dsNCC[id].KHID + ']').removeAttr('disabled');
    //    }
    //    slNCCMatHang.select2({
    //        data: dsNCC,
    //        dropdownParent: $('#them-mat-hang')
    //    });
    //}

    //(function () {
    //    var prev;
    //    var next;
    //    NCC1.focus(function () {
    //        prev = this.value;
    //    }).change(function () {
    //        next = this.value;
    //        if (prev != undefined) {
    //            let idPrev = dsNCC.findIndex(x => x.id == prev);
    //            dsNCC[idPrev].hasSelected = false;

    //            Test3Select(idPrev);
    //        }
    //        if (next != "") {
    //            let idNext = dsNCC.findIndex(x => x.id == next);
    //            dsNCC[idNext].hasSelected = true;

    //            Test3Select(idNext);
    //        }

    //        prev = next;
    //    });
    //})();

    //(function () {
    //    var prev;
    //    var next;
    //    NCC2.focus(function () {
    //        prev = this.value;
    //    }).change(function () {
    //        next = this.value;
    //        if (prev != undefined) {
    //            let idPrev = dsNCC.findIndex(x => x.id == prev);

    //            dsNCC[idPrev].hasSelected = false;
    //            Test3Select(idPrev);
    //        }
    //        if (next != "") {
    //            let idNext = dsNCC.findIndex(x => x.id == next);
    //            dsNCC[idNext].hasSelected = true;

    //            Test3Select(idNext);
    //        }

    //        prev = next;
    //    });
    //})();

    //(function () {
    //    var prev;
    //    var next;
    //    NCC3.focus(function () {
    //        prev = this.value;
    //    }).change(function () {
    //        next = this.value;
    //        if (prev != undefined) {
    //            let idPrev = dsNCC.findIndex(x => x.id == prev);

    //            dsNCC[idPrev].hasSelected = false;
    //            Test3Select(idPrev);
    //        }
    //        if (next != "") {
    //            let idNext = dsNCC.findIndex(x => x.id == next);
    //            dsNCC[idNext].hasSelected = true;

    //            Test3Select(idNext);
    //        }

    //        prev = next;
    //    });
    //})();
    //#endregion

    let theoDoiMatHang = $('#them-mat-hang input[name="theoDoiMatHang"]');

    $('#table-mathang thead tr').clone(true).appendTo('#table-mathang thead');
    $('#table-mathang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0 || i == 14) {
            $(this).html('');
        } else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title + '" data-index="' + i + '"/>');
        }
    });

    NhaCungCap();
    let dsNCC = [];
    function NhaCungCap() {
        let tbNhaCungCap_filterValues = {};
        tbNhaCungCap_filterValues.draw = 1;
        tbNhaCungCap_filterValues.search = "";
        tbNhaCungCap_filterValues.start = 0;
        tbNhaCungCap_filterValues.length = 2000;
        tbNhaCungCap_filterValues.order = 0;
        tbNhaCungCap_filterValues.dir = 0;
        tbNhaCungCap_filterValues.follow = -1;

        tbNhaCungCap_filterValues.search1 = "";
        tbNhaCungCap_filterValues.search2 = "";
        tbNhaCungCap_filterValues.search3 = "";
        tbNhaCungCap_filterValues.search4 = "";
        tbNhaCungCap_filterValues.search5 = "";
        tbNhaCungCap_filterValues.search6 = "";
        tbNhaCungCap_filterValues.search7 = "";
        tbNhaCungCap_filterValues.search8 = "";
        tbNhaCungCap_filterValues.search9 = "";
        tbNhaCungCap_filterValues.search10 = "";

        tbNhaCungCap_filterValues.search11 = "";
        tbNhaCungCap_filterValues.search12 = "";
        tbNhaCungCap_filterValues.search13 = "";
        tbNhaCungCap_filterValues.search14 = "";
        tbNhaCungCap_filterValues.search15 = "";
        tbNhaCungCap_filterValues.search16 = "";
        tbNhaCungCap_filterValues.search17 = "";
        tbNhaCungCap_filterValues.search18 = "";
        tbNhaCungCap_filterValues.search19 = "";
        tbNhaCungCap_filterValues.search20 = "";

        tbNhaCungCap_filterValues.search21 = "";
        tbNhaCungCap_filterValues.search22 = "";
        tbNhaCungCap_filterValues.search23 = "";
        tbNhaCungCap_filterValues.search24 = "";
        tbNhaCungCap_filterValues.search25 = "";
        tbNhaCungCap_filterValues.search26 = "";
        tbNhaCungCap_filterValues.search27 = "";
        tbNhaCungCap_filterValues.search28 = "";
        tbNhaCungCap_filterValues.search29 = "";
        tbNhaCungCap_filterValues.search30 = "";

        tbNhaCungCap_filterValues.search31 = "";
        tbNhaCungCap_filterValues.search32 = "";
        tbNhaCungCap_filterValues.search33 = "";
        tbNhaCungCap_filterValues.search34 = "";
        tbNhaCungCap_filterValues.search35 = "";
        tbNhaCungCap_filterValues.search36 = "";
        tbNhaCungCap_filterValues.search37 = "";
        tbNhaCungCap_filterValues.search38 = "";
        tbNhaCungCap_filterValues.search39 = "";
        tbNhaCungCap_filterValues.search40 = "";

        tbNhaCungCap_filterValues.search41 = "";
        tbNhaCungCap_filterValues.search42 = "";
        tbNhaCungCap_filterValues.search43 = "";
        tbNhaCungCap_filterValues.search44 = "";
        tbNhaCungCap_filterValues.search45 = "";
        tbNhaCungCap_filterValues.search46 = "";

        $.ajax({
            url: '/KhachHang/LoadNhaCungCap',
            method: 'GET',
            data: tbNhaCungCap_filterValues,
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
                    if (tbNhaCungCap_filterValues.draw != 1) {
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
                    dsNCC = $.map(msg.data, function (obj) {
                        obj.id = obj.KHID;
                        obj.text = obj.KHTEN;
                        obj.hasSelected = false;
                        return obj
                    });
                    slNCCMatHang.select2({
                        data: dsNCC,
                        dropdownParent: $('#them-mat-hang')
                    });
                }
            },
        });
    };

    //Database Mặt hàng
    let tbMatHang_filterValues = {};
    var tbMatHang = $('#table-mathang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbMatHang_filterValues.draw = data.draw;
            tbMatHang_filterValues.search = data.search["value"];
            tbMatHang_filterValues.start = data.start;
            tbMatHang_filterValues.length = data.length;
            tbMatHang_filterValues.order = data.order[0].column;
            tbMatHang_filterValues.dir = data.order[0].dir;

            tbMatHang_filterValues.search1 = $('input[data-index=1]').val();
            tbMatHang_filterValues.search2 = $('input[data-index=2]').val();
            tbMatHang_filterValues.search3 = $('input[data-index=3]').val();
            tbMatHang_filterValues.search4 = $('input[data-index=4]').val();
            tbMatHang_filterValues.search5 = $('input[data-index=5]').val();
            tbMatHang_filterValues.search6 = $('input[data-index=6]').val();
            tbMatHang_filterValues.search7 = $('input[data-index=7]').val();
            tbMatHang_filterValues.search8 = $('input[data-index=8]').val();
            tbMatHang_filterValues.search9 = $('input[data-index=9]').val();
            tbMatHang_filterValues.search10 = $('input[data-index=10]').val();
            tbMatHang_filterValues.search11 = $('input[data-index=11]').val();
            tbMatHang_filterValues.search12 = $('input[data-index=12]').val();
            tbMatHang_filterValues.search13 = $('input[data-index=13]').val();
            $.ajax({
                url: '/MatHang/LoadMatHang',
                method: 'GET',
                data: tbMatHang_filterValues,
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
                        if (tbMatHang_filterValues.draw != 1) {
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
            $(nRow).attr('data-id', data.MHID);
            let giaNhap = data.GIANHAPLANCUOI == null ? 0 : data.GIANHAPLANCUOI;
            let giaBanLe = data.GIABANLE == null ? 0 : data.GIABANLE;
            let giaBanBuon = data.GIABANBUON == null ? 0 : data.GIABANBUON;
            let giaBan3 = data.GIABAN3 == null ? 0 : data.GIABAN3;
            let giaBan4 = data.GIABAN4 == null ? 0 : data.GIABAN4;
            let giaBan5 = data.GIABAN5 == null ? 0 : data.GIABAN5;
            let giaBan6 = data.GIABAN6 == null ? 0 : data.GIABAN6;
            let giaBan7 = data.GIABAN7 == null ? 0 : data.GIABAN7;
            $($(nRow).children()[6]).html(convertCurrency(giaNhap));
            $($(nRow).children()[7]).html(convertCurrency(giaBanLe));
            $($(nRow).children()[8]).html(convertCurrency(giaBanBuon));
            $($(nRow).children()[9]).html(convertCurrency(giaBan3));
            $($(nRow).children()[10]).html(convertCurrency(giaBan4));
            $($(nRow).children()[11]).html(convertCurrency(giaBan5));
            $($(nRow).children()[12]).html(convertCurrency(giaBan6));
            $($(nRow).children()[13]).html(convertCurrency(giaBan7));
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
                var tongGiaNhap = Math.round(data[0].TONGGIANHAP);
                var tongGiaBanLe = Math.round(data[0].TONGGIABANLE);
                var tongGiaBanBuon = Math.round(data[0].TONGGIABANBUON);
                var tongGiaBan3 = Math.round(data[0].TONGGIABAN3);
                var tongGiaBan4 = Math.round(data[0].TONGGIABAN4);
                var tongGiaBan5 = Math.round(data[0].TONGGIABAN5);
                var tongGiaBan6 = Math.round(data[0].TONGGIABAN6);
                var tongGiaBan7 = Math.round(data[0].TONGGIABAN7);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(6).footer()).html(tongGiaNhap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(7).footer()).html(tongGiaBanLe.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(8).footer()).html(tongGiaBanBuon.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(9).footer()).html(tongGiaBan3.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(10).footer()).html(tongGiaBan4.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(11).footer()).html(tongGiaBan5.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(12).footer()).html(tongGiaBan6.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(13).footer()).html(tongGiaBan7.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(6).footer()).html(0).addClass('text-right');
                $(api.column(7).footer()).html(0).addClass('text-right');
                $(api.column(8).footer()).html(0).addClass('text-right');
                $(api.column(9).footer()).html(0).addClass('text-right');
                $(api.column(10).footer()).html(0).addClass('text-right');
                $(api.column(11).footer()).html(0).addClass('text-right');
                $(api.column(12).footer()).html(0).addClass('text-right');
                $(api.column(13).footer()).html(0).addClass('text-right');
            }

        },
        columns: [
            {
                "data": null,

            },
            {
                "data": "MHCODE",
                render: function (data, type, meta) {
                    if (meta.LINKIMAGE == "") {
                        return '<a href ="#">' + data + '</a>';
                    }
                    else {
                        return '<a href =' + meta.LINKIMAGE + ' target="_blank">' + data + '</a>';
                    }
                }
            },
            { "data": "MHTEN" },
            { "data": "DONVI" },
            { "data": "Alias" },
            { "data": "KHTEN" },
            { "data": "GIANHAPLANCUOI", "className": "text-right" },
            { "data": "GIABANLE", "className": "text-right" },
            { "data": "GIABANBUON", "className": "text-right" },
            { "data": "GIABAN3", "className": "text-right" },
            { "data": "GIABAN4", "className": "text-right" },
            { "data": "GIABAN5", "className": "text-right" },
            { "data": "GIABAN6", "className": "text-right" },
            { "data": "GIABAN7", "className": "text-right" },
            { "data": "PATH" },
            { "data": "NgayTaoString" },
            { "data": "NgayCapNhatString" }
        ],
        "order": [[1, "asc"]],
        columnDefs: [
            {
                "targets": [0, 3, 4],
                "orderable": false
            }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: true,
        pageLength: 10,
        lengthChange: false,
        "dom": 'lrtip',
        orderCellsTop: true
    });

    $(tbMatHang.table().container()).on('keyup', 'thead input', delay(function (e) {
        let i = $(this).attr('data-index');
        if ($(this).is(':focus')) {
            tbMatHang.draw();
        }
    }, 1000));

    //Click
    $('#table-mathang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-mathang tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-mathang tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-mathang tbody tr').not(this).removeClass('selected');
        LoadMatHang();
        CheckUpdateMatHang();
        $('#them-mat-hang').removeClass('was-validated');
        $('#them-mat-hang').modal();
    });

    //Insert
    $('#btn-insert-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckInsertMatHang',
            success: function (msg) {
                if (msg.rs) {
                    $('#btn-save-mat-hang').removeAttr('disabled');

                    $('#them-mat-hang input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-mat-hang textarea').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-mat-hang input[type = "checkbox"]').prop('checked', true);
                    //slNCCMatHang.val(0).trigger('change');
                    InBarCode(null);
                    const ID = $('#jstree').jstree('get_selected')[0];
                    if (ckstring(ID)) {
                        toast.create({
                            title: 'Thông báo!',
                            text: 'Vui lòng chọn nhóm hàng!',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 2500
                        });
                        return;
                    }
                    else {
                        CreateCode(ID).then((rs) => {
                            if (rs != undefined) {
                                codeMatHang.val(rs.code);
                                InBarCode(rs.code);
                            }
                        })
                        $('#them-mat-hang').removeClass('was-validated');
                        $('#them-mat-hang').modal();
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

    //Update
    $('#btn-update-mat-hang').on('click', function () {
        LoadMatHang();
        CheckUpdateMatHang();
    });

    //Delete
    $('#btn-delete-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckDeleteMatHang',
            success: function (msg) {
                if (msg.rs) {
                    if ($('#table-mathang tbody tr.selected').attr('data-id') != undefined) {
                        let idMatHang = $('#table-mathang tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa mặt hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/MatHang/DeleteMatHang?id=' + idMatHang,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbMatHang.ajax.reload();
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
                            text: 'Vui lòng chọn mặt hàng',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        })
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

    //Save
    $('#btn-save-mat-hang').on('click', function () {
        let $currentForm = $('#them-mat-hang');
        let inputs = $($currentForm).find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');

        if (ckstring(codeMatHang.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập mã hàng!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            codeMatHang.focus();
            return;
        }
        if (ckstring(tenMatHang.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập tên mặt hàng!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            tenMatHang.focus();
            return;
        }
        let giaSi = `1-${soLuong1.val()}-${giaBan1.val()}|2-${soLuong2.val()}-${giaBan2.val()}|3-${soLuong3.val()}-${giaBan3.val()}|4-${soLuong4.val()}-${giaBan4.val()}|5-${soLuong5.val()}-${giaBan5.val()}|6-${soLuong6.val()}-${giaBan6.val()}|7-${soLuong7.val()}-${giaBan7.val()}`;
        giaSi = giaSi.replace(/\./g, '');
        let data = new FormData();
        data.append("MHID", idMatHang.val());
        data.append("MHCODE", codeMatHang.val());
        data.append("MHLID", $('#jstree').jstree('get_selected')[0]);
        data.append("MHTEN", tenMatHang.val());
        data.append("DONVI", slDonViTinh.find('option:selected').text());
        data.append("CAUHINH", moTaMatHang.val());
        data.append("HASDETAIL", hasDetailMatHang.prop('checked'));
        data.append("GHICHU", ghiChuMatHang.val())
        data.append("THEODOI", theoDoiMatHang.prop('checked'));
        data.append("MHBHID", slBaoHanh.find('option:selected').val());
        data.append("MATCHCODE", aliasMatHang.val());
        data.append("LINKIMAGE", linkMatHang.val());
        let MHTID = slLoaiMatHang.find('option:selected').val();
        MHTID = MHTID == undefined ? "" : MHTID;
        data.append("MHTID", MHTID);
        //data.append("MHTID", slLoaiMatHang.find('option:selected').val());

        data.append("UNITID", slDonViTinh.find('option:selected').val());
        data.append("GIANHAP1", giaNhap1.val());
        data.append("GIANHAP2", giaNhap2.val());
        data.append("GIANHAP3", giaNhap3.val());
        data.append("GIABAN1", giaBan1.val());
        data.append("GIABAN2", giaBan2.val());
        data.append("GIABAN3", giaBan3.val());
        data.append("GIABAN4", giaBan4.val());
        data.append("GIABAN5", giaBan5.val());
        data.append("GIABAN6", giaBan6.val());
        data.append("GIABAN7", giaBan7.val());
        data.append("SLTONMAX", soLuongMaxMatHang.val());
        data.append("SLTONMIN", soLuongMinMatHang.val());
        data.append("NCC1", NCC1.find('option:selected').val());
        data.append("NCC2", NCC2.find('option:selected').val());
        data.append("NCC3", NCC3.find('option:selected').val());
        data.append("GIASI", giaSi);

        $.ajax({
            async: false,
            type: 'POST',
            url: '/MatHang/InsertUpdateMatHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbMatHang.ajax.reload();
                    $('#them-mat-hang').modal('hide');
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

    //Xử lý nút ghi
    $('#btn-save-mat-a').click(function () {
        let id = $('#table-mat-hang tbody tr.selected').attr('data-id'); //ID để update
        let idDM = $('#jstree').jstree('get_selected')[0]; //ID nhóm hàng

        let url = "/MatHang/InsertUpdate";
        if (ckstring(mhCode.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập mã hàng!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            mhCode.focus();
            return;
        }
        if (ckstring(mhTen.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập tên mặt hàng!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            mhTen.focus();
            return;
        }

        let data = new FormData();
        data.append("MHID", id);
        data.append("MHLID", idDM);

        data.append("MHCODE", mhCode.val());
        data.append("HASDETAIL", hasDetail.prop('checked'));
        data.append("MHTEN", mhTen.val());
        data.append("MATCHCODE", matchCode.val());
        data.append("UNITID", unitID.val());
        data.append("MHBHID", mhBHID.val());
        data.append("CAUHINH", cauHinh.val());

        data.append("GHICHU", ghiChu.val());
        data.append("MHTID", mhTID.val());
        data.append("KHID", khID.val());
        //data.append("KHID", "");
        data.append("GIANHAPLANCUOI", giaNhap.val());
        data.append("GIABANLE", giaBanLe.val());
        data.append("GIABANBUON", giaBanBuon.val());
        data.append("THUE", thue.val());
        data.append("NGUONGNHAP", nguongNhap.val());
        data.append("NGUONGXUAT", nguongXuat.val());
        data.append("THEODOI", theoDoi.prop('checked'));
        $.ajax({
            async: false,
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbMatHang.ajax.reload();
                    $('#them-mat-hang').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                }
                else {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    });

    //Click node tree
    $('#jstree').on('activate_node.jstree', function (e, data) {
        var path = data.instance.get_path(data.node, '\\');
        $('#title-mathang').text(path);
        tbMatHang_filterValues.mhlid = $('#jstree').jstree('get_selected')[0] == 1 ? 0 : $('#jstree').jstree('get_selected')[0];
        if ($('#jstree').jstree('get_selected')[0] == 1) {
            $('#btn-insert-mat-hang').addClass('disabled')
        }
        else {
            $('#btn-insert-mat-hang').removeClass('disabled');
        }
        tbMatHang.columns.adjust().draw();
    });

    //Reset
    $('#btn-reset-mat-hang').on('click', function () {
        tbMatHang_filterValues.mhlid = 0;
        tbMatHang.ajax.reload();
    });

    //Print
    $('#btn-print-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckPrintMatHang',
            success: function (res) {
                if (res.rs) {
                    //tbMatHang.buttons('.buttons-print').trigger();
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

    //Excel
    $('#btn-export-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckExcelMatHang',
            success: function (res) {
                if (res.rs) {
                    link = "/MatHang/MatHangExport?" + serialize(tbMatHang_filterValues) + ``;
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

    //#region BarCode
    codeMatHang.on('change', function () {
        InBarCode($(this).val());
    });

    //In barCode
    function InBarCode(value) {
        $("#barCodeMatHang").barcode(
            value,
            "code128"
        );
    }
    //#endregion

    //Function Load mặt hàng
    function LoadMatHang() {
        let id = $('#table-mathang tbody tr.selected').attr('data-id');
        if (id != undefined) {
            LoadChiTietMatHang(id).then((rs) => {
                idMatHang.val(rs.data[0].MHID);
                codeMatHang.val(rs.data[0].MHCODE);
                hasDetailMatHang.prop('checked', rs.data[0].HASDETAIL)
                tenMatHang.val(rs.data[0].MHTEN);
                aliasMatHang.val(rs.data[0].MATCHCODE);
                slDonViTinh.val(rs.data[0].UNITID).trigger('change');
                slBaoHanh.val(rs.data[0].MHBHID).trigger('change');
                moTaMatHang.val(rs.data[0].CAUHINH);
                ghiChuMatHang.val(rs.data[0].GHICHU);
                slLoaiMatHang.val(rs.data[0].MHTID)/*.trigger('change');*/
                InBarCode(rs.data[0].MHCODE);
                linkMatHang.val(rs.data[0].LINKIMAGE);
                //giaNhap1.val(rs.data[0].GIANHAPLANCUOI);
                if (rs.data[0].KHID != '00000000-0000-0000-0000-000000000000' || rs.data[0].NCC1 != null) {
                    NCC1.val(rs.data[0].KHID).trigger('change');
                }
                else {
                    NCC1.val(0).trigger('change');
                }


                if (rs.data[0].NCC2 == '00000000-0000-0000-0000-000000000000' || rs.data[0].NCC2 == null) {
                    NCC2.val(0).trigger('change');
                }
                else {
                    NCC2.val(rs.data[0].NCC2).trigger('change');
                }

                if (rs.data[0].NCC3 == '00000000-0000-0000-0000-000000000000' || rs.data[0].NCC3 == null) {
                    NCC3.val(0).trigger('change');
                }
                else {
                    NCC3.val(rs.data[0].NCC3).trigger('change');
                }
                giaNhap1.val(convertCurrency(rs.data[0].GIANHAPLANCUOI));
                giaNhap2.val(convertCurrency(rs.data[0].GIANHAP2));
                giaNhap3.val(convertCurrency(rs.data[0].GIANHAP3));

                giaBan1.val(convertCurrency(rs.data[0].GIABANLE));
                giaBan2.val(convertCurrency(rs.data[0].GIABANBUON));
                giaBan3.val(convertCurrency(rs.data[0].GIABAN3));
                giaBan4.val(convertCurrency(rs.data[0].GIABAN4));
                giaBan5.val(convertCurrency(rs.data[0].GIABAN5));
                giaBan6.val(convertCurrency(rs.data[0].GIABAN6));
                giaBan7.val(convertCurrency(rs.data[0].GIABAN7));

                //giaBanLeMatHang.val(rs.data.GIABANLE);
                //giaBanBuonMatHang.val(rs.data.GIABANBUON);
                //thueMatHang.val(rs.data.THUE);
                soLuongMaxMatHang.val(rs.data[0].NGUONGNHAP);
                soLuongMinMatHang.val(rs.data[0].NGUONGXUAT);

                theoDoiMatHang.prop('checked', rs.data.THEODOI);

                let giaSi = rs.data[0].GiaSi?.split('|');
                soLuong1.val(convertCurrency(giaSi[0]?.split('-')[1] || ''));
                soLuong2.val(convertCurrency(giaSi[1]?.split('-')[1] || ''));
                soLuong3.val(convertCurrency(giaSi[2]?.split('-')[1] || ''));
                soLuong4.val(convertCurrency(giaSi[3]?.split('-')[1] || ''));
                soLuong5.val(convertCurrency(giaSi[4]?.split('-')[1] || ''));
                soLuong6.val(convertCurrency(giaSi[5]?.split('-')[1] || ''));
                soLuong7.val(convertCurrency(giaSi[6]?.split('-')[1] || ''));

                $('#them-mat-hang').removeClass('was-validated');
                $('#them-mat-hang').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    }

    //Function Load chi tiết mặt hàng
    async function LoadChiTietMatHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MatHang/LoadChiTietMatHang?id=' + id,
            success: function (msg) {
                return msg.data;
            }
        })
    }

    //Function kiểm tra mặt hàng
    function CheckUpdateMatHang() {
        return $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckUpdateMatHang',
            success: function (msg) {
                if (msg.rs) {
                    $('#btn-save-mat-hang').removeAttr('disabled');
                }
                else {
                    $('#btn-save-mat-hang').attr('disabled', 'disabled');
                }
            }
        });
    }

    //Function tạo code tự động
    async function CreateCode(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MatHang/CreateCodeMatHang?id=' + id,
            success: function (rs) {
                return rs;
            },
        });
    };
    //#endregion

    //#region Đơn vị
    $('#btn-don-vi').on('click', function () {
        $('#don-vi-tinh').modal();
    });

    let idDonVi = $('#them-dvt input[name="idDonVi"]');
    let tenDonVi = $('#them-dvt input[name="tenDonVi"]');
    let moTaDonVi = $('#them-dvt input[name="moTaDonVi"]');

    //Database Đơn vị
    let tbDonVi_filterValues = {};
    let dsDV = [];
    var tbDonVi = $('#table-donvi').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbDonVi_filterValues.draw = data.draw;
            tbDonVi_filterValues.search = data.search["value"];
            tbDonVi_filterValues.start = data.start;
            tbDonVi_filterValues.length = data.length;
            tbDonVi_filterValues.order = data.order[0].column;
            tbDonVi_filterValues.dir = data.order[0].dir;
            tbDonVi_filterValues.export = 0;
            $.ajax({
                url: '/MatHang/LoadDonVi',
                method: 'GET',
                data: tbDonVi_filterValues,
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
                        if (tbDonVi_filterValues.draw != 1) {
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
                    else {
                        dsDV = $.map(msg.data, function (obj) {
                            obj.id = obj.ID;
                            obj.text = obj.TEN;
                            return obj
                        });
                        slDonViTinh.select2({
                            data: dsDV,
                            dropdownParent: $('#them-mat-hang'),
                        });
                    }
                },
            }).done(callback, () => {
                $('select[name="slDonViTinh"]').val('12').trigger('change.select2');
            });
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "TEN" },
            { "data": "GHICHU" }
        ],

        scrollX: true,
        scrollResize: false,
        scrollY: 500,
        scrollCollapse: true,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 1
        },

        searching: true,
        paging: true,
        lengthChange: false
    });

    //Click
    $('#table-donvi tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-donvi tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-donvi tbody').on('dblclick', 'tr', function () {
        tbDonVi.ajax.reload();
        $('#don-vi-tinh').modal('hide');
        let idDVT = $(this).attr('data-id');
        slDonViTinh.find('option[value = "' + idDVT + '"]').prop('selected', true);
    });

    ////Thêm
    $('#btn-insert-don-vi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckInsertDonVi',
            success: function (res) {
                if (res.rs) {
                    $('#them-dvt input').each(function (index, e) {
                        $(e).val('');
                    });
                    $('#them-dvt').modal();
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

    //Cập nhật
    $('#btn-update-don-vi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckUpdateDonVi',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-donvi tbody tr.selected').attr('data-id') != undefined) {
                        LoadChiTietDonVi($('#table-donvi tbody tr.selected').attr('data-id')).then((rs) => {
                            idDonVi.val(rs.data.ID);
                            tenDonVi.val(rs.data.TEN);
                            moTaDonVi.val(rs.data.GHICHU);

                            $('#them-dvt').removeClass('was-validated');
                            $('#them-dvt').modal();
                        });
                    }
                    else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn đơn vị',
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
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

    ////Xóa
    $('#btn-delete-don-vi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckDeleteDonVi',
            success: function (res) {
                if (res.rs) {
                    if ($('#table-donvi tbody tr.selected').attr('data-id') != undefined) {
                        let idDonVi = $('#table-donvi tbody tr.selected').attr('data-id');
                        if (confirm('Bạn có muốn xóa mặt hàng này?')) {
                            $.ajax({
                                async: true,
                                method: 'GET',
                                url: '/MatHang/DeleteDonVi?id=' + idDonVi,
                                success: function (msg) {
                                    if (msg.rs) {
                                        tbDonVi.ajax.reload();
                                        toast.create({
                                            title: 'Notification!',
                                            text: 'Thành công',
                                            icon: 'check',
                                            classBackground: 'noti-success',
                                            timeout: 3000
                                        });
                                        //slKenhKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                                        //    $(this).remove();
                                        //});
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
                            text: 'Vui lòng chọn kênh khách hàng',
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

    ////Nạp
    $('#btn-reset-don-vi').on('click', function () {
        tbDonVi.draw();
    });

    ////Xuất (Excel)
    $('#btn-export-don-vi').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/MatHang/CheckExcelMatHang',
            success: function (res) {
                if (res.rs) {
                    var filterReport = {};
                    filterReport.draw = tbDonVi_filterValues.draw;
                    filterReport.search = tbDonVi_filterValues.search;
                    filterReport.start = tbDonVi_filterValues.start;
                    filterReport.length = tbDonVi_filterValues.length;
                    filterReport.order = tbDonVi_filterValues.order;
                    filterReport.dir = tbDonVi_filterValues.dir;
                    filterReport.export = 1;
                    var link = `/MatHang/LoadDonVi?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir + `&export=` + filterReport.export;
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

    ////Lưu
    $('#btn-save-don-vi').on('click', function () {
        if (ckstring(tenDonVi.val())) {
            toast.create({
                title: 'Thông báo!',
                text: 'Vui lòng nhập tên đơn vị!',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 2500
            });
            tenDonVi.focus();
            return;
        }

        let $currentForm = $('#them-dvt');
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
        data.append('idDonVi', idDonVi.val());
        data.append('tenDonVi', tenDonVi.val());
        data.append('ghiChuDonVi', moTaDonVi.val());

        $.ajax({
            async: false,
            type: 'POST',
            url: '/MatHang/InsertUpdateDonVi',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbDonVi.ajax.reload();
                    $('#them-dvt').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    //var vlkenh = [];
                    //slKenhKhachHang.find('option').each(function () {
                    //    vlkenh.push($(this).val());
                    //});

                    //if (jQuery.isArray(msg.id, vlkenh) > -1) {
                    //    slKenhKhachHang.find('option[value = "' + msg.id + '"]').each(function () {
                    //        $(this).remove();
                    //    });
                    //    slKenhKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
                    //}
                    //else {
                    //    slKenhKhachHang.append($("<option></option>").val(msg.id).html(msg.ten));
                    //}
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

    //Funciotn Load chi tiết khách hàng
    async function LoadChiTietDonVi(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/MatHang/LoadChiTietDonVi?id=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    };
    //#endregion

    //Function kiểu tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //Function kiểm tra giá trị null
    function ckstring(str) { //check null empty
        return (!str || /^\s*$/.test(str));
    }

    $('#don-vi-tinh').on('shown.bs.modal', function () {
        tbDonVi.draw();
    });
    $('#danh-sach-mat-hang').on('shown.bs.modal', function () {
        tbMatHang.draw();
    });
});

function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
