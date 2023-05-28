# Help


### Rappel des contraintes:

Votre implémentation doit respecter les contraintes suivantes:

`1. Si A et B sont deux évenements en chevauchement, alors Largeur(A) = Largeur(B).`

`2. LargeurMax = largeur de la fenêtre`

`3. Si sur une plage horaire donnée, deux évenements A et B se chevauchent, alors Largeur(A) + Largeur(B) = LargeurMax`


### Illustration graphique du problème:

**1 event**

```
┌────────────┐
|            |
└────────────┘
```

**2 events**

```
┌─────┐┌─────┐         // OK     
|     |└─────┘
└─────┘
```

**3 events tels que 1, 2 et 3 se chevauchent, mais pas 1 et 3**

```
┌─────┐
|  1  |┌─────┐         // OK
└─────┘|     |
       |  2  |
┌─────┐|     |
|  3  |└─────┘
└─────┘
```

**Cette configuration ci-dessus répond à toutes les contraintes. Attention, celle ci-dessous ne satisfait pas la constrainte #2 :**

```
┌───┐
| 1 |┌───┐             
└───┘|   |
     | 2 |
     |   |┌───┐
     └───┘| 3 |         // <------ KO: la contrainte #2 n'est pas respectée
          └───┘
```


**Dans les schémas ci-dessous, on assume que la fenêtre a la largeur de l'event 1**

```
┌────────────┐
|     1      |         // 👌
└────────────┘

┌─────┐┌─────┐
|     ||  3  |
|  2  |└─────┘
|     |
└─────┘

┌─────┐
|  4  |┌─────┐
└─────┘|     |
       |  5  |
┌─────┐|     |
|  6  |└─────┘
└─────┘
```





```
┌────────────┐ 
|     1      |
└────────────┘      

┌─────┐┌─────┐
|     ||  3  |
|  2  |└─────┘
|     |
└─────┘

┌───┐┌───┐
|   || 5 |          // <----- KO: la contrainte #3 n'est pas respectée
| 4 |└───┘
|   |
└───┘
```

___