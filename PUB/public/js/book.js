// function valid() {
//     $("#StartDate, #EndDate").datepicker();

//     $("#EndDate").change(function () {
//       var startDate = document.getElementById("StartDate").value;
//       var endDate = document.getElementById("EndDate").value;

//       if ((Date.parse(endDate) <= Date.parse(startDate))) {
//         alert("End date should be greater than Start date");
//         document.getElementById("EndDate").value = "";
//       }
//     });
//   }

// function valid(){
//   let a = document.getElementById('dd');
//   let b = document.getElementById('ad');
//   console.log("called");
//   if((Date.parse(b))<(Date.parse(a))){
//     console.log("invalid date");
//   } else{
//     console.log(a,b);
//   }
// }



var todayDate = new Date();
var month = todayDate.getMonth() + 1;
var year = todayDate.getUTCFullYear() - 0;
var tdate = todayDate.getDate();
if (month < 10) {
    month = "0" + month;
}
if (tdate < 10) {
    tdate = "0" + tdate;
}
var maxDate = year + "-" + month + "-" + tdate;
document.getElementById("dd").setAttribute("min", maxDate);


// function valid(){
//     var x = document.getElementById('dd').value;
//     console.log(x);
//     var y = document.getElementById('ad').value;
//     if ((Date.parse(y))<(Date.parse(x))){
//         alert("Please select correct Arrival date");
//     }
// }

// var prevDate = x + "-" + y + "-" + z;
// document.getElementById("ad").setAttribute("min", prevDate);

