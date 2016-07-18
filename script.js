var socket = io.connect("/");

$(document).ready(function() {

  //Editor initialization
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/chrome");
  editor.session.setMode("ace/mode/javascript");
  getEditorThemes();
  getSuppotedLanguages();

  //Theme changing
  $('#editorTheme').on('change', function() {
    editor.setTheme(this.value);
    showStatusMsg("Editor Theme Changed: " + this.value);
  });

  //Language Changes
  $('#editorLanguage').on('change', function() {
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
    getAceEditorMode(this.value);
  });

  //Code Submission
  $("#submitCode").click(function() {
    var language = $("#editorLanguage").val();
    var code = editor.getValue().trim();

    if(code && code.length) {
      var data = new FormData();
      data.append("language", language);
      data.append("code", code);

      showStatusMsg("Code submitted. Processing, please wait.");
      //$("#submitCode").addClass("btn-disable");

      $.ajax({
        url: "//localhost:8080/code_checker",
        type: "POST",
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data) {

        },
        error: function(err) {
          console.log(err);
          //showStatusMsg("Error: " + err);
        }
      });
    } else {
      showStatusMsg("Please enter the code before submitting.");
    }

  });

  //Clear the console
  $("#clearConsole").click(function() {
    $("#status pre").empty();
    $("#status pre").append("$ Console clear");
  });

});

function getEditorThemes() {
  //Getting ace themes from ace_themes.json
  $.ajax({
    url: "ace_themes.json",
    type: "GET",
    success: function(data) {
      setEditorThemes(data);
    },
    error: function(error) {
      showStatusMsg("Error in getting editor themes. Please refresh the page, or check your internet connection.");
    }
  });
}

function setEditorThemes(data) {
  for(key in data) {
    $("#editorTheme").append('<optgroup id="' + key + 'Theme" label="' + key + '"></optgroup>');
    for(secondKey in data[key]) {
      $("#"+key+"Theme").append('<option value="' + data[key][secondKey] + '">' + secondKey + '</option>');
    }
  }
  showStatusMsg("Setting editor themes.");
}

function getSuppotedLanguages() {
  //Getting supported languages by HackerRank api
  $.ajax({
    url: "//localhost:8080/supported_languages",
    type: "GET",
    success: function(data) {
      setSupportedLanguages(data);
    },
    error: function(error) {
      showStatusMsg("Error in getting supported languages. Please refresh the page, or check your internet connection.")
    }
  });
}

function setSupportedLanguages(data) {
  var data = data.languages;
  console.log(data);
  for(key in data) {
    if(key === "names") {
      for(secondKey in data[key]) {
        var lang = data[key][secondKey];
        var langCode = data["codes"][secondKey];
        $("#editorLanguage").append('<option value="' + langCode + '">' + lang + '</option>');
      }
    }
  }
  showStatusMsg("Setting editor supported languages.");
}

function getAceEditorMode(mode) {
  $.ajax({
    url: "ace_modes.json",
    type: "GET",
    success: function(data) {
      var newMode = "";      
      setEditorMode(newMode);
    },
    error: function(error) {
      showStatusMsg("Error in getting editor themes. Please refresh the page, or check your internet connection.");
    }
  });
}

function setAceEditorMode(mode) {
  editor.session.setMode("ace/mode/" + mode);
  showStatusMsg("Language Changed: " + mode);
}

function showStatusMsg(msg) {
  //Show status message
  $("#status pre").append("\n$ " + msg);
}
