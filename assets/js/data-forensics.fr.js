/* ============================================================
   DONNÉES — Volet Criminalistique et stratégie
   Questions de criminalistique, chasse aux logiciels malveillants,
   chiffrement, stratégie d'équipe
   ============================================================ */
window.CDA_DATA_FR = window.CDA_DATA_FR || { tracks: [], modules: [] };

window.CDA_DATA_FR.modules.push(
  /* ===================== FORE 1 ===================== */
  {
    id: 'fore-1', track: 'forensics', num: 1,
    title: 'Répondre aux questions de criminalistique',
    summary: 'Apprenez ce que demandent les questions de criminalistique, comment trouver les preuves sur Windows et Linux et comment y répondre avec précision sous pression.',
    tags: ['forensics', 'questions', 'investigation', 'evidence', 'logs', 'method'],
    slides: [
      { title: 'Ce que sont les questions de criminalistique', html: `
        <p>Chaque image CyberPatriot et CyberTitan comprend un ensemble de <strong>questions de criminalistique</strong>. Contrairement aux tâches de durcissement, elles ont une seule bonne réponse chacune et valent un nombre fixe de points. Elles récompensent l'<em>investigation</em>, pas la configuration.</p>
        <p>Les questions typiques ressemblent à :</p>
        <ul>
          <li>« Quel est le nom du compte non autorisé qui a été créé sur ce système ? »</li>
          <li>« Quel est le chemin du fichier malveillant qui s'exécute au démarrage ? »</li>
          <li>« Quel est le mot de passe de l'utilisateur caché ? » (trouvé en cassant une empreinte faible)</li>
          <li>« Quel service a été installé pour fournir un accès à distance ? »</li>
          <li>« Quelle est l'adresse MAC de l'appareil pirate ? » (Cisco)</li>
        </ul>
        <div class="callout tip"><strong>Répondez exactement.</strong> Les réponses de criminalistique sont habituellement sensibles à la casse et doivent correspondre précisément. Un chemin complet, pas seulement un nom de fichier. Copiez-collez lorsque possible.</div>
      ` },
      { title: 'Une méthode d\u2019investigation reproductible', html: `
        <p>Ne devinez pas. Travaillez toujours de la même façon :</p>
        <ol>
          <li><strong>Lisez la question attentivement.</strong> Notez exactement ce qui est demandé (un nom d'utilisateur ? un chemin ? un port ?).</li>
          <li><strong>Identifiez le type d'artefact.</strong> Compte, fichier, service, tâche planifiée, appareil réseau ?</li>
          <li><strong>Allez à la source de vérité.</strong> Les comptes vivent dans la base d'utilisateurs ; les éléments de démarrage dans les emplacements de démarrage ; les services dans le gestionnaire de services.</li>
          <li><strong>Corroborez.</strong> Confirmez avec une seconde commande ou les journaux.</li>
          <li><strong>Notez et répondez.</strong> Écrivez-le, puis soumettez la valeur exacte.</li>
        </ol>
        <div class="callout"><strong>Limitez le temps.</strong> Les questions de criminalistique peuvent être des gouffres. Si vous êtes bloqué après quelques minutes, notez-le et passez à autre chose &mdash; revenez après avoir terminé les tâches de durcissement.</div>
      ` },
      { title: 'Trouver les comptes et les groupes', html: `
        <p>Les questions sur les comptes sont les plus courantes. Sur Windows :</p>
        <pre><code><span class="cmt">:: Tous les utilisateurs locaux et leur état</span>
net user
<span class="cmt">:: Détails d'un compte</span>
net user suspicioususer
<span class="cmt">:: Qui est administrateur</span>
net localgroup Administrators
<span class="cmt">:: PowerShell : comptes créés récemment</span>
Get-LocalUser | Sort-Object -Property PasswordLastSet</code></pre>
        <p>Sur Linux :</p>
        <pre><code><span class="cmt"># Comptes avec un interpréteur de connexion</span>
grep -vE '/(nologin|false)$' /etc/passwd
<span class="cmt"># Comptes UID 0 supplémentaires</span>
awk -F: '$3==0 {print $1}' /etc/passwd
<span class="cmt"># Comptes modifiés récemment</span>
stat /etc/passwd</code></pre>
      ` },
      { title: 'Trouver les fichiers et les chemins', html: `
        <p>Les questions sur les fichiers demandent le chemin complet de quelque chose de malveillant. Cherchez par nom, par emplacement et par heure de modification.</p>
        <pre><code><span class="cmt"># Linux : trouver les exécutables dans les répertoires temp/personnels</span>
sudo find /tmp /var/tmp /home -type f -executable 2>/dev/null
<span class="cmt"># Fichiers modifiés récemment</span>
sudo find / -mtime -1 -type f 2>/dev/null | less
<span class="cmt"># Chercher un mot-clé dans le contenu des fichiers</span>
sudo grep -rl "malware" /home /etc 2>/dev/null</code></pre>
        <pre><code><span class="cmt">:: Windows : recherche PowerShell par nom</span>
Get-ChildItem C:\\ -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "*hack*" }
<span class="cmt">:: Fichiers créés récemment</span>
Get-ChildItem C:\\ -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.CreationTime -gt (Get-Date).AddDays(-1) }</code></pre>
      ` },
      { title: 'Journaux, services et tâches planifiées', html: `
        <p>Beaucoup de questions pointent vers la persistance. Vérifiez ces emplacements :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Artefact</th><th>Windows</th><th>Linux</th></tr></thead>
          <tbody>
            <tr><td>Services</td><td><code>services.msc</code>, <code>Get-Service</code></td><td><code>systemctl list-units</code></td></tr>
            <tr><td>Tâches planifiées</td><td><code>taskschd.msc</code>, <code>schtasks /query</code></td><td><code>crontab -l</code>, <code>/etc/cron.*</code></td></tr>
            <tr><td>Démarrage</td><td><code>Get-CimInstance Win32_StartupCommand</code></td><td><code>~/.bashrc</code>, <code>/etc/profile</code></td></tr>
            <tr><td>Journaux</td><td>Observateur d'événements, <code>Get-WinEvent</code></td><td><code>/var/log/</code></td></tr>
          </tbody>
        </table></div>
        <pre><code><span class="cmt"># Linux : activité d'authentification récente</span>
sudo tail -n 50 /var/log/auth.log
<span class="cmt">:: Windows : connexions récentes</span>
Get-WinEvent -LogName Security -MaxEvents 50</code></pre>
      ` },
      { title: 'Liste de vérification — réponses de criminalistique', html: `
        <ol>
          <li>Lisez chaque question et notez exactement ce qui est requis.</li>
          <li>Cherchez dans la bonne source (comptes, fichiers, services, tâches, journaux).</li>
          <li>Corroborez avec une seconde commande.</li>
          <li>Notez la valeur exacte (chemin complet, nom d'utilisateur exact).</li>
          <li>Soumettez précisément &mdash; attention à la casse.</li>
          <li>Limitez le temps ; revenez aux plus difficiles plus tard.</li>
          <li>Gardez vos notes &mdash; elles aident toute l'équipe.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Les réponses de criminalistique sont habituellement :', opts: ['Approximatives', 'Sensibles à la casse et exactes', 'À choix multiples', 'Facultatives'], answer: 1, explain: 'Elles doivent correspondre précisément, souvent avec les chemins complets.' },
      { q: 'Quelle commande Linux trouve les comptes UID 0 supplémentaires ?', opts: ["awk -F: '$3==0 {print $1}' /etc/passwd", 'ls /home', 'whoami', 'groups'], answer: 0, explain: 'Elle affiche tout compte avec l\u2019UID 0.' },
      { q: 'Où cherchez-vous les tâches planifiées sur Windows ?', opts: ['services.msc', 'taskschd.msc', 'lusrmgr.msc', 'wf.msc'], answer: 1, explain: 'Le Planificateur de tâches (taskschd.msc) gère les tâches planifiées.' },
      { q: 'Quelle est une bonne première étape pour une question de criminalistique ?', opts: ['Deviner', 'Lire exactement ce qui est demandé', 'Redémarrer', 'Supprimer des fichiers'], answer: 1, explain: 'Identifiez d\u2019abord précisément quel artefact est requis.' },
      { q: 'Où sont consignés les événements d\u2019authentification Linux ?', opts: ['/var/log/auth.log', '/etc/passwd', '/tmp', 'C:\\\\Windows'], answer: 0, explain: '/var/log/auth.log consigne l\u2019activité d\u2019authentification.' }
    ]
  },

  /* ===================== FORE 2 ===================== */
  {
    id: 'fore-2', track: 'forensics', num: 2,
    title: 'Chasse aux logiciels malveillants et fichiers suspects',
    summary: 'Traquez les exécutables pirates, les portes dérobées et la persistance sur Windows et Linux, et comprenez comment les attaquants se cachent et comment vous les trouvez.',
    tags: ['forensics', 'malware', 'backdoor', 'persistence', 'suspicious files', 'hunting'],
    slides: [
      { title: 'Comment les logiciels malveillants se cachent sur une image de compétition', html: `
        <p>Les images de compétition déposent des « logiciels malveillants » délibérément trouvables &mdash; le but est de tester si vous savez où chercher. Astuces courantes :</p>
        <ul>
          <li>Un fichier au nom tentant (<code>passwords.txt</code>, <code>hack.exe</code>) dans un emplacement inhabituel.</li>
          <li>Un fichier caché (préfixé d'un point sur Linux, attribut caché sur Windows).</li>
          <li>Un utilisateur de porte dérobée au nom plausible.</li>
          <li>Une tâche planifiée ou une tâche cron qui relance la charge utile.</li>
          <li>Un port en écoute qui ne devrait pas être ouvert.</li>
        </ul>
        <div class="callout tip"><strong>Pensez comme l'auteur.</strong> L'auteur de l'image veut que vous le trouviez. Demandez-vous « où mettrais-je une porte dérobée si j'écrivais ce scénario ? »</div>
      ` },
      { title: 'Chasser sur Windows', html: `
        <pre><code><span class="cmt">:: Trouver les fichiers cachés</span>
Get-ChildItem C:\\ -Recurse -Force -ErrorAction SilentlyContinue |
  Where-Object { $_.Attributes -match 'Hidden' }

<span class="cmt">:: Exécutables créés récemment</span>
Get-ChildItem C:\\ -Recurse -Include *.exe,*.bat,*.ps1 -ErrorAction SilentlyContinue |
  Where-Object { $_.CreationTime -gt (Get-Date).AddDays(-2) }

<span class="cmt">:: Programmes de démarrage</span>
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location

<span class="cmt">:: Ports en écoute et processus propriétaires</span>
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess</code></pre>
      ` },
      { title: 'Chasser sur Linux', html: `
        <pre><code><span class="cmt"># Exécutables dans les répertoires modifiables par tous ou temporaires</span>
sudo find /tmp /var/tmp /dev/shm -type f -executable 2>/dev/null

<span class="cmt"># Fichiers cachés dans les répertoires personnels</span>
find /home -name ".*" -type f 2>/dev/null

<span class="cmt"># Fichiers modifiés au cours du dernier jour</span>
sudo find / -mtime -1 -type f 2>/dev/null | grep -vE '^/(proc|sys|run)'

<span class="cmt"># Sockets en écoute avec les processus</span>
sudo ss -tulpn

<span class="cmt"># Binaires SUID hors de l'ensemble standard</span>
sudo find / -perm -4000 -type f 2>/dev/null</code></pre>
        <div class="callout warn"><strong>/dev/shm et /tmp sont des favoris.</strong> Ils sont modifiables par tous et souvent négligés. Balayez-les toujours.</div>
      ` },
      { title: 'Repérer la persistance', html: `
        <p>Un logiciel malveillant qui ne persiste pas est une nuisance ponctuelle ; celui qui persiste est une porte dérobée. Traquez les mécanismes de persistance.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Windows</h3><ul><li>Clés de registre Run / RunOnce</li><li>Dossier Démarrage</li><li>Planificateur de tâches</li><li>Services (démarrage auto)</li><li>Winlogon shell/userinit</li></ul></div>
          <div class="pillarCard"><h3>Linux</h3><ul><li>cron (utilisateur + système)</li><li>Unités systemd</li><li>~/.bashrc, /etc/profile</li><li>rc.local</li><li>SSH authorized_keys</li></ul></div>
        </div>
        <pre><code><span class="cmt"># Linux : vérifier les clés SSH inattendues</span>
cat ~/.ssh/authorized_keys
<span class="cmt">:: Windows : clés Run</span>
reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</code></pre>
      ` },
      { title: 'Que faire lorsque vous le trouvez', html: `
        <p>Trouver un logiciel malveillant n'est que la moitié de la tâche. Traitez-le correctement :</p>
        <ol>
          <li><strong>Notez le chemin et le nom exacts</strong> &mdash; cela peut être une réponse de criminalistique.</li>
          <li><strong>Cherchez un processus en cours</strong> et notez son PID.</li>
          <li><strong>Retirez la persistance</strong> (la tâche, l'entrée cron ou l'élément de démarrage) pour qu'il ne puisse pas se relancer.</li>
          <li><strong>Supprimez ou mettez en quarantaine le fichier</strong> (utilisez Defender sur Windows lorsque possible).</li>
          <li><strong>Arrêtez le processus</strong> s'il est en cours.</li>
          <li><strong>Refaites une analyse</strong> pour confirmer qu'il a disparu.</li>
        </ol>
        <div class="callout danger"><strong>L'ordre compte.</strong> Si vous supprimez le fichier mais laissez la tâche planifiée, la tâche échoue sans conséquence. Si vous supprimez la tâche mais laissez le fichier, il reste dormant. Retirez les deux.</div>
      ` },
      { title: 'Liste de vérification — chasse aux logiciels malveillants', html: `
        <ol>
          <li>Lancez une analyse antivirus complète (Windows Defender / ClamAV).</li>
          <li>Cherchez des exécutables dans les répertoires temp, personnels et modifiables par tous.</li>
          <li>Trouvez les fichiers cachés et modifiés récemment.</li>
          <li>Examinez les éléments de démarrage, les services et les tâches planifiées.</li>
          <li>Vérifiez les ports en écoute par rapport aux services attendus.</li>
          <li>Inspectez <code>authorized_keys</code> SSH et les fichiers de démarrage de l'interpréteur.</li>
          <li>Retirez la persistance, puis le fichier, puis le processus.</li>
          <li>Consignez tout pour l'équipe.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quels répertoires Linux sont des favoris pour les logiciels malveillants déposés ?', opts: ['/etc, /bin', '/tmp, /var/tmp, /dev/shm', '/usr/share', '/root'], answer: 1, explain: 'Les répertoires temporaires modifiables par tous sont souvent abusés.' },
      { q: 'Quelle commande liste les sockets en écoute avec les processus sur Linux ?', opts: ['ss -tulpn', 'ls -l', 'cat /etc/passwd', 'df -h'], answer: 0, explain: 'ss -tulpn montre les sockets et les processus propriétaires.' },
      { q: 'Sur Windows, quelle clé de registre est un emplacement de persistance courant ?', opts: ['HKLM\\\\...\\\\Run', 'HKLM\\\\...\\\\Print', 'HKCU\\\\...\\\\Colors', 'HKLM\\\\...\\\\Fonts'], answer: 0, explain: 'La clé Run lance des programmes à la connexion.' },
      { q: 'Ordre correct lors du retrait d\u2019un logiciel malveillant ?', opts: ['Supprimer le fichier seulement', 'Retirer la persistance, puis le fichier, puis le processus', 'Redémarrer d\u2019abord', 'Arrêter le processus seulement'], answer: 1, explain: 'Retirez la persistance d\u2019abord pour qu\u2019il ne puisse pas se relancer.' },
      { q: 'Quel fichier pourrait cacher une porte dérobée d\u2019attaquant sur Linux ?', opts: ['~/.ssh/authorized_keys', '/etc/hostname', '/etc/timezone', '/etc/motd'], answer: 0, explain: 'Une clé ajoutée accorde un accès persistant.' }
    ]
  },

  /* ===================== FORE 3 ===================== */
  {
    id: 'fore-3', track: 'forensics', num: 3,
    title: 'Chiffrement, hachage et protection des données',
    summary: 'Distinguez chiffrement et hachage, cassez les mots de passe faibles pour répondre aux questions et protégez les données au repos avec les bons outils.',
    tags: ['forensics', 'encryption', 'hashing', 'password cracking', 'john', 'data protection'],
    slides: [
      { title: 'Chiffrement ou hachage', html: `
        <p>Ces deux notions sont constamment confondues, et les compétitions testent la différence.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Chiffrement</h3><p class="small">Réversible <em>avec une clé</em>. Protège les données en transit et au repos. Exemples : AES, RSA, TLS. Chiffrer &rarr; déchiffrer.</p></div>
          <div class="pillarCard"><h3>Hachage</h3><p class="small">À sens unique. Utilisé pour l'intégrité et le stockage des mots de passe. Exemples : SHA-256, bcrypt. On ne peut pas « déhacher » &mdash; on compare.</p></div>
        </div>
        <p>Les mots de passe sont <em>hachés</em>, jamais chiffrés. Lorsque vous « cassez » un mot de passe, vous devinez des entrées jusqu'à ce qu'une produise l'empreinte stockée.</p>
      ` },
      { title: 'Pourquoi les empreintes faibles tombent', html: `
        <p>Une empreinte n'est aussi forte que le mot de passe derrière elle. Les empreintes rapides et non salées (comme MD5 ou SHA-1 simple) tombent rapidement à coups de liste de mots ou de force brute. Les systèmes modernes utilisent des empreintes lentes et salées (bcrypt, SHA-512 crypt).</p>
        <pre><code><span class="cmt"># Les empreintes Linux vivent dans /etc/shadow</span>
sudo cat /etc/shadow
<span class="cmt"># Format : user:$id$salt$hash:...</span>
<span class="cmt"># $1$ = MD5, $5$ = SHA-256, $6$ = SHA-512, $y$ = yescrypt</span></code></pre>
        <div class="callout tip"><strong>Tour de compétition.</strong> Une question peut vous donner une empreinte et une liste de mots et demander le mot de passe. Les mots de passe faibles et bien connus (comme <code>password1</code> ou <code>letmein</code>) sont cassables en quelques secondes.</div>
      ` },
      { title: 'Casser un mot de passe faible', html: `
        <p><strong>John the Ripper</strong> est l'outil standard. Il lit le fichier shadow, devine les mots de passe et affiche ceux qu'il récupère.</p>
        <pre><code><span class="cmt"># Combiner passwd et shadow en un fichier que John peut lire</span>
sudo unshadow /etc/passwd /etc/shadow &gt; hashes.txt

<span class="cmt"># Lancer John avec la liste de mots par défaut</span>
john hashes.txt

<span class="cmt"># Afficher les mots de passe récupérés</span>
john --show hashes.txt</code></pre>
        <div class="callout warn"><strong>Seulement sur votre propre image.</strong> Le cassage de mots de passe est légitime ici parce que vous êtes l'administrateur de la machine de compétition. Ne faites jamais cela sur des systèmes que vous ne possédez pas.</div>
      ` },
      { title: 'Protéger les données au repos', html: `
        <p>Au-delà de la criminalistique de compétition, les défenseurs chiffrent les données sensibles pour qu'un disque volé soit inutile. Les outils diffèrent selon la plateforme.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Plateforme</th><th>Outil</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td>Windows</td><td>BitLocker</td><td>Chiffrement de disque complet</td></tr>
            <tr><td>Windows</td><td>EFS</td><td>Chiffrement par fichier/dossier</td></tr>
            <tr><td>Linux</td><td>LUKS</td><td>Chiffrement de disque complet</td></tr>
            <tr><td>Linux</td><td>gpg</td><td>Chiffrement de fichiers et de messages</td></tr>
            <tr><td>Multi</td><td>7-Zip / AES</td><td>Archives chiffrées</td></tr>
          </tbody>
        </table></div>
        <pre><code><span class="cmt"># Chiffrer un fichier avec GPG (symétrique)</span>
gpg -c secret.txt
<span class="cmt"># Le déchiffrer</span>
gpg -d secret.txt.gpg</code></pre>
      ` },
      { title: 'Intégrité par les empreintes', html: `
        <p>Les empreintes servent aussi à vérifier qu'un fichier n'a pas changé. Si l'empreinte correspond à la valeur publiée, le téléchargement est intact et non altéré.</p>
        <pre><code><span class="cmt"># Linux</span>
sha256sum important.iso
<span class="cmt">:: Windows PowerShell</span>
Get-FileHash important.iso -Algorithm SHA256</code></pre>
        <p>Dans une compétition, un changement inattendu de l'empreinte d'un fichier système peut être un indice qu'il a été altéré.</p>
      ` },
      { title: 'Liste de vérification — chiffrement et hachage', html: `
        <ol>
          <li>Connaissez la différence : le chiffrement est réversible, le hachage ne l'est pas.</li>
          <li>Vérifiez l'algorithme d'empreinte des mots de passe dans <code>/etc/shadow</code> (<code>$6$</code> est bon).</li>
          <li>Utilisez <code>unshadow</code> + <code>john</code> pour casser les mots de passe faibles afin de répondre aux questions de criminalistique.</li>
          <li>Vérifiez l'intégrité des fichiers avec <code>sha256sum</code> / <code>Get-FileHash</code>.</li>
          <li>Connaissez les outils de protection au repos : BitLocker, EFS, LUKS, gpg.</li>
          <li>Ne stockez jamais les mots de passe en clair ; hachez et salez toujours.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Lequel est à sens unique et utilisé pour le stockage des mots de passe ?', opts: ['Le chiffrement', 'Le hachage', 'La compression', 'L\u2019encodage'], answer: 1, explain: 'Le hachage est à sens unique ; les mots de passe sont hachés, pas chiffrés.' },
      { q: 'Qu\u2019indique le préfixe $6$ dans /etc/shadow ?', opts: ['MD5', 'SHA-256', 'SHA-512', 'bcrypt'], answer: 2, explain: '$6$ marque SHA-512 crypt.' },
      { q: 'Quel outil casse les mots de passe Linux faibles ?', opts: ['John the Ripper', 'gpg', 'sha256sum', 'ss'], answer: 0, explain: 'John the Ripper devine les mots de passe à partir des empreintes.' },
      { q: 'Quelle commande vérifie l\u2019empreinte d\u2019un fichier sur Windows ?', opts: ['Get-FileHash', 'sha256sum', 'md5', 'certutil -hash'], answer: 0, explain: 'Get-FileHash calcule une empreinte de fichier dans PowerShell.' },
      { q: 'Quel outil Linux fournit le chiffrement de disque complet ?', opts: ['LUKS', 'UFW', 'PAM', 'cron'], answer: 0, explain: 'LUKS est le format standard de chiffrement de disque sous Linux.' }
    ]
  },

  /* ===================== FORE 4 ===================== */
  {
    id: 'fore-4', track: 'forensics', num: 4,
    title: 'Stratégie d\u2019équipe et l\u2019horloge de la compétition',
    summary: 'Organisez une équipe, répartissez les rôles, triez pour maximiser les points, gérez l\u2019horloge et évitez les pénalités qui coulent les bonnes équipes.',
    tags: ['strategy', 'teamwork', 'time management', 'scoring', 'triage', 'rules'],
    slides: [
      { title: 'L\u2019horloge est le vrai adversaire', html: `
        <p>Une ronde CyberPatriot dure typiquement <strong>quatre heures</strong> pour les rondes en ligne, et vous ne pouvez pas tout terminer. Les équipes gagnantes ne travaillent pas plus fort &mdash; elles travaillent dans le bon <em>ordre</em>.</p>
        <p>Votre score est un total courant qui se met à jour à mesure que le moteur de notation détecte les changements. Les points viennent des éléments de durcissement et des réponses de criminalistique ; les pénalités viennent du fait de casser des services requis ou de supprimer des comptes autorisés.</p>
        <div class="callout tip"><strong>Le score est visible et en direct.</strong> Surveillez-le. Si un changement fait chuter votre score, annulez-le immédiatement &mdash; le journal que vous tenez vous dit quoi inverser.</div>
      ` },
      { title: 'Bâtir une équipe avec des rôles', html: `
        <p>Les équipes CyberPatriot alignent jusqu'à cinq compétiteurs à la fois (liste de six). CyberTitan permet de deux à six par équipe, jusqu'à cinq équipes par école. Attribuez des rôles clairs pour que personne ne se heurte.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Responsable Windows</h3><p class="small">S'occupe de l'image Windows : comptes, Defender, mises à jour, services.</p></div>
          <div class="pillarCard"><h3>Responsable Linux</h3><p class="small">S'occupe de l'image Linux : utilisateurs, PAM, permissions, SSH.</p></div>
          <div class="pillarCard"><h3>Responsable criminalistique</h3><p class="small">Répond aux questions et chasse les logiciels malveillants sur les deux images.</p></div>
          <div class="pillarCard"><h3>Responsable réseau</h3><p class="small">Gère le défi Cisco dans Packet Tracer.</p></div>
          <div class="pillarCard"><h3>Coordonnateur</h3><p class="small">Suit l'horloge, lit le README à voix haute, tient le journal, annonce le temps.</p></div>
        </div>
        <p>Les petites équipes fusionnent les rôles, mais chaque rôle doit être <em>attribué</em> à quelqu'un. Une équipe où tout le monde fait tout est une équipe où rien ne se termine.</p>
      ` },
      { title: 'Triage : points par minute', html: `
        <p>Certaines tâches rapportent beaucoup de points en quelques secondes ; d'autres prennent une demi-heure pour un point. Faites d'abord le travail rapide et à forte valeur.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Priorité</th><th>Tâche</th><th>Pourquoi</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Lire le README et le rapport de notation</td><td>Indique l'état cible</td></tr>
            <tr><td>2</td><td>Questions de criminalistique faciles à répondre</td><td>Points fixes, gains rapides</td></tr>
            <tr><td>3</td><td>Comptes et groupes (les deux OS)</td><td>Forte valeur, faible risque</td></tr>
            <tr><td>4</td><td>Politique de mots de passe, mises à jour, pare-feu</td><td>Standard, reproductible</td></tr>
            <tr><td>5</td><td>Services et retrait de logiciels</td><td>Valeur moyenne</td></tr>
            <tr><td>6</td><td>Criminalistique poussée et cas limites de durcissement</td><td>Coûteux en temps</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Les règles à ne pas enfreindre', html: `
        <p>CyberPatriot et CyberTitan ont des règles strictes. Les enfreindre peut disqualifier une équipe.</p>
        <ul>
          <li><strong>Pas d'Internet pendant la ronde</strong>, sauf là où c'est explicitement permis (le portail de notation).</li>
          <li><strong>Pas de listes de vérification préfabriquées et spécifiques à la compétition</strong> provenant d'autres équipes ou de rondes antérieures. La documentation générale est permise ; les notes manuscrites créées par votre équipe le sont aussi.</li>
          <li><strong>Pas d'aide extérieure.</strong> Les entraîneurs ne peuvent pas résoudre les tâches à la place des compétiteurs.</li>
          <li><strong>Pas d'attaque contre d'autres équipes ou l'infrastructure.</strong> C'est une compétition de défense.</li>
          <li><strong>Restez dans l'environnement fourni.</strong> Ne modifiez pas le moteur de notation.</li>
        </ul>
        <div class="callout danger"><strong>L'intégrité compte.</strong> Une disqualification efface chaque point gagné. Lisez les règles de la compétition chaque saison &mdash; elles sont mises à jour.</div>
      ` },
      { title: 'Communication et journal', html: `
        <p>Le coordonnateur tient un journal partagé : ce qui a changé, sur quelle machine, à quelle heure. Cette seule habitude évite les deux catastrophes les plus courantes :</p>
        <ol>
          <li><strong>Le travail en double</strong> &mdash; deux personnes corrigent la même chose et en ratent une autre.</li>
          <li><strong>Les erreurs irrécupérables</strong> &mdash; une chute de score sans trace de ce qui l'a causée.</li>
        </ol>
        <p>Utilisez un format simple et gardez-le visible pour toute l'équipe :</p>
        <pre><code><span class="cmt">14:05  WIN  Retiré mallory des Administrators   +pts</span>
<span class="cmt">14:12  LIN  PASS_MAX_DAYS=90 dans login.defs   +pts</span>
<span class="cmt">14:20  WIN  Spouleur d'impression désactivé -> score A CHUTÉ, réactivé</span></code></pre>
      ` },
      { title: 'Les 30 dernières minutes', html: `
        <p>Arrêtez de commencer de nouvelles tâches à une demi-heure de la fin. Utilisez le temps pour consolider.</p>
        <ol>
          <li><strong>Vérifiez</strong> que chaque changement a réellement pris effet.</li>
          <li><strong>Répondez</strong> aux questions de criminalistique que vous avez reportées.</li>
          <li><strong>Revérifiez</strong> le score pour les chutes inattendues et annulez la cause.</li>
          <li><strong>Enregistrez</strong> les configurations Cisco et tout travail non sauvegardé.</li>
          <li><strong>Confirmez</strong> qu'aucun service requis n'est arrêté et qu'aucun utilisateur autorisé ne manque.</li>
          <li><strong>Respirez.</strong> Soumettez calmement.</li>
        </ol>
        <div class="callout tip"><strong>La constance bat le génie.</strong> Une équipe qui termine de façon fiable la liste de vérification standard à chaque ronde surpassera une équipe qui mise sur des coups d'éclat ingénieux.</div>
      ` },
      { title: 'Liste de vérification — stratégie', html: `
        <ol>
          <li>Attribuez les rôles avant le début de la ronde.</li>
          <li>Lisez d'abord le README et le rapport de notation, ensemble.</li>
          <li>Travaillez dans l'ordre de triage : rapide et à forte valeur d'abord.</li>
          <li>Tenez un journal partagé et horodaté.</li>
          <li>Surveillez le score en direct ; annulez toute chute immédiatement.</li>
          <li>Respectez les règles : pas d'Internet, pas d'aide extérieure, pas de listes préfabriquées de compétition.</li>
          <li>Réservez les 30 dernières minutes pour la vérification et le nettoyage.</li>
          <li>Faites un débriefing après chaque ronde et améliorez la liste de vérification.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Que faire EN PREMIER dans une ronde ?', opts: ['Commencer à désactiver des services', 'Lire le README et le rapport de notation', 'Redémarrer', 'Lancer un antivirus'], answer: 1, explain: 'Le README définit l\u2019état cible selon lequel vous êtes noté.' },
      { q: 'Si un changement fait chuter votre score, vous devriez :', opts: ['L\u2019ignorer', 'L\u2019annuler immédiatement', 'Redémarrer', 'Supprimer l\u2019image'], answer: 1, explain: 'Le journal vous dit quoi inverser ; annulez la chute rapidement.' },
      { q: 'Qu\u2019est-ce qui est interdit en compétition ?', opts: ['Des notes manuscrites d\u2019équipe', 'Utiliser le README', 'Des listes de vérification préfabriquées et spécifiques à la compétition provenant d\u2019autrui', 'Un journal partagé'], answer: 2, explain: 'Les listes de vérification spécifiques à la compétition provenant d\u2019autrui sont interdites.' },
      { q: 'Quel est le rôle principal du coordonnateur ?', opts: ['Seulement pirater', 'Suivre l\u2019horloge et tenir le journal', 'Ignorer le score', 'Travailler seul'], answer: 1, explain: 'Le coordonnateur gère le temps et le journal partagé.' },
      { q: 'Sur quoi devraient porter les 30 dernières minutes ?', opts: ['De nouvelles tâches', 'La vérification et le nettoyage', 'Redémarrer', 'Redémarrer encore'], answer: 1, explain: 'Consolidez : vérifiez les changements, répondez aux questions reportées, enregistrez.' }
    ]
  }
);
