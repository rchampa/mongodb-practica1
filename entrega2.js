db.entrega2.drop();

libros = { "tipo": "libro",
 "titulo": "Java para todos",
 "ISBN": "987-1-2344-5334-8",
 "editorial": "Anaya",
 "Autor": ["Pepe Caballero",
 "Isabel Sanz","Timoteo Marino"],
"capítulos": [
 {"capitulo":1,
 "titulo":"Primeros pasos en Java",
 "longitud": 20
 },
 {"capitulo":2,
 "titulo":"Bucles",
 "longitud": 25
 }
 ]
}

CD = {"tipo": "CD",
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


// EJERCICIO 1
listabulk=[libros, CD, DVD]; //Las listas en javascript usan corchetes
db.entrega2.insert(listabulk);

//EJERCICIO 2
db.entrega2.find({"Titulo": "Matrix"} , {actores: 1 ,_id: 0})

//EJERCICIO 3
db.entrega2.find({"Titulo": "Matrix"} , {actores: 0})

//EJERCICIO 4
db.entrega2.find({"Titulo": "Matrix"} , {tipo: 1, Titulo:1 , _id:0})

//EJERCICIO 5
//No me lo muestra bien creo que es por la tilde??''
db.entrega2.find({"tipo": "libro", "editorial": "Anaya"} , {capítulos: 1})

//EJERCICIO 6db.entrega2.find({"canciones.titulo":"Pajaritos"})

//EJERCICIO 7
db.entrega2.find({"Autor":"Timoteo Marino"})
//alternativamente
db.entrega2.find({"Autor" : {"$in": ["Timoteo Marino"]}})

//EJERCICIO 8
db.entrega2.find().sort({tipo : -1})

//EJERCICIO 9
db.entrega2.find().limit(2).sort({tipo : -1}

//EJERCICIO 10
db.entrega2.find().limit(2).skip(1).sort({tipo : -1})

//EJERCICIO 11
db.entrega2.find().limit(2).skip(1).sort({tipo : -1})


//EJERCICIO 12
doc1 = { "tipo" : "DVD",
		"titulo" : "Blade Runner",
		"estreno" : 1982
}

doc2 = { "tipo" : "DVD",
		"titulo" : "Toy Story 3",
		"estreno" : 2010
}

extrabulk=[doc1, doc2]; 
db.entrega2.insert(extrabulk);
