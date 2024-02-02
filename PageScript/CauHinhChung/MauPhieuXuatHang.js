$(document).ready(function () {
    $.ajax({
        async: false,
        type: 'GET',
        url: '/CauHinhChung/GetById',
        success: function (msg) {
            $('textarea[name=txt-mauphieuxuathang]').val(msg.data?.NoiDung);
        },
    });
});

$('#btn-save-mauphieuxuathang').click(function () {
    $('#btn-save-mauphieuxuathang').attr('disabled', 'disabled');
    let noidung = $('textarea[name=txt-mauphieuxuathang]').val();
    console.log(noidung);
    $.ajax({
        async: false,
        type: 'PUT',
        url: '/CauHinhChung/MauPhieuXuatHang',
        data: {noidung: noidung},
        success: function (msg) {
            if (msg.rs) {

                $('#btn-save-mauphieuxuathang').removeAttr('disabled');

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
    });
});
