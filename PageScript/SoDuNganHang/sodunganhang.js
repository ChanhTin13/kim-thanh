$(document).ready(function () {
    //#region Sổ ngân hàng
    $('#so-ngan-hang').on('shown.bs.modal', function () {
        $('#so-ngan-hang input[name="fdate"]').val(moment(new Date()).format('DD/MM/yyyy'));
        $('#so-ngan-hang input[name="tdate"]').val(moment(new Date()).format('DD/MM/yyyy'));
        iDraw_SNH_SR = 1;
        tbChiNhanhSNH.clear().columns.adjust();
        tbChiNhanhSNH.columns.adjust().draw();

        iDraw_SNH_NH = 1;
        tbNganHang.clear().columns.adjust();
        tbNganHang.columns.adjust().draw();

    });

    let iDraw_SNH_SR = 0;
    let tbChiNhanhSNH_filterValues = {};
    var tbChiNhanhSNH = $('#table-snh').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_SNH_SR > 0) {
                tbChiNhanhSNH_filterValues.draw = data.draw;
                tbChiNhanhSNH_filterValues.search = data.search["value"];
                tbChiNhanhSNH_filterValues.start = data.start;
                tbChiNhanhSNH_filterValues.length = data.length;
                tbChiNhanhSNH_filterValues.order = data.order[0].column;
                tbChiNhanhSNH_filterValues.dir = data.order[0].dir;
                $.ajax({
                    url: '/ChiNhanh/LoadChiNhanh',
                    method: 'GET',
                    data: tbChiNhanhSNH_filterValues,
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
                            if (tbChiNhanhSNH_filterValues.draw != 1) {
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
            }
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID);
        },
        columns: [
            { "data": "TEN" },
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
        ],
        columnDefs: [
            { targets: [0], orderable: true }
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollX: true,
        scrollResize: false,
        scrollY: 200,
        scrollCollapse: true,
        scroller: true,

        paging: true,
        searching: false,
        pageLength: 5,
    });

    $('#so-ngan-hang input[name=checkALL]').on('click', function () {
        if (this.checked) {
            $('#table-snh tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').attr('checked', 'checked');
            })
        } else {
            $('#table-snh tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').removeAttr('checked');
            })
        }

    })

    $('#so-ngan-hang input[name="SoNganHang-Time"]').on('change', function () {
        let fdate;
        let tdate;
        if ($('#xem-1').hasClass('active')) {
            fdate = $('#so-ngan-hang #xem-1 input[name="fdate"]');
            tdate = $('#so-ngan-hang #xem-1 input[name="tdate"]');
        }
        else {
            fdate = $('#so-ngan-hang #xem-2 input[name="fdate"]');
            tdate = $('#so-ngan-hang #xem-2 input[name="tdate"]');
        }
        if ($(this).val() == 0) {
            fdate.prop('disabled', true);
            tdate.prop('disabled', true);
        }
        else {
            fdate.prop('disabled', false);
            tdate.prop('disabled', false);
        }
    });

    let iDraw_SNH_NH = 0;
    let tbNganHang_filterValues = {};
    var tbNganHang = $('#table-taikhoan').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_SNH_NH > 0) {
                tbNganHang_filterValues.draw = data.draw;
                tbNganHang_filterValues.search = data.search["value"];
                tbNganHang_filterValues.start = data.start;
                tbNganHang_filterValues.length = data.length;
                tbNganHang_filterValues.order = data.order[0].column;
                tbNganHang_filterValues.dir = data.order[0].dir;
                $.ajax({
                    url: '/NganHang/LoadNganHang',
                    method: 'GET',
                    data: tbNganHang_filterValues,
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
                            if (tbNganHang_filterValues.draw != 1) {
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
            }
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "CODE" },
            { "data": "NAME" },
            { "data": "ACCOWNER" },
            { "data": "ACCNUMBER" },
            { "data": "NOTE" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
        },
        columnDefs: [
            { targets: [0], orderable: true }
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 200,
        scrollCollapse: true,
        scroller: true,

        paging: true,
        searching: false,
        pageLength: 5,
    });

    //Click
    $('#table-taikhoan tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-taikhoan tbody tr').not(this).removeClass('selected');
    });

    $('#btn-xem-qnh').on('click', function () {
        let fdate = null;
        let tdate = null;

        let xem = 0;

        if ($('#xem-1').hasClass('active')) {
            xem = 1;
            var value = $('#so-ngan-hang input[name="SoNganHang-Time"]:checked').val();
            if (value == 0) {
                var date = new Date();
                var firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/yyyy');
                var lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD/MM/yyyy');
                fdate = firstDay;
                tdate = lastDay;
            }
            else if (value == 1) {
                fdate = $('#so-ngan-hang #xem-1 input[name="fdate"]').val();
                tdate = $('#so-ngan-hang #xem-1 input[name="tdate"]').val();
            }

            var checkedSR = new Array();
            $('#table-snh tbody tr input[type=checkbox]').each(function () {
                if (this.checked) {
                    var val = tbChiNhanhSNH.row($(this).parent('td')).data();
                    checkedSR.push(val.SRID);
                }
            });
            if (checkedSR.length === 0) {
                toast.create({
                    title: 'Notification',
                    text: 'Hãy chọn chi nhánh trước khi tìm kiếm',
                    icon: 'error-outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return false;
            }

            var filterReport = {};
            filterReport.fdate = fdate;
            filterReport.tdate = tdate;
            filterReport.srid = checkedSR;

            var link = `/SoDuNganHang/LoadChiTietNganHang?xem=` + xem +
                `&fdate=` + filterReport.fdate +
                `&tdate=` + filterReport.tdate +
                `&srid=` + filterReport.srid;
            window.open(link);
        }
        else {
            xem = 2;
            let id = $('#table-taikhoan tbody tr.selected').attr('data-id');
            if (id != undefined) {
                fdate = $('#so-ngan-hang #xem-2 input[name="fdate"]').val();
                tdate = $('#so-ngan-hang #xem-2 input[name="tdate"]').val();

                var filterReport = {};
                filterReport.fdate = fdate;
                filterReport.tdate = tdate;
                filterReport.id = id;

                var link = `/SoDuNganHang/LoadChiTietNganHang?xem=` + xem +
                    `&fdate=` + filterReport.fdate +
                    `&tdate=` + filterReport.tdate +
                    `&id=` + filterReport.id;
                window.open(link);
            } else {
                toast.create({
                    title: 'Notification!',
                    text: 'Vui lòng chọn ngân hàng',
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                });
                return false;
            }
        }

        $('#so-ngan-hang').modal('hide');
    });
    //#endregion

    //#region Sổ dư ngân hàng
    let iDraw_SDNH = 0;
    let tbSoDuNganHang_filterValues = {};

    $('#table-so-du-ngan-hang thead tr').clone(true).appendTo('#table-so-du-ngan-hang thead');
    $('#table-so-du-ngan-hang thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 4 || i == 5 || i == 6) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-so-du-ngan-hang="' + i + '" /> ');
        }
        else if (i == 8) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-so-du-ngan-hang', i);
            var data7 = [{ key: '--Theo dõi--', value: '' },
            { key: 'True', value: '1' },
            { key: 'False', value: '0' }];
            data7.map((e) => {
                var op = document.createElement("option");
                op.text = e.key
                op.value = e.value
                x.options.add(op)
            })
            $(this).html(x);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-so-du-ngan-hang="' + i + '"/>');
        }
    });

    var tbSoDuNganHang = $('#table-so-du-ngan-hang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_SDNH > 0) {
                tbSoDuNganHang_filterValues.draw = data.draw;
                tbSoDuNganHang_filterValues.start = data.start;
                tbSoDuNganHang_filterValues.length = data.length;
                tbSoDuNganHang_filterValues.order = data.order[0].column;
                tbSoDuNganHang_filterValues.dir = data.order[0].dir;

                tbSoDuNganHang_filterValues.search1 = $('input[data-search-so-du-ngan-hang=1]').val();
                tbSoDuNganHang_filterValues.search2 = $('input[data-search-so-du-ngan-hang=2]').val();
                tbSoDuNganHang_filterValues.search3 = $('input[data-search-so-du-ngan-hang=3]').val();
                tbSoDuNganHang_filterValues.search4 = $('input[data-search-so-du-ngan-hang=4]').val();
                tbSoDuNganHang_filterValues.search5 = $('input[data-search-so-du-ngan-hang=5]').val();
                tbSoDuNganHang_filterValues.search6 = $('input[data-search-so-du-ngan-hang=6]').val();
                tbSoDuNganHang_filterValues.search7 = $('input[data-search-so-du-ngan-hang=7]').val();
                tbSoDuNganHang_filterValues.search8 = $('select[data-search-so-du-ngan-hang=8]').val();

                $.ajax({
                    url: '/SoDuNganHang/LoadSoDuNganHang',
                    method: 'GET',
                    data: tbSoDuNganHang_filterValues,
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
                            if (tbSoDuNganHang_filterValues.draw != 1) {
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
            }
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.QID);
            $($(nRow).children()[3]).html(convertCurrency(data.TIENMAT));
            $($(nRow).children()[4]).html(moment(data.CREATED).format('DD/MM/yyyy'));
            $($(nRow).children()[5]).html(moment(data.UPDATED).format('DD/MM/yyyy'));
            $($(nRow).children()[6]).html(moment(data.CHANGED).format('DD/MM/yyyy'));
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
                var tongTienMat = Math.round(data[0].TONGTIENMAT);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(3).footer()).html(tongTienMat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(3).footer()).html(0).addClass('text-right');
            }
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "SRTEN" },
            { "data": "NGANHANGTEN" },
            { "data": "TIENMAT", "className": "text-right" },
            { "data": "CREATED" },
            { "data": "UPDATED" },
            { "data": "CHANGED" },
            { "data": "GHICHU" },
            {
                "data": "VISIBLE",
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
                className: "text-center"
            }
        ],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: false,
        pageLength: 10,
        lengthChange: false,
        orderCellsTop: true
    });

    $(tbSoDuNganHang.table().container()).on('keyup change', 'thead input', function (e) {
        tbSoDuNganHang.draw();
    });
    $(tbSoDuNganHang.table().container()).on('change', 'thead select', function () {
        tbSoDuNganHang.draw();
    });

    //Click
    $('#table-so-du-ngan-hang tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-so-du-ngan-hang tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-so-du-ngan-hang tbody').on('dblclick', 'tr', function () {
        LoadSoDuNganHang();
    });

    //Insert
    $('#so-du-ngan-hang #btn-insert-sdnh').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/SoDuNganHang/CheckInsert',
            success: function (msg) {
                if (msg.rs) {
                    $('#them-so-du-ngan-hang input[name="QID"]').val('');
                    $('#them-so-du-ngan-hang input[name="fcTienMat"]').val(0);
                    $('#them-so-du-ngan-hang input[name="tienMat"]').val(0);
                    $('#them-so-du-ngan-hang input[name="ghiChu"]').val('');
                    $('#them-so-du-ngan-hang select[name="slNHID"]').prop("selectedIndex", 0);
                    $('#them-so-du-ngan-hang select[name="slNHID"]').prop('disabled', false);
                    $('#them-so-du-ngan-hang input[name="ckVisible"]').prop('checked', true);
                    $('#them-so-du-ngan-hang input[name="dateCreate"]').val(moment(new Date()).format('DD/MM/yyyy'));
                    $('#them-so-du-ngan-hang').modal();
                } else {
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
    });

    //Update
    $('#so-du-ngan-hang #btn-update-sdnh').on('click', function () {
        LoadSoDuNganHang();
    });

    //Save
    $('#them-so-du-ngan-hang #btn-save-sdnh').on('click', function () {
        let $currentForm = $('#them-so-du-ngan-hang');
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
        data.append("QID", $('#them-so-du-ngan-hang input[name="QID"]').val());
        data.append("SRID", $('#them-so-du-ngan-hang select[name="slSRID"] option:selected').val());
        data.append("NHID", $('#them-so-du-ngan-hang select[name="slNHID"] option:selected').val());
        data.append("CREATED", $('#them-so-du-ngan-hang input[name="dateCreate"]').val());
        data.append("FCTIENMAT", $('#them-so-du-ngan-hang input[name="fcTienMat"]').val());
        data.append("TIENMAT", $('#them-so-du-ngan-hang input[name="tienMat"]').val());
        data.append("GHICHU", $('#them-so-du-ngan-hang input[name="ghiChu"]').val());
        data.append("VISIBLE", $('#them-so-du-ngan-hang input[name="ckVisible"]').prop('checked'));
        $.ajax({
            async: false,
            type: 'POST',
            url: '/SoDuNganHang/InsertUpdateSoDuNganHang',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbSoDuNganHang.ajax.reload();
                    $('#them-so-du-ngan-hang').modal('hide');
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

    function LoadSoDuNganHang() {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/SoDuNganHang/CheckUpdate',
            success: function (msg) {
                if (msg.rs) {
                    let id = $('#table-so-du-ngan-hang tbody tr.selected').attr('data-id');
                    if (id != undefined) {
                        DetailSoDuNganHang(id).then((rs) => {
                            $('#them-so-du-ngan-hang input[name="QID"]').val(rs.data.QID);
                            $('#them-so-du-ngan-hang select[name="slSRID"]').val(rs.data.SRID);
                            $('#them-so-du-ngan-hang select[name="slNHID"]').val(rs.data.NHID);
                            $('#them-so-du-ngan-hang select[name="slNHID"]').prop('disabled', true);
                            $('#them-so-du-ngan-hang input[name="dateCreate"]').val(moment(rs.data.CREATED).format('DD/MM/yyyy'));
                            $('#them-so-du-ngan-hang input[name="fcTienMat"]').val(convertCurrency(rs.data.FCTIENMAT));
                            $('#them-so-du-ngan-hang input[name="tienMat"]').val(convertCurrency(rs.data.TIENMAT));
                            $('#them-so-du-ngan-hang input[name="ghiChu"]').val(rs.data.GHICHU);
                            $('#them-so-du-ngan-hang input[name="ckVisible"]').prop('checked', rs.data.VISIBLE);

                            $('#them-so-du-ngan-hang').modal();
                        });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn ngân hàng',
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
            }
        });
    }
    async function DetailSoDuNganHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/SoDuNganHang/Detail?qid=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    }

    $('#so-du-ngan-hang').on('shown.bs.modal', function () {
        iDraw_SDNH = 1;
        LoadListNganHang();
        LoadListShowRoom();
        tbSoDuNganHang.clear().columns.adjust();
        tbSoDuNganHang.columns.adjust().draw();
    });

    function LoadListNganHang() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/SoDuNganHang/LoadNganHang',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    for (var i = 0; i < d.length; i++) {
                        let o = new Option(d[i].NAME, d[i].ID);
                        $('#them-so-du-ngan-hang select[name="slNHID"]').append(o);
                    }
                }
            }
        })
    }
    function LoadListShowRoom() {
        $.ajax({
            async: false,
            method: 'GET',
            url: '/SoDuNganHang/LoadShowRoom',
            success: function (msg) {
                let d = msg.data;
                if (d != null) {
                    let op = new Option(d.TEN, d.SRID);
                    $('#them-so-du-ngan-hang select[name="slSRID"]').append(op);
                }
            }
        })
    }
    //#endregion 

    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    function ckstring(str) { //check null empty
        return (!str || /^\s*$/.test(str));
    }

    $('.search-date').datetimepicker({
        timepicker: false,
        format: 'd/m/Y',
        mask: true,
    });
});