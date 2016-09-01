var Vue = require('vue');
var $ = require('jquery');
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

Vue.component('chart', {
  props: ['type', 'dataSet'],
  template: '<div class="chart-el"></div>',
  ready: function(){
    var len = $('.chart-el').length - 1;
    var chartEl = $('.chart .chart-el:eq(' + len + ')');
    var id = 'el' + len;
    chartEl.attr('id', id);
    chart = new Highcharts.Chart({
              chart: {
                  type: this.type,
                  renderTo: id
              },
              title: {
                  text: 'Points Scored'
              },
              xAxis: {
                  categories: ['Team1', 'Team2', 'Team3', 'Team4']
              },
              yAxis: {
                  title: {
                      text: 'Fruit eaten'
                  }
              },
              series: this.dataSet
          });
  }
});

var chartTypes = new Vue({
  el: '.content',
  data: {
    charts: [],
    showChart: false,
    chartType: "",
    chartData: [],
    choosenType: 'Chart type',
    selected: {},
    types: [
      { name: 'Pie', type: 'pie', data: [{ name: 'Period1', data: [24, 33, 9, 38] }, { name: 'Period2', data: [87, 24, 37, 68] }] },
      { name: 'Bar', type: 'bar', data: [{ name: 'Period1', data: [24, 33, 9, 38] }, { name: 'Period2', data: [87, 24, 37, 68] }]  },
      { name: 'Line', type: 'line', data: [{ name: 'Period1', data: [24, 33, 9, 38] }, { name: 'Period2', data: [87, 24, 37, 68] }]  }
    ]
  },
  methods: {
    chooseType: function(index) {
      this.choosenType = this.types[index].name;
      this.selected = this.types[index];
    },
    insertChart: function() {
      this.chartType = this.selected.type;
      this.chartData = this.selected.data;
      if(this.charts.indexOf(this.selected) == -1) {
        this.charts.push(this.selected);
      }
    }
  }
});

$(document).ready(function() {
  $(".lang button").on("click", function() {
    if($(".lang button").hasClass("lang-button-choose")){
      $(".lang button").removeClass("lang-button-choose");
    }
    var index = $(this).index(".lang button");
    $(".lang button").eq(index).addClass("lang-button-choose");
  });

  $(".dropdown").on("click", "li", function() {
    $(".dropdown").hide();
  });

  $(".dropdown-toggle").on("mouseover", function() {
    $(".dropdown").show();
  });
});
