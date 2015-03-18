db.media.drop();

libro = { "tipo": "libro",
 "titulo": "Java para todos",
 "ISBN": "987-1-2344-5334-8",
 "editorial": "Anaya",
 "Autor": ["Pepe Caballero",
 "Isabel Sanz","Timoteo Marino",
 "Camilo José Cela"],
"capítulos": [
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

lista= [libro, CD, DVD, DVD2];
db.media.insert(lista);


//Ejercicio 1
db.media.find({"tipo" : "libro", "Autor" : {"$ne" : "Camilo José Cela"}})

//Ejercicio 2
db.media.find({"tipo" : "DVD", "estreno" : {"$in" : [1999,2005,2006]}} , {"actores" : 0})

//Ejercicio 3
db.media.find({"tipo" : "DVD", "estreno" : {"$nin" : [1999,2005,2009]}} , {"actores" : 0})

//Ejercicio 4 
db.media.find({"tipo" : "DVD", "estreno" : {"$in" : [1999,2005]}} , {"actores" : 0})


