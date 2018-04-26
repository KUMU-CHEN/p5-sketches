function saveGrid()
{
  var jsonData = JSON.stringify(cellGrid.grid);
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
  var element = document.createElement('a');
  element.setAttribute("href", dataStr);
  element.setAttribute('download', "cellGrid.json");
  element.click();
  document.body.removeChild(element);
}

// document.getElementById('import').onclick = function() {
//     var files = document.getElementById('selectFiles').files;
//   console.log(files);
//   if (files.length <= 0) {
//     return false;
//   }
//
//   var fr = new FileReader();
//
//   fr.onload = function(e) {
//   console.log(e);
//     var result = JSON.parse(e.target.result);
//     var formatted = JSON.stringify(result, null, 2);
//         document.getElementById('result').value = formatted;
//   }
//
//   fr.readAsText(files.item(0));
// };

// $('#exampleModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// });

function loadJSONFile() {
  console.log("loadbutton clicked");
  
  var files = document.getElementById('selectFiles').files;
  if (files.length <= 0) {
    return false;
  }
  var file = files[0];
  console.log(files);
  var fr = new FileReader();
  var jsonObject;
  fr.onload = (function(theFile) {
    return function(e) {
      // Render thumbnail.
      
      jsonObject = JSON.parse(e.target.result);
     
    };
  })(file);

  console.log("parse complete, " + jsonObject);
}

$(document).on('change', 'loadJSONButton', function(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var jsonObj = JSON.parse(event.target.result);
    alert(jsonObj.name);
  }

  reader.readAsText(event.target.files[0]);
});
