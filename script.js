var socket = io.connect("/");

$(document).ready(function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/chrome");
  editor.session.setMode("ace/mode/javascript");

  $('#editorTheme').on('change', function() {
    editor.setTheme(this.value);
  });

  $('#editorLanguage').on('change', function() {
    var selectedLanguage = '';
    switch(this.value) {
      case "1": selectedLanguage = "c_cpp"; break;
      case "2": selectedLanguage = "c_cpp"; break;
      case "9": selectedLanguage = "csharp"; break;
      case "3": selectedLanguage = "java"; break;
      case "20": selectedLanguage = "javascript"; break;
      case "7": selectedLanguage = "php"; break;
      case "5": selectedLanguage = "python"; break;
      case "30": selectedLanguage = "python"; break;
      case "51": selectedLanguage = "swift"; break;
    }
    editor.session.setMode("ace/mode/" + selectedLanguage);
  });

  $("#submitCode").click(function() {
    var language = $("#editorLanguage").val();
    var code = editor.getValue();

    var data = new FormData();
    data.append("language", language);
    data.append("code", code);

    $.ajax({
      url: "//localhost:8080/code_checker",
      type: "POST",
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: function() {

      },
      error: function() {

      }
    });
  });

});
