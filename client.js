//jshint esversion:8

var total_cases_data = [];
var total_death_data = [];
url ="https://vast-harbor-13308.herokuapp.com/case_data";

fetch(url)
.then((resp) => resp.json())
.then((data) => {
  total_cases_data = data.slice(0,6);
  total_death_data = data.slice(6,12);
})
.then(function() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['USA', 'Italy', 'Spain', 'China', 'India', 'Pakistan'],
        datasets: [{
            label: 'Total Cases',

            backgroundColor: [
              'rgba(0, 154, 0, 0.6)',
              'rgba(0, 0, 0, 0.6)',
              'rgba(132, 35, 115, 0.6)',
              'rgba(255, 0, 0, 0.6)',
              'rgba(7, 1, 162, 0.6)',
              'rgba(241, 100, 61, 0.6)'
            ],
            borderColor: 'rgb(0,0,0)',
            data: total_cases_data
        }]
  },

    options: {
    events: false,
    tooltips: {
        enabled: false
    },
    hover: {
    },scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            display: true
          }
        }],
        yAxes: [{
          gridLines: {
            drawBorder: false
          },
          ticks: {
              maxTicksLimit: 5,
              padding: 10,
            }
        }]
      },
    animation: {
        duration: 1000,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    }
}
});
var ctx2 = document.getElementById('myChart2').getContext('2d');
var chart2 = new Chart(ctx2, {
  type: 'line',
  data: {
      labels: ['USA', 'Italy', 'Spain', 'China', 'India', 'Pakistan'],
      datasets: [{
          label: 'Total Deaths',
          backgroundColor:'rgb(0, 0, 0)',
          borderColor: 'rgba(0,0,0,0.6)',
          data: total_death_data,
          pointRadius: 2,
          fill: false,
          lineTension: 0,
          borderWidth: 1
      }]
  },

  options: {
  events: false,
  tooltips: {
      enabled: false
  },
  scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          display: true
        }
      }],
      yAxes: [{
        gridLines: {
          drawBorder: false
        },
        ticks: {
            maxTicksLimit: 5,
            padding: 10,
          }
      }]
    },
  hover: {
  },
  animation: {
      duration: 1000,
      onComplete: function () {
          var chartInstance = this.chart,
              ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
  }
}
});
})
.catch(function(err) {
    console.log(err);
});

function resources() {
  document.location.href="/resources";
}
opt = {
  responsive: false,
  legend: {
    display: false
  },
  elements: {
    line: {
      tension: 0.0
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        display: false
      }
    }],
    yAxes: [{
      gridLines: {
        drawBorder: false
      },
      ticks: {
          maxTicksLimit: 5,
          padding: 15,
        }
    }]
  }
};






mhChart();
dlChart();
tnChart();
wbChart();
klChart();
rjChart();
mpChart();
tgChart();
gjChart();
upChart();
apChart();
jkChart();
kaChart();
hrChart();
brChart();

//mh chart
function mhChart()
{
const cases = [];
const dates = [];
const death = [];
var de = 0;
var total = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].mh);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].mh);
    death.push(de);
  }
  document.getElementById("mhcon").innerHTML=total;
    document.getElementById("mhpercentage").innerHTML= de +" of total deaths";
}
}).then(function() {
  var ct = document.getElementById('mhchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}
//end of mh chart
//delhi chart
function dlChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].dl);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].dl);
    death.push(de);
  }
  document.getElementById("dlcon").innerHTML=total;
  document.getElementById("dlpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('dlchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


//tnchart
function tnChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].tn);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].tn);
    death.push(de);
  }
  document.getElementById("tncon").innerHTML=total;
  document.getElementById("tnpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('tnchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}

function wbChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].wb);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].wb);
    death.push(de);
  }
  document.getElementById("wbcon").innerHTML=total;
  document.getElementById("wbpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('wbchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}

function klChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].kl);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].kl);
    death.push(de);
  }
  document.getElementById("klcon").innerHTML=total;
  document.getElementById("klpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('klchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}

function rjChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].rj);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].rj);
    death.push(de);
  }
  document.getElementById("rjcon").innerHTML=total;
  document.getElementById("rjpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('rjchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function mpChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].mp);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].mp);
    death.push(de);
  }
  document.getElementById("mpcon").innerHTML=total;
  document.getElementById("mppercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('mpchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function tgChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].tg);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].tg);
    death.push(de);
  }
  document.getElementById("tgcon").innerHTML=total;
  document.getElementById("tgpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('tgchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function gjChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].gj);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].gj);
    death.push(de);
  }
  document.getElementById("gjcon").innerHTML=total;
  document.getElementById("gjpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('gjchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}



function upChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].up);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].up);
    death.push(de);
  }
  document.getElementById("upcon").innerHTML=total;
  document.getElementById("uppercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('upchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}



function apChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].ap);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].ap);
    death.push(de);
  }
  document.getElementById("apcon").innerHTML=total;
  document.getElementById("appercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('apchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function jkChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].jk);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].jk);
    death.push(de);
  }
  document.getElementById("jkcon").innerHTML=total;
  document.getElementById("jkpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('jkchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function kaChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].ka);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].ka);
    death.push(de);
  }
  document.getElementById("kacon").innerHTML=total;
  document.getElementById("kapercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('kachart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function hrChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].hr);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].hr);
    death.push(de);
  }
  document.getElementById("hrcon").innerHTML=total;
  document.getElementById("hrpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('hrchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}


function brChart()
{
const cases = [];
const dates = [];
var total = 0;
const death = [];
var de = 0;
fetch("https://api.covid19india.org/states_daily.json")
.then((resp) => resp.json())
.then(function(data) {
for(var i=0;i<data.states_daily.length;i++)
{
  if(data.states_daily[i].status=="Confirmed")
  {
    date = data.states_daily[i].date;
    var month = date.slice(3,6);
    var da = date.slice(0,2);
    date = month + " " + da;
    dates.push(date);
    var sta = "";
    total+=Number(data.states_daily[i].br);
    cases.push(total);
  }
  else if(data.states_daily[i].status=="Deceased")
  {
    de+=Number(data.states_daily[i].br);
    death.push(de);
  }
  document.getElementById("brcon").innerHTML=total;
  document.getElementById("brpercentage").innerHTML=de +" of total deaths";

}
}).then(function() {
  var ct = document.getElementById('brchart').getContext('2d');
  var chart2 = new Chart(ct, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Confirmed',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: cases,
              pointRadius: 1,
  					  fill: false,
  					  lineTension: 0,
  					  borderWidth: 3
          }]
      },

      options: opt
  });
})
.catch(function(err) {
    console.log(err);
});
}



function mh()
{
  document.location.href="/state?code=mh";
}
function dl()
{
  document.location.href="/state?code=dl";
}
function tn()
{
  document.location.href="/state?code=tn";
}
function wb()
{
  document.location.href="/state?code=wb";
}
function kl()
{
  document.location.href="/state?code=kl";
}
function rj()
{
  document.location.href="/state?code=rj";
}
function mp()
{
  document.location.href="/state?code=mp";
}
function tg()
{
  document.location.href="/state?code=tg";
}
function gj()
{
  document.location.href="/state?code=gj";
}
function up()
{
  document.location.href="/state?code=up";
}
function ap()
{
  document.location.href="/state?code=ap";
}
function jk()
{
  document.location.href="/state?code=jk";
}
function ka()
{
  document.location.href="/state?code=ka";
}
function hr()
{
  document.location.href="/state?code=hr";
}
function br()
{
  document.location.href="/state?code=br";
}
