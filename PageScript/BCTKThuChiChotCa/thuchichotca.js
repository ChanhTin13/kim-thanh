$(document)
    .ajaxStart(function () {
        $('#AjaxLoader').show();
    })
    .ajaxStop(function () {
        $('#AjaxLoader').hide();
    });
$(document).ready(function () {
    $('.choose-date').val(moment(new Date()).format('DD/MM/yyyy'));

    let fdate = null;
    let tdate = null;
    let nvid = null;
    let xml = null;
    let iDraw = 0;

    var tbThuChiChotCa_filterValues = {};
    //Datatable Thu chi chốt ca
    var tbThuChiChotCa = $('#table-thu-chi-chot-ca').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            if (iDraw > 0) {
                tbThuChiChotCa_filterValues.draw = data.draw;

                tbThuChiChotCa_filterValues.fdate = fdate;
                tbThuChiChotCa_filterValues.tdate = tdate;
                tbThuChiChotCa_filterValues.nvid = nvid;
                tbThuChiChotCa_filterValues.xml = xml;

                tbThuChiChotCa_filterValues.start = data.start;
                tbThuChiChotCa_filterValues.length = data.length;
                tbThuChiChotCa_filterValues.order = data.order[0].column;
                tbThuChiChotCa_filterValues.dir = data.order[0].dir;
                tbThuChiChotCa_filterValues.export = 0;

                $.ajax({
                    url: '/BanHang/LoadThuChiChotCa',
                    method: 'GET',
                    data: tbThuChiChotCa_filterValues,
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
                            if (tbThuChiChotCa_filterValues.draw != 1) {
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
            { "data": "Ngay" },
            { "data": "PT" },
            { "data": "PC" },
            { "data": "NHCODE" },
            { "data": "THU", "className": "text-right" },
            { "data": "CHI", "className": "text-right" },
            { "data": "VAT", "className": "text-right" },
            { "data": "CODE" },
            { "data": "DIENGIAI" },
            { "data": "USERID" },
            { "data": "KHTEN" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            //$(nRow).attr('data-id', data.MHCODE);
            $($(nRow).children()[1]).html(moment(data.Ngay).format('DD/MM/yyyy'));
            $($(nRow).children()[2]).addClass('text-primary');
            $($(nRow).children()[3]).addClass('text-danger');
            $($(nRow).children()[5]).addClass('text-primary');
            $($(nRow).children()[5]).html(convertCurrency(data.THU));
            $($(nRow).children()[6]).addClass('text-danger');
            $($(nRow).children()[6]).html(convertCurrency(data.CHI));
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
                var tongThu = Math.round(data[0].TONGTHU);
                var tongChi = Math.round(data[0].TONGCHI);
                var tongVAT = Math.round(data[0].TONGVAT);
                $(api.column(1).footer()).html(data[0].TotalRow.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(5).footer()).html(tongThu.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(6).footer()).html(tongChi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
                $(api.column(7).footer()).html(tongVAT.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')).addClass('text-right');
            } else {
                $(api.column(1).footer()).html(0).addClass('text-right');
                $(api.column(5).footer()).html(0).addClass('text-right');
                $(api.column(6).footer()).html(0).addClass('text-right');
                $(api.column(7).footer()).html(0).addClass('text-right');
            }
        },

        scrollX: true,
        scrollResize: false,
        scrollY: 400,
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

    let tbChiNhanh_filterValues = {};
    var tbChiNhanh = $('.bctk-thuchichotca').find('.table-showroom').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbChiNhanh_filterValues.draw = data.draw;
            tbChiNhanh_filterValues.search = data.search["value"];
            tbChiNhanh_filterValues.start = data.start;
            tbChiNhanh_filterValues.length = data.length;
            tbChiNhanh_filterValues.order = data.order[0].column;
            tbChiNhanh_filterValues.dir = data.order[0].dir;
            $.ajax({
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
                    }
                },
            }).done(callback, () => {

            });
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

    $('.table-showroom input[name=checkALL]').on('click', function () {
        if (this.checked) {
            $('.table-showroom tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').attr('checked', 'checked');
            })
        } else {
            $('.table-showroom tbody tr').each(function () {
                $(this).find('td input[type=checkbox]').removeAttr('checked');
            })
        }

    })

    $('#btn-search').on('click', function () {
        var checkedSR = new Array();
        $('.table-showroom tbody tr input[type=checkbox]').each(function () {
            if (this.checked) {
                var val = tbChiNhanh.row($(this).parent('td')).data();
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

        fdate = $('input[name="fdate"]').val();
        tdate = $('input[name="tdate"]').val();
        nvid = $('select[name="slNhanVien"]').find('option:selected').val();
        iDraw = 1;
        xml = JSON.stringify(rendered);

        tbThuChiChotCa.clear().columns.adjust();
        tbThuChiChotCa.columns.adjust().draw();
    });

    $('#btn-export').on('click', function () {
        var data = tbThuChiChotCa.rows().data().length;
        if (data === 0) {
            toast.create({
                title: 'Notification',
                text: 'Không tìm thấy bản ghi nào. Xuất file thất bại',
                icon: 'error-outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        var filterReport = {};

        filterReport.draw = tbThuChiChotCa_filterValues.draw;

        filterReport.fdate = tbThuChiChotCa_filterValues.fdate;
        filterReport.tdate = tbThuChiChotCa_filterValues.tdate;
        filterReport.nvid = tbThuChiChotCa_filterValues.nvid;
        filterReport.xml = tbThuChiChotCa_filterValues.xml;

        filterReport.start = tbThuChiChotCa_filterValues.start;
        filterReport.length = tbThuChiChotCa_filterValues.length;
        filterReport.order = tbThuChiChotCa_filterValues.order;
        filterReport.dir = tbThuChiChotCa_filterValues.dir;
        filterReport.export = 1

        var link = `/BanHang/LoadThuChiChotCa?draw=` + filterReport.draw + `&start=` + filterReport.start + `&length=` + filterReport.length + `&order=` + filterReport.order + `&dir=` + filterReport.dir +
            `&fdate=` + filterReport.fdate +
            `&tdate=` + filterReport.tdate +
            `&nvid=` + filterReport.nvid +
            `&xml=` + filterReport.xml +
            `&export=` + filterReport.export;
        window.open(link);
    });

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
                        obj.text = obj.NVTEN;
                        return obj
                    });
                    $('select[name="slNhanVien"]').select2({
                        data: dsNV,
                        //dropdownParent: $('.wrap-table-2')
                    });
                }
            },
        });
    };

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };
});