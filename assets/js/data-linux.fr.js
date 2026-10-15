/* ============================================================
   DONNÉES — Volet Durcissement Linux
   Ubuntu 22.04, Linux Mint 21, Debian 12 (les images CyberPatriot)
   ============================================================ */
window.CDA_DATA_FR = window.CDA_DATA_FR || { tracks: [], modules: [] };

window.CDA_DATA_FR.modules.push(
  /* ===================== LIN 1 ===================== */
  {
    id: 'lin-1', track: 'linux', num: 1,
    title: 'Utilisateurs et groupes Linux',
    summary: 'Lisez /etc/passwd et /etc/shadow, repérez les comptes pirates et les usurpateurs d\u2019UID 0, puis ajoutez, verrouillez ou supprimez utilisateurs et groupes de la bonne façon.',
    tags: ['linux', 'users', 'passwd', 'shadow', 'groups', 'useradd', 'uid 0'],
    slides: [
      { title: 'Le modèle de comptes Linux', html: `
        <p>Linux stocke les identités dans des fichiers texte simples, ce qui rend l\u2019audit étonnamment facile. Tout ce dont vous avez besoin se trouve dans trois fichiers sous <code>/etc</code> :</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>/etc/passwd</h3><p class="small">Une ligne par compte. Lisible par tout le monde. Contient le nom d\u2019utilisateur, l\u2019UID, le GID, le répertoire personnel et l\u2019interpréteur de connexion.</p></div>
          <div class="pillarCard"><h3>/etc/shadow</h3><p class="small">Les empreintes de mots de passe et les données de vieillissement. Lisible seulement par root. Un <code>*</code> ou un <code>!</code> dans le champ de l\u2019empreinte signifie que la connexion est désactivée.</p></div>
          <div class="pillarCard"><h3>/etc/group</h3><p class="small">Les définitions de groupes et leurs membres. Le groupe <code>sudo</code> (ou <code>wheel</code>) est celui à protéger jalousement.</p></div>
        </div>
        <p>Chaque ligne de <code>/etc/passwd</code> comporte sept champs séparés par des deux-points :</p>
        <pre><code><span class="cmt">nom : x : UID : GID : commentaire : personnel : interpréteur</span>
alice:x:1000:1000:Alice Smith:/home/alice:/bin/bash
root:x:0:0:root:/root:/bin/bash</code></pre>
      ` },
      { title: 'Lire la liste des utilisateurs', html: `
        <p>Commencez chaque ronde Linux en listant les comptes. Le moyen le plus rapide de voir uniquement les comptes <em>humains</em> est de filtrer les comptes système, qui utilisent <code>/usr/sbin/nologin</code> ou <code>/bin/false</code> comme interpréteur.</p>
        <pre><code><span class="cmt"># Tout le monde, au complet</span>
cat /etc/passwd

<span class="cmt"># Seulement les comptes qui peuvent réellement se connecter</span>
grep -vE '/(nologin|false)$' /etc/passwd

<span class="cmt"># Afficher l'UID, le nom d'utilisateur et l'interpréteur côte à côte</span>
awk -F: '{print $3, $1, $7}' /etc/passwd</code></pre>
        <div class="callout tip"><strong>Connaissez votre normal.</strong> Une image Ubuntu de base a <code>root</code> plus un utilisateur que vous avez créé (habituellement l\u2019UID 1000). Tout autre compte avec un vrai interpréteur et un UID inférieur à 1000 mérite un examen attentif.</div>
      ` },
      { title: 'L\u2019usurpateur d\u2019UID 0', html: `
        <p>La trouvaille la plus dangereuse sur une image Linux est un <strong>second compte avec l\u2019UID 0</strong>. L\u2019UID 0 <em>est</em> root, peu importe ce que dit le nom d\u2019utilisateur. Les attaquants créent ces comptes « root de porte dérobée » pour pouvoir se connecter même si le vrai mot de passe root change.</p>
        <pre><code><span class="cmt"># Trouver tous les comptes avec l'UID 0 (il ne devrait y en avoir qu'un : root)</span>
awk -F: '$3==0 {print $1}' /etc/passwd</code></pre>
        <p>Si le résultat est autre chose qu\u2019une seule ligne <code>root</code>, vous avez trouvé une porte dérobée. Supprimez complètement le compte :</p>
        <pre><code><span class="cmt"># Supprimer le compte pirate et son répertoire personnel</span>
sudo userdel -r badactor</code></pre>
        <div class="callout danger"><strong>Vérifiez aussi le groupe sudo.</strong> Un attaquant s\u2019arrête rarement à un seul tour. Lancez <code>getent group sudo</code> et retirez toute personne que le README n\u2019autorise pas.</div>
      ` },
      { title: 'Créer, verrouiller et supprimer des utilisateurs', html: `
        <p>Utilisez les enveloppes conviviales sur Ubuntu/Mint/Debian. Elles créent le répertoire personnel et demandent un mot de passe en une seule étape.</p>
        <pre><code><span class="cmt"># Créer un nouvel utilisateur (interactif)</span>
sudo adduser dana

<span class="cmt"># Verrouiller un compte sans le supprimer (préfixe l'empreinte avec !)</span>
sudo usermod -L olduser

<span class="cmt"># Le déverrouiller de nouveau</span>
sudo usermod -U olduser

<span class="cmt"># Donner à un compte aucun interpréteur de connexion (compte de service)</span>
sudo usermod -s /usr/sbin/nologin svcuser

<span class="cmt"># Supprimer un utilisateur et son répertoire personnel</span>
sudo userdel -r olduser</code></pre>
        <div class="callout warn"><strong>Verrouiller ou supprimer.</strong> Si le README dit qu\u2019un compte n\u2019est « pas autorisé », supprimez-le. S\u2019il dit qu\u2019un compte doit être « désactivé », verrouillez-le. Respectez exactement la formulation.</div>
      ` },
      { title: 'Les groupes et le groupe sudo', html: `
        <p>Les groupes accordent des privilèges en bloc. Le plus important est <code>sudo</code> (sur Debian/Ubuntu) ou <code>wheel</code> (sur RHEL/Fedora). En faire partie équivaut à être administrateur.</p>
        <pre><code><span class="cmt"># Qui peut devenir root ?</span>
getent group sudo

<span class="cmt"># Afficher les groupes auxquels appartient un utilisateur</span>
groups alice
id alice

<span class="cmt"># Ajouter un utilisateur à un groupe (note : -a pour AJOUTER, sinon vous effacerez ses groupes)</span>
sudo usermod -aG sudo alice

<span class="cmt"># Retirer un utilisateur d'un groupe</span>
sudo gpasswd -d alice sudo

<span class="cmt"># Créer un groupe et en supprimer un</span>
sudo groupadd webteam
sudo groupdel webteam</code></pre>
        <div class="callout danger"><strong>L\u2019erreur classique.</strong> <code>usermod -G</code> sans <code>-a</code> <em>remplace</em> la liste de groupes d\u2019un utilisateur. Écrivez toujours <code>usermod -aG</code>.</div>
      ` },
      { title: 'Vieillissement des mots de passe avec chage', html: `
        <p>Chaque compte comporte des règles de vieillissement des mots de passe stockées dans <code>/etc/shadow</code>. L\u2019outil <code>chage</code> les lit et les modifie. Les compétitions demandent souvent d\u2019expirer un mot de passe ou de forcer un changement à la prochaine connexion.</p>
        <pre><code><span class="cmt"># Voir les infos de vieillissement d'un utilisateur</span>
sudo chage -l alice

<span class="cmt"># Forcer un changement de mot de passe à la prochaine connexion</span>
sudo chage -d 0 alice

<span class="cmt"># Expirer un compte à une date précise (AAAA-MM-JJ)</span>
sudo chage -E 2025-12-31 tempuser

<span class="cmt"># Fixer l'âge maximal du mot de passe à 90 jours</span>
sudo chage -M 90 alice</code></pre>
        <div class="callout tip"><strong>chage -d 0 est un favori.</strong> C\u2019est la façon la plus propre de satisfaire les exigences du type « l\u2019utilisateur doit définir un nouveau mot de passe à la première connexion ».</div>
      ` },
      { title: 'Liste de vérification — utilisateurs et groupes', html: `
        <ol>
          <li><code>awk -F: '$3==0 {print $1}' /etc/passwd</code> &mdash; exactement un root, aucun usurpateur.</li>
          <li>Comparez <code>/etc/passwd</code> avec la liste autorisée du README.</li>
          <li><code>getent group sudo</code> &mdash; seulement les administrateurs autorisés.</li>
          <li>Supprimez les comptes non autorisés (<code>userdel -r</code>) ; verrouillez ceux qui doivent rester.</li>
          <li>Vérifiez les mots de passe vides : <code>sudo awk -F: '($2==""){print $1}' /etc/shadow</code>.</li>
          <li>Donnez aux comptes de service un interpréteur <code>nologin</code>.</li>
          <li>Appliquez le vieillissement des mots de passe avec <code>chage</code> là où le README l\u2019exige.</li>
          <li>Consignez chaque changement.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel fichier contient les empreintes de mots de passe ?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/login.defs'], answer: 1, explain: '/etc/shadow stocke les empreintes et n\u2019est lisible que par root.' },
      { q: 'Comment trouver tous les comptes avec l\u2019UID 0 ?', opts: ["awk -F: '$3==0 {print $1}' /etc/passwd", 'cat /etc/shadow', 'groups root', 'ls -l /root'], answer: 0, explain: 'L\u2019UID 0 est root ; cet awk affiche tout compte usurpateur.' },
      { q: 'Que signifie un « ! » au début d\u2019une empreinte dans /etc/shadow ?', opts: ['Le mot de passe est vide', 'Le compte est verrouillé', 'L\u2019utilisateur est root', 'Le mot de passe n\u2019expire jamais'], answer: 1, explain: 'Un ! en tête verrouille le compte.' },
      { q: 'Quelle commande ajoute un utilisateur au groupe sudo sans retirer ses autres groupes ?', opts: ['usermod -G sudo alice', 'usermod -aG sudo alice', 'groupadd sudo alice', 'chage -G sudo alice'], answer: 1, explain: '-aG ajoute ; -G seul remplacerait la liste de groupes.' },
      { q: 'Que fait « chage -d 0 alice » ?', opts: ['Supprime alice', 'Force un changement de mot de passe à la prochaine connexion', 'Verrouille alice', 'Fixe le mot de passe pour qu\u2019il n\u2019expire jamais'], answer: 1, explain: 'Mettre le dernier jour de changement à 0 force un changement à la prochaine connexion.' }
    ]
  },

  /* ===================== LIN 2 ===================== */
  {
    id: 'lin-2', track: 'linux', num: 2,
    title: 'Politique de mots de passe PAM et sécurité des comptes',
    summary: 'Configurez la complexité des mots de passe avec pam_pwquality, définissez les valeurs par défaut de vieillissement dans login.defs et bloquez les tentatives par force brute avec faillock.',
    tags: ['linux', 'pam', 'pwquality', 'login.defs', 'password policy', 'faillock'],
    slides: [
      { title: 'Deux fichiers, deux rôles', html: `
        <p>Les règles de mots de passe Linux sont réparties entre deux zones de configuration, et les compétitions testent les deux.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Complexité</h3><p class="small">À quel point un mot de passe doit être <em>fort</em> : longueur, classes de caractères, similarité. Contrôlée par <strong>PAM</strong> (<code>pam_pwquality</code>) et <code>/etc/security/pwquality.conf</code>.</p></div>
          <div class="pillarCard"><h3>Vieillissement</h3><p class="small">À quelle <em>fréquence</em> il doit changer et combien de temps il vit : <code>PASS_MAX_DAYS</code>, <code>PASS_MIN_DAYS</code>. Contrôlé par <code>/etc/login.defs</code>.</p></div>
        </div>
        <p>PAM (Pluggable Authentication Modules) est le cadre par lequel passe chaque connexion, appel <code>su</code> et <code>sudo</code>. Ses règles se trouvent dans <code>/etc/pam.d/</code>.</p>
      ` },
      { title: 'pwquality.conf — le moteur de complexité', html: `
        <p>Sur Debian, Ubuntu et Mint, les règles de complexité sont lues dans <code>/etc/security/pwquality.conf</code>. Modifiez-le avec un éditeur de texte en tant que root.</p>
        <pre><code><span class="cmt"># /etc/security/pwquality.conf</span>
minlen = 12        <span class="cmt"># longueur minimale</span>
dcredit = -1       <span class="cmt"># exiger au moins 1 chiffre</span>
ucredit = -1       <span class="cmt"># exiger au moins 1 majuscule</span>
lcredit = -1       <span class="cmt"># exiger au moins 1 minuscule</span>
ocredit = -1       <span class="cmt"># exiger au moins 1 symbole</span>
minclass = 4       <span class="cmt"># exiger 4 des 4 classes</span>
retry = 3          <span class="cmt"># tentatives avant échec</span></code></pre>
        <div class="callout tip"><strong>Les nombres négatifs signifient « exiger ».</strong> Une valeur de <code>-1</code> exige au moins un caractère de ce type ; une valeur positive donne un crédit vers la longueur.</div>
      ` },
      { title: 'Relier PAM à pwquality', html: `
        <p>Le fichier de configuration ne prend effet que si un module PAM le référence. Vérifiez <code>/etc/pam.d/common-password</code> (famille Debian) :</p>
        <pre><code><span class="cmt"># /etc/pam.d/common-password</span>
password requisite pam_pwquality.so retry=3
password [success=1 default=ignore] pam_unix.so obscure sha512</code></pre>
        <p>Si <code>pam_pwquality.so</code> est absent, ajoutez la ligne. Les systèmes plus anciens utilisent <code>pam_cracklib.so</code> à la place. Après modification, testez qu\u2019un mot de passe faible est rejeté :</p>
        <pre><code><span class="cmt"># Essayer de définir un mot de passe faible (devrait être refusé)</span>
sudo passwd alice</code></pre>
        <div class="callout warn"><strong>Ne cassez pas la connexion.</strong> Une faute de frappe dans un fichier PAM peut bloquer tout le monde, y compris root. Gardez un interpréteur root ouvert pendant les tests, et revenez en arrière si les connexions échouent.</div>
      ` },
      { title: 'login.defs — valeurs par défaut de vieillissement', html: `
        <p><code>/etc/login.defs</code> définit le vieillissement <em>par défaut</em> appliqué aux nouveaux comptes. Le modifier ne met pas à jour rétroactivement les utilisateurs existants &mdash; utilisez <code>chage</code> pour ceux-là.</p>
        <pre><code><span class="cmt"># /etc/login.defs</span>
PASS_MAX_DAYS   90     <span class="cmt"># le mot de passe doit être changé tous les 90 jours</span>
PASS_MIN_DAYS   7      <span class="cmt"># impossible de changer de nouveau pendant 7 jours</span>
PASS_WARN_AGE   14     <span class="cmt"># avertir 14 jours avant l'expiration</span>
PASS_MIN_LEN    12     <span class="cmt"># longueur héritée (pwquality est préféré)</span></code></pre>
        <p>Les README de compétition indiquent souvent un âge maximal précis, par ex. « les mots de passe doivent expirer tous les 60 jours ». Réglez <code>PASS_MAX_DAYS</code> en conséquence, puis appliquez-le aux comptes existants.</p>
      ` },
      { title: 'Bloquer la force brute avec faillock', html: `
        <p>Le verrouillage de compte empêche la devinette de mots de passe. Debian/Ubuntu moderne utilise <code>pam_faillock</code>, configuré dans <code>/etc/security/faillock.conf</code>.</p>
        <pre><code><span class="cmt"># /etc/security/faillock.conf</span>
deny = 5              <span class="cmt"># verrouiller après 5 échecs</span>
unlock_time = 900     <span class="cmt"># rester verrouillé pendant 15 minutes</span>
fail_interval = 900   <span class="cmt"># compter les échecs sur 15 minutes</span></code></pre>
        <p>Les systèmes plus anciens utilisaient <code>pam_tally2</code> avec des réglages dans <code>/etc/pam.d/common-auth</code>. Vous pouvez inspecter et effacer l\u2019état de verrouillage actuel :</p>
        <pre><code>sudo faillock --user alice
sudo faillock --user alice --reset</code></pre>
      ` },
      { title: 'Liste de vérification — politique de mots de passe', html: `
        <ol>
          <li>Définissez <code>minlen</code> et les exigences de classes de caractères dans <code>/etc/security/pwquality.conf</code>.</li>
          <li>Confirmez que <code>pam_pwquality.so</code> est référencé dans <code>/etc/pam.d/common-password</code>.</li>
          <li>Définissez <code>PASS_MAX_DAYS</code> / <code>PASS_MIN_DAYS</code> / <code>PASS_WARN_AGE</code> dans <code>/etc/login.defs</code>.</li>
          <li>Appliquez le vieillissement aux utilisateurs existants avec <code>chage</code>.</li>
          <li>Configurez le verrouillage via <code>faillock.conf</code> (deny, unlock_time).</li>
          <li>Vérifiez qu\u2019aucun compte n\u2019a de mot de passe vide.</li>
          <li>Testez qu\u2019un mot de passe faible est rejeté ; testez qu\u2019un bon fonctionne toujours.</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel fichier définit la complexité des mots de passe sur Debian/Ubuntu ?', opts: ['/etc/login.defs', '/etc/security/pwquality.conf', '/etc/shadow', '/etc/pam.d/login'], answer: 1, explain: 'pwquality.conf pilote les règles de complexité de pam_pwquality.' },
      { q: 'Dans pwquality.conf, que signifie « ucredit = -1 » ?', opts: ['Autoriser une majuscule', 'Exiger au moins une majuscule', 'Interdire les majuscules', 'Ignorer les majuscules'], answer: 1, explain: 'Une valeur négative exige au moins ce nombre de caractères de la classe.' },
      { q: 'Quel fichier définit PASS_MAX_DAYS par défaut ?', opts: ['/etc/login.defs', '/etc/passwd', '/etc/security/pwquality.conf', '/etc/sudoers'], answer: 0, explain: 'login.defs contient les valeurs par défaut de vieillissement pour les nouveaux comptes.' },
      { q: 'Quel module assure le verrouillage de compte moderne ?', opts: ['pam_pwquality', 'pam_faillock', 'pam_unix', 'pam_limits'], answer: 1, explain: 'pam_faillock (configuré dans faillock.conf) verrouille après des tentatives échouées.' },
      { q: 'Modifier login.defs affecte quels comptes immédiatement ?', opts: ['Tous les comptes existants', 'Seulement les nouveaux comptes', 'Seulement root', 'Aucun compte'], answer: 1, explain: 'Il définit les valeurs par défaut pour les nouveaux comptes ; utilisez chage pour les existants.' }
    ]
  },

  /* ===================== LIN 3 ===================== */
  {
    id: 'lin-3', track: 'linux', num: 3,
    title: 'Permissions et propriété des fichiers',
    summary: 'Décodez les permissions rwx, utilisez chmod et chown, traquez les fichiers SUID et modifiables par tous, et corrigez les classiques trouvailles de permissions non sécurisées.',
    tags: ['linux', 'permissions', 'chmod', 'chown', 'suid', 'world-writable', 'umask'],
    slides: [
      { title: 'Décoder ls -l', html: `
        <p>Chaque fichier comporte des permissions pour trois publics : le <strong>propriétaire</strong>, le <strong>groupe</strong> et les <strong>autres</strong>. Lire <code>ls -l</code> est une compétence essentielle.</p>
        <pre><code>-rwxr-x--- 1 alice webteam 4096 Jun 1 12:00 report.sh
│└┬┘└┬┘└┬┘
│ │  │  └── autres : --- (aucun accès)
│ │  └───── groupe :  r-x (lecture + exécution)
│ └──────── propriétaire : rwx (lecture + écriture + exécution)
└────────── type : - fichier, d répertoire, l lien symbolique</code></pre>
        <p>Chaque permission correspond à un nombre : <strong>r = 4</strong>, <strong>w = 2</strong>, <strong>x = 1</strong>. Additionnez-les par public pour obtenir la forme octale.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Symbolique</th><th>Octale</th><th>Signification</th></tr></thead>
          <tbody>
            <tr><td>rwxr-xr-x</td><td>755</td><td>Propriétaire complet ; tout le monde lecture+exécution</td></tr>
            <tr><td>rw-r--r--</td><td>644</td><td>Le propriétaire écrit ; les autres lisent seulement</td></tr>
            <tr><td>rwx------</td><td>700</td><td>Propriétaire seulement &mdash; idéal pour les fichiers privés</td></tr>
            <tr><td>rwxrwxrwx</td><td>777</td><td>Contrôle complet pour tous &mdash; habituellement une trouvaille</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'chmod et chown', html: `
        <p>Deux commandes font presque tout le travail. <code>chmod</code> change les permissions ; <code>chown</code> change la propriété.</p>
        <pre><code><span class="cmt"># Mode octal</span>
chmod 640 secrets.txt

<span class="cmt"># Mode symbolique : ajouter l'exécution pour le propriétaire</span>
chmod u+x script.sh

<span class="cmt"># Retirer l'écriture pour le groupe et les autres</span>
chmod go-w shared.txt

<span class="cmt"># Récursif sur un répertoire</span>
chmod -R 750 /srv/app

<span class="cmt"># Changer le propriétaire et le groupe</span>
chown alice:webteam report.sh

<span class="cmt"># Changer seulement le groupe</span>
chgrp webteam report.sh</code></pre>
        <div class="callout tip"><strong>Corrigez aussi le répertoire personnel.</strong> Une trouvaille courante est un répertoire personnel lisible par tout le monde. <code>chmod 750 /home/alice</code> le verrouille.</div>
      ` },
      { title: 'SUID et SGID — le gros morceau', html: `
        <p>Un fichier avec le bit <strong>SUID</strong> s\u2019exécute en tant que son <em>propriétaire</em>, peu importe qui l\u2019a lancé. Si ce propriétaire est root, le programme s\u2019exécute avec les pouvoirs de root. Des exemples légitimes existent (<code>passwd</code>, <code>sudo</code>, <code>ping</code>), mais les attaquants déposent des copies SUID d\u2019interpréteurs pour conserver l\u2019accès root.</p>
        <pre><code><span class="cmt"># Lister tous les binaires SUID (s'exécutent comme le propriétaire)</span>
sudo find / -perm -4000 -type f 2>/dev/null

<span class="cmt"># Lister tous les binaires SGID (s'exécutent comme le groupe)</span>
sudo find / -perm -2000 -type f 2>/dev/null

<span class="cmt"># Dans ls -l, le SUID apparaît comme un « s » dans la case d'exécution du propriétaire</span>
-rwsr-xr-x 1 root root ... /usr/bin/passwd</code></pre>
        <p>Comparez la liste avec ce qui devrait exister. Un binaire SUID dans <code>/tmp</code>, <code>/home</code>, ou avec un nom inhabituel est presque certainement malveillant.</p>
        <div class="callout danger"><strong>Retirez le bit, ne vous contentez pas de supprimer.</strong> Si un outil légitime a un bit SUID inutile, <code>chmod u-s fichier</code>. Si le fichier lui-même est un logiciel malveillant, supprimez-le &mdash; mais notez d\u2019abord le chemin pour la question de criminalistique.</div>
      ` },
      { title: 'Fichiers modifiables par tous', html: `
        <p>Un fichier que <em>n\u2019importe qui</em> peut modifier est un risque : un attaquant peut l\u2019altérer, et si root l\u2019exécute ensuite, il obtient root. Traquez-les :</p>
        <pre><code><span class="cmt"># Fichiers modifiables par tous (en excluant /tmp à bit collant)</span>
sudo find / -xdev -type f -perm -0002 2>/dev/null

<span class="cmt"># Les RÉPERTOIRES modifiables par tous (sans le bit collant) sont pires</span>
sudo find / -xdev -type d -perm -0002 ! -perm -1000 2>/dev/null</code></pre>
        <p>Corrigez-les en retirant le bit « écriture pour les autres » :</p>
        <pre><code>chmod o-w /chemin/vers/fichier</code></pre>
        <div class="callout tip"><strong>Bit collant.</strong> <code>/tmp</code> est modifiable par tous exprès, mais son bit collant (<code>+t</code>) fait que seul le propriétaire d\u2019un fichier peut le supprimer. Les répertoires modifiables par tous <em>sans</em> le bit collant sont la vraie trouvaille.</div>
      ` },
      { title: 'Fichiers orphelins et umask', html: `
        <p>Les fichiers appartenant à un utilisateur ou un groupe qui n\u2019existe plus sont dits <strong>orphelins</strong>. Ils subsistent souvent après la suppression d\u2019un compte pirate.</p>
        <pre><code><span class="cmt"># Fichiers sans propriétaire valide</span>
sudo find / -xdev -nouser 2>/dev/null

<span class="cmt"># Fichiers sans groupe valide</span>
sudo find / -xdev -nogroup 2>/dev/null</code></pre>
        <p>L\u2019<strong>umask</strong> décide des permissions par défaut des nouveaux fichiers. Un umask permissif (comme 000) crée des fichiers modifiables par tous par accident.</p>
        <pre><code><span class="cmt"># Afficher l'umask actuel</span>
umask
<span class="cmt"># Définir une valeur par défaut raisonnable dans /etc/profile ou /etc/login.defs</span>
umask 027</code></pre>
      ` },
      { title: 'Liste de vérification — permissions', html: `
        <ol>
          <li><code>sudo find / -perm -4000 -type f 2>/dev/null</code> &mdash; examinez chaque binaire SUID.</li>
          <li><code>sudo find / -xdev -type f -perm -0002 2>/dev/null</code> &mdash; fichiers modifiables par tous.</li>
          <li>Répertoires modifiables par tous sans le bit collant.</li>
          <li>Fichiers orphelins (<code>-nouser</code> / <code>-nogroup</code>).</li>
          <li>Les répertoires personnels devraient être <code>750</code> ou plus stricts.</li>
          <li>Vérifiez que <code>/etc/shadow</code> est <code>640</code> et <code>/etc/passwd</code> est <code>644</code>.</li>
          <li>Définissez un <code>umask</code> raisonnable (027).</li>
          <li>Consignez chaque changement avec le chemin et l\u2019ancien mode.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle valeur octale correspond à « rwxr-xr-x » ?', opts: ['644', '755', '700', '777'], answer: 1, explain: '7+5+5 = 755.' },
      { q: 'Quelle commande liste tous les fichiers SUID ?', opts: ['find / -perm -4000 -type f', 'find / -perm -0002', 'ls -l /tmp', 'chmod u+s /'], answer: 0, explain: '-perm -4000 correspond au bit SUID.' },
      { q: 'Un répertoire modifiable par tous est à l\u2019abri des attaques de suppression s\u2019il possède :', opts: ['le bit SUID', 'le bit collant', 'le bit SGID', 'le bit d\u2019exécution'], answer: 1, explain: 'Le bit collant (+t) limite la suppression aux propriétaires des fichiers.' },
      { q: 'Quelle commande change le propriétaire et le groupe d\u2019un fichier ?', opts: ['chmod', 'chown', 'umask', 'chgrp'], answer: 1, explain: 'chown utilisateur:groupe fichier.' },
      { q: 'Que signifie un « s » dans la case d\u2019exécution du propriétaire dans ls -l ?', opts: ['Lien symbolique', 'Bit SUID activé', 'Bit collant', 'Lecture seule'], answer: 1, explain: 'Il marque le bit SUID.' }
    ]
  },

  /* ===================== LIN 4 ===================== */
  {
    id: 'lin-4', track: 'linux', num: 4,
    title: 'sudo et gestion des privilèges',
    summary: 'Comprenez /etc/sudoers, utilisez visudo en toute sécurité, auditez qui peut devenir root et appliquez le moindre privilège avec des fichiers déposés.',
    tags: ['linux', 'sudo', 'sudoers', 'visudo', 'privilege', 'least privilege'],
    slides: [
      { title: 'Pourquoi sudo est important', html: `
        <p>Sur Linux, <strong>root est tout-puissant</strong>. Chaque décision de privilège se résume à une question : <em>qui peut devenir root ?</em> La réponse se trouve dans <code>/etc/sudoers</code> et les fichiers de <code>/etc/sudoers.d/</code>.</p>
        <p>Les scénarios de compétition ajoutent souvent un utilisateur non autorisé au groupe <code>sudo</code>, ou accordent à un utilisateur des droits <code>NOPASSWD: ALL</code> sans restriction. Les deux sont des trouvailles à corriger.</p>
        <div class="callout tip"><strong>Vérifiez trois endroits.</strong> L\u2019appartenance au groupe <code>sudo</code>, les entrées explicites dans <code>sudoers</code> et les fichiers déposés dans <code>sudoers.d</code>. En manquer un et la porte dérobée survit.</div>
      ` },
      { title: 'Lire /etc/sudoers', html: `
        <p>Le fichier principal définit des alias et des règles. Une règle ressemble à <code>qui hôte=(en tant que) commande</code>.</p>
        <pre><code><span class="cmt"># /etc/sudoers</span>
Defaults        env_reset
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL      <span class="cmt"># quiconque dans le groupe sudo</span>
alice   ALL=(ALL) NOPASSWD: ALL <span class="cmt"># alice n'a pas besoin de mot de passe — suspect</span></code></pre>
        <p>Vérifiez qui détient actuellement des droits sudo :</p>
        <pre><code><span class="cmt"># Que puis-je exécuter en tant que root ?</span>
sudo -l

<span class="cmt"># Qui est dans le groupe sudo ?</span>
getent group sudo</code></pre>
      ` },
      { title: 'Modifier en toute sécurité avec visudo', html: `
        <p><strong>Ne modifiez jamais <code>/etc/sudoers</code> avec un simple éditeur de texte.</strong> Une erreur de syntaxe peut bloquer tout le monde hors de root. Utilisez <code>visudo</code>, qui valide le fichier avant d\u2019enregistrer.</p>
        <pre><code><span class="cmt"># Modifier le fichier sudoers principal (valide à l'enregistrement)</span>
sudo visudo

<span class="cmt"># Modifier un fichier déposé (préféré pour les règles personnalisées)</span>
sudo visudo -f /etc/sudoers.d/cyberteam</code></pre>
        <div class="callout warn"><strong>Les fichiers déposés ne doivent pas contenir de points.</strong> Un fichier nommé <code>my.rules</code> dans <code>sudoers.d</code> est ignoré. Utilisez <code>myrules</code> ou <code>90-cyberteam</code>.</div>
      ` },
      { title: 'Appliquer le moindre privilège', html: `
        <p>Le moindre privilège consiste à accorder le plus petit droit qui fait le travail. Au lieu de <code>ALL</code>, autorisez seulement les commandes précises dont un rôle a besoin.</p>
        <pre><code><span class="cmt"># Mauvais : root complet, sans mot de passe</span>
webadmin ALL=(ALL) NOPASSWD: ALL

<span class="cmt"># Meilleur : seulement redémarrer le serveur web, avec un mot de passe</span>
webadmin ALL=(root) /usr/bin/systemctl restart nginx</code></pre>
        <p>Pour retirer l\u2019accès sans restriction d\u2019un utilisateur, supprimez sa ligne de <code>sudoers</code> (via <code>visudo</code>) et retirez-le du groupe <code>sudo</code> :</p>
        <pre><code>sudo gpasswd -d mallory sudo</code></pre>
      ` },
      { title: 'La commande su et la connexion root', html: `
        <p><code>su</code> change d\u2019utilisateur ; <code>su -</code> donne un interpréteur de connexion complet en tant que cet utilisateur. Restreindre qui peut faire <code>su</code> vers root fait partie du durcissement.</p>
        <pre><code><span class="cmt"># Passer à root (nécessite le mot de passe de root)</span>
su -

<span class="cmt"># Exécuter une seule commande en tant qu'un autre utilisateur</span>
su -s /bin/bash apache -c 'whoami'</code></pre>
        <p>Vous pouvez restreindre <code>su</code> à un groupe dans <code>/etc/pam.d/su</code> en activant la ligne <code>pam_wheel.so</code> :</p>
        <pre><code><span class="cmt"># /etc/pam.d/su</span>
auth required pam_wheel.so use_uid</code></pre>
        <p>Avec cette ligne active, seuls les membres du groupe <code>wheel</code> (ou celui configuré) peuvent faire <code>su</code> vers root.</p>
      ` },
      { title: 'Liste de vérification — sudo et privilèges', html: `
        <ol>
          <li><code>getent group sudo</code> &mdash; seulement les administrateurs autorisés.</li>
          <li><code>sudo -l</code> pour chaque utilisateur &mdash; cherchez des <code>NOPASSWD</code> ou <code>ALL</code> inattendus.</li>
          <li>Lisez <code>/etc/sudoers</code> et chaque fichier de <code>/etc/sudoers.d/</code>.</li>
          <li>Modifiez uniquement avec <code>visudo</code>.</li>
          <li>Retirez les entrées sudo et les appartenances de groupe non autorisées.</li>
          <li>Remplacez les droits sans restriction par des règles spécifiques à des commandes lorsque possible.</li>
          <li>Envisagez de restreindre <code>su</code> avec <code>pam_wheel</code>.</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel outil devriez-vous utiliser pour modifier /etc/sudoers ?', opts: ['nano', 'vim', 'visudo', 'echo >>'], answer: 2, explain: 'visudo valide la syntaxe avant d\u2019enregistrer.' },
      { q: 'Qu\u2019accorde « NOPASSWD: ALL » ?', opts: ['Aucun privilège', 'Root complet sans mot de passe', 'Root en lecture seule', 'Une appartenance de groupe'], answer: 1, explain: 'Cela permet d\u2019exécuter n\u2019importe quelle commande en tant que root sans mot de passe.' },
      { q: 'Quelle commande montre ce qu\u2019un utilisateur peut exécuter via sudo ?', opts: ['sudo -l', 'groups', 'id', 'whoami'], answer: 0, explain: 'sudo -l liste les privilèges sudo de l\u2019appelant.' },
      { q: 'Un fichier déposé dans /etc/sudoers.d ne doit PAS contenir :', opts: ['des chiffres', 'des tirets', 'des points', 'des majuscules'], answer: 2, explain: 'Les noms de fichiers avec des points sont ignorés par sudo.' },
      { q: 'Quel groupe accorde les droits d\u2019administration sur Debian/Ubuntu ?', opts: ['wheel', 'sudo', 'admin', 'root'], answer: 1, explain: 'Le groupe sudo sur Debian/Ubuntu (wheel sur RHEL).' }
    ]
  },

  /* ===================== LIN 5 ===================== */
  {
    id: 'lin-5', track: 'linux', num: 5,
    title: 'Durcissement de SSH',
    summary: 'Verrouillez sshd_config : désactivez la connexion root, forcez l\u2019authentification par clé, restreignez les utilisateurs et comprenez les réglages que les compétitions testent toujours.',
    tags: ['linux', 'ssh', 'sshd_config', 'keys', 'remote access', 'PermitRootLogin'],
    slides: [
      { title: 'Pourquoi SSH est ciblé', html: `
        <p>SSH est la porte d\u2019entrée d\u2019un serveur Linux. S\u2019il est mal configuré, un attaquant peut entrer par force brute depuis n\u2019importe où sur Internet. Durcir <code>sshd</code> est l\u2019une des tâches les plus payantes de toute ronde Linux.</p>
        <p>Tous les réglages se trouvent dans <code>/etc/ssh/sshd_config</code>. Après modification, redémarrez le service et &mdash; surtout &mdash; <strong>testez que vous pouvez toujours vous connecter</strong> avant de fermer votre session.</p>
        <div class="callout danger"><strong>Ne vous enfermez pas dehors.</strong> Gardez votre session SSH actuelle ouverte, faites les changements, ouvrez une <em>seconde</em> session pour vérifier, et seulement alors fermez la première.</div>
      ` },
      { title: 'Les réglages qui comptent', html: `
        <p>Voici les directives que les compétitions recherchent. Modifiez-les dans <code>/etc/ssh/sshd_config</code> :</p>
        <pre><code><span class="cmt"># /etc/ssh/sshd_config</span>
PermitRootLogin no            <span class="cmt"># ne jamais autoriser la connexion root directe</span>
PasswordAuthentication no     <span class="cmt"># exiger les clés SSH</span>
PubkeyAuthentication yes
PermitEmptyPasswords no       <span class="cmt"># rejeter les mots de passe vides</span>
X11Forwarding no              <span class="cmt"># désactiver le transfert GUI si inutilisé</span>
MaxAuthTries 4                <span class="cmt"># limiter les essais par connexion</span>
LoginGraceTime 30             <span class="cmt"># secondes pour s'authentifier</span>
AllowUsers alice bob          <span class="cmt"># liste blanche des personnes pouvant se connecter</span>
Protocol 2                    <span class="cmt"># seulement le protocole moderne (hérité)</span></code></pre>
        <div class="callout tip"><strong>AllowUsers est puissant.</strong> Ne lister que les comptes autorisés fait que les comptes pirates ne peuvent pas se connecter même s\u2019ils existent. C\u2019est l\u2019un des points les plus fiables à marquer.</div>
      ` },
      { title: 'Appliquer et vérifier les changements', html: `
        <p>Validez toujours la configuration avant de redémarrer, pour qu\u2019une faute de frappe ne fasse pas tomber SSH.</p>
        <pre><code><span class="cmt"># Vérifier la syntaxe</span>
sudo sshd -t

<span class="cmt"># Redémarrer le service</span>
sudo systemctl restart ssh

<span class="cmt"># Confirmer qu'il fonctionne</span>
sudo systemctl status ssh</code></pre>
        <p>Si vous êtes connecté à distance, ouvrez un nouveau terminal et essayez de vous connecter avant de déconnecter l\u2019ancien. Si la nouvelle session fonctionne, vous êtes en sécurité.</p>
      ` },
      { title: 'Les clés SSH, la façon sécurisée', html: `
        <p>L\u2019authentification par clé est bien plus forte que par mot de passe. Vous générez une paire de clés, gardez la clé privée secrète et placez la clé publique sur le serveur.</p>
        <pre><code><span class="cmt"># Sur votre poste : générer une paire de clés</span>
ssh-keygen -t ed25519 -C "alice@example.com"

<span class="cmt"># Copier la clé publique sur le serveur</span>
ssh-copy-id alice@server

<span class="cmt"># Le serveur la stocke ici, appartenant à l'utilisateur, mode 600</span>
~/.ssh/authorized_keys</code></pre>
        <div class="callout warn"><strong>Les permissions comptent.</strong> Si <code>~/.ssh</code> n\u2019est pas <code>700</code> et <code>authorized_keys</code> pas <code>600</code>, SSH refuse la clé. Le propriétaire doit être l\u2019utilisateur, pas root.</div>
      ` },
      { title: 'Auditer SSH sur une image de compétition', html: `
        <p>Sur une image notée, vous ne créerez habituellement pas de clés &mdash; vous resserrerez une configuration existante. Suivez cet audit :</p>
        <pre><code><span class="cmt"># Afficher la configuration effective (commentaires retirés)</span>
grep -vE '^\s*#|^\s*$' /etc/ssh/sshd_config

<span class="cmt"># Trouver les réglages permissifs</span>
grep -Ei 'permitrootlogin|passwordauthentication|permitempty' /etc/ssh/sshd_config</code></pre>
        <p>Surveillez un second fichier de configuration qui pourrait remplacer le premier. Debian/Ubuntu lisent les fichiers déposés dans <code>/etc/ssh/sshd_config.d/</code> :</p>
        <pre><code>ls -l /etc/ssh/sshd_config.d/</code></pre>
      ` },
      { title: 'Liste de vérification — durcissement SSH', html: `
        <ol>
          <li><code>PermitRootLogin no</code>.</li>
          <li><code>PasswordAuthentication no</code> (clés seulement) &mdash; si le README autorise les mots de passe, gardez au moins root hors jeu.</li>
          <li><code>PermitEmptyPasswords no</code>.</li>
          <li>Réglez <code>AllowUsers</code> à la liste autorisée.</li>
          <li>Réduisez <code>MaxAuthTries</code> et <code>LoginGraceTime</code>.</li>
          <li>Désactivez <code>X11Forwarding</code> si inutilisé.</li>
          <li>Vérifiez <code>sshd_config.d/</code> pour des fichiers déposés qui remplacent.</li>
          <li>Lancez <code>sshd -t</code>, redémarrez et vérifiez qu\u2019une connexion fonctionne toujours.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle directive désactive la connexion SSH root directe ?', opts: ['AllowRoot no', 'PermitRootLogin no', 'RootLogin false', 'DenyRoot yes'], answer: 1, explain: 'PermitRootLogin no est la directive correcte.' },
      { q: 'Quelle commande valide la syntaxe de sshd_config ?', opts: ['sshd -t', 'ssh -t', 'systemctl check ssh', 'sshd --verify'], answer: 0, explain: 'sshd -t teste le fichier de configuration.' },
      { q: 'Que fait AllowUsers ?', opts: ['Liste les utilisateurs pouvant se connecter via SSH', 'Bloque tous les utilisateurs', 'Crée des utilisateurs', 'Définit les mots de passe'], answer: 0, explain: 'Elle met en liste blanche les comptes autorisés à se connecter.' },
      { q: 'Quelles permissions devrait avoir ~/.ssh/authorized_keys ?', opts: ['777', '644', '600', '755'], answer: 2, explain: 'SSH exige 600 (et ~/.ssh à 700).' },
      { q: 'Quel réglage force l\u2019authentification par clé ?', opts: ['PubkeyAuthentication no', 'PasswordAuthentication no', 'PermitEmptyPasswords yes', 'X11Forwarding yes'], answer: 1, explain: 'Désactiver l\u2019authentification par mot de passe laisse les clés comme méthode.' }
    ]
  },

  /* ===================== LIN 6 ===================== */
  {
    id: 'lin-6', track: 'linux', num: 6,
    title: 'Pare-feu Linux (UFW et iptables)',
    summary: 'Activez et configurez UFW, comprenez la politique de refus par défaut et lisez les règles iptables sous-jacentes qui protègent l\u2019hôte.',
    tags: ['linux', 'firewall', 'ufw', 'iptables', 'ports', 'default deny'],
    slides: [
      { title: 'Principes de base du pare-feu', html: `
        <p>Un pare-feu décide quel trafic réseau peut atteindre la machine. La posture de sécurité que vous voulez est le <strong>refus par défaut</strong> : bloquez tout, puis ouvrez seulement les ports dont l\u2019entreprise a besoin.</p>
        <p>Sur Ubuntu et Mint, l\u2019interface conviviale est <strong>UFW</strong> (Uncomplicated Firewall). En dessous, il écrit des règles <strong>iptables</strong>. Vous devriez comprendre les deux.</p>
        <div class="callout tip"><strong>Connaissez d\u2019abord les ports requis.</strong> Le README dira des choses comme « le serveur web doit rester joignable sur le port 80/443 ». Ouvrez ceux-là ; fermez le reste.</div>
      ` },
      { title: 'Activer et configurer UFW', html: `
        <pre><code><span class="cmt"># Définir la politique par défaut : refuser entrant, autoriser sortant</span>
sudo ufw default deny incoming
sudo ufw default allow outgoing

<span class="cmt"># Autoriser les services dont le scénario a besoin</span>
sudo ufw allow 22/tcp      <span class="cmt"># SSH</span>
sudo ufw allow 80/tcp      <span class="cmt"># HTTP</span>
sudo ufw allow 443/tcp     <span class="cmt"># HTTPS</span>

<span class="cmt"># Activer le pare-feu</span>
sudo ufw enable

<span class="cmt"># Vérifier l'état</span>
sudo ufw status verbose</code></pre>
        <div class="callout warn"><strong>Autorisez SSH avant d\u2019activer UFW à distance.</strong> Si vous activez le pare-feu sans autoriser le port 22, vous couperez votre propre connexion.</div>
      ` },
      { title: 'Supprimer des règles et refuser du trafic', html: `
        <p>Si vous trouvez un port ouvert inutile, retirez-le. UFW fait correspondre les règles par leur spécification.</p>
        <pre><code><span class="cmt"># Lister les règles avec des numéros</span>
sudo ufw status numbered

<span class="cmt"># Supprimer la règle numéro 3</span>
sudo ufw delete 3

<span class="cmt"># Refuser explicitement un port</span>
sudo ufw deny 23/tcp

<span class="cmt"># Désactiver le pare-feu (rarement nécessaire)</span>
sudo ufw disable</code></pre>
        <p>Telnet (23), FTP (21) et les autres services en clair devraient généralement être refusés &mdash; et idéalement les services eux-mêmes désactivés.</p>
      ` },
      { title: 'Lire iptables directement', html: `
        <p>UFW est une enveloppe ; les vraies règles vivent dans iptables. Pouvoir les lire prouve que vous comprenez ce qui est réellement appliqué.</p>
        <pre><code><span class="cmt"># Lister les règles avec des numéros de ligne</span>
sudo iptables -L -v -n --line-numbers

<span class="cmt"># Regarder la politique de la chaîne INPUT</span>
sudo iptables -S</code></pre>
        <p>Une chaîne INPUT saine se termine par une politique <code>DROP</code> ou <code>REJECT</code>. Si elle est <code>ACCEPT</code>, la machine accepte tout par défaut.</p>
        <div class="callout tip"><strong>Enregistrez vos règles.</strong> Les règles iptables disparaissent au redémarrage à moins d\u2019être persistées. UFW le gère automatiquement ; iptables brut a besoin de <code>iptables-persistent</code>.</div>
      ` },
      { title: 'Voir ce qui écoute', html: `
        <p>Un pare-feu n\u2019est que la moitié de l\u2019histoire &mdash; vous devez aussi savoir quels services écoutent, afin de décider ce qui mérite même un port.</p>
        <pre><code><span class="cmt"># Outil moderne : afficher les sockets TCP/UDP en écoute avec les processus</span>
sudo ss -tulpn

<span class="cmt"># Équivalent hérité</span>
sudo netstat -tulpn</code></pre>
        <p>Pour chaque service en écoute, demandez : le README l\u2019exige-t-il ? Sinon, arrêtez-le et désactivez-le (couvert dans le prochain module) et fermez son port.</p>
      ` },
      { title: 'Liste de vérification — pare-feu', html: `
        <ol>
          <li><code>sudo ufw status verbose</code> &mdash; est-il actif ?</li>
          <li>Politique par défaut : refuser entrant, autoriser sortant.</li>
          <li>Autorisez seulement les ports dont le scénario a besoin (souvent 22, 80, 443).</li>
          <li>Refusez/retirez Telnet, FTP et les autres services en clair.</li>
          <li><code>sudo ss -tulpn</code> &mdash; conciliez les ports en écoute avec le pare-feu.</li>
          <li>Confirmez que la politique INPUT est DROP/REJECT.</li>
          <li>Assurez-vous que les règles survivent à un redémarrage.</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle est la politique UFW par défaut recommandée ?', opts: ['Autoriser entrant', 'Refuser entrant', 'Refuser sortant', 'Tout autoriser'], answer: 1, explain: 'Le refus par défaut du trafic entrant est la posture sécurisée.' },
      { q: 'Quelle commande montre les règles UFW avec des numéros ?', opts: ['ufw list', 'ufw status numbered', 'ufw show', 'iptables -L'], answer: 1, explain: 'ufw status numbered permet de supprimer par index.' },
      { q: 'Que signifie une politique DROP sur la chaîne INPUT ?', opts: ['Tout accepter', 'Refuser tout le trafic entrant par défaut', 'Autoriser SSH', 'Désactiver le pare-feu'], answer: 1, explain: 'DROP écarte le trafic entrant non correspondant.' },
      { q: 'Quelle commande liste les ports en écoute avec les processus ?', opts: ['ss -tulpn', 'ufw status', 'ipconfig', 'ls -l'], answer: 0, explain: 'ss -tulpn montre les sockets et leurs processus propriétaires.' },
      { q: 'Pourquoi autoriser le port 22 avant d\u2019activer UFW à distance ?', opts: ['C\u2019est exigé par la loi', 'Sinon vous coupez votre propre connexion SSH', 'Pour accélérer le pare-feu', 'Ce n\u2019est pas nécessaire'], answer: 1, explain: 'Activer UFW sans autoriser SSH bloquerait votre session.' }
    ]
  },

  /* ===================== LIN 7 ===================== */
  {
    id: 'lin-7', track: 'linux', num: 7,
    title: 'Paquets, services et mises à jour du système',
    summary: 'Appliquez les correctifs avec apt, retirez les logiciels non sécurisés, désactivez les services inutiles et auditez la persistance par cron et au démarrage.',
    tags: ['linux', 'apt', 'systemctl', 'services', 'updates', 'cron', 'persistence'],
    slides: [
      { title: 'Garder le système à jour', html: `
        <p>Les logiciels non corrigés sont la façon la plus courante dont les systèmes sont compromis. Sur Debian/Ubuntu/Mint, le gestionnaire de paquets est <strong>apt</strong>.</p>
        <pre><code><span class="cmt"># Rafraîchir l'index des paquets</span>
sudo apt update

<span class="cmt"># Installer les mises à niveau disponibles</span>
sudo apt upgrade -y

<span class="cmt"># Mise à niveau complète (gère les changements de dépendances)</span>
sudo apt full-upgrade -y

<span class="cmt"># Supprimer les paquets devenus inutiles</span>
sudo apt autoremove -y</code></pre>
        <div class="callout tip"><strong>Les images de compétition peuvent être hors ligne.</strong> S\u2019il n\u2019y a pas d\u2019Internet, vous ne pouvez pas mettre à jour. Notez-le dans votre journal et passez à autre chose &mdash; ne gaspillez pas l\u2019horloge.</div>
      ` },
      { title: 'Retirer les logiciels non sécurisés', html: `
        <p>Des services anciens et non sécurisés sont déposés comme trouvailles. Coupables courants : <strong>telnet</strong>, <strong>rsh</strong>, <strong>ftp</strong>, <strong>vsftpd</strong> et <strong>telnetd</strong>. Si le README ne les exige pas, retirez-les.</p>
        <pre><code><span class="cmt"># Lister les paquets installés</span>
dpkg -l | less

<span class="cmt"># Chercher un paquet précis</span>
dpkg -l | grep -i telnet

<span class="cmt"># Le retirer (et sa configuration)</span>
sudo apt purge telnetd -y

<span class="cmt"># Retirer un jeu ou un outil interdit par le README</span>
sudo apt purge <paquet> -y</code></pre>
        <p>Vérifiez aussi les logiciels hors paquets dans <code>/opt</code>, <code>/usr/local</code> et les répertoires personnels des utilisateurs.</p>
      ` },
      { title: 'Gérer les services avec systemctl', html: `
        <p>Linux moderne utilise <strong>systemd</strong>. Un service qui est <em>en cours d\u2019exécution</em> ou <em>activé au démarrage</em> mais non nécessaire est une trouvaille.</p>
        <pre><code><span class="cmt"># Lister les services en cours d'exécution</span>
systemctl list-units --type=service --state=running

<span class="cmt"># Lister les services activés au démarrage</span>
systemctl list-unit-files --state=enabled

<span class="cmt"># Arrêter un service maintenant et le désactiver au démarrage</span>
sudo systemctl stop apache2
sudo systemctl disable apache2

<span class="cmt"># Vérifier un service</span>
systemctl status ssh</code></pre>
        <div class="callout warn"><strong>Ne désactivez pas l\u2019essentiel.</strong> Ne désactivez jamais <code>ssh</code> si vous êtes à distance, ni les services essentiels comme <code>systemd-journald</code>. Vérifiez auprès du README.</div>
      ` },
      { title: 'Auditer les tâches planifiées (cron)', html: `
        <p>Les attaquants adorent cron : une tâche planifiée exécute leur code en boucle, même après un redémarrage. Auditer cron est une étape classique de criminalistique.</p>
        <pre><code><span class="cmt"># Tâches cron de l'utilisateur actuel</span>
crontab -l

<span class="cmt"># Tâches cron de chaque utilisateur (en root)</span>
sudo crontab -l -u alice

<span class="cmt"># Fichiers cron à l'échelle du système</span>
cat /etc/crontab
ls -l /etc/cron.d/ /etc/cron.daily/ /etc/cron.hourly/

<span class="cmt"># Chercher une commande suspecte dans tous les emplacements cron</span>
sudo grep -r "curl\|wget\|nc " /etc/cron* /var/spool/cron 2>/dev/null</code></pre>
      ` },
      { title: 'Persistance au démarrage et dans l\u2019interpréteur', html: `
        <p>Au-delà de cron, les logiciels malveillants persistent via les fichiers de démarrage de l\u2019interpréteur et les unités systemd. Vérifiez-les sur chaque image.</p>
        <pre><code><span class="cmt"># Fichiers de démarrage de l'interpréteur (par utilisateur et à l'échelle du système)</span>
cat ~/.bashrc ~/.profile ~/.bash_profile
cat /etc/profile /etc/bash.bashrc

<span class="cmt"># Unités systemd suspectes</span>
ls -l /etc/systemd/system/
systemctl list-unit-files --state=enabled

<span class="cmt"># rc.local (systèmes plus anciens)</span>
cat /etc/rc.local 2>/dev/null</code></pre>
        <div class="callout danger"><strong>Lisez avant de supprimer.</strong> Si vous trouvez une persistance malveillante, notez le chemin et la commande exacts &mdash; c\u2019est souvent la réponse à une question de criminalistique &mdash; puis retirez-la.</div>
      ` },
      { title: 'Liste de vérification — paquets et services', html: `
        <ol>
          <li><code>sudo apt update &amp;&amp; sudo apt upgrade -y</code> si en ligne.</li>
          <li><code>dpkg -l | grep -iE 'telnet|ftp|rsh'</code> &mdash; purgez les services non sécurisés.</li>
          <li>Retirez les jeux/outils interdits listés dans le README.</li>
          <li><code>systemctl list-unit-files --state=enabled</code> &mdash; désactivez les services inutiles.</li>
          <li>Conciliez les services en cours avec <code>ss -tulpn</code>.</li>
          <li>Auditez <code>crontab -l</code>, <code>/etc/crontab</code>, <code>/etc/cron.*</code>.</li>
          <li>Vérifiez <code>~/.bashrc</code>, <code>/etc/profile</code> et les unités systemd pour la persistance.</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande installe les mises à jour de sécurité disponibles sur Debian/Ubuntu ?', opts: ['apt update && apt upgrade', 'yum update', 'pacman -Syu', 'brew upgrade'], answer: 0, explain: 'apt update rafraîchit l\u2019index ; apt upgrade installe les mises à jour.' },
      { q: 'Quelle commande désactive un service au démarrage ?', opts: ['systemctl stop svc', 'systemctl disable svc', 'service svc off', 'kill svc'], answer: 1, explain: 'disable empêche son démarrage au boot (stop l\u2019arrête maintenant).' },
      { q: 'Où chercheriez-vous une tâche planifiée malveillante ?', opts: ['/etc/hosts', 'crontab -l et /etc/cron.d', '/etc/passwd', '/var/log/apt'], answer: 1, explain: 'Cron est le mécanisme de persistance classique.' },
      { q: 'Quel outil liste les paquets installés ?', opts: ['dpkg -l', 'lsmod', 'systemctl', 'ss'], answer: 0, explain: 'dpkg -l liste les paquets Debian installés.' },
      { q: 'Pourquoi telnet est-il une trouvaille ?', opts: ['Il est trop rapide', 'Il envoie les identifiants en clair', 'Il utilise trop de RAM', 'Il est libre'], answer: 1, explain: 'Telnet n\u2019est pas chiffré ; utilisez SSH à la place.' }
    ]
  }
);
