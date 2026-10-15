/* ============================================================
   DONNÉES — Parcours Renforcement Windows (fr-CA)
   ============================================================ */
window.CDA_DATA_FR = window.CDA_DATA_FR || { tracks: [], modules: [] };

window.CDA_DATA_FR.modules.push(
  /* ===================== WIN 1 ===================== */
  {
    id: 'win-1', track: 'windows', num: 1,
    title: 'Comptes et gestion des utilisateurs Windows',
    summary: 'Trouvez les comptes frauduleux, corrigez l\u2019appartenance aux groupes, désactivez le compte invité et gérez les utilisateurs locaux avec lusrmgr.msc, net et PowerShell.',
    tags: ['windows', 'utilisateurs', 'lusrmgr', 'administrateurs', 'invité', 'net user'],
    slides: [
      { title: 'Le constat le plus rentable', html: `
        <p>Sur presque chaque image Windows, les points les plus rapides viennent des <strong>erreurs d\u2019utilisateurs et de groupes</strong>. Le README vous indique exactement qui devrait être sur le système et qui devrait être administrateur &mdash; c\u2019est donc un exercice de comparaison, pas une chasse.</p>
        <p>Vos objectifs dans ce module :</p>
        <ul>
          <li>Lister chaque compte local et décider : conserver, désactiver ou supprimer.</li>
          <li>Vérifier qui est dans le groupe <strong>Administrateurs</strong> et retirer quiconque ne devrait pas y être.</li>
          <li>Vous assurer que le compte <strong>Invité</strong> est désactivé.</li>
          <li>Renommer ou désactiver les comptes par défaut dont le scénario n\u2019a pas besoin.</li>
        </ul>
      ` },
      { title: 'Ouvrir Utilisateurs et groupes locaux', html: `
        <p>L\u2019outil graphique est <strong>Utilisateurs et groupes locaux</strong>. Ouvrez-le avec la boîte de dialogue Exécuter (<kbd>Win</kbd>+<kbd>R</kbd>) :</p>
        <pre><code>lusrmgr.msc</code></pre>
        <p>Vous verrez deux nœuds :</p>
        <ul>
          <li><strong>Utilisateurs</strong> &mdash; chaque compte local. Un cercle rouge avec une flèche vers le bas signifie que le compte est désactivé.</li>
          <li><strong>Groupes</strong> &mdash; notamment <strong>Administrateurs</strong>, <strong>Utilisateurs</strong>, <strong>Invités</strong> et <strong>Utilisateurs du Bureau à distance</strong>.</li>
        </ul>
        <div class="callout tip"><strong>Éditions Familiale.</strong> Certaines éditions de Windows n\u2019ont pas <code>lusrmgr.msc</code>. Utilisez plutôt la ligne de commande ou PowerShell &mdash; les deux sont présentés plus loin dans ce module.</div>
      ` },
      { title: 'Lister les comptes depuis la ligne de commande', html: `
        <p>La ligne de commande est plus rapide et scriptable. Dans une invite de commandes élevée :</p>
        <pre><code><span class="cmt">:: Lister tous les utilisateurs locaux</span>
net user

<span class="cmt">:: Afficher les détails d'un compte</span>
net user alice

<span class="cmt">:: Lister les membres du groupe Administrateurs</span>
net localgroup Administrateurs

<span class="cmt">:: Lister les membres du groupe Utilisateurs</span>
net localgroup Utilisateurs</code></pre>
        <p>Équivalents PowerShell :</p>
        <pre><code><span class="cmt"># Tous les utilisateurs locaux</span>
Get-LocalUser
<span class="cmt"># Qui est administrateur?</span>
Get-LocalGroupMember -Group Administrators</code></pre>
      ` },
      { title: 'Retirer un administrateur frauduleux', html: `
        <p>Si le README indique que seul <code>alice</code> devrait être administrateur mais que <code>mallory</code> est aussi dans le groupe, retirez l\u2019appartenance excédentaire. Retirer du groupe est généralement préférable à la suppression du compte, sauf si le README indique que le compte ne devrait pas exister du tout.</p>
        <pre><code><span class="cmt">:: Retirer mallory de Administrateurs (conserve le compte)</span>
net localgroup Administrateurs mallory /delete

<span class="cmt">:: Équivalent PowerShell</span>
Remove-LocalGroupMember -Group Administrators -Member mallory</code></pre>
        <div class="callout warn"><strong>Ne vous verrouillez pas dehors.</strong> Ne retirez jamais le dernier administrateur, et ne retirez jamais le compte sous lequel vous êtes connecté, sauf si le scénario le demande. Conservez un admin fonctionnel.</div>
      ` },
      { title: 'Créer, désactiver et supprimer des comptes', html: `
        <p>Faites correspondre le système au README avec précision :</p>
        <pre><code><span class="cmt">:: Créer un utilisateur autorisé</span>
net user bob P@ssw0rd!2024 /add

<span class="cmt">:: L'ajouter à un groupe</span>
net localgroup Utilisateurs bob /add

<span class="cmt">:: Désactiver un compte qui ne devrait pas être actif</span>
net user guest /active:no

<span class="cmt">:: Supprimer un compte qui, selon le scénario, ne devrait pas exister</span>
net user mallory /delete</code></pre>
        <div class="callout"><strong>Désactiver ou supprimer.</strong> Si le README indique qu\u2019un utilisateur n\u2019est « pas autorisé », la suppression est généralement correcte. S\u2019il indique qu\u2019un compte est « temporairement » inutilisé, la désactivation est plus sûre. En cas de doute, relisez le scénario &mdash; et consignez votre décision.</div>
      ` },
      { title: 'Le compte invité et les comptes intégrés', html: `
        <p>Deux comptes intégrés demandent une attention sur chaque image :</p>
        <ul>
          <li><strong>Invité</strong> &mdash; accès sans mot de passe. Il devrait être <strong>désactivé</strong> sauf si le scénario en a explicitement besoin.</li>
          <li><strong>Administrateur</strong> &mdash; le superutilisateur intégré. Il est souvent désactivé par défaut; laissez-le désactivé sauf si requis, et s\u2019il doit être actif, donnez-lui un mot de passe robuste et envisagez de le renommer.</li>
        </ul>
        <pre><code><span class="cmt">:: Confirmer que l'invité est désactivé</span>
net user guest
<span class="cmt">:: Le désactiver au besoin</span>
net user guest /active:no</code></pre>
      ` },
      { title: 'Groupes, accès à distance et comptes masqués', html: `
        <p>Au-delà des Administrateurs, vérifiez ces groupes :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Groupe</th><th>Risque</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Administrateurs</td><td>Contrôle total</td><td>Seulement les admins autorisés</td></tr>
            <tr><td>Utilisateurs du Bureau à distance</td><td>Connexion à distance</td><td>Retirer les membres non autorisés</td></tr>
            <tr><td>Utilisateurs de gestion à distance</td><td>Accès WinRM</td><td>Restreindre</td></tr>
            <tr><td>Opérateurs de sauvegarde</td><td>Peuvent lire n\u2019importe quel fichier</td><td>Rarement nécessaire &mdash; vider</td></tr>
          </tbody>
        </table></div>
        <p>Surveillez aussi les <strong>comptes masqués</strong> &mdash; un utilisateur dont le nom se termine par <code>$</code> est masqué de <code>net user</code> mais visible dans <code>lusrmgr.msc</code> et avec PowerShell. Cherchez les comptes aux noms inattendus ou sans description.</p>
      ` },
      { title: 'Liste de vérification des comptes Windows', html: `
        <div class="callout tip"><strong>Exécutez ceci à chaque ronde.</strong></div>
        <ol>
          <li>Lisez les listes d\u2019utilisateurs autorisés et d\u2019admins du README.</li>
          <li><code>net user</code> &mdash; comparez chaque compte à la liste.</li>
          <li><code>net localgroup Administrateurs</code> &mdash; retirez les admins en trop.</li>
          <li>Désactivez <strong>Invité</strong>; vérifiez l\u2019<strong>Administrateur</strong> intégré.</li>
          <li>Vérifiez les groupes Bureau à distance / Gestion à distance.</li>
          <li>Cherchez les comptes masqués (noms se terminant par <code>$</code>).</li>
          <li>Consignez chaque changement effectué.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande liste les membres du groupe Administrateurs?', opts: ['net user', 'net localgroup Administrateurs', 'net share', 'ipconfig /all'], answer: 1, explain: 'net localgroup Administrateurs liste les membres du groupe.' },
      { q: 'Le compte Invité devrait normalement être :', opts: ['Activé sans mot de passe', 'Désactivé', 'Administrateur', 'Supprimé du registre'], answer: 1, explain: 'Invité permet un accès sans mot de passe et devrait être désactivé sauf si requis.' },
      { q: 'Un nom d\u2019utilisateur se terminant par $ sous Windows indique généralement :', opts: ['Un administrateur', 'Un compte masqué', 'Un compte de service sécuritaire', 'Un compte désactivé'], answer: 1, explain: 'Les comptes se terminant par $ sont masqués de la sortie de net user.' },
      { q: 'Quelle est l\u2019action la plus sûre lorsque le README indique qu\u2019un utilisateur n\u2019est « pas autorisé »?', opts: ['L\u2019ignorer', 'Supprimer le compte', 'Le nommer admin', 'Changer son mot de passe'], answer: 1, explain: 'Un compte non autorisé doit être supprimé; la désactivation est pour les comptes temporairement inutilisés.' },
      { q: 'Quel groupe peut lire n\u2019importe quel fichier du système et devrait habituellement être vide?', opts: ['Utilisateurs', 'Opérateurs de sauvegarde', 'Invités', 'Utilisateurs du journal de performances'], answer: 1, explain: 'Les Opérateurs de sauvegarde peuvent contourner les permissions de fichiers et sont rarement nécessaires.' }
    ]
  },

  /* ===================== WIN 2 ===================== */
  {
    id: 'win-2', track: 'windows', num: 2,
    title: 'Stratégie de mots de passe et de verrouillage de compte',
    summary: 'Configurez la longueur minimale, la complexité, l\u2019âge maximal, l\u2019historique et le verrouillage via secpol.msc, gpedit et net accounts.',
    tags: ['windows', 'stratégie de mots de passe', 'secpol', 'verrouillage', 'net accounts', 'gpedit'],
    slides: [
      { title: 'Pourquoi la stratégie de mots de passe est sa propre catégorie', html: `
        <p>Les mots de passe faibles sont le moyen le plus courant pour les attaquants d\u2019entrer. La compétition note la stratégie de mots de passe comme sa propre catégorie parce qu\u2019elle est l\u2019un des correctifs les plus rentables et les plus faciles sur n\u2019importe quelle image.</p>
        <p>Vous configurerez cinq réglages :</p>
        <ul>
          <li><strong>Longueur minimale du mot de passe</strong> &mdash; au moins 8, souvent 12 dans le scénario.</li>
          <li><strong>Exigences de complexité</strong> &mdash; mélange de majuscules, minuscules, chiffres, symboles.</li>
          <li><strong>Âge maximal du mot de passe</strong> &mdash; force des changements périodiques.</li>
          <li><strong>Âge minimal du mot de passe</strong> &mdash; empêche les utilisateurs de revenir immédiatement à l\u2019ancien.</li>
          <li><strong>Historique des mots de passe</strong> &mdash; se souvenir des mots de passe précédents.</li>
        </ul>
      ` },
      { title: 'Stratégie de sécurité locale (secpol.msc)', html: `
        <p>L\u2019interface graphique est la <strong>Stratégie de sécurité locale</strong>. Ouvrez-la depuis Exécuter :</p>
        <pre><code>secpol.msc</code></pre>
        <p>Naviguez vers <strong>Stratégies de comptes</strong> :</p>
        <ul>
          <li><strong>Stratégie de mot de passe</strong> &mdash; longueur, complexité, âge, historique.</li>
          <li><strong>Stratégie de verrouillage de compte</strong> &mdash; seuil de verrouillage, durée, réinitialisation du compteur.</li>
        </ul>
        <div class="callout tip"><strong>La complexité exige un mélange.</strong> Activer « Le mot de passe doit respecter les exigences de complexité » impose au moins trois des éléments suivants : majuscules, minuscules, chiffres, symboles, et interdit le nom d\u2019utilisateur dans le mot de passe.</div>
      ` },
      { title: 'Le raccourci en ligne de commande : net accounts', html: `
        <p>La façon la plus rapide de consulter et de définir la stratégie est <code>net accounts</code> dans une invite élevée :</p>
        <pre><code><span class="cmt">:: Afficher la stratégie actuelle</span>
net accounts

<span class="cmt">:: Définir la stratégie (longueur 12, âge 60, âge min 1, historique 24)</span>
net accounts /minpwlen:12 /maxpwage:60 /minpwage:1 /uniquepw:24

<span class="cmt">:: Forcer le verrouillage après 5 échecs, réinitialiser après 15 minutes</span>
net accounts /lockoutthreshold:5 /lockoutduration:15 /lockoutwindow:15</code></pre>
        <p>Sortie typique à lire attentivement :</p>
        <pre><code>Longueur minimale du mot de passe :      0   <span class="cmt">← constat!</span>
Âge maximal du mot de passe (jours) :    42
Seuil de verrouillage :                  Jamais  <span class="cmt">← constat!</span></code></pre>
        <div class="callout danger">Une longueur minimale de <strong>0</strong> et un seuil de verrouillage <strong>Jamais</strong> constituent à eux seuls deux constats distincts à forte valeur.</div>
      ` },
      { title: 'La stratégie de verrouillage en détail', html: `
        <p>Le verrouillage de compte arrête la devinette par force brute en verrouillant un compte après un nombre défini de tentatives échouées.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Réglage</th><th>Signification</th><th>Valeur typique</th></tr></thead>
          <tbody>
            <tr><td>Seuil de verrouillage</td><td>Tentatives échouées avant verrouillage</td><td>5&ndash;10</td></tr>
            <tr><td>Durée du verrouillage</td><td>Minutes de verrouillage</td><td>15&ndash;30</td></tr>
            <tr><td>Réinitialiser le compteur après</td><td>Minutes avant réinitialisation des tentatives</td><td>15</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><strong>Ne verrouillez pas tout le monde dehors.</strong> Si le README précise des valeurs, utilisez-les exactement. Un seuil trop bas peut verrouiller des utilisateurs légitimes (y compris vous) en pleine ronde.</div>
      ` },
      { title: 'Définir la stratégie avec PowerShell', html: `
        <p>Sur Windows moderne, vous pouvez aussi utiliser PowerShell (avec le module de sécurité) :</p>
        <pre><code><span class="cmt"># Afficher la stratégie de mots de passe actuelle</span>
Get-ADDefaultDomainPasswordPolicy   <span class="cmt"># domaine seulement</span>
<span class="cmt"># La stratégie de la machine locale se définit via secedit ou net accounts.</span>
net accounts</code></pre>
        <p>Pour la configuration en lot, <code>secedit</code> peut exporter, modifier et réimporter la base de données de sécurité locale :</p>
        <pre><code>secedit /export /cfg C:\\secpol.cfg
<span class="cmt">:: modifier secpol.cfg, puis :</span>
secedit /configure /db secedit.sdb /cfg C:\\secpol.cfg</code></pre>
      ` },
      { title: 'Stratégie de groupe (gpedit) pour les règles de mots de passe', html: `
        <p>Sur les éditions Pro/Entreprise/Server, <strong>gpedit.msc</strong> (Éditeur de stratégie de groupe locale) expose aussi ces réglages sous :</p>
        <pre><code>Configuration ordinateur → Paramètres Windows → Paramètres de sécurité →
  Stratégies de comptes → Stratégie de mot de passe / Stratégie de verrouillage de compte</code></pre>
        <p>La stratégie de groupe et <code>secpol.msc</code> modifient les mêmes réglages sous-jacents; les changements dans l\u2019un apparaissent dans l\u2019autre. Utilisez celui qui est plus rapide pour vous.</p>
        <div class="callout tip"><strong>Exécutez gpupdate.</strong> Après des changements de stratégie, exécutez <code>gpupdate /force</code> pour les appliquer immédiatement.</div>
      ` },
      { title: 'Liste de vérification de la stratégie de mots de passe', html: `
        <ol>
          <li>Lisez le README pour les valeurs requises.</li>
          <li><code>net accounts</code> &mdash; notez la longueur, l\u2019âge, l\u2019historique et le verrouillage actuels.</li>
          <li>Définissez la longueur minimale (habituellement 12), la complexité activée, l\u2019âge max &le; 60, l\u2019historique &ge; 24.</li>
          <li>Définissez le seuil de verrouillage (5&ndash;10), la durée, la fenêtre de réinitialisation.</li>
          <li>Forcez un changement de mot de passe pour les comptes dont le mot de passe est notoirement faible.</li>
          <li><code>gpupdate /force</code> si vous avez utilisé la stratégie de groupe.</li>
          <li>Consignez les valeurs avant/après.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande affiche et définit la stratégie de mots de passe locale depuis la ligne de commande?', opts: ['net user', 'net accounts', 'net share', 'ipconfig'], answer: 1, explain: 'net accounts affiche et définit la stratégie de mots de passe et de verrouillage.' },
      { q: 'Un seuil de verrouillage « Jamais » signifie :', opts: ['Les comptes se verrouillent après 1 essai', 'Les tentatives par force brute ne sont jamais bloquées', 'Les mots de passe n\u2019expirent jamais', 'Le compte est désactivé'], answer: 1, explain: 'Jamais signifie aucun verrouillage, donc la devinette n\u2019est pas limitée.' },
      { q: 'La complexité du mot de passe exige au moins combien de catégories de caractères?', opts: ['1', '2', '3', '4'], answer: 2, explain: 'La complexité exige trois des éléments : majuscule, minuscule, chiffre, symbole.' },
      { q: 'Quel outil est l\u2019interface graphique des paramètres de sécurité locale?', opts: ['lusrmgr.msc', 'secpol.msc', 'services.msc', 'devmgmt.msc'], answer: 1, explain: 'secpol.msc ouvre la Stratégie de sécurité locale.' },
      { q: 'Après avoir modifié la stratégie de groupe, vous devriez exécuter :', opts: ['gpupdate /force', 'ipconfig /flushdns', 'sfc /scannow', 'net user'], answer: 0, explain: 'gpupdate /force applique immédiatement les changements de stratégie.' }
    ]
  },

  /* ===================== WIN 3 ===================== */
  {
    id: 'win-3', track: 'windows', num: 3,
    title: 'Windows Defender et antivirus',
    summary: 'Assurez-vous que la protection en temps réel est activée, mettez à jour les signatures, lancez des analyses et vérifiez l\u2019état des antivirus tiers.',
    tags: ['windows', 'defender', 'antivirus', 'logiciel malveillant', 'analyse', 'centre de sécurité'],
    slides: [
      { title: 'L\u2019antivirus est une catégorie notée', html: `
        <p>Les logiciels malveillants sont l\u2019une des catégories de nettoyage dans le courriel de résultats, et l\u2019état de l\u2019antivirus fait partie de la catégorie maintenance. Sur chaque image Windows, vous devez confirmer qu\u2019<strong>un</strong> antivirus est présent, activé et à jour.</p>
        <p>Windows est livré avec <strong>Microsoft Defender Antivirus</strong>, qui est excellent lorsqu\u2019il est pleinement activé. Une astuce courante dans les images consiste à le désactiver ou à installer un antivirus tiers factice/brisé qui laisse le système sans protection.</p>
      ` },
      { title: 'Sécurité Windows en un coup d\u2019œil', html: `
        <p>Ouvrez <strong>Sécurité Windows</strong> depuis le menu Démarrer, ou exécutez :</p>
        <pre><code>windowsdefender:</code></pre>
        <p>Vérifiez chaque section :</p>
        <ul>
          <li><strong>Protection contre les virus et menaces</strong> &mdash; protection en temps réel ACTIVÉE, définitions à jour.</li>
          <li><strong>Protection du compte</strong> &mdash; Windows Hello / options de connexion.</li>
          <li><strong>Pare-feu et protection du réseau</strong> &mdash; tous les profils activés.</li>
          <li><strong>Contrôle des applications et du navigateur</strong> &mdash; SmartScreen.</li>
        </ul>
        <div class="callout danger">Si la protection en temps réel est désactivée ou grisée, c\u2019est un constat. Les logiciels malveillants désactivent souvent Defender via des clés de registre ou la stratégie de groupe &mdash; vous devrez peut-être corriger aussi la stratégie.</div>
      ` },
      { title: 'Defender depuis PowerShell', html: `
        <p>PowerShell vous donne un contrôle précis et scriptable :</p>
        <pre><code><span class="cmt"># État global</span>
Get-MpComputerStatus

<span class="cmt"># Champs clés à vérifier</span>
Get-MpComputerStatus | Select RealTimeProtectionEnabled, AntivirusEnabled, AntivirusSignatureLastUpdated, AMServiceEnabled

<span class="cmt"># Réactiver la protection en temps réel</span>
Set-MpPreference -DisableRealtimeMonitoring $false

<span class="cmt"># Mettre à jour les signatures</span>
Update-MpSignature

<span class="cmt"># Analyse rapide</span>
Start-MpScan -ScanType QuickScan
<span class="cmt"># Analyse complète (plus lente, à utiliser si le temps le permet)</span>
Start-MpScan -ScanType FullScan</code></pre>
      ` },
      { title: 'Quand Defender est désactivé par stratégie', html: `
        <p>Les attaquants (et les auteurs d\u2019images) désactivent parfois Defender via la stratégie de groupe pour qu\u2019il ne puisse pas être réactivé depuis l\u2019interface. Vérifiez :</p>
        <pre><code>gpedit.msc
Configuration ordinateur → Modèles d'administration → Composants Windows →
  Microsoft Defender Antivirus</code></pre>
        <p>Cherchez « Désactiver Microsoft Defender Antivirus » défini sur <strong>Activé</strong> &mdash; il devrait être <strong>Non configuré</strong> ou <strong>Désactivé</strong>. Chemin de registre :</p>
        <pre><code>HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender
<span class="cmt">:: DisableAntiSpyware ne devrait pas être 1</span></code></pre>
        <div class="callout tip">Après avoir corrigé la stratégie, exécutez <code>gpupdate /force</code>, puis revérifiez avec <code>Get-MpComputerStatus</code>.</div>
      ` },
      { title: 'Antivirus tiers', html: `
        <p>Si l\u2019image a un antivirus tiers (McAfee, Norton, etc.), confirmez qu\u2019il s\u2019exécute réellement et est à jour, pas seulement installé. Un antivirus tiers « essai expiré » ou « désactivé » est un constat.</p>
        <p>Vérifiez le panneau <strong>Sécurité et maintenance</strong> ou :</p>
        <pre><code><span class="cmt"># Voir les produits antivirus enregistrés (Centre de sécurité)</span>
Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct</code></pre>
        <p>Si un antivirus brisé est installé et que Defender est désactivé à cause de lui, réparez l\u2019antivirus ou supprimez-le pour que Defender prenne le relais.</p>
      ` },
      { title: 'Traquer les fichiers malveillants', html: `
        <p>Au-delà de l\u2019analyse, cherchez les fichiers frauduleux évidents. Lieux courants où se cachent les logiciels malveillants :</p>
        <ul>
          <li><code>C:\\Users\\&lt;utilisateur&gt;\\Downloads</code> &mdash; un lieu de dépôt favori.</li>
          <li><code>C:\\Users\\Public</code> et la racine de <code>C:\\</code>.</li>
          <li><code>%TEMP%</code> et <code>%APPDATA%</code>.</li>
          <li>Les dossiers Démarrage et les clés de registre Run (voir le module Services).</li>
        </ul>
        <div class="callout warn"><strong>Attention.</strong> Ne supprimez que les fichiers dont vous êtes certain qu\u2019ils sont malveillants ou contraires à la politique. Supprimer un fichier nécessaire fait perdre des points. En cas de doute, mettez en quarantaine via Defender plutôt que de supprimer.</div>
      ` },
      { title: 'Liste de vérification Defender', html: `
        <ol>
          <li>Ouvrez Sécurité Windows; confirmez que la protection en temps réel est ACTIVÉE.</li>
          <li><code>Get-MpComputerStatus</code> &mdash; vérifiez <code>RealTimeProtectionEnabled</code> et la date des signatures.</li>
          <li>Si désactivé par stratégie, corrigez gpedit / registre, puis <code>gpupdate /force</code>.</li>
          <li><code>Update-MpSignature</code> puis lancez une analyse rapide.</li>
          <li>Vérifiez la présence d\u2019un antivirus tiers brisé.</li>
          <li>Cherchez des logiciels malveillants évidents dans Downloads / Public / Temp.</li>
          <li>Consignez ce que vous avez modifié.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande PowerShell affiche l\u2019état de la protection en temps réel de Defender?', opts: ['Get-MpComputerStatus', 'Get-Process', 'net accounts', 'Get-EventLog'], answer: 0, explain: 'Get-MpComputerStatus indique l\u2019état de Defender et les dates des signatures.' },
      { q: 'Une valeur de registre qui désactive Defender est :', opts: ['DisableAntiSpyware = 1', 'EnableFirewall = 0', 'Guest = 1', 'AutoUpdate = 0'], answer: 0, explain: 'DisableAntiSpyware sous la clé de stratégie Windows Defender le désactive.' },
      { q: 'Pour forcer une mise à jour immédiate des signatures, vous exécutez :', opts: ['Update-MpSignature', 'sfc /scannow', 'ipconfig /renew', 'gpupdate /force'], answer: 0, explain: 'Update-MpSignature télécharge les dernières définitions.' },
      { q: 'Si un antivirus tiers brisé bloque Defender, vous devriez :', opts: ['Le laisser', 'Le réparer ou le supprimer pour que la protection fonctionne', 'Désactiver le pare-feu', 'L\u2019ignorer'], answer: 1, explain: 'La protection doit être réellement active; un antivirus mort laisse le système exposé.' },
      { q: 'Un dossier de dépôt courant de logiciels malveillants à inspecter est :', opts: ['C:\\\\Windows\\\\System32', 'C:\\\\Users\\\\<utilisateur>\\\\Downloads', 'C:\\\\Program Files', 'C:\\\\Windows\\\\Fonts'], answer: 1, explain: 'Downloads est un emplacement fréquent pour les fichiers malveillants déposés.' }
    ]
  },

  /* ===================== WIN 4 ===================== */
  {
    id: 'win-4', track: 'windows', num: 4,
    title: 'Windows Update et correctifs',
    summary: 'Recherchez et installez les mises à jour manquantes, comprenez les paramètres de mise à jour et sachez pourquoi les correctifs constituent une catégorie de maintenance notée.',
    tags: ['windows', 'mise à jour', 'correctif', 'wsus', 'wuauserv', 'maintenance'],
    slides: [
      { title: 'Pourquoi les mises à jour sont notées', html: `
        <p>Les logiciels non corrigés sont l\u2019un des plus grands risques réels, et c\u2019est un constat facile en compétition. Les catégories de résultats incluent les <strong>mises à jour</strong> sous maintenance. Les images sont souvent construites avec des mises à jour volontairement manquantes ou avec le service de mise à jour désactivé.</p>
        <p>Votre travail : confirmer que le service de mise à jour fonctionne, vérifier les mises à jour en attente, les installer et vous assurer que les mises à jour automatiques ne sont pas bloquées par stratégie.</p>
      ` },
      { title: 'Rechercher les mises à jour dans l\u2019interface', html: `
        <p>Ouvrez <strong>Paramètres &rarr; Windows Update</strong>, ou exécutez :</p>
        <pre><code>ms-settings:windowsupdate</code></pre>
        <p>Cliquez sur <strong>Rechercher des mises à jour</strong>. Si des mises à jour sont en attente, installez-les. Notez l\u2019heure de la <strong>dernière vérification</strong> &mdash; une date très ancienne indique que le service est probablement brisé.</p>
        <div class="callout warn"><strong>Budget de temps.</strong> Les mises à jour peuvent prendre beaucoup de temps à télécharger et à installer. Lancez-les tôt et poursuivez d\u2019autres tâches pendant qu\u2019elles s\u2019exécutent. Certaines images ne permettent de noter l\u2019état « mises à jour disponibles = 0 » qu\u2019après l\u2019installation.</div>
      ` },
      { title: 'Le service de mise à jour', html: `
        <p>Les mises à jour dépendent du service <strong>Windows Update</strong> (<code>wuauserv</code>). S\u2019il est arrêté ou désactivé, les mises à jour échouent. Vérifiez dans <code>services.msc</code> ou :</p>
        <pre><code><span class="cmt"># Vérifier le service</span>
Get-Service wuauserv
<span class="cmt"># Le définir en démarrage automatique et le démarrer</span>
Set-Service wuauserv -StartupType Automatic
Start-Service wuauserv</code></pre>
        <p>Vérifiez aussi le <strong>Service de transfert intelligent en arrière-plan</strong> (<code>BITS</code>) et le <strong>service Windows Update Medic</strong>, que les logiciels malveillants peuvent désactiver pour bloquer les correctifs.</p>
      ` },
      { title: 'Mises à jour en ligne de commande', html: `
        <p>Vous pouvez déclencher les mises à jour depuis la ligne de commande :</p>
        <pre><code><span class="cmt">:: Ouvrir l'interface de mise à jour</span>
control /name Microsoft.WindowsUpdate

<span class="cmt">:: Forcer une actualisation de la stratégie</span>
gpupdate /force

<span class="cmt">:: Redémarrer le service de mise à jour</span>
net stop wuauserv
net start wuauserv</code></pre>
        <p>Pour un contrôle plus poussé, le module <strong>PSWindowsUpdate</strong> (s\u2019il est installé) peut lister et installer les mises à jour :</p>
        <pre><code>Get-WindowsUpdate
Install-WindowsUpdate -AcceptAll</code></pre>
      ` },
      { title: 'Blocages par stratégie de groupe et registre', html: `
        <p>Les logiciels malveillants et les auteurs d\u2019images bloquent les mises à jour par stratégie. Vérifiez :</p>
        <pre><code>gpedit.msc
Configuration ordinateur → Modèles d'administration → Composants Windows →
  Windows Update</code></pre>
        <ul>
          <li>« Configurer les mises à jour automatiques » &mdash; devrait autoriser les mises à jour (souvent « Activé » avec installation automatique, ou « Non configuré »).</li>
          <li>« Supprimer l\u2019accès à l\u2019utilisation de toutes les fonctionnalités de Windows Update » &mdash; devrait être Non configuré.</li>
        </ul>
        <p>Emplacement de registre pour la stratégie de mise à jour :</p>
        <pre><code>HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU</code></pre>
      ` },
      { title: 'Différences avec Windows Server', html: `
        <p>Sur les images Windows Server, les mises à jour peuvent être gérées via le <strong>Gestionnaire de serveur</strong> ou configurées via <strong>WSUS</strong>. Les mêmes principes s\u2019appliquent :</p>
        <ul>
          <li>Confirmer que le service de mise à jour s\u2019exécute.</li>
          <li>Vérifier et installer les mises à jour.</li>
          <li>S\u2019assurer que les mises à jour automatiques ne sont pas désactivées par stratégie.</li>
        </ul>
        <div class="callout tip">Les images Server ajoutent aussi des rôles et fonctionnalités à la surface d\u2019attaque &mdash; un sujet traité dans le module Services.</div>
      ` },
      { title: 'Liste de vérification des mises à jour', html: `
        <ol>
          <li>Ouvrez Windows Update; cliquez sur Rechercher des mises à jour.</li>
          <li>Installez toutes les mises à jour en attente (commencez tôt &mdash; elles sont lentes).</li>
          <li>Confirmez que <code>wuauserv</code> et BITS s\u2019exécutent et sont en démarrage automatique.</li>
          <li>Vérifiez gpedit / registre pour les blocages de mise à jour; retirez-les.</li>
          <li><code>gpupdate /force</code>.</li>
          <li>Revérifiez jusqu\u2019à « Vous êtes à jour ».</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel service doit s\u2019exécuter pour que Windows Update fonctionne?', opts: ['wuauserv', 'spooler', 'dhcp', 'termservice'], answer: 0, explain: 'wuauserv est le service Windows Update; BITS est aussi requis.' },
      { q: 'Une date « dernière vérification des mises à jour » très ancienne suggère :', opts: ['Que les mises à jour sont à jour', 'Que le service de mise à jour est brisé ou bloqué', 'Que le pare-feu est désactivé', 'Que le compte est désactivé'], answer: 1, explain: 'Cela indique que le service de mise à jour est arrêté ou bloqué par stratégie.' },
      { q: 'Quelle commande force la stratégie de groupe à se réappliquer immédiatement?', opts: ['gpupdate /force', 'ipconfig /all', 'net user', 'sfc /scannow'], answer: 0, explain: 'gpupdate /force réapplique les paramètres de stratégie.' },
      { q: 'Pourquoi commencer les mises à jour tôt dans une ronde?', opts: ['Elles suppriment des utilisateurs', 'Elles peuvent prendre beaucoup de temps à installer', 'Elles désactivent le pare-feu', 'Elles modifient le README'], answer: 1, explain: 'Les téléchargements et installations sont lents; commencez tôt et travaillez sur d\u2019autres éléments entre-temps.' },
      { q: 'Les mises à jour relèvent de quelle catégorie de résultats?', opts: ['Criminalistique', 'Maintenance', 'Politique d\u2019utilisateurs', 'Cisco'], answer: 1, explain: 'Les mises à jour et l\u2019antivirus sont des catégories de maintenance.' }
    ]
  },

  /* ===================== WIN 5 ===================== */
  {
    id: 'win-5', track: 'windows', num: 5,
    title: 'Services et programmes de démarrage',
    summary: 'Désactivez les services non sécurisés et inutiles, réduisez les éléments de démarrage et comprenez comment les services élargissent la surface d\u2019attaque.',
    tags: ['windows', 'services', 'démarrage', 'msconfig', 'surface d\u2019attaque', 'telnet'],
    slides: [
      { title: 'Les services sont des portes', html: `
        <p>Un <strong>service</strong> est un programme en arrière-plan qui s\u2019exécute sans utilisateur connecté. Chaque service en cours d\u2019exécution peut écouter sur un port réseau, lire des fichiers ou exécuter du code &mdash; chacun est une voie d\u2019entrée potentielle. La catégorie de résultats <strong>Services non sécurisés</strong> vous récompense pour avoir fermé les portes inutiles.</p>
        <p>Votre travail : trouver les services inutiles ou non sécurisés et les désactiver ou les arrêter &mdash; <em>sauf si le README indique que l\u2019entreprise en a besoin.</em></p>
      ` },
      { title: 'La console Services', html: `
        <p>Ouvrez <strong>Services</strong> depuis Exécuter :</p>
        <pre><code>services.msc</code></pre>
        <p>Pour chaque service, notez l\u2019<strong>État</strong> (En cours d\u2019exécution/Arrêté) et le <strong>Type de démarrage</strong> (Automatique/Manuel/Désactivé). Pour désactiver un service : clic droit &rarr; Propriétés &rarr; réglez le Type de démarrage sur <strong>Désactivé</strong>, puis cliquez sur <strong>Arrêter</strong>.</p>
        <div class="callout danger"><strong>Ne désactivez pas les services essentiels.</strong> Désactiver un service dont Windows a besoin (RPC, DCOM, Client DHCP, Client DNS, Plug-and-Play) peut briser la machine et faire perdre des points. Concentrez-vous sur ceux clairement non sécurisés ou inutiles.</div>
      ` },
      { title: 'Services non sécurisés courants à rechercher', html: `
        <div class="table-wrap"><table>
          <thead><tr><th>Service / fonctionnalité</th><th>Pourquoi c\u2019est risqué</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Telnet</td><td>Shell à distance non chiffré</td><td>Désactiver</td></tr>
            <tr><td>Serveur FTP</td><td>Identifiants en clair</td><td>Désactiver sauf si requis</td></tr>
            <tr><td>Registre distant</td><td>Modifications de registre à distance</td><td>Désactiver</td></tr>
            <tr><td>Services TCP/IP simples</td><td>Echo/chargen hérités</td><td>Désactiver</td></tr>
            <tr><td>SNMP</td><td>Chaînes de communauté souvent par défaut</td><td>Désactiver sauf si nécessaire</td></tr>
            <tr><td>Gestion à distance Windows</td><td>Accès à distance</td><td>Restreindre</td></tr>
            <tr><td>Spouleur d\u2019impression</td><td>Failles de type PrintNightmare</td><td>Désactiver si aucune imprimante n\u2019est nécessaire</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Gérer les services depuis la ligne de commande', html: `
        <p>PowerShell est plus rapide pour le travail en lot :</p>
        <pre><code><span class="cmt"># Lister les services en cours d'exécution</span>
Get-Service | Where-Object Status -eq 'Running'

<span class="cmt"># Trouver un service précis</span>
Get-Service -Name TlntSvr

<span class="cmt"># L'arrêter et le désactiver</span>
Stop-Service -Name TlntSvr -Force
Set-Service -Name TlntSvr -StartupType Disabled</code></pre>
        <p>Les commandes héritées fonctionnent encore :</p>
        <pre><code>sc query TlntSvr
sc config TlntSvr start= disabled
sc stop TlntSvr</code></pre>
      ` },
      { title: 'Programmes de démarrage', html: `
        <p>Les programmes qui se lancent au démarrage constituent aussi une surface d\u2019attaque et sont souvent contraires à la politique (jeux, clients de clavardage, exécutables inconnus). Vérifiez quatre endroits :</p>
        <ul>
          <li><strong>Gestionnaire des tâches &rarr; onglet Démarrage</strong>.</li>
          <li><strong>Dossiers Démarrage</strong> : <code>shell:startup</code> et <code>shell:common startup</code>.</li>
          <li><strong>Clés de registre Run</strong> : <code>HKLM\\...\\Run</code> et <code>HKCU\\...\\Run</code>.</li>
          <li><strong>Planificateur de tâches</strong> pour les lancements planifiés.</li>
        </ul>
        <pre><code><span class="cmt"># Lister les éléments de démarrage (PowerShell)</span>
Get-CimInstance Win32_StartupCommand | Select Name, Command, Location, User</code></pre>
      ` },
      { title: 'Tâches planifiées', html: `
        <p>Les logiciels malveillants persistent souvent via le <strong>Planificateur de tâches</strong>. Ouvrez-le avec :</p>
        <pre><code>taskschd.msc</code></pre>
        <p>Cherchez les tâches aux noms suspects, les tâches pointant vers des fichiers dans Temp/Downloads, ou les tâches qui s\u2019exécutent en tant que SYSTEM. Désactivez ou supprimez celles qui sont clairement malveillantes ou contraires à la politique.</p>
        <div class="callout tip">Les tâches Windows légitimes existent aussi &mdash; ne supprimez pas les tâches de maintenance de Microsoft que vous ne comprenez pas.</div>
      ` },
      { title: 'Liste de vérification des services', html: `
        <ol>
          <li>Lisez le README pour les services requis (web, courriel, partage de fichiers).</li>
          <li>Ouvrez <code>services.msc</code>; cherchez Telnet, FTP, Registre distant, SNMP.</li>
          <li>Désactivez les services clairement non sécurisés/inutiles; arrêtez-les.</li>
          <li>Passez en revue Gestionnaire des tâches &rarr; Démarrage et les clés de registre Run.</li>
          <li>Passez en revue le Planificateur de tâches pour les tâches frauduleuses.</li>
          <li>Redémarrez si nécessaire et confirmez que rien de requis n\u2019est brisé.</li>
          <li>Consignez chaque service modifié.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel outil gère les services Windows?', opts: ['services.msc', 'secpol.msc', 'lusrmgr.msc', 'diskmgmt.msc'], answer: 0, explain: 'services.msc est la console Services.' },
      { q: 'Quel service est un constat classique de non-sécurité?', opts: ['Client DHCP', 'Telnet', 'Client DNS', 'Plug-and-Play'], answer: 1, explain: 'Telnet est un shell à distance non chiffré et devrait être désactivé.' },
      { q: 'Quelles clés de registre contiennent couramment les programmes de démarrage?', opts: ['HKLM\\\\...\\\\Run', 'HKLM\\\\...\\\\Services', 'HKCU\\\\...\\\\Printers', 'HKLM\\\\...\\\\Fonts'], answer: 0, explain: 'Les clés Run sous HKLM et HKCU lancent des programmes à l\u2019ouverture de session.' },
      { q: 'La persistance des logiciels malveillants se trouve souvent dans :', opts: ['Le Planificateur de tâches', 'La Corbeille', 'Les polices', 'L\u2019horloge'], answer: 0, explain: 'Les tâches planifiées sont un mécanisme de persistance courant.' },
      { q: 'Désactiver quel service peut briser Windows et faire perdre des points?', opts: ['Telnet', 'SNMP', 'Appel de procédure distante (RPC)', 'FTP'], answer: 2, explain: 'Les services essentiels comme RPC sont requis; les désactiver brise le système.' }
    ]
  },

  /* ===================== WIN 6 ===================== */
  {
    id: 'win-6', track: 'windows', num: 6,
    title: 'Suppression de logiciels et programmes non autorisés',
    summary: 'Désinstallez les logiciels interdits, les jeux et les outils de piratage, et comprenez la catégorie des violations de politique.',
    tags: ['windows', 'logiciels', 'désinstallation', 'politique', 'jeux', 'winget'],
    slides: [
      { title: 'La catégorie des violations de politique', html: `
        <p>Les scénarios incluent souvent des logiciels que l\u2019entreprise interdit : jeux, clients de torrent, outils d\u2019accès à distance ou utilitaires de « piratage ». Les retirer relève des <strong>violations de politique</strong> et des <strong>logiciels malveillants</strong> dans les résultats. Le README ou un fichier de politique d\u2019entreprise énumère habituellement ce qui est interdit.</p>
        <p>Votre travail : identifier les programmes interdits ou inutiles et les désinstaller proprement.</p>
      ` },
      { title: 'Trouver les programmes installés', html: `
        <p>L\u2019interface graphique est <strong>Paramètres &rarr; Applications &rarr; Applications installées</strong>, ou le classique <strong>Programmes et fonctionnalités</strong> :</p>
        <pre><code>appwiz.cpl</code></pre>
        <p>Depuis PowerShell, vous pouvez énumérer tout ce qui est installé, y compris les installations silencieuses :</p>
        <pre><code><span class="cmt"># Entrées de désinstallation 64 bits et 32 bits</span>
Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* |
  Select DisplayName, Publisher
Get-ItemProperty HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* |
  Select DisplayName, Publisher</code></pre>
      ` },
      { title: 'Désinstaller proprement', html: `
        <p>Préférez le désinstalleur approprié plutôt que de supprimer les dossiers, afin que les entrées de registre et les services soient aussi supprimés.</p>
        <pre><code><span class="cmt"># Avec winget (si disponible)</span>
winget list
winget uninstall "Nom du programme"

<span class="cmt"># Avec le code produit MSI</span>
Get-WmiObject -Class Win32_Product | Where-Object Name -like "*Jeu*" |
  ForEach-Object { $_.Uninstall() }</code></pre>
        <div class="callout warn"><strong>Win32_Product est lent.</strong> L\u2019interroger déclenche une vérification de cohérence sur chaque MSI. Utilisez-le avec parcimonie, ou utilisez l\u2019énumération du registre ci-dessus pour trouver d\u2019abord les noms.</div>
      ` },
      { title: 'Ce qui compte habituellement comme interdit', html: `
        <div class="table-wrap"><table>
          <thead><tr><th>Catégorie</th><th>Exemples</th></tr></thead>
          <tbody>
            <tr><td>Jeux</td><td>Titres Steam, Minecraft, jeux de cartes</td></tr>
            <tr><td>P2P / torrent</td><td>uTorrent, BitTorrent</td></tr>
            <tr><td>Accès à distance</td><td>TeamViewer, AnyDesk (si non autorisés)</td></tr>
            <tr><td>Outils de piratage</td><td>Wireshark, Nmap, craqueurs de mots de passe (sauf si requis)</td></tr>
            <tr><td>Médias / clavardage</td><td>Lecteurs multimédias non autorisés, clients de clavardage</td></tr>
            <tr><td>Barres d\u2019outils / adwares</td><td>Barres d\u2019outils de navigateur groupées</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><strong>Lisez la politique.</strong> Certains scénarios autorisent explicitement certains outils (p. ex. un outil de réseautique pour un rôle en TI). Ne retirez pas ce que le README permet.</div>
      ` },
      { title: 'Extensions et barres d\u2019outils du navigateur', html: `
        <p>Les adwares installent souvent des extensions de navigateur. Vérifiez la page d\u2019extensions de chaque navigateur et retirez tout ce qui est inconnu. Vérifiez aussi les <strong>paramètres de proxy</strong> frauduleux (Paramètres &rarr; Réseau &rarr; Proxy) et les entrées modifiées de <strong>DNS</strong> ou du <strong>fichier hosts</strong> :</p>
        <pre><code>C:\\Windows\\System32\\drivers\\etc\\hosts</code></pre>
        <p>Un fichier hosts rempli de redirections est un fort signe de compromission.</p>
      ` },
      { title: 'Liste de vérification de la suppression de logiciels', html: `
        <ol>
          <li>Lisez le README / la politique pour les logiciels interdits.</li>
          <li>Énumérez les programmes installés (Paramètres, appwiz.cpl, PowerShell).</li>
          <li>Désinstallez les programmes interdits ou inutiles via leurs désinstalleurs.</li>
          <li>Retirez les extensions et barres d\u2019outils frauduleuses du navigateur.</li>
          <li>Vérifiez les paramètres de proxy et le fichier hosts.</li>
          <li>Relancez une analyse Defender après les suppressions.</li>
          <li>Consignez ce que vous avez retiré.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel panneau de configuration ouvre Programmes et fonctionnalités?', opts: ['appwiz.cpl', 'secpol.msc', 'services.msc', 'ncpa.cpl'], answer: 0, explain: 'appwiz.cpl ouvre la liste de désinstallation classique.' },
      { q: 'Pourquoi préférer le désinstalleur à la suppression du dossier?', opts: ['C\u2019est plus lent', 'Il retire aussi les entrées de registre et les services', 'Il désactive le pare-feu', 'Il modifie le README'], answer: 1, explain: 'Les désinstalleurs appropriés nettoient aussi les entrées de registre et de service.' },
      { q: 'Un fichier hosts rempli de redirections suggère :', opts: ['Un comportement Windows normal', 'Une possible compromission/adware', 'Une règle de pare-feu', 'Une stratégie de mots de passe'], answer: 1, explain: 'Les entrées de redirection dans le fichier hosts sont un symptôme courant de logiciel malveillant.' },
      { q: 'Que devriez-vous faire AVANT de retirer un logiciel?', opts: ['Redémarrer', 'Lire la politique/le README pour voir ce qui est interdit', 'Désactiver Defender', 'Supprimer le compte invité'], answer: 1, explain: 'Vous devez savoir ce qui est réellement interdit avant de retirer quoi que ce soit.' },
      { q: 'Quelle commande liste les programmes installés depuis le registre?', opts: ['Get-ItemProperty HKLM:\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\*', 'net user', 'ipconfig', 'sfc /scannow'], answer: 0, explain: 'Ce chemin de registre contient les entrées des programmes installés.' }
    ]
  },

  /* ===================== WIN 7 ===================== */
  {
    id: 'win-7', track: 'windows', num: 7,
    title: 'Stratégie de groupe et sécurité locale',
    summary: 'Utilisez gpedit.msc et secpol.msc pour appliquer des paramètres de sécurité, et comprenez comment la stratégie remplace la configuration locale.',
    tags: ['windows', 'gpedit', 'stratégie de groupe', 'secpol', 'audit', 'UAC'],
    slides: [
      { title: 'Ce que fait la stratégie de groupe', html: `
        <p>La <strong>stratégie de groupe</strong> est la façon dont les administrateurs appliquent des paramètres à une machine. En compétition, vous utilisez l\u2019<strong>Éditeur de stratégie de groupe locale</strong> (<code>gpedit.msc</code>) et la <strong>Stratégie de sécurité locale</strong> (<code>secpol.msc</code>).</p>
        <p>La stratégie est puissante parce qu\u2019elle <em>remplace</em> les paramètres locaux &mdash; c\u2019est exactement pourquoi les attaquants l\u2019utilisent pour désactiver des protections, et pourquoi vous devez la vérifier quand un paramètre refuse de changer.</p>
      ` },
      { title: 'Ouvrir les éditeurs', html: `
        <pre><code><span class="cmt">:: Éditeur de stratégie de groupe locale (Pro/Entreprise/Server)</span>
gpedit.msc

<span class="cmt">:: Stratégie de sécurité locale</span>
secpol.msc</code></pre>
        <p>Deux branches principales dans gpedit :</p>
        <ul>
          <li><strong>Configuration ordinateur</strong> &mdash; s\u2019applique à toute la machine.</li>
          <li><strong>Configuration utilisateur</strong> &mdash; s\u2019applique aux utilisateurs.</li>
        </ul>
        <div class="callout tip"><strong>Éditions Familiale.</strong> Windows Famille n\u2019a pas gpedit.msc; utilisez plutôt le registre ou <code>secedit</code>.</div>
      ` },
      { title: 'Paramètres de sécurité à examiner', html: `
        <p>Sous <strong>Configuration ordinateur &rarr; Paramètres Windows &rarr; Paramètres de sécurité</strong> :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Domaine</th><th>Quoi vérifier</th></tr></thead>
          <tbody>
            <tr><td>Stratégies de comptes</td><td>Mots de passe et verrouillage (voir le module Mots de passe)</td></tr>
            <tr><td>Stratégies locales &rarr; Stratégie d\u2019audit</td><td>Audit des connexions et des accès aux objets activé</td></tr>
            <tr><td>Stratégies locales &rarr; Attribution des droits utilisateur</td><td>Qui peut ouvrir une session locale / à distance</td></tr>
            <tr><td>Stratégies locales &rarr; Options de sécurité</td><td>UAC, invité, accès anonyme</td></tr>
            <tr><td>Pare-feu Windows</td><td>Profils activés</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Contrôle de compte d\u2019utilisateur (UAC)', html: `
        <p>L\u2019<strong>UAC</strong> demande une élévation lorsqu\u2019une action de niveau administrateur est tentée. Les logiciels malveillants l\u2019abaissent parfois. Vérifiez sous :</p>
        <pre><code>Configuration ordinateur → Paramètres Windows → Paramètres de sécurité →
  Stratégies locales → Options de sécurité →
  « Contrôle de compte d'utilisateur : Exécuter tous les administrateurs en mode d'approbation de l'administrateur »</code></pre>
        <p>Il devrait être <strong>Activé</strong>. L\u2019équivalent de registre se trouve sous <code>HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System</code> (<code>EnableLUA = 1</code>).</p>
      ` },
      { title: 'Audit et journalisation', html: `
        <p>L\u2019audit enregistre les événements liés à la sécurité afin qu\u2019ils puissent être examinés. Activez au minimum :</p>
        <ul>
          <li><strong>Auditer les événements d\u2019ouverture de session</strong> &mdash; succès et échec.</li>
          <li><strong>Auditer la gestion des comptes</strong> &mdash; changements d\u2019utilisateurs/groupes.</li>
          <li><strong>Auditer le changement de stratégie</strong> &mdash; modifications de la stratégie de sécurité.</li>
        </ul>
        <p>Consultez les événements dans l\u2019<strong>Observateur d\u2019événements</strong> (<code>eventvwr.msc</code>), surtout le journal <strong>Sécurité</strong>. Les connexions échouées (ID d\u2019événement 4625) peuvent révéler des tentatives par force brute.</p>
      ` },
      { title: 'Appliquer et vérifier la stratégie', html: `
        <p>Après les changements, appliquez et vérifiez :</p>
        <pre><code>gpupdate /force

<span class="cmt">:: Voir l'ensemble de stratégies résultant</span>
gpresult /r
<span class="cmt">:: Rapport HTML complet</span>
gpresult /h C:\\rapport.html</code></pre>
        <div class="callout warn"><strong>La stratégie prime sur l\u2019interface.</strong> Si une case à cocher dans l\u2019application Paramètres normale est grisée, une stratégie la contrôle. Modifiez la stratégie, pas l\u2019application.</div>
      ` },
      { title: 'Liste de vérification de la stratégie de groupe', html: `
        <ol>
          <li>Ouvrez <code>secpol.msc</code>; examinez les Stratégies de comptes.</li>
          <li>Ouvrez <code>gpedit.msc</code>; examinez les Options de sécurité (UAC, invité, anonyme).</li>
          <li>Activez l\u2019audit des connexions et de la gestion des comptes.</li>
          <li>Vérifiez l\u2019Attribution des droits utilisateur pour des privilèges inattendus.</li>
          <li>Cherchez les stratégies qui désactivent Defender, les mises à jour ou le pare-feu.</li>
          <li><code>gpupdate /force</code> et vérifiez avec <code>gpresult /r</code>.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel outil ouvre l\u2019Éditeur de stratégie de groupe locale?', opts: ['gpedit.msc', 'lusrmgr.msc', 'services.msc', 'perfmon.msc'], answer: 0, explain: 'gpedit.msc ouvre l\u2019Éditeur de stratégie de groupe locale.' },
      { q: 'Si une bascule des Paramètres est grisée, la cause est habituellement :', opts: ['Un défaut matériel', 'Une stratégie de groupe qui la contrôle', 'Un pilote manquant', 'Le compte invité'], answer: 1, explain: 'La stratégie remplace les paramètres locaux et peut les griser.' },
      { q: 'Quelle commande applique immédiatement les changements de stratégie?', opts: ['gpupdate /force', 'net user', 'sfc /scannow', 'chkdsk'], answer: 0, explain: 'gpupdate /force réapplique la stratégie.' },
      { q: 'L\u2019UAC devrait normalement être :', opts: ['Désactivé', 'Activé (mode d\u2019approbation de l\u2019administrateur)', 'Réglé pour ne jamais notifier', 'Retiré via le registre'], answer: 1, explain: 'L\u2019UAC devrait exécuter les administrateurs en mode d\u2019approbation de l\u2019administrateur.' },
      { q: 'Quel ID d\u2019événement indique une connexion échouée?', opts: ['4624', '4625', '4688', '1000'], answer: 1, explain: 'L\u2019ID d\u2019événement 4625 est une connexion échouée; 4624 est une réussite.' }
    ]
  },

  /* ===================== WIN 8 ===================== */
  {
    id: 'win-8', track: 'windows', num: 8,
    title: 'Pare-feu Windows et partage de fichiers',
    summary: 'Activez tous les profils de pare-feu, gérez les règles entrantes et verrouillez les partages SMB et les permissions de fichiers.',
    tags: ['windows', 'pare-feu', 'smb', 'partages', 'permissions', 'net share'],
    slides: [
      { title: 'Le pare-feu est une catégorie notée', html: `
        <p>Le pare-feu Windows Defender comporte trois <strong>profils</strong> : <strong>Domaine</strong>, <strong>Privé</strong> et <strong>Public</strong>. Les trois devraient être <strong>activés</strong>. Un constat courant est le profil Public désactivé.</p>
        <pre><code><span class="cmt"># Vérifier tous les profils</span>
Get-NetFirewallProfile | Select Name, Enabled

<span class="cmt"># Les activer tous</span>
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True</code></pre>
        <div class="callout danger">Une sortie comme <code>Public False</code> est un constat à elle seule. Activez-le et revérifiez.</div>
      ` },
      { title: 'Gérer les règles de pare-feu', html: `
        <p>Ouvrez la console avancée :</p>
        <pre><code>wf.msc</code></pre>
        <p>Examinez les <strong>Règles de trafic entrant</strong>. Retirez ou désactivez les règles qui ouvrent des ports inutiles. Soyez prudent avec les règles dont Windows a besoin (réseautique de base, DHCP).</p>
        <pre><code><span class="cmt"># Lister les règles entrantes d'autorisation activées</span>
Get-NetFirewallRule -Direction Inbound -Enabled True -Action Allow |
  Select DisplayName, Profile</code></pre>
      ` },
      { title: 'Partage de fichiers et SMB', html: `
        <p>Les partages SMB ouverts exposent les fichiers au réseau. Listez-les :</p>
        <pre><code>net share
<span class="cmt"># PowerShell</span>
Get-SmbShare</code></pre>
        <p>Les partages administratifs (<code>C$</code>, <code>ADMIN$</code>, <code>IPC$</code>) sont normaux. Les partages non par défaut pointant vers des données d\u2019utilisateurs méritent un examen &mdash; restreignez leurs permissions ou retirez-les si le README ne les exige pas.</p>
        <div class="callout tip">Si le scénario exploite un serveur de fichiers, renforcez le partage (permissions selon le moindre privilège) plutôt que de le supprimer.</div>
      ` },
      { title: 'Permissions NTFS', html: `
        <p>Les permissions de partage et les <strong>permissions NTFS</strong> s\u2019appliquent toutes deux; la plus restrictive l\u2019emporte. Vérifiez l\u2019onglet <strong>Sécurité</strong> d\u2019un dossier (ou utilisez icacls) :</p>
        <pre><code><span class="cmt">:: Voir les permissions d'un dossier</span>
icacls "C:\\CompanyData"

<span class="cmt">:: Retirer le contrôle total de Tout le monde</span>
icacls "C:\\CompanyData" /remove:g Everyone

<span class="cmt">:: Accorder Modification à un groupe</span>
icacls "C:\\CompanyData" /grant "Users:(OI)(CI)M"</code></pre>
        <p>Surveillez <strong>Tout le monde</strong> ou <strong>ANONYMOUS LOGON</strong> avec écriture ou contrôle total &mdash; des constats classiques.</p>
      ` },
      { title: 'Paramètres réseau et découverte', html: `
        <p>Désactivez les fonctionnalités qui exposent la machine sur des réseaux non approuvés :</p>
        <ul>
          <li><strong>Découverte du réseau</strong> et <strong>Partage de fichiers et d\u2019imprimantes</strong> &mdash; désactivés sur les réseaux publics.</li>
          <li><strong>Bureau à distance</strong> &mdash; désactivé sauf si requis.</li>
          <li><strong>SMBv1</strong> &mdash; désactivez le protocole hérité et vulnérable.</li>
        </ul>
        <pre><code><span class="cmt"># Désactiver SMBv1 (PowerShell, admin)</span>
Disable-WindowsOptionalFeature -Online -FeatureName smb1protocol -NoRestart</code></pre>
      ` },
      { title: 'Liste de vérification pare-feu et partage', html: `
        <ol>
          <li><code>Get-NetFirewallProfile</code> &mdash; assurez-vous que Domaine, Privé, Public sont tous True.</li>
          <li>Examinez les règles entrantes dans <code>wf.msc</code>; fermez les ports inutiles.</li>
          <li><code>net share</code> &mdash; examinez les partages non par défaut.</li>
          <li><code>icacls</code> &mdash; retirez l\u2019accès en écriture de Tout le monde/Anonyme.</li>
          <li>Désactivez la Découverte du réseau / le Partage de fichiers sur les réseaux publics.</li>
          <li>Désactivez SMBv1; désactivez le Bureau à distance si non requis.</li>
          <li>Consignez les changements.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande PowerShell vérifie l\u2019état des profils de pare-feu?', opts: ['Get-NetFirewallProfile', 'net share', 'ipconfig', 'Get-Service'], answer: 0, explain: 'Get-NetFirewallProfile montre l\u2019état Enabled de chaque profil.' },
      { q: 'Combien de profils de pare-feu Windows existe-t-il?', opts: ['1', '2', '3', '4'], answer: 2, explain: 'Domaine, Privé et Public.' },
      { q: 'Quel outil ouvre la console avancée du pare-feu?', opts: ['wf.msc', 'secpol.msc', 'services.msc', 'diskmgmt.msc'], answer: 0, explain: 'wf.msc est le Pare-feu Windows avec fonctions avancées de sécurité.' },
      { q: 'Un constat classique de permissions NTFS est :', opts: ['Un groupe avec Modification', 'Tout le monde avec Contrôle total', 'SYSTEM avec Contrôle total', 'Administrateurs avec Contrôle total'], answer: 1, explain: 'Tout le monde/Anonyme avec écriture ou contrôle total est un constat.' },
      { q: 'Quel protocole hérité devrait être désactivé?', opts: ['SMBv3', 'SMBv1', 'TCP', 'HTTPS'], answer: 1, explain: 'SMBv1 est hérité et vulnérable; désactivez-le.' }
    ]
  }
);
