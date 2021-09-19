// users collection
const user = {
    _id: '123',
    name: 'John',
    email: 'john@email.com',
    phone: '+55 48 99988-0011'
}

// campaigns collerction
const campaign  = {
    _id: '567',
    name: 'Charity 1',
    raffle_price: 10.00,
    estimated_draw_date: new Date('2021-12-01'),
    draw_date: new Date('2021-12-01'),
    admin_users: [], // userIds
    sellers: [], // userIds
    raffles: [],
    drawings: [],
    prizes: [],
    created_at: new Date()
}

// raffles collerction
const raffle = {
    _id: '678',
    seller: '345', // userId
    participant: '456' // userId
}

// prizes collerction
const prize = {
    _id: '789',
    name: 'Bicicleta',
    description: 'Bicicleta marca Caloi',
    location: 'Florianópolis'
}

// drawings collerction
const drawing = {
    _id: '890',
    prize: '789', // prizeId
    raffle: '678', // raffleId
}