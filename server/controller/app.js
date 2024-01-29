

const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const database=require('./db')

const user=require('./model')
const info=require('./modelInfo')

const app=express()


app.use(cors())

app.use('/info',require())


app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post('/signup',(req,res)=>{
    const email=req.body.email
    const password=req.body.password

    user.insertMany([{
        email:email,
        password:password
    }])
    .then(()=>{
        res.json(`email:${email},password:${password}`)
    })
    .catch(err=>{
        console.log(err)
    })

})




app.post('/login',async (req,res)=>{

    try{
    const email=req.body.email
    const password=req.body.password

    let arr=await user.find({email:email},{password:1,_id:0})
    if(arr.length==0){
        res.json("false")
    }
    else if(arr[0].password==password){
        res.json("true")
    }
    else{
        res.json("false")
    }
}
catch(err){
    console.log(err)
}

})


app.post('/addData',async(req,res)=>{
    try{
        const email=req.body.email
        const itemName=req.body.itemName
        const itemCount=req.body.itemCount
        const description=req.body.description

        await info.insertMany([{
            email:email,
            itemName:itemName,
            itemCount:itemCount,
            description:description
        }])
        const responseData = {
            email: email,
            itemName: itemName,
            itemCount: itemCount,
            description:description
        };

        res.json(responseData);
    }
    catch(err){
        console.log(err)
    }
})

app.get('/getData/:email',async(req,res)=>{
    try{
        const {email}=req.params
        const i=await info.find({email:email})

        res.json(i)
    }
    catch(err){
        console.log(err)
    }
})

app.put('/updateInfoAdd/:id', async (req, res) => {
    
    const { id } = req.params;
    
    try {
        // Find the product based on itemName and email
        const products = await info.find({ _id:id });

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = products[0]; // Access the first element

        // Update the itemCount
        product.itemCount = product.itemCount + 1;

        // Save the updated product
        await product.save();

        res.json(product.itemCount);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/updateInfoSubstract/:id', async (req, res) => {
    
    const { id } = req.params;
    
    try {
        // Find the product based on itemName and email
        const products = await info.find({ _id:id });

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = products[0]; // Access the first element

        // Update the itemCount
        product.itemCount = product.itemCount - 1;

        // Save the updated product
        await product.save();

        res.json(product.itemCount);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/infoDelete/:_id', async (req, res) => {
     // Assuming your request body has an "email" field
    const { _id } = req.params;

    try {
        const deleteProduct = await info.findOneAndDelete({ _id:_id });

        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



database().catch(err=>{
    console.log(err)
})


app.listen(5000,()=>{
    console.log('Server is listening on port 5000')
})
