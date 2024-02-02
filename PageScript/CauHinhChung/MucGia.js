$(document).ready(function () {
    let tbl_filterValues = {};
    $('#main-table thead tr').clone(true).appendTo('#main-table thead');
    $('#main-table thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 1 || i == 2 || i == 18) {
            $(this).html('<input type="text" placeholder="Search ' + title.trim() + '" data-search-vitri-mathang="' + i + '"/>');
        }
        else {
            return $(this).html('');
        }
    });
    var main_table = $('#main-table').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        "order": [[2, "desc"]],
        columnDefs: [
            {
                "targets": [0, 3, 5, 7, 9, 11, 13, 15],
                "orderable": false
            }
        ],
        ajax: function (data, callback, settings) {
            tbl_filterValues.draw = data.draw;
            tbl_filterValues.start = data.start;
            tbl_filterValues.length = data.length;
            tbl_filterValues.order = data.order[0].column;
            tbl_filterValues.dir = data.order[0].dir;

            tbl_filterValues.search = $('input[data-search-vitri-mathang=18]').val();
            tbl_filterValues.search1 = $('input[data-search-vitri-mathang=1]').val();
            tbl_filterValues.search2 = $('input[data-search-vitri-mathang=2]').val();

            $.ajax({
                url: '/CauHinhChung/LoadMucGia',
                method: 'GET',
                data: tbl_filterValues,
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
                        if (tbl_filterValues.draw != 1) {
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
        columns: [
            { "data": null },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            { "data": "GiaSi" },
            { "data": "GIABANLE" },
            { "data": "GiaSi" },
            { "data": "GIABANBUON" },
            { "data": "GiaSi" },
            { "data": "GIABAN3" },
            { "data": "GiaSi" },
            { "data": "GIABAN4" },
            { "data": "GiaSi" },
            { "data": "GIABAN5" },
            { "data": "GiaSi" },
            { "data": "GIABAN6" },
            { "data": "GiaSi" },
            { "data": "GIABAN7" },
            { "data": "NgaySua" },
            { "data": "NguoiSua" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            let giaBanLe = data.GIABANLE == null ? 0 : data.GIABANLE;
            let giaBanBuon = data.GIABANBUON == null ? 0 : data.GIABANBUON;
            let giaBan3 = data.GIABAN3 == null ? 0 : data.GIABAN3;
            let giaBan4 = data.GIABAN4 == null ? 0 : data.GIABAN4;
            let giaBan5 = data.GIABAN5 == null ? 0 : data.GIABAN5;
            let giaBan6 = data.GIABAN6 == null ? 0 : data.GIABAN6;
            let giaBan7 = data.GIABAN7 == null ? 0 : data.GIABAN7;
            let giaSi = data.GiaSi?.split('|');
            let soLuong1 = convertCurrency(giaSi[0]?.split('-')[1] || '');
            let soLuong2 = convertCurrency(giaSi[1]?.split('-')[1] || '');
            let soLuong3 = convertCurrency(giaSi[2]?.split('-')[1] || '');
            let soLuong4 = convertCurrency(giaSi[3]?.split('-')[1] || '');
            let soLuong5 = convertCurrency(giaSi[4]?.split('-')[1] || '');
            let soLuong6 = convertCurrency(giaSi[5]?.split('-')[1] || '');
            let soLuong7 = convertCurrency(giaSi[6]?.split('-')[1] || '');
            $($(nRow).children()[3]).html(soLuong1);
            $($(nRow).children()[5]).html(soLuong2);
            $($(nRow).children()[7]).html(soLuong3);
            $($(nRow).children()[9]).html(soLuong4);
            $($(nRow).children()[11]).html(soLuong5);
            $($(nRow).children()[13]).html(soLuong6);
            $($(nRow).children()[15]).html(soLuong7);
            $($(nRow).children()[4]).html(convertCurrency(giaBanLe));
            $($(nRow).children()[6]).html(convertCurrency(giaBanBuon));
            $($(nRow).children()[8]).html(convertCurrency(giaBan3));
            $($(nRow).children()[10]).html(convertCurrency(giaBan4));
            $($(nRow).children()[12]).html(convertCurrency(giaBan5));
            $($(nRow).children()[14]).html(convertCurrency(giaBan6));
            $($(nRow).children()[16]).html(convertCurrency(giaBan7));
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var info = $(this).DataTable().page.info();
            $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
            return nRow;
        },
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        // scrollY: '300px',
        
        lengthChange: false,
        orderCellsTop: true,

        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
        paging: true
    });

    $(main_table.table().container()).on('keyup change', 'thead input', delay(function (e) {
        main_table.draw();
    }, 1000));

    //Click
    $(document).on('click', '#main-table tbody tr', function () {
        $(this).addClass('selected');
        $('#main-table tbody tr').not(this).removeClass('selected');
    });

    //Double Click
    $(document).on('dblclick', '#main-table tbody tr', async function () {
        $(this).addClass('selected');
        $('#main-table tbody tr').not(this).removeClass('selected');

        $('input[name="txt-edit-soluong1"]').val('');
        $('input[name="txt-edit-soluong2"]').val('');
        $('input[name="txt-edit-soluong3"]').val('');
        $('input[name="txt-edit-soluong4"]').val('');
        $('input[name="txt-edit-soluong5"]').val('');
        $('input[name="txt-edit-soluong6"]').val('');
        $('input[name="txt-edit-soluong7"]').val('');

        $('input[name="txt-edit-giaban1"]').val('');
        $('input[name="txt-edit-giaban2"]').val('');
        $('input[name="txt-edit-giaban3"]').val('');
        $('input[name="txt-edit-giaban4"]').val('');
        $('input[name="txt-edit-giaban5"]').val('');
        $('input[name="txt-edit-giaban6"]').val('');
        $('input[name="txt-edit-giaban7"]').val('');

        let id = $(this).attr('data-id');
        $('input[name=mhid-edit]').val(id);
        $.ajax({
            async: false,
            type: 'GET',
            url: '/CauHinhChung/LoadMucGiaByMhid?mhid=' + id + '',
            dataType: 'json',
            success: function (msg) {
                if (!msg.rs) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Không tìm thấy sản phẩm',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else {
                    $('input[name="mathang-edit"]').val(msg.data.MHCODE);
                    $('input[name="mathangname-edit"]').val(msg.data.MHTEN);

                    $('input[name="txt-edit-giaban1"]').val(convertCurrency(msg.data.GIABANLE));
                    $('input[name="txt-edit-giaban2"]').val(convertCurrency(msg.data.GIABANBUON));
                    $('input[name="txt-edit-giaban3"]').val(convertCurrency(msg.data.GIABAN3));
                    $('input[name="txt-edit-giaban4"]').val(convertCurrency(msg.data.GIABAN4));
                    $('input[name="txt-edit-giaban5"]').val(convertCurrency(msg.data.GIABAN5));
                    $('input[name="txt-edit-giaban6"]').val(convertCurrency(msg.data.GIABAN6));
                    $('input[name="txt-edit-giaban7"]').val(convertCurrency(msg.data.GIABAN7));

                    let giaSi = msg.data.GiaSi?.split('|');
                    if (giaSi) {
                        $('input[name="txt-edit-soluong1"]').val(convertCurrency(giaSi[0]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong2"]').val(convertCurrency(giaSi[1]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong3"]').val(convertCurrency(giaSi[2]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong4"]').val(convertCurrency(giaSi[3]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong5"]').val(convertCurrency(giaSi[4]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong6"]').val(convertCurrency(giaSi[5]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong7"]').val(convertCurrency(giaSi[6]?.split('-')[1] || ''));
                    }

                    $('#sua-popup').modal();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Save (Insert)
    $('.btn-save-add').click(function () {
        let data = new FormData();
        let mh = $('select[name="sl-mathang"]').val();

        if (mh == '' || mh == undefined || mh == null) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
            return false;
        }
        data.append("mhid", $('select[name="sl-mathang"]').val());
        let giaSi = `1-${$('input[name=txt-soluong1]').val()}-${$('input[name=txt-giaban1]').val()}|2-${$('input[name=txt-soluong2]').val()}-${$('input[name=txt-giaban2]').val()}|3-${$('input[name=txt-soluong3]').val()}-${$('input[name=txt-giaban3]').val()}|4-${$('input[name=txt-soluong4]').val()}-${$('input[name=txt-giaban4]').val()}|5-${$('input[name=txt-soluong5]').val()}-${$('input[name=txt-giaban5]').val()}|6-${$('input[name=txt-soluong6]').val()}-${$('input[name=txt-giaban6]').val()}|7-${$('input[name=txt-soluong7]').val()}-${$('input[name=txt-giaban7]').val()}`;
        giaSi = giaSi.replace(/\./g, '');
        data.append("giasi", giaSi);

        $.ajax({
            async: false,
            type: 'POST',
            url: '/CauHinhChung/UpdateMucGia',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    main_table.ajax.reload();
                    $('select[name="sl-mathang"]').val('');
                    $('input[name="txt-soluong1"]').val('');
                    $('input[name="txt-soluong2"]').val('');
                    $('input[name="txt-soluong3"]').val('');
                    $('input[name="txt-soluong4"]').val('');
                    $('input[name="txt-soluong5"]').val('');
                    $('input[name="txt-soluong6"]').val('');
                    $('input[name="txt-soluong7"]').val('');

                    $('input[name="txt-giaban1"]').val('');
                    $('input[name="txt-giaban2"]').val('');
                    $('input[name="txt-giaban3"]').val('');
                    $('input[name="txt-giaban4"]').val('');
                    $('input[name="txt-giaban5"]').val('');
                    $('input[name="txt-giaban6"]').val('');
                    $('input[name="txt-giaban7"]').val('');
                    $('#them-popup').modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                } else {
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
                console.log(error);
            }
        });
    });

    //Update
    $('.btn-edit').click(function () {
        let id = $('#main-table tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }

        $('input[name="txt-edit-soluong1"]').val('');
        $('input[name="txt-edit-soluong2"]').val('');
        $('input[name="txt-edit-soluong3"]').val('');
        $('input[name="txt-edit-soluong4"]').val('');
        $('input[name="txt-edit-soluong5"]').val('');
        $('input[name="txt-edit-soluong6"]').val('');
        $('input[name="txt-edit-soluong7"]').val('');

        $('input[name="txt-edit-giaban1"]').val('');
        $('input[name="txt-edit-giaban2"]').val('');
        $('input[name="txt-edit-giaban3"]').val('');
        $('input[name="txt-edit-giaban4"]').val('');
        $('input[name="txt-edit-giaban5"]').val('');
        $('input[name="txt-edit-giaban6"]').val('');
        $('input[name="txt-edit-giaban7"]').val('');

        $('input[name=mhid-edit]').val(id);
        $.ajax({
            async: false,
            type: 'GET',
            url: '/CauHinhChung/LoadMucGiaByMhid?mhid=' + id + '',
            dataType: 'json',
            success: function (msg) {
                if (!msg.rs) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Không tìm thấy sản phẩm',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else {
                    $('input[name="mathang-edit"]').val(msg.data.MHCODE);
                    $('input[name="mathangname-edit"]').val(msg.data.MHTEN);

                    $('input[name="txt-edit-giaban1"]').val(convertCurrency(msg.data.GIABANLE));
                    $('input[name="txt-edit-giaban2"]').val(convertCurrency(msg.data.GIABANBUON));
                    $('input[name="txt-edit-giaban3"]').val(convertCurrency(msg.data.GIABAN3));
                    $('input[name="txt-edit-giaban4"]').val(convertCurrency(msg.data.GIABAN4));
                    $('input[name="txt-edit-giaban5"]').val(convertCurrency(msg.data.GIABAN5));
                    $('input[name="txt-edit-giaban6"]').val(convertCurrency(msg.data.GIABAN6));
                    $('input[name="txt-edit-giaban7"]').val(convertCurrency(msg.data.GIABAN7));

                    let giaSi = msg.data.GiaSi?.split('|');
                    if (giaSi) {
                        $('input[name="txt-edit-soluong1"]').val(convertCurrency(giaSi[0]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong2"]').val(convertCurrency(giaSi[1]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong3"]').val(convertCurrency(giaSi[2]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong4"]').val(convertCurrency(giaSi[3]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong5"]').val(convertCurrency(giaSi[4]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong6"]').val(convertCurrency(giaSi[5]?.split('-')[1] || ''));
                        $('input[name="txt-edit-soluong7"]').val(convertCurrency(giaSi[6]?.split('-')[1] || ''));
                    }

                    $('#sua-popup').modal();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    //Delete
    $('.btn-delete').click(function () {
        let id = $('#main-table tbody tr.selected').attr('data-id');
        if (id == undefined) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        if (confirm('Bạn có muốn xóa toàn bộ mức giá của mặt hàng này?')) {
            $.ajax({
                async: false,
                type: 'POST',
                url: '/CauHinhChung/DeleteMucGia?mhid=' + id + '',
                dataType: 'json',
                success: function (msg) {
                    if (msg.rs) {
                        main_table.ajax.reload();
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
                        })
                    } 
                },
                error: function (error) {
                    console.log('e');
                }
            });

        }
    });

    //Reset
    $('.btn-refresh').click(function () {
        main_table.draw();
    });

    //Export
    $('.btn-export-mucgia').click(function () {
        let link = window.location.origin;
        tbl_filterValues.length = 999999999;
        link = link + "/CauHinhChung/ExportMucGia?" + serialize(tbl_filterValues) + ``;
        window.open(link);
    });

    //#region Select2 mặt hàng
    let tbMatHang_filterValues = {};
    tbMatHang_filterValues.draw = 1;
    tbMatHang_filterValues.loai = 0;
    tbMatHang_filterValues.start = 0;
    tbMatHang_filterValues.length = 50;
    tbMatHang_filterValues.order = 0;
    tbMatHang_filterValues.dir = 0;
    $("#sl-mathang").select2({
        ajax: {
            url: "/MatHang/LoadMatHangSelect2",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                var query = {
                    search: params.term,
                    start: (params.page || 0) * 50,
                    length: 50,
                    page: params.page
                }
                return query;
            },
            processResults: function (data, params) {
                console.log(data);
                var select2Data = $.map(data.data, function (obj) {
                    obj.text = obj.text + " - " + obj.MHTEN;
                    return obj;
                });
                return {
                    results: select2Data,
                    pagination: {
                        more: ((params.page + 1) * 50) < data.recordsTotal
                    }
                };
            },
            cache: true
        },
        placeholder: 'Nhập mã mặt hàng / tên mặt hàng',
        minimumInputLength: 1,
        templateResult: formatRepo,
        dropdownParent: $('#them-popup')
    });

    $('#sl-mathang').change(function () {
        $('input[name="txt-soluong1"]').val('');
        $('input[name="txt-soluong2"]').val('');
        $('input[name="txt-soluong3"]').val('');
        $('input[name="txt-soluong4"]').val('');
        $('input[name="txt-soluong5"]').val('');
        $('input[name="txt-soluong6"]').val('');
        $('input[name="txt-soluong7"]').val('');

        $('input[name="txt-giaban1"]').val('');
        $('input[name="txt-giaban2"]').val('');
        $('input[name="txt-giaban3"]').val('');
        $('input[name="txt-giaban4"]').val('');
        $('input[name="txt-giaban5"]').val('');
        $('input[name="txt-giaban6"]').val('');
        $('input[name="txt-giaban7"]').val('');

        let id = $(this).val();
        $('input[name=mhid]').val(id);
        $.ajax({
            async: false,
            type: 'GET',
            url: '/CauHinhChung/LoadMucGiaByMhid?mhid=' + id + '',
            dataType: 'json',
            success: function (msg) {
                if (!msg.rs) {
                    toast.create({
                        title: 'Notification!',
                        text: 'Không tìm thấy thông tin sản phẩm',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else {
                    $('input[name="txt-giaban1"]').val(convertCurrency(msg.data.GIABANLE));
                    $('input[name="txt-giaban2"]').val(convertCurrency(msg.data.GIABANBUON));
                    $('input[name="txt-giaban3"]').val(convertCurrency(msg.data.GIABAN3));
                    $('input[name="txt-giaban4"]').val(convertCurrency(msg.data.GIABAN4));
                    $('input[name="txt-giaban5"]').val(convertCurrency(msg.data.GIABAN5));
                    $('input[name="txt-giaban6"]').val(convertCurrency(msg.data.GIABAN6));
                    $('input[name="txt-giaban7"]').val(convertCurrency(msg.data.GIABAN7));

                    let giaSi = msg.data.GiaSi?.split('|');
                    if (giaSi) {
                        $('input[name="txt-soluong1"]').val(convertCurrency(giaSi[0]?.split('-')[1] || ''));
                        $('input[name="txt-soluong2"]').val(convertCurrency(giaSi[1]?.split('-')[1] || ''));
                        $('input[name="txt-soluong3"]').val(convertCurrency(giaSi[2]?.split('-')[1] || ''));
                        $('input[name="txt-soluong4"]').val(convertCurrency(giaSi[3]?.split('-')[1] || ''));
                        $('input[name="txt-soluong5"]').val(convertCurrency(giaSi[4]?.split('-')[1] || ''));
                        $('input[name="txt-soluong6"]').val(convertCurrency(giaSi[5]?.split('-')[1] || ''));
                        $('input[name="txt-soluong7"]').val(convertCurrency(giaSi[6]?.split('-')[1] || ''));
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }
        var $container = $(
            "<div class='select2-result-repository clearfix'>" + repo.text +
            "</div>"
        );
        return $container;
    }

    //Save (Update)
    $('.btn-edit-save').click(function () {
        let data = new FormData();
        let id = $('input[name="mhid-edit"]').val();
        let giaSi = `1-${$('input[name=txt-edit-soluong1]').val()}-${$('input[name=txt-edit-giaban1]').val()}|2-${$('input[name=txt-edit-soluong2]').val()}-${$('input[name=txt-edit-giaban2]').val()}|3-${$('input[name=txt-edit-soluong3]').val()}-${$('input[name=txt-edit-giaban3]').val()}|4-${$('input[name=txt-edit-soluong4]').val()}-${$('input[name=txt-edit-giaban4]').val()}|5-${$('input[name=txt-edit-soluong5]').val()}-${$('input[name=txt-edit-giaban5]').val()}|6-${$('input[name=txt-edit-soluong6]').val()}-${$('input[name=txt-edit-giaban6]').val()}|7-${$('input[name=txt-edit-soluong7]').val()}-${$('input[name=txt-edit-giaban7]').val()}`;
        giaSi = giaSi.replace(/\./g, '');
        data.append("mhid", id);
        data.append("giasi", giaSi);

        $.ajax({
            async: false,
            type: 'POST',
            url: '/CauHinhChung/UpdateMucGia',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.rs) {
                    main_table.ajax.reload();
                    $('#sua-popup').modal('hide');
                    $('input[name="mhid-edit"]').val('');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                } else {
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
                console.log(error);
            }
        });
    });

    var objmathangimport = [];

    $("#import-excel").click(function () {
        $.ajax({
            method: "GET",
            url: "/CauHinhChung/CheckImportMucGia",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $('#model-import-excel').modal();
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
    })

    $("#model-import-excel").on('shown.bs.modal', function () {
        $("#btn-save-import").prop('disabled', true);
        tbImport.columns.adjust().draw();
    })
    $('#model-import-excel').on('hidden.bs.modal', function (e) {
        objmathangimport = [];
        tbImport.clear();
        tbImport.rows.add(objmathangimport);
        tbImport.columns.adjust().draw();
        $("#FileUpload").val('');
    })
    $("#btn-save-import").click(function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: '/CauHinhChung/SaveImportMucGia',
            data: JSON.stringify(objmathangimport),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                if (msg.status == 1) {
                    main_table.draw();
                    $("#model-import-excel").modal('hide');
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    })
                } else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
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
            },
            error: function (error) {
                console.log('e');
            }
        });
    })
    // Nút Tạo Excel nhập liệu
    $('#btn-create-file-excel').on('click', function () {
        var link = `/CauHinhChung/CreateExcelMucGia`
        window.open(link)
    })

    $("#btnFileUpload").click(function () {
        $("#FileUpload").click();
    })

    $("#FileUpload").change(function (event) {
        let input, files;
        input = event.target;
        files = input.files;
        Array.from(files).map((file, index) => {
            var formdata = new FormData();
            formdata.append('fileupload', file);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/CauHinhChung/ImportMucGia',
                data: formdata,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (msg) {
                    if (msg.status == 1) {
                        objmathangimport = msg.data;
                        tbImport.clear();
                        tbImport.rows.add(objmathangimport);
                        tbImport.columns.adjust().draw();
                        $("#btn-save-import").prop('disabled', false);
                    }
                    else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                        $("#FileUpload").val('');
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
                    toast.create({
                        title: 'Notification!',
                        text: 'Không thành công, vui lòng kiểm tra file import và thử lại',
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    $("#FileUpload").val('');
                }
            });
        })
    })

    var objmathangimport = [];
    var tbImport = $('#table-import').DataTable({
        bFilter: false,
        bInfo: false,
        data: objmathangimport,
        select: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);

            let giaBanLe = data.GiaBan1 == null ? 0 : data.GiaBan1;
            let giaBanBuon = data.GiaBan2 == null ? 0 : data.GiaBan2;
            let giaBan3 = data.GiaBan3 == null ? 0 : data.GiaBan3;
            let giaBan4 = data.GiaBan4 == null ? 0 : data.GiaBan4;
            let giaBan5 = data.GiaBan5 == null ? 0 : data.GiaBan5;
            let giaBan6 = data.GiaBan6 == null ? 0 : data.GiaBan6;
            let giaBan7 = data.GiaBan7 == null ? 0 : data.GiaBan7;

            let soLuong1 = data.SoLuong1 == null ? 0 : data.SoLuong1;
            let soLuong2 = data.SoLuong2 == null ? 0 : data.SoLuong2;
            let soLuong3 = data.SoLuong3 == null ? 0 : data.SoLuong3;
            let soLuong4 = data.SoLuong4 == null ? 0 : data.SoLuong4;
            let soLuong5 = data.SoLuong5 == null ? 0 : data.SoLuong5;
            let soLuong6 = data.SoLuong6 == null ? 0 : data.SoLuong6;
            let soLuong7 = data.SoLuong7 == null ? 0 : data.SoLuong7;

            $($(nRow).children()[3]).html(convertCurrency(soLuong1));
            $($(nRow).children()[5]).html(convertCurrency(soLuong2));
            $($(nRow).children()[7]).html(convertCurrency(soLuong3));
            $($(nRow).children()[9]).html(convertCurrency(soLuong4));
            $($(nRow).children()[11]).html(convertCurrency(soLuong5));
            $($(nRow).children()[13]).html(convertCurrency(soLuong6));
            $($(nRow).children()[15]).html(convertCurrency(soLuong7));

            $($(nRow).children()[4]).html(convertCurrency(giaBanLe));
            $($(nRow).children()[6]).html(convertCurrency(giaBanBuon));
            $($(nRow).children()[8]).html(convertCurrency(giaBan3));
            $($(nRow).children()[10]).html(convertCurrency(giaBan4));
            $($(nRow).children()[12]).html(convertCurrency(giaBan5));
            $($(nRow).children()[14]).html(convertCurrency(giaBan6));
            $($(nRow).children()[16]).html(convertCurrency(giaBan7));
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
            { data: "SoLuong1" },
            { data: "GiaBan1" },
            { data: "SoLuong2" },
            { data: "GiaBan2" },
            { data: "SoLuong3" },
            { data: "GiaBan3" },
            { data: "SoLuong4" },
            { data: "GiaBan4" },
            { data: "SoLuong5" },
            { data: "GiaBan5" },
            { data: "SoLuong6" },
            { data: "GiaBan6" },
            { data: "SoLuong7" },
            { data: "GiaBan7" }
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
});
serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
function delay(fn, ms) {
    let timer = 0
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this, ...args), ms || 0)
    }
}

//Function kiểu tiền
function convertCurrency(value) {
    let regx = /\D+/g;
    let number = value.toString().replace(regx, "");
    return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}