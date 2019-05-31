var fs = require('fs');


// make 8 hours of data - 20,000,000 orders
var fiftyTwoWeekHigh = 150
var fiftyTwoWeeklow  = 90
var orderQtyArray    = [1,1,3,5,9,13,100,100,100,100,100,100,100,100,100,100,100,100,111,110,150,160,500,500,400,600,700,1000]

var ordersToGenerate = 20000000
var ordersCreated    = 0

var tsDate = new Date(2019, 5, 27, 9, 30, 0, 0);

var outputPath = './orders.csv';

fs.writeFileSync(outputPath,`"timestamp","stock","type","qty","kind","price",\r\n`);

// start with seed data - 100 orders
while(ordersCreated < ordersToGenerate){
    var order = {
        timeStamp: '',
        price: '',
        stock: 'MSFT',
        type: 'BUY',
        kind: 'MARKET',
        qty: 0
    };

    tsDate.setMilliseconds(tsDate.getMilliseconds() + 1);
    order.timeStamp = tsDate.toISOString();

    if(Math.random() > 0.5){ order.type = 'SELL'; }
    if(Math.random() > 0.5){ 
        order.kind  = 'LIMIT'; 
        order.price = (Math.floor( ( Math.random() * (fiftyTwoWeekHigh - fiftyTwoWeeklow)*100 ) + (fiftyTwoWeekHigh * 100)) / 100).toString();
    }
    order.qty = orderQtyArray[Math.floor(Math.random() * orderQtyArray.length)];
    
    var csvLine = `"${order.timeStamp}","${order.stock}","${order.type}","${order.qty}","${order.kind}","${order.price}"\r\n`;
    
    fs.appendFileSync(outputPath, csvLine);

    ordersCreated++;
}



