# KITTEN POST 

## PART 1 : Reprenez l'exercice kitten et réadapter le afin d'obtenir la structure suivante : 

```text
kittens/
├── routers/
│   └── kittens.js
├── controllers/
│   └── kittens.js
├── data/…
├── public/…
├── server.js
└── package.json
```
Refondée l'application afin de bien séparer chaque route et chaque controller

## PART 2 : Vous déclarerez 4 nouvelles routes (et leur contrôleur associé) dans le routeur "kittens" :

> ``/add`` pour afficher le formulaire

> ``/add`` pour récupérer les données du formulaire 
> >Vous devrez lors de l'ajout d'un chaton créer le fichier <id>.json et mettre à jour le fichier kittens.json. Utilisez le module fs de Node.js pour cela)

> ``/update/:id`` pour afficher un formulaire de modification
> ``/update/:id`` pour récupérer les données de formulaire et modifier les données du chaton, il faudra mettre à jour les fichier JSON