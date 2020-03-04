import Dexie from "dexie";

/**
 * Define the database
 * @type { Dexie }
 */
var db = new Dexie("ipms");
db.version(1).stores({
  projects: "++id,title"
});

//
// Query Database
//
db.open()
  .then(function() {
    return db.projects.add({ title: "Foo" });
  })
  .then(function() {
    return db.projects
      .where("id")
      .between(40, 65)
      .toArray();
  })
  .then(function(projects) {
    console.log("Found friends: " + JSON.stringify(projects, null, 2));
  })
  .then(function() {
    // return db.delete(); // So you can experiment again and again...
  })
  .catch(Dexie.MissingAPIError, function(err) {
    console.log("Couldn't find indexedDB API", err);
  })
  .catch("SecurityError", function(err) {
    console.log(
      "SeurityError - This browser doesn't like fiddling with indexedDB.",
      err
    );
    console.log(
      "If using Safari, this is because jsfiddle runs its samples within an iframe",
      err
    );
    console.log(
      "Go run some samples instead at: https://github.com/dfahlander/Dexie.js/wiki/Samples",
      err
    );
  })
  .catch(err => {
    console.log(err);
  });
