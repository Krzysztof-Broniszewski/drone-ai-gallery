/* BLACK LUXURY — BORN FROM FIRE: workflow + gallery */
(() => {
  "use strict";
  const root = "assets/workflow/";
  const images = [
    {src:root+"1.png", title:"Text-to-Image — Volcanic Island", alt:"Erupting volcanic island with a lava river"},
    {src:root+"2.png", title:"Text-to-Image — Lava River", alt:"Glowing lava river running towards an erupting volcano"},
    {src:root+"3.png", title:"Character — Perfume & Eruption", alt:"Black Luxury bottle with erupting volcano in the background"},
    {src:root+"4.png", title:"Character — Golden Hour Product Shot", alt:"Black Luxury bottle on volcanic rocks at sunset"},
    {src:root+"5.png", title:"Character — Smoky Product Shot", alt:"Black Luxury perfume bottle surrounded by smoke and wood"},
    {src:root+"6.png", title:"Character — Born From Fire", alt:"Black Luxury perfume bottle and gold Born From Fire lettering"}
  ];
  const processRoot = "assets/process/";
  const assets = [
    {src:processRoot+"product-transparent.png",title:"Original product — transparent background",alt:"BLACK LUXURY perfume bottle isolated from its background"},
    {src:processRoot+"product-angles.png",title:"Product character sheet — multiple viewpoints",alt:"Multiple consistent angles of the BLACK LUXURY bottle"},
    {src:processRoot+"qwen-character-workflow.png",title:"ComfyUI — Qwen Image 2.1 Character Sheet",alt:"ComfyUI Qwen Image 2.1 character sheet workflow screenshot"},
    {src:processRoot+"minimax-video-workflow.png",title:"ComfyUI — MiniMax H3 First / Last Frame",alt:"ComfyUI MiniMax H3 first frame and last frame video workflow"},
    {src:processRoot+"stable-audio-workflow.png",title:"ComfyUI — Stable Audio 3 Sound Effects",alt:"Stable Audio 3 text-to-audio workflow screenshot"},
    {src:processRoot+"acestep-music-workflow.png",title:"ComfyUI — ACE-Step 1.5 Text-to-Music",alt:"ACE-Step 1.5 music generation workflow screenshot"},
    {src:processRoot+"davinci-resolve-edit.png",title:"DaVinci Resolve — Editing Timeline",alt:"DaVinci Resolve timeline with multiple video and audio tracks"}
  ];
  const stages = [
    {title:"Product Design & Consistency",eyebrow:"STAGE 01 — PRODUCT CREATION / COMFYUI",description:"The BLACK LUXURY perfume bottle was first generated as an isolated product on a transparent background. Multiple views of the same bottle were then produced with the Qwen Image 2.1 Character Sheet workflow in ComfyUI. These views served as a consistent visual reference for the bottle's shape, cap, glass, amber tones and branding throughout the campaign.",items:[assets[0],assets[1],assets[2]]},
    {title:"Reference Image Generation",eyebrow:"STAGE 02 — TEXT-TO-IMAGE / CHARACTER-GUIDED",description:"Text-to-image prompts established the volcanic island, lava river, smoke and cinematic atmosphere. The product reference was then used to create additional compositions featuring the same bottle in different volcanic environments. This separation of environment design and product-guided imagery helped maintain visual consistency.",items:[images[0],images[1],images[2],images[3],images[4],images[5]]},
    {title:"AI Video Production",eyebrow:"STAGE 03 — COMFYUI / MINIMAX H3",description:"Selected reference frames were animated using the MiniMax H3 First Frame / Last Frame workflow in ComfyUI. Starting and ending images guided shot composition and transitions, while prompts described camera movement, erupting lava, smoke and the perfume reveal. Individual generated shots were prepared for editing.",items:[assets[3],images[2],images[4]]},
    {title:"Music & Sound Design",eyebrow:"STAGE 04 — ACE-STEP 1.5 / STABLE AUDIO 3",description:"The original cinematic soundtrack was generated locally with ACE-Step 1.5 Text-to-Music in ComfyUI. Separate sound effects were created using Stable Audio 3 Text-to-Audio, including moving ash clouds and flowing lava. Each audio element was exported independently for layering and synchronization during editing. Listen to selected samples below.",items:[assets[5],assets[4]]},
    {title:"Editing & Post-Production",eyebrow:"STAGE 05 — DAVINCI RESOLVE",description:"Generated video shots, music and sound effects were assembled in DaVinci Resolve. The finishing process included shot selection, pacing, transitions, audio synchronization, sound layering and the final commercial export.",items:[assets[6]]},
    {title:"Publication & Portfolio",eyebrow:"STAGE 06 — YOUTUBE / CASE STUDY",description:"The completed BLACK LUXURY — BORN FROM FIRE commercial was published on YouTube and presented as a portfolio case study. The final result is available in the player above, alongside selected frames and workflow documentation.",items:[]}
  ];
  const audioSamples = [
    {title:"Original soundtrack — ACE-Step 1.5",detail:"AI-generated cinematic music",src:"assets/audio/acestep_00001.mp3"},
    {title:"Moving ash cloud — Stable Audio 3",detail:"Ash and smoke sound effect",src:"assets/audio/stableaudio_00008.mp3"},
    {title:"Flowing lava — Stable Audio 3",detail:"Lava river sound effect",src:"assets/audio/stableaudio_00005.mp3"}
  ];
  const $ = id => document.getElementById(id);
  const viewer = $("project-lightbox");
  const viewerImg = $("lightbox-image");
  const viewerCaption = $("lightbox-caption");
  let lightboxList = [], lightboxIndex = 0, previousFocus = null;
  function showLightboxItem() {
    const item = lightboxList[lightboxIndex]; if (!item) return;
    viewerImg.src = item.src; viewerImg.alt = item.alt || item.title;
    viewerCaption.textContent = item.title;
    $("lightbox-counter").textContent = `${lightboxIndex+1} / ${lightboxList.length}`;
    $("lightbox-prev").hidden = lightboxList.length < 2;
    $("lightbox-next").hidden = lightboxList.length < 2;
  }
  function openLightbox(list, index) {
    previousFocus = document.activeElement;
    lightboxList = list; lightboxIndex = index;
    showLightboxItem(); viewer.hidden = false; viewer.setAttribute("aria-hidden","false");
    document.body.classList.add("lightbox-open"); $("lightbox-close").focus();
  }
  function closeLightbox() {
    viewer.hidden = true; viewer.setAttribute("aria-hidden","true");
    document.body.classList.remove("lightbox-open"); viewerImg.removeAttribute("src");
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  }
  function moveLightbox(delta) {
    if (!lightboxList.length) return;
    lightboxIndex = (lightboxIndex + delta + lightboxList.length) % lightboxList.length;
    showLightboxItem();
  }
  $("lightbox-close").addEventListener("click",closeLightbox);
  $("lightbox-prev").addEventListener("click",()=>moveLightbox(-1));
  $("lightbox-next").addEventListener("click",()=>moveLightbox(1));
  viewer.addEventListener("click",e=>{if(e.target===viewer)closeLightbox()});
  document.addEventListener("keydown",e=>{
    if(viewer.hidden)return;
    if(e.key==="Escape")closeLightbox();
    if(e.key==="ArrowLeft")moveLightbox(-1);
    if(e.key==="ArrowRight")moveLightbox(1);
    if(e.key==="Tab"){
      const focusable=[...viewer.querySelectorAll("button:not([hidden])")];
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  function galleryButton(item, list, index) {
    const button=document.createElement("button"); button.type="button";button.className="gallery-tile";
    button.setAttribute("aria-label",`Enlarge ${item.title}`);
    const img=document.createElement("img");img.src=item.src;img.alt=item.alt||item.title;img.loading="lazy"; img.onerror=()=>{button.hidden=true};
    const label=document.createElement("span");label.textContent=item.title;
    button.append(img,label);button.addEventListener("click",()=>openLightbox(list,index));
    return button;
  }
  const gallery=$("generated-gallery");
  images.forEach((item,i)=>gallery.appendChild(galleryButton(item,images,i)));
  const processGallery=$("process-assets-gallery");
  if(processGallery) assets.forEach((item,i)=>processGallery.appendChild(galleryButton(item,assets,i)));
  let stage=0, selectedImage=0;
  const buttons=[...document.querySelectorAll(".workflow-step")];
  function selectImage(id) {
    selectedImage=id; const item=stages[stage].items[id];
    $("workflow-image").src=item.src;$("workflow-image").alt=item.alt;
    [...$("workflow-thumbnails").children].forEach(btn=>btn.setAttribute("aria-pressed",String(Number(btn.dataset.image)===id)));
  }
  function setStage(index) {
    stage=Math.max(0,Math.min(stages.length-1,index)); const data=stages[stage];
    $("workflow-count").textContent=`${String(stage+1).padStart(2,"0")} / 06`;
    $("workflow-eyebrow").textContent=data.eyebrow;
    $("workflow-title").textContent=data.title;
    $("workflow-description").textContent=data.description;
    buttons.forEach((button,i)=>{
      button.classList.toggle("is-active",i===stage);
      button.classList.toggle("is-complete",i<stage);
      button.setAttribute("aria-pressed",String(i===stage));
    });
    $("workflow-prev").disabled=stage===0;
    $("workflow-next").disabled=stage===stages.length-1;
    const isPublication=stage===5;
    $("workflow-preview").hidden=isPublication;
    $("workflow-publication-link").hidden=!isPublication;
    $("workflow-audio").hidden=stage!==3;
    if(stage!==3) $("workflow-audio").querySelectorAll("audio").forEach(player=>player.pause());
    const thumbs=$("workflow-thumbnails");thumbs.replaceChildren();
    data.items.forEach((item,index)=>{
      const button=document.createElement("button");button.type="button";button.className="workflow-thumb";button.dataset.image=index;
      button.setAttribute("aria-label",`Show ${item.title}`);
      const img=document.createElement("img");img.src=item.src;img.alt="";img.loading="lazy";img.onerror=()=>{button.hidden=true};
      button.appendChild(img);button.addEventListener("click",()=>selectImage(index));thumbs.appendChild(button);
    });
    if(data.items.length) selectImage(0);
    const audioPanel=$("workflow-audio");
    if(stage===3){
      audioPanel.replaceChildren();
      audioSamples.forEach(sample=>{
        const card=document.createElement("div");card.className="audio-sample";
        const title=document.createElement("strong");title.textContent=sample.title;
        const detail=document.createElement("small");detail.textContent=sample.detail;
        const player=document.createElement("audio");player.controls=true;player.preload="none";player.src=sample.src;
        card.append(title,detail,player);audioPanel.appendChild(card);
      });
    }
  }
  buttons.forEach((button,i)=>button.addEventListener("click",()=>setStage(i)));
  $("workflow-prev").addEventListener("click",()=>setStage(stage-1));
  $("workflow-next").addEventListener("click",()=>setStage(stage+1));
  $("workflow-preview").addEventListener("click",()=>openLightbox(stages[stage].items,selectedImage));
  setStage(0);
})();
