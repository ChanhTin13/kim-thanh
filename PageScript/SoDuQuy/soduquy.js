$(document).ready(function () {
    //#region Sổ quỹ
    $('#so-quy').on('shown.bs.modal', function () {
        $('#so-quy input[name="fdate"]').val(moment(new Date()).format('DD/MM/yyyy'));
        $('#so-quy input[name="tdate"]').val(moment(new Date()).format('DD/MM/yyyy'));
        iDraw_SQ_SR = 1;
        tbChiNhanhSQ.clear().columns.adjust();
        tbChiNhanhSQ.columns.adjust().draw();
    });

    let iDraw_SQ_SR = 0;
    let tbChiNhanhSQ_filterValues = {};
    var tbChiNhanhSQ = $('#table-tonghopquy').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_SQ_SR > 0) {
                tbChiNhanhSQ_filterValues.draw = data.draw;
                tbChiNhanhSQ_filterValues.search = data.search["value"];
                tbChiNhanhSQ_filterValues.start = data.start;
                tbChiNhanhSQ_filterValues.length = data.length;
                tbChiNhanhSQ_filterValues.order = data.order[0].column;
                tbChiNhanhSQ_filterValues.dir = data.order[0].dir;
                $.ajax({
                    url: '/ChiNhanh/LoadChiNhanh',
                    method: 'GET',
                    data: tbChiNhanhSQ_filterValues,
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
                            if (tbChiNhanhSQ_filterValues.draw != 1) {
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

    $('#so-quy input[name=checkALL]').on('click', function () {
        if (this.checked) {
            $('#table-tonghopquy tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').attr('checked', 'checked');
            })
        } else {
            $('#table-tonghopquy tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').removeAttr('checked');
            })
        }

    })

    $('#so-quy input[name="SoQuy-Time"]').on('change', function () {
        if ($(this).val() == 0) {
            $('#so-quy input[name="fdate"]').prop('disabled', true);
            $('#so-quy input[name="tdate"]').prop('disabled', true);
        }
        else {
            $('#so-quy input[name="fdate"]').prop('disabled', false);
            $('#so-quy input[name="tdate"]').prop('disabled', false);
        }
    });

    let fdate = null;
    let tdate = null;
    let xml = null;
    let iDraw_XemNhanhSDQ = 0;

    var tbXemNhanhSDQ_filterValues= {};
    //Datatable Xem nhanh sổ dư quỹ
    var tbXemNhanhSDQ = $('#table-xem-nhanh-so-du-quy').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_XemNhanhSDQ > 0) {
                tbXemNhanhSDQ_filterValues.draw = data.draw;

                tbXemNhanhSDQ_filterValues.fdate = fdate;
                tbXemNhanhSDQ_filterValues.tdate = tdate;
                tbXemNhanhSDQ_filterValues.xml = xml;

                tbXemNhanhSDQ_filterValues.start = data.start;
                tbXemNhanhSDQ_filterValues.length = data.length;
                tbXemNhanhSDQ_filterValues.order = data.order[0].column;
                tbXemNhanhSDQ_filterValues.dir = data.order[0].dir;
                tbXemNhanhSDQ_filterValues.export = 0;

                $.ajax({
                    url: '/SoDuQuy/LoadXemNhanh',
                    method: 'GET',
                    data: tbXemNhanhSDQ_filterValues,
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
                            if (tbXemNhanhSDQ_filterValues.draw != 1) {
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
            { "data": "SRTEN" },
            { "data": "SODUCUOIKY", "className": "text-right" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.SRID);
            $($(nRow).children()[2]).html(convertCurrency(data.SODUCUOIKY));
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
                var tong = Math.round(data[0].TONG);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('font-weight-bold');
                $(api.column(2).footer()).html(tong.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right font-weight-bold');
            } else {
                $(api.column(1).footer()).html(0).addClass('font-weight-bold');
                $(api.column(2).footer()).html(0).addClass('text-right font-weight-bold');
            }
        },

        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: false,

        paging: true,
        searching: false,
        pageLength: 10,
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 50
        },
    });

    //Click
    $('#table-xem-nhanh-so-du-quy tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-xem-nhanh-so-du-quy tbody tr').not(this).removeClass('selected');
    });

    //Xem nhanh sổ dư quỹ
    $('#so-quy #xemnhanh_sdq').on('click', function () {
        var value = $('#so-quy input[name="SoQuy-Time"]:checked').val();
        if (value == 0) {
            var date = new Date();
            var firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/yyyy');
            var lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD/MM/yyyy');
            fdate = firstDay;
            tdate = lastDay;
        }
        else if (value == 1) {
            fdate = $('#so-quy input[name="fdate"]').val();
            tdate = $('#so-quy input[name="tdate"]').val();
        }

        var checkedSR = new Array();
        $('#table-tonghopquy tbody tr input[type=checkbox]').each(function () {
            if (this.checked) {
                var val = tbChiNhanhSQ.row($(this).parent('td')).data();
                var obj = {
                    ColumnID: val.SRID
                };
                checkedSR.push(obj);
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
                TableID: function () {
                    return 'TableID'
                }
            }
        };
        var template = templateMaker(obj);
        var data = {
            TableID: checkedSR
        }
        rendered = template(data);

        iDraw_XemNhanhSDQ = 1;
        xml = JSON.stringify(rendered);

        tbXemNhanhSDQ.clear().columns.adjust();
        tbXemNhanhSDQ.columns.adjust().draw();

        $('#xem-nhanh-so-du-quy').modal();
    });

    //Xem chi tiết quỹ
    $('#so-quy #xemchitiet_sdq').on('click', function () {
        var value = $('#so-quy input[name="SoQuy-Time"]:checked').val();
        if (value == 0) {
            var date = new Date();
            var firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/yyyy');
            var lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD/MM/yyyy');
            fdate = firstDay;
            tdate = lastDay;
        }
        else if (value == 1) {
            fdate = $('#so-quy input[name="fdate"]').val();
            tdate = $('#so-quy input[name="tdate"]').val();
        }

        var checkedSR = new Array();
        $('#table-tonghopquy tbody tr input[type=checkbox]').each(function () {
            if (this.checked) {
                var val = tbChiNhanhSQ.row($(this).parent('td')).data();
                var obj = {
                    ColumnID: val.SRID
                };
                checkedSR.push(obj);
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
                TableID: function () {
                    return 'TableID'
                }
            }
        };
        var template = templateMaker(obj);
        var data = {
            TableID: checkedSR
        }
        rendered = template(data);

        xml = JSON.stringify(rendered);

        var filterReport = {};
        filterReport.fdate = fdate;
        filterReport.tdate = tdate;
        filterReport.xml = xml;
        filterReport.justVND = $('#so-quy input[name="justVND"]').is(':checked') ? "true" : "false";
        var link = `/SoDuQuy/LoadChiTietQuy?fdate=` + filterReport.fdate +
            `&tdate=` + filterReport.tdate +
            `&justVND=` + filterReport.justVND +
            `&xml=` + filterReport.xml;
        window.open(link);
    });

    $('#table-xem-chi-tiet-quy').DataTable();
    //#endregion


    //#region Sổ dư quỹ
    let iDraw_SDQ = 0;
    let tbSoDuQuy_filterValues = {};

    $('#table-so-du-quy thead tr').clone(true).appendTo('#table-so-du-quy thead');
    $('#table-so-du-quy thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 3 || i == 4 || i == 5) {
            $(this).html('<input class="search-date" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-so-du-quy="' + i + '" /> ');
        }
        else if (i == 7) {
            var x = document.createElement("SELECT");
            x.setAttribute('data-search-so-du-quy', i);
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
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-so-du-quy="' + i + '"/>');
        }
    });

    var tbSoDuQuy = $('#table-so-du-quy').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw_SDQ > 0) {
                tbSoDuQuy_filterValues.draw = data.draw;
                tbSoDuQuy_filterValues.start = data.start;
                tbSoDuQuy_filterValues.length = data.length;
                tbSoDuQuy_filterValues.order = data.order[0].column;
                tbSoDuQuy_filterValues.dir = data.order[0].dir;

                tbSoDuQuy_filterValues.search1 = $('input[data-search-so-du-quy=1]').val();
                tbSoDuQuy_filterValues.search2 = $('input[data-search-so-du-quy=2]').val();
                tbSoDuQuy_filterValues.search3 = $('input[data-search-so-du-quy=3]').val();
                tbSoDuQuy_filterValues.search4 = $('input[data-search-so-du-quy=4]').val();
                tbSoDuQuy_filterValues.search5 = $('input[data-search-so-du-quy=5]').val();
                tbSoDuQuy_filterValues.search6 = $('input[data-search-so-du-quy=6]').val();
                tbSoDuQuy_filterValues.search7 = $('select[data-search-so-du-quy=7]').val();

                $.ajax({
                    url: '/SoDuQuy/LoadSoDuQuy',
                    method: 'GET',
                    data: tbSoDuQuy_filterValues,
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
                            if (tbSoDuQuy_filterValues.draw != 1) {
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
            $($(nRow).children()[2]).html(convertCurrency(data.TIENMAT));
            $($(nRow).children()[3]).html(moment(data.CREATED).format('DD/MM/yyyy'));
            $($(nRow).children()[4]).html(moment(data.UPDATED).format('DD/MM/yyyy'));
            $($(nRow).children()[5]).html(moment(data.CHANGED).format('DD/MM/yyyy'));
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
                $(api.column(2).footer()).html(tongTienMat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(2).footer()).html(0).addClass('text-right');
            }
        },
        columns: [
            { "data": "RowIndex" },
            { "data": "SRTEN" },
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

    $(tbSoDuQuy.table().container()).on('keyup change', 'thead input', function (e) {
        tbSoDuQuy.draw();
    });
    $(tbSoDuQuy.table().container()).on('change', 'thead select', function () {
        tbSoDuQuy.draw();
    });

    //Click
    $('#table-so-du-quy tbody').on('click', 'tr', function () {
        $(this).addClass('selected');
        $('#table-so-du-quy tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $('#table-so-du-quy tbody').on('dblclick', 'tr', function () {
        LoadSoDuQuy();
    });

    //Insert
    $('#so-du-quy #btn-insert-sdq').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/SoDuQuy/CheckInsert',
            success: function (msg) {
                if (msg.rs) {
                    $('#them-so-du-quy input[name="QID"]').val('');
                    $('#them-so-du-quy input[name="fcTienMat"]').val(0);
                    $('#them-so-du-quy input[name="tienMat"]').val(0);
                    $('#them-so-du-quy input[name="ghiChu"]').val('');
                    $('#them-so-du-quy select[name="slNHID"]').prop("selectedIndex", 0);
                    $('#them-so-du-quy select[name="slNHID"]').prop('disabled', false);
                    $('#them-so-du-quy input[name="ckVisible"]').prop('checked', true);
                    $('#them-so-du-quy input[name="dateCreate"]').val(moment(new Date()).format('DD/MM/yyyy'));
                    $('#them-so-du-quy input[name="dateCreate"]').prop('disabled', false);
                    $('#them-so-du-quy input[name="fcTienMat"]').prop('disabled', false);
                    $('#them-so-du-quy input[name="tienMat"]').prop('disabled', false);
                    $('#btn-save-sdq').prop('disabled', false);
                    $('#them-so-du-quy').modal();
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
    $('#so-du-quy #btn-update-sdq').on('click', function () {
        LoadSoDuQuy();
    });

    //Save
    $('#them-so-du-quy #btn-save-sdq').on('click', function () {
        let $currentForm = $('#them-so-du-quy');
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
        data.append("QID", $('#them-so-du-quy input[name="QID"]').val());
        data.append("SRID", $('#them-so-du-quy select[name="slSRID"] option:selected').val());
        data.append("NHID", $('#them-so-du-quy select[name="slNHID"] option:selected').val());
        data.append("CREATED", $('#them-so-du-quy input[name="dateCreate"]').val());
        data.append("FCTIENMAT", $('#them-so-du-quy input[name="fcTienMat"]').val());
        data.append("TIENMAT", $('#them-so-du-quy input[name="tienMat"]').val());
        data.append("GHICHU", $('#them-so-du-quy input[name="ghiChu"]').val());
        data.append("VISIBLE", $('#them-so-du-quy input[name="ckVisible"]').prop('checked'));
        $.ajax({
            async: false,
            type: 'POST',
            url: '/SoDuQuy/InsertUpdateSoDuQuy',
            data: data,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    tbSoDuQuy.ajax.reload();
                    $('#them-so-du-quy').modal('hide');
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

    function LoadSoDuQuy() {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/SoDuQuy/CheckUpdate',
            success: function (msg) {
                if (msg.rs) {
                    let id = $('#table-so-du-quy tbody tr.selected').attr('data-id');
                    if (id != undefined) {
                        DetailSoDuQuy(id).then((rs) => {
                            $('#them-so-du-quy input[name="QID"]').val(rs.data.QID);
                            $('#them-so-du-quy select[name="slSRID"]').val(rs.data.SRID);
                            $('#them-so-du-quy select[name="slNHID"]').prop('disabled', true);
                            $('#them-so-du-quy input[name="dateCreate"]').val(moment(rs.data.CREATED).format('DD/MM/yyyy'));
                            $('#them-so-du-quy input[name="dateCreate"]').prop('disabled', true);
                            $('#them-so-du-quy input[name="fcTienMat"]').prop('disabled', true);
                            $('#them-so-du-quy input[name="tienMat"]').prop('disabled', true);
                            $('#them-so-du-quy input[name="fcTienMat"]').val(convertCurrency(rs.data.FCTIENMAT));
                            $('#them-so-du-quy input[name="tienMat"]').val(convertCurrency(rs.data.TIENMAT));
                            $('#them-so-du-quy input[name="ghiChu"]').val(rs.data.GHICHU);
                            $('#them-so-du-quy input[name="ckVisible"]').prop('checked', rs.data.VISIBLE);
                            $('#btn-save-sdq').prop('disabled', true);
                            $('#them-so-du-quy').modal();
                        });
                    } else {
                        toast.create({
                            title: 'Notification!',
                            text: 'Vui lòng chọn sổ quỹ',
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
    async function DetailSoDuQuy(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/SoDuQuy/Detail?qid=' + id,
            success: function (msg) {
                return msg.data;
            },
        });
    }

    $('#so-du-quy').on('shown.bs.modal', function () {
        iDraw_SDQ = 1;
        LoadListNganHang();
        LoadListShowRoom();
        tbSoDuQuy.clear().columns.adjust();
        tbSoDuQuy.columns.adjust().draw();
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
                        $('#them-so-du-quy select[name="slNHID"]').append(o);
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
                    $('#them-so-du-quy select[name="slSRID"]').append(op);
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
