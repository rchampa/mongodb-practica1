db.prueba.drop();

for($i=1; $i<100; $i++){
	db.prueba.insert({
		"_id":ObjectId(),
		"producto":"mesa",
		"num-a":$i,
		"num-b":$i*2,
		"num-c":$i*3
	});

	db.prueba.insert({
		"_id":ObjectId(),
		"producto":"sillas",
		"num-a":$i*3,
		"num-b":$i,
		"num-c":$i*2
	});
}

uno = db.prueba.aggregate(
	{$project: {a_gt_b: {$cmp: ['$num-a','$num-b']}}},
    {$match: {a_gt_b:{$gt:0}}},
    {$group:{"_id":"$a_gt_b",total:{"$sum":1}}},
    {$project: {"_id":0,"total":1}}
);

// dos = db.prueba.aggregate(
// 	{$project: {a_gt_b: {$cmp: ['$num-a','$num-b']}}},
//     {$match: {a_gt_b:{$gt:0}}},
//     {$group:{"_id":"$a_gt_b",total:{"$sum":1}}},
//     {$project: {"_id":0,"total":1}}
// ).explain();


dos = db.prueba.aggregate([
   {$project: {a_gt_b: {$cmp: ['$num-a','$num-b']}}},
    {$match: {a_gt_b:{$gt:0}}},
    {$group:{"_id":"$a_gt_b",total:{"$sum":1}}},
    {$project: {"_id":0,"total":1}}
], {
   explain: true
})