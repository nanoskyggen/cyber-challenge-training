/* ============================================================
   DONNÉES — Parcours Fondements (fr-CA)
   ============================================================ */
window.CDA_DATA_FR = window.CDA_DATA_FR || { tracks: [], modules: [] };

window.CDA_DATA_FR.tracks.push(
  { id: 'foundations', name: 'Fondements', icon: '🧭', color: 'var(--t-found)',
    blurb: 'Ce que sont les concours, comment fonctionnent les systèmes d\u2019exploitation et la virtualisation, les principes de sécurité derrière chaque correctif, et comment se déroule réellement une ronde de compétition.' },
  { id: 'windows', name: 'Renforcement Windows', icon: '🪟', color: 'var(--t-win)',
    blurb: 'Comptes, stratégie de mots de passe, Defender, mises à jour, services, logiciels, stratégie de groupe, pare-feu et permissions de fichiers sur Windows 10/11 et Server.' },
  { id: 'linux', name: 'Renforcement Linux', icon: '🐧', color: 'var(--t-linux)',
    blurb: 'Utilisateurs et groupes, stratégie de mots de passe PAM, permissions, sudo, SSH, pare-feu, paquets et services sur Ubuntu, Mint et Debian.' },
  { id: 'cisco', name: 'Réseautique Cisco', icon: '🛰️', color: 'var(--t-cisco)',
    blurb: 'Renforcement de Cisco IOS, commutation avec VLAN et sécurité des ports, routage, ACL et le défi Packet Tracer.' },
  { id: 'forensics', name: 'Criminalistique et stratégie', icon: '🔎', color: 'var(--t-forensics)',
    blurb: 'Répondre aux questions de criminalistique, traquer les logiciels malveillants et les fichiers suspects, le chiffrement, et la stratégie d\u2019équipe qui fait gagner les rondes.' }
);

window.CDA_DATA_FR.modules.push(
  /* ===================== FOND 1 ===================== */
  {
    id: 'found-1', track: 'foundations', num: 1,
    title: 'Bienvenue dans l\u2019arène cyber',
    summary: 'Découvrez CyberPatriot et CyberTitan : qui les organise, qui peut y participer, et pourquoi renforcer de vraies machines est la meilleure façon d\u2019apprendre la défense.',
    tags: ['cyberpatriot', 'cybertitan', 'intro', 'aperçu', 'afa', 'cict'],
    slides: [
      { title: 'Bienvenue, défenseur', html: `
        <p>Dans ce module, vous apprendrez ce que sont <strong>CyberPatriot</strong> et <strong>CyberTitan</strong>, en quoi ils diffèrent, et pourquoi ils constituent le meilleur point de départ possible pour une carrière en cybersécurité. À la fin, vous comprendrez la forme du concours pour lequel vous vous préparez et l\u2019état d\u2019esprit nécessaire pour réussir.</p>
        <p>Les deux programmes vous placent dans la peau d\u2019un professionnel des TI fraîchement embauché. L\u2019administrateur précédent de l\u2019entreprise est parti à la hâte, les systèmes sont en désordre, et c\u2019est à vous de les sécuriser &mdash; <em>sans briser les services dont l\u2019entreprise dépend.</em> Cette dernière clause est le cœur de toute la compétition.</p>
        <div class="callout tip"><strong>Défense, pas attaque.</strong> Contrairement à un événement de type capture-the-flag, vous ne vous introduisez nulle part. Vous êtes la personne qui nettoie, verrouille les portes et note ce qui a changé. Chaque action notée rend une machine <em>plus</em> sécurisée.</div>
      ` },
      { title: 'Qu\u2019est-ce que CyberPatriot?', html: `
        <p><strong>CyberPatriot</strong> est le programme national d\u2019éducation cyberjeunesse créé par l\u2019<strong>Air &amp; Space Forces Association (AFA)</strong>. Son événement phare, le <em>Concours national de cyberdéfense jeunesse</em>, est le plus important concours de cyberdéfense jeunesse aux États-Unis.</p>
        <p>Il a vu le jour en 2009 comme projet pilote avec huit équipes de JROTC de l\u2019armée de l\u2019air et de la Civil Air Patrol. Aujourd\u2019hui, il attire régulièrement <strong>de 4 000 à 5 000 équipes</strong> provenant des 50 États et de plusieurs endroits à l\u2019international. Le moteur de pointage et les machines virtuelles sont conçus avec le <strong>Center for Infrastructure Assurance and Security (CIAS)</strong> de l\u2019Université du Texas à San Antonio.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Qui l\u2019organise</h3><ul><li>Air &amp; Space Forces Association</li><li>Arlington, Virginie</li><li>Commanditaire principal : Northrop Grumman Foundation</li></ul></div>
          <div class="pillarCard"><h3>Qui participe</h3><ul><li>École secondaire (division ouverte)</li><li>JROTC / CAP / Cadets de la mer (toutes les armes)</li><li>École intermédiaire et premier cycle du secondaire</li></ul></div>
          <div class="pillarCard"><h3>Le format</h3><ul><li>Rondes mensuelles en ligne de 4 heures</li><li>Renforcer des images Windows et Linux</li><li>Défi de réseautique Cisco</li><li>Finale nationale en personne</li></ul></div>
        </div>
      ` },
      { title: 'Qu\u2019est-ce que CyberTitan?', html: `
        <p><strong>CyberTitan</strong> est le plus important concours de cyberdéfense jeunesse au Canada, organisé par le <strong>Conseil des technologies de l\u2019information et des communications (CICT / ICTC)</strong>. Il offre aux élèves du secondaire une expérience pratique dans des environnements simulés de cybermenaces.</p>
        <p>CyberTitan est un programme jumelé à CyberPatriot. Les équipes canadiennes s\u2019entraînent sur le même type de défis de renforcement, et plusieurs participent aussi à la structure de CyberPatriot. La saison se déroule d\u2019<strong>octobre à février</strong>, culminant par une finale nationale en mai. Les inscriptions sont ouvertes d\u2019avril à octobre, et une école peut inscrire jusqu\u2019à <strong>cinq équipes de deux à six joueurs</strong>.</p>
        <div class="callout"><strong>Un seul ensemble de compétences, deux insignes.</strong> Que vous portiez l\u2019étoile de CyberPatriot ou la feuille d\u2019érable de CyberTitan, les compétences techniques sont identiques : savoir qui devrait être sur le système, ce qu\u2019il peut faire, et comment le prouver. Tout dans cette académie s\u2019applique aux deux.</div>
        <p>Parmi les partenaires de CyberTitan figurent le <strong>Centre de la sécurité des télécommunications (CST)</strong> et des commanditaires de l\u2019industrie, ce qui signifie que les scénarios reflètent de véritables menaces canadiennes.</p>
      ` },
      { title: 'Comparaison des deux', html: `
        <p>Le tableau ci-dessous résume les différences en un coup d\u2019œil. Le contenu technique &mdash; la partie que vous pratiquez réellement &mdash; se recoupe presque entièrement.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Caractéristique</th><th>CyberPatriot</th><th>CyberTitan</th></tr></thead>
          <tbody>
            <tr><td>Organisé par</td><td>Air &amp; Space Forces Association (É.-U.)</td><td>CICT (Canada)</td></tr>
            <tr><td>Public</td><td>Écoles secondaires et intermédiaires des É.-U., JROTC/CAP</td><td>Écoles intermédiaires et secondaires du Canada</td></tr>
            <tr><td>Saison</td><td>Octobre &ndash; mars</td><td>Octobre &ndash; mai</td></tr>
            <tr><td>Taille d\u2019équipe</td><td>2&ndash;6 (5 en compétition à la fois)</td><td>2&ndash;6 par équipe, jusqu\u2019à 5 équipes/école</td></tr>
            <tr><td>Défi principal</td><td>Images Windows + Linux, Cisco</td><td>Renforcement d\u2019images en environnements simulés</td></tr>
            <tr><td>Rondes</td><td>Pratique, formation, qualifications, État, demies, finales</td><td>Rondes en ligne + finale nationale</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Le scénario auquel vous ferez face', html: `
        <p>Chaque image est livrée avec un fichier <strong>README</strong> qui décrit l\u2019entreprise et ses règles. C\u2019est le document le plus important de la ronde, car il vous indique à quoi ressemble le système « correct ». Un README typique dit des choses comme :</p>
        <ul>
          <li>« Les utilisateurs suivants sont autorisés sur ce système : alice (administratrice), bob, carol. »</li>
          <li>« L\u2019entreprise exploite un serveur web sur le port 80 &mdash; ne le supprimez pas. »</li>
          <li>« Seuls les administrateurs peuvent installer des logiciels. »</li>
          <li>« La longueur du mot de passe doit être d\u2019au moins 12 caractères. »</li>
        </ul>
        <p>Votre travail consiste à comparer la <em>réalité</em> au README et à combler l\u2019écart. Si un utilisateur est présent sur le système sans être listé, supprimez-le. Si le README indique qu\u2019un service doit rester actif, renforcez-le plutôt que de le supprimer.</p>
        <div class="callout danger"><strong>Les pénalités sont réelles.</strong> Supprimer un utilisateur ou arrêter un service dont le scénario a besoin <em>fait perdre</em> des points. Les points reviennent lorsque vous annulez l\u2019erreur, mais l\u2019horloge, non. Lisez avant de couper.</div>
      ` },
      { title: 'Les compétences que vous développerez', html: `
        <p>Le travail de compétition, c\u2019est de l\u2019administration système faite avec soin. Au fil d\u2019une saison, vous apprendrez à :</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Identité et accès</h3><ul><li>Créer/supprimer utilisateurs et groupes</li><li>Appliquer la stratégie de mots de passe et de verrouillage</li><li>Moindre privilège et sudo</li></ul></div>
          <div class="pillarCard"><h3>Renforcement</h3><ul><li>Pare-feu</li><li>Désactiver les services non sécurisés</li><li>Correctifs et mises à jour</li></ul></div>
          <div class="pillarCard"><h3>Investigation</h3><ul><li>Questions de criminalistique</li><li>Trouver les logiciels malveillants et fichiers frauduleux</li><li>Lire les journaux</li></ul></div>
          <div class="pillarCard"><h3>Réseautique</h3><ul><li>Bases de Cisco IOS</li><li>VLAN et sécurité des ports</li><li>ACL et Packet Tracer</li></ul></div>
        </div>
        <p>Ce sont exactement les compétences énumérées dans les descriptions de postes de niveau débutant en TI et en CDS (centre des opérations de sécurité). C\u2019est le vrai prix &mdash; les trophées ne sont qu\u2019un bonus.</p>
      ` },
      { title: 'L\u2019état d\u2019esprit du défenseur', html: `
        <p>Trois habitudes distinguent les équipes qui obtiennent de bons scores de celles qui pataugent :</p>
        <ol>
          <li><strong>Lire d\u2019abord, agir ensuite.</strong> Ouvrez le README et le rapport de pointage avant de toucher à quoi que ce soit. Connaissez l\u2019état cible.</li>
          <li><strong>Changez une chose à la fois et consignez-la.</strong> Tenez un journal écrit de chaque changement. Quand votre score chute, le journal vous indique quoi annuler.</li>
          <li><strong>Respectez l\u2019entreprise.</strong> Un « correctif » qui brise le courriel est un échec. La sécurité et la disponibilité forment un équilibre que vous devez gérer.</li>
        </ol>
        <div class="callout tip"><strong>Les listes de vérification gagnent.</strong> Les listes de vérification imprimées et manuscrites sont permises en compétition. Créez la vôtre à partir de documentation générale, jamais à partir des notes spécifiques à la compétition d\u2019une autre équipe &mdash; les règles l\u2019interdisent.</div>
        <p>Vous êtes prêt. Passez au module suivant pour apprendre comment fonctionnent réellement les machines que vous défendrez.</p>
      ` }
    ],
    quiz: [
      { q: 'Quel organisme a créé et organise CyberPatriot?', opts: ['La National Security Agency', 'L\u2019Air & Space Forces Association', 'Cisco Systems', 'Le ministère de l\u2019Éducation'], answer: 1, explain: 'CyberPatriot est un programme de l\u2019AFA; le moteur de pointage est conçu avec le CIAS de l\u2019UT San Antonio.' },
      { q: 'CyberTitan se décrit le mieux comme :', opts: ['Une ligue américaine réservée à l\u2019école intermédiaire', 'Le plus important concours de cyberdéfense jeunesse au Canada, organisé par le CICT', 'Un examen de certification Cisco', 'Un événement de piratage de type capture-the-flag'], answer: 1, explain: 'CyberTitan est le programme canadien jumelé à CyberPatriot, organisé par le CICT (ICTC).' },
      { q: 'Quel est le document le plus important à lire au début d\u2019une ronde?', opts: ['Le rapport de pointage', 'Le fichier scénario README', 'Le journal d\u2019événements Windows', 'La liste de l\u2019équipe'], answer: 1, explain: 'Le README définit l\u2019état correct du système et ce qui doit rester en fonction.' },
      { q: 'Un correctif de sécurité qui arrête un service dont l\u2019entreprise a besoin est :', opts: ['Un bonus', 'Une pénalité, car il entre en conflit avec le scénario', 'Ignoré par le pointage', 'Exigé par les règles'], answer: 1, explain: 'Les actions qui entrent en conflit avec le scénario font perdre des points jusqu\u2019à leur annulation.' },
      { q: 'Quelle catégorie de compétences n\u2019est PAS typique d\u2019une compétition?', opts: ['Utilisateurs et mots de passe', 'Pare-feu et services', 'Exploitation offensive d\u2019autres équipes', 'Questions de criminalistique'], answer: 2, explain: 'L\u2019activité offensive contre d\u2019autres équipes est explicitement interdite.' }
    ]
  },

  /* ===================== FOND 2 ===================== */
  {
    id: 'found-2', track: 'foundations', num: 2,
    title: 'Systèmes d\u2019exploitation et virtualisation',
    summary: 'En quoi Windows, Linux et macOS diffèrent, ce qu\u2019est une machine virtuelle, et comment VMware et Packet Tracer fournissent l\u2019environnement de compétition.',
    tags: ['SE', 'virtualisation', 'vmware', 'packet tracer', 'windows', 'linux'],
    slides: [
      { title: 'Ce que fait un système d\u2019exploitation', html: `
        <p>Un <strong>système d\u2019exploitation (SE)</strong> est le logiciel qui gère le matériel et les logiciels d\u2019un ordinateur. Il se situe entre vous et la machine et assume quatre fonctions :</p>
        <ul>
          <li><strong>Exécuter des programmes</strong> &mdash; planifier le temps du processeur et la mémoire.</li>
          <li><strong>Gérer le stockage</strong> &mdash; fichiers, dossiers et permissions.</li>
          <li><strong>Contrôler le matériel</strong> &mdash; claviers, disques, cartes réseau, imprimantes.</li>
          <li><strong>Isoler les utilisateurs et les processus</strong> &mdash; afin qu\u2019un programme ne puisse pas lire la mémoire d\u2019un autre ni les fichiers d\u2019un autre utilisateur.</li>
        </ul>
        <p>Presque chaque vulnérabilité que vous corrigerez est une défaillance de cette quatrième fonction : quelqu\u2019un peut faire quelque chose qu\u2019il ne devrait pas pouvoir faire.</p>
      ` },
      { title: 'Les trois grandes familles', html: `
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Windows</h3><ul><li>Créé par Microsoft</li><li>SE de bureau/serveur le plus répandu</li><li>Interface graphique d\u2019abord, avec PowerShell et CMD</li><li>Compétition : Windows 10/11, Server 2019/2022</li></ul></div>
          <div class="pillarCard"><h3>Linux</h3><ul><li>Libre et open source</li><li>Domine les serveurs, le nuage, l\u2019embarqué</li><li>Ligne de commande d\u2019abord</li><li>Compétition : Ubuntu 22, Mint 21, Debian 12</li></ul></div>
          <div class="pillarCard"><h3>macOS / Unix</h3><ul><li>Créé par Apple</li><li>Fondation Unix, semblable à Linux sous le capot</li><li>Non utilisé dans les rondes principales</li></ul></div>
        </div>
        <p>Les rondes en ligne de CyberPatriot ont utilisé <strong>Windows 10/11, Windows Server 2019/2022, Ubuntu 22 et Linux Mint 21</strong>. Les rondes ultérieures ajoutent <strong>Debian 12</strong>, et les demi-finales ont introduit <strong>FreeBSD</strong>.</p>
      ` },
      { title: 'Le système de fichiers : là où vit la sécurité', html: `
        <p>Chaque compte, règle de mot de passe et permission est stocké dans un fichier ou une clé de registre. Savoir où chercher, c\u2019est la moitié du combat.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Quoi</th><th>Chemin Linux</th><th>Équivalent Windows</th></tr></thead>
          <tbody>
            <tr><td>Comptes d\u2019utilisateurs</td><td><code>/etc/passwd</code></td><td>Utilisateurs et groupes locaux (<code>lusrmgr.msc</code>)</td></tr>
            <tr><td>Empreintes de mots de passe</td><td><code>/etc/shadow</code></td><td>Base de données SAM (masquée)</td></tr>
            <tr><td>Groupes</td><td><code>/etc/group</code></td><td>Appartenance aux groupes dans <code>lusrmgr.msc</code></td></tr>
            <tr><td>Stratégie de mots de passe</td><td><code>/etc/pam.d/</code>, <code>login.defs</code></td><td>Stratégie de sécurité locale (<code>secpol.msc</code>)</td></tr>
            <tr><td>Services</td><td><code>systemctl</code>, <code>/etc/init.d</code></td><td><code>services.msc</code></td></tr>
            <tr><td>Pare-feu</td><td><code>ufw</code>, <code>iptables</code></td><td>Pare-feu Windows Defender</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Qu\u2019est-ce qu\u2019une machine virtuelle?', html: `
        <p>Une <strong>machine virtuelle (VM)</strong> est un ordinateur complet &mdash; processeur, mémoire, disque, carte réseau &mdash; simulé en logiciel. Un programme appelé <strong>hyperviseur</strong> exécute plusieurs VM sur un seul hôte physique, chacune isolée des autres.</p>
        <p>Les images de compétition sont des VM. Vous n\u2019avez pas besoin d\u2019installer Windows ou Linux sur votre propre ordinateur; vous ouvrez l\u2019image fournie dans <strong>VMware Workstation Pro</strong> (gratuit pour les concurrents). L\u2019image est un instantané d\u2019une machine volontairement brisée.</p>
        <div class="callout"><strong>Pourquoi les VM importent pour la sécurité.</strong> Parce qu\u2019une VM est isolée, vous pouvez la briser, restaurer un instantané et réessayer. C\u2019est exactement ainsi que vous devriez vous entraîner &mdash; prenez un instantané avant d\u2019expérimenter.</div>
        <p>Votre ordinateur hôte a besoin de <strong>Windows 64 bits</strong>, de <strong>8 Go de RAM</strong>, de <strong>40 Go d\u2019espace disque libre</strong> et de la <strong>virtualisation (VT-x / AMD-V) activée dans le BIOS</strong>. Certaines images ne s\u2019ouvriront pas sans cela.</p>
      ` },
      { title: 'La boîte à outils de la compétition', html: `
        <p>Voici les outils standard que vous utiliserez à chaque ronde :</p>
        <ul>
          <li><strong>VMware Workstation Pro</strong> &mdash; exécute les images de SE. Gratuit pour les équipes CyberPatriot.</li>
          <li><strong>7-Zip</strong> &mdash; extrait les archives d\u2019images compressées.</li>
          <li><strong>WinMD5</strong> &mdash; vérifie la somme de contrôle de l\u2019image pour que vous sachiez que le téléchargement est intact.</li>
          <li><strong>Votre navigateur web</strong> &mdash; pour le défi de réseautique Cisco sur <code>netacad.com</code>.</li>
          <li><strong>Packet Tracer</strong> &mdash; le simulateur de réseau de Cisco, utilisé pour l\u2019exercice de réseautique.</li>
        </ul>
        <div class="callout warn"><strong>Téléchargez tôt.</strong> Les images sont volumineuses. Téléchargez-les des jours avant votre ronde et vérifiez la somme de contrôle MD5. Le blocage des ports 80/443 vers le serveur de pointage par les pare-feu scolaires est la défaillance technique la plus courante.</div>
      ` },
      { title: 'Packet Tracer en 60 secondes', html: `
        <p><strong>Cisco Packet Tracer</strong> est un simulateur de réseau. Vous glissez des routeurs, des commutateurs et des ordinateurs sur un canevas, vous les reliez par câble et vous les configurez avec des commandes Cisco IOS &mdash; sans aucun matériel physique.</p>
        <p>Dans le défi de réseautique Cisco, on vous demandera typiquement de :</p>
        <ul>
          <li>Construire ou réparer une petite topologie réseau.</li>
          <li>Attribuer correctement les adresses IP et le sous-réseau.</li>
          <li>Configurer la sécurité des appareils (mots de passe, SSH, bannières).</li>
          <li>Appliquer des ACL ou la sécurité des ports pour répondre à une exigence.</li>
        </ul>
        <p>Le questionnaire et l\u2019exercice Packet Tracer reposent tous deux sur les modules de formation NetAcad assignés, de sorte que le contenu peut être appris à l\u2019avance. Le parcours Cisco plus loin dans cette académie vous y guide.</p>
      ` },
      { title: 'Configuration de l\u2019environnement de pratique', html: `
        <p>On n\u2019apprend pas à renforcer des systèmes uniquement en lisant. Montez un laboratoire :</p>
        <ol>
          <li>Installez <strong>VMware Workstation Pro</strong> sur un hôte 64 bits.</li>
          <li>Installez une VM <strong>Ubuntu</strong> ou <strong>Linux Mint</strong> propre et une VM <strong>Windows 11</strong> propre.</li>
          <li>Prenez un instantané de chacune <em>avant</em> de modifier quoi que ce soit.</li>
          <li>Brisez quelque chose volontairement (ajoutez un utilisateur frauduleux, affaiblissez un mot de passe), puis corrigez-le.</li>
          <li>Restaurez l\u2019instantané et répétez jusqu\u2019à ce que ce soit un réflexe.</li>
        </ol>
        <div class="callout tip"><strong>Ne pratiquez jamais sur des machines partagées.</strong> Ne renforcez que les systèmes que vous possédez ou que vous êtes explicitement autorisé à modifier. Les ordinateurs du laboratoire de votre école ne sont pas votre image de compétition.</div>
      ` }
    ],
    quiz: [
      { q: 'Quel composant exécute les machines virtuelles sur un hôte physique?', opts: ['Le noyau', 'L\u2019hyperviseur', 'Le BIOS', 'Le moteur de pointage'], answer: 1, explain: 'L\u2019hyperviseur (VMware Workstation Pro) crée et exécute les VM.' },
      { q: 'Sous Linux, où sont stockées les empreintes de mots de passe des utilisateurs?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/hosts'], answer: 1, explain: '/etc/shadow contient les empreintes et n\u2019est lisible que par root.' },
      { q: 'Qu\u2019est-ce qui n\u2019est PAS requis sur l\u2019hôte pour exécuter les images de compétition?', opts: ['Un hôte Windows 64 bits', '8 Go de RAM', 'Un GPU dédié', 'La virtualisation activée dans le BIOS'], answer: 2, explain: 'Un GPU dédié n\u2019est pas requis; la prise en charge de la virtualisation du processeur l\u2019est.' },
      { q: 'Quel est le but de WinMD5?', opts: ['Craquer des mots de passe', 'Vérifier la somme de contrôle de l\u2019image', 'Configurer le pare-feu', 'Simuler un réseau'], answer: 1, explain: 'WinMD5 confirme que l\u2019image téléchargée correspond à la somme de contrôle attendue.' },
      { q: 'Packet Tracer sert à :', opts: ['Renforcer Windows', 'Simuler et configurer des réseaux', 'Modifier le registre', 'Craquer des empreintes'], answer: 1, explain: 'Packet Tracer est le simulateur de réseau de Cisco pour le défi de réseautique.' }
    ]
  },

  /* ===================== FOND 3 ===================== */
  {
    id: 'found-3', track: 'foundations', num: 3,
    title: 'Principes fondamentaux de sécurité',
    summary: 'La triade CID, le moindre privilège, la surface d\u2019attaque, la défense en profondeur et l\u2019équation du risque \u2014 les modèles mentaux derrière chaque action de renforcement.',
    tags: ['triade CID', 'moindre privilège', 'surface d\u2019attaque', 'défense en profondeur', 'risque'],
    slides: [
      { title: 'Pourquoi les principes valent mieux que les recettes', html: `
        <p>Vous pourriez mémoriser cent correctifs, mais les images changent à chaque ronde. Ce qui reste constant, ce sont les <strong>principes</strong> qui vous disent <em>pourquoi</em> un correctif importe. Demandez « quelle attaque ce réglage bloque-t-il? » et le correctif reste.</p>
        <p>Ce module vous donne cinq modèles mentaux que vous utiliserez sur chaque machine : la triade CID, le moindre privilège, la surface d\u2019attaque, la défense en profondeur et l\u2019équation du risque.</p>
      ` },
      { title: 'La triade CID', html: `
        <p>Les trois objectifs de la sécurité sont la <strong>Confidentialité</strong>, l\u2019<strong>Intégrité</strong> et la <strong>Disponibilité</strong> (CID).</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Confidentialité</h3><ul><li>Seules les personnes autorisées voient les données</li><li>Chiffrement, permissions, stratégie de mots de passe</li><li>Compromise par : mots de passe faibles, partages ouverts</li></ul></div>
          <div class="pillarCard"><h3>Intégrité</h3><ul><li>Les données sont exactes et non altérées</li><li>Empreintes, permissions de fichiers, audit</li><li>Compromise par : logiciels malveillants, modifications non autorisées</li></ul></div>
          <div class="pillarCard"><h3>Disponibilité</h3><ul><li>Les systèmes fonctionnent quand on en a besoin</li><li>Sauvegardes, correctifs, protection DDoS</li><li>Compromise par : suppression de services nécessaires</li></ul></div>
        </div>
        <div class="callout warn"><strong>La disponibilité est aussi notée.</strong> Si vous « sécurisez » une machine en désactivant le service dont l\u2019entreprise a besoin, vous avez brisé la disponibilité &mdash; et vous perdez des points.</div>
      ` },
      { title: 'Le principe du moindre privilège', html: `
        <p>Le <strong>moindre privilège</strong> signifie que chaque utilisateur et chaque processus reçoit l\u2019accès minimal nécessaire pour faire son travail &mdash; rien de plus. C\u2019est l\u2019idée la plus utile de toute la compétition.</p>
        <p>Concrètement, sur chaque image, vous devriez vous demander :</p>
        <ul>
          <li>Qui est <strong>administrateur / sudoer</strong>? Devrait-il l\u2019être?</li>
          <li>Un utilisateur ordinaire possède-t-il des droits root/Admin dont il n\u2019a pas besoin?</li>
          <li>Y a-t-il des comptes qui devraient être <strong>désactivés ou supprimés</strong>?</li>
          <li>Des services s\u2019exécutent-ils sous un compte sur-privilégié?</li>
        </ul>
        <p>La plupart des constats d\u2019« admin frauduleux » sont des violations du moindre privilège : un utilisateur dans le groupe <code>sudo</code> ou <code>Administrators</code> qui ne devrait pas y être.</p>
      ` },
      { title: 'Réduire la surface d\u2019attaque', html: `
        <p>La <strong>surface d\u2019attaque</strong> est tout ce qu\u2019un attaquant pourrait utiliser : ports ouverts, services en cours d\u2019exécution, programmes installés, comptes d\u2019utilisateurs, tâches planifiées. Chaque élément que vous supprimez ou désactivez est une voie d\u2019entrée de moins.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Élément de surface d\u2019attaque</th><th>Pourquoi c\u2019est risqué</th><th>Action typique</th></tr></thead>
          <tbody>
            <tr><td>Serveur FTP (port 21)</td><td>Envoie les identifiants en clair</td><td>Supprimer, ou remplacer par SFTP si requis</td></tr>
            <tr><td>Telnet (port 23)</td><td>Shell à distance non chiffré</td><td>Désactiver; utiliser SSH à la place</td></tr>
            <tr><td>Compte invité activé</td><td>Aucun mot de passe, aucune traçabilité</td><td>Désactiver</td></tr>
            <tr><td>Jeux / outils inutiles</td><td>Souvent vulnérables, contraires à la politique</td><td>Désinstaller</td></tr>
            <tr><td>Partages de fichiers ouverts</td><td>Exposition des données</td><td>Restreindre les permissions</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><strong>Mais vérifiez le README.</strong> Si le scénario indique que l\u2019entreprise exploite un serveur de fichiers, vous le renforcez plutôt que de le supprimer. Réduisez la surface, mais ne brisez jamais l\u2019entreprise.</div>
      ` },
      { title: 'La défense en profondeur', html: `
        <p>La <strong>défense en profondeur</strong> consiste à superposer des contrôles indépendants afin que, si l\u2019un échoue, un autre vous protège encore. Un seul contrôle, c\u2019est un point de défaillance unique.</p>
        <p>Pour un compte d\u2019utilisateur, les couches pourraient être : une stratégie de mots de passe robuste, le verrouillage du compte après des tentatives échouées, une appartenance aux groupes selon le moindre privilège et l\u2019audit des connexions. Pour un réseau : un pare-feu, un SE à jour et des services renforcés.</p>
        <p>Quand vous corrigez un constat, demandez-vous s\u2019il existe un <em>second</em> contrôle que vous pouvez ajouter. Les équipes qui pensent en couches obtiennent de meilleurs scores que celles qui courent après des cases à cocher individuelles.</p>
      ` },
      { title: 'L\u2019équation du risque', html: `
        <p>Le risque s\u2019exprime couramment ainsi :</p>
        <pre><code>Risque = Menace × Vulnérabilité × Impact</code></pre>
        <p>Vous ne pouvez habituellement pas supprimer la <strong>menace</strong> (les attaquants existent). Vous pouvez réduire la <strong>vulnérabilité</strong> (corriger, fermer le port, supprimer le compte) et réduire l\u2019<strong>impact</strong> (limiter ce qu\u2019un compte peut atteindre, sauvegarder les données).</p>
        <p>C\u2019est pourquoi le moindre privilège et la réduction de la surface d\u2019attaque sont si puissants : ils attaquent deux termes de l\u2019équation à la fois.</p>
        <div class="callout"><strong>Priorisez selon le risque.</strong> Avec un temps limité, corrigez d\u2019abord les constats à la fois faciles <em>et</em> à fort impact : admins frauduleux, mots de passe manquants, pare-feu désactivés et systèmes non corrigés.</div>
      ` },
      { title: 'Autorisation et éthique', html: `
        <p>Tout ce que vous apprenez ici est une arme à double tranchant. La règle est simple et absolue :</p>
        <div class="callout danger"><strong>Ne touchez qu\u2019aux systèmes que vous possédez ou que vous êtes explicitement autorisé à modifier.</strong> Les images de compétition sont conçues pour que vous les modifiiez. Le réseau de votre école, les comptes de vos amis et les sites web publics, non.</div>
        <p>En compétition, les règles interdisent également toute activité offensive, l\u2019aide extérieure pendant une ronde et le partage de matériel spécifique à la compétition. Enfreindre ces règles peut disqualifier toute une équipe.</p>
        <p>Les bons défenseurs sont dignes de confiance parce qu\u2019ils respectent les limites. Prenez cette habitude dès maintenant.</p>
      ` }
    ],
    quiz: [
      { q: 'Quelle partie de la triade CID est brisée si vous désactivez un service dont l\u2019entreprise a besoin?', opts: ['Confidentialité', 'Intégrité', 'Disponibilité', 'Non-répudiation'], answer: 2, explain: 'La disponibilité signifie que les systèmes fonctionnent quand on en a besoin; briser un service nécessaire nuit à la disponibilité.' },
      { q: 'Le moindre privilège signifie :', opts: ['Tout le monde obtient les droits admin pour aller plus vite', 'Les utilisateurs n\u2019obtiennent que l\u2019accès dont ils ont besoin', 'Les mots de passe sont partagés', 'Tous les ports sont ouverts'], answer: 1, explain: 'Le moindre privilège accorde l\u2019accès minimal requis pour le travail.' },
      { q: 'Quel est le meilleur exemple de réduction de la surface d\u2019attaque?', opts: ['Ajouter un autre admin', 'Désactiver le service Telnet', 'Activer le compte invité', 'Ouvrir le port 21'], answer: 1, explain: 'Supprimer un service non chiffré et inutile réduit la surface d\u2019attaque.' },
      { q: 'La défense en profondeur signifie :', opts: ['Un seul contrôle très robuste', 'Des contrôles indépendants superposés', 'Désactiver le pare-feu', 'Utiliser le même mot de passe partout'], answer: 1, explain: 'Superposer les contrôles fait qu\u2019une seule défaillance ne compromet pas le système.' },
      { q: 'Dans l\u2019équation Risque = Menace × Vulnérabilité × Impact, le renforcement réduit surtout :', opts: ['La menace', 'La vulnérabilité et l\u2019impact', 'Rien', 'Seulement l\u2019impact'], answer: 1, explain: 'Le renforcement réduit la vulnérabilité et peut limiter l\u2019impact; la menace elle-même demeure.' }
    ]
  },

  /* ===================== FOND 4 ===================== */
  {
    id: 'found-4', track: 'foundations', num: 4,
    title: 'Comment se déroule une ronde de compétition',
    summary: 'Du téléchargement des images et de la saisie de votre identifiant unique à la lecture du rapport de pointage, en gérant quatre heures et en évitant les pénalités qui coulent les nouvelles équipes.',
    tags: ['ronde', 'pointage', 'readme', 'règles', 'stratégie', 'identifiant unique'],
    slides: [
      { title: 'Le rythme d\u2019une ronde', html: `
        <p>Chaque ronde en ligne suit la même séquence. Apprenez-la une fois et la logistique cessera de faire peur.</p>
        <ol>
          <li><strong>Téléchargez tôt.</strong> Le lundi précédant une ronde, votre entraîneur reçoit les liens vers les images de VM. Téléchargez-les des jours à l\u2019avance et vérifiez la somme de contrôle MD5.</li>
          <li><strong>Obtenez le mot de passe.</strong> Le jour du départ, un courriel « StartEx » arrive avec le mot de passe qui déverrouille les images.</li>
          <li><strong>Choisissez vos quatre heures.</strong> Les équipes choisissent un bloc continu de quatre heures. L\u2019horloge démarre au moment où vous allumez votre première image &mdash; pas quand vous vous sentez prêt.</li>
          <li><strong>Saisissez votre identifiant unique.</strong> Chaque image demande l\u2019identifiant de votre équipe afin que le serveur de pointage sache qui vous êtes.</li>
          <li><strong>Corrigez, pointez, répétez.</strong> Un rapport de pointage sur le bureau se met à jour au fur et à mesure.</li>
        </ol>
      ` },
      { title: 'Le rapport de pointage', html: `
        <p>Dans chaque image se trouve un <strong>rapport de pointage</strong> (souvent une page HTML sur le bureau) qui énumère les éléments notés et se met à jour en direct. Le vert signifie que vous avez gagné les points; le rouge ou le gris signifie que non.</p>
        <p>Deux choses surprennent les nouvelles équipes :</p>
        <ul>
          <li><strong>Chaque vulnérabilité n\u2019est pas notée.</strong> Un correctif qui ne rapporte rien n\u2019est pas la preuve que vous avez mal fait &mdash; les règles indiquent explicitement que toutes les vulnérabilités d\u2019une image ne sont pas notées.</li>
          <li><strong>Vous pouvez perdre des points.</strong> Toute action qui entre en conflit avec le scénario (supprimer un utilisateur ou un service nécessaire) retire des points. Annuler l\u2019erreur les rétablit.</li>
        </ul>
        <div class="callout tip"><strong>Actualisez le rapport.</strong> Il ne se met pas toujours à jour instantanément. Si votre score n\u2019a pas bougé, attendez un moment et rechargez avant de conclure que le correctif a échoué.</div>
      ` },
      { title: 'Ce qui est réellement noté', html: `
        <p>Les catégories de résultats officielles correspondent directement à votre plan d\u2019étude. Attendez-vous à des constats dans ces catégories :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Catégorie</th><th>Exemples</th></tr></thead>
          <tbody>
            <tr><td>Politique d\u2019utilisateurs</td><td>Comptes frauduleux, admins non autorisés, utilisateurs désactivés vs supprimés</td></tr>
            <tr><td>Politique de mots de passe</td><td>Longueur minimale, complexité, âge maximal, historique</td></tr>
            <tr><td>Politique de connexion</td><td>Seuil de verrouillage, compte invité, ouverture de session automatique</td></tr>
            <tr><td>Contrôle d\u2019accès</td><td>Permissions de fichiers/partages, sudoers, appartenance aux groupes</td></tr>
            <tr><td>Services non sécurisés</td><td>FTP, Telnet, démons inutiles</td></tr>
            <tr><td>Pare-feu</td><td>Profils activés, ports autorisés/bloqués</td></tr>
            <tr><td>Mises à jour et antivirus</td><td>Correctifs manquants, Defender désactivé</td></tr>
            <tr><td>Logiciels malveillants et violations de politique</td><td>Fichiers frauduleux, jeux, outils contraires à la politique</td></tr>
            <tr><td>Questions de criminalistique</td><td>Trouver et signaler quelque chose de précis sur le système</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Bien lire le README', html: `
        <p>Le README est un contrat. Extrayez-en trois listes avant de modifier quoi que ce soit :</p>
        <ol>
          <li><strong>Utilisateurs autorisés</strong> &mdash; qui peut se connecter, et qui est administrateur.</li>
          <li><strong>Services requis</strong> &mdash; ce qui doit rester en fonction (web, courriel, partage de fichiers).</li>
          <li><strong>Politique de l\u2019entreprise</strong> &mdash; règles de mots de passe, logiciels autorisés, activités interdites.</li>
        </ol>
        <p>Comparez ensuite la réalité au contrat. Sous Linux, lister les comptes humains se fait en une commande :</p>
        <pre><code><span class="cmt"># Lister les comptes réguliers (humains) sur les systèmes basés sur Debian</span>
awk -F: '$3 >= 1000 && $3 < 65534 {print $1}' /etc/passwd
<span class="cmt"># Afficher qui a les droits d'administration</span>
getent group sudo</code></pre>
        <p>Si le README indique que seul <code>alice</code> est administrateur, alors <code>mallory</code> ne devrait pas être dans le groupe sudo.</p>
      ` },
      { title: 'Gérer quatre heures', html: `
        <p>Quatre heures, c\u2019est généreux si vous êtes organisé et brutal si vous ne l\u2019êtes pas. Un plan éprouvé :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Temps</th><th>Objectif</th></tr></thead>
          <tbody>
            <tr><td>0:00&ndash;0:20</td><td>Lire chaque README, ouvrir le rapport de pointage, noter les utilisateurs/services requis</td></tr>
            <tr><td>0:20&ndash;1:30</td><td>Utilisateurs, groupes, stratégie de mots de passe, verrouillage &mdash; les gains les plus rapides et les plus rentables</td></tr>
            <tr><td>1:30&ndash;2:30</td><td>Services, suppression de logiciels, pare-feu, mises à jour, antivirus</td></tr>
            <tr><td>2:30&ndash;3:15</td><td>Questions de criminalistique et recherche de logiciels malveillants</td></tr>
            <tr><td>3:15&ndash;3:50</td><td>Deuxième passage : relire le rapport, traquer les éléments manqués</td></tr>
            <tr><td>3:50&ndash;4:00</td><td>Consigner les changements, vérifier que rien n\u2019est brisé, arrêter</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><strong>Arrêtez à quatre heures.</strong> Continuer après la limite entraîne des pénalités. L\u2019horloge démarre quand la première image s\u2019allume.</div>
      ` },
      { title: 'Rôles d\u2019équipe et communication', html: `
        <p>Jusqu\u2019à six élèves peuvent figurer sur une liste, mais seulement <strong>cinq participent à la fois</strong>, avec une substitution permise par ronde. Une bonne répartition :</p>
        <ul>
          <li><strong>1&ndash;2 personnes par image</strong> (Windows, Linux) pour que personne ne change constamment de contexte.</li>
          <li><strong>1 personne sur Cisco</strong> &mdash; le questionnaire et Packet Tracer.</li>
          <li><strong>1 personne volante</strong> pour lire les README, exécuter la criminalistique et revérifier le rapport.</li>
        </ul>
        <p>Convenez d\u2019une règle avant de commencer : <em>personne ne supprime un utilisateur ou un service sans d\u2019abord vérifier le README.</em> Communication verbale seulement, aucun contact extérieur.</p>
      ` },
      { title: 'Les règles qui coulent les nouvelles équipes', html: `
        <p>Beaucoup de pénalités n\u2019ont rien à voir avec les compétences. Sachez-les sur le bout des doigts :</p>
        <ul>
          <li><strong>Aucune aide extérieure pendant une ronde.</strong> Les entraîneurs ne gèrent que la logistique et le chronométrage. Aucune publication sur un forum, aucune question à un ami.</li>
          <li><strong>Aucune IA pendant les rondes.</strong> Les robots conversationnels et les scripts générés par IA sont interdits en compétition; les produits d\u2019IA payants sont interdits en lien avec la compétition en tout temps.</li>
          <li><strong>Une copie de chaque image.</strong> Ouvrir la même image deux fois déclenche une pénalité d\u2019instances multiples.</li>
          <li><strong>Quatre heures, c\u2019est quatre heures.</strong> Ouvrir une image « juste pour vérifier » démarre votre ronde plus tôt.</li>
          <li><strong>Aucune activité offensive.</strong> Vous défendez; vous n\u2019attaquez pas.</li>
        </ul>
        <div class="callout tip"><strong>Créez votre propre liste de vérification.</strong> Les listes manuscrites et imprimées sont permises, mais elles doivent être votre propre travail à partir de documentation générale &mdash; pas une « liste de vérification CyberPatriot » téléchargée.</div>
      ` }
    ],
    quiz: [
      { q: 'Quand l\u2019horloge de quatre heures de la compétition démarre-t-elle?', opts: ['Quand le courriel StartEx arrive', 'Quand vous allumez la première image', 'Quand vous finissez de lire le README', 'À 9 h 00 HE'], answer: 1, explain: 'L\u2019horloge démarre au moment où la première image est allumée.' },
      { q: 'Le rapport de pointage sert à :', opts: ['Discuter avec d\u2019autres équipes', 'Voir en direct quels correctifs ont rapporté des points', 'Télécharger des images', 'Réinitialiser des mots de passe'], answer: 1, explain: 'Il se met à jour au fur et à mesure et montre les éléments notés.' },
      { q: 'Quelle action peut FAIRE PERDRE des points?', opts: ['Désactiver le compte invité', 'Supprimer un utilisateur dont le scénario a besoin', 'Activer le pare-feu', 'Définir une stratégie de mots de passe robuste'], answer: 1, explain: 'Les actions qui entrent en conflit avec le scénario retirent des points jusqu\u2019à leur annulation.' },
      { q: 'Combien d\u2019élèves peuvent participer à la fois dans une équipe?', opts: ['2', '3', '5', '6'], answer: 2, explain: 'Jusqu\u2019à six sur la liste, mais seulement cinq participent à la fois.' },
      { q: 'Qu\u2019est-ce qui est permis pendant une ronde de compétition?', opts: ['Demander conseil à un mentor', 'Utiliser un robot conversationnel pour générer des correctifs', 'Une liste de vérification manuscrite que vous avez écrite vous-même', 'Publier une question sur un forum'], answer: 2, explain: 'Votre propre liste manuscrite/imprimée est permise; l\u2019aide extérieure et l\u2019IA ne le sont pas.' }
    ]
  }
);
