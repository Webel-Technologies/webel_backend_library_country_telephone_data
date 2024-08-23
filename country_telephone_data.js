"use strict";

const KYCType = require("./enums/kycType");
const PriorityType = require("./enums/priorityType");

const fs = require("fs");
const path = require("path");

var allCountries = [
  ["af", "93", KYCType.GENERIC, "+..-..-...-...."],
  ["ax", "358", KYCType.GENERIC, ""],
  ["al", "355", KYCType.GENERIC, "+...(...)...-..."],
  ["dz", "213", KYCType.GENERIC, "+...-..-...-...."],
  ["as", "1684", KYCType.GENERIC, "+.(...)...-...."],
  ["ad", "376", KYCType.GENERIC, "+...-...-..."],
  ["ao", "244", KYCType.GENERIC, "+...(...)...-..."],
  ["ai", "1264", KYCType.GENERIC, "+.(...)...-...."],
  ["aq", "672", KYCType.GENERIC, ""],
  ["ag", "1268", KYCType.GENERIC, "+.(...)...-...."],
  ["ar", "54", KYCType.GENERIC, "+..(...)...-...."],
  ["am", "374", KYCType.GENERIC, "+...-..-...-..."],
  ["aw", "297", KYCType.GENERIC, "+...-...-...."],
  ["au", "61", KYCType.GENERIC, "+.. ... ... ..."],
  ["at", "43", KYCType.UE, "+..(...)...-...."],
  ["az", "994", KYCType.GENERIC, "+...-..-...-..-.."],
  ["bs", "1242", KYCType.GENERIC, "+.(...)...-...."],
  ["bh", "973", KYCType.GENERIC, "+...-....-...."],
  ["bd", "880", KYCType.GENERIC, "+...-..-...-..."],
  ["bb", "1246", KYCType.GENERIC, "+.(...)...-...."],
  ["by", "375", KYCType.GENERIC, "+...(..)...-..-.."],
  ["be", "32", KYCType.UE, "+.. ... .. .. .."],
  ["bz", "501", KYCType.GENERIC, "+...-...-...."],
  ["bj", "229", KYCType.GENERIC, "+...-..-..-...."],
  ["bm", "1441", KYCType.GENERIC, "+.(...)...-...."],
  ["bt", "975", KYCType.GENERIC, "+...-.-...-..."],
  ["bo", "591", KYCType.GENERIC, "+...-.-...-...."],
  ["ba", "387", KYCType.GENERIC, "+...-..-...."],
  ["bw", "267", KYCType.GENERIC, "+...-..-...-..."],
  ["bv", "47", KYCType.GENERIC, ""],
  ["br", "55", KYCType.GENERIC, "+..-..-....-...."],
  ["io", "246", KYCType.GENERIC, "+...-...-...."],
  ["vg", "1284", KYCType.GENERIC, "+.(...)...-...."],
  ["bn", "673", KYCType.GENERIC, "+...-...-...."],
  ["bg", "359", KYCType.UE, "+...(...)...-..."],
  ["bf", "226", KYCType.GENERIC, "+...-..-..-...."],
  ["bi", "257", KYCType.GENERIC, "+...-..-..-...."],
  ["kh", "855", KYCType.GENERIC, "+...-..-...-..."],
  ["cm", "237", KYCType.GENERIC, "+...-....-...."],
  [
    "ca",
    "1",
    KYCType.GENERIC,
    "+. (...) ...-....",
    1,
    [
      "204",
      "236",
      "249",
      "250",
      "289",
      "306",
      "343",
      "365",
      "387",
      "403",
      "416",
      "418",
      "431",
      "437",
      "438",
      "450",
      "506",
      "514",
      "519",
      "548",
      "579",
      "581",
      "587",
      "604",
      "613",
      "639",
      "647",
      "672",
      "705",
      "709",
      "742",
      "778",
      "780",
      "782",
      "807",
      "819",
      "825",
      "867",
      "873",
      "902",
      "905",
    ],
  ],
  ["cv", "238", KYCType.GENERIC, "+...(...)..-.."],
  ["bq", "599", KYCType.GENERIC, "+...-...-....", 1],
  ["ky", "1345", KYCType.GENERIC, "+.(...)...-...."],
  ["cf", "236", KYCType.GENERIC, "+...-..-..-...."],
  ["td", "235", KYCType.GENERIC, "+...-..-..-..-.."],
  ["cl", "56", KYCType.GENERIC, "+..-.-....-...."],
  ["cn", "86", KYCType.GENERIC, "+.. ..-........"],
  ["cx", "61", KYCType.GENERIC, ""],
  ["cc", "61", KYCType.GENERIC, ""],
  ["co", "57", KYCType.GENERIC, "+..(...)...-...."],
  ["km", "269", KYCType.GENERIC, "+...-..-....."],
  ["cd", "243", KYCType.GENERIC, "+...(...)...-..."],
  ["cg", "242", KYCType.GENERIC, "+...-..-...-...."],
  ["ck", "682", KYCType.GENERIC, "+...-..-..."],
  ["cr", "506", KYCType.GENERIC, "+... ....-...."],
  ["ci", "225", KYCType.GENERIC, "+...-..-...-..."],
  ["hr", "385", KYCType.UE, "+...-..-...-..."],
  ["cu", "53", KYCType.GENERIC, "+..-.-...-...."],
  ["cw", "599", KYCType.GENERIC, "+...-...-....", 0],
  ["cy", "357", KYCType.UE, "+...-..-...-..."],
  ["cz", "420", KYCType.UE, "+...(...)...-..."],
  ["dk", "45", KYCType.UE, "+.. .. .. .. .."],
  ["dj", "253", KYCType.GENERIC, "+...-..-..-..-.."],
  ["dm", "1767", KYCType.GENERIC, , "+.(...)...-...."],
  ["do", "1", KYCType.GENERIC, "+.(...)...-....", 2, [("809", "829", "849")]],
  ["ec", "593", KYCType.GENERIC, "+...-.-...-...."],
  ["eg", "20", KYCType.GENERIC, "+..(...)...-...."],
  ["sv", "503", KYCType.GENERIC, "+... ....-...."],
  ["gq", "240", KYCType.GENERIC, "+...-..-...-...."],
  ["er", "291", KYCType.GENERIC, "+...-.-...-..."],
  ["ee", "372", KYCType.UE, "+...-...-...."],
  ["et", "251", KYCType.GENERIC, "+...-..-...-...."],
  ["fk", "500", KYCType.GENERIC, "+...-....."],
  ["fo", "298", KYCType.GENERIC, "+...-...-..."],
  ["fj", "679", KYCType.GENERIC, "+...-..-....."],
  ["fi", "358", KYCType.UE, "+... .. .... ...."],
  ["fr", "33", KYCType.UE, "+.. . .. .. .. .."],
  ["gf", "594", KYCType.GENERIC, "+...-.....-...."],
  ["pf", "689", KYCType.GENERIC, "+...-..-..-.."],
  ["tf", "262", KYCType.GENERIC, ""],
  ["ga", "241", KYCType.GENERIC, "+...-.-..-..-.."],
  ["gm", "220", KYCType.GENERIC, "+...(...)..-.."],
  ["ge", "995", KYCType.GENERIC, "+...(...)...-..."],
  ["de", "49", KYCType.UE, "+.. ... ......."],
  ["gh", "233", KYCType.GENERIC, "+...(...)...-..."],
  ["gi", "350", KYCType.GENERIC, "+...-...-....."],
  ["gr", "30", KYCType.UE, "+..(...)...-...."],
  ["gl", "299", KYCType.GENERIC, "+...-..-..-.."],
  ["gd", "1473", KYCType.GENERIC, "+.(...)...-...."],
  ["gp", "590", KYCType.GENERIC, "", 0],
  ["gu", "1671", KYCType.GENERIC, "+.(...)...-...."],
  ["gt", "502", KYCType.GENERIC, "+... ....-...."],
  ["gg", "44", KYCType.GENERIC, ""],
  ["gn", "224", KYCType.GENERIC, "+...-..-...-..."],
  ["gw", "245", KYCType.GENERIC, "+...-.-......"],
  ["gy", "592", KYCType.GENERIC, "+...-...-...."],
  ["ht", "509", KYCType.GENERIC, "+... ....-...."],
  ["hm", "672", KYCType.GENERIC, ""],
  ["hn", "504", KYCType.GENERIC, "+...-....-...."],
  ["hk", "852", KYCType.GENERIC, "+... .... ...."],
  ["hu", "36", KYCType.UE, "+..(...)...-..."],
  ["is", "354", KYCType.GENERIC, "+... ... ...."],
  ["in", "91", KYCType.GENERIC, "+.. .....-....."],
  ["id", "62", KYCType.GENERIC, "+..-..-...-.."],
  ["ir", "98", KYCType.GENERIC, "+..(...)...-...."],
  ["iq", "964", KYCType.GENERIC, "+...(...)...-...."],
  ["ie", "353", KYCType.UE, "+... .. ......."],
  ["im", "44", KYCType.GENERIC, ""],
  ["il", "972", KYCType.GENERIC, "+...-.-...-...."],
  ["it", "39", KYCType.UE, "+.. ... ......", 0],
  ["jm", "1876", KYCType.GENERIC, "+.(...)...-...."],
  ["jp", "81", KYCType.GENERIC, "+.. ... .. ...."],
  ["je", "44", KYCType.GENERIC, ""],
  ["jo", "962", KYCType.GENERIC, "+...-.-....-...."],
  ["kz", "7", KYCType.GENERIC, "+. ... ...-..-..", 1],
  ["ke", "254", KYCType.GENERIC, "+...-...-......"],
  ["ki", "686", KYCType.GENERIC, "+...-..-..."],
  ["xk", "383", KYCType.GENERIC, ""],
  ["kw", "965", KYCType.GENERIC, "+...-....-...."],
  ["kg", "996", KYCType.GENERIC, "+...(...)...-..."],
  ["la", "856", KYCType.GENERIC, "+...-..-...-..."],
  ["lv", "371", KYCType.UE, "+...-..-...-..."],
  ["lb", "961", KYCType.GENERIC, "+...-.-...-..."],
  ["ls", "266", KYCType.GENERIC, "+...-.-...-...."],
  ["lr", "231", KYCType.GENERIC, "+...-..-...-..."],
  ["ly", "218", KYCType.GENERIC, "+...-..-...-..."],
  ["li", "423", KYCType.GENERIC, "+...(...)...-...."],
  ["lt", "370", KYCType.UE, "+...(...)..-..."],
  ["lu", "352", KYCType.UE, "+...(...)...-..."],
  ["mo", "853", KYCType.GENERIC, "+...-....-...."],
  ["mk", "389", KYCType.GENERIC, "+...-..-...-..."],
  ["mg", "261", KYCType.GENERIC, "+...-..-..-....."],
  ["mw", "265", KYCType.GENERIC, "+...-.-....-...."],
  ["my", "60", KYCType.GENERIC, "+.. ..-....-...."],
  ["mv", "960", KYCType.GENERIC, "+...-...-...."],
  ["ml", "223", KYCType.GENERIC, "+...-..-..-...."],
  ["mt", "356", KYCType.UE, "+...-....-...."],
  ["mh", "692", KYCType.GENERIC, "+...-...-...."],
  ["mq", "596", KYCType.GENERIC, "+...(...)..-..-.."],
  ["mr", "222", KYCType.GENERIC, "+...-..-..-...."],
  ["mu", "230", KYCType.GENERIC, "+...-...-...."],
  ["yt", "262", KYCType.GENERIC, ""],
  ["mx", "52", KYCType.GENERIC, "+..-..-..-...."],
  ["fm", "691", KYCType.GENERIC, "+...-...-...."],
  ["md", "373", KYCType.GENERIC, "+...-....-...."],
  ["mc", "377", KYCType.GENERIC, "+...-..-...-..."],
  ["mn", "976", KYCType.GENERIC, "+...-..-..-...."],
  ["me", "382", KYCType.GENERIC, "+...-..-...-..."],
  ["ms", "1664", KYCType.GENERIC, "+.(...)...-...."],
  ["ma", "212", KYCType.GENERIC, "+...-..-....-..."],
  ["mz", "258", KYCType.GENERIC, "+...-..-...-..."],
  ["mm", "95", KYCType.GENERIC, "+..-...-..."],
  ["na", "264", KYCType.GENERIC, "+...-..-...-...."],
  ["nr", "674", KYCType.GENERIC, "+...-...-...."],
  ["np", "977", KYCType.GENERIC, "+...-..-...-..."],
  ["nl", "31", KYCType.UE, "+.. .. ........"],
  ["nc", "687", KYCType.GENERIC, "+...-..-...."],
  ["nz", "64", KYCType.GENERIC, "+.. ...-...-...."],
  ["ni", "505", KYCType.GENERIC, "+...-....-...."],
  ["ne", "227", KYCType.GENERIC, "+...-..-..-...."],
  ["ng", "234", KYCType.GENERIC, "+...-..-...-.."],
  ["nu", "683", KYCType.GENERIC, "+...-...."],
  ["nf", "672", KYCType.GENERIC, "+...-...-..."],
  ["kp", "850", KYCType.GENERIC, "+...-...-..."],
  ["mp", "1670", KYCType.GENERIC, "+.(...)...-...."],
  ["no", "47", KYCType.GENERIC, "+.. ... .. ..."],
  ["om", "968", KYCType.GENERIC, "+...-..-...-..."],
  ["pk", "92", KYCType.GENERIC, "+.. ...-......."],
  ["pw", "680", KYCType.GENERIC, "+...-...-...."],
  ["ps", "970", KYCType.GENERIC, "+...-..-...-...."],
  ["pa", "507", KYCType.GENERIC, "+...-...-...."],
  ["pg", "675", KYCType.GENERIC, "+...(...)..-..."],
  ["py", "595", KYCType.GENERIC, "+...(...)...-..."],
  ["pe", "51", KYCType.GENERIC, "+..(...)...-..."],
  ["ph", "63", KYCType.GENERIC, "+.. ... ...."],
  ["pn", "64", KYCType.GENERIC, ""],
  ["pl", "48", KYCType.UE, "+.. ...-...-..."],
  ["pt", "351", KYCType.UE, "+...-..-...-...."],
  ["pr", "1", KYCType.GENERIC, "+. (...) ...-....", 3, ["787", "939"]],
  ["qa", "974", KYCType.GENERIC, "+...-....-...."],
  ["re", "262", KYCType.GENERIC, "+...-.....-...."],
  ["ro", "40", KYCType.UE, "+..-..-...-...."],
  ["ru", "7", KYCType.GENERIC, "+. ... ...-..-..", 0],
  ["rw", "250", KYCType.GENERIC, "+...(...)...-..."],
  ["bl", "590", KYCType.GENERIC, "", 1],
  ["sh", "290", KYCType.GENERIC],
  ["kn", "1869", KYCType.GENERIC, "+.(...)...-...."],
  ["lc", "1758", KYCType.GENERIC, "+.(...)...-...."],
  ["mf", "590", KYCType.GENERIC, "", 2],
  ["pm", "508", KYCType.GENERIC],
  ["vc", "1784", KYCType.GENERIC, "+.(...)...-...."],
  ["ws", "685", KYCType.GENERIC, "+...-..-...."],
  ["sm", "378", KYCType.GENERIC, "+...-....-......"],
  ["st", "239", KYCType.GENERIC, "+...-..-....."],
  ["sa", "966", KYCType.GENERIC, "+...-..-...-...."],
  ["sn", "221", KYCType.GENERIC, "+...-..-...-...."],
  ["rs", "381", KYCType.GENERIC, "+...-..-...-...."],
  ["sc", "248", KYCType.GENERIC, "+...-.-...-..."],
  ["sl", "232", KYCType.GENERIC, "+...-..-......"],
  ["sg", "65", KYCType.GENERIC, "+.. ....-...."],
  ["sx", "1721", KYCType.GENERIC, "+.(...)...-...."],
  ["sk", "421", KYCType.UE, "+...(...)...-..."],
  ["si", "386", KYCType.UE, "+...-..-...-..."],
  ["sb", "677", KYCType.GENERIC, "+...-....."],
  ["so", "252", KYCType.GENERIC, "+...-.-...-..."],
  ["za", "27", KYCType.GENERIC, "+..-..-...-...."],
  ["gs", "500", KYCType.GENERIC, ""],
  ["kr", "82", KYCType.GENERIC, "+..-..-...-...."],
  ["ss", "211", KYCType.GENERIC, "+...-..-...-...."],
  ["es", "34", KYCType.UE, "+.. ... ... ...", PriorityType.HIGH],
  ["lk", "94", KYCType.GENERIC, "+..-..-...-...."],
  ["sd", "249", KYCType.GENERIC, "+...-..-...-...."],
  ["sr", "597", KYCType.GENERIC, "+...-...-..."],
  ["sj", "47", KYCType.GENERIC, ""],
  ["sz", "268", KYCType.GENERIC, "+...-..-..-...."],
  ["se", "46", KYCType.UE, "+.. .. ... .. .."],
  ["ch", "41", KYCType.GENERIC, "+.. .. ... .. .."],
  ["sy", "963", KYCType.GENERIC, "+...-..-....-..."],
  ["tw", "886", KYCType.GENERIC, "+...-....-...."],
  ["tj", "992", KYCType.GENERIC, "+...-..-...-...."],
  ["tz", "255", KYCType.GENERIC, "+...-..-...-...."],
  ["th", "66", KYCType.GENERIC, "+..-..-...-..."],
  ["tl", "670", KYCType.GENERIC, "+...-...-...."],
  ["tg", "228", KYCType.GENERIC, "+...-..-...-..."],
  ["tk", "690", KYCType.GENERIC, "+...-...."],
  ["to", "676", KYCType.GENERIC, "+...-....."],
  ["tt", "1868", KYCType.GENERIC, "+.(...)...-...."],
  ["tn", "216", KYCType.GENERIC, "+...-..-...-..."],
  ["tr", "90", KYCType.GENERIC, "+.. ... ... .. .."],
  ["tm", "993", KYCType.GENERIC, "+...-.-...-...."],
  ["tc", "1649", KYCType.GENERIC, "+.(...)...-...."],
  ["tv", "688", KYCType.GENERIC, "+...-....."],
  ["vi", "1340", KYCType.GENERIC, "+.(...)...-...."],
  ["ug", "256", KYCType.GENERIC, "+...(...)...-..."],
  ["ua", "380", KYCType.GENERIC, "+...(..)...-..-.."],
  ["ae", "971", KYCType.GENERIC, "+...-.-...-...."],
  ["gb", "44", KYCType.GENERIC, "+.. .... ......", PriorityType.HIGH],
  ["us", "1", KYCType.GENERIC, "+. (...) ...-....", 0],
  ["um", "1", KYCType.GENERIC, "", 2],
  ["uy", "598", KYCType.GENERIC, "+...-.-...-..-.."],
  ["uz", "998", KYCType.GENERIC, "+...-..-...-...."],
  ["vu", "678", KYCType.GENERIC, "+...-....."],
  ["va", "39", KYCType.GENERIC, "+.. .. .... ....", 1],
  ["ve", "58", KYCType.GENERIC, "+..(...)...-...."],
  ["vn", "84", KYCType.GENERIC, "+..-..-....-..."],
  ["wf", "681", KYCType.GENERIC, "+...-..-...."],
  ["eh", "212", KYCType.GENERIC, "+...-..-...."],
  ["ye", "967", KYCType.GENERIC, "+...-.-...-..."],
  ["zm", "260", KYCType.GENERIC, "+...-..-...-...."],
  ["zw", "263", KYCType.GENERIC, "+...-.-......"],
];

const DEFAULT_LANGUAGE = "en";

// we will build this in the loop below
var allCountryCodes = {};
var iso2Lookup = {};
var addCountryCode = function (iso2, dialCode, priority) {
  if (!(dialCode in allCountryCodes)) {
    allCountryCodes[dialCode] = [];
  }
  var index = priority || 0;
  allCountryCodes[dialCode][index] = iso2;
};

for (var index = 0; index < allCountries.length; index++) {
  // countries
  var country = allCountries[index];
  allCountries[index] = {
    iso2: country[0],
    dialCode: country[1],
    kyc: country[2],
    priority: country[4] || 0,
  };

  // format
  if (country[3]) allCountries[index].format = country[3];

  // area codes
  if (country[5]) {
    allCountries[index].hasAreaCodes = true;
    for (var j = 0; j < country[5].length; j++) {
      // full dial code is country code + dial code
      var dialCode = country[1] + country[5][j];
      addCountryCode(country[0], dialCode);
    }
  }
  iso2Lookup[allCountries[index].iso2] = allCountries[index];

  // dial codes
  addCountryCode(country[0], country[1], country[4]);
}

/**
 * Retrieve country translated name using isoCode
 * @param {String} isoCode Country IsoCode
 * @param {String} language User Language
 * @returns {String}
 */
const retrieveCountryName = (isoCode, language = DEFAULT_LANGUAGE) => {
  let file;
  try {
    /** Path is taken from serverless api file */
    file = fs.readFileSync(path.resolve(__dirname, `./locales/${language}.json`));

    file = JSON.parse(file);
  } catch (err) {
    console.error("[retrieveCountryName/retrieveFile]", err.toString ? err.toString() : err);
    language = DEFAULT_LANGUAGE;

    file = fs.readFileSync(path.resolve(__dirname, `./locales/${language}.json`));

    file = JSON.parse(file);
  }

  return file.COUNTRY_NAMES[`${isoCode.toLowerCase()}`];
};

module.exports = {
  allCountries: allCountries,
  iso2Lookup: iso2Lookup,
  allCountryCodes: allCountryCodes,
  retrieveCountryName: retrieveCountryName,
};
