
$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });

$(document).ready(function () {
    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    //#Reion chon khach hang va nhan vien
    $('#button-danh-sach-nv').on('click', function () {
        $('#table-nv tbody').unbind('dblclick');
        $('#table-nv tbody').on('dblclick', 'tr', function () {
            if ($('#them-khach-hang').hasClass('show') == false && $('#them-order').hasClass('show') == true) {
                let NVID = $(this).find('td').eq(1).closest('tr').attr('data-id')
                $('#them-order select[name="txt-edit-manv"]').val(NVID);
                $('#them-order select[name="txt-edit-manv"]').trigger('change.select2');
                $('#them-order select[name="txt-edit-tennv"]').val(NVID);
                $('#them-order select[name="txt-edit-tennv"]').trigger('change.select2');
            }
            $('#danh-sach-nv').modal('hide');
        });
    });

    $('#button-danh-sach-khach-hang').on('click', function () {
        $('#table-khachhang tbody').unbind('dblclick');
        $('#table-khachhang tbody').on('dblclick', 'tr', function () {

            let KHID = $(this).find('td').eq(1).closest('tr').attr('data-id')
            $('#them-order select[name="txt-edit-kh"]').val(KHID);
            $('#them-order select[name="txt-edit-kh"]').trigger('change.select2');
            $('#them-order select[name="txt-edit-tenkh"]').val(KHID);
            $('#them-order select[name="txt-edit-tenkh"]').trigger('change.select2');
            $('#danh-sach-khach-hang').modal('hide');
            var countdata = tbCTP.data().count();
            if (countdata > 0) {
                DoiGiaMHTheoCap();
            }
        })
    });
    //end

    //Trigger Change Nha cung cap
    $('select[name="txt-edit-kh-so"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-tenkh-so"]').val(makh).trigger('change.select2');
    })

    $('select[name="txt-edit-tenkh-so"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-kh-so"]').val(makh).trigger('change.select2');
    })
    //end

    //Trigger Change Khach Hang va Doi gia theo cap KH
    $('select[name="txt-edit-kh"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-tenkh"]').val(makh).trigger('change.select2');
        var countdata = tbCTP.data().count();
        if (countdata > 0) {
            DoiGiaMHTheoCap();
        }
    })

    $('select[name="txt-edit-tenkh"]').change(function () {
        var makh = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-kh"]').val(makh).trigger('change.select2');
        var countdata = tbCTP.data().count();
        if (countdata > 0) {
            DoiGiaMHTheoCap();
        }
    })
    //end

    //Trigger Change Nhan Vien
    $('select[name="txt-edit-manv"]').change(function () {
        var manv = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-tennv"]').val(manv).trigger('change.select2');
    })

    $('select[name="txt-edit-tennv"]').change(function () {
        var manv = $(this).select2('data')[0].id;
        $('#them-order select[name="txt-edit-manv"]').val(manv).trigger('change.select2');
    })
    //end

    function DoiGiaMHTheoCap() {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var makh = $('#them-order select[name="txt-edit-kh"]').select2('data')[0].text;
        var tenkh = $('#them-order select[name="txt-edit-tenkh"]').select2('data')[0].text;
        let formdata = new FormData();
        formdata.append('makh', makh);
        formdata.append('tenkh', tenkh);
        formdata.append('objmathang', JSON.stringify(objmathang));
        $.ajax({
            type: 'POST',
            url: '/BanHang/DoiGiaMatHangTheoCapKH',
            data: formdata,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else {
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/\./g, '') :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for (var key in objmathang) {
                        for (var key2 in res.data) {
                            if (objmathang[key].MHID == res.data[key2].MHID) {
                                objmathang[key].DONGIA = res.data[key2].DonGia;
                                var ThanhTien = intVal(objmathang[key].SOLUONG) * intVal(objmathang[key].DONGIA);
                                ThanhTien = ThanhTien - (ThanhTien * parseFloat(objmathang[key].TILECHIETKHAU) / 100);
                                ThanhTien = ThanhTien + (ThanhTien * parseFloat(objmathang[key].TILETHUE) / 100);
                                objmathang[key].THANHTIEN = ThanhTien;
                                if (objmathang[key].status == 1) {
                                    objmathang[key].status = 2;
                                }
                                break;
                            }
                        }
                    }
                    tbCTP.clear();
                    tbCTP.rows.add(objmathang);
                    tbCTP.columns.adjust().draw();
                }
            }
        })
    }

    //Search Header Bang Hang
    $('#table-don-dat-hang thead tr').clone(true).appendTo('#table-don-dat-hang thead');
    $('#table-don-dat-hang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        //if (i == 3) {
        //    var $select = $("<select id='filter-header-khomh'> <option value =\" 1 \">Chọn Kho </option></select>", {
        //    });
        //    LoadKho().then((e) => {
        //        e.data.map((value) => {
        //            var $option = $("<option></option>", {
        //                "text": value.KHOCODE,
        //                "value": value.KHOID
        //            });
        //            $select.append($option);
        //        })
        //    })
        //    return $(this).html($select);
        //}
        if (i == 4 || i == 5 || i == 15) {
            $(this).html('<input class="datepicker datetimepicker date-only" id="txt-dsbh-header-' + i + '" placeholder="Search ' + title + '" />');
            InitDatetime();
        }
        else if (i == 2) {
            $(this).html('<select id="txt-dsbh-header-' + i + '"><option value ="2">Tất cả</option> <option value ="1">Đã chuyển</option> <option value ="0">Chưa chuyển</option> </select>');
        }
        else if (i == 13) {
            $(this).html('<select id="txt-dsbh-header-' + i + '"><option value ="2">Tất cả</option> <option value ="1">Đã duyệt</option> <option value ="0">Chưa duyệt</option> </select>');
        }
        else if (i != 0 && i != 1) {
            $(this).html('<input type="text"  id="txt-dsbh-header-' + i + '" placeholder="Search ' + title + '" />');
        }
        else {
            $(this).html('');
        }
        //$('#filter-header-khomh').on('change', function () {
        //    let id = $(this).val();
        //    if (id != 1) {
        //        var result = objmathang.filter(word => word.KHOID == id);
        //        tbCTP.clear();
        //        tbCTP.rows.add(result);
        //        tbCTP.columns.adjust().draw();
        //    } else {
        //        tbCTP.clear();
        //        tbCTP.rows.add(objmathang);
        //        tbCTP.columns.adjust().draw();
        //    }
        //});
        $('input', this).on('keyup change', delay(function () {
            if (tbBanHang.column(i).search() !== this.value) {
                tbBanHang_filterValues.search3 = $('#txt-dsbh-header-3').val();
                tbBanHang_filterValues.search4 = $('#txt-dsbh-header-4').val();
                tbBanHang_filterValues.search5 = $('#txt-dsbh-header-5').val();
                tbBanHang_filterValues.search6 = $('#txt-dsbh-header-6').val();
                tbBanHang_filterValues.search7 = $('#txt-dsbh-header-7').val();
                tbBanHang_filterValues.search8 = $('#txt-dsbh-header-8').val();
                tbBanHang_filterValues.search9 = $('#txt-dsbh-header-9').val().replace(/\./g, "");
                tbBanHang_filterValues.search10 = $('#txt-dsbh-header-10').val();
                tbBanHang_filterValues.search11 = $('#txt-dsbh-header-11').val();
                tbBanHang_filterValues.search12 = $('#txt-dsbh-header-12').val();
                tbBanHang_filterValues.search13 = $('#txt-dsbh-header-13').val();
                tbBanHang_filterValues.search14 = $('#txt-dsbh-header-14').val();
                tbBanHang_filterValues.search15 = $('#txt-dsbh-header-15').val();
                tbBanHang_filterValues.search16 = $('#txt-dsbh-header-16').val();
                tbBanHang_filterValues.search17 = $('#txt-dsbh-header-17').val();
                tbBanHang
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end


    var MATHANGJSON = null;
    var objKHOMH = [];
    var DELETEMATHANGJSON = null;
    var objMatHangDELETE = [];
    let tongtienhang = 0;
    let tongchietkhau = 0;
    let tongthue = 0;
    //#Region Load Ban Hang
    let tbBanHang_filterValues = {};
    var tbBanHang = $('#table-don-dat-hang').DataTable({
        orderCellsTop: true,
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (data.draw > 1) {
                tbBanHang_filterValues.draw = data.draw;
                tbBanHang_filterValues.search = data.search["value"];
                tbBanHang_filterValues.start = data.start;
                tbBanHang_filterValues.length = data.length;
                tbBanHang_filterValues.order = data.order[0].column;
                tbBanHang_filterValues.dir = data.order[0].dir;
            }
            else {
                tbBanHang_filterValues.draw = data.draw;
                tbBanHang_filterValues.search = data.search["value"];
                tbBanHang_filterValues.start = data.start;
                tbBanHang_filterValues.length = data.length;
                tbBanHang_filterValues.order = data.order[0].column;
                tbBanHang_filterValues.dir = data.order[0].dir;
                tbBanHang_filterValues.status = $('select[name="sl-status"]').val();
                tbBanHang_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
                tbBanHang_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
                tbBanHang_filterValues.search2 = $('#txt-dsbh-header-2').val();
                tbBanHang_filterValues.search3 = $('#txt-dsbh-header-3').val();
                tbBanHang_filterValues.search4 = $('#txt-dsbh-header-4').val();
                tbBanHang_filterValues.search5 = $('#txt-dsbh-header-5').val();
                tbBanHang_filterValues.search6 = $('#txt-dsbh-header-6').val();
                tbBanHang_filterValues.search7 = $('#txt-dsbh-header-7').val();
                tbBanHang_filterValues.search8 = $('#txt-dsbh-header-8').val();
                tbBanHang_filterValues.search9 = $('#txt-dsbh-header-9').val().replace(/\./g, "");
                tbBanHang_filterValues.search10 = $('#txt-dsbh-header-10').val();
                tbBanHang_filterValues.search11 = $('#txt-dsbh-header-11').val();
                tbBanHang_filterValues.search12 = $('#txt-dsbh-header-12').val();
                tbBanHang_filterValues.search13 = $('#txt-dsbh-header-13').val();
                tbBanHang_filterValues.search14 = $('#txt-dsbh-header-14').val();
                tbBanHang_filterValues.search15 = $('#txt-dsbh-header-15').val();
                tbBanHang_filterValues.search16 = $('#txt-dsbh-header-16').val();
                tbBanHang_filterValues.search17 = $('#txt-dsbh-header-17').val();
                console.log(tbBanHang_filterValues);
            }
            $.ajax({
                url: '/BanHang/BanHangData',
                method: 'GET',
                data: tbBanHang_filterValues,
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
                        if (tbBanHang_filterValues.draw != 1) {
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
            });
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
                data: "SHIPPED"
            },
            { data: "MDCODE" },
            { data: "NGAYHDString" },
            { data: "SUBMITEDDATEString" },
            { data: "KHTEN", },
            { data: "DIENTHOAI" },
            { data: "NVTEN" },
            {
                data: "TONGTIEN",
                render: function (data, type, full, meta) {
                    var TONGTIEN = Math.round(data);
                    return TONGTIEN.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            //{ data: "HANTHANHTOANString" },
            { data: "DIENGIAI" },
            { data: "LyDo" },
            { data: "USERID" },
            { data: "Duyet" },
            { data: "APPROVEDBY" },
            { data: "EXPECTEDDATEString" },
            { data: "TENSR1" },
            { data: "TENSR2" },
            {
                data: "TotalRow",
                visible: false
            },
            {
                data: "TONGTIENALL",
                visible: false
            }
        ],
        columnDefs: [
            {
                "targets": [1, 2, 7, 10, 11, 12, 13, 14, 16, 17],
                "orderable": false
            },
            {
                "targets": 1,
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
                "targets": 13,
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
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(9).footer()).html(Math.round(data[0].TONGTIENALL).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                $(api.column(0).footer()).html(0);
                $(api.column(9).footer()).html(0);
            }

        }
    });
    //end
    $(tbBanHang.table().container()).on('change', 'thead select', function () {
        tbBanHang_filterValues.search2 = $('#txt-dsbh-header-2').val();
        tbBanHang_filterValues.search13 = $('#txt-dsbh-header-13').val();
        tbBanHang.draw();
    });

    //Search Header Bang Hang
    $('#table-dieu-phoi-don-hang-bh thead tr').clone(true).appendTo('#table-dieu-phoi-don-hang-bh thead');
    $('#table-dieu-phoi-don-hang-bh thead tr:eq(1) th').each(function (i) {
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
            if (tbBanHangDP.column(i).search() !== this.value) {
                tbBanHangDP_filterValues.sophieu = $('#txt-dsdp-header-3').val();
                tbBanHangDP_filterValues.tenkhachhang = $('#txt-dsdp-header-6').val();
                tbBanHangDP_filterValues.makhachhang = $('#txt-dsdp-header-7').val();
                tbBanHangDP_filterValues.tennhanvien = $('#txt-dsdp-header-9').val();
                tbBanHangDP_filterValues.ghichu = $('#txt-dsdp-header-10').val();
                tbBanHangDP_filterValues.nguoitao = $('#txt-dsdp-header-11').val();
                tbBanHangDP_filterValues.ngaynhanhang = $('#txt-dsdp-header-14').val();
                tbBanHangDP_filterValues.guitu = $('#txt-dsdp-header-15').val();
                tbBanHangDP_filterValues.guiden = $('#txt-dsdp-header-16').val();
                tbBanHangDP_filterValues.mahang = $('#txt-dsdp-header-17').val();
                tbBanHangDP_filterValues.tenhang = $('#txt-dsdp-header-18').val();
                tbBanHangDP
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        }, 1000));

    });

    //end
    //#Region Load Dieu Phoi Ban Hang
    let tbBanHangDP_filterValues = {};
    var BHDPSHOW = 0;
    var tbBanHangDP = $('#table-dieu-phoi-don-hang-bh').DataTable({
        orderCellsTop: true,
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (BHDPSHOW > 0) {
                if (data.draw > 1) {
                    tbBanHangDP_filterValues.draw = data.draw;
                    tbBanHangDP_filterValues.export = 0;
                    tbBanHangDP_filterValues.search = data.search["value"];
                    tbBanHangDP_filterValues.start = data.start;
                    tbBanHangDP_filterValues.length = data.length;
                    tbBanHangDP_filterValues.order = data.order[0].column;
                    tbBanHangDP_filterValues.dir = data.order[0].dir;
                }
                else {
                    tbBanHangDP_filterValues.export = 0;
                    tbBanHangDP_filterValues.draw = data.draw;
                    tbBanHangDP_filterValues.search = data.search["value"];
                    tbBanHangDP_filterValues.start = data.start;
                    tbBanHangDP_filterValues.length = data.length;
                    tbBanHangDP_filterValues.order = data.order[0].column;
                    tbBanHangDP_filterValues.dir = data.order[0].dir;
                    tbBanHangDP_filterValues.status = $('select[name="sl-status"]').val();
                    tbBanHangDP_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
                    tbBanHangDP_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
                }
                $.ajax({
                    url: '/BanHang/DieuPhoiDonHang',
                    method: 'GET',
                    data: tbBanHangDP_filterValues,
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
                            if (tbBanHangDP_filterValues.draw != 1) {
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
                data: "SHIPPED"
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
            { data: "Duyet" },
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
                "targets": 12,
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
            displayBuffer: 100,
        },
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
            if (data.length > 0) {
                $(api.column(0).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
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
    });
    //end

    //#Region Load Chia Hang Ban Hang
    let tbBanHangCH_filterValues = {};
    var BHCHSHOW = 0;
    var tbBanHangCH = $('#table-chuyen-kho-chia-hang-bh').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (BHCHSHOW > 0) {
                if (data.draw > 1) {
                    tbBanHangCH_filterValues.draw = data.draw;
                    tbBanHangCH_filterValues.search = data.search["value"];
                    tbBanHangCH_filterValues.start = data.start;
                    tbBanHangCH_filterValues.length = data.length;
                    tbBanHangCH_filterValues.order = data.order[0].column;
                    tbBanHangCH_filterValues.dir = data.order[0].dir;
                }
                else {
                    tbBanHangCH_filterValues.draw = data.draw;
                    tbBanHangCH_filterValues.search = data.search["value"];
                    tbBanHangCH_filterValues.start = data.start;
                    tbBanHangCh_filterValues.length = data.length;
                    tbBanHangCH_filterValues.order = data.order[0].column;
                    tbBanHangCH_filterValues.dir = data.order[0].dir;
                    tbBanHangCH_filterValues.status = $('select[name="sl-status"]').val();
                    tbBanHangCH_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
                    tbBanHangCH_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
                }
                $.ajax({
                    url: '/BanHang/ChiaHangBanHang',
                    method: 'GET',
                    data: tbBanHangCH_filterValues,
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
                            if (tbBanHangCH_filterValues.draw != 1) {
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
            }
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
        },
        columns: [
            { data: "RowIndex" },
            { data: "MHCODE" },
            { data: "MHTEN" },
            { data: "UNITNAME" }
        ],
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
    });
    //end

    //#Region Excel Ban Hang
    $('#excel-banhang').click(function () {
        var tbBanHang_excel = {};
        tbBanHang_excel.draw = tbBanHang_filterValues.draw;
        tbBanHang_excel.search = tbBanHang_filterValues.search;
        tbBanHang_excel.start = tbBanHang_filterValues.start;
        tbBanHang_excel.length = tbBanHang_filterValues.length;
        tbBanHang_excel.order = tbBanHang_filterValues.order;
        tbBanHang_excel.dir = tbBanHang_filterValues.dir;
        tbBanHang_excel.status = tbBanHang_filterValues.status;
        tbBanHang_excel.FromDate = tbBanHang_filterValues.FromDate;
        tbBanHang_excel.ToDate = tbBanHang_filterValues.ToDate;
        tbBanHang_excel.export = 1;

        let CheckDieuPhieu = $('#profile-tab-dieu-phoi-don-hang-bh[data-toggle="tab"]').hasClass('active');
        $.ajax({
            method: "GET",
            url: "/BanHang/CheckRoleXuat",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    if (CheckDieuPhieu == true) {
                        tbBanHangDP_filterValues.export = 1;
                        var link = `/BanHang/DieuPhoiDonHang?` + serialize(tbBanHangDP_filterValues) + ``;
                        window.open(link)
                    } else {
                        var link = `/BanHang/ExcelBanHang?draw=` + tbBanHang_excel.draw + `&start=` + tbBanHang_excel.start + `&length=` + tbBanHang_excel.length + `&order=` + tbBanHang_excel.order + `&dir=` + tbBanHang_excel.dir + `&status=` + tbBanHang_excel.status + `&search=` + tbBanHang_excel.search + `&FromDate=` + tbBanHang_excel.FromDate + `&ToDate=` + tbBanHang_excel.ToDate + `&search2=` + tbBanHang_filterValues.search2 + `&search3=` + tbBanHang_filterValues.search3 + `&search4=` + tbBanHang_filterValues.search4 + `&search5=` + tbBanHang_filterValues.search5 + `&search6=` + tbBanHang_filterValues.search6 + `&search7=` + tbBanHang_filterValues.search7 + `&search8=` + tbBanHang_filterValues.search8 + `&search9=` + tbBanHang_filterValues.search9 + `&search10=` + tbBanHang_filterValues.search10 + `&search11=` + tbBanHang_filterValues.search11 + `&search12=` + tbBanHang_filterValues.search12 + `&search13=` + tbBanHang_filterValues.search13 + `&search14=` + tbBanHang_filterValues.search14 + `&search15=` + tbBanHang_filterValues.search15 + `&search16=` + tbBanHang_filterValues.search16 + `&search17=` + tbBanHang_filterValues.search17 + ``;
                        window.open(link)
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
    });
    //End

    //#Region excel chi tiet ban hang
    $('#excel-chitiet-banhang').click(function () {
        var tbCTBanHang_excel = {};
        tbCTBanHang_excel.SoPhieu = $('#them-order input[name="txt-edit-sophieu"]').val();
        let data = new FormData();
        data.append("mathangs", JSON.stringify(objmathang));
        data.append("sophieu", tbCTBanHang_excel.SoPhieu);
        $.ajax({
            method: "POST",
            url: `/BanHang/ExcelChiTietBanHang`,
            data: data,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.status == 1) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    let result_table = [
                        ["Mã hàng", "Tên hàng", "Kho", "Đơn vị", "Số lượng", "Số lượng tồn", "Đơn giá", "Thành tiền", "Ghi chú"]
                    ];

                    let intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                                i : 0;
                    };

                    let tongsl = 0;
                    let slton = 0;
                    let tongdongia = 0;
                    let thanhtien = 0;
                    msg.data.forEach(function (arrays, index) {
                        tongsl += intVal(arrays.SOLUONG);
                        slton += intVal(arrays.SoLuongTon);
                        tongdongia += intVal(arrays.DONGIA);
                        thanhtien += intVal(arrays.THANHTIEN);
                        let rowdata = [arrays.MHCODE, arrays.MHTEN, arrays.KHOCODE, arrays.DONVI, convertCurrency(arrays.SOLUONG), convertCurrency(arrays.SoLuongTon), convertCurrency(arrays.DONGIA), convertCurrency(arrays.THANHTIEN), arrays.GHICHU];
                        result_table.push(rowdata);
                    });

                    result_table.push(["", "", "", "", convertCurrency(tongsl), convertCurrency(slton), convertCurrency(tongdongia), convertCurrency(thanhtien), ""]);
                    console.log(result_table)
                    /* this line is only needed if you are not adding a script tag reference */
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    /* make the worksheet */
                    let ws = XLSX.utils.json_to_sheet(result_table);

                    /* add to workbook */
                    let wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "People");

                    /* write workbook (use type 'binary') */
                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

                    /* generate a download */
                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }

                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "DanhSachChiTietDonDatHang.xlsx");
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
                else if (msg.status == 4) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });

                    let result_table = [
                        ["STT", "Mã hàng", "Tên hàng", "Số lượng", "Đơn vị", "Tồn", "Đơn giá", "Thành tiền", "Ghi chú"]
                    ];

                    msg.data.forEach(function (arrays, index) {
                        let rowdata = [(index + 1), arrays.MHCODE, arrays.MHTEN, convertCurrency(arrays.Soluong), arrays.DONVI, convertCurrency(arrays.SoLuongTon), convertCurrency(arrays.DONGIA), convertCurrency(arrays.THANHTIEN), arrays.GhiChu];
                        result_table.push(rowdata);
                    });

                    /* this line is only needed if you are not adding a script tag reference */
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    /* make the worksheet */
                    let ws = XLSX.utils.json_to_sheet(result_table);

                    /* add to workbook */
                    let wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "People");

                    /* write workbook (use type 'binary') */
                    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

                    /* generate a download */
                    function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }

                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "DanhSachChiTietDonDatHang.xlsx");
                }
            }
        });
        //$.ajax({
        //    method: "GET",
        //    url: "/BanHang/CheckRoleXuat",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (msg) {
        //        if (msg.status == 1) {
        //            var link = `/BanHang/ExcelChiTietBanHang?sophieu=` + tbCTBanHang_excel.SoPhieu + ``;
        //            window.open(link)
        //        }
        //        else if (msg.status == 2) {
        //            toast.create({
        //                title: 'Notification!',
        //                text: msg.message,
        //                icon: 'error_outline',
        //                classBackground: 'noti-error',
        //                timeout: 3000
        //            });
        //        }
        //        else if (msg.status == 3) {
        //            toast.create({
        //                title: 'Notification!',
        //                text: msg.message,
        //                icon: 'error_outline',
        //                classBackground: 'noti-error',
        //                timeout: 3000
        //            });
        //            location.reload();
        //        }
        //    }
        //})
    });
    //end

    var DuyetMHID = null
    var DuyetGhiChu = null;
    var CheckDuyet = null;
    $("#Duyet-bh").click(function () {
        $('#quare').css('background-color', 'yellow');
        $('#duyet-content').html('Đang thực hiện (pending), cho phép tiếp tục chuyển khai');
        CheckDuyet = true;

    });

    $("#TuChoi-bh").click(function () {
        $('#quare').css('background-color', 'red');
        $('#duyet-content').html('Phiếu chuyển sang trạng thái bị hủy');
        CheckDuyet = false;
    });
    $('#btn-duyet-ghi-banhang').click(function () {
        DuyetMHID = $('input[name="txt-edit-id"]').val();
        DuyetGhiChu = $('#duyet-ghi-chu-banhang').val();
        if (DuyetMHID == "" || DuyetMHID == null) {
            toast.create({
                title: 'Notification!',
                text: 'Phiếu chưa được tạo',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
        else {
            $.ajax({
                method: "GET",
                url: "/BanHang/DuyetBanHang",
                data: { Check: CheckDuyet, idmh: DuyetMHID, ghichu: DuyetGhiChu },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.status == 1) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        DuyetGhiChu = null;
                        DuyetMHID = null;
                        CheckDuyet = null;
                        $('#popup-duyet-phieu-banhang').modal("hide");
                        $('#them-order').modal("hide");
                        tbBanHang.ajax.reload();
                    } else if (msg.status == 2) {
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

    })
    var trangthaiphieu = null;
    var trangthaichuyen = null;
    $("#sl-trangthai-phieu").on('change', function () {
        trangthaiphieu = $("#sl-trangthai-phieu").val()
    })
    $('input[name="check-chuyenphieu"]').on('change', function () {
        trangthaichuyen = $('input[name="check-chuyenphieu"]').is(":checked")
    })

    $("#capnhat-phieu").click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
            $("#click-right").modal("hide");
        }
        else {
            let $this = $('#table-don-dat-hang tbody tr.selected');
            let select2 = tbBanHang.row($this).data();
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckRoleCapNhatBH",
                data: { select: select2.MDID },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.rs == true) {
                        $('#sl-trangthai-phieu').val(msg.MHIDStatus).trigger('change');
                        $('input[name="check-chuyenphieu"]').prop("checked", msg.MHIDSHIP);
                        $("#click-right").modal();
                    } else if (msg.status == 2) {
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
    })
    $("#btn-capnhat-BH").click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
            $("#click-right").modal("hide");
        } else {
            let $this = $('#table-don-dat-hang tbody tr.selected');
            let select2 = tbBanHang.row($this).data();
            $.ajax({
                method: "GET",
                url: "/BanHang/CapNhatBanHang",
                data: { idmh: select2.MDID, ttcp: trangthaichuyen, ttp: trangthaiphieu },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.status == 1) {

                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        })
                        $('#click-right').modal("hide");
                        tbBanHang.ajax.reload();

                    } else if (msg.status == 2) {
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

    })

    $("#xoa-order").click(function () {

        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            let $this = $('#table-don-dat-hang tbody tr.selected');
            let select2 = tbBanHang.row($this).data();
            if (confirm("Bạn có muốn xóa hay không")) {
                $.ajax({
                    method: "GET",
                    url: "/BanHang/XoaBanHang",
                    data: { select: select2.MDID },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        if (msg.status == 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'check',
                                classBackground: 'noti-success',
                                timeout: 3000
                            })
                            tbBanHang.ajax.reload();
                        } else if (msg.status == 2) {
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
        }
    });

    $("#cap-nhat-order").click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            let $this = $('#table-don-dat-hang tbody tr.selected');
            let select2 = tbBanHang.row($this).data();
            BanHangDetail(select2.MDID);
        }
    });

    //#Region chon ban hang
    $('#table-don-dat-hang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-don-dat-hang tbody tr').not(this).removeClass('selected')
    })

    $('#table-don-dat-hang tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected')
        $('#table-don-dat-hang tbody tr').not(this).removeClass('selected')
        BanHangDetail($(this).attr('data-id'))
    });
    //end

    //#Region chon dieu phoi banhang
    $('#table-dieu-phoi-don-hang-bh tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-dieu-phoi-don-hang-bh tbody tr').not(this).removeClass('selected')
    })

    $('#table-dieu-phoi-don-hang-bh tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected')
        $('#table-dieu-phoi-don-hang-bh tbody tr').not(this).removeClass('selected')
        BanHangDetail($(this).attr('data-id'))
    });
    //end
    var ChangeTab = 0;
    $('#search-phieu').click(function () {
        var status = $('select[name="sl-status"]').val();
        var toDate = $('input[name="chooseDate_To"]').val();
        var fromDate = $('input[name="chooseDate_From"]').val();
        if (ChangeTab == 0) {
            tbBanHang_filterValues.status = status;
            tbBanHang_filterValues.FromDate = fromDate;
            tbBanHang_filterValues.ToDate = toDate;
            tbBanHang.draw();
        }
        else if (ChangeTab == 1) {
            tbBanHangDP_filterValues.status = status;
            tbBanHangDP_filterValues.FromDate = fromDate;
            tbBanHangDP_filterValues.ToDate = toDate;
            tbBanHangDP.draw();
        }
        else if (ChangeTab == 3) {
            tbBanHangCH_filterValues.status = status;
            tbBanHangCH_filterValues.FromDate = fromDate;
            tbBanHangCH_filterValues.ToDate = toDate;
            tbBanHangCH.draw();
        }

    });

    function convertDate(datetime) {
        if (datetime != null) {
            var date = new Date(parseInt(datetime.substr(6)));
            var formatted = ("0" + date.getDate()).slice(-2) + "/" +
                ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
            return formatted;
        }
        else return '';
    }

    function BanHangDetail(hd) {
        $.ajax({
            type: "POST",
            url: "/BanHang/LoadBanHangDetail",
            data: '{hd: "' + hd + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.rs == true) {
                    var qrcode = new QRCode("qrcode", {
                        width: 47,
                        height: 47,
                    });
                    qrcode.makeCode(msg.data.MDCODE)
                    $("#nhap-bh").addClass('disabled-dia-chi');
                    $('#them-order input[name="txt-edit-id"]').val(msg.data.MDID);
                    $('#them-order select[name="txt-edit-kh"]').val(msg.data.KHID);
                    $('#them-order select[name="txt-edit-kh"]').trigger('change.select2');//trigger
                    $('#them-order select[name="txt-edit-tenkh"]').val(msg.data.KHID);
                    $('#them-order select[name="txt-edit-tenkh"]').trigger('change.select2');//trigger
                    $('#them-order input[name="txt-edit-daidien"]').val(msg.data.NGUOIDAIDIEN);
                    $('#them-order input[name="txt-edit-diachi"]').val(msg.data.DIACHI);
                    $('#them-order input[name="txt-edit-dienthoai"]').val(msg.data.DIENTHOAI);
                    $('#them-order select[name="txt-edit-manv"]').val(msg.data.NVID);
                    $('#them-order select[name="txt-edit-manv"]').trigger('change.select2');//trigger
                    $('#them-order select[name="txt-edit-tennv"]').val(msg.data.NVID);
                    $('#them-order select[name="txt-edit-tennv"]').trigger('change.select2');//trigger
                    $('#them-order input[name="txt-edit-hanthanhtoan"]').val(convertDate(msg.data.HANTHANHTOAN));
                    $('#them-order input[name="txt-edit-ngaynhanhang"]').val(convertDate(msg.data.EXPECTEDDATE));
                    $('#them-order input[name="txt-edit-ngaylapphieu"]').val(convertDate(msg.data.NGAYHD)).prop("disabled", true);
                    $('#them-order input[name="txt-edit-loaitien"]').attr('disabled', 'true');
                    $('#them-order input[name="txt-edit-sophieu"]').val(msg.data.MDCODE);
                    $('#them-order #txt-edit-ghichu').val(msg.data.DIENGIAI);
                    $('#them-order #sl-lydo').empty();
                    $('#them-order #sl-lydo').append(msg.lydo);
                    $('#them-order #sl-showroom').empty();
                    $('#them-order #sl-showroom').append(msg.showroom);
                    $('#them-order #sl-showroom').val(msg.data.SRIDTO);
                    $('#them-order #sl-kho').empty();
                    $('#them-order #sl-kho').append(msg.kho);
                    $('#them-order #sl-ca').empty();
                    $('#them-order #sl-ca').append(msg.ca);
                    $('#them-order #sl-loaitien').empty();
                    $('#them-order #sl-loaitien').append(msg.tiente);
                    $('input[name="txt-edit-tigia"]').val(msg.data.TIGIA);
                    $('#them-order #sl-statushd').val(msg.data.STATUS);
                    $('#them-order #sl-statushd').attr('disabled', 'true');
                    $('#them-order input[name="txt-check-ship"]').prop("checked", msg.duyet);

                    $('#them-order').removeClass('was-validated');
                    LoadMuaDonCT(hd).then((rs) => {
                        objmathang = rs.data;
                        console.log(objmathang);
                        tbCTP.clear();
                        tbCTP.rows.add(objmathang);
                        tbCTP.columns.adjust().draw();

                    }).finally(() => {
                        $('#them-order').modal();
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
                } else if (msg.status == 3) {
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
        //$('#them-order').on('hidden.bs.modal', function (e) {
        //    tongtienhang = 0;
        //    tongchietkhau = 0;
        //    tongthue = 0;
        //    $('#them-order input[name="txt-edit-kh"]').val("");
        //    $('#them-order input[name="txt-edit-tenkh"]').val("");
        //    $('#them-order input[name="txt-edit-daidien"]').val("");
        //    $('#them-order input[name="txt-edit-diachi"]').val("");
        //    $('#them-order input[name="txt-edit-dienthoai"]').val("");
        //    $('#them-order input[name="txt-edit-tongtien"]').val("");
        //    $('#them-order input[name="txt-edit-manv"]').val("");
        //    $('#them-order input[name="txt-edit-tennv"]').val("");
        //    $('#them-order input[name="txt-edit-hanthanhtoan"]').val("");
        //    $('#them-order input[name="txt-edit-ngaynhanhang"]').val("");
        //    $('#them-order input[name="txt-edit-ngaylapphieu"]').val("");
        //    $('#them-order input[name="txt-edit-sophieu"]').val("");
        //    $('#them-order input[name="txt-edit-id"]').val("");
        //    $('#them-order #txt-edit-ghichu').val("");
        //    objmathang = [];
        //    objMatHangDELETE = [];
        //    DELETEMATHANGJSON = null;
        //    MATHANGJSON = null;
        //    $('select[name="txt-edit-bonus-hanthanhtoan"]').val("0");
        //    tbCTP.clear();
        //    tbCTP.rows.add(objmathang);
        //    tbCTP.columns.adjust().draw();
        //    tbCTP.draw()
        //})
    }
    $('#them-order').on('hidden.bs.modal', function (e) {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        $('#qrcode').empty();
        $('input[name="txt-edit-ISPO"]').val("");
        $('select[name="txt-edit-kh"]').next(".select2-container").show();
        $('select[name="txt-edit-tenkh"]').next(".select2-container").show();
        $('select[name="txt-edit-kh-so"]').next(".select2-container").hide();
        $('select[name="txt-edit-tenkh-so"]').next(".select2-container").hide();
        $('#them-order select[name="txt-edit-kh"]').val("08b4a294-8a88-4134-8761-e82cfa164152");
        $('#them-order select[name="txt-edit-kh"]').trigger('change.select2');//trigger
        $('#them-order select[name="txt-edit-tenkh"]').val("08b4a294-8a88-4134-8761-e82cfa164152");
        $('#them-order select[name="txt-edit-tenkh"]').trigger('change.select2');//trigger
        $('#them-order input[name="txt-edit-daidien"]').val("");
        $('#them-order input[name="txt-edit-diachi"]').val("");
        $('#them-order input[name="txt-edit-dienthoai"]').val("");
        $('#them-order input[name="txt-edit-tongtien"]').val("");
        $('#them-order select[name="txt-edit-manv"]').val(LuuIDNV);
        $('#them-order select[name="txt-edit-manv"]').trigger('change.select2');//trigger
        $('#them-order select[name="txt-edit-tennv"]').val(LuuIDNV);
        $('#them-order select[name="txt-edit-tennv"]').trigger('change.select2');//trigger
        $('#them-order input[name="txt-edit-hanthanhtoan"]').val("");
        $('#them-order input[name="txt-edit-ngaynhanhang"]').val("");
        $('#them-order input[name="txt-edit-ngaylapphieu"]').val("");
        $('#them-order input[name="txt-edit-sophieu"]').val("");
        $('#them-order input[name="txt-edit-id"]').val("");
        $('#them-order #txt-edit-ghichu').val("");
        objmathang = [];
        objMatHangDELETE = [];
        DELETEMATHANGJSON = null;
        MATHANGJSON = null;
        $('select[name="txt-edit-bonus-hanthanhtoan"]').val("0");
        tbCTP.clear();
        tbCTP.rows.add(objmathang);
        tbCTP.columns.adjust().draw();
        tbCTP.draw()
    })
    //Thay doi mathang theo kho 
    $('#sl-kho').on('change', function () {
        if (confirm("Bạn có muốn thay đôi mặt hàng theo kho")) {
            let idKho = $('#sl-kho').val();
            let nameKho = $("#sl-kho option:selected").text();
            var MHID = objmathang.map(({ MHID }) => ({ MHID }))
            var formdata = new FormData();
            formdata.append('MHID', JSON.stringify(MHID));
            formdata.append('KHOID', idKho);
            GetSoluongTon(formdata).then((e) => {
                for (var key in e.data) {
                    for (var key2 in objmathang) {
                        if (objmathang[key2].MHID == e.data[key].MHID) {
                            objmathang[key2].SoLuongTon = e.data[key].soluong;
                            if (objmathang[key2].status == 1) {
                                objmathang[key2].status = 2;
                            }
                            objmathang[key2].KHOID = idKho;
                            break;
                        }
                    }
                }
                tbCTP.clear();
                tbCTP.rows.add(objmathang);
                tbCTP.columns.adjust().draw();
            });
        }
    })
    $('#click-right').on('hidden.bs.modal', function () {
        $('#sl-trangthai-phieu').val(0);
        $('input[name="check-chuyenphieu"]').prop("checked", false);
    })
    $('#popup-duyet-phieu-banhang').on('hidden.bs.modal', function () {
        $('#duyet-ghi-chu-banhang').val('');
    })

    //#Region load mat hang modal nho
    let tbBanHangMH_filterValues = {}
    tbBanHangMH_filterValues.statusDraw = 0;
    var tbBanHangMH = $('#table-search-mahang').DataTable({
        serverSide: true,
        bFilter: true,
        bInfo: false,
        "order": [[2, "asc"]],
        ajax: function (data, callback, setting) {
            if (tbBanHangMH_filterValues.statusDraw > 0) {
                tbBanHangMH_filterValues.draw = data.draw;
                tbBanHangMH_filterValues.search = data.search["value"];
                tbBanHangMH_filterValues.start = data.start;
                tbBanHangMH_filterValues.length = data.length;
                tbBanHangMH_filterValues.order = data.order[0].column;
                tbBanHangMH_filterValues.dir = data.order[0].dir;
                tbBanHangMH_filterValues.statusDraw = 1;
                $.ajax({
                    type: 'GET',
                    url: '/BanHang/LoadMatHang',
                    data: tbBanHangMH_filterValues,
                    success: function (res) {
                        console.log(res.data);
                    }
                }).done(callback, () => {
                    html: true;
                    $('#table-search-mahang tbody tr').eq(0).addClass('selected');
                })
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        columns: [
            {
                "targets": 0,
                "data": null
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
                "data": "DONVI",
            },
            {
                "targets": 5,
                "className": "text-left",
                "data": "GIABANLE",
            },
            {
                "targets": 6,
                "className": "text-left",
                "data": "GIABANBUON",
            },
            {
                "targets": 7,
                "className": "text-left",
                "data": "SoLuongTon",
            },
        ],
        columnDefs: [
            {
                "targets": [0, 7],
                "orderable": false
            }
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
        "autoWidth": false,
    })
    //end

    //#Region set draw mat hang trong hoa don ban hang
    function tbBanHangMH_timeout() {
        setTimeout(function () {
            tbBanHangMH_filterValues.statusDraw++;
            tbBanHangMH.columns.adjust().draw();
        }, 500)
    }
    $("#global_filter").on('keyup click', delay(function (e) {
        let checkSearchModal = $(".table-search").is(":hidden");
        // trường hợp khi bấm enter phải có if else này ngăn chặn khi enter hok bật bảng lên
        if (e.which == 13 || e.which == 113 /*|| e.which == 114*/ || e.which == 115 || e.which == 117 || e.which == 118 || e.which == 119 || e.which == 120 || e.which == 121) {
            return;
        }
        else {
            if (checkSearchModal) {
                $(".table-search").show();
            }
        }
        var checksearch = $('#global_filter').val();
        if (tbBanHangMH_filterValues.statusDraw < 1) {
            tbBanHangMH_timeout();
        }
        else if (checksearch != tbBanHangMH_filterValues.search) {
            tbBanHangMH_filterValues.statusDraw++;
            tbBanHangMH.search(checksearch).draw();
        }
    }, 1000))
    //end
    $("#table-chi-tiet-phieu").on("change", "tr", async function () {
        let UpdateObjMH = {};
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var intVal = function (i) {
            return typeof i === 'string' ?
                i.replace(/\./g, '') :
                typeof i === 'number' ?
                    i : 0;
        };
        var tienchietkhau = 0;
        var tilechietkhau = 0;
        var idMH = tbCTP.row(this).data().MHID;
        var soluong = $(this).find('input[name="txt-so-luong"]').val();
        console.log(soluong);
        var dongia = $(this).find('input[name="txt-don-gia"]').val();
        var ghichu = $(this).find('input[name="txt-ghichu"]').val();
        //var tilethue = $(this).find('input[name="txt-thue"]').val();
        //var KhoID = $(this).find('#kho-mh').val();
        var CONVERTDONGIA = intVal(dongia);
        var CONVERTSOLUONG = intVal(soluong.replace("-", ""));
        if (tbCTP.row(this).data().MHTID == 7) {
            CONVERTSOLUONG = - CONVERTSOLUONG;
            console.log(CONVERTSOLUONG);
        }
        var THANHTIEN = CONVERTDONGIA * CONVERTSOLUONG;
        //if (CheckIs == true) {
        //    var chietkhautien = $(this).find('input[name="txt-chiet-khau-tile"]').val();
        //    tienchietkhau = intVal(chietkhautien);
        //    if (parseFloat(tienchietkhau) <= parseFloat(THANHTIEN)) {
        //        tilechietkhau = Math.round(((tienchietkhau / THANHTIEN * 100) * 100) / 100);
        //        THANHTIEN = THANHTIEN - (THANHTIEN * tilechietkhau / 100);
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //    if (parseFloat(tienchietkhau) > parseFloat(THANHTIEN)) {
        //        tienchietkhau = "";
        //        tilechietkhau = "100.00";
        //        THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //    }
        //}
        //else {
        //    var chietkhautile = $(this).find('input[name="txt-chiet-khau"]').val();
        //    tilechietkhau = chietkhautile;
        //    tienchietkhau = THANHTIEN * chietkhautile / 100;
        //    THANHTIEN = THANHTIEN - ((chietkhautile / 100) * THANHTIEN);
        //    THANHTIEN = THANHTIEN + (THANHTIEN * (tilethue / 100));
        //}
        UpdateObjMH = {
            MHID: idMH,
            SOLUONG: CONVERTSOLUONG,
            DONGIA: CONVERTDONGIA,
            TILECHIETKHAU: tilechietkhau,
            //TILETHUE: tilethue,
            THANHTIEN: Math.round(THANHTIEN),
            //TienChietKhau: Math.round(tienchietkhau),
            GHICHU: ghichu
        }
        var i = objmathang.findIndex(x => x.MHID == idMH);
        //if (objmathang[i].KHOID != KhoID) {
        //    var formdata = new FormData();
        //    formdata.append("MHID", idMH);
        //    formdata.append("KHOID", KhoID);
        //    await GetSoluongTonChiTiet(formdata).then((e) => {
        //        objmathang[i].SoLuongTon = e.data[0].soluong;
        //        objmathang[i].KHOID = e.data[0].KHOID;
        //    })
        //}
        if (objmathang[i].MHID == UpdateObjMH.MHID) {
            objmathang[i].SOLUONG = UpdateObjMH.SOLUONG;
            //objmathang[i].TILECHIETKHAU = UpdateObjMH.TILECHIETKHAU;
            objmathang[i].DONGIA = UpdateObjMH.DONGIA;
            //objmathang[i].TILETHUE = UpdateObjMH.TILETHUE;
            objmathang[i].THANHTIEN = UpdateObjMH.THANHTIEN;
            //objmathang[i].TienChietKhau = UpdateObjMH.TienChietKhau;
            if (objmathang[i].status == 1) {
                objmathang[i].status = 2;
            }
            objmathang[i].GHICHU = UpdateObjMH.GHICHU;
        }
        tbCTP.clear();
        tbCTP.rows.add(objmathang);
        tbCTP.columns.adjust().draw();
        tbCTP.row(i).select();
        tbCTP.row(i).scrollTo(false);
    });


    $('#table-search-mahang').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang tbody tr').not(this).removeClass('selected');
    })
    $(document).keydown(async function (e) {
        let checkThemOrder = $("#them-order").is(":hidden");
        let checkSearch = $(".table-search").is(":hidden");
        if (!checkSearch) {
            if (e.which == 13) {
                let idmh = $('#table-search-mahang tbody').find('.selected').attr('data-id');
                let search = $("#global_filter").val();
                if (search != '') {
                    $("#global_filter").val('');
                }
                LuuMatHang(idmh);
                $(".table-search").hide();
            }
        }
        else if (!checkThemOrder) {
            if (e.which == 113) {
                e.preventDefault();
                $("#them-order").scrollTop(0);
                var CheckSelectKh = $('select[name="txt-edit-tenkh"]').next(".select2-container").is(":hidden");
                if (!CheckSelectKh) {
                    $('select[name="txt-edit-tenkh"]').select2('open');
                } else {
                    $('select[name="txt-edit-tenkh-so"]').select2('open');
                }
            }
            else if (e.which == 114) {
                e.preventDefault();
                $("#them-order").scrollTop(120);
                $("#global_filter").click();
                //tbBanHangHoaDonMH_timeout();
                $("#global_filter").focus();
                //$(".table-search").show();
                //if (tbBanHangMH_filterValues.statusDraw < 1) {
                //    tbBanHangMH_timeout();
                //}
            }
            else if (e.which == 115) {
                e.preventDefault();
                $('#txt-edit-ghichu').focus();
                $('#txt-edit-ghichu').get(0).scrollIntoView();
            }
            else if (e.which == 117) {
                e.preventDefault();
                InCTDonHang();
            }
            else if (e.which == 118) {
                e.preventDefault();
                await DetailBillAddUpdateDetele();
            }
            else if (e.which == 119) {
                e.preventDefault();
                $("#Duyet-bh").click();
            }
            else if (e.which == 121) {
                e.preventDefault();
                $("#TuChoi-bh").click()
            }
        }

    })
    //$(document).keypress(function (e) {
    //    if (e.which == 13) {
    //        let checkSearch = $(".table-search").is(":hidden");
    //        if (!checkSearch) {
    //            let idmh = $('#table-search-mahang tbody').find('.selected').attr('data-id');
    //            LuuMatHang(idmh);
    //            $(".table-search").hide();
    //        }
    //    }
    //})
    //$(document).keydown(function (e) {
    //    if (e.which == 40) {
    //        let checkSearch = $(".table-search").is(":hidden");
    //        let checkselect = $('#table-search-mahang tbody tr').hasClass('selected');
    //        if (!checkSearch && checkselect) {
    //            let select = $('#table-search-mahang tbody').find('.selected');
    //            $('#table-search-mahang tbody').find('.selected').next().addClass('selected');
    //            select.removeClass('selected');
    //            let NumberRow = parseInt($('#table-search-mahang tbody').find('.selected  td:nth-child(n)').html());
    //            if (NumberRow % 8 == 0) {
    //                tbBanHangMH.scroller.toPosition(NumberRow - 1, false);
    //            }
    //        }
    //    }
    //    else if (e.which == 38) {
    //        let checkSearch = $(".table-search").is(":hidden");
    //        let checkselect = $('#table-search-mahang tbody tr').hasClass('selected');
    //        if (!checkSearch && checkselect) {
    //            let select = $('#table-search-mahang tbody').find('.selected');
    //            $('#table-search-mahang tbody').find('.selected').prev().addClass('selected');
    //            select.removeClass('selected');
    //            let NumberRow = parseInt($('#table-search-mahang tbody').find('.selected  td:nth-child(n)').html());
    //            if (NumberRow % 8 == 0) {
    //                tbBanHangMH.scroller.toPosition(NumberRow - 8, false);
    //            }
    //        }
    //    }
    //});
    //#region chọn mặt hàng ở modal nhỏ
    $("#btn-chon-mh").click(function () {
        let idmh = $('#table-search-mahang tbody tr.selected').attr('data-id');
        if (idmh == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            LuuMatHang(idmh);
        }
    });

    $("#btn-chonthoat-mh").click(function () {
        let idmh = $('#table-search-mahang tbody tr.selected').attr('data-id');
        if (idmh == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            LuuMatHang(idmh);
            $(".table-search").hide();
            let search = $("#global_filter").val();
            if (search != '') {
                $("#global_filter").val('');
                //tbBanHangMH.ajax.reload();
            }
        }
    });
    $('#btn-thoat-searchmh').click(function () {
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
            //tbBanHangMH.ajax.reload();
        }
    })
    //dbl
    $("#table-search-mahang").on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        $('#table-search-mahang tbody tr').not(this).removeClass('selected');
        let idmh = $(this).attr('data-id');
        let search = $("#global_filter").val();
        if (search != '') {
            $("#global_filter").val('');
        }
        LuuMatHang(idmh);
        $(".table-search").hide();
    })
    //end

    function LuuMatHang(idmh) {
        tongtienhang = 0;
        tongchietkhau = 0;
        tongthue = 0;
        var kho = $("#sl-kho").val();
        var makh = $('#them-order select[name="txt-edit-kh"]').select2('data')[0].text;
        var tenkh = $('#them-order select[name="txt-edit-tenkh"]').select2('data')[0].text;
        $.ajax({
            type: "GET",
            url: '/BanHang/LoadMatHangByMHID',
            contentType: "application/json; charset=utf-8",
            data: { mathangID: idmh, khoID: kho, makh: makh, tenkh: tenkh },
            dataType: "json",
            success: function (e) {
                console.log(e);
                if (e.data.length > 0) {
                    let SoLuong = 1;
                    if (e.data[0].MHTID == 7) {
                        SoLuong = -1;
                    }
                    let obj = {
                        MHID: e.data[0].MHID,
                        MHCODE: e.data[0].MHCODE,
                        MHTEN: e.data[0].MHTEN,
                        SOLUONG: SoLuong,
                        DONVI: e.data[0].DONVI,
                        SoLuongTon: e.data[0].SoLuongTon,
                        DONGIA: e.data[0].GiaBanTheoCap,
                        TILETHUE: 0,
                        TILECHIETKHAU: 0,
                        THANHTIEN: e.data[0].GiaBanTheoCap * SoLuong,
                        GHICHU: e.data[0].GHICHU,
                        ViTri: e.data[0].ViTri,
                        status: 0,
                        KHOID: e.data[0].KHOID,
                        TienChietKhau: 0,
                        MHTID: e.data[0].MHTID,
                        LINKIMAGE: e.data[0].LINKIMAGE
                    }
                    var exist = false;
                    var index = 0;
                    for (var i = 0; i < objmathang.length; i++) {
                        if (objmathang[i].MHID == obj.MHID) {
                            objmathang[i].SOLUONG = parseInt(objmathang[i].SOLUONG) + SoLuong;
                            if (objmathang[i].status == 1) {
                                objmathang[i].status = 2;
                            }
                            objmathang[i].THANHTIEN = objmathang[i].DONGIA * objmathang[i].SOLUONG
                            exist = true;
                            index = i;
                            break;
                        }
                    }
                    if (exist == false) {
                        objmathang.push(obj);
                        tbCTP.clear();
                        tbCTP.rows.add(objmathang);
                        tbCTP.columns.adjust().draw();
                        tbCTP.row(objmathang.length - 1).select();
                        tbCTP.row(objmathang.length - 1).scrollTo(false);
                    }
                    else if (exist == true) {
                        tbCTP.clear();
                        tbCTP.rows.add(objmathang);
                        tbCTP.columns.adjust().draw();
                        tbCTP.row(index).select();
                        tbCTP.row(index).scrollTo(false);
                    }
                }
            }
        });
    }

    //Search Header Bang Chi Tiet Phieu
    //$('#table-chi-tiet-phieu thead tr').clone(true).appendTo('#table-chi-tiet-phieu thead');
    //$('#table-chi-tiet-phieu thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    //if (i == 3) {
    //    //    var $select = $("<select id='filter-header-khomh'> <option value =\" 1 \">Chọn Kho </option></select>", {
    //    //    });
    //    //    LoadKho().then((e) => {
    //    //        e.data.map((value) => {
    //    //            var $option = $("<option></option>", {
    //    //                "text": value.KHOCODE,
    //    //                "value": value.KHOID
    //    //            });
    //    //            $select.append($option);
    //    //        })
    //    //    })
    //    //    return $(this).html($select);
    //    //}
    //    if (i != 0 && i != 9) {
    //        $(this).html('<input type="text" style="width:100%" id="txt-header-'+i+'" placeholder="Search ' + title + '" />');
    //    }
    //    //$('#filter-header-khomh').on('change', function () {
    //    //    let id = $(this).val();
    //    //    if (id != 1) {
    //    //        var result = objmathang.filter(word => word.KHOID == id);
    //    //        tbCTP.clear();
    //    //        tbCTP.rows.add(result);
    //    //        tbCTP.columns.adjust().draw();
    //    //    } else {
    //    //        tbCTP.clear();
    //    //        tbCTP.rows.add(objmathang);
    //    //        tbCTP.columns.adjust().draw();
    //    //    }
    //    //});
    //    $('input', this).on('keyup change', function () {
    //        if (tbCTP.column(i).search() !== this.value) {
    //            tbCTP
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
    //end
    let tblCTP_filterValues = {};
    var objmathang = [];
    var tbCTP = $('#table-chi-tiet-phieu').DataTable({
        orderCellsTop: true,
        bFilter: false,
        bInfo: false,
        select: true,
        data: objmathang,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MCTDID);
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            tongtienhang = tongtienhang + intVal(data.SOLUONG) * intVal(data.DONGIA);
            var dongiaSl_Index = data.SOLUONG * data.DONGIA
            var chietkhau_Index = dongiaSl_Index * data.TILECHIETKHAU / 100
            var thue_index = (dongiaSl_Index - chietkhau_Index) * data.TILETHUE / 100
            tongthue = tongthue + thue_index * 1
            tongthue = Math.round(tongthue)
            tongchietkhau = tongchietkhau + chietkhau_Index * 1
            tongchietkhau = Math.round(tongchietkhau)
            tongtienhang = Math.round(tongtienhang);
        },
        "fnRowCallback": function (nRow, data, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
        },
        columns: [
            { data: null },
            { data: "ViTri" },
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
            { data: "MHTEN" },
            //{
            //    data: "KHOID",
            //    render: function (data, type, row) {
            //        var $select = $("<select id='kho-mh'></select>", {
            //        });
            //        if (objKHOMH.length > 1) {
            //            for (var key in objKHOMH) {
            //                var $option = $("<option></option>", {
            //                    "text": objKHOMH[key].KHOCODE,
            //                    "value": objKHOMH[key].KHOID
            //                });
            //                if (objKHOMH[key].KHOID == data) {
            //                    $option.attr("selected", "selected")
            //                }
            //                $select.append($option);
            //            }
            //        }
            //        else {
            //            var $option = $("<option></option>", {
            //                "text": row.KHOCODE,
            //                "value": data
            //            });
            //            $select.append($option);
            //        }
            //        return $select.prop("outerHTML");
            //    }
            //},
            {
                data: "SOLUONG",
                render: function (data, type, full, meta) {
                    return '<input type="text" style="width:100%" name="txt-so-luong" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency" />';
                }
            },
            { data: "DONVI" },
            {
                data: "SoLuongTon",
                render: function (data, type, full, meta) {
                    return '<a type="button" data-toggle="modal" onclick = "CheckKho(\' ' + full.MHID + '\')" href="#">' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '</a>';
                }
            },
            {
                data: "DONGIA",
                render: function (data, type, full, meta) {
                    return '<input type="text" style="width:100%" name="txt-don-gia" value="' + data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '" data-type="currency"/>';
                }
            },
            //{
            //    data: "TILETHUE",
            //    render: function (data, type, full, meta) {
            //        return '<input type="text" name="txt-thue" value="' + data + '"  maxlength="2" data-type="currency" />';
            //    }
            //},
            //{
            //    data: "TILECHIETKHAU",
            //    render: function (data, type, row) {

            //        if (CheckIs == true) {
            //            return '<input type="text" name="txt-chiet-khau-tile" value="' + row.TienChietKhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '"data-type="currency" />';
            //        }
            //        else if (CheckIs == false) {
            //            return '<input type="text" name="txt-chiet-khau" value="' + data + '" maxlength="6" data-type="percent" />';
            //        }
            //        else {
            //            return '<input type="text" name="txt-chiet-khau" value="' + data + '" maxlength="6" data-type="percent" />';
            //        }
            //    }
            //},
            {
                data: "THANHTIEN",
                render: function (data, type, full, meta) {
                    var ConvertData = Math.round(data);
                    return ConvertData.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                data: "GHICHU",
                render: function (data, type, full, meta) {
                    return '<input type="text" name="txt-ghichu" value="' + data + '"/>';
                }
            },
            {
                data: null,
                "className": "text-center",
                defaultContent: '<a type="button" id="xoa-ctphieu" class="btn btn-danger text-white" >Xóa</a>'
            },
            {
                data: "status",
                visible: false
            },
            {
                data: "TienChietKhau",
                visible: false
            }
        ],
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        searching: "true",
        paging: true,
        scroller: {
            loadingIndicator: true,
            displayBuffer: 100,
        },
        'lengthChange': false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            jQuery.fn.dataTable.Api.register('sum()', function () {
                return this.flatten().reduce(function (a, b) {
                    if (typeof a === 'string') {
                        a = a.replace(/\./g, '') * 1;
                    }
                    if (typeof b === 'string') {
                        b = b.replace(/\./g, '') * 1;
                    }

                    return a + b;
                }, 0);
            });
            var soluong = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var soluongton = api
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var dongia = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var thanhtien = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            //var thanhtien = api
            //    .column(12)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var soluong = api
            //    .column(4)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var dongia = api
            //    .column(9)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var thue = api
            //    .column(10)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var chietkhau = api
            //    .column(11)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            //var tienchietkhau = api
            //    .column(17)
            //    .data()
            //    .reduce(function (a, b) {
            //        return intVal(a) + intVal(b);
            //    }, 0);
            var total = api.column(0, { page: 'current' }).data().length;
            if (total > 0) {
                //thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                //////update footer
                //$(api.column(0).footer()).html(
                //    api.column(0, { page: 'current' }).data().length);
                //$(api.column(4).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$(api.column(9).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$(api.column(10).footer()).html(Math.round(thue).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //if (CheckIs == true) {
                //    $(api.column(11).footer()).html(Math.round(tienchietkhau).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //}
                //else {
                //    $(api.column(11).footer()).html(chietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //}
                //$(api.column(12).footer()).html(thanhtien);
                //$('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                //$('#tongtien').html(thanhtien);
                //$('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                thanhtien = Math.round(thanhtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                ////update footer
                $(api.column(0).footer()).html(
                    api.column(0, { page: 'current' }).data().length);
                $(api.column(4).footer()).html(Math.round(soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(6).footer()).html(Math.round(soluongton).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(7).footer()).html(Math.round(dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $(api.column(8).footer()).html(thanhtien);
                $('#thue').html(tongthue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#chietkhau').html(tongchietkhau.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
                $('#tongtien').html(thanhtien);
                $('#tienhang').html(thanhtien);
                //$('#tienhang').html(tongtienhang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'));
            }
            else {
                //$(api.column(0).footer()).html("0");
                //$(api.column(4).footer()).html("0");
                //$(api.column(9).footer()).html("0");
                //$(api.column(10).footer()).html("0");
                //$(api.column(11).footer()).html("0");
                //$(api.column(12).footer()).html("0");
                //$('#thue').html("0");
                //$('#chietkhau').html("0");
                //$('#tongtien').html("0");
                //$('#tienhang').html("0");
                $(api.column(0).footer()).html("0");
                $(api.column(4).footer()).html("0");
                $(api.column(6).footer()).html("0");
                $(api.column(7).footer()).html("0");
                $(api.column(8).footer()).html("0");
                $('#thue').html("0");
                $('#chietkhau').html("0");
                $('#tongtien').html("0");
                $('#tienhang').html("0");
            }
        }
    });
    $('#them-order').on('shown.bs.modal', function () {
        tbCTP.columns.adjust().draw();
    });

    //$('#danh-sach-mat-hang-bh').on('shown.bs.modal', function () {
    //    console.log('varo');
    //    if (filter_BH_MH.statusDraw < 1) {
    //        filter_BH_MH.statusDraw++;
    //        tbl_BH_MH.columns.adjust().draw();
    //    }
    //});
    //#Region chuyen tab bang dieu phoi don hang
    $('#profile-tab-dieu-phoi-don-hang-bh[data-toggle="tab"]').on('show.bs.tab', function () {
        ChangeTab = 1;
        if (BHDPSHOW < 1) {
            BHDPSHOW++;
            tbBanHangDP.draw();
        }
    })
    //end

    //#Region chuyen tab bang ban hang
    $('#home-tab-ds-don-hang-bh[data-toggle="tab"]').on('show.bs.tab', function () {
        ChangeTab = 0;
    })
    //end

    //#Region chuyen tab bang chia hang
    $('#contact-tab-chuyen-kho-chia-hang[data-toggle="tab"]').on('show.bs.tab', function () {
        ChangeTab = 3;
        if (BHCHSHOW < 1) {
            BHCHSHOW++;
            tbBanHangCH.draw();
        }
    })
    //end
    $('#table-chi-tiet-phieu tbody').on('click', 'td [id="xoa-ctphieu"]', function () {
        var Phieu = tbCTP.row($(this).closest('tr')).data();
        var it = this;
        console.log(Phieu.status);
        if (Phieu.status == 1 || Phieu.status == 2) {
            if (confirm("Bạn chắc chắn muốn xóa không")) {
                for (var i = 0; i < objmathang.length; i++) {
                    if (objmathang[i].MCTDID == Phieu.MCTDID) {
                        objmathang.splice(i, 1);
                        break;
                    }
                }
                tongchietkhau = 0;
                tongthue = 0;
                tongtienhang = 0;
                tbCTP.row($(it).closest('tr')).remove().draw();
                objMatHangDELETE.push({ "MCTDID": Phieu.MCTDID });
            }
            //$.ajax({
            //    method: "GET",
            //    url: "/BanHang/CheckRoleXoaBanHang",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (msg) {
            //        if (msg.status == 1) {
            //            if (confirm("Bạn chắc chắn muốn xóa không")) {
            //                for (var i = 0; i < objmathang.length; i++) {
            //                    if (objmathang[i].MCTDID == Phieu.MCTDID) {
            //                        objmathang.splice(i, 1);
            //                        break;
            //                    }
            //                }
            //                tongchietkhau = 0;
            //                tongthue = 0;
            //                tongtienhang = 0;
            //                tbCTP.row($(it).closest('tr')).remove().draw();
            //                objMatHangDELETE.push({ "MCTDID": Phieu.MCTDID });
            //            }
            //        } else if (msg.status == 2) {
            //            toast.create({
            //                title: 'Notification!',
            //                text: msg.message,
            //                icon: 'error_outline',
            //                classBackground: 'noti-error',
            //                timeout: 3000
            //            });
            //        }
            //        else if (msg.status == 3) {
            //            toast.create({
            //                title: 'Notification!',
            //                text: msg.message,
            //                icon: 'error_outline',
            //                classBackground: 'noti-error',
            //                timeout: 3000
            //            });
            //            location.reload();
            //        }
            //    }
            //})
        }
        else {
            for (var i = 0; i < objmathang.length; i++) {
                if (objmathang[i].MHID == Phieu.MHID) {
                    objmathang.splice(i, 1);
                    tongchietkhau = 0;
                    tongthue = 0;
                    tongtienhang = 0;
                    break;
                }
            }
            tbCTP.row($(it).closest('tr')).remove().draw();
        }
    });
    //Region update, delele Insert ChiTiet Phieu va Insert,update Phieu
    $('#btn-add-BH').click(function () {
        DetailBillAddUpdateDetele();
    });
    $('#btn-ghi-banhang').click(function () {
        DetailBillAddUpdateDetele();
    });
    //end

    //Region chuyển tiền thành tỉ lệ chiết khấu
    var CheckIs = false;
    $('input[name="check-chietkhau-tien"]').on('change', function () {
        CheckIs = $('input[name="check-chietkhau-tien"]').is(":checked")
        tongchietkhau = 0;
        tongthue = 0;
        tongtienhang = 0;
        tbCTP.clear();
        tbCTP.rows.add(objmathang);
        tbCTP.columns.adjust().draw();
    });
    //end

    //Region LoadKho dc sử dụng
    LoadKho().then((e) => {
        e.data.map((value) => {
            objKHOMH.push({ KHOID: value.KHOID, KHOCODE: value.KHOCODE });
        })
    })
    //end
    //$('#table-mat-hang-bh tbody').on('click', 'tr', function () {
    //    $(this).addClass('selected');
    //    $('#table-mat-hang-bh tbody tr').not(this).removeClass('selected');
    //});

    //Region chọn mặt hàng ở modal big
    //$("#table-mat-hang-bh").on('dblclick', 'tr', function () {
    //    $(this).addClass('selected');
    //    $('#table-mat-hang-bh tbody tr').not(this).removeClass('selected');
    //    tongtienhang = 0;
    //    tongchietkhau = 0;
    //    tongthue = 0;
    //    var idmh = $(this).attr("data-id");
    //    var kho = $("#sl-kho").val();
    //    $.ajax({
    //        type: "GET",
    //        url: '/MuaHang/loadMatHangbyMHID',
    //        contentType: "application/json; charset=utf-8",
    //        data: { mathangID: idmh, khoID: kho },
    //        dataType: "json",
    //        success: function (e) {
    //            if (e.data.length > 0) {
    //                let obj = {
    //                    SORTORDER: null,
    //                    MHID: e.data[0].MHID,
    //                    MHCODE: e.data[0].MHCODE,
    //                    MHTEN: e.data[0].MHTEN,
    //                    KHOTEN: e.data[0].KHOTEN,
    //                    SOLUONG: 0,
    //                    DONVI: e.data[0].DONVI,
    //                    null: '',
    //                    SoLuongTon: e.data[0].SoLuongTon,
    //                    null: '',
    //                    DONGIA: e.data[0].DONGIA,
    //                    TILETHUE: 0,
    //                    TILECHIETKHAU: 0,
    //                    THANHTIEN: 0,
    //                    GHICHU: e.data[0].GHICHU,
    //                    DONGIAEX: 0,
    //                    status: 0,
    //                    KHOID: e.data[0].KHOID,
    //                    TienChietKhau: 0
    //                }
    //                $("#danh-sach-mat-hang-bh").modal("hide");
    //                var exist = false;
    //                var index = 0;
    //                for (var i = 0; i < objmathang.length; i++) {
    //                    if (objmathang[i].MHID == obj.MHID) {
    //                        objmathang[i].SOLUONG++;
    //                        objmathang[i].status = 0;
    //                        exist = true;
    //                        index = i;
    //                        break;
    //                    }
    //                }
    //                if (exist == false) {
    //                    objmathang.push(obj);
    //                    MATHANGJSON = JSON.stringify(objmathang);
    //                    tbCTP.clear();
    //                    tbCTP.rows.add(objmathang);
    //                    tbCTP.columns.adjust().draw();
    //                    tbCTP.row(objmathang.length - 1).select();
    //                    tbCTP.row(objmathang.length - 1).scrollTo(false);
    //                }
    //                else if (exist == true) {
    //                    MATHANGJSON = JSON.stringify(objmathang);
    //                    tbCTP.clear();
    //                    tbCTP.rows.add(objmathang);
    //                    tbCTP.columns.adjust().draw();
    //                    tbCTP.row(index).select();
    //                    tbCTP.row(index).scrollTo(false);
    //                }
    //            }
    //        }
    //    });
    //});
    //end

    //Load Mat Hang Modal Big
    //let filter_BH_MH = {};
    //filter_BH_MH.statusDraw = 0;
    //var tbl_BH_MH = $('#table-mat-hang-bh').DataTable({
    //    serverSide: true,
    //    bFilter: true,
    //    bInfo: false,
    //    ajax: function (data, callback, setting) {
    //        if (filter_BH_MH.statusDraw > 0) {
    //            filter_BH_MH.draw = data.draw;
    //            filter_BH_MH.start = data.start;
    //            filter_BH_MH.length = data.length;
    //            filter_BH_MH.search = data.search["value"];
    //            filter_BH_MH.order = data.order[0].column;
    //            filter_BH_MH.dir = data.order[0].dir;
    //            $.ajax({
    //                type: 'GET',
    //                url: '/MuaHang/loadMatHang',
    //                data: filter_BH_MH,
    //                success: function (res) {

    //                }
    //            }).done(callback, () => {
    //                $('[data-toggle="popover"]').tooltip({
    //                    html: true,
    //                    hover: true
    //                });
    //            })
    //        }
    //    },
    //    columns: [
    //        {
    //            "targets": 0,
    //            "className": "text-left",
    //            "data": 'RowIndex',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-stt')
    //            }
    //        },
    //        {
    //            "targets": 1,
    //            "className": "text-left",
    //            "data": "MHCODE",
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-mahang')
    //            }
    //        },
    //        {
    //            "targets": 2,
    //            "className": "text-left",
    //            "data": 'MHTEN',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-tenhang')
    //                $(td).attr('title', $(td).find('span').html())
    //            },
    //            "render": function (data, type, full, meta) {

    //                return '<span class="shorter-text">' + data + '</span>';
    //            }
    //        },
    //        {
    //            "targets": 3,
    //            "className": "text-left",
    //            "data": 'MHALIAS',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-alias')
    //                $(td).attr('title', $(td).find('span').html())
    //            },
    //            "render": function (data, type, full, meta) {

    //                return '<span class="shorter-text">' + data + '</span>';
    //            }
    //        },
    //        {
    //            "targets": 4,
    //            "className": "text-left",
    //            "data": 'MHMOTA',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-mota')
    //                $(td).attr('title', $(td).find('span').html())

    //            },
    //            "render": function (data, type, full, meta) {

    //                return '<span class="shorter-text">' + data + '</span>';
    //            }
    //        },
    //        {
    //            "targets": 5,
    //            "className": "text-left",
    //            "data": 'MHLTEN',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-nhomhang')
    //            }
    //        },
    //        {
    //            "targets": 6,
    //            "className": "text-left",
    //            "data": 'GIANHAP',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-gianhap')

    //                var x = Math.floor($(td).html());
    //                $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
    //            }
    //        },
    //        {
    //            "targets": 7,
    //            "className": "text-left",
    //            "data": 'GIABANLE',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-giabanle')
    //                var x = Math.floor($(td).html());
    //                $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
    //            }
    //        },
    //        {
    //            "targets": 8,
    //            "className": "text-left",
    //            "data": 'GIABANBUON',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-giabanbuon')
    //                var x = Math.floor($(td).html());
    //                $(td).html(x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))

    //            }
    //        },
    //        {
    //            "targets": 9,
    //            "className": "text-left",
    //            "data": 'DONVI',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-dvt')
    //            }
    //        },
    //        {
    //            "targets": 10,
    //            "className": "text-left",
    //            "data": 'NCC',
    //            "createdCell": function (td) {
    //                $(td).attr('data-column', 'col-ncc')
    //            }
    //        },
    //    ],
    //    fnCreatedRow: function (nRow, data, iDataIndex) {
    //        $(nRow).attr('data-id', data.MHID);

    //    },
    //    scrollX: true,
    //    scrollResize: true,
    //    scrollY: 100,
    //    scrollCollapse: true,
    //    scroller: {
    //        loadingIndicator: true,
    //        displayBuffer: 100
    //    },
    //    autoWidth: true,
    //    pageLength: 5,
    //    lengthChange: false,

    //});
    //End 

    $('#btn-banle-bh').click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckChuyenBHHD",
                contentType: "application/json; charset=utf-8",
                data: { mdid: id },
                dataType: "json",
                success: function (msg) {
                    if (msg.rs) {
                        console.log(msg.link);
                        window.open(msg.link)
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
    });
    $("#btn-PO-mh").click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $.ajax({
                type: "POST",
                url: "/BanHang/LoadDataAddMH",
                contentType: "application/json; charset=utf-8",
                data: '{hd: "' + id + '"}',
                dataType: "json",
                success: function (msg) {
                    if (msg.rs == true) {
                        $('#sl-lydo').empty();
                        $('#sl-lydo').append(msg.lydo);
                        $('#sl-showroom').empty();
                        $('#sl-showroom').append(msg.showroom);
                        $('#sl-kho').empty();
                        $('#sl-kho').append(msg.kho);
                        $('#sl-ca').empty();
                        $('#sl-ca').append(msg.ca);
                        $('#sl-loaitien').empty();
                        $('#them-order input[name="txt-edit-ngaynhanhang"]').val(moment(new Date()).format('DD/MM/yyyy'));
                        $('#them-order input[name="txt-edit-ngaylapphieu"]').val(moment(new Date()).format('DD/MM/yyyy')).prop("disabled", true);
                        $('#sl-loaitien').append("<option value=" + msg.tiente.TIENTEID + ">" + msg.tiente.TIENTECODE + "</option>");
                        $('input[name="txt-edit-tigia"]').val(msg.tiente.TIGIA);
                        $('input[name="txt-edit-sophieu"]').val(msg.sophieu);
                        $('input[name="txt-edit-ISPO"]').val(true);
                        objmathang = msg.data;
                        tbCTP.clear();
                        tbCTP.rows.add(objmathang);
                        tbCTP.columns.adjust().draw();
                        getDataNCC();
                        $("#them-order").modal();

                    }
                    else if (msg.status == 2) {
                        $('#them-order').modal('hide');
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });

                    } else if (msg.status == 3) {
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
            });
        }
    })
    var setCall = 0;
    async function getDataNCC() {
        if (setCall == 0) {
            await LoadDataNCC().then((e) => {
                setCall++;
                // HTML Khach Hang
                e.dataNCC.map((value) => {
                    $('select[name="txt-edit-kh-so"]').append('<option value="' + value.KHID + '">' + value.KHCODE + '</option>');
                    $('select[name="txt-edit-tenkh-so"]').append('<option value="' + value.KHID + '">' + value.KHTEN + '</option>');
                    $('select[name="txt-edit-kh"]').next(".select2-container").hide();
                    $('select[name="txt-edit-tenkh"]').next(".select2-container").hide();

                    $('select[name="txt-edit-kh-so"]').select2({ dropdownParent: $("#them-order"), width: '125px' });
                    $('select[name="txt-edit-tenkh-so"]').select2({ dropdownParent: $("#them-order"), width: '160px' });
                    $('select[name="txt-edit-kh-so"]').next(".select2-container").show();
                    $('select[name="txt-edit-tenkh-so"]').next(".select2-container").show();
                })
            }).catch(() => { console.log('error') })
        }
        else {
            $('select[name="txt-edit-kh"]').next(".select2-container").hide();
            $('select[name="txt-edit-tenkh"]').next(".select2-container").hide();
            $('select[name="txt-edit-kh-so"]').next(".select2-container").show();
            $('select[name="txt-edit-tenkh-so"]').next(".select2-container").show();
        }

    }
    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/BanHang/CreateMatHangBanHangExcel`
        window.open(link)
    })
    $("#btnFileUploadBH").click(function () {
        $("#FileUploadBH").click();
    })
    $("#FileUploadBH").change(function (event) {
        let input, files;
        input = event.target;
        files = input.files;
        kho = $('select[name="sl-kho"]').val();
        Array.from(files).map((file, index) => {
            console.log(file);
            var formdata = new FormData();
            formdata.append('fileupload', file);
            formdata.append('khoid', kho);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/BanHang/ImportBH',
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
                                        "ViTri": msg.data[i].ViTri,
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
                            tbBanHangImport.clear();
                            tbBanHangImport.rows.add(objmathangimport);
                            console.log(objmathangimport);
                            tbBanHangImport.columns.adjust().draw();
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
    var tbBanHangImport = $('#table-import-bh').DataTable({
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
            url: "/BanHang/CheckRoleXuat",
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
        objmathang = [];
        tbCTP.clear();
        tbCTP.rows.add(objmathang);
        tbCTP.columns.adjust().draw();
        tbBanHangImport.columns.adjust().draw();
        var CountData = tbBanHangImport.data().count();
        $("#btn-ghi-import-bh").prop('disabled', true);
        if (CountData > 0) {
            $("#btn-ghi-import-bh").prop('disabled', false);
        }
    })
    $('#btn-nhap-bh').on('hidden.bs.modal', function (e) {
        objmathangimport = [];
        unique = [];
        tbBanHangImport.clear();
        tbBanHangImport.rows.add(objmathangimport);
        tbBanHangImport.columns.adjust().draw();
    })
    $("#btn-ghi-import-bh").click(function () {
        var CountData = tbBanHangImport.data().count();
        if (CountData > 0) {
            console.log(objmathangimport);
            objmathang = objmathangimport;
            tbCTP.clear();
            tbCTP.rows.add(objmathang);
            tbCTP.columns.adjust().draw();
            $("#btn-nhap-bh").modal('hide');
        }
    })


    $('#btn-chuyenkho-bh').click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckChuyenKhoBH",
                contentType: "application/json; charset=utf-8",
                data: { mdid: id },
                dataType: "json",
                success: function (msg) {
                    if (msg.rs) {
                        console.log(msg.link);
                        window.open(msg.link)
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
    });

    $('#btn-muahangtra-bh').click(function () {
        console.log('varo');
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            console.log('vaor asdf');
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckChuyenMuaHangTra",
                contentType: "application/json; charset=utf-8",
                data: { mdid: id },
                dataType: "json",
                success: function (msg) {
                    if (msg.rs) {
                        console.log(msg.link);
                        window.open(msg.link)
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
    });
    //Region Load Nhan Vien Va Khach Hang
    var LuuIDNV = null;
    LoadDataNvVAKh().then((e) => {
        // HTML Khach Hang
        e.dataKH.map((value) => {
            $('select[name="txt-edit-kh"]').append('<option value="' + value.KHID + '">' + value.KHCODE + '</option>');
            $('select[name="txt-edit-tenkh"]').append('<option value="' + value.KHID + '">' + value.KHTEN + '</option>');
        })

        // HTML Nhan Vien
        e.dataNV.map((value) => {
            $('select[name="txt-edit-manv"]').append('<option value="' + value.NVID + '">' + value.NVCODE + '</option>');
            $('select[name="txt-edit-tennv"]').append('<option value="' + value.NVID + '">' + value.NVTEN + '</option>');
        })

        // trigger KHach hang
        $('select[name="txt-edit-kh"]').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-edit-tenkh').val('08b4a294-8a88-4134-8761-e82cfa164152');
        $('select[name="txt-edit-tenkh"]').select2({ dropdownParent: $("#them-order"), width: '160px' });
        $('select[name="txt-edit-kh"]').select2({ dropdownParent: $("#them-order"), width: '125px' });

        // trigger Nhan Vien
        LuuIDNV = e.dataUser;
        $('select[name="txt-edit-manv"]').val(e.dataUser);
        $('select[name="txt-edit-tennv').val(e.dataUser);
        $('select[name="txt-edit-tennv"]').select2({ dropdownParent: $("#them-order"), width: '160px' });
        $('select[name="txt-edit-manv"]').select2({ dropdownParent: $("#them-order"), width: '125px' });
        if (e.dataUser != undefined) {
            $('select[name="txt-edit-tennv"]').prop("disabled", true);
            $('select[name="txt-edit-manv"]').prop("disabled", true);
            $('#button-danh-sach-nv').attr('data-target', ' ');
        }
    }).catch(() => { console.log('error') })
    //end

    //CheckRow In
    $('#btn-in-banhang').click(function () {
        InCTDonHang();
    })

    function InCTDonHang() {
        let id = $('input[name="txt-edit-id"]').val();
        if (id == "" || id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Đơn hàng chưa được tạo',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckRoleInDonHang",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.status == 1) {
                        let getOrder = tbCTP.order();
                        let Desc = getOrder[0][1];
                        let NumberOrder = getOrder[0][0];
                        let id = $('input[name="txt-edit-id"]').val();
                        var link = '/BanHang/InDonHang?mdid=' + id + '&srid=' + msg.SHOWROOM + '&desc=' + Desc + '&order=' + NumberOrder;
                        window.open(link);
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
    }
    //end


    //In phiếu click vào hóa đơn
    $("#btn-in-donhang").click(function () {
        let id = $('#table-don-dat-hang tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Thông Báo!',
                text: 'Hãy chọn một đơn hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
        else {
            $.ajax({
                method: "GET",
                url: "/BanHang/CheckRoleInDonHang",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.status == 1) {
                        var link = '/BanHang/InDonHang?mdid=' + id + '&srid=' + msg.SHOWROOM;
                        window.open(link);
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
    })
    //end


    //let idXepHang;
    async function DetailBillAddUpdateDetele() {
        console.log('varo');
        let $currentForm = $('#them-order');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                return false;
                break;
            }
        }
        var countdata = tbCTP.data().count();
        if (countdata < 0) {
            alert("Phải chọn ít nhất 1 mặt hàng ");
        }
        $currentForm.addClass('was-validated');

        var checkSelectTenTK = $('select[name="txt-edit-tenkh"]').next(".select2-container").is(":hidden");
        var checkSelectTK = $('select[name="txt-edit-kh"]').next(".select2-container").is(":hidden");
        if (checkSelectTenTK == false && checkSelectTK == false) {
            var maKH = $('#them-order select[name="txt-edit-kh"]').select2('data')[0].text;
            var tenkh = $('#them-order select[name="txt-edit-tenkh"]').select2('data')[0].text;
        }
        else {
            var maKH = $('#them-order select[name="txt-edit-kh-so"]').select2('data')[0].text;
            var tenkh = $('#them-order select[name="txt-edit-tenkh-so"]').select2('data')[0].text;
        }

        var idmh = $('#them-order input[name="txt-edit-id"]').val();

        var diachi = $('#them-order input[name="txt-edit-diachi"]').val();
        var manv = $('#them-order select[name="txt-edit-manv"]').select2('data')[0].text;
        var tennv = $('#them-order select[name="txt-edit-tennv"]').select2('data')[0].text;
        var guiden = $('#them-order select[name="sl-showroom"]').val();
        var lydo = $('#them-order select[name="sl-lydo"]').val();
        var loaitien = $('#them-order select[name="sl-loaitien"]').val();
        var sophieu = $('#them-order input[name="txt-edit-sophieu"]').val();
        var ngaylapphieu = $('#them-order input[name="txt-edit-ngaylapphieu"]').val();
        var ngaynhanhang = $('#them-order input[name="txt-edit-ngaynhanhang"]').val();
        var ca = $('#them-order select[name="sl-ca"]').val();
        var hanthanhtoan = $('#them-order input[name="txt-edit-hanthanhtoan"]').val();
        var diengiai = $('#them-order textarea[name="txt-edit-ghichu"]').val();
        var ISPO = $('input[name="txt-edit-ISPO"]').val();
        console.log(ISPO);
        var objchangebh = [];
        for (var key in objmathang) {
            if (objmathang[key].status == 0 || objmathang[key].status == 2) {
                objchangebh.push(objmathang[key]);
            }
        }
        console.log(objchangebh);
        MATHANGJSON = JSON.stringify(objchangebh);
        var objmuadon = MATHANGJSON;
        DELETEMATHANGJSON = JSON.stringify(objMatHangDELETE);
        var deletemuadon = DELETEMATHANGJSON;
        let data = new FormData();
        data.append("idmh", idmh);
        data.append("maKH", maKH);
        data.append("tenkh", tenkh);
        data.append("diachi", diachi);
        data.append("manv", manv);
        data.append("tennv", tennv);
        data.append("guiden", guiden);
        data.append("lydo", lydo);
        data.append("loaitien", loaitien);
        data.append("sophieu", sophieu);
        data.append("ngaylapphieu", ngaylapphieu);
        data.append("ngaynhanhang", ngaynhanhang);
        data.append("ca", ca);
        data.append("hanthanhtoan", hanthanhtoan);
        data.append("diengiai", diengiai);
        data.append("objmuadon", objmuadon);
        data.append("deletemuadon", deletemuadon);
        data.append("ISPO", ISPO)
        $.ajax({
            async: false,
            type: 'POST',
            url: '/BanHang/AddMuaDon',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                console.log(msg);
                if (msg.ajaxresult.status == 1) {
                    $('#them-order').modal('hide');
                    tbBanHang.ajax.reload();
                    //idXepHang = msg.id;
                    let MDID = msg.InsertMuaDon;
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                    if (MDID != undefined) {

                        if (msg.ISPO == false) {
                            $.ajax({
                                method: "GET",
                                url: "/BanHang/CheckRoleInDonHang",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (msg) {
                                    if (msg.status == 1) {
                                        let getOrder = tbCTP.order();
                                        let Desc = getOrder[0][1];
                                        let NumberOrder = getOrder[0][0];
                                        var link = '/BanHang/InDonHang?mdid=' + MDID + '&srid=' + msg.SHOWROOM + '&desc=' + Desc + '&order=' + NumberOrder;
                                        window.open(link);
                                    }
                                }
                            })
                        }
                        else if (msg.ISPO == true) {
                            let getOrder = tbCTP.order();
                            let Desc = getOrder[0][1];
                            let NumberOrder = getOrder[0][0];
                            var link = `/muahang/print?mdid= ` + MDID + '&srid=' + msg.SHOWROOM + '&desc=' + Desc + '&order=' + NumberOrder;
                            window.open(link)
                        }
                    }
                }
                else if (msg.ajaxresult.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else if (msg.ajaxresult.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.ajaxresult.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            },
            error: function (error) {
                console.log('e');
            }
        });
    }


    ////#region Xếp hàng
    //let tbXepHang_filterValues = {};
    //let iDraw = 0;
    //let tbXepHang = $('#table-xep-hang').DataTable({
    //    serverSide: true,
    //    bFilter: false,
    //    bInfo: false,
    //    ajax: function (data, callback, settings) {
    //        if (iDraw > 0) {
    //            tbXepHang_filterValues.draw = data.draw;
    //            tbXepHang_filterValues.start = data.start;
    //            tbXepHang_filterValues.length = data.length;
    //            tbXepHang_filterValues.order = data.order[0].column;
    //            tbXepHang_filterValues.dir = data.order[0].dir;

    //            $.ajax({
    //                url: '/BanHang/LoadXepHang',
    //                method: 'GET',
    //                data: tbXepHang_filterValues,
    //                success: function (msg) {
    //                    //if (msg.data.length == 0) {
    //                    //    toast.create({
    //                    //        title: 'Notification',
    //                    //        text: 'Không tìm thấy bản ghi nào thỏa mãn điều kiện',
    //                    //        icon: 'error-outline',
    //                    //        classBackground: 'noti-error',
    //                    //        timeout: 3000
    //                    //    });
    //                    //    return false;
    //                    //}
    //                    if (msg.status == 2) {
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: msg.message,
    //                            icon: 'error_outline',
    //                            classBackground: 'noti-error',
    //                            timeout: 3000
    //                        });
    //                        return false;
    //                    }
    //                    else if (msg.status == 3) {
    //                        if (tbXepHang_filterValues.draw != 1) {
    //                            toast.create({
    //                                title: 'Notification',
    //                                text: msg.message,
    //                                icon: 'error-outline',
    //                                classBackground: 'noti-error',
    //                                timeout: 3000
    //                            });
    //                            location.reload();
    //                            return false;
    //                        }
    //                    }
    //                }
    //            }).done(callback, () => { });
    //        }
    //    },

    //    columns: [
    //        { "data": "RowIndex" },
    //        { "data": "MDCODE" },
    //        { "data": "KHTEN" },
    //        { "data": "SOTIEN", "className": "text-right" },
    //        { "data": "GHICHU" },
    //        {
    //            "data": "MDID",
    //            "width": "53px",
    //            render: function (data, type, row) {
    //                return '<a type="button" id="print-xephang-bh" value="' + data + '" class="btn btn-success text-white mr-1"> In</a><a type="button" id="delete-xephang-bh" value="' + data + '" class="btn btn-danger text-white"> Hủy</a>';
    //            }
    //        },
    //    ],
    //    columnDefs: [
    //        { "width": "53px", "targets": 5 }
    //    ],
    //    fnCreatedRow: function (nRow, data, iDataIndex) {
    //        $(nRow).attr('data-id', data.MDID);
    //        $($(nRow).children()[3]).html(convertCurrency(parseFloat(data.SOTIEN).toFixed(0)));
    //    },

    //    scrollX: true,
    //    scrollResize: true,
    //    scrollY: 100,
    //    scrollCollapse: true,

    //    paging: true,
    //    searching: true,
    //    pageLength: 10,
    //    lengthChange: false,

    //    scroller: {
    //        loadingIndicator: true,
    //        displayBuffer: 50
    //    },
    //});

    //$('#btn-xephang-bh').on('click', function () {
    //    iDraw = 1;
    //    tbXepHang.clear().columns.adjust();
    //    tbXepHang.columns.adjust().draw();
    //});

    //$('#btn-ghi-xephang-banhang').on('click', async function () {
    //    await DetailBillAddUpdateDetele();
    //    //var id = $('#them-order input[name="txt-edit-id"]').val();
    //    let data = new FormData();
    //    data.append('MDID', idXepHang);
    //    $.ajax({
    //        async: true,
    //        type: 'POST',
    //        url: '/BanHang/InsertXepHang',
    //        data: data,
    //        contentType: false,
    //        processData: false,
    //        //success: function (rs) {
    //        //    if (rs.status == 1) {
    //        //        tbXepHang.ajax.reload();
    //        //        toast.create({
    //        //            title: 'Notification!',
    //        //            text: 'Thành công',
    //        //            icon: 'check',
    //        //            classBackground: 'noti-success',
    //        //            timeout: 3000
    //        //        });
    //        //    }
    //        //    else {
    //        //        toast.create({
    //        //            title: 'Notification!',
    //        //            text: rs.message,
    //        //            icon: 'error_outline',
    //        //            classBackground: 'noti-error',
    //        //            timeout: 3000
    //        //        });
    //        //    }
    //        //},
    //        //error: function (error) {
    //        //    console.log(error);
    //        //}
    //    });
    //});


    //$('#table-xep-hang tbody').on('click', 'a[type="button"]', function () {
    //    var id = $(this).attr('value');
    //    if ($(this).attr('id') == 'delete-xephang-bh') {
    //        if (confirm('Bạn chắc chắn muốn hủy xếp hàng cho đơn này không?')) {
    //            $.ajax({
    //                async: true,
    //                method: 'GET',
    //                url: '/BanHang/DeleteXepHang?id=' + id,
    //                success: function (msg) {
    //                    if (msg.rs) {
    //                        tbXepHang.ajax.reload();
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: 'Thành công',
    //                            icon: 'check',
    //                            classBackground: 'noti-success',
    //                            timeout: 3000
    //                        });
    //                    }
    //                    else {
    //                        toast.create({
    //                            title: 'Notification!',
    //                            text: msg.message,
    //                            icon: 'error_outline',
    //                            classBackground: 'noti-error',
    //                            timeout: 3000
    //                        });
    //                    }
    //                }
    //            });
    //        }
    //    }
    //    else {
    //        $.ajax({
    //            method: "GET",
    //            url: "/BanHang/CheckRoleInDonHang",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (msg) {
    //                if (msg.status == 1) {
    //                    //var link = '/BanHang/InDonHang?mdid=' + id;
    //                    var link = '/BanHang/InDonHang?mdid=' + id + '&srid=' + msg.SHOWROOM;
    //                    window.open(link);
    //                }
    //                else if (msg.status == 2) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                }
    //                else if (msg.status == 3) {
    //                    toast.create({
    //                        title: 'Notification!',
    //                        text: msg.message,
    //                        icon: 'error_outline',
    //                        classBackground: 'noti-error',
    //                        timeout: 3000
    //                    });
    //                    location.reload();
    //                }
    //            }
    //        })
    //    }
    //    //if (idPhieuChuyenKho.val() != '') {
    //    //    if (confirm('Bạn chắc chắn muốn xóa không?')) {
    //    //        var id = $(this).val();
    //    //        var removeIndex = dataTempChuyenKho.map(function (item) {
    //    //            return item.MHID
    //    //        }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

    //    //        dataTempChuyenKho.splice(removeIndex, 1); //Remove
    //    //    }
    //    //}
    //    //else {
    //    //    var id = $(this).val();
    //    //    var removeIndex = dataTempChuyenKho.map(function (item) {
    //    //        return item.MHID
    //    //    }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

    //    //    dataTempChuyenKho.splice(removeIndex, 1); //Remove
    //    //}

    //    //tbChiTietMatHang.clear().columns.adjust().draw();
    //    //tbChiTietMatHang.rows.add(dataTempChuyenKho);
    //    //tbChiTietMatHang.columns.adjust().draw();
    //});
    ////#endregion
});

//end document.ready
async function LoadDataNvVAKh() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadDataNvVAKh',
        success: function (res) {
            console.log(res);
            return res;
        }
    });
}

async function LoadDataNCC() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadDataNCC',
        success: function (res) {
            console.log(res);
            return res;
        }
    });
}

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

async function LoadKho() {
    return $.ajax({
        async: true,
        type: 'GET',
        url: '/BanHang/LoadKho',
        success: function (res) {
            return res.data;
        }
    });
}
async function LoadMuaDonCT(hd) {
    return $.ajax({
        async: true,
        url: '/BanHang/ChiTietPhieuData',
        method: 'GET',
        data: { muadonID: hd },
        success: function (msg) {
            return msg.data;
        }
    })
}
$(document).on('click', '.LoadDataAddOrder', function () {
    LoadDataAddOrder();
});
function LoadDataAddOrder() {
    $.ajax({
        type: "POST",
        url: "/BanHang/LoadDataAdd",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.rs == true) {
                $("#nhap-bh").removeClass('disabled-dia-chi');
                $('#sl-lydo').empty();
                $('#sl-lydo').append(msg.lydo);
                $('#sl-showroom').empty();
                $('#sl-showroom').append(msg.showroom);
                $('#sl-kho').empty();
                $('#sl-kho').append(msg.kho);
                $('#sl-ca').empty();
                $('#sl-ca').append(msg.ca);
                $('#sl-loaitien').empty();
                $('#sl-loaitien').append("<option value=" + msg.tiente.TIENTEID + ">" + msg.tiente.TIENTECODE + "</option>");
                $('input[name="txt-edit-tigia"]').val(msg.tiente.TIGIA);
                $('input[name="txt-edit-sophieu"]').val(msg.sophieu);
                $('#them-order input[name="txt-edit-ngaynhanhang"]').val(moment(new Date()).format('DD/MM/yyyy'));
                $('#them-order input[name="txt-edit-ngaylapphieu"]').val(moment(new Date()).format('DD/MM/yyyy')).prop("disabled", true);
                $('#them-order #sl-statushd').val(0);
                $("#them-order").modal();
            }
            else if (msg.status == 2) {
                $('#them-order').modal('hide');
                toast.create({
                    title: 'Notification!',
                    text: msg.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });

            } else if (msg.status == 3) {
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
    });

}
//end

function convertCurrency(value) {
    let regx = /\D+/g;
    let number = value.toString().replace(regx, "");
    return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
$('select[name="txt-edit-bonus-hanthanhtoan"]').on("change", function () {
    var d = new Date();
    var getsl = $('select[name="txt-edit-bonus-hanthanhtoan"]').val();
    var addDay = d.setDate(d.getDate() + parseInt(getsl));
    var fullDate = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    $('input[name="txt-edit-hanthanhtoan"]').val(fullDate);
})

function GetSoluongTon(formdata) {
    return $.ajax({
        type: 'POST',
        url: '/BanHang/SoluongTon',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (res) {
            if (res.status == 2) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return res.data
            }
            else {
                return res.data
            }
        }
    })
}
async function GetSoluongTonChiTiet(formdata) {
    return $.ajax({
        type: 'POST',
        async: true,
        url: '/BanHang/SoluongTonChiTietMH',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (res) {
            if (res.status == 2) {
                toast.create({
                    title: 'Notification!',
                    text: res.message,
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return res.data

            }
            else {
                return res.data
            }
        }
    })
}

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