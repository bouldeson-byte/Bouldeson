/* =====================================================================
   BOULDESON — LOGIQUE DU SITE
   Lit config.js, affiche les modèles, compose les emails de contact.
   ===================================================================== */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const produitParRef = ref => CONFIG.produits.find(p => p.ref === ref);
const nomGamme = cle => (CONFIG.gammes[cle] || {}).nom || "";

/* --- Informations de l'entreprise injectées dans les pages ----------- */
function injecterConfig(){
  $$("[data-cfg]").forEach(el => {
    const valeur = CONFIG[el.dataset.cfg];
    if (!valeur) return;
    if (el.tagName === "A"){
      el.textContent = el.dataset.cfgTexte || valeur;
      if (el.dataset.cfg === "email")           el.href = "mailto:" + valeur;
      else if (el.dataset.cfg === "telephone")  el.href = "tel:" + valeur.replace(/\s/g, "");
      else el.href = valeur;
    } else {
      el.textContent = valeur;
    }
  });
  // blocs à n'afficher que si l'information existe (ex. le téléphone)
  $$("[data-si]").forEach(el => { el.hidden = !CONFIG[el.dataset.si]; });

  const annee = $("[data-annee]");
  if (annee) annee.textContent = new Date().getFullYear();
}

/* --- Carte d'un modèle ------------------------------------------------ */
function carte(p){
  return `
    <a class="carte" href="produit.html?ref=${encodeURIComponent(p.ref)}" data-gamme="${p.gamme}">
      <img src="${p.photos[0]}" alt="${p.nom} — enceinte ${CONFIG.marque}" loading="lazy">
      <div class="carte-corps">
        <span class="etiquette">${nomGamme(p.gamme)}</span>
        <h3>${p.nom}</h3>
        <p class="carte-accroche">${p.accroche}</p>
        <div class="carte-pied">
          <span>${p.ref}</span>
          <span class="lien-fleche">Voir le modèle &rarr;</span>
        </div>
      </div>
    </a>`;
}

/* --- Page d'accueil : quelques modèles ------------------------------- */
function afficherApercu(){
  const zone = $("[data-apercu-produits]");
  if (!zone) return;
  const choix = ["BDS-01", "BDS-04", "BDS-09"]
    .map(produitParRef).filter(Boolean);
  zone.innerHTML = (choix.length ? choix : CONFIG.produits.slice(0,3)).map(carte).join("");
}

/* --- Page boutique : tous les modèles, avec filtre -------------------- */
function afficherBoutique(){
  const grille = $("[data-grille-produits]");
  if (!grille) return;

  grille.innerHTML = CONFIG.produits.map(carte).join("");

  $$("[data-filtre]").forEach(bouton => {
    bouton.addEventListener("click", () => {
      const cible = bouton.dataset.filtre;
      $$("[data-filtre]").forEach(b => b.setAttribute("aria-pressed", b === bouton));
      $$(".carte", grille).forEach(c => {
        c.hidden = !(cible === "tout" || c.dataset.gamme === cible);
      });
    });
  });
}

/* --- Page fiche produit ---------------------------------------------- */
function afficherProduit(){
  if (!$("[data-page-produit]")) return;

  const ref = new URLSearchParams(location.search).get("ref");
  const p = produitParRef(ref) || CONFIG.produits[0];

  document.title = `${p.nom} — ${CONFIG.marque}`;

  $("[data-photo-principale]").src = p.photos[0];
  $("[data-photo-principale]").alt = `${p.nom} — vue principale`;

  const vignettes = $("[data-vignettes]");
  vignettes.innerHTML = p.photos.map((src, i) =>
    `<img src="${src}" alt="${p.nom} — vue ${i + 1}" aria-selected="${i === 0}" tabindex="0" loading="lazy">`
  ).join("");
  const choisir = cible => {
    $("[data-photo-principale]").src = cible.src;
    $$("img", vignettes).forEach(v => v.setAttribute("aria-selected", v === cible));
  };
  vignettes.addEventListener("click", e => { if (e.target.tagName === "IMG") choisir(e.target); });
  vignettes.addEventListener("keydown", e => {
    if (e.target.tagName === "IMG" && (e.key === "Enter" || e.key === " ")){
      e.preventDefault(); choisir(e.target);
    }
  });

  $("[data-p-ref]").textContent      = p.ref;
  $("[data-p-nom]").textContent      = p.nom;
  $("[data-p-gamme]").textContent    = nomGamme(p.gamme);
  $("[data-p-accroche]").textContent = p.accroche;
  $("[data-p-desc]").textContent     = p.description;

  const form = $("[data-form-demande]");
  $("[data-p-titre-form]").textContent = `Ce modèle vous intéresse ?`;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const { objet, corps } = construireDemande(form, p);
    ouvrirMessagerie(objet, corps);
    afficherRecap(corps);
  });

  $("[data-copier]").addEventListener("click", () => {
    const { corps } = construireDemande(form, p);
    afficherRecap(corps);
    navigator.clipboard?.writeText(corps).then(
      () => { $("[data-copier]").textContent = "Texte copié ✓"; }, () => {}
    );
    $("[data-recap-texte]").select();
  });
}

function afficherRecap(texte){
  const zone = $("[data-recap]");
  if (!zone) return;
  zone.hidden = false;
  $("[data-recap-texte]").value = texte;
}

function ouvrirMessagerie(objet, corps){
  window.location.href =
    `mailto:${CONFIG.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;
}

/* --- Message de demande pour un modèle -------------------------------- */
function construireDemande(form, p){
  const d = Object.fromEntries(new FormData(form).entries());
  const objet = `Demande — ${p.ref} ${p.nom}${d.nom ? " — " + (d.prenom || "") + " " + d.nom : ""}`.trim();

  const corps = [
    `Bonjour,`,
    ``,
    `Je suis intéressé(e) par ce modèle et je souhaiterais en savoir plus (prix, délai, finitions possibles).`,
    ``,
    `MODÈLE`,
    `  Référence : ${p.ref}`,
    `  Nom       : ${p.nom}`,
    `  Gamme     : ${nomGamme(p.gamme)}`,
    ``,
    `MES COORDONNÉES`,
    `  Nom et prénom : ${d.prenom || ""} ${d.nom || ""}`.trimEnd(),
    `  Email         : ${d.email || ""}`,
    `  Téléphone     : ${d.telephone || "(non communiqué)"}`,
    `  Ville         : ${d.ville || "(non communiquée)"}`,
    ``,
    `MA DEMANDE`,
    `  ${d.message || "(aucune précision)"}`,
    ``,
    `Merci de me recontacter pour la suite.`,
    ``,
    `${d.prenom || ""} ${d.nom || ""}`.trim()
  ].join("\n");

  return { objet, corps };
}

/* --- Page contact ----------------------------------------------------- */
function activerContact(){
  const form = $("[data-form-contact]");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const objet = `${d.sujet || "Contact"} — site ${CONFIG.marque}`;
    const corps = [
      `Bonjour,`,
      ``,
      d.message || "",
      ``,
      `--`,
      `${d.prenom || ""} ${d.nom || ""}`.trim(),
      `Email : ${d.email || ""}`,
      `Téléphone : ${d.telephone || "(non communiqué)"}`
    ].join("\n");
    ouvrirMessagerie(objet, corps);
    const confirm = $("[data-contact-confirm]");
    if (confirm) confirm.hidden = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injecterConfig();
  afficherApercu();
  afficherBoutique();
  afficherProduit();
  activerContact();
});
