db.media.drop();

CD = { 
	"tipo": "CD",
 	"Artista":"Los piratas",
 	"TituloCanción": "Recuerdos",
 	"canciones": 
 	[
 		{
 			"cancion":1,
 			"titulo":"Adios mi barco",
 			"longitud": "3:20"
 		},
 		{
 			"cancion":2,
 			"titulo":"Pajaritos",
 			"longitud": "4:15"
 		}
 	]
};

DVD = { 
	"tipo": "DVD",
 	"Titulo": "Matrix",
 	"estreno": 1999,
 	"actores": 
 	[
		 "Keanu Reeves",
		 "Carry-Anne Moss",
		 "Laurence Fishburne",
		 "Hugo Weaving",
		 "Gloria Foster",
		 "Joe Pantoliano"
 	]
};

lista_bulk = [CD,DVD];
db.media.insert(lista_bulk);

//ejericicio 1
uno = db.media.aggregate(
	{"$match":{"tipo":"CD"}},
	{"$project":{"tipo":1,"Artista":1,"TitulosCanciones":"$canciones.titulo"}}
);

DVD2 = { 
	"tipo": "DVD", 
 	"Titulo": "Blade Runner", 
 	"estreno":1982 
};
DVD22 = { 
	"tipo": "DVD", 
 	"Titulo": "Blade Runner", 
 	"estreno":1982 
};
DVD3 = {
	"tipo":"DVD", 
	"Titulo":"Batman", 
	"estreno": 1999 
};

DVD4 = {
	"tipo":"DVD",
	"Titulo":"Superman",
	"estreno": 1999
};

lista_bulk = [DVD2,DVD22,DVD3,DVD4];
db.media.insert(lista_bulk);

dos = db.media.aggregate(
	{"$match":{"tipo":"DVD"}},
	{"$group":{"_id":"$estreno",count:{"$sum":1}}},
	{"$project":{"_id":0,"estreno":"$_id","total":"$count"}}
);

tres = db.media.aggregate(
	{"$match":{"Titulo":"Matrix"}},
	{"$project":{"_id":0,"Titulo":1,"actor":"$actores"}},
	{"$unwind":"$actor"}
);

cuatro = db.media.aggregate(
	{"$match":{"Titulo":"Matrix"}},
	{"$project":{"_id":0,"Titulo":1,"actor":"$actores"}},
	{"$unwind":"$actor"},
	{"$sort":{"actor":1}},
	{"$skip":3}
);

seis = db.media.group(
	{	
		key:{Titulo:true},
		initial:{Total:0},
		reduce: function(items, acumulador){
			acumulador.Total +=1;
		}
	}
);


