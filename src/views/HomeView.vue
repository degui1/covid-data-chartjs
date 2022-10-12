<template>
  <div class="home">
    <div style="max-height:100px">
      <Bar 
        :chartData = "dataCollection"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import covidApi from '@/library/covidApi'
import Bar from "@/components/lineChart.vue"
export default {
  name: 'HomeView',
  components: {
    Bar
  },
  data() {
    return {
      covidData: '',
      dataCollection: {},
      amount: [],
      labels: [],
    }
  },
  async mounted() {
    this.covidData = await covidApi.allData.getAll()
    this.preparingData()
  },
  methods: {
    preparingData(){
      this.amount = []
      this.labels = []
      for (let a = 0; a < this.covidData.data.length; a++) {
        const element = this.covidData.data[a];
        this.amount.push(element ? element.cases : '')
        this.labels.push(element ? element.state : '')
      }
      this.setDataOfGraphic();
    },
    setDataOfGraphic() {
      var chartData = {
        labels: [],
        datasets: [
          {
            label: ["States"],
            borderColor: "transparent",
            borderWidth: 0,
            backgroundColor: '#42b983',
            data: [],
            inflateAmount: "auto",
          },
        ]
      }

      for (let a = 0; a < this.labels.length; a++) {
        const state = this.labels[a]
        chartData.labels.push(state)
      }

      for (let a = 0; a < this.amount.length; a++) {
        const cases = this.amount[a]
        chartData.datasets[0].data.push(cases)
      }

      this.dataCollection = chartData;

    }
  } 
}
</script>
