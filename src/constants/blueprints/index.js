// The lanes are grouped according to the origin of their direction.
// 0 degrees is South, 90 is West, etc.
const Blueprints = {
    K071:{
	x:710,
	y:150,
	streets:[
	    { rotation:240, lanes:[101, 111, 121]},
	    { rotation:320, lanes:[21, 22, 31]},
	    { rotation:40, lanes:[41, 51, 61]},
	    { rotation:135, lanes:[81,82,91]}
	]
    },
    K097:{
	x:900,
	y:591,
	streets:[
	    { rotation:160, lanes:[81, 82]},
	    { rotation:225, lanes:[101, 102, 111]},
	    { rotation:340, lanes:[21, 22]}
	]
    },
    K124:{
	x:465,
	y:611,
	streets:[
	    { rotation:280, lanes:[11, 21, 22]},
	    { rotation:45, lanes:[51, 52, 53]},
	    { rotation:100, lanes:[81, 82]},
	    { rotation:160, lanes:[101, 102, 103, 121, 122]}
	]
    },
    /* K128 also includes data from "Westeinde" but we dont show it cause its so small */
    K128:{
	x:564,
	y:474,
	streets:[
	    { rotation:155, lanes:[71, 72, 81, 82]},
	    { rotation:330, lanes:[21, 22, 23]},
	    { rotation:60, lanes:[51, 61, 62]}
	]
    },
    K158:{
	x:789,
	y:546,
	streets:[
	    { rotation:50, lanes:[52,51]},
	    { rotation:270, lanes:[111, 112]},
	    { rotation:45, lanes:[21, 22]},
	    { rotation:144, lanes:["V081", "V082", "V091"]}
	]
    },
    K159:{
	x:472,
	y:355,
	streets:[
	    { rotation:145, lanes:[51, 52]},
	    { rotation:140, lanes:[82]},
	    { rotation:230, lanes:[111, 112]},
	    { rotation:320, lanes:[22]}
	]
    },
    K184:{
	x:54,
	y:561,
	streets:[
	    { rotation:57, lanes:[51, 52]},
	    { rotation:147, lanes:[81, 82, 91, 92]},
	    { rotation:242, lanes:[111, 121, 122]},
	    { rotation:336, lanes:[11, 12, 21]}
	]
    },
    K189:{
	x:668,
	y:669,
	streets:[
	    { rotation:0, lanes:[41, 51, 52, 61]},
	    { rotation:90, lanes:[71, 81, 82]},
	    { rotation:180, lanes:[111, 121, 122]},
	    { rotation:270, lanes:[21, 31, 32]}
	]
    },
    K206:{
	x:701,
	y:609,
	streets:[
	    { rotation:31, lanes:[51, 52, 61]},
	    { rotation:223, lanes:[71, 81, 82, 91, 92]},
	    { rotation:211, lanes:[101, 111, 112, 121]},
	    { rotation:270, lanes:[21, 22, 31]}
	]
    },
    K225:{
	x:584,
	y:729,
	streets:[
	    { rotation:60, lanes:["04_1", "05_1", "05_2"]},
	    { rotation:154, lanes:["08_1", "08_2"]},
	    { rotation:240, lanes:["10_1", "11_1", "11_2"]},
	    { rotation:336, lanes:["01_1", "02_1", "02_2"]}
	]
    },
    K270:{
	x:448,
	y:839,
	streets:[
	    { rotation:53, lanes:[ 51, 52, 61]},
	    { rotation:130, lanes:[81, 91]},
	    { rotation:233, lanes:[111, 112]},
	    { rotation:330, lanes:[21, 31]}
	]
    },
    K302:{
	x:833,
	y:434,
	streets:[
	    { rotation:55, lanes:[ "04_1", "04_2", "05_1", "05_2", "06_1", "06_2"]},
	    { rotation:140, lanes:["07_1", "08_1", "08_2"]},
	    { rotation:235, lanes:["10_1", "11_1", "11_2", "12_1", "12_2"]},
	    { rotation:320, lanes:["02_1", "02_2", "03_1", "03_2"]}
	]
    },
    K304:{
	x:776,
	y:368,
	streets:[
	    { rotation:50, lanes:[ 41, 51, 52]},
	    { rotation:140, lanes:[81, 82]},
	    { rotation:230, lanes:[111, 112, 121]},
	    { rotation:320, lanes:[11, 21, 31]}
	]
    },
    K305:{
	x:737,
	y:326,
	streets:[
	    { rotation:60, lanes:[ 41, 42, 51, 52, 61]},
	    { rotation:240, lanes:[111, 112, 121, 122]},
	    { rotation:330, lanes:[11, 12, 31, 32]}
	]
    },
    K402:{
	x:698,
	y:345,
	streets:[
	    { rotation:150, lanes:[81, 82, 91, 92, 93]},
	    { rotation:240, lanes:[101, 102, 601, 121, 122]},
	    { rotation:330, lanes:[11, 12, 21, 22]}
	]
    },
    K405:{
	x:661,
	y:274,
	streets:[
	    { rotation:65, lanes:[ 41, 51]},
	    { rotation:150, lanes:[71, 81, 82, 91]},
	    { rotation:145, lanes:[111, 112]},
	    { rotation:330, lanes:[21, 22, 31, 32]}
	]
    },
    K406:{
	x:635,
	y:228,
	streets:[
	    { rotation:140, lanes:[81, 82, 91]},
	    { rotation:230, lanes:[101, 121]},
	    { rotation:320, lanes:[11, 21, 22]}
	]
    },
    K414:{
	x:827,
	y:492,
	streets:[
	    { rotation:50, lanes:[ 51, 61]},
	    { rotation:145, lanes:[71, 81, 82, 91, 92]},
	    { rotation:281, lanes:[101, 111, 121, 122]},
	    { rotation:325, lanes:[11, 12, 21, 22]}
	]
    },
    K424:{
	x:233,
	y:651,
	streets:[
	    { rotation:68, lanes:[ 41, 51, 61]},
	    { rotation:144, lanes:[71, 81, 82, 91]},
	    { rotation:236, lanes:[101, 111, 121, 122]},
	    { rotation:310, lanes:[11, 21, 22, 31]}
	]
    },
    K430:{
	x:420,
	y:534,
	streets:[
	    { rotation:215, lanes:[111,112] },
	    { rotation:325, lanes:[22, 21] },
	    { rotation:45, lanes:[51, 52, 61] },
	    { rotation:180, lanes:[81,82,83] },
	]
    },
    K703:{
	x:450,
	y:326,
	streets:[
	    { rotation:55, lanes:[ "05_1", "05_2"]},
	    { rotation:165, lanes:["08_1", "08_2", "09_1"]},
	    { rotation:240, lanes:["11_1", "11_2"]},
	    { rotation:320, lanes:["02_1", "02_2", "03_1"]}
	]
    },
    /* TODO: K704, K707, and K711 */
}

export default Blueprints;
