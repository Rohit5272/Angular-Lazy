import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SellerService } from 'src/app/services/seller.service';
import { order } from 'src/app/shared/model/data-type';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{

  // Initialize separate variables to store counts
  accessoriesCount: number = 0;
  menCount: number = 0;
  womenCount: number = 0;
  mobilesCount: number = 0;
  watchesCount: number = 0;
  chart : Chart | undefined
  sell:any[] = [];
  monthlySales: number[] = new Array(12).fill(0);
  chart1: Chart | undefined;
  sellerName:string='';
  
  constructor(private _sellerService:SellerService) {}
  
  ngOnInit(): void {
    this._sellerService.getOrders().subscribe((result: any) => {
      console.log(result);
      result.forEach((element: any) => {
        element.products.forEach((data: any) => {
          // console.log(data.orderDate);
          let seller = sessionStorage.getItem('seller');
          let sellId = seller && JSON.parse(seller).id;
          let sellname = seller && JSON.parse(seller).name;
          this.sellerName = sellname

          if(data.sellerId === sellId) {
            this.sell.push(data);
            const orderDate = new Date(data.orderDate);
            const month = orderDate.getMonth();
            // console.log(month);
            this.monthlySales[month]++;
            console.log(this.monthlySales);
          }
          
        });
      });
    })

    
    
    console.log(this.sell);
    setTimeout(() => {
      this.sell.forEach((data) => {
        // console.log(data);
        // Count the occurrences for each category
        if (data.category === 'accesories') {
          this.accessoriesCount++;
        } else if (data.category === 'mobiles') {
          this.mobilesCount++;
        } else if (data.category === 'men') {
          this.menCount++;
        } else if (data.category === 'women') {
          this.womenCount++;
        } else if (data.category === 'watches') {
          this.watchesCount++;
        }
      })
    }, 300);

    setTimeout(() => {
      this.Charts();
      this.generateLineChartSeries();
    }, 500);
  }


  // -----pie chart---------
  Charts(){
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 425
      },
      title: {
        text: 'Category wise sales'
      },
      xAxis: {
        categories: [
          'accesories',
          'men',
          'women',
          'mobiles',
          'watches',
        ]
      },
      yAxis: {
        title: {
          text: 'Revenue in %'
        }
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'accesories',
              y: this.accessoriesCount,
              color: '#044342',
            },
            {
              name: 'men',
              y: this.menCount,
              color: '#7e0505',
            },
            {
              name: 'women',
              y: this.womenCount,
              color: '#ed9e20',
            },
            {
              name: 'mobiles',
              y: this.mobilesCount,
              color: '#6920fb',
            },
            {
              name: 'watches',
              y:this.watchesCount,
              color: '#121212',
            },
          ]
        }
      ],
      credits: {
        enabled: false
      },
      plotOptions : {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            // distance:'-30%'
          }
        }
      }
    })
  }

  // ----------linechart---------
  generateLineChartSeries(){
    this.chart1 = new Chart({
      chart: {
        type: 'line',
        height: 425
      },
      title: {
        text: 'Month wise sales'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      yAxis: {
        title: {
          text: 'Revenue in $'
        }
      },
      series: [
        {
          name: this.sellerName,
          type: 'line',
          color: '#044342',
          data: this.monthlySales
        }
      ],
      credits: {
        enabled: false
      }
    })
  }
  

}
