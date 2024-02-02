
var dataUserGroupRight = [];

$(document).ready(function () {
    //#region QUẢN LÍ USER

    $('#table-nsd thead tr').clone(true).appendTo('#table-nsd thead');
    $('#table-nsd thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-nsd="' + i + '"/>');
        }
    });

    let tbNguoiSuDung_filterValues = {};
    var tbNguoiSuDung = $('#table-nsd').DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        ajax: function (data, callback, settings) {
            tbNguoiSuDung_filterValues.draw = data.draw;
            tbNguoiSuDung_filterValues.start = data.start;
            tbNguoiSuDung_filterValues.length = data.length;
            tbNguoiSuDung_filterValues.order = data.order[0].column;
            tbNguoiSuDung_filterValues.dir = data.order[0].dir;

            tbNguoiSuDung_filterValues.search1 = $('input[data-search-nsd=1]').val();
            tbNguoiSuDung_filterValues.search2 = $('input[data-search-nsd=2]').val();
            tbNguoiSuDung_filterValues.search3 = $('input[data-search-nsd=3]').val();
            $.ajax({
                url: '/HeThong/LoadUser',
                method: 'GET',
                data: tbNguoiSuDung_filterValues,
                success: function (msg) {

                    if (msg.status == 2) {
                        if (tbNguoiSuDung_filterValues.draw != 1) {
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
                        if (tbNguoiSuDung_filterValues.draw != 1) {
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
            { "data": "USERID" },
            { "data": "FULLNAME" },
            { "data": "USERGROUP" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.USERID);

        }, scroller: {
            loadingIndicator: true,
            displayBuffer: 15
        },
        // scrollY: '300px',
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        bInfo: false,
        paging: true,
        searching: false,
        pageLength: 5,
        lengthChange: false,
        orderCellsTop: true
    });

    $(tbNguoiSuDung.table().container()).on('keyup', 'thead input', function (e) {
        tbNguoiSuDung.draw();
    });

    $(document).on('click', '#table-nsd tbody tr', function () {
        $(this).addClass('selected');
        $('#table-nsd tbody tr').not(this).removeClass('selected');
    });
    $(document).on('dblclick', '#table-nsd tbody tr', async function () {
        $(this).addClass('selected');
        $('#table-nsd tbody tr').not(this).removeClass('selected');
        LoadUserInfo($(this).attr('data-id')).then((rs) => {

            LoadGroupUserForm(rs.data[0].USERID);
            LoadWareHouseUser(rs.data[0].USERID);
            $('#form-add input[name="txt-userId"]').val(rs.data[0].USERID);
            $('#form-add input[name="txt-userId"]').attr('disabled', true);
            $('#form-add input[name="txt-userFullName"]').val(rs.data[0].FULLNAME);
            $('#form-add input[name="txt-userEmail"]').val(rs.data[0].USERNAME);
            $('#form-add input[name="txt-userPwd"]').prop('required', false);
            $('#form-add input[name="txt-userPwdConfirm"]').prop('required', false);
            $('#form-add').removeClass('was-validated');
            $('#form-add').modal();
        });
    });
    $('.add-new-user').on('click', function () {
        $('#form-add input[name="txt-userId"]').prop('disabled', false);
        $('#form-add input[name="txt-userPwd"]').prop('required', true);
        $('#form-add input[name="txt-userPwdConfirm"]').prop('required', true);
        $('#form-add .add-info input').each(function (index, e) {
            $(e).val('');
        });
        $('#form-add').removeClass('was-validated');
        $('#form-add input[type="checkbox"]').each(function (index, e) {
            $(e).prop('checked', false);
        });
        LoadGroupUserForm('');
        LoadWareHouseUser('');
        $('#form-add').modal();
    });
    $('.update-user').click(function () {
        if ($('#table-nsd tbody tr.selected').attr('data-id') != undefined) {
            LoadUserInfo($('#table-nsd tbody tr.selected').attr('data-id')).then((rs) => {
                LoadGroupUserForm(rs.data[0].USERID);
                LoadWareHouseUser(rs.data[0].USERID);
                $('#form-add input[name="txt-userId"]').val(rs.data[0].USERID);
                $('#form-add input[name="txt-userId"]').attr('disabled', true);
                $('#form-add input[name="txt-userFullName"]').val(rs.data[0].FULLNAME);
                $('#form-add input[name="txt-userEmail"]').val(rs.data[0].USERNAME);
                $('#form-add input[name="txt-userPwd"]').prop('required', false);
                $('#form-add input[name="txt-userPwdConfirm"]').prop('required', false);
                $('#form-add').removeClass('was-validated');
                $('#form-add').modal();
            });
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn user',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });
    $('.delete-user').click(function () {
        if ($('#table-nsd tbody tr.selected').attr('data-id') != undefined) {
            let uid = $('#table-nsd tbody tr.selected').attr('data-id');
            if (confirm("Bạn có muốn xóa tài khoản này?")) {
                $.ajax({
                    async: true,
                    method: 'GET',
                    url: '/HeThong/DeleteUser?userId=' + uid,
                    success: function (msg) {

                        if (msg.status == 1) {
                            tbNguoiSuDung.ajax.reload();
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
                        } else {
                            if (msg.draw != 1) {
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
                    }
                })
            }
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn user',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });
    $('.export-user').click(function () {
        let link = window.location.origin;
        link = link + `/HeThong/ExportUser?order= ` + tbNguoiSuDung_filterValues.order +
            `&dir=` + tbNguoiSuDung_filterValues.dir +
            `&search1=` + tbNguoiSuDung_filterValues.search1 +
            `&search2=` + tbNguoiSuDung_filterValues.search2 +
            `&search3=` + tbNguoiSuDung_filterValues.search3;
        window.open(link);
    });


    async function LoadUserInfo(userId) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/HeThong/LoadUserInfo?userId=' + userId,
            success: function (msg) {
                return msg.data;
            }
        })
    }
    async function LoadGroupUserForm(userId) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/HeThong/LoadGroupUserForm?userId=' + userId,
            success: function (msg) {

                $('#tbody-groupuser').empty();
                $('#tbody-groupuser').append(msg.data[0].data);

            }
        });
    }
    async function LoadWareHouseUser(userId) {
        return $.ajax({
            async: true,
            method: 'GET',
            url: '/HeThong/LoadWareHouseUser?userId=' + userId,
            success: function (msg) {
                $('#tbody-showroom').empty();
                $('#tbody-showroom').append(msg.data[0].data);

            }
        });
    }
    $('#btn-add-user').click(function () {
        let $currentForm = $('#form-add');
        let inputs = $currentForm.find('*:required');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                $currentForm.addClass('was-validated');
                //$(inputs[i]).parent().addClass('was-validated');        
                return false;
                break;
            }
        }
        $currentForm.addClass('was-validated');
        let userId = $('#form-add input[name="txt-userId"]').val();
        let fullName = $('#form-add input[name="txt-userFullName"]').val();
        let userEmail = $('#form-add input[name="txt-userEmail"]').val();
        let pwd = $('#form-add input[name="txt-userPwd"]').val();
        let pwdConfirm = $('#form-add input[name="txt-userPwdConfirm"]').val();
        let groupUser = [];
        $('input[name="cb-Group"]:checked').each(function (index, e) {
            let group = {};
            group["groupId"] = $(e).attr('data-id');
            let isMain = false;
            let main = $(e).closest('tr').find('input[name="cb-GroupMain"]');
            if (main != undefined) {
                if ($(main).prop('checked') == true) {
                    isMain = true;
                }
            }
            group["isMain"] = isMain;
            groupUser.push(group);
        });
        let userKho = [];
        $('input[name="cb-userKho"]:checked').each(function (index, e) {
            userKho.push($(e).attr('data-id'));
        })
        let data = new FormData();
        data.append("userId", userId);
        data.append("fullName", fullName);
        data.append("userEmail", userEmail);
        data.append("pwd", pwd);
        data.append("pwdConfirm", pwdConfirm);
        data.append("groupUser", JSON.stringify(groupUser));
        data.append("userKho", JSON.stringify(userKho));
        $.ajax({
            async: false,
            type: 'POST',
            url: '/HeThong/InsertUpdateUser',
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg.status == 1) {
                    tbNguoiSuDung.ajax.reload();
                    $('#form-add').modal('hide');
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
                } else {
                    if (msg.draw != 1) {
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
            error: function (error) {
                console.log('e');
            }
        });
    });

    //#endregion

    $('#table-group-user thead tr').clone(true).appendTo('#table-group-user thead');
    $('#table-group-user thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-group-user="' + i + '"/>');
        }

        $('input', this).on('keyup change', function () {
            if (tbGroupUser.column(i).search() !== this.value) {
                tbGroupUser
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });
    });

    //#region quản lý nhóm user

    var tbGroupUser = $('#table-group-user').DataTable({
        ajax: '/HeThong/LoadUserGroup',
        columns: [
            { "data": "RowIndex" },
            { "data": "Code" },
            { "data": "Name" }
        ],
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.ID);
            $(nRow).attr('data-code', data.Code);
            $(nRow).attr('data-name', data.Name);
        },
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        bInfo: false,
        paging: false,
        "dom": 'lrtip',
        orderCellsTop: true

    });
    $(document).on('click', '#table-group-user tbody tr', function () {
        $(this).addClass('selected');
        $('#table-group-user tbody tr').not(this).removeClass('selected');
    });

    $(document).on('dblclick', '#table-group-user tbody tr', async function () {
        $(this).addClass('selected');
        $('.add-group-user').attr('data-type', 'edit');
        $('#table-group-user tbody tr').not(this).removeClass('selected');
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-id"]').val($(this).attr('data-id'));
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-code"]').val($(this).attr('data-code'));
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-name"]').val($(this).attr('data-name'));
        $('#phan-quyen-form-add-group-user').modal();
    });
    $('.btn-add-user-group').click(function () {
        $('.add-group-user').attr('data-type', 'insert');
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-id"]').val('');
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-code"]').val('');
        $('#phan-quyen-form-add-group-user').find('input[name="group-user-name"]').val('');
        $('#phan-quyen-form-add-group-user').modal();
    });
    $('.btn-edit-user-group').click(function () {
        if ($('#table-group-user tbody tr.selected').attr('data-id') != undefined) {
            $('.add-group-user').attr('data-type', 'edit');
            let $this = $('#table-group-user tbody tr.selected');
            $('#phan-quyen-form-add-group-user').find('input[name="group-user-id"]').val($this.attr('data-id'));
            $('#phan-quyen-form-add-group-user').find('input[name="group-user-code"]').val($this.attr('data-code'));
            $('#phan-quyen-form-add-group-user').find('input[name="group-user-name"]').val($this.attr('data-name'));
            $('#phan-quyen-form-add-group-user').modal();
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhóm user',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });
    $('.add-group-user').click(function () {
        let id = $('#phan-quyen-form-add-group-user').find('input[name="group-user-id"]').val();
        let code = $('#phan-quyen-form-add-group-user').find('input[name="group-user-code"]').val();
        let name = $('#phan-quyen-form-add-group-user').find('input[name="group-user-name"]').val();
        if ($(this).attr('data-type') == "insert") {
            let data = new FormData();
            data.append("code", code);
            data.append("name", name);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/HeThong/InsertGroupUser',
                data: data,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (msg) {
                    if (msg.status == 1) {
                        tbGroupUser.ajax.reload();
                        $('#phan-quyen-form-add-group-user').modal('hide');
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
                    } else {
                        if (msg.draw != 1) {
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
                error: function (error) {
                    console.log('e');
                }
            });

        } else if ($(this).attr('data-type') == "edit") {
            if ($('#table-group-user tbody tr.selected').attr('data-id') != undefined) {
                let data = new FormData();
                data.append("groupId", id);
                data.append("code", code);
                data.append("name", name);
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: '/HeThong/EditGroupUser',
                    data: data,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    success: function (msg) {
                        if (msg.status == 1) {
                            tbGroupUser.ajax.reload();
                            $('#phan-quyen-form-add-group-user').modal('hide');
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
                        } else {
                            if (msg.draw != 1) {
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
                    error: function (error) {
                        console.log(error);
                    }
                });
            } else {
                toast.create({
                    title: 'Notification!',
                    text: 'Vui lòng chọn user',
                    icon: 'error_outline',
                    classBackground: 'noti-error',
                    timeout: 3000
                })
            }

        }
    })
    $('.btn-delete-group-user').click(function () {
        if ($('#table-group-user tbody tr.selected').attr('data-id') != undefined) {

            if (confirm("Bạn có muốn xóa nhóm user này?")) {
                let id = $('#table-group-user tbody tr.selected').attr('data-id');
                $.ajax({
                    async: true,
                    method: 'GET',
                    url: '/HeThong/DeleteGroupUser?groupId=' + id,
                    success: function (msg) {

                        if (msg.status == 1) {
                            tbGroupUser.ajax.reload();
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
                        } else {
                            if (msg.draw != 1) {
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
                    }
                })
            }
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chọn nhóm user',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });
    $('.btn-export-user-group').click(function () {
        let link = window.location.origin;
        link = link + `/HeThong/ExportGroupUser`;
        window.open(link);
    });
    //#endregion


    //#region Phân quyền


    $.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    }

    $('#table-phan-quyen thead tr').clone(true).appendTo('#table-phan-quyen thead');
    $('#table-phan-quyen thead tr:eq(1) th').each(function (i) {
        var title = $(this).text();
        if (i == 0) {
            return;
        }
        else if (i == 3) {
            $(this).html(`<input type="checkbox" name="phan-quyen-search" />`);
        } else if (i == 4) {
            $(this).html(`<input type="checkbox" name="phan-quyen-write" />`);
        } else if (i == 5) {
            $(this).html(`<input type="checkbox" name="phan-quyen-edit" />`);
        } else if (i == 6) {
            $(this).html(`<input type="checkbox" name="phan-quyen-delete" />`);
        } else if (i == 7) {
            $(this).html(`<input type="checkbox" name="phan-quyen-print" />`);
        } else if (i == 8) {
            $(this).html(`<input type="checkbox" name="phan-quyen-export" />`);
        }
        else {
            $(this).html('<input type="text" style="width:100%" placeholder="Search ' + title.trim() + '" data-search-phan-quyen="' + i + '"/>');
        }

        $('input[type="text"]', this).on('keyup change', function () {
            if (tbUserGroupRight.column(i).search() !== this.value) {
                tbUserGroupRight
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });

        //$('select', this).on('change', function () {
        //    if (tbUserGroupRight.column(i).search() !== this.value) {
        //        tbUserGroupRight
        //            .column(i)
        //            .search(this.value)
        //            .draw();
        //    }
        //});
    });

    var tbUserGroupRight = $('#table-phan-quyen').DataTable({
        data: dataUserGroupRight,
        columns: [
            { "data": "RowIndex" },
            { "data": "FUNCTIONID" },
            { "data": "FUNCTIONNAMEVN" },
            {
                "data": "RIGHTSEARCH",
                sortable: true,
                orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-search" ${data ? 'checked' : ''}>`;
                }
            },
            {
                "data": "RIGHTWRITE",
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-write" ${data ? 'checked' : ''}>`;
                }
            },
            {
                "data": "RIGHTEDIT",
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-edit" ${data ? 'checked' : ''}>`;
                }
            },
            {
                "data": "RIGHTDELETE",
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-delete" ${data ? 'checked' : ''}>`;
                }
            },
            {
                "data": "RIGHTPRINT",
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {
                    return `<input type="checkbox"  data-index="${row.RowIndex - 1}" name="cb-print" ${data ? 'checked' : ''}>`;
                }
            },
            {
                "data": "RIGHTEXPORT",
                sortable: true, orderDataType: "dom-checkbox",
                render: function (data, type, row) {

                    return `<input type="checkbox" data-index="${row.RowIndex - 1}" name="cb-export" ${data ? 'checked' : ''}>`;

                }
            }

        ],
        columnDefs: [
            {
                render: function (data, type, row) {
                    console.log(data);
                    var i = (type === 'sort' ? ($(data).prop("checked") === true ? 'Yes' : 'No') : data);
                    return i;
                },
                targets: [3, 4, 5, 6, 7, 8]
            }
        ],
        responsive: true,
        fnCreatedRow: function (nRow, data, iDataIndex) {
            $(nRow).attr('data-id', data.FUNCTIONID);
        },
        scrollX: true,
        scrollResize: true,
        scrollY: 100,
        scrollCollapse: true,
        bInfo: false,
        paging: false,
        searching: true,
        "dom": 'lrtip',
        orderCellsTop: true
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        tbUserGroupRight.columns.adjust().draw();
    });
    $.ajax({
        async: false,
        type: 'GET',
        url: '/HeThong/LoadUserGroup',
        dataType: 'json',
        success: function (msg) {
            $('#ddl-user-group').empty();
            for (var i = 0; i < msg.data.length; i++) {
                let item = msg.data[i];
                $('#ddl-user-group').append($('<option>', {
                    value: item.ID,
                    text: item.Name
                }));
            }
            if (msg.data.length > 0) {
                LoadUserGroupRightByUserGroupId(msg.data[0].ID)

            }
        },
        error: function (error) {
            console.log('e');
        }
    });
    function LoadUserGroupRightByUserGroupId(userGroupId) {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/HeThong/LoadUserGroupRightByUserGroupId?userGroupId=' + userGroupId + '',
            dataType: 'json',
            success: function (msg) {
                dataUserGroupRight = msg.data;
                for (var i = 0; i < dataUserGroupRight.length; i++) {
                    dataUserGroupRight[i]["IsDisabled"] = true;
                }
                tbUserGroupRight.clear().draw();
                tbUserGroupRight.rows.add(dataUserGroupRight); // Add new data
                tbUserGroupRight.columns.adjust().draw();

            },
            error: function (error) {
                console.log('e');
            }
        });
    }
    $('.btn-add-chuc-nang').click(function () {
        dataUserGroupRight = [...dataChucNangDuocChon];
        for (var i = 0; i < dataUserGroupRight.length; i++) {
            if (dataUserGroupRight[i].RowIndex == undefined) {
                dataUserGroupRight[i].RowIndex = i + 1;
            }
        }
        tbUserGroupRight.clear().draw();
        tbUserGroupRight.rows.add(dataUserGroupRight); // Add new data
        tbUserGroupRight.columns.adjust().draw();

    });
    $('#ddl-user-group').on('change', function () {
        LoadUserGroupRightByUserGroupId($('#ddl-user-group').val());
    });
    $('.phan-quyen-btn-refresh').click(function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/HeThong/LoadUserGroupRightByUserGroupId?userGroupId=' + $('#ddl-user-group').val() + '',
            dataType: 'json',
            success: function (msg) {
                if (msg.status == 1) {
                    dataUserGroupRight = msg.data;
                    for (var i = 0; i < dataUserGroupRight.length; i++) {
                        dataUserGroupRight[i]["IsDisabled"] = true;
                    }
                    tbUserGroupRight.clear().draw();
                    tbUserGroupRight.rows.add(dataUserGroupRight); // Add new data
                    tbUserGroupRight.columns.adjust().draw();
                } else if (msg.status == 2) {
                    toast.create({
                        title: 'Notification!',
                        text: msg.message,
                        icon: 'error_outline',
                        classBackground: 'noti-error',
                        timeout: 3000
                    })
                } else {
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
            },
            error: function (error) {
                console.log('e');
            }
        });
    });
    $('.phan-quyen-delete').click(function () {
        let functionId = $('#table-phan-quyen tr.selected').attr('data-id');
        if (functionId != undefined) {
            let html = $($('#table-phan-quyen tr.selected').children()[1]).html();
            let uId = $('#ddl-user-group').val();
            console.log(uId);
            if (confirm(`Bạn chắn chắn muốn xóa ${html} không`)) {
                let dataToSend = JSON.stringify({ "userGroupId": uId, "functionId": functionId })
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: '/HeThong/DeleteUserGroupRight',
                    data: dataToSend,
                    success: function (msg) {
                        if (msg.status == 1) {
                            dataUserGroupRight = dataUserGroupRight.filter(n => n.FUNCTIONID != functionId);
                            tbUserGroupRight.clear().draw();
                            tbUserGroupRight.rows.add(dataUserGroupRight); // Add new data
                            tbUserGroupRight.columns.adjust().draw();
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
                            })
                        } else {
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
                })
            }
        } else {
            toast.create({
                title: 'Notification!',
                text: 'Vui lòng chức năng',
                icon: 'error_outline',
                classBackground: 'noti-error',
                timeout: 3000
            })
        }
    });
    $('.phan-quyen-export').click(function () {
        let uid = $('#ddl-user-group').val();
        let link = window.location.origin;
        link = link + "/HeThong/ExportUserGroupRightByUserGroupId?userGroupId=" + uid + "";
        window.open(link);
    });
    $('.phan-quyen-delete-all').click(function () {
        if (confirm("Bạn có chắc chắn muốn xóa tất cả?")) {
            let uid = $('#ddl-user-group').val();
            let dataToSend = JSON.stringify({ "userGroupId": uid });
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/HeThong/DeleteUserGroupRightAll',
                data: dataToSend,
                success: function (msg) {
                    if (msg.status == 1) {
                        dataUserGroupRight = [];
                        tbUserGroupRight.clear().draw();
                        tbUserGroupRight.rows.add(dataUserGroupRight); // Add new data
                        tbUserGroupRight.columns.adjust().draw();
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
                        })
                    } else {
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
            })
        }
    });
    $('.phan-quyen-save').click(function () {
        let userGroupId = $('#ddl-user-group').val();
        var dataToSend = JSON.stringify({ "userGroupId": userGroupId, "data": dataUserGroupRight });
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/HeThong/UpdateUserGroupRight',
            data: dataToSend,
            success: function (msg) {
                if (msg.status == 1) {
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
                    })
                } else {
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
        })
    })
 
    //#endregion 

    $('#table-nv tbody').unbind('dblclick');
    $('#table-nv tbody').on('dblclick', 'tr', function () {
        $('#danh-sach-nv').modal('hide');
        var nameStaff = $(this).find('td:eq(2)').text();
        $('input[name="txt-userFullName"]').val(nameStaff);
        //slNhanVienKH.val(idNV).trigger('change');
    });
});

$(document).on('click', 'input[name="cb-GroupMain"]', function () {
    $('input[name="cb-GroupMain"]').not(this).prop('checked', false);
});
$(document).on('click', 'input[type="checkbox"].check-all', function () {
    let check = $(this).prop('checked');
    if (check == true) {
        $(this).closest('table').find('input[name="cb-userKho"]').prop('checked', true);
    } else {
        $(this).closest('table').find('input[name="cb-userKho"]').prop('checked', false);
    }
});



$(document).on('click', 'input[name="cb-search"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTSEARCH = $(this).prop('checked');

});
$(document).on('click', 'input[name="cb-write"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTWRITE = $(this).prop('checked');

});
$(document).on('click', 'input[name="cb-edit"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTEDIT = $(this).prop('checked');
});
$(document).on('click', 'input[name="cb-delete"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTDELETE = $(this).prop('checked');
});
$(document).on('click', 'input[name="cb-print"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTPRINT = $(this).prop('checked');

});
$(document).on('click', 'input[name="cb-export"]', function () {
    let index = $(this).attr('data-index');
    dataUserGroupRight[index].RIGHTEXPORT = $(this).prop('checked');
});

$(document).on('click', 'input[name="phan-quyen-search"]', function () {
    let $this = this;
    $('input[name="cb-search"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTSEARCH = $($this).prop('checked');
    });
});

$(document).on('click', 'input[name="phan-quyen-write"]', function () {
    let $this = this;
    $('input[name="cb-write"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTWRITE = $($this).prop('checked');
    });
});
$(document).on('click', 'input[name="phan-quyen-edit"]', function () {

    let $this = this;
    $('input[name="cb-edit"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTEDIT = $($this).prop('checked');
    });
});
$(document).on('click', 'input[name="phan-quyen-delete"]', function () {
    let $this = this;
    $('input[name="cb-delete"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTDELETE = $($this).prop('checked');
    });
});
$(document).on('click', 'input[name="phan-quyen-print"]', function () {
    let $this = this;
    $('input[name="cb-print"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTPRINT = $($this).prop('checked');
    });
});
$(document).on('click', 'input[name="phan-quyen-export"]', function () {
    let $this = this;
    $('input[name="cb-export"]').each(function (index, e) {
        $(e).prop('checked', $($this).prop('checked'));
        let vt = $(e).attr('data-index');
        dataUserGroupRight[vt].RIGHTEXPORT = $($this).prop('checked');
    });
});
$(document).on('click', '#button-danh-sach-nv', function () {
    $('#danh-sach-nv').modal();
}); 