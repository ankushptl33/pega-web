import dataformat from '../json/DataFormatExport.json';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    callback(this.responseText);
  };
  xhr.open('GET', url, true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}

export function getSearchMapping(result) {
  var temp = [];
  for (var key in result) {
    var obj = {};
    obj.title = result[key].ListName;
    obj.description = result[key].ServiceProviderUid;
    temp.push(obj);
  }
  return temp;
}

export function getLabelOfObject(arrayOfObj, label) {
  var objeLength = 0;
  if (arrayOfObj instanceof Array) {
    objeLength = arrayOfObj.length;
  } else {
    objeLength = Object.keys(arrayOfObj).length;
  }
  if (objeLength > 0) {
    for (var i in arrayOfObj) {
      // if (objeLength == 0) {
      //   return 'hello';
      // }
      if ('object' == typeof arrayOfObj[i]) {
        // console.log(('### type of object ###', arrayOfObj[i]);
        label++;
        getLabelOfObject(arrayOfObj[i], label);
      }

      // objeLength--;
      // if (arrayOfObj[i] instanceof Array && arrayOfObj[i].length > 0) {
      //   // console.log(('Array object = ', arrayOfObj[i]);
      //   label++;
      // }
      // getLabelOfObject(arrayOfObj[i]);
    }
  }
  //}
  //// console.log(('Label', label);
  return label;
}

export function pdf() {
  var doc = new jsPDF('l', 'pt', 'a2');

  var employee = dataformat;

  //var img = employee.logo;
  // var row = props.labels;
  let arrOfKeys = Object.keys(dataformat);

  let arrOfValues = Object.values(dataformat);

  let a = arrOfKeys.join('","');
  a = [a];

  let string = '';
  let column = '';
  let row = '';

  arrOfKeys.map((key, j) => {
    string += `${key}:${employee[key]}`;
  });
  // this.props.listExportProp.data.map((employee, i)=>
  // var offsetY = 4.797777777777778;
  // var lineHeight = 6.49111111111111;
  var fontSize = 10;
  doc.setFontSize(fontSize);

  // doc.text(10, 10 + lineHeight * 0 + offsetY,
  //   string
  // );''
  //   if(arrOfKeys==='logo'){
  //   doc.addImage(img,'jpg',30, 2, 25, 30);
  //  }
  // let temp=[]
  // temp.push(employee);
  var images = [];
  var i = 0;

  doc.autoTable(arrOfKeys, [arrOfValues], {
    styles: {
      overflow: 'linebreak',
      columnWidth: 'wrap',
      rowHeight: 11,
      columnStyles: { text: { columnWidth: 'auto' } },
    },
    theme: 'grid',
    //  drawCell: function(cell, opts) {
    //   if (opts.column.dataKey === 1  ) {
    //     images.push({
    //       url:img,
    //       x: cell.textPos.x,
    //       y: cell.textPos.y
    //     });
    //     i++;
    //   }
    // },

    // addPageContent: function() {
    //   for (var i = 0; i < images.length; i++) {
    //     doc.addImage(images[i].url, images[i].x, images[i].y, 20, 20);
    //   }}
  });

  doc.save('Listexport.pdf');
}

export function exl() {
  var xlsx = '\n';
  var data = [dataformat];
  // data.forEach(function(row) {
  //        csv += row.id;
  //         csv += "\n";
  // });

  let arrOfKeys = Object.keys(dataformat);
  let arrOfValues = Object.values(dataformat);
  let arrOfEntries = Object.entries(dataformat);
  arrOfKeys.map((key, j) => {
    xlsx += `${key}'\t'`;
  });
  xlsx += '\n';
  arrOfValues.map((key, j) => {
    xlsx += `${key}'\t'`;
  });

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/xlsx;charset=utf-8,' + encodeURI(xlsx);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'Listcard.xlsx';
  hiddenElement.click();
}

export function csv() {
  var csv = '\n';
  var data = [dataformat];
  // data.forEach(function(row) {
  //        csv += row.id;
  //         csv += "\n";
  // });

  let arrOfKeys = Object.keys(dataformat);
  let arrOfValues = Object.values(dataformat);
  let arrOfEntries = Object.entries(dataformat);
  arrOfKeys.map((key, j) => {
    csv += `${key},`;
  });
  csv += '\n';
  arrOfValues.map((key, j) => {
    csv += `${key},`;
  });

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'ListCard.csv';
  hiddenElement.click();
}
