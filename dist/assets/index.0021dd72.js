import{S as a,W as h,C as l,g as d,P as c,a as u,b as m,M as g}from"./vendor.1cad43ba.js";const w=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};w();var f=`varying vec2 vUv;
uniform float progress;
float PI = 3.141529;

void main() {
  vec2 newUV = vUv;
  float bottom = 1. - progress;
  float curveStrength = 1.;
  float waveStrength = 1.;
  // float curve = progress + sin(newUV.x * PI * waveStrength) * progress * bottom;
  float curve = progress + (sin(newUV.x * PI * waveStrength) * progress - progress) * bottom * curveStrength;
  float color = step(curve,newUV.y);
  gl_FragColor = vec4(color,color,color,1.);
}`,v=`varying vec2 vUv;
uniform vec2 uResolution;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`;class p{constructor(i){this.webgl=i,this.scene=new a,this.width=window.innerWidth,this.height=window.innerHeight,this.renderer=new h({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(new l(214748364)),this.renderer.setSize(this.width,this.height),this.geometry=null,this.material=null,this.mesh=null,this.camera=null,this.init()}init(){this.setting(),this.onRaf(),this.tl=d.timeline().to(this.material.uniforms.progress,{value:1,duration:1,delay:1,ease:"circ.inOut"}).to(".text span",{y:"0%",duration:.9,stagger:.05,ease:"circ.inOut"},"-=0.4")}setting(){this.webgl.appendChild(this.renderer.domElement),this.camera=new c(2*Math.atan(this.height/2/100)*180/Math.PI,this.width/this.height,1,1e3),this.camera.position.set(0,0,100),this.camera.updateProjectionMatrix(),this._setMesh()}_setMesh(){this.geometry=new u(this.width,this.height,100,100),this.material=new m({vertexShader:v,fragmentShader:f,transparent:!0,uniforms:{progress:{value:0}}}),this.mesh=new g(this.geometry,this.material),this.scene.add(this.mesh)}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.mesh.scale.x=this.width,this.mesh.scale.y=this.height,this.camera.aspect=window.innerWidth/window.innerHeight,this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera.updateProjectionMatrix()}onRaf(){this.renderer.render(this.scene,this.camera),window.requestAnimationFrame(()=>{this.onRaf()})}}window.addEventListener("load",()=>{const r=new p(document.querySelector("#canvas"));window.addEventListener("resize",()=>{r.onResize()})});
