# Rendu Tests E2E sur le cas de saucedemo.com
Binome : SAFAR REMALI Farah et ?

## Plan et contexte :
j'ai mis en place playwwright via le tutoriel de leur site (avec l'extension de VSCode), j'ai aussi suivie quelques tutoriel trouvé sur youtube qui portait comme par hazard exactement sur le site de sauceDemo (bien sur je l'ai pris comme template pour l'écriture de mes tests j'ai quand meme pas tout calqué faut pas déconner y avais pas tant de chose que ça dans les vidéos, vous trouverez les liens dans ressources et vidéos consulté à la toute fin du readme)


# Stratégie de tests :
- Happy path : en tant qu'utilisateur standard qui fait des choses standard (se connecter, ajouter un produit au panier, puis un autre produit au panier, puis valide le panier et passe au paiement avec le paiement qui se passe bien)
- dans un premier lieux testé fonctionnalité par fonctionnalité (login, ajout au panier, retrait du panier, filtre des produits)
- en second lieu des tests de flux de navigation (par exemple : login puis ajout au panier puis retrait du panier puis logout)
- je suis pas sur de devoir testé les autres types de connexions autre que les users standard 


## Cas de test :
Interface TS 
- Given : l'utilisateur se trouve sur la page d'accueil du site https://www.saucedemo.com/
- when : l'utilisateur rentre ses identifiants de standrad user
- then : l'utilisateur est connecté au tant que standard user et la page d'accueil du site est ouverte sur la liste des produits disponible

## needs to be rendered :

Cas de tests : Add to cart
	Given : l'Utilisateur est connecté sur le site au tant que standard user et la page des produits disponible s'affiche 
	When : l'utilisateur ajoute le produir "Sauce Labs Backpack" dans son panier
	Then : l'article est ajouté dans le panier (une petite icone avec le nombre d'articles dans le panier s'affiche en haut à droite de la page)
	
Case de test 2 : filtre 
	Given : l'Utilisateur est connecté sur le site au tant que standard user et la page des produits disponible ordonée par défault en ordre alphabétique de A à Z
	When : l'utilisateur filtre les produits sur les noms pour les afficher dans l'ordre de Z à A
	Then : la page actuel qui affiche les produits change et l'utilisateur percoit que les produits sont afficher dans l'ordre alphabétique de Z vers A
	
Cas de tests 3 : Panier
	Given : l'Utilisateur percoit le contenue de son panier, il y a 3 articles dedans "Sauce Labs Backpack" "Sauce Labs Onesie" et "Test.allTheThings() T-Shirt (Red)" le prix vaut 40 euros
	When : l'utilisateur retire le produir "Sauce Labs Backpack" de son panier
	Then : le panier contient uniquement "Sauce Labs Onesie" et "Test.allTheThings() T-Shirt (Red)" le prix vaut 25 euros

Glossaire : produit, panier et cohérence des termes
Actions : User ajoute/retir => doit etre cohérent


Cas d'un DSL :
	- Spec
	 addToCart(String : ProductLabel)
	removeFromCart(String : ProductLabel)
	- Perception :
		getPercievedProducts() : 



## Travail à réaliser
Installer Playwright => done
- Le système à tester : https://www.saucedemo.com
- Prise en main de ce système
    - Définir un DSL de test (interface TS ou Java, ou bibliothèque de fonctions) 
    - Actions (ajouter le produit X au panier...)
- Perceptions (La pastille du panier indique le nombre N...)
- Trouver une stratégie de production de vos cas de test
- Traduire vos cas de tests en tests opérables par votre DSL
- Interpréteur du DSL : Implémenter ce DSL à l'aide de Playwright
- Outillage : cours VA, stratégie, LLM (donner vos prompts), agents pour l'implémentation (expliquer comment vous faites).  
Vous restez responsable de ce que vous rendez

## Rendu mercredi 25 novembre 8h
- Via GitHub, m'ajouter parmis les membres : AlexDmr
    - Donnez les noms des binômes dans le README.md
    - Expliquez votre stratégie dans README.md
- Liste des scénarios (en français ou anglais)
    - Pour chacun, correspondance avec le cas de test exprimé en Typescript (ou Java)
    - Raison d'être des tests (stratégie de production de vos cas de tests)
- Description de votre DSL de test
    - Correspondances avec les tâches et les concepts (on ne demande pas de rendre un modèle de concepts et tâche, on veut juste que votre DSL soit de ce niveau d'abstraction là)
    - DSL interface (Typescript, Java) ou bibliothèque de fonctions
    - Quel stratégie d'implémentation de ce DSL ?

---  
### resources et vidéo consulté :
- [Setting up the playwrite extention on vscode](https://playwright.dev/docs/getting-started-vscode) 
- https://www.youtube.com/watch?v=yTtcUqpkzfY
- https://www.youtube.com/watch?v=VDQlN_Ye9t0

