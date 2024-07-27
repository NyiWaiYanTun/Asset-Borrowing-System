document.querySelector('.nav').classList.toggle('closedNav');
document.querySelector('.content').classList.toggle('closedContent');
var data;
var laptops=0;
var l_status=[0, 0, 0, 0];
var iPads=0;
var i_status=[0, 0, 0, 0];
var books=0;
var b_status=[0, 0, 0, 0];
var electronics=0;
var e_status=[0, 0, 0, 0];
async function getData() {
    const response = await fetch('/dashboard');
    if(response.status==200){
        data= await response.json();
        data.forEach(element => {
            if(element.asset_type=='Laptops'){
                laptops=laptops+element.count;
                switch (element.status) {
                    case 'available':
                        l_status[0]+=element.count;
                      break;
                    case 'waiting for patron':
                        l_status[1]+=element.count;
                      break;
                    case 'borrowed':
                        l_status[2]+=element.count;
                      break;
                    case 'disabled':
                        l_status[3]+=element.count;
                      break;
                  }
            }
            if(element.asset_type=='iPads'){
                iPads=iPads+element.count;
                switch (element.status) {
                    case 'available':
                        i_status[0]+=element.count;
                      break;
                    case 'waiting for patron':
                        i_status[1]+=element.count;
                      break;
                    case 'borrowed':
                        i_status[2]+=element.count;
                      break;
                    case 'disabled':
                        i_status[3]+=element.count;
                      break;
                  }
            }
            if(element.asset_type=='Books'){
                books=books+element.count;
                switch (element.status) {
                    case 'available':
                        b_status[0]+=element.count;
                      break;
                    case 'waiting for patron':
                        b_status[1]+=element.count;
                      break;
                    case 'borrowed':
                        b_status[2]+=element.count;
                      break;
                    case 'disabled':
                        b_status[3]+=element.count;
                      break;
                  }
            }
            if(element.asset_type=='Electronics'){
                electronics=electronics+element.count;
                switch (element.status) {
                    case 'available':
                        e_status[0]+=element.count;
                      break;
                    case 'waiting for patron':
                        e_status[1]+=element.count;
                      break;
                    case 'borrowed':
                        e_status[2]+=element.count;
                      break;
                    case 'disabled':
                        e_status[3]+=element.count;
                      break;
                  }
            }
        });

    }
}
getData().then(() => {

    const barChartData = [
        { asset: 'Laptops', quantity: laptops },
        { asset: 'iPads', quantity: iPads },
        { asset: 'Books', quantity: books },
        { asset: 'Electronics', quantity: electronics }
    ];
    
    // Sample data for pie chart
    const pieChartData = {
        laptops: l_status,
        ipads: i_status,
        books: b_status,
        electronics: e_status
    };
    // Function to create pie chart
    function createPieChart(assetType) {
        let chartData;
    
        if (assetType === 'all') {
            chartData = getPieChartDataForAllAssets();
        } else {
            chartData = pieChartData[assetType];
        }
    
    
        Highcharts.chart('pieChartContainer', {
            chart: {
                type: 'pie'
            },
            title: {
                text: (assetType === 'all') ? 'All Assets Status' : `Asset ${assetType} Status`
            },
            series: [{
                name: 'Status',
                data: [
                    { name: 'Available', y: chartData[0] },
                    { name: 'Waiting', y: chartData[1] },
                    { name: 'Borrowed', y: chartData[2] },
                    { name: 'Disabled', y: chartData[3] }
                ]
            }]
        });
        let total = chartData[0] + chartData[1] + chartData[2] + chartData[3];
        let data = `
                    Total     <br> <input type="text" value=${total} disabled> <br>
                    Available <br> <input type="text" value=${chartData[0]} disabled> <br>
                    Waiting <br>    <input type="text" value=${chartData[1]} disabled>  <br>
                    Borrowed <br>   <input type="text" value=${chartData[2]} disabled>  <br>
                    Disabled <br>  <input type="text" value=${chartData[3]} disabled>  <br>`;
        document.querySelector('#piechartNumbers').innerHTML = data;
    }
    
    // Function to calculate pie chart data for all assets combined
    function getPieChartDataForAllAssets() {
        const allAssetsData = [0, 0, 0, 0];
        for (const assetType in pieChartData) {
            const assetData = pieChartData[assetType];
            for (let i = 0; i < assetData.length; i++) {
                allAssetsData[i] += assetData[i];
            }
        }
        return allAssetsData;
    }
    document.querySelector('#total-laptops').innerHTML="Total: "+laptops;
    document.querySelector('#total-ipads').innerHTML="Total: "+iPads;
    document.querySelector('#total-books').innerHTML="Total: "+books;
    document.querySelector('#total-electronics').innerHTML="Total: "+electronics;
    Highcharts.chart('barChartContainer', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Asset Summary'
        },
        xAxis: {
            categories: barChartData.map(item => item.asset),
            title: {
                text: 'Asset Type'
            }
        },
        yAxis: {
            title: {
                text: 'Quantity'
            }
        },
        series: [{
            name: 'Quantity',
            data: barChartData.map(item => item.quantity)
        }]
    });
    createPieChart('all');
    document.getElementById('assetTypeSelect').addEventListener('change', function () {
        const selectedAsset = this.value;
        createPieChart(selectedAsset);
    });
})


