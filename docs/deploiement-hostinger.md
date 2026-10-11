# Déploiement vers Hostinger — solution de secours par SSH

## Pourquoi ce document existe

Le bouton « Redéployer » de hPanel peut échouer avec l'erreur
« Échec de l'enregistrement des paramètres de déploiement »
(ticket Hostinger #23782492). Cette erreur se produit **côté panneau
Hostinger**, indépendamment de l'état du code ou du dépôt GitHub — elle
a été confirmée sans rapport avec le projet lui-même (build, lint et
typecheck réussissent ; le commit attendu est bien présent sur GitHub).

Ce document décrit une méthode de déploiement alternative, qui n'utilise
pas ce bouton et ne dépend donc pas de son bon fonctionnement : se
connecter en SSH au serveur Hostinger et mettre à jour directement le
code déjà déployé (le même dossier d'application, sans le supprimer ni
le recréer), puis demander un redémarrage normal de l'application.

**Important — ce qui n'a pas pu être vérifié depuis cet environnement :**
cet environnement de développement n'a accès ni à hPanel, ni à une
connexion SSH vers le serveur Hostinger, ni à aucune information sur le
compte. Tout ce qui suit repose sur le fonctionnement généralement connu
d'un hébergement Node.js sur ce type de panneau (candidature la plus
probable : une app Node.js gérée via Phusion Passenger, schéma commun
aux hébergements mutualisés avec gestionnaire d'applications Node.js).
**Chaque information marquée ⚠️ doit être confirmée par vous-même dans
hPanel ou auprès du support Hostinger avant la première utilisation.**

## Option A — déploiement manuel immédiat (le plus rapide)

Si vous avez besoin de publier le commit `193f5d5` dès maintenant, sans
attendre la mise en place de l'automatisation ci-dessous :

1. Dans hPanel → **Avancé → Accès SSH**, vérifiez que le SSH est activé
   pour votre hébergement, et notez l'hôte, le port et le nom
   d'utilisateur. ⚠️ Disponibilité à confirmer selon votre plan exact.
2. Connectez-vous : `ssh -p <port> <utilisateur>@<hôte>`
3. Repérez le dossier de l'application Node.js (visible dans hPanel →
   section **Node.js**, champ « Répertoire de l'application »). ⚠️
4. Dans ce dossier :
   ```bash
   cd <chemin-de-l-application>
   git status                                    # vérifier l'état actuel
   git fetch origin claude/funny-cray-tmbmm0
   git reset --hard origin/claude/funny-cray-tmbmm0
   npm ci
   npm run build
   ```
5. Redémarrage de l'application, sans interruption : la plupart des
   hébergements Node.js basés sur Passenger (schéma utilisé par de
   nombreux panneaux mutualisés) redémarrent l'app dès qu'un fichier
   `tmp/restart.txt` est créé ou modifié — ils ne coupent jamais le
   serveur, le prochain visiteur déclenche juste un rechargement propre :
   ```bash
   mkdir -p tmp && touch tmp/restart.txt
   ```
   ⚠️ Si rien ne se passe après une minute ou deux, utilisez plutôt le
   bouton **Redémarrer** (différent de « Redéployer ») dans la page
   Node.js de hPanel, qui n'est pas forcément affecté par le même bug.
6. Vérifiez sur `https://apea-elven.fr/calendrier-scolaire` que les 8
   événements apparaissent.

Cette méthode ne touche ni aux variables d'environnement, ni au DNS, ni
à l'application elle-même (pas de suppression/recréation) : elle amène
seulement le code déjà présent sur le serveur au niveau du dernier
commit, exactement comme l'aurait fait un déploiement réussi depuis
hPanel.

**Point de vigilance pour plus tard :** une fois que Hostinger aura
résolu le bug du bouton « Redéployer », son intégration Git interne
pourrait ne pas savoir que le code a été mis à jour manuellement entre
deux. Ce n'est a priori pas gênant (le prochain redéploiement hPanel
fera un nouveau `git pull` sur la même branche et retombera sur le même
état), mais si hPanel affiche un comportement inattendu après la
réparation du bouton, mentionnez ce déploiement manuel à leur support.

## Option B — automatiser les prochains déploiements (GitHub Actions)

Le fichier `.github/workflows/deploy-hostinger.yml` de ce dépôt reproduit
les étapes de l'option A, déclenchable en un clic depuis l'onglet
**Actions** de GitHub, sans jamais se déclencher automatiquement sur un
`git push` — aucun risque de modification imprévue du site en
production.

### Mise en place (à faire une seule fois)

1. **Créer une paire de clés SSH dédiée** (sur votre ordinateur, pas ici) :
   ```bash
   ssh-keygen -t ed25519 -C "deploy-apea-elven" -f ./deploy_key -N ""
   ```
   Cela crée `deploy_key` (clé privée) et `deploy_key.pub` (clé publique).

2. **Autoriser cette clé sur Hostinger** : ajoutez le contenu de
   `deploy_key.pub` aux clés SSH autorisées du compte (hPanel → Avancé →
   Accès SSH → Gérer les clés SSH, ou en l'ajoutant manuellement à
   `~/.ssh/authorized_keys` une fois connecté avec votre méthode SSH
   habituelle). ⚠️ Procédure exacte à confirmer dans hPanel.

3. **Ajouter 5 secrets sur GitHub** — dans le dépôt, **Settings → Secrets
   and variables → Actions → New repository secret** :

   | Nom du secret | Valeur |
   |---|---|
   | `HOSTINGER_SSH_HOST` | l'hôte SSH (ex. `votre-serveur.hostinger.com`) |
   | `HOSTINGER_SSH_PORT` | le port SSH (souvent `65002` sur Hostinger mutualisé — à vérifier) |
   | `HOSTINGER_SSH_USERNAME` | votre nom d'utilisateur SSH |
   | `HOSTINGER_SSH_PRIVATE_KEY` | le contenu complet de `deploy_key` (la clé **privée**) |
   | `HOSTINGER_APP_PATH` | le chemin absolu du dossier de l'application Node.js sur le serveur |

   Ces secrets sont chiffrés par GitHub ; je n'y ai jamais eu accès et ne
   peux pas les lire, les deviner ni les configurer à votre place.

4. **Supprimez `deploy_key` et `deploy_key.pub` de votre ordinateur**
   une fois le secret ajouté (ou conservez-les en lieu sûr, hors du
   dépôt).

### Utilisation

Une fois les 5 secrets configurés : onglet **Actions** du dépôt GitHub →
« Deploy to Hostinger (manual) » → **Run workflow** → taper `deploy`
dans le champ de confirmation → **Run workflow**. Le déploiement
s'exécute et son journal (git pull, build, redémarrage) reste consultable
dans l'historique des Actions.

Tant que ces secrets ne sont pas renseignés, le workflow échoue
immédiatement avec un message explicite — il ne peut rien faire
d'involontaire.
