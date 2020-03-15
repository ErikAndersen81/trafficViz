// The lanes are grouped according to the origin of their direction.
// 0 degrees is South, 90 is West, etc.
// Note: Currently only the coordinates are used.
const Blueprints = {
    K071:{
	latitude:52.104061,
	longitude:4.317273,
	streets:[
	    { rotation:240, lanes:[101, 111, 121]},
	    { rotation:320, lanes:[21, 22, 31]},
	    { rotation:40, lanes:[41, 51, 61]},
	    { rotation:135, lanes:[81,82,91]}
	]
    },
    K097:{
	latitude:52.062739,
	longitude:4.344412,
	streets:[
	    { rotation:160, lanes:[81, 82]},
	    { rotation:225, lanes:[101, 102, 111]},
	    { rotation:340, lanes:[21, 22]}
	]
    },
    K124:{
	latitude: 52.061415,
	longitude: 4.282957,
	streets:[
	    { rotation:280, lanes:[11, 21, 22]},
	    { rotation:45, lanes:[51, 52, 53]},
	    { rotation:100, lanes:[81, 82]},
	    { rotation:160, lanes:[101, 102, 103, 121, 122]}
	]
    },
    /* K128 also includes data from "Westeinde" but we dont show it cause its so small */
    K128:{
	latitude:52.073777,
	longitude:4.296604,
	streets:[
	    { rotation:155, lanes:[71, 72, 81, 82]},
	    { rotation:330, lanes:[21, 22, 23]},
	    { rotation:60, lanes:[51, 61, 62]}
	]
    },
    K158:{
	latitude:52.067337,
	longitude:4.328748,
	streets:[
	    { rotation:50, lanes:[52,51]},
	    { rotation:270, lanes:[111, 112]},
	    { rotation:45, lanes:[21, 22]},
	    { rotation:144, lanes:["V081", "V082", "V091"]}
	]
    },
    K159:{
	latitude:52.085032,
	longitude:4.283086,
	streets:[
	    { rotation:145, lanes:[51, 52]},
	    { rotation:140, lanes:[82]},
	    { rotation:230, lanes:[111, 112]},
	    { rotation:320, lanes:[22]}
	]
    },
    K184:{
	latitude:52.066086,
	longitude:4.224034,
	streets:[
	    { rotation:57, lanes:[51, 52]},
	    { rotation:147, lanes:[81, 82, 91, 92]},
	    { rotation:242, lanes:[111, 121, 122]},
	    { rotation:336, lanes:[11, 12, 21]}
	]
    },
    K189:{
	latitude:52.056135,
	longitude:4.311496,
	streets:[
	    { rotation:0, lanes:[41, 51, 52, 61]},
	    { rotation:90, lanes:[71, 81, 82]},
	    { rotation:180, lanes:[111, 121, 122]},
	    { rotation:270, lanes:[21, 31, 32]}
	]
    },
    K206:{
	latitude:52.06133,
	longitude:4.316302,
	streets:[
	    { rotation:31, lanes:[51, 52, 61]},
	    { rotation:223, lanes:[71, 81, 82, 91, 92]},
	    { rotation:211, lanes:[101, 111, 112, 121]},
	    { rotation:270, lanes:[21, 22, 31]}
	]
    },
    K225:{
	latitude:52.050428,
	longitude:4.299394,
	streets:[
	    { rotation:60, lanes:["04_1", "05_1", "05_2"]},
	    { rotation:154, lanes:["08_1", "08_2"]},
	    { rotation:240, lanes:["10_1", "11_1", "11_2"]},
	    { rotation:336, lanes:["01_1", "02_1", "02_2"]}
	]
    },
    K270:{
	latitude:52.040316,
	longitude:4.279738,
	streets:[
	    { rotation:53, lanes:[ 51, 52, 61]},
	    { rotation:130, lanes:[81, 91]},
	    { rotation:233, lanes:[111, 112]},
	    { rotation:330, lanes:[21, 31]}
	]
    },
    K302:{
	latitude:52.07783,
	longitude:4.335528,
	streets:[
	    { rotation:55, lanes:[ "04_1", "04_2", "05_1", "05_2", "06_1", "06_2"]},
	    { rotation:140, lanes:["07_1", "08_1", "08_2"]},
	    { rotation:235, lanes:["10_1", "11_1", "11_2", "12_1", "12_2"]},
	    { rotation:320, lanes:["02_1", "02_2", "03_1", "03_2"]}
	]
    },
    K304:{
	latitude:52.0841,
	longitude:4.326602,
	streets:[
	    { rotation:50, lanes:[ 41, 51, 52]},
	    { rotation:140, lanes:[81, 82]},
	    { rotation:230, lanes:[111, 112, 121]},
	    { rotation:320, lanes:[11, 21, 31]}
	]
    },
    K305:{
	latitude:52.087943,
	longitude:4.321109,
	streets:[
	    { rotation:60, lanes:[ 41, 42, 51, 52, 61]},
	    { rotation:240, lanes:[111, 112, 121, 122]},
	    { rotation:330, lanes:[11, 12, 31, 32]}
	]
    },
    K402:{
	latitude:52.085985,
	longitude:4.315787,
	streets:[
	    { rotation:150, lanes:[81, 82, 91, 92, 93]},
	    { rotation:240, lanes:[101, 102, 601, 121, 122]},
	    { rotation:330, lanes:[11, 12, 21, 22]}
	]
    },
    K405:{
	latitude:52.092652,
	longitude:4.31038,
	streets:[
	    { rotation:65, lanes:[ 41, 51]},
	    { rotation:150, lanes:[71, 81, 82, 91]},
	    { rotation:145, lanes:[111, 112]},
	    { rotation:330, lanes:[21, 22, 31, 32]}
	]
    },
    K406:{
	latitude:52.096577,
	longitude:4.306861,
	streets:[
	    { rotation:140, lanes:[81, 82, 91]},
	    { rotation:230, lanes:[101, 121]},
	    { rotation:320, lanes:[11, 21, 22]}
	]
    },
    K414:{
	latitude:52.07218,
	longitude:4.333983,
	streets:[
	    { rotation:50, lanes:[ 51, 61]},
	    { rotation:145, lanes:[71, 81, 82, 91, 92]},
	    { rotation:281, lanes:[101, 111, 121, 122]},
	    { rotation:325, lanes:[11, 12, 21, 22]}
	]
    },
    K424:{
	latitude:52.057587,
	longitude:4.249269,
	streets:[
	    { rotation:68, lanes:[ 41, 51, 61]},
	    { rotation:144, lanes:[71, 81, 82, 91]},
	    { rotation:236, lanes:[101, 111, 121, 122]},
	    { rotation:310, lanes:[11, 21, 22, 31]}
	]
    },
    K430:{
	latitude:52.068691,
	longitude:4.276305,
	streets:[
	    { rotation:215, lanes:[111,112] },
	    { rotation:325, lanes:[22, 21] },
	    { rotation:45, lanes:[51, 52, 61] },
	    { rotation:180, lanes:[81,82,83] },
	]
    },
    K703:{
	latitude:52.087862,
	longitude:4.280168,
	streets:[
	    { rotation:55, lanes:[ "05_1", "05_2"]},
	    { rotation:165, lanes:["08_1", "08_2", "09_1"]},
	    { rotation:240, lanes:["11_1", "11_2"]},
	    { rotation:320, lanes:["02_1", "02_2", "03_1"]}
	]
    },
    K704: { latitude: 52.084932, longitude: 4.2727 },
    K707: { latitude: 52.078994, longitude: 4.261542 },
    K711: { latitude: 52.095735, longitude: 4.286347 },
    /* TODO: 
     * K704: Latitude: 52.084932 | Longitude: 4.2727,
     * K707: Latitude: 52.078994 | Longitude: 4.261542,
     * K711: Latitude: 52.095735 | Longitude: 4.286347,
     */
}

export default Blueprints;
