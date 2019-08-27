const state = {
  provinces: [
    {
      label: "MOUNTAIN PROVINCE",
      value: "1",
      region_id: "14"
    },
    {
      label: "IFUGAO",
      value: "2",
      region_id: "14"
    },
    {
      label: "BENGUET",
      value: "3",
      region_id: "14"
    },
    {
      label: "ABRA",
      value: "4",
      region_id: "14"
    },
    {
      label: "APAYAO",
      value: "5",
      region_id: "14"
    },
    {
      label: "KALINGA",
      value: "6",
      region_id: "14"
    },
    {
      label: "LA UNION",
      value: "7",
      region_id: "1"
    },
    {
      label: "ILOCOS NORTE",
      value: "8",
      region_id: "1"
    },
    {
      label: "ILOCOS SUR",
      value: "9",
      region_id: "1"
    },
    {
      label: "PANGASINAN",
      value: "10",
      region_id: "1"
    },
    {
      label: "NUEVA VIZCAYA",
      value: "11",
      region_id: "2"
    },
    {
      label: "CAGAYAN",
      value: "12",
      region_id: "2"
    },
    {
      label: "ISABELA",
      value: "13",
      region_id: "2"
    },
    {
      label: "QUIRINO",
      value: "14",
      region_id: "2"
    },
    {
      label: "BATANES",
      value: "15",
      region_id: "2"
    },
    {
      label: "BATAAN",
      value: "16",
      region_id: "3"
    },
    {
      label: "ZAMBALES",
      value: "17",
      region_id: "3"
    },
    {
      label: "TARLAC",
      value: "18",
      region_id: "3"
    },
    {
      label: "PAMPANGA",
      value: "19",
      region_id: "3"
    },
    {
      label: "BULACAN",
      value: "20",
      region_id: "3"
    },
    {
      label: "NUEVA ECIJA",
      value: "21",
      region_id: "3"
    },
    {
      label: "AURORA",
      value: "22",
      region_id: "3"
    },
    {
      label: "RIZAL",
      value: "23",
      region_id: "4"
    },
    {
      label: "CAVITE",
      value: "24",
      region_id: "4"
    },
    {
      label: "LAGUNA",
      value: "25",
      region_id: "4"
    },
    {
      label: "BATANGAS",
      value: "26",
      region_id: "4"
    },
    {
      label: "QUEZON",
      value: "27",
      region_id: "4"
    },
    {
      label: "OCCIDENTAL MINDORO",
      value: "28",
      region_id: "17"
    },
    {
      label: "ORIENTAL MINDORO",
      value: "29",
      region_id: "17"
    },
    {
      label: "ROMBLON",
      value: "30",
      region_id: "17"
    },
    {
      label: "PALAWAN",
      value: "31",
      region_id: "17"
    },
    {
      label: "MARINDUQUE",
      value: "32",
      region_id: "17"
    },
    {
      label: "CATANDUANES",
      value: "33",
      region_id: "5"
    },
    {
      label: "CAMARINES NORTE",
      value: "34",
      region_id: "5"
    },
    {
      label: "SORSOGON",
      value: "35",
      region_id: "5"
    },
    {
      label: "ALBAY",
      value: "36",
      region_id: "5"
    },
    {
      label: "MASBATE",
      value: "37",
      region_id: "5"
    },
    {
      label: "CAMARINES SUR",
      value: "38",
      region_id: "5"
    },
    {
      label: "CAPIZ",
      value: "39",
      region_id: "6"
    },
    {
      label: "AKLAN",
      value: "40",
      region_id: "6"
    },
    {
      label: "ANTIQUE",
      value: "41",
      region_id: "6"
    },
    {
      label: "NEGROS OCCIDENTAL",
      value: "42",
      region_id: "6"
    },
    {
      label: "ILOILO",
      value: "43",
      region_id: "6"
    },
    {
      label: "GUIMARAS",
      value: "44",
      region_id: "6"
    },
    {
      label: "NEGROS ORIENTAL",
      value: "45",
      region_id: "7"
    },
    {
      label: "CEBU",
      value: "46",
      region_id: "7"
    },
    {
      label: "BOHOL",
      value: "47",
      region_id: "7"
    },
    {
      label: "SIQUIJOR",
      value: "48",
      region_id: "7"
    },
    {
      label: "SOUTHERN LEYTE",
      value: "49",
      region_id: "8"
    },
    {
      label: "EASTERN SAMAR",
      value: "50",
      region_id: "8"
    },
    {
      label: "NORTHERN SAMAR",
      value: "51",
      region_id: "8"
    },
    {
      label: "SAMAR (WESTERN SAMAR)",
      value: "52",
      region_id: "8"
    },
    {
      label: "LEYTE",
      value: "53",
      region_id: "8"
    },
    {
      label: "BILIRAN",
      value: "54",
      region_id: "8"
    },
    {
      label: "ZAMBOANGA SIBUGAY",
      value: "55",
      region_id: "9"
    },
    {
      label: "ZAMBOANGA DEL NORTE",
      value: "56",
      region_id: "9"
    },
    {
      label: "ZAMBOANGA DEL SUR",
      value: "57",
      region_id: "9"
    },
    {
      label: "MISAMIS OCCIDENTAL",
      value: "58",
      region_id: "10"
    },
    {
      label: "BUKIDNON",
      value: "59",
      region_id: "10"
    },
    {
      label: "LANAO DEL NORTE",
      value: "60",
      region_id: "10"
    },
    {
      label: "MISAMIS ORIENTAL",
      value: "61",
      region_id: "10"
    },
    {
      label: "CAMIGUIN",
      value: "62",
      region_id: "10"
    },
    {
      label: "DAVAO ORIENTAL",
      value: "63",
      region_id: "11"
    },
    {
      label: "COMPOSTELA VALLEY",
      value: "64",
      region_id: "11"
    },
    {
      label: "DAVAO DEL SUR",
      value: "65",
      region_id: "11"
    },
    {
      label: "DAVAO OCCIDENTAL",
      value: "66",
      region_id: "11"
    },
    {
      label: "DAVAO DEL NORTE",
      value: "67",
      region_id: "11"
    },
    {
      label: "SOUTH COTABATO",
      value: "68",
      region_id: "12"
    },
    {
      label: "SULTAN KUDARAT",
      value: "69",
      region_id: "12"
    },
    {
      label: "COTABATO (NORTH COTABATO)",
      value: "70",
      region_id: "12"
    },
    {
      label: "SARANGANI",
      value: "71",
      region_id: "12"
    },
    {
      label: "AGUSAN DEL NORTE",
      value: "72",
      region_id: "16"
    },
    {
      label: "AGUSAN DEL SUR",
      value: "73",
      region_id: "16"
    },
    {
      label: "SURIGAO DEL SUR",
      value: "74",
      region_id: "16"
    },
    {
      label: "SURIGAO DEL NORTE",
      value: "75",
      region_id: "16"
    },
    {
      label: "DINAGAT ISLANDS",
      value: "76",
      region_id: "16"
    },
    {
      label: "TAWI-TAWI",
      value: "77",
      region_id: "15"
    },
    {
      label: "BASILAN",
      value: "78",
      region_id: "15"
    },
    {
      label: "SULU",
      value: "79",
      region_id: "15"
    },
    {
      label: "MAGUINDANAO",
      value: "80",
      region_id: "15"
    },
    {
      label: "LANAO DEL SUR",
      value: "81",
      region_id: "15"
    },
    {
      label: "NCR, CITY OF MANILA, FIRST DISTRICT (Not a Province)",
      value: "82",
      region_id: "13"
    },
    {
      label: "NCR, SECOND DISTRICT (Not a Province)",
      value: "83",
      region_id: "13"
    },
    {
      label: "NCR, THIRD DISTRICT (Not a Province)",
      value: "84",
      region_id: "13"
    },
    {
      label: "NCR, FOURTH DISTRICT (Not a Province)",
      value: "85",
      region_id: "13"
    },
    {
      label: "ZAMBOANGA CITY",
      value: "86",
      region_id: "9"
    },
    {
      label: "DAVAO CITY",
      value: "87",
      region_id: "11"
    },
    {
      label: "ILOILO CITY",
      value: "88",
      region_id: "6"
    },
    {
      label: "SANTIAGO CITY",
      value: "89",
      region_id: "2"
    },
    {
      label: "BUTUAN CITY",
      value: "90",
      region_id: "16"
    },
    {
      label: "GENERAL SANTOS CITY",
      value: "91",
      region_id: "12"
    },
    {
      label: "ILIGAN CITY",
      value: "92",
      region_id: "10"
    },
    {
      label: "CAGAYAN DE ORO CITY",
      value: "93",
      region_id: "10"
    },
    {
      label: "PUERTO PRINCESA CITY",
      value: "94",
      region_id: "17"
    },
    {
      label: "Regionwide (CAR)",
      value: "95",
      region_id: "14"
    },
    {
      label: "Regionwide (1)",
      value: "96",
      region_id: "1"
    },
    {
      label: "Regionwide (2)",
      value: "97",
      region_id: "2"
    },
    {
      label: "Regionwide (3)",
      value: "98",
      region_id: "3"
    },
    {
      label: "Regionwide (4A)",
      value: "99",
      region_id: "4"
    },
    {
      label: "Regionwide (5)",
      value: "100",
      region_id: "5"
    },
    {
      label: "Regionwide (6)",
      value: "101",
      region_id: "6"
    },
    {
      label: "Regionwide (7)",
      value: "102",
      region_id: "7"
    },
    {
      label: "Regionwide (8)",
      value: "103",
      region_id: "8"
    },
    {
      label: "Regionwide (9)",
      value: "104",
      region_id: "9"
    },
    {
      label: "Regionwide (10)",
      value: "105",
      region_id: "10"
    },
    {
      label: "Regionwide (11)",
      value: "106",
      region_id: "11"
    },
    {
      label: "Regionwide (12)",
      value: "107",
      region_id: "12"
    },
    {
      label: "Regionwide (CARAGA)",
      value: "108",
      region_id: "16"
    },
    {
      label: "Regionwide (ARMM)",
      value: "109",
      region_id: "15"
    },
    {
      label: "Regionwide (4B)",
      value: "110",
      region_id: "17"
    },
    {
      label: "Inter-regional",
      value: "111",
      region_id: "998"
    },
    {
      label: "Nationwide",
      value: "112",
      region_id: "999"
    }
  ]
};

const mutations = {};

const actions = {};

const getters = {
  //
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
