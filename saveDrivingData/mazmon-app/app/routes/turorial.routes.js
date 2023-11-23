module.exports = app => {
  const gps = require("../controllers/GPS.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  //router.post("/", gps.create);

  // Retrieve all Tutorials
  //router.get("/", gps.findAll);

  // Retrieve all published Tutorials
  //router.get("/published", gps.findAllPublished);

  // Retrieve a single Tutorial with id
  //router.get("/:id", gps.findOne);

  // Update a Tutorial with id
  //router.put("/:id", gps.update);

  // Delete a Tutorial with id
  //router.delete("/:id", gps.delete);

  // Delete all Tutorials
  //router.delete("/", gps.deleteAll);

  //GPS取りこみ
  router.post("/gps", gps.createGPS);

  //軌跡取得
  router.get("/track", gps.findTrackAll);

  //パーツ生成
  router.post("/parts", gps.createParts);

  //パーツ取得
  router.get("/parts", gps.findPartsAll);


  app.use('/api/tutorials', router);
};
