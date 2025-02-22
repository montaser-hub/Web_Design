const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../models/toursModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();
// test if the uploaed file is an img
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload an image file', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 } // this will allow multiple images to be uploaded
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files
// proccess these images
const resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) cover image
  // const imageCoverFileName = `tour-${req.params.id}-${Date.now()}-cover.jpeg`; instead use
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer) //req.files.images[i]
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});
//////////2) ROUTE HANDLERs
const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getTours = factory.getAll(Tour);

const getTour = factory.getOne(Tour, { path: 'reviews' });

const addTour = factory.createOne(Tour);

const editTour = factory.updateOne(Tour);

const deleteTour = factory.deleteOne(Tour);

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAvrage: { $gte: 4.5 } } // filter out the tours
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' }, // group the results by null (to get a single result)
        numTours: { $sum: 1 }, // calculate the average rating
        avgRating: { $sum: '$ratingsAvrage' }, // calculate the average rating
        numRatings: { $avg: '$ratingsQuantity' }, // calculate the average rating
        avgPrice: { $avg: '$price' }, // calculate the average price
        minPrice: { $min: '$price' }, // find the minimum price
        maxPrice: { $max: '$price' } // find the maximum price
      }
    },
    {
      $sort: { avgPrice: 1 }
    },
    { $match: { _id: { $ne: 'EASY' } } }
  ]);
  res.status(200).json({
    status: 'success',
    data: stats
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: {
        month: '$_id'
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numToursStarts: -1 }
    },
    {
      $limit: 6
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: plan
  });
});

const getToursWithin = catchAsync(async (req, res, next) => {
  // /tours-within/:distance/center/:latlng/unit/:unit
  // /tours-within?distance = 233&center=40,-30,unit =mi
  // /tours-within/233/center/34.042801, -118.263482/mi
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',').map(Number);

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide a latitude and longitude in the format lat, lng',
        400
      )
    );
  }

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    result: tours.length,
    status: 'success',
    data: {
      data: {
        tours
      }
    }
  });
});

const getDistances = catchAsync(async (req, res, next) => {
  // /tours-within/:distance/center/:latlng/unit/:unit
  // /tours-within?distance = 233&center=40,-30,unit =mi
  // /tours-within/233/center/34.042801, -118.263482/mi
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',').map(Number);

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide a latitude and longitude in the format lat, lng',
        400
      )
    );
  }
  const multiplier = unit === 'mi' ? 0.00062137 : 0.001;
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: {
        data: distances
      }
    }
  });
});

module.exports = {
  getTours,
  getTour,
  addTour,
  editTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages
};
