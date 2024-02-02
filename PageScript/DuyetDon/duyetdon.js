$(document).ready(function () {
    $('#chooseDate_From').val(moment(new Date()).format('DD/MM/yyyy'));
    $('#chooseDate_To').val(moment(new Date()).format('DD/MM/yyyy'));
    $('.check-code-input').focus();

    let tbCheckCode_filterValues = {};
    let tbCheckCode = $('#table-check-code').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbCheckCode_filterValues.draw = data.draw;
            tbCheckCode_filterValues.search = data.search["value"];
            tbCheckCode_filterValues.start = data.start;
            tbCheckCode_filterValues.length = data.length;
            tbCheckCode_filterValues.order = data.order[0].column;
            tbCheckCode_filterValues.dir = data.order[0].dir;
            tbCheckCode_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
            tbCheckCode_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
            $.ajax({
                url: '/DuyetDon/LoadData',
                method: 'GET',
                data: tbCheckCode_filterValues,
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
                        if (tbCheckCode_filterValues.draw != 1) {
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
            $(nRow).attr('data-id', data.MDCODE);
            let created = data.CreatedDate;
            let accept = data.AcceptDate;
            let color = data.Color;
            if (color === 'red') {
                $(nRow).addClass('late');
            } else {
                $(nRow).addClass('soon');
            }

            //$($(nRow).children()[1]).html(moment(created).format('HH:mm:ss DD/MM/yyyy'));
            //$($(nRow).children()[2]).html(moment(accept).format('HH:mm:ss DD/MM/yyyy'));
        },
        columns: [
            { "data": "BHDCODE" },
            {
                "data": "CreatedDate",
                render: function (data, type, full) {
                    return moment(data).format('HH:mm:ss DD/MM/yyyy')
                }
            },
            {
                "data": "AcceptDate",
                render: function (data, type, full) {
                    return moment(data).format('HH:mm:ss DD/MM/yyyy')
                }
            },
            {
                data: "ThoiGian",
                //render: function (data, type, full) {
                //    var start = moment(full.CreatedDate);
                //    var end = moment(full.AcceptDate);
                //    var differenceInMs = end.diff(start); // diff yields milliseconds
                //    var duration = moment.duration(differenceInMs); // moment.duration accepts ms
                //    var day = parseInt(duration.days());
                //    //var minute = duration.minutes();
                //    //var hour = duration.hours();
                //    //return hour + ':' + minute;

                //    //var d = moment.duration(differenceInMs);
                //    //var s = Math.floor(d.asHours()) + moment.utc(differenceInMs).format(":mm:ss");
                //    //return s;
                //    if (day > 0) {
                //        return moment.utc(differenceInMs).format("HH:mm") +" + " + day + " Ngày";
                //    }
                //    else {
                //        return moment.utc(differenceInMs).format("HH:mm");
                //    }
                //}
            }
        ],
        //columnDefs: [
        //    { targets: [1], orderable: true }
        //],
        "order": [[2, "desc"]],
        scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,

        bInfo: false,
        paging: true,
        searching: true,
        pageLength: 5,
        lengthChange: false,

        stripeClasses: []
    });

    $('#search-phieu').click(function () {
        tbCheckCode_filterValues.FromDate = $('input[name="chooseDate_From"]').val();
        tbCheckCode_filterValues.ToDate = $('input[name="chooseDate_To"]').val();
        tbCheckCode.draw();
    })

    $('.check-code-input').on('keyup', delay( function (e) {
        let value = $(this).val();
        console.log(value.length);
        if (value != "" && value.length >= 8) {
            let data = new FormData();
            data.append('mdcode', value);
            $.ajax({
                async: true,
                type: 'POST',
                url: '/DuyetDon/Insert',
                data: data,
                contentType: false,
                processData: false,
                success: function (rs) {
                    if (rs.status == 1) {
                        tbCheckCode.ajax.reload();
                        $('.check-code-input').val('');
                        $('.check-code-input').focus();
                        toast.create({
                            title: 'Notification!',
                            text: 'Thành công',
                            icon: 'check',
                            classBackground: 'noti-success',
                            timeout: 3000
                        });
                    }
                    else {
                        $('.check-code-input').val('');
                        $('.check-code-input').focus();
                        toast.create({
                            title: 'Notification!',
                            text: rs.message,
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
    },1000));

    $('#check-code-excel').on('click', function () {
        //var filterReport = {};
        //filterReport.draw = tbCheckCode_filterValues.draw;
        //filterReport.search = tbCheckCode_filterValues.search;
        //filterReport.start = tbCheckCode_filterValues.start;
        //filterReport.order = tbCheckCode_filterValues.order;
        //filterReport.dir = tbCheckCode_filterValues.dir;
        //var link = `/DuyetDon/ExportExcel?draw=` + filterReport.draw + `&search=` + filterReport.search + `&start=` + filterReport.start + `&order=` + filterReport.order + `&dir=` + filterReport.dir;
        var link = `/DuyetDon/ExportExcel?` + serialize(tbCheckCode_filterValues) + ``;
        window.open(link);
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