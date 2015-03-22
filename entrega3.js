db.media.drop();

libro = { "tipo": "libro",
 "titulo": "Java para todos",
 "ISBN": "987-1-2344-5334-8",
 "editorial": "Anaya",
 "Autor": ["Pepe Caballero",
 "Isabel Sanz","Timoteo Marino",
 "Camilo Jose Cela"],
"capitulos": [
 {"capitulo":1,
 "titulo":	
 "Primeros pasos en Java", 
 "longitud": 20
 },
 {"capitulo":2,
 "titulo":"Bucles",
 "longitud": 25
 }
 ]
}
CD = { "tipo": "CD",
 "Artista":"Los piratas",
 "Titulo": "Recuerdos",
 "canciones": [
 {"cancion":1,
 "titulo":"Adios mi barco",
 "longitud": "3:20"
 },
 {"cancion":2,
 "titulo":"Pajaritos",
 "longitud": "4:15"
 }
 ]
}
DVD = { "tipo": "DVD",
 "Titulo": "Matrix",
 "estreno": 1999,
 "actores": [
 "Keanu Reeves",
 "Carry-Anne Moss",
 "Laurence Fishburne",
 "Hugo Weaving",
 "Gloria Foster",
 "Joe Pantoliano"
 ]
}
DVD2 = { "tipo": "DVD",
 "Titulo": "Matrix Reloaded",
 "estreno": 2000,
 "actores": [
 "Keanu Reeves",
 "Carry-Anne Moss",
 "Laurence Fishburne",
 "Hugo Weaving",
 "Gloria Foster",
 "Joe Pantoliano"
 ]
}

//Insercion extra
CD2 = { "tipo": "CD",
"Artista":"Los piratas",
"Titulo": "Recuerdos",
"canciones": [{"cancion":1,
"titulo":"Adios mi barco",
"longitud": "3:20"},
{"cancion":3
,
"titulo":"Pajaritos",
"longitud": "4:15" }]}

lista= [libro, CD, CD2, DVD, DVD2];
db.media.insert(lista);


//Ejercicio 1
db.media.find({"tipo" : "libro", "Autor" : {"$ne" : "Camilo José Cela"}})

//Ejercicio 2
db.media.find({"tipo" : "DVD", "estreno" : {"$in" : [1999,2005,2006]}} , {"actores" : 0})

//Ejercicio 3
db.media.find({"tipo" : "DVD", "estreno" : {"$nin" : [1999,2005,2009]}} , {"actores" : 0})

//Ejercicio 4 
db.media.find({"tipo" : "DVD", "estreno" : {"$in" : [1999,2005]}} , {"actores" : 0})

//Ejercicio 5
db.media.find({"tipo" : "libro", "Autor" : {"$in" : ["Pepe Caballero", "Isabel Sanz"]}, "capitulos.titulo" : "Bucles"})

//Ejercicio 7
//3 primeros
db.media.find({"Titulo": "Matrix"}, { "actores" : {"$slice" : 3}})
//3 ultimos
db.media.find({"Titulo": "Matrix"}, { "actores" : {"$slice" : -3}})
//3 primeros saltandose los 2 primeros
db.media.find({"Titulo": "Matrix"}, { "actores" : {"$slice" : [2,3]}})
//4 actores saltandose los 5 ultimos
db.media.find({"Titulo": "Matrix"}, { "actores" : {"$slice" : [-5,4]}})

//Ejercicio 9
db.media.find({"tipo" : "DVD" ,"estreno" : {"$mod" : [2,1]}}, {"actores" : 0}) // [divisor, resto]

//Ejercicio 11
db.media.find({"actores" : {"$ne" : null}}) // 

//Ejercicio 13
db.media.find({"canciones" : {"$type" : 3}})

//Ejercicio 14 
//Insertamos el nuevo documentos CD2
db.media.find({"tipo" : "CD" ,"canciones" : {"$elemMatch" : {"titulo" : "Pajaritos", "cancion" : 2}}})

//Ejercicio 15 // NO SE PORQUE NO FUNCIONA??''' en teoria con negarlo iria
db.media.find({"tipo" : "CD" ,"canciones" : { "$ne" : {"$elemMatch" :  {"titulo" : "Pajaritos", "cancion" : 2}}}})

//Ejercicio 17
db.media.find({"Artista" : /piratas/i })
