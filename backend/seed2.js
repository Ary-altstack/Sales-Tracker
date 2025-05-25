const mongoose = require('mongoose');
const SaleData = require('./models/SaleData'); 

const mongoUri = 'mongodb+srv://sakshisukhani26:sakshi2601@valtech.j2mb7h2.mongodb.net/salesTracker?retryWrites=true&w=majority&appName=valtech';


mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas for seeding'))
  .catch(err => {
    console.error('MongoDB connection error during seeding:', err.message);
    process.exit(1); 
  });

  const salesDataToInsert = [
    {
      "customerName": "Alice Johnson",
      "customerEmail": "alice.j@example.com",
      "customerContact": 9876543210,
      "model": "BMW X5",
      "price": 75000,
      "saleDate": "2024-01-15T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Bob Smith",
      "customerEmail": "bob.s@example.com",
      "customerContact": 1234567890,
      "model": "Audi A4",
      "price": 48000,
      "saleDate": "2024-02-20T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "Used"
    },
    {
      "customerName": "Charlie Davis",
      "customerEmail": "charlie.d@example.com",
      "customerContact": 1122334455,
      "model": "Tesla Model 3",
      "price": 55000,
      "saleDate": "2024-03-10T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Diana Miller",
      "customerEmail": "diana.m@example.com",
      "customerContact": 9988776655,
      "model": "BMW X7 M50d",
      "price": 92000,
      "saleDate": "2024-04-05T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Eve Wilson",
      "customerEmail": "eve.w@example.com",
      "customerContact": 5544332211,
      "model": "Ford Mustang",
      "price": 38000,
      "saleDate": "2024-05-22T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "Used"
    },
    {
      "customerName": "Frank White",
      "customerEmail": "frank.w@example.com",
      "customerContact": 2233445566,
      "model": "Toyota Camry",
      "price": 29000,
      "saleDate": "2024-06-01T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Grace Taylor",
      "customerEmail": "grace.t@example.com",
      "customerContact": 7788990011,
      "model": "Honda Civic",
      "price": 25000,
      "saleDate": "2024-07-18T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "Used"
    },
    {
      "customerName": "Henry Moore",
      "customerEmail": "henry.m@example.com",
      "customerContact": 3344556677,
      "model": "BMW X1",
      "price": 46000,
      "saleDate": "2024-08-25T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Ivy Anderson",
      "customerEmail": "ivy.a@example.com",
      "customerContact": 8899001122,
      "model": "Mercedes C-Class",
      "price": 60000,
      "saleDate": "2024-09-01T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Jack Thomas",
      "customerEmail": "jack.t@example.com",
      "customerContact": 4455667788,
      "model": "BMW Z4 M40i",
      "price": 72000,
      "saleDate": "2024-10-12T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Olivia Green",
      "customerEmail": "olivia.g@example.com",
      "customerContact": 1029384756,
      "model": "BMW X5",
      "price": 77000,
      "saleDate": "2024-01-20T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Liam Hall",
      "customerEmail": "liam.h@example.com",
      "customerContact": 6789012345,
      "model": "Tesla Model 3",
      "price": 56000,
      "saleDate": "2024-02-10T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Sophia King",
      "customerEmail": "sophia.k@example.com",
      "customerContact": 2345678901,
      "model": "Audi A4",
      "price": 49000,
      "saleDate": "2024-03-05T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Noah Wright",
      "customerEmail": "noah.w@example.com",
      "customerContact": 7890123456,
      "model": "BMW X1",
      "price": 47000,
      "saleDate": "2024-04-18T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Emma Lopez",
      "customerEmail": "emma.l@example.com",
      "customerContact": 3456789012,
      "model": "Ford Mustang",
      "price": 39000,
      "saleDate": "2024-05-01T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Mason Scott",
      "customerEmail": "mason.s@example.com",
      "customerContact": 8901234567,
      "model": "Toyota Camry",
      "price": 30000,
      "saleDate": "2024-06-15T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Ava Adams",
      "customerEmail": "ava.a@example.com",
      "customerContact": 4567890123,
      "model": "Honda Civic",
      "price": 26000,
      "saleDate": "2024-07-03T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Ethan Baker",
      "customerEmail": "ethan.b@example.com",
      "customerContact": 9012345678,
      "model": "BMW X7 M50d",
      "price": 93000,
      "saleDate": "2024-08-11T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Isabella Carter",
      "customerEmail": "isabella.c@example.com",
      "customerContact": 5678901234,
      "model": "Mercedes C-Class",
      "price": 61000,
      "saleDate": "2024-09-29T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Lucas Green",
      "customerEmail": "lucas.g@example.com",
      "customerContact": 1234567892,
      "model": "BMW Z4 M40i",
      "price": 73000,
      "saleDate": "2024-10-08T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Mia Evans",
      "customerEmail": "mia.e@example.com",
      "customerContact": 1122334455,
      "model": "BMW X5",
      "price": 76500,
      "saleDate": "2024-01-05T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Alexander Hill",
      "customerEmail": "alexander.h@example.com",
      "customerContact": 9988776655,
      "model": "Audi A4",
      "price": 48500,
      "saleDate": "2024-02-12T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Charlotte Clark",
      "customerEmail": "charlotte.c@example.com",
      "customerContact": 5544332211,
      "model": "Tesla Model 3",
      "price": 55500,
      "saleDate": "2024-03-28T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Daniel Lewis",
      "customerEmail": "daniel.l@example.com",
      "customerContact": 2233445566,
      "model": "BMW X7 M50d",
      "price": 92500,
      "saleDate": "2024-04-10T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Amelia Young",
      "customerEmail": "amelia.y@example.com",
      "customerContact": 7788990011,
      "model": "Ford Mustang",
      "price": 38500,
      "saleDate": "2024-05-03T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Benjamin King",
      "customerEmail": "benjamin.k@example.com",
      "customerContact": 3344556677,
      "model": "Toyota Camry",
      "price": 29500,
      "saleDate": "2024-06-20T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Harper Scott",
      "customerEmail": "harper.s@example.com",
      "customerContact": 8899001122,
      "model": "Honda Civic",
      "price": 25500,
      "saleDate": "2024-07-08T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Elijah Baker",
      "customerEmail": "elijah.b@example.com",
      "customerContact": 4455667788,
      "model": "BMW X1",
      "price": 46500,
      "saleDate": "2024-08-16T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Abigail Green",
      "customerEmail": "abigail.g@example.com",
      "customerContact": 1234567892,
      "model": "Mercedes C-Class",
      "price": 60500,
      "saleDate": "2024-09-05T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "James White",
      "customerEmail": "james.w@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 72500,
      "saleDate": "2024-10-25T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Emily Hall",
      "customerEmail": "emily.h@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 77500,
      "saleDate": "2024-01-25T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Michael King",
      "customerEmail": "michael.k@example.com",
      "customerContact": 2345678901,
      "model": "Tesla Model 3",
      "price": 56500,
      "saleDate": "2024-02-15T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Elizabeth Lopez",
      "customerEmail": "elizabeth.l@example.com",
      "customerContact": 7890123456,
      "model": "Audi A4",
      "price": 49500,
      "saleDate": "2024-03-01T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "William Scott",
      "customerEmail": "william.s@example.com",
      "customerContact": 3456789012,
      "model": "BMW X1",
      "price": 47500,
      "saleDate": "2024-04-20T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Sofia Adams",
      "customerEmail": "sofia.a@example.com",
      "customerContact": 8901234567,
      "model": "Ford Mustang",
      "price": 39500,
      "saleDate": "2024-05-08T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "David Baker",
      "customerEmail": "david.b@example.com",
      "customerContact": 4567890123,
      "model": "Toyota Camry",
      "price": 30500,
      "saleDate": "2024-06-10T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Grace Carter",
      "customerEmail": "grace.c@example.com",
      "customerContact": 9012345678,
      "model": "Honda Civic",
      "price": 26500,
      "saleDate": "2024-07-29T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Joseph Green",
      "customerEmail": "joseph.g@example.com",
      "customerContact": 5678901234,
      "model": "BMW X7 M50d",
      "price": 93500,
      "saleDate": "2024-08-18T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Chloe Evans",
      "customerEmail": "chloe.e@example.com",
      "customerContact":1234567892,
      "model": "Mercedes C-Class",
      "price": 61500,
      "saleDate": "2024-09-07T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Samuel Hill",
      "customerEmail": "samuel.h@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 73500,
      "saleDate": "2024-10-20T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Zoe Clark",
      "customerEmail": "zoe.c@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 78000,
      "saleDate": "2024-01-10T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Andrew Lewis",
      "customerEmail": "andrew.l@example.com",
      "customerContact": 2345678901,
      "model": "Audi A4",
      "price": 50000,
      "saleDate": "2024-02-28T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Lily Young",
      "customerEmail": "lily.y@example.com",
      "customerContact": 7890123456,
      "model": "Tesla Model 3",
      "price": 57000,
      "saleDate": "2024-03-15T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Jackson King",
      "customerEmail": "jackson.k@example.com",
      "customerContact": 3456789012,
      "model": "BMW X7 M50d",
      "price": 94000,
      "saleDate": "2024-04-01T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Sofia Baker",
      "customerEmail": "sofia.b@example.com",
      "customerContact": 8901234567,
      "model": "Ford Mustang",
      "price": 40000,
      "saleDate": "2024-05-29T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Ethan Carter",
      "customerEmail": "ethan.c@example.com",
      "customerContact": 4567890123,
      "model": "Toyota Camry",
      "price": 31000,
      "saleDate": "2024-06-18T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Avery Green",
      "customerEmail": "avery.g@example.com",
      "customerContact": 9012345678,
      "model": "Honda Civic",
      "price": 27000,
      "saleDate": "2024-07-06T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Scarlett Hill",
      "customerEmail": "scarlett.h@example.com",
      "customerContact": 5678901234,
      "model": "BMW X1",
      "price": 48000,
      "saleDate": "2024-08-25T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Leo Clark",
      "customerEmail": "leo.c@example.com",
      "customerContact": 1234567892,
      "model": "Mercedes C-Class",
      "price": 62000,
      "saleDate": "2024-09-14T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Grace Lewis",
      "customerEmail": "grace.l@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 74000,
      "saleDate": "2024-10-03T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Henry Young",
      "customerEmail": "henry.y@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 79000,
      "saleDate": "2024-11-22T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Ivy King",
      "customerEmail": "ivy.k@example.com",
      "customerContact": 2345678901,
      "model": "Audi A4",
      "price": 51000,
      "saleDate": "2024-12-11T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Jack Scott",
      "customerEmail": "jack.s@example.com",
      "customerContact": 7890123456,
      "model": "Tesla Model 3",
      "price": 58000,
      "saleDate": "2024-01-08T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Mia Adams",
      "customerEmail": "mia.a@example.com",
      "customerContact": 3456789012,
      "model": "BMW X7 M50d",
      "price": 95000,
      "saleDate": "2024-02-27T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Noah Baker",
      "customerEmail": "noah.b@example.com",
      "customerContact": 8901234567,
      "model": "Ford Mustang",
      "price": 41000,
      "saleDate": "2024-03-16T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Olivia Carter",
      "customerEmail": "olivia.c@example.com",
      "customerContact": 4567890123,
      "model": "Toyota Camry",
      "price": 32000,
      "saleDate": "2024-04-05T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Liam Green",
      "customerEmail": "liam.g@example.com",
      "customerContact": 9012345678,
      "model": "Honda Civic",
      "price": 28000,
      "saleDate": "2024-05-24T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Sophia Hill",
      "customerEmail": "sophia.h@example.com",
      "customerContact": 5678901234,
      "model": "BMW X1",
      "price": 49000,
      "saleDate": "2024-06-13T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Ethan Clark",
      "customerEmail": "ethan.c@example.com",
      "customerContact": 1234567892,
      "model": "Mercedes C-Class",
      "price": 63000,
      "saleDate": "2024-07-02T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Avery Lewis",
      "customerEmail": "avery.l@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 75000,
      "saleDate": "2024-08-21T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Scarlett Young",
      "customerEmail": "scarlett.y@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 80000,
      "saleDate": "2024-09-10T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Leo King",
      "customerEmail": "leo.k@example.com",
      "customerContact": 2345678901,
      "model": "Audi A4",
      "price": 52000,
      "saleDate": "2024-10-29T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Grace Scott",
      "customerEmail": "grace.s@example.com",
      "customerContact": 7890123456,
      "model": "Tesla Model 3",
      "price": 59000,
      "saleDate": "2024-11-18T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Henry Adams",
      "customerEmail": "henry.a@example.com",
      "customerContact": 3456789012,
      "model": "BMW X7 M50d",
      "price": 96000,
      "saleDate": "2024-12-07T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Ivy Baker",
      "customerEmail": "ivy.b@example.com",
      "customerContact": 8901234567,
      "model": "Ford Mustang",
      "price": 42000,
      "saleDate": "2024-01-01T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Jack Carter",
      "customerEmail": "jack.c@example.com",
      "customerContact": 4567890123,
      "model": "Toyota Camry",
      "price": 33000,
      "saleDate": "2024-02-19T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Mia Green",
      "customerEmail": "mia.g@example.com",
      "customerContact": 9012345678,
      "model": "Honda Civic",
      "price": 29000,
      "saleDate": "2024-03-08T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Noah Hill",
      "customerEmail": "noah.h@example.com",
      "customerContact": 5678901234,
      "model": "BMW X1",
      "price": 50000,
      "saleDate": "2024-04-27T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Olivia Clark",
      "customerEmail": "olivia.c@example.com",
      "customerContact": 1234567892,
      "model": "Mercedes C-Class",
      "price": 64000,
      "saleDate": "2024-05-16T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Liam Lewis",
      "customerEmail": "liam.l@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 76000,
      "saleDate": "2024-06-05T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Sophia Young",
      "customerEmail": "sophia.y@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 81000,
      "saleDate": "2024-07-24T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    },
    {
      "customerName": "Ethan King",
      "customerEmail": "ethan.k@example.com",
      "customerContact": 2345678901,
      "model": "Audi A4",
      "price": 53000,
      "saleDate": "2024-08-13T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Audi+A4",
      "type": "Used"
    },
    {
      "customerName": "Avery Scott",
      "customerEmail": "avery.s@example.com",
      "customerContact": 7890123456,
      "model": "Tesla Model 3",
      "price": 60000,
      "saleDate": "2024-09-02T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Tesla+M3",
      "type": "New"
    },
    {
      "customerName": "Scarlett Adams",
      "customerEmail": "scarlett.a@example.com",
      "customerContact": 3456789012,
      "model": "BMW X7 M50d",
      "price": 97000,
      "saleDate": "2024-10-21T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X7",
      "type": "New"
    },
    {
      "customerName": "Leo Baker",
      "customerEmail": "leo.b@example.com",
      "customerContact": 8901234567,
      "model": "Ford Mustang",
      "price": 43000,
      "saleDate": "2024-11-10T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Mustang",
      "type": "Used"
    },
    {
      "customerName": "Grace Carter",
      "customerEmail": "grace.c@example.com",
      "customerContact": 4567890123,
      "model": "Toyota Camry",
      "price": 34000,
      "saleDate": "2024-12-29T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Camry",
      "type": "New"
    },
    {
      "customerName": "Henry Green",
      "customerEmail": "henry.g@example.com",
      "customerContact": 9012345678,
      "model": "Honda Civic",
      "price": 30000,
      "saleDate": "2024-01-18T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Civic",
      "type": "Used"
    },
    {
      "customerName": "Ivy Hill",
      "customerEmail": "ivy.h@example.com",
      "customerContact": 5678901234,
      "model": "BMW X1",
      "price": 51000,
      "saleDate": "2024-02-06T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+X1",
      "type": "New"
    },
    {
      "customerName": "Jack Clark",
      "customerEmail": "jack.c@example.com",
      "customerContact": 1234567892,
      "model": "Mercedes C-Class",
      "price": 65000,
      "saleDate": "2024-03-25T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=Merc+C",
      "type": "New"
    },
    {
      "customerName": "Mia Lewis",
      "customerEmail": "mia.l@example.com",
      "customerContact": 1029384756,
      "model": "BMW Z4 M40i",
      "price": 77000,
      "saleDate": "2024-04-14T00:00:00.000Z",
      "carImage": "https://placehold.co/100x70/ffffff/000000?text=BMW+Z4",
      "type": "Used"
    },
    {
      "customerName": "Noah Young",
      "customerEmail": "noah.y@example.com",
      "customerContact": 6789012345,
      "model": "BMW X5",
      "price": 82000,
      "saleDate": "2024-05-03T00:00:00.000Z",
      "carImage": "assets/cars/c11.png",
      "type": "New"
    }
  ];

 
  SaleData.deleteMany({})
    .then(() => {
      console.log('Existing sales data cleared.');
     
      return SaleData.insertMany(salesDataToInsert);
    })
    .then(() => {
      console.log('50 sales data entries inserted successfully!');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error seeding data:', err);
      mongoose.connection.close(); 
    });
