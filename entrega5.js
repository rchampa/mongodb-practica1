db.prueba.drop();


//PRIMERA PARTE

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

dos = db.prueba.aggregate([
   {$project: {a_gt_b: {$cmp: ['$num-a','$num-b']}}},
    {$match: {a_gt_b:{$gt:0}}},
    {$group:{"_id":"$a_gt_b",total:{"$sum":1}}},
    {$project: {"_id":0,"total":1}}
], {
   explain: true
})


//RESULTADOS
x = {
	"stages" : [
		{
			"$cursor" : {
				"query" : {
					
				},
				"fields" : {
					"num-a" : 1,
					"num-b" : 1,
					"_id" : 1
				},
				"plan" : {
					"cursor" : "BasicCursor",
					"isMultiKey" : false,
					"scanAndOrder" : false,
					"allPlans" : [
						{
							"cursor" : "BasicCursor",
							"isMultiKey" : false,
							"scanAndOrder" : false
						}
					]
				}
			}
		},
		{
			"$project" : {
				"a_gt_b" : {
					"$cmp" : [
						"$num-a",
						"$num-b"
					]
				}
			}
		},
		{
			"$match" : {
				"a_gt_b" : {
					"$gt" : 0
				}
			}
		},
		{
			"$group" : {
				"_id" : "$a_gt_b",
				"total" : {
					"$sum" : {
						"$const" : 1
					}
				}
			}
		},
		{
			"$project" : {
				"_id" : false,
				"total" : true
			}
		}
	],
	"ok" : 1
}



// 1. ¿Como ha llevado a cabo la operación?
// No se selecciona un indice, se elige el recorrido de todos los documentos.
// 2. ¿Cúantos documentos ha tenido que consultar? 
//Todos.
// 3. ¿Cuánto tarda en realizar la consulta?
//53+3+3 microsengundos
// 4. Obten las estadísticas de ejecución de la consulta
//

dos = db.prueba.aggregate([   
	{$project: {a_gt_b: {$cmp: ['$num-a','$num-b']}}},    
	{$match: {a_gt_b:{$gt:0}}},    
	{$group:{"_id":"$a_gt_b",total:{"$sum":1}}},    
	{$project: {"_id":0,"total":1}}], 
	{   explain: true});

db.system.profile.find().limit(1).sort({ts:-1}).pretty();
y = {
	"op" : "command",
	"ns" : "test.$cmd",
	"command" : {
		"aggregate" : "prueba",
		"pipeline" : [
			{
				"$project" : {
					"a_gt_b" : {
						"$cmp" : [
							"$num-a",
							"$num-b"
						]
					}
				}
			},
			{
				"$match" : {
					"a_gt_b" : {
						"$gt" : 0
					}
				}
			},
			{
				"$group" : {
					"_id" : "$a_gt_b",
					"total" : {
						"$sum" : 1
					}
				}
			},
			{
				"$project" : {
					"_id" : 0,
					"total" : 1
				}
			}
		],
		"explain" : true,
		"cursor" : {
			
		}
	},
	"keyUpdates" : 0,
	"numYield" : 0,
	"lockStats" : {
		"timeLockedMicros" : {
			"r" : NumberLong(53),
			"w" : NumberLong(0)
		},
		"timeAcquiringMicros" : {
			"r" : NumberLong(3),
			"w" : NumberLong(3)
		}
	},
	"responseLength" : 502,
	"millis" : 0,
	"execStats" : {
		
	},
	"ts" : ISODate("2015-04-19T20:00:30.809Z"),
	"client" : "127.0.0.1",
	"allUsers" : [ ],
	"user" : ""
}



//SEGUNDA PARTE
db.ensayo.drop();

var productos = ["mesas","sillas"];
var colores = ["azul","marron","negro","rosa","rojo","blanco","amarillo"];
var fechafabricacion = new Date();
fechafabricacion.setYear(2000);

for (var i=0; i<90000; ++i){
	db.ensayo.insert(
	{
		producto: productos[Math.floor(Math.random()*productos.length)], 
		color: colores[Math.floor(Math.random()*colores.length)],
		fechafabricacion:fechafabricacion
	}
	);
}


uno = db.ensayo.aggregate(
    {$match: {producto:"mesas",color:"rojo"}},
    {$sort : {fechafabricacion : 1}},
    {$limit: 30 }
);


uno = db.ensayo.aggregate([   
	{$match: {producto:"mesas",color:"rojo"}},
    {$sort : {fechafabricacion : 1}},
    {$limit: 30 }], 
	{   explain: true});


db.ensayo.aggregate([{$match: {producto:"mesas",color:"rojo"}},{$sort : {fechafabricacion : 1}},{$limit: 30 }], {   explain: true});


db.ensayo.createIndex({producto:1,color:1});








