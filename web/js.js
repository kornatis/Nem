"use strict";

$(document).ready(function () {
    let host = "http://192.168.1.100:8080/services"

    let operationType
    let textGroup = $('#textGroup')
    let tagGroup = $('#tagGroup')
    let fileGroup = $('#fileGroup')
    let codeGroup = $('#codeGroup')
    let auditButton = $('#auditButton')
    let aposButton = $('#aposButton')
    let okAlert = $('#okAlert')
    let errAlert = $('#errAlert')
    let warnAlert = $('#warnAlert')
    let auditTitle = $('#auditForm > h1')
    let textGroupAudit = $('#textGroupAudit')
    let fileGroupAudit = $('#fileGroupAudit')
    let apostTitle = $('#aposForm > h1')
    let progress = $('#progress')
    let aposForm = $('#aposForm')
    let auditForm = $('#auditForm')
    textGroup.hide()
    fileGroup.hide()
    auditButton.hide()
    aposButton.hide()
    okAlert.hide()
    errAlert.hide()
    warnAlert.hide()
    tagGroup.hide()
    codeGroup.hide()
    auditTitle.hide()
    textGroupAudit.hide()
    fileGroupAudit.hide()
    apostTitle.hide()
    progress.hide()
    $('input[type=radio][name=tipo]').change(function () {
        textGroup.hide()
        fileGroup.hide()
        textGroupAudit.hide()
        fileGroupAudit.hide()
        okAlert.hide()
        errAlert.hide()
        warnAlert.hide()
        if (this.value == 0) {
            textGroup.show()
            textGroupAudit.show()
            operationType = 0
        }
        else if (this.value == 1) {
            fileGroup.show()
            fileGroupAudit.show()
            operationType = 1
        }
        tagGroup.show()
        codeGroup.show()
        auditButton.show()
        auditTitle.show()
        aposButton.show()
        apostTitle.show()
    });
    aposForm.submit(function (event) {
        okAlert.hide()
        errAlert.hide()
        event.preventDefault()
        progress.show()
        var type
        var cabeceras
        var data
        var additionalConfig
        if (operationType == 0) {
            type = 'create'
            cabeceras = function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            }
            data = JSON.stringify({
                contentText: textGroup.children('textarea').val().trim()
            })
            additionalConfig = { dataType: "json" }
        } else {
            type = 'file'
            cabeceras = function (xhrObj) {
                xhrObj.setRequestHeader("Accept", "application/json");
            }
            var fd = new FormData(aposForm[0]);
            data = fd
            additionalConfig = { contentType: false }
        }
        $.ajax({
            beforeSend: cabeceras,
            type: "PUT",
            url: host + '/apostille/' + type + '?tag=' + tagGroup.children('input').val().trim(),
            processData: false,
            cache: false,
            data: data,
            ...additionalConfig
        }).done(
            function (data) {
                textGroup.children('textarea').val('')
                okAlert.html("Se ha realizado el apostilleo con exito tu codigo es: " + data.transactionHash.data)
                okAlert.show()
            }).fail(function (error) {
                errAlert.show()
            })
            .always(function () {
                progress.hide()
            });
    });
    auditForm.submit(function (event) {
        okAlert.hide()
        errAlert.hide()
        event.preventDefault()
        progress.show()
        var type
        var cabeceras
        var data
        var additionalConfig
        if (operationType == 0) {
            type = 'text'
            cabeceras = function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Accept", "application/json");
            }
            data = JSON.stringify({
                contentText: textGroupAudit.children('textarea').val().trim()
            })
            additionalConfig = { dataType: "json" }
        } else {
            type = 'file'
            cabeceras = function (xhrObj) {
                xhrObj.setRequestHeader("Accept", "application/json");
            }
            var fd = new FormData(auditForm[0]);
            data = fd
            additionalConfig = { contentType: false }
        }
        $.ajax({
            beforeSend: cabeceras,
            type: "PUT",
            url: host + '/audit/' + type + '/' + codeGroup.children('input').val().trim(),
            processData: false,
            cache: false,
            data: data,
            ...additionalConfig
        }).done(
            function (data) {
                textGroupAudit.children('textarea').val('')
                codeGroup.children('input').val('')
                okAlert.html("La apostilla es valida")
                okAlert.show()
            }).fail(function (error) {
                errAlert.show()
            })
            .always(function () {
                progress.hide()
            });
    });
})