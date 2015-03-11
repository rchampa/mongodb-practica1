
db.media.drop();

libro = 
{
	"tipo": "libro",
	"titulo": "Java para todos", 
	"ISBN": "987-1-2344-5334-8", 
	"editorial": "Anaya",
	"Autor": ["Pepe Caballero","Isabel Sanz","Timoteo Marino"], 
	"capítulos": [
		{
			"capitulo":1, "titulo":"Primeros pasos en Java", 
			"longitud": 20
		}, 
		{	
			"capitulo":2,
			"titulo":"Primeros pasos en Java",
			"longitud": 25 
		}
	]
};

cd = { 
	"tipo": "CD", 
	"Artista":"Los piratas", 
	"Titulo": "Recuerdos", 
	"canciones": [
		{"cancion":1, "titulo":"Adios mi barco", "longitud": "3:20"}, 
		{"cancion":2, "titulo":"Pajaritos", "longitud": "4:15"}
	]
};

dvd = { 
	"tipo": "DVD", 
	"Titulo": "Matrix", 
	"estreno": 1999, 
	"actores": ["Keanu Reeves", "Carry-Anne Moss", "Laurence Fishburne", "Hugo Weaving", "Gloria Foster","Joe Pantoliano" ]
};


//ejercicio 1
lista_bulk = [libro,cd,dvd];
db.media.insert(lista_bulk);



// //ejercicio 2
//XXX Comentar este ejercicio para el restode ejercicios
actualizar_dvd = { "tipo": "DVD", "Titulo": "Matrix", "estreno": 1999, "genero":"accion" };
db.media.update({tipo:"DVD"},actualizar_dvd);

//ejercicio 3
nuevo_libro = { "tipo": "Libro", "Titulo": "Constantinopla", "capitulos":12, "leidos":3 };
db.media.insert(nuevo_libro);
incremento = 5;
db.media.update({tipo:"Libro"},{$inc:{leidos:incremento}});

//ejercicio 4
operacion_actualizar_dvd = { 
	$set:{genero: "ciencia ficción"} 
};
db.media.update({tipo:"DVD"},operacion_actualizar_dvd);

//ejercicio 5
operacion_actualizar_libro = { 
	$unset:{editorial: 1} 
};
db.media.update({titulo:"Java para todos"},operacion_actualizar_libro);

//ejercicio 6
nuevo_autor = "Maria Sancho";
operacion_anadir_autor = { $push: { Autor: nuevo_autor } };
db.media.update({titulo:"Java para todos"},operacion_anadir_autor);

//ejercicio 7
nuevos_actores=["Antonio Banderas","Brad Pitt"];
operacion_anadir_autor = { $push: { actores: { $each: nuevos_actores } } };
db.media.update({Titulo:"Matrix"},operacion_anadir_autor);

//ejercicio 8
nuevos_actores=["Joe Pantoliano","Brad Pitt", "Natalie Portman"];
operacion_anadir_autor = { $addToSet: { actores: { $each: nuevos_actores } } };
db.media.update({Titulo:"Matrix"},operacion_anadir_autor);

//ejercicio 9
db.media.update( {Titulo:"Matrix"}, { $pop: { actores: -1 } } );
db.media.update( {Titulo:"Matrix"}, { $pop: { actores: 1 } } );

//ejercicio 10
nuevos_actores=["Antonio Banderas","Joe Pantoliano"];
operacion_anadir_autor = { $push: { actores: { $each: nuevos_actores } } };
db.media.update({Titulo:"Matrix"},operacion_anadir_autor);

// //ejercicio 11
eliminar_actores=["Antonio Banderas","Joe Pantoliano"];
operacion_eliminar_autor = { $pullAll: { actores: eliminar_actores  } };
db.media.update({Titulo:"Matrix"},operacion_eliminar_autor);

// //ejercicio 12
nueva_cancion = {"cancion":5, "titulo":"El atardecer", "longitud": "6:50"};
operacion_anadir_cancion = { $push: { canciones: nueva_cancion } };
db.media.update({Titulo:"Recuerdos"},operacion_anadir_cancion);

// //ejercicio 13
operacion_actualizar_cancion = { 
	$set:{"canciones.$.cancion": 3} 
};
query =  { $and: [ { Titulo:"Recuerdos" }, { "canciones.titulo":"El atardecer" } ] };
db.media.update(query,operacion_actualizar_cancion);

//ejercicio 14
query =  {  Titulo:"Recuerdos" } ;
operacion_actualizar_artista= { $set:{Artista: "Los piratillas"} };
db.media.update(query,operacion_actualizar_artista);


//ejercicio 15
db.media.renameCollection("multimedia");
