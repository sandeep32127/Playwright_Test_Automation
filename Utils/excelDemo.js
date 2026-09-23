const ExcelJs = require('exceljs');

async function getExcel(){
const workbook = new ExcelJs.Workbook();
let output = {};
await workbook.xlsx.readFile('C:/Users/Papu/Downloads/download.xlsx')
const workSheet = workbook.getWorksheet('Sheet1');

workSheet.eachRow((row, rowNumber) => {

    row.eachCell((cell, columnNumb) => {
        //console.log(cell.value)

        if(cell.value === 'Banana'){
            output.row = rowNumber;
            output.column = columnNumb;
            console.log(rowNumber , columnNumb);
        }
    })
});
const cell = workSheet.getCell(output.row,output.column);
cell.value= 'Samsung';
await workbook.xlsx.writeFile('C:/Users/Papu/Downloads/download.xlsx');
}

getExcel();

