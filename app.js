const express=require ('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./datasheet.json');
app.get('/hospital',(req,res)=>{
    res.send(data)
})
app.post('/hospital',(req,res)=>{
data.push(req.body);
fs.writeFile('datasheet.json',JSON.stringify(data),(err,resp)=>{
    if(err){
    console.log("Data cannot be written");
    }
    else{
        console.log("Data written successfully");
    }
})
})
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
            item.patientCount=req.body.patientCount
            item.hospitalLocation=req.body.hospitalLocation
        }
    })
    fs.writeFile('datasheet.json',JSON.stringify(data),(err,resp)=>{
        if(err){res.send("Data could not be updated")}
        else{res.send("Data updated")}
    })
})
app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;

    let value=data.filter(item=>item.NameOfTheHospital!==name);
        fs.writeFile('data.json',JSON.stringify(value),(err,resp)=>{   
            if(err){res.send('Data could not be deleted')}
            else{res.send('data deleted')}
        })
})

app.listen(3000);
console.log("Server listening to port 3000")
