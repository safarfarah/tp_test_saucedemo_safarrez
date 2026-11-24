# Rendu — Tests E2E sur le cas de saucedemo.com

**Binôme :** SAFAR REMALI Farah et ?

---

## Plan et contexte

J'ai mis en place Playwright via le tutoriel officiel du site (avec l'extension VS Code). J'ai également suivi quelques tutoriels vidéo sur YouTube qui portaient justement sur le site SauceDemo. Je m'en suis servi comme base de départ pour structurer mes tests, tout en les adaptant et en les complétant pour répondre aux objectifs du projet (les liens se trouvent dans la section *Ressources et vidéos consultées* à la fin de ce document).

## Utilisation de l'IA

### Écriture du rapport et du glossaire
* **Prompt utilisé :** *« Corrige les fautes d'orthographe, les incohérences au niveau des phrases et au niveau des termes (par exemple, si "article" est utilisé au lieu de "produit", remplace "article" par "produit"). le resultat doit etre écrit en markdown »*

---

## Stratégie de tests

* **Parcours nominal (*Happy Path*) :** En tant qu'utilisateur standard (`standard_user`), réaliser un parcours d'achat complet (se connecter, ajouter un premier produit au panier, ajouter un second produit au panier, valider le panier et finaliser le paiement avec succès).
* **Niveau 1 — Tests unitaires par fonctionnalité :** Tester chaque fonctionnalité indépendamment (connexion, ajout au panier, retrait du panier, tri des produits).
* **Niveau 2 — Tests de flux de navigation :** Tester des enchaînements complets d'actions au sein d'un même scénario isolé (par exemple : connexion → ajout au panier → retrait du panier → déconnexion).
* **Périmètre des comptes utilisateurs :** À évaluer s'il est pertinent de couvrir d'autres profils utilisateurs que `standard_user` (ex. `locked_out_user`).

### Conseils de l'IA sur la stratégie

> **Prompt utilisé :** *« Aide-moi à peaufiner ma stratégie et mon plan de test pour le site SauceDemo en suivant les bonnes pratiques. »*
>
> **Extrait retenu :**
> **Tester « fonctionnalité par fonctionnalité » vs « flux de navigation »**
> Ton découpage en deux niveaux est pertinent, mais il demande une précision importante pour Playwright :
>
> * **Niveau 1 — Tests ciblés par fonctionnalité :** Tester séparément la connexion, l'ajout/retrait au panier ou le tri des produits correspond exactement à la bonne pratique d'isolation des tests recommandée par Playwright. Chaque test doit s'exécuter de manière totalement indépendante (avec sa propre session, ses cookies et son stockage local) pour éviter les échecs en cascade et faciliter le débogage.
> * **Niveau 2 — Tests de flux complets :** En automatisation E2E, un test ne doit jamais dépendre de l'état laissé par le test précédent. Si tu veux tester un flux complet (par exemple : connexion → ajout → retrait → déconnexion), ce flux doit être contenu dans **un seul et même test isolé**, et non enchaîné sur plusieurs tests dépendants.
>
> **Astuce d'architecture :** Pour tester tes fonctionnalités isolées (ex. tri ou panier) sans réécrire manuellement l'étape de connexion à chaque fois, Playwright préconise d'utiliser des hooks comme `beforeEach` ou de réutiliser un état authentifié via les dépendances de projets.

---

## Cas de test

### Cas de test 1 : Connexion (`standard_user`)
* **Given :** L'utilisateur se trouve sur la page de connexion du site `https://www.saucedemo.com/`.
* **When :** L'utilisateur saisit les identifiants de `standard_user` et valide.
* **Then :** L'utilisateur est connecté en tant que `standard_user` et la page catalogue s'ouvre sur la liste des produits disponibles.

### Cas de test 2 : Ajout d'un produit au panier (*Add to cart*)
* **Given :** L'utilisateur est connecté sur le site en tant que `standard_user` et la page des produits disponibles s'affiche.
* **When :** L'utilisateur ajoute le produit `"Sauce Labs Backpack"` à son panier.
* **Then :** Le produit est ajouté au panier (une pastille indiquant le nombre de produits dans le panier s'affiche en haut à droite de la page).

### Cas de test 3 : Tri des produits (*Filtre*)
* **Given :** L'utilisateur est connecté sur le site en tant que `standard_user` et la page des produits disponibles est triée par défaut par ordre alphabétique de A à Z.
* **When :** L'utilisateur trie les produits par nom pour les afficher dans l'ordre alphabétique inverse (de Z à A).
* **Then :** La liste affichée à l'écran se met à jour et l'utilisateur perçoit que les produits sont classés de Z à A.

### Cas de test 4 : Retrait d'un produit du panier
* **Given :** L'utilisateur consulte son panier qui contient 3 produits (`"Sauce Labs Backpack"`, `"Sauce Labs Onesie"` et `"Test.allTheThings() T-Shirt (Red)"`) pour un montant total de 40 €.
* **When :** L'utilisateur retire le produit `"Sauce Labs Backpack"` de son panier.
* **Then :** Le panier contient uniquement `"Sauce Labs Onesie"` et `"Test.allTheThings() T-Shirt (Red)"` pour un montant total de 25 €.

### Cas de test 5 : Connexion refusée avec un compte verrouillé (`locked_out_user`)
- **Given :** L'utilisateur se trouve sur la page de connexion du site `https://www.saucedemo.com/`.
- **When :** L'utilisateur saisit les identifiants de `locked_out_user` et valide.
- **Then :** L'utilisateur reste sur la page de connexion et un message d'erreur s'affiche indiquant que l'utilisateur est verrouillé (`"Epic sadface: Sorry, this user has been locked out."`).

### Cas de test 6 : Parcours d'achat complet (*Happy Path*)
- **Given :** L'utilisateur est connecté sur le site en tant que `standard_user` et la page des produits disponibles s'affiche.
- **When :** L'utilisateur ajoute deux produits au panier, ouvre le panier, lance la validation de commande (*Checkout*), renseigne ses informations de livraison, poursuit vers le récapitulatif puis finalise la commande.
- **Then :** La commande est confirmée et la page de confirmation de commande s'affiche à l'écran.

### Cas de test 7 : Flux de navigation complet avec ajout, retrait et déconnexion
- **Given :** L'utilisateur est connecté sur le site en tant que `standard_user` et la page des produits disponibles s'affiche.
- **When :** L'utilisateur ajoute un produit au panier, retire ce produit du panier, puis ouvre le menu latéral et clique sur la déconnexion (*Logout*).
- **Then :** Le panier est vide et l'utilisateur est redirigé vers la page de connexion `https://www.saucedemo.com/`.

---

## Glossaire et modélisation du DSL

### Vocabulaire métier (cohérence des termes)
* **Entités :** `produit`, `panier`, `utilisateur` (`user`).
* **Actions :** L'utilisateur **ajoute** ou **retire** un produit (lexique uniforme dans tous les scénarios et méthodes).

### Spécification du DSL (Interface TypeScript)
* **Actions :**
  * `addToCart(productLabel: string): Promise<void>`
  * `removeFromCart(productLabel: string): Promise<void>`
* **Perceptions :**
  * `getPerceivedProducts(): Promise<string[]>`

---


## Consignes de rendu (Mercredi 25 novembre à 8h)

* **Dépôt GitHub :** Ajouter `AlexDmr` parmi les membres du dépôt.
* **`README.md` :**
  * Indiquer les noms des membres du binôme.
  * Expliquer la stratégie de test. => Done
* **Scénarios et cas de test :**
  * Liste des scénarios (en français ou en anglais). => done ? at least a bit of them
  * Correspondance entre chaque scénario et son cas de test implémenté en TypeScript.
  * Justification des choix de tests (stratégie de production des cas de test).
* **Description du DSL de test :**
  * Correspondances avec les tâches et les concepts (même niveau d'abstraction).
  * Présentation de l'interface du DSL (TypeScript) ou de la bibliothèque de fonctions.
  * Explication de la stratégie d'implémentation de ce DSL.

---

## Ressources et vidéos consultées

* [Setting up the Playwright extension on VS Code](https://playwright.dev/docs/getting-started-vscode)
* [Tutoriel vidéo Playwright 1](https://www.youtube.com/watch?v=yTtcUqpkzfY)
* [Tutoriel vidéo Playwright 2](https://www.youtube.com/watch?v=VDQlN_Ye9t0)