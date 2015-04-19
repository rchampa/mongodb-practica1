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
		"num-b":$*i,
		"num-c":$i*2
	});
}