/* eslint-disable */
import Swal from 'sweetalert2'; // Import the Swal library

function TableToExcel(table: any, worksheet?: string) {
   const uri = 'data:application/vnd.ms-excel;base64,'
     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>'
     , base64 = function(s: string) { return window.btoa(unescape(encodeURIComponent(s))) }
     , format = function(s: string, c: any) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
     
  if (!table.nodeType) {
     table = document.getElementById(table)!.querySelectorAll('div')[0];
  }

  const ctx = {worksheet: worksheet || 'Resultado', table: table.innerHTML};

  return window.location.href = uri + base64(format(template, ctx));
}

// function TratarErroApi(error) {
//    if (!error.response) {
//      return Swal.fire("Aviso", "Não foi possível acessar a API", "error");
//     } else if (error.response.status == 403) {
//       return Swal.fire("Aviso", error.response.data.message, "warning" );
//     } else {
//       return Swal.fire("Aviso",  error.response.data, error.response.status == 400 ? "warning" : "error");
//     }
// }

// function TableToExcel2(table: any, sizecols: any){
//       if (!table.nodeType) {
//          table = document.getElementById(table)!.querySelectorAll('div')[0];
//       }
     

//       var data:any = [];
//       var headers:any = [];
//       let child = table.getElementsByTagName('tr');

//       let th:any = child[0].children;
      
//       for(var d = 0; d < th.length; d ++){
//          headers.push(th[d].textContent);
//       }; 


//       for(var i=1; i < child.length; i++){
//          // th = headers// td == dados// tr = linhas
//          var td = child[i].children;
//          let innerJSON = {};

//          for(var j = 0; j < td.length; j++){
//             innerJSON[th[j].textContent] = td[j].textContent;   
//          }
//          data.push(innerJSON);                    
//        }
       
      
//          /* Gera o Excel*/
//          const XLSX = require("xlsx");
//          const worksheet = XLSX.utils.json_to_sheet(data);
//          const workbook = XLSX.utils.book_new();
//          XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" })
//          let cols:any = [];

//          for(let i = 0; i < sizecols.tamanhos.length; i++ ){
//             cols.push({wch: sizecols.tamanhos[i]})
//          }
//          worksheet["!cols"] = cols;
//          XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
//          XLSX.writeFile(workbook, "download.xls");   
// }

// function FormatarNumeroTelefone(telefone) {
//    telefone = telefone.replace("-", "");
//    telefone = telefone.replace("(", "");
//    telefone = telefone.replace(")", "");
//    telefone = telefone.replace(" ", "");
//    telefone = telefone.trim();

//    return telefone;
// }

function MoedaFormatada(n: any,c: any,d: any,t: any,s: any,j: any,i: any,moneySign: any) {
   (c = isNaN((c = Math.abs(c))) ? 2 : c),
     (d = d == undefined ? "," : d),
     (t = t == undefined ? "." : t),
     (s = n < 0 ? "-" : ""),
     (i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + ""),
     (j = (j = i.length) > 3 ? j % 3 : 0);
       return (" R$ " + s + (j ? i.substr(0, j) + t : "") +
     i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
     (c ? d + Math.abs(n - i).toFixed(c).slice(2): ""));
} 
 
// function SituacaoColor(item) {
//    if((item.agrupadorId > 0) || (item.receita ? item.receita.agrupadorId > 0 :0))
//    return "deep-purple lighten-3";
//    else if(item.isAgrupador == true) 
//    return "deep-purple";
//    else if(item.situacaoId == 3)
//    return "teal lighten-1";
//    else if(item.situacaoId == 2)
//    return "grey lighten-1";
//    else if(item.situacaoId == 4)
//    return "lime lighten-3";
//    else if ((new Date((item.dataVencimento)).yyyymmdd() < (new Date()).yyyymmdd())  && (new Date( (item.dataVencimentoParcela)).yyyymmdd() < (new Date()).yyyymmdd()))
//    return "red lighten-3";
//    else if(item.situacaoId == 1)
//    return "blue lighten-3";
//  }  

//  function SituacaoColorContrato(item){
//    if(item.situacaoId == 1) //disponivel 
//    return "#E9C46A"; 

//    else if(item.situacaoId == 2) // indisponivel 
//    return "#264653";

//    else if(item.situacaoId == 3) // vendido 
//    return "#2A9D8F";

//    else if(item.situacaoId == 4) //reservado 
//    return "#E76F51";

//    else if(item.situacaoId == 5) //invadio 
//    return "#7b2cbf";

//    else if(item.situacaoId == 6) // penhorado 
//    return "#219ebc";
//  }
 
function JSONToCSVConvertor(JSONData: JSON, ReportTitle: string, ShowLabel: boolean) {
   
   let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

   let CSV = ''; 

   //CSV += ReportTitle + '\r\n\n';

   if (ShowLabel) {
      let row = "";

       for (let index in arrData[0]) {

           row += index + ';';
       }

       row = row.slice(0, -1);

       CSV += row + '\r\n';
   }

   //1st loop is to extract each row
   for (let i = 0; i < arrData.length; i++) {
       let row = ""

       //2nd loop will extract each column and convert it in string comma-seprated
       for (let index in arrData[i]) {
         row += arrData[i][index] + ';';
       }

       row.slice(0, row.length - 1);

       CSV += row + '\r\n';
   }

   if (CSV == '') {
       alert("Invalid data");
       return;
   }

   var fileName = "Excel_";

   fileName += ReportTitle.replace(/ /g,"_");

   //csv or xls
   var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

   var link = document.createElement("a")
   link.href = uri;

   
   //link.style = "visibility:hidden";
   link.download = fileName + ".csv";

   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

function TrataDateTime(data: String) : string {
   return data.replace(/-/g, '\/').replace('T',' ');
}

function AnoMesDia(data: Date): string {
   const mm = data.getMonth() + 1;
   const dd = data.getDate();

   return isNaN(mm) ? '' : [data.getFullYear(),
           (mm>9 ? '' : '0') + mm,
           (dd>9 ? '' : '0') + dd
           ].join('-')
}

function DiaMesAno(data: Date): string {
   const mm = data.getMonth() + 1;
   const dd = data.getDate()
   
   return isNaN(mm) ? '' : [(dd>9 ? '' : '0') + dd,
           (mm>9 ? '' : '0') + mm,
           data.getFullYear()
           ].join('/')
}

function DiaMesAnoHora(data: Date) {
   const mm = data.getMonth() + 1;
   const dd = data.getDate();
   
   const novaData = isNaN(mm) ? '' : [(dd>9 ? '' : '0') + dd,
           (mm>9 ? '' : '0') + mm,
           data.getFullYear()
           ].join('/');

   const novaHora = data.toLocaleTimeString().substring(0, 5);

   return `${novaData} ${novaHora}`
}

//SituacaoColorContrato, SituacaoColor, TratarErroApi, TableToExcel2, FormatarNumeroTelefone

export { MoedaFormatada,TableToExcel, TrataDateTime, AnoMesDia, DiaMesAno, DiaMesAnoHora, JSONToCSVConvertor }

