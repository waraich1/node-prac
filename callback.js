// const names = ["Andrew", "Jen", "Jess"];
// const shortNames = names.filter(name => {
//   return name.length <= 4;
// });
const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    };
    callback(data);
  }, 2000);
};

geocode("Philedelphia", data => {
  console.log(data);
});

const add = (a, b, callback) => {
  sumw = a + b;
  callback(sumw);
};

add(1, 4, sum => {
  console.log(sum);
});
