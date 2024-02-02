$(document).ready(function () {
 

    //#region Mặt hàng
    //Datatable Mặt hàng
    let tbMatHang_filterValues = {};
    var tbMatHang = $('#table-tinh-gia-ban').DataTable({
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
            $.ajax({
                url: '/TinhGiaBan/LoadMatHang',
                method: 'GET',
                data: tbMatHang_filterValues,
                success: function (msg) {
                    if (msg.status == 2) {
                        toast.create({
                            title: 'Notìication!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        return false;
                    }
                    else if (msg.status == 3) {
                        if (tbMatHang_filterValues.draw != 1) {
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
            {
                "data": "THUE",
                render: function (data, type, row) {
                    return '<input type="text" class="text-right" data-type="currency" value = ' + data + '  >';
                }
            },
            { "data": "GIABANLE" },
            { "data": "GIABANBUON" },
            { "data": "GIANHAP" },
            { "data": "GIABAN1" },
            { "data": "GIABAN2" },
            { "data": "GIABAN3" },
            { "data": "GIABAN4" },
            { "data": "GIABAN5" },
            { "data": "GIABAN6" },
            { "data": "GIABAN7" },
            { "data": "GIABAN8" },
            { "data": "SOLUONG" },
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
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            $($(nRow).children()[4]).html(convertCurrency(data.GIABANLE));
            $($(nRow).children()[5]).html(convertCurrency(data.GIABANBUON));
            $($(nRow).children()[6]).html(convertCurrency(data.GIANHAP));
            $($(nRow).children()[7]).html(convertCurrency(data.GIABAN1));
            $($(nRow).children()[8]).html(convertCurrency(data.GIABAN2));
            $($(nRow).children()[9]).html(convertCurrency(data.GIABAN3));
            $($(nRow).children()[10]).html(convertCurrency(data.GIABAN4));
            $($(nRow).children()[11]).html(convertCurrency(data.GIABAN5));
            $($(nRow).children()[12]).html(convertCurrency(data.GIABAN6));
            $($(nRow).children()[13]).html(convertCurrency(data.GIABAN7));
            $($(nRow).children()[14]).html(convertCurrency(data.GIABAN8));
        },

        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: true,
        searching: true,
        pageLength: 10, // "pageLength": giá trị / 1 trang
        lengthChange: false,

        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },

        buttons: [
            {
                extend: 'excel',
                filename: 'Mặt hàng - Kim Thành',
                exportOptions: {
                    orthogonal: 'sort'
                },
                action: ExportAll
            }
        ],
    });

    //Click
    $('#table-tinh-gia-ban').on('click', 'tr', function (e) {
        if (e.ctrlKey) {
            $(this).addClass('selected');
        }
        else {
            $(this).addClass('selected');
            $('#table-tinh-gia-ban tbody tr').not(this).removeClass('selected');
            //$('#table-duoc-chon tbody tr[data-id="' + $(this).attr('data-id') + '"]').trigger('click');
        }
    });

    let dataTemp = [];
    //DoubleClick
    $('#table-tinh-gia-ban').on('dblclick', 'tr', function () {
        var val = tbMatHang.row(this).data();
        val.THUE = $(this).find('input').val();
        let check = dataTemp.filter(n => n.MHID == val.MHID);
        if (check.length === 0) {
            var obj = {
                STT: null,
                MHID : val.MHID,
                MHCODE : val.MHCODE,
                MHTEN : val.MHTEN,
                THUE : val.THUE,
                GIABANLE : val.GIABANLE,
                GIABANBUON : val.GIABANBUON,
                GIANHAP : val.GIANHAP,
                GIABANLEMOI : null,
                GIABANBUONMOI : null,
                GIABAN1MOI : null,
                GIABAN2MOI : null,
                GIABAN3MOI : null,
                GIABAN4MOI : null,
                GIABAN5MOI : null,
                GIABAN6MOI : null,
                GIABAN7MOI : null,
                GIABAN8MOI : null,
                SOLUONG : val.SOLUONG,
                GIABAN1 : val.GIABAN1,
                GIABAN2 : val.GIABAN2,
                GIABAN3 : val.GIABAN3,
                GIABAN4 : val.GIABAN4,
                GIABAN5 : val.GIABAN5,
                GIABAN6 : val.GIABAN6,
                GIABAN7 : val.GIABAN7,
                GIABAN8 : val.GIABAN8,
            };
            dataTemp.push(obj);
        }
        tbDuocChon.clear().columns.adjust().draw();
        tbDuocChon.rows.add(dataTemp);
        tbDuocChon.columns.adjust().draw();
    });

    //Button next
    $('#btn-next').on('click', function () {
        $('#table-tinh-gia-ban tbody tr.selected').each(function (index, element) {
            var val = tbMatHang.row(this).data();
            val.THUE = $(this).find('input').val();
            let check = dataTemp.filter(n => n.MHID == val.MHID);
            if (check.length === 0) {
                var obj = {
                    STT: null,
                    MHID: val.MHID,
                    MHCODE: val.MHCODE,
                    MHTEN: val.MHTEN,
                    THUE: val.THUE,
                    GIABANLE: val.GIABANLE,
                    GIABANBUON: val.GIABANBUON,
                    GIANHAP: val.GIANHAP,
                    GIABANLEMOI: null,
                    GIABANBUONMOI: null,
                    GIABAN1MOI: null,
                    GIABAN2MOI: null,
                    GIABAN3MOI: null,
                    GIABAN4MOI: null,
                    GIABAN5MOI: null,
                    GIABAN6MOI: null,
                    GIABAN7MOI: null,
                    GIABAN8MOI: null,
                    SOLUONG: val.SOLUONG,
                    GIABAN1: val.GIABAN1,
                    GIABAN2: val.GIABAN2,
                    GIABAN3: val.GIABAN3,
                    GIABAN4: val.GIABAN4,
                    GIABAN5: val.GIABAN5,
                    GIABAN6: val.GIABAN6,
                    GIABAN7: val.GIABAN7,
                    GIABAN8: val.GIABAN8,
                };
                dataTemp.push(obj);
            }

            tbDuocChon.clear().columns.adjust().draw();
            tbDuocChon.rows.add(dataTemp);
            tbDuocChon.columns.adjust().draw();
        });
        $('#table-tinh-gia-ban tbody tr input[type=checkbox]').each(function () {
            if (this.checked) {
                var val = tbMatHang.row($(this).parent('td')).data();
                let check = dataTemp.filter(n => n.MHID == val.MHID);
                if (check.length === 0) {
                    var obj = {
                        STT: null,
                        MHID: val.MHID,
                        MHCODE: val.MHCODE,
                        MHTEN: val.MHTEN,
                        THUE: val.THUE,
                        GIABANLE: val.GIABANLE,
                        GIABANBUON: val.GIABANBUON,
                        GIANHAP: val.GIANHAP,
                        GIABANLEMOI: null,
                        GIABANBUONMOI: null,
                        GIABAN1MOI: null,
                        GIABAN2MOI: null,
                        GIABAN3MOI: null,
                        GIABAN4MOI: null,
                        GIABAN5MOI: null,
                        GIABAN6MOI: null,
                        GIABAN7MOI: null,
                        GIABAN8MOI: null,
                        SOLUONG: val.SOLUONG,
                        GIABAN1: val.GIABAN1,
                        GIABAN2: val.GIABAN2,
                        GIABAN3: val.GIABAN3,
                        GIABAN4: val.GIABAN4,
                        GIABAN5: val.GIABAN5,
                        GIABAN6: val.GIABAN6,
                        GIABAN7: val.GIABAN7,
                        GIABAN8: val.GIABAN8,
                    };
                    dataTemp.push(obj);
                }

                tbDuocChon.clear().columns.adjust().draw();
                tbDuocChon.rows.add(dataTemp);
                tbDuocChon.columns.adjust().draw();
            }
        });
    });

    //Checkbox chọn tất cả (tbMatHang)
    $('.table-tinh-gia-ban input[name=checkbox-all]').on('click', function () {
        if (this.checked) {
            $('#table-tinh-gia-ban tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').attr('checked', 'checked');
            })
        } else {
            $('#table-tinh-gia-ban tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').removeAttr('checked');
            })
        }

    })

    //Button Prev
    $('#btn-prev').on('click', function () {
        $('#table-duoc-chon tbody tr.selected').each(function (index, element) {
            var id = $($(this).attr('data-id'));
            var removeIndex = dataTemp.map(function (item) {
                return item.MHID
            }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

            dataTemp.splice(removeIndex, 1); //Remove

            tbDuocChon.clear().columns.adjust().draw();
            tbDuocChon.rows.add(dataTemp);
            tbDuocChon.columns.adjust().draw();
        });
        $('#table-duoc-chon tbody tr input[type=checkbox]').each(function () {
            if (this.checked) {
                var id = $($(this).parent('td').attr('data-id'));
                var removeIndex = dataTemp.map(function (item) {
                    return item.MHID
                }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

                dataTemp.splice(removeIndex, 1); //Remove

                tbDuocChon.clear().columns.adjust().draw();
                tbDuocChon.rows.add(dataTemp);
                tbDuocChon.columns.adjust().draw();
            }
        });
    });

    //Button next all
    $('#btn-next-all').on('click', function () {
        $('#table-tinh-gia-ban tbody tr').each(function (index, element) {
            var val = tbMatHang.row(this).data();
            val.THUE = $(this).find('input').val();
            let check = dataTemp.filter(n => n.MHID == val.MHID);
            if (check.length === 0) {
                dataTemp.push(val);
            }

            tbDuocChon.clear().columns.adjust().draw();
            tbDuocChon.rows.add(dataTemp);
            tbDuocChon.columns.adjust().draw();
        });
    });

    //Button prev all
    $('#btn-prev-all').on('click', function () {
        $('#table-duoc-chon tbody tr').each(function (index, element) {
            var id = $($(this).attr('data-id'));
            var removeIndex = dataTemp.map(function (item) {
                return item.MHID
            }).indexOf(id); //Function lấy vị trí trong Array (VD: 0, 1, 2)

            dataTemp.splice(removeIndex, 1); //Remove

            tbDuocChon.clear().columns.adjust().draw();
            tbDuocChon.rows.add(dataTemp);
            tbDuocChon.columns.adjust().draw();
        });
    });

    //Export
    $('#export-mat-hang').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/TinhGiaBan/CheckExcelMatHang',
            success: function (msg) {
                if (msg.rs) {
                    tbMatHang.buttons('.buttons-excel').trigger();
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

    async function LoadChiTietMatHang(id) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/TinhGiaBan/LoadChiTietMatHang?id' + id,
            success: function (msg) {
                return msg.data;
            }
        });
    }

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
        tbMatHang_filterValues.mhlid = $('#jstree').jstree('get_selected')[0];
        tbMatHang.draw();
    });
    //#endregion
    //#endregion

    //#region Mặt hàng được chọn
    var tbDuocChon = $('#table-duoc-chon').DataTable({
        //serverSide: true,
        bFilter: true,
        bInfo: false,
        data: dataTemp,
        columns: [
            {
                "data": "STT",
                orderable: false,
            },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            {
                "data": "THUE",
                render: function (data, type, row) {
                    return '<input type="text" class="text-right" name="THUE" data-type="currency" value = ' + data + '  >';
                }
            },
            { "data": "GIABANLE" },
            { "data": "GIABANBUON" },
            { "data": "GIANHAP" },
            { "data": "GIABANLEMOI" }, //Giá bán lẻ mới
            { "data": "GIABANBUONMOI" }, //Giá bán buôn mới
            { "data": "GIABAN1MOI" }, //Giá bán 1 mới
            { "data": "GIABAN2MOI" }, //Giá bán 2 mới
            { "data": "GIABAN3MOI" }, //Giá bán 3 mới
            { "data": "GIABAN4MOI" }, //Giá bán 4 mới
            { "data": "GIABAN5MOI" }, //Giá bán 5 mới
            { "data": "GIABAN6MOI" }, //Giá bán 6 mới
            { "data": "GIABAN7MOI" }, //Giá bán 7 mới
            { "data": "GIABAN8MOI" }, //Giá bán 8 mới
            { "data": "SOLUONG" }, //Số lượng
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
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            $($(nRow).children()[0]).html(iDataIndex + 1);
            $($(nRow).children()[4]).html(convertCurrency(data.GIABANLE));
            $($(nRow).children()[5]).html(convertCurrency(data.GIABANBUON));
            $($(nRow).children()[6]).html(convertCurrency(data.GIANHAP));
            //$($(nRow).children()[7]).html(convertCurrency(data.GIABAN1MOI));
            //$($(nRow).children()[8]).html(convertCurrency(data.GIABAN2MOI));
            //$($(nRow).children()[9]).html(convertCurrency(data.GIABAN3MOI));
            //$($(nRow).children()[10]).html(convertCurrency(data.GIABAN4MOI));
            //$($(nRow).children()[11]).html(convertCurrency(data.GIABAN5MOI));
            //$($(nRow).children()[12]).html(convertCurrency(data.GIABAN6MOI));
            //$($(nRow).children()[13]).html(convertCurrency(data.GIABAN7MOI));
            //$($(nRow).children()[14]).html(convertCurrency(data.GIABAN8MOI));
            //console.log(dataTemp);
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

        buttons: [
            {
                extend: 'excel',
                filename: 'mặt hàng tính - Kim Thành',
                exportOptions: {
                    orthogonal: 'sort'
                },
                action: ExportAll
            }
        ],
    });

    //Click
    $('#table-duoc-chon tbody').on('click', 'tr', function (e) {
        if (e.ctrlKey) {
            $(this).addClass('selected');
        }
        else {
            $(this).addClass('selected');
            $('#table-duoc-chon tbody tr').not(this).removeClass('selected');
            //$('#table-tinh-gia-ban tbody tr[data-id="' + $(this).attr('data-id') + '"]').trigger('click');
        }
    });

    //Double click
    $('#table-duoc-chon tbody').on('dblclick', 'tr', function () {
        var removeIndex = dataTemp.map(function (item) {
            return item.MHID
        }).indexOf($(this).attr('data-id')); //Function lấy vị trí trong Array (VD: 0, 1, 2)

        dataTemp.splice(removeIndex, 1); //Remove

        tbDuocChon.clear().columns.adjust().draw();
        tbDuocChon.rows.add(dataTemp);
        tbDuocChon.columns.adjust().draw();
    });

    //Checkbox chọn tất cả (tbDuocChon)
    $('.table-duoc-chon input[name=checkbox-all]').on('click', function () {
        if (this.checked) {
            $('#table-duoc-chon tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').attr('checked', 'checked');
            })
        } else {
            $('#table-duoc-chon tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').removeAttr('checked');
            })
        }

    })

    //Export
    $('#export-duoc-chon').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/TinhGiaBan/CheckExcelMatHang',
            success: function (msg) {
                if (msg.rs) {
                    tbDuocChon.buttons('.buttons-excel').trigger();
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

    //#endregion 

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    //Function các radio 
    $('#tinh-gia input[type=radio][name=tang-them-theo]').click(function () {
        var related_class = $(this).val();
        $('.' + related_class).prop('disabled', false);

        $('#tinh-gia input[type=radio][name=tang-them-theo]').not(':checked').each(function () {
            var other_class = $(this).val();
            $('.' + other_class).prop('disabled', true);
        });
    });;

    $('#btn-tinh').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/TinhGiaBan/CheckMatHang',
            success: function (msg) {
                if (msg.rs) {
                    var before = $('select[name=slBefore] option').filter(':selected').val();
                    var after = $('select[name=slAfter] option').filter(':selected').val();
                    var vl = getValue();
                    jQuery.each(dataTemp, function (obj, values) {
                        var rsBe = values[before];
                        var rsAf = values[after];

                        if ($('input[name="tang-them-theo"][value="loi-nhuan"]').is(':checked')) {
                            var thue = vl[obj];
                            if (thue == 0) {
                                dataTemp[obj].THUE = thue;
                                rsBe = rsBe;
                            } else {
                                dataTemp[obj].THUE = thue;
                                rsBe = rsBe + (rsBe * (thue / 100));
                            }
                        } else if ($('input[name="tang-them-theo"][value="ti-le"]').is(':checked')) {
                            var tiLe = $('input[id=ti-le]').val();
                            rsBe = rsBe + (rsBe * (tiLe / 100));
                        } else if ($('input[name="tang-them-theo"][value="so-tien"]').is(':checked')) {
                            var soTien = parseInt($('input[id=so-tien]').val());
                            rsBe = rsBe + soTien;
                        }

                        dataTemp[obj][after] = convertCurrency(Math.ceil(rsBe));

                        tbDuocChon.clear().columns.adjust().draw();
                        tbDuocChon.rows.add(dataTemp);
                        tbDuocChon.columns.adjust().draw();
                    });
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

    $('#btn-save').on('click', function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/TinhGiaBan/CheckMatHang',
            success: function (msg) {
                if (msg.rs) {
                    var data = JSON.stringify({ "data": dataTemp });
                    if (confirm('bạn chắc chắn muốn ghi lại tính giá bán?')) {
                        $.ajax({
                            type: 'POST',
                            url: '/TinhGiaBan/UpdateMatHang',
                            data: data,
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (msg) {
                                if (msg.rs) {
                                    jQuery.each(dataTemp, function (obj, values) {
                                        tbMatHang.ajax.reload();
                                    });
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
    });

    //Function lấy input tính Tỉ suất lợi nhuận
    function getValue() {
        let value = [];
        $('input[name=THUE]').each(function () {
            value.push($(this).val());
        });
        return value;
    }

    //Function Export toàn bộ Row cho Datatable
    function ExportAll(e, dt, button, config) {
        var self = this;
        var oldStart = dt.settings()[0]._iDisplayStart;
        dt.one('preXhr', function (e, s, data) {
            // Just this once, load all data from the server...
            data.start = 0;
            data.length = 2147483647;
            dt.one('preDraw', function (e, settings) {
                // Call the original action function
                if (button[0].className.indexOf('buttons-copy') >= 0) {
                    $.fn.dataTable.ext.buttons.copyHtml5.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-excel') >= 0) {
                    $.fn.dataTable.ext.buttons.excelHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.excelHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.excelFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-csv') >= 0) {
                    $.fn.dataTable.ext.buttons.csvHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.csvHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.csvFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-pdf') >= 0) {
                    $.fn.dataTable.ext.buttons.pdfHtml5.available(dt, config) ?
                        $.fn.dataTable.ext.buttons.pdfHtml5.action.call(self, e, dt, button, config) :
                        $.fn.dataTable.ext.buttons.pdfFlash.action.call(self, e, dt, button, config);
                } else if (button[0].className.indexOf('buttons-print') >= 0) {
                    $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
                }
                dt.one('preXhr', function (e, s, data) {
                    // DataTables thinks the first item displayed is index 0, but we're not drawing that.
                    // Set the property to what it was before exporting.
                    settings._iDisplayStart = oldStart;
                    data.start = oldStart;
                });
                // Reload the grid with the original page. Otherwise, API functions like table.cell(this) don't work properly.
                setTimeout(dt.ajax.reload, 0);
                // Prevent rendering of the full data to the DOM
                return false;
            });
        });
        // Requery the server with the new one-time export settings
        dt.ajax.reload();
    };
});