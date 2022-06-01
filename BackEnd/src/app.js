const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')


// Settings 
app.set('port', 5000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares 
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

// Routes 
app.use(require('./routes/index'))


// Static 
app.use(express.static(path.join(__dirname, 'public')))

// 404
app.use((req, res, next) => {
    res.status(404).send('404 not found ')
})

/*
const fs = require('fs')
fs.readFile('src/public/baseDatosRopa.json','utf-8',(err, jsonString) =>{
    
    if(err){
        console.log(err)
    }else{
        try{
            
            //console.log(data)
            const data = JSON.parse(jsonString)
           
            data.forEach(item => {
                
                item.stock = 20
                
                
            })
            
            fs.writeFile('src/public/baseDatosRopa.json', JSON.stringify(data, null, 2), err =>{
                if(err){
                    console.log(err)
                }else{
                    console.log('Archivo escrito con sucesso')
                }
            })
        }catch(err){
            console.log('error parsing JSON: ', err)
        }
        
        
    }  
    
})

*/ 
module.exports = app