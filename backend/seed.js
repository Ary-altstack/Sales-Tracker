const mongoose = require('mongoose');


const mongoUri = 'mongodb+srv://sakshisukhani26:sakshi2601@valtech.j2mb7h2.mongodb.net/salesTracker?retryWrites=true&w=majority&appName=valtech';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas for seeding'))
  .catch(err => {
    console.error('MongoDB connection error during seeding:', err.message);
    process.exit(1); 
  });


const dashboardSummarySchema = new mongoose.Schema({
  ytdValue: String,
  bpValue: String,
  growth: String,
  dateRange: String,
});
const DashboardSummary = mongoose.model('DashboardSummary', dashboardSummarySchema);

const newCustomersSchema = new mongoose.Schema({
  customerCount: String,
  target: String,
  growth: String,
});
const NewCustomers = mongoose.model('NewCustomers', newCustomersSchema);

const globalSalesChartSchema = new mongoose.Schema({
  labels: [String],
  salesData: [Number],
});
const GlobalSalesChart = mongoose.model('GlobalSalesChart', globalSalesChartSchema);

const coreModelSchema = new mongoose.Schema({
  name: String,
  image: String,
  units: String,
  growth: String,
  colorClass: String,
});
const CoreModel = mongoose.model('CoreModel', coreModelSchema);

const topSellingModelSchema = new mongoose.Schema({
  name: String,
  image: String,
  sales: String,
  colorClass: String,
});
const TopSellingModel = mongoose.model('TopSellingModel', topSellingModelSchema);

const salesByRegionSchema = new mongoose.Schema({
  name: String,
  flag: String,
  volume: String,
  bp: String,
  change: String,
  trend: String,
});
const SalesByRegion = mongoose.model('SalesByRegion', salesByRegionSchema);

const channelMixSchema = new mongoose.Schema({
  name: String,
  value: String,
  color: String,
});
const ChannelMix = mongoose.model('ChannelMix', channelMixSchema);


async function seedDatabase() {
  try {
    
    await Promise.all([
      DashboardSummary.deleteMany({}),
      NewCustomers.deleteMany({}),
      GlobalSalesChart.deleteMany({}),
      CoreModel.deleteMany({}),
      TopSellingModel.deleteMany({}),
      SalesByRegion.deleteMany({}),
      ChannelMix.deleteMany({}),
    ]);
    console.log('Cleared existing data.');

   
    await DashboardSummary.create({
      ytdValue: '195k',
      bpValue: '300k',
      growth: '+23.30%',
      dateRange: 'Jan 2025 - Aug 2025'
    });
    console.log('Seeded Dashboard Summary!');

  
    await NewCustomers.create({
      customerCount: '1.2k',
      target: '1.5k',
      growth: '+8.5%'
    });
    console.log('Seeded New Customers!');

   
    await GlobalSalesChart.create({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      salesData: [130, 100, 80, 50, 110, 70, 80, 50, 100, 50, 60, 115],
    });
    console.log('Seeded Global Sales Chart Data!');

   
    await CoreModel.insertMany([
      {
        name: 'BMW X5',
        image: 'assets/cars/c4.png',
        units: '4.8k',
        growth: '25.52%',
        colorClass: 'core-card-color-1',
      },
      {
        name: 'BMW X1',
        image: 'assets/cars/c5.png',
        units: '4.2k',
        growth: '18.26%',
        colorClass: 'core-card-color-2',
      },
      {
        name: 'BMW Z4 M40i',
        image: 'assets/cars/c6.png',
        units: '3.7k',
        growth: '15.04%',
        colorClass: 'core-card-color-3',
      },
      {
        name: 'BMW X7 M50d',
        image: 'assets/cars/c7.png',
        units: '3.5k',
        growth: '13.95%',
        colorClass: 'core-card-color-4',
      },
    ]);
    console.log('Seeded Core Models!');

    
    await TopSellingModel.insertMany([
      {
        name: 'BMW X5',
        image: 'assets/cars/c8.png',
        sales: '25.4k',
        colorClass: 'model-card-color-1'
      },
      {
        name: 'BMW X1',
        image: 'assets/cars/c9.png',
        sales: '21.7k',
        colorClass: 'model-card-color-2'
      },
      {
        name: 'BMW Z4 M40i',
        image: 'assets/cars/c10.png',
        sales: '18.9k',
        colorClass: 'model-card-color-3'
      },
      {
        name: 'BMW Z4 M40i',
        image: 'assets/cars/c11.png',
        sales: '18.9k',
        colorClass: 'model-card-color-4'
      }
    ]);
    console.log('Seeded Top Selling Models!');


    await SalesByRegion.insertMany([
      {
        name: 'India',
        flag: '/assets/cars/f1.png',
        volume: '12.3k',
        bp: '430k',
        change: '+4.2%',
        trend: '/assets/cars/t2.png'
      },
      {
        name: 'UK',
        flag: '/assets/cars/f3.png',
        volume: '9.1k',
        bp: '310k',
        change: '-1.8%',
        trend: '/assets/cars/t1.png'
      },
      {
        name: 'Portugal',
        flag: '/assets/cars/f2.png',
        volume: '15.7k',
        bp: '520k',
        change: '+7.5%',
        trend: '/assets/cars/t2.png'
      },
      {
        name: 'Russia',
        flag: '/assets/cars/t1.png',
        volume: '20.7k',
        bp: '480k',
        change: '+6.5%',
        trend: '/assets/cars/f1.png'
      }
    ]);
    console.log('Seeded Sales By Region!');

  
    await ChannelMix.insertMany([
      {
        name: 'Private (+others)',
        value: '85k',
        color: '#6366F1'
      },
      {
        name: 'Commercial fleet',
        value: '32k',
        color: '#FACC15'
      },
      {
        name: 'Self registration',
        value: '16k',
        color: '#FDBA74'
      }
    ]);
    console.log('Seeded Channel Mix!');

  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();
