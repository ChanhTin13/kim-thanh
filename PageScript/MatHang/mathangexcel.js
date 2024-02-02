$(document).ready(function () {
    var dataTempMatHangExcel = new Array();
    var tbMatHangExcel = $('#table-mat-hang-excel').DataTable({
        bInfo: false,
        data: dataTempMatHangExcel,
        columns: [
            { "data": null }, //STT
            { "data": "NHOMCAP1" }, //Nhóm cấp 1
            { "data": "NHOMCAP2" }, //Nhóm cấp 2
            { "data": "NHOMCAP3" }, //Nhóm cấp 3
            { "data": "NHOMCAP4" }, //Nhóm cấp 4
            { "data": "NHOMCAP5" }, //Nhóm cấp 5
            { "data": "MHCODE" }, //Mã hàng
            { "data": "MHTEN" }, //Tên hàng
            { "data": "MATCHCODE" }, //Alias
            { "data": "DONVI" }, //Đơn vị tính
            { "data": "BAOHANH" }, //Bảo hành
            { "data": "CAUHINH" }, //Mô tả
            { "data": "GHICHU" }, //Ghi chú
            { "data": "NCC1" }, //NCC1
            { "data": "GIANHAP1" }, //Giá nhập 1
            { "data": "NCC2" }, //NCC2
            { "data": "GIANHAP2" }, //Giá nhập 2
            { "data": "NCC3" }, //NCC3
            { "data": "GIANHAP3" }, //Giá nhập 3
            { "data": "GIABANLE" }, //Giá bán 1
            { "data": "GIABANBUON" }, //Giá bán 2
            { "data": "GIABAN3" }, //Giá bán 3
            { "data": "GIABAN4" }, //Giá bán 4
            { "data": "GIABAN5" }, //Giá bán 5
            { "data": "GIABAN6" }, //Giá bán 6
            { "data": "GIABAN7" }, //Giá bán 7
            { "data": "NGUONGNHAP" }, //Số lượng tồn Max
            { "data": "NGUONGXUAT" }, //Số lượng tồn Min
            { "data": "LINKIMAGE" }, //Link ảnh
            
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.MHCODE);
            let gianhap1 = data.GIANHAP1;
            let gianhap2 = data.GIANHAP2;
            let gianhap3 = data.GIANHAP3;

            let giaban1 = data.GIABANLE;
            let giaban2 = data.GIABANBUON;
            let giaban3 = data.GIABAN3;
            let giaban4 = data.GIABAN4;
            let giaban5 = data.GIABAN5;
            let giaban6 = data.GIABAN6;
            let giaban7 = data.GIABAN7;
            $($(nRow).children()[0]).html(iDataIndex + 1);
            $($(nRow).children()[13]).html(convertCurrency(gianhap1));
            $($(nRow).children()[15]).html(convertCurrency(gianhap2));
            $($(nRow).children()[17]).html(convertCurrency(gianhap3));

            $($(nRow).children()[19]).html(convertCurrency(giaban1));
            $($(nRow).children()[20]).html(convertCurrency(giaban2));
            $($(nRow).children()[21]).html(convertCurrency(giaban3));
            $($(nRow).children()[22]).html(convertCurrency(giaban4));
            $($(nRow).children()[23]).html(convertCurrency(giaban5));
            $($(nRow).children()[24]).html(convertCurrency(giaban6));
            $($(nRow).children()[25]).html(convertCurrency(giaban7));
        },

        scrollResize: true,
        scrollX: true,
        scrollY: 100,
        scrollCollapse: true,

        paging: false,
        searching: false,
        //pageLength: 10,
        //lengthChange: false,
    });

    //Import excel 
    var dataOpt = [];
    $("#btn-import-mat-hang-excel").on('click', function () {
        $('input[type="file"][name="excelMatHang"]').click();
    });
    $('input[type="file"][name="excelMatHang"]').on('change', async function (e) {
        let input, files;
        input = e.target;
        files = input.files;
        await Import(files[0], "", "");
        $(this).val('');
    });

    //Change Sheet
    //$('select[name="slExcel"]').on('change', async function () {
    //    var name = $(this).find('option:selected').text();
    //    var url = $(this).find('option:selected').val();
    //    if (/\s/.test(name)) {
    //        toast.create({
    //            title: 'Notification!',
    //            text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
    //            icon: 'error_outline',
    //            classBackground: 'noti-error',
    //            timeout: 3000
    //        });
    //    }
    //    else {
    //        await Import("", name, url);
    //    }
    //    //console.log(name, url);
    //});

    //Reset
    $('#btn-reset-mat-hang-excel').on('click', function () {
        $('input[type="file"][name="excelMatHang"]').click();
    });

    //Tạo mẫu dữ liệu để nhập excel
    $('#btn-create-mat-hang-excel').on('click', function () {
        var link = `/MatHang/Create`;
        window.open(link)
    });

    //Save
    $('#btn-save-mat-hang-excel').on('click', async function () {
        let soLuong = tbMatHangExcel.data().count();
        if (soLuong > 1000) {
            toast.create({
                title: 'Notification!',
                text: 'Dữ liệu không vượt quá 1000 dòng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        } else if (soLuong == 0) {
            toast.create({
                title: 'Notification!',
                text: 'Không có dữ liệu',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            });
        }
        else {
            ModalAsk(0);
        }
    });

    //Function Import Excel
    async function Import(file, sheetName, url) {
        var data = new FormData();
        data.append("FileUpload", file);
        data.append("SheetName", sheetName);
        data.append("URL", url);
        return $.ajax({
            type: 'POST',
            url: '/MatHang/Import',
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.status == 1) {
                    console.log(res.data);
                    tbMatHangExcel.clear();
                    dataTempMatHangExcel = [];
                    dataTempMatHangExcel = res.data;
                    tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    tbMatHangExcel.columns.adjust().draw();
                    //if (sheetName === '') {
                    //    $('select[name="slExcel"]').children().remove().end();
                    //    for (var i = 0; i < res.sheetName.length; i++) {
                    //        var opt = new Option(res.sheetName[i].Name, res.sheetName[i].URL);
                    //        $(opt).html(res.sheetName[i].Name);
                    //        $('select[name="slExcel"]').append(opt);
                    //        dataOpt.push(res.sheetName[i].Name);
                    //        if (/\s/.test(res.sheetName[i].Name)) {
                    //            toast.create({
                    //                title: 'Notification!',
                    //                text: 'Không được phép đặt tên Sheet có dấu cách (space)!',
                    //                icon: 'error_outline',
                    //                classBackground: 'noti-error',
                    //                timeout: 3000
                    //            });
                    //        }
                    //    }
                    //}
                    //dataTempMatHangExcel = [];
                    //for (var i = 0; i < res.data.length; i++) {
                    //    if (!validation.isNumber(res.data[i].GIANHAP1)) {
                    //        confirm("Dữ liệu GIÁ NHẬP 1 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIANHAP2)) {
                    //        confirm("Dữ liệu GIÁ NHẬP 2 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIANHAP3)) {
                    //        confirm("Dữ liệu GIÁ NHẬP 3 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIABANLE)) {
                    //        confirm("Dữ liệu GIÁ BÁN 1 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIABANBUON)) {
                    //        confirm("Dữ liệu GIÁ BÁN 2 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIABAN3)) {
                    //        confirm("Dữ liệu GIÁ BÁN 3 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (!validation.isNumber(res.data[i].GIABAN4)) {
                    //        confirm("Dữ liệu GIÁ BÁN 4 sai tại dòng " + (i + 2) + "\nGiá trị này phải là kiểu sổ hoặc để trống (=0).\nHãy kiểm tra lại");
                    //        dataTempMatHangExcel = [];
                    //        tbMatHangExcel.clear().columns.adjust().draw();
                    //        tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //        tbMatHangExcel.columns.adjust().draw();
                    //        break;
                    //    }
                    //    if (res.data[i].MHCODE == "") {
                    //        if (confirm("Sai tại dòng thứ " + (i + 2) + "\nMã hàng bị trống hoặc không phải dữ liệu kiểu xâu\nBạn có muốn bỏ qua mã hàng đó và tiếp tục không?")) {
                    //            continue;
                    //        }
                    //        else {
                    //            dataTempMatHangExcel = [];
                    //            tbMatHangExcel.clear().columns.adjust().draw();
                    //            tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //            tbMatHangExcel.columns.adjust().draw();
                    //            break;
                    //        }
                    //    }
                    //    else {
                    //        dataTempMatHangExcel.push(res.data[i])
                    //    }
                    //    tbMatHangExcel.clear().columns.adjust().draw();
                    //    tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    //    tbMatHangExcel.columns.adjust().draw();
                    //}

                    //if (arrDelete.length > 0) {
                    //    dataTempMatHangExcel = dataTempMatHangExcel.filter(x => !arrDelete.includes(x));
                    //}
                    toast.create({
                        title: 'Notification!',
                        text: 'Thành công',
                        icon: 'check',
                        classBackground: 'noti-success',
                        timeout: 3000
                    });
                }
                else if (res.status == 2) {
                    dataTempMatHangExcel = [];
                    tbMatHangExcel.clear().columns.adjust().draw();
                    tbMatHangExcel.rows.add(dataTempMatHangExcel);
                    tbMatHangExcel.columns.adjust().draw();
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                }
                else if (res.status == 3) {
                    toast.create({
                        title: 'Notification!',
                        text: res.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    });
                    location.reload();
                }
            }
        });
    }

    //Kiểm tra
    var validation = {
        isEmailAddress: function (str) {
            var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str);  // returns a boolean
        },
        isNotEmpty: function (str) {
            var pattern = /\S+/;
            return pattern.test(str);  // returns a boolean
        },
        isNumber: function (str) {
            var pattern = /^\d+$/;
            return pattern.test(str);  // returns a boolean
        },
        isSame: function (str1, str2) {
            return str1 === str2;
        }
    };

    //Function định dạng tiền
    function convertCurrency(value) {
        let regx = /\D+/g;
        let number = value.toString().replace(regx, "");
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    function ModalAsk(index) {
        if (dataTempMatHangExcel[index] != undefined) {
            if (dataTempMatHangExcel[index].STATUS == true) {
                let maHang = `<p>Mã hàng  ${dataTempMatHangExcel[index].MHCODE}  có sự thay đổi</p>`;
                let giaNhap1 = `<p>Giá nhập 1: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIANHAP1CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIANHAP1)} </p>`;
                let giaNhap2 = `<p>Giá nhập 2: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIANHAP2CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIANHAP2)} </p>`;
                let giaNhap3 = `<p>Giá nhập 3: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIANHAP3CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIANHAP3)} </p>`;
                let giaBan1 = `<p>Giá bán 1: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABANLECU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABANLE)} </p>`;
                let giaBan2 = `<p>Giá bán 2: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABANBUONCU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABANBUON)} </p>`;
                let giaBan3 = `<p>Giá bán 3: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABAN3CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABAN3)} </p>`;
                let giaBan4 = `<p>Giá bán 4: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABAN4CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABAN4)} </p>`;
                let giaBan5 = `<p>Giá bán 5: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABAN5CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABAN5)} </p>`;
                let giaBan6 = `<p>Giá bán 6: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABAN6CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABAN6)} </p>`;
                let giaBan7 = `<p>Giá bán 7: Số cũ  ${convertCurrency(dataTempMatHangExcel[index].GIABAN7CU)} - Số mới ${convertCurrency(dataTempMatHangExcel[index].GIABAN7)} </p>`;
                $('#popup-thong-bao-mat-hang').modal();
                $('#popup-thong-bao-mat-hang').find('.ma-hang').html(maHang);
                $('#popup-thong-bao-mat-hang').find('.gia-nhap-1').html(giaNhap1);
                $('#popup-thong-bao-mat-hang').find('.gia-nhap-2').html(giaNhap2);
                $('#popup-thong-bao-mat-hang').find('.gia-nhap-3').html(giaNhap3);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-1').html(giaBan1);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-2').html(giaBan2);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-3').html(giaBan3);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-4').html(giaBan4);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-5').html(giaBan5);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-6').html(giaBan6);
                $('#popup-thong-bao-mat-hang').find('.gia-ban-7').html(giaBan7);

                $('#popup-thong-bao-mat-hang').find('#btn-mat-hang-excel-yes').attr('next-index', Number(index) + 1)
            } else if (dataTempMatHangExcel[index].STATUS == false) {
                ModalAsk(Number(index) + 1);
            } else {
                alert('Hết rồi');
            }
        }
        else {
            let a = dataTempMatHangExcel.findIndex(x => x.STATUS == false);
            ModalCheck(a);
        }
    }

    function ModalCheck(index) {
        if (index == -1) {
            let html = `<p>Bạn không thể trở lại dữ liệu cũ khi ghi xong. Bạn muốn tiếp tục ghi không?</p>`;
            $('#popup-check-mat-hang').find('.check').html(html);
            $('#popup-check-mat-hang').find('.check-1').html('');
            $('#popup-check-mat-hang').find('#btn-check-yes').attr('data-index', 2);
            $('#popup-check-mat-hang').modal();
        }
        else {
            let check = `<p>Có mặt hàng mới chưa tồn tại trong hệ thống, bạn có muốn tiếp tục không?</p>`;
            let check1 = `<p>Nếu nhấp YES, hệ thống sẽ tự thêm mới mặt hàng này!</p>`;
            $('#popup-check-mat-hang').find('.check').html(check);
            $('#popup-check-mat-hang').find('.check-1').html(check1);
            $('#popup-check-mat-hang').find('#btn-check-yes').attr('data-index', 1);
            $('#popup-check-mat-hang').modal();
        }
    }

    $('#btn-mat-hang-excel-yes').click(function () {
        let a = dataTempMatHangExcel.findIndex(x => x.STATUS == false);
        let nextIndex = $(this).attr('next-index');
        $('#popup-thong-bao-mat-hang').modal('hide');
        setTimeout(() => { ModalAsk(nextIndex) }, 500);
    });

    $('#btn-mat-hang-excel-no').click(function () {
        $('#popup-thong-bao-mat-hang').modal('hide');
        let a = dataTempMatHangExcel.findIndex(x => x.STATUS == false);
        setTimeout(() => { ModalCheck(a) }, 500);
    });

    $('#btn-check-yes').click(function () {
        var index = $(this).attr('data-index');
        if (index == 1) {
            $('#popup-check-mat-hang').modal('hide');
            setTimeout(() => { ModalCheck(-1) }, 500);
        }
        else {
            var data = JSON.stringify({ "data": dataTempMatHangExcel });
            $.ajax({
                method: 'POST',
                url: '/MatHang/Save',
                //data: { data: JSON.stringify(dataTempMatHangExcel) },
                data: data,
                dataType: 'json',
                contentType: "application/json",
                success: function (msg) {
                    if (msg.status == 1) {
                        $('#table-mathang').DataTable().draw();
                        $('#popup-check-mat-hang').modal('hide');
                        toast.create({
                            title: 'Notification!',
                            text: 'Thành công',
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        });
                    } else if (msg.status == 2) {
                        toast.create({
                            title: 'Notification!',
                            text: msg.message,
                            icon: 'error_outline',
                            classBackground: 'noti-error',
                            timeout: 3000
                        });
                    } else if(msg.status == 3) {
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
                }
            });
        }
    });
});