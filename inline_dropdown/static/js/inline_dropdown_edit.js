/* Javascript for Inline Dropdown XBlock. */
function InlineDropdownXBlockInitEdit(runtime, element) {
 
    var xmlEditorTextarea = $('.block-xml-editor', element);
      xmlEditor = CodeMirror.fromTextArea(xmlEditorTextarea[0], { mode: 'xml', lineWrapping: true });
 
    $(element).find('.action-cancel').bind('click', function() {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function() {
        var data = {
            'display_name': $('#inline_dropdown_edit_display_name').val(),
            'title': $('#inline_dropdown_edit_title').val(),
            'weight': $('#inline_dropdown_edit_weight').val(),
            'max_attempts': $('#inline_dropdown_edit_max_attempts').val(),
            'show_answer_number_attempts': $('#fillinblank_edit_show_answer_number_attempts').val(),
            'show_answer': $('#inline_dropdown_edit_show_answer option:selected').val(),
            'randomization':$('#inline_dropdown_edit_randomization option:selected').val(),
            'show_reset_button':$('#inline_dropdown_edit_show_reset_button option:selected').val(),
            'case_sensitive':$('#inline_dropdown_edit_case_sensitive option:selected').val(),
            'data': xmlEditor.getValue()
        };
        
        runtime.notify('save', {state: 'start'});
        
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
            if (response.result === 'success') {
                runtime.notify('save', {state: 'end'});
                //Reload the page
                //window.location.reload(false);
            } else {
                runtime.notify('error', {msg: response.message})
            }
        });
    });
}

