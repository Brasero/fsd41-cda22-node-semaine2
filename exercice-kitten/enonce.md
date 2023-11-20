# KITTEN POST 

## PART 1 : Reprenez l'exercice kitten et réadapter le afin d'obtenir la structure suivante : 

```text
exercice-kitten/
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


> ``/update/:id`` pour récupérer les données de formulaire et modifier les données du chaton,
> > il faudra mettre à jour les fichier JSON


## 📢 Point important !

Sachant que nous n'avons pas encore vu comment uploader des images avec Express, vous utiliserez un simple champs texte pour les photos de chats, et le service https://placekitten.com/ dans votre formulaire d'ajout.

Vous pourrez ensuite adapter l'affichage avec une simple condition, par exemple :

```js
    const kittenImage = kitten.image.startsWith("http")
    ? kitten.image
    : `/images/${kitten.image}`;

    res.send(`
        …
        <img src="${kittenImage}" alt="Photo de ${kitten.name}" >
        …
      `);
```