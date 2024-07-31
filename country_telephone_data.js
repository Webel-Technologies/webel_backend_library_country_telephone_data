"use strict";

const KYCType = require("./enums/kycType");

const fs = require("fs");
const path = require("path");

var allCountries = [
  ["Afghanistan (‫افغانستان‬‎)", "af", "93", KYCType.Generic, "+..-..-...-...."],
  ["Åland Islands", "ax", "358", KYCType.Generic, ""],
  ["Albania (Shqipëri)", "al", "355", KYCType.Generic, "+...(...)...-..."],
  ["Algeria (‫الجزائر‬‎)", "dz", "213", KYCType.Generic, "+...-..-...-...."],
  ["American Samoa", "as", "1684", KYCType.Generic, "+.(...)...-...."],
  ["Andorra", "ad", "376", KYCType.Generic, "+...-...-..."],
  ["Angola", "ao", "244", KYCType.Generic, "+...(...)...-..."],
  ["Anguilla", "ai", "1264", KYCType.Generic, "+.(...)...-...."],
  ["Antarctica", "aq", "672", KYCType.Generic, ""],
  ["Antigua and Barbuda", "ag", "1268", KYCType.Generic, "+.(...)...-...."],
  ["Argentina", "ar", "54", KYCType.Generic, "+..(...)...-...."],
  ["Armenia (Հայաստան)", "am", "374", KYCType.Generic, "+...-..-...-..."],
  ["Aruba", "aw", "297", KYCType.Generic, "+...-...-...."],
  ["Australia", "au", "61", KYCType.Generic, "+.. ... ... ..."],
  ["Austria (Österreich)", "at", "43", KYCType.UE, "+..(...)...-...."],
  ["Azerbaijan (Azərbaycan)", "az", "994", KYCType.Generic, "+...-..-...-..-.."],
  ["Bahamas", "bs", "1242", KYCType.Generic, "+.(...)...-...."],
  ["Bahrain (‫البحرين‬‎)", "bh", "973", KYCType.Generic, "+...-....-...."],
  ["Bangladesh (বাংলাদেশ)", "bd", "880", KYCType.Generic, "+...-..-...-..."],
  ["Barbados", "bb", "1246", KYCType.Generic, "+.(...)...-...."],
  ["Belarus (Беларусь)", "by", "375", KYCType.Generic, "+...(..)...-..-.."],
  ["Belgium (België)", "be", "32", KYCType.UE, "+.. ... .. .. .."],
  ["Belize", "bz", "501", KYCType.Generic, "+...-...-...."],
  ["Benin (Bénin)", "bj", "229", KYCType.Generic, "+...-..-..-...."],
  ["Bermuda", "bm", "1441", KYCType.Generic, "+.(...)...-...."],
  ["Bhutan (འབྲུག)", "bt", "975", KYCType.Generic, "+...-.-...-..."],
  ["Bolivia", "bo", "591", KYCType.Generic, "+...-.-...-...."],
  ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387", KYCType.Generic, "+...-..-...."],
  ["Botswana", "bw", "267", KYCType.Generic, "+...-..-...-..."],
  ["Bouvet Island", "bv", "47", KYCType.Generic, ""],
  ["Brazil (Brasil)", "br", "55", KYCType.Generic, "+..-..-....-...."],
  ["British Indian Ocean Territory", "io", "246", KYCType.Generic, "+...-...-...."],
  ["British Virgin Islands", "vg", "1284", KYCType.Generic, "+.(...)...-...."],
  ["Brunei", "bn", "673", KYCType.Generic, "+...-...-...."],
  ["Bulgaria (България)", "bg", "359", KYCType.UE, "+...(...)...-..."],
  ["Burkina Faso", "bf", "226", KYCType.Generic, "+...-..-..-...."],
  ["Burundi (Uburundi)", "bi", "257", KYCType.Generic, "+...-..-..-...."],
  ["Cambodia (កម្ពុជា)", "kh", "855", KYCType.Generic, "+...-..-...-..."],
  ["Cameroon (Cameroun)", "cm", "237", KYCType.Generic, "+...-....-...."],
  [
    "Canada",
    "ca",
    "1",
    KYCType.Generic,
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
  ["Cape Verde (Kabu Verdi)", "cv", "238", KYCType.Generic, "+...(...)..-.."],
  ["Caribbean Netherlands", "bq", "599", KYCType.Generic, "+...-...-....", 1],
  ["Cayman Islands", "ky", "1345", KYCType.Generic, "+.(...)...-...."],
  ["Central African Republic (République centrafricaine)", "cf", "236", KYCType.Generic, "+...-..-..-...."],
  ["Chad (Tchad)", "td", "235", KYCType.Generic, "+...-..-..-..-.."],
  ["Chile", "cl", "56", KYCType.Generic, "+..-.-....-...."],
  ["China (中国)", "cn", "86", KYCType.Generic, "+.. ..-........"],
  ["Christmas Island", "cx", "61", KYCType.Generic, ""],
  ["Cocos (Keeling) Islands", "cc", "61", KYCType.Generic, ""],
  ["Colombia", "co", "57", KYCType.Generic, "+..(...)...-...."],
  ["Comoros (‫جزر القمر‬‎)", "km", "269", KYCType.Generic, "+...-..-....."],
  ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243", KYCType.Generic, "+...(...)...-..."],
  ["Congo (Republic) (Congo-Brazzaville)", "cg", "242", KYCType.Generic, "+...-..-...-...."],
  ["Cook Islands", "ck", "682", KYCType.Generic, "+...-..-..."],
  ["Costa Rica", "cr", "506", KYCType.Generic, "+... ....-...."],
  ["Côte d’Ivoire", "ci", "225", KYCType.Generic, "+...-..-...-..."],
  ["Croatia (Hrvatska)", "hr", "385", KYCType.UE, "+...-..-...-..."],
  ["Cuba", "cu", "53", KYCType.Generic, "+..-.-...-...."],
  ["Curaçao", "cw", "599", KYCType.Generic, "+...-...-....", 0],
  ["Cyprus (Κύπρος)", "cy", "357", KYCType.UE, "+...-..-...-..."],
  ["Czech Republic (Česká republika)", "cz", "420", KYCType.UE, "+...(...)...-..."],
  ["Denmark (Danmark)", "dk", "45", KYCType.UE, "+.. .. .. .. .."],
  ["Djibouti", "dj", "253", KYCType.Generic, "+...-..-..-..-.."],
  ["Dominica", "dm", "1767", KYCType.Generic, "+.(...)...-...."],
  ["Dominican Republic (República Dominicana)", "do", "1", KYCType.Generic, "+.(...)...-....", 2, ["809", "829", "849"]],
  ["Ecuador", "ec", "593", KYCType.Generic, "+...-.-...-...."],
  ["Egypt (‫مصر‬‎)", "eg", "20", KYCType.Generic, "+..(...)...-...."],
  ["El Salvador", "sv", "503", KYCType.Generic, "+... ....-...."],
  ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240", KYCType.Generic, "+...-..-...-...."],
  ["Eritrea", "er", "291", KYCType.Generic, "+...-.-...-..."],
  ["Estonia (Eesti)", "ee", "372", KYCType.UE, "+...-...-...."],
  ["Ethiopia", "et", "251", KYCType.Generic, "+...-..-...-...."],
  ["Falkland Islands (Islas Malvinas)", "fk", "500", KYCType.Generic, "+...-....."],
  ["Faroe Islands (Føroyar)", "fo", "298", KYCType.Generic, "+...-...-..."],
  ["Fiji", "fj", "679", KYCType.Generic, "+...-..-....."],
  ["Finland (Suomi)", "fi", "358", KYCType.UE, "+... .. .... ...."],
  ["France", "fr", "33", KYCType.UE, "+.. . .. .. .. .."],
  ["French Guiana (Guyane française)", "gf", "594", KYCType.Generic, "+...-.....-...."],
  ["French Polynesia (Polynésie française)", "pf", "689", KYCType.Generic, "+...-..-..-.."],
  ["French Southern and Antarctic Lands", "tf", "262", KYCType.Generic, ""],
  ["Gabon", "ga", "241", KYCType.Generic, "+...-.-..-..-.."],
  ["Gambia", "gm", "220", KYCType.Generic, "+...(...)..-.."],
  ["Georgia (საქართველო)", "ge", "995", KYCType.Generic, "+...(...)...-..."],
  ["Germany (Deutschland)", "de", "49", KYCType.UE, "+.. ... ......."],
  ["Ghana (Gaana)", "gh", "233", KYCType.Generic, "+...(...)...-..."],
  ["Gibraltar", "gi", "350", KYCType.Generic, "+...-...-....."],
  ["Greece (Ελλάδα)", "gr", "30", KYCType.UE, "+..(...)...-...."],
  ["Greenland (Kalaallit Nunaat)", "gl", "299", KYCType.Generic, "+...-..-..-.."],
  ["Grenada", "gd", "1473", KYCType.Generic, "+.(...)...-...."],
  ["Guadeloupe", "gp", "590", KYCType.Generic, "", 0],
  ["Guam", "gu", "1671", KYCType.Generic, "+.(...)...-...."],
  ["Guatemala", "gt", "502", KYCType.Generic, "+... ....-...."],
  ["Guernsey", "gg", "44", KYCType.Generic, ""],
  ["Guinea (Guinée)", "gn", "224", KYCType.Generic, "+...-..-...-..."],
  ["Guinea-Bissau (Guiné Bissau)", "gw", "245", KYCType.Generic, "+...-.-......"],
  ["Guyana", "gy", "592", KYCType.Generic, "+...-...-...."],
  ["Haiti", "ht", "509", KYCType.Generic, "+... ....-...."],
  ["Heard Island and McDonald Islands", "hm", "672", KYCType.Generic, ""],
  ["Honduras", "hn", "504", KYCType.Generic, "+...-....-...."],
  ["Hong Kong (香港)", "hk", "852", KYCType.Generic, "+... .... ...."],
  ["Hungary (Magyarország)", "hu", "36", KYCType.UE, "+..(...)...-..."],
  ["Iceland (Ísland)", "is", "354", KYCType.Generic, "+... ... ...."],
  ["India (भारत)", "in", "91", KYCType.Generic, "+.. .....-....."],
  ["Indonesia", "id", "62", KYCType.Generic, "+..-..-...-.."],
  ["Iran (‫ایران‬‎)", "ir", "98", KYCType.Generic, "+..(...)...-...."],
  ["Iraq (‫العراق‬‎)", "iq", "964", KYCType.Generic, "+...(...)...-...."],
  ["Ireland", "ie", "353", KYCType.UE, "+... .. ......."],
  ["Isle of Man", "im", "44", KYCType.Generic, ""],
  ["Israel (‫ישראל‬‎)", "il", "972", KYCType.Generic, "+...-.-...-...."],
  ["Italy (Italia)", "it", "39", KYCType.UE, "+.. ... ......", 0],
  ["Jamaica", "jm", "1876", KYCType.Generic, "+.(...)...-...."],
  ["Japan (日本)", "jp", "81", KYCType.Generic, "+.. ... .. ...."],
  ["Jersey", "je", "44", KYCType.Generic, ""],
  ["Jordan (‫الأردن‬‎)", "jo", "962", KYCType.Generic, "+...-.-....-...."],
  ["Kazakhstan (Казахстан)", "kz", "7", KYCType.Generic, "+. ... ...-..-..", 1],
  ["Kenya", "ke", "254", KYCType.Generic, "+...-...-......"],
  ["Kiribati", "ki", "686", KYCType.Generic, "+...-..-..."],
  ["Kosovo", "xk", "383", KYCType.Generic, ""],
  ["Kuwait (‫الكويت‬‎)", "kw", "965", KYCType.Generic, "+...-....-...."],
  ["Kyrgyzstan (Кыргызстан)", "kg", "996", KYCType.Generic, "+...(...)...-..."],
  ["Laos (ລາວ)", "la", "856", KYCType.Generic, "+...-..-...-..."],
  ["Latvia (Latvija)", "lv", "371", KYCType.UE, "+...-..-...-..."],
  ["Lebanon (‫لبنان‬‎)", "lb", "961", KYCType.Generic, "+...-.-...-..."],
  ["Lesotho", "ls", "266", KYCType.Generic, "+...-.-...-...."],
  ["Liberia", "lr", "231", KYCType.Generic, "+...-..-...-..."],
  ["Libya (‫ليبيا‬‎)", "ly", "218", KYCType.Generic, "+...-..-...-..."],
  ["Liechtenstein", "li", "423", KYCType.Generic, "+...(...)...-...."],
  ["Lithuania (Lietuva)", "lt", "370", KYCType.UE, "+...(...)..-..."],
  ["Luxembourg", "lu", "352", KYCType.UE, "+...(...)...-..."],
  ["Macau (澳門)", "mo", "853", KYCType.Generic, "+...-....-...."],
  ["Macedonia (FYROM) (Македонија)", "mk", "389", KYCType.Generic, "+...-..-...-..."],
  ["Madagascar (Madagasikara)", "mg", "261", KYCType.Generic, "+...-..-..-....."],
  ["Malawi", "mw", "265", KYCType.Generic, "+...-.-....-...."],
  ["Malaysia", "my", "60", KYCType.Generic, "+.. ..-....-...."],
  ["Maldives", "mv", "960", KYCType.Generic, "+...-...-...."],
  ["Mali", "ml", "223", KYCType.Generic, "+...-..-..-...."],
  ["Malta", "mt", "356", KYCType.UE, "+...-....-...."],
  ["Marshall Islands", "mh", "692", KYCType.Generic, "+...-...-...."],
  ["Martinique", "mq", "596", KYCType.Generic, "+...(...)..-..-.."],
  ["Mauritania (‫موريتانيا‬‎)", "mr", "222", KYCType.Generic, "+...-..-..-...."],
  ["Mauritius (Moris)", "mu", "230", KYCType.Generic, "+...-...-...."],
  ["Mayotte", "yt", "262", KYCType.Generic, ""],
  ["Mexico (México)", "mx", "52", KYCType.Generic, "+..-..-..-...."],
  ["Micronesia", "fm", "691", KYCType.Generic, "+...-...-...."],
  ["Moldova (Republica Moldova)", "md", "373", KYCType.Generic, "+...-....-...."],
  ["Monaco", "mc", "377", KYCType.Generic, "+...-..-...-..."],
  ["Mongolia (Монгол)", "mn", "976", KYCType.Generic, "+...-..-..-...."],
  ["Montenegro (Crna Gora)", "me", "382", KYCType.Generic, "+...-..-...-..."],
  ["Montserrat", "ms", "1664", KYCType.Generic, "+.(...)...-...."],
  ["Morocco (‫المغرب‬‎)", "ma", "212", KYCType.Generic, "+...-..-....-..."],
  ["Mozambique (Moçambique)", "mz", "258", KYCType.Generic, "+...-..-...-..."],
  ["Myanmar (Burma) (မြန်မာ)", "mm", "95", KYCType.Generic, "+..-...-..."],
  ["Namibia (Namibië)", "na", "264", KYCType.Generic, "+...-..-...-...."],
  ["Nauru", "nr", "674", KYCType.Generic, "+...-...-...."],
  ["Nepal (नेपाल)", "np", "977", KYCType.Generic, "+...-..-...-..."],
  ["Netherlands (Nederland)", "nl", "31", KYCType.UE, "+.. .. ........"],
  ["New Caledonia (Nouvelle-Calédonie)", "nc", "687", KYCType.Generic, "+...-..-...."],
  ["New Zealand", "nz", "64", KYCType.Generic, "+.. ...-...-...."],
  ["Nicaragua", "ni", "505", KYCType.Generic, "+...-....-...."],
  ["Niger (Nijar)", "ne", "227", KYCType.Generic, "+...-..-..-...."],
  ["Nigeria", "ng", "234", KYCType.Generic, "+...-..-...-.."],
  ["Niue", "nu", "683", KYCType.Generic, "+...-...."],
  ["Norfolk Island", "nf", "672", KYCType.Generic, "+...-...-..."],
  ["North Korea (조선 민주주의 인민 공화국)", "kp", "850", KYCType.Generic, "+...-...-..."],
  ["Northern Mariana Islands", "mp", "1670", KYCType.Generic, "+.(...)...-...."],
  ["Norway (Norge)", "no", "47", KYCType.Generic, "+.. ... .. ..."],
  ["Oman (‫عُمان‬‎)", "om", "968", KYCType.Generic, "+...-..-...-..."],
  ["Pakistan (‫پاکستان‬‎)", "pk", "92", KYCType.Generic, "+.. ...-......."],
  ["Palau", "pw", "680", KYCType.Generic, "+...-...-...."],
  ["Palestine (‫فلسطين‬‎)", "ps", "970", KYCType.Generic, "+...-..-...-...."],
  ["Panama (Panamá)", "pa", "507", KYCType.Generic, "+...-...-...."],
  ["Papua New Guinea", "pg", "675", KYCType.Generic, "+...(...)..-..."],
  ["Paraguay", "py", "595", KYCType.Generic, "+...(...)...-..."],
  ["Peru (Perú)", "pe", "51", KYCType.Generic, "+..(...)...-..."],
  ["Philippines", "ph", "63", KYCType.Generic, "+.. ... ...."],
  ["Pitcairn Islands", "pn", "64", KYCType.Generic, ""],
  ["Poland (Polska)", "pl", "48", KYCType.UE, "+.. ...-...-..."],
  ["Portugal", "pt", "351", KYCType.UE, "+...-..-...-...."],
  ["Puerto Rico", "pr", "1", KYCType.Generic, "+. (...) ...-....", 3, ["787", "939"]],
  ["Qatar (‫قطر‬‎)", "qa", "974", KYCType.Generic, "+...-....-...."],
  ["Réunion (La Réunion)", "re", "262", KYCType.Generic, "+...-.....-...."],
  ["Romania (România)", "ro", "40", KYCType.UE, "+..-..-...-...."],
  ["Russia (Россия)", "ru", "7", KYCType.Generic, "+. ... ...-..-..", 0],
  ["Rwanda", "rw", "250", KYCType.Generic, "+...(...)...-..."],
  ["Saint Barthélemy (Saint-Barthélemy)", "bl", "590", KYCType.Generic, "", 1],
  ["Saint Helena", "sh", "290", KYCType.Generic],
  ["Saint Kitts and Nevis", "kn", "1869", KYCType.Generic, "+.(...)...-...."],
  ["Saint Lucia", "lc", "1758", KYCType.Generic, "+.(...)...-...."],
  ["Saint Martin (Saint-Martin (partie française))", "mf", "590", KYCType.Generic, "", 2],
  ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508", KYCType.Generic],
  ["Saint Vincent and the Grenadines", "vc", "1784", KYCType.Generic, "+.(...)...-...."],
  ["Samoa", "ws", "685", KYCType.Generic, "+...-..-...."],
  ["San Marino", "sm", "378", KYCType.Generic, "+...-....-......"],
  ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239", KYCType.Generic, "+...-..-....."],
  ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966", KYCType.Generic, "+...-..-...-...."],
  ["Senegal (Sénégal)", "sn", "221", KYCType.Generic, "+...-..-...-...."],
  ["Serbia (Србија)", "rs", "381", KYCType.Generic, "+...-..-...-...."],
  ["Seychelles", "sc", "248", KYCType.Generic, "+...-.-...-..."],
  ["Sierra Leone", "sl", "232", KYCType.Generic, "+...-..-......"],
  ["Singapore", "sg", "65", KYCType.Generic, "+.. ....-...."],
  ["Sint Maarten", "sx", "1721", KYCType.Generic, "+.(...)...-...."],
  ["Slovakia (Slovensko)", "sk", "421", KYCType.UE, "+...(...)...-..."],
  ["Slovenia (Slovenija)", "si", "386", KYCType.UE, "+...-..-...-..."],
  ["Solomon Islands", "sb", "677", KYCType.Generic, "+...-....."],
  ["Somalia (Soomaaliya)", "so", "252", KYCType.Generic, "+...-.-...-..."],
  ["South Africa", "za", "27", KYCType.Generic, "+..-..-...-...."],
  ["South Georgia and the South Sandwich Islands", "gs", "500", KYCType.Generic, ""],
  ["South Korea (대한민국)", "kr", "82", KYCType.Generic, "+..-..-...-...."],
  ["South Sudan (‫جنوب السودان‬‎)", "ss", "211", KYCType.Generic, "+...-..-...-...."],
  ["Spain (España)", "es", "34", KYCType.UE, "+.. ... ... ..."],
  ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94", KYCType.Generic, "+..-..-...-...."],
  ["Sudan (‫السودان‬‎)", "sd", "249", KYCType.Generic, "+...-..-...-...."],
  ["Suriname", "sr", "597", KYCType.Generic, "+...-...-..."],
  ["Svalbard and Jan Mayen", "sj", "47", KYCType.Generic, ""],
  ["Swaziland", "sz", "268", KYCType.Generic, "+...-..-..-...."],
  ["Sweden (Sverige)", "se", "46", KYCType.UE, "+.. .. ... .. .."],
  ["Switzerland (Schweiz)", "ch", "41", KYCType.Generic, "+.. .. ... .. .."],
  ["Syria (‫سوريا‬‎)", "sy", "963", KYCType.Generic, "+...-..-....-..."],
  ["Taiwan (台灣)", "tw", "886", KYCType.Generic, "+...-....-...."],
  ["Tajikistan", "tj", "992", KYCType.Generic, "+...-..-...-...."],
  ["Tanzania", "tz", "255", KYCType.Generic, "+...-..-...-...."],
  ["Thailand (ไทย)", "th", "66", KYCType.Generic, "+..-..-...-..."],
  ["Timor-Leste", "tl", "670", KYCType.Generic, "+...-...-...."],
  ["Togo", "tg", "228", KYCType.Generic, "+...-..-...-..."],
  ["Tokelau", "tk", "690", KYCType.Generic, "+...-...."],
  ["Tonga", "to", "676", KYCType.Generic, "+...-....."],
  ["Trinidad and Tobago", "tt", "1868", KYCType.Generic, "+.(...)...-...."],
  ["Tunisia (‫تونس‬‎)", "tn", "216", KYCType.Generic, "+...-..-...-..."],
  ["Turkey (Türkiye)", "tr", "90", KYCType.Generic, "+.. ... ... .. .."],
  ["Turkmenistan", "tm", "993", KYCType.Generic, "+...-.-...-...."],
  ["Turks and Caicos Islands", "tc", "1649", KYCType.Generic, "+.(...)...-...."],
  ["Tuvalu", "tv", "688", KYCType.Generic, "+...-....."],
  ["U.S. Virgin Islands", "vi", "1340", KYCType.Generic, "+.(...)...-...."],
  ["Uganda", "ug", "256", KYCType.Generic, "+...(...)...-..."],
  ["Ukraine (Україна)", "ua", "380", KYCType.Generic, "+...(..)...-..-.."],
  ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971", KYCType.Generic, "+...-.-...-...."],
  ["United Kingdom", "gb", "44", KYCType.Generic, "+.. .... ......"],
  ["United States", "us", "1", KYCType.Generic, "+. (...) ...-....", 0],
  ["United States Minor Outlying Islands", "um", "1", KYCType.Generic, "", 2],
  ["Uruguay", "uy", "598", KYCType.Generic, "+...-.-...-..-.."],
  ["Uzbekistan (Oʻzbekiston)", "uz", "998", KYCType.Generic, "+...-..-...-...."],
  ["Vanuatu", "vu", "678", KYCType.Generic, "+...-....."],
  ["Vatican City (Città del Vaticano)", "va", "39", KYCType.Generic, "+.. .. .... ....", 1],
  ["Venezuela", "ve", "58", KYCType.Generic, "+..(...)...-...."],
  ["Vietnam (Việt Nam)", "vn", "84", KYCType.Generic, "+..-..-....-..."],
  ["Wallis and Futuna", "wf", "681", KYCType.Generic, "+...-..-...."],
  ["Western Sahara", "eh", "212", KYCType.Generic, "+...-..-...."],
  ["Yemen (‫اليمن‬‎)", "ye", "967", KYCType.Generic, "+...-.-...-..."],
  ["Zambia", "zm", "260", KYCType.Generic, "+...-..-...-...."],
  ["Zimbabwe", "zw", "263", KYCType.Generic, "+...-.-......"],
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
    name: country[0],
    iso2: country[1],
    dialCode: country[2],
    kyc: country[3],
    priority: country[5] || 0,
  };

  // format
  if (country[4]) allCountries[index].format = country[4];

  // area codes
  if (country[6]) {
    allCountries[index].hasAreaCodes = true;
    for (var j = 0; j < country[6].length; j++) {
      // full dial code is country code + dial code
      var dialCode = country[2] + country[6][j];
      addCountryCode(country[1], dialCode);
    }
  }
  iso2Lookup[allCountries[index].iso2] = allCountries[index];

  // dial codes
  addCountryCode(country[1], country[2], country[5]);
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
    file = fs.readFileSync(`./locales/${language}.json`);

    file = JSON.parse(file);
  } catch (err) {
    console.error("[retrieveCountryName/retrieveFile]", err.toString ? err.toString() : err);
    language = DEFAULT_LANGUAGE;

    file = fs.readFileSync(`./locales/${language}.json`);

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
