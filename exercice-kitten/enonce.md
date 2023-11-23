Créez dans le dossier Exercices un dossier /inventory/.

Voici un exemple de document produit :

```js
{
    sale : true,
    price : 0.99,
    society : "Alex",
    qty: 19,
    size: { h: 11, w: 29, uom: "cm" },
    year : "2019-08-01"  
};

```
En vous aidant de la documentation de Mongoose, créez le schéma correspondant à ce document dans un nouveau fichier Product.js et exportez son modèle Mongoose (Documentation en ligne)
import mongoose from "mongoose";
const { Schema, model } = mongoose;

// TODO …

```js
export const ProductModel = /* TODO … */

```


Ajoutez des documents à votre collection.
Créez un fichier principal que vous appellerez save.js , importez votre modèle ainsi que les données depuis ./Data/products.js, du dossier d'exercice.

Puis à l'aide de l'instruction suivante insérer les données en base de données, écrire le code dans un fichier save.js


```js
await ProductModel.insertMany(/* VOS DOCUMENTS */);
```

Pour insérer les données tapez la ligne de commande suivante :


```js
node save.js
```

Vérifiez que les données sont bien en place à l'aide de la syntaxe suivante, dans le même fichier save.js


```js
const companies = await ProductModel.find({}, {_id:0, society:1, price:1, qty: 1 });
console.log('Companies:', companies);
```