import express, { request, response } from 'express'
import 'dotenv/config'
const app = express()

const port = process.env.PORT || 3000

// Middleware
app.use(express.json());


let teaData = []
let nextId = 1;

// Add a new tea into an array
app.post("/teas", (request, response) => {
    const {name, price} = request.body;
    const newData = {id: nextId++, name, price};
    teaData.push(newData);
    response.status(201);
    response.send(newData);

    console.log(request.body);
});


// Get all teas
app.get("/teas", (request, response) => {
    response.status(200).send(teaData);
});

// Get a spectific tea
app.get("/teas/:id", (request, response) => {
   const tea = teaData.find(t => t.id === parseInt(request.params.id));
//    console.log(tea);
//    console.log(teaData);
   if(!tea) {
    response.status(404).send("Tea  not found!");
   }

   response.status(200).send(tea);
})

// Updating the data

app.put("/teas/:id", (request, response) => {
  const tea = teaData.find(t => t.id === parseInt(request.params.id));
  
  if(!tea) {
    return response.status(404).send("Tea  not found");
  }
  const {name, price} = request.body;
  tea.name = name;
  tea.price = price;
  response.status(200).send(tea);
});


// Deleting data

app.delete("/teas/:id", (request, response) => {
   const index = teaData.findIndex(t => t.id === parseInt(request.params.id));
   if(index == -1) {
    return response.status(404).send("tea not found");
   }

   teaData.splice(index, 1);
   return response.status(204).send("Deleted");
});

// app.get("/", (request, response) => {
//   response.send("Hello from vishnu nad his super man");
// });


// app.get("/ice-tea", (request, response) => {
//   response.send("Can you ask me, how are you man?");
// });

// app.get("/x", (request, response) => {
//    response.send("vishnu_mora");
// });



app.listen(port, () => {
    console.log(`Server is running at port ${port}...`)
})