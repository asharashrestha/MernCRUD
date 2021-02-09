const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

//Database Connection
mongoose.connect(
    "mongodb+srv://user:password12345@merncluster.ydfr4.mongodb.net/food?retryWrites=true&w=majority",
    {useNewUrlparser: true,}
    );

app.post('/insert', async(req, res)=> {
    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName, daysSinceIAte: days});

    try {
        await food.save();
        res.send("Inserted Data");

    }
    catch(err){
        console.log(err);
    }
}
);

app.get('/read', async(req, res)=> {
    FoodModel.find({},(err, result)=>{
        if (err){
            res.send(err);
        }

        res.send(result);
    })
});


app.put('/update', async(req, res)=> {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
s
    try {
        await FoodModel.findById(id, (err, updatedFood)=>{
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        })

    }
    catch(err){
        console.log(err);
    }
}
);

app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
})

app.listen(3001,()=>{
    console.log('Sever running on port 3001...');
})