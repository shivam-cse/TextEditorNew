
let showingSourceCode = false;


function makeEditableMode() {
    textField.document.designMode = 'On';
}


function execCmd(cmd) {
    textField.document.execCommand(cmd, false, null);
}


function execCmdWithArg(cmd, arg) {
    textField.document.execCommand(cmd, false, arg);
}



function toggleSourceCode() {
    console.log("source code");
    if (showingSourceCode) {
        textField.document.getElementsByTagName('body')[0].innerHTML = textField.document.getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    }
    else {
        textField.document.getElementsByTagName('body')[0].textContent = textField.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCode = true;
    }
}



function execCmdForImageUpload(event, imageSize) {
    
    let image = document.getElementById('image');
    let  imageName = image.value;
    let extentionDot = imageName.lastIndexOf(".") + 1;
    let extentionName = imageName.substr(extentionDot, image.length).toLowerCase();

    const ext = ["jpg", "png", "jpeg"] //We can add more image formate in the array.
     if(ext.indexOf(extentionName) != -1){
         path = URL.createObjectURL(event.target.files[0]);
         let html = `<img class="myImg" src="${path}" style="width: ${imageSize}px;">`
         let cmd = 'insertHTML';
         textField.document.execCommand(cmd, false, html);
     }
     else
     alert("Please select image formate only !");
}



function uploadImage() {
    document.getElementById('image').click();
}


// upload the file 
function execCmdForFileUpload(event){
    let fileName = document.getElementById('fileUpload').value;
    fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
    console.log(event.target.files[0]);
    
    let path = URL.createObjectURL(event.target.files[0]);
    console.log(path);

    let html = `<embed src="${path}" type="application/pdf" width="100%" height="600px"></embed>`
  
    console.log("hello")
    console.log(html);
    // var html = `<a id = "fileUpload2" href="${path}">${fileName}</a>`;
    let cmd = 'insertHTML';
    textField.document.execCommand(cmd, false, html);

}

function getIframeContent() {
    var frameObj =  document.getElementById('textField');
    var frameContent = frameObj.contentWindow.document.body.innerHTML;
    let doc = new jsPDF();
    html2pdf().from(frameContent).save();
}


//table
let createTable = document.getElementById('createTable');
createTable.addEventListener('click', function () {
    let getrow = document.getElementById('getRow');
    let getColumns = document.getElementById('getColumns');

    let rn = parseInt(getrow.value, 10);
    let cn = parseInt(getColumns.value, 10);

    let html = `<table style="width:70%; border: 2px solid rebeccapurple; text-align: center; margin:auto;"> `;
    let inside = "";
    for (let i = 0; i < rn; i++) {
        // style="border: 2px solid rgb(168, 168, 168);"
        inside += '<tr >';
        for (let j = 0; j < cn; j++) {
            if (i === 0) {
                inside += `<th style="border: 2px solid rgb(168, 168, 168);">Table heading</th>`;
            }
            else
                inside += `<td style="border: 2px solid rgb(168, 168, 168);">Table data</td>`;
        }
        inside += `</tr>`;
    }

    inside = html + inside + `</table>`;
    textField.document.execCommand("insertHTML", false, inside);
    // console.log("Finally : " + textField);

})



///save data button
document.getElementById('saveData').addEventListener('click', ()=>{
    var frameObj =  document.getElementById('textField');
    var frameContent = frameObj.contentWindow.document.body.innerHTML;
    console.log(frameContent);

    let html = `<div> ${frameContent} </div>`
    document.getElementById('addSaveData').innerHTML = html;

})