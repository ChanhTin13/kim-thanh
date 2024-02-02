
var data_MatHang = [];
$(document).ready(function () {


    const printSelectContainer = (id) => {
        let printContent = document.getElementById(id);
        let printSection = document.querySelector('.print-section.dynamic');
        if (printSection !== null) {
            let contentWrap = printSection.querySelector('.print-content-dynamic');
            let contentPrintClone = printContent.cloneNode(true);
            while (contentWrap.firstChild) {
                contentWrap.removeChild(contentWrap.firstChild);
            }
            contentWrap.appendChild(contentPrintClone);
            printById(printSection.id);
        } else {
            return false;
        }
    }
    const printById = (id) => {
        let printSection = document.getElementById(id);
        let sections = document.getElementsByClassName('.print-section');
        [...sections].map(x => {
            x.classList.remove('show');
        })
        printSection.classList.add('show');
        window.focus();
        window.print();
        window.close();
    }

    let printBtns = document.querySelectorAll('.btn-print');
    if (printBtns.length > 0) {
        [...printBtns].map(ele => {
            ele.addEventListener('click', function (e) {
                e.preventDefault();
                let secId = ele.dataset.print;
                if (secId === undefined) return false;
                if ([...ele.classList].includes('print-only')) {
                    printById(secId);
                    return false;
                }
                printSelectContainer(secId);
            });
        })
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
        var tree = $('#jstree').jstree({
            'core': {
                'data': jsondata
            }
        });
    };
    function resfreshJSTree() {
        $('#jstree').jstree(true).settings.core.data = { 'url': '/NhomHang/Tree' };;
        $('#jstree').jstree(true).refresh();
    };
    var loai = 0;
    $.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    }
    $.fn.dataTable.ext.order['dom-text'] = function (settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {
            return $('input', td).val();
        });
    }
    //Event click nodes
    $('#jstree').on('activate_node.jstree', function (e, data) {
        var path = data.instance.get_path(data.node, '\\');
        $('#title').text(path);
        loai = $('#jstree').jstree('get_selected')[0];
        tbMatHang.columns.adjust().draw();
    });
    //mặt hàng
    let tbMatHang_filterValues = {};
    var tbMatHang = $('#in-table-nhom-hang').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbMatHang_filterValues.draw = data.draw;
            tbMatHang_filterValues.search = data.search["value"];
            tbMatHang_filterValues.loai = loai;
            tbMatHang_filterValues.start = data.start;
            tbMatHang_filterValues.length = data.length;
            tbMatHang_filterValues.order = data.order[0].column;
            tbMatHang_filterValues.dir = data.order[0].dir;
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
                    } else {
                        data_MatHang = msg.data;
                    }
                },
            }).done(callback, (data) => {
                let totalRow = 0;
                if (data.data != undefined) {
                    if (data.data.length > 0) {
                        totalRow =    data.data[0].TotalRow;
                    }
                }

                $(tbMatHang.column(0).header()).text('# ' + totalRow)
            });
        },
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);

        },
        columns: [
            { "data": "RowIndex" },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            {
                "data": "MATCHCODE"
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-delete">`;
                }
            }
        ], "dom": '<"pull-left"f><"pull-right"l>tip',
        scroller: {
            loadingIndicator: true,
            displayBuffer: 5
        },
        scrollY: 300,
        bInfo: false,
        paging: true,
        searching: true,
        pageLength: 5,
        lengthChange: false
    });
    $(document).on('click', '#in-table-nhom-hang tbody tr', function () {
        let $this = $(this);
        $this.addClass('selected');
        $('#in-table-nhom-hang  tbody tr').not(this).removeClass('selected');
    })
    $(document).on('dblclick', '#in-table-nhom-hang tbody tr', function () {
        let $this = $(this);
        $this.addClass('selected');
        $('#in-table-nhom-hang  tbody tr').not(this).removeClass('selected');
        let input = $('input[name="in-number"]').val();
        let id = $this.attr('data-id');
        let check = data_DaChon.find(n => n.MHID == id);
        if (check == undefined) {
            let item = data_MatHang.find(n => n.MHID == id);
            item["SOLUONG"] = input;
            data_DaChon.push(item);

        }
        $this.find('input[type="checkbox"]:checked').prop('checked', false);
        in_tbMatHang.clear().draw();
        in_tbMatHang.rows.add(data_DaChon); // Add new data    
        in_tbMatHang.columns.adjust().draw();
    });
    var data_DaChon = [];
    $('.btn-move-down').click(function () {
 
        let soLuongBanIn = $('input[name="in-number"]').val();
        $('#in-table-nhom-hang  tbody tr input[type="checkbox"]:checked').each(function (index, e) {
            let id = $(e).closest('tr').attr('data-id');
            let check = data_DaChon.find(n => n.MHID == id);
            if (check == undefined) {
                let item = data_MatHang.find(n => n.MHID == id);
                item["SOLUONG"] = soLuongBanIn;
                data_DaChon.push(item);

            }
        });
        $('#in-table-nhom-hang  tbody tr input[type="checkbox"]:checked').prop('checked', false);

        in_tbMatHang.clear().draw();
        in_tbMatHang.rows.add(data_DaChon); // Add new data    
        in_tbMatHang.columns.adjust().draw();

    });

    $('#table-mat-hang').on('input', '[name="soluong"],[name="alias"],[name="giabanle"],[name="lo"],[name="imei"]', function () {
        let $this = $(this);

        let id = $this.closest('tr').attr('data-id');
        let name = $this.attr('name');
        switch (name) {
            case 'soluong':
                {
                    data_DaChon.find(n => n.MHID == id)["SOLUONG"] = $this.val();
                    CalcFooter();
                    break;
                }
            case 'alias':
                {
                    data_DaChon.find(n => n.MHID == id).MATCHCODE = $this.val();
                    CalcFooter();
                    break;
                }
            case 'giabanle':
                {
                    data_DaChon.find(n => n.MHID == id).GIABANLE = $this.val().replace('.', '');  
                    CalcFooter();
                    break;
                }
            case 'lo':
                {
                    data_DaChon.find(n => n.MHID == id)["SOLO"] = $this.val();
                    CalcFooter();
                    break;
                }
            case 'imei':
                {
                    data_DaChon.find(n => n.MHID == id)["IMEI"] = $this.val();
                    CalcFooter();
                    break;
                }
        }
    });
    function CalcFooter() {
        let totalQuantity = data_DaChon.reduce((a, b) => { return Number(a) + Number(b.SOLUONG) }, 0);
        $(in_tbMatHang.column(4).footer()).text(totalQuantity)
    }
    $(document).on('click', '#table-mat-hang tbody tr', function () {
        let $this = $(this);
        $this.addClass('selected');
        $('#table-mat-hang tbody tr').not(this).removeClass('selected');
    })
    $(document).on('dblclick', '#table-mat-hang tbody tr', function () {
        let $this = $(this);
        $this.addClass('selected');
        $('#table-mat-hang tbody tr').not(this).removeClass('selected');
        let id = $this.attr('data-id');
        data_DaChon = data_DaChon.filter(n => n.MHID != id);
        in_tbMatHang.clear();
        in_tbMatHang.rows.add(data_DaChon);
        in_tbMatHang.columns.adjust().draw();
        $this.remove();

    })
    var in_tbMatHang = $('#table-mat-hang').DataTable({
        bFilter: false,
        bInfo: false,
        data: data_DaChon,
        scrollX: true,
        scrollY: 290,
        bInfo: false,
        paging: false,
        searching: true,
        responsive: false,
        lengthChange: false,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHID);
            $($(nRow).children()[0]).html(Number(iDataIndex) + 1);
        },
        columns: [
            {
                "data": null,

            },
            { "data": "MHCODE" },
            { "data": "MHTEN" },
            {
                "data": null,
                sortable: true,
                orderDataType: "dom-text",
                render: function (data, type, row) {
                    return `<input type="text" name="alias" value="${row.MATCHCODE}" >`;
                }
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-text",
                render: function (data, type, row) {                    
                    return `<input type="number" name="soluong" value="${row.SOLUONG}" >`;
                }
            },
            { "data": "DONVI" },
            {
                "data": "GIABANLE",
                sortable: true,
                orderDataType: "dom-text",
                render: function (data, type, row) {

                    return `<input type="text" data-type="currency" name="giabanle" value="${convertCurrency(row.GIABANLE)}" >`;
                }
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-text",
                render: function (data, type, row) {
                    data_DaChon.find(n => n.MHID == row.MHID)["SOLO"] = '';
                    return `<input type="text" name="lo" value="" >`;
                }
            },
            {
                "data": "GHICHU",
                sortable: true,
                orderDataType: "dom-text",
                render: function (data, type, row) {

                    return `<input type="text" name="ghichu" value="${row.GHICHU}" >`;
                }
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-text",
                render: function (data, type, row) {
                    //data_DaChon.find(n => n.MHID == row.MHID)["IMEI"] = '';
                    return `<input type="text" name="imei" value="" >`;
                }
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-text",
                render: function (data, type, row) {
                    let baohanh = "";
                    if (row.MHBHID == 0) {
                        baohanh = "Không bảo hành"
                    } else {
                        baohanh = row.MHBHID + " tháng";
                    }
                    return `<input type="text" name="baohanh" value="${baohanh}" >`;
                }
            },

            {
                "data": null,
                sortable: true, orderDataType: "dom-text",
                render: function (data, type, row) {

                    return `<input type="text"   name="xuatxu" value="${row.XUATXU}">`;
                }
            },
            {
                "data": null,
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {

                    return `<input type="checkbox" name="cb-checkmathang" >`;
                }
            },
        ], "dom": '<"pull-left"f><"pull-right"l>tip',
        footerCallback: function () {
            var api = this.api(); 
            let totalRow = data_DaChon.length;
            let totalQuantity = data_DaChon.reduce((a, b) => { return Number(a) + Number(b.SOLUONG) }, 0);
            $(api.column(0).footer()).text(totalRow)
            $(api.column(4).footer()).text(totalQuantity)
        }
    });
 
    $('.in-reset').click(function () {
        data_DaChon = [];
        in_tbMatHang.clear().draw();
        in_tbMatHang.rows.add(data_DaChon); // Add new data    
        in_tbMatHang.columns.adjust().draw();
    });
    function sortASC(a, b) {
        if (a.MHCODE < b.MHCODE) {
            return -1;
        }
        if (a.MHCODE > b.MHCODE) {
            return 1;
        }
        return 0;
    }
    function sortDesc(a, b) {
        if (b.MHCODE < a.MHCODE) {
            return -1;
        }
        if (b.MHCODE > a.MHCODE) {
            return 1;
        }
        return 0;
    }
    $('.btn-in-all').click(function () {
        if (data_DaChon.length <= 0) {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn mặt hàng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
            return false;
        }
        let option = {};
        option["inHeader"] = $('input[name="in-header"]').prop('checked');//in header
        option["inHeaderCustom"] = $('input[name="in-header-custom"]').val();//in header với text custom, khi không check auto
        option["inHeaderAuto"] = $('input[name="in-header-auto"]').prop('checked');//in header auto là tên hàng
        option["inHeaderMaxLength"] = $('input[name="in-header-max-length"]').val();
        option["inFooter"] = $('input[name="in-footer"]').prop('checked');
        option["inFooterPrice"] = $('input[name="in-footer-price"]').prop('checked');
        option["inFooterFirst"] = $('input[name="in-footer-first"]').val();
        option["inFooterLast"] = $('input[name="in-footer-last"]').val();
        option["inFooterGiaTheo"] = $('input[name="in-footer-gia-theo"]').val();
        option["inSort"] = $('input[name="in-sort"]:checked').val();
        option["inTypebarcode"] = $('select[name="in-type-barcode"]').val();
        option["inBarcodeBy"] = $('select[name="in-barcode-by"]').val();
        let all = '';
        if (option.inSort == 1) {
            data_DaChon = data_DaChon.sort(sortASC)

        } else {
            data_DaChon = data_DaChon.sort(sortDesc)
        }
        for (var i = 0; i < data_DaChon.length; i++) {
            let item = data_DaChon[i];
            if (item.SOLUONG > 0) {
                for (var x = 0; x < item.SOLUONG; x++) {
                    let div = document.createElement("div");
                    let data = '';
                    if (option.inBarcodeBy == 1) {
                        data = item.MHCODE;
                    } else if (option.inBarcodeBy == 2) {
                        data = item.MATCHCODE;
                    } else if (option.inBarcodeBy == 3) {
                        data = item.SOLO + item.MHCODE;
                    } else if (option.inBarcodeBy == 4) {
                        data = item.IMEI;
                    } else {
                        data = item.SOLO;
                    }
                    let codename = '';
                    for (var j = 0; j < data.length; j++) {
                        codename += '<p>' + data[j] + '</p>';
                    }
                    $(div).barcode(data, option["inTypebarcode"], { output: "bmp" });
                    //header
                    let header = '';
                    if (option.inHeader === true) {
                        if (option.inHeaderAuto === true) {
                            let maxlength = item.MHTEN;
                            if (Number(option.inHeaderMaxLength) > 0) {
                                maxlength = maxlength.substr(0, Number(option.inHeaderMaxLength));
                            }
                            header = '<p class="title">' + maxlength + '</p>';
                        } else {
                            let maxlength = option.inHeaderCustom;
                            if (Number(option.inHeaderMaxLength) > 0) {
                                maxlength = maxlength.substr(0, Number(option.inHeaderMaxLength));
                            }
                            header = '<p class="title">' + maxlength + '</p>';
                        }
                    }
                    //footer
                    let footer = '';
                    if (option.inFooter === true) {
                        if (option.inFooterPrice === true) {
                            footer = `<p class="price">${option.inFooterFirst} ${convertCurrency(item.GIABANLE)} ${option.inFooterLast}</p>`
                        }
                    }
                    //main
                    let element = ` <div class="print-inner-item">
                         ${header}
                              <div class="wrap-barcode">
                                    <div class="barcode">
                                                               ${div.innerHTML}
                                    </div>
                                    <div class="code-name">
                                                    ${codename}
                                    </div>
                              </div>
                          ${footer}
                            </div>`;
                    all += element;
                }
            }
        }

        $(".export-content").html(all);
        setTimeout(() => {
            $('#print-hoadon').addClass('show');
            window.focus();
            window.print();
            window.close();
        }, 500);
    });

    let tablePhieuNhap_filterValues = {};
    var tablePhieuNhap = $('#in-ds-nhap-kho').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        sDom: 'lrtip',
        searching: false,
        ajax: function (data, callback, settings) {
            tablePhieuNhap_filterValues.draw = data.draw;
            tablePhieuNhap_filterValues.start = data.start;
            tablePhieuNhap_filterValues.length = data.length;
            tablePhieuNhap_filterValues.order = data.order[0].column;
            tablePhieuNhap_filterValues.dir = data.order[0].dir;
            tablePhieuNhap_filterValues.MHCODE = $('input[name="n-maHang"]').val();
            tablePhieuNhap_filterValues.fd = $('input[name="in-dateFrom"]').val();
            tablePhieuNhap_filterValues.td = $('input[name="in-dateTo"]').val();
            tablePhieuNhap_filterValues.LDNID = $('select[name="in-ldnid"]').val();
            tablePhieuNhap_filterValues.MHDCODE = $('input[name="in-soPhieu"]').val();
            tablePhieuNhap_filterValues.KHCODE = $('input[name="in-maNCC"]').val();
            tablePhieuNhap_filterValues.KHNAME = $('input[name="in-tenNCC"]').val();
            tablePhieuNhap_filterValues.CAID = $('select[name="in-caid"]').val();
            tablePhieuNhap_filterValues.filterTime = $('input[name="in-filter-time"]').prop('checked');
            $.ajax({
                url: '/InBarCode/LoadPhieuNhap',
                method: 'GET',
                data: tablePhieuNhap_filterValues,
                success: function (msg) {

                    if (msg.status == 2) {
                        if (tablePhieuNhap_filterValues.draw != 1) {
                            toast.create({
                                title: 'Notification!',
                                text: msg.message,
                                icon: 'error_outline',
                                classBackground: 'noti-error',
                                timeout: 3000
                            });
                            return false;
                        }
                    } else if (msg.status == 3) {
                        if (tablePhieuNhap_filterValues.draw != 1) {
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
            { "data": "RowIndex" },
            { "data": "MHDCODE" },
            {
                "data": "NGAYHD",
                render: function (data, type, row) {
                    return moment(row.NGAYHD).format('DD/MM/yyyy')
                }
            },
            { "data": "KHCODE" },
            { "data": "KHTEN" },
            { "data": "NVTEN" },
            {
                "data": "TONGTIEN",
                render: function (data, type, row) {
                    return convertCurrency(row.TONGTIEN);
                }
            },
            { "data": "LDTEN" },
            { "data": "USERID" },
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHDID);
        },
        scroller: {
            loadingIndicator: true,
            displayBuffer: 10
        },
        scrollY: 550,
        scrollCollapse: true,
        bInfo: false,
        paging: true,
        searching: true,
        pageLength: 5,
        lengthChange: false
    });

    $('.btn-search-phieu-nhap-kho').click(function () {
        tablePhieuNhap.draw();
    });
    $('#phieu-nhap-kho').on('shown.bs.modal', function () {
        tablePhieuNhap.draw();
    });
    $('#in-ds-nhap-kho tbody').on('click', 'tr', function () {
        let $this = $(this);
        $this.addClass('selected');
        $('#in-ds-nhap-kho tbody tr').not(this).removeClass('selected');
    });
    $('#in-ds-nhap-kho tbody').on('dblclick', 'tr', function () {
        let $this = $(this);
        let ctphieu = $this.attr('data-id');
        $.ajax({
            async: true,
            method: 'GET',
            url: '/InBarCode/LoadChiTietPhieuNhap?ctPhieu=' + ctphieu,
            success: function (msg) {               
                data_DaChon = data_DaChon.concat(msg.data);
                in_tbMatHang.clear().draw();
                in_tbMatHang.rows.add(data_DaChon); // Add new data    
                in_tbMatHang.columns.adjust().draw();
                $('#phieu-nhap-kho').modal('hide');
            }
        });
    });
    function convertCurrency(value) {
        let n = Number(value);
        let soam = false;
        if (n < 0)
            soam = true;
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        if (soam == true) {
            return "-" + number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else {
            return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }

    };
});