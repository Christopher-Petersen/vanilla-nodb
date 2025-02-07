// Import packages and files
import express from "express"
import cors from "cors"

let mockData = [
    {
        "id": 1,
        "name": "Vanilla Coke",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiXnNmIsz7RSLJIqBatdRosuERkyzKy0e-Kg&usqp=CAU",
        "popularity": 0
    },
    {
        "id": 2,
        "name": "Dr. Pepper",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNOB8XuhOZRYsR9ed2T9StxnUSlXSawSssQ&usqp=CAU",
        "popularity": 0
    },
    {
        "id": 3,
        "name": "Sparkling Water",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXD1BCrfd5zPPHRnv3NjQ0whUwxubKGfqzA&usqp=CAU",
        "popularity": 0
    }
]

let globalId = 4

// Setup express instance
const app = express()


// Setup middleware
app.use(express.json())
app.use(cors())
app.use(express.static(`src`))

// ENDPOINTS GO HERE

app.get(`/drinks`, (request, response) => {
    response.send(mockData)
}
)

app.post(`/newDrink`, (request, response) => {

    const newDrink = {
        id: globalId, 
        name: request.body.name,
        imageUrl: request.body.imageUrl,
        popularity: 0
    }
    mockData.push(newDrink)
    globalId++

    response.send(mockData)
})

app.delete(`/drink/:id`, (request, response) => {
    console.log("PARAMS", request.params)

    const idToDelete = +request.params.id
    //+request.params.id is the same as: request.params.id.toNumber

    mockData = mockData.filter((el) => el.id != idToDelete)

    response.send(mockData)
})

app.put('/drink/:id', (request, response) => {
    const type = request.body.type

    const idToEdit = +request.params.id

    let index; 

    mockData.forEach ((el, i) => {
        if(el.id === idToEdit) {
            index = i
        }
    })
    if(index) {
        if(type ==='plus') {
            mockData[index].popularity++
        } else if(type === 'minus') {
            mockData[index].popularity--
        }
    }
    response.send(mockData)
})


// Open server using app.listen
app.listen(2319, () => console.log(`Server running at http://localhost:2319`))